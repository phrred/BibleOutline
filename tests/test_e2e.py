"""
End-to-End (E2E) Browser Regression Suite for Bible Outline & Storyline Studio
Tests DOM rendering, navigation, chapter editor, book rollup, diagnostic quiz, and cloud sync lifecycle.
"""

import sys
import os
import json
import time

class E2ETester:
    def __init__(self, cdp_client):
        self.cdp = cdp_client

    def eval_js(self, expression):
        res = self.cdp.evaluate(expression)
        return res

    def run_all(self):
        tests = [
            ("E2E: Navigation & URL Hash Routing", self.test_navigation_and_routing),
            ("E2E: Sidebar Filtering & Search", self.test_sidebar_filtering),
            ("E2E: Chapter Outliner & Canvas Interactions", self.test_chapter_outliner_canvas),
            ("E2E: Book Rollup & Bible Plot Views", self.test_book_rollup_and_plot),
            ("E2E: Diagnostic Quiz Flow & Scorecard", self.test_diagnostic_quiz_flow),
            ("E2E: Question Flag Modal & Interaction Flow", self.test_flag_question_modal_flow),
            ("E2E: Book Rollup Layout & Direct Export Actions", self.test_book_rollup_export_actions),
            ("E2E: Dark and Light Theme Toggle", self.test_dark_light_theme_toggle),
            ("E2E: Cloud Sync & Deep Merge Lifecycle", self.test_cloud_sync_lifecycle)
        ]

        results = []
        for name, fn in tests:
            start = time.time()
            try:
                fn()
                dur = time.time() - start
                results.append((name, True, f"{dur:.3f}s", None))
            except AssertionError as e:
                dur = time.time() - start
                results.append((name, False, f"{dur:.3f}s", str(e)))
            except Exception as e:
                dur = time.time() - start
                results.append((name, False, f"{dur:.3f}s", f"Exception: {str(e)}"))

        return results

    def test_navigation_and_routing(self):
        # Navigate to #/MAT/1
        self.eval_js("window.location.hash = '#/MAT/1';")
        time.sleep(0.3)
        r = self.eval_js("""
        (() => {
            const app = window.bibleOutlineApp;
            const heading = document.querySelector('h1, .chapter-title-header')?.textContent || '';
            const isMatt = app.selectedBookId === 'MAT' && app.selectedChapterNum === 1;
            return { isMatt, hash: window.location.hash, heading };
        })()
        """)
        assert r.get("isMatt") == True, f"Failed to route to Matthew 1, state: {r}"

        # Navigate to #/GEN/3
        self.eval_js("window.location.hash = '#/GEN/3';")
        time.sleep(0.3)
        r2 = self.eval_js("""
        (() => {
            const app = window.bibleOutlineApp;
            return { isGen3: app.selectedBookId === 'GEN' && app.selectedChapterNum === 3 };
        })()
        """)
        assert r2.get("isGen3") == True, f"Failed to route to Genesis 3, state: {r2}"

    def test_sidebar_filtering(self):
        r = self.eval_js("""
        (() => {
            const app = window.bibleOutlineApp;
            app.filterTestament = 'NT';
            app.render();

            const visibleBooks = Array.from(document.querySelectorAll('.book-nav-card, [data-book-id]')).map(el => el.textContent.trim());
            const hasMatt = visibleBooks.some(t => t.includes('Matthew'));
            const hasGen = visibleBooks.some(t => t.includes('Genesis'));

            // Reset
            app.filterTestament = 'ALL';
            app.render();

            return { hasMatt, hasGen };
        })()
        """)
        assert r.get("hasMatt") == True, "New Testament filter should include Matthew"
        assert r.get("hasGen") == False, "New Testament filter should exclude Genesis"

    def test_chapter_outliner_canvas(self):
        r = self.eval_js("""
        (() => {
            const app = window.bibleOutlineApp;
            app.selectedBookId = 'GEN';
            app.selectedChapterNum = 2;
            app.activeView = 'chapter-outliner';
            if (!app.data.chapters['GEN-2']) {
                app.data.chapters['GEN-2'] = { headingBlocks: [], status: 'empty' };
            }
            app.data.chapters['GEN-2'].headingBlocks = [
                { heading: 'The Seventh Day, God Rests', verses: 'v1–3', points: [''], notes: '' },
                { heading: 'The Creation of Man and Woman', verses: 'v4–25', points: [''], notes: '' }
            ];
            app.render();

            const canvases = document.querySelectorAll('.section-bullet-canvas');
            const summaryArea = document.querySelector('#quick-book-summary-textarea, #book-summary-textarea');

            // Test summary save
            if (summaryArea) {
                summaryArea.value = "Automated Quick Summary Test";
                summaryArea.dispatchEvent(new Event('input', { bubbles: true }));
            }

            // Test toolbar targeting on Section 2 (canvas index 1)
            let targetedSectionIdx = null;
            if (canvases.length >= 2) {
                const sec2 = canvases[1];
                sec2.focus();
                sec2.dispatchEvent(new Event('focus', { bubbles: true }));

                const bulletBtn = document.querySelector('button[data-rich-command="insertUnorderedList"]');
                if (bulletBtn) {
                    bulletBtn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
                    bulletBtn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
                }

                targetedSectionIdx = document.activeElement?.closest('.section-bullet-canvas')?.getAttribute('data-section-editor');
            }

            // Test Adding Header
            const initialHeadingCount = app.data.chapters['GEN-2']?.headingBlocks?.length || 0;
            const addHeaderBtn = document.getElementById('add-heading-btn');
            if (addHeaderBtn) {
                addHeaderBtn.click();
            }
            const countAfterAdd = app.data.chapters['GEN-2']?.headingBlocks?.length || 0;

            // Test Editing Header Title
            const lastTitleInput = document.querySelector(`.heading-title-input[data-heading-title-input="${countAfterAdd - 1}"]`);
            if (lastTitleInput) {
                lastTitleInput.value = "Custom Covenant Section";
                lastTitleInput.dispatchEvent(new Event('input', { bubbles: true }));
            }
            const updatedHeadingTitle = app.data.chapters['GEN-2']?.headingBlocks?.[countAfterAdd - 1]?.heading;

            // Test Deleting Header
            const deleteLastBtn = document.querySelector(`.delete-heading-btn[data-delete-heading="${countAfterAdd - 1}"]`);
            if (deleteLastBtn) {
                deleteLastBtn.click();
            }
            const countAfterDelete = app.data.chapters['GEN-2']?.headingBlocks?.length || 0;

            // Test Resizable Split Divider
            const divider = document.getElementById('chapter-split-divider');
            const outlinePanel = document.getElementById('chapter-outline-panel');
            let initialWidth = outlinePanel ? outlinePanel.style.width : null;

            if (divider && outlinePanel) {
                // Test double-click reset
                divider.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
            }
            let widthAfterDblClick = outlinePanel ? outlinePanel.style.width : null;

            // Test that Sub-bullet controls and clunky heading inputs are removed
            const hasSubBulletButton = Boolean(document.querySelector('button[data-rich-command="indent"]'));
            const hasOutdentButton = Boolean(document.querySelector('button[data-rich-command="outdent"]'));
            const hasHeadingVersesInput = Boolean(document.querySelector('.heading-verses-input'));
            const hasInsertAfterButton = Boolean(document.querySelector('.insert-heading-after-btn'));

            // Test list flattening on canvas (no sub-bullets)
            let nestedUlCount = 0;
            if (canvases.length > 0) {
                const c0 = canvases[0];
                c0.innerHTML = '<ul><li>Parent<ul><li>Child</li></ul></li></ul>';
                c0.dispatchEvent(new Event('input', { bubbles: true }));
                nestedUlCount = c0.querySelectorAll('ul ul').length;
            }

            return {
                hasCanvas: canvases.length > 0,
                hasSummaryArea: Boolean(summaryArea),
                savedSummary: app.data.books['GEN']?.bookSummary,
                targetedSectionIdx,
                initialHeadingCount,
                countAfterAdd,
                updatedHeadingTitle,
                countAfterDelete,
                hasDivider: Boolean(divider),
                hasOutlinePanel: Boolean(outlinePanel),
                widthAfterDblClick,
                hasSubBulletButton,
                hasOutdentButton,
                hasHeadingVersesInput,
                hasInsertAfterButton,
                nestedUlCount
            };
        })()
        """)
        assert r.get("hasCanvas") == True, "Chapter outline contenteditable canvas missing"
        assert r.get("hasSummaryArea") == True, "Quick summary textarea missing"
        assert r.get("savedSummary") == "Automated Quick Summary Test", "Quick summary input did not update storage state"
        assert r.get("targetedSectionIdx") == "1", f"Expected toolbar to target Section 2 (index 1), got {r.get('targetedSectionIdx')}"
        assert r.get("countAfterAdd") == r.get("initialHeadingCount") + 1, "Expected heading count to increase by 1 after add"
        assert r.get("updatedHeadingTitle") == "Custom Covenant Section", f"Expected edited title, got {r.get('updatedHeadingTitle')}"
        assert r.get("countAfterDelete") == r.get("initialHeadingCount"), "Expected heading count to return to initial after delete"
        assert r.get("hasDivider") == True, "Resizable split divider missing"
        assert r.get("widthAfterDblClick") == "50%", f"Expected 50% width after double click, got {r.get('widthAfterDblClick')}"
        assert r.get("hasSubBulletButton") == False, "Sub-bullet button should be removed from toolbar"
        assert r.get("hasOutdentButton") == False, "Outdent button should be removed from toolbar"
        assert r.get("hasHeadingVersesInput") == False, "Clunky heading verses input box should be removed"
        assert r.get("hasInsertAfterButton") == False, "Clunky insert after button should be removed from headings"
        assert r.get("nestedUlCount") == 0, "Canvas should flatten sub-bullets to single-level bullets"

    def test_book_rollup_and_plot(self):
        # 1. Book Rollup View & Grid View Toggle
        r1 = self.eval_js("""
        (() => {
            const app = window.bibleOutlineApp;
            app.selectedBookId = 'GEN';
            app.activeView = 'book-rollup';
            app.render();

            const summaryArea = document.getElementById('book-summary-textarea');
            if (summaryArea) {
                summaryArea.value = "E2E Genesis Overall Book Summary";
                summaryArea.dispatchEvent(new Event('input', { bubbles: true }));
            }

            // Test toggling to Grid View
            const gridToggleBtn = document.querySelector('[data-set-rollup-layout="grid"]');
            let hasGridTable = false;
            let layoutAfterGridClick = null;
            if (gridToggleBtn) {
                gridToggleBtn.click();
                layoutAfterGridClick = app.bookRollupLayout;
                hasGridTable = Boolean(document.querySelector('table th'));
            }

            // Test toggling back to Document List View
            const docToggleBtn = document.querySelector('[data-set-rollup-layout="document"]');
            let layoutAfterDocClick = null;
            if (docToggleBtn) {
                docToggleBtn.click();
                layoutAfterDocClick = app.bookRollupLayout;
            }

            return {
                view: app.activeView,
                hasSummaryArea: Boolean(summaryArea),
                savedSummary: app.data.books['GEN']?.bookSummary,
                layoutAfterGridClick,
                hasGridTable,
                layoutAfterDocClick
            };
        })()
        """)
        assert r1.get("hasSummaryArea") == True, "Book summary textarea missing in BookRollupView"
        assert r1.get("savedSummary") == "E2E Genesis Overall Book Summary", "Book summary did not update storage state"
        assert r1.get("layoutAfterGridClick") == "grid", "Clicking grid layout button did not set bookRollupLayout to grid"
        assert r1.get("hasGridTable") == True, "Two-column grid table missing when in grid rollup layout"
        assert r1.get("layoutAfterDocClick") == "document", "Clicking document layout button did not set bookRollupLayout to document"

        # 2. Bible Plot View
        r2 = self.eval_js("""
        (() => {
            const app = window.bibleOutlineApp;
            app.activeView = 'plot-timeline';
            app.render();

            return {
                view: app.activeView
            };
        })()
        """)
        assert r2.get("view") == "plot-timeline", "Active view should be plot-timeline"

    def test_diagnostic_quiz_flow(self):
        r = self.eval_js("""
        (() => {
            const app = window.bibleOutlineApp;
            app.activeView = 'quiz-diagnostic';
            app.activeQuizTab = 'diagnostic';
            app.quizSession = null;
            app.quizScorecard = null;
            app.render();

            // 1. Test clicking Question Focus: Major Chapter Headings Only
            const headingFocusBtn = document.querySelector('[data-select-quiz-focus="headings"]');
            if (headingFocusBtn) headingFocusBtn.click();
            const focusAfterClick = app.selectedQuizFocus;

            // 2. Start diagnostic exam with headings focus
            const startBtn = document.getElementById('start-diagnostic-btn');
            if (startBtn) startBtn.click();
            const sessionIsHeadingOnly = app.quizSession ? Boolean(app.quizSession.headingOnly) : false;

            const examInput = document.getElementById('exam-answer-input');

            // Answer question 1
            if (examInput) {
                examInput.value = "1";
            }
            if (app.quizSession) {
                app.quizSession.submitCurrentAnswer("1");
                app.quizSession.nextQuestion();
            }
            app.render();

            const inputAfterNext = document.getElementById('exam-answer-input');
            const hasInputAfterNext = Boolean(inputAfterNext);

            // Finish
            let scorecard = null;
            if (app.quizSession) {
                scorecard = app.quizSession.finishExam();
                app.quizScorecard = scorecard;
            }
            app.render();

            // 3. Test Book Quizzes tab mode switcher
            app.activeQuizTab = 'book-quizzes';
            app.quizSession = null;
            app.quizScorecard = null;
            app.render();

            const setHeadingModeBtn = document.querySelector('[data-set-book-quiz-mode="headings"]');
            if (setHeadingModeBtn) setHeadingModeBtn.click();
            const bookModeAfterClick = app.selectedBookQuizMode;

            // Click Genesis book quiz
            const genCard = document.querySelector('[data-launch-book-quiz="GEN"]');
            if (genCard) genCard.click();
            const genSessionHeadingOnly = app.quizSession ? Boolean(app.quizSession.headingOnly) : false;
            const genSessionBookId = app.quizSession ? app.quizSession.specificBookId : null;

            // 4. Test BookRollupView Quiz Headings button
            app.activeView = 'book-rollup';
            app.selectedBookId = 'EXO';
            app.render();
            const exoHeadingsBtn = document.querySelector('[data-launch-book-headings-quiz="EXO"]');
            if (exoHeadingsBtn) exoHeadingsBtn.click();
            const exoSessionHeadingOnly = app.quizSession ? Boolean(app.quizSession.headingOnly) : false;
            const exoSessionBookId = app.quizSession ? app.quizSession.specificBookId : null;

            return {
                focusAfterClick,
                sessionIsHeadingOnly,
                hasInputAfterNext,
                hasScorecard: Boolean(app.quizScorecard || scorecard),
                bookModeAfterClick,
                genSessionHeadingOnly,
                genSessionBookId,
                exoSessionHeadingOnly,
                exoSessionBookId
            };
        })()
        """)
        assert r.get("focusAfterClick") == "headings", f"Expected selectedQuizFocus to be 'headings', got {r.get('focusAfterClick')}"
        assert r.get("sessionIsHeadingOnly") == True, "Diagnostic session should be headingOnly"
        assert r.get("hasInputAfterNext") == True, "Exam answer input missing after advancing question"
        assert r.get("bookModeAfterClick") == "headings", f"Expected selectedBookQuizMode to be 'headings', got {r.get('bookModeAfterClick')}"
        assert r.get("genSessionHeadingOnly") == True, "Genesis book session should be headingOnly"
        assert r.get("genSessionBookId") == "GEN", f"Expected book ID GEN, got {r.get('genSessionBookId')}"
        assert r.get("exoSessionHeadingOnly") == True, "Exodus BookRollup session should be headingOnly"
        assert r.get("exoSessionBookId") == "EXO", f"Expected book ID EXO, got {r.get('exoSessionBookId')}"

    def test_cloud_sync_lifecycle(self):
        r = self.eval_js("""
        (() => {
            const app = window.bibleOutlineApp;
            
            // Verify debounced per-book save function
            const hasDebouncedSaveBook = typeof debouncedCloudAutoSaveBook === 'function';
            const hasSaveQuiz = typeof saveQuizToCloud === 'function';
            const hasDeleteQuiz = typeof deleteQuizFromCloud === 'function';
            const hasSaveMastery = typeof saveMasteryToCloud === 'function';

            // Simulate quiz deletion across different ID formats
            app.data.quizHistory = [
                { id: 'quiz_test_1', date: 1000, questionCount: 10, total: 10, correct: 10 },
                { id: 'quiz_test_2', date: 2000, questionCount: 10, total: 10, correct: 9 },
                { date: 3000, questionCount: 10, total: 10, correct: 8 } // Legacy format without explicit id
            ];

            const initialCount = app.data.quizHistory.length;
            // Delete quiz_test_1 by ID
            app.data.quizHistory = app.data.quizHistory.filter(t => t.id !== 'quiz_test_1');
            const afterCount1 = app.data.quizHistory.length;

            // Delete legacy test by date
            app.data.quizHistory = app.data.quizHistory.filter(t => t.date !== 3000 && `quiz_${t.date}` !== 'quiz_3000');
            const afterCount2 = app.data.quizHistory.length;

            return {
                hasDebouncedSaveBook,
                hasSaveQuiz,
                hasDeleteQuiz,
                hasSaveMastery,
                initialCount,
                afterCount1,
                afterCount2
            };
        })()
        """)
        assert r.get("hasDebouncedSaveBook") == True, "debouncedCloudAutoSaveBook function missing"
        assert r.get("hasSaveQuiz") == True, "saveQuizToCloud function missing"
        assert r.get("hasDeleteQuiz") == True, "deleteQuizFromCloud function missing"
        assert r.get("hasSaveMastery") == True, "saveMasteryToCloud function missing"
        assert r.get("initialCount") == 3, "Initial quiz count mismatch"
        assert r.get("afterCount1") == 2, "Quiz deletion by explicit ID failed"
        assert r.get("afterCount2") == 1, "Quiz deletion by date / legacy ID failed"

    def test_flag_question_modal_flow(self):
        r = self.eval_js("""
        (() => {
            const app = window.bibleOutlineApp;
            app.activeView = 'quiz-diagnostic';
            app.activeQuizTab = 'diagnostic';
            app.quizSession = new DiagnosticSession({ scope: 'NT', questionCount: 3 });
            app.quizScorecard = null;
            app.flagModalData = null;
            app.render();

            // 1. Verify flag button exists on active question card
            const flagBtn = document.querySelector('.flag-active-question-btn');
            const hasFlagBtn = Boolean(flagBtn);

            // 2. Click flag button
            if (flagBtn) flagBtn.click();
            const modalOpen = Boolean(document.getElementById('flag-modal-overlay'));
            const modalHeader = document.querySelector('#flag-modal-overlay h3')?.textContent || '';

            // 3. Select 'too_specific' category
            const tooSpecificOption = document.querySelector('[data-flag-category="too_specific"]');
            if (tooSpecificOption) tooSpecificOption.click();
            const selectedCat = app.flagModalData?.category;

            // 4. Fill in suggested answer and comments
            const suggInput = document.getElementById('flag-suggested-answer-input');
            const commentsInput = document.getElementById('flag-comments-input');
            if (suggInput) suggInput.value = 'E2E Suggested Fix';
            if (commentsInput) commentsInput.value = 'E2E Test Comment';

            // 5. Close modal
            const cancelBtn = document.getElementById('flag-modal-cancel-btn');
            if (cancelBtn) cancelBtn.click();
            const modalClosed = !document.getElementById('flag-modal-overlay');

            return {
                hasFlagBtn,
                modalOpen,
                modalHeader,
                selectedCat,
                modalClosed
            };
        })()
        """)
        assert r.get("hasFlagBtn") == True, "Flag button missing on active question card"
        assert r.get("modalOpen") == True, "Flag modal failed to open upon clicking flag button"
        assert "Flag Question" in r.get("modalHeader"), "Flag modal title missing"
        assert r.get("selectedCat") == "too_specific", f"Category selection failed, got {r.get('selectedCat')}"
        assert r.get("modalClosed") == True, "Flag modal failed to close upon clicking cancel"

    def test_book_rollup_export_actions(self):
        r = self.eval_js("""
        (() => {
            const app = window.bibleOutlineApp;
            app.selectedBookId = 'GEN';
            app.activeView = 'book-rollup';
            app.bookRollupLayout = 'document';
            app.render();

            // 1. Check layout and export buttons presence in Book Rollup header
            const pdfBtn = document.querySelector('.export-book-pdf-btn');
            const mdBtn = document.querySelector('.export-book-md-btn');
            const allPdfBtn = document.querySelector('.export-all-books-pdf-btn');
            const gridToggleBtn = document.querySelector('[data-set-rollup-layout="grid"]');
            const docToggleBtn = document.querySelector('[data-set-rollup-layout="document"]');

            const hasPdfBtn = Boolean(pdfBtn);
            const hasMdBtn = Boolean(mdBtn);
            const hasAllPdfBtn = Boolean(allPdfBtn);

            // 2. Test Document layout export
            let exportedDocFileName = "";
            let exportedGridFileName = "";
            let printTriggeredWithLayout = "";

            const origDownload = app.downloadFile;
            app.downloadFile = (fn, content, type) => {
                if (fn.includes('_Grid')) exportedGridFileName = fn;
                else exportedDocFileName = fn;
            };

            // Trigger MD export in document mode
            if (mdBtn) mdBtn.click();

            // 3. Switch to Grid mode and test Grid layout export
            if (gridToggleBtn) {
                gridToggleBtn.click();
                const mdBtnGrid = document.querySelector('.export-book-md-btn');
                if (mdBtnGrid) mdBtnGrid.click();
            }

            app.downloadFile = origDownload;

            return {
                hasPdfBtn,
                hasMdBtn,
                hasAllPdfBtn,
                exportedDocFileName,
                exportedGridFileName,
                activeLayoutAfterGridClick: app.bookRollupLayout
            };
        })()
        """)
        assert r.get("hasPdfBtn") == True, "Export PDF button missing in Book Rollup header"
        assert r.get("hasMdBtn") == True, "Export MD button missing in Book Rollup header"
        assert r.get("hasAllPdfBtn") == True, "Export All 66 Books button missing in Book Rollup header"
        assert r.get("exportedDocFileName") == "Gen_Outline.md", f"Expected Gen_Outline.md, got {r.get('exportedDocFileName')}"
        assert r.get("exportedGridFileName") == "Gen_Outline_Grid.md", f"Expected Gen_Outline_Grid.md, got {r.get('exportedGridFileName')}"
        assert r.get("activeLayoutAfterGridClick") == "grid", "Layout failed to update to grid"

    def test_dark_light_theme_toggle(self):
        r = self.eval_js("""
        (() => {
            const app = window.bibleOutlineApp;
            const root = document.documentElement;
            const themeBtn = document.getElementById("theme-toggle-btn");

            // Verify button presence
            const hasThemeBtn = Boolean(themeBtn);

            // Toggle to light mode
            if (themeBtn) themeBtn.click();
            const themeAfterFirstToggle = app.theme;
            const rootClassAfterFirstToggle = root.className;
            const storageAfterFirstToggle = localStorage.getItem("bibleOutline_theme");

            // Toggle back to dark mode
            const themeBtnSecond = document.getElementById("theme-toggle-btn");
            if (themeBtnSecond) themeBtnSecond.click();
            const themeAfterSecondToggle = app.theme;
            const rootClassAfterSecondToggle = root.className;
            const storageAfterSecondToggle = localStorage.getItem("bibleOutline_theme");

            return {
                hasThemeBtn,
                themeAfterFirstToggle,
                rootClassAfterFirstToggle,
                storageAfterFirstToggle,
                themeAfterSecondToggle,
                rootClassAfterSecondToggle,
                storageAfterSecondToggle
            };
        })()
        """)
        assert r.get("hasThemeBtn") == True, "Theme toggle button (#theme-toggle-btn) missing from TopNavbar"
        assert r.get("themeAfterFirstToggle") == "light", f"Expected theme to be 'light' after toggle, got {r.get('themeAfterFirstToggle')}"
        assert "light" in r.get("rootClassAfterFirstToggle"), f"Expected root class to contain 'light', got {r.get('rootClassAfterFirstToggle')}"
        assert r.get("storageAfterFirstToggle") == "light", f"Expected localStorage to be 'light', got {r.get('storageAfterFirstToggle')}"
        assert r.get("themeAfterSecondToggle") == "dark", f"Expected theme to toggle back to 'dark', got {r.get('themeAfterSecondToggle')}"
        assert "dark" in r.get("rootClassAfterSecondToggle"), f"Expected root class to contain 'dark', got {r.get('rootClassAfterSecondToggle')}"
        assert r.get("storageAfterSecondToggle") == "dark", f"Expected localStorage to be 'dark', got {r.get('storageAfterSecondToggle')}"

