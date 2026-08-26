export function renderTopNavbar({ activeView, selectedBook, selectedChapterNum, googleUser, cloudSyncStatus, theme = "dark" }) {
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

        <button
          data-view="quiz-diagnostic"
          class="studio-view-btn px-3 py-1 rounded text-xs transition flex items-center gap-1.5 ${
            activeView === "quiz-diagnostic"
              ? "bg-[#2B2B28] text-[#EAE8E2] font-medium shadow-2xs"
              : "text-[#8C8A84] hover:text-[#EAE8E2]"
          }"
        >
          <span>🎯</span>
          <span>Diagnostic & Quizzes</span>
        </button>
      </nav>

      <!-- Right: Quiet Actions, Theme Toggle & Cloud SSO Modal Trigger -->
      <div class="flex items-center gap-2.5">
        <button
          id="theme-toggle-btn"
          class="px-2.5 py-1 rounded bg-[#1C1C1A] hover:bg-[#262623] border border-[#2B2B28] text-[#EAE8E2] transition flex items-center gap-1.5 text-xs font-medium cursor-pointer shadow-xs"
          title="Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode"
          aria-label="Toggle dark and light theme"
        >
          <span class="text-xs select-none">${theme === "dark" ? "☀️" : "🌙"}</span>
          <span class="hidden sm:inline">${theme === "dark" ? "Light" : "Dark"}</span>
        </button>

        <button
          id="open-cloud-sso-btn"
          class="px-3 py-1 rounded bg-[#1C1C1A] hover:bg-[#262623] border border-[#2B2B28] text-[#EAE8E2] transition flex items-center gap-1.5 text-xs font-medium"
          title="${googleUser ? 'Click to manage Google SSO / Firebase Cloud Sync' : 'Direct 1-click Google Sign-In to cloud-sync your Bible outlines'}"
        >
          ${
            googleUser
              ? `<span class="text-[10px]">🟢</span><span class="text-[#C4B79C]">${googleUser.displayName || "Google"} • Synced</span>`
              : `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg><span>Sign in with Google</span>`
          }
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
                      Your outlines are currently saved automatically to your local browser storage. Sign in with your Google account to back up and sync your outlines across devices:
                    </p>

                    <div class="space-y-2 pt-1">
                      <button
                        id="sso-signin-google-btn"
                        class="w-full py-2.5 rounded bg-[#4285F4] hover:bg-[#3367D6] text-white font-semibold transition flex items-center justify-center gap-2 shadow"
                      >
                        <svg class="w-4 h-4 bg-white rounded-full p-0.5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
                        <span>Sign in with Google (Pop-Up)</span>
                      </button>

                      <button
                        id="sso-signin-google-redirect-btn"
                        class="w-full py-2 rounded bg-[#242422] hover:bg-[#2E2E2A] text-[#EAE8E2] border border-[#3A3A36] text-xs transition"
                      >
                        If pop-up is blocked: Sign in via Full Page Redirect
                      </button>
                    </div>
                  `
            }
            ${
              cloudSyncStatus
                ? `<div class="text-[11px] text-[#C4B79C] font-mono">${cloudSyncStatus}</div>`
                : ""
            }
          </div>
        </div>
      </div>
    </div>
  `;
}
