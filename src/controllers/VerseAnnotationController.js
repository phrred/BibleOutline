import {
  toggleVerseHighlights,
  setVerseHighlighted,
  getChapterVerseNotes,
  findVerseNoteForRange,
  upsertVerseNote,
  deleteVerseNote,
  saveOutlineStorage
} from "../storage.js";

/**
 * VerseAnnotationController
 * Handles interactive ESV verse selection (click & shift-click), Warm Gold highlighting,
 * single-verse & range study notes, inline note toggling, and the Highlights & Notes hub.
 */
export function positionVerseFloatingPill() {
  const panel = document.getElementById("chapter-scripture-panel");
  const pill = document.getElementById("verse-floating-pill");
  if (!panel || !pill) return;

  const anchorVerse = pill.getAttribute("data-anchor-verse");
  const verseEl = anchorVerse ? document.getElementById(`esv-verse-${anchorVerse}`) : null;
  if (!verseEl) return;

  const panelRect = panel.getBoundingClientRect();
  const verseRect = verseEl.getBoundingClientRect();
  const pillWidth = pill.offsetWidth || 240;
  const pillHeight = pill.offsetHeight || 40;

  // Compute coordinates inside the scrollable #chapter-scripture-panel container
  const relTop = verseRect.top - panelRect.top + panel.scrollTop;
  const relBottom = verseRect.bottom - panelRect.top + panel.scrollTop;
  const relLeft = verseRect.left - panelRect.left + panel.scrollLeft;

  // Prefer placing above the verse unless there isn't enough room above the current scroll top
  let top = relTop - pillHeight - 8;
  if (top < panel.scrollTop + 8) {
    top = relBottom + 8;
  }

  const maxLeft = Math.max(16, panel.clientWidth - pillWidth - 16);
  const left = Math.min(Math.max(16, relLeft), maxLeft);

  pill.style.top = `${Math.max(8, Math.round(top))}px`;
  pill.style.left = `${Math.round(left)}px`;
}

function buildContiguousRange(a, b) {
  const start = Math.min(a, b);
  const end = Math.max(a, b);
  const verses = [];
  for (let v = start; v <= end; v++) verses.push(v);
  return { startVerse: start, endVerse: end, verses };
}

export function attachVerseAnnotationListeners(app) {
  // 1. SIDE-BY-SIDE OUTLINER: ESV SCRIPTURE PANEL INTERACTIONS
  if (app.activeView === "chapter-outliner") {
    const chKey = `${app.selectedBookId}-${app.selectedChapterNum}`;
    const scripturePanel = document.getElementById("chapter-scripture-panel");
    const readerDisplay = document.getElementById("scripture-reader-display");

    // Position floating pill immediately if visible
    positionVerseFloatingPill();

    // Auto-focus textarea when opening Note mode
    const noteTextarea = document.getElementById("verse-note-textarea");
    if (noteTextarea && app._shouldFocusVerseNoteTextarea) {
      app._shouldFocusVerseNoteTextarea = false;
      requestAnimationFrame(() => {
        const ta = document.getElementById("verse-note-textarea");
        if (ta) {
          ta.focus();
          ta.setSelectionRange(ta.value.length, ta.value.length);
        }
      });
    }

    // Inline notes header toggle
    const toggleInlineBtn = document.getElementById("toggle-inline-verse-notes-btn");
    if (toggleInlineBtn) {
      toggleInlineBtn.addEventListener("click", () => {
        app.showInlineVerseNotes = !app.showInlineVerseNotes;
        try {
          localStorage.setItem("bibleOutline_showInlineVerseNotes", app.showInlineVerseNotes ? "1" : "0");
        } catch (_) {}
        app.render();
      });
    }

    // Clicking on a saved 📝 badge or inline note card opens that note directly
    const openExistingNote = (noteId) => {
      const notes = getChapterVerseNotes(app.data, chKey);
      const target = notes.find((n) => n.id === noteId);
      if (!target) return;
      app.saveActiveChapterEditorBeforeSwitch();
      const range = buildContiguousRange(target.startVerse, target.endVerse);
      app.verseSelectionState = {
        chKey,
        anchorVerse: target.startVerse,
        startVerse: range.startVerse,
        endVerse: range.endVerse,
        verses: range.verses,
        mode: "note",
        editingNoteId: target.id,
        draftText: target.text
      };
      app._shouldFocusVerseNoteTextarea = true;
      app.render();
    };

    if (readerDisplay) {
      // Prevent Shift+mousedown on a verse from creating a native browser selection across intermediate section headers
      readerDisplay.addEventListener("mousedown", (e) => {
        if (
          e.shiftKey &&
          app.verseSelectionState &&
          app.verseSelectionState.chKey === chKey &&
          app.verseSelectionState.anchorVerse &&
          e.target.closest(".esv-verse-segment[data-verse]")
        ) {
          e.preventDefault();
        }
      });

      readerDisplay.addEventListener("click", (e) => {
        const badgeBtn = e.target.closest("[data-verse-note-badge]");
        if (badgeBtn) {
          e.preventDefault();
          e.stopPropagation();
          openExistingNote(badgeBtn.getAttribute("data-verse-note-badge"));
          return;
        }

        const inlineCard = e.target.closest("[data-inline-verse-note]");
        if (inlineCard) {
          e.preventDefault();
          e.stopPropagation();
          openExistingNote(inlineCard.getAttribute("data-inline-verse-note"));
          return;
        }

        const verseSpan = e.target.closest(".esv-verse-segment[data-verse]");
        if (!verseSpan) return;

        const prev = app.verseSelectionState && app.verseSelectionState.chKey === chKey ? app.verseSelectionState : null;
        const domSelection = window.getSelection ? window.getSelection() : null;

        // Shift-click extends a contiguous range from anchorVerse without selecting headers
        if (e.shiftKey && prev && prev.anchorVerse) {
          e.stopPropagation();
          const clickedVerse = parseInt(verseSpan.getAttribute("data-verse"), 10);
          if (isNaN(clickedVerse) || clickedVerse < 1) return;
          if (domSelection && domSelection.removeAllRanges) {
            domSelection.removeAllRanges();
          }
          app.saveActiveChapterEditorBeforeSwitch();
          const range = buildContiguousRange(prev.anchorVerse, clickedVerse);
          app.verseSelectionState = {
            chKey,
            anchorVerse: prev.anchorVerse,
            startVerse: range.startVerse,
            endVerse: range.endVerse,
            verses: range.verses,
            mode: "pill",
            editingNoteId: null
          };
          app.render();
          return;
        }

        // Ignore only if the user actively drag-selected text inside the Scripture reader itself
        if (
          domSelection &&
          !domSelection.isCollapsed &&
          domSelection.anchorNode &&
          readerDisplay.contains(domSelection.anchorNode) &&
          domSelection.toString().trim().length > 0
        ) {
          return;
        }

        e.stopPropagation();
        const clickedVerse = parseInt(verseSpan.getAttribute("data-verse"), 10);
        if (isNaN(clickedVerse) || clickedVerse < 1) return;

        app.saveActiveChapterEditorBeforeSwitch();

        // Clicking the exact same single selected verse while in pill mode dismisses it
        if (
          prev &&
          prev.mode === "pill" &&
          prev.verses.length === 1 &&
          prev.verses[0] === clickedVerse
        ) {
          app.verseSelectionState = null;
          app.render();
          return;
        }

        app.verseSelectionState = {
          chKey,
          anchorVerse: clickedVerse,
          startVerse: clickedVerse,
          endVerse: clickedVerse,
          verses: [clickedVerse],
          mode: "pill",
          editingNoteId: null
        };
        app.render();
      });
    }

    // Dismiss pill when clicking empty background in scripture panel
    if (scripturePanel) {
      scripturePanel.addEventListener("click", (e) => {
        if (!app.verseSelectionState) return;
        if (
          e.target.closest("#verse-floating-pill") ||
          e.target.closest(".esv-verse-segment") ||
          e.target.closest("[data-verse-note-badge]") ||
          e.target.closest("[data-inline-verse-note]") ||
          e.target.closest("#toggle-inline-verse-notes-btn")
        ) {
          return;
        }
        app.verseSelectionState = null;
        app.render();
      });
    }

    // Floating Pill Buttons
    const pillHighlightBtn = document.getElementById("verse-pill-highlight-btn");
    if (pillHighlightBtn) {
      pillHighlightBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const sel = app.verseSelectionState;
        if (!sel || sel.chKey !== chKey) return;
        app.saveActiveChapterEditorBeforeSwitch();
        toggleVerseHighlights(app.data, chKey, sel.verses);
        saveOutlineStorage(app.data);
        app.notifyDataChanged(app.selectedBookId);
        app.render();
      });
    }

    const pillNoteBtn = document.getElementById("verse-pill-note-btn");
    if (pillNoteBtn) {
      pillNoteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const sel = app.verseSelectionState;
        if (!sel || sel.chKey !== chKey) return;
        app.saveActiveChapterEditorBeforeSwitch();
        const existing = findVerseNoteForRange(app.data, chKey, sel.startVerse, sel.endVerse);
        app.verseSelectionState = {
          ...sel,
          mode: "note",
          editingNoteId: existing ? existing.id : null,
          draftText: existing ? existing.text : ""
        };
        app._shouldFocusVerseNoteTextarea = true;
        app.render();
      });
    }

    const pillCloseBtn = document.getElementById("verse-pill-close-btn");
    if (pillCloseBtn) {
      pillCloseBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        app.verseSelectionState = null;
        app.render();
      });
    }

    // Note Popover Controls
    if (noteTextarea) {
      noteTextarea.addEventListener("input", (e) => {
        if (app.verseSelectionState) {
          app.verseSelectionState.draftText = e.target.value;
        }
      });
      noteTextarea.addEventListener("keydown", (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
          e.preventDefault();
          const saveBtn = document.getElementById("verse-note-save-btn");
          if (saveBtn) saveBtn.click();
        } else if (e.key === "Escape") {
          e.preventDefault();
          app.verseSelectionState = null;
          app.render();
        }
      });
    }

    const saveNoteBtn = document.getElementById("verse-note-save-btn");
    if (saveNoteBtn) {
      saveNoteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const sel = app.verseSelectionState;
        if (!sel || sel.chKey !== chKey) return;
        const textVal = document.getElementById("verse-note-textarea")?.value ?? sel.draftText ?? "";
        app.saveActiveChapterEditorBeforeSwitch();
        upsertVerseNote(app.data, chKey, {
          id: sel.editingNoteId || null,
          startVerse: sel.startVerse,
          endVerse: sel.endVerse,
          text: textVal
        });
        saveOutlineStorage(app.data);
        app.notifyDataChanged(app.selectedBookId);
        app.verseSelectionState = null;
        app.render();
      });
    }

    const cancelNoteBtn = document.getElementById("verse-note-cancel-btn");
    if (cancelNoteBtn) {
      cancelNoteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        app.verseSelectionState = null;
        app.render();
      });
    }

    const deleteNoteBtn = document.getElementById("verse-note-delete-btn");
    if (deleteNoteBtn) {
      deleteNoteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const noteId = deleteNoteBtn.getAttribute("data-delete-note-id");
        if (!noteId) return;
        app.saveActiveChapterEditorBeforeSwitch();
        deleteVerseNote(app.data, chKey, noteId);
        saveOutlineStorage(app.data);
        app.notifyDataChanged(app.selectedBookId);
        app.verseSelectionState = null;
        app.render();
      });
    }
  }

  // 2. HIGHLIGHTS & NOTES HUB VIEW INTERACTIONS
  if (app.activeView === "highlights-notes") {
    const searchInput = document.getElementById("annotations-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        app.annotationsSearchQuery = e.target.value;
        app.render();
        const reInput = document.getElementById("annotations-search-input");
        if (reInput) {
          reInput.focus();
          reInput.setSelectionRange(reInput.value.length, reInput.value.length);
        }
      });
    }

    const clearSearchBtn = document.getElementById("clear-annotations-search-btn");
    if (clearSearchBtn) {
      clearSearchBtn.addEventListener("click", () => {
        app.annotationsSearchQuery = "";
        app.render();
      });
    }

    document.querySelectorAll(".ann-filter-type-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        app.annotationsFilterType = btn.getAttribute("data-ann-filter-type") || "ALL";
        app.render();
      });
    });

    document.querySelectorAll(".ann-filter-testament-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        app.annotationsFilterTestament = btn.getAttribute("data-ann-filter-testament") || "ALL";
        app.annotationsFilterBookId = "ALL";
        app.render();
      });
    });

    const bookSelect = document.getElementById("ann-filter-book-select");
    if (bookSelect) {
      bookSelect.addEventListener("change", (e) => {
        app.annotationsFilterBookId = e.target.value || "ALL";
        app.render();
      });
    }

    // Jump directly to Book + Chapter + Verse
    document.querySelectorAll(".ann-jump-verse-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const bId = btn.getAttribute("data-jump-book");
        const ch = parseInt(btn.getAttribute("data-jump-chapter"), 10);
        const verse = parseInt(btn.getAttribute("data-jump-verse"), 10);
        if (!bId || isNaN(ch)) return;
        app.pendingScrollToVerse = { bookId: bId, chapterNum: ch, verseNum: verse || 1 };
        app.verseSelectionState = null;
        app.navigateTo({
          activeView: "chapter-outliner",
          bookId: bId,
          chapterNum: ch,
          forceLoadESV: !app.data?.chapters?.[`${bId}-${ch}`]?.chapterScripture
        });
      });
    });

    // Inline Edit Note inside Highlights & Notes Hub
    document.querySelectorAll(".ann-hub-edit-note-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const chKey = btn.getAttribute("data-hub-edit-ch");
        const noteId = btn.getAttribute("data-hub-edit-note-id") || null;
        const startVerse = parseInt(btn.getAttribute("data-hub-edit-start"), 10);
        const endVerse = parseInt(btn.getAttribute("data-hub-edit-end"), 10);
        const reference = btn.getAttribute("data-hub-edit-ref") || "";
        const existing = noteId
          ? getChapterVerseNotes(app.data, chKey).find((n) => n.id === noteId)
          : findVerseNoteForRange(app.data, chKey, startVerse, endVerse);

        app.editingHubNote = {
          chKey,
          noteId: existing ? existing.id : null,
          startVerse,
          endVerse,
          reference,
          draftText: existing ? existing.text : ""
        };
        app.render();
        requestAnimationFrame(() => {
          const ta = document.getElementById("hub-edit-note-textarea");
          if (ta) {
            ta.focus();
            ta.setSelectionRange(ta.value.length, ta.value.length);
          }
        });
      });
    });

    const hubTextarea = document.getElementById("hub-edit-note-textarea");
    if (hubTextarea) {
      hubTextarea.addEventListener("input", (e) => {
        if (app.editingHubNote) app.editingHubNote.draftText = e.target.value;
      });
      hubTextarea.addEventListener("keydown", (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
          e.preventDefault();
          document.getElementById("hub-save-note-btn")?.click();
        } else if (e.key === "Escape") {
          e.preventDefault();
          app.editingHubNote = null;
          app.render();
        }
      });
    }

    const hubCancelBtn = document.getElementById("hub-cancel-note-btn");
    if (hubCancelBtn) {
      hubCancelBtn.addEventListener("click", () => {
        app.editingHubNote = null;
        app.render();
      });
    }

    const hubSaveBtn = document.getElementById("hub-save-note-btn");
    if (hubSaveBtn) {
      hubSaveBtn.addEventListener("click", () => {
        const ed = app.editingHubNote;
        if (!ed) return;
        const textVal = document.getElementById("hub-edit-note-textarea")?.value ?? ed.draftText ?? "";
        upsertVerseNote(app.data, ed.chKey, {
          id: ed.noteId,
          startVerse: ed.startVerse,
          endVerse: ed.endVerse,
          text: textVal
        });
        saveOutlineStorage(app.data);
        const bookId = ed.chKey.split("-")[0];
        app.notifyDataChanged(bookId);
        app.editingHubNote = null;
        app.render();
      });
    }

    // Unhighlight from Hub
    document.querySelectorAll(".ann-hub-unhighlight-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const chKey = btn.getAttribute("data-hub-unhighlight-ch");
        const s = parseInt(btn.getAttribute("data-hub-unhighlight-start"), 10);
        const e = parseInt(btn.getAttribute("data-hub-unhighlight-end"), 10);
        if (!chKey || isNaN(s)) return;
        const range = buildContiguousRange(s, isNaN(e) ? s : e);
        setVerseHighlighted(app.data, chKey, range.verses, false);
        saveOutlineStorage(app.data);
        app.notifyDataChanged(chKey.split("-")[0]);
        app.render();
      });
    });

    // Delete Note from Hub
    document.querySelectorAll(".ann-hub-delete-note-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const chKey = btn.getAttribute("data-hub-delete-note-ch");
        const noteId = btn.getAttribute("data-hub-delete-note-id");
        if (!chKey || !noteId) return;
        deleteVerseNote(app.data, chKey, noteId);
        saveOutlineStorage(app.data);
        app.notifyDataChanged(chKey.split("-")[0]);
        app.render();
      });
    });
  }
}
