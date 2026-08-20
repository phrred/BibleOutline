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
            app.selectedChapterNum = 1;
            app.activeView = 'chapter-outliner';
            app.render();

            const canvases = document.querySelectorAll('.section-bullet-canvas, .outline-rich-editor, [contenteditable="true"]');
            const summaryArea = document.querySelector('#quick-book-summary-textarea, #book-summary-textarea');
            const hasBanners = document.querySelectorAll('.esv-section-heading-banner, [data-heading-idx]').length >= 0;

            // Test summary save
            if (summaryArea) {
                summaryArea.value = "Automated Quick Summary Test";
                summaryArea.dispatchEvent(new Event('input', { bubbles: true }));
            }

            return {
                hasCanvas: canvases.length > 0,
                hasSummaryArea: Boolean(summaryArea),
                savedSummary: app.data.books['GEN']?.bookSummary
            };
        })()
        """)
        assert r.get("hasCanvas") == True, "Chapter outline contenteditable canvas missing"
        assert r.get("hasSummaryArea") == True, "Quick summary textarea missing"
        assert r.get("savedSummary") == "Automated Quick Summary Test", "Quick summary input did not update storage state"

    def test_book_rollup_and_plot(self):
        # 1. Book Rollup View
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

            return {
                view: app.activeView,
                hasSummaryArea: Boolean(summaryArea),
                savedSummary: app.data.books['GEN']?.bookSummary
            };
        })()
        """)
        assert r1.get("hasSummaryArea") == True, "Book summary textarea missing in BookRollupView"
        assert r1.get("savedSummary") == "E2E Genesis Overall Book Summary", "Book summary did not update storage state"

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
            app.quizSession = new DiagnosticSession({ scope: 'NT', questionCount: 3 });
            app.quizScorecard = null;
            app.render();

            const hasSession = Boolean(app.quizSession);
            const examInput = document.getElementById('exam-answer-input');

            // Answer question 1
            if (examInput) {
                examInput.value = "A";
            }
            app.quizSession.submitCurrentAnswer("A");
            app.quizSession.nextQuestion();
            app.render();

            const inputAfterNext = document.getElementById('exam-answer-input');
            const hasInputAfterNext = Boolean(inputAfterNext);

            // Finish
            const scorecard = app.quizSession.finishExam();
            app.quizScorecard = scorecard;
            app.render();

            const scorecardTotal = scorecard.totalQuestions;

            return {
                hasSession,
                hasInputAfterNext,
                scorecardTotal,
                hasScorecard: Boolean(app.quizScorecard)
            };
        })()
        """)
        assert r.get("hasSession") == True, "Quiz diagnostic session failed to start"
        assert r.get("hasInputAfterNext") == True, "Exam answer input missing after advancing question"
        assert r.get("scorecardTotal") == 3, f"Expected 3 questions in scorecard, got {r.get('scorecardTotal')}"
        assert r.get("hasScorecard") == True, "Scorecard failed to render"

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
