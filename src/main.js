import {
  loadOutlineStorage,
  saveOutlineStorage,
  debouncedSaveOutlineStorage,
  exportToMarkdown,
  exportToPrintableHTML,
  printOrSaveToPDF
} from "./storage.js";
import { BIBLE_BOOKS, getBookById } from "../data/bible_catalog.js";
import { fetchESVChapter, extractESVHeadings } from "./esv_api.js";
import {
  signInWithGoogleSSO,
  signInWithGoogleRedirect,
  signOutUser,
  listenForAuthChanges,
  preloadFirebaseSDK,
  debouncedCloudAutoSaveBook,
  saveAllOutlinesToCloud,
  syncCloudOutlinesWithLocal
} from "./firebase_sync.js";
import { renderSidebar } from "./components/Sidebar.js";
import { renderTopNavbar } from "./components/TopNavbar.js";
import { renderBookRollupView } from "./components/BookRollupView.js";
import { renderChapterEditorView } from "./components/ChapterEditorView.js";
import { renderDiagnosticQuizView } from "./components/DiagnosticQuizView.js";
import { attachOutlinerListeners } from "./controllers/OutlinerController.js";
import { attachQuizListeners } from "./controllers/QuizController.js";

// Global map of collapsed states for headings
window.collapsedHeadingsMap = window.collapsedHeadingsMap || {};

class BibleOutlineStudio {
  constructor() {
    this.data = loadOutlineStorage();
    this.selectedBookId = "GEN";
    this.selectedChapterNum = 1;
    this.activeView = "chapter-outliner"; // 'chapter-outliner' | 'book-rollup' | 'quiz-diagnostic'
    this.splitViewMode = "split"; // 'split' | 'outline' | 'scripture'
    const savedRatio = parseFloat(localStorage.getItem("bibleOutline_splitRatio"));
    this.splitRatio = !isNaN(savedRatio) ? savedRatio : 50;
    this.bookRollupLayout = localStorage.getItem("bibleOutline_bookRollupLayout") || "grid"; // 'grid' | 'document'
    this.isCollapsed = false;
    this.theme = localStorage.getItem("bibleOutline_theme") || (typeof document !== "undefined" && document.documentElement.classList.contains("light") ? "light" : "dark");
    this.applyTheme(this.theme);

    // Scroll retention maps (per chapter)
    this.scriptureScrollPositions = {};
    this.outlineScrollPositions = {};
    this.currentRenderedChapterKey = null;

    // Quiz & Diagnostic state
    this.activeQuizTab = "diagnostic"; // 'diagnostic' | 'book-quizzes' | 'history'
    this.quizSession = null;
    this.quizScorecard = null;
    this.viewingPastTest = null;
    this.retakeModalTest = null;
    this.questionReviewFilter = "all"; // 'all' | 'missed'
    this.selectedQuizScope = "ALL"; // 'ALL' | 'OT' | 'NT' | 'GENRE_*'
    this.selectedQuizFocus = "all"; // 'all' | 'headings'
    this.selectedQuizQuestionCount = 25;
    this.selectedBookQuizMode = "all"; // 'all' | 'headings'
    this.historySearchQuery = "";
    this.historyScopeFilter = "ALL";
    this.flagModalData = null; // Question flag report modal state

    // SSO & Cloud Sync state
    this.googleUser = null;
    this.cloudSyncStatus = "offline"; // 'offline' | 'syncing' | 'synced' | 'error'

    // Loading & error state for auto-loading ESV
    this.isLoadingESV = false;
    this.esvErrorMessage = null;

    // Sidebar filters
    this.filterTestament = "ALL"; // 'ALL' | 'OT' | 'NT'
    this.searchQuery = "";

    this.rootElement = null;

    // Listen for browser Back & Forward navigation buttons
    window.addEventListener("popstate", () => this.handlePopState());
    window.addEventListener("hashchange", () => this.handlePopState());

    // Restore initial state from URL Hash or set default
    this.parseHashAndSync();

    // Listen for persisted Google SSO sign-in session
    listenForAuthChanges((user) => {
      this.googleUser = user;
      if (user) {
        this.cloudSyncStatus = "syncing";
        this.render();
        this.syncCloudOutlinesWithLocal(user);
      } else {
        this.cloudSyncStatus = "offline";
        this.render();
      }
    });
  }

  // Two-way synchronization between Firestore cloud outlines & local storage
  async syncCloudOutlinesWithLocal(user) {
    if (!user) return;
    const { merged } = await syncCloudOutlinesWithLocal(user, this.data);
    if (merged) {
      saveOutlineStorage(this.data);
      this.render();
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
        status: "empty"
      };
    }

    const currentBlocks = this.data.chapters[chKey].headingBlocks || [];
    const headingsInitialized = this.data.chapters[chKey].headingsInitialized;
    if (!force && headingsInitialized && currentBlocks.length > 0) {
      return;
    }

    const deletedHeadings = Array.isArray(this.data.chapters[chKey].deletedHeadings)
      ? this.data.chapters[chKey].deletedHeadings
      : [];

    const extracted = extractESVHeadings(text, bookName, chNum);
    const validExtracted = extracted.filter((h) => {
      const hClean = (h.heading || "").toLowerCase().trim();
      return !deletedHeadings.includes(hClean);
    });

    if (validExtracted.length > 0) {
      this.data.chapters[chKey].headingBlocks = validExtracted.map((h) => ({
        heading: h.heading,
        verses: h.verses || "",
        notes: "",
        points: [""]
      }));
      this.data.chapters[chKey].headingsInitialized = true;
    } else if (currentBlocks.length === 0) {
      this.data.chapters[chKey].headingBlocks = [
        {
          heading: `${bookName} ${chNum}`,
          verses: "",
          notes: "",
          points: [""]
        }
      ];
      this.data.chapters[chKey].headingsInitialized = true;
    }
  }

  // Auto-loads ESV text for the current chapter and syncs section headings
  async autoLoadESVForCurrentChapter(forceSyncHeadings = false) {
    const book = this.getSelectedBook();
    const ch = this.selectedChapterNum;
    const chKey = `${book.id}-${ch}`;

    if (!forceSyncHeadings && this.data.chapters[chKey] && this.data.chapters[chKey].chapterScripture) {
      this.isLoadingESV = false;
      this.esvErrorMessage = null;
      return;
    }

    this.isLoadingESV = true;
    this.esvErrorMessage = null;
    this.render();

    try {
      const text = await fetchESVChapter(book.name, ch);
      if (!this.data.chapters[chKey]) {
        this.data.chapters[chKey] = { headingBlocks: [], status: "empty" };
      }
      this.data.chapters[chKey].chapterScripture = text;
      this.syncHeadingBlocksForChapter(chKey, text, book.name, ch, forceSyncHeadings);
      saveOutlineStorage(this.data);
      this.notifyDataChanged();
    } catch (err) {
      console.warn("Could not fetch ESV text:", err);
      this.esvErrorMessage = err.message;
      if (!this.data.chapters[chKey] || !this.data.chapters[chKey].headingBlocks || this.data.chapters[chKey].headingBlocks.length === 0) {
        this.syncHeadingBlocksForChapter(chKey, "", book.name, ch, forceSyncHeadings);
      }
    } finally {
      this.isLoadingESV = false;
      this.render();
    }
  }

  // Save active editor canvas back to data state synchronously before changing chapter/book
  saveActiveChapterEditorBeforeSwitch() {
    const richEditor = document.getElementById("chapter-rich-outline-editor");
    const scripturePanel = document.getElementById("chapter-scripture-panel");
    const chKey = `${this.selectedBookId}-${this.selectedChapterNum}`;

    if (scripturePanel) {
      this.scriptureScrollPositions[chKey] = scripturePanel.scrollTop;
    }
    if (richEditor) {
      this.outlineScrollPositions[chKey] = richEditor.scrollTop;
    }

    if (!richEditor) return;

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
  getHash(options = {}) {
    const activeView = options.activeView || this.activeView;
    const bookId = options.bookId || this.selectedBookId;
    const ch = options.chapterNum || this.selectedChapterNum;
    const tab = options.activeQuizTab || this.activeQuizTab;

    if (activeView === "quiz-diagnostic") {
      return `#/quiz/${tab || "diagnostic"}`;
    } else if (activeView === "book-rollup") {
      return `#/book/${bookId}`;
    } else {
      return `#/${bookId}/${ch}`;
    }
  }

  // Navigate to new state and manage browser history stack
  navigateTo(options = {}, replace = false) {
    this.saveActiveChapterEditorBeforeSwitch();

    let stateChanged = false;
    let oldBookId = this.selectedBookId;
    let oldCh = this.selectedChapterNum;

    if (options.activeView && options.activeView !== this.activeView) {
      this.activeView = options.activeView;
      stateChanged = true;
    }
    if (options.bookId && options.bookId !== this.selectedBookId) {
      this.selectedBookId = options.bookId;
      stateChanged = true;
    }
    if (options.chapterNum && options.chapterNum !== this.selectedChapterNum) {
      this.selectedChapterNum = options.chapterNum;
      stateChanged = true;
    }
    if (options.activeQuizTab && options.activeQuizTab !== this.activeQuizTab) {
      this.activeQuizTab = options.activeQuizTab;
      stateChanged = true;
    }
    if (options.viewingPastTest !== undefined) {
      this.viewingPastTest = options.viewingPastTest;
      stateChanged = true;
    }

    const newHash = this.getHash();
    if (window.location.hash !== newHash) {
      if (replace) {
        window.history.replaceState(null, "", newHash);
      } else {
        window.history.pushState(null, "", newHash);
      }
    }

    this.render();

    const chapterChanged = this.selectedBookId !== oldBookId || this.selectedChapterNum !== oldCh;
    if (this.activeView === "chapter-outliner" && (chapterChanged || options.forceLoadESV)) {
      this.autoLoadESVForCurrentChapter();
    }
  }

  // Handle browser Back / Forward buttons (popstate)
  handlePopState() {
    this.saveActiveChapterEditorBeforeSwitch();
    this.parseHashAndSync();
  }

  // Parse window.location.hash and sync application state
  parseHashAndSync() {
    let hash = window.location.hash || "";
    if (!hash || hash === "#" || hash === "#/") {
      this.navigateTo({ activeView: "chapter-outliner", bookId: "GEN", chapterNum: 1 }, true);
      return;
    }

    if (hash.startsWith("#")) hash = hash.slice(1);
    if (hash.startsWith("/")) hash = hash.slice(1);

    const parts = hash.split("/").filter(Boolean);
    if (parts.length === 0) {
      this.navigateTo({ activeView: "chapter-outliner", bookId: "GEN", chapterNum: 1 }, true);
      return;
    }

    const first = parts[0].toLowerCase();

    if (first === "book" && parts[1]) {
      const bId = parts[1].toUpperCase();
      const bObj = getBookById(bId);
      if (bObj) {
        this.selectedBookId = bObj.id;
        this.activeView = "book-rollup";
        this.render();
        return;
      }
    }

    if (first === "quiz") {
      this.activeView = "quiz-diagnostic";
      if (parts[1]) {
        const sub = parts[1].toLowerCase();
        if (["diagnostic", "book-quizzes", "history"].includes(sub)) {
          this.activeQuizTab = sub;
        }
      }
      this.render();
      return;
    }

    if (first === "chapter" && parts[1] && parts[2]) {
      const bId = parts[1].toUpperCase();
      const bObj = getBookById(bId);
      const ch = parseInt(parts[2], 10);
      if (bObj && !isNaN(ch) && ch >= 1 && ch <= bObj.chapterCount) {
        this.selectedBookId = bObj.id;
        this.selectedChapterNum = ch;
        this.activeView = "chapter-outliner";
        this.render();
        this.autoLoadESVForCurrentChapter();
        return;
      }
    }

    const bId = parts[0].toUpperCase();
    const bObj = getBookById(bId);
    if (bObj) {
      this.selectedBookId = bObj.id;
      this.activeView = "chapter-outliner";
      if (parts[1]) {
        const ch = parseInt(parts[1], 10);
        if (!isNaN(ch) && ch >= 1 && ch <= bObj.chapterCount) {
          this.selectedChapterNum = ch;
        } else {
          this.selectedChapterNum = 1;
        }
      } else {
        this.selectedChapterNum = 1;
      }
      this.render();
      this.autoLoadESVForCurrentChapter();
      return;
    }

    this.navigateTo({ activeView: "chapter-outliner", bookId: "GEN", chapterNum: 1 }, true);
  }

  stepToPrevChapter() {
    const book = this.getSelectedBook();
    if (this.selectedChapterNum > 1) {
      this.navigateTo({
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

  stepToNextChapter() {
    const book = this.getSelectedBook();
    if (this.selectedChapterNum < book.chapterCount) {
      this.navigateTo({
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

  ensureAppShell() {
    this.rootElement = document.getElementById("app");
    if (!this.rootElement) {
      this.rootElement = document.createElement("div");
      this.rootElement.id = "app";
      document.body.appendChild(this.rootElement);
    }

    let sidebarContainer = document.getElementById("sidebar-container");
    let topNavbarContainer = document.getElementById("top-navbar-container");
    let mainScrollCanvas = document.getElementById("main-scroll-canvas");

    if (!sidebarContainer || !topNavbarContainer || !mainScrollCanvas) {
      this.rootElement.innerHTML = `
        <div class="flex h-screen w-screen overflow-hidden bg-[#141413] font-sans text-[#EAE8E2]">
          <!-- Sidebar -->
          <div id="sidebar-container" class="h-full shrink-0"></div>

          <!-- Main Content Column -->
          <div class="flex-1 flex flex-col h-full overflow-hidden">
            <!-- Top Navbar -->
            <div id="top-navbar-container" class="w-full shrink-0"></div>

            <!-- Main Scrollable Canvas -->
            <main id="main-scroll-canvas" class="flex-1 flex flex-col overflow-hidden bg-[#161614]"></main>
          </div>
        </div>
      `;
      sidebarContainer = document.getElementById("sidebar-container");
      topNavbarContainer = document.getElementById("top-navbar-container");
      mainScrollCanvas = document.getElementById("main-scroll-canvas");
    }

    return { sidebarContainer, topNavbarContainer, mainScrollCanvas };
  }

  render() {
    try {
      const book = this.getSelectedBook();

      // Preserve scroll positions before updating active view
      if (this.currentRenderedChapterKey && this.activeView === "chapter-outliner") {
        const curScripturePanel = document.getElementById("chapter-scripture-panel");
        if (curScripturePanel) {
          this.scriptureScrollPositions[this.currentRenderedChapterKey] = curScripturePanel.scrollTop;
        }
        const curOutlineEditor = document.getElementById("chapter-rich-outline-editor");
        if (curOutlineEditor) {
          this.outlineScrollPositions[this.currentRenderedChapterKey] = curOutlineEditor.scrollTop;
        }
      }

      const { sidebarContainer, topNavbarContainer, mainScrollCanvas } = this.ensureAppShell();

      // Update Sidebar
      sidebarContainer.innerHTML = renderSidebar({
        selectedBookId: this.selectedBookId,
        filterTestament: this.filterTestament,
        searchQuery: this.searchQuery,
        data: this.data,
        isCollapsed: this.isCollapsed
      });

      // Update Top Navbar
      topNavbarContainer.innerHTML = renderTopNavbar({
        activeView: this.activeView,
        selectedBook: book,
        selectedChapterNum: this.selectedChapterNum,
        googleUser: this.googleUser,
        cloudSyncStatus: this.cloudSyncStatus,
        theme: this.theme
      });

      // Update Main View Canvas
      if (this.activeView === "quiz-diagnostic") {
        mainScrollCanvas.innerHTML = renderDiagnosticQuizView({
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
        });
      } else if (this.activeView === "book-rollup") {
        mainScrollCanvas.innerHTML = renderBookRollupView({
          selectedBook: book,
          data: this.data,
          rollupLayout: this.bookRollupLayout || "document"
        });
      } else {
        mainScrollCanvas.innerHTML = renderChapterEditorView({
          selectedBook: book,
          chapterNum: this.selectedChapterNum,
          splitViewMode: this.splitViewMode,
          splitRatio: this.splitRatio,
          isLoadingESV: this.isLoadingESV,
          esvErrorMessage: this.esvErrorMessage,
          data: this.data
        });
      }

      this.currentRenderedChapterKey = `${this.selectedBookId}-${this.selectedChapterNum}`;
      this.attachEventListeners();
      this.scrollActiveChapterPillIntoView();
      this.restoreChapterEditorScrollPositions();
    } catch (err) {
      console.error("Studio Render Error:", err);
      if (this.rootElement) {
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
      }
    }
  }

  attachEventListeners() {
    this.attachSidebarListeners();
    this.attachTopNavbarListeners();
    this.attachBookRollupListeners();
    attachOutlinerListeners(this);
    attachQuizListeners(this);
    this.attachKeyboardNavigation();
  }

  attachSidebarListeners() {
    const testamentBtns = document.querySelectorAll(".filter-testament-btn, [data-testament]");
    testamentBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.filterTestament = btn.getAttribute("data-testament") || btn.getAttribute("data-filter-testament") || "ALL";
        this.render();
      });
    });

    const searchInput = document.getElementById("sidebar-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value;
        this.render();
        const reInput = document.getElementById("sidebar-search-input");
        if (reInput) {
          reInput.focus();
          reInput.setSelectionRange(reInput.value.length, reInput.value.length);
        }
      });
    }

    const clearSearchBtn = document.getElementById("clear-sidebar-search-btn");
    if (clearSearchBtn) {
      clearSearchBtn.addEventListener("click", () => {
        this.searchQuery = "";
        this.render();
      });
    }

    const toggleSidebarBtn = document.getElementById("toggle-sidebar-btn") || document.getElementById("toggle-sidebar-collapse-btn");
    if (toggleSidebarBtn) {
      toggleSidebarBtn.addEventListener("click", () => {
        this.isCollapsed = !this.isCollapsed;
        this.render();
      });
    }

    const bookItems = document.querySelectorAll(".book-nav-card, .sidebar-book-item, [data-book-id]");
    bookItems.forEach((item) => {
      item.addEventListener("click", () => {
        const bookId = item.getAttribute("data-book-id");
        if (bookId) {
          this.navigateTo({ bookId, chapterNum: 1 });
        }
      });
    });
  }

  attachTopNavbarListeners() {
    const navViewBtns = document.querySelectorAll(".studio-view-btn, [data-view], [data-nav-view]");
    navViewBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const view = btn.getAttribute("data-view") || btn.getAttribute("data-nav-view");
        if (view) {
          this.navigateTo({ activeView: view });
        }
      });
    });

    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener("click", () => this.toggleTheme());
    }

    const layoutBtns = document.querySelectorAll("[data-set-rollup-layout]");
    layoutBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.bookRollupLayout = btn.getAttribute("data-set-rollup-layout");
        try {
          localStorage.setItem("bibleOutline_bookRollupLayout", this.bookRollupLayout);
        } catch (_) {}
        this.render();
      });
    });

    const exportMdBtn = document.getElementById("export-md-btn");
    if (exportMdBtn) {
      exportMdBtn.addEventListener("click", () => {
        const book = this.getSelectedBook();
        const md = exportToMarkdown(this.data, book.id, this.bookRollupLayout || "grid");
        const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${book.name}_Outline_${this.bookRollupLayout || "grid"}.md`;
        a.click();
        URL.revokeObjectURL(url);
      });
    }

    const exportPdfBtn = document.getElementById("export-pdf-btn");
    if (exportPdfBtn) {
      exportPdfBtn.addEventListener("click", () => {
        const book = this.getSelectedBook();
        printOrSaveToPDF(this.data, book.id, this.bookRollupLayout || "grid");
      });
    }

    // Google SSO & Cloud Sync Modal
    const openSsoBtn = document.getElementById("open-cloud-sso-btn");
    const ssoModal = document.getElementById("cloud-sso-modal");
    const closeSsoBtn = document.getElementById("close-cloud-sso-modal-btn");
    const googleLoginBtn = document.getElementById("sso-signin-google-btn") || document.getElementById("sso-login-google-btn");
    const redirectLoginBtn = document.getElementById("sso-redirect-google-btn") || document.getElementById("sso-login-redirect-btn");
    const signoutBtn = document.getElementById("sso-signout-btn");
    const backupBtn = document.getElementById("sso-backup-cloud-btn");
    const restoreBtn = document.getElementById("sso-restore-cloud-btn");

    if (openSsoBtn && ssoModal) {
      openSsoBtn.addEventListener("click", () => {
        ssoModal.classList.remove("hidden");
      });
    }

    if (closeSsoBtn && ssoModal) {
      closeSsoBtn.addEventListener("click", () => {
        ssoModal.classList.add("hidden");
      });
    }

    if (ssoModal) {
      ssoModal.addEventListener("click", (e) => {
        if (e.target === ssoModal) {
          ssoModal.classList.add("hidden");
        }
      });
    }

    if (googleLoginBtn) {
      googleLoginBtn.addEventListener("click", async () => {
        try {
          googleLoginBtn.disabled = true;
          googleLoginBtn.innerText = "Signing in...";
          const user = await signInWithGoogleSSO();
          if (user) {
            this.googleUser = user;
            if (ssoModal) ssoModal.classList.add("hidden");
            this.render();
            await this.syncCloudOutlinesWithLocal(user);
          }
        } catch (err) {
          console.error("Google SSO popup error:", err);
          alert("Sign in failed: " + (err.message || err));
        } finally {
          if (googleLoginBtn) {
            googleLoginBtn.disabled = false;
            googleLoginBtn.innerText = "Sign in with Google (Popup)";
          }
        }
      });
    }

    if (redirectLoginBtn) {
      redirectLoginBtn.addEventListener("click", async () => {
        try {
          redirectLoginBtn.disabled = true;
          redirectLoginBtn.innerText = "Redirecting...";
          await signInWithGoogleRedirect();
        } catch (err) {
          console.error("Google SSO redirect error:", err);
          alert("Sign in redirect failed: " + (err.message || err));
          redirectLoginBtn.disabled = false;
          redirectLoginBtn.innerText = "Sign in with Google (Full Page Redirect)";
        }
      });
    }

    if (signoutBtn) {
      signoutBtn.addEventListener("click", async () => {
        try {
          await signOutUser();
          this.googleUser = null;
          this.cloudSyncStatus = "offline";
          if (ssoModal) ssoModal.classList.add("hidden");
          this.render();
        } catch (err) {
          console.error("Sign out error:", err);
        }
      });
    }

    if (backupBtn) {
      backupBtn.addEventListener("click", async () => {
        if (!this.googleUser) return;
        try {
          backupBtn.disabled = true;
          backupBtn.innerText = "Backing up...";
          await saveAllOutlinesToCloud(this.googleUser, this.data);
          this.cloudSyncStatus = "synced";
          this.showToast("Cloud backup complete!", "success");
        } catch (err) {
          console.error("Cloud backup error:", err);
          this.showToast("Backup failed: " + err.message, "error");
        } finally {
          backupBtn.disabled = false;
          backupBtn.innerText = "↑ Backup Outlines to Firebase";
        }
      });
    }

    if (restoreBtn) {
      restoreBtn.addEventListener("click", async () => {
        if (!this.googleUser) return;
        try {
          restoreBtn.disabled = true;
          restoreBtn.innerText = "Restoring...";
          await this.syncCloudOutlinesWithLocal(this.googleUser);
          this.showToast("Restored outlines from cloud!", "success");
        } catch (err) {
          console.error("Cloud restore error:", err);
          this.showToast("Restore failed: " + err.message, "error");
        } finally {
          restoreBtn.disabled = false;
          restoreBtn.innerText = "↓ Restore from Firebase";
        }
      });
    }

    // Book Summary Box
    const toggleSummaryBtn = document.getElementById("toggle-book-summary-btn");
    const summaryBox = document.getElementById("overall-book-summary-box");
    const summaryTextarea = document.getElementById("book-summary-textarea");
    const summaryChevron = document.getElementById("summary-toggle-chevron");

    if (toggleSummaryBtn && summaryBox) {
      toggleSummaryBtn.addEventListener("click", () => {
        summaryBox.classList.toggle("hidden");
        const isHidden = summaryBox.classList.contains("hidden");
        if (summaryChevron) {
          summaryChevron.textContent = isHidden ? "▼" : "▲";
        }
      });
    }

    if (summaryTextarea) {
      summaryTextarea.addEventListener("input", (e) => {
        const book = this.getSelectedBook();
        if (!this.data.books[book.id]) {
          this.data.books[book.id] = { bookSummary: "", myBookTheme: "", updatedAt: null };
        }
        this.data.books[book.id].bookSummary = e.target.value;
        this.notifyDataChanged(book.id);
      });
    }
  }

  attachBookRollupListeners() {
    const rollupChBtns = document.querySelectorAll(".open-chapter-editor-btn, .rollup-chapter-btn, [data-chapter-num]");
    rollupChBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.saveActiveChapterEditorBeforeSwitch();
        const ch = parseInt(btn.getAttribute("data-chapter-num"), 10);
        if (!isNaN(ch)) {
          this.navigateTo({ activeView: "chapter-outliner", chapterNum: ch });
        }
      });
    });

    const quickChapterPills = document.querySelectorAll(".quick-chapter-pill");
    quickChapterPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        this.saveActiveChapterEditorBeforeSwitch();
        const ch = parseInt(pill.getAttribute("data-quick-ch"), 10);
        this.navigateTo({ chapterNum: ch });
      });
    });

    const setRollupLayoutBtns = document.querySelectorAll(".set-rollup-layout-btn, [data-set-rollup-layout]");
    setRollupLayoutBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const layout = btn.getAttribute("data-set-rollup-layout") || "document";
        this.bookRollupLayout = layout;
        try {
          localStorage.setItem("bibleOutline_bookRollupLayout", layout);
        } catch (_) {}
        this.render();
      });
    });

    const exportBookMdBtns = document.querySelectorAll(".export-book-md-btn");
    exportBookMdBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const bId = btn.getAttribute("data-export-book-md") || this.selectedBookId;
        const layout = btn.getAttribute("data-export-layout") || this.bookRollupLayout || "document";
        this.saveActiveChapterEditorBeforeSwitch();
        const targetBook = getBookById(bId) || this.getSelectedBook();
        const md = exportToMarkdown(this.data, bId, layout);
        const layoutSuffix = layout === "grid" ? "_Grid" : "";
        this.downloadFile(`${targetBook.shortName}_Outline${layoutSuffix}.md`, md, "text/markdown");
      });
    });

    const exportBookPdfBtns = document.querySelectorAll(".export-book-pdf-btn");
    exportBookPdfBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const bId = btn.getAttribute("data-export-book-pdf") || this.selectedBookId;
        const layout = btn.getAttribute("data-export-layout") || this.bookRollupLayout || "document";
        this.saveActiveChapterEditorBeforeSwitch();
        printOrSaveToPDF(this.data, bId, layout);
      });
    });

    const exportAllPdfBtns = document.querySelectorAll(".export-all-books-pdf-btn");
    exportAllPdfBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const layout = btn.getAttribute("data-export-layout") || this.bookRollupLayout || "document";
        this.saveActiveChapterEditorBeforeSwitch();
        printOrSaveToPDF(this.data, "ALL", layout);
      });
    });
  }

  attachKeyboardNavigation() {
    const handleKeyDown = (e) => {
      const target = e.target;
      const active = document.activeElement;

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

      // Global shortcut: ⌘\ or Ctrl+\ to toggle sidebar
      if ((e.metaKey || e.ctrlKey) && (e.key === "\\" || e.code === "Backslash")) {
        e.preventDefault();
        this.isCollapsed = !this.isCollapsed;
        this.render();
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
        bad_parsing: "Typo / Bad Parsing",
        wrong_book_chapter: "Wrong Book or Chapter",
        duplicate: "Duplicate Question",
        other: "Other Issue"
      };

      const title = encodeURIComponent(
        `[Question Flag] ${categoryLabels[flagData.category] || "Report"}: ${q.prompt.slice(0, 60)}...`
      );

      const bodyText = `### Question Flag Report
- **Question ID**: \`${q.id}\`
- **Book / Chapter**: ${bookName} ${q.chapterNum || ""}
- **Category**: ${categoryLabels[flagData.category] || flagData.category}
- **Prompt**: ${q.prompt}
- **Expected Answer**: ${payload.expectedAnswer}
- **User Answer**: ${flagData.userAnswer || "*(none)*"}
- **Suggested Correction**: ${flagData.suggestedAnswer || "*(none)*"}
- **User Notes**: ${flagData.comments || "*(none)*"}
- **Timestamp**: ${payload.submittedAt}

*Submitted via Bible Outline & Storyline Studio.*`;

      const githubIssueUrl = `https://github.com/phrred/BibleOutline/issues/new?title=${title}&body=${encodeURIComponent(
        bodyText
      )}&labels=question-flag`;

      this.flagModalData = null;
      this.render();

      window.open(githubIssueUrl, "_blank");
      this.showToast(
        "🚩 Question details prepared. Opening GitHub Issues to submit report...",
        "info",
        6000
      );
    }
  }

  applyTheme(theme) {
    this.theme = theme;
    try {
      localStorage.setItem("bibleOutline_theme", theme);
    } catch (_) {}
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (theme === "light") {
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

  restoreChapterEditorScrollPositions() {
    if (this.activeView !== "chapter-outliner") return;
    const chKey = `${this.selectedBookId}-${this.selectedChapterNum}`;
    const scriptureScroll = this.scriptureScrollPositions[chKey];
    const outlineScroll = this.outlineScrollPositions[chKey];

    const applyScroll = () => {
      const scripturePanel = document.getElementById("chapter-scripture-panel");
      if (scripturePanel && typeof scriptureScroll === "number") {
        scripturePanel.scrollTop = scriptureScroll;
      }
      const outlineEditor = document.getElementById("chapter-rich-outline-editor");
      if (outlineEditor && typeof outlineScroll === "number") {
        outlineEditor.scrollTop = outlineScroll;
      }
    };

    applyScroll();
    requestAnimationFrame(applyScroll);
  }

  scrollActiveChapterPillIntoView() {
    if (this.activeView !== "chapter-outliner") return;
    const doScroll = () => {
      const pillsBar = document.getElementById("compact-chapter-pills-bar");
      const activePill =
        document.getElementById("active-chapter-pill") ||
        document.querySelector(`.quick-chapter-pill[data-quick-ch="${this.selectedChapterNum}"]`);
      if (pillsBar && activePill) {
        const pillRect = activePill.getBoundingClientRect();
        const barRect = pillsBar.getBoundingClientRect();
        const currentScroll = pillsBar.scrollLeft;
        const pillRelativeLeft = pillRect.left - barRect.left + currentScroll;
        const targetScrollLeft = Math.max(0, pillRelativeLeft - barRect.width / 2 + pillRect.width / 2);
        pillsBar.scrollLeft = targetScrollLeft;
        pillsBar.scrollTo({ left: targetScrollLeft, behavior: "auto" });

        if (
          document.activeElement === document.body ||
          document.activeElement?.classList?.contains("quick-chapter-pill")
        ) {
          try {
            activePill.focus({ preventScroll: true });
          } catch (e) {}
        }
      }
    };
    doScroll();
    requestAnimationFrame(doScroll);
  }

  moveHeadingUp(idx) {
    this.saveActiveChapterEditorBeforeSwitch();
    const chKey = `${this.selectedBookId}-${this.selectedChapterNum}`;
    const blocks = this.data.chapters[chKey]?.headingBlocks;
    if (!Array.isArray(blocks) || idx <= 0 || idx >= blocks.length) return;

    const temp = blocks[idx];
    blocks[idx] = blocks[idx - 1];
    blocks[idx - 1] = temp;

    if (window.collapsedHeadingsMap?.[chKey]) {
      const map = window.collapsedHeadingsMap[chKey];
      const c1 = map[idx];
      const c0 = map[idx - 1];
      map[idx - 1] = c1;
      map[idx] = c0;
    }

    saveOutlineStorage(this.data);
    this.notifyDataChanged();
    this.render();
  }

  moveHeadingDown(idx) {
    this.saveActiveChapterEditorBeforeSwitch();
    const chKey = `${this.selectedBookId}-${this.selectedChapterNum}`;
    const blocks = this.data.chapters[chKey]?.headingBlocks;
    if (!Array.isArray(blocks) || idx < 0 || idx >= blocks.length - 1) return;

    const temp = blocks[idx];
    blocks[idx] = blocks[idx + 1];
    blocks[idx + 1] = temp;

    if (window.collapsedHeadingsMap?.[chKey]) {
      const map = window.collapsedHeadingsMap[chKey];
      const c0 = map[idx];
      const c1 = map[idx + 1];
      map[idx + 1] = c0;
      map[idx] = c1;
    }

    saveOutlineStorage(this.data);
    this.notifyDataChanged();
    this.render();
  }

  reorderHeadings(fromIdx, toIdx) {
    this.saveActiveChapterEditorBeforeSwitch();
    const chKey = `${this.selectedBookId}-${this.selectedChapterNum}`;
    const blocks = this.data.chapters[chKey]?.headingBlocks;
    if (!Array.isArray(blocks) || fromIdx === toIdx) return;
    if (fromIdx < 0 || fromIdx >= blocks.length || toIdx < 0 || toIdx >= blocks.length) return;

    const [moved] = blocks.splice(fromIdx, 1);
    blocks.splice(toIdx, 0, moved);

    if (window.collapsedHeadingsMap?.[chKey]) {
      delete window.collapsedHeadingsMap[chKey];
    }

    saveOutlineStorage(this.data);
    this.notifyDataChanged();
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
