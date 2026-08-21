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
            ("Diagnostic Quiz Engine & BMPI Matching", self.test_quiz_engine),
            ("GFC 100-Question Assessment & Bank Integrity", self.test_gfc_quiz_bank),
            ("BMPI 300-Question Assessment & Bank Integrity", self.test_bmpi_300_bank),
            ("Comprehensive 66-Book Major Events & Chapter Quiz Bank", self.test_all_66_books_chapter_event_questions),
            ("Storage & Option A Subcollection Serialization", self.test_storage_serialization),
            ("Deep Merge & Local Storage Scaffolding", self.test_storage_scaffolding),
            ("Markdown Exporter Integrity", self.test_markdown_export),
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

    def test_gfc_quiz_bank(self):
        js = """
        (() => {
            const gfcPool = CURATED_QUESTION_BANK.filter(q => q.id.startsWith("gfc_"));
            const dedicatedBank = typeof GFC_TEST_100_BANK !== "undefined" ? GFC_TEST_100_BANK : [];
            const gfcSession = new DiagnosticSession({ scope: 'GFC', questionCount: 100 });
            
            // Test evaluating specific GFC question
            const qActs = gfcPool.find(q => q.id === "gfc_who_1");
            const evalLuke = qActs ? evaluateAnswer(qActs, "Luke").isCorrect : false;
            const evalWrong = qActs ? evaluateAnswer(qActs, "Barnabas").isCorrect : true;

            return {
                gfcCount: gfcPool.length,
                dedicatedCount: dedicatedBank.length,
                sessionCount: gfcSession.questions.length,
                evalLuke,
                evalWrong
            };
        })()
        """
        r = self.eval_js(js)
        assert r.get("gfcCount") == 100, f"Expected 100 GFC questions in curated bank, got {r.get('gfcCount')}"
        assert r.get("dedicatedCount") == 100, f"Expected 100 GFC questions in GFC_TEST_100_BANK, got {r.get('dedicatedCount')}"
        assert r.get("sessionCount") == 100, f"Expected 100 questions in GFC session, got {r.get('sessionCount')}"
        assert r.get("evalLuke") == True, "Expected 'Luke' to be evaluated as correct for Acts authorship"
        assert r.get("evalWrong") == False, "Expected 'Barnabas' to be evaluated as incorrect for Acts authorship"

    def test_bmpi_300_bank(self):
        js = """
        (() => {
            const bmpiPool = CURATED_QUESTION_BANK.filter(q => q.id.startsWith("bmpi_"));
            const dedicatedBank = typeof BMPI_TEST_300_BANK !== "undefined" ? BMPI_TEST_300_BANK : [];
            const bmpiSession = new DiagnosticSession({ scope: 'BMPI', questionCount: 300 });
            
            // Test evaluating specific BMPI questions
            const q1 = bmpiPool.find(q => q.id === "bmpi_1");
            const evalGen1 = q1 ? evaluateAnswer(q1, "Genesis 1").isCorrect : false;
            
            const q30 = bmpiPool.find(q => q.id === "bmpi_30");
            const evalJoseph = q30 ? evaluateAnswer(q30, "Joseph").isCorrect : false;

            const q300 = bmpiPool.find(q => q.id === "bmpi_300");
            const evalEzra = q300 ? evaluateAnswer(q300, "Ezra").isCorrect : false;

            return {
                bmpiCount: bmpiPool.length,
                dedicatedCount: dedicatedBank.length,
                sessionCount: bmpiSession.questions.length,
                evalGen1,
                evalJoseph,
                evalEzra
            };
        })()
        """
        r = self.eval_js(js)
        assert r.get("bmpiCount") == 300, f"Expected 300 BMPI questions in curated bank, got {r.get('bmpiCount')}"
        assert r.get("dedicatedCount") == 300, f"Expected 300 BMPI questions in BMPI_TEST_300_BANK, got {r.get('dedicatedCount')}"
        assert r.get("sessionCount") == 300, f"Expected 300 questions in BMPI session, got {r.get('sessionCount')}"
        assert r.get("evalGen1") == True, "Expected 'Genesis 1' to be evaluated as correct for Q1"
        assert r.get("evalJoseph") == True, "Expected 'Joseph' to be evaluated as correct for Q30"
        assert r.get("evalEzra") == True, "Expected 'Ezra' to be evaluated as correct for Q300"

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

            // Test dynamic book quiz generation for single book
            const genQuiz = generateDynamicQuestions({ specificBookId: "GEN", count: 10 });
            const revQuiz = generateDynamicQuestions({ specificBookId: "REV", count: 10 });

            return {
                totalBooks: allBooks.length,
                totalQuestions,
                missingBooksCount: missingBooks.length,
                evalGen3Num,
                evalGen3Full,
                evalGen3Ch,
                evalActs2,
                evalRev21,
                genQuizLength: genQuiz.length,
                revQuizLength: revQuiz.length
            };
        })()
        """
        r = self.eval_js(js)
        assert r.get("totalBooks") == 66, f"Expected 66 books, got {r.get('totalBooks')}"
        assert r.get("totalQuestions") >= 1000, f"Expected >= 1000 total questions, got {r.get('totalQuestions')}"
        assert r.get("missingBooksCount") == 0, f"Expected 0 missing books with <3 questions, got {r.get('missingBooksCount')}"
        assert r.get("evalGen3Num") == True, "Expected '3' to be evaluated as correct for Genesis 3"
        assert r.get("evalGen3Full") == True, "Expected 'Genesis 3' to be evaluated as correct"
        assert r.get("evalGen3Ch") == True, "Expected 'Chapter 3' to be evaluated as correct"
        assert r.get("evalActs2") == True, "Expected '2' to be evaluated as correct for Acts 2"
        assert r.get("evalRev21") == True, "Expected 'Revelation 21' to be evaluated as correct for Rev 21"
        assert r.get("genQuizLength") == 10, f"Expected 10 questions for GEN quiz, got {r.get('genQuizLength')}"
        assert r.get("revQuizLength") == 10, f"Expected 10 questions for REV quiz, got {r.get('revQuizLength')}"

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

    def test_markdown_export(self):
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

            return {
                fullHasTitle: fullExport.includes('# COMPLETE BIBLE OUTLINE'),
                fullHasGenesis: fullExport.includes('# Genesis'),
                fullHasTakeaway: fullExport.includes('God is Creator'),
                singleHasGenesis: singleBookExport.includes('# Genesis'),
                singleOmitsFullHeader: !singleBookExport.includes('# COMPLETE BIBLE OUTLINE')
            };
        })()
        """
        r = self.eval_js(js)
        assert r.get("fullHasTitle") == True, "Markdown export missing header"
        assert r.get("fullHasGenesis") == True, "Markdown export missing Genesis section"
        assert r.get("fullHasTakeaway") == True, "Markdown export missing chapter takeaway"
        assert r.get("singleHasGenesis") == True, "Single book export missing Genesis"
        assert r.get("singleOmitsFullHeader") == True, "Single book export should omit full Bible header"

    def test_flag_question_modal(self):
        js = """
        (() => {
            const categories = FLAG_CATEGORIES;
            const testQuestion = {
                id: 'bmpi_99',
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
                rendersQuestionId: html.includes('bmpi_99'),
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
