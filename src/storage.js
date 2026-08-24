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

// Helper to export Book or full Bible Outline to clean Markdown format
export function exportToMarkdown(data, bookId = null) {
  const booksToExport = bookId ? [BIBLE_BOOKS.find((b) => b.id === bookId)].filter(Boolean) : BIBLE_BOOKS;

  let md = "";
  if (!bookId) {
    md += "# COMPLETE BIBLE OUTLINE & CHAPTER STUDY\n\n";
    md += `Generated from Bible Outline & Storyline Studio (${new Date().toLocaleDateString()})\n\n`;
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

      if (chData.takeaway && chData.takeaway.trim()) {
        md += `**Key Takeaway:** *${chData.takeaway}*\n\n`;
      }

      md += `---\n\n`;
    }
  });

  return md;
}

// Generates high-quality print-ready HTML for PDF export
export function exportToPrintableHTML(data, bookId = null) {
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
            <h1 class="book-title">${book.name}</h1>
            <span class="book-badge">${book.testament} • ${book.category}</span>
          </div>
          <div class="book-meta">
            <span><strong>Author:</strong> ${book.author}</span>
            <span><strong>Date:</strong> ${book.date}</span>
            <span><strong>Key Theme:</strong> ${book.keyTheme}</span>
          </div>
          <div class="book-context">
            <strong>Historical & Narrative Context:</strong> ${book.context}
          </div>
        </div>

        ${
          hasSummary
            ? `
              <div class="book-summary-box">
                <div class="section-badge">Overall Book Summary</div>
                <div class="summary-text">${(bookData.bookSummary || "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>")}</div>
              </div>
            `
            : ""
        }

        <div class="chapter-outlines-wrapper">
          <div class="chapters-header-row">
            <h2 class="chapters-title">Chapter Outlines</h2>
            <span class="chapters-count">${outlinedCount} of ${book.chapterCount} Chapters Outlined</span>
          </div>

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

              chHtml += `
                <div class="chapter-card no-break">
                  <div class="chapter-bar">
                    <span class="chapter-number">Chapter ${ch}</span>
                    <span class="chapter-ref">${book.shortName} ${ch}</span>
                  </div>

                  <div class="chapter-sections-list">
                    ${
                      blocks.length === 0
                        ? `<div class="empty-notes-hint">No notes recorded for this chapter.</div>`
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
                                    <span class="section-num">${hIdx + 1}</span>
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
                                      : `<div class="no-points-hint">No outline notes under this heading.</div>`
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
      margin: 15mm 15mm 15mm 15mm;
    }
    @media print {
      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
        background: #fff !important;
        color: #111 !important;
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
      color: #1f2937;
      background: #ffffff;
      line-height: 1.5;
      font-size: 13px;
      margin: 0;
      padding: 24px;
    }
    .print-banner {
      background: #f3f4f6;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      padding: 12px 16px;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .print-btn {
      background: #1e3a8a;
      color: #fff;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      font-weight: 600;
      cursor: pointer;
      font-size: 13px;
    }
    .print-btn:hover {
      background: #1e40af;
    }
    .doc-header {
      text-align: center;
      margin-bottom: 24px;
    }
    .doc-header h1 {
      font-family: Georgia, serif;
      font-size: 24px;
      font-weight: 700;
      color: #111827;
      margin: 0 0 4px 0;
    }
    .doc-subtitle {
      font-size: 13px;
      color: #4b5563;
      margin-bottom: 4px;
    }
    .doc-date {
      font-size: 11px;
      color: #6b7280;
      font-family: monospace;
    }
    .doc-divider {
      border: none;
      border-top: 2px solid #e5e7eb;
      margin: 20px 0 28px 0;
    }
    .book-container {
      margin-bottom: 36px;
    }
    .book-header {
      border-bottom: 2px solid #111827;
      padding-bottom: 10px;
      margin-bottom: 16px;
    }
    .book-title-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-bottom: 6px;
    }
    .book-title {
      font-family: Georgia, serif;
      font-size: 24px;
      font-weight: 700;
      color: #111827;
      margin: 0;
    }
    .book-badge {
      font-size: 11px;
      font-family: monospace;
      background: #f3f4f6;
      border: 1px solid #e5e7eb;
      padding: 2px 8px;
      border-radius: 4px;
      color: #4b5563;
      font-weight: 600;
    }
    .book-meta {
      font-size: 12px;
      color: #4b5563;
      display: flex;
      gap: 16px;
      margin-bottom: 8px;
    }
    .book-context {
      font-size: 12px;
      color: #374151;
      background: #f9fafb;
      border-left: 3px solid #9ca3af;
      padding: 6px 10px;
      border-radius: 0 4px 4px 0;
    }
    .book-summary-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 12px 14px;
      margin-bottom: 18px;
    }
    .section-badge {
      font-size: 10.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #0f766e;
      margin-bottom: 4px;
    }
    .summary-text {
      font-size: 12.5px;
      color: #334155;
      line-height: 1.55;
    }
    .chapters-header-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 6px;
      margin-bottom: 14px;
    }
    .chapters-title {
      font-family: Georgia, serif;
      font-size: 16px;
      font-weight: 700;
      color: #111827;
      margin: 0;
    }
    .chapters-count {
      font-size: 11.5px;
      color: #6b7280;
      font-family: monospace;
    }
    .chapter-card {
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      background: #ffffff;
      padding: 12px 14px;
      margin-bottom: 14px;
    }
    .chapter-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
      margin: -12px -14px 10px -14px;
      padding: 8px 14px;
      border-radius: 5px 5px 0 0;
    }
    .chapter-number {
      font-family: Georgia, serif;
      font-weight: 700;
      font-size: 14px;
      color: #1e293b;
    }
    .chapter-ref {
      font-family: monospace;
      font-size: 11px;
      color: #64748b;
    }
    .section-item {
      margin-bottom: 10px;
    }
    .section-item:last-child {
      margin-bottom: 0;
    }
    .section-title-line {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12.5px;
      margin-bottom: 3px;
    }
    .section-num {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 17px;
      height: 17px;
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      border-radius: 3px;
      font-size: 10px;
      font-family: monospace;
      color: #475569;
      font-weight: bold;
    }
    .section-heading {
      font-family: Georgia, serif;
      font-weight: 600;
      color: #0f172a;
    }
    .section-verses {
      font-size: 11px;
      font-family: monospace;
      color: #64748b;
    }
    .points-list {
      margin: 2px 0 6px 26px;
      padding: 0;
      list-style-type: disc;
    }
    .points-list li {
      font-size: 12.5px;
      color: #334155;
      margin-bottom: 2px;
      line-height: 1.45;
    }
    .no-points-hint, .empty-notes-hint {
      font-size: 11px;
      font-style: italic;
      color: #94a3b8;
      margin-left: 26px;
      margin-bottom: 4px;
    }
    .takeaway-box {
      margin-top: 8px;
      font-size: 11.5px;
      background: #eff6ff;
      border-left: 3px solid #3b82f6;
      padding: 6px 10px;
      color: #1e40af;
      border-radius: 0 4px 4px 0;
    }
  </style>
</head>
<body>
  <div class="print-banner no-print">
    <div>
      <strong>Print & PDF Export:</strong> Use your browser's Print dialog to <strong>Save as PDF</strong> or print physical notes.
    </div>
    <button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
  </div>
  ${bodyContent}
</body>
</html>
  `;
}

// Opens the formatted printable document in a new window and triggers print
export function printOrSaveToPDF(data, bookId = null) {
  const html = exportToPrintableHTML(data, bookId);
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
