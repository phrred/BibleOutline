import { BIBLE_BOOKS } from "../data/bible_catalog.js";

const STORAGE_KEY = "bible_outline_studio_v1";

// Returns empty/default user notes database
export function createInitialStorage() {
  const books = {};
  const chapters = {};

  BIBLE_BOOKS.forEach((book) => {
    books[book.id] = {
      bookSummary: "",
      myBookTheme: "",
      updatedAt: null
    };

    for (let ch = 1; ch <= book.chapterCount; ch++) {
      const chKey = `${book.id}-${ch}`;
      chapters[chKey] = {
        headingBlocks: [], // Array of heading blocks e.g. { heading, verses, points, notes }
        chapterTitle: "",
        sections: [], // Array of string section titles e.g. "v1-11: Call of Abram"
        notes: "",    // Notes of what happened
        chapterScripture: "", // Cached bible scripture text for the chapter reader
        status: "empty", // 'empty' | 'in-progress' | 'completed'
        takeaway: "",
        updatedAt: null
      };
    }
  });

  return {
    version: 1,
    lastSaved: Date.now(),
    books,
    chapters,
    quizHistory: [],
    bookMastery: {}
  };
}

export function loadOutlineStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = createInitialStorage();
      saveOutlineStorage(initial);
      return initial;
    }
    const data = JSON.parse(raw);
    // Ensure all 66 books & 1,189 chapters exist even if newly added fields
    const defaultData = createInitialStorage();
    if (!data.books) data.books = defaultData.books;
    if (!data.chapters) data.chapters = defaultData.chapters;
    if (!Array.isArray(data.quizHistory)) {
      data.quizHistory = [];
    } else {
      data.quizHistory.forEach((q, idx) => {
        if (!q.id) {
          q.id = `quiz_${q.date || Date.now()}_${idx}`;
        }
      });
    }
    if (!data.bookMastery) data.bookMastery = {};

    BIBLE_BOOKS.forEach((book) => {
      if (!data.books[book.id]) {
        data.books[book.id] = defaultData.books[book.id];
      }
      for (let ch = 1; ch <= book.chapterCount; ch++) {
        const chKey = `${book.id}-${ch}`;
        if (!data.chapters[chKey]) {
          data.chapters[chKey] = defaultData.chapters[chKey];
        } else if (!Array.isArray(data.chapters[chKey].headingBlocks)) {
          data.chapters[chKey].headingBlocks = [];
        }
      }
    });
    return data;
  } catch (err) {
    console.error("Error loading Bible outline storage:", err);
    return createInitialStorage();
  }
}

export function saveOutlineStorage(data) {
  try {
    data.lastSaved = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Error saving Bible outline storage:", err);
  }
}

let saveTimer = null;
export function debouncedSaveOutlineStorage(data, delay = 250) {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    saveOutlineStorage(data);
  }, delay);
}

// Helper to inject sample Genesis 1 & Matthew 1 example outline so user can see it in action
export function injectExampleOutlines(data) {
  // Genesis Book Summary
  data.books["GEN"].bookSummary =
    "Genesis sets the foundational plot of the Bible: God creates a good universe with humanity as His image-bearers. After the tragedy of the Fall in Eden, human rebellion spreads through Cain, the Flood, and Babel. Yet God initiates His redemptive covenant by calling Abraham, Isaac, Jacob, and Joseph, preserving His covenant line and blessing all families of the earth.";
  data.books["GEN"].myBookTheme = "Beginnings, Sovereign Covenant & God's Promise";

  // Genesis 1
  data.chapters["GEN-1"] = {
    headingBlocks: [
      {
        heading: "The Creation of the World",
        verses: "v1–31",
        notes: "• In the beginning, God creates from nothing (ex nihilo) by His spoken Word.\n• Days 1–3: God brings order out of chaos (forming domains: Light/Dark, Waters/Sky, Earth/Plants).\n• Days 4–6: God fills the domains (Sun/Moon/Stars, Sea/Sky creatures, Land animals & Humans).\n• Verse 26–28: Imago Dei — Humans are created male and female to reflect God's character and rule creation as His stewards.\n• God pronounces everything 'very good'."
      }
    ],
    chapterScripture: `The Creation of the World\n\n  [1] In the beginning, God created the heavens and the earth. [2] The earth was without form and void, and darkness was over the face of the deep. And the Spirit of God was hovering over the face of the waters.\n\n  [3] And God said, "Let there be light," and there was light. [4] And God saw that the light was good. And God separated the light from the darkness. [5] God called the light Day, and the darkness he called Night. And there was evening and there was morning, the first day.\n\n  [26] Then God said, "Let us make man in our image, after our likeness. And let them have dominion over the fish of the sea and over the birds of the heavens and over the livestock and over all the earth and over every creeping thing that creeps on the earth."\n\n  [27] So God created man in his own image, in the image of God he created him; male and female he created them.\n\n  [31] And God saw everything that he had made, and behold, it was very good. And there was evening and there was morning, the sixth day.`,
    status: "completed",
    takeaway: "God is the supreme Creator who designed humanity to reflect His goodness and care for His world.",
    updatedAt: Date.now()
  };

  // Genesis 2
  data.chapters["GEN-2"] = {
    headingBlocks: [
      {
        heading: "The Seventh Day, God Rests",
        verses: "v1–3",
        notes: "• Day 7: God rests, hallowing the Sabbath as a pattern of rest and delight in creation."
      },
      {
        heading: "The Creation of Man and Woman",
        verses: "v4–25",
        notes: "• Adam is formed from dust and breathed with life, placed in Eden to work and keep it.\n• God gives generous freedom of every tree except the Tree of Knowledge of Good and Evil.\n• God creates Eve from Adam's rib: 'bone of my bones and flesh of my flesh' — establishing covenant marriage."
      }
    ],
    status: "completed",
    takeaway: "True flourishing is found in intimate fellowship with God and self-giving community.",
    updatedAt: Date.now()
  };

  // Genesis 3
  data.chapters["GEN-3"] = {
    headingBlocks: [
      {
        heading: "The Fall",
        verses: "v1–24",
        notes: "• The serpent distorts God's word ('Did God actually say?'). Adam and Eve doubt God's goodness and eat the fruit.\n• Immediate alienation: shame, hiding from God, and blame-shifting.\n• Genesis 3:15 (Protoevangelium): First promise of the Gospel — the Seed of the woman will crush the head of the serpent.\n• God graciously clothes them with animal skins before exiling them from Eden."
      }
    ],
    status: "completed",
    takeaway: "Even amidst humanity's rebellion and curse, God immediately promises a Redeemer who will defeat evil.",
    updatedAt: Date.now()
  };

  // Matthew Book Summary
  data.books["MAT"].bookSummary =
    "Matthew connects Old Testament prophecy to Jesus Christ, demonstrating that He is the promised Messiah and King of the line of David. Through five major discourses (beginning with the Sermon on the Mount), Jesus inaugurates the Kingdom of Heaven, dies as a ransom for sinners, rises in victory, and sends His disciples to make disciples of all nations.";

  // Matthew 1
  data.chapters["MAT-1"] = {
    chapterTitle: "The Genealogy of King Jesus & Immanuel's Birth",
    sections: [
      "v1-17: The Royal Lineage from Abraham and David to Joseph",
      "v18-25: The Angel's Message to Joseph & Birth of Immanuel"
    ],
    notes:
      "• Genealogy establishes Jesus as the rightful heir to Abraham (blessing to nations) and David (eternal throne).\n• Notably includes women of grace/redemption (Tamar, Rahab, Ruth, Bathsheba) showing God's mercy extends to all.\n• Angel reveals to Joseph that Mary conceived by the Holy Spirit.\n• Name JESUS = 'Yahweh saves' (He will save His people from their sins).\n• Immanuel = 'God with us' (fulfilling Isaiah 7:14).",
    status: "completed",
    takeaway: "Jesus is the fulfillment of all God's promises—God with us to save us from our sins.",
    updatedAt: Date.now()
  };

  saveOutlineStorage(data);
  return data;
}

// Helper to export Book or full Bible Outline to clean Markdown format (Document or Grid Table layout)
export function exportToMarkdown(data, bookId = null, layout = "document") {
  const booksToExport = bookId ? [BIBLE_BOOKS.find((b) => b.id === bookId)].filter(Boolean) : BIBLE_BOOKS;

  let md = "";
  if (!bookId) {
    md += "# COMPLETE BIBLE OUTLINE & CHAPTER STUDY\n\n";
    md += `Generated from Bible Outline & Storyline Studio (${new Date().toLocaleDateString()})\n\n`;
    if (layout === "grid") {
      md += `*Layout: Two-Column Grid Table*\n\n`;
    }
    md += "---\n\n";
  }

  booksToExport.forEach((book) => {
    const bookData = data.books[book.id];
    const hasSummary = bookData && bookData.bookSummary && bookData.bookSummary.trim().length > 0;

    // Check if book has any outlined chapters
    let outlinedCount = 0;
    for (let ch = 1; ch <= book.chapterCount; ch++) {
      const chKey = `${book.id}-${ch}`;
      const chData = data.chapters[chKey];
      const hasHeadingNotes = Array.isArray(chData?.headingBlocks) && chData.headingBlocks.some((b) => (b.notes && b.notes.trim()) || (Array.isArray(b.points) && b.points.some((p) => p && p.trim())));
      const hasLegacyNotes = Boolean((chData?.chapterTitle || "").trim() || (chData?.notes || "").trim() || (chData?.sections || []).length > 0);
      if (chData && (hasHeadingNotes || hasLegacyNotes || (chData.takeaway && chData.takeaway.trim()))) {
        outlinedCount++;
      }
    }

    if (!bookId && !hasSummary && outlinedCount === 0) {
      // Skip empty books in full bible export unless single book requested
      return;
    }

    md += `# ${book.name} (${book.testament} • ${book.category})\n\n`;
    md += `**Author:** ${book.author} | **Date:** ${book.date} | **Key Theme:** ${book.keyTheme}\n\n`;
    md += `> **Historical & Bible Story Context:** ${book.context}\n\n`;

    if (hasSummary) {
      md += `## Overall Book Summary\n\n${bookData.bookSummary}\n\n`;
    }

    md += `## Chapter Outlines (${outlinedCount}/${book.chapterCount} Chapters Outlined)\n\n`;

    for (let ch = 1; ch <= book.chapterCount; ch++) {
      const chKey = `${book.id}-${ch}`;
      const chData = data.chapters[chKey] || {};
      const blocks = Array.isArray(chData.headingBlocks) ? chData.headingBlocks : [];

      const hasAnyNotes = blocks.some((b) => (b.notes && b.notes.trim().length > 0) || (Array.isArray(b.points) && b.points.some((p) => p && p.trim().length > 0)));
      if (!hasAnyNotes && !bookId) {
        continue;
      }

      md += `### Chapter ${ch}\n\n`;

      if (layout === "grid") {
        md += `| Section Heading & Passage | Outline Points & Notes |\n`;
        md += `| :--- | :--- |\n`;

        if (blocks.length === 0) {
          md += `| *Chapter ${ch}* | *No notes recorded under this chapter.* |\n`;
        } else {
          blocks.forEach((block) => {
            const headingText = `**${(block.heading || "Section").replace(/\|/g, "\\|")}**${block.verses ? ` *(${block.verses.replace(/\|/g, "\\|")})*` : ""}`;
            const pts = Array.isArray(block.points) && block.points.length > 0
              ? block.points.filter((p) => p && p.trim().length > 0)
              : block.notes
              ? block.notes.split("\n").map((l) => l.replace(/^[•\-\*]\s*/, "").trim()).filter(Boolean)
              : [];

            let notesText = "";
            if (pts.length > 0) {
              notesText = pts.map((p) => `• ${p.replace(/\|/g, "\\|").replace(/\n/g, " ")}`).join("<br>");
            } else if (block.notes && block.notes.trim()) {
              notesText = block.notes.replace(/\|/g, "\\|").replace(/\n/g, "<br>");
            } else {
              notesText = "*No notes recorded.*";
            }

            md += `| ${headingText} | ${notesText} |\n`;
          });
        }
        md += `\n`;
      } else {
        blocks.forEach((block) => {
          md += `#### ${block.heading}${block.verses ? ` (${block.verses})` : ""}\n\n`;
          const pts = Array.isArray(block.points) && block.points.length > 0
            ? block.points.filter((p) => p && p.trim().length > 0)
            : block.notes
            ? block.notes.split("\n").map((l) => l.replace(/^[•\-\*]\s*/, "").trim()).filter(Boolean)
            : [];

          if (pts.length > 0) {
            pts.forEach((p) => {
              md += `- ${p}\n`;
            });
            md += `\n`;
          } else if (block.notes && block.notes.trim()) {
            md += `${block.notes}\n\n`;
          } else {
            md += `*No notes recorded under this heading.*\n\n`;
          }
        });
      }

      if (chData.takeaway && chData.takeaway.trim()) {
        md += `**Key Takeaway:** *${chData.takeaway}*\n\n`;
      }

      md += `---\n\n`;
    }
  });

  return md;
}

// Generates high-quality print-ready HTML for PDF export (Grid Table or Document layout)
export function exportToPrintableHTML(data, bookId = null, layout = "grid") {
  const booksToExport = bookId ? [BIBLE_BOOKS.find((b) => b.id === bookId)].filter(Boolean) : BIBLE_BOOKS;
  const docTitle = bookId && booksToExport[0] ? `${booksToExport[0].name} Outline` : "Complete Bible Outline";

  let bodyContent = "";

  if (!bookId) {
    bodyContent += `
      <div class="doc-header">
        <h1>Complete Bible Outline & Study Notes</h1>
        <div class="doc-subtitle">66-Book Canonical Study Notes • Bible Outline Studio</div>
        <div class="doc-date">Generated on ${new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</div>
      </div>
      <hr class="doc-divider" />
    `;
  }

  booksToExport.forEach((book, bIdx) => {
    const bookData = data.books[book.id] || { bookSummary: "" };
    const hasSummary = bookData && bookData.bookSummary && bookData.bookSummary.trim().length > 0;

    let outlinedCount = 0;
    for (let ch = 1; ch <= book.chapterCount; ch++) {
      const chKey = `${book.id}-${ch}`;
      const chData = data.chapters[chKey];
      const hasHeadingNotes = Array.isArray(chData?.headingBlocks) && chData.headingBlocks.some((b) => (b.notes && b.notes.trim()) || (Array.isArray(b.points) && b.points.some((p) => p && p.trim())));
      if (chData && (hasHeadingNotes || (chData.takeaway && chData.takeaway.trim()))) {
        outlinedCount++;
      }
    }

    if (!bookId && !hasSummary && outlinedCount === 0) {
      return;
    }

    bodyContent += `
      <div class="book-container ${bIdx > 0 ? "page-break" : ""}">
        <div class="book-header">
          <div class="book-title-row">
            <div class="book-title-group">
              <h1 class="book-title">${book.name}</h1>
              <span class="book-badge">${book.testament} • ${book.category}</span>
            </div>
            <div class="book-meta">
              <span><strong>Author:</strong> ${book.author} (${book.date})</span>
              <span><strong>Key Theme:</strong> ${book.keyTheme}</span>
            </div>
          </div>
          <div class="book-context">
            <strong>Context:</strong> ${book.context}
          </div>
        </div>

        ${
          hasSummary
            ? `
              <div class="book-summary-box">
                <span class="section-badge">Overall Book Summary:</span>
                <span class="summary-text">${(bookData.bookSummary || "").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</span>
              </div>
            `
            : ""
        }

        <div class="chapter-outlines-wrapper">
          ${(() => {
            let chHtml = "";
            for (let ch = 1; ch <= book.chapterCount; ch++) {
              const chKey = `${book.id}-${ch}`;
              const chData = data.chapters[chKey] || {};
              const blocks = Array.isArray(chData.headingBlocks) ? chData.headingBlocks : [];
              const hasNotes = blocks.some((b) => (b.notes && b.notes.trim()) || (Array.isArray(b.points) && b.points.some((p) => p && p.trim())));

              if (!hasNotes && !bookId) {
                continue;
              }

              if (layout === "grid") {
                chHtml += `
                <div class="chapter-card no-break">
                  <div class="chapter-bar">
                    <span class="chapter-number">Chapter ${ch}</span>
                  </div>

                  <table class="grid-export-table">
                    <colgroup>
                      <col style="width: 36%;" />
                      <col style="width: 64%;" />
                    </colgroup>
                    <tbody>
                      ${
                        blocks.length === 0
                          ? ""
                          : blocks
                              .map((block, hIdx) => {
                                const pts = Array.isArray(block.points) && block.points.length > 0
                                  ? block.points.filter((p) => p && p.trim().length > 0)
                                  : block.notes
                                  ? block.notes.split("\n").map((l) => l.replace(/^[•\-\*]\s*/, "").trim()).filter(Boolean)
                                  : [];

                                return `
                                  <tr class="grid-section-row">
                                    <td class="grid-export-heading-cell">
                                      <div class="section-title-line">
                                        <span class="section-heading">${(block.heading || "Section").replace(/</g, "&lt;")}</span>
                                      </div>
                                      ${block.verses ? `<div class="grid-verses-tag">(${block.verses.replace(/</g, "&lt;")})</div>` : ""}
                                    </td>
                                    <td class="grid-export-points-cell">
                                      ${
                                        pts.length > 0
                                          ? `
                                            <ul class="points-list">
                                              ${pts
                                                .map(
                                                  (p) =>
                                                    `<li>${(p || "")
                                                      .replace(/</g, "&lt;")
                                                      .replace(/>/g, "&gt;")}</li>`
                                                )
                                                .join("")}
                                            </ul>
                                          `
                                          : ""
                                      }
                                    </td>
                                  </tr>
                                `;
                              })
                              .join("")
                      }
                    </tbody>
                  </table>

                  ${
                    chData.takeaway && chData.takeaway.trim()
                      ? `
                        <div class="takeaway-box">
                          <strong>Key Takeaway:</strong> <em>${chData.takeaway.replace(/</g, "&lt;")}</em>
                        </div>
                      `
                      : ""
                  }
                </div>
                `;
              } else {
                chHtml += `
                <div class="chapter-card no-break">
                  <div class="chapter-bar">
                    <span class="chapter-number">Chapter ${ch}</span>
                  </div>

                  <div class="chapter-sections-list">
                    ${
                      blocks.length === 0
                        ? ""
                        : blocks
                            .map((block, hIdx) => {
                              const pts = Array.isArray(block.points) && block.points.length > 0
                                ? block.points.filter((p) => p && p.trim().length > 0)
                                : block.notes
                                ? block.notes.split("\n").map((l) => l.replace(/^[•\-\*]\s*/, "").trim()).filter(Boolean)
                                : [];

                              return `
                                <div class="section-item">
                                  <div class="section-title-line">
                                    <span class="section-heading">${block.heading || "Section"}</span>
                                    ${block.verses ? `<span class="section-verses">(${block.verses})</span>` : ""}
                                  </div>
                                  ${
                                    pts.length > 0
                                      ? `
                                        <ul class="points-list">
                                          ${pts
                                            .map(
                                              (p) =>
                                                `<li>${(p || "")
                                                  .replace(/</g, "&lt;")
                                                  .replace(/>/g, "&gt;")}</li>`
                                            )
                                            .join("")}
                                        </ul>
                                      `
                                      : ""
                                  }
                                </div>
                              `;
                            })
                            .join("")
                    }
                  </div>

                  ${
                    chData.takeaway && chData.takeaway.trim()
                      ? `
                        <div class="takeaway-box">
                          <strong>Key Takeaway:</strong> <em>${chData.takeaway.replace(/</g, "&lt;")}</em>
                        </div>
                      `
                      : ""
                  }
                </div>
              `;
              }
            }
            return chHtml;
          })()}
        </div>
      </div>
    `;
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${docTitle}</title>
  <style>
    @page {
      size: letter;
      margin: 6mm 6mm 6mm 6mm;
    }
    @media print {
      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
        background: #fff !important;
        color: #000 !important;
        font-size: 9.5px !important;
        line-height: 1.25 !important;
        padding: 0 !important;
      }
      .page-break {
        page-break-before: always;
        break-before: page;
      }
      .no-break {
        page-break-inside: avoid;
        break-inside: avoid;
      }
      .no-print {
        display: none !important;
      }
    }
    * {
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #111827;
      background: #ffffff;
      line-height: 1.3;
      font-size: 10px;
      margin: 0;
      padding: 12px;
    }
    .print-banner {
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 8px 14px;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 11px;
    }
    .print-btn {
      background: #0f172a;
      color: #fff;
      border: none;
      padding: 5px 12px;
      border-radius: 4px;
      font-weight: 600;
      cursor: pointer;
      font-size: 11px;
      transition: opacity 0.2s;
    }
    .print-btn:hover {
      background: #1e293b;
    }
    .doc-header {
      text-align: center;
      margin-bottom: 8px;
    }
    .doc-header h1 {
      font-family: Georgia, serif;
      font-size: 16px;
      font-weight: 700;
      color: #000;
      margin: 0 0 2px 0;
    }
    .doc-subtitle {
      font-size: 10px;
      color: #4b5563;
      margin-bottom: 2px;
    }
    .doc-date {
      font-size: 9px;
      color: #6b7280;
      font-family: monospace;
    }
    .doc-divider {
      border: none;
      border-top: 1px solid #cbd5e1;
      margin: 6px 0 10px 0;
    }
    .book-container {
      margin-bottom: 12px;
    }
    .book-header {
      border-bottom: 1.5px solid #000;
      padding-bottom: 3px;
      margin-bottom: 6px;
    }
    .book-title-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 2px;
    }
    .book-title-group {
      display: flex;
      align-items: baseline;
      gap: 6px;
    }
    .book-title {
      font-family: Georgia, serif;
      font-size: 16px;
      font-weight: 700;
      color: #000;
      margin: 0;
    }
    .book-badge {
      font-size: 8.5px;
      font-family: monospace;
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      padding: 1px 5px;
      border-radius: 3px;
      color: #334155;
      font-weight: 600;
    }
    .book-meta {
      font-size: 9.5px;
      color: #475569;
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    .book-context {
      font-size: 9px;
      color: #334155;
      background: #f8fafc;
      border-left: 2.5px solid #64748b;
      padding: 2px 6px;
      border-radius: 0 3px 3px 0;
      margin-top: 2px;
      line-height: 1.2;
    }
    .book-summary-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 4px 8px;
      margin-bottom: 6px;
      font-size: 9.5px;
      line-height: 1.25;
    }
    .section-badge {
      font-size: 8.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #0f766e;
      margin-right: 4px;
    }
    .summary-text {
      color: #1e293b;
    }
    .chapter-card {
      border: 1.5px solid #94a3b8;
      border-radius: 4px;
      background: #ffffff;
      padding: 0;
      margin-bottom: 8px;
      break-inside: avoid;
      page-break-inside: avoid;
      overflow: hidden;
    }
    .chapter-bar {
      display: flex;
      align-items: center;
      background: #f1f5f9;
      border-bottom: 1.5px solid #94a3b8;
      padding: 3px 8px;
    }
    .chapter-number {
      font-family: Georgia, serif;
      font-weight: 700;
      font-size: 11px;
      color: #0f172a;
    }
    .chapter-sections-list {
      padding: 4px 6px;
    }
    .section-item {
      padding: 4px 2px;
      border-bottom: 1px solid #cbd5e1;
    }
    .section-item:last-child {
      border-bottom: none;
    }
    .section-title-line {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 9.5px;
      margin-bottom: 1px;
    }
    .section-num {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 13px;
      height: 13px;
      background: #e2e8f0;
      border: 1px solid #cbd5e1;
      border-radius: 2px;
      font-size: 8px;
      font-family: monospace;
      color: #334155;
      font-weight: bold;
      flex-shrink: 0;
    }
    .section-heading {
      font-family: Georgia, serif;
      font-weight: 700;
      color: #0f172a;
      font-size: 9.5px;
    }
    .section-verses {
      font-size: 8.5px;
      font-family: monospace;
      color: #475569;
    }
    .points-list {
      margin: 1px 0 2px 14px;
      padding: 0;
      list-style-type: disc;
    }
    .points-list li {
      font-size: 9px;
      color: #1e293b;
      margin-bottom: 1px;
      line-height: 1.25;
    }
    .no-points-hint, .empty-notes-hint {
      font-size: 8.5px;
      font-style: italic;
      color: #94a3b8;
      margin-left: 14px;
      margin-bottom: 1px;
    }
    .takeaway-box {
      margin: 2px 4px 4px 4px;
      font-size: 8.5px;
      background: #eff6ff;
      border-left: 2.5px solid #3b82f6;
      padding: 2px 6px;
      color: #1e40af;
      border-radius: 0 2px 2px 0;
      line-height: 1.2;
    }
    .grid-export-table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
      font-size: 9.5px;
      line-height: 1.3;
    }
    .grid-export-table td {
      padding: 4px 8px;
      vertical-align: top;
      border-bottom: 1px solid #94a3b8;
    }
    .grid-export-table tr:last-child td {
      border-bottom: none;
    }
    .grid-export-heading-cell {
      width: 36%;
      background: #f8fafc;
      border-right: 1.5px solid #94a3b8 !important;
    }
    .grid-verses-tag {
      font-size: 8.5px;
      font-family: monospace;
      color: #475569;
      margin-top: 1px;
    }
    .grid-export-points-cell {
      width: 64%;
      background: #ffffff;
    }
    .grid-export-points-cell .points-list {
      margin: 0;
      padding-left: 12px;
    }
    .grid-export-points-cell .no-points-hint {
      margin-left: 0;
    }
  </style>
</head>
<body>
  <div class="print-banner no-print">
    <div>
      <strong>Print & PDF Export:</strong> Use your browser's Print dialog to <strong>Save as PDF</strong> or print physical study notes.
    </div>
    <button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
  </div>
  ${bodyContent}
</body>
</html>
  `;
}

// Opens the formatted printable document in a new window and triggers print
export function printOrSaveToPDF(data, bookId = null, layout = "grid") {
  const html = exportToPrintableHTML(data, bookId, layout);
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    document.body.appendChild(iframe);
    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(html);
    doc.close();
    iframe.contentWindow.focus();
    setTimeout(() => {
      iframe.contentWindow.print();
      setTimeout(() => document.body.removeChild(iframe), 1500);
    }, 300);
    return;
  }
  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
  }, 300);
}
