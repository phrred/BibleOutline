// ESV Bible API v3 Integration
// Authorization Token provided by user

export const ESV_API_TOKEN = "60e86cf50aef5557ba669dbc6847792196909d81";

export async function fetchESVChapter(bookName, chapterNumber) {
  const query = encodeURIComponent(`${bookName} ${chapterNumber}`);
  const url = `https://api.esv.org/v3/passage/text/?q=${query}&include-footnotes=false&include-headings=true&include-short-copyright=false&include-passage-references=false`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Token ${ESV_API_TOKEN}`,
      "Accept": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`ESV API returned HTTP ${response.status}`);
  }

  const data = await response.json();
  if (data && data.passages && data.passages.length > 0) {
    let text = data.passages[0].trim();
    // Clean up trailing copyright line if present
    text = text.replace(/The Holy Bible, English Standard Version.*/is, "").trim();
    return text;
  }
  return "";
}

function escapeHTML(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Classifies a line of ESV API v3 passage text so headers between verses are
 * never mistaken for verse continuation text:
 * - "blank": empty or whitespace-only line
 * - "verse": line containing one or more [N] verse markers
 * - "speaker": dramatic speaker rubric (e.g. "She", "He", "Others" in Song of Solomon)
 * - "heading": section heading, acrostic stanza header, book division, superscription/colophon, or editorial note
 * - "verse_continuation": indented prose/poetry continuation belonging to the active verse
 */
export function classifyESVLine(lines, index) {
  const line = lines[index] ?? "";
  const t = line.trim();
  if (!t) return "blank";

  // Any line containing a [N] verse number marker is scripture text
  if (/\[\d+\]/.test(t)) return "verse";

  const indent = line.length - line.trimStart().length;

  // Unindented lines (< 2 leading spaces) without [N] are always headings, superscriptions, or editorial notes
  if (indent < 2) return "heading";

  const prevIsBlank = index === 0 || lines[index - 1].trim() === "";
  const nextIsBlank = index === lines.length - 1 || lines[index + 1].trim() === "";

  // ESV API v3 carries 4-space poetry indentation onto headings/rubrics that follow poetic lines
  // (whereas prose continuations use 2 or 6 spaces and doxologies/declarations use 30+ spaces).
  if (prevIsBlank && nextIsBlank && indent === 4) {
    // Live ESV API v3 resets the line immediately following a section/acrostic/book heading to ""
    if (index + 1 < lines.length && lines[index + 1] === "" && !/^["“‘']/.test(t)) {
      return "heading";
    }
    // Dramatic speaker rubrics in Song of Solomon (followed by '    ' blank line, may occur mid-verse)
    if (/^(She|He|Others)$/.test(t)) {
      return "speaker";
    }
    // Musical colophons at the end of poetic chapters (e.g. Habakkuk 3:19)
    if (/^To the choirmaster\b/i.test(t)) {
      return "heading";
    }
    // Fallback for whitespace-trimmed text: standalone heading without opening quote or terminal clause punctuation
    if (!/^["“‘']/.test(t) && !/[.,;?!—\-:"”’')]$/.test(t)) {
      return "heading";
    }
  }

  return "verse_continuation";
}

// Extract plain ESV text for a single verse or contiguous verse range [startVerse..endVerse]
export function extractVersesText(rawText, startVerse, endVerse = startVerse) {
  if (!rawText || !startVerse) return "";
  const s = parseInt(startVerse, 10);
  const e = parseInt(endVerse || startVerse, 10);
  if (isNaN(s) || isNaN(e)) return "";

  const lines = rawText.replace(/\r/g, "").split("\n");
  let activeVerseNum = null;
  const collected = [];

  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx];
    const t = line.trim();
    if (!t) continue;

    const lineType = classifyESVLine(lines, idx);
    if (lineType === "heading") {
      activeVerseNum = null;
      continue;
    }
    if (lineType === "speaker") {
      continue;
    }

    const parts = t.split(/(\[\d+\])/g);
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (!part) continue;
      const m = part.match(/^\[(\d+)\]$/);
      if (m) {
        activeVerseNum = parseInt(m[1], 10);
      } else if (activeVerseNum !== null && activeVerseNum >= s && activeVerseNum <= e) {
        collected.push(part.trim());
      }
    }
  }

  return collected.join(" ").replace(/\s+/g, " ").trim();
}

// Formats ESV text into clean HTML segments with interactive verse markers, highlights, and notes
export function formatESVTextToHTML(rawText, options = {}) {
  if (!rawText) return "";

  const {
    highlights = [],
    verseNotes = [],
    selectedVerses = [],
    showNotesInline = false,
    interactive = false
  } = options || {};

  const highlightSet = new Set((Array.isArray(highlights) ? highlights : []).map((n) => parseInt(n, 10)));
  const selectedSet = new Set((Array.isArray(selectedVerses) ? selectedVerses : []).map((n) => parseInt(n, 10)));
  const notesByStartVerse = new Map();
  if (Array.isArray(verseNotes)) {
    verseNotes.forEach((n) => {
      if (!n || !n.text || !n.text.trim()) return;
      const sv = parseInt(n.startVerse, 10);
      if (isNaN(sv)) return;
      if (!notesByStartVerse.has(sv)) notesByStartVerse.set(sv, []);
      notesByStartVerse.get(sv).push(n);
    });
  }

  const buildVerseClasses = (vNum) => {
    const cls = ["esv-verse-segment"];
    if (interactive) cls.push("esv-verse-interactive");
    if (highlightSet.has(vNum)) cls.push("esv-verse-highlighted");
    if (selectedSet.has(vNum)) cls.push("esv-verse-selected");
    return cls.join(" ");
  };

  const seenVerses = new Set();
  let activeVerseNum = null;

  const lines = rawText.replace(/\r/g, "").split("\n");
  const formatted = lines
    .map((line, lineIdx) => {
      const t = line.trim();
      if (!t) return `<div class="h-2"></div>`;

      const lineType = classifyESVLine(lines, lineIdx);
      if (lineType === "heading") {
        activeVerseNum = null;
        return `<h4 class="esv-section-heading font-serif font-bold text-[#DBCFB3] text-base pt-4 pb-1 tracking-tight select-none">${escapeHTML(t)}</h4>`;
      }
      if (lineType === "speaker") {
        return `<div class="esv-section-heading font-serif italic text-[#C4B79C] text-sm pt-2 pb-0.5 tracking-wide select-none">${escapeHTML(t)}</div>`;
      }

      const parts = t.split(/(\[\d+\])/g);
      const renderedSegments = [];
      const inlineNotesForParagraph = [];

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (!part) continue;

        const vMatch = part.match(/^\[(\d+)\]$/);
        if (vMatch) {
          const vNum = parseInt(vMatch[1], 10);
          activeVerseNum = vNum;
          const nextText = (i + 1 < parts.length && !/^\[\d+\]$/.test(parts[i + 1])) ? parts[++i] : "";
          const isFirst = !seenVerses.has(vNum);
          seenVerses.add(vNum);

          const idAttr = isFirst ? ` id="esv-verse-${vNum}"` : "";
          const anchoredNotes = isFirst ? (notesByStartVerse.get(vNum) || []) : [];
          if (anchoredNotes.length > 0 && showNotesInline) {
            inlineNotesForParagraph.push(...anchoredNotes);
          }

          const badgesHTML = anchoredNotes
            .map((note) => {
              const rangeStr = note.endVerse && note.endVerse > note.startVerse ? ` v${note.startVerse}–${note.endVerse}` : "";
              const preview = escapeHTML(note.text.trim());
              return `<button type="button" data-verse-note-badge="${escapeHTML(note.id)}" data-verse="${vNum}" title="${preview}" class="esv-verse-note-badge inline-flex items-center gap-0.5 align-baseline mr-1 px-1 py-0.2 rounded text-[11px] font-sans leading-tight cursor-pointer select-none"><span>📝</span>${rangeStr ? `<span class="font-mono text-[10px]">${rangeStr.trim()}</span>` : ""}</button>`;
            })
            .join("");

          renderedSegments.push(
            `<span${idAttr} data-verse="${vNum}" class="${buildVerseClasses(vNum)}"><span class="inline-block font-mono text-xs text-[#C4B79C] mr-1 select-none font-medium"><sup>${vNum}</sup></span>${badgesHTML}${escapeHTML(nextText.replace(/^\s+/, ""))}</span>`
          );
        } else if (activeVerseNum !== null) {
          renderedSegments.push(
            `<span data-verse="${activeVerseNum}" class="${buildVerseClasses(activeVerseNum)}">${escapeHTML(part)}</span>`
          );
        } else {
          renderedSegments.push(escapeHTML(part));
        }
      }

      const inlineNotesHTML =
        showNotesInline && inlineNotesForParagraph.length > 0
          ? `<div class="space-y-1.5 mb-3 mt-1 select-none">${inlineNotesForParagraph
              .map((note) => {
                const refLabel =
                  note.endVerse && note.endVerse > note.startVerse
                    ? `v${note.startVerse}–${note.endVerse}`
                    : `v${note.startVerse}`;
                return `
                  <div
                    data-inline-verse-note="${escapeHTML(note.id)}"
                    data-verse="${note.startVerse}"
                    class="esv-inline-note-card flex items-start justify-between gap-2 px-3 py-2 rounded-lg text-xs font-sans cursor-pointer transition"
                    title="Click to edit verse note"
                  >
                    <div class="space-y-0.5 min-w-0 flex-1">
                      <span class="font-mono text-[10px] uppercase tracking-wider text-[#C4B79C] font-semibold">📝 Note • ${refLabel}</span>
                      <p class="text-[#EAE8E2] leading-relaxed whitespace-pre-wrap break-words">${escapeHTML(note.text)}</p>
                    </div>
                    <span class="text-[10px] text-[#8C8A84] shrink-0">Edit</span>
                  </div>
                `;
              })
              .join("")}</div>`
          : "";

      return `<p class="font-reader text-[15.5px] leading-[1.85] text-[#ECE9E0] mb-3">${renderedSegments.join(" ")}</p>${inlineNotesHTML}`;
    })
    .join("");

  return formatted;
}

// Extracts ESV section headings and their verse ranges from raw ESV API text
export function extractESVHeadings(rawText, canonicalTitle = "") {
  if (!rawText) {
    return [{ heading: "Chapter Overview", verses: "", notes: "" }];
  }

  const lines = rawText.replace(/\r/g, "").split("\n");
  const extracted = [];
  let currentHeading = null;
  let firstVerseInHeading = null;
  let lastVerseSeen = null;

  const isCanonicalTitleLine = (line) => {
    const t = line.trim();
    if (canonicalTitle && t.toLowerCase() === canonicalTitle.toLowerCase()) return true;
    // Matches e.g. "Genesis 1", "1 Samuel 12", "Song of Solomon 3"
    return /^[A-Za-z0-9\s]+\s+\d+$/.test(t) && t.length < 25;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Check for verse brackets e.g. [1], [14]
    const verseMatches = [...line.matchAll(/\[(\d+)\]/g)];
    if (verseMatches.length > 0) {
      const firstNum = parseInt(verseMatches[0][1], 10);
      const lastNum = parseInt(verseMatches[verseMatches.length - 1][1], 10);
      if (!firstVerseInHeading) {
        firstVerseInHeading = firstNum;
      }
      lastVerseSeen = lastNum;
      continue;
    }

    // Skip canonical chapter header line (e.g. "Genesis 1")
    if (isCanonicalTitleLine(trimmed)) {
      continue;
    }

    // Check if line is an ESV Section Heading (including headings following poetic blocks)
    const isColophonAfterVerses = lastVerseSeen !== null && /^To the choirmaster\b/i.test(trimmed);
    if (
      classifyESVLine(lines, i) === "heading" &&
      !trimmed.includes("[") &&
      !trimmed.includes("]") &&
      !isColophonAfterVerses &&
      trimmed.length > 2
    ) {
      if (currentHeading) {
        let vRange = "";
        if (firstVerseInHeading && lastVerseSeen) {
          vRange = firstVerseInHeading === lastVerseSeen ? `v${firstVerseInHeading}` : `v${firstVerseInHeading}–${lastVerseSeen}`;
        }
        extracted.push({
          heading: currentHeading,
          verses: vRange,
          notes: ""
        });
      }
      currentHeading = trimmed;
      firstVerseInHeading = null;
    }
  }

  // Push the final heading
  if (currentHeading) {
    let vRange = "";
    if (firstVerseInHeading && lastVerseSeen) {
      vRange = firstVerseInHeading === lastVerseSeen ? `v${firstVerseInHeading}` : `v${firstVerseInHeading}–${lastVerseSeen}`;
    }
    extracted.push({
      heading: currentHeading,
      verses: vRange,
      notes: ""
    });
  }

  // If chapter had no internal section headings, provide a default heading covering all verses
  if (extracted.length === 0) {
    let vRange = "";
    if (firstVerseInHeading && lastVerseSeen) {
      vRange = firstVerseInHeading === lastVerseSeen ? `v${firstVerseInHeading}` : `v${firstVerseInHeading}–${lastVerseSeen}`;
    }
    extracted.push({
      heading: canonicalTitle || "Chapter Overview",
      verses: vRange,
      notes: ""
    });
  }

  return extracted;
}

