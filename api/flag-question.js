/**
 * Vercel Serverless Function: Flag Question Endpoint
 * Receives question issue reports from the web app, formats them with
 * machine-readable metadata, and creates a GitHub Issue labeled 'question-flag'.
 */

export default async function handler(req, res) {
  // CORS & method check
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed. Only POST is supported." });
  }

  const {
    questionId,
    prompt,
    bookId = "",
    bookName = "",
    chapterNum = null,
    type = "",
    expectedAnswer = "",
    userAnswer = "",
    category = "wrong_answer",
    suggestedAnswer = "",
    comments = "",
    submittedAt = new Date().toISOString()
  } = req.body || {};

  if (!questionId || !prompt) {
    return res.status(400).json({ error: "Missing required fields: questionId and prompt are required." });
  }

  const githubToken = process.env.GITHUB_TOKEN || process.env.GH_PAT;
  const githubRepo = process.env.GITHUB_REPO || "phrred/BibleOutline";

  if (!githubToken) {
    return res.status(503).json({
      error: "GitHub token not configured on serverless environment. Please set GITHUB_TOKEN in Vercel project settings.",
      fallback: true
    });
  }

  const categoryLabels = {
    wrong_answer: "Wrong Answer / Inaccurate Key",
    too_specific: "Too Specific / Obscure Phrasing",
    poorly_phrased: "Poorly Phrased / Ambiguous Prompt",
    typo: "Typo / Citation / Formatting Issue",
    bad_question: "Remove / Defective Question",
    other: "Other General Feedback"
  };

  const categoryName = categoryLabels[category] || category;
  const issueTitle = `[Question Flag] ${questionId}: ${prompt.length > 55 ? prompt.substring(0, 52) + "..." : prompt}`;

  const issueBody = `## 🚩 Question Flag Report

### 📋 Question Snapshot
- **Question ID:** \`${questionId}\`
- **Reference:** ${bookName || bookId} ${chapterNum ? `Chapter ${chapterNum}` : ""}
- **Question Type:** \`${type || "standard"}\`
- **Current Prompt:**
> "${prompt}"

- **Expected Answer:** \`${expectedAnswer}\`
- **User's Input:** \`${userAnswer || "(None)"}\`

---

### ⚠️ Issue Details
- **Reported Category:** **${categoryName}**
- **Suggested Answer:** ${suggestedAnswer ? `\`${suggestedAnswer}\`` : "*(None provided)*"}
- **User Comments & Rationale:**
> ${comments ? comments.replace(/\n/g, "\n> ") : "*(No additional comments provided)*"}

---

### 🤖 Instructions for AI Question Patcher Agent
This issue is automatically processed by the GitHub Actions AI Agent (\`process_question_flag.py\`).
The agent will:
1. Verify the biblical citation against ESV scripture.
2. Evaluate the user's critique and suggested correction.
3. Apply the appropriate modification (rephrase prompt, expand answer aliases, update explanation, or remove question).
4. Run automated test suites to ensure zero regressions.
5. Open an automated Pull Request linking this issue.

<!-- METADATA: ${JSON.stringify({
    questionId,
    prompt,
    bookId,
    bookName,
    chapterNum,
    type,
    expectedAnswer,
    userAnswer,
    category,
    suggestedAnswer,
    comments,
    submittedAt
  })} -->
`;

  try {
    const ghResponse = await fetch(`https://api.github.com/repos/${githubRepo}/issues`, {
      method: "POST",
      headers: {
        "Authorization": `token ${githubToken}`,
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json",
        "User-Agent": "BibleOutline-FlagBot"
      },
      body: JSON.stringify({
        title: issueTitle,
        body: issueBody,
        labels: ["question-flag", "needs-agent-review"]
      })
    });

    if (!ghResponse.ok) {
      const errText = await ghResponse.text();
      console.error("GitHub API error:", ghResponse.status, errText);
      return res.status(ghResponse.status).json({
        error: `GitHub API error: ${ghResponse.statusText}`,
        details: errText
      });
    }

    const issueData = await ghResponse.json();
    return res.status(201).json({
      success: true,
      issueNumber: issueData.number,
      issueUrl: issueData.html_url
    });
  } catch (error) {
    console.error("Failed to create GitHub Issue:", error);
    return res.status(500).json({ error: "Internal Server Error: " + error.message });
  }
}
