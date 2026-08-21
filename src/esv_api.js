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

// Formats ESV text into clean HTML segments with interactive verse markers
export function formatESVTextToHTML(rawText) {
  if (!rawText) return "";

  const lines = rawText.split("\n");
  const formatted = lines
    .map((line) => {
      const t = line.trim();
      if (!t) return `<div class="h-2"></div>`;

      // Check if it's a section heading (no verse bracket e.g. "The Creation of the World")
      if (!t.startsWith("[") && t.length < 75 && !t.match(/^\d/)) {
        return `<h4 class="font-serif font-bold text-[#DBCFB3] text-base pt-4 pb-1 tracking-tight">${t}</h4>`;
      }

      // Clean verse numbers [1], [2], [14]
      const withFormattedVerses = t.replace(/\[(\d+)\]/g, (match, vNum) => {
        return `<span class="inline-block font-mono text-xs text-[#C4B79C] mr-1.5 select-none font-medium"><sup>${vNum}</sup></span>`;
      });

      return `<p class="font-reader text-[15.5px] leading-[1.85] text-[#ECE9E0] mb-3">${withFormattedVerses}</p>`;
    })
    .join("");

  return formatted;
}

// Extracts ESV section headings and their verse ranges from raw ESV API text
export function extractESVHeadings(rawText, canonicalTitle = "") {
  if (!rawText) {
    return [{ heading: "Chapter Overview", verses: "", notes: "" }];
  }

  const lines = rawText.split("\n");
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

    // Check if line is an ESV Section Heading (not indented, no brackets)
    if (!line.startsWith(" ") && !line.includes("[") && !line.includes("]") && trimmed.length > 2) {
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

