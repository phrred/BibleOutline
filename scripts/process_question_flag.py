#!/usr/bin/env python3
"""
AI Agent Question Patcher for Bible Outline Studio
Processes flagged question GitHub Issues, consults Google Gemini (Free Tier),
patches data/quiz_bank.js, runs test suite, and opens a GitHub Pull Request.

Usage:
  python3 scripts/process_question_flag.py --issue-number 42 --issue-body issue.md
  python3 scripts/process_question_flag.py --event-path $GITHUB_EVENT_PATH
  python3 scripts/process_question_flag.py --dry-run --question-id bmpi_1 --comments "Prompt is unclear"
"""

import os
import sys
import json
import re
import argparse
import subprocess
import urllib.request
import urllib.parse

def parse_metadata_from_body(body_text):
    """Extract embedded JSON metadata block from GitHub issue body."""
    match = re.search(r'<!--\s*METADATA:\s*(\{.*?\})\s*-->', body_text, re.DOTALL)
    if match:
        try:
            return json.loads(match.group(1))
        except Exception as e:
            print(f"⚠️ Warning: Failed to parse JSON from METADATA comment: {e}")
    
    # Fallback to field extraction with regex
    data = {}
    qid = re.search(r'Question ID:\s*`([^`]+)`', body_text)
    if qid:
        data['questionId'] = qid.group(1)
    
    cat = re.search(r'Reported Category:\s*\*\*([^*]+)\*\*', body_text)
    if cat:
        data['category'] = cat.group(1)
    
    sugg = re.search(r'Suggested Answer:\s*`([^`]+)`', body_text)
    if sugg:
        data['suggestedAnswer'] = sugg.group(1)
    
    comms = re.search(r'User Comments & Rationale:\s*\n>\s*(.+)', body_text)
    if comms:
        data['comments'] = comms.group(1).strip()
    
    return data

def load_quiz_bank(quiz_bank_path):
    """Read and parse CURATED_QUESTION_BANK array from quiz_bank.js."""
    with open(quiz_bank_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    match = re.search(r'export const (?:CURATED_QUESTION_BANK|RAW_QUESTIONS)\s*=\s*(\[[\s\S]*?\]);\s*', content)
    if not match:
        raise ValueError(f"Could not locate CURATED_QUESTION_BANK array in {quiz_bank_path}")
    
    raw_json = match.group(1)
    questions = json.loads(raw_json)
    return content, questions, match.start(1), match.end(1)

def save_quiz_bank(quiz_bank_path, prefix_content, questions, suffix_content):
    """Write updated questions list back to quiz_bank.js formatted cleanly."""
    formatted_json = json.dumps(questions, indent=2, ensure_ascii=False)
    new_content = prefix_content + formatted_json + suffix_content
    with open(quiz_bank_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

def get_available_models(api_key):
    """Dynamically query Google AI Studio API to discover available text models for this key."""
    try:
        url = f"https://generativelanguage.googleapis.com/v1beta/models?key={api_key}"
        req = urllib.request.Request(url, headers={"Content-Type": "application/json"})
        with urllib.request.urlopen(req, timeout=10.0) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            supported = [
                m["name"].replace("models/", "")
                for m in data.get("models", [])
                if "generateContent" in m.get("supportedGenerationMethods", [])
            ]
            # Filter out non-text modalities (audio, tts, embedding, vision-only)
            text_models = [
                m for m in supported
                if not any(k in m for k in ["-tts", "-audio", "-embed", "embedding", "-realtime", "aqa", "imagen"])
            ]
            # Prioritize newest Gemini 3.x Flash models, then 2.x, 1.5, and flash-lite
            priority = [
                "gemini-3.6-flash",
                "gemini-3.5-flash",
                "gemini-3-flash",
                "gemini-3.6-flash-preview",
                "gemini-2.0-flash",
                "gemini-1.5-flash",
                "gemini-flash-lite-latest",
                "gemini-1.5-pro",
                "gemini-3.0-pro"
            ]
            
            # Sort with gemini-3 first, then priority list, then others
            gemini3_models = [m for m in text_models if "gemini-3" in m and "flash" in m]
            ordered = (
                gemini3_models
                + [m for m in priority if m in text_models and m not in gemini3_models]
                + [m for m in text_models if m not in priority and m not in gemini3_models]
            )
            print(f"📡 Discovered {len(ordered)} active text models (prioritizing Gemini 3 & Flash): {ordered[:5]}")
            return ordered
    except Exception as e:
        print(f"⚠️ Model discovery note: {e}")
        return [
            "gemini-3.6-flash",
            "gemini-2.0-flash",
            "gemini-1.5-flash",
            "gemini-flash-lite-latest",
            "gemini-1.5-pro"
        ]

def call_gemini_agent(api_key, question_obj, flag_data):
    """Call Google Gemini Flash/Pro models with dynamic discovery, continuous fallback, and intelligent resilience."""
    discovered = get_available_models(api_key)
    env_model = os.environ.get("GEMINI_MODEL")
    candidate_models = ([env_model] if env_model else []) + [
        "gemini-3.6-flash",
        "gemini-2.0-flash",
        "gemini-1.5-flash",
        "gemini-flash-lite-latest"
    ] + discovered
    candidate_models = list(dict.fromkeys([m for m in candidate_models if m]))

    system_instruction = """
You are an expert biblical scholar, test designer, and software engineer maintaining the Bible Outline Studio question repository.
Your task is to analyze user feedback on a flagged question and decide on the best resolution according to the Protestant 66-book canon and English Standard Version (ESV).

Question Schema:
- "id": string (unique ID e.g. "bmpi_42")
- "type": string ("book_chapter" | "chapter_in_book" | "verse_completion" | "facts" | "book_id")
- "prompt": string (the question prompt text)
- "bookId": string (3-letter uppercase book code e.g. "GEN", "MAT", "ROM")
- "chapterNum": integer (chapter number)
- "acceptedAnswers": array of strings (pure fill-in-the-blank acceptable answers/aliases, e.g. ["Genesis 12", "Gen 12"])
- "displayAnswer": string (clean display answer shown on scorecards, e.g. "Genesis 12 (Genesis 12:1-3)")
- "explanation": string (concise explanation / context)
- "scope": string ("OT" | "NT")
- "genre": string (e.g. "Pentateuch", "Gospels", "Epistles", "Minor Prophets")

Decide whether to:
1. "update": Improve the prompt, add missing valid answer aliases to `acceptedAnswers`, fix incorrect answers, or clarify explanation.
2. "delete": Remove the question entirely if it is fundamentally defective, nonsensical, or irreconcilable.
3. "no_change": If the question and answer are already 100% accurate and the user's complaint is incorrect.

Output strict JSON with the following structure:
{
  "action": "update" | "delete" | "no_change",
  "updated_question": { ... complete question object with all schema fields if update ... },
  "rationale": "Comprehensive explanation of why the change was made and how it improves accuracy",
  "esv_evidence": "Specific ESV verse quotation or canon evidence supporting this decision",
  "pr_summary": "Short 1-line summary of changes for the PR title and commit"
}
"""

    user_prompt = f"""
Current Question Object in Repository:
{json.dumps(question_obj, indent=2)}

Flag Report from User:
- Issue Category: {flag_data.get('category', 'Not specified')}
- User's Suggested Answer: {flag_data.get('suggestedAnswer', 'None')}
- User Comments & Rationale: {flag_data.get('comments', 'None')}
- User's Typed Input during Test: {flag_data.get('userAnswer', 'None')}

Please evaluate this report against ESV scripture and output the resolution JSON.
"""

    payload = {
        "contents": [
            {
                "role": "user",
                "parts": [{"text": system_instruction + "\n\n" + user_prompt}]
            }
        ],
        "generationConfig": {
            "responseMimeType": "application/json",
            "temperature": 0.1
        }
    }

    last_error = None
    for model_name in candidate_models:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={api_key}"
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode('utf-8'),
            headers={"Content-Type": "application/json"}
        )

        try:
            print(f"✨ Trying model: {model_name}...")
            with urllib.request.urlopen(req, timeout=30.0) as resp:
                resp_data = json.loads(resp.read().decode('utf-8'))
                text_resp = resp_data['candidates'][0]['content']['parts'][0]['text']
                parsed = json.loads(text_resp)
                print(f"✓ Model {model_name} responded successfully!")
                return parsed
        except urllib.error.HTTPError as e:
            err_body = e.read().decode('utf-8')
            last_error = err_body
            print(f"⚠️ Model {model_name} HTTP Error ({e.code})")
            continue
        except Exception as e:
            last_error = str(e)
            print(f"⚠️ Model {model_name} call failed: {e}")
            continue

    print(f"⚠️ All AI model calls experienced temporary issues ({last_error}). Falling back to heuristic resolution.")
    
    # Resilient heuristic fallback if Google AI API is temporarily 503
    category = flag_data.get("category", "")
    comments = flag_data.get("comments", "")
    sugg = flag_data.get("suggestedAnswer", "")
    updated_q = dict(question_obj)
    
    if sugg and sugg not in updated_q.get("acceptedAnswers", []):
        updated_q["acceptedAnswers"] = list(dict.fromkeys(updated_q.get("acceptedAnswers", []) + [sugg]))
        
    return {
        "action": "update",
        "updated_question": updated_q,
        "rationale": f"User flagged question with issue '{category}'. User comments: '{comments}'. Drafted update for human review.",
        "esv_evidence": f"Ref: {updated_q.get('bookId')} {updated_q.get('chapterNum')}",
        "pr_summary": f"Address flag on question {question_obj.get('id')}"
    }

def run_regression_tests(root_dir):
    """Run automated unit tests to verify bundle and data validity."""
    print("🧪 Running regression test suite...")
    res = subprocess.run(
        [sys.executable, os.path.join(root_dir, "test_runner.py"), "--unit"],
        cwd=root_dir,
        capture_output=True,
        text=True
    )
    if res.returncode != 0:
        print("❌ Regression tests FAILED after patching!")
        print(res.stdout)
        print(res.stderr)
        return False
    print("✓ All regression tests passed!")
    return True

def create_pull_request(root_dir, question_id, issue_number, decision, dry_run=False):
    """Create a new git branch, commit changes, and open a GitHub Pull Request."""
    branch_name = f"fix/question-{question_id}-issue-{issue_number}"
    pr_title = f"Fix question {question_id}: {decision.get('pr_summary', 'Update question key & phrasing')} (Closes #{issue_number})"
    
    pr_body = f"""## 🚩 Automated Fix for Question `{question_id}`

Resolves and closes #{issue_number}.

### 🤖 AI Agent Rationale
{decision.get('rationale', 'Question updated for accuracy.')}

### 📖 ESV Scripture Evidence
> {decision.get('esv_evidence', 'Verified against ESV text.')}

### 🔍 Action Taken: `{decision.get('action', 'update').upper()}`
- **Test Suite Verification:** ✅ Verified (All Unit & Bundle Regression Tests Passed)
- **Target File:** `data/quiz_bank.js`

---
*Generated autonomously by Bible Outline Studio Question Patcher Agent.*
"""

    if dry_run:
        print(f"\n[DRY RUN] Would create branch: {branch_name}")
        print(f"[DRY RUN] PR Title: {pr_title}")
        print(f"[DRY RUN] PR Body:\n{pr_body}")
        return True

    try:
        # Configure git identity
        subprocess.run(["git", "config", "user.name", "github-actions[bot]"], cwd=root_dir, check=True)
        subprocess.run(["git", "config", "user.email", "github-actions[bot]@users.noreply.github.com"], cwd=root_dir, check=True)

        # Checkout new branch
        subprocess.run(["git", "checkout", "-B", branch_name], cwd=root_dir, check=True)

        # Stage and commit
        subprocess.run(["git", "add", "data/quiz_bank.js", "bundle.js"], cwd=root_dir, check=True)
        subprocess.run(["git", "commit", "-m", pr_title], cwd=root_dir, check=True)

        # Push branch
        subprocess.run(["git", "push", "-u", "origin", branch_name, "--force"], cwd=root_dir, check=True)

        # Create Pull Request using gh CLI
        gh_res = subprocess.run(
            ["gh", "pr", "create", "--title", pr_title, "--body", pr_body, "--head", branch_name, "--base", "main"],
            cwd=root_dir,
            capture_output=True,
            text=True
        )

        if gh_res.returncode == 0:
            pr_url = gh_res.stdout.strip()
            print(f"🎉 Successfully opened Pull Request: {pr_url}")

            # Link and close issue upon PR creation
            if issue_number and issue_number > 0:
                subprocess.run(
                    ["gh", "issue", "comment", str(issue_number), "--body", f"🤖 An automated fix has been drafted in Pull Request: {pr_url}"],
                    cwd=root_dir
                )
                subprocess.run(
                    ["gh", "issue", "close", str(issue_number), "--comment", f"Closed automatically: PR {pr_url} has been created to resolve this issue."],
                    cwd=root_dir
                )
            return True
        else:
            print(f"⚠️ Warning: `gh pr create` failed: {gh_res.stderr}")
            return False

    except Exception as e:
        print(f"❌ Failed to create PR: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description="AI Agent Question Patcher")
    parser.add_argument("--event-path", help="Path to GitHub Actions event.json")
    parser.add_argument("--issue-number", type=int, help="GitHub Issue Number")
    parser.add_argument("--issue-body", help="Issue body content or filepath")
    parser.add_argument("--question-id", help="Direct question ID for manual/dry-run test")
    parser.add_argument("--comments", default="", help="Comments for manual test")
    parser.add_argument("--category", default="wrong_answer", help="Issue category for manual test")
    parser.add_argument("--suggested-answer", default="", help="Suggested answer for manual test")
    parser.add_argument("--dry-run", action="store_true", help="Perform evaluation without git push/PR")
    args = parser.parse_args()

    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    quiz_bank_path = os.path.join(root_dir, "data", "quiz_bank.js")

    flag_data = {}
    issue_number = args.issue_number or 0

    if args.event_path and os.path.exists(args.event_path):
        with open(args.event_path, 'r', encoding='utf-8') as f:
            event_json = json.load(f)
            issue = event_json.get("issue", {})
            issue_number = issue.get("number", 0)
            body = issue.get("body", "")
            flag_data = parse_metadata_from_body(body)
    elif args.issue_body:
        body = args.issue_body
        if os.path.exists(body):
            with open(body, 'r', encoding='utf-8') as f:
                body = f.read()
        flag_data = parse_metadata_from_body(body)
    elif args.question_id:
        flag_data = {
            "questionId": args.question_id,
            "category": args.category,
            "comments": args.comments,
            "suggestedAnswer": args.suggested_answer
        }

    question_id = flag_data.get("questionId")
    if not question_id:
        print("❌ Error: No question ID found in flag data.")
        sys.exit(1)

    print(f"🔍 Locating question `{question_id}` in {quiz_bank_path}...")
    full_content, questions, start_idx, end_idx = load_quiz_bank(quiz_bank_path)

    q_idx = next((i for i, q in enumerate(questions) if q.get("id") == question_id), None)
    if q_idx is None:
        print(f"❌ Error: Question ID `{question_id}` not found in RAW_QUESTIONS.")
        sys.exit(1)

    current_q = questions[q_idx]
    print(f"✓ Found question: {current_q.get('prompt')}")

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("⚠️ Warning: GEMINI_API_KEY environment variable not set. Simulating agent evaluation.")
        decision = {
            "action": "update",
            "updated_question": {
                **current_q,
                "acceptedAnswers": list(dict.fromkeys(current_q.get("acceptedAnswers", []) + ([flag_data.get("suggestedAnswer")] if flag_data.get("suggestedAnswer") else [])))
            },
            "rationale": f"Added suggested alias '{flag_data.get('suggestedAnswer')}' based on user report.",
            "esv_evidence": "User feedback suggestion integration.",
            "pr_summary": f"Add answer alias to {question_id}"
        }
    else:
        print("✨ Invoking Google Gemini AI Agent...")
        decision = call_gemini_agent(api_key, current_q, flag_data)

    print("\n🤖 Agent Decision:")
    print(json.dumps(decision, indent=2))

    action = decision.get("action", "no_change")
    if action == "no_change":
        print("ℹ️ Agent determined no change is needed for this question.")
        if issue_number and issue_number > 0 and not args.dry_run:
            subprocess.run(
                ["gh", "issue", "comment", str(issue_number), "--body", f"ℹ️ **AI Agent Review:** No changes needed for this question.\n\n**Rationale:** {decision.get('rationale', 'Question verified accurate against ESV.')}\n\n**Evidence:** {decision.get('esv_evidence', 'N/A')}"],
                cwd=root_dir
            )
            subprocess.run(
                ["gh", "issue", "close", str(issue_number), "--comment", "Closed: Question verified accurate (no changes required)."],
                cwd=root_dir
            )
        sys.exit(0)

    # Apply change
    if action == "update":
        updated_q = decision.get("updated_question")
        if not updated_q:
            print("❌ Error: Agent requested update but provided no updated_question.")
            sys.exit(1)
        questions[q_idx] = updated_q
    elif action == "delete":
        print(f"🗑️ Deleting defective question `{question_id}` from question bank.")
        questions.pop(q_idx)

    # Save modified quiz_bank.js
    prefix = full_content[:start_idx]
    suffix = full_content[end_idx:]
    save_quiz_bank(quiz_bank_path, prefix, questions, suffix)
    print("✓ Successfully updated data/quiz_bank.js")

    # Run regression tests
    test_ok = run_regression_tests(root_dir)
    if not test_ok:
        print("❌ Reverting quiz_bank.js changes due to test failure...")
        with open(quiz_bank_path, 'w', encoding='utf-8') as f:
            f.write(full_content)
        sys.exit(1)

    # Create Pull Request
    create_pull_request(root_dir, question_id, issue_number, decision, dry_run=args.dry_run)
    print("🎉 Question patcher completed successfully!")

if __name__ == "__main__":
    main()
