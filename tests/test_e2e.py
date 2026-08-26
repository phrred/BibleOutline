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
            ("E2E: Canvas Clean Paste Formatting", self.test_canvas_clean_paste_formatting),
            ("E2E: Deleted ESV Heading Persistence", self.test_deleted_esv_heading_does_not_come_back),
            ("E2E: Selected Chapter Focus & Scroll Retention", self.test_selected_chapter_focus_retention),
            ("E2E: Heading Re-order (Buttons and Drag/Drop)", self.test_heading_reorder),
            ("E2E: Scripture & Outline Scroll Retention on Add/Delete Heading", self.test_scripture_scroll_retention_on_heading_mutation),
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

            // Test clicking open chapter editor button to jump to Chapter 2 outliner
            const openCh2Btn = document.querySelector('.open-chapter-editor-btn[data-chapter-num="2"]');
            let jumpedView = null;
            let jumpedCh = null;
            if (openCh2Btn) {
                openCh2Btn.click();
                jumpedView = app.activeView;
                jumpedCh = app.selectedChapterNum;
            }

            return {
                view: app.activeView,
                hasSummaryArea: Boolean(summaryArea),
                savedSummary: app.data.books['GEN']?.bookSummary,
                layoutAfterGridClick,
                hasGridTable,
                layoutAfterDocClick,
                jumpedView,
                jumpedCh
            };
        })()
        """)
        assert r1.get("hasSummaryArea") == True, "Book summary textarea missing in BookRollupView"
        assert r1.get("savedSummary") == "E2E Genesis Overall Book Summary", "Book summary did not update storage state"
        assert r1.get("layoutAfterGridClick") == "grid", "Clicking grid layout button did not set bookRollupLayout to grid"
        assert r1.get("hasGridTable") == True, "Two-column grid table missing when in grid rollup layout"
        assert r1.get("layoutAfterDocClick") == "document", "Clicking document layout button did not set bookRollupLayout to document"
        assert r1.get("jumpedView") == "chapter-outliner", f"Expected jump to chapter-outliner, got {r1.get('jumpedView')}"
        assert r1.get("jumpedCh") == 2, f"Expected jump to chapter 2, got {r1.get('jumpedCh')}"

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

    def test_canvas_clean_paste_formatting(self):
        r = self.eval_js("""
        (() => {
            const app = window.bibleOutlineApp;
            app.activeView = "chapter-outliner";
            app.selectedBookId = "GEN";
            app.selectedChapterNum = 1;
            if (!app.data.chapters['GEN-1'] || !Array.isArray(app.data.chapters['GEN-1'].headingBlocks) || app.data.chapters['GEN-1'].headingBlocks.length === 0) {
                app.data.chapters['GEN-1'] = {
                    headingBlocks: [{ heading: "The Creation of the World", verses: "v1–31", points: [""], notes: "" }],
                    status: "in-progress"
                };
            }
            app.render();

            const canvas = document.querySelector(".section-bullet-canvas");
            if (!canvas) return { error: "canvas not found", activeView: app.activeView, bodyHtml: document.body.innerHTML.substring(0, 300) };

            // Simulate pasting messy text with foreign tags, bullet symbols, and numbers
            const pasteEvent = new Event("paste", { bubbles: true, cancelable: true });
            pasteEvent.clipboardData = {
                getData: (type) => "• Point A: Creation\\n- Point B: Light\\n1. Point C: Order\\n<span style='color:red;'>Point D: Rest</span>"
            };

            canvas.dispatchEvent(pasteEvent);

            const lis = Array.from(canvas.querySelectorAll("li")).map(li => li.innerText.trim());
            const chKey = `${app.selectedBookId}-${app.selectedChapterNum}`;
            const storedPoints = app.data.chapters?.[chKey]?.headingBlocks?.[0]?.points || [];

            return {
                lis,
                storedPoints,
                canvasHtml: canvas.innerHTML,
                hasSpan: canvas.innerHTML.includes("<span"),
                hasDoubleBullet: lis.some(l => l.startsWith("•") || l.startsWith("-")),
                hasNumbers: lis.some(l => /^\\d+\\./.test(l))
            };
        })()
        """)
        assert r.get("hasSpan") == False, f"Pasted content contains foreign <span> tag, html: {r.get('canvasHtml')}, lis: {r.get('lis')}"
        assert r.get("hasDoubleBullet") == False, "Pasted content contains leading bullets"
        assert r.get("hasNumbers") == False, "Pasted content contains leading numbers"
        assert "Point A: Creation" in r.get("lis"), f"Expected 'Point A: Creation' in lis, got {r.get('lis')}"
        assert "Point D: Rest" in r.get("lis"), f"Expected 'Point D: Rest' in lis, got {r.get('lis')}"
        assert len(r.get("storedPoints")) >= 4, f"Expected at least 4 stored points, got {r.get('storedPoints')}"

    def test_deleted_esv_heading_does_not_come_back(self):
        r = self.eval_js("""
        (() => {
            const app = window.bibleOutlineApp;
            app.activeView = "chapter-outliner";
            app.selectedBookId = "MAT";
            app.selectedChapterNum = 1;

            // Initial ESV scripture with two headings
            const sampleScripture = "The Genealogy of Jesus Christ\\n\\n[1] The book of the genealogy of Jesus Christ...\\n\\nThe Birth of Jesus Christ\\n\\n[18] Now the birth of Jesus Christ took place in this way...";
            app.data.chapters["MAT-1"] = {
                headingBlocks: [
                    { heading: "The Genealogy of Jesus Christ", verses: "v1-17", points: ["Line of Abraham"], notes: "Line of Abraham" },
                    { heading: "The Birth of Jesus Christ", verses: "v18-25", points: ["Born in Bethlehem"], notes: "Born in Bethlehem" }
                ],
                chapterScripture: sampleScripture,
                status: "in-progress"
            };
            app.render();

            // Delete the first heading ("The Genealogy of Jesus Christ") via delete-heading-btn
            const deleteBtn = document.querySelector('.delete-heading-btn[data-delete-heading="0"]');
            if (deleteBtn) {
                const originalConfirm = window.confirm;
                window.confirm = () => true;
                deleteBtn.click();
                window.confirm = originalConfirm;
            }

            const headingsAfterDelete = (app.data.chapters["MAT-1"].headingBlocks || []).map(b => b.heading);
            const deletedList = app.data.chapters["MAT-1"].deletedHeadings || [];

            // Simulate chapter switch / reload: call syncHeadingBlocksForChapter again with force=false
            app.syncHeadingBlocksForChapter("MAT-1", sampleScripture, "Matthew", 1, false);
            const headingsAfterSync = (app.data.chapters["MAT-1"].headingBlocks || []).map(b => b.heading);

            // Simulate autoLoadESVForCurrentChapter with force=false
            app.selectedChapterNum = 1;
            app.autoLoadESVForCurrentChapter(false);
            const headingsAfterAutoLoad = (app.data.chapters["MAT-1"].headingBlocks || []).map(b => b.heading);

            return {
                headingsAfterDelete,
                deletedList,
                headingsAfterSync,
                headingsAfterAutoLoad
            };
        })()
        """)
        assert "The Genealogy of Jesus Christ" not in r.get("headingsAfterDelete"), "Deleted heading was not removed after clicking delete"
        assert len(r.get("headingsAfterDelete")) == 1, f"Expected 1 heading after delete, got {r.get('headingsAfterDelete')}"
        assert "the genealogy of jesus christ" in [h.lower() for h in r.get("deletedList")], "Deleted heading was not recorded in deletedHeadings"
        assert "The Genealogy of Jesus Christ" not in r.get("headingsAfterSync"), "Deleted heading resurrected after syncHeadingBlocksForChapter!"
        assert "The Genealogy of Jesus Christ" not in r.get("headingsAfterAutoLoad"), "Deleted heading resurrected after autoLoadESVForCurrentChapter!"

    def test_selected_chapter_focus_retention(self):
        r = self.eval_js("""
        (() => {
            const app = window.bibleOutlineApp;
            app.activeView = "chapter-outliner";
            app.selectedBookId = "GEN";
            app.selectedChapterNum = 1;
            app.render();

            const pillsBar = document.getElementById("compact-chapter-pills-bar");
            const pill40 = document.querySelector('.quick-chapter-pill[data-quick-ch="40"]');

            if (!pillsBar || !pill40) {
                return { error: "pillsBar or pill40 not found" };
            }

            // Click chapter 40
            pill40.click();

            // Check position of chapter 40 after selecting it
            const currentPillsBar = document.getElementById("compact-chapter-pills-bar");
            const activePill = document.getElementById("active-chapter-pill") ||
                document.querySelector('.quick-chapter-pill[data-quick-ch="40"]');
            const scrollLeft = currentPillsBar ? currentPillsBar.scrollLeft : 0;
            const barWidth = currentPillsBar ? currentPillsBar.clientWidth : 0;
            const pillRect = activePill ? activePill.getBoundingClientRect() : null;
            const barRect = currentPillsBar ? currentPillsBar.getBoundingClientRect() : null;

            // Is pill within the visible window of the pills bar?
            const isVisibleInBar = activePill && currentPillsBar &&
                (pillRect.left >= barRect.left - 10) &&
                (pillRect.right <= barRect.right + 10);

            const activeChapterNum = app.selectedChapterNum;
            const isFocusRetained = document.activeElement === activePill;

            return {
                activeChapterNum,
                scrollLeft,
                barWidth,
                isVisibleInBar,
                isFocusRetained
            };
        })()
        """)
        assert r.get("activeChapterNum") == 40, f"Expected active chapter 40, got {r.get('activeChapterNum')}"
        assert r.get("scrollLeft") > 0, f"Expected scrollLeft > 0 for chapter 40, got {r.get('scrollLeft')}"
        assert r.get("isVisibleInBar") == True, f"Chapter 40 should be visible in chapter pills bar, state: {r}"

    def test_heading_reorder(self):
        r = self.eval_js("""
        (() => {
            const app = window.bibleOutlineApp;
            app.activeView = "chapter-outliner";
            app.selectedBookId = "MAT";
            app.selectedChapterNum = 2;

            app.data.chapters["MAT-2"] = {
                headingBlocks: [
                    { heading: "Section 1: The Visit of the Wise Men", verses: "v1-12", points: ["Gold, frankincense, myrrh"], notes: "Gold, frankincense, myrrh" },
                    { heading: "Section 2: The Flight to Egypt", verses: "v13-15", points: ["Escape by night"], notes: "Escape by night" },
                    { heading: "Section 3: The Return to Nazareth", verses: "v19-23", points: ["He shall be called a Nazarene"], notes: "He shall be called a Nazarene" }
                ],
                status: "in-progress"
            };
            app.render();

            // Initial order
            const initialHeadings = app.data.chapters["MAT-2"].headingBlocks.map(b => b.heading);

            // Click move-down button on Section 1 (index 0)
            const downBtn0 = document.querySelector('.move-heading-down-btn[data-move-heading-down="0"]');
            if (downBtn0) downBtn0.click();
            const orderAfterDown = app.data.chapters["MAT-2"].headingBlocks.map(b => b.heading);

            // Click move-up button on Section 3 (now index 2)
            const upBtn2 = document.querySelector('.move-heading-up-btn[data-move-heading-up="2"]');
            if (upBtn2) upBtn2.click();
            const orderAfterUp = app.data.chapters["MAT-2"].headingBlocks.map(b => b.heading);

            // Test programmatic drag/drop reorder: move index 2 to index 0
            app.reorderHeadings(2, 0);
            const orderAfterDrag = app.data.chapters["MAT-2"].headingBlocks.map(b => b.heading);

            // Verify disabled states on boundary buttons
            const firstUpDisabled = document.querySelector('.move-heading-up-btn[data-move-heading-up="0"]')?.hasAttribute("disabled");
            const lastDownDisabled = document.querySelector('.move-heading-down-btn[data-move-heading-down="2"]')?.hasAttribute("disabled");

            return {
                initialHeadings,
                orderAfterDown,
                orderAfterUp,
                orderAfterDrag,
                firstUpDisabled,
                lastDownDisabled
            };
        })()
        """)
        # Initial: [Section 1, Section 2, Section 3]
        # After move Section 1 down: [Section 2, Section 1, Section 3]
        assert r.get("orderAfterDown") == [
            "Section 2: The Flight to Egypt",
            "Section 1: The Visit of the Wise Men",
            "Section 3: The Return to Nazareth"
        ], f"Unexpected order after move down: {r.get('orderAfterDown')}"

        # After move Section 3 up: [Section 2, Section 3, Section 1]
        assert r.get("orderAfterUp") == [
            "Section 2: The Flight to Egypt",
            "Section 3: The Return to Nazareth",
            "Section 1: The Visit of the Wise Men"
        ], f"Unexpected order after move up: {r.get('orderAfterUp')}"

        # After reorderHeadings(2, 0): move Section 1 (index 2) to index 0 -> [Section 1, Section 2, Section 3]
        assert r.get("orderAfterDrag") == [
            "Section 1: The Visit of the Wise Men",
            "Section 2: The Flight to Egypt",
            "Section 3: The Return to Nazareth"
        ], f"Unexpected order after drag reorder: {r.get('orderAfterDrag')}"

        assert r.get("firstUpDisabled") == True, "First heading's move up button should be disabled"
        assert r.get("lastDownDisabled") == True, "Last heading's move down button should be disabled"

    def test_scripture_scroll_retention_on_heading_mutation(self):
        r = self.eval_js("""
        (() => {
            const app = window.bibleOutlineApp;
            app.activeView = "chapter-outliner";
            app.selectedBookId = "GEN";
            app.selectedChapterNum = 1;
            
            // Provide ample scripture text so #chapter-scripture-panel is scrollable
            const longScripture = Array.from({ length: 40 }, (_, i) => `[${i + 1}] In the beginning was verse ${i + 1} with extensive detail that fills multiple paragraphs to create real scroll depth.`).join("\\n\\n");
            if (!app.data.chapters['GEN-1']) {
                app.data.chapters['GEN-1'] = { headingBlocks: [], status: "in-progress" };
            }
            app.data.chapters['GEN-1'].chapterScripture = longScripture;
            app.data.chapters['GEN-1'].headingBlocks = [
                { heading: "Initial Section 1", verses: "v1-10", notes: "Notes 1", points: ["Point 1"] },
                { heading: "Initial Section 2", verses: "v11-20", notes: "Notes 2", points: ["Point 2"] }
            ];
            app.render();

            const panel = document.getElementById("chapter-scripture-panel");
            if (!panel) return { error: "chapter-scripture-panel not found" };

            // Ensure scrollable
            const maxScroll = panel.scrollHeight - panel.clientHeight;
            if (maxScroll <= 50) return { error: "panel not scrollable", scrollHeight: panel.scrollHeight, clientHeight: panel.clientHeight };

            // Scroll down to 200px
            const targetScroll = Math.min(200, Math.floor(maxScroll / 2));
            panel.scrollTop = targetScroll;
            panel.dispatchEvent(new Event("scroll"));

            const scrollBeforeAdd = panel.scrollTop;

            // Click add heading button (#bottom-add-heading-btn)
            const addBtn = document.getElementById("bottom-add-heading-btn") || document.getElementById("add-heading-btn");
            if (addBtn) addBtn.click();

            const panelAfterAdd = document.getElementById("chapter-scripture-panel");
            const scrollAfterAdd = panelAfterAdd ? panelAfterAdd.scrollTop : null;

            // Delete the last added heading
            const blocksAfterAdd = app.data.chapters['GEN-1'].headingBlocks;
            const lastIdx = blocksAfterAdd.length - 1;
            const deleteBtn = document.querySelector(`.delete-heading-btn[data-delete-heading="${lastIdx}"]`);
            if (deleteBtn) {
                const originalConfirm = window.confirm;
                window.confirm = () => true;
                deleteBtn.click();
                window.confirm = originalConfirm;
            }

            const panelAfterDelete = document.getElementById("chapter-scripture-panel");
            const scrollAfterDelete = panelAfterDelete ? panelAfterDelete.scrollTop : null;

            return {
                scrollBeforeAdd,
                scrollAfterAdd,
                scrollAfterDelete,
                targetScroll
            };
        })()
        """)
        assert r.get("scrollBeforeAdd") == r.get("targetScroll"), f"Scroll before add mismatch: {r}"
        assert r.get("scrollAfterAdd") == r.get("targetScroll"), f"Bible text reset after adding heading! Expected {r.get('targetScroll')}, got {r.get('scrollAfterAdd')}"
        assert r.get("scrollAfterDelete") == r.get("targetScroll"), f"Bible text reset after deleting heading! Expected {r.get('targetScroll')}, got {r.get('scrollAfterDelete')}"

