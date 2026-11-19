import { BIBLE_BOOKS } from "../../data/bible_catalog.js";
import { countAllAnnotations, getAllAnnotationsAcrossBible } from "../storage.js";

function escapeHTML(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDateShort(ts) {
  if (!ts) return "";
  try {
    return new Date(ts).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  } catch (_) {
    return "";
  }
}

export function renderHighlightsNotesView({
  data,
  filterType = "ALL", // "ALL" | "HIGHLIGHTS" | "NOTES"
  filterTestament = "ALL", // "ALL" | "OT" | "NT"
  filterBookId = "ALL",
  searchQuery = "",
  editingHubNote = null // { chKey, noteId, startVerse, endVerse, reference, draftText }
}) {
  const counts = countAllAnnotations(data);
  const items = getAllAnnotationsAcrossBible(data, {
    filterType,
    testament: filterTestament,
    bookId: filterBookId,
    searchQuery
  });

  // Compute which books currently have annotations so the dropdown stays helpful
  const allRawItems = getAllAnnotationsAcrossBible(data, {});
  const bookCounts = new Map();
  allRawItems.forEach((it) => {
    bookCounts.set(it.bookId, (bookCounts.get(it.bookId) || 0) + 1);
  });
  const booksWithAnnotations = BIBLE_BOOKS.filter(
    (b) => bookCounts.has(b.id) && (filterTestament === "ALL" || b.testament === filterTestament)
  );

  return `
    <div id="highlights-notes-scroll-container" class="h-full w-full overflow-y-auto bg-[#161614] text-[#EAE8E2] p-4 md:p-8 select-none">
      <div class="max-w-4xl mx-auto space-y-6">

        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#2A2A27] pb-5">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-[#C4B79C]/15 text-[#C4B79C] border border-[#C4B79C]/30">
                Scripture Study Index
              </span>
              <span class="text-xs text-[#8C8A84]">•</span>
              <span class="text-xs text-[#8C8A84] font-mono">
                ${counts.highlightCount} Highlighted Verse${counts.highlightCount === 1 ? "" : "s"} • ${counts.noteCount} Note${counts.noteCount === 1 ? "" : "s"}
              </span>
            </div>
            <h1 class="font-serif text-2xl md:text-3xl font-bold text-[#EAE8E2] mt-1">
              Highlights &amp; Verse Notes
            </h1>
            <p class="text-xs text-[#A19E97] mt-0.5">
              Search and browse all your highlighted ESV verses and verse notes across all 66 books, or jump directly back into context.
            </p>
          </div>
        </div>

        <!-- Filter & Search Bar -->
        <div class="bg-[#1C1C1A] border border-[#2B2B28] rounded-xl p-4 space-y-3">
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <!-- Search Input -->
            <div class="relative flex-1">
              <input
                id="annotations-search-input"
                type="text"
                placeholder="Search references, ESV verse text, or your notes..."
                value="${escapeHTML(searchQuery)}"
                class="w-full px-3 py-2 text-xs bg-[#141413] border border-[#2B2B28] rounded-lg text-[#EAE8E2] placeholder:text-[#6D6B66] focus:outline-none focus:border-[#C4B79C] transition"
              />
              ${
                searchQuery
                  ? `<button type="button" id="clear-annotations-search-btn" class="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#8C8A84] hover:text-[#EAE8E2] cursor-pointer">✕</button>`
                  : ""
              }
            </div>

            <!-- Type Filter Pills -->
            <div class="flex items-center gap-1 bg-[#141413] p-1 rounded-lg border border-[#2B2B28] text-xs shrink-0">
              ${[
                { id: "ALL", label: "All" },
                { id: "HIGHLIGHTS", label: "✨ Highlights" },
                { id: "NOTES", label: "📝 Notes" }
              ]
                .map(
                  (f) => `
                    <button
                      type="button"
                      data-ann-filter-type="${f.id}"
                      class="ann-filter-type-btn px-2.5 py-1 rounded transition cursor-pointer ${
                        filterType === f.id
                          ? "bg-[#2E2E2A] text-[#EAE8E2] font-semibold shadow-2xs"
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

          <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#262624]">
            <!-- Testament Filter -->
            <div class="flex items-center gap-1 bg-[#141413] p-1 rounded-lg border border-[#2B2B28] text-xs">
              ${[
                { id: "ALL", label: "Whole Bible" },
                { id: "OT", label: "Old Testament" },
                { id: "NT", label: "New Testament" }
              ]
                .map(
                  (t) => `
                    <button
                      type="button"
                      data-ann-filter-testament="${t.id}"
                      class="ann-filter-testament-btn px-2.5 py-1 rounded transition cursor-pointer ${
                        filterTestament === t.id
                          ? "bg-[#2E2E2A] text-[#EAE8E2] font-semibold"
                          : "text-[#8C8A84] hover:text-[#EAE8E2]"
                      }"
                    >
                      ${t.label}
                    </button>
                  `
                )
                .join("")}
            </div>

            <!-- Book Dropdown -->
            <div class="flex items-center gap-2 text-xs">
              <label for="ann-filter-book-select" class="text-[11px] font-mono uppercase text-[#8C8A84]">Book:</label>
              <select
                id="ann-filter-book-select"
                class="px-2.5 py-1.5 rounded-lg bg-[#141413] border border-[#2B2B28] text-xs text-[#EAE8E2] focus:outline-none focus:border-[#C4B79C] cursor-pointer"
              >
                <option value="ALL" ${filterBookId === "ALL" ? "selected" : ""}>All Books (${allRawItems.length})</option>
                ${booksWithAnnotations
                  .map(
                    (b) => `
                      <option value="${b.id}" ${filterBookId === b.id ? "selected" : ""}>
                        ${b.name} (${bookCounts.get(b.id)})
                      </option>
                    `
                  )
                  .join("")}
              </select>
            </div>
          </div>
        </div>

        <!-- Results List -->
        ${
          items.length === 0
            ? `
              <div class="bg-[#1C1C1A] border border-[#2B2B28] rounded-2xl p-10 text-center space-y-3">
                <div class="text-3xl">✨</div>
                <h3 class="font-serif text-lg font-bold text-[#EAE8E2]">
                  ${allRawItems.length === 0 ? "No Highlights or Verse Notes Yet" : "No Matching Annotations Found"}
                </h3>
                <p class="text-xs text-[#8C8A84] max-w-md mx-auto leading-relaxed">
                  ${
                    allRawItems.length === 0
                      ? "Open any chapter in the Side-by-Side Outliner and click a verse (or shift-click a range of verses) in the ESV Scripture reader to highlight it in warm gold or attach a study note."
                      : "Try clearing your search query or adjusting the filter controls above."
                  }
                </p>
                ${
                  allRawItems.length === 0
                    ? `
                      <button
                        type="button"
                        data-view="chapter-outliner"
                        class="studio-view-btn mt-1 px-4 py-2 rounded-lg bg-[#C4B79C] hover:bg-[#DBCFB3] text-[#141413] font-semibold text-xs transition inline-flex items-center gap-1.5 cursor-pointer shadow"
                      >
                        <span>Open ESV Scripture Reader →</span>
                      </button>
                    `
                    : ""
                }
              </div>
            `
            : `
              <div class="space-y-3">
                ${items
                  .map((item) => {
                    const isEditingThis =
                      editingHubNote &&
                      editingHubNote.chKey === item.chKey &&
                      ((item.noteId && editingHubNote.noteId === item.noteId) ||
                        (!item.noteId &&
                          editingHubNote.startVerse === item.startVerse &&
                          editingHubNote.endVerse === item.endVerse));

                    return `
                      <div class="bg-[#1C1C1A] border border-[#2B2B28] hover:border-[#3A3A36] rounded-xl p-4 md:p-5 space-y-3 transition shadow-xs">
                        <!-- Card Header -->
                        <div class="flex flex-wrap items-center justify-between gap-2">
                          <div class="flex items-center gap-2">
                            <button
                              type="button"
                              data-jump-book="${item.bookId}"
                              data-jump-chapter="${item.chapterNum}"
                              data-jump-verse="${item.startVerse}"
                              class="ann-jump-verse-btn font-serif font-bold text-base text-[#EAE8E2] hover:text-[#C4B79C] transition cursor-pointer flex items-center gap-1.5"
                              title="Jump to ${escapeHTML(item.reference)} in Side-by-Side Outliner"
                            >
                              <span>${escapeHTML(item.reference)}</span>
                            </button>
                            ${
                              item.isHighlighted
                                ? `<span class="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#C4B79C]/20 text-[#C4B79C] border border-[#C4B79C]/30">✦ Highlighted</span>`
                                : ""
                            }
                            ${
                              item.hasNote
                                ? `<span class="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#252522] text-[#DBCFB3] border border-[#33332E]">📝 Note</span>`
                                : ""
                            }
                          </div>

                          <div class="flex items-center gap-2 text-xs">
                            ${
                              item.updatedAt
                                ? `<span class="text-[10px] font-mono text-[#6D6B66] hidden sm:inline">${formatDateShort(item.updatedAt)}</span>`
                                : ""
                            }
                            <button
                              type="button"
                              data-hub-edit-ch="${item.chKey}"
                              data-hub-edit-note-id="${item.noteId || ""}"
                              data-hub-edit-start="${item.startVerse}"
                              data-hub-edit-end="${item.endVerse}"
                              data-hub-edit-ref="${escapeHTML(item.reference)}"
                              class="ann-hub-edit-note-btn px-2 py-1 rounded bg-[#242421] hover:bg-[#2E2E2A] text-[#DBCFB3] text-[11px] transition cursor-pointer"
                            >
                              ${item.hasNote ? "Edit Note" : "+ Add Note"}
                            </button>
                            ${
                              item.isHighlighted
                                ? `
                                  <button
                                    type="button"
                                    data-hub-unhighlight-ch="${item.chKey}"
                                    data-hub-unhighlight-start="${item.startVerse}"
                                    data-hub-unhighlight-end="${item.endVerse}"
                                    class="ann-hub-unhighlight-btn px-2 py-1 rounded bg-transparent hover:bg-[#2A2A27] text-[#8C8A84] hover:text-[#EAE8E2] text-[11px] transition cursor-pointer"
                                    title="Remove gold highlight"
                                  >
                                    Unhighlight
                                  </button>
                                `
                                : ""
                            }
                            ${
                              item.hasNote
                                ? `
                                  <button
                                    type="button"
                                    data-hub-delete-note-ch="${item.chKey}"
                                    data-hub-delete-note-id="${item.noteId}"
                                    class="ann-hub-delete-note-btn px-2 py-1 rounded bg-transparent hover:bg-rose-500/20 text-[#8C8A84] hover:text-rose-400 text-[11px] transition cursor-pointer"
                                    title="Delete verse note"
                                  >
                                    🗑
                                  </button>
                                `
                                : ""
                            }
                            <button
                              type="button"
                              data-jump-book="${item.bookId}"
                              data-jump-chapter="${item.chapterNum}"
                              data-jump-verse="${item.startVerse}"
                              class="ann-jump-verse-btn px-2.5 py-1 rounded bg-[#C4B79C] hover:bg-[#DBCFB3] text-[#141413] font-semibold text-[11px] transition cursor-pointer"
                            >
                              Open Verse →
                            </button>
                          </div>
                        </div>

                        <!-- ESV Verse Snippet (if cached) -->
                        ${
                          item.verseSnippet
                            ? `
                              <blockquote class="font-reader text-sm leading-relaxed text-[#ECE9E0] pl-3 border-l-2 border-[#C4B79C]/60 select-text">
                                <span class="${item.isHighlighted ? "esv-verse-highlighted" : ""}">${escapeHTML(item.verseSnippet)}</span>
                              </blockquote>
                            `
                            : ""
                        }

                        <!-- Note Display or Inline Editor -->
                        ${
                          isEditingThis
                            ? `
                              <div class="pt-1 space-y-2">
                                <textarea
                                  id="hub-edit-note-textarea"
                                  rows="3"
                                  placeholder="Write your note for ${escapeHTML(item.reference)}..."
                                  class="w-full bg-[#141413] border border-[#C4B79C] rounded-lg p-2.5 text-xs text-[#EAE8E2] leading-relaxed focus:outline-none font-sans select-text"
                                >${escapeHTML(editingHubNote.draftText)}</textarea>
                                <div class="flex items-center justify-end gap-2">
                                  <button
                                    type="button"
                                    id="hub-cancel-note-btn"
                                    class="px-3 py-1 rounded bg-[#242421] hover:bg-[#2E2E2A] text-[#A19E97] text-xs transition cursor-pointer"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="button"
                                    id="hub-save-note-btn"
                                    class="px-3 py-1 rounded bg-[#C4B79C] hover:bg-[#DBCFB3] text-[#141413] font-semibold text-xs transition cursor-pointer"
                                  >
                                    Save Note
                                  </button>
                                </div>
                              </div>
                            `
                            : item.hasNote
                            ? `
                              <div class="esv-inline-note-card rounded-lg px-3.5 py-2.5 text-xs space-y-0.5 select-text">
                                <div class="font-mono text-[10px] uppercase tracking-wider text-[#C4B79C] font-semibold">
                                  📝 Study Note • ${escapeHTML(item.verseLabel)}
                                </div>
                                <p class="text-[#EAE8E2] leading-relaxed whitespace-pre-wrap">${escapeHTML(item.noteText)}</p>
                              </div>
                            `
                            : ""
                        }
                      </div>
                    `;
                  })
                  .join("")}
              </div>
            `
        }
      </div>
    </div>
  `;
}
