import { BIBLE_ERAS, BIBLE_BOOKS, getBookById } from "../../data/bible_catalog.js";

export function renderBiblePlotView({ selectedEraId, onSelectEra, onSelectBook, data }) {
  // Compute progress per era
  const eraProgress = {};
  BIBLE_ERAS.forEach((era) => {
    let completedCh = 0;
    let totalCh = 0;
    era.bookIds.forEach((bId) => {
      const b = getBookById(bId);
      if (!b) return;
      totalCh += b.chapterCount;
      for (let c = 1; c <= b.chapterCount; c++) {
        const chData = data.chapters[`${b.id}-${c}`];
        const hasHeadingContent =
          Array.isArray(chData?.headingBlocks) &&
          chData.headingBlocks.some(
            (bk) =>
              (bk.notes && bk.notes.trim().length > 0) ||
              (Array.isArray(bk.points) && bk.points.some((p) => p && p.trim().length > 0))
          );
        const hasLegacyContent = Boolean((chData?.notes || "").trim() || (chData?.chapterTitle || "").trim() || (chData?.sections || []).length > 0);
        const hasTakeaway = Boolean((chData?.takeaway || "").trim());
        if (chData && (chData.status === "completed" || hasHeadingContent || hasLegacyContent || hasTakeaway)) {
          completedCh++;
        }
      }
    });
    eraProgress[era.id] = { completedCh, totalCh, pct: totalCh > 0 ? Math.round((completedCh / totalCh) * 100) : 0 };
  });

  return `
    <div class="max-w-6xl mx-auto p-8 space-y-8 text-stone-100">
      <!-- Top Banner -->
      <div class="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 border border-stone-700/80 rounded-2xl p-7 shadow-xl relative overflow-hidden">
        <div class="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div class="max-w-3xl space-y-2.5">
          <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <span>Redemptive History Arc</span>
            <span>•</span>
            <span>8 Acts of Scripture</span>
          </div>
          <h1 class="font-serif text-3xl md:text-4xl font-bold text-white tracking-tight">
            The Overarching Story & Plot of the Bible
          </h1>
          <p class="text-stone-300 text-sm md:text-base leading-relaxed">
            The Bible is not a disconnected collection of rules or ancient stories—it is one unified historical narrative leading to Jesus Christ. Here you can explore the 8 Acts of the Biblical Plot, trace key covenants, and click into any book to view your chapter outlines and book summaries.
          </p>
        </div>

        <!-- Horizontal Timeline Bar -->
        <div class="mt-6 pt-4 border-t border-stone-700/60 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5">
          ${BIBLE_ERAS.map((era, idx) => {
            const isSelected = selectedEraId === era.id || (!selectedEraId && idx === 0);
            const prog = eraProgress[era.id];
            return `
              <button
                data-era-id="${era.id}"
                class="era-tab-btn text-left p-2 rounded-lg border transition ${
                  isSelected
                    ? "bg-amber-500/20 border-amber-500/60 text-amber-300 shadow"
                    : "bg-stone-950/60 border-stone-800 hover:border-stone-700 text-stone-400"
                }"
              >
                <div class="text-[10px] font-mono uppercase tracking-wider text-amber-400/80">Act ${idx + 1}</div>
                <div class="font-serif font-bold text-xs text-stone-100 line-clamp-1 mt-0.5">${era.title.split(". ")[1]}</div>
                <div class="text-[10px] text-stone-400 mt-1 flex items-center justify-between">
                  <span>${prog.completedCh}/${prog.totalCh}ch</span>
                  <span class="font-mono">${prog.pct}%</span>
                </div>
              </button>
            `;
          }).join("")}
        </div>
      </div>

      <!-- Main Era Details Section -->
      ${(() => {
        const currentEra = BIBLE_ERAS.find((e) => e.id === selectedEraId) || BIBLE_ERAS[0];
        const prog = eraProgress[currentEra.id];
        const eraBooks = currentEra.bookIds.map((bid) => getBookById(bid)).filter(Boolean);

        return `
          <div class="bg-stone-900 border border-stone-800 rounded-2xl p-7 shadow-lg space-y-6">
            <!-- Era Header -->
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-5">
              <div>
                <span class="text-xs font-mono uppercase tracking-widest text-amber-400">
                  ${currentEra.timeframe}
                </span>
                <h2 class="font-serif text-2xl md:text-3xl font-bold text-stone-100 mt-1">
                  ${currentEra.title}
                </h2>
                <p class="text-stone-400 text-sm mt-0.5">${currentEra.subtitle}</p>
              </div>
              <div class="flex items-center gap-4 bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 shrink-0">
                <div>
                  <div class="text-[11px] text-stone-400">Era Outline Progress</div>
                  <div class="text-base font-bold text-amber-400">${prog.completedCh} of ${prog.totalCh} chapters</div>
                </div>
                <div class="w-12 h-12 rounded-full border-4 border-stone-800 flex items-center justify-center font-mono text-xs font-bold text-emerald-400">
                  ${prog.pct}%
                </div>
              </div>
            </div>

            <!-- Era Plot Summary & Key Turning Points -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div class="lg:col-span-2 bg-stone-950/70 border border-stone-800 rounded-xl p-5 space-y-3">
                <h3 class="text-xs font-mono uppercase tracking-wider text-stone-400 flex items-center gap-2">
                  <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span>Era Storyline Overview</span>
                </h3>
                <p class="text-stone-200 text-sm md:text-base leading-relaxed">
                  ${currentEra.summary}
                </p>
              </div>

              <!-- Key Turning Points List -->
              <div class="bg-stone-950/70 border border-stone-800 rounded-xl p-5 space-y-3">
                <h3 class="text-xs font-mono uppercase tracking-wider text-amber-400">
                  Key Narrative Events
                </h3>
                <ul class="space-y-2">
                  ${currentEra.keyTurningPoints
                    .map(
                      (tp) => `
                        <li class="flex items-start gap-2 text-xs text-stone-300">
                          <span class="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
                          <span>${tp}</span>
                        </li>
                      `
                    )
                    .join("")}
                </ul>
              </div>
            </div>

            <!-- Books belonging to this Act -->
            <div class="space-y-3 pt-2">
              <h3 class="text-xs font-mono uppercase tracking-wider text-stone-400">
                Books in this Era (${eraBooks.length} Books) — Click any book to inspect its Book Summary & Chapter Outlines
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                ${eraBooks
                  .map((b) => {
                    let cOutlined = 0;
                    for (let ch = 1; ch <= b.chapterCount; ch++) {
                      const cData = data.chapters[`${b.id}-${ch}`];
                      if (cData && (cData.status === "completed" || cData.notes.trim() || cData.chapterTitle.trim() || cData.sections.length > 0)) {
                        cOutlined++;
                      }
                    }
                    const bSummary = data.books[b.id]?.bookSummary?.trim();

                    return `
                      <button
                        data-book-id="${b.id}"
                        class="era-book-card text-left bg-stone-950/90 hover:bg-stone-800/80 border border-stone-800 hover:border-amber-500/50 rounded-xl p-4 transition group flex flex-col justify-between space-y-2"
                      >
                        <div class="flex items-start justify-between">
                          <div>
                            <span class="text-[10px] font-mono uppercase tracking-wider text-amber-400">
                              ${b.category}
                            </span>
                            <h4 class="font-serif text-lg font-bold text-stone-100 group-hover:text-amber-300 transition">
                              ${b.name}
                            </h4>
                          </div>
                          <span class="text-xs font-mono px-2 py-0.5 rounded bg-stone-800 text-stone-300 border border-stone-700">
                            ${b.chapterCount} ch
                          </span>
                        </div>

                        <p class="text-xs text-stone-400 line-clamp-2">
                          ${b.keyTheme}
                        </p>

                        <div class="pt-2 border-t border-stone-800/80 flex items-center justify-between text-xs">
                          <span class="flex items-center gap-1.5">
                            ${
                              bSummary
                                ? `<span class="w-2 h-2 rounded-full bg-amber-400" title="Book Summary Written"></span><span class="text-amber-400 font-medium">Book Summary Written</span>`
                                : `<span class="text-stone-500">Summary needed</span>`
                            }
                          </span>
                          <span class="font-mono ${
                            cOutlined === b.chapterCount
                              ? "text-emerald-400"
                              : cOutlined > 0
                              ? "text-amber-300"
                              : "text-stone-500"
                          }">
                            ${cOutlined}/${b.chapterCount} ch outlined
                          </span>
                        </div>
                      </button>
                    `;
                  })
                  .join("")}
              </div>
            </div>
          </div>
        `;
      })()}
    </div>
  `;
}
