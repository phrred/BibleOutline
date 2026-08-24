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

      <!-- Right: Quiet Actions & Cloud SSO Modal Trigger -->
      <div class="flex items-center gap-3">
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

        <span class="text-[#333330]">|</span>

        <!-- Export Dropdown & Modal Trigger -->
        <div class="relative inline-block text-left" id="export-dropdown-wrapper">
          <button
            type="button"
            id="export-menu-btn"
            class="px-2.5 py-1 rounded bg-[#20201E] hover:bg-[#2A2A27] border border-[#2B2B28] text-[#EAE8E2] transition flex items-center gap-1.5 cursor-pointer text-xs font-medium"
            title="Export outline as Markdown (.md) or PDF (.pdf)"
          >
            <span>📤 Export</span>
            <span class="text-[10px] text-[#8C8A84]">▼</span>
          </button>

          <!-- Dropdown Menu -->
          <div
            id="export-dropdown-menu"
            class="hidden absolute right-0 mt-1.5 w-56 rounded-lg bg-[#1C1C1A] border border-[#2B2B28] shadow-2xl z-50 py-1.5 text-xs text-[#EAE8E2]"
          >
            <div class="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-[#8C8A84] border-b border-[#262624]">
              Current Book (${selectedBook.name})
            </div>
            <button
              type="button"
              data-export-type="md"
              data-export-scope="current"
              class="export-action-btn w-full text-left px-3 py-2 hover:bg-[#2A2A27] flex items-center gap-2 transition cursor-pointer text-[#DBCFB3]"
            >
              <span>📄</span>
              <span>Export Markdown (.md)</span>
            </button>
            <button
              type="button"
              data-export-type="pdf"
              data-export-scope="current"
              class="export-action-btn w-full text-left px-3 py-2 hover:bg-[#2A2A27] flex items-center gap-2 transition cursor-pointer text-[#C4B79C]"
            >
              <span>📑</span>
              <span>Export PDF (.pdf)</span>
            </button>

            <div class="px-3 py-1 mt-1 text-[10px] font-mono uppercase tracking-wider text-[#8C8A84] border-t border-b border-[#262624]">
              Complete Bible Outline
            </div>
            <button
              type="button"
              data-export-type="md"
              data-export-scope="all"
              class="export-action-btn w-full text-left px-3 py-2 hover:bg-[#2A2A27] flex items-center gap-2 transition cursor-pointer text-[#A19E97] hover:text-[#EAE8E2]"
            >
              <span>🌐</span>
              <span>All 66 Books (.md)</span>
            </button>
            <button
              type="button"
              data-export-type="pdf"
              data-export-scope="all"
              class="export-action-btn w-full text-left px-3 py-2 hover:bg-[#2A2A27] flex items-center gap-2 transition cursor-pointer text-[#A19E97] hover:text-[#EAE8E2]"
            >
              <span>📑</span>
              <span>All 66 Books (PDF)</span>
            </button>

            <div class="border-t border-[#262624] pt-1 mt-1">
              <button
                type="button"
                id="open-export-modal-btn"
                class="w-full text-left px-3 py-1.5 hover:bg-[#2A2A27] flex items-center gap-1.5 transition cursor-pointer text-[11px] text-[#7B7974] hover:text-[#C4B79C]"
              >
                <span>⚙️</span>
                <span>More Export Options...</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Export Options Modal -->
    <div
      id="export-options-modal"
      class="hidden fixed inset-0 bg-black/75 backdrop-blur-2xs z-50 flex items-center justify-center p-4 text-[#EAE8E2]"
    >
      <div class="bg-[#171715] border border-[#2A2A27] rounded-xl max-w-md w-full p-6 space-y-5 shadow-2xl">
        <div class="flex items-center justify-between border-b border-[#242422] pb-3">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded bg-[#2A2A27] flex items-center justify-center text-xs">📤</span>
            <h3 class="font-serif text-lg font-bold text-[#EAE8E2]">Export Study Outlines</h3>
          </div>
          <button id="close-export-modal-btn" class="text-[#8C8A84] hover:text-[#EAE8E2] text-sm cursor-pointer">✕</button>
        </div>

        <!-- Step 1: Select Format -->
        <div class="space-y-2 text-xs">
          <label class="block font-mono uppercase tracking-wider text-[#A19E97]">1. Select File Format</label>
          <div class="grid grid-cols-2 gap-2.5">
            <label class="flex items-center gap-2.5 p-3 rounded-lg border border-[#2B2B28] bg-[#1C1C1A] hover:bg-[#262623] cursor-pointer transition">
              <input type="radio" name="export-modal-format" value="md" checked class="text-[#C4B79C] focus:ring-0" />
              <div>
                <div class="font-semibold text-[#DBCFB3]">📄 Markdown (.md)</div>
                <div class="text-[11px] text-[#7B7974]">Obsidian / Notion / Text</div>
              </div>
            </label>
            <label class="flex items-center gap-2.5 p-3 rounded-lg border border-[#2B2B28] bg-[#1C1C1A] hover:bg-[#262623] cursor-pointer transition">
              <input type="radio" name="export-modal-format" value="pdf" class="text-[#C4B79C] focus:ring-0" />
              <div>
                <div class="font-semibold text-[#DBCFB3]">📑 PDF Document</div>
                <div class="text-[11px] text-[#7B7974]">Formatted print / PDF</div>
              </div>
            </label>
          </div>
        </div>

        <!-- Step 2: Select Scope -->
        <div class="space-y-2 text-xs">
          <label class="block font-mono uppercase tracking-wider text-[#A19E97]">2. Select Export Scope</label>
          <div class="space-y-2">
            <label class="flex items-center gap-2.5 p-3 rounded-lg border border-[#2B2B28] bg-[#1C1C1A] hover:bg-[#262623] cursor-pointer transition">
              <input type="radio" name="export-modal-scope" value="current" checked class="text-[#C4B79C] focus:ring-0" />
              <div class="flex-1">
                <div class="font-semibold text-[#DBCFB3]">Current Book (${selectedBook.name})</div>
                <div class="text-[11px] text-[#7B7974]">${selectedBook.chapterCount} chapters with notes & summary</div>
              </div>
            </label>
            <label class="flex items-center gap-2.5 p-3 rounded-lg border border-[#2B2B28] bg-[#1C1C1A] hover:bg-[#262623] cursor-pointer transition">
              <input type="radio" name="export-modal-scope" value="all" class="text-[#C4B79C] focus:ring-0" />
              <div class="flex-1">
                <div class="font-semibold text-[#DBCFB3]">Complete Bible Outline</div>
                <div class="text-[11px] text-[#7B7974]">All 66 canonical books (1,189 chapters)</div>
              </div>
            </label>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="flex items-center justify-end gap-2.5 pt-2 border-t border-[#242422]">
          <button id="cancel-export-modal-btn" class="px-3 py-1.5 rounded text-xs text-[#8C8A84] hover:text-[#EAE8E2] transition cursor-pointer">Cancel</button>
          <button id="confirm-export-modal-btn" class="px-4 py-1.5 rounded bg-[#C4B79C] hover:bg-[#DBCFB3] text-[#141413] font-semibold text-xs transition cursor-pointer shadow flex items-center gap-1.5">
            <span>📥 Export</span>
          </button>
        </div>
      </div>
    </div>

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
