import {
  loadOutlineStorage,
  saveOutlineStorage,
  debouncedSaveOutlineStorage,
  exportToMarkdown,
  exportToPrintableHTML,
  printOrSaveToPDF
} from "./storage.js";
import { BIBLE_BOOKS, getBookById } from "../data/bible_catalog.js";
import { fetchESVChapter, extractESVHeadings, formatESVTextToHTML } from "./esv_api.js";
import {
  signInWithGoogleSSO,
  signInWithGoogleRedirect,
  signOutUser,
  listenForAuthChanges,
  preloadFirebaseSDK,
  saveBookToCloud,
  debouncedCloudAutoSaveBook,
  saveQuizToCloud,
  deleteQuizFromCloud,
  clearAllQuizzesFromCloud,
  saveMasteryToCloud,
  saveAllOutlinesToCloud,
  loadOutlinesFromCloud,
  saveOutlinesToCloud,
  debouncedCloudAutoSave
} from "./firebase_sync.js";
import { renderSidebar } from "./components/Sidebar.js";
import { renderTopNavbar } from "./components/TopNavbar.js";
import { renderBookRollupView } from "./components/BookRollupView.js";
import { renderChapterEditorView } from "./components/ChapterEditorView.js";
import { renderDiagnosticQuizView } from "./components/DiagnosticQuizView.js";
import { DiagnosticSession } from "./quiz_engine.js";

// Global map of collapsed states for headings
window.collapsedHeadingsMap = window.collapsedHeadingsMap || {};

class BibleOutlineStudio {
  constructor() {
    this.data = loadOutlineStorage();
    this.selectedBookId = "GEN";
    this.selectedChapterNum = 1;
    this.activeView = "chapter-outliner"; // 'chapter-outliner' (side-by-side) | 'book-rollup' | 'quiz-diagnostic'
    this.splitViewMode = "split"; // 'split' | 'outline' | 'scripture'
    const savedRatio = parseFloat(localStorage.getItem("bibleOutline_splitRatio"));
    this.splitRatio = !isNaN(savedRatio) && savedRatio >= 15 && savedRatio <= 85 ? savedRatio : 50;
    this.bookRollupLayout = localStorage.getItem("bibleOutline_bookRollupLayout") || "grid"; // 'grid' | 'document'
    this.isCollapsed = false;
    this.theme = localStorage.getItem("bibleOutline_theme") || (typeof document !== "undefined" && document.documentElement.classList.contains("light") ? "light" : "dark");
    this.applyTheme(this.theme);

    // Quiz & Diagnostic state
    this.activeQuizTab = "diagnostic"; // 'diagnostic' | 'book-quizzes' | 'history'
    this.quizSession = null;
    this.quizScorecard = null;
    this.viewingPastTest = null;
    this.questionReviewFilter = "all"; // 'all' | 'missed'
    this.historySearchQuery = "";
    this.historyScopeFilter = "ALL";
    this.retakeModalTest = null;
    this.selectedQuizScope = "ALL";
    this.selectedQuizFocus = "all"; // 'all' | 'headings'
    this.selectedQuestionCount = 25;
    this.selectedBookQuizMode = "all"; // 'all' | 'headings'
    this.flagModalData = null;

    // SSO & Cloud Sync state
    this.googleUser = null;
    this.cloudSyncStatus = "";

    // Loading & error state for auto-loading ESV
    this.isLoadingESV = false;
    this.esvErrorMessage = null;

    // Sidebar filters
    this.filterTestament = "ALL";
    this.searchQuery = "";

    this.rootElement = document.getElementById("app");

    // Listen for browser Back & Forward navigation buttons
    window.addEventListener("popstate", () => this.handlePopState());
    window.addEventListener("hashchange", () => this.handlePopState());

    // Restore initial state from URL Hash or set default
    this.syncStateFromHash({ isInitial: true });

    // Listen for persisted Google SSO sign-in session
    listenForAuthChanges((user) => {
      this.googleUser = user;
      if (user) {
        this.cloudSyncStatus = `Synced as ${user.displayName || user.email}`;
        this.syncCloudOutlinesWithLocal(user);
      } else {
        this.cloudSyncStatus = "Not signed in";
      }
      this.render();
    });
  }

  // Two-way synchronization between Firestore cloud outlines & local storage
  async syncCloudOutlinesWithLocal(user) {
    if (!user) return;
    try {
      const cloudData = await loadOutlinesFromCloud(user);
      if (cloudData) {
        let merged = false;

        if (!this.data.books) this.data.books = {};
        if (!this.data.chapters) this.data.chapters = {};

        // 1. Merge Book Summaries & Themes
        if (cloudData.books) {
          for (const [bid, b] of Object.entries(cloudData.books)) {
            if (!b) continue;
            if (!this.data.books[bid]) {
              this.data.books[bid] = { bookSummary: "", myBookTheme: "", updatedAt: null };
            }
            if (b.bookSummary && b.bookSummary.trim()) {
              this.data.books[bid].bookSummary = b.bookSummary;
              merged = true;
            }
            if (b.myBookTheme && b.myBookTheme.trim()) {
              this.data.books[bid].myBookTheme = b.myBookTheme;
              merged = true;
            }
          }
        }

        // 2. Merge Chapters
        if (cloudData.chapters) {
          for (const [cid, ch] of Object.entries(cloudData.chapters)) {
            if (!ch) continue;
            if (!this.data.chapters[cid]) {
              this.data.chapters[cid] = { headingBlocks: [], status: "in-progress" };
            }
            if (!Array.isArray(this.data.chapters[cid].headingBlocks)) {
              this.data.chapters[cid].headingBlocks = [];
            }
            if (ch.takeaway) {
              this.data.chapters[cid].takeaway = ch.takeaway;
              merged = true;
            }
            if (ch.chapterOutlineRichHTML) {
              this.data.chapters[cid].chapterOutlineRichHTML = ch.chapterOutlineRichHTML;
              merged = true;
            }
            if (ch.status && ch.status !== "empty") {
              this.data.chapters[cid].status = ch.status;
            }
            const cloudSections = ch.headingBlocks || ch.sections || [];
            if (Array.isArray(cloudSections) && cloudSections.length > 0) {
              cloudSections.forEach((cs, sIdx) => {
                if (!cs) return;
                const csHeading = (cs.heading || "").trim();
                let match = this.data.chapters[cid].headingBlocks.find(
                  (hb) => hb && hb.heading && csHeading && hb.heading.toLowerCase() === csHeading.toLowerCase()
                );
                if (!match && this.data.chapters[cid].headingBlocks[sIdx]) {
                  match = this.data.chapters[cid].headingBlocks[sIdx];
                }

                const pts = Array.isArray(cs.points) && cs.points.length > 0
                  ? cs.points.map((p) => (p || "").trim()).filter(Boolean)
                  : cs.notes
                  ? cs.notes.split("\n").map((p) => p.replace(/^[•\-\*]\s*/, "").trim()).filter(Boolean)
                  : [""];
                const nts = cs.notes || (pts.filter(Boolean).length > 0 ? pts.join("\n") : "");

                if (match) {
                  if (pts.filter(Boolean).length > 0) {
                    match.points = pts;
                  }
                  if (nts.trim().length > 0) {
                    match.notes = nts;
                  }
                  if (cs.verses) match.verses = cs.verses;
                } else {
                  this.data.chapters[cid].headingBlocks.push({
                    heading: csHeading || "Section",
                    verses: cs.verses || "",
                    notes: nts,
                    points: pts
                  });
                }
              });
              merged = true;
            }
          }
        }

        // 3. Merge Quiz History
        if (Array.isArray(cloudData.quizHistory) && cloudData.quizHistory.length > 0) {
          if (!Array.isArray(this.data.quizHistory)) this.data.quizHistory = [];
          const existingIds = new Set(this.data.quizHistory.map((q) => q.id || `${q.date}`));
          cloudData.quizHistory.forEach((q) => {
            const qKey = q.id || `${q.date}`;
            if (!existingIds.has(qKey)) {
              this.data.quizHistory.push(q);
              existingIds.add(qKey);
              merged = true;
            }
          });
          this.data.quizHistory.sort((a, b) => (b.date || 0) - (a.date || 0));
        }

        // 4. Merge Book Mastery
        if (cloudData.bookMastery && typeof cloudData.bookMastery === "object") {
          this.data.bookMastery = { ...this.data.bookMastery, ...cloudData.bookMastery };
          merged = true;
        }

        if (merged) {
          saveOutlineStorage(this.data);
          this.render();
        }
      }
      await saveAllOutlinesToCloud(user, this.data);
    } catch (err) {
      console.warn("Cloud sync error:", err);
    }
  }

  notifyDataChanged(bookId = null) {
    const saveBadge = document.getElementById("editor-save-indicator");
    if (saveBadge) {
      saveBadge.innerHTML = `<span class="text-[#A19E97]">⏳</span><span class="text-[#A19E97]">Saving...</span>`;
    }
    debouncedSaveOutlineStorage(this.data, 200);
    setTimeout(() => {
      if (saveBadge && !this.googleUser) {
        saveBadge.innerHTML = `<span class="text-[#34A853]">✓</span><span class="text-[#34A853]">Saved locally</span>`;
      }
    }, 300);

    if (this.googleUser) {
      const targetBook = bookId || this.selectedBookId || "GEN";
      debouncedCloudAutoSaveBook(
        this.googleUser,
        targetBook,
        this.data,
        (status) => {
          this.cloudSyncStatus = status;
          const ssoBtn = document.getElementById("open-cloud-sso-btn");
          if (ssoBtn) {
            ssoBtn.innerHTML = `<span class="text-[10px]">🟢</span><span>${
              this.googleUser.displayName || "Google"
            } • ${status}</span>`;
          }
          if (saveBadge && status.includes("saved to cloud")) {
            saveBadge.innerHTML = `<span class="text-[#34A853]">🟢</span><span class="text-[#34A853]">Saved to cloud</span>`;
          }
        },
        800
      );
    }
  }

  getSelectedBook() {
    return getBookById(this.selectedBookId) || BIBLE_BOOKS[0];
  }

  // Synchronize headingBlocks with ESV Scripture text
  syncHeadingBlocksForChapter(chKey, text, bookName, chNum, force = false) {
    if (!text) return;
    if (!this.data.chapters[chKey]) {
      this.data.chapters[chKey] = {
        headingBlocks: [],
        chapterScripture: text,
        status: "empty"
      };
    }

    // If not forced and headingBlocks is already initialized, keep existing blocks
    if (!force && Array.isArray(this.data.chapters[chKey].headingBlocks) && this.data.chapters[chKey].headingBlocks.length > 0) {
      this.data.chapters[chKey].chapterScripture = text;
      return;
    }

    const extracted = extractESVHeadings(text, `${bookName} ${chNum}`);
    const existing = Array.isArray(this.data.chapters[chKey]?.headingBlocks)
      ? this.data.chapters[chKey].headingBlocks
      : [];

    const synced = extracted.map((h, idx) => {
      const matchTitle = existing.find(
        (eb) => eb && eb.heading && h.heading && eb.heading.toLowerCase() === h.heading.toLowerCase() && !eb.heading.includes("Overview")
      );
      const matchIdx = existing[idx];
      const pts = matchTitle?.points || matchIdx?.points || [""];
      const nts = matchTitle?.notes || matchIdx?.notes || (Array.isArray(pts) ? pts.join("\n") : "");
      return {
        heading: h.heading,
        verses: h.verses,
        notes: nts,
        points: pts
      };
    });

    const currentRichHTML = this.data.chapters[chKey]?.chapterOutlineRichHTML;
    const currentStatus = this.data.chapters[chKey]?.status || "empty";

    this.data.chapters[chKey].headingBlocks = synced;
    this.data.chapters[chKey].chapterScripture = text;
    if (currentRichHTML) {
      this.data.chapters[chKey].chapterOutlineRichHTML = currentRichHTML;
    }
  }

  // Auto-loads ESV text for the current chapter and syncs section headings
  async autoLoadESVForCurrentChapter(forceRefresh = false) {
    const book = this.getSelectedBook();
    const chKey = `${book.id}-${this.selectedChapterNum}`;
    const chData = this.data.chapters[chKey] || {};

    if (!forceRefresh && chData.chapterScripture && chData.chapterScripture.trim().length > 0) {
      this.syncHeadingBlocksForChapter(chKey, chData.chapterScripture, book.name, this.selectedChapterNum, false);
      return;
    }

    this.isLoadingESV = true;
    this.esvErrorMessage = null;
    this.render();

    try {
      const text = await fetchESVChapter(book.name, this.selectedChapterNum);
      if (!this.data.chapters[chKey]) {
        this.data.chapters[chKey] = {
          headingBlocks: [],
          chapterScripture: "",
          takeaway: "",
          status: "empty"
        };
      }
      this.data.chapters[chKey].chapterScripture = text;
      this.syncHeadingBlocksForChapter(chKey, text, book.name, this.selectedChapterNum, forceRefresh);
      saveOutlineStorage(this.data);
    } catch (err) {
      console.warn("Failed to auto-load ESV chapter:", err);
      this.esvErrorMessage = err.message || "Could not connect to ESV API.";
    } finally {
      this.isLoadingESV = false;
      this.render();
    }
  }

  // Save active editor canvas back to data state synchronously before changing chapter/book
  saveActiveChapterEditorBeforeSwitch() {
    const richEditor = document.getElementById("chapter-rich-outline-editor");
    if (!richEditor) return;

    const chKey = `${this.selectedBookId}-${this.selectedChapterNum}`;
    if (!this.data.chapters[chKey]) {
      this.data.chapters[chKey] = { headingBlocks: [], status: "empty" };
    }

    if (!Array.isArray(this.data.chapters[chKey].headingBlocks)) {
      this.data.chapters[chKey].headingBlocks = [];
    }

    const titleInputs = richEditor.querySelectorAll(".heading-title-input");
    titleInputs.forEach((input) => {
      const hIdx = parseInt(input.getAttribute("data-heading-title-input"), 10);
      if (this.data.chapters[chKey].headingBlocks[hIdx]) {
        this.data.chapters[chKey].headingBlocks[hIdx].heading = input.value;
      }
    });

    const versesInputs = richEditor.querySelectorAll(".heading-verses-input");
    versesInputs.forEach((input) => {
      const hIdx = parseInt(input.getAttribute("data-heading-verses-input"), 10);
      if (this.data.chapters[chKey].headingBlocks[hIdx]) {
        this.data.chapters[chKey].headingBlocks[hIdx].verses = input.value;
      }
    });

    const canvases = richEditor.querySelectorAll(".section-bullet-canvas");
    canvases.forEach((canvas) => {
      const hIdx = parseInt(canvas.getAttribute("data-section-editor"), 10);
      const block = this.data.chapters[chKey].headingBlocks[hIdx];
      if (block) {
        const lis = Array.from(canvas.querySelectorAll("li"))
          .map((li) => li.innerText.trim())
          .filter((p) => p.length > 0);
        block.points = lis;
        block.notes = lis.join("\n");
      }
    });

    saveOutlineStorage(this.data);
  }

  // Get canonical URL hash for current or specified state
  getHashForState({
    activeView = this.activeView,
    bookId = this.selectedBookId,
    chapterNum = this.selectedChapterNum,
    activeQuizTab = this.activeQuizTab,
    viewingPastTest = this.viewingPastTest,
    selectedQuizBookId = this.selectedQuizBookId
  } = {}) {
    if (activeView === "book-rollup") {
      return `#/book/${bookId}`;
    }
    if (activeView === "quiz-diagnostic") {
      if (viewingPastTest) {
        const tId = viewingPastTest.id || `hist_${viewingPastTest.date || ""}`;
        return `#/quiz/history/${tId}`;
      }
      if (activeQuizTab === "book-quizzes") {
        return selectedQuizBookId ? `#/quiz/book-quizzes/${selectedQuizBookId}` : `#/quiz/book-quizzes`;
      }
      if (activeQuizTab === "history") {
        return `#/quiz/history`;
      }
      return `#/quiz/diagnostic`;
    }
    return `#/${bookId}/${chapterNum}`;
  }

  // Navigate to new state and manage browser history stack
  navigateTo(options = {}, { push = true, forceLoadESV = false } = {}) {
    this.saveActiveChapterEditorBeforeSwitch();

    let bookChanged = false;
    let chapterChanged = false;

    if (options.bookId && options.bookId !== this.selectedBookId) {
      this.selectedBookId = options.bookId;
      bookChanged = true;
    }
    if (options.chapterNum !== undefined && parseInt(options.chapterNum, 10) !== this.selectedChapterNum) {
      this.selectedChapterNum = parseInt(options.chapterNum, 10);
      chapterChanged = true;
    }
    if (options.activeView !== undefined && options.activeView !== this.activeView) {
      this.activeView = options.activeView;
    }
    if (options.activeQuizTab !== undefined && options.activeQuizTab !== this.activeQuizTab) {
      this.activeQuizTab = options.activeQuizTab;
    }
    if (options.viewingPastTest !== undefined) {
      this.viewingPastTest = options.viewingPastTest;
    }
    if (options.selectedQuizBookId !== undefined) {
      this.selectedQuizBookId = options.selectedQuizBookId;
    }

    const targetHash = this.getHashForState();
    if (window.location.hash !== targetHash) {
      if (push) {
        window.history.pushState({ hash: targetHash }, "", targetHash);
      } else {
        window.history.replaceState({ hash: targetHash }, "", targetHash);
      }
    }

    this.render();

    if (bookChanged || chapterChanged || forceLoadESV) {
      this.autoLoadESVForCurrentChapter();
    }
  }

  // Handle browser Back / Forward buttons (popstate)
  handlePopState() {
    this.saveActiveChapterEditorBeforeSwitch();
    this.syncStateFromHash({ isInitial: false });
  }

  // Parse window.location.hash and sync application state
  syncStateFromHash({ isInitial = false } = {}) {
    const rawHash = window.location.hash.trim().replace(/^#\/?/, "");
    if (!rawHash) {
      // Set default URL hash without adding extra history item
      const defaultHash = this.getHashForState();
      window.history.replaceState({ hash: defaultHash }, "", defaultHash);
      if (isInitial) {
        this.render();
        this.autoLoadESVForCurrentChapter(true);
      }
      return;
    }

    const parts = rawHash.split("/").map((p) => decodeURIComponent(p).trim()).filter(Boolean);
    const firstPart = parts[0]?.toLowerCase();

    let bookChanged = false;
    let chapterChanged = false;

    if (firstPart === "book" || firstPart === "rollup") {
      // #/book/:bookId
      this.activeView = "book-rollup";
      const bId = parts[1]?.toUpperCase();
      if (bId && getBookById(bId)) {
        if (this.selectedBookId !== bId) {
          this.selectedBookId = bId;
          this.selectedChapterNum = 1;
          bookChanged = true;
        }
      }
    } else if (firstPart === "quiz" || firstPart === "quiz-diagnostic") {
      // #/quiz/:tab
      this.activeView = "quiz-diagnostic";
      const tab = parts[1]?.toLowerCase();
      if (tab === "history") {
        this.activeQuizTab = "history";
        const testId = parts[2];
        if (testId) {
          const found = Array.isArray(this.data.quizHistory)
            ? this.data.quizHistory.find(
                (t, idx) =>
                  String(t.id) === String(testId) ||
                  String(t.date) === String(testId) ||
                  `quiz_${t.date}` === String(testId) ||
                  `hist_${t.date}` === String(testId) ||
                  `quiz_${t.date || idx}` === String(testId) ||
                  `hist_${t.date || idx}` === String(testId) ||
                  String(idx) === String(testId)
              )
            : null;
          this.viewingPastTest = found || null;
        } else {
          this.viewingPastTest = null;
        }
      } else if (tab === "book-quizzes" || tab === "book") {
        this.activeQuizTab = "book-quizzes";
        this.viewingPastTest = null;
        if (parts[2]) {
          this.selectedQuizBookId = parts[2].toUpperCase();
        }
      } else {
        this.activeQuizTab = "diagnostic";
        this.viewingPastTest = null;
      }
    } else if (firstPart === "chapter" && parts.length >= 2) {
      // #/chapter/:bookId/:chapterNum
      this.activeView = "chapter-outliner";
      const bId = parts[1]?.toUpperCase();
      const chNum = parseInt(parts[2], 10) || 1;
      const bObj = getBookById(bId);
      if (bObj) {
        if (this.selectedBookId !== bObj.id) {
          this.selectedBookId = bObj.id;
          bookChanged = true;
        }
        const validCh = Math.max(1, Math.min(chNum, bObj.chapterCount));
        if (this.selectedChapterNum !== validCh) {
          this.selectedChapterNum = validCh;
          chapterChanged = true;
        }
      }
    } else {
      // #/:bookId or #/:bookId/:chapterNum (e.g. #/GEN/1, #/ROM/8, #/MAT)
      const bId = parts[0]?.toUpperCase();
      const bObj = getBookById(bId);
      if (bObj) {
        this.activeView = "chapter-outliner";
        if (this.selectedBookId !== bObj.id) {
          this.selectedBookId = bObj.id;
          bookChanged = true;
        }
        const chNum = parseInt(parts[1], 10) || 1;
        const validCh = Math.max(1, Math.min(chNum, bObj.chapterCount));
        if (this.selectedChapterNum !== validCh) {
          this.selectedChapterNum = validCh;
          chapterChanged = true;
        }
      }
    }

    this.render();

    if (isInitial || bookChanged || chapterChanged) {
      this.autoLoadESVForCurrentChapter(isInitial);
    }
  }

  // Synchronized step to previous chapter / previous book with browser history
  stepToPrevChapter() {
    const book = this.getSelectedBook();
    if (this.selectedChapterNum > 1) {
      this.navigateTo({
        bookId: this.selectedBookId,
        chapterNum: this.selectedChapterNum - 1,
        activeView: "chapter-outliner"
      });
    } else {
      const bookIdx = BIBLE_BOOKS.findIndex((b) => b.id === book.id);
      if (bookIdx > 0) {
        const prevBook = BIBLE_BOOKS[bookIdx - 1];
        this.navigateTo({
          bookId: prevBook.id,
          chapterNum: prevBook.chapterCount,
          activeView: "chapter-outliner"
        });
      }
    }
  }

  // Synchronized step to next chapter / next book with browser history
  stepToNextChapter() {
    const book = this.getSelectedBook();
    if (this.selectedChapterNum < book.chapterCount) {
      this.navigateTo({
        bookId: this.selectedBookId,
        chapterNum: this.selectedChapterNum + 1,
        activeView: "chapter-outliner"
      });
    } else {
      const bookIdx = BIBLE_BOOKS.findIndex((b) => b.id === book.id);
      if (bookIdx < BIBLE_BOOKS.length - 1) {
        const nextBook = BIBLE_BOOKS[bookIdx + 1];
        this.navigateTo({
          bookId: nextBook.id,
          chapterNum: 1,
          activeView: "chapter-outliner"
        });
      }
    }
  }

  render() {
    try {
      console.log("📖 Rendering Bible Outline Studio...");
      this.rootElement = document.getElementById("app");
      if (!this.rootElement) {
        console.warn("⚠️ #app element not found! Creating or falling back to document.body...");
        this.rootElement = document.createElement("div");
        this.rootElement.id = "app";
        document.body.appendChild(this.rootElement);
      }

      const book = this.getSelectedBook();

      this.rootElement.innerHTML = `
        <div class="flex h-screen w-screen overflow-hidden bg-[#141413] font-sans text-[#EAE8E2]">
          <!-- Sidebar -->
          <div id="sidebar-container" class="h-full shrink-0">
            ${renderSidebar({
              selectedBookId: this.selectedBookId,
              filterTestament: this.filterTestament,
              searchQuery: this.searchQuery,
              data: this.data,
              isCollapsed: this.isCollapsed
            })}
          </div>

          <!-- Main Content Column -->
          <div class="flex-1 flex flex-col h-full overflow-hidden">
            <!-- Top Navbar -->
            ${renderTopNavbar({
              activeView: this.activeView,
              selectedBook: book,
              selectedChapterNum: this.selectedChapterNum,
              googleUser: this.googleUser,
              cloudSyncStatus: this.cloudSyncStatus,
              theme: this.theme
            })}

            <!-- Main Scrollable Canvas -->
            <main id="main-scroll-canvas" class="flex-1 flex flex-col overflow-hidden bg-[#161614]">
              ${
                this.activeView === "quiz-diagnostic"
                  ? renderDiagnosticQuizView({
                      activeQuizTab: this.activeQuizTab,
                      session: this.quizSession,
                      scorecard: this.quizScorecard,
                      viewingPastTest: this.viewingPastTest,
                      questionReviewFilter: this.questionReviewFilter,
                      selectedScope: this.selectedQuizScope,
                      selectedQuizFocus: this.selectedQuizFocus,
                      selectedQuestionCount: this.selectedQuizQuestionCount,
                      selectedBookId: this.selectedBookId,
                      selectedBookQuizMode: this.selectedBookQuizMode,
                      historySearchQuery: this.historySearchQuery,
                      historyScopeFilter: this.historyScopeFilter,
                      retakeModalTest: this.retakeModalTest,
                      flagModalData: this.flagModalData,
                      data: this.data
                    })
                  : this.activeView === "book-rollup"
                  ? renderBookRollupView({
                      selectedBook: book,
                      data: this.data,
                      rollupLayout: this.bookRollupLayout || "document"
                    })
                  : renderChapterEditorView({
                      selectedBook: book,
                      chapterNum: this.selectedChapterNum,
                      splitViewMode: this.splitViewMode,
                      splitRatio: this.splitRatio,
                      isLoadingESV: this.isLoadingESV,
                      esvErrorMessage: this.esvErrorMessage,
                      data: this.data
                    })
              }
            </main>
          </div>
        </div>
      `;

      this.attachEventListeners();
    } catch (err) {
      console.error("Studio Render Error:", err);
      this.rootElement.innerHTML = `
        <div class="h-screen w-screen flex flex-col items-center justify-center bg-[#141413] text-[#EAE8E2] p-8 space-y-5 font-mono">
          <div class="text-[#E57373] text-2xl font-bold flex items-center gap-2">
            <span>⚠️ Studio Render Error</span>
          </div>
          <div class="bg-[#1C1C1A] border border-[#2B2B28] p-4 rounded max-w-2xl w-full text-xs text-[#EAE8E2] whitespace-pre-wrap overflow-x-auto">
            ${err.stack || err.message}
          </div>
          <button id="reset-app-storage-btn" class="px-5 py-2.5 bg-[#C4B79C] hover:bg-[#DBCFB3] text-[#141413] rounded font-semibold transition">
            Reset Application Storage & Reload
          </button>
        </div>
      `;
      const resetBtn = document.getElementById("reset-app-storage-btn");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          localStorage.clear();
          window.location.reload();
        });
      }
    }
  }

  attachEventListeners() {
    const book = this.getSelectedBook();
    const chKey = `${this.selectedBookId}-${this.selectedChapterNum}`;

    // 1. Sidebar interactions
    const toggleSidebarBtn = document.getElementById("toggle-sidebar-btn");
    if (toggleSidebarBtn) {
      toggleSidebarBtn.addEventListener("click", () => {
        this.isCollapsed = !this.isCollapsed;
        this.render();
      });
    }

    const testamentBtns = document.querySelectorAll(".filter-testament-btn");
    testamentBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.filterTestament = btn.getAttribute("data-testament");
        this.render();
      });
    });

    const searchInput = document.getElementById("sidebar-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value;
        this.render();
      });
    }

    const bookCards = document.querySelectorAll(".book-nav-card");
    bookCards.forEach((card) => {
      card.addEventListener("click", () => {
        const bId = card.getAttribute("data-book-id");
        this.navigateTo({
          bookId: bId,
          chapterNum: 1,
          activeView: "chapter-outliner"
        });
      });
    });

    // 2. Navbar view switchers & Theme Toggle
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener("click", () => {
        this.toggleTheme();
      });
    }

    const studioViewBtns = document.querySelectorAll(".studio-view-btn");
    studioViewBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.navigateTo({
          activeView: btn.getAttribute("data-view")
        });
      });
    });

    // Book Rollup View layout switcher (Document vs Grid)
    const setRollupLayoutBtns = document.querySelectorAll(".set-rollup-layout-btn");
    setRollupLayoutBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const layout = btn.getAttribute("data-set-rollup-layout") || "document";
        this.bookRollupLayout = layout;
        localStorage.setItem("bibleOutline_bookRollupLayout", layout);
        this.render();
      });
    });

    // Book Rollup View export buttons (exports in the active layout)
    const exportBookMdBtns = document.querySelectorAll(".export-book-md-btn");
    exportBookMdBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const bId = btn.getAttribute("data-export-book-md");
        const layout = btn.getAttribute("data-export-layout") || this.bookRollupLayout || "document";
        this.saveActiveChapterEditorBeforeSwitch();
        const targetBook = getBookById(bId) || book;
        const md = exportToMarkdown(this.data, bId, layout);
        const layoutSuffix = layout === "grid" ? "_Grid" : "";
        this.downloadFile(`${targetBook.shortName}_Outline${layoutSuffix}.md`, md, "text/markdown");
      });
    });

    const exportBookPdfBtns = document.querySelectorAll(".export-book-pdf-btn");
    exportBookPdfBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const bId = btn.getAttribute("data-export-book-pdf");
        const layout = btn.getAttribute("data-export-layout") || this.bookRollupLayout || "document";
        this.saveActiveChapterEditorBeforeSwitch();
        printOrSaveToPDF(this.data, bId, layout);
      });
    });

    const exportAllBooksPdfBtns = document.querySelectorAll(".export-all-books-pdf-btn");
    exportAllBooksPdfBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const layout = btn.getAttribute("data-export-layout") || this.bookRollupLayout || "document";
        this.saveActiveChapterEditorBeforeSwitch();
        printOrSaveToPDF(this.data, null, layout);
      });
    });

    // Google SSO & Cloud Sync Modal
    const openSsoBtn = document.getElementById("open-cloud-sso-btn");
    const closeSsoBtn = document.getElementById("close-cloud-sso-modal-btn");
    const ssoModal = document.getElementById("cloud-sso-modal");

    if (openSsoBtn) {
      openSsoBtn.addEventListener("click", async () => {
        if (!this.googleUser) {
          try {
            openSsoBtn.disabled = true;
            openSsoBtn.innerHTML = `<span>⏳ Opening Google Sign-In...</span>`;
            const user = await signInWithGoogleSSO();
            this.googleUser = user;
            this.cloudSyncStatus = `Signed in as ${user.displayName || user.email}`;
            await this.syncCloudOutlinesWithLocal(user);
            this.render();
          } catch (err) {
            console.error("Google Sign-In Error:", err);
            alert(
              `Google Sign-In Error:\n${err.message}\n\nNote: If you are testing on Vercel, remember to add your Vercel domain (e.g., vercel.app) to console.firebase.google.com -> Authentication -> Settings -> Authorized domains.`
            );
            this.cloudSyncStatus = `Notice: ${err.message}`;
            this.render();
          }
        } else if (ssoModal) {
          ssoModal.classList.remove("hidden");
        }
      });
    }
    if (closeSsoBtn && ssoModal) {
      closeSsoBtn.addEventListener("click", () => {
        ssoModal.classList.add("hidden");
      });
    }

    const signInBtn = document.getElementById("sso-signin-google-btn");
    if (signInBtn) {
      signInBtn.addEventListener("click", async () => {
        try {
          signInBtn.disabled = true;
          signInBtn.innerHTML = `<span>⏳ Opening Google Pop-Up...</span>`;
          const user = await signInWithGoogleSSO();
          this.googleUser = user;
          this.cloudSyncStatus = `Signed in as ${user.displayName || user.email}`;
          await this.syncCloudOutlinesWithLocal(user);
          this.render();
        } catch (err) {
          console.error("Google SSO Error:", err);
          alert(
            `Google Pop-Up Error:\n${err.message}\n\nTip: You can try clicking "Sign in via Full Page Redirect" directly below.`
          );
          this.cloudSyncStatus = `Notice: ${err.message}`;
          this.render();
        }
      });
    }

    const redirectBtn = document.getElementById("sso-signin-google-redirect-btn");
    if (redirectBtn) {
      redirectBtn.addEventListener("click", async () => {
        redirectBtn.disabled = true;
        redirectBtn.innerHTML = `<span>Redirecting to Google...</span>`;
        await signInWithGoogleRedirect();
      });
    }

    const signOutBtn = document.getElementById("sso-signout-btn");
    if (signOutBtn) {
      signOutBtn.addEventListener("click", async () => {
        await signOutUser();
        this.googleUser = null;
        this.cloudSyncStatus = "Signed out of Google SSO.";
        this.render();
      });
    }

    const backupBtn = document.getElementById("sso-backup-cloud-btn");
    if (backupBtn) {
      backupBtn.addEventListener("click", async () => {
        try {
          this.cloudSyncStatus = "Backing up outlines to Firebase Cloud...";
          this.render();
          await saveOutlinesToCloud(this.googleUser, this.data);
          this.cloudSyncStatus = "✓ All outlines backed up to Firebase Cloud!";
          this.render();
        } catch (err) {
          this.cloudSyncStatus = `Error backing up: ${err.message}`;
          this.render();
        }
      });
    }

    const restoreBtn = document.getElementById("sso-restore-cloud-btn");
    if (restoreBtn) {
      restoreBtn.addEventListener("click", async () => {
        try {
          this.cloudSyncStatus = "Restoring outlines from Firebase Cloud...";
          this.render();
          const cloudData = await loadOutlinesFromCloud(this.googleUser);
          if (cloudData) {
            await this.syncCloudOutlinesWithLocal(this.googleUser);
            this.cloudSyncStatus = "✓ Outlines restored from Firebase Cloud!";
            this.render();
          } else {
            this.cloudSyncStatus = "No cloud backup found for this account yet.";
            this.render();
          }
        } catch (err) {
          this.cloudSyncStatus = `Error restoring: ${err.message}`;
          this.render();
        }
      });
    }

    // Overall Book Summary Box toggle & auto-save
    const toggleBookSummaryBtn = document.getElementById("toggle-book-summary-box-btn");
    const hideBookSummaryBtn = document.getElementById("hide-book-summary-box-btn");
    const summaryCollapsible = document.getElementById("book-summary-collapsible");
    const quickSummaryArea = document.getElementById("quick-book-summary-textarea");

    if (toggleBookSummaryBtn && summaryCollapsible) {
      toggleBookSummaryBtn.addEventListener("click", () => {
        summaryCollapsible.classList.toggle("hidden");
        if (!summaryCollapsible.classList.contains("hidden") && quickSummaryArea) {
          quickSummaryArea.focus();
        }
      });
    }
    if (hideBookSummaryBtn && summaryCollapsible) {
      hideBookSummaryBtn.addEventListener("click", () => {
        summaryCollapsible.classList.add("hidden");
      });
    }
    if (quickSummaryArea) {
      quickSummaryArea.addEventListener("input", (e) => {
        if (!this.data.books[this.selectedBookId]) {
          this.data.books[this.selectedBookId] = { bookSummary: "" };
        }
        this.data.books[this.selectedBookId].bookSummary = e.target.value;
        this.notifyDataChanged();
      });
    }

    // 3. Book Rollup View interactions
    const bookSummaryArea = document.getElementById("book-summary-textarea");
    if (bookSummaryArea) {
      bookSummaryArea.addEventListener("input", (e) => {
        if (!this.data.books[this.selectedBookId]) {
          this.data.books[this.selectedBookId] = { bookSummary: "" };
        }
        this.data.books[this.selectedBookId].bookSummary = e.target.value;
        this.notifyDataChanged();
      });
    }

    const openChapterEditorBtns = document.querySelectorAll(".open-chapter-editor-btn");
    openChapterEditorBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.saveActiveChapterEditorBeforeSwitch();
        const ch = parseInt(btn.getAttribute("data-chapter-num"), 10);
        this.selectedChapterNum = ch;
        this.activeView = "chapter-outliner";
        this.render();
        this.autoLoadESVForCurrentChapter();
      });
    });

    const quickChapterPills = document.querySelectorAll(".quick-chapter-pill");
    quickChapterPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        this.saveActiveChapterEditorBeforeSwitch();
        const ch = parseInt(pill.getAttribute("data-quick-ch"), 10);
        this.selectedChapterNum = ch;
        this.render();
        this.autoLoadESVForCurrentChapter();
      });
    });

    // 4. Chapter Outline & Side-by-Side Scripture Reader interactions
    // Toggle Collapse / Expand per Heading Bar
    const toggleHeadingBars = document.querySelectorAll(".toggle-heading-bar");
    toggleHeadingBars.forEach((bar) => {
      bar.addEventListener("click", (e) => {
        // Prevent toggle if clicking bullet button
        if (e.target.closest(".heading-insert-bullet-btn")) return;
        const idx = parseInt(bar.getAttribute("data-toggle-heading"), 10);
        if (!window.collapsedHeadingsMap[chKey]) {
          window.collapsedHeadingsMap[chKey] = {};
        }
        window.collapsedHeadingsMap[chKey][idx] = !window.collapsedHeadingsMap[chKey][idx];
        this.render();
      });
    });

    // Expand All / Collapse All buttons
    const expandAllBtn = document.getElementById("expand-all-headings-btn");
    if (expandAllBtn) {
      expandAllBtn.addEventListener("click", () => {
        window.collapsedHeadingsMap[chKey] = {};
        this.render();
      });
    }

    const collapseAllBtn = document.getElementById("collapse-all-headings-btn");
    if (collapseAllBtn) {
      collapseAllBtn.addEventListener("click", () => {
        const blocks = this.data.chapters[chKey]?.headingBlocks || [];
        if (!window.collapsedHeadingsMap[chKey]) {
          window.collapsedHeadingsMap[chKey] = {};
        }
        blocks.forEach((_, idx) => {
          window.collapsedHeadingsMap[chKey][idx] = true;
        });
        this.render();
      });
    }

    // Add Header Functionality
    const handleAddHeader = (insertIdx = null) => {
      this.saveActiveChapterEditorBeforeSwitch();

      if (!this.data.chapters[chKey]) {
        this.data.chapters[chKey] = { headingBlocks: [], status: "in-progress" };
      }
      if (!Array.isArray(this.data.chapters[chKey].headingBlocks)) {
        this.data.chapters[chKey].headingBlocks = [];
      }

      const newBlock = {
        heading: "New Section",
        verses: "",
        notes: "",
        points: [""]
      };

      if (typeof insertIdx === "number" && insertIdx >= 0) {
        this.data.chapters[chKey].headingBlocks.splice(insertIdx + 1, 0, newBlock);
      } else {
        this.data.chapters[chKey].headingBlocks.push(newBlock);
      }

      if (this.data.chapters[chKey].status === "empty") {
        this.data.chapters[chKey].status = "in-progress";
      }

      this.notifyDataChanged();
      this.render();

      // Automatically focus and select the title input of the new header
      const targetIdx =
        typeof insertIdx === "number" && insertIdx >= 0
          ? insertIdx + 1
          : this.data.chapters[chKey].headingBlocks.length - 1;
      setTimeout(() => {
        const titleInput = document.querySelector(
          `.heading-title-input[data-heading-title-input="${targetIdx}"]`
        );
        if (titleInput) {
          titleInput.focus();
          titleInput.select();
        }
      }, 50);
    };

    const addHeadingBtns = document.querySelectorAll(
      "#add-heading-btn, #bottom-add-heading-btn, #empty-add-heading-btn, #add-custom-heading-btn"
    );
    addHeadingBtns.forEach((btn) => {
      btn.addEventListener("click", () => handleAddHeader());
    });

    const insertAfterBtns = document.querySelectorAll(".insert-heading-after-btn");
    insertAfterBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.getAttribute("data-insert-heading-after"), 10);
        handleAddHeader(idx);
      });
    });

    // Delete Header Functionality
    const deleteHeadingBtns = document.querySelectorAll(".delete-heading-btn");
    deleteHeadingBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.getAttribute("data-delete-heading"), 10);
        const block = this.data.chapters[chKey]?.headingBlocks?.[idx];
        if (!block) return;

        this.saveActiveChapterEditorBeforeSwitch();

        const hasContent = Array.isArray(block.points)
          ? block.points.some((p) => p && p.trim().length > 0)
          : Boolean(block.notes && block.notes.trim().length > 0);

        if (hasContent) {
          const ok = confirm(`Delete header "${block.heading || "Section"}" and its notes?`);
          if (!ok) return;
        }

        this.data.chapters[chKey].headingBlocks.splice(idx, 1);
        if (window.collapsedHeadingsMap?.[chKey]) {
          delete window.collapsedHeadingsMap[chKey][idx];
        }
        this.notifyDataChanged();
        this.render();
      });
    });

    // Inline Header Title & Verses Input Handlers
    const headingTitleInputs = document.querySelectorAll(".heading-title-input");
    headingTitleInputs.forEach((input) => {
      input.addEventListener("click", (e) => e.stopPropagation());
      input.addEventListener("input", () => {
        const idx = parseInt(input.getAttribute("data-heading-title-input"), 10);
        if (this.data.chapters[chKey]?.headingBlocks?.[idx]) {
          this.data.chapters[chKey].headingBlocks[idx].heading = input.value;
          if (this.data.chapters[chKey].status === "empty") {
            this.data.chapters[chKey].status = "in-progress";
          }
          this.notifyDataChanged();
        }
      });
    });

    const headingVersesInputs = document.querySelectorAll(".heading-verses-input");
    headingVersesInputs.forEach((input) => {
      input.addEventListener("click", (e) => e.stopPropagation());
      input.addEventListener("input", () => {
        const idx = parseInt(input.getAttribute("data-heading-verses-input"), 10);
        if (this.data.chapters[chKey]?.headingBlocks?.[idx]) {
          this.data.chapters[chKey].headingBlocks[idx].verses = input.value;
          this.notifyDataChanged();
        }
      });
    });

    // Refresh / Reset ESV headings buttons
    const handleRestoreESVHeadings = () => {
      const ok = confirm("Reset outline headers to the official ESV section headings for this chapter?");
      if (!ok) return;

      const text = this.data.chapters[chKey]?.chapterScripture;
      const book = this.getSelectedBook();
      if (text) {
        this.syncHeadingBlocksForChapter(chKey, text, book.name, this.selectedChapterNum, true);
        this.notifyDataChanged();
      } else {
        this.autoLoadESVForCurrentChapter(true);
      }
      this.render();
    };

    const reinsertHeadingsBtns = document.querySelectorAll(
      "#reinsert-esv-headings-btn, #empty-restore-esv-btn"
    );
    reinsertHeadingsBtns.forEach((btn) => {
      btn.addEventListener("click", handleRestoreESVHeadings);
    });

    const refreshESVBtn = document.getElementById("refresh-esv-btn");
    if (refreshESVBtn) {
      refreshESVBtn.addEventListener("click", () => {
        this.autoLoadESVForCurrentChapter(true);
      });
    }

    // Track active section canvas so toolbar operations target the currently edited section
    let lastActiveSectionCanvas = null;
    const updateActiveSectionCanvas = (canvas) => {
      if (canvas && canvas.classList.contains("section-bullet-canvas")) {
        lastActiveSectionCanvas = canvas;
      }
    };

    // Helper to guarantee a bulleted list (<ul><li>...</li></ul>) in a section canvas
    const ensureSectionBulletedList = (canvas) => {
      if (!canvas) return;
      const hasUl = canvas.querySelector("ul, ol");
      if (!hasUl) {
        const text = canvas.textContent.trim();
        canvas.innerHTML = `<ul style="list-style-type: disc; margin-left: 1.5rem;"><li>${
          text || "<br>"
        }</li></ul>`;
      }
      
      // If cursor/selection is already inside this canvas, preserve position
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        const anchorNode = sel.anchorNode;
        if (anchorNode && canvas.contains(anchorNode)) {
          return;
        }
      }

      // Otherwise place cursor inside the target list item
      const lis = canvas.querySelectorAll("li");
      const targetLi = lis.length > 0 ? lis[lis.length - 1] : null;
      if (targetLi) {
        canvas.focus();
        const range = document.createRange();
        range.selectNodeContents(targetLi);
        range.collapse(false);
        if (sel) {
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    };

    // Dedicated Bulleted List Canvases under Section Headers
    const sectionCanvases = document.querySelectorAll(".section-bullet-canvas");
    sectionCanvases.forEach((canvas) => {
      canvas.addEventListener("focus", () => updateActiveSectionCanvas(canvas));
      canvas.addEventListener("click", () => updateActiveSectionCanvas(canvas));
      canvas.addEventListener("keyup", () => updateActiveSectionCanvas(canvas));
      canvas.addEventListener("pointerdown", () => updateActiveSectionCanvas(canvas));

      // Handle Tab key in outline canvas (no sub-bullets)
      canvas.addEventListener("keydown", (e) => {
        updateActiveSectionCanvas(canvas);
        if (e.key === "Tab") {
          e.preventDefault();
          // Sub-bullets are removed; keep list flat
          return;
        }
      });

      // Auto-save on input & auto-convert start of line asterisk (*) or dash (-) to bullet list
      canvas.addEventListener("input", () => {
        updateActiveSectionCanvas(canvas);
        if (!canvas.querySelector("ul, ol")) {
          const text = canvas.textContent;
          if (/^[-*]\s/.test(text)) {
            ensureSectionBulletedList(canvas);
          }
        }

        // Flatten any nested sub-bullets into standard flat bullet points
        const nestedLists = canvas.querySelectorAll("ul ul, ul ol, ol ul, ol ol");
        nestedLists.forEach((nested) => {
          const parentList = nested.parentElement ? nested.parentElement.closest("ul, ol") : null;
          const parentLi = nested.closest("li");
          if (parentList) {
            const children = Array.from(nested.children);
            children.forEach((child) => {
              if (parentLi && parentLi.nextSibling) {
                parentList.insertBefore(child, parentLi.nextSibling);
              } else {
                parentList.appendChild(child);
              }
            });
            nested.remove();
          }
        });

        const editor = document.getElementById("chapter-rich-outline-editor");
        if (editor) {
          if (!this.data.chapters[chKey]) {
            this.data.chapters[chKey] = { headingBlocks: [], status: "empty" };
          }
          const hIdx = parseInt(canvas.getAttribute("data-section-editor"), 10);
          const block = this.data.chapters[chKey].headingBlocks[hIdx];
          if (block) {
            const lis = Array.from(canvas.querySelectorAll("li"))
              .map((li) => li.innerText.trim())
              .filter((p) => p.length > 0);
            block.points = lis;
            block.notes = lis.join("\n");
          }
          if (this.data.chapters[chKey].status === "empty" && canvas.textContent.trim().length > 0) {
            this.data.chapters[chKey].status = "in-progress";
          }
          this.notifyDataChanged();
        }
      });
    });

    // Ensure Bullet List button on each section header bar
    const ensureBulletBtns = document.querySelectorAll("button[data-ensure-bullet]");
    ensureBulletBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const idx = btn.getAttribute("data-ensure-bullet");
        const canvas = document.querySelector(`.section-bullet-canvas[data-section-editor="${idx}"]`);
        if (canvas) {
          updateActiveSectionCanvas(canvas);
          ensureSectionBulletedList(canvas);
          canvas.dispatchEvent(new Event("input", { bubbles: true }));
        }
      });
    });

    // Collapse/Expand Section Headings by clicking banner
    const headingBanners = document.querySelectorAll(".esv-rich-heading-banner");
    headingBanners.forEach((banner) => {
      banner.addEventListener("click", (e) => {
        if (
          e.target.closest(
            "input, button, .delete-heading-btn, .insert-heading-after-btn, .heading-title-input, .heading-verses-input"
          )
        ) {
          return;
        }
        const idx = banner.getAttribute("data-toggle-heading");
        const body = document.querySelector(`.esv-rich-heading-body[data-section-body="${idx}"]`);
        const icon = banner.querySelector(".rich-heading-toggle-icon");
        if (body) {
          body.classList.toggle("hidden");
          const isHidden = body.classList.contains("hidden");
          if (icon) {
            icon.textContent = isHidden ? "▶" : "▼";
          }
          if (!window.collapsedHeadingsMap[chKey]) {
            window.collapsedHeadingsMap[chKey] = {};
          }
          window.collapsedHeadingsMap[chKey][idx] = isHidden;
        }
      });
    });

    // Toolbar formatting buttons
    const richToolbarBtns = document.querySelectorAll("button[data-rich-command], .rich-toolbar-btn");
    richToolbarBtns.forEach((btn) => {
      // Prevent clicking toolbar buttons from stealing focus away from active section canvas
      btn.addEventListener("mousedown", (e) => {
        e.preventDefault();
      });
    });

    const richCommandBtns = document.querySelectorAll("button[data-rich-command]");
    richCommandBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const cmd = btn.getAttribute("data-rich-command");
        const currentActive = document.activeElement;
        const activeCanvas =
          (currentActive && currentActive.closest(".section-bullet-canvas")) ||
          lastActiveSectionCanvas ||
          document.querySelector(".section-bullet-canvas");

        if (activeCanvas) {
          updateActiveSectionCanvas(activeCanvas);
          if (!activeCanvas.contains(document.activeElement)) {
            activeCanvas.focus();
          }

          if (cmd === "insertUnorderedList") {
            ensureSectionBulletedList(activeCanvas);
          } else if (cmd === "insertOrderedList") {
            document.execCommand("insertOrderedList", false, null);
          } else if (cmd === "indent" || cmd === "outdent") {
            // Sub-bullets removed
            return;
          } else {
            document.execCommand(cmd, false, null);
          }
          activeCanvas.dispatchEvent(new Event("input", { bubbles: true }));
        }
      });
    });

    // Toggle all section headings inside the rich textbox
    const toggleRichHeadingsBtn = document.getElementById("toggle-rich-headings-btn");
    if (toggleRichHeadingsBtn) {
      toggleRichHeadingsBtn.addEventListener("click", () => {
        if (!richEditor) return;
        const bodies = richEditor.querySelectorAll(".esv-rich-heading-body");
        const icons = richEditor.querySelectorAll(".rich-heading-toggle-icon");
        const isCurrentlyHidden = Array.from(bodies).some((b) => b.classList.contains("hidden"));

        bodies.forEach((body) => {
          if (isCurrentlyHidden) {
            body.classList.remove("hidden");
          } else {
            body.classList.add("hidden");
          }
        });
        icons.forEach((icon) => {
          icon.textContent = isCurrentlyHidden ? "▼" : "▶";
        });
      });
    }

    // Resizable Split Divider between Outline Panel and Scripture Panel
    const splitContainer = document.getElementById("chapter-split-container");
    const splitDivider = document.getElementById("chapter-split-divider");
    const outlinePanel = document.getElementById("chapter-outline-panel");

    if (splitContainer && splitDivider && outlinePanel) {
      let isDragging = false;

      const onPointerDown = (e) => {
        isDragging = true;
        try {
          splitDivider.setPointerCapture(e.pointerId);
        } catch (_) {}
        document.body.style.userSelect = "none";
        document.body.style.cursor = "col-resize";
      };

      const onPointerMove = (e) => {
        if (!isDragging) return;
        const rect = splitContainer.getBoundingClientRect();
        if (rect.width <= 0) return;

        const offsetX = e.clientX - rect.left;
        let pct = (offsetX / rect.width) * 100;

        // Dynamic boundaries: min 260px for outline and min 260px for scripture
        const minPct = Math.max(15, (260 / rect.width) * 100);
        const maxPct = Math.min(85, ((rect.width - 260) / rect.width) * 100);

        pct = Math.min(Math.max(pct, minPct), maxPct);
        this.splitRatio = pct;
        outlinePanel.style.width = `${pct}%`;
      };

      const onPointerUp = (e) => {
        if (!isDragging) return;
        isDragging = false;
        try {
          splitDivider.releasePointerCapture(e.pointerId);
        } catch (_) {}
        document.body.style.userSelect = "";
        document.body.style.cursor = "";
        try {
          localStorage.setItem("bibleOutline_splitRatio", this.splitRatio.toString());
        } catch (_) {}
      };

      splitDivider.addEventListener("pointerdown", onPointerDown);
      splitDivider.addEventListener("pointermove", onPointerMove);
      splitDivider.addEventListener("pointerup", onPointerUp);
      splitDivider.addEventListener("pointercancel", onPointerUp);

      // Double-click divider to reset to 50/50
      splitDivider.addEventListener("dblclick", () => {
        this.splitRatio = 50;
        outlinePanel.style.width = "50%";
        try {
          localStorage.setItem("bibleOutline_splitRatio", "50");
        } catch (_) {}
      });
    }

    // Chapter Takeaway
    const chapterTakeawayInput = document.getElementById("chapter-takeaway-input");
    if (chapterTakeawayInput) {
      chapterTakeawayInput.addEventListener("input", (e) => {
        if (!this.data.chapters[chKey]) {
          this.data.chapters[chKey] = { headingBlocks: [] };
        }
        this.data.chapters[chKey].takeaway = e.target.value;
        this.notifyDataChanged();
      });
    }

    // Split view switcher buttons
    const splitBtns = document.querySelectorAll(".split-mode-btn");
    splitBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.splitViewMode = btn.getAttribute("data-split-mode");
        this.render();
      });
    });

    // Previous & Next Chapter stepping buttons
    const prevChBtn = document.getElementById("prev-chapter-btn");
    if (prevChBtn) {
      prevChBtn.addEventListener("click", () => this.stepToPrevChapter());
    }

    const nextChBtn = document.getElementById("next-chapter-btn");
    if (nextChBtn) {
      nextChBtn.addEventListener("click", () => this.stepToNextChapter());
    }

    // 5. Quiz & Diagnostic Studio interactions
    const quizTabBtns = document.querySelectorAll(".quiz-tab-switch-btn");
    quizTabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const tab = btn.getAttribute("data-quiz-tab");
        this.quizSession = null;
        this.quizScorecard = null;
        this.retakeModalTest = null;
        this.navigateTo({
          activeView: "quiz-diagnostic",
          activeQuizTab: tab,
          viewingPastTest: null
        });
      });
    });

    const selectScopeBtns = document.querySelectorAll(".select-scope-btn");
    selectScopeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.selectedQuizScope = btn.getAttribute("data-select-scope");
        this.render();
      });
    });

    const selectFocusBtns = document.querySelectorAll(".select-quiz-focus-btn");
    selectFocusBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.selectedQuizFocus = btn.getAttribute("data-select-quiz-focus") || "all";
        this.render();
      });
    });

    const setBookQuizModeBtns = document.querySelectorAll(".set-book-quiz-mode-btn");
    setBookQuizModeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.selectedBookQuizMode = btn.getAttribute("data-set-book-quiz-mode") || "all";
        this.render();
      });
    });

    const selectCountBtns = document.querySelectorAll(".select-count-btn");
    selectCountBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.selectedQuizQuestionCount = parseInt(btn.getAttribute("data-select-count"), 10);
        this.render();
      });
    });

    const startDiagnosticBtn = document.getElementById("start-diagnostic-btn");
    if (startDiagnosticBtn) {
      startDiagnosticBtn.addEventListener("click", () => {
        this.quizSession = new DiagnosticSession({
          scope: this.selectedQuizScope,
          questionCount: this.selectedQuizQuestionCount,
          headingOnly: this.selectedQuizFocus === "headings"
        });
        this.quizScorecard = null;
        this.viewingPastTest = null;
        this.retakeModalTest = null;
        this.render();
      });
    }

    const launchBookQuizBtns = document.querySelectorAll(".launch-book-quiz-btn");
    launchBookQuizBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const bId = btn.getAttribute("data-launch-book-quiz");
        const mode = btn.getAttribute("data-quiz-mode") || this.selectedBookQuizMode || "all";
        const bObj = getBookById(bId);
        if (!bObj) return;
        this.selectedBookId = bId;
        this.activeView = "quiz-diagnostic";
        this.activeQuizTab = "diagnostic";
        this.quizSession = new DiagnosticSession({
          scope: "ALL",
          questionCount: Math.min(bObj.chapterCount, 15),
          specificBookId: bId,
          headingOnly: mode === "headings"
        });
        this.quizScorecard = null;
        this.viewingPastTest = null;
        this.retakeModalTest = null;
        this.render();
      });
    });

    const launchBookHeadingsQuizBtns = document.querySelectorAll(".launch-book-headings-quiz-btn");
    launchBookHeadingsQuizBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const bId = btn.getAttribute("data-launch-book-headings-quiz");
        const bObj = getBookById(bId);
        if (!bObj) return;
        this.selectedBookId = bId;
        this.activeView = "quiz-diagnostic";
        this.activeQuizTab = "diagnostic";
        this.quizSession = new DiagnosticSession({
          scope: "ALL",
          questionCount: Math.min(bObj.chapterCount, 15),
          specificBookId: bId,
          headingOnly: true
        });
        this.quizScorecard = null;
        this.viewingPastTest = null;
        this.retakeModalTest = null;
        this.render();
      });
    });

    const examInput = document.getElementById("exam-answer-input");
    if (examInput) {
      // Automatically keep focus on the answer box when moving from one question to the next
      requestAnimationFrame(() => {
        if (document.getElementById("exam-answer-input") === examInput) {
          examInput.focus();
          const valLen = examInput.value ? examInput.value.length : 0;
          examInput.setSelectionRange(valLen, valLen);
        }
      });
    }

    const saveCurrentExamInput = () => {
      if (examInput && this.quizSession) {
        this.quizSession.submitCurrentAnswer(examInput.value);
      }
    };

    const finishCurrentExamSession = () => {
      saveCurrentExamInput();
      this.quizScorecard = this.quizSession.finishExam();
      if (!Array.isArray(this.data.quizHistory)) this.data.quizHistory = [];
      const newRecord = {
        id: `quiz_${Date.now()}`,
        date: Date.now(),
        scope: this.quizSession.scope,
        specificBookId: this.quizSession.specificBookId,
        headingOnly: Boolean(this.quizSession.headingOnly),
        questionCount: this.quizScorecard.totalQuestions,
        durationMs: this.quizScorecard.durationMs,
        questions: this.quizSession.questions,
        answers: this.quizSession.answers,
        scorecard: this.quizScorecard,
        // Legacy compat fields
        total: this.quizScorecard.totalQuestions,
        correct: this.quizScorecard.totalCorrect,
        pct: this.quizScorecard.overallPct
      };
      this.data.quizHistory.unshift(newRecord);
      this.notifyDataChanged();
      if (this.googleUser) {
        saveQuizToCloud(this.googleUser, newRecord).catch(() => {});
        if (this.data.bookMastery) {
          saveMasteryToCloud(this.googleUser, this.data.bookMastery).catch(() => {});
        }
      }
      this.render();
    };

    if (examInput) {
      examInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          saveCurrentExamInput();
          if (this.quizSession.currentIndex < this.quizSession.questions.length - 1) {
            this.quizSession.nextQuestion();
            this.render();
          } else {
            finishCurrentExamSession();
          }
        }
      });
    }

    const examNextBtn = document.getElementById("exam-next-btn");
    if (examNextBtn) {
      examNextBtn.addEventListener("click", () => {
        saveCurrentExamInput();
        this.quizSession.nextQuestion();
        this.render();
      });
    }

    const examPrevBtn = document.getElementById("exam-prev-btn");
    if (examPrevBtn) {
      examPrevBtn.addEventListener("click", () => {
        saveCurrentExamInput();
        this.quizSession.prevQuestion();
        this.render();
      });
    }

    const examSkipBtn = document.getElementById("exam-skip-btn");
    if (examSkipBtn) {
      examSkipBtn.addEventListener("click", () => {
        this.quizSession.nextQuestion();
        this.render();
      });
    }

    const examFinishBtn = document.getElementById("exam-finish-btn");
    if (examFinishBtn) {
      examFinishBtn.addEventListener("click", () => {
        finishCurrentExamSession();
      });
    }

    const resetDiagBtn = document.getElementById("reset-diagnostic-config-btn");
    if (resetDiagBtn) {
      resetDiagBtn.addEventListener("click", () => {
        this.quizSession = null;
        this.quizScorecard = null;
        this.retakeModalTest = null;
        this.navigateTo({
          activeView: "quiz-diagnostic",
          activeQuizTab: "diagnostic",
          viewingPastTest: null
        });
      });
    }

    const backToHistoryBtn = document.getElementById("back-to-history-btn");
    if (backToHistoryBtn) {
      backToHistoryBtn.addEventListener("click", () => {
        this.quizSession = null;
        this.quizScorecard = null;
        this.retakeModalTest = null;
        this.navigateTo({
          activeView: "quiz-diagnostic",
          activeQuizTab: "history",
          viewingPastTest: null
        });
      });
    }

    // Question review filter toggles (All vs Missed Only)
    const reviewFilterBtns = document.querySelectorAll(".set-review-filter-btn");
    reviewFilterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.questionReviewFilter = btn.getAttribute("data-set-review-filter");
        this.render();
      });
    });

    // History scope filter buttons
    const filterHistoryScopeBtns = document.querySelectorAll(".filter-history-scope-btn");
    filterHistoryScopeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.historyScopeFilter = btn.getAttribute("data-history-scope");
        this.render();
      });
    });

    // History search input
    const historySearchInput = document.getElementById("history-search-input");
    if (historySearchInput) {
      historySearchInput.addEventListener("input", (e) => {
        this.historySearchQuery = e.target.value;
        this.render();
        const reSearchInput = document.getElementById("history-search-input");
        if (reSearchInput) {
          reSearchInput.focus();
          reSearchInput.setSelectionRange(reSearchInput.value.length, reSearchInput.value.length);
        }
      });
    }

    const clearHistorySearchBtn = document.getElementById("clear-history-search-btn");
    if (clearHistorySearchBtn) {
      clearHistorySearchBtn.addEventListener("click", () => {
        this.historySearchQuery = "";
        this.render();
      });
    }

    // Review past test buttons
    const reviewPastTestBtns = document.querySelectorAll("[data-review-past-test]");
    reviewPastTestBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const testId = btn.getAttribute("data-review-past-test");
        const found = this.data.quizHistory.find(
          (t, idx) =>
            String(t.id) === String(testId) ||
            String(t.date) === String(testId) ||
            `quiz_${t.date}` === String(testId) ||
            `hist_${t.date}` === String(testId) ||
            `quiz_${t.date || idx}` === String(testId) ||
            `hist_${t.date || idx}` === String(testId) ||
            String(idx) === String(testId)
        );
        if (found) {
          this.quizScorecard = null;
          this.questionReviewFilter = "all";
          this.navigateTo({
            activeView: "quiz-diagnostic",
            activeQuizTab: "history",
            viewingPastTest: found
          });
        }
      });
    });

    // Open Retake Modal
    const openRetakeModalBtns = document.querySelectorAll("[data-open-retake-modal]");
    openRetakeModalBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const testId = btn.getAttribute("data-open-retake-modal");
        const found = this.data.quizHistory.find(
          (t, idx) =>
            String(t.id) === String(testId) ||
            String(t.date) === String(testId) ||
            `quiz_${t.date}` === String(testId) ||
            `hist_${t.date}` === String(testId) ||
            `quiz_${t.date || idx}` === String(testId) ||
            `hist_${t.date || idx}` === String(testId) ||
            String(idx) === String(testId)
        );
        if (found) {
          this.retakeModalTest = found;
          this.render();
        }
      });
    });

    // Retake Options in Retake Modal
    const retakeOptionBtns = document.querySelectorAll(".retake-option-btn");
    retakeOptionBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const test = this.retakeModalTest;
        if (!test) return;
        const action = btn.getAttribute("data-action-retake");
        this.retakeModalTest = null;

        let newSession = null;
        if (action === "exact") {
          if (Array.isArray(test.questions) && test.questions.length > 0) {
            newSession = new DiagnosticSession({
              scope: test.scope || "ALL",
              customQuestions: test.questions,
              specificBookId: test.specificBookId,
              headingOnly: Boolean(test.headingOnly)
            });
          } else {
            newSession = new DiagnosticSession({
              scope: test.scope || "ALL",
              questionCount: test.questionCount || test.total || 25,
              specificBookId: test.specificBookId,
              headingOnly: Boolean(test.headingOnly)
            });
          }
        } else if (action === "missed") {
          const missedPool = test.scorecard?.missedQuestions || test.missedQuestions || [];
          const missedQuestions = missedPool.map((m) => m.question || m).filter(Boolean);
          if (missedQuestions.length > 0) {
            newSession = new DiagnosticSession({
              scope: test.scope || "ALL",
              customQuestions: missedQuestions,
              specificBookId: test.specificBookId,
              headingOnly: Boolean(test.headingOnly)
            });
          } else {
            newSession = new DiagnosticSession({
              scope: test.scope || "ALL",
              questionCount: test.questionCount || test.total || 25,
              specificBookId: test.specificBookId,
              headingOnly: Boolean(test.headingOnly)
            });
          }
        } else if (action === "new") {
          newSession = new DiagnosticSession({
            scope: test.scope || "ALL",
            questionCount: test.questionCount || test.total || 25,
            specificBookId: test.specificBookId,
            headingOnly: Boolean(test.headingOnly)
          });
        }

        if (newSession) {
          this.quizSession = newSession;
          this.quizScorecard = null;
          this.viewingPastTest = null;
          this.activeView = "quiz-diagnostic";
          this.activeQuizTab = "diagnostic";
          this.render();
        }
      });
    });

    // Close Retake Modal
    const closeRetakeModalBtn = document.getElementById("close-retake-modal-btn");
    if (closeRetakeModalBtn) {
      closeRetakeModalBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.retakeModalTest = null;
        this.render();
      });
    }

    const retakeModalOverlay = document.getElementById("retake-quiz-modal");
    if (retakeModalOverlay) {
      retakeModalOverlay.addEventListener("click", (e) => {
        if (e.target.id === "retake-quiz-modal") {
          this.retakeModalTest = null;
          this.render();
        }
      });
    }

    // Delete single past test record
    const deletePastTestBtns = document.querySelectorAll(".delete-past-test-btn");
    deletePastTestBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const testId = btn.getAttribute("data-delete-past-test");
        if (confirm("Delete this test session from your history?")) {
          const target = this.data.quizHistory.find(
            (t, idx) =>
              (t.id && String(t.id) === String(testId)) ||
              (t.date && String(t.date) === String(testId)) ||
              `quiz_${t.date}` === String(testId) ||
              `hist_${t.date}` === String(testId) ||
              `quiz_${t.date || idx}` === String(testId) ||
              `hist_${t.date || idx}` === String(testId) ||
              String(idx) === String(testId)
          );

          const idsToDelete = new Set(
            [
              testId,
              target?.id,
              target?.date ? `quiz_${target.date}` : null,
              target?.date ? `hist_${target.date}` : null,
              target?.date ? String(target.date) : null
            ].filter(Boolean)
          );

          this.data.quizHistory = this.data.quizHistory.filter((t, idx) => {
            if (target && t === target) return false;
            if (t.id && idsToDelete.has(String(t.id))) return false;
            if (t.date && idsToDelete.has(String(t.date))) return false;
            if (t.date && idsToDelete.has(`quiz_${t.date}`)) return false;
            if (t.date && idsToDelete.has(`hist_${t.date}`)) return false;
            if (idsToDelete.has(String(idx))) return false;
            return true;
          });

          if (
            this.viewingPastTest &&
            (idsToDelete.has(String(this.viewingPastTest.id)) ||
              idsToDelete.has(String(this.viewingPastTest.date)) ||
              idsToDelete.has(`quiz_${this.viewingPastTest.date}`) ||
              idsToDelete.has(`hist_${this.viewingPastTest.date}`))
          ) {
            this.viewingPastTest = null;
          }

          this.notifyDataChanged();
          if (this.googleUser) {
            idsToDelete.forEach((id) => {
              deleteQuizFromCloud(this.googleUser, id).catch(() => {});
            });
          }
          this.render();
        }
      });
    });

    // Clear all test history
    const clearAllHistoryBtn = document.getElementById("clear-all-quiz-history-btn");
    if (clearAllHistoryBtn) {
      clearAllHistoryBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to permanently clear all test history? This cannot be undone.")) {
          this.data.quizHistory = [];
          this.viewingPastTest = null;
          this.notifyDataChanged();
          if (this.googleUser) {
            clearAllQuizzesFromCloud(this.googleUser).catch(() => {});
          }
          this.render();
        }
      });
    }

    // Inline Scripture Inspection on Questions in Quiz Scorecard / Review
    const inspectBtns = document.querySelectorAll(".inspect-scripture-btn");
    inspectBtns.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const bId = btn.getAttribute("data-book-id");
        const ch = parseInt(btn.getAttribute("data-chapter"), 10);
        const qIdx = btn.getAttribute("data-q-idx");
        const container = document.getElementById(`inline-scripture-container-${qIdx}`);
        const body = document.getElementById(`inline-scripture-body-${qIdx}`);
        const icon = btn.querySelector(`.inspect-icon-${qIdx}`);

        if (!container || !body) return;

        const isHidden = container.classList.contains("hidden");
        if (!isHidden) {
          container.classList.add("hidden");
          if (icon) icon.textContent = "▼";
          return;
        }

        container.classList.remove("hidden");
        if (icon) icon.textContent = "▲";

        if (body.getAttribute("data-loaded") === "true") return;

        const book = getBookById(bId);
        const bookName = book?.name || bId;

        // Check local chapter notes cache first
        const chKey = `${bId}-${ch}`;
        const chapterData = this.data.chapters ? this.data.chapters[chKey] : null;
        if (chapterData && chapterData.chapterScripture) {
          body.innerHTML = formatESVTextToHTML(chapterData.chapterScripture);
          body.setAttribute("data-loaded", "true");
          return;
        }

        const loadScripture = async () => {
          try {
            body.innerHTML = `<div class="text-[#8C8A84] italic animate-pulse">📖 Loading ${bookName} ${ch} (ESV Scripture)...</div>`;
            const esvText = await fetchESVChapter(bookName, ch);
            if (esvText) {
              body.innerHTML = formatESVTextToHTML(esvText);
              body.setAttribute("data-loaded", "true");
              // Cache into chapter data for fast subsequent lookups
              if (this.data.chapters && this.data.chapters[chKey]) {
                this.data.chapters[chKey].chapterScripture = esvText;
              }
            } else {
              body.innerHTML = `<p class="text-[#8C8A84] italic">Scripture text unavailable for ${bookName} ${ch}.</p>`;
            }
          } catch (err) {
            console.error("Failed to load inline scripture:", err);
            body.innerHTML = `
              <div class="space-y-2 p-2 bg-rose-950/20 border border-rose-900/40 rounded-lg">
                <p class="text-rose-400 text-xs font-semibold">Could not load ESV scripture: ${err.message}</p>
                <button class="retry-inspect-btn text-xs px-3 py-1 bg-[#2A2A27] hover:bg-[#383834] text-[#EAE8E2] rounded transition">
                  🔄 Retry Loading
                </button>
              </div>
            `;
            body.querySelector(".retry-inspect-btn")?.addEventListener("click", (ev) => {
              ev.stopPropagation();
              loadScripture();
            });
          }
        };

        await loadScripture();
      });
    });

    // Close buttons on inline scripture inspector
    const closeScriptureBtns = document.querySelectorAll("[data-close-scripture]");
    closeScriptureBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const qIdx = btn.getAttribute("data-close-scripture");
        const container = document.getElementById(`inline-scripture-container-${qIdx}`);
        const inspectBtn = document.querySelector(`[data-inspect-scripture="true"][data-q-idx="${qIdx}"]`);
        const icon = inspectBtn ? inspectBtn.querySelector(`.inspect-icon-${qIdx}`) : null;
        if (container) {
          container.classList.add("hidden");
          if (icon) icon.textContent = "▼";
        }
      });
    });

    // Flag Active Question (During Exam)
    const flagActiveBtns = document.querySelectorAll(".flag-active-question-btn");
    flagActiveBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!this.quizSession) return;
        const q = this.quizSession.getCurrentQuestion();
        const userAns = document.getElementById("exam-answer-input")?.value || "";
        this.flagModalData = {
          question: q,
          userAnswer: userAns,
          category: "wrong_answer",
          suggestedAnswer: "",
          comments: "",
          isSubmitting: false,
          errorMessage: ""
        };
        this.render();
      });
    });

    // Flag Review Question (Scorecard & History)
    const flagReviewBtns = document.querySelectorAll(".flag-review-question-btn");
    flagReviewBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const qId = btn.getAttribute("data-flag-review-question");
        const qIdx = parseInt(btn.getAttribute("data-q-idx"), 10);
        let questionObj = null;
        let userAns = "";

        const scorecardQuestions =
          this.quizScorecard?.allReviewedQuestions ||
          this.viewingPastTest?.scorecard?.allReviewedQuestions ||
          this.viewingPastTest?.allReviewedQuestions ||
          [];
        if (scorecardQuestions && scorecardQuestions[qIdx]) {
          const item = scorecardQuestions[qIdx];
          questionObj = item.question || item;
          userAns = item.userAnswer || "";
        }
        if (!questionObj) {
          questionObj = (this.quizSession?.questions || this.viewingPastTest?.questions || []).find(
            (q) => q.id === qId
          );
        }
        if (!questionObj && qId) {
          questionObj = { id: qId, prompt: `Question ${qId}` };
        }

        if (questionObj) {
          this.flagModalData = {
            question: questionObj,
            userAnswer: userAns,
            category: "wrong_answer",
            suggestedAnswer: "",
            comments: "",
            isSubmitting: false,
            errorMessage: ""
          };
          this.render();
        }
      });
    });

    // Flag Modal - Category Picker
    const flagCatOptions = document.querySelectorAll(".flag-category-option");
    flagCatOptions.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (!this.flagModalData) return;
        const comms = document.getElementById("flag-comments-input")?.value;
        const sugg = document.getElementById("flag-suggested-answer-input")?.value;
        if (comms !== undefined) this.flagModalData.comments = comms;
        if (sugg !== undefined) this.flagModalData.suggestedAnswer = sugg;
        this.flagModalData.category = btn.getAttribute("data-flag-category");
        this.render();
      });
    });

    // Flag Modal - Close / Cancel
    const flagCloseBtn = document.getElementById("flag-modal-close-btn");
    const flagCancelBtn = document.getElementById("flag-modal-cancel-btn");
    const closeFlagModal = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      this.flagModalData = null;
      this.render();
    };
    if (flagCloseBtn) flagCloseBtn.addEventListener("click", closeFlagModal);
    if (flagCancelBtn) flagCancelBtn.addEventListener("click", closeFlagModal);

    const flagModalOverlay = document.getElementById("flag-modal-overlay");
    if (flagModalOverlay) {
      flagModalOverlay.addEventListener("click", (e) => {
        if (e.target.id === "flag-modal-overlay") {
          closeFlagModal(e);
        }
      });
    }

    // Flag Modal - Submit
    const flagSubmitBtn = document.getElementById("flag-modal-submit-btn");
    if (flagSubmitBtn) {
      flagSubmitBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!this.flagModalData || this.flagModalData.isSubmitting) return;

        const comms = document.getElementById("flag-comments-input")?.value || "";
        const sugg = document.getElementById("flag-suggested-answer-input")?.value || "";
        this.flagModalData.comments = comms;
        this.flagModalData.suggestedAnswer = sugg;
        this.flagModalData.isSubmitting = true;
        this.flagModalData.errorMessage = "";
        this.render();

        await this.submitQuestionFlag(this.flagModalData);
      });
    }

    // Keyboard shortcuts: Left / Right arrow navigation (only when not editing text)
    const handleKeyDown = (e) => {
      const target = e.target;
      const active = document.activeElement;

      // Check if user is typing in any text box, textarea, input, or contenteditable canvas
      const isInputTarget =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable ||
          Boolean(target.closest && target.closest("[contenteditable='true']")) ||
          Boolean(target.closest && target.closest(".section-bullet-canvas, .outline-rich-editor, textarea, input")));

      const isInputActive =
        active &&
        (active.tagName === "INPUT" ||
          active.tagName === "TEXTAREA" ||
          active.tagName === "SELECT" ||
          active.isContentEditable ||
          Boolean(active.closest && active.closest("[contenteditable='true']")) ||
          Boolean(active.closest && active.closest(".section-bullet-canvas, .outline-rich-editor, textarea, input")));

      if (isInputTarget || isInputActive) {
        return;
      }

      if (this.activeView === "chapter-outliner") {
        if (e.key === "ArrowRight") {
          this.stepToNextChapter();
        } else if (e.key === "ArrowLeft") {
          this.stepToPrevChapter();
        }
      }
    };
    window.removeEventListener("keydown", window.appNavListener);
    window.appNavListener = handleKeyDown;
    window.addEventListener("keydown", window.appNavListener);
  }

  showToast(message, type = "info", durationMs = 4500) {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      container.className = "fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    const isSuccess = type === "success";
    const isError = type === "error";
    toast.className = `pointer-events-auto p-3.5 rounded-xl border shadow-2xl text-xs flex items-start gap-2.5 transition-all duration-300 transform translate-y-2 opacity-0 ${
      isSuccess
        ? "bg-[#18261B] border-[#2A4D30] text-emerald-200"
        : isError
        ? "bg-[#281816] border-[#4D2622] text-rose-200"
        : "bg-[#1C1C1A] border-[#383834] text-[#EAE8E2]"
    }`;

    toast.innerHTML = `
      <span class="text-sm shrink-0">${isSuccess ? "✓" : isError ? "⚠️" : "ℹ️"}</span>
      <div class="leading-relaxed font-sans">${message}</div>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.remove("translate-y-2", "opacity-0");
      toast.classList.add("translate-y-0", "opacity-100");
    });

    setTimeout(() => {
      toast.classList.remove("opacity-100");
      toast.classList.add("opacity-0");
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, durationMs);
  }

  async submitQuestionFlag(flagData) {
    const q = flagData.question;
    const bookObj = q.bookId ? getBookById(q.bookId) : null;
    const bookName = bookObj?.name || q.bookId || "";

    const payload = {
      questionId: q.id,
      prompt: q.prompt,
      bookId: q.bookId || "",
      bookName: bookName,
      chapterNum: q.chapterNum || null,
      type: q.type || "",
      expectedAnswer: q.displayAnswer || (Array.isArray(q.answers) ? q.answers[0] : "") || "",
      userAnswer: flagData.userAnswer || "",
      category: flagData.category,
      suggestedAnswer: flagData.suggestedAnswer || "",
      comments: flagData.comments || "",
      submittedAt: new Date().toISOString()
    };

    try {
      const response = await fetch("/api/flag-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const result = await response.json().catch(() => ({}));
        this.flagModalData = null;
        this.render();
        this.showToast(
          `🚩 <strong>Question Flagged!</strong> Issue #${result.issueNumber || "submitted"} created. Automated agent will review it and open a PR.`,
          "success",
          5000
        );
        return;
      }
      throw new Error(`Server returned ${response.status}`);
    } catch (err) {
      console.warn("Direct API submission unavailable, using GitHub issue fallback:", err);

      const categoryLabels = {
        wrong_answer: "Wrong Answer",
        too_specific: "Too Specific / Obscure",
        poorly_phrased: "Poorly Phrased / Ambiguous",
        typo: "Typo / Formatting Error",
        bad_question: "Remove / Defective Question",
        other: "Other Feedback"
      };

      const title = `[Question Flag] ${q.id}: ${q.prompt.substring(0, 50)}...`;
      const body = `## 🚩 Question Flag Report

### Question Info
- **ID:** \`${q.id}\`
- **Book / Chapter:** ${bookName} ${q.chapterNum || ""}
- **Type:** \`${q.type || "N/A"}\`
- **Current Prompt:** "${q.prompt}"
- **Expected Answer:** \`${payload.expectedAnswer}\`
- **User Answer:** \`${payload.userAnswer || "(None)"}\`

---

### Issue Details
- **Issue Category:** **${categoryLabels[flagData.category] || flagData.category}**
- **Suggested Correct Answer:** ${flagData.suggestedAnswer ? `\`${flagData.suggestedAnswer}\`` : "*(None provided)*"}
- **User Comments & Rationale:**
> ${flagData.comments ? flagData.comments.replace(/\n/g, "\n> ") : "*(No additional comments)*"}

---
<!-- METADATA: ${JSON.stringify(payload)} -->
`;

      const githubIssueUrl = `https://github.com/phrred/BibleOutline/issues/new?title=${encodeURIComponent(
        title
      )}&body=${encodeURIComponent(body)}&labels=question-flag`;

      window.open(githubIssueUrl, "_blank", "noopener,noreferrer");

      this.flagModalData = null;
      this.render();
      this.showToast(
        `🚩 <strong>GitHub Issue Opened:</strong> Submit the pre-filled issue in the new tab to trigger the AI agent PR workflow.`,
        "info",
        6000
      );
    }
  }

  performExport(format = "md", scope = "current", layout = "grid") {
    this.saveActiveChapterEditorBeforeSwitch();
    const book = this.getSelectedBook();
    const bookId = scope === "current" ? book.id : null;
    const baseName = scope === "current" ? `${book.shortName}_Outline` : "Complete_Bible_Outline";
    const layoutSuffix = layout === "grid" ? "_Grid" : "";

    if (format === "pdf") {
      printOrSaveToPDF(this.data, bookId, layout);
    } else {
      const md = exportToMarkdown(this.data, bookId, layout);
      this.downloadFile(`${baseName}${layoutSuffix}.md`, md, "text/markdown");
    }
  }

  downloadFile(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  applyTheme(theme) {
    this.theme = theme === "light" ? "light" : "dark";
    try {
      localStorage.setItem("bibleOutline_theme", this.theme);
    } catch (e) {}
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (this.theme === "light") {
        root.classList.remove("dark");
        root.classList.add("light");
      } else {
        root.classList.remove("light");
        root.classList.add("dark");
      }
    }
  }

  toggleTheme() {
    const nextTheme = this.theme === "dark" ? "light" : "dark";
    this.applyTheme(nextTheme);
    this.render();
  }
}

// Initialize app safely
function initApp() {
  if (!window.bibleOutlineApp) {
    window.bibleOutlineApp = new BibleOutlineStudio();
    preloadFirebaseSDK();
    console.log("⚡ window.bibleOutlineApp initialized successfully!");
  }
}

initApp();
window.addEventListener("DOMContentLoaded", initApp);
window.addEventListener("load", initApp);
