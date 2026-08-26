import { BIBLE_BOOKS } from "../../data/bible_catalog.js";
import { formatESVTextToHTML, extractESVHeadings } from "../esv_api.js";

export function renderChapterEditorView({
  selectedBook,
  chapterNum,
  splitViewMode = "split", // 'split' | 'outline' | 'scripture'
  splitRatio = 50,
  isLoadingESV = false,
  esvErrorMessage = null,
  data
}) {
  const chKey = `${selectedBook.id}-${chapterNum}`;
  const chData = data.chapters[chKey] || {
    headingBlocks: [],
    chapterScripture: "",
    takeaway: "",
    status: "empty"
  };

  const bookData = data.books[selectedBook.id] || { bookSummary: "" };

  // Use existing headingBlocks if initialized, otherwise populate from ESV scripture or default
  let blocks = chData.headingBlocks;
  if (!Array.isArray(blocks)) {
    const extractedHeadings = extractESVHeadings(
      chData.chapterScripture,
      `${selectedBook.name} ${chapterNum}`
    );
    blocks = extractedHeadings.map((esvH) => ({
      heading: esvH.heading,
      verses: esvH.verses,
      notes: "",
      points: [""]
    }));
    chData.headingBlocks = blocks;
  } else {
    // Ensure all blocks have well-formed points arrays
    blocks.forEach((b) => {
      if (!Array.isArray(b.points) || b.points.length === 0) {
        b.points = b.notes
          ? b.notes
              .split("\n")
              .map((l) => l.replace(/^[•\-\*]\s*/, "").trim())
              .filter(Boolean)
          : [""];
        if (b.points.length === 0) b.points = [""];
      }
    });
  }

  // Initialize collapse state for this chapter on global window.collapsedHeadingsMap
  window.collapsedHeadingsMap = window.collapsedHeadingsMap || {};
  if (!window.collapsedHeadingsMap[chKey]) {
    window.collapsedHeadingsMap[chKey] = {};
  }
  const chCollapsedState = window.collapsedHeadingsMap[chKey];

  const currentBookIdx = BIBLE_BOOKS.findIndex((b) => b.id === selectedBook.id);
  const hasPrevChapter = chapterNum > 1 || currentBookIdx > 0;
  const hasNextChapter = chapterNum < selectedBook.chapterCount || currentBookIdx < BIBLE_BOOKS.length - 1;

  let prevLabel = "← Prev";
  if (chapterNum === 1 && currentBookIdx > 0) {
    const prevB = BIBLE_BOOKS[currentBookIdx - 1];
    prevLabel = `← ${prevB.shortName} ${prevB.chapterCount}`;
  } else if (chapterNum > 1) {
    prevLabel = `← Ch ${chapterNum - 1}`;
  }

  let nextLabel = "Next →";
  if (chapterNum === selectedBook.chapterCount && currentBookIdx < BIBLE_BOOKS.length - 1) {
    const nextB = BIBLE_BOOKS[currentBookIdx + 1];
    nextLabel = `${nextB.shortName} 1 →`;
  } else if (chapterNum < selectedBook.chapterCount) {
    nextLabel = `Ch ${chapterNum + 1} →`;
  }

  // Count how many heading blocks have non-empty bullet points
  const outlinedHeadingsCount = blocks.filter(
    (b) => Array.isArray(b.points) && b.points.some((pt) => pt && pt.trim().length > 0)
  ).length;

  return `
    <div class="h-full flex flex-col overflow-hidden text-[#EAE8E2] bg-[#161614]">
      <!-- Sub-header Toolbar: Stepper & View Controls -->
      <div class="px-6 py-2.5 border-b border-[#242422] flex items-center justify-between gap-3 shrink-0 text-xs bg-[#181816]">
        <!-- Left: Synchronized Stepper -->
        <div class="flex items-center gap-2">
          <button
            id="prev-chapter-btn"
            ${!hasPrevChapter ? "disabled" : ""}
            class="px-3 py-1 rounded bg-[#20201E] hover:bg-[#2A2A27] disabled:opacity-20 border border-[#2B2B28] text-[#EAE8E2] transition"
            title="Step to previous chapter (ArrowLeft)"
          >
            ${prevLabel}
          </button>
          <span class="font-serif font-medium text-sm text-[#DBCFB3] px-2">
            ${selectedBook.name} ${chapterNum}
          </span>
          <button
            id="next-chapter-btn"
            ${!hasNextChapter ? "disabled" : ""}
            class="px-3 py-1 rounded bg-[#C4B79C] hover:bg-[#DBCFB3] text-[#141413] font-semibold disabled:opacity-20 transition"
            title="Step to next chapter (ArrowRight)"
          >
            ${nextLabel}
          </button>
        </div>

        <!-- Center: Overall Book Summary Toggle -->
        <button
          id="toggle-book-summary-box-btn"
          class="text-[#A19E97] hover:text-[#EAE8E2] transition flex items-center gap-1.5"
        >
          <span>Book Summary (${selectedBook.name})</span>
          <span class="text-[10px] text-[#6D6B66]">[${bookData.bookSummary ? "Written" : "Add"}]</span>
        </button>

        <!-- Right: Refresh ESV -->
        <div class="flex items-center gap-2">
          <button
            id="refresh-esv-btn"
            class="text-xs text-[#7B7974] hover:text-[#C4B79C] transition flex items-center gap-1"
            title="Refresh ESV text & headings from Crossway API"
          >
            <span>↻</span>
            <span>Refresh ESV Scripture</span>
          </button>
        </div>
      </div>

      <!-- Expandable Overall Book Summary Banner -->
      <div
        id="book-summary-collapsible"
        class="bg-[#1C1C1A] border-b border-[#282825] p-4 px-6 space-y-1.5 shrink-0 ${
          bookData.bookSummary ? "" : "hidden"
        }"
      >
        <div class="flex items-center justify-between text-xs">
          <span class="font-serif text-[#C4B79C]">Overall Book Summary — ${selectedBook.name}</span>
          <button id="hide-book-summary-box-btn" class="text-[#6D6B66] hover:text-[#EAE8E2]">Close</button>
        </div>
        <textarea
          id="quick-book-summary-textarea"
          rows="3"
          placeholder="Write your summary of what happens across the entire book of ${selectedBook.name} here..."
          class="w-full bg-[#141413] border border-[#282825] rounded p-3 text-[#EAE8E2] text-sm leading-relaxed placeholder:text-[#6D6B66] focus:outline-none focus:border-[#C4B79C]"
        >${(bookData.bookSummary || "").replace(/</g, "&lt;")}</textarea>
      </div>

      <!-- MAIN SPLIT WORKSPACE -->
      <div
        id="chapter-split-container"
        class="flex-1 flex overflow-hidden relative"
      >
        <!-- COLUMN 1 / PANEL A: UNIFIED OUTLINE CANVAS WITH BULLETED LIST EDITOR -->
        <div
          id="chapter-outline-panel"
          class="h-full overflow-hidden flex flex-col bg-[#161614] p-6 space-y-3 shrink-0"
          style="width: ${splitRatio}%; min-width: 260px; max-width: calc(100% - 260px);"
        >
                  <!-- Top Bar & One-Click Chapter Selector for Current Book -->
                  <div class="space-y-2 border-b border-[#262624] pb-2.5 shrink-0">
                    <div class="flex items-center justify-between gap-2">
                      <div class="flex items-center gap-1.5 text-xs">
                        <span class="font-mono uppercase tracking-wider text-[#DBCFB3] font-semibold">
                          ${selectedBook.name} Chapters:
                        </span>
                      </div>
                      <!-- Real-Time Save Indicator -->
                      <div
                        id="editor-save-indicator"
                        class="text-[11px] font-mono text-[#34A853] flex items-center gap-1"
                      >
                        <span>✓</span>
                        <span>Saved</span>
                      </div>
                    </div>

                    <!-- Compact Chapter Number Bar -->
                    <div class="flex items-center gap-1.5 overflow-x-auto py-1 min-h-[38px] no-scrollbar">
                      ${Array.from({ length: selectedBook.chapterCount }, (_, i) => i + 1)
                        .map((chN) => {
                          const cKey = `${selectedBook.id}-${chN}`;
                          const cStatus = data.chapters?.[cKey]?.status || "empty";
                          const isCur = chN === chapterNum;
                          return `
                            <button
                              type="button"
                              data-quick-ch="${chN}"
                              class="quick-chapter-pill shrink-0 px-2.5 py-1.5 rounded text-xs leading-none font-mono transition flex items-center gap-1 ${
                                isCur
                                  ? "bg-[#C4B79C] text-[#141413] font-bold shadow-2xs"
                                  : cStatus !== "empty"
                                  ? "bg-[#252522] text-[#DBCFB3] hover:bg-[#30302C]"
                                  : "bg-[#181816] text-[#6D6B66] hover:bg-[#22221F] hover:text-[#EAE8E2]"
                              }"
                              title="Jump to ${selectedBook.name} ${chN}"
                            >
                              <span>${chN}</span>
                              ${cStatus !== "empty" && !isCur ? '<span class="w-1.5 h-1.5 rounded-full bg-[#C4B79C]"></span>' : ""}
                            </button>
                          `;
                        })
                        .join("")}
                    </div>

                    <!-- Outline Toolbar Row -->
                    <div class="flex items-center justify-between pt-1">

                    <!-- Outline Toolbar Buttons -->
                    <div class="flex items-center gap-1 bg-[#1A1A18] p-1 rounded border border-[#2B2B28] text-xs">
                      <button
                        type="button"
                        data-rich-command="bold"
                        class="rich-toolbar-btn px-2 py-1 rounded hover:bg-[#2A2A27] text-[#EAE8E2] font-bold transition"
                        title="Bold (Cmd+B)"
                      >
                        B
                      </button>
                      <button
                        type="button"
                        data-rich-command="italic"
                        class="rich-toolbar-btn px-2 py-1 rounded hover:bg-[#2A2A27] text-[#EAE8E2] italic transition"
                        title="Italic (Cmd+I)"
                      >
                        I
                      </button>
                      <span class="w-[1px] h-4 bg-[#2D2D2A] mx-0.5"></span>
                      <button
                        type="button"
                        data-rich-command="insertUnorderedList"
                        class="rich-toolbar-btn px-2.5 py-1 rounded hover:bg-[#2A2A27] text-[#C4B79C] font-mono transition flex items-center gap-1"
                        title="Create or toggle Bulleted List (•)"
                      >
                        <span>•</span>
                        <span>Bulleted List</span>
                      </button>
                      <button
                        type="button"
                        data-rich-command="insertOrderedList"
                        class="rich-toolbar-btn px-2.5 py-1 rounded hover:bg-[#2A2A27] text-[#A19E97] font-mono transition flex items-center gap-1"
                        title="Create Numbered List (1.)"
                      >
                        <span>1.</span>
                        <span>Numbered List</span>
                      </button>
                      <span class="w-[1px] h-4 bg-[#2D2D2A] mx-0.5"></span>
                      <button
                        type="button"
                        id="add-heading-btn"
                        class="px-2.5 py-1 rounded bg-[#20201D] hover:bg-[#2A2A27] text-[#C4B79C] hover:text-[#DBCFB3] border border-[#2B2B28] transition flex items-center gap-1 font-mono text-xs font-medium"
                        title="Add a new section heading"
                      >
                        <span>+</span>
                        <span>Add Heading</span>
                      </button>
                      <button
                        type="button"
                        id="reinsert-esv-headings-btn"
                        class="px-2 py-1 rounded hover:bg-[#2A2A27] text-[#8C8A84] hover:text-[#C4B79C] transition"
                        title="Reset to official ESV Section Headings"
                      >
                        📑 ESV Headings
                      </button>
                      <button
                        type="button"
                        id="toggle-rich-headings-btn"
                        class="px-2 py-1 rounded hover:bg-[#2A2A27] text-[#8C8A84] hover:text-[#EAE8E2] transition flex items-center gap-1"
                        title="Collapse or Expand all section headings"
                      >
                        <span>▼</span>
                        <span>Toggle All</span>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- ONE UNIFIED CHAPTER OUTLINE DOCUMENT WITH CLEAN HEADERS -->
                  <div
                    id="chapter-rich-outline-editor"
                    class="flex-1 bg-[#1A1A18] border border-[#2B2B28] rounded-lg p-5 space-y-4 overflow-y-auto shadow-inner"
                  >
                    ${
                      blocks.length === 0
                        ? `
                          <div class="py-12 px-4 text-center text-xs text-[#7B7974] space-y-3">
                            <div class="text-sm text-[#A19E97] font-medium">No section headings in this chapter outline.</div>
                            <p class="text-xs text-[#6D6B66]">Add custom headings to structure your outline or insert default ESV headings.</p>
                            <div class="flex items-center justify-center gap-3 pt-2">
                              <button
                                type="button"
                                id="empty-add-heading-btn"
                                class="px-3 py-1.5 rounded bg-[#C4B79C] hover:bg-[#DBCFB3] text-[#141413] font-semibold text-xs transition flex items-center gap-1 cursor-pointer"
                              >
                                <span>+</span>
                                <span>Add Heading</span>
                              </button>
                              <button
                                type="button"
                                id="empty-restore-esv-btn"
                                class="px-3 py-1.5 rounded bg-[#20201D] hover:bg-[#2A2A27] border border-[#2B2B28] text-[#DBCFB3] text-xs transition flex items-center gap-1 cursor-pointer"
                              >
                                <span>📑</span>
                                <span>Insert ESV Headings</span>
                              </button>
                            </div>
                          </div>
                        `
                        : blocks
                            .map((block, idx) => {
                              const isCol = Boolean(chCollapsedState[idx]);
                              const pts =
                                Array.isArray(block.points) && block.points.length > 0
                                  ? block.points.filter((p) => p !== null && p !== undefined)
                                  : [""];

                              return `
                                <div
                                  class="esv-rich-section-wrap border border-[#262624] rounded-lg bg-[#181816] overflow-hidden transition"
                                  data-heading-index="${idx}"
                                >
                                  <!-- SIMPLIFIED SECTION HEADING -->
                                  <div
                                    data-toggle-heading="${idx}"
                                    class="esv-rich-heading-banner flex items-center justify-between px-3.5 py-2.5 bg-[#1E1E1B] border-b border-[#262624] cursor-pointer select-none hover:bg-[#232320] transition gap-2"
                                  >
                                    <!-- Left: Toggle Icon, Title & Verse Tag -->
                                    <div class="flex items-center gap-2 flex-1 min-w-0">
                                      <span class="rich-heading-toggle-icon font-mono text-xs text-[#8C8A84] w-4 text-center shrink-0">
                                        ${isCol ? "▶" : "▼"}
                                      </span>
                                      <input
                                        type="text"
                                        data-heading-title-input="${idx}"
                                        value="${(block.heading || "").replace(/"/g, "&quot;")}"
                                        placeholder="Heading title"
                                        class="heading-title-input bg-transparent border-b border-transparent hover:border-[#3A3A36] focus:border-[#C4B79C] px-1 py-0.5 font-serif font-semibold text-sm md:text-base text-[#DBCFB3] focus:text-white outline-none transition flex-1 min-w-[120px]"
                                        title="Click to edit heading"
                                      />
                                      ${
                                        block.verses
                                          ? `<span class="text-xs font-mono text-[#8C8A84] shrink-0 font-normal">(${block.verses})</span>`
                                          : ""
                                      }
                                    </div>

                                    <!-- Right: Clean Delete Action -->
                                    <div class="flex items-center gap-1 shrink-0">
                                      <button
                                        type="button"
                                        data-delete-heading="${idx}"
                                        class="delete-heading-btn p-1 text-[#6D6B66] hover:text-[#E57373] transition flex items-center justify-center cursor-pointer opacity-50 hover:opacity-100"
                                        title="Delete heading"
                                      >
                                        <span class="text-sm">🗑</span>
                                      </button>
                                    </div>
                                  </div>

                                  <!-- FLAT BULLETED LIST EDITOR CANVAS -->
                                  <div
                                    data-section-body="${idx}"
                                    class="esv-rich-heading-body ${isCol ? "hidden" : ""}"
                                  >
                                    <div
                                      contenteditable="true"
                                      spellcheck="false"
                                      data-section-editor="${idx}"
                                      placeholder="Outline key points under '${
                                        block.heading || "this section"
                                      }'..."
                                      class="section-bullet-canvas p-3.5 text-[#EAE8E2] font-sans text-sm md:text-base leading-[1.8] outline-none min-h-[60px] focus:bg-[#1C1C1A] transition"
                                    >
                                      <ul style="list-style-type: disc; margin-left: 1.25rem;">
                                        ${pts
                                          .map(
                                            (p) =>
                                              `<li>${
                                                (p || "")
                                                  .replace(/^•\s*/, "")
                                                  .replace(/</g, "&lt;")
                                                  .replace(/>/g, "&gt;") || "<br>"
                                              }</li>`
                                          )
                                          .join("")}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              `;
                            })
                            .join("")
                    }

                    ${
                      blocks.length > 0
                        ? `
                          <div class="pt-2">
                            <button
                              type="button"
                              id="bottom-add-heading-btn"
                              class="w-full py-2 px-3 border border-[#2B2B28] hover:border-[#C4B79C] bg-[#181816] hover:bg-[#20201D] text-[#8C8A84] hover:text-[#DBCFB3] rounded transition text-xs font-mono flex items-center justify-center gap-1.5 cursor-pointer"
                              title="Add section heading"
                            >
                              <span>+</span>
                              <span>Add Heading</span>
                            </button>
                          </div>
                        `
                        : ""
                    }
                  </div>
                </div>

        <!-- RESIZABLE SPLIT DIVIDER -->
        <div
          id="chapter-split-divider"
          class="w-2 bg-[#1C1C1A] hover:bg-[#C4B79C] active:bg-[#DBCFB3] border-l border-r border-[#262624] cursor-col-resize shrink-0 transition-colors relative z-20 flex items-center justify-center select-none group"
          title="Drag to resize panels (Double-click to reset 50/50)"
        >
          <div class="w-0.5 h-7 bg-[#484844] group-hover:bg-[#141413] group-active:bg-[#141413] rounded-full transition-colors pointer-events-none"></div>
        </div>

        <!-- COLUMN 2 / PANEL B: BIBLE SCRIPTURE READER -->
        <div
          id="chapter-scripture-panel"
          class="flex-1 h-full overflow-y-auto p-8 bg-[#151513] flex flex-col min-w-[260px]"
        >
          <!-- Quiet Bible Reader Header -->
          <div class="flex items-center justify-between border-b border-[#242422] pb-2 shrink-0">
            <span class="text-xs font-mono uppercase tracking-wider text-[#A19E97]">
              ESV Scripture • ${selectedBook.name} ${chapterNum}
            </span>
          </div>

          <!-- Scripture Reader Display -->
          <div class="flex-1 pt-4">
            ${
              isLoadingESV
                ? `
                    <div class="flex flex-col items-center justify-center py-20 text-xs text-[#8C8A84] space-y-2">
                      <div>Fetching ${selectedBook.name} ${chapterNum} from official ESV API...</div>
                    </div>
                  `
                : esvErrorMessage
                ? `
                    <div class="text-xs text-[#E57373] py-4">
                      ${esvErrorMessage}
                    </div>
                  `
                : chData.chapterScripture && chData.chapterScripture.trim()
                ? `
                    <div
                      id="scripture-reader-display"
                      class="font-reader text-[15.5px] leading-[1.85] text-[#ECE9E0] space-y-3.5"
                    >${formatESVTextToHTML(chData.chapterScripture)}</div>
                  `
                : `
                    <div class="text-xs text-[#8C8A84] py-8">
                      Loading scripture...
                    </div>
                  `
            }
          </div>
        </div>
      </div>
    </div>
  `;
}
