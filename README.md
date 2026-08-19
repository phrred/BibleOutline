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

- **Unified Google Doc-Style Rich Outline Canvas (`contenteditable`)**
  - **Indestructible ESV Section Headings**: ESV section headers (`▼ 1. The Creation of the World (v1–31)`) render as protected banners inside your document that can **never** be accidentally deleted by Backspace/Delete.
  - **Real Bulleted & Numbered Lists**: Includes a Google Docs-style formatting toolbar (`Bold`, `Italic`, `• Bulleted List`, `1. Numbered List`, `→ Sub-bullet Indent`, `← Outdent`).
  - **Sub-Bullet Indentation**: Press **`Tab`** while typing on any bullet line to indent a sub-bullet (`◦` open circle marker), and press **`Shift+Tab`** to outdent back to a primary bullet (`•`).
  - **Smart Google Doc Keyboard Shortcuts**: Type `- ` or `* ` at line start to create bullets; press **`Enter`** to continue bulleted lines; press **`Enter`** or **`Backspace`** on an empty bullet to exit the list natively.
  - **1-Click Scripture Verse Quotes**: Click any verse number badge (`¹`, `²`, `¹⁴`) in the side-by-side Scripture reader to insert `(v14)` directly into your outline cursor.

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

The runner automatically compiles `bundle.js` from `src/`, verifies the local web server, launches an isolated Headless Chrome instance via CDP, executes all 12 regression tests across 2 suites, and outputs a formatted pass/fail report.

