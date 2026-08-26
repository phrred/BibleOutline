import { BIBLE_ERAS } from "../../data/bible_catalog.js";
import { extractESVHeadings } from "../esv_api.js";

export function renderBookRollupView({
  selectedBook,
  data,
  rollupLayout = "document"
}) {
  const bookData = data.books[selectedBook.id] || { bookSummary: "" };

  return `
    <div class="h-full w-full overflow-y-auto bg-[#141413] text-[#EAE8E2]">
      <div class="${rollupLayout === "grid" ? "max-w-5xl" : "max-w-3xl"} mx-auto p-6 md:p-10 space-y-10">
      <!-- Quiet Book Header -->
      <div class="border-b border-[#242422] pb-6 space-y-3">
        <div class="flex items-center justify-between text-xs text-[#8C8A84]">
          <span>${selectedBook.testament} • ${selectedBook.category}</span>
          <span>${selectedBook.author} • ${selectedBook.date}</span>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-3">
          <h1 class="font-serif text-3xl font-bold text-[#EAE8E2] tracking-tight">
            ${selectedBook.name}
          </h1>

          <div class="flex flex-wrap items-center gap-2">
            <!-- Layout Switcher (Document List vs Two-Column Grid) -->
            <div class="flex items-center bg-[#1D1D1B] p-0.5 rounded-lg border border-[#2B2B28] text-xs">
              <button
                data-set-rollup-layout="document"
                class="set-rollup-layout-btn px-2.5 py-1.5 rounded text-xs transition flex items-center gap-1.5 cursor-pointer ${
                  rollupLayout === "document"
                    ? "bg-[#2D2D2A] text-[#EAE8E2] font-semibold shadow-xs"
                    : "text-[#8C8A84] hover:text-[#EAE8E2]"
                }"
                title="Vertical Document List Outline"
              >
                <span>📄</span>
                <span>List View</span>
              </button>
              <button
                data-set-rollup-layout="grid"
                class="set-rollup-layout-btn px-2.5 py-1.5 rounded text-xs transition flex items-center gap-1.5 cursor-pointer ${
                  rollupLayout === "grid"
                    ? "bg-[#2D2D2A] text-[#EAE8E2] font-semibold shadow-xs"
                    : "text-[#8C8A84] hover:text-[#EAE8E2]"
                }"
                title="Two-Column Grid Table (Headings Column + Bullets Column)"
              >
                <span>▦</span>
                <span>Grid View</span>
              </button>
            </div>

            <span class="text-[#333330] hidden sm:inline">|</span>

            <!-- Layout-Aware Export Buttons -->
            <button
              data-export-book-pdf="${selectedBook.id}"
              data-export-layout="${rollupLayout}"
              class="export-book-pdf-btn px-3 py-1.5 rounded-lg bg-[#22221F] hover:bg-[#C4B79C] text-[#C4B79C] hover:text-[#141413] border border-[#3A3A34] text-xs font-semibold transition shadow flex items-center gap-1.5 cursor-pointer"
              title="Print or Save ${selectedBook.name} as a compact PDF using ${rollupLayout === 'grid' ? 'Grid Table' : 'List'} layout"
            >
              <span>📑</span>
              <span>Print / PDF (${rollupLayout === "grid" ? "Grid" : "List"})</span>
            </button>
            <button
              data-export-book-md="${selectedBook.id}"
              data-export-layout="${rollupLayout}"
              class="export-book-md-btn px-2.5 py-1.5 rounded-lg bg-[#22221F] hover:bg-[#2A2A27] text-[#DBCFB3] border border-[#33332E] text-xs font-semibold transition shadow flex items-center gap-1.5 cursor-pointer"
              title="Export ${selectedBook.name} as Markdown (.md) in ${rollupLayout === 'grid' ? 'Grid Table' : 'List'} layout"
            >
              <span>📄</span>
              <span>.md</span>
            </button>
            <button
              data-export-all-books="all"
              data-export-layout="${rollupLayout}"
              class="export-all-books-pdf-btn px-2.5 py-1.5 rounded-lg bg-[#1C1C1A] hover:bg-[#262623] text-[#A19E97] hover:text-[#EAE8E2] border border-[#2B2B28] text-xs font-medium transition shadow flex items-center gap-1 cursor-pointer"
              title="Export Complete Bible (All 66 Books) in ${rollupLayout === 'grid' ? 'Grid Table' : 'List'} layout"
            >
              <span>🌐</span>
              <span>All 66 Books</span>
            </button>

            <span class="text-[#333330] hidden sm:inline">|</span>

            <!-- Quiz Actions -->
            <button
              data-launch-book-headings-quiz="${selectedBook.id}"
              class="launch-book-headings-quiz-btn px-2.5 py-1.5 rounded-lg bg-[#22221F] hover:bg-[#2A2A27] text-[#DBCFB3] border border-[#33332E] text-xs font-semibold transition shadow flex items-center gap-1.5 cursor-pointer"
              title="Test major chapter headings for ${selectedBook.name}"
            >
              <span>📑 Quiz Headings</span>
            </button>
            <button
              data-launch-book-quiz="${selectedBook.id}"
              class="launch-book-quiz-btn px-3 py-1.5 rounded-lg bg-[#22221F] hover:bg-[#C4B79C] text-[#C4B79C] hover:text-[#141413] border border-[#33332E] text-xs font-semibold transition shadow flex items-center gap-1.5 cursor-pointer"
              title="Launch a full chapter mastery quiz for ${selectedBook.name}"
            >
              <span>📝 Quiz Book</span>
              <span>→</span>
            </button>
          </div>
        </div>

        <p class="text-xs leading-relaxed text-[#A19E97]">
          ${selectedBook.context}
        </p>
      </div>

      <!-- Overall Book Summary Section -->
      <div class="space-y-2">
        <label class="block text-xs font-mono uppercase tracking-wider text-[#C4B79C]">
          Overall Book Summary
        </label>
        <textarea
          id="book-summary-textarea"
          rows="4"
          placeholder="Write your synthesis of what happens across the entire book of ${selectedBook.name}..."
          class="w-full bg-[#191917] border border-[#262624] focus:border-[#C4B79C] rounded-md p-4 text-[#EAE8E2] text-sm leading-relaxed placeholder:text-[#6D6B66] focus:outline-none transition"
        >${(bookData.bookSummary || "").replace(/</g, "&lt;")}</textarea>
      </div>

      <!-- Complete Book Chapter Rollup -->
      <div class="space-y-6 pt-4">
        <div class="flex items-center justify-between border-b border-[#242422] pb-2">
          <div class="flex items-center gap-2">
            <h2 class="font-serif text-xl font-bold text-[#EAE8E2]">
              Complete Book Outline (${selectedBook.chapterCount} ch)
            </h2>
            <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-[#1D1D1B] border border-[#2A2A27] text-[#8C8A84]">
              ${rollupLayout === "grid" ? "Two-Column Grid View" : "Document List View"}
            </span>
          </div>
        </div>

        <div class="space-y-8">
          ${(() => {
            const rows = [];
            for (let ch = 1; ch <= selectedBook.chapterCount; ch++) {
              const chKey = `${selectedBook.id}-${ch}`;
              const chData = data.chapters[chKey] || {
                headingBlocks: [],
                chapterScripture: "",
                takeaway: ""
              };

              let blocks = chData.headingBlocks;
              if (!Array.isArray(blocks)) {
                const deletedHeadings = chData.deletedHeadings || [];
                blocks = extractESVHeadings(chData.chapterScripture, `${selectedBook.name} ${ch}`)
                  .filter((h) => !deletedHeadings.includes((h.heading || "").toLowerCase().trim()))
                  .map((h) => ({
                    heading: h.heading,
                    verses: h.verses,
                    notes: ""
                  }));
              }

              if (rollupLayout === "grid") {
                rows.push(`
                  <div id="rollup-chapter-${ch}" class="border border-[#262624] bg-[#171715] rounded-xl overflow-hidden shadow-md space-y-0">
                    <!-- Chapter Header Bar -->
                    <div class="flex items-center justify-between px-4 py-3 bg-[#1F1F1D] border-b border-[#2B2B28]">
                      <div class="flex items-center gap-2.5">
                        <span class="font-serif text-base font-bold text-[#EAE8E2]">Chapter ${ch}</span>
                        <span class="text-xs font-mono text-[#8C8A84]">(${selectedBook.shortName} ${ch})</span>
                      </div>
                      <button
                        data-chapter-num="${ch}"
                        class="open-chapter-editor-btn text-xs text-[#C4B79C] hover:text-[#EAE8E2] transition flex items-center gap-1 font-medium cursor-pointer"
                      >
                        <span>Outline Side-by-Side</span>
                        <span>→</span>
                      </button>
                    </div>

                    <!-- 2-Column Table for Headings & Bullets -->
                    <div class="overflow-x-auto">
                      <table class="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr class="bg-[#141413] text-[#8C8A84] font-mono uppercase tracking-wider text-[10px] border-b border-[#242422]">
                            <th class="py-2.5 px-4 w-[38%] border-r border-[#242422]">Heading</th>
                            <th class="py-2.5 px-4 w-[62%]">Outline</th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-[#222220]">
                          ${blocks
                            .map((block, hIdx) => {
                              const pts = Array.isArray(block.points)
                                ? block.points.filter((p) => p && p.trim().length > 0)
                                : block.notes
                                ? block.notes
                                    .split("\n")
                                    .map((p) => p.replace(/^[•\-\*]\s*/, "").trim())
                                    .filter(Boolean)
                                : [];

                              return `
                                <tr class="hover:bg-[#1A1A18]/60 transition">
                                  <!-- Column 1: Heading -->
                                  <td class="py-3 px-4 align-top border-r border-[#222220] space-y-1">
                                    <div class="font-serif font-semibold text-sm text-[#EAE8E2] leading-snug">
                                      ${block.heading}
                                    </div>
                                  </td>

                                  <!-- Column 2: Outline Bullets -->
                                  <td class="py-3 px-4 align-top text-sm text-[#EAE8E2]">
                                    ${
                                      pts.length > 0
                                        ? `
                                          <ul class="space-y-1 pl-1">
                                            ${pts
                                              .map(
                                                (pt) => `
                                              <li class="flex items-start gap-2 text-xs leading-relaxed text-[#D6D4CE]">
                                                <span class="text-[#C4B79C] select-none shrink-0 mt-0.5">•</span>
                                                <span>${pt.replace(/</g, "&lt;")}</span>
                                              </li>
                                            `
                                              )
                                              .join("")}
                                          </ul>
                                        `
                                        : `
                                          <div class="text-xs text-[#6D6B66] italic">
                                            No outline notes recorded
                                          </div>
                                        `
                                    }
                                  </td>
                                </tr>
                              `;
                            })
                            .join("")}
                        </tbody>
                      </table>
                    </div>

                    ${
                      chData.takeaway && chData.takeaway.trim()
                        ? `
                          <div class="px-4 py-2.5 bg-[#1B1A17] border-t border-[#2B2B28] text-xs text-[#C4B79C] flex items-start gap-2">
                            <span class="font-bold text-[#EAE8E2] uppercase font-mono text-[10px] tracking-wider shrink-0 mt-0.5">Takeaway:</span>
                            <span class="italic text-[#DBCFB3]">${chData.takeaway.replace(/</g, "&lt;")}</span>
                          </div>
                        `
                        : ""
                    }
                  </div>
                `);
              } else {
                rows.push(`
                  <div id="rollup-chapter-${ch}" class="border-b border-[#222220] pb-6 space-y-4">
                    <div class="flex items-center justify-between">
                      <h3 class="font-serif text-lg font-bold text-[#DBCFB3]">
                        Chapter ${ch}
                      </h3>
                      <button
                        data-chapter-num="${ch}"
                        class="open-chapter-editor-btn text-xs text-[#8C8A84] hover:text-[#EAE8E2] transition"
                      >
                        Outline Side-by-Side →
                      </button>
                    </div>

                    <div class="space-y-4">
                      ${blocks
                        .map((block) => `
                          <div class="space-y-1">
                            <div class="flex items-center gap-2">
                              <span class="font-serif font-semibold text-sm text-[#EAE8E2]">
                                ${block.heading}
                              </span>
                            </div>
                            ${(() => {
                              const pts = Array.isArray(block.points)
                                ? block.points.filter((p) => p && p.trim().length > 0)
                                : block.notes
                                ? block.notes
                                    .split("\n")
                                    .map((p) => p.replace(/^[•\-\*]\s*/, "").trim())
                                    .filter(Boolean)
                                : [];

                              if (pts.length > 0) {
                                return `
                                  <ul class="space-y-1 pl-3 text-sm text-[#EAE8E2]">
                                    ${pts
                                      .map(
                                        (pt) => `
                                      <li class="flex items-start gap-2">
                                        <span class="text-[#C4B79C] select-none">•</span>
                                        <span>${pt.replace(/</g, "&lt;")}</span>
                                      </li>
                                    `
                                      )
                                      .join("")}
                                  </ul>
                                `;
                              }
                              return `
                                <div class="text-xs text-[#6D6B66] italic">
                                  No outline notes recorded
                                </div>
                              `;
                            })()}
                          </div>
                        `)
                        .join("")}
                    </div>

                    ${
                      chData.takeaway && chData.takeaway.trim()
                        ? `
                            <div class="text-xs text-[#C4B79C] pt-1">
                              Takeaway: ${chData.takeaway}
                            </div>
                          `
                        : ""
                    }
                  </div>
                `);
              }
            }
            return rows.join("");
          })()}
        </div>
      </div>
    </div>
  </div>
  `;
}
