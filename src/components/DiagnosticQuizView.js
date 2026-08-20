import { BIBLE_BOOKS, getBookById } from "../../data/bible_catalog.js";
import { DiagnosticSession } from "../quiz_engine.js";

// Format milliseconds into human-readable duration e.g. "2m 15s"
function formatDuration(ms) {
  if (!ms || isNaN(ms)) return "1m";
  const totalSec = Math.max(1, Math.round(ms / 1000));
  const mins = Math.floor(totalSec / 60);
  const secs = totalSec % 60;
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs > 0 ? `${secs}s` : ""}`;
}

// Format timestamp into date & time string
function formatTimestamp(ts) {
  if (!ts) return "Recently";
  const d = new Date(ts);
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

// Get clean label for test scope or specific book
function getTestScopeLabel(scope, specificBookId) {
  if (specificBookId) {
    const book = getBookById(specificBookId);
    return `${book?.name || specificBookId} Chapter Quiz`;
  }
  const scopeMap = {
    ALL: "Whole Bible (66 Books)",
    OT: "Old Testament (39 Books)",
    NT: "New Testament (27 Books)",
    GOSPELS: "The Gospels (4 Books)",
    EPISTLES: "Epistles & Letters (21 Books)",
    PENTATEUCH: "Pentateuch (5 Books)",
    HISTORICAL: "Historical Books (12 Books)",
    PROPHETS: "The Prophets (17 Books)",
    WISDOM: "Wisdom & Poetry (5 Books)"
  };
  return scopeMap[scope] || scope || "Whole Bible Diagnostic";
}

export function renderDiagnosticQuizView({
  activeQuizTab = "diagnostic", // "diagnostic" | "book-quizzes" | "history"
  session = null,
  scorecard = null,
  viewingPastTest = null,
  questionReviewFilter = "all", // "all" | "missed"
  selectedScope = "ALL",
  selectedQuestionCount = 25,
  selectedBookId = "GEN",
  historySearchQuery = "",
  historyScopeFilter = "ALL",
  retakeModalTest = null,
  data = {}
}) {
  const quizHistory = Array.isArray(data.quizHistory) ? data.quizHistory : [];
  const historyCount = quizHistory.length;

  return `
    <div class="h-full w-full overflow-y-auto bg-[#161614] text-[#EAE8E2] p-4 md:p-8 select-none">
      <div class="max-w-4xl mx-auto space-y-6">

        <!-- Top Header & Mode Navigation -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2A2A27] pb-5">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-[#C4B79C]/15 text-[#C4B79C] border border-[#C4B79C]/30">
                Bible Mastery Studio
              </span>
              <span class="text-xs text-[#8C8A84]">•</span>
              <span class="text-xs text-[#8C8A84]">Exam Mode & Weakness Diagnostic</span>
            </div>
            <h1 class="font-serif text-2xl md:text-3xl font-bold text-[#EAE8E2] mt-1">
              Bible Diagnostic & Chapter Quiz Studio
            </h1>
            <p class="text-xs text-[#A19E97] mt-0.5">
              Identify weak areas across all 66 books, track your test history, review past answers, and retake tests for complete mastery.
            </p>
          </div>

          <!-- Tab Switcher (Only when not actively in an exam) -->
          ${
            !session || session.status === "completed"
              ? `
                <div class="flex items-center gap-1 bg-[#1C1C1A] p-1 rounded-lg border border-[#2B2B28] self-start shrink-0 text-xs">
                  <button
                    data-quiz-tab="diagnostic"
                    class="quiz-tab-switch-btn px-3 py-1.5 rounded transition flex items-center gap-1.5 ${
                      activeQuizTab === "diagnostic" && !viewingPastTest
                        ? "bg-[#2E2E2A] text-[#EAE8E2] font-semibold shadow-2xs"
                        : "text-[#8C8A84] hover:text-[#EAE8E2]"
                    }"
                  >
                    <span>🎯 Diagnostic Test</span>
                  </button>
                  <button
                    data-quiz-tab="book-quizzes"
                    class="quiz-tab-switch-btn px-3 py-1.5 rounded transition flex items-center gap-1.5 ${
                      activeQuizTab === "book-quizzes" && !viewingPastTest
                        ? "bg-[#2E2E2A] text-[#EAE8E2] font-semibold shadow-2xs"
                        : "text-[#8C8A84] hover:text-[#EAE8E2]"
                    }"
                  >
                    <span>📖 Book Quizzes (66)</span>
                  </button>
                  <button
                    data-quiz-tab="history"
                    class="quiz-tab-switch-btn px-3 py-1.5 rounded transition flex items-center gap-1.5 ${
                      activeQuizTab === "history" || viewingPastTest
                        ? "bg-[#2E2E2A] text-[#EAE8E2] font-semibold shadow-2xs"
                        : "text-[#8C8A84] hover:text-[#EAE8E2]"
                    }"
                  >
                    <span>📊 History & Progress</span>
                    ${
                      historyCount > 0
                        ? `<span class="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-[#C4B79C]/20 text-[#C4B79C]">${historyCount}</span>`
                        : ""
                    }
                  </button>
                </div>
              `
              : ""
          }
        </div>

        <!-- Render Current Active Sub-State -->
        ${(() => {
          // 1. If currently in an active exam session
          if (session && session.status === "in-progress") {
            return renderActiveExamView(session);
          }

          // 2. If viewing a past test from history
          if (viewingPastTest) {
            return renderPastTestReviewView({ test: viewingPastTest, questionReviewFilter });
          }

          // 3. If just finished an exam and scorecard is available
          if (scorecard) {
            return renderScorecardView({
              scorecard,
              questionReviewFilter,
              isNewCompletion: true,
              questions: session?.questions,
              answers: session?.answers
            });
          }

          // 4. Tab: Test History & Progress
          if (activeQuizTab === "history") {
            return renderTestHistoryAndProgressView({
              data,
              historySearchQuery,
              historyScopeFilter
            });
          }

          // 5. Tab: Book Quizzes
          if (activeQuizTab === "book-quizzes") {
            return renderBookQuizzesListView({ selectedBookId, data });
          }

          // 6. Tab: Diagnostic Configurator (Default)
          return renderDiagnosticConfiguratorView({ selectedScope, selectedQuestionCount });
        })()}

      </div>

      <!-- Retake Modal Overlay -->
      ${retakeModalTest ? renderRetakeModal(retakeModalTest) : ""}
    </div>
  `;
}

// --------------------------------------------------------------------------
// 1. DIAGNOSTIC CONFIGURATOR VIEW
// --------------------------------------------------------------------------
function renderDiagnosticConfiguratorView({ selectedScope, selectedQuestionCount }) {
  const scopes = [
    { id: "ALL", label: "Whole Bible", desc: "All 66 Books (Old & New Testaments)", badge: "66 Books" },
    { id: "BMPI", label: "BMPI Assessment", desc: "300-Question Mastery & Proficiency Instrument", badge: "300 Questions" },
    { id: "GFC", label: "GFC Bible Knowledge", desc: "100-Question Standard Assessment", badge: "100 Questions" },
    { id: "OT", label: "Old Testament", desc: "Creation, Law, History & Prophets", badge: "39 Books" },
    { id: "NT", label: "New Testament", desc: "Gospels, Acts, Epistles & Revelation", badge: "27 Books" },
    { id: "GOSPELS", label: "The Gospels", desc: "Matthew, Mark, Luke, and John", badge: "4 Books" },
    { id: "EPISTLES", label: "Epistles & Letters", desc: "Pauline & General Epistles", badge: "21 Books" },
    { id: "PENTATEUCH", label: "Pentateuch (Torah)", desc: "Genesis through Deuteronomy", badge: "5 Books" },
    { id: "HISTORICAL", label: "Historical Books", desc: "Joshua through Esther", badge: "12 Books" },
    { id: "PROPHETS", label: "The Prophets", desc: "Major and Minor Prophets", badge: "17 Books" },
    { id: "WISDOM", label: "Wisdom & Poetry", desc: "Job, Psalms, Proverbs, Eccl, Song", badge: "5 Books" }
  ];

  const lengths = [
    { count: 10, label: "10 Questions", desc: "Quick 3-minute diagnostic check" },
    { count: 25, label: "25 Questions", desc: "Standard comprehensive diagnostic" },
    { count: 50, label: "50 Questions", desc: "Deep full-length mastery exam" },
    { count: 100, label: "100 Questions", desc: "Full 100-question comprehensive exam" }
  ];

  return `
    <div class="space-y-6">
      <!-- Info Card -->
      <div class="bg-[#1C1C1A] border border-[#2B2B28] rounded-xl p-5 space-y-3">
        <div class="flex items-center gap-2 text-[#C4B79C] font-semibold text-sm">
          <span>📋</span>
          <span>How the Diagnostic Assessment Works</span>
        </div>
        <p class="text-xs text-[#A19E97] leading-relaxed">
          Questions are dynamically pulled from a rich library covering <strong class="text-[#EAE8E2]">Book & Chapter locations</strong> (e.g. <em>Genesis 12</em>, <em>Matthew 28</em>), <strong class="text-[#EAE8E2]">Chapter recall</strong> (e.g. <em>1 Samuel 17</em>), <strong class="text-[#EAE8E2]">Key verse fill-ins</strong> (e.g. <em>Ephesians 2:8</em>), and <strong class="text-[#EAE8E2]">Biblical characters & events</strong>. Answers are fill-in-the-blank with typo tolerance and abbreviation support.
        </p>
      </div>

      <!-- Step 1: Choose Scope -->
      <div class="space-y-3">
        <label class="text-xs font-mono uppercase tracking-wider text-[#8C8A84] flex items-center justify-between">
          <span>1. Select Diagnostic Scope</span>
          <span class="text-[#C4B79C]">Scope: ${selectedScope}</span>
        </label>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          ${scopes
            .map((s) => {
              const isSelected = selectedScope === s.id;
              return `
                <button
                  data-select-scope="${s.id}"
                  class="select-scope-btn text-left p-3.5 rounded-xl border transition flex flex-col justify-between space-y-2 ${
                    isSelected
                      ? "bg-[#252522] border-[#C4B79C] text-[#EAE8E2] ring-1 ring-[#C4B79C]"
                      : "bg-[#1A1A18] border-[#262623] hover:border-[#383834] text-[#8C8A84] hover:text-[#EAE8E2]"
                  }"
                >
                  <div class="flex items-center justify-between">
                    <span class="font-serif font-bold text-sm text-[#EAE8E2]">${s.label}</span>
                    <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#141413] border border-[#2B2B28] text-[#C4B79C]">
                      ${s.badge}
                    </span>
                  </div>
                  <p class="text-[11px] text-[#A19E97]">${s.desc}</p>
                </button>
              `;
            })
            .join("")}
        </div>
      </div>

      <!-- Step 2: Choose Test Size -->
      <div class="space-y-3 pt-2">
        <label class="text-xs font-mono uppercase tracking-wider text-[#8C8A84]">
          2. Select Number of Questions
        </label>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          ${lengths
            .map((l) => {
              const isSelected = selectedQuestionCount === l.count;
              return `
                <button
                  data-select-count="${l.count}"
                  class="select-count-btn text-left p-3.5 rounded-xl border transition flex flex-col justify-between space-y-1.5 ${
                    isSelected
                      ? "bg-[#252522] border-[#C4B79C] text-[#EAE8E2] ring-1 ring-[#C4B79C]"
                      : "bg-[#1A1A18] border-[#262623] hover:border-[#383834] text-[#8C8A84] hover:text-[#EAE8E2]"
                  }"
                >
                  <div class="font-bold text-sm text-[#EAE8E2]">${l.label}</div>
                  <p class="text-[11px] text-[#A19E97]">${l.desc}</p>
                </button>
              `;
            })
            .join("")}
        </div>
      </div>

      <!-- Launch Action -->
      <div class="pt-4 flex items-center justify-between">
        <div class="text-xs text-[#8C8A84] flex items-center gap-1.5">
          <span>🔒 Exam Mode:</span>
          <span>No answers revealed until final scorecard</span>
        </div>

        <button
          id="start-diagnostic-btn"
          class="px-6 py-3 rounded-xl bg-[#C4B79C] hover:bg-[#DBCFB3] text-[#141413] font-serif font-bold text-sm tracking-wide transition shadow-lg flex items-center gap-2"
        >
          <span>🔥 Begin Diagnostic Exam</span>
          <span>→</span>
        </button>
      </div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// 2. ACTIVE EXAM RUNNER VIEW
// --------------------------------------------------------------------------
function renderActiveExamView(session) {
  const q = session.getCurrentQuestion();
  const total = session.questions.length;
  const currentIdx = session.currentIndex;
  const progressPct = Math.round(((currentIdx + 1) / total) * 100);
  const currentAns = session.answers[q.id]?.userInput || "";

  // Question type badge labels
  const typeLabels = {
    book_chapter: "Book & Chapter Location",
    chapter_in_book: "Chapter in Book",
    verse_completion: "Scripture Verse Completion",
    facts: "Characters, Places & Facts",
    book_id: "Book Identification"
  };

  return `
    <div class="max-w-2xl mx-auto space-y-6 py-4">
      <!-- Progress Bar & Top Meta -->
      <div class="space-y-2">
        <div class="flex items-center justify-between text-xs text-[#8C8A84] font-mono">
          <span>Question ${currentIdx + 1} of ${total}</span>
          <span class="px-2 py-0.5 rounded bg-[#1F1F1D] border border-[#2D2D29] text-[#C4B79C]">
            ${typeLabels[q.type] || "Question"}
          </span>
          <span>${progressPct}% Completed</span>
        </div>
        <div class="w-full h-1.5 rounded-full bg-[#20201D] overflow-hidden">
          <div class="h-full bg-[#C4B79C] transition-all duration-300" style="width: ${progressPct}%;"></div>
        </div>
      </div>

      <!-- Question Card -->
      <div class="bg-[#1C1C1A] border border-[#2B2B28] rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
        <!-- Question Meta -->
        <div class="flex items-center justify-between text-xs">
          <span class="text-[11px] font-mono text-[#8C8A84] uppercase tracking-wider">
            Diagnostic Question ${currentIdx + 1}
          </span>
          <span class="text-[11px] text-[#6D6B66]">Press Enter ↵ to advance</span>
        </div>

        <!-- Prompt -->
        <div class="space-y-2">
          <h2 class="font-serif text-lg md:text-xl font-medium text-[#EAE8E2] leading-relaxed">
            ${q.prompt}
          </h2>
        </div>

        <!-- Fill-in-the-Blank Text Input -->
        <div class="space-y-2 pt-2">
          <div class="relative">
            <input
              id="exam-answer-input"
              type="text"
              autocomplete="off"
              autofocus
              placeholder="${
                q.type === "book_chapter"
                  ? "e.g. Genesis 12, Matthew 28, Psalm 23"
                  : q.type === "chapter_in_book"
                  ? "e.g. 10, Luke 10, or Chapter 10"
                  : q.type === "verse_completion"
                  ? "e.g. grace, life, heart"
                  : "Type your answer here..."
              }"
              value="${currentAns.replace(/"/g, "&quot;")}"
              class="w-full bg-[#141413] border-2 border-[#33332F] focus:border-[#C4B79C] rounded-xl px-4 py-3.5 text-base text-[#EAE8E2] placeholder:text-[#5B5953] focus:outline-none transition shadow-inner font-sans"
            />
          </div>
          <p class="text-[11px] text-[#8C8A84] italic">
            Smart matching accepts abbreviations (e.g. <em>Gen 12</em>, <em>1 Sam 17</em>, <em>Mt 28</em>, <em>Ps 23</em>).
          </p>
        </div>

        <!-- Controls: Prev, Skip, Submit/Next -->
        <div class="pt-4 border-t border-[#262624] flex items-center justify-between">
          <button
            id="exam-prev-btn"
            class="px-4 py-2 rounded-lg bg-[#242421] hover:bg-[#2C2C28] text-[#A19E97] hover:text-[#EAE8E2] text-xs transition ${
              currentIdx === 0 ? "opacity-30 pointer-events-none" : ""
            }"
          >
            ← Previous
          </button>

          <div class="flex items-center gap-2">
            <button
              id="exam-skip-btn"
              class="px-4 py-2 rounded-lg text-[#8C8A84] hover:text-[#EAE8E2] text-xs transition"
            >
              Skip
            </button>

            ${
              currentIdx === total - 1
                ? `
                  <button
                    id="exam-finish-btn"
                    class="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow flex items-center gap-1.5"
                  >
                    <span>✓ Submit Exam</span>
                  </button>
                `
                : `
                  <button
                    id="exam-next-btn"
                    class="px-5 py-2.5 rounded-lg bg-[#C4B79C] hover:bg-[#DBCFB3] text-[#141413] font-semibold text-xs transition shadow flex items-center gap-1.5"
                  >
                    <span>Next Question →</span>
                  </button>
                `
            }
          </div>
        </div>
      </div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// 3. SCORECARD & DETAILED QUESTION REVIEW (Shared Component)
// --------------------------------------------------------------------------
function renderScorecardView({
  scorecard,
  questionReviewFilter = "all",
  isNewCompletion = false,
  pastTestId = null,
  questions = null,
  answers = null
}) {
  const totalQuestions =
    scorecard.totalQuestions ||
    (questions && questions.length) ||
    (scorecard.allReviewedQuestions && scorecard.allReviewedQuestions.length) ||
    0;
  let totalCorrect = scorecard.totalCorrect !== undefined ? scorecard.totalCorrect : 0;
  const overallPct =
    scorecard.overallPct !== undefined
      ? scorecard.overallPct
      : totalQuestions > 0
      ? Math.round((totalCorrect / totalQuestions) * 100)
      : 0;
  const byTestament = scorecard.byTestament || {};
  const byGenre = scorecard.byGenre || {};
  const weakBooks = scorecard.weakBooks || [];

  // Normalize reviewed questions array
  let allReviewedQuestions = Array.isArray(scorecard.allReviewedQuestions) ? [...scorecard.allReviewedQuestions] : [];
  let missedQuestions = Array.isArray(scorecard.missedQuestions) ? [...scorecard.missedQuestions] : [];

  // If questions & answers are provided (or available on scorecard), reconstruct review data if missing
  const questionPool = questions || scorecard.questions || [];
  const answerPool = answers || scorecard.answers || {};

  if (
    (allReviewedQuestions.length === 0 || (missedQuestions.length === 0 && totalQuestions > totalCorrect)) &&
    questionPool.length > 0
  ) {
    allReviewedQuestions = [];
    missedQuestions = [];
    let derivedCorrect = 0;

    questionPool.forEach((q) => {
      const ans = answerPool ? answerPool[q.id] : null;
      const isCorrect = ans ? Boolean(ans.isCorrect) : false;
      if (isCorrect) derivedCorrect++;

      const qItem = {
        question: q,
        isCorrect,
        userAnswer: ans ? (ans.userInput || "(No answer)") : "(Skipped)",
        correctAnswer: q.displayAnswer || "(See context)",
        explanation: q.explanation || ""
      };

      allReviewedQuestions.push(qItem);
      if (!isCorrect) {
        missedQuestions.push(qItem);
      }
    });

    if (totalCorrect === 0 && derivedCorrect > 0) {
      totalCorrect = derivedCorrect;
    }
  }

  // Strictly synchronize missedQuestions from allReviewedQuestions whenever allReviewedQuestions is populated
  if (allReviewedQuestions.length > 0) {
    missedQuestions = allReviewedQuestions.filter((item) => !item.isCorrect);
  } else if (missedQuestions.length > 0) {
    allReviewedQuestions = [...missedQuestions];
  }

  // Grade color calculation
  const gradeColor =
    overallPct >= 90
      ? "text-emerald-400 border-emerald-500/40 bg-emerald-500/10"
      : overallPct >= 75
      ? "text-[#C4B79C] border-[#C4B79C]/40 bg-[#C4B79C]/10"
      : overallPct >= 60
      ? "text-amber-400 border-amber-500/40 bg-amber-500/10"
      : "text-rose-400 border-rose-500/40 bg-rose-500/10";

  const questionsToDisplay =
    questionReviewFilter === "missed"
      ? missedQuestions
      : allReviewedQuestions && allReviewedQuestions.length > 0
      ? allReviewedQuestions
      : missedQuestions;

  return `
    <div class="space-y-8">
      <!-- Top Scorecard Summary Banner -->
      <div class="bg-[#1C1C1A] border border-[#2B2B28] rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#262624] pb-6">
          <div class="space-y-1.5">
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono uppercase tracking-widest text-[#C4B79C]">
                ${isNewCompletion ? "Diagnostic Assessment Results" : "Past Test Review"}
              </span>
              ${
                scorecard.durationMs
                  ? `<span class="text-xs text-[#8C8A84]">• Duration: ${formatDuration(scorecard.durationMs)}</span>`
                  : ""
              }
            </div>
            <h2 class="font-serif text-2xl md:text-3xl font-bold text-[#EAE8E2]">
              ${
                overallPct >= 90
                  ? "Outstanding Biblical Mastery! 🏆"
                  : overallPct >= 75
                  ? "Strong Working Knowledge! 📜"
                  : overallPct >= 60
                  ? "Good Foundation — Targeted Review Recommended 📖"
                  : "Diagnostic Complete — Focus on Identified Weak Areas 🎯"
              }
            </h2>
            <p class="text-xs text-[#A19E97]">
              Answered <strong>${totalCorrect}</strong> correctly out of <strong>${totalQuestions}</strong> questions.
            </p>
          </div>

          <!-- Big Circle Grade -->
          <div class="w-24 h-24 rounded-2xl border-2 ${gradeColor} flex flex-col items-center justify-center shrink-0 shadow-lg">
            <span class="font-mono text-3xl font-bold">${overallPct}%</span>
            <span class="text-[10px] font-mono uppercase tracking-wider mt-0.5">Accuracy</span>
          </div>
        </div>

        <!-- Breakdown by Testament & Genre -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Testament Split -->
          <div class="bg-[#141413] border border-[#262624] rounded-xl p-4 space-y-3">
            <h3 class="text-xs font-mono uppercase tracking-wider text-[#8C8A84]">
              Score by Testament
            </h3>
            <div class="space-y-2.5 text-xs">
              ${["OT", "NT"]
                .map((t) => {
                  const stat = byTestament[t] || { correct: 0, total: 0 };
                  const pct = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
                  return `
                    <div>
                      <div class="flex items-center justify-between mb-1">
                        <span class="font-serif text-[#DBCFB3]">${t === "OT" ? "Old Testament" : "New Testament"}</span>
                        <span class="font-mono text-[11px] ${pct >= 70 ? "text-emerald-400" : "text-amber-400"}">${stat.correct}/${stat.total} (${pct}%)</span>
                      </div>
                      <div class="w-full h-1.5 rounded-full bg-[#242421] overflow-hidden">
                        <div class="h-full ${pct >= 70 ? "bg-emerald-500" : "bg-amber-500"}" style="width: ${pct}%;"></div>
                      </div>
                    </div>
                  `;
                })
                .join("")}
            </div>
          </div>

          <!-- Genre Breakdown -->
          <div class="bg-[#141413] border border-[#262624] rounded-xl p-4 space-y-3">
            <h3 class="text-xs font-mono uppercase tracking-wider text-[#8C8A84]">
              Score by Category
            </h3>
            <div class="space-y-2 text-xs">
              ${
                Object.keys(byGenre).length > 0
                  ? Object.entries(byGenre)
                      .map(([genre, stat]) => {
                        const pct = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
                        return `
                          <div class="flex items-center justify-between">
                            <span class="text-[#A19E97] truncate pr-2">${genre}</span>
                            <span class="font-mono text-[11px] shrink-0 ${pct >= 70 ? "text-emerald-400" : "text-amber-400"}">
                              ${stat.correct}/${stat.total} (${pct}%)
                            </span>
                          </div>
                        `;
                      })
                      .join("")
                  : `<p class="text-xs text-[#8C8A84] italic">Specific category details available for broad diagnostics.</p>`
              }
            </div>
          </div>
        </div>

        <!-- Identified Weak Books & Immediate Action -->
        ${
          weakBooks.length > 0
            ? `
              <div class="bg-[#241A17] border border-[#4A2822] rounded-xl p-4 space-y-3">
                <div class="flex items-center gap-2 text-rose-300 font-semibold text-xs">
                  <span>⚠️</span>
                  <span>Identified Weak Books (${weakBooks.length} Books with Missed Content)</span>
                </div>
                <p class="text-[11px] text-stone-300">
                  Focus your study outlines on these specific books or take a targeted Chapter Quiz to master them:
                </p>
                <div class="flex flex-wrap gap-2 pt-1">
                  ${weakBooks
                    .map(
                      (wb) => `
                        <button
                          data-launch-book-quiz="${wb.bookId}"
                          class="launch-book-quiz-btn px-2.5 py-1 rounded-lg bg-[#381F1A] hover:bg-[#4E2B24] border border-[#5C322B] text-rose-200 text-xs transition flex items-center gap-1.5"
                          title="Click to launch a chapter mastery quiz for ${wb.bookName}"
                        >
                          <span class="font-serif font-bold">${wb.bookName}</span>
                          <span class="font-mono text-[10px] text-rose-400">(${wb.correct}/${wb.total})</span>
                          <span class="text-[10px]">📝 Quiz Book →</span>
                        </button>
                      `
                    )
                    .join("")}
                </div>
              </div>
            `
            : `
              <div class="bg-[#162319] border border-[#234A2D] rounded-xl p-4 text-emerald-300 text-xs flex items-center gap-2">
                <span>✓</span>
                <span>No major book weaknesses detected in this assessment run!</span>
              </div>
            `
        }

        <!-- Actions: Return & Retake -->
        <div class="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#262624]">
          <div class="flex items-center gap-2">
            ${
              !isNewCompletion
                ? `
                  <button
                    id="back-to-history-btn"
                    class="px-4 py-2 rounded-lg bg-[#2A2A27] hover:bg-[#383834] text-[#EAE8E2] text-xs font-semibold transition flex items-center gap-1.5"
                  >
                    <span>← Back to Test History</span>
                  </button>
                `
                : `
                  <button
                    id="reset-diagnostic-config-btn"
                    class="px-4 py-2 rounded-lg bg-[#2A2A27] hover:bg-[#383834] text-[#EAE8E2] text-xs font-semibold transition"
                  >
                    ← Start New Diagnostic
                  </button>
                `
            }
            <button
              data-quiz-tab="history"
              class="quiz-tab-switch-btn px-3.5 py-2 rounded-lg bg-[#1F1F1D] hover:bg-[#2A2A27] border border-[#2B2B28] text-[#C4B79C] text-xs font-semibold transition"
            >
              📊 View Full History
            </button>
          </div>

          ${
            pastTestId
              ? `
                <button
                  data-open-retake-modal="${pastTestId}"
                  class="px-5 py-2 rounded-lg bg-[#C4B79C] hover:bg-[#DBCFB3] text-[#141413] text-xs font-bold font-serif transition flex items-center gap-1.5 shadow"
                >
                  <span>🔄 Retake This Test</span>
                </button>
              `
              : ""
          }
        </div>
      </div>

      <!-- Detailed Question-by-Question Deep Dive Review -->
      <div class="space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2A2A27] pb-3">
          <div>
            <h3 class="font-serif text-lg font-bold text-[#EAE8E2] flex items-center gap-2">
              <span>🔍</span>
              <span>Question Review & Side-by-Side Scripture Deep Dive</span>
            </h3>
            <span class="text-xs text-[#8C8A84]">
              ${allReviewedQuestions.length > 0 ? missedQuestions.length : totalQuestions - totalCorrect} missed • ${totalCorrect} correct of ${totalQuestions} total
            </span>
          </div>

          <!-- Review Filter Controls: All vs Missed Only -->
          <div class="flex items-center gap-1 bg-[#1C1C1A] p-1 rounded-lg border border-[#2B2B28] text-xs self-start shrink-0">
            <button
              data-set-review-filter="all"
              class="set-review-filter-btn px-3 py-1 rounded transition ${
                questionReviewFilter === "all"
                  ? "bg-[#2E2E2A] text-[#EAE8E2] font-semibold shadow-2xs"
                  : "text-[#8C8A84] hover:text-[#EAE8E2]"
              }"
            >
              All (${allReviewedQuestions.length || totalQuestions})
            </button>
            <button
              data-set-review-filter="missed"
              class="set-review-filter-btn px-3 py-1 rounded transition ${
                questionReviewFilter === "missed"
                  ? "bg-[#2E2E2A] text-rose-300 font-semibold shadow-2xs"
                  : "text-[#8C8A84] hover:text-[#EAE8E2]"
              }"
            >
              Missed Only (${allReviewedQuestions.length > 0 ? missedQuestions.length : totalQuestions - totalCorrect})
            </button>
          </div>
        </div>

        <div class="space-y-3">
          ${
            questionsToDisplay.length === 0
              ? `
                <div class="bg-[#1C1C1A] border border-[#2B2B28] rounded-xl p-8 text-center space-y-2">
                  ${
                    totalCorrect === totalQuestions && totalQuestions > 0
                      ? `
                        <div class="text-2xl">🎉</div>
                        <h4 class="font-serif text-base font-bold text-[#EAE8E2]">Perfect Score — No Missed Questions!</h4>
                        <p class="text-xs text-[#8C8A84]">You answered every single question correctly in this test session.</p>
                      `
                      : questionReviewFilter === "missed" && missedQuestions.length === 0
                      ? `
                        <div class="text-2xl">🎉</div>
                        <h4 class="font-serif text-base font-bold text-[#EAE8E2]">No Missed Questions in this View</h4>
                        <p class="text-xs text-[#8C8A84]">Switch to 'All' to review all questions from this test.</p>
                      `
                      : `
                        <div class="text-2xl">📝</div>
                        <h4 class="font-serif text-base font-bold text-[#EAE8E2]">Legacy Test Session</h4>
                        <p class="text-xs text-[#8C8A84] max-w-md mx-auto">Detailed question-by-question data was not recorded for this earlier test session. Retake this test or start a new diagnostic to review every question in full detail.</p>
                      `
                  }
                </div>
              `
              : questionsToDisplay
                  .map((item, idx) => {
                    const q = item.question;
                    const isPassed = Boolean(item.isCorrect);
                    return `
                      <div class="bg-[#1C1C1A] border ${
                        isPassed ? "border-[#243A2A]" : "border-[#3A2420]"
                      } rounded-xl p-5 space-y-3 shadow-md transition">
                        <!-- Header: Badge & Status -->
                        <div class="flex items-center justify-between text-xs">
                          <span class="px-2 py-0.5 rounded ${
                            isPassed
                              ? "bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold uppercase"
                              : "bg-rose-500/20 text-rose-400 font-mono text-[10px] font-bold uppercase"
                          }">
                            ${isPassed ? "✓ Correct" : "✗ Missed"} (Question ${idx + 1})
                          </span>
                          <span class="text-[11px] font-mono text-[#8C8A84]">
                            ${q.scope || "Bible"} • ${q.genre || "Scripture"}
                          </span>
                        </div>

                        <!-- Prompt -->
                        <h4 class="font-serif text-base font-semibold text-[#EAE8E2]">
                          ${q.prompt}
                        </h4>

                        <!-- Answers Comparison -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-[#141413] p-3 rounded-lg border border-[#242422]">
                          <div>
                            <span class="text-[#8C8A84] block text-[10px] uppercase font-mono">Your Answer:</span>
                            <span class="${isPassed ? "text-emerald-400" : "text-rose-400"} font-mono font-medium">
                              ${item.userAnswer || "(No answer)"}
                            </span>
                          </div>
                          <div>
                            <span class="text-[#8C8A84] block text-[10px] uppercase font-mono">Correct Answer:</span>
                            <span class="text-emerald-400 font-mono font-bold">${item.correctAnswer || q.displayAnswer}</span>
                          </div>
                        </div>

                        <!-- Explanation & Inline Scripture Inspect Button -->
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#262624]">
                          <p class="text-xs text-[#A19E97] leading-relaxed flex-1">
                            💡 <strong>Context:</strong> ${item.explanation || q.explanation || "Biblical reference."}
                          </p>

                          ${
                            q.bookId && q.chapterNum
                              ? `
                                <button
                                  data-inspect-scripture="true"
                                  data-book-id="${q.bookId}"
                                  data-chapter="${q.chapterNum}"
                                  data-q-idx="${idx}"
                                  class="inspect-scripture-btn shrink-0 px-3 py-1.5 rounded-lg bg-[#2A2A27] hover:bg-[#C4B79C] text-[#DBCFB3] hover:text-[#141413] text-xs font-semibold transition border border-[#383834] flex items-center gap-1.5 shadow"
                                >
                                  <span>📖 Inspect Scripture (${getBookById(q.bookId)?.shortName || q.bookId} ${q.chapterNum})</span>
                                  <span class="inspect-icon-${idx} font-mono text-[10px]">▼</span>
                                </button>
                              `
                              : ""
                          }
                        </div>

                        <!-- Inline Scripture Reader Container -->
                        <div id="inline-scripture-container-${idx}" class="hidden pt-3 border-t border-[#262624] space-y-2">
                          <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                              <span class="text-xs font-serif font-bold text-[#C4B79C]">📖 ${getBookById(q.bookId)?.name || q.bookId} Chapter ${q.chapterNum} (ESV)</span>
                            </div>
                            <button data-close-scripture="${idx}" class="text-[11px] text-[#8C8A84] hover:text-[#EAE8E2] px-2 py-0.5 rounded bg-[#141413] border border-[#2B2B28] transition">✕ Close</button>
                          </div>
                          <div id="inline-scripture-body-${idx}" class="bg-[#121211] border border-[#2B2B28] rounded-xl p-4 max-h-72 overflow-y-auto font-serif text-xs leading-relaxed text-[#DBCFB3] select-text shadow-inner">
                            <div class="text-[#8C8A84] italic animate-pulse">Loading ESV Scripture...</div>
                          </div>
                        </div>
                      </div>
                    `;
                  })
                  .join("")
          }
        </div>
      </div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// 4. PAST TEST REVIEW WRAPPER
// --------------------------------------------------------------------------
function renderPastTestReviewView({ test, questionReviewFilter = "all" }) {
  // Synthesize scorecard object from test snapshot if necessary
  const scorecard = test.scorecard || {
    totalQuestions: test.total || test.questionCount || (test.questions && test.questions.length) || 0,
    totalCorrect: test.correct !== undefined ? test.correct : 0,
    overallPct: test.pct !== undefined ? test.pct : 0,
    durationMs: test.durationMs || 0,
    byTestament: test.byTestament || {},
    byGenre: test.byGenre || {},
    weakBooks: test.weakBooks || [],
    missedQuestions: test.missedQuestions || [],
    allReviewedQuestions: test.allReviewedQuestions || []
  };

  return renderScorecardView({
    scorecard,
    questionReviewFilter,
    isNewCompletion: false,
    pastTestId: test.id || `hist_${test.date || ""}`,
    questions: test.questions,
    answers: test.answers
  });
}

// --------------------------------------------------------------------------
// 5. TEST HISTORY & PROGRESS DASHBOARD VIEW
// --------------------------------------------------------------------------
function renderTestHistoryAndProgressView({ data, historySearchQuery = "", historyScopeFilter = "ALL" }) {
  const quizHistory = Array.isArray(data.quizHistory) ? [...data.quizHistory] : [];
  // Sort by latest date descending
  quizHistory.sort((a, b) => (b.date || 0) - (a.date || 0));

  const totalTests = quizHistory.length;
  let totalQuestions = 0;
  let totalCorrect = 0;
  let highestScore = 0;
  const recentScores = [];

  // Cumulative OT / NT and weak books tracking
  const cumulativeTestament = { OT: { correct: 0, total: 0 }, NT: { correct: 0, total: 0 } };
  const cumulativeWeakBooksMap = {};

  quizHistory.forEach((t, i) => {
    const qCount = t.total || t.questionCount || (t.scorecard?.totalQuestions) || 0;
    const cCount = t.correct !== undefined ? t.correct : (t.scorecard?.totalCorrect || 0);
    const scorePct = t.pct !== undefined ? t.pct : (t.scorecard?.overallPct || 0);

    totalQuestions += qCount;
    totalCorrect += cCount;
    if (scorePct > highestScore) highestScore = scorePct;
    if (i < 5) recentScores.push(scorePct);

    // Testament aggregation
    if (t.scorecard?.byTestament) {
      if (t.scorecard.byTestament.OT) {
        cumulativeTestament.OT.correct += t.scorecard.byTestament.OT.correct;
        cumulativeTestament.OT.total += t.scorecard.byTestament.OT.total;
      }
      if (t.scorecard.byTestament.NT) {
        cumulativeTestament.NT.correct += t.scorecard.byTestament.NT.correct;
        cumulativeTestament.NT.total += t.scorecard.byTestament.NT.total;
      }
    }

    // Cumulative weak books
    const weakList = t.scorecard?.weakBooks || t.weakBooks || [];
    weakList.forEach((wb) => {
      if (!cumulativeWeakBooksMap[wb.bookId]) {
        cumulativeWeakBooksMap[wb.bookId] = {
          bookId: wb.bookId,
          bookName: wb.bookName || wb.bookId,
          missCount: 0
        };
      }
      cumulativeWeakBooksMap[wb.bookId].missCount += (wb.total - wb.correct) || 1;
    });
  });

  const careerAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  const recentAvg =
    recentScores.length > 0
      ? Math.round(recentScores.reduce((a, b) => a + b, 0) / recentScores.length)
      : 0;

  const weakBooksList = Object.values(cumulativeWeakBooksMap).sort((a, b) => b.missCount - a.missCount);

  // Filter history list
  const filteredHistory = quizHistory.filter((t) => {
    // Scope filter
    if (historyScopeFilter !== "ALL") {
      if (historyScopeFilter === "BOOK_QUIZZES" && !t.specificBookId) return false;
      if (historyScopeFilter !== "BOOK_QUIZZES" && t.scope !== historyScopeFilter) return false;
    }
    // Search query
    if (historySearchQuery && historySearchQuery.trim()) {
      const q = historySearchQuery.toLowerCase().trim();
      const scopeLabel = getTestScopeLabel(t.scope, t.specificBookId).toLowerCase();
      return scopeLabel.includes(q);
    }
    return true;
  });

  return `
    <div class="space-y-8">
      <!-- Top Analytics Metric Cards -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <!-- 1. Career Accuracy -->
        <div class="bg-[#1C1C1A] border border-[#2B2B28] rounded-xl p-4 space-y-1">
          <span class="text-[10px] font-mono uppercase tracking-wider text-[#8C8A84]">Career Accuracy</span>
          <div class="text-2xl font-bold font-mono ${
            careerAccuracy >= 80 ? "text-emerald-400" : careerAccuracy >= 60 ? "text-[#C4B79C]" : "text-amber-400"
          }">
            ${careerAccuracy}%
          </div>
          <p class="text-[11px] text-[#8C8A84]">${totalCorrect}/${totalQuestions} questions</p>
        </div>

        <!-- 2. Tests Completed -->
        <div class="bg-[#1C1C1A] border border-[#2B2B28] rounded-xl p-4 space-y-1">
          <span class="text-[10px] font-mono uppercase tracking-wider text-[#8C8A84]">Tests Completed</span>
          <div class="text-2xl font-bold font-mono text-[#EAE8E2]">${totalTests}</div>
          <p class="text-[11px] text-[#8C8A84]">${totalQuestions} total questions</p>
        </div>

        <!-- 3. Best Score -->
        <div class="bg-[#1C1C1A] border border-[#2B2B28] rounded-xl p-4 space-y-1">
          <span class="text-[10px] font-mono uppercase tracking-wider text-[#8C8A84]">Best Score</span>
          <div class="text-2xl font-bold font-mono text-emerald-400">
            ${totalTests > 0 ? `${highestScore}%` : "—"}
          </div>
          <p class="text-[11px] text-[#8C8A84]">Peak achievement</p>
        </div>

        <!-- 4. Recent Average -->
        <div class="bg-[#1C1C1A] border border-[#2B2B28] rounded-xl p-4 space-y-1">
          <span class="text-[10px] font-mono uppercase tracking-wider text-[#8C8A84]">Recent Average</span>
          <div class="text-2xl font-bold font-mono text-[#C4B79C]">
            ${recentScores.length > 0 ? `${recentAvg}%` : "—"}
          </div>
          <p class="text-[11px] text-[#8C8A84]">Last ${recentScores.length} tests</p>
        </div>
      </div>

      <!-- Mastery Distribution & Score Trend Timeline -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Testament Mastery Split -->
        <div class="bg-[#1C1C1A] border border-[#2B2B28] rounded-xl p-5 space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-xs font-mono uppercase tracking-wider text-[#8C8A84]">
              Testament Mastery Split
            </h3>
            <span class="text-[10px] font-mono text-[#C4B79C]">OT vs NT</span>
          </div>

          <div class="space-y-3 text-xs">
            ${["OT", "NT"]
              .map((t) => {
                const stat = cumulativeTestament[t];
                const pct = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
                return `
                  <div>
                    <div class="flex items-center justify-between mb-1.5">
                      <span class="font-serif text-[#DBCFB3] font-medium">${t === "OT" ? "Old Testament (39 Books)" : "New Testament (27 Books)"}</span>
                      <span class="font-mono text-[11px] ${pct >= 70 ? "text-emerald-400" : "text-amber-400"}">
                        ${stat.total > 0 ? `${stat.correct}/${stat.total} (${pct}%)` : "No tests yet"}
                      </span>
                    </div>
                    <div class="w-full h-2 rounded-full bg-[#141413] border border-[#242422] overflow-hidden">
                      <div class="h-full ${pct >= 70 ? "bg-emerald-500" : "bg-amber-500"} transition-all duration-500" style="width: ${pct}%;"></div>
                    </div>
                  </div>
                `;
              })
              .join("")}
          </div>
        </div>

        <!-- Recent Score Trend Strip -->
        <div class="bg-[#1C1C1A] border border-[#2B2B28] rounded-xl p-5 space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-xs font-mono uppercase tracking-wider text-[#8C8A84]">
              Score Trend (Last 10 Tests)
            </h3>
            <span class="text-[10px] font-mono text-[#8C8A84]">Chronological</span>
          </div>

          ${
            quizHistory.length === 0
              ? `
                <div class="h-20 flex items-center justify-center text-xs text-[#8C8A84] italic">
                  Take a test to see your score trend over time!
                </div>
              `
              : `
                <div class="flex items-end gap-1.5 h-20 pt-2">
                  ${quizHistory
                    .slice(0, 10)
                    .reverse()
                    .map((t, idx) => {
                      const pct = t.pct !== undefined ? t.pct : (t.scorecard?.overallPct || 0);
                      const barColor =
                        pct >= 85 ? "bg-emerald-500" : pct >= 70 ? "bg-[#C4B79C]" : pct >= 50 ? "bg-amber-500" : "bg-rose-500";
                      return `
                        <div
                          class="flex-1 flex flex-col items-center gap-1 group relative cursor-pointer"
                          data-review-past-test="${t.id || idx}"
                          title="${getTestScopeLabel(t.scope, t.specificBookId)}: ${pct}% on ${formatTimestamp(t.date)}"
                        >
                          <div class="w-full rounded-t ${barColor} transition-all group-hover:brightness-125" style="height: ${Math.max(12, pct)}%;"></div>
                          <span class="text-[9px] font-mono text-[#8C8A84] group-hover:text-[#EAE8E2]">${pct}%</span>
                        </div>
                      `;
                    })
                    .join("")}
                </div>
              `
          }
        </div>
      </div>

      <!-- Cumulative Identified Weak Areas -->
      ${
        weakBooksList.length > 0
          ? `
            <div class="bg-[#241A17] border border-[#4A2822] rounded-xl p-4 space-y-3">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2 text-rose-300 font-semibold text-xs">
                  <span>⚠️</span>
                  <span>Identified Priority Books for Study (${weakBooksList.length} Books with Recurring Misses)</span>
                </div>
                <span class="text-[10px] font-mono text-rose-400">Targeted Review</span>
              </div>
              <p class="text-[11px] text-stone-300">
                You frequently miss questions in these books. Launch a chapter quiz or study their outlines to strengthen your mastery:
              </p>
              <div class="flex flex-wrap gap-2 pt-1">
                ${weakBooksList.slice(0, 8).map((wb) => `
                  <button
                    data-launch-book-quiz="${wb.bookId}"
                    class="launch-book-quiz-btn px-2.5 py-1 rounded-lg bg-[#381F1A] hover:bg-[#4E2B24] border border-[#5C322B] text-rose-200 text-xs transition flex items-center gap-1.5"
                    title="Click to quiz ${wb.bookName}"
                  >
                    <span class="font-serif font-bold">${wb.bookName}</span>
                    <span class="font-mono text-[10px] text-rose-400">(${wb.missCount} missed)</span>
                    <span class="text-[10px]">📝 Quiz Book →</span>
                  </button>
                `).join("")}
              </div>
            </div>
          `
          : ""
      }

      <!-- Past Test Sessions Log -->
      <div class="space-y-4">
        <!-- List Header & Filter Controls -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#2A2A27] pb-3">
          <div class="flex items-center gap-2">
            <h3 class="font-serif text-lg font-bold text-[#EAE8E2]">
              📜 Past Test History (${filteredHistory.length})
            </h3>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <!-- Search Input -->
            <div class="relative">
              <input
                id="history-search-input"
                type="text"
                placeholder="Search history..."
                value="${historySearchQuery.replace(/"/g, "&quot;")}"
                class="w-36 sm:w-44 px-2.5 py-1 text-xs bg-[#141413] border border-[#2B2B28] rounded-lg text-[#EAE8E2] placeholder:text-[#6D6B66] focus:outline-none focus:border-[#C4B79C] transition"
              />
              ${
                historySearchQuery
                  ? `<button id="clear-history-search-btn" class="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-[#8C8A84] hover:text-[#EAE8E2]">✕</button>`
                  : ""
              }
            </div>

            <!-- Scope Filters -->
            <div class="flex flex-wrap items-center gap-1 bg-[#1C1C1A] p-1 rounded-lg border border-[#2B2B28] text-xs">
              ${[
                { id: "ALL", label: "All Tests" },
                { id: "NT", label: "NT" },
                { id: "OT", label: "OT" },
                { id: "BOOK_QUIZZES", label: "Book Quizzes" }
              ]
                .map(
                  (f) => `
                    <button
                      data-history-scope="${f.id}"
                      class="filter-history-scope-btn px-2.5 py-1 rounded transition ${
                        historyScopeFilter === f.id
                          ? "bg-[#2E2E2A] text-[#EAE8E2] font-semibold"
                          : "text-[#8C8A84] hover:text-[#EAE8E2]"
                      }"
                    >
                      ${f.label}
                    </button>
                  `
                )
                .join("")}
            </div>
          </div>
        </div>

        <!-- History Cards List -->
        ${
          filteredHistory.length === 0
            ? `
              <div class="bg-[#1C1C1A] border border-[#2B2B28] rounded-xl p-8 text-center space-y-3">
                <div class="text-3xl">📝</div>
                <h4 class="font-serif text-base font-bold text-[#EAE8E2]">No Past Tests Found</h4>
                <p class="text-xs text-[#8C8A84] max-w-sm mx-auto">
                  Take a diagnostic test or an individual book quiz to start recording your progress and reviewing past answers.
                </p>
                <button
                  data-quiz-tab="diagnostic"
                  class="quiz-tab-switch-btn px-4 py-2 bg-[#C4B79C] hover:bg-[#DBCFB3] text-[#141413] rounded-lg font-semibold text-xs transition inline-flex items-center gap-1.5 shadow"
                >
                  <span>🎯 Take Your First Test</span>
                </button>
              </div>
            `
            : `
              <div class="space-y-3">
                ${filteredHistory
                  .map((t, idx) => {
                    const testId = t.id || `hist_${t.date || idx}`;
                    const scorePct = t.pct !== undefined ? t.pct : (t.scorecard?.overallPct || 0);
                    const correctCount = t.correct !== undefined ? t.correct : (t.scorecard?.totalCorrect || 0);
                    const totalCount = t.total || t.questionCount || (t.scorecard?.totalQuestions) || 0;
                    const scopeLabel = getTestScopeLabel(t.scope, t.specificBookId);
                    const durationText = formatDuration(t.durationMs || t.scorecard?.durationMs);
                    const dateText = formatTimestamp(t.date);

                    const badgeColor =
                      scorePct >= 90
                        ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                        : scorePct >= 75
                        ? "bg-[#C4B79C]/15 text-[#C4B79C] border-[#C4B79C]/30"
                        : scorePct >= 60
                        ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                        : "bg-rose-500/15 text-rose-400 border-rose-500/30";

                    return `
                      <div class="bg-[#1C1C1A] hover:bg-[#20201E] border border-[#2B2B28] rounded-xl p-4 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm group">
                        <!-- Left: Info & Score -->
                        <div class="space-y-1">
                          <div class="flex items-center gap-2">
                            <span class="px-2 py-0.5 rounded font-mono text-[10px] font-bold border ${badgeColor}">
                              ${scorePct}% Accuracy
                            </span>
                            <span class="text-xs font-serif font-bold text-[#EAE8E2]">
                              ${scopeLabel}
                            </span>
                          </div>
                          <div class="flex items-center gap-2 text-xs text-[#8C8A84] font-mono">
                            <span>${correctCount}/${totalCount} correct</span>
                            <span>•</span>
                            <span>⏱️ ${durationText}</span>
                            <span>•</span>
                            <span>📅 ${dateText}</span>
                          </div>
                        </div>

                        <!-- Right: Action Buttons (Review, Retake, Delete) -->
                        <div class="flex items-center gap-2 shrink-0">
                          <button
                            data-review-past-test="${testId}"
                            class="review-past-test-btn px-3 py-1.5 rounded-lg bg-[#2A2A27] hover:bg-[#C4B79C] text-[#DBCFB3] hover:text-[#141413] text-xs font-semibold transition border border-[#383834] flex items-center gap-1 shadow-xs"
                          >
                            <span>🔍 Review</span>
                          </button>

                          <button
                            data-open-retake-modal="${testId}"
                            class="open-retake-modal-btn px-3 py-1.5 rounded-lg bg-[#2A2A27] hover:bg-[#383834] text-[#EAE8E2] text-xs font-semibold transition border border-[#383834] flex items-center gap-1"
                          >
                            <span>🔄 Retake</span>
                          </button>

                          <button
                            data-delete-past-test="${testId}"
                            class="delete-past-test-btn px-2.5 py-1.5 rounded-lg bg-transparent hover:bg-rose-500/20 text-[#8C8A84] hover:text-rose-400 text-xs transition"
                            title="Delete this test record"
                          >
                            <span>🗑️</span>
                          </button>
                        </div>
                      </div>
                    `;
                  })
                  .join("")}
              </div>
            `
        }

        <!-- Bottom Clear All History Option -->
        ${
          quizHistory.length > 0
            ? `
              <div class="pt-4 flex items-center justify-between border-t border-[#262624]">
                <span class="text-xs text-[#6D6B66]">Test history syncs automatically to Google SSO Cloud.</span>
                <button
                  id="clear-all-quiz-history-btn"
                  class="text-xs text-[#8C8A84] hover:text-rose-400 transition underline underline-offset-2"
                >
                  Clear All Test History
                </button>
              </div>
            `
            : ""
        }
      </div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// 6. RETAKE MODAL OVERLAY
// --------------------------------------------------------------------------
function renderRetakeModal(test) {
  const scopeLabel = getTestScopeLabel(test.scope, test.specificBookId);
  const totalQ = test.total || test.questionCount || (test.scorecard?.totalQuestions) || (test.questions?.length) || 25;
  const missedCount = test.scorecard?.missedQuestions?.length || test.missedQuestions?.length || (test.total && test.correct !== undefined ? test.total - test.correct : 0);
  const testId = test.id || `hist_${test.date || ""}`;

  return `
    <div id="retake-quiz-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs animate-fade-in">
      <div class="bg-[#1C1C1A] border border-[#2B2B28] rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl">
        <!-- Modal Header -->
        <div class="flex items-center justify-between border-b border-[#2A2A27] pb-3">
          <div class="space-y-0.5">
            <span class="text-[10px] font-mono uppercase tracking-widest text-[#C4B79C]">Retake Test</span>
            <h3 class="font-serif text-lg font-bold text-[#EAE8E2]">${scopeLabel}</h3>
          </div>
          <button id="close-retake-modal-btn" class="text-xs text-[#8C8A84] hover:text-[#EAE8E2] px-2 py-1 rounded bg-[#141413] border border-[#2A2A27] transition">
            ✕ Close
          </button>
        </div>

        <p class="text-xs text-[#A19E97]">
          Select which questions you would like to retake for this assessment:
        </p>

        <!-- Retake Options -->
        <div class="space-y-2.5">
          <!-- 1. Exact Same Questions -->
          <button
            data-action-retake="exact"
            data-test-id="${testId}"
            class="retake-option-btn w-full text-left p-3.5 rounded-xl bg-[#141413] hover:bg-[#252522] border border-[#262623] hover:border-[#C4B79C] transition space-y-1 group"
          >
            <div class="flex items-center justify-between">
              <span class="font-serif font-bold text-sm text-[#EAE8E2] group-hover:text-[#C4B79C]">
                🎯 Retake Exact Questions
              </span>
              <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#1C1C1A] border border-[#2B2B28] text-[#C4B79C]">
                ${totalQ} Questions
              </span>
            </div>
            <p class="text-[11px] text-[#8C8A84]">
              Test yourself on the exact same questions from this test session to verify mastery.
            </p>
          </button>

          <!-- 2. Only Missed Questions -->
          ${
            missedCount > 0
              ? `
                <button
                  data-action-retake="missed"
                  data-test-id="${testId}"
                  class="retake-option-btn w-full text-left p-3.5 rounded-xl bg-[#141413] hover:bg-[#252522] border border-[#262623] hover:border-rose-400 transition space-y-1 group"
                >
                  <div class="flex items-center justify-between">
                    <span class="font-serif font-bold text-sm text-rose-300 group-hover:text-rose-200">
                      ⚡ Retake Only Missed Questions
                    </span>
                    <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 font-bold">
                      ${missedCount} Missed
                    </span>
                  </div>
                  <p class="text-[11px] text-[#8C8A84]">
                    Focused remedial drill containing only the questions you got wrong previously.
                  </p>
                </button>
              `
              : ""
          }

          <!-- 3. New Questions with Same Settings -->
          <button
            data-action-retake="new"
            data-test-id="${testId}"
            class="retake-option-btn w-full text-left p-3.5 rounded-xl bg-[#141413] hover:bg-[#252522] border border-[#262623] hover:border-[#C4B79C] transition space-y-1 group"
          >
            <div class="flex items-center justify-between">
              <span class="font-serif font-bold text-sm text-[#EAE8E2] group-hover:text-[#C4B79C]">
                ✨ New Test with Same Settings
              </span>
              <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#1C1C1A] border border-[#2B2B28] text-[#8C8A84]">
                Randomized
              </span>
            </div>
            <p class="text-[11px] text-[#8C8A84]">
              Generate a fresh set of questions with the same scope (${scopeLabel}) and length.
            </p>
          </button>
        </div>
      </div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// 7. BOOK QUIZZES LIST VIEW (All 66 Books)
// --------------------------------------------------------------------------
function renderBookQuizzesListView({ selectedBookId, data }) {
  return `
    <div class="space-y-6">
      <div class="bg-[#1C1C1A] border border-[#2B2B28] rounded-xl p-5 space-y-2">
        <h3 class="font-serif text-base font-bold text-[#EAE8E2] flex items-center gap-2">
          <span>📖</span>
          <span>Individual Book Chapter Mastery Quizzes</span>
        </h3>
        <p class="text-xs text-[#A19E97] leading-relaxed">
          Select any of the 66 books to take a targeted chapter-recall quiz. Questions will test your mastery of what happened in each specific chapter of that book.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        ${BIBLE_BOOKS.map((b) => {
          return `
            <button
              data-launch-book-quiz="${b.id}"
              class="launch-book-quiz-btn text-left p-3.5 rounded-xl bg-[#1C1C1A] hover:bg-[#262623] border border-[#2B2B28] hover:border-[#C4B79C]/60 transition flex flex-col justify-between space-y-2 group"
            >
              <div class="flex items-start justify-between">
                <div>
                  <span class="text-[10px] font-mono text-[#8C8A84] uppercase tracking-wider">${b.category}</span>
                  <h4 class="font-serif font-bold text-sm text-[#EAE8E2] group-hover:text-[#C4B79C] transition">
                    ${b.name}
                  </h4>
                </div>
                <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#141413] text-[#A19E97] border border-[#242422]">
                  ${b.chapterCount} ch
                </span>
              </div>
              <p class="text-[11px] text-[#8C8A84] line-clamp-2">${b.keyTheme}</p>
              <div class="pt-1.5 border-t border-[#262624] flex items-center justify-between text-[11px] text-[#C4B79C] font-semibold">
                <span>Start Quiz</span>
                <span>→</span>
              </div>
            </button>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

