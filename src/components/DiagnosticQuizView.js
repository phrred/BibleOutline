import { BIBLE_BOOKS, getBookById } from "../../data/bible_catalog.js";
import { DiagnosticSession } from "../quiz_engine.js";

export function renderDiagnosticQuizView({
  activeQuizTab = "diagnostic", // "diagnostic" | "book-quizzes" | "history"
  session = null,
  scorecard = null,
  selectedScope = "ALL",
  selectedQuestionCount = 25,
  selectedBookId = "GEN",
  data = {}
}) {
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
              Identify weak areas across all 66 books, test chapter recall, and deep-dive into Scripture side-by-side.
            </p>
          </div>

          <!-- Tab Switcher (Only when not actively in an exam) -->
          ${
            !session || session.status === "completed"
              ? `
                <div class="flex items-center gap-1 bg-[#1C1C1A] p-1 rounded-lg border border-[#2B2B28] self-start shrink-0 text-xs">
                  <button
                    data-quiz-tab="diagnostic"
                    class="quiz-tab-switch-btn px-3 py-1.5 rounded transition ${
                      activeQuizTab === "diagnostic"
                        ? "bg-[#2E2E2A] text-[#EAE8E2] font-semibold shadow-2xs"
                        : "text-[#8C8A84] hover:text-[#EAE8E2]"
                    }"
                  >
                    🎯 Diagnostic Test
                  </button>
                  <button
                    data-quiz-tab="book-quizzes"
                    class="quiz-tab-switch-btn px-3 py-1.5 rounded transition ${
                      activeQuizTab === "book-quizzes"
                        ? "bg-[#2E2E2A] text-[#EAE8E2] font-semibold shadow-2xs"
                        : "text-[#8C8A84] hover:text-[#EAE8E2]"
                    }"
                  >
                    📖 Book Quizzes (66)
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

          // 2. If finished an exam and scorecard is available
          if (scorecard) {
            return renderScorecardView(scorecard);
          }

          // 3. Tab: Book Quizzes
          if (activeQuizTab === "book-quizzes") {
            return renderBookQuizzesListView({ selectedBookId, data });
          }

          // 4. Tab: Diagnostic Configurator (Default)
          return renderDiagnosticConfiguratorView({ selectedScope, selectedQuestionCount });
        })()}

      </div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// 1. DIAGNOSTIC CONFIGURATOR VIEW
// --------------------------------------------------------------------------
function renderDiagnosticConfiguratorView({ selectedScope, selectedQuestionCount }) {
  const scopes = [
    { id: "ALL", label: "Whole Bible", desc: "All 66 Books (Old & New Testaments)", badge: "66 Books" },
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
    { count: 50, label: "50 Questions", desc: "Deep full-length mastery exam" }
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
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
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
              value="${currentAns.replace(/"/g, '&quot;')}"
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
// 3. SCORECARD & DETAILED QUESTION REVIEW VIEW
// --------------------------------------------------------------------------
function renderScorecardView(scorecard) {
  const { totalQuestions, totalCorrect, overallPct, byTestament, byGenre, weakBooks, missedQuestions } = scorecard;

  // Grade color calculation
  const gradeColor =
    overallPct >= 90
      ? "text-emerald-400 border-emerald-500/40 bg-emerald-500/10"
      : overallPct >= 75
      ? "text-[#C4B79C] border-[#C4B79C]/40 bg-[#C4B79C]/10"
      : overallPct >= 60
      ? "text-amber-400 border-amber-500/40 bg-amber-500/10"
      : "text-rose-400 border-rose-500/40 bg-rose-500/10";

  return `
    <div class="space-y-8">
      <!-- Top Scorecard Summary Banner -->
      <div class="bg-[#1C1C1A] border border-[#2B2B28] rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#262624] pb-6">
          <div class="space-y-1.5">
            <span class="text-xs font-mono uppercase tracking-widest text-[#C4B79C]">
              Diagnostic Assessment Results
            </span>
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
              ${Object.entries(byGenre)
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
                .join("")}
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
                <span>No major book weaknesses detected in this diagnostic run!</span>
              </div>
            `
        }

        <!-- Actions -->
        <div class="pt-2 flex items-center justify-between">
          <button
            id="reset-diagnostic-config-btn"
            class="px-4 py-2.5 rounded-lg bg-[#2A2A27] hover:bg-[#383834] text-[#EAE8E2] text-xs font-semibold transition"
          >
            ← Start New Diagnostic
          </button>
        </div>
      </div>

      <!-- Detailed Question-by-Question Deep Dive Review -->
      <div class="space-y-4">
        <div class="flex items-center justify-between border-b border-[#2A2A27] pb-3">
          <h3 class="font-serif text-lg font-bold text-[#EAE8E2] flex items-center gap-2">
            <span>🔍</span>
            <span>Question Review & Side-by-Side Scripture Deep Dive</span>
          </h3>
          <span class="text-xs text-[#8C8A84]">
            ${missedQuestions.length} missed • ${totalCorrect} correct
          </span>
        </div>

        <div class="space-y-3">
          ${scorecard.missedQuestions
            .map((item, idx) => {
              const q = item.question;
              return `
                <div class="bg-[#1C1C1A] border border-[#3A2420] rounded-xl p-5 space-y-3 shadow-md">
                  <!-- Header: Badge & Status -->
                  <div class="flex items-center justify-between text-xs">
                    <span class="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-mono text-[10px] font-bold uppercase">
                      ✗ Missed (Question ${idx + 1})
                    </span>
                    <span class="text-[11px] font-mono text-[#8C8A84]">
                      ${q.scope} • ${q.genre}
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
                      <span class="text-rose-400 font-mono font-medium">${item.userAnswer || "(No answer)"}</span>
                    </div>
                    <div>
                      <span class="text-[#8C8A84] block text-[10px] uppercase font-mono">Correct Answer:</span>
                      <span class="text-emerald-400 font-mono font-bold">${item.correctAnswer}</span>
                    </div>
                  </div>

                  <!-- Explanation & Inline Scripture Inspect Button -->
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#262624]">
                    <p class="text-xs text-[#A19E97] leading-relaxed flex-1">
                      💡 <strong>Context:</strong> ${item.explanation}
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
            .join("")}
        </div>
      </div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// 4. BOOK QUIZZES LIST VIEW (All 66 Books)
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
