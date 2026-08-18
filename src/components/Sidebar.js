import { BIBLE_BOOKS } from "../../data/bible_catalog.js";

export function renderSidebar({
  selectedBookId,
  filterTestament,
  searchQuery,
  data,
  isCollapsed = false
}) {
  if (isCollapsed) {
    return `
      <aside class="w-12 bg-[#121211] border-r border-[#262623] h-screen flex flex-col items-center py-3 select-none">
        <button
          id="toggle-sidebar-btn"
          class="p-2 rounded text-[#9A9891] hover:text-[#EAE8E2] transition"
          title="Show Book List (⌘\)"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      </aside>
    `;
  }

  // Calculate overall completed chapters
  let outlinedChapters = 0;
  for (const chKey in data.chapters) {
    const ch = data.chapters[chKey];
    if (
      ch &&
      (Array.isArray(ch.headingBlocks) &&
        ch.headingBlocks.some((b) => b.notes && b.notes.trim().length > 0))
    ) {
      outlinedChapters++;
    }
  }

  const filteredBooks = BIBLE_BOOKS.filter((book) => {
    if (filterTestament !== "ALL" && book.testament !== filterTestament) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return book.name.toLowerCase().includes(q) || book.keyTheme.toLowerCase().includes(q);
    }
    return true;
  });

  return `
    <aside class="w-64 bg-[#141413] border-r border-[#242422] flex flex-col h-screen select-none shrink-0 text-[#EAE8E2]">
      <!-- Minimal Brand Header -->
      <div class="px-4 py-3 border-b border-[#242422] flex items-center justify-between">
        <div>
          <h1 class="font-serif font-semibold text-sm tracking-tight text-[#EAE8E2]">
            Bible Outline Studio
          </h1>
          <p class="text-[11px] text-[#8C8A84]">
            ${outlinedChapters} / 1,189 ch outlined
          </p>
        </div>
        <button
          id="toggle-sidebar-btn"
          class="p-1 rounded text-[#8C8A84] hover:text-[#EAE8E2] transition"
          title="Hide Sidebar"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <!-- Minimal Search & OT/NT Filter -->
      <div class="p-3 border-b border-[#242422] space-y-2">
        <input
          id="sidebar-search-input"
          type="text"
          placeholder="Search books..."
          value="${searchQuery.replace(/"/g, '&quot;')}"
          class="w-full bg-[#1C1C1A] border border-[#2B2B28] rounded-md px-3 py-1 text-xs text-[#EAE8E2] placeholder:text-[#6D6B66] focus:outline-none focus:border-[#C4B79C]"
        />

        <div class="grid grid-cols-3 gap-0.5 bg-[#121211] p-0.5 rounded-md border border-[#242422] text-[11px]">
          <button
            data-testament="ALL"
            class="filter-testament-btn py-0.5 rounded transition ${
              filterTestament === "ALL"
                ? "bg-[#262623] text-[#EAE8E2] font-medium"
                : "text-[#8C8A84] hover:text-[#EAE8E2]"
            }"
          >
            All (66)
          </button>
          <button
            data-testament="OT"
            class="filter-testament-btn py-0.5 rounded transition ${
              filterTestament === "OT"
                ? "bg-[#262623] text-[#EAE8E2] font-medium"
                : "text-[#8C8A84] hover:text-[#EAE8E2]"
            }"
          >
            OT (39)
          </button>
          <button
            data-testament="NT"
            class="filter-testament-btn py-0.5 rounded transition ${
              filterTestament === "NT"
                ? "bg-[#262623] text-[#EAE8E2] font-medium"
                : "text-[#8C8A84] hover:text-[#EAE8E2]"
            }"
          >
            NT (27)
          </button>
        </div>
      </div>

      <!-- Quiet Book List -->
      <div class="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
        ${filteredBooks
          .map((book) => {
            let chCount = 0;
            for (let c = 1; c <= book.chapterCount; c++) {
              const ch = data.chapters[`${book.id}-${c}`];
              if (
                ch &&
                Array.isArray(ch.headingBlocks) &&
                ch.headingBlocks.some((b) => b.notes && b.notes.trim().length > 0)
              ) {
                chCount++;
              }
            }
            const isSelected = book.id === selectedBookId;

            return `
              <button
                data-book-id="${book.id}"
                class="book-nav-card w-full text-left px-3 py-1.5 rounded-md transition flex items-center justify-between text-xs ${
                  isSelected
                    ? "bg-[#2A2A27] text-[#EAE8E2] font-medium shadow-2xs"
                    : "text-[#A19E97] hover:bg-[#1E1E1C] hover:text-[#EAE8E2]"
                }"
              >
                <span class="font-serif ${isSelected ? "text-[#DBCFB3]" : ""}">${book.name}</span>
                <span class="text-[11px] font-mono ${
                  chCount > 0 ? "text-[#C4B79C]" : "text-[#5B5953]"
                }">
                  ${chCount > 0 ? `${chCount}/` : ""}${book.chapterCount}
                </span>
              </button>
            `;
          })
          .join("")}
      </div>
    </aside>
  `;
}
