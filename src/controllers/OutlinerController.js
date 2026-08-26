import { saveOutlineStorage } from "../storage.js";

/**
 * OutlinerController
 * Encapsulates all chapter outline editing, heading mutations,
 * rich text toolbar interactions, and resizable split pane tracking.
 */
export function attachOutlinerListeners(app) {
  if (app.activeView !== "chapter-outliner") return;

  const chKey = `${app.selectedBookId}-${app.selectedChapterNum}`;
  const richEditor = document.getElementById("chapter-rich-outline-editor");

  // 1. Real-time scroll position tracking
  const scripturePanel = document.getElementById("chapter-scripture-panel");
  if (scripturePanel) {
    scripturePanel.addEventListener(
      "scroll",
      () => {
        app.scriptureScrollPositions[chKey] = scripturePanel.scrollTop;
      },
      { passive: true }
    );
  }

  if (richEditor) {
    richEditor.addEventListener(
      "scroll",
      () => {
        app.outlineScrollPositions[chKey] = richEditor.scrollTop;
      },
      { passive: true }
    );
  }

  // 2. In-Place Toggle Collapse / Expand per Heading Bar
  const toggleHeadingBars = document.querySelectorAll(".toggle-heading-bar");
  toggleHeadingBars.forEach((bar) => {
    bar.addEventListener("click", (e) => {
      if (e.target.closest(".heading-insert-bullet-btn")) return;
      const idx = parseInt(bar.getAttribute("data-toggle-heading"), 10);
      if (!window.collapsedHeadingsMap[chKey]) {
        window.collapsedHeadingsMap[chKey] = {};
      }
      const isCurrentlyCollapsed = Boolean(window.collapsedHeadingsMap[chKey][idx]);
      const nextCollapsed = !isCurrentlyCollapsed;
      window.collapsedHeadingsMap[chKey][idx] = nextCollapsed;

      // In-place DOM update for instant responsiveness without full re-render
      const body = document.querySelector(`.esv-rich-heading-body[data-section-body="${idx}"]`);
      const icon = bar.querySelector(".rich-heading-toggle-icon");
      if (body) {
        if (nextCollapsed) {
          body.classList.add("hidden");
        } else {
          body.classList.remove("hidden");
        }
      }
      if (icon) {
        icon.textContent = nextCollapsed ? "▶" : "▼";
      }
    });
  });

  // Expand All / Collapse All buttons
  const expandAllBtn = document.getElementById("expand-all-headings-btn");
  if (expandAllBtn) {
    expandAllBtn.addEventListener("click", () => {
      window.collapsedHeadingsMap[chKey] = {};
      const bodies = document.querySelectorAll(".esv-rich-heading-body");
      const icons = document.querySelectorAll(".rich-heading-toggle-icon");
      bodies.forEach((b) => b.classList.remove("hidden"));
      icons.forEach((i) => (i.textContent = "▼"));
    });
  }

  const collapseAllBtn = document.getElementById("collapse-all-headings-btn");
  if (collapseAllBtn) {
    collapseAllBtn.addEventListener("click", () => {
      const blocks = app.data.chapters[chKey]?.headingBlocks || [];
      if (!window.collapsedHeadingsMap[chKey]) {
        window.collapsedHeadingsMap[chKey] = {};
      }
      blocks.forEach((_, idx) => {
        window.collapsedHeadingsMap[chKey][idx] = true;
      });
      const bodies = document.querySelectorAll(".esv-rich-heading-body");
      const icons = document.querySelectorAll(".rich-heading-toggle-icon");
      bodies.forEach((b) => b.classList.add("hidden"));
      icons.forEach((i) => (i.textContent = "▶"));
    });
  }

  // 3. Add Header Functionality
  const handleAddHeader = (insertIdx = null) => {
    app.saveActiveChapterEditorBeforeSwitch();

    if (!app.data.chapters[chKey]) {
      app.data.chapters[chKey] = { headingBlocks: [], status: "in-progress" };
    }
    if (!Array.isArray(app.data.chapters[chKey].headingBlocks)) {
      app.data.chapters[chKey].headingBlocks = [];
    }

    const newBlock = {
      heading: "New Section",
      verses: "",
      notes: "",
      points: [""]
    };

    if (typeof insertIdx === "number" && insertIdx >= 0) {
      app.data.chapters[chKey].headingBlocks.splice(insertIdx + 1, 0, newBlock);
    } else {
      app.data.chapters[chKey].headingBlocks.push(newBlock);
    }

    if (app.data.chapters[chKey].status === "empty") {
      app.data.chapters[chKey].status = "in-progress";
    }

    app.notifyDataChanged();
    app.render();

    // Automatically focus and select the title input of the new header
    const targetIdx =
      typeof insertIdx === "number" && insertIdx >= 0
        ? insertIdx + 1
        : app.data.chapters[chKey].headingBlocks.length - 1;
    setTimeout(() => {
      const titleInput = document.querySelector(
        `.heading-title-input[data-heading-title-input="${targetIdx}"]`
      );
      if (titleInput) {
        titleInput.focus();
        titleInput.select();
      }
    }, 50);
  };

  const addHeadingBtns = document.querySelectorAll(
    "#add-heading-btn, #bottom-add-heading-btn, #empty-add-heading-btn, #add-custom-heading-btn"
  );
  addHeadingBtns.forEach((btn) => {
    btn.addEventListener("click", () => handleAddHeader());
  });

  const insertAfterBtns = document.querySelectorAll(".insert-heading-after-btn");
  insertAfterBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.getAttribute("data-insert-heading-after"), 10);
      handleAddHeader(idx);
    });
  });

  // 4. Delete Header Functionality
  const deleteHeadingBtns = document.querySelectorAll(".delete-heading-btn");
  deleteHeadingBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.getAttribute("data-delete-heading"), 10);
      const block = app.data.chapters[chKey]?.headingBlocks?.[idx];
      if (!block) return;

      app.saveActiveChapterEditorBeforeSwitch();

      const hasContent = Array.isArray(block.points)
        ? block.points.some((p) => p && p.trim().length > 0)
        : Boolean(block.notes && block.notes.trim().length > 0);

      if (hasContent) {
        const ok = confirm(`Delete header "${block.heading || "Section"}" and its notes?`);
        if (!ok) return;
      }

      const chData = app.data.chapters[chKey];
      if (!Array.isArray(chData.deletedHeadings)) {
        chData.deletedHeadings = [];
      }
      if (block.heading) {
        const hKey = block.heading.toLowerCase().trim();
        if (!chData.deletedHeadings.includes(hKey)) {
          chData.deletedHeadings.push(hKey);
        }
      }
      chData.headingsInitialized = true;

      chData.headingBlocks.splice(idx, 1);
      if (window.collapsedHeadingsMap?.[chKey]) {
        delete window.collapsedHeadingsMap[chKey][idx];
      }
      saveOutlineStorage(app.data);
      app.notifyDataChanged();
      app.render();
    });
  });

  // 5. Re-order Headings (Move Up / Move Down)
  const moveHeadingUpBtns = document.querySelectorAll(".move-heading-up-btn");
  moveHeadingUpBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.getAttribute("data-move-heading-up"), 10);
      app.moveHeadingUp(idx);
    });
  });

  const moveHeadingDownBtns = document.querySelectorAll(".move-heading-down-btn");
  moveHeadingDownBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.getAttribute("data-move-heading-down"), 10);
      app.moveHeadingDown(idx);
    });
  });

  // 6. Re-order Headings (Drag and Drop)
  const dragHandles = document.querySelectorAll(".heading-drag-handle");
  dragHandles.forEach((handle) => {
    handle.addEventListener("dragstart", (e) => {
      e.stopPropagation();
      const idx = handle.getAttribute("data-drag-heading");
      e.dataTransfer.setData("text/plain", idx);
      e.dataTransfer.effectAllowed = "move";
      const wrap = handle.closest(".esv-rich-section-wrap");
      if (wrap) wrap.classList.add("opacity-50");
    });

    handle.addEventListener("dragend", () => {
      const wrap = handle.closest(".esv-rich-section-wrap");
      if (wrap) wrap.classList.remove("opacity-50");
    });
  });

  const sectionWraps = document.querySelectorAll(".esv-rich-section-wrap");
  sectionWraps.forEach((wrap) => {
    wrap.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      wrap.classList.add("ring-2", "ring-[#C4B79C]");
    });

    wrap.addEventListener("dragleave", () => {
      wrap.classList.remove("ring-2", "ring-[#C4B79C]");
    });

    wrap.addEventListener("drop", (e) => {
      e.preventDefault();
      wrap.classList.remove("ring-2", "ring-[#C4B79C]");
      const fromIdxStr = e.dataTransfer.getData("text/plain");
      const fromIdx = parseInt(fromIdxStr, 10);
      const toIdx = parseInt(wrap.getAttribute("data-heading-index"), 10);
      if (!isNaN(fromIdx) && !isNaN(toIdx) && fromIdx !== toIdx) {
        app.reorderHeadings(fromIdx, toIdx);
      }
    });
  });

  // 7. Inline Header Title & Verses Inputs
  const headingTitleInputs = document.querySelectorAll(".heading-title-input");
  headingTitleInputs.forEach((input) => {
    input.addEventListener("click", (e) => e.stopPropagation());
    input.addEventListener("paste", (e) => {
      const text = e.clipboardData?.getData("text/plain");
      if (text && /[\r\n]/.test(text)) {
        e.preventDefault();
        const cleanText = text.replace(/[\r\n]+/g, " ").trim();
        document.execCommand("insertText", false, cleanText);
        input.dispatchEvent(new Event("input", { bubbles: true }));
      }
    });
    input.addEventListener("input", () => {
      const idx = parseInt(input.getAttribute("data-heading-title-input"), 10);
      if (app.data.chapters[chKey]?.headingBlocks?.[idx]) {
        app.data.chapters[chKey].headingBlocks[idx].heading = input.value;
        if (app.data.chapters[chKey].status === "empty") {
          app.data.chapters[chKey].status = "in-progress";
        }
        app.notifyDataChanged();
      }
    });
  });

  const headingVersesInputs = document.querySelectorAll(".heading-verses-input");
  headingVersesInputs.forEach((input) => {
    input.addEventListener("click", (e) => e.stopPropagation());
    input.addEventListener("input", () => {
      const idx = parseInt(input.getAttribute("data-heading-verses-input"), 10);
      if (app.data.chapters[chKey]?.headingBlocks?.[idx]) {
        app.data.chapters[chKey].headingBlocks[idx].verses = input.value;
        app.notifyDataChanged();
      }
    });
  });

  // 8. Restore / Refresh ESV headings buttons
  const handleRestoreESVHeadings = () => {
    const ok = confirm("Reset outline headers to the official ESV section headings for this chapter?");
    if (!ok) return;

    const chData = app.data.chapters[chKey];
    if (chData) {
      chData.deletedHeadings = [];
    }

    const text = chData?.chapterScripture;
    const book = app.getSelectedBook();
    if (text) {
      app.syncHeadingBlocksForChapter(chKey, text, book.name, app.selectedChapterNum, true);
      saveOutlineStorage(app.data);
      app.notifyDataChanged();
    } else {
      app.autoLoadESVForCurrentChapter(true);
    }
    app.render();
  };

  const reinsertHeadingsBtns = document.querySelectorAll(
    "#reinsert-esv-headings-btn, #empty-restore-esv-btn"
  );
  reinsertHeadingsBtns.forEach((btn) => {
    btn.addEventListener("click", handleRestoreESVHeadings);
  });

  const refreshESVBtn = document.getElementById("refresh-esv-btn");
  if (refreshESVBtn) {
    refreshESVBtn.addEventListener("click", () => {
      app.autoLoadESVForCurrentChapter(false);
    });
  }

  // 9. Active section canvas tracking & formatting
  let lastActiveSectionCanvas = null;
  const updateActiveSectionCanvas = (canvas) => {
    if (canvas && canvas.classList.contains("section-bullet-canvas")) {
      lastActiveSectionCanvas = canvas;
    }
  };

  const ensureSectionBulletedList = (canvas) => {
    if (!canvas) return;
    const hasUl = canvas.querySelector("ul, ol");
    if (!hasUl) {
      const text = canvas.textContent.trim();
      canvas.innerHTML = `<ul style="list-style-type: disc; margin-left: 1.5rem;"><li>${
        text || "<br>"
      }</li></ul>`;
    }

    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const anchorNode = sel.anchorNode;
      if (anchorNode && canvas.contains(anchorNode)) {
        return;
      }
    }

    const lis = canvas.querySelectorAll("li");
    const targetLi = lis.length > 0 ? lis[lis.length - 1] : null;
    if (targetLi) {
      canvas.focus();
      const range = document.createRange();
      range.selectNodeContents(targetLi);
      range.collapse(false);
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  };

  // Section bullet canvases
  const sectionCanvases = document.querySelectorAll(".section-bullet-canvas");
  sectionCanvases.forEach((canvas) => {
    canvas.addEventListener("focus", () => updateActiveSectionCanvas(canvas));
    canvas.addEventListener("click", () => updateActiveSectionCanvas(canvas));
    canvas.addEventListener("keyup", () => updateActiveSectionCanvas(canvas));
    canvas.addEventListener("pointerdown", () => updateActiveSectionCanvas(canvas));

    canvas.addEventListener("keydown", (e) => {
      updateActiveSectionCanvas(canvas);
      if (e.key === "Tab") {
        e.preventDefault();
      }
    });

    // Clean paste formatting
    canvas.addEventListener("paste", (e) => {
      e.preventDefault();
      updateActiveSectionCanvas(canvas);

      const clipboardData = e.clipboardData || window.clipboardData;
      if (!clipboardData) return;

      const rawText = clipboardData.getData("text/plain");
      if (!rawText) return;

      const lines = rawText.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
      const cleanLines = [];
      for (const line of lines) {
        let t = line.replace(/<[^>]+>/g, "").trim();
        t = t.replace(/^[•\u2022\u2023\u25E6\u2043\u2219\-\*]\s*/, "");
        t = t.replace(/^(?:\d+[\.\)]|\(\d+\)|\[\d+\])\s*/, "");
        t = t.trim();
        if (t.length > 0) {
          cleanLines.push(t);
        }
      }

      if (cleanLines.length === 0) return;

      let ul = canvas.querySelector("ul");
      if (!ul) {
        ul = document.createElement("ul");
        ul.style.listStyleType = "disc";
        ul.style.marginLeft = "1.25rem";
        canvas.innerHTML = "";
        canvas.appendChild(ul);
      }

      const selection = window.getSelection();
      let currentLi = null;
      let range = null;
      if (selection && selection.rangeCount > 0) {
        range = selection.getRangeAt(0);
        const node = selection.anchorNode;
        if (node) {
          currentLi = node.nodeType === Node.ELEMENT_NODE ? node.closest("li") : node.parentElement?.closest("li");
        }
      }

      if (cleanLines.length === 1 && currentLi && currentLi.textContent.trim().length > 0 && range) {
        range.deleteContents();
        const textNode = document.createTextNode(cleanLines[0]);
        range.insertNode(textNode);
        range.setStartAfter(textNode);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
        canvas.dispatchEvent(new Event("input", { bubbles: true }));
        return;
      }

      if (currentLi && currentLi.textContent.trim().length === 0) {
        currentLi.textContent = cleanLines[0];
        let lastInserted = currentLi;
        for (let i = 1; i < cleanLines.length; i++) {
          const newLi = document.createElement("li");
          newLi.textContent = cleanLines[i];
          if (lastInserted.nextSibling) {
            ul.insertBefore(newLi, lastInserted.nextSibling);
          } else {
            ul.appendChild(newLi);
          }
          lastInserted = newLi;
        }
        if (selection) {
          const newRange = document.createRange();
          newRange.selectNodeContents(lastInserted);
          newRange.collapse(false);
          selection.removeAllRanges();
          selection.addRange(newRange);
        }
      } else if (currentLi) {
        let lastInserted = currentLi;
        for (let i = 0; i < cleanLines.length; i++) {
          const newLi = document.createElement("li");
          newLi.textContent = cleanLines[i];
          if (lastInserted.nextSibling) {
            ul.insertBefore(newLi, lastInserted.nextSibling);
          } else {
            ul.appendChild(newLi);
          }
          lastInserted = newLi;
        }
        if (selection) {
          const newRange = document.createRange();
          newRange.selectNodeContents(lastInserted);
          newRange.collapse(false);
          selection.removeAllRanges();
          selection.addRange(newRange);
        }
      } else {
        cleanLines.forEach((text) => {
          const li = document.createElement("li");
          li.textContent = text;
          ul.appendChild(li);
        });
        const allLis = ul.querySelectorAll("li");
        const lastLi = allLis[allLis.length - 1];
        if (selection && lastLi) {
          const newRange = document.createRange();
          newRange.selectNodeContents(lastLi);
          newRange.collapse(false);
          selection.removeAllRanges();
          selection.addRange(newRange);
        }
      }

      canvas.dispatchEvent(new Event("input", { bubbles: true }));
    });

    // Auto-save on input & bullet list enforcement
    canvas.addEventListener("input", () => {
      updateActiveSectionCanvas(canvas);
      if (!canvas.querySelector("ul, ol")) {
        const text = canvas.textContent;
        if (/^[-*]\s/.test(text)) {
          ensureSectionBulletedList(canvas);
        }
      }

      // Flatten any nested sub-bullets
      const nestedLists = canvas.querySelectorAll("ul ul, ul ol, ol ul, ol ol");
      nestedLists.forEach((nested) => {
        const parentList = nested.parentElement ? nested.parentElement.closest("ul, ol") : null;
        const parentLi = nested.closest("li");
        if (parentList) {
          const children = Array.from(nested.children);
          children.forEach((child) => {
            if (parentLi && parentLi.nextSibling) {
              parentList.insertBefore(child, parentLi.nextSibling);
            } else {
              parentList.appendChild(child);
            }
          });
          nested.remove();
        }
      });

      const editor = document.getElementById("chapter-rich-outline-editor");
      if (editor) {
        if (!app.data.chapters[chKey]) {
          app.data.chapters[chKey] = { headingBlocks: [], status: "empty" };
        }
        const hIdx = parseInt(canvas.getAttribute("data-section-editor"), 10);
        const block = app.data.chapters[chKey].headingBlocks[hIdx];
        if (block) {
          const lis = Array.from(canvas.querySelectorAll("li"))
            .map((li) => li.innerText.trim())
            .filter((p) => p.length > 0);
          block.points = lis;
          block.notes = lis.join("\n");
        }
        if (app.data.chapters[chKey].status === "empty" && canvas.textContent.trim().length > 0) {
          app.data.chapters[chKey].status = "in-progress";
        }
        app.notifyDataChanged();
      }
    });
  });

  const ensureBulletBtns = document.querySelectorAll("button[data-ensure-bullet]");
  ensureBulletBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const idx = btn.getAttribute("data-ensure-bullet");
      const canvas = document.querySelector(`.section-bullet-canvas[data-section-editor="${idx}"]`);
      if (canvas) {
        updateActiveSectionCanvas(canvas);
        ensureSectionBulletedList(canvas);
        canvas.dispatchEvent(new Event("input", { bubbles: true }));
      }
    });
  });

  // Section headings banner click toggle
  const headingBanners = document.querySelectorAll(".esv-rich-heading-banner");
  headingBanners.forEach((banner) => {
    banner.addEventListener("click", (e) => {
      if (
        e.target.closest(
          "input, button, .delete-heading-btn, .move-heading-up-btn, .move-heading-down-btn, .heading-drag-handle, .insert-heading-after-btn, .heading-title-input, .heading-verses-input"
        )
      ) {
        return;
      }
      const idx = banner.getAttribute("data-toggle-heading");
      const body = document.querySelector(`.esv-rich-heading-body[data-section-body="${idx}"]`);
      const icon = banner.querySelector(".rich-heading-toggle-icon");
      if (body) {
        body.classList.toggle("hidden");
        const isHidden = body.classList.contains("hidden");
        if (icon) {
          icon.textContent = isHidden ? "▶" : "▼";
        }
        if (!window.collapsedHeadingsMap[chKey]) {
          window.collapsedHeadingsMap[chKey] = {};
        }
        window.collapsedHeadingsMap[chKey][idx] = isHidden;
      }
    });
  });

  // Toolbar formatting buttons
  const richToolbarBtns = document.querySelectorAll("button[data-rich-command], .rich-toolbar-btn");
  richToolbarBtns.forEach((btn) => {
    btn.addEventListener("mousedown", (e) => {
      e.preventDefault();
    });
  });

  const richCommandBtns = document.querySelectorAll("button[data-rich-command]");
  richCommandBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cmd = btn.getAttribute("data-rich-command");
      const currentActive = document.activeElement;
      const activeCanvas =
        (currentActive && currentActive.closest(".section-bullet-canvas")) ||
        lastActiveSectionCanvas ||
        document.querySelector(".section-bullet-canvas");

      if (activeCanvas) {
        updateActiveSectionCanvas(activeCanvas);
        if (!activeCanvas.contains(document.activeElement)) {
          activeCanvas.focus();
        }

        if (cmd === "insertUnorderedList") {
          ensureSectionBulletedList(activeCanvas);
        } else if (cmd === "insertOrderedList") {
          document.execCommand("insertOrderedList", false, null);
        } else if (cmd === "indent" || cmd === "outdent") {
          return;
        } else {
          document.execCommand(cmd, false, null);
        }
        activeCanvas.dispatchEvent(new Event("input", { bubbles: true }));
      }
    });
  });

  // Toggle all section headings
  const toggleRichHeadingsBtn = document.getElementById("toggle-rich-headings-btn");
  if (toggleRichHeadingsBtn) {
    toggleRichHeadingsBtn.addEventListener("click", () => {
      if (!richEditor) return;
      const bodies = richEditor.querySelectorAll(".esv-rich-heading-body");
      const icons = richEditor.querySelectorAll(".rich-heading-toggle-icon");
      const isCurrentlyHidden = Array.from(bodies).some((b) => b.classList.contains("hidden"));

      bodies.forEach((body) => {
        if (isCurrentlyHidden) {
          body.classList.remove("hidden");
        } else {
          body.classList.add("hidden");
        }
      });
      icons.forEach((icon) => {
        icon.textContent = isCurrentlyHidden ? "▼" : "▶";
      });
    });
  }

  // 10. Resizable Split Divider
  const splitContainer = document.getElementById("chapter-split-container");
  const splitDivider = document.getElementById("chapter-split-divider");
  const outlinePanel = document.getElementById("chapter-outline-panel");

  if (splitContainer && splitDivider && outlinePanel) {
    let isDragging = false;

    const onPointerDown = (e) => {
      isDragging = true;
      try {
        splitDivider.setPointerCapture(e.pointerId);
      } catch (_) {}
      document.body.style.userSelect = "none";
      document.body.style.cursor = "col-resize";
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const rect = splitContainer.getBoundingClientRect();
      if (rect.width <= 0) return;

      const offsetX = e.clientX - rect.left;
      let pct = (offsetX / rect.width) * 100;

      const minPct = Math.max(15, (260 / rect.width) * 100);
      const maxPct = Math.min(85, ((rect.width - 260) / rect.width) * 100);

      pct = Math.min(Math.max(pct, minPct), maxPct);
      app.splitRatio = pct;
      outlinePanel.style.width = `${pct}%`;
    };

    const onPointerUp = (e) => {
      if (!isDragging) return;
      isDragging = false;
      try {
        splitDivider.releasePointerCapture(e.pointerId);
      } catch (_) {}
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
      try {
        localStorage.setItem("bibleOutline_splitRatio", app.splitRatio.toString());
      } catch (_) {}
    };

    splitDivider.addEventListener("pointerdown", onPointerDown);
    splitDivider.addEventListener("pointermove", onPointerMove);
    splitDivider.addEventListener("pointerup", onPointerUp);
    splitDivider.addEventListener("pointercancel", onPointerUp);

    splitDivider.addEventListener("dblclick", () => {
      app.splitRatio = 50;
      outlinePanel.style.width = "50%";
      try {
        localStorage.setItem("bibleOutline_splitRatio", "50");
      } catch (_) {}
    });
  }

  // 11. Chapter Takeaway
  const chapterTakeawayInput = document.getElementById("chapter-takeaway-input");
  if (chapterTakeawayInput) {
    chapterTakeawayInput.addEventListener("input", (e) => {
      if (!app.data.chapters[chKey]) {
        app.data.chapters[chKey] = { headingBlocks: [] };
      }
      app.data.chapters[chKey].takeaway = e.target.value;
      app.notifyDataChanged();
    });
  }

  // 12. Split view switcher buttons
  const splitBtns = document.querySelectorAll(".split-mode-btn");
  splitBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      app.splitViewMode = btn.getAttribute("data-split-mode");
      app.render();
    });
  });

  // 13. Previous & Next Chapter stepping buttons
  const prevChBtn = document.getElementById("prev-chapter-btn");
  if (prevChBtn) {
    prevChBtn.addEventListener("click", () => app.stepToPrevChapter());
  }

  const nextChBtn = document.getElementById("next-chapter-btn");
  if (nextChBtn) {
    nextChBtn.addEventListener("click", () => app.stepToNextChapter());
  }

  // 14. Quick Book Summary Box
  const toggleBookSummaryBtn = document.getElementById("toggle-book-summary-box-btn");
  const hideBookSummaryBtn = document.getElementById("hide-book-summary-box-btn");
  const summaryCollapsible = document.getElementById("book-summary-collapsible");
  const quickSummaryArea = document.getElementById("quick-book-summary-textarea");

  if (toggleBookSummaryBtn && summaryCollapsible) {
    toggleBookSummaryBtn.addEventListener("click", () => {
      summaryCollapsible.classList.toggle("hidden");
      if (!summaryCollapsible.classList.contains("hidden") && quickSummaryArea) {
        quickSummaryArea.focus();
      }
    });
  }
  if (hideBookSummaryBtn && summaryCollapsible) {
    hideBookSummaryBtn.addEventListener("click", () => {
      summaryCollapsible.classList.add("hidden");
    });
  }
  if (quickSummaryArea) {
    quickSummaryArea.addEventListener("input", (e) => {
      if (!app.data.books[app.selectedBookId]) {
        app.data.books[app.selectedBookId] = { bookSummary: "" };
      }
      app.data.books[app.selectedBookId].bookSummary = e.target.value;
      app.notifyDataChanged();
    });
  }
}
