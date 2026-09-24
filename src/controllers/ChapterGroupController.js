import {
  upsertChapterGroup,
  deleteChapterGroup,
  validateChapterGroupRange,
  getChapterGroups
} from "../storage.js";

/**
 * ChapterGroupController
 * Encapsulates creating, editing, deleting and collapsing chapter groups
 * within the Book Rollup view. Groups are presentation-only: removing a group
 * never mutates the underlying chapter outlines.
 */
export function attachChapterGroupListeners(app) {
  if (app.activeView !== "book-rollup") return;

  const bookId = app.selectedBookId;

  const closeModal = () => {
    app.chapterGroupModal = null;
    app.render();
  };

  // 1. Open the modal for a brand new group
  document.querySelectorAll("#open-chapter-group-modal-btn, .open-chapter-group-modal-btn").forEach((openBtn) => {
    openBtn.addEventListener("click", () => {
      // Default the range to the first chapter not already covered by a group
      const groups = getChapterGroups(app.data, bookId);
      let firstFree = 1;
      for (const g of groups) {
        if (firstFree >= g.startChapter && firstFree <= g.endChapter) {
          firstFree = g.endChapter + 1;
        }
      }
      const maxCh = app.getSelectedBook().chapterCount;
      if (firstFree > maxCh) firstFree = maxCh;

      app.chapterGroupModal = {
        editingGroupId: null,
        title: "",
        startChapter: firstFree,
        endChapter: firstFree,
        errorMessage: ""
      };
      app.render();
    });
  });

  // 2. Close / cancel
  const closeBtn = document.getElementById("close-chapter-group-modal-btn");
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  const cancelBtn = document.getElementById("cancel-chapter-group-btn");
  if (cancelBtn) cancelBtn.addEventListener("click", closeModal);

  const overlay = document.getElementById("chapter-group-modal");
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target.id === "chapter-group-modal") closeModal();
    });
  }

  // 3. Save (create or update)
  const saveBtn = document.getElementById("save-chapter-group-btn");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      const titleInput = document.getElementById("chapter-group-title-input");
      const startSelect = document.getElementById("chapter-group-start-select");
      const endSelect = document.getElementById("chapter-group-end-select");
      if (!titleInput || !startSelect || !endSelect) return;

      const editingGroupId = saveBtn.getAttribute("data-editing-group-id") || null;
      const title = titleInput.value.trim();
      const startChapter = parseInt(startSelect.value, 10);
      const endChapter = parseInt(endSelect.value, 10);

      // Preserve what the user typed so a failed submit does not clear the form
      const retainState = {
        editingGroupId,
        title: titleInput.value,
        startChapter,
        endChapter
      };

      if (!title) {
        app.chapterGroupModal = { ...retainState, errorMessage: "Please enter a group title." };
        app.render();
        return;
      }

      const check = validateChapterGroupRange(app.data, bookId, startChapter, endChapter, editingGroupId);
      if (!check.valid) {
        app.chapterGroupModal = { ...retainState, errorMessage: check.reason };
        app.render();
        return;
      }

      upsertChapterGroup(app.data, bookId, {
        id: editingGroupId,
        title,
        startChapter,
        endChapter
      });

      app.chapterGroupModal = null;
      app.notifyDataChanged(bookId);
      app.render();
    });
  }

  // Submitting with Enter from the title field
  const titleInput = document.getElementById("chapter-group-title-input");
  if (titleInput) {
    titleInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const btn = document.getElementById("save-chapter-group-btn");
        if (btn) btn.click();
      }
    });
  }

  // 4. Edit an existing group (prefills the modal)
  document.querySelectorAll(".edit-chapter-group-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const groupId = btn.getAttribute("data-edit-chapter-group");
      const group = getChapterGroups(app.data, bookId).find((g) => g.id === groupId);
      if (!group) return;

      app.chapterGroupModal = {
        editingGroupId: group.id,
        title: group.title,
        startChapter: group.startChapter,
        endChapter: group.endChapter,
        errorMessage: ""
      };
      app.render();
    });
  });

  // 5. Delete a group (grouping only — chapter content is preserved)
  document.querySelectorAll(".delete-chapter-group-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const groupId = btn.getAttribute("data-delete-chapter-group");
      if (!groupId) return;

      if (deleteChapterGroup(app.data, bookId, groupId)) {
        if (app.collapsedChapterGroups instanceof Set) {
          app.collapsedChapterGroups.delete(`${bookId}:${groupId}`);
        }
        app.notifyDataChanged(bookId);
        app.render();
      }
    });
  });

  // 6. Collapse / expand (transient, never persisted)
  document.querySelectorAll(".toggle-chapter-group-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const groupId = btn.getAttribute("data-toggle-chapter-group");
      if (!groupId) return;

      if (!(app.collapsedChapterGroups instanceof Set)) {
        app.collapsedChapterGroups = new Set();
      }
      const key = `${bookId}:${groupId}`;
      if (app.collapsedChapterGroups.has(key)) {
        app.collapsedChapterGroups.delete(key);
      } else {
        app.collapsedChapterGroups.add(key);
      }
      app.render();
    });
  });
}
