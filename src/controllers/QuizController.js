import { getBookById } from "../data/bible_catalog.js";
import { DiagnosticSession } from "../quiz_engine.js";
import {
  saveQuizToCloud,
  saveMasteryToCloud,
  deleteQuizFromCloud,
  clearAllQuizzesFromCloud
} from "../firebase_sync.js";
import { fetchESVChapter, formatESVTextToHTML } from "../esv_api.js";

/**
 * QuizController
 * Encapsulates diagnostic quiz sessions, exam answering, scorecard review,
 * past test history management, inline scripture inspection, and question flagging.
 */
export function attachQuizListeners(app) {
  // Flag Modal event listeners can appear in any view if opened
  attachFlagModalListeners(app);

  // Book quiz launch buttons can appear in book rollup view or quiz view
  const launchBookQuizBtns = document.querySelectorAll(".launch-book-quiz-btn");
  launchBookQuizBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const bId = btn.getAttribute("data-launch-book-quiz");
      const mode = btn.getAttribute("data-quiz-mode") || app.selectedBookQuizMode || "all";
      const bObj = getBookById(bId);
      if (!bObj) return;
      app.selectedBookId = bId;
      app.activeView = "quiz-diagnostic";
      app.activeQuizTab = "diagnostic";
      app.quizSession = new DiagnosticSession({
        scope: "ALL",
        questionCount: Math.min(bObj.chapterCount, 15),
        specificBookId: bId,
        headingOnly: mode === "headings"
      });
      app.quizScorecard = null;
      app.viewingPastTest = null;
      app.retakeModalTest = null;
      app.render();
    });
  });

  const launchBookHeadingsQuizBtns = document.querySelectorAll(".launch-book-headings-quiz-btn");
  launchBookHeadingsQuizBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const bId = btn.getAttribute("data-launch-book-headings-quiz");
      const bObj = getBookById(bId);
      if (!bObj) return;
      app.selectedBookId = bId;
      app.activeView = "quiz-diagnostic";
      app.activeQuizTab = "diagnostic";
      app.quizSession = new DiagnosticSession({
        scope: "ALL",
        questionCount: Math.min(bObj.chapterCount, 15),
        specificBookId: bId,
        headingOnly: true
      });
      app.quizScorecard = null;
      app.viewingPastTest = null;
      app.retakeModalTest = null;
      app.render();
    });
  });

  if (app.activeView !== "quiz-diagnostic") return;

  // 1. Quiz Tab Switching
  const quizTabBtns = document.querySelectorAll(".quiz-tab-switch-btn");
  quizTabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tab = btn.getAttribute("data-quiz-tab");
      app.quizSession = null;
      app.quizScorecard = null;
      app.retakeModalTest = null;
      app.navigateTo({
        activeView: "quiz-diagnostic",
        activeQuizTab: tab,
        viewingPastTest: null
      });
    });
  });

  // 2. Quiz Configuration Selection Buttons
  const selectScopeBtns = document.querySelectorAll(".select-scope-btn");
  selectScopeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      app.selectedQuizScope = btn.getAttribute("data-select-scope");
      app.render();
    });
  });

  const selectFocusBtns = document.querySelectorAll(".select-quiz-focus-btn");
  selectFocusBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      app.selectedQuizFocus = btn.getAttribute("data-select-quiz-focus") || "all";
      app.render();
    });
  });

  const setBookQuizModeBtns = document.querySelectorAll(".set-book-quiz-mode-btn");
  setBookQuizModeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      app.selectedBookQuizMode = btn.getAttribute("data-set-book-quiz-mode") || "all";
      app.render();
    });
  });

  const selectCountBtns = document.querySelectorAll(".select-count-btn");
  selectCountBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      app.selectedQuizQuestionCount = parseInt(btn.getAttribute("data-select-count"), 10);
      app.render();
    });
  });

  // 3. Quiz Launch Buttons
  const startDiagnosticBtn = document.getElementById("start-diagnostic-btn");
  if (startDiagnosticBtn) {
    startDiagnosticBtn.addEventListener("click", () => {
      app.quizSession = new DiagnosticSession({
        scope: app.selectedQuizScope,
        questionCount: app.selectedQuizQuestionCount,
        headingOnly: app.selectedQuizFocus === "headings"
      });
      app.quizScorecard = null;
      app.viewingPastTest = null;
      app.retakeModalTest = null;
      app.render();
    });
  }

  // 4. Active Exam Answering & Progression
  const examInput = document.getElementById("exam-answer-input");
  if (examInput) {
    requestAnimationFrame(() => {
      if (document.getElementById("exam-answer-input") === examInput) {
        examInput.focus();
        const valLen = examInput.value ? examInput.value.length : 0;
        examInput.setSelectionRange(valLen, valLen);
      }
    });
  }

  const saveCurrentExamInput = () => {
    if (examInput && app.quizSession) {
      app.quizSession.submitCurrentAnswer(examInput.value);
    }
  };

  const finishCurrentExamSession = () => {
    saveCurrentExamInput();
    app.quizScorecard = app.quizSession.finishExam();
    if (!Array.isArray(app.data.quizHistory)) app.data.quizHistory = [];
    const newRecord = {
      id: `quiz_${Date.now()}`,
      date: Date.now(),
      scope: app.quizSession.scope,
      specificBookId: app.quizSession.specificBookId,
      headingOnly: Boolean(app.quizSession.headingOnly),
      questionCount: app.quizScorecard.totalQuestions,
      durationMs: app.quizScorecard.durationMs,
      questions: app.quizSession.questions,
      answers: app.quizSession.answers,
      scorecard: app.quizScorecard,
      // Legacy compat fields
      total: app.quizScorecard.totalQuestions,
      correct: app.quizScorecard.totalCorrect,
      pct: app.quizScorecard.overallPct
    };
    app.data.quizHistory.unshift(newRecord);
    app.notifyDataChanged();
    if (app.googleUser) {
      saveQuizToCloud(app.googleUser, newRecord).catch(() => {});
      if (app.data.bookMastery) {
        saveMasteryToCloud(app.googleUser, app.data.bookMastery).catch(() => {});
      }
    }
    app.render();
  };

  if (examInput) {
    examInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        saveCurrentExamInput();
        if (app.quizSession.currentIndex < app.quizSession.questions.length - 1) {
          app.quizSession.nextQuestion();
          app.render();
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
      app.quizSession.nextQuestion();
      app.render();
    });
  }

  const examPrevBtn = document.getElementById("exam-prev-btn");
  if (examPrevBtn) {
    examPrevBtn.addEventListener("click", () => {
      saveCurrentExamInput();
      app.quizSession.prevQuestion();
      app.render();
    });
  }

  const examSkipBtn = document.getElementById("exam-skip-btn");
  if (examSkipBtn) {
    examSkipBtn.addEventListener("click", () => {
      app.quizSession.nextQuestion();
      app.render();
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
      app.quizSession = null;
      app.quizScorecard = null;
      app.retakeModalTest = null;
      app.navigateTo({
        activeView: "quiz-diagnostic",
        activeQuizTab: "diagnostic",
        viewingPastTest: null
      });
    });
  }

  const backToHistoryBtn = document.getElementById("back-to-history-btn");
  if (backToHistoryBtn) {
    backToHistoryBtn.addEventListener("click", () => {
      app.quizSession = null;
      app.quizScorecard = null;
      app.retakeModalTest = null;
      app.navigateTo({
        activeView: "quiz-diagnostic",
        activeQuizTab: "history",
        viewingPastTest: null
      });
    });
  }

  // 5. Scorecard & Review Filters
  const reviewFilterBtns = document.querySelectorAll(".set-review-filter-btn");
  reviewFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      app.questionReviewFilter = btn.getAttribute("data-set-review-filter");
      app.render();
    });
  });

  // 6. History Tab Filtering & Search
  const filterHistoryScopeBtns = document.querySelectorAll(".filter-history-scope-btn");
  filterHistoryScopeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      app.historyScopeFilter = btn.getAttribute("data-history-scope");
      app.render();
    });
  });

  const historySearchInput = document.getElementById("history-search-input");
  if (historySearchInput) {
    historySearchInput.addEventListener("input", (e) => {
      app.historySearchQuery = e.target.value;
      app.render();
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
      app.historySearchQuery = "";
      app.render();
    });
  }

  // 7. Past Test Review & History Deletion
  const reviewPastTestBtns = document.querySelectorAll("[data-review-past-test]");
  reviewPastTestBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const testId = btn.getAttribute("data-review-past-test");
      const found = app.data.quizHistory.find(
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
        app.quizScorecard = null;
        app.questionReviewFilter = "all";
        app.navigateTo({
          activeView: "quiz-diagnostic",
          activeQuizTab: "history",
          viewingPastTest: found
        });
      }
    });
  });

  const deletePastTestBtns = document.querySelectorAll(".delete-past-test-btn");
  deletePastTestBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const testId = btn.getAttribute("data-delete-past-test");
      if (confirm("Delete this test session from your history?")) {
        const target = app.data.quizHistory.find(
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

        app.data.quizHistory = app.data.quizHistory.filter((t, idx) => {
          if (target && t === target) return false;
          if (t.id && idsToDelete.has(String(t.id))) return false;
          if (t.date && idsToDelete.has(String(t.date))) return false;
          if (t.date && idsToDelete.has(`quiz_${t.date}`)) return false;
          if (t.date && idsToDelete.has(`hist_${t.date}`)) return false;
          if (idsToDelete.has(String(idx))) return false;
          return true;
        });

        if (
          app.viewingPastTest &&
          (idsToDelete.has(String(app.viewingPastTest.id)) ||
            idsToDelete.has(String(app.viewingPastTest.date)) ||
            idsToDelete.has(`quiz_${app.viewingPastTest.date}`) ||
            idsToDelete.has(`hist_${app.viewingPastTest.date}`))
        ) {
          app.viewingPastTest = null;
        }

        app.notifyDataChanged();
        if (app.googleUser) {
          idsToDelete.forEach((id) => {
            deleteQuizFromCloud(app.googleUser, id).catch(() => {});
          });
        }
        app.render();
      }
    });
  });

  const clearAllHistoryBtn = document.getElementById("clear-all-quiz-history-btn");
  if (clearAllHistoryBtn) {
    clearAllHistoryBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to permanently clear all test history? This cannot be undone.")) {
        app.data.quizHistory = [];
        app.viewingPastTest = null;
        app.notifyDataChanged();
        if (app.googleUser) {
          clearAllQuizzesFromCloud(app.googleUser).catch(() => {});
        }
        app.render();
      }
    });
  }

  // 8. Retake Modal
  const openRetakeModalBtns = document.querySelectorAll("[data-open-retake-modal]");
  openRetakeModalBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const testId = btn.getAttribute("data-open-retake-modal");
      const found = app.data.quizHistory.find(
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
        app.retakeModalTest = found;
        app.render();
      }
    });
  });

  const retakeOptionBtns = document.querySelectorAll(".retake-option-btn");
  retakeOptionBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const test = app.retakeModalTest;
      if (!test) return;
      const action = btn.getAttribute("data-action-retake");
      app.retakeModalTest = null;

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
        app.quizSession = newSession;
        app.quizScorecard = null;
        app.viewingPastTest = null;
        app.activeView = "quiz-diagnostic";
        app.activeQuizTab = "diagnostic";
        app.render();
      }
    });
  });

  const closeRetakeModalBtn = document.getElementById("close-retake-modal-btn");
  if (closeRetakeModalBtn) {
    closeRetakeModalBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      app.retakeModalTest = null;
      app.render();
    });
  }

  const retakeModalOverlay = document.getElementById("retake-quiz-modal");
  if (retakeModalOverlay) {
    retakeModalOverlay.addEventListener("click", (e) => {
      if (e.target.id === "retake-quiz-modal") {
        app.retakeModalTest = null;
        app.render();
      }
    });
  }

  // 9. Inline Scripture Inspection
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

      const chKey = `${bId}-${ch}`;
      const chapterData = app.data.chapters ? app.data.chapters[chKey] : null;
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
            if (app.data.chapters && app.data.chapters[chKey]) {
              app.data.chapters[chKey].chapterScripture = esvText;
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
}

/**
 * Question Flag Modal interactions
 */
export function attachFlagModalListeners(app) {
  // Flag active question button
  const flagActiveBtns = document.querySelectorAll(".flag-active-question-btn");
  flagActiveBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!app.quizSession) return;
      const q = app.quizSession.getCurrentQuestion();
      const userAns = document.getElementById("exam-answer-input")?.value || "";
      app.flagModalData = {
        question: q,
        userAnswer: userAns,
        category: "wrong_answer",
        suggestedAnswer: "",
        comments: "",
        isSubmitting: false,
        errorMessage: ""
      };
      app.render();
    });
  });

  // Flag review question button
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
        app.quizScorecard?.allReviewedQuestions ||
        app.viewingPastTest?.scorecard?.allReviewedQuestions ||
        app.viewingPastTest?.allReviewedQuestions ||
        [];
      if (scorecardQuestions && scorecardQuestions[qIdx]) {
        const item = scorecardQuestions[qIdx];
        questionObj = item.question || item;
        userAns = item.userAnswer || "";
      }
      if (!questionObj) {
        questionObj = (app.quizSession?.questions || app.viewingPastTest?.questions || []).find(
          (q) => q.id === qId
        );
      }
      if (!questionObj && qId) {
        questionObj = { id: qId, prompt: `Question ${qId}` };
      }

      if (questionObj) {
        app.flagModalData = {
          question: questionObj,
          userAnswer: userAns,
          category: "wrong_answer",
          suggestedAnswer: "",
          comments: "",
          isSubmitting: false,
          errorMessage: ""
        };
        app.render();
      }
    });
  });

  // Flag Modal - Category Picker
  const flagCatOptions = document.querySelectorAll(".flag-category-option");
  flagCatOptions.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (!app.flagModalData) return;
      const comms = document.getElementById("flag-comments-input")?.value;
      const sugg = document.getElementById("flag-suggested-answer-input")?.value;
      if (comms !== undefined) app.flagModalData.comments = comms;
      if (sugg !== undefined) app.flagModalData.suggestedAnswer = sugg;
      app.flagModalData.category = btn.getAttribute("data-flag-category");
      app.render();
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
    app.flagModalData = null;
    app.render();
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
      if (!app.flagModalData || app.flagModalData.isSubmitting) return;

      const comms = document.getElementById("flag-comments-input")?.value || "";
      const sugg = document.getElementById("flag-suggested-answer-input")?.value || "";
      app.flagModalData.comments = comms;
      app.flagModalData.suggestedAnswer = sugg;
      app.flagModalData.isSubmitting = true;
      app.flagModalData.errorMessage = "";
      app.render();

      await app.submitQuestionFlag(app.flagModalData);
    });
  }
}
