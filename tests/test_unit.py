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
            ("Question Flag Modal & Categories Integrity", self.test_flag_question_modal)
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
