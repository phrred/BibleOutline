export function renderTopNavbar({ activeView, selectedBook, selectedChapterNum, googleUser, cloudSyncStatus }) {
  return `
    <header class="h-12 bg-[#141413] border-b border-[#242422] px-6 flex items-center justify-between shrink-0 select-none text-xs">
      <!-- Left: Book & Chapter indicator -->
      <div class="flex items-center gap-2">
        <span class="font-serif font-semibold text-sm text-[#EAE8E2]">
          ${selectedBook.name}
        </span>
        <span class="text-[#6D6B66]">•</span>
        <span class="font-mono text-xs text-[#C4B79C]">
          Chapter ${selectedChapterNum} of ${selectedBook.chapterCount}
        </span>
      </div>

      <!-- Center: Quiet View Mode Switcher -->
      <nav class="flex items-center gap-1 bg-[#1A1A18] p-0.5 rounded-md border border-[#262624]">
        <button
          data-view="chapter-outliner"
          class="studio-view-btn px-3 py-1 rounded text-xs transition ${
            activeView === "chapter-outliner"
              ? "bg-[#2B2B28] text-[#EAE8E2] font-medium shadow-2xs"
              : "text-[#8C8A84] hover:text-[#EAE8E2]"
          }"
        >
          Side-by-Side Outliner
        </button>

        <button
          data-view="book-rollup"
          class="studio-view-btn px-3 py-1 rounded text-xs transition ${
            activeView === "book-rollup"
              ? "bg-[#2B2B28] text-[#EAE8E2] font-medium shadow-2xs"
              : "text-[#8C8A84] hover:text-[#EAE8E2]"
          }"
        >
          Full Book Outline (${selectedBook.name})
        </button>
      </nav>

      <!-- Right: Quiet Actions & Cloud SSO Modal Trigger -->
      <div class="flex items-center gap-3">
        <button
          id="load-demo-btn"
          class="text-[#8C8A84] hover:text-[#C4B79C] transition text-xs"
          title="Load sample example outline notes for Genesis 1-3"
        >
          Sample Outlines
        </button>

        <span class="text-[#333330]">|</span>

        <button
          id="open-cloud-sso-btn"
          class="px-2.5 py-1 rounded bg-[#1C1C1A] hover:bg-[#262623] border border-[#2B2B28] text-[#C4B79C] transition flex items-center gap-1.5"
          title="Google Sign-In, Firebase Cloud Sync & Free Web App Publishing Guide"
        >
          <span class="text-[10px]">${googleUser ? "🟢" : "☁️"}</span>
          <span>${googleUser ? googleUser.displayName || "Google SSO" : "Google SSO / Sync"}</span>
        </button>

        <span class="text-[#333330]">|</span>

        <button
          id="export-current-book-btn"
          class="px-2.5 py-1 rounded bg-[#20201E] hover:bg-[#2A2A27] border border-[#2B2B28] text-[#EAE8E2] transition flex items-center gap-1.5"
        >
          <span>Export .md</span>
        </button>
      </div>
    </header>

    <!-- Google SSO & Production Publishing Modal -->
    <div
      id="cloud-sso-modal"
      class="hidden fixed inset-0 bg-black/75 backdrop-blur-2xs z-50 flex items-center justify-center p-4 text-[#EAE8E2]"
    >
      <div class="bg-[#171715] border border-[#2A2A27] rounded-xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
        <div class="flex items-center justify-between border-b border-[#242422] pb-3">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded bg-[#2A2A27] flex items-center justify-center text-xs">☁️</span>
            <h3 class="font-serif text-lg font-bold text-[#EAE8E2]">Google SSO & Firebase Sync</h3>
          </div>
          <button id="close-cloud-sso-modal-btn" class="text-[#8C8A84] hover:text-[#EAE8E2] text-sm">
            ✕
          </button>
        </div>

        <div class="space-y-4 text-xs leading-relaxed text-[#A19E97]">
          <!-- SSO Section -->
          <div class="bg-[#1C1C1A] border border-[#262624] rounded-lg p-4 space-y-3">
            <h4 class="font-semibold text-[#DBCFB3] flex items-center justify-between">
              <span>Google SSO (Firebase Authentication)</span>
              ${
                googleUser
                  ? `<span class="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-mono">Signed In</span>`
                  : `<span class="px-2 py-0.5 rounded text-[10px] bg-[#2A2A27] text-[#8C8A84] font-mono">Offline / Local Storage</span>`
              }
            </h4>

            ${
              googleUser
                ? `
                    <div class="flex items-center justify-between bg-[#141413] p-2.5 rounded border border-[#242422]">
                      <div>
                        <div class="font-medium text-[#EAE8E2]">${googleUser.displayName || googleUser.email}</div>
                        <div class="text-[10px] font-mono text-[#6D6B66]">${googleUser.email}</div>
                      </div>
                      <button
                        id="sso-signout-btn"
                        class="px-2.5 py-1 rounded bg-[#282825] hover:bg-[#353531] text-[#EAE8E2]"
                      >
                        Sign Out
                      </button>
                    </div>

                    <div class="grid grid-cols-2 gap-2 pt-1">
                      <button
                        id="sso-backup-cloud-btn"
                        class="py-2 rounded bg-[#C4B79C] hover:bg-[#DBCFB3] text-[#141413] font-semibold transition"
                      >
                        ↑ Backup Outlines to Firebase
                      </button>
                      <button
                        id="sso-restore-cloud-btn"
                        class="py-2 rounded bg-[#242422] hover:bg-[#2E2E2A] text-[#EAE8E2] border border-[#2E2E2A] transition"
                      >
                        ↓ Restore from Firebase
                      </button>
                    </div>
                  `
                : `
                    <p class="text-[11px] text-[#8C8A84]">
                      Your outlines are currently saved automatically to your device browser storage (offline-ready). To enable Google Sign-In and cross-device cloud sync:
                    </p>
                    <div class="bg-[#141413] p-3 rounded border border-[#242422] space-y-2 text-[11px] font-mono">
                      <div class="text-[#C4B79C]">1. Open <span class="text-[#EAE8E2]">src/firebase_config.js</span></div>
                      <div>2. Paste your Firebase project keys from <a href="https://console.firebase.google.com" target="_blank" class="underline text-[#DBCFB3]">console.firebase.google.com</a></div>
                      <div>3. Enable <strong>Google Sign-In provider</strong> in Firebase Auth</div>
                    </div>

                    <button
                      id="sso-signin-google-btn"
                      class="w-full py-2 rounded bg-[#2A2A27] hover:bg-[#353531] text-[#EAE8E2] font-semibold border border-[#3A3A36] transition flex items-center justify-center gap-2"
                    >
                      <span>Sign in with Google (SSO)</span>
                    </button>
                  `
            }
            ${
              cloudSyncStatus
                ? `<div class="text-[11px] text-[#C4B79C] font-mono">${cloudSyncStatus}</div>`
                : ""
            }
          </div>

          <!-- Free Production Web App Publishing Section -->
          <div class="bg-[#1C1C1A] border border-[#262624] rounded-lg p-4 space-y-2">
            <h4 class="font-semibold text-[#DBCFB3]">How to Publish for Free (Web App)</h4>
            <p class="text-[11px] leading-relaxed">
              This app is a self-contained modern HTML/ES-Module client with zero server dependencies (+ official ESV API integration). You can publish it for free in under 60 seconds:
            </p>
            <ul class="space-y-1.5 text-[11px] list-disc list-inside text-[#A19E97]">
              <li><strong>Vercel (Recommended):</strong> Drag & drop your "BibleOutline" folder to <a href="https://vercel.com/new" target="_blank" class="underline text-[#DBCFB3]">vercel.com</a> (vercel.json included).</li>
              <li><strong>Cloudflare Pages:</strong> Connect GitHub or drop folder at <a href="https://pages.cloudflare.com" target="_blank" class="underline text-[#DBCFB3]">pages.cloudflare.com</a>.</li>
              <li><strong>Firebase Hosting:</strong> Run "firebase init hosting && firebase deploy".</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
}
