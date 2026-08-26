# Bible Outline & Storyline Studio

A distraction-free, minimalist study web application for outlining all 66 books and 1,189 chapters of the Bible, with **Official ESV Bible API auto-loading**, **Collapsible Section Headings**, and **Google SSO / Firebase Cloud Sync**.

---

## ✨ Features

- **Complete Canonical Bible Index (Pre-Populated)**
  - All **66 Books** of the Old and New Testaments.
  - All **1,189 Chapters** indexed out-of-the-box (`GEN-1` through `REV-22`).
  - Rich **Book Context & Background** for every book (Author, Historical Date/Setting, Literary Genre, Key Theme, and its place in Scripture).

- **Official ESV Bible API Integration with Auto-Loaded Headings**
  - Uses official ESV API v3 (`api.esv.org`) with your authorization token.
  - As you navigate to any chapter (`Genesis 1`, `Matthew 5`, etc.), the app automatically fetches the official ESV Scripture and **extracts all ESV Section Headings** with their verse ranges.

- **Unified Rich Outline Canvas (`contenteditable`)**
  - **Simplified Section Headings**: Clean, elegant section headings with direct title editing, optional verse tags, and one-click collapsible sections.
  - **Clean Bulleted & Numbered Lists**: Streamlined formatting toolbar (`Bold`, `Italic`, `• Bulleted List`, `1. Numbered List`, `+ Add Heading`, `📑 ESV Headings`) with flat, clean bullet points without unnecessary sub-bullet nesting.
  - **Smart Google Doc Keyboard Shortcuts**: Type `- ` or `* ` at line start to create bullets; press **`Enter`** to continue bulleted lines; press **`Enter`** or **`Backspace`** on an empty bullet to exit the list natively.

- **Zero-Config Single-Bundle Architecture (`bundle.js`)**
  - Runs directly from `http://localhost:8000` or file URLs, with immediate debounced local storage and cross-chapter note preservation.

- **Google SSO (Firebase Authentication) & Cross-Device Cloud Sync**
  - Dual storage: Works **100% offline via local storage** AND supports optional **Google Sign-In (SSO)** for cross-device cloud sync.
  - Simply paste your Firebase Project keys in `src/firebase_config.js` to enable Google Sign-In and 1-click cloud backup/restore to Firebase Firestore.

---

## 🚀 How to Publish for Free on Production (Web App)

Because this web app is built as a self-contained modern ES-Module static client (with ESV API requests made directly from the client), you can host it for **free** on any web host:

### Option 1: Vercel (Recommended — 60 Seconds)
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your repository or drop the `/Users/fredhong/BibleOutline` folder.
3. Vercel uses the included `vercel.json` configuration file automatically.

### Option 2: Cloudflare Pages
1. Go to [pages.cloudflare.com](https://pages.cloudflare.com).
2. Connect your repository or upload the project folder.

### Option 3: Firebase Hosting
1. Run `firebase init hosting`.
2. Set public directory to `.`.
3. Run `firebase deploy`.

---

## 🛠️ Setting Up Google SSO & Firebase Sync

1. Create a free project at [console.firebase.google.com](https://console.firebase.google.com).
2. Go to **Authentication → Sign-in method** and enable **Google**.
3. Go to **Project Settings → Web App** and copy your Firebase SDK credentials (`apiKey`, `projectId`, etc.).
4. Paste your credentials into `src/firebase_config.js`:
   ```javascript
   export const FIREBASE_CONFIG = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT.firebaseapp.com",
     projectId: "YOUR_PROJECT",
     ...
   };
   ```
5. Click **"☁️ Google SSO / Sync"** in the top navigation bar to sign in and back up your Bible outlines across all your devices.

---

## 🚩 Question Flagging & Automated AI Agent Pull Requests

When taking any test or reviewing past answers in the Studio, users can flag questions that have issues (wrong answers, ambiguous phrasing, too specific, typos, or defective questions):

1. **In-App Flagging Modal**: Click **"🚩 Flag Question"** on any active or reviewed question card to choose an issue category, suggest a correct answer, and add comments.
2. **Serverless Issue Ingestion**: In production (Vercel), submissions hit `/api/flag-question`, which creates a structured GitHub Issue tagged `question-flag`. In local/offline dev, it seamlessly opens a pre-filled GitHub Issue tab.
3. **Autonomous AI Question Patcher Agent**: Triggered via GitHub Actions on new `question-flag` issues:
   - Evaluates the issue report against the Protestant canon and ESV scripture using the **100% free Google Gemini 2.5 Flash API**.
   - Rephrases prompts, adds missing valid answer aliases, corrects keys, or removes defective questions in `data/quiz_bank.js`.
   - Runs `./run_tests.sh` to ensure all unit and E2E regression tests pass.
   - Opens an automated Pull Request linking the issue for your 1-click review and merge.

### ⚙️ Quick Setup (100% Free)

1. **Get a free Google Gemini API Key**: Visit [aistudio.google.com](https://aistudio.google.com) and click **"Create API key"** (free tier: up to 1,500 requests/day).
2. **Add GitHub Actions Secret**:
   - In your GitHub repository, go to **Settings → Secrets and variables → Actions → New repository secret**.
   - Add `GEMINI_API_KEY` with your key from Step 1.
3. **(Optional) Configure Vercel Serverless Function**:
   - In your Vercel Project Settings → Environment Variables, add `GITHUB_TOKEN` (a GitHub Personal Access Token with `repo` or `issues:write` scope) and `GITHUB_REPO` (e.g. `phrred/BibleOutline`).

---

## 🧪 Automated Regression Testing

You can run the automated regression test suite after making any code changes to verify all functionality remains intact:

```bash
# Run the complete test suite (Unit Logic + Headless Browser E2E)
./run_tests.sh

# Run unit tests only (~0.03s)
./run_tests.sh --unit

# Run headless browser E2E tests only (~0.7s)
./run_tests.sh --e2e
```

The runner automatically compiles `bundle.js` from `src/`, verifies the local web server, launches an isolated Headless Chrome instance via CDP, executes all 16 regression tests across 2 suites, and outputs a formatted pass/fail report.

