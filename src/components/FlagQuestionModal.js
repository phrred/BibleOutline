import { getBookById } from "../../data/bible_catalog.js";

export const FLAG_CATEGORIES = [
  {
    id: "wrong_answer",
    label: "Wrong Answer",
    icon: "❌",
    desc: "The marked answer is inaccurate or missing a valid alternative"
  },
  {
    id: "too_specific",
    label: "Too Specific / Obscure",
    icon: "🎯",
    desc: "The question demands overly trivial details or obscure phrasing"
  },
  {
    id: "poorly_phrased",
    label: "Poorly Phrased / Ambiguous",
    icon: "✍️",
    desc: "The question prompt is confusing, misleading, or poorly written"
  },
  {
    id: "typo",
    label: "Typo / Formatting Error",
    icon: "🔤",
    desc: "Spelling, punctuation, scripture citation, or layout issue"
  },
  {
    id: "bad_question",
    label: "Remove / Defective Question",
    icon: "🗑️",
    desc: "Question is fundamentally flawed and should be deleted"
  },
  {
    id: "other",
    label: "Other Feedback",
    icon: "💬",
    desc: "General suggestion or refinement"
  }
];

export function renderFlagQuestionModal(flagData) {
  if (!flagData || !flagData.question) return "";

  const q = flagData.question;
  const selectedCategory = flagData.category || "wrong_answer";
  const comments = flagData.comments || "";
  const suggestedAnswer = flagData.suggestedAnswer || "";
  const isSubmitting = Boolean(flagData.isSubmitting);
  const errorMessage = flagData.errorMessage || "";
  const bookName = q.bookId ? getBookById(q.bookId)?.name || q.bookId : "";

  return `
    <div id="flag-modal-overlay" class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in select-none">
      <div class="bg-[#1C1C1A] border border-[#33332F] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl space-y-0 text-[#EAE8E2]">
        
        <!-- Header -->
        <div class="px-6 py-4 border-b border-[#2A2A27] flex items-center justify-between bg-[#171715]">
          <div class="flex items-center gap-2">
            <span class="text-base">🚩</span>
            <h3 class="font-serif text-base font-bold text-[#EAE8E2]">
              Flag Question for Review
            </h3>
          </div>
          <button
            id="flag-modal-close-btn"
            class="text-[#8C8A84] hover:text-[#EAE8E2] text-sm p-1 rounded hover:bg-[#242421] transition"
            title="Close"
          >
            ✕
          </button>
        </div>

        <!-- Scrollable Body -->
        <div class="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
          <!-- Question Snapshot Box -->
          <div class="bg-[#141413] border border-[#2B2B28] rounded-xl p-3.5 space-y-2 text-xs">
            <div class="flex items-center justify-between text-[#8C8A84] font-mono text-[10px]">
              <span>ID: ${q.id || "N/A"}</span>
              ${bookName ? `<span>📖 ${bookName} ${q.chapterNum || ""}</span>` : ""}
            </div>
            <p class="font-serif text-xs text-[#DBCFB3] leading-relaxed italic">
              "${q.prompt || ""}"
            </p>
            <div class="text-[11px] text-[#8C8A84] pt-1 border-t border-[#222220]">
              <span class="text-[#A19E97]">Expected Answer:</span>
              <strong class="text-[#EAE8E2] font-mono">${q.displayAnswer || (Array.isArray(q.answers) ? q.answers[0] : "") || "N/A"}</strong>
            </div>
          </div>

          ${
            errorMessage
              ? `
                <div class="bg-rose-500/10 border border-rose-500/30 rounded-lg p-3 text-xs text-rose-300 flex items-center gap-2">
                  <span>⚠️</span>
                  <span>${errorMessage}</span>
                </div>
              `
              : ""
          }

          <!-- Category Selector -->
          <div class="space-y-2">
            <label class="block text-xs font-mono uppercase tracking-wider text-[#A19E97]">
              1. What is the issue with this question?
            </label>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              ${FLAG_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return `
                  <button
                    type="button"
                    data-flag-category="${cat.id}"
                    class="flag-category-option text-left p-2.5 rounded-lg border text-xs transition flex items-start gap-2 ${
                      isSelected
                        ? "bg-[#252522] border-[#C4B79C] text-[#EAE8E2] ring-1 ring-[#C4B79C]"
                        : "bg-[#161614] border-[#262623] hover:border-[#383834] text-[#8C8A84] hover:text-[#EAE8E2]"
                    }"
                  >
                    <span class="text-sm shrink-0">${cat.icon}</span>
                    <div class="space-y-0.5 min-w-0">
                      <div class="font-semibold leading-tight text-[#EAE8E2] truncate">${cat.label}</div>
                      <div class="text-[10px] text-[#8C8A84] leading-tight line-clamp-2">${cat.desc}</div>
                    </div>
                  </button>
                `;
              }).join("")}
            </div>
          </div>

          <!-- Suggested Answer Field (Optional) -->
          <div class="space-y-1.5">
            <label class="block text-xs font-mono uppercase tracking-wider text-[#A19E97]">
              2. Suggested Correct Answer <span class="text-[#6D6B66] font-normal">(Optional)</span>
            </label>
            <input
              id="flag-suggested-answer-input"
              type="text"
              placeholder="e.g. Genesis 15, or alternative acceptable spelling"
              value="${suggestedAnswer.replace(/"/g, "&quot;")}"
              class="w-full bg-[#141413] border border-[#2D2D29] focus:border-[#C4B79C] rounded-lg px-3.5 py-2 text-xs text-[#EAE8E2] placeholder:text-[#5B5953] focus:outline-none transition font-sans"
            />
          </div>

          <!-- Additional Comments / Details -->
          <div class="space-y-1.5">
            <label class="block text-xs font-mono uppercase tracking-wider text-[#A19E97]">
              3. Comments & Rationale <span class="text-[#6D6B66] font-normal">(Optional but helpful)</span>
            </label>
            <textarea
              id="flag-comments-input"
              rows="3"
              placeholder="Explain what makes this question incorrect, confusing, or too specific, or paste the clarifying verse..."
              class="w-full bg-[#141413] border border-[#2D2D29] focus:border-[#C4B79C] rounded-lg px-3.5 py-2 text-xs text-[#EAE8E2] placeholder:text-[#5B5953] focus:outline-none transition font-sans resize-none"
            >${comments}</textarea>
          </div>

        </div>

        <!-- Footer Actions -->
        <div class="px-6 py-4 border-t border-[#2A2A27] bg-[#171715] flex items-center justify-between">
          <button
            id="flag-modal-cancel-btn"
            class="px-4 py-2 rounded-lg bg-[#242421] hover:bg-[#2C2C28] text-[#A19E97] hover:text-[#EAE8E2] text-xs transition"
          >
            Cancel
          </button>

          <button
            id="flag-modal-submit-btn"
            ${isSubmitting ? "disabled" : ""}
            class="px-5 py-2 rounded-lg bg-[#C4B79C] hover:bg-[#DBCFB3] text-[#141413] text-xs font-serif font-bold transition flex items-center gap-2 shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ${
              isSubmitting
                ? `
                  <span class="inline-block w-3.5 h-3.5 border-2 border-[#141413] border-t-transparent rounded-full animate-spin"></span>
                  <span>Submitting Flag...</span>
                `
                : `
                  <span>🚩 Submit Flag</span>
                `
            }
          </button>
        </div>

      </div>
    </div>
  `;
}
