import { BIBLE_BOOKS, BIBLE_ERAS, getBookById } from "../data/bible_catalog.js";

// Canonical Book Alias Map for Smart Normalization
export const BOOK_ALIASES = {
  // OT
  gen: "GEN", genesis: "GEN", gn: "GEN",
  exo: "EXO", exodus: "EXO", ex: "EXO", exod: "EXO",
  lev: "LEV", leviticus: "LEV", lv: "LEV",
  num: "NUM", numbers: "NUM", nm: "NUM",
  deu: "DEU", deuteronomy: "DEU", dt: "DEU", deut: "DEU",
  jos: "JOS", joshua: "JOS", josh: "JOS",
  jdg: "JDG", judges: "JDG", judg: "JDG", jdgx: "JDG",
  rut: "RUT", ruth: "RUT", rth: "RUT",
  "1sa": "1SA", "1sam": "1SA", "1samuel": "1SA", "1 sam": "1SA", "1 samuel": "1SA", "1st samuel": "1SA", "first samuel": "1SA",
  "2sa": "2SA", "2sam": "2SA", "2samuel": "2SA", "2 sam": "2SA", "2 samuel": "2SA", "2nd samuel": "2SA", "second samuel": "2SA",
  "1ki": "1KI", "1kgs": "1KI", "1kings": "1KI", "1 king": "1KI", "1 kings": "1KI", "1st kings": "1KI", "first kings": "1KI",
  "2ki": "2KI", "2kgs": "2KI", "2kings": "2KI", "2 king": "2KI", "2 kings": "2KI", "2nd kings": "2KI", "second kings": "2KI",
  "1ch": "1CH", "1chr": "1CH", "1chron": "1CH", "1chronicles": "1CH", "1 chron": "1CH", "1 chronicles": "1CH", "1st chronicles": "1CH", "first chronicles": "1CH",
  "2ch": "2CH", "2chr": "2CH", "2chron": "2CH", "2chronicles": "2CH", "2 chron": "2CH", "2 chronicles": "2CH", "2nd chronicles": "2CH", "second chronicles": "2CH",
  ezr: "EZR", ezra: "EZR",
  neh: "NEH", nehemiah: "NEH",
  est: "EST", esth: "EST", esther: "EST",
  job: "JOB",
  psa: "PSA", ps: "PSA", psalm: "PSA", psalms: "PSA", psm: "PSA", pss: "PSA",
  pro: "PRO", prov: "PRO", proverbs: "PRO", pr: "PRO",
  ecc: "ECC", eccl: "ECC", ecclesiastes: "ECC", qoh: "ECC",
  sng: "SNG", song: "SNG", "song of solomon": "SNG", "song of songs": "SNG", canticles: "SNG",
  isa: "ISA", isaiah: "ISA", is: "ISA",
  jer: "JER", jeremiah: "JER",
  lam: "LAM", lamentations: "LAM",
  eze: "EZE", ezek: "EZE", ezekiel: "EZE",
  dan: "DAN", daniel: "DAN",
  hos: "HOS", hosea: "HOS",
  joe: "JOE", joel: "JOE",
  amo: "AMO", amos: "AMO",
  oba: "OBA", obad: "OBA", obadiah: "OBA",
  jon: "JON", jonah: "JON",
  mic: "MIC", micah: "MIC",
  nah: "NAH", nahum: "NAH",
  hab: "HAB", habakkuk: "HAB",
  zep: "ZEP", zeph: "ZEP", zephaniah: "ZEP",
  hag: "HAG", haggai: "HAG",
  zec: "ZEC", zech: "ZEC", zechariah: "ZEC",
  mal: "MAL", malachi: "MAL",

  // NT
  mat: "MAT", matt: "MAT", matthew: "MAT", mt: "MAT",
  mrk: "MRK", mark: "MRK", mk: "MRK",
  luk: "LUK", luke: "LUK", lk: "LUK",
  jhn: "JHN", john: "JHN", jn: "JHN",
  act: "ACT", acts: "ACT", "acts of the apostles": "ACT",
  rom: "ROM", romans: "ROM", rm: "ROM",
  "1co": "1CO", "1cor": "1CO", "1corinthians": "1CO", "1 cor": "1CO", "1 corinthians": "1CO", "1st corinthians": "1CO", "first corinthians": "1CO",
  "2co": "2CO", "2cor": "2CO", "2corinthians": "2CO", "2 cor": "2CO", "2 corinthians": "2CO", "2nd corinthians": "2CO", "second corinthians": "2CO",
  gal: "GAL", galatians: "GAL",
  eph: "EPH", ephesians: "EPH",
  php: "PHP", phil: "PHP", philippians: "PHP",
  col: "COL", colossians: "COL",
  "1th": "1TH", "1thess": "1TH", "1thessalonians": "1TH", "1 thess": "1TH", "1 thessalonians": "1TH", "1st thessalonians": "1TH", "first thessalonians": "1TH",
  "2th": "2TH", "2thess": "2TH", "2thessalonians": "2TH", "2 thess": "2TH", "2 thessalonians": "2TH", "2nd thessalonians": "2TH", "second thessalonians": "2TH",
  "1ti": "1TI", "1tim": "1TI", "1timothy": "1TI", "1 tim": "1TI", "1 timothy": "1TI", "1st timothy": "1TI", "first timothy": "1TI",
  "2ti": "2TI", "2tim": "2TI", "2timothy": "2TI", "2 tim": "2TI", "2 timothy": "2TI", "2nd timothy": "2TI", "second timothy": "2TI",
  tit: "TIT", titus: "TIT",
  phm: "PHM", philem: "PHM", philemon: "PHM",
  heb: "HEB", hebrews: "HEB",
  jas: "JAS", james: "JAS", jm: "JAS",
  "1pe": "1PE", "1pet": "1PE", "1peter": "1PE", "1 pet": "1PE", "1 peter": "1PE", "1st peter": "1PE", "first peter": "1PE",
  "2pe": "2PE", "2pet": "2PE", "2peter": "2PE", "2 pet": "2PE", "2 peter": "2PE", "2nd peter": "2PE", "second peter": "2PE",
  "1jn": "1JN", "1john": "1JN", "1 jn": "1JN", "1 john": "1JN", "1st john": "1JN", "first john": "1JN",
  "2jn": "2JN", "2john": "2JN", "2 jn": "2JN", "2 john": "2JN", "2nd john": "2JN", "second john": "2JN",
  "3jn": "3JN", "3john": "3JN", "3 jn": "3JN", "3 john": "3JN", "3rd john": "3JN", "third john": "3JN",
  jud: "JUD", jude: "JUD",
  rev: "REV", revelation: "REV", revelations: "REV", apocalypse: "REV"
};

// Clean string for fuzzy comparison
export function cleanText(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .replace(/[“”"''`.,\/#!$%\^&\*;:{}=\-_~()\[\]]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Levenshtein distance for typo tolerance
export function levenshteinDistance(a, b) {
  const an = a ? a.length : 0;
  const bn = b ? b.length : 0;
  if (an === 0) return bn;
  if (bn === 0) return an;
  const matrix = [];
  for (let i = 0; i <= bn; i++) matrix[i] = [i];
  for (let j = 0; j <= an; j++) matrix[0][j] = j;
  for (let i = 1; i <= bn; i++) {
    for (let j = 1; j <= an; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1) // insertion / deletion
        );
      }
    }
  }
  return matrix[bn][an];
}

// Parse user input into Book ID and Chapter Number
export function parseBookAndChapter(input) {
  if (!input) return null;
  const cleaned = cleanText(input);

  // Match pattern like "1 samuel 17", "genesis 12", "psalm 23", "acts 2", "gen ch 12", "john 3 16"
  const match = cleaned.match(/^([1-3]?\s*[a-z]+(?:\s+of\s+[a-z]+)?)\s*(?:ch(?:apter)?\.?)?\s*(\d+)(?::\d+)?/i);
  if (match) {
    const rawBook = match[1].replace(/\s+/g, " ").trim();
    const ch = parseInt(match[2], 10);
    const bookId = BOOK_ALIASES[rawBook] || BOOK_ALIASES[rawBook.replace(/\s+/g, "")];
    if (bookId && !isNaN(ch)) {
      return { bookId, chapterNum: ch };
    }
  }

  // Check if just a book name without chapter
  const bookOnlyId = BOOK_ALIASES[cleaned] || BOOK_ALIASES[cleaned.replace(/\s+/g, "")];
  if (bookOnlyId) {
    return { bookId: bookOnlyId, chapterNum: null };
  }

  // Check if just a chapter number
  const numOnly = parseInt(cleaned, 10);
  if (!isNaN(numOnly) && numOnly > 0 && numOnly <= 150) {
    return { bookId: null, chapterNum: numOnly };
  }

  return null;
}

// Evaluate if user answer matches the question criteria
export function evaluateAnswer(question, userInput) {
  if (!userInput || !userInput.trim()) {
    return { isCorrect: false, userText: userInput || "", feedback: "No answer entered." };
  }

  const rawUser = userInput.trim();
  const cleanedUser = cleanText(rawUser);

  // 1. BOOK & CHAPTER QUESTIONS (e.g. "Matthew 28", "Psalm 23")
  if (question.type === "book_chapter") {
    const parsed = parseBookAndChapter(rawUser);
    if (parsed && parsed.bookId && parsed.chapterNum) {
      if (parsed.bookId === question.bookId && parsed.chapterNum === question.chapterNum) {
        return { isCorrect: true, userText: rawUser };
      }
    }
    // Also check raw string matches against accepted answers
    if (Array.isArray(question.acceptedAnswers)) {
      for (const ans of question.acceptedAnswers) {
        if (cleanText(ans) === cleanedUser) {
          return { isCorrect: true, userText: rawUser };
        }
      }
    }
    return { isCorrect: false, userText: rawUser };
  }

  // 2. CHAPTER IN BOOK QUESTIONS (e.g. Chapter "10" or "Luke 10")
  if (question.type === "chapter_in_book") {
    const parsed = parseBookAndChapter(rawUser);
    if (parsed) {
      if (parsed.chapterNum === question.chapterNum) {
        // If they provided a book, check it matches or was omitted
        if (!parsed.bookId || parsed.bookId === question.bookId) {
          return { isCorrect: true, userText: rawUser };
        }
      }
    }
    if (Array.isArray(question.acceptedAnswers)) {
      for (const ans of question.acceptedAnswers) {
        if (cleanText(ans) === cleanedUser) {
          return { isCorrect: true, userText: rawUser };
        }
      }
    }
    return { isCorrect: false, userText: rawUser };
  }

  // 3. BOOK IDENTIFICATION QUESTIONS (e.g. "Ezra", "Mark")
  if (question.type === "book_id") {
    const parsed = parseBookAndChapter(rawUser);
    if (parsed && parsed.bookId === question.bookId) {
      return { isCorrect: true, userText: rawUser };
    }
    if (Array.isArray(question.acceptedAnswers)) {
      for (const ans of question.acceptedAnswers) {
        if (cleanText(ans) === cleanedUser) {
          return { isCorrect: true, userText: rawUser };
        }
      }
    }
    return { isCorrect: false, userText: rawUser };
  }

  // 4. VERSE FILL-IN-THE-BLANK & FACTS / PEOPLE / PLACES
  if (question.type === "verse_completion" || question.type === "facts") {
    const accepted = Array.isArray(question.acceptedAnswers) ? question.acceptedAnswers : [question.displayAnswer];
    for (const ans of accepted) {
      const cleanAns = cleanText(ans);
      if (cleanedUser === cleanAns) {
        return { isCorrect: true, userText: rawUser };
      }
      // Allow minor typo tolerance (1 char distance for words > 4 chars, or 2 for phrases > 10 chars)
      const dist = levenshteinDistance(cleanedUser, cleanAns);
      const threshold = cleanAns.length > 12 ? 2 : cleanAns.length > 4 ? 1 : 0;
      if (dist <= threshold) {
        return { isCorrect: true, userText: rawUser };
      }
    }
    return { isCorrect: false, userText: rawUser };
  }

  return { isCorrect: false, userText: rawUser };
}

// --------------------------------------------------------------------------
// COMPREHENSIVE CURATED MASTER QUESTION BANK
// Includes all 50 NT and 50 OT Diagnostic Form questions + extensive Bible-wide questions
// --------------------------------------------------------------------------

export const CURATED_QUESTION_BANK = [
  // =========================================================================
  // BMPI FREQUENTLY MISSED QUESTIONS (Top Ten Leadership & Doctrine)
  // =========================================================================
  {
    id: "bmpi_pent_2",
    type: "facts",
    prompt: "This leader had his priestly leadership confirmed when his dry almond rod miraculously sprouted, budded, and produced ripe almonds.",
    bookId: "NUM",
    chapterNum: 17,
    acceptedAnswers: ["Aaron", "Aaron the priest"],
    displayAnswer: "Aaron",
    explanation: "Numbers 17:8: Aaron's rod sprouted, budded, blossomed, and produced almonds, proving God's choice.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "bmpi_pent_7",
    type: "book_chapter",
    prompt: "Book & chapter containing the Protoevangelium (first Gospel promise): 'I will put enmity between you and the woman, and between your offspring and hers; he will crush your head, and you will strike his heel.'",
    bookId: "GEN",
    chapterNum: 3,
    acceptedAnswers: ["Genesis 3", "Gen 3", "Genesis 3:15", "Gen 3:15"],
    displayAnswer: "Genesis 3",
    explanation: "Genesis 3:15: First prophetic announcement of Christ defeating Satan.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "bmpi_pent_8",
    type: "book_chapter",
    prompt: "Book & chapter where God formally cuts His covenant of circumcision with Abraham and promises he will be the father of a multitude of nations:",
    bookId: "GEN",
    chapterNum: 17,
    acceptedAnswers: ["Genesis 17", "Gen 17", "Genesis 17:1-7"],
    displayAnswer: "Genesis 17",
    explanation: "Genesis 17: God changes Abram's name to Abraham and establishes circumcision.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "bmpi_pent_9",
    type: "chapter_in_book",
    prompt: "What chapter in Leviticus describes Yom Kippur (The Day of Atonement) and the scapegoat sent into the wilderness?",
    bookId: "LEV",
    chapterNum: 16,
    acceptedAnswers: ["16", "Leviticus 16", "Lev 16", "ch 16", "chapter 16"],
    displayAnswer: "Leviticus 16 (or Chapter 16)",
    explanation: "Leviticus 16 details the high priest entering the Holy of Holies once a year with blood for atonement.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "bmpi_pent_10",
    type: "facts",
    prompt: "Which two books in the Pentateuch record the Ten Commandments (Decalogue)?",
    bookId: "EXO",
    chapterNum: 20,
    acceptedAnswers: ["Exodus and Deuteronomy", "Exodus & Deuteronomy", "Exodus, Deuteronomy", "Deuteronomy and Exodus", "Exo and Deut"],
    displayAnswer: "Exodus and Deuteronomy",
    explanation: "The Ten Commandments are given at Sinai in Exodus 20 and repeated before entering Canaan in Deuteronomy 5.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "bmpi_pent_11",
    type: "book_id",
    prompt: "In what book does Moses make a bronze serpent and set it on a pole so anyone bitten by a fiery serpent would look at it and live?",
    bookId: "NUM",
    chapterNum: 21,
    acceptedAnswers: ["Numbers", "Num"],
    displayAnswer: "Numbers",
    explanation: "Numbers 21:8-9: Jesus refers to this in John 3:14 ('As Moses lifted up the serpent in the wilderness...').",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "bmpi_pent_12",
    type: "facts",
    prompt: "Which patriarch told his brothers: 'As for you, you meant evil against me, but God meant it for good, to bring it about that many people should be kept alive'?",
    bookId: "GEN",
    chapterNum: 50,
    acceptedAnswers: ["Joseph", "Joseph son of Jacob"],
    displayAnswer: "Joseph",
    explanation: "Genesis 50:20: The climax of Joseph's life and the theme of God's providence.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "bmpi_pent_13",
    type: "book_chapter",
    prompt: "Book & chapter where God reveals His name 'I AM WHO I AM' (Yahweh) to Moses at the burning bush:",
    bookId: "EXO",
    chapterNum: 3,
    acceptedAnswers: ["Exodus 3", "Exo 3", "Exodus 3:14", "Exodus ch 3"],
    displayAnswer: "Exodus 3",
    explanation: "Exodus 3:14: God speaks to Moses at Mount Horeb from the burning bush.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "bmpi_pent_14",
    type: "chapter_in_book",
    prompt: "What chapter in Exodus institutes the Passover lamb and the deliverance from the tenth plague?",
    bookId: "EXO",
    chapterNum: 12,
    acceptedAnswers: ["12", "Exodus 12", "Exo 12", "ch 12", "chapter 12"],
    displayAnswer: "Exodus 12 (or Chapter 12)",
    explanation: "Exodus 12: The blood of the Passover lamb placed on doorposts protects Israel's firstborn.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "bmpi_pent_15",
    type: "facts",
    prompt: "Moses' father-in-law who gave him practical advice on delegating judicial leadership and appointing capable leaders over thousands, hundreds, fifties, and tens:",
    bookId: "EXO",
    chapterNum: 18,
    acceptedAnswers: ["Jethro", "Reuel", "Jethro the priest of Midian"],
    displayAnswer: "Jethro (Reuel)",
    explanation: "Exodus 18:13-27: Jethro's delegation model is a foundational biblical leadership principle.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "bmpi_hist_2",
    type: "facts",
    prompt: "This godly high priest protected young Joash in a coup d'\u00e9tat against Athaliah and crowned him king, influencing the nation for good throughout his life:",
    bookId: "2KI",
    chapterNum: 11,
    acceptedAnswers: ["Jehoiada", "Jehoiada the priest"],
    displayAnswer: "Jehoiada",
    explanation: "2 Kings 11-12 & 2 Chronicles 24: Jehoiada guided King Joash in righteousness.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "bmpi_hist_7",
    type: "facts",
    prompt: "This prophet and judge transitioned Israel from decentralized judges to centralized monarchy, exemplifying prayer: 'Far be it from me that I should sin against the Lord by ceasing to pray for you':",
    bookId: "1SA",
    chapterNum: 12,
    acceptedAnswers: ["Samuel", "Prophet Samuel"],
    displayAnswer: "Samuel",
    explanation: "1 Samuel 12:23: Samuel's dedication to intercession and teaching.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "bmpi_hist_9",
    type: "facts",
    prompt: "This prophet had a classic power encounter with 450 prophets of Baal on Mount Carmel, calling down fire from heaven:",
    bookId: "1KI",
    chapterNum: 18,
    acceptedAnswers: ["Elijah", "Elijah the Tishbite"],
    displayAnswer: "Elijah",
    explanation: "1 Kings 18: Elijah's victory on Mount Carmel.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "bmpi_hist_10",
    type: "facts",
    prompt: "This king of Judah prospered when he sought God, but grew proud and entered the Temple to burn incense, being struck by God with leprosy on his forehead:",
    bookId: "2CH",
    chapterNum: 26,
    acceptedAnswers: ["Uzziah", "Azariah", "King Uzziah"],
    displayAnswer: "Uzziah (Azariah)",
    explanation: "2 Chronicles 26:16-21: Uzziah's pride and unlawful usurpation of the priesthood.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "bmpi_hist_11",
    type: "facts",
    prompt: "This prophetess and judge led Israel during a time of crisis against Jabin king of Hazor and his general Sisera:",
    bookId: "JDG",
    chapterNum: 4,
    acceptedAnswers: ["Deborah"],
    displayAnswer: "Deborah",
    explanation: "Judges 4-5: Deborah judged Israel and summoned Barak to battle.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "bmpi_hist_12",
    type: "facts",
    prompt: "This courageous prophet stood alone against 400 false prophets before Ahab and Jehoshaphat, speaking truth despite being slapped and imprisoned:",
    bookId: "1KI",
    chapterNum: 22,
    acceptedAnswers: ["Micaiah", "Micaiah son of Imlah"],
    displayAnswer: "Micaiah",
    explanation: "1 Kings 22: Micaiah prophesied Ahab's defeat and death at Ramoth-gilead.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "bmpi_hist_13",
    type: "facts",
    prompt: "This wise king built the glorious temple in Jerusalem but finished poorly as his foreign wives turned his heart away after other gods:",
    bookId: "1KI",
    chapterNum: 11,
    acceptedAnswers: ["Solomon", "King Solomon"],
    displayAnswer: "Solomon",
    explanation: "1 Kings 11: Solomon's divided loyalty and tragic decline in old age.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "bmpi_hist_14",
    type: "facts",
    prompt: "Aaron's son and successor as high priest, who served alongside Joshua in dividing the Promised Land by lot:",
    bookId: "NUM",
    chapterNum: 20,
    acceptedAnswers: ["Eleazar", "Eleazar the priest"],
    displayAnswer: "Eleazar",
    explanation: "Numbers 20:25-28 & Joshua 14:1: Eleazar succeeded Aaron on Mount Hor.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "bmpi_hist_15",
    type: "facts",
    prompt: "Elijah's servant and successor who received a double portion of his spirit and performed numerous miracles demonstrating God's compassion and power:",
    bookId: "2KI",
    chapterNum: 2,
    acceptedAnswers: ["Elisha", "Elisha son of Shaphat"],
    displayAnswer: "Elisha",
    explanation: "2 Kings 2-13: Elisha's extensive prophetic and pastoral ministry in Israel.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "bmpi_hist_16",
    type: "facts",
    prompt: "This priest at Shiloh failed to discipline his corrupt sons Hophni and Phinehas, resulting in his sons dying on the same day and the Ark being captured:",
    bookId: "1SA",
    chapterNum: 2,
    acceptedAnswers: ["Eli", "Eli the priest"],
    displayAnswer: "Eli",
    explanation: "1 Samuel 2-4: Eli's negative example of parental and spiritual negligence.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "bmpi_hist_17",
    type: "facts",
    prompt: "This godly king sent Levites to teach the Law in Judah's cities and appointed honest judges, though he made an unwise alliance with wicked King Ahab:",
    bookId: "2CH",
    chapterNum: 17,
    acceptedAnswers: ["Jehoshaphat", "King Jehoshaphat"],
    displayAnswer: "Jehoshaphat",
    explanation: "2 Chronicles 17-20: Jehoshaphat led Judah to victory through prayer and worship.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "bmpi_hist_18",
    type: "book_id",
    prompt: "In what Old Testament book does Boaz act as the kinsman-redeemer (Go'el), foreshadowing Christ and concluding with the genealogy of David?",
    bookId: "RUT",
    chapterNum: 4,
    acceptedAnswers: ["Ruth", "Book of Ruth", "Rut"],
    displayAnswer: "Ruth",
    explanation: "Ruth 4: Boaz marries Ruth to redeem Elimelech's line, fathering Obed the grandfather of David.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "bmpi_poet_2",
    type: "book_id",
    prompt: "In what book does this observation occur: 'Because the sentence against an evil deed is not executed speedily, the heart of the children of man is fully set to do evil'?",
    bookId: "ECC",
    chapterNum: 8,
    acceptedAnswers: ["Ecclesiastes", "Ecc", "Qoheleth"],
    displayAnswer: "Ecclesiastes",
    explanation: "Ecclesiastes 8:11: Solomon observes how delayed justice encourages wickedness.",
    scope: "OT",
    genre: "Poetry/Wisdom"
  },
  {
    id: "bmpi_poet_5",
    type: "book_id",
    prompt: "What book reflects on Joseph: 'He had sent a man before them, Joseph, who was sold as a slave. His feet were hurt with fetters; his neck was put in a collar of iron; until what he had said came to pass, the word of the Lord tested him'?",
    bookId: "PSA",
    chapterNum: 105,
    acceptedAnswers: ["Psalms", "Psalm 105", "Psalm", "Psa 105"],
    displayAnswer: "Psalms (Psalm 105)",
    explanation: "Psalm 105:17-19: A poetic historical psalm recounting God's covenant faithfulness.",
    scope: "OT",
    genre: "Poetry/Wisdom"
  },
  {
    id: "bmpi_poet_6",
    type: "book_id",
    prompt: "In what book does the phrase occur: 'I am my beloved's and my beloved is mine; he grazes among the lilies'?",
    bookId: "SNG",
    chapterNum: 6,
    acceptedAnswers: ["Song of Solomon", "Song of Songs", "Canticles", "Sng"],
    displayAnswer: "Song of Solomon (Song of Songs)",
    explanation: "Song of Solomon 6:3: The mutual devotion of bride and groom.",
    scope: "OT",
    genre: "Poetry/Wisdom"
  },
  {
    id: "bmpi_poet_7",
    type: "book_id",
    prompt: "In what book does this historical reflection on Israel's craving occur: 'He gave them what they asked, but sent a wasting disease among them (leanness to their souls)'?",
    bookId: "PSA",
    chapterNum: 106,
    acceptedAnswers: ["Psalms", "Psalm 106", "Psalm", "Psa 106"],
    displayAnswer: "Psalms (Psalm 106)",
    explanation: "Psalm 106:15: Warning about demanding things contrary to God's good timing.",
    scope: "OT",
    genre: "Poetry/Wisdom"
  },
  {
    id: "bmpi_poet_8",
    type: "book_chapter",
    prompt: "Book & chapter containing: 'Delight yourself in the Lord, and he will give you the desires of your heart. Commit your way to the Lord; trust in him, and he will act':",
    bookId: "PSA",
    chapterNum: 37,
    acceptedAnswers: ["Psalm 37", "Psalms 37", "Psa 37", "Psalm 37:4"],
    displayAnswer: "Psalm 37",
    explanation: "Psalm 37:4-5: David's wisdom psalm on trusting the LORD over evildoers.",
    scope: "OT",
    genre: "Poetry/Wisdom"
  },
  {
    id: "bmpi_poet_9",
    type: "book_chapter",
    prompt: "Book & chapter where David cries: 'Create in me a clean heart, O God, and renew a right spirit within me. Cast me not away from your presence...':",
    bookId: "PSA",
    chapterNum: 51,
    acceptedAnswers: ["Psalm 51", "Psalms 51", "Psa 51", "Psalm 51:10"],
    displayAnswer: "Psalm 51",
    explanation: "Psalm 51:10-12: David's great prayer of confession after Nathan's confrontation.",
    scope: "OT",
    genre: "Poetry/Wisdom"
  },
  {
    id: "bmpi_poet_10",
    type: "book_chapter",
    prompt: "Book & chapter: 'Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths':",
    bookId: "PRO",
    chapterNum: 3,
    acceptedAnswers: ["Proverbs 3", "Prov 3", "Proverbs 3:5", "Proverbs 3:5-6"],
    displayAnswer: "Proverbs 3",
    explanation: "Proverbs 3:5-6: Foundational biblical principle for divine guidance.",
    scope: "OT",
    genre: "Poetry/Wisdom"
  },
  {
    id: "bmpi_poet_11",
    type: "book_id",
    prompt: "In what book does this saying on divine sovereignty appear: 'The king's heart is a stream of water in the hand of the Lord; he turns it wherever he will'?",
    bookId: "PRO",
    chapterNum: 21,
    acceptedAnswers: ["Proverbs", "Prov", "Proverbs 21"],
    displayAnswer: "Proverbs",
    explanation: "Proverbs 21:1: Affirming God's ultimate sovereignty over earthly rulers.",
    scope: "OT",
    genre: "Poetry/Wisdom"
  },
  {
    id: "bmpi_prop_2",
    type: "book_id",
    prompt: "In what book does God encourage Zerubbabel: 'Not by might, nor by power, but by my Spirit, says the Lord of hosts'?",
    bookId: "ZEC",
    chapterNum: 4,
    acceptedAnswers: ["Zechariah", "Zec", "Zechariah 4"],
    displayAnswer: "Zechariah",
    explanation: "Zechariah 4:6: The empowerment for rebuilding the Temple.",
    scope: "OT",
    genre: "Minor Prophets"
  },
  {
    id: "bmpi_prop_7",
    type: "chapter_in_book",
    prompt: "What chapter in Ezekiel contains the vision of the Valley of Dry Bones coming to life by the breath (Spirit) of God?",
    bookId: "EZK",
    chapterNum: 37,
    acceptedAnswers: ["37", "Ezekiel 37", "Ezek 37", "Ezk 37", "ch 37", "chapter 37"],
    displayAnswer: "Ezekiel 37 (or Chapter 37)",
    explanation: "Ezekiel 37:1-14: Prophetic vision of Israel's national and spiritual resurrection.",
    scope: "OT",
    genre: "Major Prophets"
  },
  {
    id: "bmpi_prop_9",
    type: "facts",
    prompt: "Which prophet foretold the outpouring of the Holy Spirit: 'And it shall come to pass afterward, that I will pour out my Spirit on all flesh; your sons and your daughters shall prophesy...', quoted by Peter in Acts 2?",
    bookId: "JOL",
    chapterNum: 2,
    acceptedAnswers: ["Joel", "Jol"],
    displayAnswer: "Joel",
    explanation: "Joel 2:28-32: Prophesied the outpouring of the Spirit fulfilled at Pentecost.",
    scope: "OT",
    genre: "Minor Prophets"
  },
  {
    id: "bmpi_prop_10",
    type: "facts",
    prompt: "Which prophet predicted the Messiah would be born in Bethlehem Ephrathah: 'from you shall come forth for me one who is to be ruler in Israel, whose coming forth is from of old, from ancient days'?",
    bookId: "MIC",
    chapterNum: 5,
    acceptedAnswers: ["Micah", "Mic"],
    displayAnswer: "Micah",
    explanation: "Micah 5:2: Quoted by the chief priests and scribes to King Herod in Matthew 2:6.",
    scope: "OT",
    genre: "Minor Prophets"
  },
  {
    id: "bmpi_prop_11",
    type: "book_id",
    prompt: "In what book does God challenge His people: 'Bring the full tithe into the storehouse, that there may be food in my house. And thereby put me to the test... if I will not open the windows of heaven for you'?",
    bookId: "MAL",
    chapterNum: 3,
    acceptedAnswers: ["Malachi", "Mal"],
    displayAnswer: "Malachi",
    explanation: "Malachi 3:10: The final Old Testament prophet addressing covenant unfaithfulness.",
    scope: "OT",
    genre: "Minor Prophets"
  },
  {
    id: "bmpi_gosp_2",
    type: "book_chapter",
    prompt: "Book & chapter containing the Great Commission: 'Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, teaching them to observe all that I have commanded you':",
    bookId: "MAT",
    chapterNum: 28,
    acceptedAnswers: ["Matthew 28", "Matt 28", "Mt 28", "Matthew 28:19", "Matthew 28:18-20"],
    displayAnswer: "Matthew 28",
    explanation: "Matthew 28:18-20: Jesus' authoritative commission to the Church.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "bmpi_gosp_6",
    type: "book_chapter",
    prompt: "Book & chapter: 'And the Word became flesh and dwelt among us, and we have seen his glory, glory as of the only Son from the Father, full of grace and truth':",
    bookId: "JHN",
    chapterNum: 1,
    acceptedAnswers: ["John 1", "Jn 1", "John 1:14", "John ch 1"],
    displayAnswer: "John 1",
    explanation: "John 1:14: The pinnacle declaration of the Incarnation.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "bmpi_gosp_7",
    type: "chapter_in_book",
    prompt: "In what chapter of Acts does Peter declare before the Sanhedrin: 'And there is salvation in no one else, for there is no other name under heaven given among men by which we must be saved'?",
    bookId: "ACT",
    chapterNum: 4,
    acceptedAnswers: ["4", "Acts 4", "Act 4", "ch 4", "chapter 4"],
    displayAnswer: "Acts 4 (or Chapter 4)",
    explanation: "Acts 4:12: Peter boldly proclaims the exclusivity of Jesus Christ as Savior.",
    scope: "NT",
    genre: "Acts (History)"
  },
  {
    id: "bmpi_gosp_8",
    type: "facts",
    prompt: "Which three chapters in Matthew comprise the complete Sermon on the Mount?",
    bookId: "MAT",
    chapterNum: 5,
    acceptedAnswers: ["Matthew 5, 6, 7", "Matthew 5-7", "Matt 5-7", "5-7", "5, 6, 7"],
    displayAnswer: "Matthew 5, 6, and 7",
    explanation: "Matthew chapters 5, 6, and 7 contain the Beatitudes, Lord's Prayer, and Kingdom ethics.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "bmpi_gosp_9",
    type: "facts",
    prompt: "Which four chapters in John contain Jesus' Upper Room Farewell Discourse and High Priestly Prayer?",
    bookId: "JHN",
    chapterNum: 14,
    acceptedAnswers: [
      "John 14-17",
      "John 14 to 17",
      "John 14, 15, 16, 17",
      "John 14, 15, 16, and 17",
      "Jn 14-17",
      "14-17",
      "14 to 17",
      "14, 15, 16, 17",
      "14, 15, 16, and 17",
      "chapters 14-17",
      "chapters 14 to 17"
    ],
    displayAnswer: "John 14\u201317",
    explanation: "John 14\u201317: Jesus comforts His disciples, promises the Holy Spirit, and prays for believers.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "bmpi_gosp_10",
    type: "chapter_in_book",
    prompt: "What chapter in Luke contains the trilogy of parables: the Lost Sheep, the Lost Coin, and the Prodigal Son?",
    bookId: "LUK",
    chapterNum: 15,
    acceptedAnswers: ["15", "Luke 15", "Luk 15", "ch 15", "chapter 15"],
    displayAnswer: "Luke 15 (or Chapter 15)",
    explanation: "Luke 15: Demonstrates God's lavish joy over one sinner who repents.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "bmpi_paul_1",
    type: "book_chapter",
    prompt: "In what book and chapter does Paul explain: 'For the Lord himself will descend from heaven with a cry of command, with the voice of an archangel, and with the sound of the trumpet of God. And the dead in Christ will rise first. Then we who are alive, who are left, will be caught up together with them in the clouds...'?",
    bookId: "1TH",
    chapterNum: 4,
    acceptedAnswers: ["1 Thessalonians 4", "1 Thess 4", "1Th 4", "1 Thessalonians 4:16-17"],
    displayAnswer: "1 Thessalonians 4",
    explanation: "1 Thessalonians 4:13-18: Paul comforts believers concerning the resurrection and the return of Christ.",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "bmpi_paul_2",
    type: "book_id",
    prompt: "In what epistle does Paul write that the grace of God trains us to renounce ungodliness and worldly passions while waiting for our 'blessed hope, the appearing of the glory of our great God and Savior Jesus Christ'?",
    bookId: "TIT",
    chapterNum: 2,
    acceptedAnswers: ["Titus", "Tit"],
    displayAnswer: "Titus",
    explanation: "Titus 2:11-14: Grace transforms daily character and fosters eager expectation of Christ's return.",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "bmpi_paul_3",
    type: "book_id",
    prompt: "In what book does Paul state his purpose for leaving a coworker: 'This is why I left you in Crete, so that you might put what remained into order, and appoint elders in every town as I directed you'?",
    bookId: "TIT",
    chapterNum: 1,
    acceptedAnswers: ["Titus", "Tit"],
    displayAnswer: "Titus",
    explanation: "Titus 1:5: Paul's instructions to Titus on establishing godly church governance.",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "bmpi_paul_4",
    type: "book_id",
    prompt: "What epistle contains the lofty christological declaration: 'For in him the whole fullness of deity dwells bodily, and you have been filled in him, who is the head of all rule and authority'?",
    bookId: "COL",
    chapterNum: 2,
    acceptedAnswers: ["Colossians", "Col"],
    displayAnswer: "Colossians",
    explanation: "Colossians 2:9-10: Refutes proto-Gnostic heresy by asserting Christ's complete and bodily deity.",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "bmpi_paul_5",
    type: "book_chapter",
    prompt: "Book & chapter: 'I have been crucified with Christ. It is no longer I who live, but Christ who lives in me. And the life I now live in the flesh I live by faith in the Son of God, who loved me and gave himself for me':",
    bookId: "GAL",
    chapterNum: 2,
    acceptedAnswers: ["Galatians 2", "Gal 2", "Galatians 2:20", "Gal 2:20"],
    displayAnswer: "Galatians 2",
    explanation: "Galatians 2:20: The heart of the believer's identification and union with Christ.",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "bmpi_paul_6",
    type: "book_id",
    prompt: "In what epistle does Paul pen the famous aphorism: 'for we walk by faith, not by sight'?",
    bookId: "2CO",
    chapterNum: 5,
    acceptedAnswers: ["2 Corinthians", "2 Cor", "2Cor"],
    displayAnswer: "2 Corinthians",
    explanation: "2 Corinthians 5:7: Living with an eternal heavenly perspective amidst mortal trials.",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "bmpi_paul_7",
    type: "chapter_in_book",
    prompt: "What chapter in Romans teaches that our old self was crucified with Christ so that we would no longer be enslaved to sin, but walk in newness of life?",
    bookId: "ROM",
    chapterNum: 6,
    acceptedAnswers: ["6", "Romans 6", "Rom 6", "ch 6", "chapter 6"],
    displayAnswer: "Romans 6 (or Chapter 6)",
    explanation: "Romans 6: Explains baptism into Christ's death and resurrection power over sin.",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "bmpi_paul_8",
    type: "chapter_in_book",
    prompt: "In what chapter of Romans does Paul exclaim: 'No, in all these things we are more than conquerors through him who loved us' and declare nothing can separate us from God's love?",
    bookId: "ROM",
    chapterNum: 8,
    acceptedAnswers: ["8", "Romans 8", "Rom 8", "ch 8", "chapter 8"],
    displayAnswer: "Romans 8 (or Chapter 8)",
    explanation: "Romans 8:37-39: The grand crescendo of Romans affirming eternal security.",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "bmpi_paul_9",
    type: "book_chapter",
    prompt: "Book & chapter: 'No temptation has overtaken you that is not common to man. God is faithful, and he will not let you be tempted beyond your ability, but with the temptation he will also provide the way of escape...':",
    bookId: "1CO",
    chapterNum: 10,
    acceptedAnswers: ["1 Corinthians 10", "1 Cor 10", "1Co 10", "1 Corinthians 10:13"],
    displayAnswer: "1 Corinthians 10",
    explanation: "1 Corinthians 10:13: God's faithful provision of endurance and escape in temptation.",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "bmpi_paul_10",
    type: "chapter_in_book",
    prompt: "What chapter in 1 Corinthians is known as the 'Love Chapter', concluding with 'So now faith, hope, and love abide, these three; but the greatest of these is love'?",
    bookId: "1CO",
    chapterNum: 13,
    acceptedAnswers: ["13", "1 Corinthians 13", "1 Cor 13", "ch 13", "chapter 13"],
    displayAnswer: "1 Corinthians 13 (or Chapter 13)",
    explanation: "1 Corinthians 13: Demonstrates that spiritual gifts without love are noisy and unprofitable.",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "bmpi_paul_11",
    type: "book_id",
    prompt: "In what epistle does Paul write: 'For the weapons of our warfare are not of the flesh but have divine power to destroy strongholds. We destroy arguments and every lofty opinion raised against the knowledge of God'?",
    bookId: "2CO",
    chapterNum: 10,
    acceptedAnswers: ["2 Corinthians", "2 Cor", "2Cor"],
    displayAnswer: "2 Corinthians",
    explanation: "2 Corinthians 10:4-5: Spiritual warfare through biblical truth and taking thoughts captive.",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "bmpi_paul_12",
    type: "book_id",
    prompt: "Which prison epistle emphasizes that true Christian joy transcends difficult circumstances, featuring 'Rejoice in the Lord always; again I will say, rejoice'?",
    bookId: "PHP",
    chapterNum: 4,
    acceptedAnswers: ["Philippians", "Phil", "Php"],
    displayAnswer: "Philippians",
    explanation: "Philippians: Paul writes from Roman imprisonment with overflowing joy in Christ.",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "bmpi_paul_13",
    type: "chapter_in_book",
    prompt: "What chapter in Ephesians describes the complete Armor of God (belt of truth, breastplate of righteousness, shield of faith, helmet of salvation, sword of the Spirit)?",
    bookId: "EPH",
    chapterNum: 6,
    acceptedAnswers: ["6", "Ephesians 6", "Eph 6", "ch 6", "chapter 6"],
    displayAnswer: "Ephesians 6 (or Chapter 6)",
    explanation: "Ephesians 6:10-18: The believer's armor for standing against the schemes of the devil.",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "bmpi_paul_14",
    type: "book_id",
    prompt: "In what short letter does Paul urge a Christian slave owner to receive back his runaway slave Onesimus 'no longer as a bondservant but more than a bondservant, as a beloved brother'?",
    bookId: "PHM",
    chapterNum: 1,
    acceptedAnswers: ["Philemon", "Phm"],
    displayAnswer: "Philemon",
    explanation: "Philemon: A masterwork of Christian persuasion, reconciliation, and brotherhood.",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "bmpi_paul_15",
    type: "book_id",
    prompt: "Paul's final recorded letter, written from a Roman dungeon facing execution, where he writes 'I have fought the good fight, I have finished the race, I have kept the faith':",
    bookId: "2TI",
    chapterNum: 4,
    acceptedAnswers: ["2 Timothy", "2 Tim", "2Ti"],
    displayAnswer: "2 Timothy",
    explanation: "2 Timothy 4:6-8: Paul's final charge and farewell to his son in the faith, Timothy.",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "bmpi_gen_1",
    type: "book_id",
    prompt: "In what epistle does the author instruct: 'Remember your leaders, those who spoke to you the word of God. Consider the outcome of their way of life, and imitate their faith'?",
    bookId: "HEB",
    chapterNum: 13,
    acceptedAnswers: ["Hebrews", "Heb"],
    displayAnswer: "Hebrews",
    explanation: "Hebrews 13:7: Highlights the crucial leadership principle of godly role modeling.",
    scope: "NT",
    genre: "General Epistles"
  },
  {
    id: "bmpi_gen_2",
    type: "book_id",
    prompt: "Which short epistle opens: 'The elder to the elect lady and her children, whom I love in truth, and not only I, but also all who know the truth'?",
    bookId: "2JN",
    chapterNum: 1,
    acceptedAnswers: ["2 John", "2 Jn", "Second John"],
    displayAnswer: "2 John",
    explanation: "2 John 1: Warns against deceivers who do not confess Jesus Christ coming in the flesh.",
    scope: "NT",
    genre: "General Epistles"
  },
  {
    id: "bmpi_gen_3",
    type: "book_id",
    prompt: "In what epistle does the author recount that the archangel Michael, when disputing with the devil about the body of Moses, said: 'The Lord rebuke you!'?",
    bookId: "JUD",
    chapterNum: 1,
    acceptedAnswers: ["Jude", "Jud"],
    displayAnswer: "Jude",
    explanation: "Jude 9: A warning against arrogant blasphemy by illustrating Michael's reverent humility.",
    scope: "NT",
    genre: "General Epistles"
  },
  {
    id: "bmpi_gen_4",
    type: "book_id",
    prompt: "In what epistle does this gospel summary occur: 'For Christ also suffered once for sins, the righteous for the unrighteous, that he might bring us to God, being put to death in the flesh but made alive in the spirit'?",
    bookId: "1PE",
    chapterNum: 3,
    acceptedAnswers: ["1 Peter", "1 Pet", "1Pe"],
    displayAnswer: "1 Peter",
    explanation: "1 Peter 3:18: The heart of Christ's substitutionary suffering on behalf of believers.",
    scope: "NT",
    genre: "General Epistles"
  },
  {
    id: "bmpi_gen_5",
    type: "book_id",
    prompt: "In which short epistle does John commend Gaius for showing hospitality to traveling missionary workers ('fellow workers for the truth') while rebuking Diotrephes?",
    bookId: "3JN",
    chapterNum: 1,
    acceptedAnswers: ["3 John", "3 Jn", "Third John"],
    displayAnswer: "3 John",
    explanation: "3 John 1-8: Commends support and hospitality for traveling ministers of the Gospel.",
    scope: "NT",
    genre: "General Epistles"
  },
  {
    id: "bmpi_gen_6",
    type: "chapter_in_book",
    prompt: "What chapter in Revelation describes the New Jerusalem descending out of heaven: 'He will wipe away every tear from their eyes, and death shall be no more, neither shall there be mourning, nor crying, nor pain anymore'?",
    bookId: "REV",
    chapterNum: 21,
    acceptedAnswers: ["21", "Revelation 21", "Rev 21", "ch 21", "chapter 21"],
    displayAnswer: "Revelation 21 (or Chapter 21)",
    explanation: "Revelation 21: The vision of the new heaven, new earth, and holy city.",
    scope: "NT",
    genre: "Revelation"
  },
  {
    id: "bmpi_gen_7",
    type: "chapter_in_book",
    prompt: "What chapter in James argues that 'faith by itself, if it does not have works, is dead', using Abraham and Rahab as examples of living faith?",
    bookId: "JAS",
    chapterNum: 2,
    acceptedAnswers: ["2", "James 2", "Jas 2", "ch 2", "chapter 2"],
    displayAnswer: "James 2 (or Chapter 2)",
    explanation: "James 2:14-26: Demonstrates that genuine saving faith inevitably produces righteous fruit.",
    scope: "NT",
    genre: "General Epistles"
  },
  {
    id: "bmpi_gen_8",
    type: "chapter_in_book",
    prompt: "What chapter in Hebrews explains that Jesus is a high priest forever after the order of Melchizedek, surpassing the Levitical priesthood?",
    bookId: "HEB",
    chapterNum: 7,
    acceptedAnswers: ["7", "Hebrews 7", "Heb 7", "ch 7", "chapter 7"],
    displayAnswer: "Hebrews 7 (or Chapter 7)",
    explanation: "Hebrews 7: Christ's indestructible life and eternal priesthood superior to Aaron's line.",
    scope: "NT",
    genre: "General Epistles"
  },
  {
    id: "bmpi_gen_9",
    type: "book_chapter",
    prompt: "Book & chapter: 'If we say we have fellowship with him while we walk in darkness, we lie and do not practice the truth. But if we walk in the light, as he is in the light, we have fellowship with one another, and the blood of Jesus his Son cleanses us from all sin':",
    bookId: "1JN",
    chapterNum: 1,
    acceptedAnswers: ["1 John 1", "1 Jn 1", "1 John 1:6-7"],
    displayAnswer: "1 John 1",
    explanation: "1 John 1:6-9: Walking in the light, authentic fellowship, and forgiveness through confession.",
    scope: "NT",
    genre: "General Epistles"
  },
  {
    id: "bmpi_gen_10",
    type: "chapter_in_book",
    prompt: "What chapter in Revelation shows the Lion of the tribe of Judah appearing as a Lamb looking as if it had been slain, alone worthy to open the scroll with seven seals?",
    bookId: "REV",
    chapterNum: 5,
    acceptedAnswers: ["5", "Revelation 5", "Rev 5", "ch 5", "chapter 5"],
    displayAnswer: "Revelation 5 (or Chapter 5)",
    explanation: "Revelation 5: The heavenly throne room worshiping the Worthy Lamb.",
    scope: "NT",
    genre: "Revelation"
  },

  // =========================================================================
  // NT DIAGNOSTIC QUESTIONS (Form 1)
  // =========================================================================
  {
    id: "nt_q1",
    type: "facts",
    prompt: "Who prepared the way for Jesus in the wilderness?",
    bookId: "MAT",
    chapterNum: 3,
    verseRange: "1–4",
    acceptedAnswers: ["John the Baptist", "John Baptist", "John the baptizer"],
    displayAnswer: "John the Baptist",
    explanation: "John the Baptist preached in the wilderness of Judea: 'Prepare the way of the Lord' (Matt 3:1–3, Mark 1:3).",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "nt_q2",
    type: "chapter_in_book",
    prompt: "What chapter in Luke contains the Parable of the Good Samaritan?",
    bookId: "LUK",
    chapterNum: 10,
    verseRange: "25–37",
    acceptedAnswers: ["10", "ch 10", "chapter 10", "Luke 10", "Luk 10"],
    displayAnswer: "Luke 10 (or Chapter 10)",
    explanation: "Jesus tells the Parable of the Good Samaritan to a lawyer in Luke 10:25–37.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "nt_q3",
    type: "chapter_in_book",
    prompt: "What chapter in Romans describes all having sinned and fallen short of the glory of God?",
    bookId: "ROM",
    chapterNum: 3,
    verseRange: "23",
    acceptedAnswers: ["3", "ch 3", "chapter 3", "Romans 3", "Rom 3"],
    displayAnswer: "Romans 3 (or Chapter 3)",
    explanation: "Romans 3:23 states: 'For all have sinned and fall short of the glory of God.'",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "nt_q4",
    type: "facts",
    prompt: "Which disciple doubted Jesus' resurrection until he touched His wounds?",
    bookId: "JHN",
    chapterNum: 20,
    verseRange: "24–29",
    acceptedAnswers: ["Thomas", "Doubting Thomas", "Didymus"],
    displayAnswer: "Thomas",
    explanation: "In John 20:24–29, Thomas confessed 'My Lord and my God!' after seeing and touching Jesus' wounds.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "nt_q5",
    type: "facts",
    prompt: "Who was the couple that helped teach Apollos the way of God more accurately?",
    bookId: "ACT",
    chapterNum: 18,
    verseRange: "24–26",
    acceptedAnswers: ["Aquila and Priscilla", "Priscilla and Aquila", "Priscilla & Aquila", "Aquila & Priscilla", "Prisca and Aquila"],
    displayAnswer: "Priscilla and Aquila (or Aquila and Priscilla)",
    explanation: "In Acts 18:26, Priscilla and Aquila heard Apollos and explained the way of God to him more accurately.",
    scope: "NT",
    genre: "Acts (History)"
  },
  {
    id: "nt_q6",
    type: "book_chapter",
    prompt: "Book & chapter: 'For God did not send his Son into the world to condemn the world, but in order that the world might be saved through him'",
    bookId: "JHN",
    chapterNum: 3,
    verseRange: "17",
    acceptedAnswers: ["John 3", "Jn 3", "John 3:17", "John ch 3"],
    displayAnswer: "John 3",
    explanation: "John 3:17 immediately follows the famous John 3:16 during Jesus' dialogue with Nicodemus.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "nt_q7",
    type: "chapter_in_book",
    prompt: "What chapter in Matthew contains the Lord's Prayer (in the Sermon on the Mount)?",
    bookId: "MAT",
    chapterNum: 6,
    verseRange: "9–13",
    acceptedAnswers: ["6", "ch 6", "chapter 6", "Matthew 6", "Matt 6", "Mt 6"],
    displayAnswer: "Matthew 6 (or Chapter 6)",
    explanation: "The Lord's Prayer ('Our Father in heaven...') is recorded in Matthew 6:9–13 (and Luke 11).",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "nt_q8",
    type: "chapter_in_book",
    prompt: "What chapter in Acts describes the Day of Pentecost and the coming of the Holy Spirit with tongues of fire?",
    bookId: "ACT",
    chapterNum: 2,
    verseRange: "1–4",
    acceptedAnswers: ["2", "ch 2", "chapter 2", "Acts 2", "Act 2"],
    displayAnswer: "Acts 2 (or Chapter 2)",
    explanation: "Acts 2 recounts the descent of the Holy Spirit at Pentecost, Peter's sermon, and 3,000 souls being saved.",
    scope: "NT",
    genre: "Acts (History)"
  },
  {
    id: "nt_q9",
    type: "book_id",
    prompt: "Which Gospel is generally considered the shortest and earliest written?",
    bookId: "MRK",
    chapterNum: 1,
    acceptedAnswers: ["Mark", "Gospel of Mark", "Mrk", "Mk"],
    displayAnswer: "Mark",
    explanation: "The Gospel of Mark (16 chapters) is the shortest and widely recognized as the earliest written Gospel.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "nt_q10",
    type: "facts",
    prompt: "In what city was Jesus born?",
    bookId: "LUK",
    chapterNum: 2,
    verseRange: "4–7",
    acceptedAnswers: ["Bethlehem", "Bethlehem of Judea", "City of David"],
    displayAnswer: "Bethlehem",
    explanation: "Jesus was born in Bethlehem of Judea, fulfilling the prophecy of Micah 5:2 (Luke 2:4, Matt 2:1).",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "nt_q11",
    type: "chapter_in_book",
    prompt: "What chapter is the Jerusalem Council in Acts (debating circumcision & Gentile salvation)?",
    bookId: "ACT",
    chapterNum: 15,
    verseRange: "1–29",
    acceptedAnswers: ["15", "ch 15", "chapter 15", "Acts 15", "Act 15"],
    displayAnswer: "Acts 15 (or Chapter 15)",
    explanation: "The Jerusalem Council in Acts 15 affirmed that Gentiles are saved by grace through faith without circumcision.",
    scope: "NT",
    genre: "Acts (History)"
  },
  {
    id: "nt_q12",
    type: "chapter_in_book",
    prompt: "What chapter in 1 Corinthians is the famous 'Resurrection Chapter'?",
    bookId: "1CO",
    chapterNum: 15,
    verseRange: "1–58",
    acceptedAnswers: ["15", "ch 15", "chapter 15", "1 Corinthians 15", "1 Cor 15"],
    displayAnswer: "1 Corinthians 15 (or Chapter 15)",
    explanation: "1 Corinthians 15 is Paul's magnificent treatise on the bodily resurrection of Christ and believers.",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "nt_q13",
    type: "verse_completion",
    prompt: "Ephesians 2:8: 'For by ______ you have been saved through faith.'",
    bookId: "EPH",
    chapterNum: 2,
    verseRange: "8",
    acceptedAnswers: ["grace", "by grace"],
    displayAnswer: "grace",
    explanation: "Ephesians 2:8: 'For by grace you have been saved through faith. And this is not your own doing; it is the gift of God.'",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "nt_q14",
    type: "book_chapter",
    prompt: "What book & chapter does Paul say farewell to the Ephesian elders? ('I do not account my life of any value')",
    bookId: "ACT",
    chapterNum: 20,
    verseRange: "17–38",
    acceptedAnswers: ["Acts 20", "Act 20", "Acts ch 20"],
    displayAnswer: "Acts 20",
    explanation: "In Acts 20:17–38 at Miletus, Paul delivers his emotional farewell address to the elders of the church of Ephesus.",
    scope: "NT",
    genre: "Acts (History)"
  },
  {
    id: "nt_q15",
    type: "chapter_in_book",
    prompt: "What chapter is the birth of Jesus narrative in Luke (shepherds, angels, manger)?",
    bookId: "LUK",
    chapterNum: 2,
    verseRange: "1–20",
    acceptedAnswers: ["2", "ch 2", "chapter 2", "Luke 2", "Luk 2"],
    displayAnswer: "Luke 2 (or Chapter 2)",
    explanation: "Luke 2 records Caesar Augustus' census, the journey to Bethlehem, the manger, and the angels announcing Christ's birth to shepherds.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "nt_q16",
    type: "verse_completion",
    prompt: "Acts 1:8: 'But you will receive ______ when the Holy Spirit has come upon you'",
    bookId: "ACT",
    chapterNum: 1,
    verseRange: "8",
    acceptedAnswers: ["power"],
    displayAnswer: "power",
    explanation: "Acts 1:8: 'But you will receive power when the Holy Spirit has come upon you, and you will be my witnesses...'",
    scope: "NT",
    genre: "Acts (History)"
  },
  {
    id: "nt_q17",
    type: "facts",
    prompt: "Which Pharisee and ruler of the Jews secretly met with Jesus at night?",
    bookId: "JHN",
    chapterNum: 3,
    verseRange: "1–9",
    acceptedAnswers: ["Nicodemus"],
    displayAnswer: "Nicodemus",
    explanation: "In John 3:1–9, Nicodemus visited Jesus by night, where Jesus taught him: 'You must be born again.'",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "nt_q18",
    type: "verse_completion",
    prompt: "1 John 1:9: 'If we ______ ____ _____, he is faithful and just to forgive us our sins'",
    bookId: "1JN",
    chapterNum: 1,
    verseRange: "9",
    acceptedAnswers: ["confess our sins", "confess sins"],
    displayAnswer: "confess our sins",
    explanation: "1 John 1:9 promises: 'If we confess our sins, he is faithful and just to forgive us our sins and to cleanse us from all unrighteousness.'",
    scope: "NT",
    genre: "General Epistles"
  },
  {
    id: "nt_q19",
    type: "facts",
    prompt: "Who said 'What is truth?' during Jesus' trial?",
    bookId: "JHN",
    chapterNum: 18,
    verseRange: "38",
    acceptedAnswers: ["Pontius Pilate", "Pilate"],
    displayAnswer: "Pontius Pilate (Pilate)",
    explanation: "In John 18:38, the Roman governor Pontius Pilate asked Jesus: 'What is truth?'",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "nt_q20",
    type: "chapter_in_book",
    prompt: "What chapter in Luke contains the Parables of the Lost Sheep, the Lost Coin, and the Prodigal Son?",
    bookId: "LUK",
    chapterNum: 15,
    verseRange: "1–32",
    acceptedAnswers: ["15", "ch 15", "chapter 15", "Luke 15", "Luk 15"],
    displayAnswer: "Luke 15 (or Chapter 15)",
    explanation: "Luke 15 contains Jesus' trio of parables celebrating the joy of heaven over one repentant sinner.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "nt_q21",
    type: "verse_completion",
    prompt: "James 1:22: 'But be ______ of the word, and not hearers only, deceiving yourselves.'",
    bookId: "JAS",
    chapterNum: 1,
    verseRange: "22",
    acceptedAnswers: ["doers", "doers of the word"],
    displayAnswer: "doers",
    explanation: "James 1:22 commands: 'But be doers of the word, and not hearers only, deceiving yourselves.'",
    scope: "NT",
    genre: "General Epistles"
  },
  {
    id: "nt_q22",
    type: "book_chapter",
    prompt: "Book & chapter: 'All the believers were one in heart and mind. No one claimed that any of their possessions was their own, but they shared everything they had.'",
    bookId: "ACT",
    chapterNum: 4,
    verseRange: "32",
    acceptedAnswers: ["Acts 4", "Act 4", "Acts ch 4"],
    displayAnswer: "Acts 4",
    explanation: "Acts 4:32–37 describes the radical generosity and unity of the early Jerusalem church.",
    scope: "NT",
    genre: "Acts (History)"
  },
  {
    id: "nt_q23",
    type: "book_chapter",
    prompt: "What book & chapter are the Fruits of the Spirit listed? ('love, joy, peace, patience, kindness...')",
    bookId: "GAL",
    chapterNum: 5,
    verseRange: "22–23",
    acceptedAnswers: ["Galatians 5", "Gal 5", "Galatians ch 5"],
    displayAnswer: "Galatians 5",
    explanation: "Galatians 5:22–23 lists the 9 fruits of the Holy Spirit in contrast to the works of the flesh.",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "nt_q24",
    type: "facts",
    prompt: "Who was the young man mentored by Paul who pastored the church in Ephesus?",
    bookId: "1TI",
    chapterNum: 1,
    verseRange: "2",
    acceptedAnswers: ["Timothy", "Timotheus"],
    displayAnswer: "Timothy",
    explanation: "Paul wrote 1 & 2 Timothy to his beloved spiritual son Timothy while he was leading the church at Ephesus.",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "nt_q25",
    type: "facts",
    prompt: "Who was the wealthy member of the council that requested the body of Jesus for burial?",
    bookId: "MAT",
    chapterNum: 27,
    verseRange: "57–60",
    acceptedAnswers: ["Joseph of Arimathea", "Joseph of Arimathaea", "Joseph Arimathea"],
    displayAnswer: "Joseph of Arimathea",
    explanation: "Joseph of Arimathea, a disciple of Jesus, boldly asked Pilate for the body and placed it in his own new tomb (Matt 27:57–60).",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "nt_q26",
    type: "facts",
    prompt: "What trade/profession did Paul have that he shared with Aquila and Priscilla in Corinth?",
    bookId: "ACT",
    chapterNum: 18,
    verseRange: "3",
    acceptedAnswers: ["Tentmaker", "Tent making", "Tentmakers", "Tent maker", "Leather worker"],
    displayAnswer: "Tentmaker (Tentmaking)",
    explanation: "Acts 18:3 notes that Paul stayed and worked with Aquila and Priscilla 'for they were tentmakers by trade.'",
    scope: "NT",
    genre: "Acts (History)"
  },
  {
    id: "nt_q27",
    type: "facts",
    prompt: "Which disciple is known as 'the disciple whom Jesus loved'?",
    bookId: "JHN",
    chapterNum: 21,
    verseRange: "20–24",
    acceptedAnswers: ["John", "Apostle John", "John the Apostle", "John the Evangelist"],
    displayAnswer: "John",
    explanation: "The Apostle John frequently refers to himself anonymously in his Gospel as 'the disciple whom Jesus loved' (John 13:23, 19:26, 21:20).",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "nt_q28",
    type: "chapter_in_book",
    prompt: "What chapter in Romans opens with 'There is therefore now no condemnation for those who are in Christ Jesus'?",
    bookId: "ROM",
    chapterNum: 8,
    verseRange: "1",
    acceptedAnswers: ["8", "ch 8", "chapter 8", "Romans 8", "Rom 8"],
    displayAnswer: "Romans 8 (or Chapter 8)",
    explanation: "Romans 8 is a glorious chapter celebrating life in the Spirit, assurance, and God's inseparable love.",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "nt_q29",
    type: "chapter_in_book",
    prompt: "What chapter is the conversion of Saul on the Damascus Road in Acts?",
    bookId: "ACT",
    chapterNum: 9,
    verseRange: "1–19",
    acceptedAnswers: ["9", "ch 9", "chapter 9", "Acts 9", "Act 9"],
    displayAnswer: "Acts 9 (or Chapter 9)",
    explanation: "Acts 9 recounts Saul's dramatic encounter with the risen Lord on the road to Damascus.",
    scope: "NT",
    genre: "Acts (History)"
  },
  {
    id: "nt_q30",
    type: "verse_completion",
    prompt: "John 14:6: 'I am the way, and the truth, and the ______.'",
    bookId: "JHN",
    chapterNum: 14,
    verseRange: "6",
    acceptedAnswers: ["life"],
    displayAnswer: "life",
    explanation: "John 14:6: 'Jesus said to him, \"I am the way, and the truth, and the life. No one comes to the Father except through me.\"'",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "nt_q31",
    type: "chapter_in_book",
    prompt: "What chapter in John describes Jesus washing the disciples' feet in the Upper Room?",
    bookId: "JHN",
    chapterNum: 13,
    verseRange: "1–17",
    acceptedAnswers: ["13", "ch 13", "chapter 13", "John 13", "Jn 13"],
    displayAnswer: "John 13 (or Chapter 13)",
    explanation: "In John 13, Jesus displays servant humility by washing His disciples' feet during the Last Supper.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "nt_q32",
    type: "facts",
    prompt: "In what city were the disciples first called 'Christians'?",
    bookId: "ACT",
    chapterNum: 11,
    verseRange: "26",
    acceptedAnswers: ["Antioch", "Antioch of Syria", "Syrian Antioch"],
    displayAnswer: "Antioch",
    explanation: "Acts 11:26 records: 'And in Antioch the disciples were first called Christians.'",
    scope: "NT",
    genre: "Acts (History)"
  },
  {
    id: "nt_q33",
    type: "book_chapter",
    prompt: "What book & chapter is the Great Commission? ('Go therefore and make disciples of all nations...')",
    bookId: "MAT",
    chapterNum: 28,
    verseRange: "18–20",
    acceptedAnswers: ["Matthew 28", "Matt 28", "Mt 28", "Matthew ch 28"],
    displayAnswer: "Matthew 28",
    explanation: "Matthew 28:18–20 concludes Matthew's Gospel with Jesus' Great Commission to His disciples.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "nt_q34",
    type: "verse_completion",
    prompt: "2 Timothy 3:16: 'All _______ is breathed out by God and profitable for teaching...'",
    bookId: "2TI",
    chapterNum: 3,
    verseRange: "16",
    acceptedAnswers: ["Scripture", "scripture"],
    displayAnswer: "Scripture",
    explanation: "2 Timothy 3:16: 'All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness.'",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "nt_q35",
    type: "facts",
    prompt: "What was Matthew's (Levi's) occupation before following Jesus?",
    bookId: "MAT",
    chapterNum: 9,
    verseRange: "9",
    acceptedAnswers: ["Tax collector", "Tax-collector", "Publican"],
    displayAnswer: "Tax Collector",
    explanation: "In Matthew 9:9, Jesus saw Matthew sitting at the tax booth and said to him, 'Follow me.'",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "nt_q36",
    type: "facts",
    prompt: "Who was the mother of Jesus?",
    bookId: "LUK",
    chapterNum: 1,
    verseRange: "26–38",
    acceptedAnswers: ["Mary", "Virgin Mary"],
    displayAnswer: "Mary",
    explanation: "Mary was chosen by God to conceive Jesus through the Holy Spirit (Luke 1:26–38).",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "nt_q37",
    type: "verse_completion",
    prompt: "Philippians 4:4: '______ in the Lord always; again I will say, ______.'",
    bookId: "PHP",
    chapterNum: 4,
    verseRange: "4",
    acceptedAnswers: ["Rejoice", "rejoice"],
    displayAnswer: "Rejoice",
    explanation: "Philippians 4:4: 'Rejoice in the Lord always; again I will say, rejoice.'",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "nt_q38",
    type: "chapter_in_book",
    prompt: "What chapter in Acts is the outpouring of the Holy Spirit at Pentecost?",
    bookId: "ACT",
    chapterNum: 2,
    verseRange: "1–4",
    acceptedAnswers: ["2", "ch 2", "chapter 2", "Acts 2", "Act 2"],
    displayAnswer: "Acts 2 (or Chapter 2)",
    explanation: "Acts 2 describes the Day of Pentecost when tongues of fire appeared and Peter preached his famous sermon.",
    scope: "NT",
    genre: "Acts (History)"
  },
  {
    id: "nt_q39",
    type: "verse_completion",
    prompt: "In John 15, what central metaphor does Jesus use to describe believers abiding in Him? ('I am the ______, you are the branches')",
    bookId: "JHN",
    chapterNum: 15,
    verseRange: "5",
    acceptedAnswers: ["vine", "true vine"],
    displayAnswer: "vine (or true vine)",
    explanation: "John 15:5: 'I am the vine; you are the branches. Whoever abides in me and I in him, he it is that bears much fruit.'",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "nt_q39_iam",
    type: "facts",
    prompt: "How many distinct metaphorical 'I AM' statements (e.g. Bread of Life, Good Shepherd, True Vine) does Jesus make in the Gospel of John?",
    bookId: "JHN",
    chapterNum: 15,
    acceptedAnswers: ["7", "seven", "7 statements", "seven statements"],
    displayAnswer: "7",
    explanation: "John contains 7 distinct 'I AM' declarations: Bread of Life (6:35), Light of the World (8:12), Door (10:7), Good Shepherd (10:11), Resurrection & Life (11:25), Way Truth & Life (14:6), and True Vine (15:1).",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "nt_q40",
    type: "facts",
    prompt: "What disease did Jesus heal ten men of, though only one returned to thank Him?",
    bookId: "LUK",
    chapterNum: 17,
    verseRange: "11–19",
    acceptedAnswers: ["Leprosy", "leper", "lepers"],
    displayAnswer: "Leprosy",
    explanation: "In Luke 17:11–19, Jesus cleansed ten lepers on the border of Samaria and Galilee, and a Samaritan returned to praise God.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "nt_q41",
    type: "chapter_in_book",
    prompt: "What chapter in Luke contains the Parable of the Rich Fool building bigger barns?",
    bookId: "LUK",
    chapterNum: 12,
    verseRange: "13–21",
    acceptedAnswers: ["12", "ch 12", "chapter 12", "Luke 12", "Luk 12"],
    displayAnswer: "Luke 12 (or Chapter 12)",
    explanation: "In Luke 12:16–21, Jesus warned against greed with the Parable of the Rich Fool.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "nt_q42",
    type: "verse_completion",
    prompt: "John 11:35 (famous as the shortest verse in English): 'Jesus ______.'",
    bookId: "JHN",
    chapterNum: 11,
    verseRange: "35",
    acceptedAnswers: ["wept"],
    displayAnswer: "wept",
    explanation: "John 11:35 simply reads: 'Jesus wept.' at the tomb of Lazarus.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "nt_q43",
    type: "facts",
    prompt: "Who was the runaway slave whom Paul wrote a personal letter to Philemon about?",
    bookId: "PHM",
    chapterNum: 1,
    verseRange: "10–16",
    acceptedAnswers: ["Onesimus"],
    displayAnswer: "Onesimus",
    explanation: "In the Epistle to Philemon, Paul asks Philemon to receive back Onesimus no longer as a slave, but as a beloved brother.",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "nt_q44",
    type: "facts",
    prompt: "Who was the short chief tax collector in Jericho who climbed a sycamore tree to see Jesus?",
    bookId: "LUK",
    chapterNum: 19,
    verseRange: "1–10",
    acceptedAnswers: ["Zacchaeus", "Zaccheus"],
    displayAnswer: "Zacchaeus",
    explanation: "Luke 19:1–10 tells how Zacchaeus climbed a sycamore-fig tree, and Jesus stayed at his house, bringing salvation.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "nt_q45",
    type: "facts",
    prompt: "Who was the archangel that visited Mary to announce the birth of Jesus?",
    bookId: "LUK",
    chapterNum: 1,
    verseRange: "26",
    acceptedAnswers: ["Gabriel", "Angel Gabriel"],
    displayAnswer: "Gabriel",
    explanation: "Luke 1:26 tells that the angel Gabriel was sent from God to a city of Galilee named Nazareth.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "nt_q46",
    type: "facts",
    prompt: "Who was the Roman Emperor who ordered the census at the time of Jesus' birth?",
    bookId: "LUK",
    chapterNum: 2,
    verseRange: "1",
    acceptedAnswers: ["Caesar Augustus", "Augustus", "Augustus Caesar"],
    displayAnswer: "Caesar Augustus",
    explanation: "Luke 2:1: 'In those days a decree went out from Caesar Augustus that all the world should be registered.'",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "nt_q47",
    type: "book_id",
    prompt: "In which book does Paul raise the young man Eutychus from the dead after he falls from a third-story window?",
    bookId: "ACT",
    chapterNum: 20,
    verseRange: "9–12",
    acceptedAnswers: ["Acts", "Acts of the Apostles", "Act"],
    displayAnswer: "Acts (Acts 20)",
    explanation: "In Acts 20:9–12 in Troas, Eutychus fell asleep during Paul's preaching, fell out of a 3rd story window, and Paul raised him.",
    scope: "NT",
    genre: "Acts (History)"
  },
  {
    id: "nt_q48",
    type: "facts",
    prompt: "Who was the Jewish High Priest during the trial and crucifixion of Jesus?",
    bookId: "MAT",
    chapterNum: 26,
    verseRange: "57",
    acceptedAnswers: ["Caiaphas", "Joseph Caiaphas"],
    displayAnswer: "Caiaphas",
    explanation: "Caiaphas was the high priest who presided over the Sanhedrin trial of Jesus (Matt 26:57, John 11:49).",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "nt_q49",
    type: "verse_completion",
    prompt: "1 Corinthians 10:31: 'So, whether you eat or drink, or whatever you do, do all to the ______ ___ _____.'",
    bookId: "1CO",
    chapterNum: 10,
    verseRange: "31",
    acceptedAnswers: ["glory of God"],
    displayAnswer: "glory of God",
    explanation: "1 Corinthians 10:31: 'So, whether you eat or drink, or whatever you do, do all to the glory of God.'",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "nt_q50",
    type: "book_chapter",
    prompt: "What book & chapter describes the coming of the Holy Spirit on Pentecost?",
    bookId: "ACT",
    chapterNum: 2,
    verseRange: "1–4",
    acceptedAnswers: ["Acts 2", "Act 2", "Acts ch 2"],
    displayAnswer: "Acts 2",
    explanation: "Acts 2 records the Holy Spirit descending like a mighty rushing wind on Pentecost.",
    scope: "NT",
    genre: "Acts (History)"
  },

  // =========================================================================
  // OT DIAGNOSTIC QUESTIONS (Form 2)
  // =========================================================================
  {
    id: "ot_q1",
    type: "book_id",
    prompt: "What book tells of the rebuilding of the temple after the Babylonian exile?",
    bookId: "EZR",
    chapterNum: 1,
    acceptedAnswers: ["Ezra", "Ezr"],
    displayAnswer: "Ezra",
    explanation: "The Book of Ezra records the return of the Jewish exiles under Zerubbabel to rebuild the Temple in Jerusalem.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "ot_q2",
    type: "facts",
    prompt: "Who interpreted King Nebuchadnezzar's troubling dreams in Babylon?",
    bookId: "DAN",
    chapterNum: 2,
    verseRange: "19–45",
    acceptedAnswers: ["Daniel", "Belteshazzar"],
    displayAnswer: "Daniel",
    explanation: "In Daniel 2 and 4, God gave Daniel the wisdom to recall and interpret Nebuchadnezzar's dreams of world empires.",
    scope: "OT",
    genre: "Major Prophets"
  },
  {
    id: "ot_q3",
    type: "book_chapter",
    prompt: "What book & chapter contains 'The Lord is my shepherd; I shall not want'?",
    bookId: "PSA",
    chapterNum: 23,
    verseRange: "1",
    acceptedAnswers: ["Psalm 23", "Psalms 23", "Ps 23", "Psa 23"],
    displayAnswer: "Psalm 23 (or Psalms 23)",
    explanation: "Psalm 23 is David's beloved psalm expressing trust in the Lord as the Good Shepherd.",
    scope: "OT",
    genre: "Wisdom & Poetry"
  },
  {
    id: "ot_q4",
    type: "chapter_in_book",
    prompt: "What chapter in Daniel is Daniel thrown into the lions' den?",
    bookId: "DAN",
    chapterNum: 6,
    verseRange: "1–28",
    acceptedAnswers: ["6", "ch 6", "chapter 6", "Daniel 6", "Dan 6"],
    displayAnswer: "Daniel 6 (or Chapter 6)",
    explanation: "Daniel 6 describes Daniel being spared in the lions' den under King Darius.",
    scope: "OT",
    genre: "Major Prophets"
  },
  {
    id: "ot_q5",
    type: "book_chapter",
    prompt: "What book & chapter does Joseph tell his brothers: 'As for you, you meant evil against me, but God meant it for good'?",
    bookId: "GEN",
    chapterNum: 50,
    verseRange: "20",
    acceptedAnswers: ["Genesis 50", "Gen 50", "Genesis ch 50"],
    displayAnswer: "Genesis 50",
    explanation: "Genesis 50:20 captures the overarching theological climax of Joseph's story and God's providence.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "ot_q6",
    type: "facts",
    prompt: "What new name did God give Jacob after wrestling with him at Peniel?",
    bookId: "GEN",
    chapterNum: 32,
    verseRange: "28",
    acceptedAnswers: ["Israel"],
    displayAnswer: "Israel",
    explanation: "Genesis 32:28: 'Your name shall no longer be called Jacob, but Israel, for you have striven with God and with men, and have prevailed.'",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "ot_q7",
    type: "facts",
    prompt: "Which prophet was thrown into a muddy cistern and is known as the 'weeping prophet'?",
    bookId: "JER",
    chapterNum: 38,
    verseRange: "6",
    acceptedAnswers: ["Jeremiah", "Jer"],
    displayAnswer: "Jeremiah",
    explanation: "Jeremiah wept over Jerusalem's unrepentance (Lamentations) and was lowered into Malchiah's muddy cistern (Jer 38:6).",
    scope: "OT",
    genre: "Major Prophets"
  },
  {
    id: "ot_q8",
    type: "facts",
    prompt: "Which prophet was called by God to preach repentance to the wicked Assyrian capital of Nineveh?",
    bookId: "JON",
    chapterNum: 1,
    verseRange: "1–2",
    acceptedAnswers: ["Jonah", "Jon"],
    displayAnswer: "Jonah",
    explanation: "God commanded Jonah: 'Arise, go to Nineveh, that great city, and call out against it' (Jonah 1:2).",
    scope: "OT",
    genre: "Minor Prophets"
  },
  {
    id: "ot_q9",
    type: "verse_completion",
    prompt: "Proverbs 3:5: 'Trust in the Lord with all your ______ and do not lean on your own understanding.'",
    bookId: "PRO",
    chapterNum: 3,
    verseRange: "5",
    acceptedAnswers: ["heart"],
    displayAnswer: "heart",
    explanation: "Proverbs 3:5: 'Trust in the Lord with all your heart, and do not lean on your own understanding.'",
    scope: "OT",
    genre: "Wisdom & Poetry"
  },
  {
    id: "ot_q10",
    type: "facts",
    prompt: "Who was the left-handed judge from Benjamin who assassinated King Eglon of Moab?",
    bookId: "JDG",
    chapterNum: 3,
    verseRange: "15–26",
    acceptedAnswers: ["Ehud"],
    displayAnswer: "Ehud",
    explanation: "Judges 3:15–26 details how Ehud delivered Israel by striking down the corpulent King Eglon.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "ot_q11",
    type: "facts",
    prompt: "Who built and dedicated the First Temple of the Lord in Jerusalem?",
    bookId: "1KI",
    chapterNum: 6,
    verseRange: "1",
    acceptedAnswers: ["Solomon", "King Solomon"],
    displayAnswer: "Solomon (King Solomon)",
    explanation: "King Solomon built the First Temple over seven years (1 Kings 6; 2 Chron 3–7).",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "ot_q12",
    type: "facts",
    prompt: "Who were the two faithful spies who brought back a good report trusting God to conquer Canaan?",
    bookId: "NUM",
    chapterNum: 14,
    verseRange: "6–9",
    acceptedAnswers: ["Joshua and Caleb", "Caleb and Joshua", "Joshua & Caleb", "Caleb & Joshua"],
    displayAnswer: "Joshua and Caleb (or Caleb and Joshua)",
    explanation: "In Numbers 14:6–9, Joshua and Caleb stood alone among the 12 spies urging Israel to trust the Lord.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "ot_q13",
    type: "chapter_in_book",
    prompt: "What chapter in Genesis describes the destruction of Sodom and Gomorrah with fire and sulfur?",
    bookId: "GEN",
    chapterNum: 19,
    verseRange: "1–29",
    acceptedAnswers: ["19", "ch 19", "chapter 19", "Genesis 19", "Gen 19"],
    displayAnswer: "Genesis 19 (or Chapter 19)",
    explanation: "Genesis 19 records angels rescuing Lot before fire rains down on Sodom and Gomorrah.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "ot_q14",
    type: "facts",
    prompt: "Whose spirit did King Saul ask the medium (witch) of Endor to summon from the dead?",
    bookId: "1SA",
    chapterNum: 28,
    verseRange: "11–19",
    acceptedAnswers: ["Samuel", "Prophet Samuel"],
    displayAnswer: "Samuel",
    explanation: "In 1 Samuel 28, Saul unlawfully consulted the medium of Endor to bring up the deceased prophet Samuel.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "ot_q15",
    type: "facts",
    prompt: "Which judge defeated the massive army of Midianites with only 300 men holding trumpets and torches?",
    bookId: "JDG",
    chapterNum: 7,
    verseRange: "1–22",
    acceptedAnswers: ["Gideon", "Jerubbaal"],
    displayAnswer: "Gideon",
    explanation: "In Judges 7, God reduced Gideon's army down to 300 men so that Israel would know God alone won the victory.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "ot_q16",
    type: "chapter_in_book",
    prompt: "What chapter in Exodus contains the giving of the Ten Commandments at Mount Sinai?",
    bookId: "EXO",
    chapterNum: 20,
    verseRange: "1–17",
    acceptedAnswers: ["20", "ch 20", "chapter 20", "Exodus 20", "Exo 20"],
    displayAnswer: "Exodus 20 (or Chapter 20)",
    explanation: "Exodus 20 records the Ten Commandments spoken by God at Mount Sinai (also repeated in Deuteronomy 5).",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "ot_q17",
    type: "facts",
    prompt: "Who succeeded Moses as the leader of Israel to lead the conquest of the Promised Land?",
    bookId: "JOS",
    chapterNum: 1,
    verseRange: "1–9",
    acceptedAnswers: ["Joshua", "Joshua son of Nun"],
    displayAnswer: "Joshua",
    explanation: "Joshua 1:1–9: The Lord commissioned Joshua: 'Moses my servant is dead. Now therefore arise, go over this Jordan.'",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "ot_q18",
    type: "chapter_in_book",
    prompt: "What chapter in Jeremiah is the New Covenant explicitly promised ('I will put my law within them')?",
    bookId: "JER",
    chapterNum: 31,
    verseRange: "31–34",
    acceptedAnswers: ["31", "ch 31", "chapter 31", "Jeremiah 31", "Jer 31"],
    displayAnswer: "Jeremiah 31 (or Chapter 31)",
    explanation: "Jeremiah 31:31–34 foretells the New Covenant written upon the heart, quoted in Hebrews 8.",
    scope: "OT",
    genre: "Major Prophets"
  },
  {
    id: "ot_q19",
    type: "facts",
    prompt: "Which judge had supernatural physical strength tied to his Nazirite vow and uncut hair?",
    bookId: "JDG",
    chapterNum: 16,
    verseRange: "17",
    acceptedAnswers: ["Samson"],
    displayAnswer: "Samson",
    explanation: "Judges 13–16 chronicles Samson's mighty deeds and downfall through Delilah.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "ot_q20",
    type: "facts",
    prompt: "In 1 Kings 18, which prophet called down fire from heaven to defeat the 450 prophets of Baal on Mount Carmel?",
    bookId: "1KI",
    chapterNum: 18,
    verseRange: "20–40",
    acceptedAnswers: ["Elijah", "Elijah the Tishbite"],
    displayAnswer: "Elijah",
    explanation: "In 1 Kings 18:38, the fire of the Lord fell and consumed the burnt offering for the prophet Elijah.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "ot_q21",
    type: "facts",
    prompt: "Who was the cupbearer to the Persian king who led the rebuilding of Jerusalem's broken walls in 52 days?",
    bookId: "NEH",
    chapterNum: 1,
    verseRange: "1–11",
    acceptedAnswers: ["Nehemiah"],
    displayAnswer: "Nehemiah",
    explanation: "Nehemiah mobilized the community to rebuild the walls of Jerusalem amidst intense opposition (Neh 1–6).",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "ot_q22",
    type: "chapter_in_book",
    prompt: "What chapter in 1 Samuel describes David slaying Goliath with a sling and a stone?",
    bookId: "1SA",
    chapterNum: 17,
    verseRange: "1–58",
    acceptedAnswers: ["17", "ch 17", "chapter 17", "1 Samuel 17", "1 Sam 17"],
    displayAnswer: "1 Samuel 17 (or Chapter 17)",
    explanation: "1 Samuel 17 describes young David defeating the Philistine champion Goliath in the Valley of Elah.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "ot_q23",
    type: "chapter_in_book",
    prompt: "What chapter in Genesis records God commanding Noah to build the Ark before the Great Flood?",
    bookId: "GEN",
    chapterNum: 6,
    verseRange: "14",
    acceptedAnswers: ["6", "ch 6", "chapter 6", "Genesis 6", "Gen 6"],
    displayAnswer: "Genesis 6 (or Chapter 6)",
    explanation: "Genesis 6:14 records God commanding Noah: 'Make yourself an ark of gopher wood.'",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "ot_q24",
    type: "facts",
    prompt: "Which Babylonian king threw Shadrach, Meshach, and Abednego into the burning fiery furnace?",
    bookId: "DAN",
    chapterNum: 3,
    verseRange: "1–25",
    acceptedAnswers: ["Nebuchadnezzar", "King Nebuchadnezzar"],
    displayAnswer: "Nebuchadnezzar",
    explanation: "In Daniel 3, King Nebuchadnezzar commanded the three Hebrew youths thrown into the fiery furnace for refusing to bow to his golden image.",
    scope: "OT",
    genre: "Major Prophets"
  },
  {
    id: "ot_q25",
    type: "chapter_in_book",
    prompt: "What chapter in Exodus is the miraculous crossing of the Red Sea?",
    bookId: "EXO",
    chapterNum: 14,
    verseRange: "1–31",
    acceptedAnswers: ["14", "ch 14", "chapter 14", "Exodus 14", "Exo 14"],
    displayAnswer: "Exodus 14 (or Chapter 14)",
    explanation: "Exodus 14 describes God parting the Red Sea for Israel and collapsing the waters over Pharaoh's chariots.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "ot_q26",
    type: "chapter_in_book",
    prompt: "What chapter in Exodus does God appear to Moses in the Burning Bush at Mount Horeb?",
    bookId: "EXO",
    chapterNum: 3,
    verseRange: "1–15",
    acceptedAnswers: ["3", "ch 3", "chapter 3", "Exodus 3", "Exo 3"],
    displayAnswer: "Exodus 3 (or Chapter 3)",
    explanation: "In Exodus 3, God spoke to Moses from the burning bush and revealed His covenant name: 'I AM WHO I AM'.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "ot_q27",
    type: "facts",
    prompt: "Who was the barren mother of Samuel who prayed with deep tears at Shiloh for a son?",
    bookId: "1SA",
    chapterNum: 1,
    verseRange: "9–20",
    acceptedAnswers: ["Hannah"],
    displayAnswer: "Hannah",
    explanation: "1 Samuel 1 recounts Hannah's heartfelt prayer at the Tabernacle and the birth of Samuel.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "ot_q28",
    type: "facts",
    prompt: "Which prophet was married to Gomer to symbolize Israel's unfaithfulness to God?",
    bookId: "HOS",
    chapterNum: 1,
    verseRange: "2–3",
    acceptedAnswers: ["Hosea"],
    displayAnswer: "Hosea",
    explanation: "In Hosea 1:2, God commanded Hosea: 'Go, take to yourself a wife of whoredom and have children of whoredom.'",
    scope: "OT",
    genre: "Minor Prophets"
  },
  {
    id: "ot_q29",
    type: "facts",
    prompt: "Which prophet boldly confronted King David about his sin with Bathsheba using a parable of a poor man's ewe lamb?",
    bookId: "2SA",
    chapterNum: 12,
    verseRange: "1–14",
    acceptedAnswers: ["Nathan", "Nathan the prophet"],
    displayAnswer: "Nathan",
    explanation: "In 2 Samuel 12:7, the prophet Nathan said to David: 'You are the man!'",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "ot_q30",
    type: "facts",
    prompt: "Who was the Jewish queen in Susa who risked her life saying 'If I perish, I perish' to save her people?",
    bookId: "EST",
    chapterNum: 4,
    verseRange: "16",
    acceptedAnswers: ["Esther", "Hadassah"],
    displayAnswer: "Esther",
    explanation: "Esther 4:14–16 details Queen Esther standing before the Persian King Xerxes to avert Haman's genocide.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "ot_q31",
    type: "verse_completion",
    prompt: "Ecclesiastes 3:1: 'For everything there is a ______, and a time for every matter under heaven.'",
    bookId: "ECC",
    chapterNum: 3,
    verseRange: "1",
    acceptedAnswers: ["season"],
    displayAnswer: "season",
    explanation: "Ecclesiastes 3:1: 'For everything there is a season, and a time for every matter under heaven.'",
    scope: "OT",
    genre: "Wisdom & Poetry"
  },
  {
    id: "ot_q32",
    type: "facts",
    prompt: "Who was the villainous Persian official in the Book of Esther who built gallows to hang Mordecai?",
    bookId: "EST",
    chapterNum: 3,
    verseRange: "1–6",
    acceptedAnswers: ["Haman", "Haman the Agagite"],
    displayAnswer: "Haman",
    explanation: "Haman plotted the annihilation of the Jews, but was ultimately hanged on his own gallows (Esther 7:10).",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "ot_q33",
    type: "facts",
    prompt: "Who interpreted Pharaoh's dreams of seven fat cows and seven gaunt cows predicting seven years of famine?",
    bookId: "GEN",
    chapterNum: 41,
    verseRange: "14–36",
    acceptedAnswers: ["Joseph", "Zaphenath-paneah"],
    displayAnswer: "Joseph",
    explanation: "In Genesis 41, God revealed Pharaoh's dream to Joseph, leading Pharaoh to make him ruler over Egypt.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "ot_q34",
    type: "chapter_in_book",
    prompt: "What chapter in Ezekiel is the vision of the Valley of Dry Bones coming to life?",
    bookId: "EZE",
    chapterNum: 37,
    verseRange: "1–14",
    acceptedAnswers: ["37", "ch 37", "chapter 37", "Ezekiel 37", "Ezek 37"],
    displayAnswer: "Ezekiel 37 (or Chapter 37)",
    explanation: "Ezekiel 37 portrays God's Spirit breathing life into the dry bones, symbolizing Israel's restoration.",
    scope: "OT",
    genre: "Major Prophets"
  },
  {
    id: "ot_q35",
    type: "verse_completion",
    prompt: "Proverbs 1:7: 'The ______ of the Lord is the beginning of knowledge; fools despise wisdom and instruction.'",
    bookId: "PRO",
    chapterNum: 1,
    verseRange: "7",
    acceptedAnswers: ["fear", "fear of the lord"],
    displayAnswer: "fear",
    explanation: "Proverbs 1:7: 'The fear of the Lord is the beginning of knowledge; fools despise wisdom and instruction.'",
    scope: "OT",
    genre: "Wisdom & Poetry"
  },
  {
    id: "ot_q36",
    type: "facts",
    prompt: "Who was the elderly High Priest at Shiloh who raised young Samuel in the Tabernacle?",
    bookId: "1SA",
    chapterNum: 2,
    verseRange: "11",
    acceptedAnswers: ["Eli", "Eli the priest"],
    displayAnswer: "Eli",
    explanation: "Eli was high priest and judge at Shiloh when young Samuel ministered before the Lord (1 Sam 1–4).",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "ot_q37",
    type: "facts",
    prompt: "What did Moses make and set on a pole to heal Israelites bitten by fiery serpents in the wilderness?",
    bookId: "NUM",
    chapterNum: 21,
    verseRange: "8–9",
    acceptedAnswers: ["Bronze serpent", "Bronze snake", "Brass serpent", "Brass snake"],
    displayAnswer: "Bronze Serpent (Bronze Snake)",
    explanation: "Numbers 21:8–9 recounts Moses lifting the bronze serpent, which Jesus cited as a foreshadowing of the Cross in John 3:14.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "ot_q38",
    type: "chapter_in_book",
    prompt: "What chapter in Leviticus institutes the Day of Atonement (Yom Kippur) and the scapegoat?",
    bookId: "LEV",
    chapterNum: 16,
    verseRange: "1–34",
    acceptedAnswers: ["16", "ch 16", "chapter 16", "Leviticus 16", "Lev 16"],
    displayAnswer: "Leviticus 16 (or Chapter 16)",
    explanation: "Leviticus 16 provides the high priestly rituals for Yom Kippur, the Day of Atonement.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "ot_q39",
    type: "facts",
    prompt: "Who was Jacob's favored wife, the mother of Joseph and Benjamin?",
    bookId: "GEN",
    chapterNum: 29,
    verseRange: "18",
    acceptedAnswers: ["Rachel"],
    displayAnswer: "Rachel",
    explanation: "Jacob loved Rachel and served Laban for 14 years to marry her (Genesis 29:18–30).",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "ot_q40",
    type: "facts",
    prompt: "Which Minor Prophet prophesied that the Messiah ruler would come from Bethlehem Ephrathah?",
    bookId: "MIC",
    chapterNum: 5,
    verseRange: "2",
    acceptedAnswers: ["Micah", "Mic"],
    displayAnswer: "Micah",
    explanation: "Micah 5:2: 'But you, O Bethlehem Ephrathah... from you shall come forth for me one who is to be ruler in Israel...'",
    scope: "OT",
    genre: "Minor Prophets"
  },
  {
    id: "ot_q41",
    type: "verse_completion",
    prompt: "Micah 6:8: 'To do justice, and to love kindness, and to walk ______ with your God.'",
    bookId: "MIC",
    chapterNum: 6,
    verseRange: "8",
    acceptedAnswers: ["humbly", "humbly with your god"],
    displayAnswer: "humbly",
    explanation: "Micah 6:8: 'He has told you, O man, what is good; and what does the Lord require of you but to do justice, and to love kindness, and to walk humbly with your God?'",
    scope: "OT",
    genre: "Minor Prophets"
  },
  {
    id: "ot_q42",
    type: "chapter_in_book",
    prompt: "What chapter in Exodus is the First Passover and tenth plague (death of firstborn) instituted?",
    bookId: "EXO",
    chapterNum: 12,
    verseRange: "1–28",
    acceptedAnswers: ["12", "ch 12", "chapter 12", "Exodus 12", "Exo 12"],
    displayAnswer: "Exodus 12 (or Chapter 12)",
    explanation: "Exodus 12 details the Passover lamb, blood on the doorposts, and Israel's midnight exodus from Egypt.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "ot_q43",
    type: "book_chapter",
    prompt: "What book & chapter is the Davidic Covenant where God promises David an eternal throne and kingdom?",
    bookId: "2SA",
    chapterNum: 7,
    verseRange: "1–17",
    acceptedAnswers: ["2 Samuel 7", "2 Sam 7", "2Samuel 7", "2Sam 7"],
    displayAnswer: "2 Samuel 7",
    explanation: "In 2 Samuel 7, God establishes the Davidic Covenant, promising that David's throne would be established forever, pointing to Christ.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "ot_q44",
    type: "chapter_in_book",
    prompt: "What chapter in Genesis contains Cain murdering Abel?",
    bookId: "GEN",
    chapterNum: 4,
    verseRange: "1–16",
    acceptedAnswers: ["4", "ch 4", "chapter 4", "Genesis 4", "Gen 4"],
    displayAnswer: "Genesis 4 (or Chapter 4)",
    explanation: "Genesis 4 records the birth of Cain and Abel, Cain's jealousy and murder, and the cry 'Am I my brother's keeper?'",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "ot_q45",
    type: "facts",
    prompt: "Which Minor Prophet described himself as not a professional prophet, but a herdsman and dresser of sycamore figs?",
    bookId: "AMO",
    chapterNum: 7,
    verseRange: "14",
    acceptedAnswers: ["Amos"],
    displayAnswer: "Amos",
    explanation: "Amos 7:14: 'I was no prophet, nor a prophet’s son, but I was a herdsman and a dresser of sycamore figs.'",
    scope: "OT",
    genre: "Minor Prophets"
  },
  {
    id: "ot_q46",
    type: "chapter_in_book",
    prompt: "What chapter in Genesis contains God cutting the covenant with Abram with the promise of descendants like stars in the sky?",
    bookId: "GEN",
    chapterNum: 15,
    verseRange: "1–21",
    acceptedAnswers: ["15", "ch 15", "chapter 15", "Genesis 15", "Gen 15"],
    displayAnswer: "Genesis 15 (or Chapter 15)",
    explanation: "Genesis 15 contains 'And he believed the Lord, and he counted it to him as righteousness' (v6) and the smoking fire pot covenant ritual.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "ot_q47",
    type: "chapter_in_book",
    prompt: "What chapter in 2 Samuel describes David's grievous sin with Bathsheba and the murder of Uriah the Hittite?",
    bookId: "2SA",
    chapterNum: 11,
    verseRange: "1–27",
    acceptedAnswers: ["11", "ch 11", "chapter 11", "2 Samuel 11", "2 Sam 11"],
    displayAnswer: "2 Samuel 11 (or Chapter 11)",
    explanation: "2 Samuel 11 records David staying in Jerusalem during spring battles, his adultery with Bathsheba, and Uriah's death.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "ot_q48",
    type: "book_chapter",
    prompt: "Book & Chapter: 'For I was envious of the arrogant when I saw the prosperity of the wicked. For they have no pangs until death...'",
    bookId: "PSA",
    chapterNum: 73,
    verseRange: "3–4",
    acceptedAnswers: ["Psalm 73", "Psalms 73", "Ps 73", "Psa 73"],
    displayAnswer: "Psalm 73 (or Psalms 73)",
    explanation: "Psalm 73 is Asaph's wrestling with the prosperity of the wicked until he 'entered the sanctuary of God' and discerned their end.",
    scope: "OT",
    genre: "Wisdom & Poetry"
  },
  {
    id: "ot_q49",
    type: "facts",
    prompt: "Who was Moses' father-in-law, the priest of Midian who advised him to appoint judges over Israel?",
    bookId: "EXO",
    chapterNum: 18,
    verseRange: "1–24",
    acceptedAnswers: ["Jethro", "Reuel", "Hobab"],
    displayAnswer: "Jethro (Reuel)",
    explanation: "In Exodus 18, Jethro advised Moses to delegate leadership by appointing able men over thousands, hundreds, fifties, and tens.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "ot_q50",
    type: "facts",
    prompt: "Who was the woman of Jericho who hid the two Israelite spies and hung a scarlet cord in her window?",
    bookId: "JOS",
    chapterNum: 2,
    verseRange: "1–21",
    acceptedAnswers: ["Rahab"],
    displayAnswer: "Rahab",
    explanation: "Joshua 2 recounts Rahab hiding Joshua's spies; she is later listed in the genealogy of Jesus (Matt 1:5) and the Hall of Faith (Heb 11:31).",
    scope: "OT",
    genre: "Historical"
  },

  // =========================================================================
  // ADDITIONAL BIBLE-WIDE CURATED QUESTIONS
  // =========================================================================
  {
    id: "bw_q1",
    type: "book_chapter",
    prompt: "Book & chapter: 'In the beginning was the Word, and the Word was with God, and the Word was God.'",
    bookId: "JHN",
    chapterNum: 1,
    verseRange: "1",
    acceptedAnswers: ["John 1", "Jn 1", "John ch 1"],
    displayAnswer: "John 1",
    explanation: "John 1:1 is the profound opening prologue of John's Gospel declaring the eternal deity of Christ.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "bw_q2",
    type: "book_chapter",
    prompt: "What book & chapter describes the creation of the heavens and earth and God pronouncing it 'very good'?",
    bookId: "GEN",
    chapterNum: 1,
    verseRange: "1–31",
    acceptedAnswers: ["Genesis 1", "Gen 1", "Genesis ch 1"],
    displayAnswer: "Genesis 1",
    explanation: "Genesis 1 chronicles the six days of creation culminating in human image-bearers.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "bw_q3",
    type: "book_chapter",
    prompt: "What book & chapter describes the Fall of Man and the serpent in the Garden of Eden?",
    bookId: "GEN",
    chapterNum: 3,
    verseRange: "1–24",
    acceptedAnswers: ["Genesis 3", "Gen 3", "Genesis ch 3"],
    displayAnswer: "Genesis 3",
    explanation: "Genesis 3 records the Fall of Man and God's promise that the offspring of the woman will crush the serpent's head (Gen 3:15).",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "bw_q4",
    type: "book_chapter",
    prompt: "What book & chapter is the Binding of Isaac (the Akedah on Mount Moriah)?",
    bookId: "GEN",
    chapterNum: 22,
    verseRange: "1–19",
    acceptedAnswers: ["Genesis 22", "Gen 22", "Genesis ch 22"],
    displayAnswer: "Genesis 22",
    explanation: "Genesis 22 recounts Abraham's supreme test of faith where God provides the ram in the thicket.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "bw_q5",
    type: "book_chapter",
    prompt: "What book & chapter is the Call of Abram ('Go from your country and your kindred to the land that I will show you')?",
    bookId: "GEN",
    chapterNum: 12,
    verseRange: "1–3",
    acceptedAnswers: ["Genesis 12", "Gen 12", "Genesis ch 12"],
    displayAnswer: "Genesis 12",
    explanation: "Genesis 12:1–3 is the foundational Abrahamic call through whom all families of the earth will be blessed.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "bw_q6",
    type: "book_chapter",
    prompt: "What book & chapter contains the famous 'Love Chapter' ('Love is patient and kind; love does not envy...')?",
    bookId: "1CO",
    chapterNum: 13,
    verseRange: "1–13",
    acceptedAnswers: ["1 Corinthians 13", "1 Cor 13", "1Cor 13"],
    displayAnswer: "1 Corinthians 13",
    explanation: "1 Corinthians 13 is Paul's celebrated description of Christian agape love.",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "bw_q7",
    type: "book_chapter",
    prompt: "What book & chapter contains the Hall of Faith ('Now faith is the assurance of things hoped for...')?",
    bookId: "HEB",
    chapterNum: 11,
    verseRange: "1–40",
    acceptedAnswers: ["Hebrews 11", "Heb 11", "Hebrews ch 11"],
    displayAnswer: "Hebrews 11",
    explanation: "Hebrews 11 surveys the great cloud of faithful witnesses throughout redemptive history.",
    scope: "NT",
    genre: "General Epistles"
  },
  {
    id: "bw_q8",
    type: "book_chapter",
    prompt: "What book & chapter describes the New Heaven and New Earth where God wipes away every tear?",
    bookId: "REV",
    chapterNum: 21,
    verseRange: "1–7",
    acceptedAnswers: ["Revelation 21", "Rev 21", "Revelation ch 21"],
    displayAnswer: "Revelation 21",
    explanation: "Revelation 21:1–4 portrays the descent of the New Jerusalem and eternal fellowship with God.",
    scope: "NT",
    genre: "Apocalyptic"
  },
  {
    id: "bw_q9",
    type: "book_chapter",
    prompt: "What book & chapter contains the Suffering Servant prophecy ('He was pierced for our transgressions; he was crushed for our iniquities')?",
    bookId: "ISA",
    chapterNum: 53,
    verseRange: "1–12",
    acceptedAnswers: ["Isaiah 53", "Isa 53", "Isaiah ch 53"],
    displayAnswer: "Isaiah 53",
    explanation: "Isaiah 53 is the pinnacle Old Testament prophecy of Christ's substitutionary atonement.",
    scope: "OT",
    genre: "Major Prophets"
  },
  {
    id: "bw_q10",
    type: "book_chapter",
    prompt: "What book & chapter is the Beatitudes / beginning of the Sermon on the Mount ('Blessed are the poor in spirit...')?",
    bookId: "MAT",
    chapterNum: 5,
    verseRange: "1–12",
    acceptedAnswers: ["Matthew 5", "Matt 5", "Mt 5", "Matthew ch 5"],
    displayAnswer: "Matthew 5",
    explanation: "Matthew 5 opens Jesus' Sermon on the Mount with the eight Beatitudes.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "det_q1",
    type: "facts",
    prompt: "In Genesis, who was sold into slavery by his brothers for twenty shekels of silver?",
    bookId: "GEN",
    chapterNum: 37,
    verseRange: "28",
    acceptedAnswers: ["Joseph"],
    displayAnswer: "Joseph",
    explanation: "In Genesis 37:28, Midianite traders drew Joseph up and sold him to the Ishmaelites for 20 shekels of silver.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "det_q2",
    type: "chapter_in_book",
    prompt: "What chapter in Genesis contains the incident of the Tower of Babel and the dispersion of languages?",
    bookId: "GEN",
    chapterNum: 11,
    verseRange: "1–9",
    acceptedAnswers: ["11", "ch 11", "chapter 11", "Genesis 11", "Gen 11"],
    displayAnswer: "Genesis 11 (or Chapter 11)",
    explanation: "Genesis 11 records humanity building a tower to make a name for themselves, where God confused their languages.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "det_q3",
    type: "chapter_in_book",
    prompt: "What chapter in Genesis describes Jacob's dream of a ladder reaching up to heaven at Bethel?",
    bookId: "GEN",
    chapterNum: 28,
    verseRange: "10–22",
    acceptedAnswers: ["28", "ch 28", "chapter 28", "Genesis 28", "Gen 28"],
    displayAnswer: "Genesis 28 (or Chapter 28)",
    explanation: "In Genesis 28, Jacob dreamed of angels ascending and descending on a ladder reaching to heaven.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "det_q4",
    type: "chapter_in_book",
    prompt: "What chapter in Exodus is the incident of Aaron making the Golden Calf while Moses is on the mountain?",
    bookId: "EXO",
    chapterNum: 32,
    verseRange: "1–35",
    acceptedAnswers: ["32", "ch 32", "chapter 32", "Exodus 32", "Exo 32"],
    displayAnswer: "Exodus 32 (or Chapter 32)",
    explanation: "Exodus 32 describes the golden calf idolatry and Moses breaking the tablets of the law in righteous anger.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "det_q5",
    type: "chapter_in_book",
    prompt: "In which chapter of Numbers does Balaam's donkey speak after seeing the Angel of the Lord?",
    bookId: "NUM",
    chapterNum: 22,
    verseRange: "21–35",
    acceptedAnswers: ["22", "ch 22", "chapter 22", "Numbers 22", "Num 22"],
    displayAnswer: "Numbers 22 (or Chapter 22)",
    explanation: "Numbers 22 recounts the Lord opening the mouth of Balaam's donkey to rebuke the prophet.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "det_q6",
    type: "verse_completion",
    prompt: "Deuteronomy 6:4 (The Shema): 'Hear, O Israel: The Lord our God, the Lord is ______.'",
    bookId: "DEU",
    chapterNum: 6,
    verseRange: "4",
    acceptedAnswers: ["one"],
    displayAnswer: "one",
    explanation: "Deuteronomy 6:4 is the foundational Shema: 'Hear, O Israel: The Lord our God, the Lord is one.'",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "det_q7",
    type: "chapter_in_book",
    prompt: "What chapter in Deuteronomy describes Moses' death on Mount Nebo overlooking the Promised Land?",
    bookId: "DEU",
    chapterNum: 34,
    verseRange: "1–12",
    acceptedAnswers: ["34", "ch 34", "chapter 34", "Deuteronomy 34", "Deut 34"],
    displayAnswer: "Deuteronomy 34 (or Chapter 34)",
    explanation: "Deuteronomy 34 concludes the Torah with Moses viewing the land from Nebo, dying, and being buried by the Lord.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "det_q8",
    type: "chapter_in_book",
    prompt: "What chapter in Joshua describes the miraculous collapse of the walls of Jericho?",
    bookId: "JOS",
    chapterNum: 6,
    verseRange: "1–27",
    acceptedAnswers: ["6", "ch 6", "chapter 6", "Joshua 6", "Josh 6"],
    displayAnswer: "Joshua 6 (or Chapter 6)",
    explanation: "In Joshua 6, Israel marched around Jericho for seven days before blowing trumpets and the walls fell flat.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "det_q9",
    type: "chapter_in_book",
    prompt: "What chapter in Joshua did the sun stand still in the sky during the battle of Gibeon?",
    bookId: "JOS",
    chapterNum: 10,
    verseRange: "12–14",
    acceptedAnswers: ["10", "ch 10", "chapter 10", "Joshua 10", "Josh 10"],
    displayAnswer: "Joshua 10 (or Chapter 10)",
    explanation: "Joshua 10:12–14 records Joshua commanding the sun to stand still over Gibeon and the moon over Aijalon.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "det_q10",
    type: "verse_completion",
    prompt: "Joshua 24:15: 'Choose this day whom you will serve... But as for me and my house, we will serve the ______.'",
    bookId: "JOS",
    chapterNum: 24,
    verseRange: "15",
    acceptedAnswers: ["Lord", "lord"],
    displayAnswer: "Lord",
    explanation: "Joshua 24:15 is Joshua's famous covenant challenge to the assembled tribes at Shechem.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "det_q11",
    type: "facts",
    prompt: "Who was the female judge and prophetess of Israel who led the victory alongside Barak against Sisera?",
    bookId: "JDG",
    chapterNum: 4,
    verseRange: "4–9",
    acceptedAnswers: ["Deborah"],
    displayAnswer: "Deborah",
    explanation: "Judges 4–5 chronicles Deborah judging Israel under the palm tree and composing her triumphal song.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "det_q12",
    type: "facts",
    prompt: "Who was the wealthy landowner in Bethlehem who married the Moabite widow Ruth as her kinsman-redeemer?",
    bookId: "RUT",
    chapterNum: 2,
    verseRange: "1",
    acceptedAnswers: ["Boaz"],
    displayAnswer: "Boaz",
    explanation: "Boaz acted as the faithful kinsman-redeemer (go'el) for Ruth, becoming the great-grandfather of David (Ruth 4:17).",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "det_q13",
    type: "facts",
    prompt: "In 1 Samuel 5, which Philistine fish-god idol fell face down and broke before the captured Ark of the Covenant?",
    bookId: "1SA",
    chapterNum: 5,
    verseRange: "1–5",
    acceptedAnswers: ["Dagon"],
    displayAnswer: "Dagon",
    explanation: "1 Samuel 5 describes the Philistine god Dagon falling face down and having its head and hands severed before the Ark in Ashdod.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "det_q14",
    type: "facts",
    prompt: "In 2 Samuel 9, which lame grandson of King Saul did David show steadfast covenant kindness to at the royal table?",
    bookId: "2SA",
    chapterNum: 9,
    verseRange: "1–13",
    acceptedAnswers: ["Mephibosheth", "Meribbaal"],
    displayAnswer: "Mephibosheth",
    explanation: "2 Samuel 9 records David honoring his covenant with Jonathan by restoring Saul's land to Jonathan's son Mephibosheth.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "det_q15",
    type: "facts",
    prompt: "In 1 Kings 3, what single gift did young King Solomon ask God for in a dream at Gibeon?",
    bookId: "1KI",
    chapterNum: 3,
    verseRange: "9",
    acceptedAnswers: ["Wisdom", "An understanding mind", "Understanding heart", "An understanding heart"],
    displayAnswer: "Wisdom (An understanding mind)",
    explanation: "Solomon asked for 'an understanding mind to govern your people, that I may discern between good and evil' (1 Kings 3:9).",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "det_q16",
    type: "facts",
    prompt: "In 1 Kings 10, which foreign monarch traveled from afar to test Solomon with difficult questions and marveled at his palace?",
    bookId: "1KI",
    chapterNum: 10,
    verseRange: "1–10",
    acceptedAnswers: ["Queen of Sheba", "The Queen of Sheba", "Sheba"],
    displayAnswer: "Queen of Sheba",
    explanation: "1 Kings 10 recounts the Queen of Sheba visiting Jerusalem and confessing: 'The half was not told me.'",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "det_q17",
    type: "chapter_in_book",
    prompt: "What chapter in 1 Kings did the United Monarchy split into Northern Israel and Southern Judah under Rehoboam and Jeroboam?",
    bookId: "1KI",
    chapterNum: 12,
    verseRange: "1–24",
    acceptedAnswers: ["12", "ch 12", "chapter 12", "1 Kings 12", "1 Kings 12"],
    displayAnswer: "1 Kings 12 (or Chapter 12)",
    explanation: "1 Kings 12 records Rehoboam's foolish refusal of elder advice, leading the 10 northern tribes to break away (931 BC).",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "det_q18",
    type: "chapter_in_book",
    prompt: "What chapter in 1 Kings is the showdown on Mount Carmel where Elijah calls down fire from heaven against the prophets of Baal?",
    bookId: "1KI",
    chapterNum: 18,
    verseRange: "20–40",
    acceptedAnswers: ["18", "ch 18", "chapter 18", "1 Kings 18", "1 Kings 18"],
    displayAnswer: "1 Kings 18 (or Chapter 18)",
    explanation: "1 Kings 18 describes the dramatic confrontation on Mount Carmel where the Lord answered Elijah by fire.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "det_q19",
    type: "chapter_in_book",
    prompt: "What chapter in 2 Kings was Elijah taken up to heaven in a whirlwind by a chariot and horses of fire?",
    bookId: "2KI",
    chapterNum: 2,
    verseRange: "1–12",
    acceptedAnswers: ["2", "ch 2", "chapter 2", "2 Kings 2", "2 Kings 2"],
    displayAnswer: "2 Kings 2 (or Chapter 2)",
    explanation: "2 Kings 2 portrays Elijah ascending to heaven and Elisha receiving a double portion of his spirit.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "det_q20",
    type: "facts",
    prompt: "In 2 Kings 5, which Syrian army general was cured of leprosy after dipping seven times in the Jordan River?",
    bookId: "2KI",
    chapterNum: 5,
    verseRange: "1–14",
    acceptedAnswers: ["Naaman"],
    displayAnswer: "Naaman",
    explanation: "In 2 Kings 5, Elisha instructed Naaman the Syrian commander to wash in the Jordan seven times, and his flesh was restored.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "det_q21",
    type: "facts",
    prompt: "Which godly young king of Judah tore his robes and instituted sweeping national reforms after the Book of the Law was rediscovered in the temple?",
    bookId: "2KI",
    chapterNum: 22,
    verseRange: "11–20",
    acceptedAnswers: ["Josiah", "King Josiah"],
    displayAnswer: "Josiah (King Josiah)",
    explanation: "2 Kings 22–23 recounts King Josiah hearing the words of the Law found by Hilkiah the high priest and purging idolatry.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "det_q22",
    type: "book_chapter",
    prompt: "What book & chapter is David's prayer of repentance after being confronted by Nathan ('Create in me a clean heart, O God')?",
    bookId: "PSA",
    chapterNum: 51,
    verseRange: "1–19",
    acceptedAnswers: ["Psalm 51", "Psalms 51", "Ps 51", "Psa 51"],
    displayAnswer: "Psalm 51",
    explanation: "Psalm 51 is King David's raw penitential psalm following his adultery with Bathsheba.",
    scope: "OT",
    genre: "Wisdom & Poetry"
  },
  {
    id: "det_q23",
    type: "verse_completion",
    prompt: "Psalm 119:105: 'Your word is a lamp to my feet and a ______ to my path.'",
    bookId: "PSA",
    chapterNum: 119,
    verseRange: "105",
    acceptedAnswers: ["light"],
    displayAnswer: "light",
    explanation: "Psalm 119:105: 'Your word is a lamp to my feet and a light to my path.'",
    scope: "OT",
    genre: "Wisdom & Poetry"
  },
  {
    id: "det_q24",
    type: "verse_completion",
    prompt: "Psalm 139:14: 'I praise you, for I am ______ and wonderfully made.'",
    bookId: "PSA",
    chapterNum: 139,
    verseRange: "14",
    acceptedAnswers: ["fearfully"],
    displayAnswer: "fearfully",
    explanation: "Psalm 139:14: 'I praise you, for I am fearfully and wonderfully made. Wonderful are your works; my soul knows it very well.'",
    scope: "OT",
    genre: "Wisdom & Poetry"
  },
  {
    id: "det_q25",
    type: "chapter_in_book",
    prompt: "What chapter in Isaiah contains Isaiah's vision of God on His throne surrounded by seraphim crying 'Holy, holy, holy'?",
    bookId: "ISA",
    chapterNum: 6,
    verseRange: "1–8",
    acceptedAnswers: ["6", "ch 6", "chapter 6", "Isaiah 6", "Isa 6"],
    displayAnswer: "Isaiah 6 (or Chapter 6)",
    explanation: "Isaiah 6 describes Isaiah's commission in the year King Uzziah died: 'Here am I! Send me.'",
    scope: "OT",
    genre: "Major Prophets"
  },
  {
    id: "det_q26",
    type: "verse_completion",
    prompt: "Isaiah 9:6: 'For to us a child is born, to us a son is given... and his name shall be called Wonderful Counselor, ______ God, Everlasting Father, Prince of Peace.'",
    bookId: "ISA",
    chapterNum: 9,
    verseRange: "6",
    acceptedAnswers: ["Mighty", "mighty"],
    displayAnswer: "Mighty",
    explanation: "Isaiah 9:6 is the celebrated prophecy of the divine Messiah.",
    scope: "OT",
    genre: "Major Prophets"
  },
  {
    id: "det_q27",
    type: "verse_completion",
    prompt: "Jeremiah 29:11: 'For I know the plans I have for you, declares the Lord, plans for ______ and not for evil, to give you a future and a hope.'",
    bookId: "JER",
    chapterNum: 29,
    verseRange: "11",
    acceptedAnswers: ["welfare", "peace", "good"],
    displayAnswer: "welfare (or peace)",
    explanation: "Jeremiah 29:11 was written in a letter to the Jewish exiles living in Babylon.",
    scope: "OT",
    genre: "Major Prophets"
  },
  {
    id: "det_q28",
    type: "chapter_in_book",
    prompt: "What chapter in Daniel describes Shadrach, Meshach, and Abednego delivered unharmed from the burning fiery furnace?",
    bookId: "DAN",
    chapterNum: 3,
    verseRange: "1–30",
    acceptedAnswers: ["3", "ch 3", "chapter 3", "Daniel 3", "Dan 3"],
    displayAnswer: "Daniel 3 (or Chapter 3)",
    explanation: "Daniel 3 chronicles the three Hebrew youths refusing to bow to Nebuchadnezzar's golden image and being protected in the furnace by a fourth figure 'like a son of the gods.'",
    scope: "OT",
    genre: "Major Prophets"
  },
  {
    id: "det_q29",
    type: "verse_completion",
    prompt: "Amos 5:24: 'But let justice roll down like waters, and righteousness like an ever-flowing ______.'",
    bookId: "AMO",
    chapterNum: 5,
    verseRange: "24",
    acceptedAnswers: ["stream", "river"],
    displayAnswer: "stream",
    explanation: "Amos 5:24: 'But let justice roll down like waters, and righteousness like an ever-flowing stream.'",
    scope: "OT",
    genre: "Minor Prophets"
  },
  {
    id: "det_q30",
    type: "verse_completion",
    prompt: "Habakkuk 2:4: 'Behold, his soul is puffed up; it is not upright within him, but the righteous shall live by his ______.'",
    bookId: "HAB",
    chapterNum: 2,
    verseRange: "4",
    acceptedAnswers: ["faith"],
    displayAnswer: "faith",
    explanation: "Habakkuk 2:4 is quoted three times in the New Testament (Romans 1:17, Galatians 3:11, Hebrews 10:38).",
    scope: "OT",
    genre: "Minor Prophets"
  },
  {
    id: "det_q31",
    type: "book_chapter",
    prompt: "What book & chapter contains the prophecy: 'Behold, the virgin shall conceive and bear a son, and shall call his name Immanuel'?",
    bookId: "ISA",
    chapterNum: 7,
    verseRange: "14",
    acceptedAnswers: ["Isaiah 7", "Isa 7", "Isaiah ch 7", "Isaiah 7:14"],
    displayAnswer: "Isaiah 7 (or Isaiah 7:14)",
    explanation: "Isaiah 7:14 is the landmark prophecy given to King Ahaz, fulfilled in the birth of Jesus (Matt 1:23).",
    scope: "OT",
    genre: "Major Prophets"
  },
  {
    id: "det_q32",
    type: "facts",
    prompt: "In which village of Galilee did Jesus perform His first miraculous sign by turning water into wine at a wedding feast?",
    bookId: "JHN",
    chapterNum: 2,
    verseRange: "1–11",
    acceptedAnswers: ["Cana", "Cana of Galilee"],
    displayAnswer: "Cana of Galilee",
    explanation: "John 2:11: 'This, the first of his signs, Jesus did at Cana in Galilee, and manifested his glory.'",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "det_q33",
    type: "chapter_in_book",
    prompt: "What chapter in Matthew contains the Transfiguration of Jesus with Moses and Elijah on the mountain?",
    bookId: "MAT",
    chapterNum: 17,
    verseRange: "1–9",
    acceptedAnswers: ["17", "ch 17", "chapter 17", "Matthew 17", "Matt 17"],
    displayAnswer: "Matthew 17 (or Chapter 17)",
    explanation: "In Matthew 17, Jesus shone like the sun before Peter, James, and John on the Mount of Transfiguration.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "det_q34",
    type: "chapter_in_book",
    prompt: "What chapter in John describes Jesus raising Lazarus from the dead after four days in the tomb?",
    bookId: "JHN",
    chapterNum: 11,
    verseRange: "1–44",
    acceptedAnswers: ["11", "ch 11", "chapter 11", "John 11", "Jn 11"],
    displayAnswer: "John 11 (or Chapter 11)",
    explanation: "In John 11:43, Jesus cried with a loud voice: 'Lazarus, come out!' and the dead man walked out.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "det_q35",
    type: "chapter_in_book",
    prompt: "What chapter in John records Jesus' High Priestly Prayer for Himself, His disciples, and all future believers?",
    bookId: "JHN",
    chapterNum: 17,
    verseRange: "1–26",
    acceptedAnswers: ["17", "ch 17", "chapter 17", "John 17", "Jn 17"],
    displayAnswer: "John 17 (or Chapter 17)",
    explanation: "John 17 is the High Priestly Prayer where Jesus prays for His church to be sanctified in truth and unified as one.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "det_q36",
    type: "facts",
    prompt: "Who was the first Christian martyr in Acts, stoned to death while seeing the Son of Man standing at the right hand of God?",
    bookId: "ACT",
    chapterNum: 7,
    verseRange: "54–60",
    acceptedAnswers: ["Stephen"],
    displayAnswer: "Stephen",
    explanation: "Acts 7 recounts Stephen's bold defense before the Sanhedrin and his prayer 'Lord, do not hold this sin against them.'",
    scope: "NT",
    genre: "Acts (History)"
  },
  {
    id: "det_q37",
    type: "facts",
    prompt: "In Acts 8, which evangelist explained the Suffering Servant passage in Isaiah 53 to an Ethiopian royal official in his chariot?",
    bookId: "ACT",
    chapterNum: 8,
    verseRange: "26–39",
    acceptedAnswers: ["Philip", "Philip the evangelist"],
    displayAnswer: "Philip (the Evangelist)",
    explanation: "In Acts 8:35, Philip began with Isaiah 53 and told the Ethiopian eunuch the good news about Jesus, then baptized him.",
    scope: "NT",
    genre: "Acts (History)"
  },
  {
    id: "det_q38",
    type: "facts",
    prompt: "In Acts 10, who was the God-fearing Roman centurion in Caesarea to whom Peter was sent after receiving a vision of clean and unclean animals?",
    bookId: "ACT",
    chapterNum: 10,
    verseRange: "1–48",
    acceptedAnswers: ["Cornelius"],
    displayAnswer: "Cornelius",
    explanation: "In Acts 10, the Holy Spirit fell on Cornelius and his household, confirming Gentile inclusion in the church.",
    scope: "NT",
    genre: "Acts (History)"
  },
  {
    id: "det_q39",
    type: "facts",
    prompt: "In Acts 17, on which prominent hill in Athens did Paul preach to Stoic and Epicurean philosophers regarding the 'Unknown God'?",
    bookId: "ACT",
    chapterNum: 17,
    verseRange: "19–34",
    acceptedAnswers: ["Mars Hill", "Areopagus", "Mars\x27 Hill"],
    displayAnswer: "Mars Hill (The Areopagus)",
    explanation: "In Acts 17:22–31, Paul preached at the Areopagus (Mars Hill) in Athens regarding the Creator God and the resurrection.",
    scope: "NT",
    genre: "Acts (History)"
  },
  {
    id: "det_q40",
    type: "verse_completion",
    prompt: "Galatians 2:20: 'I have been ______ with Christ. It is no longer I who live, but Christ who lives in me.'",
    bookId: "GAL",
    chapterNum: 2,
    verseRange: "20",
    acceptedAnswers: ["crucified"],
    displayAnswer: "crucified",
    explanation: "Galatians 2:20: 'I have been crucified with Christ. It is no longer I who live, but Christ who lives in me.'",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "det_q41",
    type: "chapter_in_book",
    prompt: "What chapter in Ephesians describes the full Armor of God (belt of truth, breastplate of righteousness, shield of faith)?",
    bookId: "EPH",
    chapterNum: 6,
    verseRange: "10–18",
    acceptedAnswers: ["6", "ch 6", "chapter 6", "Ephesians 6", "Eph 6"],
    displayAnswer: "Ephesians 6 (or Chapter 6)",
    explanation: "Ephesians 6:10–18 instructs believers to 'Put on the whole armor of God, that you may be able to stand against the schemes of the devil.'",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "det_q42",
    type: "verse_completion",
    prompt: "Philippians 4:13: 'I can do all things through him who ______ me.'",
    bookId: "PHP",
    chapterNum: 4,
    verseRange: "13",
    acceptedAnswers: ["strengthens"],
    displayAnswer: "strengthens",
    explanation: "Philippians 4:13: 'I can do all things through him who strengthens me.'",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "det_q43",
    type: "verse_completion",
    prompt: "James 2:26: 'For as the body apart from the spirit is dead, so also faith apart from ______ is dead.'",
    bookId: "JAS",
    chapterNum: 2,
    verseRange: "26",
    acceptedAnswers: ["works"],
    displayAnswer: "works",
    explanation: "James 2:26 emphasizes that genuine living faith produces active fruit and obedience.",
    scope: "NT",
    genre: "General Epistles"
  },
  {
    id: "det_q44",
    type: "book_chapter",
    prompt: "What book & chapter contains the letters dictated by the risen Christ to the Seven Churches of Asia Minor?",
    bookId: "REV",
    chapterNum: 2,
    verseRange: "1–29",
    acceptedAnswers: ["Revelation 2", "Rev 2", "Revelation 2-3", "Rev 2-3"],
    displayAnswer: "Revelation 2 (and 3)",
    explanation: "Revelation 2–3 contains Christ's specific messages to Ephesus, Smyrna, Pergamum, Thyatira, Sardis, Philadelphia, and Laodicea.",
    scope: "NT",
    genre: "Apocalyptic"
  },

  // =========================================================================
  // BIBLE MASTERY PROFICIENCY INDICATOR (BMPI) CURATED QUESTIONS
  // =========================================================================
  {
    id: "supp_pent_1",
    type: "book_id",
    prompt: "Which book contains the foundational marriage principle: 'Therefore a man shall leave his father and his mother and hold fast to his wife, and they shall become one flesh'?",
    bookId: "GEN",
    chapterNum: 2,
    verseRange: "24",
    acceptedAnswers: ["Genesis", "Gen", "Genesis 2", "Gen 2"],
    displayAnswer: "Genesis (Genesis 2:24)",
    explanation: "Genesis 2:24 establishes the creation design for marriage, quoted by Jesus in Matthew 19 and Paul in Ephesians 5.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "supp_pent_2",
    type: "book_id",
    prompt: "In which book does Moses strike the rock twice in anger at Meribah, resulting in him not entering the Promised Land?",
    bookId: "NUM",
    chapterNum: 20,
    verseRange: "11",
    acceptedAnswers: ["Numbers", "Num", "Numbers 20", "Num 20"],
    displayAnswer: "Numbers (Numbers 20)",
    explanation: "Numbers 20 records the tragic incident at the Waters of Meribah where Moses failed to uphold God as holy before the people.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "supp_pent_3",
    type: "verse_completion",
    prompt: "Deuteronomy 29:29: 'The ______ things belong to the Lord our God, but the things that are revealed belong to us and to our children forever...'",
    bookId: "DEU",
    chapterNum: 29,
    verseRange: "29",
    acceptedAnswers: ["secret", "hidden"],
    displayAnswer: "secret",
    explanation: "Deuteronomy 29:29: 'The secret things belong to the Lord our God, but the things that are revealed belong to us and to our children forever, that we may do all the words of this law.'",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "supp_pent_4",
    type: "book_id",
    prompt: "In which book is the foundational principle given: 'For the life of the flesh is in the blood, and I have given it for you on the altar to make atonement for your souls'?",
    bookId: "LEV",
    chapterNum: 17,
    verseRange: "11",
    acceptedAnswers: ["Leviticus", "Lev", "Leviticus 17", "Lev 17"],
    displayAnswer: "Leviticus (Leviticus 17:11)",
    explanation: "Leviticus 17:11 establishes the theological foundation of substitutionary blood atonement.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "supp_pent_5",
    type: "facts",
    prompt: "Which sister of Moses challenged his spiritual leadership authority and was temporarily struck with leprosy?",
    bookId: "NUM",
    chapterNum: 12,
    verseRange: "1–15",
    acceptedAnswers: ["Miriam"],
    displayAnswer: "Miriam",
    explanation: "Numbers 12 records Miriam and Aaron opposing Moses regarding his Cushite wife and unique prophetic authority.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "supp_pent_6",
    type: "facts",
    prompt: "Who was Aaron's son and successor as High Priest who worked alongside Joshua during the conquest and tribal land division?",
    bookId: "NUM",
    chapterNum: 20,
    verseRange: "25–28",
    acceptedAnswers: ["Eleazar", "Eleazar the priest"],
    displayAnswer: "Eleazar (the High Priest)",
    explanation: "Eleazar succeeded Aaron on Mount Hor (Numbers 20) and ministered as High Priest throughout the leadership of Joshua.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "supp_hist_1",
    type: "verse_completion",
    prompt: "Joshua 1:8: 'This Book of the Law shall not depart from your mouth, but you shall ______ on it day and night...'",
    bookId: "JOS",
    chapterNum: 1,
    verseRange: "8",
    acceptedAnswers: ["meditate"],
    displayAnswer: "meditate",
    explanation: "Joshua 1:8: 'This Book of the Law shall not depart from your mouth, but you shall meditate on it day and night, so that you may be careful to do according to all that is written in it.'",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "supp_hist_2",
    type: "verse_completion",
    prompt: "1 Samuel 15:22: 'Behold, to ______ is better than sacrifice, and to listen than the fat of rams.'",
    bookId: "1SA",
    chapterNum: 15,
    verseRange: "22",
    acceptedAnswers: ["obey"],
    displayAnswer: "obey",
    explanation: "1 Samuel 15:22 is Samuel's direct rebuke to King Saul after his partial obedience regarding the Amalekites.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "supp_hist_3",
    type: "verse_completion",
    prompt: "1 Samuel 16:7: 'For the Lord sees not as man sees: man looks on the outward appearance, but the Lord looks on the ______.'",
    bookId: "1SA",
    chapterNum: 16,
    verseRange: "7",
    acceptedAnswers: ["heart"],
    displayAnswer: "heart",
    explanation: "1 Samuel 16:7: God's counsel to Samuel before anointing young David in Bethlehem.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "supp_hist_4",
    type: "book_id",
    prompt: "Which book contains the prayer of Jabez ('Oh that you would bless me indeed and enlarge my border, that your hand might be with me...')?",
    bookId: "1CH",
    chapterNum: 4,
    verseRange: "9–10",
    acceptedAnswers: ["1 Chronicles", "1 Chron", "1Chronicles", "1Chron"],
    displayAnswer: "1 Chronicles (1 Chron 4:9–10)",
    explanation: "1 Chronicles 4:9–10 records Jabez praying for God's protection and blessing, and God granted his request.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "supp_hist_5",
    type: "facts",
    prompt: "Which Godly High Priest hid the boy Joash from wicked Queen Athaliah for six years and crowned him king of Judah?",
    bookId: "2KI",
    chapterNum: 11,
    verseRange: "1–12",
    acceptedAnswers: ["Jehoiada", "Jehoiada the priest"],
    displayAnswer: "Jehoiada (the High Priest)",
    explanation: "2 Kings 11 describes Jehoiada courageously executing the coup to restore David's rightful line to the throne.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "supp_hist_6",
    type: "facts",
    prompt: "Which king of Judah was struck with leprosy in the Temple when he arrogantly attempted to burn incense on the altar?",
    bookId: "2CH",
    chapterNum: 26,
    verseRange: "16–21",
    acceptedAnswers: ["Uzziah", "Azariah", "King Uzziah"],
    displayAnswer: "Uzziah (Azariah)",
    explanation: "2 Chronicles 26:16–21 recounts King Uzziah's pride leading to his downfall when he usurped the priest's duty.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "supp_hist_7",
    type: "facts",
    prompt: "Which courageous prophet stood alone before Kings Ahab and Jehoshaphat, faithfully prophesying Ahab's defeat against 400 court prophets?",
    bookId: "1KI",
    chapterNum: 22,
    verseRange: "13–28",
    acceptedAnswers: ["Micaiah", "Micaiah son of Imlah"],
    displayAnswer: "Micaiah (son of Imlah)",
    explanation: "1 Kings 22:14: Micaiah declared, 'As the Lord lives, what the Lord says to me, that the will I speak.'",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "supp_hist_8",
    type: "facts",
    prompt: "Which beloved son of David led a massive rebellion against his father, briefly taking Jerusalem before being killed in the forest of Ephraim?",
    bookId: "2SA",
    chapterNum: 15,
    verseRange: "1–12",
    acceptedAnswers: ["Absalom"],
    displayAnswer: "Absalom",
    explanation: "2 Samuel 15–18 chronicles Absalom's conspiracy, David's flight from Jerusalem, and David's grief over his death.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "supp_poet_1",
    type: "verse_completion",
    prompt: "Psalm 37:4: '______ yourself in the Lord, and he will give you the desires of your heart.'",
    bookId: "PSA",
    chapterNum: 37,
    verseRange: "4",
    acceptedAnswers: ["Delight", "delight"],
    displayAnswer: "Delight",
    explanation: "Psalm 37:4: 'Delight yourself in the Lord, and he will give you the desires of your heart.'",
    scope: "OT",
    genre: "Wisdom & Poetry"
  },
  {
    id: "supp_poet_2",
    type: "verse_completion",
    prompt: "Job 23:10: 'But he knows the way that I take; when he has ______ me, I shall come out as gold.'",
    bookId: "JOB",
    chapterNum: 23,
    verseRange: "10",
    acceptedAnswers: ["tried", "tested"],
    displayAnswer: "tried (or tested)",
    explanation: "Job 23:10 is Job's unwavering confession of confidence in God's refining purpose through suffering.",
    scope: "OT",
    genre: "Wisdom & Poetry"
  },
  {
    id: "supp_poet_3",
    type: "verse_completion",
    prompt: "Proverbs 21:1: 'The king's heart is a stream of water in the hand of the Lord; he ______ it wherever he will.'",
    bookId: "PRO",
    chapterNum: 21,
    verseRange: "1",
    acceptedAnswers: ["turns", "directs"],
    displayAnswer: "turns (or directs)",
    explanation: "Proverbs 21:1 demonstrates God's absolute sovereignty over human rulers and world leaders.",
    scope: "OT",
    genre: "Wisdom & Poetry"
  },
  {
    id: "supp_poet_4",
    type: "verse_completion",
    prompt: "Ecclesiastes 12:13: 'The end of the matter; all has been heard. Fear God and keep his ______, for this is the whole duty of man.'",
    bookId: "ECC",
    chapterNum: 12,
    verseRange: "13",
    acceptedAnswers: ["commandments"],
    displayAnswer: "commandments",
    explanation: "Ecclesiastes 12:13 is the great grand conclusion of Qoheleth's quest for ultimate meaning under the sun.",
    scope: "OT",
    genre: "Wisdom & Poetry"
  },
  {
    id: "supp_prop_1",
    type: "verse_completion",
    prompt: "Zechariah 4:6: 'Not by might, nor by power, but by my ______, says the Lord of hosts.'",
    bookId: "ZEC",
    chapterNum: 4,
    verseRange: "6",
    acceptedAnswers: ["Spirit", "spirit", "Holy Spirit"],
    displayAnswer: "Spirit",
    explanation: "Zechariah 4:6 was God's word of encouragement to Zerubbabel as he rebuilt the Second Temple.",
    scope: "OT",
    genre: "Minor Prophets"
  },
  {
    id: "supp_prop_2",
    type: "verse_completion",
    prompt: "Ezekiel 22:30: 'And I sought for a man among them who should build up the wall and stand in the ______ before me for the land... but I found none.'",
    bookId: "EZE",
    chapterNum: 22,
    verseRange: "30",
    acceptedAnswers: ["gap", "breach"],
    displayAnswer: "gap (or breach)",
    explanation: "Ezekiel 22:30 highlights God's search for righteous intercessory leaders in times of moral decline.",
    scope: "OT",
    genre: "Major Prophets"
  },
  {
    id: "supp_prop_3",
    type: "verse_completion",
    prompt: "Isaiah 26:3: 'You keep him in perfect ______ whose mind is stayed on you, because he trusts in you.'",
    bookId: "ISA",
    chapterNum: 26,
    verseRange: "3",
    acceptedAnswers: ["peace"],
    displayAnswer: "peace",
    explanation: "Isaiah 26:3 promises steadfast peace (shalom shalom) to the heart anchored in God.",
    scope: "OT",
    genre: "Major Prophets"
  },
  {
    id: "supp_prop_4",
    type: "verse_completion",
    prompt: "Isaiah 40:31: 'But they who wait for the Lord shall renew their strength; they shall mount up with wings like ______...'",
    bookId: "ISA",
    chapterNum: 40,
    verseRange: "31",
    acceptedAnswers: ["eagles"],
    displayAnswer: "eagles",
    explanation: "Isaiah 40:31: '...they shall run and not be weary; they shall walk and not faint.'",
    scope: "OT",
    genre: "Major Prophets"
  },
  {
    id: "supp_prop_5",
    type: "verse_completion",
    prompt: "Isaiah 55:11: 'So shall my word be that goes out from my mouth; it shall not return to me ______...'",
    bookId: "ISA",
    chapterNum: 55,
    verseRange: "11",
    acceptedAnswers: ["empty", "void"],
    displayAnswer: "empty (or void)",
    explanation: "Isaiah 55:11: '...but it shall accomplish that which I purpose, and shall succeed in the thing for which I sent it.'",
    scope: "OT",
    genre: "Major Prophets"
  },
  {
    id: "supp_prop_6",
    type: "verse_completion",
    prompt: "Haggai 1:4: 'Is it a time for you yourselves to dwell in your paneled houses, while this ______ lies in ruins?'",
    bookId: "HAG",
    chapterNum: 1,
    verseRange: "4",
    acceptedAnswers: ["house", "temple", "Lord's house"],
    displayAnswer: "house (the Temple)",
    explanation: "Haggai 1:4 rebuked the returned Jewish exiles for prioritizing their own homes over rebuilding the Temple of the Lord.",
    scope: "OT",
    genre: "Minor Prophets"
  },
  {
    id: "supp_prop_7",
    type: "book_id",
    prompt: "Which Old Testament book consists of a single chapter declaring the divine judgment and complete downfall of Edom?",
    bookId: "OBA",
    chapterNum: 1,
    verseRange: "1–21",
    acceptedAnswers: ["Obadiah", "Obad"],
    displayAnswer: "Obadiah",
    explanation: "Obadiah (21 verses) is the shortest book in the Old Testament, condemning Edom for violence against their brother Jacob.",
    scope: "OT",
    genre: "Minor Prophets"
  },
  {
    id: "supp_prop_8",
    type: "facts",
    prompt: "Which prophet was a herdsman and tender of sycamore fig trees from Tekoa called to prophesy in Northern Israel?",
    bookId: "AMO",
    chapterNum: 7,
    verseRange: "14",
    acceptedAnswers: ["Amos"],
    displayAnswer: "Amos",
    explanation: "Amos 7:14: 'I was no prophet, nor a prophet's son, but I was a herdsman and a dresser of sycamore figs.'",
    scope: "OT",
    genre: "Minor Prophets"
  },
  {
    id: "supp_gosp_1",
    type: "verse_completion",
    prompt: "Acts 4:12: 'And there is salvation in no one else, for there is no other ______ under heaven given among men by which we must be saved.'",
    bookId: "ACT",
    chapterNum: 4,
    verseRange: "12",
    acceptedAnswers: ["name"],
    displayAnswer: "name",
    explanation: "Acts 4:12 was proclaimed boldly by Peter before the Jewish Sanhedrin in Jerusalem.",
    scope: "NT",
    genre: "Acts (History)"
  },
  {
    id: "supp_gosp_2",
    type: "verse_completion",
    prompt: "Matthew 6:33: 'But seek first the ______ of God and his righteousness, and all these things will be added to you.'",
    bookId: "MAT",
    chapterNum: 6,
    verseRange: "33",
    acceptedAnswers: ["kingdom", "kingdom of god"],
    displayAnswer: "kingdom",
    explanation: "Matthew 6:33 is Jesus' climax command against worry in the Sermon on the Mount.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "supp_gosp_3",
    type: "facts",
    prompt: "Which early church leader from Cyprus was named Joseph, nicknamed 'Son of Encouragement', and welcomed Paul into ministry?",
    bookId: "ACT",
    chapterNum: 4,
    verseRange: "36",
    acceptedAnswers: ["Barnabas"],
    displayAnswer: "Barnabas",
    explanation: "Acts 4:36 introduces Barnabas ('Son of Encouragement'), who later partnered with Paul on his 1st missionary journey.",
    scope: "NT",
    genre: "Acts (History)"
  },
  {
    id: "supp_gosp_4",
    type: "facts",
    prompt: "Which silversmith in Ephesus stirred up a citywide riot against Paul because the Gospel threatened the trade of Artemis shrines?",
    bookId: "ACT",
    chapterNum: 19,
    verseRange: "24–29",
    acceptedAnswers: ["Demetrius"],
    displayAnswer: "Demetrius",
    explanation: "In Acts 19:24–29, Demetrius gathered fellow craftsmen shouting 'Great is Artemis of the Ephesians!'",
    scope: "NT",
    genre: "Acts (History)"
  },
  {
    id: "supp_gosp_5",
    type: "facts",
    prompt: "Which eloquent Jewish teacher from Alexandria was mighty in the Scriptures and was mentored more accurately in Ephesus by Priscilla and Aquila?",
    bookId: "ACT",
    chapterNum: 18,
    verseRange: "24–28",
    acceptedAnswers: ["Apollos"],
    displayAnswer: "Apollos",
    explanation: "Acts 18:24–28 describes Apollos powerfully refuting the Jews in public, proving from the Scriptures that Jesus was the Christ.",
    scope: "NT",
    genre: "Acts (History)"
  },
  {
    id: "supp_epist_1",
    type: "verse_completion",
    prompt: "1 Thessalonians 4:16: 'For the Lord himself will descend from heaven with a cry of command, with the voice of an archangel, and with the sound of the ______ of God.'",
    bookId: "1TH",
    chapterNum: 4,
    verseRange: "16",
    acceptedAnswers: ["trumpet", "trumpet of god"],
    displayAnswer: "trumpet",
    explanation: "1 Thessalonians 4:16: '...And the dead in Christ will rise first.'",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "supp_epist_2",
    type: "verse_completion",
    prompt: "Colossians 2:9: 'For in him the whole fullness of ______ dwells bodily.'",
    bookId: "COL",
    chapterNum: 2,
    verseRange: "9",
    acceptedAnswers: ["deity", "Godhead", "godhead"],
    displayAnswer: "deity (Godhead)",
    explanation: "Colossians 2:9 is a foundational verse declaring the full and complete deity of Jesus Christ in bodily form.",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "supp_epist_3",
    type: "verse_completion",
    prompt: "1 Corinthians 10:13: 'No temptation has overtaken you that is not common to man. God is ______, and he will not let you be tempted beyond your ability...'",
    bookId: "1CO",
    chapterNum: 10,
    verseRange: "13",
    acceptedAnswers: ["faithful"],
    displayAnswer: "faithful",
    explanation: "1 Corinthians 10:13: '...but with the temptation he will also provide the way of escape, that you may be able to endure it.'",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "supp_epist_4",
    type: "verse_completion",
    prompt: "2 Corinthians 10:4: 'For the weapons of our warfare are not of the flesh but have divine power to destroy ______.'",
    bookId: "2CO",
    chapterNum: 10,
    verseRange: "4",
    acceptedAnswers: ["strongholds"],
    displayAnswer: "strongholds",
    explanation: "2 Corinthians 10:4–5 emphasizes spiritual warfare and taking every thought captive to obey Christ.",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "supp_epist_5",
    type: "verse_completion",
    prompt: "2 Thessalonians 3:10: 'If anyone is not willing to work, let him not ______.'",
    bookId: "2TH",
    chapterNum: 3,
    verseRange: "10",
    acceptedAnswers: ["eat"],
    displayAnswer: "eat",
    explanation: "2 Thessalonians 3:10 establishes the biblical work ethic and warns against idleness.",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "supp_epist_6",
    type: "facts",
    prompt: "In 2 Timothy 4:10, which former ministry associate deserted Paul during his final imprisonment in Rome because he 'fell in love with this present world'?",
    bookId: "2TI",
    chapterNum: 4,
    verseRange: "10",
    acceptedAnswers: ["Demas"],
    displayAnswer: "Demas",
    explanation: "2 Timothy 4:10: 'For Demas, in love with this present world, has deserted me and gone to Thessalonica.'",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "supp_epist_7",
    type: "facts",
    prompt: "Which fellow worker from Philippi brought a sacrificial financial gift to Paul in prison and nearly died from illness in the work of Christ?",
    bookId: "PHP",
    chapterNum: 2,
    verseRange: "25–30",
    acceptedAnswers: ["Epaphroditus"],
    displayAnswer: "Epaphroditus",
    explanation: "Philippians 2:25–30 praises Epaphroditus as 'my brother and fellow worker and fellow soldier, and your messenger.'",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "supp_epist_8",
    type: "verse_completion",
    prompt: "Hebrews 13:7: 'Remember your leaders, those who spoke to you the word of God. Consider the outcome of their way of life, and ______ their faith.'",
    bookId: "HEB",
    chapterNum: 13,
    verseRange: "7",
    acceptedAnswers: ["imitate", "follow"],
    displayAnswer: "imitate",
    explanation: "Hebrews 13:7 emphasizes the power of godly leadership modeling and faithful discipleship.",
    scope: "NT",
    genre: "General Epistles"
  },
  {
    id: "supp_epist_9",
    type: "verse_completion",
    prompt: "1 Peter 3:18: 'For Christ also suffered once for sins, the righteous for the unrighteous, that he might bring us to ______...'",
    bookId: "1PE",
    chapterNum: 3,
    verseRange: "18",
    acceptedAnswers: ["God", "god"],
    displayAnswer: "God",
    explanation: "1 Peter 3:18: '...being put to death in the flesh but made alive in the spirit.'",
    scope: "NT",
    genre: "General Epistles"
  },
  {
    id: "supp_epist_10",
    type: "facts",
    prompt: "Which church leader in 3 John loved to put himself first, refused to receive the apostles, and excommunicated members who showed hospitality?",
    bookId: "3JN",
    chapterNum: 1,
    verseRange: "9–10",
    acceptedAnswers: ["Diotrephes"],
    displayAnswer: "Diotrephes",
    explanation: "3 John 9–10 warns against Diotrephes, who loved to have the preeminence and spoke malicious words against the apostles.",
    scope: "NT",
    genre: "General Epistles"
  },
  {
    id: "supp_epist_11",
    type: "book_id",
    prompt: "Which short New Testament letter urges believers to 'contend earnestly for the faith that was once for all delivered to the saints'?",
    bookId: "JUD",
    chapterNum: 1,
    verseRange: "3",
    acceptedAnswers: ["Jude", "Book of Jude"],
    displayAnswer: "Jude",
    explanation: "Jude 3 is the core rallying cry of Jude's epistle warning against ungodly apostates.",
    scope: "NT",
    genre: "General Epistles"
  },
  {
    id: "supp_epist_12",
    type: "facts",
    prompt: "In Revelation 3:20, to which of the seven churches of Asia Minor did Jesus give the famous invitation: 'Behold, I stand at the door and knock'?",
    bookId: "REV",
    chapterNum: 3,
    verseRange: "20",
    acceptedAnswers: ["Laodicea", "Church in Laodicea", "Laodiceans"],
    displayAnswer: "Laodicea (Church in Laodicea)",
    explanation: "Revelation 3:14–22 was written to the lukewarm church in Laodicea.",
    scope: "NT",
    genre: "Apocalyptic"
  },

  // =========================================================================
  // GFC BIBLE KNOWLEDGE TEST BANK (100 CURATED QUESTIONS)
  // =========================================================================
  {
    id: "gfc_who_1",
    type: "facts",
    prompt: "Who wrote the Book of Acts?",
    bookId: "ACT",
    chapterNum: 1,
    acceptedAnswers: ["Luke", "Saint Luke", "St. Luke", "Dr. Luke", "Doctor Luke"],
    displayAnswer: "Luke",
    explanation: "Luke, the physician and companion of Paul, wrote both the Gospel of Luke and the Acts of the Apostles (Acts 1:1, Luke 1:1\u20134).",
    scope: "NT",
    genre: "Acts (History)"
  },
  {
    id: "gfc_who_2",
    type: "facts",
    prompt: "Who appeared with Jesus on the Mount of Transfiguration?",
    bookId: "MAT",
    chapterNum: 17,
    acceptedAnswers: ["Moses and Elijah", "Moses & Elijah", "Elijah and Moses", "Elijah & Moses", "Moses, Elijah"],
    displayAnswer: "Moses and Elijah",
    explanation: "Matthew 17:3 records Moses (representing the Law) and Elijah (representing the Prophets) talking with the transfigured Christ.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "gfc_who_3",
    type: "facts",
    prompt: "Who directed the rebuilding of the walls of Jerusalem after the Babylonian exile?",
    bookId: "NEH",
    chapterNum: 2,
    acceptedAnswers: ["Nehemiah", "Nehemiah the governor", "Nehemiah the cupbearer"],
    displayAnswer: "Nehemiah",
    explanation: "Nehemiah served as cupbearer to Artaxerxes and governor of Judah, leading the rebuilding of Jerusalem's walls in 52 days (Nehemiah 6:15).",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "gfc_who_4",
    type: "facts",
    prompt: "Which judge killed a thousand Philistines with a donkey's jawbone?",
    bookId: "JDG",
    chapterNum: 15,
    acceptedAnswers: ["Samson"],
    displayAnswer: "Samson",
    explanation: "Judges 15:15: Samson struck down 1,000 Philistines with a fresh jawbone of a donkey at Lehi.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "gfc_who_5",
    type: "facts",
    prompt: "Who succeeded Moses and led the Israelites into the Promised Land across the Jordan River?",
    bookId: "JOS",
    chapterNum: 1,
    acceptedAnswers: ["Joshua", "Joshua son of Nun"],
    displayAnswer: "Joshua",
    explanation: "Joshua 1: Moses' assistant whom God commissioned: 'Be strong and courageous... for you shall cause this people to inherit the land.'",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "gfc_who_6",
    type: "facts",
    prompt: "Which apostle was exiled to the island of Patmos where he received the apocalyptic vision of Revelation?",
    bookId: "REV",
    chapterNum: 1,
    acceptedAnswers: ["John", "Apostle John", "Saint John", "St. John"],
    displayAnswer: "John (Apostle John)",
    explanation: "Revelation 1:9: 'I, John, your brother and partner in the tribulation... was on the island called Patmos on account of the word of God.'",
    scope: "NT",
    genre: "Apocalyptic"
  },
  {
    id: "gfc_who_7",
    type: "facts",
    prompt: "Which pagan prophet was hired by Balak king of Moab to curse Israel, but God compelled him to speak only blessings?",
    bookId: "NUM",
    chapterNum: 22,
    acceptedAnswers: ["Balaam", "Balaam son of Beor"],
    displayAnswer: "Balaam",
    explanation: "Numbers 22\u201324: Balaam could only speak what God commanded, prophesying a star and scepter out of Jacob (Numbers 24:17).",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "gfc_who_8",
    type: "facts",
    prompt: "Who became the first king of the northern 10 tribes of Israel when the united monarchy divided?",
    bookId: "1KI",
    chapterNum: 12,
    acceptedAnswers: ["Jeroboam", "Jeroboam I", "Jeroboam son of Nebat"],
    displayAnswer: "Jeroboam (son of Nebat)",
    explanation: "1 Kings 12: Jeroboam led the northern rebellion against Rehoboam and set up golden calves at Bethel and Dan.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "gfc_who_9",
    type: "facts",
    prompt: "Which wise and discerning woman intervened to rescue David and his men from shedding blood after her foolish husband Nabal insulted them?",
    bookId: "1SA",
    chapterNum: 25,
    acceptedAnswers: ["Abigail"],
    displayAnswer: "Abigail",
    explanation: "1 Samuel 25: Abigail brought provisions to David, restrained his vengeance, and later became David's wife after Nabal died.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "gfc_who_10",
    type: "facts",
    prompt: "Which apostle was publicly rebuked by Paul in Antioch for withdrawing from eating with Gentiles out of fear of the circumcision party?",
    bookId: "GAL",
    chapterNum: 2,
    acceptedAnswers: ["Peter", "Cephas", "Simon Peter"],
    displayAnswer: "Peter (Cephas)",
    explanation: "Galatians 2:11\u201314: Paul opposed Peter to his face because his conduct was not in step with the truth of the gospel.",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "gfc_geo_1",
    type: "facts",
    prompt: "On what mountain did God meet with Moses and give him the Ten Commandments?",
    bookId: "EXO",
    chapterNum: 19,
    acceptedAnswers: ["Mount Sinai", "Sinai", "Mt. Sinai", "Mt Sinai", "Mount Horeb", "Horeb"],
    displayAnswer: "Mount Sinai (Horeb)",
    explanation: "Exodus 19\u201320: God descended on Mount Sinai in fire and smoke and audibly proclaimed the Ten Commandments.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "gfc_geo_2",
    type: "facts",
    prompt: "In what major Greco-Roman city did Demetrius the silversmith stir up a massive theater riot against Paul over Artemis worship?",
    bookId: "ACT",
    chapterNum: 19,
    acceptedAnswers: ["Ephesus"],
    displayAnswer: "Ephesus",
    explanation: "Acts 19:23\u201341: The theater riot in Ephesus where the mob shouted 'Great is Artemis of the Ephesians!' for two hours.",
    scope: "NT",
    genre: "Acts (History)"
  },
  {
    id: "gfc_geo_3",
    type: "facts",
    prompt: "In what Syrian city were the disciples of Jesus first called 'Christians'?",
    bookId: "ACT",
    chapterNum: 11,
    acceptedAnswers: ["Antioch", "Antioch of Syria", "Syrian Antioch"],
    displayAnswer: "Antioch",
    explanation: "Acts 11:26: Barnabas and Saul taught a great many people in Antioch, where believers were first given the name Christians.",
    scope: "NT",
    genre: "Acts (History)"
  },
  {
    id: "gfc_geo_4",
    type: "facts",
    prompt: "In which river was Jesus baptized by John the Baptist?",
    bookId: "MAT",
    chapterNum: 3,
    acceptedAnswers: ["Jordan", "Jordan River", "River Jordan", "The Jordan River", "The Jordan"],
    displayAnswer: "Jordan River",
    explanation: "Matthew 3:13: Jesus came from Galilee to the Jordan to be baptized by John.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "gfc_geo_5",
    type: "facts",
    prompt: "What fortified Canaanite city saw its walls collapse after the Israelites marched around it for seven days?",
    bookId: "JOS",
    chapterNum: 6,
    acceptedAnswers: ["Jericho"],
    displayAnswer: "Jericho",
    explanation: "Joshua 6: The conquest of Jericho where the priests blew ram's horns and the walls fell flat.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "gfc_geo_6",
    type: "facts",
    prompt: "In what capital city on Mount Moriah did King Solomon build the glorious Temple of the Lord?",
    bookId: "1KI",
    chapterNum: 6,
    acceptedAnswers: ["Jerusalem", "Mount Moriah", "Zion"],
    displayAnswer: "Jerusalem",
    explanation: "1 Kings 6 & 2 Chronicles 3:1: Solomon began to build the house of the Lord in Jerusalem on Mount Moriah.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "gfc_geo_7",
    type: "facts",
    prompt: "To what great Assyrian capital city was the prophet Jonah commanded to preach repentance before fleeing toward Tarshish?",
    bookId: "JON",
    chapterNum: 1,
    acceptedAnswers: ["Nineveh"],
    displayAnswer: "Nineveh",
    explanation: "Jonah 1:2: 'Arise, go to Nineveh, that great city, and call out against it, for their evil has come up before me.'",
    scope: "OT",
    genre: "Minor Prophets"
  },
  {
    id: "gfc_geo_8",
    type: "facts",
    prompt: "Near what Syrian city was Saul blinded by a blazing light from heaven and confronted by Jesus on the road?",
    bookId: "ACT",
    chapterNum: 9,
    acceptedAnswers: ["Damascus"],
    displayAnswer: "Damascus",
    explanation: "Acts 9:3\u20134: As Saul drew near to Damascus, suddenly a light from heaven shone around him and he fell to the ground.",
    scope: "NT",
    genre: "Acts (History)"
  },
  {
    id: "gfc_geo_9",
    type: "facts",
    prompt: "In what garden on the Mount of Olives was Jesus betrayed by Judas and arrested after agonizing in prayer?",
    bookId: "MAT",
    chapterNum: 26,
    acceptedAnswers: ["Gethsemane", "Garden of Gethsemane"],
    displayAnswer: "Gethsemane",
    explanation: "Matthew 26:36: Jesus came with them to a place called Gethsemane and prayed: 'Not as I will, but as you will.'",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "gfc_geo_10",
    type: "facts",
    prompt: "In what Judean village, the ancestral town of Jesse, was King David born and later anointed by Samuel?",
    bookId: "1SA",
    chapterNum: 16,
    acceptedAnswers: ["Bethlehem", "Bethlehem Ephrathah", "City of David"],
    displayAnswer: "Bethlehem",
    explanation: "1 Samuel 16:1: Samuel traveled to Bethlehem to anoint David from among Jesse's sons.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "gfc_book_1",
    type: "book_id",
    prompt: "In what book does Peter visit the Roman centurion Cornelius in Caesarea and declare that God shows no partiality between Jews and Gentiles?",
    bookId: "ACT",
    chapterNum: 10,
    acceptedAnswers: ["Acts", "Acts of the Apostles", "Act"],
    displayAnswer: "Acts (Acts 10)",
    explanation: "Acts 10 recounts Peter's rooftop vision and the Holy Spirit falling upon Cornelius's Gentile household.",
    scope: "NT",
    genre: "Acts (History)"
  },
  {
    id: "gfc_book_2",
    type: "book_id",
    prompt: "In what short letter does Paul urge a Christian master to receive back his runaway slave Onesimus 'no longer as a bondservant but... as a beloved brother'?",
    bookId: "PHM",
    chapterNum: 1,
    acceptedAnswers: ["Philemon", "Philem", "Phlm"],
    displayAnswer: "Philemon",
    explanation: "Philemon is Paul's personal epistle appealing for reconciliation and Christian brotherhood between Philemon and Onesimus.",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "gfc_book_3",
    type: "book_id",
    prompt: "In what book does Aaron fashion a golden calf from melted earrings while Moses is up on the mountain receiving the Law?",
    bookId: "EXO",
    chapterNum: 32,
    acceptedAnswers: ["Exodus", "Exod", "Exo"],
    displayAnswer: "Exodus (Exodus 32)",
    explanation: "Exodus 32 chronicles Israel's rapid idolatry at Mount Sinai and Moses shattering the stone tablets.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "gfc_book_4",
    type: "book_id",
    prompt: "In what book is the narrative of Joseph being sold into Egyptian slavery by his brothers and later declaring 'God meant it for good'?",
    bookId: "GEN",
    chapterNum: 37,
    acceptedAnswers: ["Genesis", "Gen", "Ge"],
    displayAnswer: "Genesis (Genesis 37\u201350)",
    explanation: "Genesis 37\u201350 details Joseph's coat of many colors, Potiphar's house, prison, and rise to prime minister of Egypt.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "gfc_book_5",
    type: "book_id",
    prompt: "In what book do twelve spies explore the land of Canaan, with only Joshua and Caleb trusting the Lord to give them victory?",
    bookId: "NUM",
    chapterNum: 13,
    acceptedAnswers: ["Numbers", "Num", "Nu"],
    displayAnswer: "Numbers (Numbers 13\u201314)",
    explanation: "Numbers 13\u201314 records the 10 fearful spies and the resulting 40-year wandering in the wilderness.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "gfc_book_6",
    type: "book_id",
    prompt: "In what prophetic book is God's coming judgment on Judah portrayed as a devastating, unstoppable invasion of locusts?",
    bookId: "JOL",
    chapterNum: 1,
    acceptedAnswers: ["Joel", "Jol", "Joe"],
    displayAnswer: "Joel (Joel 1\u20132)",
    explanation: "Joel 1\u20132 uses the locust plague as a warning of the Day of the Lord, followed by the promise of the Spirit in Joel 2:28.",
    scope: "OT",
    genre: "Minor Prophets"
  },
  {
    id: "gfc_book_7",
    type: "book_id",
    prompt: "In what epistle does the Apostle Paul describe the full Armor of God to withstand the schemes of the devil?",
    bookId: "EPH",
    chapterNum: 6,
    acceptedAnswers: ["Ephesians", "Eph"],
    displayAnswer: "Ephesians (Ephesians 6)",
    explanation: "Ephesians 6:10\u201320 describes the belt of truth, breastplate of righteousness, shield of faith, helmet of salvation, and sword of the Spirit.",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "gfc_book_8",
    type: "book_id",
    prompt: "In what Old Testament book do the exact prophetic words appear: 'My God, my God, why have you forsaken me? Why are you so far from saving me...'?",
    bookId: "PSA",
    chapterNum: 22,
    acceptedAnswers: ["Psalms", "Psalm", "Psalm 22", "Psalms 22", "Ps 22"],
    displayAnswer: "Psalms (Psalm 22:1)",
    explanation: "Psalm 22:1 is David's prophetic lament of crucifixion, quoted by Jesus on the cross (Matthew 27:46).",
    scope: "OT",
    genre: "Poetry/Wisdom"
  },
  {
    id: "gfc_book_9",
    type: "book_id",
    prompt: "In what book is a prophet commanded by God to marry an unfaithful woman named Gomer as a living object lesson of God's redeeming covenant love?",
    bookId: "HOS",
    chapterNum: 1,
    acceptedAnswers: ["Hosea", "Hos"],
    displayAnswer: "Hosea (Hosea 1\u20133)",
    explanation: "Hosea 1\u20133 portrays God's relentless, forgiving love for spiritual adulterers.",
    scope: "OT",
    genre: "Minor Prophets"
  },
  {
    id: "gfc_book_10",
    type: "book_id",
    prompt: "In what Gospel do the Magi from the East follow a miraculous star to Bethlehem and present gifts of gold, frankincense, and myrrh?",
    bookId: "MAT",
    chapterNum: 2,
    acceptedAnswers: ["Matthew", "Matt", "Gospel of Matthew"],
    displayAnswer: "Matthew (Matthew 2)",
    explanation: "Matthew 2:1\u201312 uniquely records the visit and worship of the wise men.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "gfc_book_11",
    type: "book_id",
    prompt: "In what book does the famous passage appear: 'For everything there is a season, and a time for every matter under heaven: a time to be born, and a time to die...'?",
    bookId: "ECC",
    chapterNum: 3,
    acceptedAnswers: ["Ecclesiastes", "Eccl", "Ecc"],
    displayAnswer: "Ecclesiastes (Ecclesiastes 3)",
    explanation: "Ecclesiastes 3:1\u20138 contains the famous poem on the appointed times and sovereign seasons of life.",
    scope: "OT",
    genre: "Poetry/Wisdom"
  },
  {
    id: "gfc_book_12",
    type: "book_id",
    prompt: "In what poetic book is the repeated romantic refrain found: 'I adjure you, O daughters of Jerusalem... that you not stir up or awaken love until it pleases'?",
    bookId: "SNG",
    chapterNum: 2,
    acceptedAnswers: ["Song of Solomon", "Song of Songs", "Canticles", "Song"],
    displayAnswer: "Song of Solomon (Song of Songs)",
    explanation: "Song of Solomon 2:7, 3:5, 8:4 cautions against premature intimacy outside its covenant timing.",
    scope: "OT",
    genre: "Poetry/Wisdom"
  },
  {
    id: "gfc_book_13",
    type: "book_id",
    prompt: "In what wisdom book does the passage appear: 'Wisdom has built her house; she has hewn her seven pillars. She has slaughtered her beasts; she has mixed her wine...'?",
    bookId: "PRO",
    chapterNum: 9,
    acceptedAnswers: ["Proverbs", "Prov"],
    displayAnswer: "Proverbs (Proverbs 9)",
    explanation: "Proverbs 9:1\u20136 contrasts Lady Wisdom's banquet invitation with the destructive feast of Lady Folly.",
    scope: "OT",
    genre: "Poetry/Wisdom"
  },
  {
    id: "gfc_book_14",
    type: "book_id",
    prompt: "In what prophetic book is the prophet lowered with ropes into a muddy, dark cistern where he sank into the mire because of his preaching?",
    bookId: "JER",
    chapterNum: 38,
    acceptedAnswers: ["Jeremiah", "Jer"],
    displayAnswer: "Jeremiah (Jeremiah 38)",
    explanation: "Jeremiah 38:6: Jeremiah was cast into the cistern of Malchiah and later rescued by Ebed-melech the Ethiopian.",
    scope: "OT",
    genre: "Major Prophets"
  },
  {
    id: "gfc_book_15",
    type: "book_id",
    prompt: "In what book is the Great Commandment commanded: 'You shall love the Lord your God with all your heart and with all your soul and with all your might'?",
    bookId: "DEU",
    chapterNum: 6,
    acceptedAnswers: ["Deuteronomy", "Deut", "Deu"],
    displayAnswer: "Deuteronomy (Deuteronomy 6:5)",
    explanation: "Deuteronomy 6:4\u20135 is the centerpiece Shema, quoted by Jesus as the first and greatest commandment.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "gfc_book_16",
    type: "book_id",
    prompt: "In what Gospel does Jesus converse with a Samaritan woman at Jacob's well in Sychar, offering her 'living water'?",
    bookId: "JHN",
    chapterNum: 4,
    acceptedAnswers: ["John", "Jn", "Gospel of John"],
    displayAnswer: "John (John 4)",
    explanation: "John 4:1\u201342 records Jesus revealing Himself as the Messiah to the Samaritan woman.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "gfc_book_17",
    type: "book_id",
    prompt: "In what epistle does the universal verdict on human guilt appear: 'for all have sinned and fall short of the glory of God'?",
    bookId: "ROM",
    chapterNum: 3,
    acceptedAnswers: ["Romans", "Rom"],
    displayAnswer: "Romans (Romans 3:23)",
    explanation: "Romans 3:23 summarizes the universal need for justification by God's free grace in Jesus Christ.",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "gfc_book_18",
    type: "book_id",
    prompt: "In what Gospel is the Parable of the Good Samaritan told by Jesus in response to the question 'And who is my neighbor?'?",
    bookId: "LUK",
    chapterNum: 10,
    acceptedAnswers: ["Luke", "Luk", "Gospel of Luke"],
    displayAnswer: "Luke (Luke 10)",
    explanation: "Luke 10:25\u201337 uniquely preserves Jesus' famous parable of the merciful Samaritan.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "gfc_book_19",
    type: "book_id",
    prompt: "In what pastoral letter does Paul instruct: 'Do not rebuke an older man but encourage him as you would a father, younger men as brothers, older women as mothers, younger women as sisters, in all purity'?",
    bookId: "1TI",
    chapterNum: 5,
    acceptedAnswers: ["1 Timothy", "1 Tim", "1Ti", "First Timothy"],
    displayAnswer: "1 Timothy (1 Tim 5:1\u20132)",
    explanation: "1 Timothy 5 gives pastoral guidelines for relationships within the household of God.",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "gfc_book_20",
    type: "book_id",
    prompt: "In what historical book does God establish His unconditional Davidic Covenant: 'And your house and your kingdom shall be made sure forever before me. Your throne shall be established forever'?",
    bookId: "2SA",
    chapterNum: 7,
    acceptedAnswers: ["2 Samuel", "2 Sam", "2Sa", "Second Samuel"],
    displayAnswer: "2 Samuel (2 Samuel 7)",
    explanation: "2 Samuel 7:12\u201316 contains Nathan's prophecy of David's eternal royal dynasty, fulfilled in Christ.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "gfc_loc_1",
    type: "book_chapter",
    prompt: "In what book and chapter does God audibly speak the Ten Commandments to Israel from Mount Sinai?",
    bookId: "EXO",
    chapterNum: 20,
    acceptedAnswers: ["Exodus 20", "Exod 20", "Exo 20", "Ex 20"],
    displayAnswer: "Exodus 20",
    explanation: "Exodus 20 records the initial proclamation of the Decalogue (repeated in Deuteronomy 5).",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "gfc_loc_2",
    type: "book_chapter",
    prompt: "In what book and chapter is the foundational Call of Abram: 'Go from your country and your kindred and your father's house to the land that I will show you. And I will make of you a great nation...'?",
    bookId: "GEN",
    chapterNum: 12,
    acceptedAnswers: ["Genesis 12", "Gen 12", "Ge 12"],
    displayAnswer: "Genesis 12",
    explanation: "Genesis 12:1\u20133 initiates the Abrahamic Covenant of land, seed, and global blessing.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "gfc_loc_3",
    type: "facts",
    prompt: "Which three chapters in Matthew contain the complete Sermon on the Mount (Beatitudes, Lord's Prayer, Golden Rule)?",
    bookId: "MAT",
    chapterNum: 5,
    acceptedAnswers: ["Matthew 5-7", "Matthew 5, 6, 7", "Matt 5-7", "5-7", "Matthew 5 to 7", "5, 6, 7"],
    displayAnswer: "Matthew 5\u20137",
    explanation: "Matthew chapters 5, 6, and 7 comprise the inaugural discourse of Jesus on Kingdom ethics and discipleship.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "gfc_loc_4",
    type: "book_chapter",
    prompt: "In what book and chapter does the risen Christ issue the Great Commission: 'Go therefore and make disciples of all nations, baptizing them... and teaching them to observe all that I have commanded you'?",
    bookId: "MAT",
    chapterNum: 28,
    acceptedAnswers: ["Matthew 28", "Matt 28", "Mt 28"],
    displayAnswer: "Matthew 28",
    explanation: "Matthew 28:18\u201320 concludes Matthew's Gospel with Christ's universal commission to His church.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "gfc_loc_5",
    type: "book_chapter",
    prompt: "In what book and chapter is the Holy Spirit poured out on the Day of Pentecost with a rushing wind and tongues as of fire?",
    bookId: "ACT",
    chapterNum: 2,
    acceptedAnswers: ["Acts 2", "Act 2"],
    displayAnswer: "Acts 2",
    explanation: "Acts 2:1\u20134 describes the birth of the New Testament church at Pentecost and Peter's sermon.",
    scope: "NT",
    genre: "Acts (History)"
  },
  {
    id: "gfc_loc_6",
    type: "book_chapter",
    prompt: "In what book and chapter does Paul contrast the Two Adams: 'For as by the one man's disobedience the many were made sinners, so by the one man's obedience the many will be made righteous'?",
    bookId: "ROM",
    chapterNum: 5,
    acceptedAnswers: ["Romans 5", "Rom 5", "Ro 5", "Romans 5:19"],
    displayAnswer: "Romans 5",
    explanation: "Romans 5:12\u201321 develops the profound theological parallel and contrast between Adam and Christ.",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "gfc_loc_7",
    type: "book_chapter",
    prompt: "In what book and chapter does the famous 'Love Chapter' conclude: 'So now faith, hope, and love abide, these three; but the greatest of these is love'?",
    bookId: "1CO",
    chapterNum: 13,
    acceptedAnswers: ["1 Corinthians 13", "1 Cor 13", "1Co 13", "1 Corinthians 13:13"],
    displayAnswer: "1 Corinthians 13",
    explanation: "1 Corinthians 13 defines the character and eternal supremacy of Christian love (agape).",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "gfc_loc_8",
    type: "book_chapter",
    prompt: "In what book and chapter does Jesus tell Nicodemus: 'Truly, truly, I say to you, unless one is born again he cannot see the kingdom of God'?",
    bookId: "JHN",
    chapterNum: 3,
    acceptedAnswers: ["John 3", "Jn 3", "John 3:3"],
    displayAnswer: "John 3",
    explanation: "John 3:1\u201321 records Jesus' nighttime discourse on spiritual regeneration, including John 3:16.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "gfc_loc_9",
    type: "book_chapter",
    prompt: "In what book and chapter is the ancient serpent (Satan) bound and locked in the bottomless pit for a thousand years?",
    bookId: "REV",
    chapterNum: 20,
    acceptedAnswers: ["Revelation 20", "Rev 20", "Revelation 20:2"],
    displayAnswer: "Revelation 20",
    explanation: "Revelation 20:1\u20133 describes the millennial binding of Satan followed by the Great White Throne Judgment.",
    scope: "NT",
    genre: "Apocalyptic"
  },
  {
    id: "gfc_loc_10",
    type: "book_chapter",
    prompt: "In what book and chapter are Shadrach, Meshach, and Abednego thrown into the blazing fiery furnace and delivered unhurt alongside a fourth figure?",
    bookId: "DAN",
    chapterNum: 3,
    acceptedAnswers: ["Daniel 3", "Dan 3", "Da 3"],
    displayAnswer: "Daniel 3",
    explanation: "Daniel 3 records the Hebrew youths refusing to bow to Nebuchadnezzar's golden idol and God protecting them in the flames.",
    scope: "OT",
    genre: "Major Prophets"
  },
  {
    id: "gfc_top_1",
    type: "facts",
    prompt: "What is the primary narrative event recorded in Genesis 3?",
    bookId: "GEN",
    chapterNum: 3,
    acceptedAnswers: ["The Fall", "The Fall of Man", "The Fall of Humanity", "Fall of Man", "Original Sin", "Temptation and Fall"],
    displayAnswer: "The Fall of Man (Original Sin & First Gospel Promise)",
    explanation: "Genesis 3 recounts the serpent's deception, the disobedience of Adam and Eve, the curse, and the Protoevangelium (Gen 3:15).",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "gfc_top_2",
    type: "facts",
    prompt: "What is the central prophetic theme of Isaiah 53?",
    bookId: "ISA",
    chapterNum: 53,
    acceptedAnswers: ["The Suffering Servant", "Suffering Servant", "Substitutionary Atonement", "Messiah suffering", "Christ suffering"],
    displayAnswer: "The Suffering Servant (Substitutionary Atonement)",
    explanation: "Isaiah 53 foretells the Messiah pierced for our transgressions and bearing our iniquities.",
    scope: "OT",
    genre: "Major Prophets"
  },
  {
    id: "gfc_top_3",
    type: "facts",
    prompt: "What is the central doctrinal theme of Romans 4?",
    bookId: "ROM",
    chapterNum: 4,
    acceptedAnswers: ["Justification by Faith", "Abraham's faith counted as righteousness", "Faith of Abraham", "Abraham justified by faith"],
    displayAnswer: "Justification by Faith (Abraham's faith counted as righteousness)",
    explanation: "Romans 4 uses Abraham to prove that righteousness is credited through faith apart from works of the Law.",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "gfc_top_4",
    type: "facts",
    prompt: "What is the central subject of Psalm 119 (the longest chapter in the Bible)?",
    bookId: "PSA",
    chapterNum: 119,
    acceptedAnswers: ["The Word of God", "God's Word", "The Law of the Lord", "Worth of God's Word", "Scripture", "The Law"],
    displayAnswer: "The Word of God (Law, Testimonies, Precepts, and Statutes)",
    explanation: "Psalm 119 contains 176 verses meditating on the glory, wisdom, and sufficiency of God's Word.",
    scope: "OT",
    genre: "Poetry/Wisdom"
  },
  {
    id: "gfc_top_5",
    type: "facts",
    prompt: "What famous title is commonly given to Hebrews 11 due to its survey of Old Testament heroes from Abel to the prophets?",
    bookId: "HEB",
    chapterNum: 11,
    acceptedAnswers: ["Hall of Faith", "Faith Hall of Fame", "The Faith Chapter", "Heroes of Faith"],
    displayAnswer: "The Hall of Faith (Faith's Hall of Fame)",
    explanation: "Hebrews 11 defines faith and chronicles the persevering trust of Old Testament saints.",
    scope: "NT",
    genre: "General Epistles"
  },
  {
    id: "gfc_top_6",
    type: "facts",
    prompt: "What major historical ecclesiastical gathering is convened in Acts 15 to settle Gentile circumcision and salvation?",
    bookId: "ACT",
    chapterNum: 15,
    acceptedAnswers: ["The Jerusalem Council", "Jerusalem Council", "Council of Jerusalem"],
    displayAnswer: "The Jerusalem Council",
    explanation: "Acts 15 affirmed that Gentiles are saved through the grace of the Lord Jesus Christ without needing circumcision.",
    scope: "NT",
    genre: "Acts (History)"
  },
  {
    id: "gfc_top_7",
    type: "facts",
    prompt: "What is the major event of John 17, where Jesus prays for Himself, His disciples, and all future believers?",
    bookId: "JHN",
    chapterNum: 17,
    acceptedAnswers: ["High Priestly Prayer", "Jesus's High Priestly Prayer", "The Farewell Prayer", "Priestly Prayer", "Jesus' prayer"],
    displayAnswer: "Jesus' High Priestly Prayer",
    explanation: "John 17 records Jesus praying for His disciples to be kept from the evil one and sanctified in the truth.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "gfc_top_8",
    type: "facts",
    prompt: "What grand climactic reality is revealed in Revelation 21 when the holy city descends out of heaven from God?",
    bookId: "REV",
    chapterNum: 21,
    acceptedAnswers: ["New Heaven and New Earth", "New Jerusalem", "The New Creation", "New Heaven and Earth"],
    displayAnswer: "The New Heaven, New Earth, and New Jerusalem",
    explanation: "Revelation 21 depicts God dwelling with humanity in the new creation where death and pain are no more.",
    scope: "NT",
    genre: "Apocalyptic"
  },
  {
    id: "gfc_top_9",
    type: "facts",
    prompt: "What famous trilogy of parables does Jesus tell in Luke 15 to illustrate God's joy over repentant sinners?",
    bookId: "LUK",
    chapterNum: 15,
    acceptedAnswers: ["Parables of the Lost", "Lost Sheep, Lost Coin, Prodigal Son", "The Lost Sheep", "Prodigal Son", "Parables of Jesus"],
    displayAnswer: "The Parables of the Lost Sheep, Lost Coin, and Prodigal Son",
    explanation: "Luke 15 shows the seeking shepherd, the searching woman, and the running father celebrating the lost being found.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "gfc_top_10",
    type: "facts",
    prompt: "What miraculous revelation of God's presence and holy covenant name occurs in Exodus 3?",
    bookId: "EXO",
    chapterNum: 3,
    acceptedAnswers: ["The Burning Bush", "Burning Bush", "Call of Moses"],
    displayAnswer: "The Burning Bush (God reveals His name 'I AM WHO I AM' to Moses)",
    explanation: "Exodus 3 records God appearing to Moses in a bush that burned without being consumed.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "gfc_quote_1",
    type: "facts",
    prompt: "Who resolved: 'Go, gather all the Jews to be found in Susa, and hold a fast on my behalf... Then I will go to the king, though it is against the law, and if I perish, I perish'?",
    bookId: "EST",
    chapterNum: 4,
    acceptedAnswers: ["Esther", "Queen Esther", "Hadassah"],
    displayAnswer: "Queen Esther",
    explanation: "Esther 4:16: Esther's courageous commitment to risk her life to plead before King Ahasuerus for the Jewish people.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "gfc_quote_2",
    type: "facts",
    prompt: "Who asked Jesus the cynical question 'What is truth?' during His trial in the Praetorium?",
    bookId: "JHN",
    chapterNum: 18,
    acceptedAnswers: ["Pontius Pilate", "Pilate"],
    displayAnswer: "Pontius Pilate",
    explanation: "John 18:38: The Roman governor's dismissive remark after Jesus declared He came to bear witness to the truth.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "gfc_quote_3",
    type: "facts",
    prompt: "Who laughed to herself in her tent, saying: 'After I am worn out, and my lord is old, shall I have pleasure?... Shall I indeed bear a child, now that I am old?'?",
    bookId: "GEN",
    chapterNum: 18,
    acceptedAnswers: ["Sarah", "Sarai"],
    displayAnswer: "Sarah",
    explanation: "Genesis 18:12\u201314: Sarah reacted in disbelief before giving birth to Isaac as God promised.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "gfc_quote_4",
    type: "facts",
    prompt: "Who lamented: 'O Jerusalem, Jerusalem, the city that kills the prophets and stones those who are sent to it! How often would I have gathered your children together as a hen gathers her brood under her wings, and you were not willing!'?",
    bookId: "MAT",
    chapterNum: 23,
    acceptedAnswers: ["Jesus", "Jesus Christ", "Christ", "The Lord"],
    displayAnswer: "Jesus Christ",
    explanation: "Matthew 23:37 & Luke 13:34: Jesus weeping over the spiritual blindness of Jerusalem.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "gfc_quote_5",
    type: "facts",
    prompt: "Who requested of Jesus: 'Say that these two sons of mine are to sit, one at your right hand and one at your left, in your kingdom'?",
    bookId: "MAT",
    chapterNum: 20,
    acceptedAnswers: ["The mother of James and John", "Mother of James and John", "Mother of Zebedee's sons", "Salome", "Zebedee's wife"],
    displayAnswer: "The mother of James and John (Zebedee's sons / Salome)",
    explanation: "Matthew 20:20\u201321: Prompting Jesus to teach that greatness in the Kingdom is found in serving others.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "gfc_quote_6",
    type: "facts",
    prompt: "Who asked his father on the way up Mount Moriah: 'Behold, the fire and the wood, but where is the lamb for a burnt offering?'?",
    bookId: "GEN",
    chapterNum: 22,
    acceptedAnswers: ["Isaac"],
    displayAnswer: "Isaac",
    explanation: "Genesis 22:7: Abraham answered: 'God will provide for himself the lamb for a burnt offering, my son.'",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "gfc_quote_7",
    type: "facts",
    prompt: "Who said of Jesus: 'He must increase, but I must decrease'?",
    bookId: "JHN",
    chapterNum: 3,
    acceptedAnswers: ["John the Baptist", "John Baptist", "John the Immerser"],
    displayAnswer: "John the Baptist",
    explanation: "John 3:30: John the Baptist declaring that his joy was fulfilled in exalting the Messiah.",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "gfc_quote_8",
    type: "facts",
    prompt: "Who taunted young David in the Valley of Elah: 'Am I a dog, that you come to me with sticks?' and cursed David by his gods?",
    bookId: "1SA",
    chapterNum: 17,
    acceptedAnswers: ["Goliath", "Goliath of Gath", "The Philistine"],
    displayAnswer: "Goliath of Gath",
    explanation: "1 Samuel 17:43: Goliath's arrogant boast before David struck him with a sling and a stone.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "gfc_quote_9",
    type: "facts",
    prompt: "Who declared in the midst of agonizing suffering: 'For I know that my Redeemer lives, and at the last he will stand upon the earth. And after my skin has been thus destroyed, yet in my flesh I shall see God'?",
    bookId: "JOB",
    chapterNum: 19,
    acceptedAnswers: ["Job"],
    displayAnswer: "Job",
    explanation: "Job 19:25\u201326: Job's profound declaration of confidence in his living Redeemer and bodily resurrection.",
    scope: "OT",
    genre: "Poetry/Wisdom"
  },
  {
    id: "gfc_quote_10",
    type: "facts",
    prompt: "Who prayed to God at Gibeon: 'Give your servant therefore an understanding mind to govern your people, that I may discern between good and evil, for who is able to govern this your great people?'?",
    bookId: "1KI",
    chapterNum: 3,
    acceptedAnswers: ["Solomon", "King Solomon"],
    displayAnswer: "Solomon",
    explanation: "1 Kings 3:9: Solomon's humble request for wisdom which pleased the Lord.",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "gfc_err_1",
    type: "book_id",
    prompt: "To which New Testament book would you turn to correct the error: 'As long as you believe the right things, it doesn\u2019t matter how you live your life'?",
    bookId: "JAS",
    chapterNum: 2,
    acceptedAnswers: ["James", "Jas", "Epistle of James"],
    displayAnswer: "James",
    explanation: "James 2:17, 26 teaches that faith without works is dead.",
    scope: "NT",
    genre: "General Epistles"
  },
  {
    id: "gfc_err_2",
    type: "book_id",
    prompt: "To which epistle would you turn to correct the error: 'I\u2019m sure I don\u2019t have any spiritual gifts; only special people do'?",
    bookId: "1CO",
    chapterNum: 12,
    acceptedAnswers: ["1 Corinthians", "1 Cor", "1Co", "First Corinthians"],
    displayAnswer: "1 Corinthians (1 Corinthians 12)",
    explanation: "1 Corinthians 12:7 explains: 'To each is given the manifestation of the Spirit for the common good.'",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "gfc_err_3",
    type: "book_id",
    prompt: "To which epistle would you turn to correct the legalistic error: 'We are saved by Jesus, but we also have to do our part by keeping the Old Testament ceremonial law'?",
    bookId: "GAL",
    chapterNum: 2,
    acceptedAnswers: ["Galatians", "Gal"],
    displayAnswer: "Galatians",
    explanation: "Galatians 2:16 forcefully argues that justification is through faith in Christ alone, not by works of the law.",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "gfc_err_4",
    type: "book_id",
    prompt: "To which Old Testament book would you turn to correct the retribution error: 'If you are sick or suffering, you must have secret sin; good people don\u2019t suffer'?",
    bookId: "JOB",
    chapterNum: 1,
    acceptedAnswers: ["Job"],
    displayAnswer: "Job",
    explanation: "Job refutes the simplistic theology that suffering is always a direct result of personal sin.",
    scope: "OT",
    genre: "Poetry/Wisdom"
  },
  {
    id: "gfc_err_5",
    type: "book_id",
    prompt: "To which prophetic book would you turn to correct the error: 'God only cares about religious rituals; He doesn\u2019t care about the poor, vulnerable, and oppressed'?",
    bookId: "AMO",
    chapterNum: 5,
    acceptedAnswers: ["Amos", "Amo"],
    displayAnswer: "Amos",
    explanation: "Amos 5:24 declares: 'Let justice roll down like waters, and righteousness like an ever-flowing stream!'",
    scope: "OT",
    genre: "Minor Prophets"
  },
  {
    id: "gfc_err_6",
    type: "book_id",
    prompt: "To which book would you turn to correct the doubt: 'I know God promises to bless, but we cannot trust Him through hard trials like barrenness, betrayal, famine, and unjust imprisonment'?",
    bookId: "GEN",
    chapterNum: 50,
    acceptedAnswers: ["Genesis", "Gen"],
    displayAnswer: "Genesis",
    explanation: "Genesis showcases God's unbreakable providence through Abraham, Sarah, Isaac, Jacob, and Joseph ('God meant it for good', Gen 50:20).",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "gfc_err_7",
    type: "book_id",
    prompt: "To which book would you turn to correct the nihilistic error: 'In the end it won\u2019t make any difference whom we followed or what we did; everybody gets treated the exact same when history ends'?",
    bookId: "REV",
    chapterNum: 20,
    acceptedAnswers: ["Revelation", "Rev", "Apocalypse"],
    displayAnswer: "Revelation",
    explanation: "Revelation 20\u201322 reveals final cosmic judgment, eternal life for the redeemed, and eternal separation for the wicked.",
    scope: "NT",
    genre: "Apocalyptic"
  },
  {
    id: "gfc_err_8",
    type: "book_id",
    prompt: "To which Gospel would you turn to correct the pluralistic error: 'There\u2019s nothing unique about Jesus; He\u2019s just one path among many, like any other prophet or good moral teacher'?",
    bookId: "JHN",
    chapterNum: 14,
    acceptedAnswers: ["John", "Jn", "Gospel of John"],
    displayAnswer: "John",
    explanation: "John 1:1\u201314 and John 14:6 present Christ as the eternal Word made flesh: 'I am the way, and the truth, and the life. No one comes to the Father except through me.'",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "gfc_err_9",
    type: "book_id",
    prompt: "To which pastoral letter would you turn to correct worldly church leadership criteria: 'Pick elders based on corporate business wealth, degrees, popularity, and charismatic good looks'?",
    bookId: "1TI",
    chapterNum: 3,
    acceptedAnswers: ["1 Timothy", "1 Tim", "1Ti", "First Timothy"],
    displayAnswer: "1 Timothy (1 Timothy 3)",
    explanation: "1 Timothy 3:1\u20137 sets forth the indispensable spiritual, moral, and character qualifications for overseers/elders.",
    scope: "NT",
    genre: "Pauline Epistles"
  },
  {
    id: "gfc_err_10",
    type: "book_id",
    prompt: "To which book would you turn to correct the ascetic error: 'The Bible doesn\u2019t say anything good about romantic love and marital intimacy; that\u2019s too physical for God to care about'?",
    bookId: "SNG",
    chapterNum: 1,
    acceptedAnswers: ["Song of Solomon", "Song of Songs", "Canticles", "Song"],
    displayAnswer: "Song of Solomon (Song of Songs)",
    explanation: "Song of Solomon celebrates the purity, passion, beauty, and emotional delight of marital love as God's good design.",
    scope: "OT",
    genre: "Poetry/Wisdom"
  },
  {
    id: "gfc_chr_1",
    type: "facts",
    prompt: "Which of the following biblical events happened FIRST chronologically: (A) Judges rule over Israel, (B) Saul is anointed king, (C) God's promise to Abraham, or (D) Pentecost?",
    bookId: "GEN",
    chapterNum: 12,
    acceptedAnswers: ["God's promise to Abraham", "Gods promise to Abraham", "promise to Abraham", "Abraham", "C"],
    displayAnswer: "God's promise to Abraham (~2000 BC)",
    explanation: "Abraham (~2000 BC) preceded the Judges (~1375\u20131050 BC), Saul (~1050 BC), and Pentecost (AD 33).",
    scope: "ALL",
    genre: "Historical"
  },
  {
    id: "gfc_chr_2",
    type: "facts",
    prompt: "Which of the following events happened FIRST chronologically: (A) Paul is shipwrecked, (B) Timothy is circumcised, (C) Jesus is crucified, or (D) Peter denies Jesus?",
    bookId: "MAT",
    chapterNum: 26,
    acceptedAnswers: ["Peter denies Jesus", "Peter's denial", "Peter denies Christ", "D"],
    displayAnswer: "Peter denies Jesus (night before the crucifixion)",
    explanation: "Peter's denial occurred early Friday morning before Jesus' crucifixion later that day, followed years later by Timothy's circumcision (Acts 16) and Paul's shipwreck (Acts 27).",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "gfc_chr_3",
    type: "facts",
    prompt: "Which of the following events happened FIRST chronologically: (A) The Great Flood, (B) The New Jerusalem descends, (C) The Fall of man, or (D) Christ is born?",
    bookId: "GEN",
    chapterNum: 3,
    acceptedAnswers: ["The fall of man", "Fall of man", "The Fall", "Fall", "C"],
    displayAnswer: "The Fall of man (Genesis 3)",
    explanation: "The Fall (Gen 3) preceded the Flood (Gen 6\u20139), the Nativity (Matt 1), and the New Jerusalem (Rev 21).",
    scope: "ALL",
    genre: "Pentateuch"
  },
  {
    id: "gfc_chr_4",
    type: "facts",
    prompt: "Which of the following events happened FIRST chronologically: (A) Jesus washes the disciples' feet, (B) David is anointed king, (C) The crossing of the Red Sea, or (D) Naaman is cleansed of leprosy?",
    bookId: "EXO",
    chapterNum: 14,
    acceptedAnswers: ["The crossing of the Red Sea", "Crossing of the Red Sea", "Red Sea", "C"],
    displayAnswer: "The crossing of the Red Sea (Exodus 14, ~1446 BC)",
    explanation: "The Red Sea crossing (~1446 BC) preceded David (~1000 BC), Naaman (~850 BC), and Jesus washing the disciples' feet (AD 33).",
    scope: "ALL",
    genre: "Pentateuch"
  },
  {
    id: "gfc_chr_5",
    type: "facts",
    prompt: "Which of the following events happened FIRST chronologically: (A) The disciples filled with the Spirit at Pentecost, (B) Stephen is stoned, (C) Apollos instructed by Priscilla and Aquila, or (D) Two disciples meet Jesus on the road to Emmaus?",
    bookId: "LUK",
    chapterNum: 24,
    acceptedAnswers: ["Two disciples encounter Jesus on the road to Emmaus", "Road to Emmaus", "Emmaus", "D"],
    displayAnswer: "Two disciples encounter Jesus on the road to Emmaus (Resurrection Sunday, Luke 24)",
    explanation: "Emmaus occurred on Resurrection Sunday (Luke 24), prior to Pentecost 50 days later (Acts 2), Stephen's martyrdom (Acts 7), and Apollos at Ephesus (Acts 18).",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "gfc_chr_6",
    type: "facts",
    prompt: "Which of the following events happened FIRST chronologically: (A) Rehoboam splits the kingdom, (B) Hannah prays for a son before Eli, (C) Nehemiah rebuilds Jerusalem's walls, or (D) The Babylonian Exile?",
    bookId: "1SA",
    chapterNum: 1,
    acceptedAnswers: ["Hannah prays before Eli", "Hannah prays", "Hannah", "B"],
    displayAnswer: "Hannah prays before Eli (~1100 BC, 1 Samuel 1)",
    explanation: "Hannah praying (~1100 BC) preceded the divided kingdom (~930 BC), the Babylonian Exile (586 BC), and Nehemiah (445 BC).",
    scope: "OT",
    genre: "Historical"
  },
  {
    id: "gfc_chr_7",
    type: "facts",
    prompt: "Which of the following divine callings happened FIRST chronologically: (A) God calls Abram out of Ur, (B) God calls Gideon a mighty man of valor, (C) God calls Moses out of the burning bush, or (D) God calls Ananias to lay hands on Saul?",
    bookId: "GEN",
    chapterNum: 12,
    acceptedAnswers: ["God calls Abram out of Ur of the Chaldeans", "God calls Abram", "Abram out of Ur", "A"],
    displayAnswer: "God calls Abram out of Ur (~2000 BC, Genesis 12)",
    explanation: "Abram (~2000 BC) was called before Moses (~1446 BC), Gideon (~1160 BC), and Ananias in Damascus (AD 34).",
    scope: "ALL",
    genre: "Pentateuch"
  },
  {
    id: "gfc_chr_8",
    type: "facts",
    prompt: "Which of the following events happened FIRST chronologically: (A) Malachi prophesies, (B) Joseph sold into slavery, (C) Sarah laughs at the promise of a son, or (D) The Ten Plagues on Egypt?",
    bookId: "GEN",
    chapterNum: 18,
    acceptedAnswers: ["Sarah laughs", "Sarah laughs at the promise of a son", "Sarah", "C"],
    displayAnswer: "Sarah laughs (Genesis 18, ~2067 BC)",
    explanation: "Sarah laughing (~2067 BC) occurred before Joseph was sold (~1898 BC), the Ten Plagues (~1446 BC), and Malachi (~430 BC).",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "gfc_chr_9",
    type: "facts",
    prompt: "Which of the following events happened FIRST chronologically: (A) Herod beheads John the Baptist, (B) Herod the Great inquires where the Christ is to be born, (C) King Agrippa listens to Paul, or (D) Herod Agrippa I is struck by an angel for taking God's glory?",
    bookId: "MAT",
    chapterNum: 2,
    acceptedAnswers: ["Herod discovers where the Christ was to be born", "Herod the Great inquires where the Christ was to be born", "Herod discovers", "B"],
    displayAnswer: "Herod discovers where the Christ was to be born (~4 BC, Matthew 2)",
    explanation: "Herod the Great (~4 BC, Matt 2) preceded Herod Antipas executing John (~AD 29, Matt 14), Herod Agrippa I struck down (AD 44, Acts 12), and King Agrippa II hearing Paul (AD 59, Acts 26).",
    scope: "NT",
    genre: "Gospels"
  },
  {
    id: "gfc_chr_10",
    type: "facts",
    prompt: "Which of the following events happened FIRST chronologically: (A) Barnabas finds Saul in Tarsus, (B) Jesus is baptized, (C) Daniel prays despite King Darius's decree, or (D) Levi leaves his tax booth to follow Jesus?",
    bookId: "DAN",
    chapterNum: 6,
    acceptedAnswers: ["Daniel ignores Darius's decree", "Daniel prays", "Daniel in the lions den", "Daniel", "C"],
    displayAnswer: "Daniel ignores Darius's decree (~539 BC, Daniel 6)",
    explanation: "Daniel (~539 BC) preceded Jesus' baptism (~AD 26), Matthew/Levi's calling (~AD 27), and Barnabas seeking Saul (~AD 43).",
    scope: "ALL",
    genre: "Major Prophets"
  },
  {
    id: "gfc_mes_1",
    type: "book_id",
    prompt: "In which Old Testament book was it prophesied that the Messiah would be born in Bethlehem Ephrathah?",
    bookId: "MIC",
    chapterNum: 5,
    acceptedAnswers: ["Micah", "Mic"],
    displayAnswer: "Micah (Micah 5:2)",
    explanation: "Micah 5:2 foretold that out of little Bethlehem Ephrathah would come the ruler whose origin is from of old, from ancient days.",
    scope: "OT",
    genre: "Minor Prophets"
  },
  {
    id: "gfc_mes_2",
    type: "book_id",
    prompt: "In which book does the Protoevangelium promise that the seed of the woman will crush the head of the serpent?",
    bookId: "GEN",
    chapterNum: 3,
    acceptedAnswers: ["Genesis", "Gen"],
    displayAnswer: "Genesis (Genesis 3:15)",
    explanation: "Genesis 3:15 is the earliest Gospel promise of Christ's victory over Satan.",
    scope: "OT",
    genre: "Pentateuch"
  },
  {
    id: "gfc_mes_3",
    type: "book_id",
    prompt: "In which prophetic book was it foretold: 'Rejoice greatly, O daughter of Zion!... Behold, your king is coming to you; righteous and having salvation is he, humble and mounted on a donkey, on a colt, the foal of a donkey'?",
    bookId: "ZEC",
    chapterNum: 9,
    acceptedAnswers: ["Zechariah", "Zec"],
    displayAnswer: "Zechariah (Zechariah 9:9)",
    explanation: "Zechariah 9:9 was fulfilled during Jesus' triumphal entry into Jerusalem on Palm Sunday (Matthew 21:5).",
    scope: "OT",
    genre: "Minor Prophets"
  },
  {
    id: "gfc_mes_4",
    type: "book_id",
    prompt: "In which book is the virgin birth prophesied: 'Behold, the virgin shall conceive and bear a son, and shall call his name Immanuel'?",
    bookId: "ISA",
    chapterNum: 7,
    acceptedAnswers: ["Isaiah", "Isa"],
    displayAnswer: "Isaiah (Isaiah 7:14)",
    explanation: "Isaiah 7:14 is quoted in Matthew 1:22\u201323 as fulfilled in the conception and virgin birth of Jesus.",
    scope: "OT",
    genre: "Major Prophets"
  },
  {
    id: "gfc_mes_5",
    type: "book_id",
    prompt: "In which book does the Messiah proclaim: 'The Spirit of the Lord God is upon me, because the Lord has anointed me to bring good news to the poor; he has sent me to bind up the brokenhearted, to proclaim liberty to the captives...'?",
    bookId: "ISA",
    chapterNum: 61,
    acceptedAnswers: ["Isaiah", "Isa"],
    displayAnswer: "Isaiah (Isaiah 61:1\u20132)",
    explanation: "Isaiah 61:1\u20132 was read by Jesus in the Nazareth synagogue in Luke 4:18\u201319: 'Today this Scripture has been fulfilled in your hearing.'",
    scope: "OT",
    genre: "Major Prophets"
  },
  {
    id: "gfc_mes_6",
    type: "book_id",
    prompt: "In which book is the Messiah declared to be a royal priest forever: 'The Lord has sworn and will not change his mind, \"You are a priest forever after the order of Melchizedek\"'?",
    bookId: "PSA",
    chapterNum: 110,
    acceptedAnswers: ["Psalms", "Psalm", "Psalm 110", "Psalms 110", "Ps 110"],
    displayAnswer: "Psalms (Psalm 110:4)",
    explanation: "Psalm 110:4 is expounded in Hebrews 5\u20137 as the basis for Christ's eternal, Melchizedekian priesthood.",
    scope: "OT",
    genre: "Poetry/Wisdom"
  },
  {
    id: "gfc_mes_7",
    type: "book_id",
    prompt: "In which book does the prophetic declaration appear: 'The stone that the builders rejected has become the cornerstone'?",
    bookId: "PSA",
    chapterNum: 118,
    acceptedAnswers: ["Psalms", "Psalm", "Psalm 118", "Psalms 118", "Ps 118"],
    displayAnswer: "Psalms (Psalm 118:22)",
    explanation: "Psalm 118:22 was cited by Jesus (Matthew 21:42) and Peter (1 Peter 2:7, Acts 4:11) regarding Christ's rejection and supreme exaltation.",
    scope: "OT",
    genre: "Poetry/Wisdom"
  },
  {
    id: "gfc_mes_8",
    type: "book_id",
    prompt: "In which book was it foretold regarding the Messiah's crucifixion: 'they divide my garments among them, and for my clothing they cast lots'?",
    bookId: "PSA",
    chapterNum: 22,
    acceptedAnswers: ["Psalms", "Psalm", "Psalm 22", "Psalms 22", "Ps 22"],
    displayAnswer: "Psalms (Psalm 22:18)",
    explanation: "Psalm 22:18 was literally fulfilled at the foot of the cross by the Roman soldiers in John 19:24.",
    scope: "OT",
    genre: "Poetry/Wisdom"
  },
  {
    id: "gfc_mes_9",
    type: "book_id",
    prompt: "In which book was it prophesied regarding the Messiah's burial: 'And they made his grave with the wicked and with a rich man in his death, although he had done no violence...'?",
    bookId: "ISA",
    chapterNum: 53,
    acceptedAnswers: ["Isaiah", "Isa"],
    displayAnswer: "Isaiah (Isaiah 53:9)",
    explanation: "Isaiah 53:9 was fulfilled when Joseph of Arimathea, a wealthy council member, buried Jesus in his own new tomb (Matthew 27:57\u201360).",
    scope: "OT",
    genre: "Major Prophets"
  },
  {
    id: "gfc_mes_10",
    type: "book_id",
    prompt: "In which prophetic book was it foretold: 'Behold, I will send you Elijah the prophet before the great and awesome day of the Lord comes'?",
    bookId: "MAL",
    chapterNum: 4,
    acceptedAnswers: ["Malachi", "Mal"],
    displayAnswer: "Malachi (Malachi 4:5)",
    explanation: "Malachi 4:5 was the final Old Testament prophecy, fulfilled in John the Baptist coming in the spirit and power of Elijah (Matthew 11:14, Luke 1:17).",
    scope: "OT",
    genre: "Minor Prophets"
  },
];

// --------------------------------------------------------------------------
// DEDICATED GFC 100-QUESTION TEST PRESET BANK
// --------------------------------------------------------------------------
export const GFC_TEST_100_BANK = CURATED_QUESTION_BANK.filter(q => q.id.startsWith("gfc_"));


// --------------------------------------------------------------------------
// DYNAMIC QUESTION GENERATOR (Specific Details & Concrete Narrative Focus)
// --------------------------------------------------------------------------

export function generateDynamicQuestions({ scope = "ALL", count = 25, questionTypes = null, specificBookId = null }) {
  if (scope === "GFC") {
    const pool = CURATED_QUESTION_BANK.filter((q) => q.id.startsWith("gfc_"));
    return count >= pool.length ? pool : pool.slice(0, count);
  }

  // Filter curated pool according to scope and question types
  const pool = CURATED_QUESTION_BANK.filter((q) => {
    if (specificBookId && q.bookId !== specificBookId) return false;
    if (scope === "OT" && q.scope !== "OT") return false;
    if (scope === "NT" && q.scope !== "NT") return false;
    if (scope === "GOSPELS" && q.genre !== "Gospels") return false;
    if (scope === "EPISTLES" && !["Pauline Epistles", "General Epistles"].includes(q.genre)) return false;
    if (scope === "PENTATEUCH" && q.genre !== "Pentateuch") return false;
    if (scope === "HISTORICAL" && q.genre !== "Historical") return false;
    if (scope === "PROPHETS" && !["Major Prophets", "Minor Prophets"].includes(q.genre)) return false;
    if (scope === "WISDOM" && !["Poetry/Wisdom", "Wisdom & Poetry"].includes(q.genre)) return false;
    if (questionTypes && questionTypes.length > 0 && !questionTypes.includes(q.type)) return false;
    return true;
  });

  // Shuffle and deduplicate
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const seenPrompts = new Set();
  const result = [];

  for (const q of shuffled) {
    const pKey = cleanText(q.prompt);
    if (!seenPrompts.has(pKey)) {
      seenPrompts.add(pKey);
      result.push(q);
    }
    if (result.length >= count) break;
  }

  return result;
}

// --------------------------------------------------------------------------
// DIAGNOSTIC SESSION STATE & SCORING MANAGER
// --------------------------------------------------------------------------

export class DiagnosticSession {
  constructor({ scope = "ALL", questionCount = 25, questionTypes = null, specificBookId = null, customQuestions = null }) {
    this.id = `diag_${Date.now()}`;
    this.scope = scope;
    this.questionCount = customQuestions && customQuestions.length > 0 ? customQuestions.length : questionCount;
    this.questionTypes = questionTypes;
    this.specificBookId = specificBookId;
    this.startTime = Date.now();
    this.endTime = null;
    this.currentIndex = 0;
    this.answers = {}; // qId -> { userInput, isCorrect, answeredAt }
    this.questions =
      customQuestions && customQuestions.length > 0
        ? [...customQuestions]
        : generateDynamicQuestions({
            scope,
            count: questionCount,
            questionTypes,
            specificBookId
          });
    this.status = "in-progress"; // "in-progress" | "completed"
  }

  getCurrentQuestion() {
    return this.questions[this.currentIndex] || null;
  }

  submitCurrentAnswer(userInput) {
    const q = this.getCurrentQuestion();
    if (!q) return null;

    const evalResult = evaluateAnswer(q, userInput);
    this.answers[q.id] = {
      userInput: userInput || "",
      isCorrect: evalResult.isCorrect,
      answeredAt: Date.now()
    };
    return evalResult;
  }

  nextQuestion() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      return true;
    }
    return false;
  }

  prevQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return true;
    }
    return false;
  }

  jumpToQuestion(idx) {
    if (idx >= 0 && idx < this.questions.length) {
      this.currentIndex = idx;
      return true;
    }
    return false;
  }

  finishExam() {
    this.status = "completed";
    this.endTime = Date.now();
    return this.generateScorecard();
  }

  generateScorecard() {
    let totalCorrect = 0;
    const byTestament = { OT: { correct: 0, total: 0 }, NT: { correct: 0, total: 0 } };
    const byGenre = {};
    const byBook = {};
    const weakBooks = [];
    const missedQuestions = [];
    const allReviewedQuestions = [];

    this.questions.forEach((q) => {
      const ans = this.answers[q.id];
      const isCorrect = ans ? ans.isCorrect : false;

      if (isCorrect) totalCorrect++;

      // Testament
      if (q.scope && byTestament[q.scope]) {
        byTestament[q.scope].total++;
        if (isCorrect) byTestament[q.scope].correct++;
      }

      // Genre
      if (q.genre) {
        if (!byGenre[q.genre]) byGenre[q.genre] = { correct: 0, total: 0 };
        byGenre[q.genre].total++;
        if (isCorrect) byGenre[q.genre].correct++;
      }

      // Book
      if (q.bookId) {
        if (!byBook[q.bookId]) byBook[q.bookId] = { correct: 0, total: 0, book: getBookById(q.bookId) };
        byBook[q.bookId].total++;
        if (isCorrect) byBook[q.bookId].correct++;
      }

      const qReview = {
        question: q,
        isCorrect,
        userAnswer: ans ? ans.userInput : "(Skipped)",
        correctAnswer: q.displayAnswer,
        explanation: q.explanation
      };

      allReviewedQuestions.push(qReview);

      if (!isCorrect) {
        missedQuestions.push(qReview);
      }
    });

    // Identify weak books (<70% accuracy and at least 1 mistake)
    for (const [bId, stats] of Object.entries(byBook)) {
      const pct = Math.round((stats.correct / stats.total) * 100);
      if (pct < 70 || stats.correct < stats.total) {
        weakBooks.push({
          bookId: bId,
          bookName: stats.book ? stats.book.name : bId,
          correct: stats.correct,
          total: stats.total,
          pct
        });
      }
    }

    // Sort weak books by worst percentage
    weakBooks.sort((a, b) => a.pct - b.pct);

    const totalQuestions = this.questions.length;
    const overallPct = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

    return {
      totalQuestions,
      totalCorrect,
      overallPct,
      durationMs: (this.endTime || Date.now()) - this.startTime,
      byTestament,
      byGenre,
      byBook,
      weakBooks,
      missedQuestions,
      allReviewedQuestions
    };
  }
}
