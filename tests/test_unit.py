"""
Unit Test Suite for Bible Outline & Storyline Studio
Tests pure logic, data structures, parsers, quiz engine, and storage serialization.
"""

import sys
import os
import json
import time

class UnitTester:
    def __init__(self, cdp_client):
        self.cdp = cdp_client

    def eval_js(self, expression):
        res = self.cdp.evaluate(expression)
        return res

    def run_all(self):
        tests = [
            ("Bible Catalog Integrity (66 Books, 1189 Chapters, 8 Eras)", self.test_catalog_integrity),
            ("ESV Parser & Heading Extraction", self.test_esv_parser),
            ("Diagnostic Quiz Engine & Scope Matching", self.test_quiz_engine),
            ("Testament & Genre Scoped Diagnostic Assessments", self.test_diagnostic_scopes),
            ("Comprehensive 66-Book Major Events & Chapter Quiz Bank", self.test_all_66_books_chapter_event_questions),
            ("Storage & Option A Subcollection Serialization", self.test_storage_serialization),
            ("Deep Merge & Local Storage Scaffolding", self.test_storage_scaffolding),
            ("Markdown & PDF Exporter Integrity", self.test_markdown_and_pdf_export),
            ("Question Flag Modal & Categories Integrity", self.test_flag_question_modal),
            ("Dynamic Random Heading Quiz Generation", self.test_dynamic_random_heading_generation),
            ("Chapter Group CRUD, Validation & Export", self.test_chapter_groups),
            ("Acts2-Style 66-Book Free-Answer ESV Quiz Bank & Normalization", self.test_acts2_free_answer_66_books),
            ("Verse Highlights, Range Notes, Search Index & Cloud Merge", self.test_verse_highlights_and_notes)
        ]

        results = []
        for name, fn in tests:
            start = time.time()
            try:
                fn()
                dur = time.time() - start
                results.append((name, True, f"{dur:.3f}s", None))
            except AssertionError as e:
                dur = time.time() - start
                results.append((name, False, f"{dur:.3f}s", str(e)))
            except Exception as e:
                dur = time.time() - start
                results.append((name, False, f"{dur:.3f}s", f"Exception: {str(e)}"))

        return results

    def test_catalog_integrity(self):
        js = """
        (() => {
            const books = BIBLE_BOOKS;
            const eras = BIBLE_ERAS;
            const totalChapters = books.reduce((sum, b) => sum + b.chapterCount, 0);
            const otCount = books.filter(b => b.testament === 'OT').length;
            const ntCount = books.filter(b => b.testament === 'NT').length;
            const gen = getBookById('GEN');
            const rev = getBookById('REV');

            return {
                bookCount: books.length,
                totalChapters,
                otCount,
                ntCount,
                eraCount: eras.length,
                genName: gen ? gen.name : null,
                revName: rev ? rev.name : null
            };
        })()
        """
        r = self.eval_js(js)
        assert r.get("bookCount") == 66, f"Expected 66 books, got {r.get('bookCount')}"
        assert r.get("otCount") == 39, f"Expected 39 OT books, got {r.get('otCount')}"
        assert r.get("ntCount") == 27, f"Expected 27 NT books, got {r.get('ntCount')}"
        assert r.get("totalChapters") == 1189, f"Expected 1,189 chapters, got {r.get('totalChapters')}"
        assert r.get("eraCount") == 8, f"Expected 8 Biblical Eras, got {r.get('eraCount')}"
        assert r.get("genName") == "Genesis", "Genesis metadata missing"
        assert r.get("revName") == "Revelation", "Revelation metadata missing"

    def test_esv_parser(self):
        js = """
        (() => {
            const sampleText = `The Creation of the World\\n\\n [1] In the beginning, God created the heavens and the earth. [2] And the earth was without form...\\n\\nThe Seventh Day, God Rests\\n\\n [1] Thus the heavens and the earth were finished...`;
            const headings = extractESVHeadings(sampleText, "Genesis 1");
            const formattedHTML = formatESVTextToHTML(sampleText);

            return {
                headingsLength: headings.length,
                h0: headings[0] ? headings[0].heading : null,
                h1: headings[1] ? headings[1].heading : null,
                hasSupTag: formattedHTML.includes('<sup')
            };
        })()
        """
        r = self.eval_js(js)
        assert r.get("headingsLength") == 2, f"Expected 2 extracted headings, got {r.get('headingsLength')}"
        assert r.get("h0") == "The Creation of the World", f"Unexpected first heading: {r.get('h0')}"
        assert r.get("h1") == "The Seventh Day, God Rests", f"Unexpected second heading: {r.get('h1')}"
        assert r.get("hasSupTag") == True, "Formatted ESV HTML should contain superscript verse numbers"

    def test_quiz_engine(self):
        js = """
        (() => {
            const session = new DiagnosticSession({ scope: 'ALL', questionCount: 10 });
            const qCount = session.questions.length;
            const q1 = session.getCurrentQuestion();
            
            // Submit an answer and advance
            session.submitCurrentAnswer(q1.correctAnswer || "A");
            session.nextQuestion();
            const idxAfter = session.currentIndex;

            const scorecard = session.finishExam();

            return {
                qCount,
                hasPrompt: Boolean(q1 && q1.prompt),
                idxAfter,
                scorecardTotal: scorecard.totalQuestions,
                scorecardCorrect: scorecard.totalCorrect,
                scorecardPct: scorecard.overallPct,
                hasGenreBreakdown: typeof scorecard.byGenre === 'object',
                hasTestamentBreakdown: typeof scorecard.byTestament === 'object'
            };
        })()
        """
        r = self.eval_js(js)
        assert r.get("qCount") == 10, f"Expected 10 quiz questions, got {r.get('qCount')}"
        assert r.get("hasPrompt") == True, "Quiz question prompt missing"
        assert r.get("idxAfter") == 1, f"Expected current index 1 after nextQuestion, got {r.get('idxAfter')}"
        assert r.get("scorecardTotal") == 10, "Scorecard total questions mismatch"
        assert r.get("hasGenreBreakdown") == True, "Scorecard genre breakdown missing"
        assert r.get("hasTestamentBreakdown") == True, "Scorecard testament breakdown missing"

    def test_diagnostic_scopes(self):
        js = """
        (() => {
            const otSession = new DiagnosticSession({ scope: 'OT', questionCount: 25 });
            const ntSession = new DiagnosticSession({ scope: 'NT', questionCount: 25 });
            const gospelsSession = new DiagnosticSession({ scope: 'GOSPELS', questionCount: 10 });
            
            // Test evaluating specific NT question (nt_q1: John the Baptist)
            const qJohn = CURATED_QUESTION_BANK.find(q => q.id === "nt_q1");
            const evalJohn = qJohn ? evaluateAnswer(qJohn, "John the Baptist").isCorrect : false;
            const evalWrong = qJohn ? evaluateAnswer(qJohn, "Barnabas").isCorrect : true;

            // Test evaluating specific chapter question (nt_q2: Luke 10)
            const qLuke10 = CURATED_QUESTION_BANK.find(q => q.id === "nt_q2");
            const evalLuke10Num = qLuke10 ? evaluateAnswer(qLuke10, "10").isCorrect : false;
            const evalLuke10Full = qLuke10 ? evaluateAnswer(qLuke10, "Luke 10").isCorrect : false;

            return {
                otCount: otSession.questions.length,
                allOT: otSession.questions.every(q => q.scope === 'OT'),
                ntCount: ntSession.questions.length,
                allNT: ntSession.questions.every(q => q.scope === 'NT'),
                gospelsCount: gospelsSession.questions.length,
                allGospels: gospelsSession.questions.every(q => q.genre === 'Gospels'),
                evalJohn,
                evalWrong,
                evalLuke10Num,
                evalLuke10Full
            };
        })()
        """
        r = self.eval_js(js)
        assert r.get("otCount") == 25, f"Expected 25 OT questions, got {r.get('otCount')}"
        assert r.get("allOT") == True, "Expected all questions in OT session to have scope 'OT'"
        assert r.get("ntCount") == 25, f"Expected 25 NT questions, got {r.get('ntCount')}"
        assert r.get("allNT") == True, "Expected all questions in NT session to have scope 'NT'"
        assert r.get("gospelsCount") == 10, f"Expected 10 Gospels questions, got {r.get('gospelsCount')}"
        assert r.get("allGospels") == True, "Expected all questions in Gospels session to have genre 'Gospels'"
        assert r.get("evalJohn") == True, "Expected 'John the Baptist' to be evaluated as correct for nt_q1"
        assert r.get("evalWrong") == False, "Expected 'Barnabas' to be evaluated as incorrect for nt_q1"
        assert r.get("evalLuke10Num") == True, "Expected '10' to be evaluated as correct for Luke 10"
        assert r.get("evalLuke10Full") == True, "Expected 'Luke 10' to be evaluated as correct for Luke 10"

    def test_all_66_books_chapter_event_questions(self):
        js = """
        (() => {
            const allBooks = BIBLE_BOOKS;
            const bookCoverage = {};
            let missingBooks = [];
            let totalQuestions = CURATED_QUESTION_BANK.length;

            for (const b of allBooks) {
                const bookQs = CURATED_QUESTION_BANK.filter(q => q.bookId === b.id);
                bookCoverage[b.id] = bookQs.length;
                if (bookQs.length < 3) {
                    missingBooks.push({ id: b.id, name: b.name, count: bookQs.length });
                }
            }

            // Test evaluating specific chapter questions across testaments
            const qGen3 = CURATED_QUESTION_BANK.find(q => q.id === "ch_gen_3");
            const evalGen3Num = qGen3 ? evaluateAnswer(qGen3, "3").isCorrect : false;
            const evalGen3Full = qGen3 ? evaluateAnswer(qGen3, "Genesis 3").isCorrect : false;
            const evalGen3Ch = qGen3 ? evaluateAnswer(qGen3, "Chapter 3").isCorrect : false;

            const qActs2 = CURATED_QUESTION_BANK.find(q => q.id === "ch_act_2");
            const evalActs2 = qActs2 ? evaluateAnswer(qActs2, "2").isCorrect : false;

            const qRev21 = CURATED_QUESTION_BANK.find(q => q.id === "ch_rev_21");
            const evalRev21 = qRev21 ? evaluateAnswer(qRev21, "Revelation 21").isCorrect : false;

            // Test evaluating major chapter heading questions
            const qHdgGen12 = CURATED_QUESTION_BANK.find(q => q.id === "hdg_gen_12");
            const evalHdgGen12Num = qHdgGen12 ? evaluateAnswer(qHdgGen12, "12").isCorrect : false;
            const evalHdgGen12Full = qHdgGen12 ? evaluateAnswer(qHdgGen12, "Genesis 12").isCorrect : false;

            const qHdg1Co13 = CURATED_QUESTION_BANK.find(q => q.id === "hdg_1co_13");
            const evalHdg1Co13 = qHdg1Co13 ? evaluateAnswer(qHdg1Co13, "13").isCorrect : false;

            const qHdgHeb11 = CURATED_QUESTION_BANK.find(q => q.id === "hdg_heb_11");
            const evalHdgHeb11 = qHdgHeb11 ? evaluateAnswer(qHdgHeb11, "Hebrews 11").isCorrect : false;

            // Test dynamic book quiz generation for single book
            const genQuiz = generateDynamicQuestions({ specificBookId: "GEN", count: 10 });
            const revQuiz = generateDynamicQuestions({ specificBookId: "REV", count: 10 });

            // Test headingOnly quizzes
            const genHeadingQuiz = generateDynamicQuestions({ specificBookId: "GEN", count: 10, headingOnly: true });
            const ntHeadingQuiz = generateDynamicQuestions({ scope: "NT", count: 15, headingOnly: true });
            const romHeadingSession = new DiagnosticSession({ specificBookId: "ROM", headingOnly: true, questionCount: 8 });

            // Verify that for all 66 books, single-book quizzes never include book_id questions
            let bookIdQuestionsFoundInBookTests = 0;
            let booksWithChapterHeadingQuestions = 0;
            for (const b of allBooks) {
                const bQuiz = generateDynamicQuestions({ specificBookId: b.id, count: 20 });
                const hasBookId = bQuiz.some(q => q.type === "book_id");
                if (hasBookId) bookIdQuestionsFoundInBookTests++;

                const allBookQs = CURATED_QUESTION_BANK.filter(q => q.bookId === b.id);
                const hasHeadingQs = allBookQs.some(q => q.id.startsWith("hdg_"));
                if (hasHeadingQs) booksWithChapterHeadingQuestions++;
            }

            return {
                totalBooks: allBooks.length,
                totalQuestions,
                missingBooksCount: missingBooks.length,
                evalGen3Num,
                evalGen3Full,
                evalGen3Ch,
                evalActs2,
                evalRev21,
                evalHdgGen12Num,
                evalHdgGen12Full,
                evalHdg1Co13,
                evalHdgHeb11,
                genQuizLength: genQuiz.length,
                revQuizLength: revQuiz.length,
                genQuizHasNoBookId: genQuiz.every(q => q.type !== "book_id"),
                revQuizHasNoBookId: revQuiz.every(q => q.type !== "book_id"),
                bookIdQuestionsFoundInBookTests,
                booksWithChapterHeadingQuestions,
                genHeadingQuizAllHeadings: genHeadingQuiz.every(q => q.id.startsWith("hdg_") && q.bookId === "GEN"),
                ntHeadingQuizAllHeadings: ntHeadingQuiz.every(q => q.id.startsWith("hdg_") && q.scope === "NT"),
                romSessionIsHeadingOnly: romHeadingSession.headingOnly && romHeadingSession.questions.every(q => q.id.startsWith("hdg_") && q.bookId === "ROM")
            };
        })()
        """
        r = self.eval_js(js)
        assert r.get("totalBooks") == 66, f"Expected 66 books, got {r.get('totalBooks')}"
        assert r.get("totalQuestions") >= 1500, f"Expected >= 1500 total questions, got {r.get('totalQuestions')}"
        assert r.get("missingBooksCount") == 0, f"Expected 0 missing books with <3 questions, got {r.get('missingBooksCount')}"
        assert r.get("evalGen3Num") == True, "Expected '3' to be evaluated as correct for Genesis 3"
        assert r.get("evalGen3Full") == True, "Expected 'Genesis 3' to be evaluated as correct"
        assert r.get("evalGen3Ch") == True, "Expected 'Chapter 3' to be evaluated as correct"
        assert r.get("evalActs2") == True, "Expected '2' to be evaluated as correct for Acts 2"
        assert r.get("evalRev21") == True, "Expected 'Revelation 21' to be evaluated as correct for Rev 21"
        assert r.get("evalHdgGen12Num") == True, "Expected '12' to be evaluated as correct for Call of Abram heading"
        assert r.get("evalHdgGen12Full") == True, "Expected 'Genesis 12' to be evaluated as correct for Call of Abram heading"
        assert r.get("evalHdg1Co13") == True, "Expected '13' to be evaluated as correct for 1 Cor 13 Love Chapter heading"
        assert r.get("evalHdgHeb11") == True, "Expected 'Hebrews 11' to be evaluated as correct for Hall of Faith heading"
        assert r.get("genQuizLength") == 10, f"Expected 10 questions for GEN quiz, got {r.get('genQuizLength')}"
        assert r.get("revQuizLength") == 10, f"Expected 10 questions for REV quiz, got {r.get('revQuizLength')}"
        assert r.get("genQuizHasNoBookId") == True, "Expected Genesis single-book quiz to have no book_id questions"
        assert r.get("revQuizHasNoBookId") == True, "Expected Revelation single-book quiz to have no book_id questions"
        assert r.get("bookIdQuestionsFoundInBookTests") == 0, f"Expected 0 books with book_id questions in book tests, got {r.get('bookIdQuestionsFoundInBookTests')}"
        assert r.get("booksWithChapterHeadingQuestions") == 66, f"Expected all 66 books to have chapter heading questions, got {r.get('booksWithChapterHeadingQuestions')}"
        assert r.get("genHeadingQuizAllHeadings") == True, "Expected Genesis headings quiz to contain only Genesis heading questions"
        assert r.get("ntHeadingQuizAllHeadings") == True, "Expected NT headings quiz to contain only NT heading questions"
        assert r.get("romSessionIsHeadingOnly") == True, "Expected Romans heading session to be headingOnly and only contain Romans headings"

    def test_storage_serialization(self):
        js = """
        (() => {
            const sampleData = {
                books: {
                    "GEN": { bookSummary: "Genesis Summary", myBookTheme: "Origins", updatedAt: 1000 },
                    "EXO": { bookSummary: "", myBookTheme: "", updatedAt: null }
                },
                chapters: {
                    "GEN-1": {
                        headingBlocks: [
                            { heading: "Creation", verses: "v1-31", points: ["Point A", "Point B"], notes: "Notes" }
                        ],
                        takeaway: "Creation takeaway",
                        chapterOutlineRichHTML: "<div><b>Bold outline</b></div>",
                        status: "completed",
                        updatedAt: 1000
                    },
                    "GEN-2": {
                        headingBlocks: [],
                        takeaway: "",
                        status: "empty"
                    }
                }
            };

            const genData = extractBookData("GEN", sampleData);
            const exoData = extractBookData("EXO", sampleData);
            const ch1Clean = cleanChapterData(sampleData.chapters["GEN-1"]);
            const ch2Clean = cleanChapterData(sampleData.chapters["GEN-2"]);

            return {
                genExists: genData !== null,
                exoIsNull: exoData === null,
                genSummary: genData ? genData.bookSummary : null,
                genChaptersCount: genData ? Object.keys(genData.chapters).length : 0,
                ch1HasRichHTML: Boolean(ch1Clean && ch1Clean.chapterOutlineRichHTML),
                ch1PointsCount: ch1Clean && ch1Clean.headingBlocks[0] ? ch1Clean.headingBlocks[0].points.length : 0,
                ch2IsNull: ch2Clean === null
            };
        })()
        """
        r = self.eval_js(js)
        assert r.get("genExists") == True, "Genesis book data should be extracted"
        assert r.get("exoIsNull") == True, "Empty book data (Exodus) should be omitted (null)"
        assert r.get("genSummary") == "Genesis Summary", "Book summary not preserved in extraction"
        assert r.get("genChaptersCount") == 1, f"Expected 1 non-empty chapter in Genesis, got {r.get('genChaptersCount')}"
        assert r.get("ch1HasRichHTML") == True, "Rich HTML should be preserved in cleaned chapter data"
        assert r.get("ch1PointsCount") == 2, "Heading points count mismatch"
        assert r.get("ch2IsNull") == True, "Empty chapter should serialize to null"

    def test_storage_scaffolding(self):
        js = """
        (() => {
            const initial = createInitialStorage();
            const bookKeys = Object.keys(initial.books);
            const chapterKeys = Object.keys(initial.chapters);

            // Simulate incoming cloud data on fresh computer
            const cloudPayload = {
                books: {
                    "GEN": { bookSummary: "Genesis Summary from Cloud", myBookTheme: "Origins", updatedAt: 2000 }
                },
                chapters: {
                    "GEN-1": {
                        headingBlocks: [
                            { heading: "The Creation of the World", verses: "v1-31", points: ["God creates light"], notes: "Day 1" }
                        ],
                        takeaway: "Creation takeaway",
                        status: "completed"
                    }
                },
                quizHistory: [{ id: 'q_cloud_1', date: 12345, total: 10, correct: 10 }],
                bookMastery: { "GEN": 3 }
            };

            // Test merging simulated cloudData into initial storage
            const mergedData = JSON.parse(JSON.stringify(initial));
            // 1. Books
            for (const [bid, b] of Object.entries(cloudPayload.books)) {
                if (b.bookSummary) mergedData.books[bid].bookSummary = b.bookSummary;
                if (b.myBookTheme) mergedData.books[bid].myBookTheme = b.myBookTheme;
            }
            // 2. Chapters
            for (const [cid, ch] of Object.entries(cloudPayload.chapters)) {
                if (!Array.isArray(mergedData.chapters[cid].headingBlocks)) {
                    mergedData.chapters[cid].headingBlocks = [];
                }
                if (ch.takeaway) mergedData.chapters[cid].takeaway = ch.takeaway;
                if (ch.status) mergedData.chapters[cid].status = ch.status;
                const secs = ch.headingBlocks || [];
                secs.forEach((cs) => {
                    mergedData.chapters[cid].headingBlocks.push({
                        heading: cs.heading,
                        verses: cs.verses || "",
                        notes: cs.notes || "",
                        points: cs.points || [""]
                    });
                });
            }
            // 3. Quiz & Mastery
            mergedData.quizHistory.push(...cloudPayload.quizHistory);
            mergedData.bookMastery = { ...mergedData.bookMastery, ...cloudPayload.bookMastery };

            return {
                version: initial.version,
                bookKeysCount: bookKeys.length,
                chapterKeysCount: chapterKeys.length,
                hasGen1: Boolean(initial.chapters['GEN-1']),
                hasRev22: Boolean(initial.chapters['REV-22']),
                hasGen1HeadingBlocksArray: Array.isArray(initial.chapters['GEN-1'].headingBlocks),
                hasQuizHistory: Array.isArray(initial.quizHistory),
                hasBookMastery: typeof initial.bookMastery === 'object',
                mergedGenSummary: mergedData.books['GEN'].bookSummary,
                mergedGen1Points: mergedData.chapters['GEN-1'].headingBlocks[0]?.points?.[0],
                mergedGen1Takeaway: mergedData.chapters['GEN-1'].takeaway,
                mergedQuizCount: mergedData.quizHistory.length,
                mergedGenMastery: mergedData.bookMastery['GEN']
            };
        })()
        """
        r = self.eval_js(js)
        assert r.get("version") == 1, "Storage schema version mismatch"
        assert r.get("bookKeysCount") == 66, f"Expected 66 books in initial storage, got {r.get('bookKeysCount')}"
        assert r.get("chapterKeysCount") == 1189, f"Expected 1,189 chapters in initial storage, got {r.get('chapterKeysCount')}"
        assert r.get("hasGen1") == True, "Genesis 1 missing from initial storage"
        assert r.get("hasRev22") == True, "Revelation 22 missing from initial storage"
        assert r.get("hasGen1HeadingBlocksArray") == True, "Genesis 1 headingBlocks array missing from initial storage"
        assert r.get("hasQuizHistory") == True, "Quiz history array missing"
        assert r.get("hasBookMastery") == True, "Book mastery object missing"
        assert r.get("mergedGenSummary") == "Genesis Summary from Cloud", "Merged book summary failed"
        assert r.get("mergedGen1Points") == "God creates light", "Merged chapter heading points failed"
        assert r.get("mergedGen1Takeaway") == "Creation takeaway", "Merged chapter takeaway failed"
        assert r.get("mergedQuizCount") == 1, "Merged quiz history count mismatch"
        assert r.get("mergedGenMastery") == 3, "Merged book mastery mismatch"

    def test_markdown_and_pdf_export(self):
        js = """
        (() => {
            const storage = createInitialStorage();
            storage.books['GEN'].bookSummary = 'In the beginning God created.';
            storage.chapters['GEN-1'] = {
                headingBlocks: [{ heading: 'Creation', verses: 'v1-31', notes: 'God speaks creation into existence.', points: ['Point 1'] }],
                takeaway: 'God is Creator'
            };

            const fullExport = exportToMarkdown(storage);
            const singleBookExport = exportToMarkdown(storage, 'GEN');
            const gridMarkdownExport = exportToMarkdown(storage, 'GEN', 'grid');
            const pdfHtml = exportToPrintableHTML(storage, 'GEN');
            const docPdfHtml = exportToPrintableHTML(storage, 'GEN', 'document');
            const gridPdfHtml = exportToPrintableHTML(storage, 'GEN', 'grid');
            const fullPdfHtml = exportToPrintableHTML(storage);

            return {
                fullHasTitle: fullExport.includes('# COMPLETE BIBLE OUTLINE'),
                fullHasGenesis: fullExport.includes('# Genesis'),
                fullHasTakeaway: fullExport.includes('God is Creator'),
                singleHasGenesis: singleBookExport.includes('# Genesis'),
                singleOmitsFullHeader: !singleBookExport.includes('# COMPLETE BIBLE OUTLINE'),
                gridMdHasTable: gridMarkdownExport.includes('| Section Heading & Passage | Outline Points & Notes |'),
                gridMdHasHeadingRow: gridMarkdownExport.includes('| **Creation** | • Point 1 |'),
                pdfHasGenesis: pdfHtml.includes('Genesis') && pdfHtml.includes('Creation') && pdfHtml.includes('Point 1'),
                gridPdfHasTable: gridPdfHtml.includes('grid-export-table') && !gridPdfHtml.includes('Section & Reference'),
                gridPdfHasChapterCell: gridPdfHtml.includes('grid-export-chapter-cell') && gridPdfHtml.includes('chapter-number">1</span>') && !gridPdfHtml.includes('chapter-number">Chapter 1</span>'),
                gridPdfOmitsChapterBarHeader: !gridPdfHtml.includes('<div class="chapter-bar">'),
                pdfDocumentHasChapterBar: docPdfHtml.includes('<div class="chapter-bar">'),
                pdfHasGoogleFonts: gridPdfHtml.includes('IBM+Plex+Sans') && docPdfHtml.includes('IBM+Plex+Sans') && gridPdfHtml.includes('Playfair+Display'),
                pdfHasConsistentSerifHeading: gridPdfHtml.includes('"Playfair Display"') && docPdfHtml.includes('"Playfair Display"'),
                pdfHasConsistentSansBody: gridPdfHtml.includes('"IBM Plex Sans"') && docPdfHtml.includes('"IBM Plex Sans"'),
                pdfOmitsChapterOutlinesTitle: !pdfHtml.includes('Chapter Outlines'),
                pdfOmitsOutlinedCount: !pdfHtml.includes('Chapters Outlined'),
                pdfOmitsChapterRefTag: !gridPdfHtml.includes('chapter-ref'),
                pdfOmitsVerseRef: !gridPdfHtml.includes('(v1-31)') && !pdfHtml.includes('(v1-31)'),
                fullPdfHasHeader: fullPdfHtml.includes('Complete Bible Outline')
            };
        })()
        """
        r = self.eval_js(js)
        assert r.get("fullHasTitle") == True, "Markdown export missing header"
        assert r.get("fullHasGenesis") == True, "Markdown export missing Genesis section"
        assert r.get("fullHasTakeaway") == True, "Markdown export missing chapter takeaway"
        assert r.get("singleHasGenesis") == True, "Single book export missing Genesis"
        assert r.get("singleOmitsFullHeader") == True, "Single book export should omit full Bible header"
        assert r.get("gridMdHasTable") == True, "Grid markdown export missing table header"
        assert r.get("gridMdHasHeadingRow") == True, "Grid markdown export missing table heading row"
        assert r.get("pdfHasGenesis") == True, "PDF HTML export missing Genesis content"
        assert r.get("gridPdfHasTable") == True, "Grid PDF HTML export should have grid-export-table and omit Section & Reference header"
        assert r.get("gridPdfHasChapterCell") == True, "Grid PDF HTML export should have chapter number without word 'Chapter' in grid-export-chapter-cell"
        assert r.get("gridPdfOmitsChapterBarHeader") == True, "Grid PDF HTML export should omit chapter-bar header"
        assert r.get("pdfDocumentHasChapterBar") == True, "Document layout PDF export should retain chapter-bar header"
        assert r.get("pdfHasGoogleFonts") == True, "PDF HTML exports should link IBM Plex Sans and Playfair Display Google Fonts"
        assert r.get("pdfHasConsistentSerifHeading") == True, "PDF HTML exports should consistently use Playfair Display / Lora for headings"
        assert r.get("pdfHasConsistentSansBody") == True, "PDF HTML exports should consistently use IBM Plex Sans for body and chapter numbers"
        assert r.get("pdfOmitsChapterOutlinesTitle") == True, "PDF export should omit 'Chapter Outlines' title"
        assert r.get("pdfOmitsOutlinedCount") == True, "PDF export should omit 'Chapters Outlined' count"
        assert r.get("pdfOmitsChapterRefTag") == True, "PDF export should omit right-hand chapter ref like 'GEN 1'"
        assert r.get("pdfOmitsVerseRef") == True, "PDF export should omit verse references in outline headings"
        assert r.get("fullPdfHasHeader") == True, "Full PDF HTML export missing header"

    def test_flag_question_modal(self):
        js = """
        (() => {
            const categories = FLAG_CATEGORIES;
            const testQuestion = {
                id: 'ch_gen_11',
                prompt: 'Where was Abraham called from?',
                displayAnswer: 'Ur of the Chaldeans',
                bookId: 'GEN',
                chapterNum: 11
            };

            const html = renderFlagQuestionModal({
                question: testQuestion,
                category: 'wrong_answer',
                comments: 'Needs Haran nuance',
                suggestedAnswer: 'Ur / Haran',
                isSubmitting: false
            });

            const nullHtml = renderFlagQuestionModal(null);

            return {
                catCount: categories.length,
                hasWrongAnswer: categories.some(c => c.id === 'wrong_answer'),
                hasTooSpecific: categories.some(c => c.id === 'too_specific'),
                hasPoorlyPhrased: categories.some(c => c.id === 'poorly_phrased'),
                hasTypo: categories.some(c => c.id === 'typo'),
                hasBadQuestion: categories.some(c => c.id === 'bad_question'),
                rendersTitle: html.includes('Flag Question for Review'),
                rendersQuestionId: html.includes('ch_gen_11'),
                rendersSuggestedAns: html.includes('Ur / Haran'),
                rendersComments: html.includes('Needs Haran nuance'),
                nullIsBlank: nullHtml === ''
            };
        })()
        """
        r = self.eval_js(js)
        assert r.get("catCount") == 6, f"Expected 6 flag categories, got {r.get('catCount')}"
        assert r.get("hasWrongAnswer") == True, "Missing wrong_answer category"
        assert r.get("hasTooSpecific") == True, "Missing too_specific category"
        assert r.get("hasPoorlyPhrased") == True, "Missing poorly_phrased category"
        assert r.get("hasTypo") == True, "Missing typo category"
        assert r.get("hasBadQuestion") == True, "Missing bad_question category"
        assert r.get("rendersTitle") == True, "Flag modal header missing"
        assert r.get("rendersQuestionId") == True, "Flag modal question ID missing"
        assert r.get("rendersSuggestedAns") == True, "Flag modal suggested answer input missing"
        assert r.get("rendersComments") == True, "Flag modal comments input missing"
        assert r.get("nullIsBlank") == True, "Null flag modal data should return empty string"

    def test_dynamic_random_heading_generation(self):
        js = """
        (() => {
            // 1. Test buildHeadingQuestion helper
            const sampleHdgQ = buildHeadingQuestion({
                bookId: "RUT",
                chapterNum: 2,
                heading: "Ruth Meets Boaz in the Grainfield",
                verseRange: "v1–23"
            });

            const evalRutNum = sampleHdgQ ? evaluateAnswer(sampleHdgQ, "2").isCorrect : false;
            const evalRutFull = sampleHdgQ ? evaluateAnswer(sampleHdgQ, "Ruth 2").isCorrect : false;
            const evalRutCh = sampleHdgQ ? evaluateAnswer(sampleHdgQ, "Chapter 2").isCorrect : false;
            const evalRutWrong = sampleHdgQ ? evaluateAnswer(sampleHdgQ, "Ruth 3").isCorrect : false;

            // 2. Test dynamic extraction from chaptersData
            const mockChaptersData = {
                "RUT-1": {
                    headingBlocks: [
                        { heading: "Elimelech's Family Goes to Moab", verses: "v1–5" },
                        { heading: "Naomi and Ruth Return", verses: "v6–22" }
                    ]
                },
                "RUT-2": {
                    headingBlocks: [
                        { heading: "Ruth Meets Boaz in the Grainfield", verses: "v1–23" }
                    ]
                },
                "RUT-3": {
                    headingBlocks: [
                        { heading: "Ruth at the Threshing Floor of Boaz", verses: "v1–18" }
                    ]
                },
                "RUT-4": {
                    headingBlocks: [
                        { heading: "Boaz Redeems Ruth", verses: "v1–12" },
                        { heading: "The Genealogy of David", verses: "v18–22" },
                        { heading: "Old Deleted Section", verses: "v13–17" }
                    ],
                    deletedHeadings: ["old deleted section"]
                }
            };

            const extractedRut = extractQuestionsFromChaptersData(mockChaptersData, { specificBookId: "RUT" });

            // 3. Test dynamic quiz generation with chaptersData for RUT
            const rutHeadingQuiz = generateDynamicQuestions({
                specificBookId: "RUT",
                count: 10,
                headingOnly: true,
                chaptersData: mockChaptersData
            });

            // 4. Test randomization across multiple runs (multiple samples of Genesis headings)
            const mockGenChapters = {};
            for (let i = 1; i <= 50; i++) {
                mockGenChapters[`GEN-${i}`] = {
                    headingBlocks: [
                        { heading: `Custom Genesis Chapter ${i} Section A`, verses: "v1–10" },
                        { heading: `Custom Genesis Chapter ${i} Section B`, verses: "v11–25" }
                    ]
                };
            }

            const genRun1 = generateDynamicQuestions({
                specificBookId: "GEN",
                count: 15,
                headingOnly: true,
                chaptersData: mockGenChapters
            });

            const genRun2 = generateDynamicQuestions({
                specificBookId: "GEN",
                count: 15,
                headingOnly: true,
                chaptersData: mockGenChapters
            });

            const run1Ids = genRun1.map(q => q.id).join(",");
            const run2Ids = genRun2.map(q => q.id).join(",");
            const isDifferentRun = run1Ids !== run2Ids;

            // 5. Test DiagnosticSession with chaptersData
            const rutSession = new DiagnosticSession({
                specificBookId: "RUT",
                headingOnly: true,
                questionCount: 6,
                chaptersData: mockChaptersData
            });

            return {
                sampleHdgValid: Boolean(sampleHdgQ && sampleHdgQ.id.startsWith("hdg_")),
                evalRutNum,
                evalRutFull,
                evalRutCh,
                evalRutWrong,
                extractedRutCount: extractedRut.length,
                deletedFilteredOut: !extractedRut.some(q => q.prompt.includes("Old Deleted Section")),
                rutHeadingQuizCount: rutHeadingQuiz.length,
                rutAllHeadingIds: rutHeadingQuiz.every(q => q.id.startsWith("hdg_") && q.bookId === "RUT"),
                genRun1Count: genRun1.length,
                genRun2Count: genRun2.length,
                isDifferentRun,
                rutSessionCount: rutSession.questions.length,
                rutSessionHasDynamic: rutSession.questions.some(q => q.id.startsWith("hdg_dyn_"))
            };
        })()
        """
        r = self.eval_js(js)
        assert r.get("sampleHdgValid") == True, "Dynamic heading question construction failed"
        assert r.get("evalRutNum") == True, "Expected '2' to be correct for Ruth 2 heading"
        assert r.get("evalRutFull") == True, "Expected 'Ruth 2' to be correct for Ruth 2 heading"
        assert r.get("evalRutCh") == True, "Expected 'Chapter 2' to be correct for Ruth 2 heading"
        assert r.get("evalRutWrong") == False, "Expected 'Ruth 3' to be incorrect for Ruth 2 heading"
        assert r.get("extractedRutCount") == 6, f"Expected 6 extracted headings (excluding deleted), got {r.get('extractedRutCount')}"
        assert r.get("deletedFilteredOut") == True, "Deleted headings should be excluded from dynamic questions"
        assert r.get("rutHeadingQuizCount") >= 6, f"Expected >= 6 questions for Ruth heading quiz, got {r.get('rutHeadingQuizCount')}"
        assert r.get("rutAllHeadingIds") == True, "All questions should have hdg_ prefix and bookId RUT"
        assert r.get("genRun1Count") == 15, "Expected 15 questions in Genesis run 1"
        assert r.get("genRun2Count") == 15, "Expected 15 questions in Genesis run 2"
        assert r.get("isDifferentRun") == True, "Subsequent heading quiz runs should produce randomized question selections"
        assert r.get("rutSessionCount") >= 6, "Expected DiagnosticSession to have at least 6 questions"
        assert r.get("rutSessionHasDynamic") == True, "DiagnosticSession should include dynamically extracted headings"

    def test_chapter_groups(self):
        js = """
        (() => {
            const d = createInitialStorage();

            // Seed Genesis 1-4 with outline content so exports render them
            [1, 2, 3, 4].forEach((n) => {
                d.chapters[`GEN-${n}`] = {
                    headingBlocks: [
                        { heading: `Heading ${n}`, verses: "v1–10", points: [`Point for chapter ${n}`] }
                    ],
                    chapterScripture: "",
                    status: "completed",
                    takeaway: ""
                };
            });

            // 1. Fresh storage starts with an empty group list
            const startsEmpty = Array.isArray(d.books["GEN"].chapterGroups) && d.books["GEN"].chapterGroups.length === 0;

            // 2. Create two groups out of canonical order; they should come back sorted
            upsertChapterGroup(d, "GEN", { title: "The Patriarchs", startChapter: 3, endChapter: 4 });
            upsertChapterGroup(d, "GEN", { title: "Primeval History", startChapter: 1, endChapter: 2 });
            const sorted = getChapterGroups(d, "GEN").map((g) => g.title);

            const primeval = getChapterGroups(d, "GEN").find((g) => g.title === "Primeval History");
            const patriarchs = getChapterGroups(d, "GEN").find((g) => g.title === "The Patriarchs");

            // 3. Overlap rejection (both fully-contained and partial overlap)
            const overlapExact = validateChapterGroupRange(d, "GEN", 1, 2);
            const overlapPartial = validateChapterGroupRange(d, "GEN", 2, 3);
            const overlapInside = validateChapterGroupRange(d, "GEN", 1, 1);

            // 4. A gap between groups is allowed
            const gapAllowed = validateChapterGroupRange(d, "GEN", 10, 12);

            // 5. Editing a group must not collide with itself
            const selfEdit = validateChapterGroupRange(d, "GEN", 1, 2, primeval.id);

            // 6. Bounds checks
            const tooLow = validateChapterGroupRange(d, "GEN", 0, 5);
            const tooHigh = validateChapterGroupRange(d, "GEN", 49, 51);   // Genesis has 50
            const inverted = validateChapterGroupRange(d, "GEN", 20, 10);

            // 7. Single-chapter group is valid and labels in the singular
            const singleValid = validateChapterGroupRange(d, "GEN", 7, 7);
            const singleLabel = formatGroupRange({ startChapter: 7, endChapter: 7 });
            const rangeLabel = formatGroupRange({ startChapter: 1, endChapter: 11 });

            // 8. Edit in place: same id, updated title and range, still sorted
            const idBefore = patriarchs.id;
            upsertChapterGroup(d, "GEN", {
                id: idBefore,
                title: "Patriarchal Narratives",
                startChapter: 3,
                endChapter: 5
            });
            const afterEdit = getChapterGroups(d, "GEN");
            const editedInPlace =
                afterEdit.length === 2 &&
                afterEdit.filter((g) => g.id === idBefore).length === 1 &&
                afterEdit.find((g) => g.id === idBefore).title === "Patriarchal Narratives" &&
                afterEdit.find((g) => g.id === idBefore).endChapter === 5;

            // 9. Lookup by chapter
            const lookupInside = getGroupForChapter(d, "GEN", 2);
            const lookupUngrouped = getGroupForChapter(d, "GEN", 30);

            // 10. Markdown export: band present, grouped chapters demoted one level
            const mdDoc = exportToMarkdown(d, "GEN", "document");
            const mdHasBand = mdDoc.includes("### Primeval History (Chapters 1\\u20132)");
            const mdHasDemotedChapter = mdDoc.includes("#### Chapter 1");
            const mdHasDemotedHeading = mdDoc.includes("##### Heading 1");

            const mdGrid = exportToMarkdown(d, "GEN", "grid");
            const mdGridHasBand = mdGrid.includes("### Primeval History (Chapters 1\\u20132)");

            // 11. Printable HTML export: group header in both layouts
            const htmlDoc = exportToPrintableHTML(d, "GEN", "document");
            const htmlDocHasGroup = htmlDoc.includes('class="group-header') && htmlDoc.includes("Primeval History");
            const htmlGrid = exportToPrintableHTML(d, "GEN", "grid");
            const htmlGridHasGroup = htmlGrid.includes("grid-export-group-cell") && htmlGrid.includes("Primeval History");

            // 12. Delete removes only the grouping, never the chapter content
            const chapterBlocksBefore = d.chapters["GEN-1"].headingBlocks.length;
            const deleted = deleteChapterGroup(d, "GEN", primeval.id);
            const groupsAfterDelete = getChapterGroups(d, "GEN").length;
            const chapterBlocksAfter = d.chapters["GEN-1"].headingBlocks.length;
            const takeawayIntact = d.chapters["GEN-1"].headingBlocks[0].heading === "Heading 1";

            // 13. Cloud serialization carries groups and the timestamp
            const extracted = extractBookData("GEN", d);
            const serializesGroups =
                Array.isArray(extracted.chapterGroups) &&
                typeof extracted.chapterGroupsUpdatedAt === "number";

            // 14. Merge - newer cloud wins
            const localA = createInitialStorage();
            localA.books["GEN"].chapterGroups = [
                { id: "grp_old", title: "Stale Group", startChapter: 1, endChapter: 5 }
            ];
            localA.books["GEN"].chapterGroupsUpdatedAt = 1000;
            mergeCloudAndLocalState(
                {
                    books: {
                        GEN: {
                            chapterGroups: [{ id: "grp_new", title: "Fresh Group", startChapter: 1, endChapter: 9 }],
                            chapterGroupsUpdatedAt: 5000
                        }
                    }
                },
                localA
            );
            const newerCloudWins =
                localA.books["GEN"].chapterGroups.length === 1 &&
                localA.books["GEN"].chapterGroups[0].title === "Fresh Group";

            // 15. Merge - a deletion elsewhere propagates (empty array, newer stamp)
            const localB = createInitialStorage();
            localB.books["GEN"].chapterGroups = [
                { id: "grp_x", title: "Doomed Group", startChapter: 1, endChapter: 5 }
            ];
            localB.books["GEN"].chapterGroupsUpdatedAt = 2000;
            mergeCloudAndLocalState(
                { books: { GEN: { chapterGroups: [], chapterGroupsUpdatedAt: 4000 } } },
                localB
            );
            const deletionPropagates = localB.books["GEN"].chapterGroups.length === 0;

            // 16. Merge - an older cloud must NOT resurrect a locally deleted group
            const localC = createInitialStorage();
            localC.books["GEN"].chapterGroups = [];
            localC.books["GEN"].chapterGroupsUpdatedAt = 9000;
            mergeCloudAndLocalState(
                {
                    books: {
                        GEN: {
                            chapterGroups: [{ id: "grp_zombie", title: "Zombie Group", startChapter: 1, endChapter: 3 }],
                            chapterGroupsUpdatedAt: 3000
                        }
                    }
                },
                localC
            );
            const noResurrection = localC.books["GEN"].chapterGroups.length === 0;

            return {
                startsEmpty,
                sortedFirst: sorted[0],
                sortedSecond: sorted[1],
                overlapExactRejected: overlapExact.valid === false,
                overlapPartialRejected: overlapPartial.valid === false,
                overlapInsideRejected: overlapInside.valid === false,
                overlapReasonNamesGroup: overlapExact.reason.includes("Primeval History"),
                gapAllowed: gapAllowed.valid === true,
                selfEditAllowed: selfEdit.valid === true,
                tooLowRejected: tooLow.valid === false,
                tooHighRejected: tooHigh.valid === false,
                invertedRejected: inverted.valid === false,
                singleValid: singleValid.valid === true,
                singleLabel,
                rangeLabel,
                editedInPlace,
                lookupInsideTitle: lookupInside ? lookupInside.title : null,
                lookupUngrouped: lookupUngrouped === null,
                mdHasBand,
                mdHasDemotedChapter,
                mdHasDemotedHeading,
                mdGridHasBand,
                htmlDocHasGroup,
                htmlGridHasGroup,
                deleted,
                groupsAfterDelete,
                chapterContentPreserved: chapterBlocksBefore === chapterBlocksAfter && takeawayIntact,
                serializesGroups,
                newerCloudWins,
                deletionPropagates,
                noResurrection
            };
        })()
        """
        r = self.eval_js(js)

        assert r.get("startsEmpty") == True, "New storage should start with an empty chapterGroups array"
        assert r.get("sortedFirst") == "Primeval History", f"Groups should sort by start chapter, got {r.get('sortedFirst')} first"
        assert r.get("sortedSecond") == "The Patriarchs", "Second group out of expected sort order"

        assert r.get("overlapExactRejected") == True, "An exactly-overlapping range must be rejected"
        assert r.get("overlapPartialRejected") == True, "A partially-overlapping range must be rejected"
        assert r.get("overlapInsideRejected") == True, "A range contained inside an existing group must be rejected"
        assert r.get("overlapReasonNamesGroup") == True, "Overlap error should name the colliding group"
        assert r.get("gapAllowed") == True, "A range in a gap between groups must be allowed"
        assert r.get("selfEditAllowed") == True, "A group being edited must not collide with itself"

        assert r.get("tooLowRejected") == True, "Chapter 0 must be rejected"
        assert r.get("tooHighRejected") == True, "A range past the book's chapter count must be rejected"
        assert r.get("invertedRejected") == True, "start > end must be rejected"

        assert r.get("singleValid") == True, "A single-chapter group must be allowed"
        assert r.get("singleLabel") == "Chapter 7", f"Single-chapter label wrong: {r.get('singleLabel')}"
        assert r.get("rangeLabel") == "Chapters 1\u201311", f"Range label wrong: {r.get('rangeLabel')}"

        assert r.get("editedInPlace") == True, "Editing must update in place without duplicating the group id"
        assert r.get("lookupInsideTitle") == "Primeval History", "getGroupForChapter should find the containing group"
        assert r.get("lookupUngrouped") == True, "An ungrouped chapter should resolve to null"

        assert r.get("mdHasBand") == True, "Markdown export missing the group band heading"
        assert r.get("mdHasDemotedChapter") == True, "Grouped chapters should be demoted to #### in Markdown"
        assert r.get("mdHasDemotedHeading") == True, "Headings inside a grouped chapter should be demoted to #####"
        assert r.get("mdGridHasBand") == True, "Grid Markdown export missing the group band heading"

        assert r.get("htmlDocHasGroup") == True, "Document PDF export missing the group header block"
        assert r.get("htmlGridHasGroup") == True, "Grid PDF export missing the group header cell"

        assert r.get("deleted") == True, "deleteChapterGroup should report success"
        assert r.get("groupsAfterDelete") == 1, f"Expected 1 group remaining after delete, got {r.get('groupsAfterDelete')}"
        assert r.get("chapterContentPreserved") == True, "Deleting a group must never touch chapter outline content"

        assert r.get("serializesGroups") == True, "extractBookData should carry chapterGroups and its timestamp"
        assert r.get("newerCloudWins") == True, "A newer cloud timestamp should replace the local group list"
        assert r.get("deletionPropagates") == True, "An empty cloud array with a newer stamp must clear local groups"
        assert r.get("noResurrection") == True, "An older cloud payload must not resurrect a locally deleted group"

    def test_acts2_free_answer_66_books(self):
        js = """
        (() => {
            const allBooks = BIBLE_BOOKS;
            const a2Questions = CURATED_QUESTION_BANK.filter((q) => q.id.startsWith("a2_"));
            let underpopulatedBooks = [];
            let nonActs2InBookQuiz = 0;
            let multipleChoiceFieldsFound = 0;

            for (const b of allBooks) {
                const bQs = a2Questions.filter((q) => q.bookId === b.id);
                if (bQs.length < 6) {
                    underpopulatedBooks.push({ id: b.id, count: bQs.length });
                }
                const quiz = generateDynamicQuestions({ specificBookId: b.id, count: "ALL", headingOnly: false });
                if (quiz.some((q) => !q.id.startsWith("a2_") || !["facts", "verse_completion"].includes(q.type))) {
                    nonActs2InBookQuiz++;
                }
                if (quiz.some((q) => Array.isArray(q.options) || Array.isArray(q.choices))) {
                    multipleChoiceFieldsFound++;
                }
            }

            const galAll = generateDynamicQuestions({ specificBookId: "GAL", count: "ALL", headingOnly: false });
            const galRun1 = generateDynamicQuestions({ specificBookId: "GAL", count: 15, headingOnly: false });
            const galRun2 = generateDynamicQuestions({ specificBookId: "GAL", count: 15, headingOnly: false });
            const galShuffled = galRun1.map((q) => q.id).join(",") !== galRun2.map((q) => q.id).join(",");

            // Smart free-answer normalization checks
            const sampleCurseQ = {
                id: "test_curse",
                type: "facts",
                acceptedAnswers: ["curse of the law"]
            };
            const sampleNumberQ = {
                id: "test_num",
                type: "facts",
                acceptedAnswers: ["52", "52 days"]
            };
            const sampleThousandsQ = {
                id: "test_thousands",
                type: "facts",
                acceptedAnswers: ["3,000"]
            };

            return {
                a2Count: a2Questions.length,
                underpopulatedCount: underpopulatedBooks.length,
                underpopulatedBooks,
                nonActs2InBookQuiz,
                multipleChoiceFieldsFound,
                galCount: galAll.length,
                galShuffled,
                articleMatch: evaluateAnswer(sampleCurseQ, "the curse of the law").isCorrect,
                prepMatch: evaluateAnswer(sampleCurseQ, "from the curse of the law").isCorrect,
                wrongConceptRejected: !evaluateAnswer(sampleCurseQ, "works of the flesh").isCorrect,
                compoundNumMatch: evaluateAnswer(sampleNumberQ, "fifty-two").isCorrect,
                wrongNumRejected: !evaluateAnswer(sampleNumberQ, "40").isCorrect,
                commaNumMatch: evaluateAnswer(sampleThousandsQ, "3000").isCorrect,
                wordThousandsMatch: evaluateAnswer(sampleThousandsQ, "three thousand").isCorrect
            };
        })()
        """
        r = self.eval_js(js)
        assert r.get("a2Count") >= 1200, f"Expected >= 1200 Acts2-style questions across 66 books, got {r.get('a2Count')}"
        assert r.get("underpopulatedCount") == 0, f"Books with < 6 Acts2 questions: {r.get('underpopulatedBooks')}"
        assert r.get("nonActs2InBookQuiz") == 0, "Standard book quizzes should contain only Acts2-style facts/verse_completion questions"
        assert r.get("multipleChoiceFieldsFound") == 0, "Questions should be free-answer only (no multiple choice options)"
        assert r.get("galCount") >= 30, f"Expected >= 30 Galatians questions, got {r.get('galCount')}"
        assert r.get("galShuffled") == True, "Expected Galatians questions to be shuffled across runs"
        assert r.get("articleMatch") == True, "Leading article 'the' should be accepted in free-answer matching"
        assert r.get("prepMatch") == True, "Leading preposition 'from the' should be accepted in free-answer matching"
        assert r.get("wrongConceptRejected") == True, "Unrelated answer must be rejected"
        assert r.get("compoundNumMatch") == True, "'fifty-two' should match '52'"
        assert r.get("wrongNumRejected") == True, "'40' must not match '52'"
        assert r.get("commaNumMatch") == True, "'3000' should match '3,000'"
        assert r.get("wordThousandsMatch") == True, "'three thousand' should match '3,000'"

    def test_verse_highlights_and_notes(self):
        js = """
        (() => {
            const d = createInitialStorage();
            d.chapters["GAL-2"].chapterScripture =
                "Justified by Faith\\n\\n  [19] For through the law I died to the law, so that I might live to God. [20] I have been crucified with Christ. It is no longer I who live, but Christ who lives in me.\\n    And the life I now live in the flesh I live by faith.";
            d.chapters["GEN-1"].chapterScripture =
                "The Creation\\n\\n  [1] In the beginning, God created the heavens and the earth. [2] The earth was without form. [3] And God said, Let there be light.";

            // 1. Toggle single & range highlights
            toggleVerseHighlights(d, "GAL-2", [20]);
            const afterSingleHl = getChapterHighlights(d, "GAL-2");
            toggleVerseHighlights(d, "GEN-1", [3, 1, 2]);
            const afterRangeHl = getChapterHighlights(d, "GEN-1");
            // Toggling same range again unhighlights all three
            toggleVerseHighlights(d, "GEN-1", [1, 2, 3]);
            const afterRangeUnhl = getChapterHighlights(d, "GEN-1");

            // Re-highlight GEN 1:1-2 without note to test contiguous grouping
            setVerseHighlighted(d, "GEN-1", [1, 2], true);

            // 2. Single-verse note & range note CRUD
            const note20 = upsertVerseNote(d, "GAL-2", { startVerse: 20, endVerse: 20, text: "Union with Christ" });
            const rangeNote = upsertVerseNote(d, "GAL-2", { startVerse: 19, endVerse: 20, text: "Dead to law, alive to God" });
            const idBeforeEdit = note20.id;
            upsertVerseNote(d, "GAL-2", { id: idBeforeEdit, startVerse: 20, endVerse: 20, text: "Crucified and risen with Christ" });
            const notesGal2 = getChapterVerseNotes(d, "GAL-2");

            // 3. Verse snippet extraction (including indented continuation line) & HTML formatting
            const extracted20 = extractVersesText(d.chapters["GAL-2"].chapterScripture, 20, 20);
            const htmlCollapsed = formatESVTextToHTML(d.chapters["GAL-2"].chapterScripture, {
                highlights: getChapterHighlights(d, "GAL-2"),
                verseNotes: notesGal2,
                selectedVerses: [19],
                showNotesInline: false,
                interactive: true
            });
            const htmlInline = formatESVTextToHTML(d.chapters["GAL-2"].chapterScripture, {
                highlights: getChapterHighlights(d, "GAL-2"),
                verseNotes: notesGal2,
                selectedVerses: [],
                showNotesInline: true,
                interactive: true
            });

            // 4. Bible-wide index & search/filtering
            const allItems = getAllAnnotationsAcrossBible(d, {});
            const onlyNotes = getAllAnnotationsAcrossBible(d, { filterType: "NOTES" });
            const searchCrucified = getAllAnnotationsAcrossBible(d, { searchQuery: "crucified" });
            const otOnly = getAllAnnotationsAcrossBible(d, { testament: "OT" });

            // 5. Cloud serialization & last-write-wins deletion propagation
            const galClean = cleanChapterData(d.chapters["GAL-2"]);
            const localFresh = createInitialStorage();
            mergeCloudAndLocalState({ chapters: { "GAL-2": galClean } }, localFresh);
            const syncedHlCount = getChapterHighlights(localFresh, "GAL-2").length;
            const syncedNoteCount = getChapterVerseNotes(localFresh, "GAL-2").length;

            // Delete on cloud (newer stamp) propagates empty arrays without resurrection
            const newerStamp = (galClean.annotationsUpdatedAt || Date.now()) + 5000;
            mergeCloudAndLocalState(
                { chapters: { "GAL-2": { highlights: [], verseNotes: [], annotationsUpdatedAt: newerStamp } } },
                localFresh
            );
            const afterCloudDeleteHl = getChapterHighlights(localFresh, "GAL-2").length;
            const afterCloudDeleteNotes = getChapterVerseNotes(localFresh, "GAL-2").length;

            // Older cloud payload must NOT resurrect deleted annotations
            mergeCloudAndLocalState({ chapters: { "GAL-2": galClean } }, localFresh);
            const noResurrectHl = getChapterHighlights(localFresh, "GAL-2").length === 0;

            // 6. Headers between two verses (unindented, 4-space poetry-indented, acrostic, speaker, bracketed editorial, long superscription)
            //    must NEVER be highlighted or included in extracted verse snippets
            const mat2Scripture = [
                "Herod Kills the Children",
                "",
                "  [17] Then was fulfilled what was spoken by the prophet Jeremiah:",
                "",
                "    [18] “A voice was heard in Ramah,",
                "        weeping and loud lamentation,",
                "    Rachel weeping for her children;",
                "        she refused to be comforted, because they are no more.”",
                "    ",
                "    ",
                "    The Return to Nazareth",
                "",
                "  [19] But when Herod died, behold, an angel of the Lord appeared in a dream to Joseph in Egypt."
            ].join("\\n");
            const mat2Html = formatESVTextToHTML(mat2Scripture, {
                highlights: [18, 19],
                selectedVerses: [18, 19],
                interactive: true
            });
            const mat2Snippet = extractVersesText(mat2Scripture, 18, 19);
            const mat2Headings = extractESVHeadings(mat2Scripture, "Matthew 2").map((h) => h.heading);
            const tmpMat = document.createElement("div");
            tmpMat.innerHTML = mat2Html;
            const mat2HighlightedText = Array.from(tmpMat.querySelectorAll(".esv-verse-highlighted"))
                .map((el) => el.textContent)
                .join(" ");
            const mat2HeadingEl = Array.from(tmpMat.querySelectorAll("h4")).find((el) =>
                el.textContent.includes("The Return to Nazareth")
            );

            // Song of Solomon mid-verse speaker rubric ("Others") & between-verse speaker ("She")
            const sngScripture = [
                "The Bride Confesses Her Love",
                "",
                "    [4] Draw me after you; let us run.",
                "        The king has brought me into his chambers.",
                "    ",
                "    ",
                "    Others",
                "    ",
                "    We will exult and rejoice in you;",
                "    ",
                "    ",
                "    She",
                "    ",
                "    [5] I am very dark, but lovely."
            ].join("\\n");
            const sngHtml = formatESVTextToHTML(sngScripture, { highlights: [4, 5], interactive: true });
            const tmpSng = document.createElement("div");
            tmpSng.innerHTML = sngHtml;
            const sngHighlightedText = Array.from(tmpSng.querySelectorAll(".esv-verse-highlighted"))
                .map((el) => el.textContent)
                .join(" ");
            const sngSnippet = extractVersesText(sngScripture, 4, 5);

            // Bracketed editorial header (Mark 16:8-9) & 2-space prose continuation (Ephesians 1:1)
            const mrkScripture = [
                "The Resurrection",
                "",
                "  [8] And they went out and fled from the tomb.",
                "",
                "[Some of the earliest manuscripts do not include 16:9–20.]",
                "",
                "Jesus Appears to Mary Magdalene",
                "",
                "  [[[9] Now when he rose early on the first day of the week."
            ].join("\\n");
            const tmpMrk = document.createElement("div");
            tmpMrk.innerHTML = formatESVTextToHTML(mrkScripture, { highlights: [8, 9], interactive: true });
            const mrkHighlightedText = Array.from(tmpMrk.querySelectorAll(".esv-verse-highlighted"))
                .map((el) => el.textContent)
                .join(" ");
            const mrkSnippet = extractVersesText(mrkScripture, 8, 9);

            const ephScripture = [
                "Greeting",
                "",
                "  [1] Paul, an apostle of Christ Jesus by the will of God,",
                "",
                "  To the saints who are in Ephesus, and are faithful in Christ Jesus:",
                "",
                "  [2] Grace to you and peace from God our Father."
            ].join("\\n");
            const ephSnippet1 = extractVersesText(ephScripture, 1, 1);

            return {
                afterSingleHl,
                afterRangeHl,
                afterRangeUnhlCount: afterRangeUnhl.length,
                notesGal2Count: notesGal2.length,
                editedText: notesGal2.find((n) => n.id === idBeforeEdit)?.text,
                rangeRefLabel: formatVerseRef(rangeNote.startVerse, rangeNote.endVerse),
                extractedHasContinuation: extracted20.includes("crucified with Christ") && extracted20.includes("live by faith"),
                htmlHasHighlightClass: htmlCollapsed.includes("esv-verse-highlighted"),
                htmlHasSelectedClass: htmlCollapsed.includes("esv-verse-selected"),
                htmlHasNoteBadge: htmlCollapsed.includes("data-verse-note-badge"),
                collapsedHidesInlineCard: !htmlCollapsed.includes("esv-inline-note-card"),
                inlineShowsCard: htmlInline.includes("esv-inline-note-card"),
                allItemsCount: allItems.length,
                genContiguousRef: otOnly[0]?.reference,
                onlyNotesCount: onlyNotes.length,
                searchCrucifiedCount: searchCrucified.length,
                syncedHlCount,
                syncedNoteCount,
                afterCloudDeleteHl,
                afterCloudDeleteNotes,
                noResurrectHl,
                mat2HeaderIsH4: Boolean(mat2HeadingEl && !mat2HeadingEl.classList.contains("esv-verse-highlighted")),
                mat2HeaderExcludedFromHl:
                    !mat2HighlightedText.includes("The Return to Nazareth") &&
                    !mat2Snippet.includes("The Return to Nazareth") &&
                    mat2Snippet.includes("she refused to be comforted") &&
                    mat2Snippet.includes("when Herod died"),
                mat2ExtractsIndentedHeading: mat2Headings.includes("The Return to Nazareth"),
                sngExcludesSpeakersKeepsMidVerse:
                    !sngHighlightedText.includes("Others") &&
                    !sngHighlightedText.includes("She") &&
                    sngHighlightedText.includes("We will exult and rejoice in you") &&
                    !sngSnippet.includes("Others") &&
                    sngSnippet.includes("We will exult and rejoice in you"),
                mrkExcludesEditorialBracket:
                    !mrkHighlightedText.includes("earliest manuscripts") &&
                    !mrkHighlightedText.includes("Jesus Appears to Mary Magdalene") &&
                    !mrkHighlightedText.includes("[[") &&
                    !mrkSnippet.includes("earliest manuscripts"),
                ephPreservesProseContinuation: ephSnippet1.includes("To the saints who are in Ephesus")
            };
        })()
        """
        r = self.eval_js(js)
        assert r.get("afterSingleHl") == [20], f"Expected [20], got {r.get('afterSingleHl')}"
        assert r.get("afterRangeHl") == [1, 2, 3], f"Expected sorted [1, 2, 3], got {r.get('afterRangeHl')}"
        assert r.get("afterRangeUnhlCount") == 0, "Expected toggling highlighted range to unhighlight all"
        assert r.get("notesGal2Count") == 2, f"Expected 2 notes in GAL-2, got {r.get('notesGal2Count')}"
        assert r.get("editedText") == "Crucified and risen with Christ", "Note in-place update failed"
        assert r.get("rangeRefLabel") == "v19\u201320", f"Expected v19–20, got {r.get('rangeRefLabel')}"
        assert r.get("extractedHasContinuation") == True, "extractVersesText should include indented continuation lines"
        assert r.get("htmlHasHighlightClass") == True, "Highlighted verse missing esv-verse-highlighted class"
        assert r.get("htmlHasSelectedClass") == True, "Selected verse missing esv-verse-selected class"
        assert r.get("htmlHasNoteBadge") == True, "Note badge missing from rendered ESV HTML"
        assert r.get("collapsedHidesInlineCard") == True, "Inline note card should be hidden when showNotesInline is false"
        assert r.get("inlineShowsCard") == True, "Inline note card should appear when showNotesInline is true"
        assert r.get("allItemsCount") >= 3, "Expected >= 3 annotation items"
        assert r.get("genContiguousRef") == "Genesis 1:1\u20132", f"Expected contiguous highlight 'Genesis 1:1–2', got {r.get('genContiguousRef')}"
        assert r.get("onlyNotesCount") == 2, f"Expected 2 note items, got {r.get('onlyNotesCount')}"
        assert r.get("searchCrucifiedCount") >= 1, "Search across verse snippet & note text failed"
        assert r.get("syncedHlCount") == 1 and r.get("syncedNoteCount") == 2, "Cloud merge failed to import highlights/notes"
        assert r.get("afterCloudDeleteHl") == 0 and r.get("afterCloudDeleteNotes") == 0, "Cloud deletion failed to propagate"
        assert r.get("noResurrectHl") == True, "Stale cloud payload resurrected deleted highlights"
        assert r.get("mat2HeaderIsH4") == True, "Indented section header after poetry should render as unhighlighted <h4>"
        assert r.get("mat2HeaderExcludedFromHl") == True, "Highlighting verses across a section header must not highlight or extract the header"
        assert r.get("mat2ExtractsIndentedHeading") == True, "extractESVHeadings should include indented section headers after poetry"
        assert r.get("sngExcludesSpeakersKeepsMidVerse") == True, "Speaker headers must not be highlighted while preserving mid-verse poetry lines"
        assert r.get("mrkExcludesEditorialBracket") == True, "Editorial manuscript notes and headers between verses must not be highlighted"
        assert r.get("ephPreservesProseContinuation") == True, "2-space prose continuations within a verse should still be preserved"





