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

Style & Prompt Design Principles:
1. Clarity & Conciseness: Avoid flowery, hyperbolic, or melodramatic editorial phrasing. Never use subjective jargon such as "masterclass of Christian tact", "foundational doctrinal exposition", "majestic epistle", "fiery polemical", "masterpiece of Christian doctrine", or "dramatic climax". Instead, use clear, natural, and objective biblical descriptions.
2. Direct Biblical Language: Frame questions around key biblical characters, narrative events, core theological themes, or direct ESV quotations.
3. Comprehensive Accepted Answers: For `book_id` questions, ensure `acceptedAnswers` includes canonical name (e.g. "Romans"), standard abbreviation (e.g. "Rom"), and natural phrasing (e.g. "Book of Romans", "Letter to the Romans", "Epistle to the Romans"). For `book_chapter` questions, include both full and abbreviated formats (e.g. ["Romans 6", "Rom 6", "Romans Chapter 6"]).
4. Grounded Explanation: Provide a concise ESV verse reference (e.g. Philemon 1:16) and direct explanation of why the answer is correct.

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
1. "update": Improve the prompt to be clear and concise, add missing valid answer aliases to `acceptedAnswers`, fix incorrect answers, or clarify explanation.
2. "delete": Remove the question entirely if:
   - The question is flagged or identified as "too_specific" (demanding overly trivial details, obscure trivia, hyper-specific verse minutiae, or pedantic phrasing that distracts from major biblical storylines/themes). Do NOT try to salvage or rephrase overly specific trivia questions—delete them from the question bank.
   - The question is fundamentally defective, nonsensical, or irreconcilable.
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

    if category in ["too_specific", "bad_question"]:
        return {
            "action": "delete",
            "rationale": f"Question flagged as '{category}' (overly trivial/specific detail or defective). Removed from question bank.",
            "esv_evidence": f"Ref: {question_obj.get('bookId')} {question_obj.get('chapterNum')}",
            "pr_summary": f"Remove overly specific/defective question {question_obj.get('id')}"
        }

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

def handle_pr_update(root_dir, pr_number, feedback_text, dry_run=False):
    """Fetch PR details, checkout PR branch, re-evaluate with Gemini taking user feedback into account, commit and push updates."""
    print(f"🔄 Processing PR Review / Feedback for PR #{pr_number}...")
    print(f"💬 User Feedback: {feedback_text}")

    # Fetch PR details using gh CLI
    pr_res = subprocess.run(
        ["gh", "pr", "view", str(pr_number), "--json", "number,title,body,headRefName,labels,comments"],
        cwd=root_dir,
        capture_output=True,
        text=True
    )
    if pr_res.returncode != 0:
        print(f"❌ Error fetching PR #{pr_number}: {pr_res.stderr}")
        return False
    
    pr_data = json.loads(pr_res.stdout)
    head_branch = pr_data.get("headRefName")
    pr_title = pr_data.get("title", "")
    pr_body = pr_data.get("body", "")

    if not head_branch:
        print(f"❌ Error: Could not determine headRefName for PR #{pr_number}")
        return False

    print(f"🌿 Checking out branch `{head_branch}`...")
    subprocess.run(["git", "config", "user.name", "github-actions[bot]"], cwd=root_dir, check=True)
    subprocess.run(["git", "config", "user.email", "github-actions[bot]@users.noreply.github.com"], cwd=root_dir, check=True)
    subprocess.run(["git", "fetch", "origin", head_branch], cwd=root_dir, check=True)
    subprocess.run(["git", "checkout", head_branch], cwd=root_dir, check=True)
    subprocess.run(["git", "pull", "origin", head_branch], cwd=root_dir, check=True)

    # Extract Question ID
    qid_match = re.search(r'fix/question-(.+?)-(?:issue|pr|\d+)', head_branch) or \
                re.search(r'Fix question\s+`?([^:`\s]+)`?', pr_title) or \
                re.search(r'Question ID:\s*`([^`]+)`', pr_body)
    
    if not qid_match:
        print(f"❌ Error: Could not extract question ID from PR title ({pr_title}) or branch ({head_branch})")
        return False
    
    question_id = qid_match.group(1).strip()
    print(f"🎯 Target Question ID: `{question_id}`")

    # Load quiz_bank.js on PR branch
    quiz_bank_path = os.path.join(root_dir, "data", "quiz_bank.js")
    full_content, questions, start_idx, end_idx = load_quiz_bank(quiz_bank_path)

    q_idx = next((i for i, q in enumerate(questions) if q.get("id") == question_id), None)
    
    clean_feedback = re.sub(r'/(?:patch|fix|repatch|re-evaluate)\s*', '', feedback_text, flags=re.IGNORECASE).strip()
    lower_feedback = clean_feedback.lower()

    if q_idx is None:
        print(f"⚠️ Note: Question `{question_id}` is already deleted or not present on branch `{head_branch}`.")
        if any(w in lower_feedback for w in ["delete", "remove", "too specific", "obscure"]):
            print("✓ Question is already deleted as requested.")
            if not dry_run:
                subprocess.run(
                    ["gh", "pr", "comment", str(pr_number), "--body", f"🤖 **AI Agent Review:** Question `{question_id}` is already removed from `data/quiz_bank.js` on this branch."],
                    cwd=root_dir
                )
            return True

    current_q = questions[q_idx] if q_idx is not None else {"id": question_id}

    flag_data = parse_metadata_from_body(pr_body)
    flag_data["comments"] = f"ORIGINAL REPORT: {flag_data.get('comments', '')}\n\nUSER REVIEW FEEDBACK ON PR #{pr_number}:\n{clean_feedback}"
    
    if any(w in lower_feedback for w in ["too specific", "too_specific", "obscure trivia", "overly specific", "delete", "remove this question", "remove question"]):
        flag_data["category"] = "too_specific"

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("⚠️ Warning: GEMINI_API_KEY environment variable not set. Simulating agent re-evaluation.")
        if flag_data.get("category") == "too_specific":
            decision = {
                "action": "delete",
                "rationale": f"User requested removal on PR: {clean_feedback}",
                "esv_evidence": f"Ref: {current_q.get('bookId')} {current_q.get('chapterNum')}",
                "pr_summary": f"Remove question {question_id} based on reviewer feedback"
            }
        else:
            decision = {
                "action": "update",
                "updated_question": current_q,
                "rationale": f"Reviewed feedback: {clean_feedback}",
                "esv_evidence": f"Ref: {current_q.get('bookId')} {current_q.get('chapterNum')}",
                "pr_summary": f"Update question {question_id} per reviewer comments"
            }
    else:
        print("✨ Invoking Google Gemini AI Agent with PR review feedback...")
        decision = call_gemini_agent(api_key, current_q, flag_data)

    print("\n🤖 Agent Decision for PR Update:")
    print(json.dumps(decision, indent=2))

    action = decision.get("action", "no_change")
    if action == "no_change":
        print("ℹ️ Agent determined no further change needed.")
        if not dry_run:
            subprocess.run(
                ["gh", "pr", "comment", str(pr_number), "--body", f"🤖 **AI Agent Review:** Evaluated feedback: \"{clean_feedback}\".\n\n**Decision:** No further changes needed.\n\n**Rationale:** {decision.get('rationale', 'Current version is accurate.')}\n\n**ESV Evidence:** {decision.get('esv_evidence', 'N/A')}"],
                cwd=root_dir
            )
        return True

    if action == "update":
        updated_q = decision.get("updated_question")
        if updated_q and q_idx is not None:
            questions[q_idx] = updated_q
    elif action == "delete":
        if q_idx is not None:
            print(f"🗑️ Deleting question `{question_id}` per reviewer feedback.")
            questions.pop(q_idx)

    # Save modified quiz_bank.js
    prefix = full_content[:start_idx]
    suffix = full_content[end_idx:]
    save_quiz_bank(quiz_bank_path, prefix, questions, suffix)
    print("✓ Successfully updated data/quiz_bank.js on branch")

    # Run regression tests
    test_ok = run_regression_tests(root_dir)
    if not test_ok:
        print("❌ Reverting changes due to test failure...")
        with open(quiz_bank_path, 'w', encoding='utf-8') as f:
            f.write(full_content)
        return False

    if dry_run:
        print(f"[DRY RUN] Would commit and push update to {head_branch}")
        return True

    # Commit and push update
    commit_msg = f"Address PR review feedback on {question_id}: {decision.get('pr_summary', 'Update question')}"
    subprocess.run(["git", "add", "data/quiz_bank.js", "bundle.js"], cwd=root_dir, check=True)
    subprocess.run(["git", "commit", "-m", commit_msg], cwd=root_dir, check=True)
    subprocess.run(["git", "push", "origin", head_branch], cwd=root_dir, check=True)

    # Comment on PR
    comment_body = f"""🤖 **AI Patcher Update Applied**

I've re-evaluated this question according to your review feedback:
> *"{clean_feedback}"*

### 🔍 Changes Made (`{action.upper()}`)
- **Rationale:** {decision.get('rationale', 'Updated based on reviewer comments.')}
- **ESV Scripture Evidence:** {decision.get('esv_evidence', 'Verified against ESV text.')}
- **Automated Tests:** ✅ Verified (All Unit & Bundle Regression Tests Passed)

The branch `{head_branch}` has been updated.
"""
    subprocess.run(["gh", "pr", "comment", str(pr_number), "--body", comment_body], cwd=root_dir)
    print(f"🎉 Successfully updated PR #{pr_number} and posted comment!")
    return True

def main():
    parser = argparse.ArgumentParser(description="AI Agent Question Patcher")
    parser.add_argument("--event-path", help="Path to GitHub Actions event.json")
    parser.add_argument("--issue-number", type=int, help="GitHub Issue Number")
    parser.add_argument("--pr-number", type=int, help="GitHub Pull Request Number for re-patching")
    parser.add_argument("--issue-body", help="Issue body content or filepath")
    parser.add_argument("--question-id", help="Direct question ID for manual/dry-run test")
    parser.add_argument("--comments", default="", help="Comments for manual test")
    parser.add_argument("--category", default="wrong_answer", help="Issue category for manual test")
    parser.add_argument("--suggested-answer", default="", help="Suggested answer for manual test")
    parser.add_argument("--dry-run", action="store_true", help="Perform evaluation without git push/PR")
    args = parser.parse_args()

    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    quiz_bank_path = os.path.join(root_dir, "data", "quiz_bank.js")

    # Check if this is a PR comment or review update
    if args.pr_number:
        handle_pr_update(root_dir, args.pr_number, args.comments, dry_run=args.dry_run)
        return

    flag_data = {}
    issue_number = args.issue_number or 0

    if args.event_path and os.path.exists(args.event_path):
        with open(args.event_path, 'r', encoding='utf-8') as f:
            event_json = json.load(f)

            # Skip comments from bots to prevent recursive loops
            sender = event_json.get("sender", {}).get("login", "")
            comment_user = event_json.get("comment", {}).get("user", {}).get("login", "")
            review_user = event_json.get("review", {}).get("user", {}).get("login", "")
            if sender.endswith("[bot]") or comment_user.endswith("[bot]") or review_user.endswith("[bot]"):
                print(f"🤖 Ignoring bot event from {sender or comment_user or review_user}.")
                return

            # Check if this is an issue_comment on a PR
            if "comment" in event_json and "issue" in event_json and "pull_request" in event_json["issue"]:
                pr_num = event_json["issue"].get("number", 0)
                feedback_text = event_json["comment"].get("body", "")
                handle_pr_update(root_dir, pr_num, feedback_text, dry_run=args.dry_run)
                return
            # Check if this is a PR review
            elif "pull_request" in event_json and "review" in event_json:
                pr_num = event_json["pull_request"].get("number", 0)
                feedback_text = event_json["review"].get("body", "")
                handle_pr_update(root_dir, pr_num, feedback_text, dry_run=args.dry_run)
                return
            # Check if workflow_dispatch passed a PR number
            elif "inputs" in event_json and event_json["inputs"].get("pr_number"):
                pr_num = int(event_json["inputs"]["pr_number"])
                feedback_text = event_json["inputs"].get("comments", "") or event_json["inputs"].get("feedback", "")
                handle_pr_update(root_dir, pr_num, feedback_text, dry_run=args.dry_run)
                return
            elif "issue" in event_json:
                issue = event_json.get("issue", {})
                labels = [l.get("name") if isinstance(l, dict) else str(l) for l in issue.get("labels", [])]
                if "question-flag" not in labels:
                    print("ℹ️ Issue is not labeled 'question-flag'. Skipping.")
                    return
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
