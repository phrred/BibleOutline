// --- FILE: data/bible_catalog.js ---
// Comprehensive Bible Outline & Overarching Plot Reference Data
// Contains all 66 books, 1,189 chapters, 8 overarching Biblical Eras, and historical context

const BIBLE_ERAS = [
  {
    id: "act1",
    title: "1. Creation & Fall",
    subtitle: "In the Beginning — Genesis 1–11",
    timeframe: "Primeval History",
    summary: "God creates the cosmos, earth, and humanity in His image to steward creation in harmony with Him. Humanity's rebellion in the Garden of Eden introduces sin, alienation, mortality, and broken relationships across creation. Yet, God promises a future Seed who will crush the serpent's head.",
    keyTurningPoints: [
      "Creation of heaven, earth, and image-bearers (Gen 1–2)",
      "The Fall & First Gospel / Protoevangelium promise (Gen 3)",
      "Cain & Abel / Spread of corruption (Gen 4–6)",
      "The Flood and Noahic Covenant (Gen 6–9)",
      "Tower of Babel & dispersion of nations (Gen 11)"
    ],
    bookIds: ["GEN"]
  },
  {
    id: "act2",
    title: "2. Covenant & Patriarchs",
    subtitle: "The Chosen Family — Genesis 12–50 & Job",
    timeframe: "c. 2100 – 1800 BC",
    summary: "God initiates His rescue plan for all nations by calling Abraham out of Ur and cutting an unconditional covenant to give him descendants, land, and global blessing. Through Isaac, Jacob (renamed Israel), and Joseph, God preserves His people through famine and relocates them to Egypt.",
    keyTurningPoints: [
      "The Abrahamic Covenant & Call (Gen 12, 15, 17)",
      "Binding of Isaac / Test of Faith (Gen 22)",
      "Jacob wrestling with God & the 12 Patriarchs (Gen 28, 32)",
      "Joseph sold into slavery and exalted in Egypt to save nations (Gen 37–50)",
      "Job's suffering, wisdom, and encounter with the Creator (Job)"
    ],
    bookIds: ["GEN", "JOB"]
  },
  {
    id: "act3",
    title: "3. Exodus, Law & Promised Land",
    subtitle: "Redemption, Torah & Conquest — Exodus–Ruth",
    timeframe: "c. 1526 – 1050 BC",
    summary: "After 400 years of oppression in Egypt, God raises up Moses to deliver Israel via the Passover and Red Sea. At Mount Sinai, God establishes the Mosaic Covenant, Tabernacle worship, and holiness laws. Led by Joshua, Israel inherits the Promised Land, followed by the turbulent era of the Judges.",
    keyTurningPoints: [
      "The Burning Bush, Ten Plagues & First Passover (Exo 1–13)",
      "Crossing the Red Sea & Giving of the Torah at Sinai (Exo 14–24)",
      "Tabernacle presence & Levitical sacrificial system (Exo 25–Lev 27)",
      "Wilderness wandering & second generation covenant (Num–Deut)",
      "Conquest of Canaan under Joshua & cycle of Judges/Redeemers (Josh–Ruth)"
    ],
    bookIds: ["EXO", "LEV", "NUM", "DEU", "JOS", "JDG", "RUT"]
  },
  {
    id: "act4",
    title: "4. Monarchy & Wisdom",
    subtitle: "Kings, Temple & Poetic Literature — 1 Sam–2 Chron, Psalms–Song of Solomon",
    timeframe: "c. 1050 – 931 BC (United) / 931 – 586 BC (Divided)",
    summary: "Israel transitions from judges to a monarchy under Saul, David, and Solomon. God cuts the Davidic Covenant, promising an eternal throne. Solomon builds the First Temple in Jerusalem and sponsors Israel's Golden Age of Poetic & Wisdom literature, before civil war splits the kingdom into Israel (North) and Judah (South).",
    keyTurningPoints: [
      "Samuel anoints David & Davidic Covenant promised (1 Sam 16, 2 Sam 7)",
      "Solomon dedicates the Temple in Jerusalem (1 Kings 8 / 2 Chron 5–7)",
      "The Psalter: Prayers, laments, and worship songs across Israel's history",
      "Wisdom literature: Proverbs, Ecclesiastes, and Song of Solomon",
      "Division of Kingdom (931 BC) into Idolatrous North (Israel) & Judah (South)"
    ],
    bookIds: ["1SA", "2SA", "1KI", "2KI", "1CH", "2CH", "PSA", "PRO", "ECC", "SNG"]
  },
  {
    id: "act5",
    title: "5. Prophets, Exile & Return",
    subtitle: "Warning, Captivity & Restoration — Prophets & Ezra–Esther",
    timeframe: "c. 800 – 400 BC",
    summary: "God sends Major and Minor Prophets to warn kings and people to repent of idolatry and injustice while prophesying a New Covenant. Northern Israel falls to Assyria (722 BC) and Southern Judah falls to Babylon (586 BC), destroying the Temple. After 70 years, a remnant returns under Ezra and Nehemiah to rebuild.",
    keyTurningPoints: [
      "Prophetic warnings & New Covenant promises (Isaiah, Jeremiah, Ezekiel)",
      "Fall of Jerusalem & Babylonian Exile (586 BC; Lamentations, Daniel)",
      "Cyrus's Decree & Rebuilding the Second Temple (Ezra, Haggai, Zechariah)",
      "Esther's deliverance of the Jews in Persia (Esther)",
      "Nehemiah rebuilds Jerusalem's walls & Malachi closes the OT era (Neh, Mal)"
    ],
    bookIds: [
      "ISA", "JER", "LAM", "EZE", "DAN",
      "HOS", "JOE", "AMO", "OBA", "JON", "MIC", "NAH", "HAB", "ZEP", "HAG", "ZEC", "MAL",
      "EZR", "NEH", "EST"
    ]
  },
  {
    id: "act6",
    title: "6. Messiah & The Gospels",
    subtitle: "The King Incarnate — Matthew, Mark, Luke, John",
    timeframe: "c. 5 BC – AD 30",
    summary: "After 400 years of intertestamental silence, God Himself arrives in the flesh. Jesus of Nazareth fulfills all Old Testament types, prophecies, and covenants. He inaugurates the Kingdom of God, preaches grace and truth, dies on the cross as the substitutionary sacrifice for sin, and rises bodily on the third day.",
    keyTurningPoints: [
      "Incarnation, Virgin Birth & Baptism by John the Baptist",
      "Sermon on the Mount & Parables of the Kingdom",
      "Signs, Miracles & Transfiguration revealing Christ's deity",
      "Crucifixion, Atonement for sin & Rending of the Temple veil",
      "Bodily Resurrection & The Great Commission"
    ],
    bookIds: ["MAT", "MRK", "LUK", "JHN"]
  },
  {
    id: "act7",
    title: "7. Church, Mission & Epistles",
    subtitle: "Spirit, Spread of the Gospel & Church Life — Acts–Jude",
    timeframe: "AD 30 – AD 95",
    summary: "The risen Christ sends the Holy Spirit at Pentecost, empowering apostles and disciples to bear witness from Jerusalem to Judea, Samaria, and the ends of the earth. Paul and other apostles write inspired pastoral and theological epistles to ground local churches in faith, unity, ethics, and suffering.",
    keyTurningPoints: [
      "Pentecost & birth of the Spirit-empowered Church (Acts 2)",
      "Conversion of Saul (Paul) & Missionary Journeys to the Gentile world",
      "Jerusalem Council affirming salvation by grace alone through faith (Acts 15)",
      "Pauline Epistles (Romans to Philemon) expounding gospel justification & living",
      "General Epistles (Hebrews to Jude) encouraging perseverance under trial"
    ],
    bookIds: [
      "ACT", "ROM", "1CO", "2CO", "GAL", "EPH", "PHP", "COL",
      "1TH", "2TH", "1TI", "2TI", "TIT", "PHM",
      "HEB", "JAS", "1PE", "2PE", "1JN", "2JN", "3JN", "JUD"
    ]
  },
  {
    id: "act8",
    title: "8. New Creation & Consummation",
    subtitle: "The Return of the King — Revelation",
    timeframe: "Consummation of History",
    summary: "John's apocalyptic vision on Patmos unveils the exalted Christ who holds the scroll of history. Through vivid symbolic visions of cosmic conflict, judgment of evil, and the defeat of Satan and Babylon, the narrative climaxes in the Return of Christ, the Last Judgment, and the New Jerusalem descending to earth.",
    keyTurningPoints: [
      "Letters to the Seven Churches of Asia Minor (Rev 2–3)",
      "The Lamb slain standing before the Throne (Rev 4–5)",
      "Seven Seals, Trumpets, and Bowls of Judgment (Rev 6–18)",
      "Return of the Rider on the White Horse & Final Defeat of Evil (Rev 19–20)",
      "New Heaven, New Earth & Tree of Life restored (Rev 21–22)"
    ],
    bookIds: ["REV"]
  }
];

const BIBLE_GENRES = [
  { id: "Pentateuch", name: "Pentateuch (Torah / Law)", color: "bg-amber-500/10 text-amber-700 border-amber-300" },
  { id: "Historical", name: "Historical Books", color: "bg-blue-500/10 text-blue-700 border-blue-300" },
  { id: "Wisdom & Poetry", name: "Wisdom & Poetry", color: "bg-emerald-500/10 text-emerald-700 border-emerald-300" },
  { id: "Major Prophets", name: "Major Prophets", color: "bg-purple-500/10 text-purple-700 border-purple-300" },
  { id: "Minor Prophets", name: "Minor Prophets", color: "bg-indigo-500/10 text-indigo-700 border-indigo-300" },
  { id: "Gospels", name: "Gospels", color: "bg-rose-500/10 text-rose-700 border-rose-300" },
  { id: "Acts (History)", name: "Acts (Early Church)", color: "bg-cyan-500/10 text-cyan-700 border-cyan-300" },
  { id: "Pauline Epistles", name: "Pauline Epistles", color: "bg-sky-500/10 text-sky-700 border-sky-300" },
  { id: "General Epistles", name: "General Epistles", color: "bg-teal-500/10 text-teal-700 border-teal-300" },
  { id: "Apocalyptic", name: "Apocalyptic", color: "bg-violet-500/10 text-violet-700 border-violet-300" }
];

const BIBLE_BOOKS = [
  // OLD TESTAMENT (39)
  {
    id: "GEN",
    name: "Genesis",
    shortName: "Gen",
    testament: "OT",
    category: "Pentateuch",
    eraId: "act1", // Genesis covers Act 1 (1-11) and Act 2 (12-50)
    chapterCount: 50,
    author: "Moses",
    date: "c. 1445 – 1405 BC",
    keyTheme: "Creation, Fall, Covenant & God's Sovereignty",
    context: "Book of Beginnings: Records the creation of the universe, the entrance of sin, the global flood, and the foundational lives of Abraham, Isaac, Jacob, and Joseph as God chooses a covenant family."
  },
  {
    id: "EXO",
    name: "Exodus",
    shortName: "Exo",
    testament: "OT",
    category: "Pentateuch",
    eraId: "act3",
    chapterCount: 40,
    author: "Moses",
    date: "c. 1445 – 1405 BC",
    keyTheme: "Redemption, Passover & The Mosaic Covenant",
    context: "Details Israel's miraculous deliverance from slavery in Egypt via the Ten Plagues and Passover, the giving of the Ten Commandments at Sinai, and the construction of the Tabernacle."
  },
  {
    id: "LEV",
    name: "Leviticus",
    shortName: "Lev",
    testament: "OT",
    category: "Pentateuch",
    eraId: "act3",
    chapterCount: 27,
    author: "Moses",
    date: "c. 1445 – 1405 BC",
    keyTheme: "Holiness, Sacrifice & Atonement",
    context: "Provides God's manual for worship, priesthood, purity, and the Day of Atonement (Yom Kippur), revealing how a sinful people can dwell in the presence of a holy God."
  },
  {
    id: "NUM",
    name: "Numbers",
    shortName: "Num",
    testament: "OT",
    category: "Pentateuch",
    eraId: "act3",
    chapterCount: 36,
    author: "Moses",
    date: "c. 1405 BC",
    keyTheme: "Wilderness Wanderings & God's Faithfulness",
    context: "Chronicles the 38-year wilderness journey of Israel from Sinai to the plains of Moab, contrasting human grumbling and unbelief with God's steadfast discipline and provision."
  },
  {
    id: "DEU",
    name: "Deuteronomy",
    shortName: "Deu",
    testament: "OT",
    category: "Pentateuch",
    eraId: "act3",
    chapterCount: 34,
    author: "Moses",
    date: "c. 1405 BC",
    keyTheme: "Second Law: Covenant Renewal & Wholehearted Love",
    context: "Moses' farewell farewell sermons on the border of Canaan, calling the new generation to love the Lord with heart, soul, and might before entering the Promised Land."
  },
  {
    id: "JOS",
    name: "Joshua",
    shortName: "Josh",
    testament: "OT",
    category: "Historical",
    eraId: "act3",
    chapterCount: 24,
    author: "Joshua",
    date: "c. 1375 BC",
    keyTheme: "Conquest & Inheritance of the Promised Land",
    context: "Records the crossing of the Jordan, the fall of Jericho, the military conquest of Canaan, and the distribution of tribal inheritances under Joshua's faithful leadership."
  },
  {
    id: "JDG",
    name: "Judges",
    shortName: "Judg",
    testament: "OT",
    category: "Historical",
    eraId: "act3",
    chapterCount: 21,
    author: "Samuel (Traditional)",
    date: "c. 1045 BC",
    keyTheme: "Moral Decline & God's Patient Deliverance",
    context: "A dark period of moral anarchy ('everyone did what was right in their own eyes') marked by repeated cycles of rebellion, oppression, repentance, and rescue via military judges."
  },
  {
    id: "RUT",
    name: "Ruth",
    shortName: "Ruth",
    testament: "OT",
    category: "Historical",
    eraId: "act3",
    chapterCount: 4,
    author: "Unknown (Traditional: Samuel)",
    date: "c. 1000 BC",
    keyTheme: "Kinsman-Redeemer, Hesed (Loyal Love) & David's Lineage",
    context: "A ray of light during the era of the Judges: the story of a Moabite widow who clings to Naomi's God and is redeemed by Boaz, becoming the great-grandmother of King David."
  },
  {
    id: "1SA",
    name: "1 Samuel",
    shortName: "1 Sam",
    testament: "OT",
    category: "Historical",
    eraId: "act4",
    chapterCount: 31,
    author: "Unknown",
    date: "c. 930 BC",
    keyTheme: "Transition to Monarchy: Rise & Fall of King Saul",
    context: "Chronicles the life of the prophet Samuel, the coronation of Israel's first king Saul, Saul's tragic disobedience, and the rise of young David after slaying Goliath."
  },
  {
    id: "2SA",
    name: "2 Samuel",
    shortName: "2 Sam",
    testament: "OT",
    category: "Historical",
    eraId: "act4",
    chapterCount: 24,
    author: "Unknown",
    date: "c. 930 BC",
    keyTheme: "David's Reign & The Eternal Davidic Covenant",
    context: "Focuses on King David's golden reign over Jerusalem, God's promise of an everlasting throne (2 Sam 7), David's grievous sin with Bathsheba, and its agonizing family consequences."
  },
  {
    id: "1KI",
    name: "1 Kings",
    shortName: "1 Kings",
    testament: "OT",
    category: "Historical",
    eraId: "act4",
    chapterCount: 22,
    author: "Jeremiah (Traditional)",
    date: "c. 550 BC",
    keyTheme: "Solomon's Temple & Division of the Kingdom",
    context: "Covers Solomon's wisdom and glory, the construction of the First Temple, his fall to idolatry, the split of Israel into North and South (931 BC), and Elijah's confrontation with Baal."
  },
  {
    id: "2KI",
    name: "2 Kings",
    shortName: "2 Kings",
    testament: "OT",
    category: "Historical",
    eraId: "act4",
    chapterCount: 25,
    author: "Jeremiah (Traditional)",
    date: "c. 550 BC",
    keyTheme: "Decline, Idolatry & Exile of Both Kingdoms",
    context: "Traces Elisha's ministry and the moral collapse of both kingdoms, culminating in Assyria conquering Northern Israel (722 BC) and Babylon conquering Southern Judah (586 BC)."
  },
  {
    id: "1CH",
    name: "1 Chronicles",
    shortName: "1 Chron",
    testament: "OT",
    category: "Historical",
    eraId: "act4",
    chapterCount: 29,
    author: "Ezra (Traditional)",
    date: "c. 450 BC",
    keyTheme: "Priestly Perspective on David & Worship Restored",
    context: "Written post-exile to remind returning exiles of their spiritual heritage, genealogies, David's organization of Levites, and preparation for the Temple."
  },
  {
    id: "2CH",
    name: "2 Chronicles",
    shortName: "2 Chron",
    testament: "OT",
    category: "Historical",
    eraId: "act4",
    chapterCount: 36,
    author: "Ezra (Traditional)",
    date: "c. 450 BC",
    keyTheme: "Kings of Judah, Reformers & The Decree of Cyrus",
    context: "Focuses on Solomon and the kings of Judah—highlighting revivals under Jehoshaphat, Hezekiah, and Josiah—ending with the destruction of Jerusalem and Cyrus's decree to return."
  },
  {
    id: "EZR",
    name: "Ezra",
    shortName: "Ezra",
    testament: "OT",
    category: "Historical",
    eraId: "act5",
    chapterCount: 10,
    author: "Ezra",
    date: "c. 440 BC",
    keyTheme: "Return from Exile & Rebuilding the Altar & Temple",
    context: "Records two waves of exiles returning from Babylon: first under Zerubbabel to rebuild the Temple, and later under Ezra the scribe to restore spiritual instruction and holiness."
  },
  {
    id: "NEH",
    name: "Nehemiah",
    shortName: "Neh",
    testament: "OT",
    category: "Historical",
    eraId: "act5",
    chapterCount: 13,
    author: "Nehemiah",
    date: "c. 430 BC",
    keyTheme: "Rebuilding Jerusalem's Walls & Covenant Renewal",
    context: "The cupbearer to Persian King Artaxerxes leads the effort to rebuild Jerusalem's ruined walls in 52 days amidst opposition, partnering with Ezra for covenant renewal."
  },
  {
    id: "EST",
    name: "Esther",
    shortName: "Esth",
    testament: "OT",
    category: "Historical",
    eraId: "act5",
    chapterCount: 10,
    author: "Unknown",
    date: "c. 470 BC",
    keyTheme: "God's Invisible Providence Preserving His People",
    context: "Set in Persia during the exile; though God's name is not explicitly mentioned, His providence orchestrates Esther's rise to queen to thwart Haman's plot to annihilate the Jews."
  },
  {
    id: "JOB",
    name: "Job",
    shortName: "Job",
    testament: "OT",
    category: "Wisdom & Poetry",
    eraId: "act2",
    chapterCount: 42,
    author: "Unknown",
    date: "Patriarchal Era",
    keyTheme: "The Sovereignty of God & Righteous Suffering",
    context: "Examines innocent suffering through Job's severe trials, dialogues with friends, and God's awe-inspiring whirlwind speech demonstrating His unfathomable wisdom."
  },
  {
    id: "PSA",
    name: "Psalms",
    shortName: "Ps",
    testament: "OT",
    category: "Wisdom & Poetry",
    eraId: "act4",
    chapterCount: 150,
    author: "David, Asaph, Sons of Korah, Moses & Others",
    date: "c. 1400 – 450 BC",
    keyTheme: "Worship, Prayer, Lament & Messianic Hope",
    context: "The hymnbook and prayerbook of Israel across 5 books, giving voice to every human emotion before God—praise, confession, sorrow, thanksgiving, and yearning for the King."
  },
  {
    id: "PRO",
    name: "Proverbs",
    shortName: "Prov",
    testament: "OT",
    category: "Wisdom & Poetry",
    eraId: "act4",
    chapterCount: 31,
    author: "Solomon, Agur, Lemuel",
    date: "c. 950 BC",
    keyTheme: "The Fear of the Lord is the Beginning of Wisdom",
    context: "Practical, pithy wisdom for everyday life—contrasting the path of Lady Wisdom with Folly in speech, work, relationships, integrity, and humility."
  },
  {
    id: "ECC",
    name: "Ecclesiastes",
    shortName: "Eccl",
    testament: "OT",
    category: "Wisdom & Poetry",
    eraId: "act4",
    chapterCount: 12,
    author: "Solomon (The Preacher / Qoheleth)",
    date: "c. 935 BC",
    keyTheme: "Meaning Under the Sun vs. Fearing God",
    context: "An unvarnished philosophical investigation showing that life lived solely 'under the sun' apart from God is Hevel (vapor), concluding: Fear God and keep His commandments."
  },
  {
    id: "SNG",
    name: "Song of Solomon",
    shortName: "Song",
    testament: "OT",
    category: "Wisdom & Poetry",
    eraId: "act4",
    chapterCount: 8,
    author: "Solomon",
    date: "c. 960 BC",
    keyTheme: "Celebration of Covenant Love & Intimacy",
    context: "A poetic dialogue celebrating the beauty, devotion, and exclusive intimacy of marital love, echoing the allegorical passion of God for His covenant people."
  },
  {
    id: "ISA",
    name: "Isaiah",
    shortName: "Isa",
    testament: "OT",
    category: "Major Prophets",
    eraId: "act5",
    chapterCount: 66,
    author: "Isaiah",
    date: "c. 740 – 680 BC",
    keyTheme: "Judgment, Comfort & The Suffering Servant",
    context: "Often called the Fifth Gospel: warns Judah of exile, then shifts to soaring prophecies of comfort, the Suffering Servant (Isa 53) who heals by His stripes, and New Heavens & Earth."
  },
  {
    id: "JER",
    name: "Jeremiah",
    shortName: "Jer",
    testament: "OT",
    category: "Major Prophets",
    eraId: "act5",
    chapterCount: 52,
    author: "Jeremiah",
    date: "c. 627 – 580 BC",
    keyTheme: "The Weeping Prophet & The Promise of the New Covenant",
    context: "Preaches during Jerusalem's final agonies before the Babylonians arrive, calling for surrender while prophesying a 70-year captivity and a New Covenant written on the heart (Jer 31)."
  },
  {
    id: "LAM",
    name: "Lamentations",
    shortName: "Lam",
    testament: "OT",
    category: "Major Prophets",
    eraId: "act5",
    chapterCount: 5,
    author: "Jeremiah",
    date: "c. 586 BC",
    keyTheme: "Grief Over Jerusalem's Fall & Great is Thy Faithfulness",
    context: "Five deeply structured acrostic dirges mourning the burning of Jerusalem in 586 BC, yet anchoring hope in the mercies of the Lord that are new every morning (Lam 3:22-24)."
  },
  {
    id: "EZE",
    name: "Ezekiel",
    shortName: "Ezek",
    testament: "OT",
    category: "Major Prophets",
    eraId: "act5",
    chapterCount: 48,
    author: "Ezekiel",
    date: "c. 593 – 571 BC",
    keyTheme: "Glory Departing & Returning; Dry Bones Living",
    context: "Prophesying from exile by the Chebar river with dramatic sign-acts; sees the glory of God leave the Temple, prophesies a new heart of flesh, the Valley of Dry Bones (Ezek 37), and a restored Temple."
  },
  {
    id: "DAN",
    name: "Daniel",
    shortName: "Dan",
    testament: "OT",
    category: "Major Prophets",
    eraId: "act5",
    chapterCount: 12,
    author: "Daniel",
    date: "c. 605 – 536 BC",
    keyTheme: "God's Kingdom Outlasts Every Earthly Empire",
    context: "Combines court narrative of Hebrew youths standing faithful in Babylon (fiery furnace, lions' den) with apocalyptic visions of world empires and the Son of Man given eternal dominion."
  },
  {
    id: "HOS",
    name: "Hosea",
    shortName: "Hos",
    testament: "OT",
    category: "Minor Prophets",
    eraId: "act5",
    chapterCount: 14,
    author: "Hosea",
    date: "c. 750 – 715 BC",
    keyTheme: "God's Relentless Love for Unfaithful Israel",
    context: "God commands Hosea to marry Gomer to dramatize Israel's spiritual adultery with Baals, revealing the heartbreaking tenderness and redeeming grace of God."
  },
  {
    id: "JOE",
    name: "Joel",
    shortName: "Joel",
    testament: "OT",
    category: "Minor Prophets",
    eraId: "act5",
    chapterCount: 3,
    author: "Joel",
    date: "c. 835 or 500 BC",
    keyTheme: "The Day of the Lord & Outpouring of the Spirit",
    context: "Interprets a devastating locust plague as a warning of the great and dreadful Day of the Lord, calling for fasting and foretelling the outpouring of the Holy Spirit on all flesh."
  },
  {
    id: "AMO",
    name: "Amos",
    shortName: "Amos",
    testament: "OT",
    category: "Minor Prophets",
    eraId: "act5",
    chapterCount: 9,
    author: "Amos",
    date: "c. 760 BC",
    keyTheme: "Social Justice, Righteousness & The Plumb Line",
    context: "A shepherd from Tekoa sent North to denounce hypocritical worship paired with mistreatment of the poor ('let justice roll down like waters'), closing with restoration of David's booth."
  },
  {
    id: "OBA",
    name: "Obadiah",
    shortName: "Obad",
    testament: "OT",
    category: "Minor Prophets",
    eraId: "act5",
    chapterCount: 1,
    author: "Obadiah",
    date: "c. 586 BC",
    keyTheme: "Judgment on Edom for Gloating Over Jacob",
    context: "The shortest book in the Old Testament: pronounces doom on the proud nation of Edom (descendants of Esau) for plundering and gloating over Jerusalem's destruction."
  },
  {
    id: "JON",
    name: "Jonah",
    shortName: "Jonah",
    testament: "OT",
    category: "Minor Prophets",
    eraId: "act5",
    chapterCount: 4,
    author: "Jonah",
    date: "c. 760 BC",
    keyTheme: "God's Compassion Extends Even to Israel's Enemies",
    context: "The reluctant prophet swallowed by a great fish who preaches repentance to Nineveh, exposing Jonah's narrow prejudice against God's extravagant mercy for Gentiles."
  },
  {
    id: "MIC",
    name: "Micah",
    shortName: "Mic",
    testament: "OT",
    category: "Minor Prophets",
    eraId: "act5",
    chapterCount: 7,
    author: "Micah",
    date: "c. 735 – 700 BC",
    keyTheme: "Do Justice, Love Mercy, Walk Humbly & Bethlehem Messiah",
    context: "Indicts corrupt leaders and false prophets, prophesying the Messiah's birth in Bethlehem (Mic 5:2) and calling God's people to justice, kindness, and humility."
  },
  {
    id: "NAH",
    name: "Nahum",
    shortName: "Nah",
    testament: "OT",
    category: "Minor Prophets",
    eraId: "act5",
    chapterCount: 3,
    author: "Nahum",
    date: "c. 650 BC",
    keyTheme: "God's Vengeance & Downfall of Nineveh",
    context: "A century after Jonah, Nineveh returns to extreme cruelty; Nahum declares God's righteous verdict that Assyria's capital will fall and never rise again."
  },
  {
    id: "HAB",
    name: "Habakkuk",
    shortName: "Hab",
    testament: "OT",
    category: "Minor Prophets",
    eraId: "act5",
    chapterCount: 3,
    author: "Habakkuk",
    date: "c. 607 BC",
    keyTheme: "From Questioning to Faith: The Righteous Shall Live by Faith",
    context: "A dialogue between the prophet and God: Habakkuk wrestles with why God permits injustice and raises up Babylon, culminating in trust even if the fig tree does not blossom."
  },
  {
    id: "ZEP",
    name: "Zephaniah",
    shortName: "Zeph",
    testament: "OT",
    category: "Minor Prophets",
    eraId: "act5",
    chapterCount: 3,
    author: "Zephaniah",
    date: "c. 630 BC",
    keyTheme: "The Global Day of the Lord & The Singing Warrior",
    context: "Warns of universal judgment on idolaters across nations, ending with the breathtaking promise that God will rejoice over His humble remnant with loud singing."
  },
  {
    id: "HAG",
    name: "Haggai",
    shortName: "Hag",
    testament: "OT",
    category: "Minor Prophets",
    eraId: "act5",
    chapterCount: 2,
    author: "Haggai",
    date: "520 BC",
    keyTheme: "Consider Your Ways & Rebuild the House of God",
    context: "Exhorts returning exiles who stopped working on the Temple to live in paneled houses to put God first, promising the glory of the second house will surpass the first."
  },
  {
    id: "ZEC",
    name: "Zechariah",
    shortName: "Zech",
    testament: "OT",
    category: "Minor Prophets",
    eraId: "act5",
    chapterCount: 14,
    author: "Zechariah",
    date: "520 – 480 BC",
    keyTheme: "Night Visions, The Triumphal Entry & Pierced Shepherd",
    context: "Rich in messianic imagery: eight night visions encouraging Temple builders, foretelling the King riding on a donkey (Zech 9:9), 30 pieces of silver, and looking upon Him whom they pierced."
  },
  {
    id: "MAL",
    name: "Malachi",
    shortName: "Mal",
    testament: "OT",
    category: "Minor Prophets",
    eraId: "act5",
    chapterCount: 4,
    author: "Malachi",
    date: "c. 430 BC",
    keyTheme: "Authentic Worship & Anticipation of Elijah",
    context: "Confronts spiritual apathy, lame offerings, and broken marriages, closing the Old Testament with the promise of the Sun of Righteousness and the forerunner like Elijah."
  },

  // NEW TESTAMENT (27)
  {
    id: "MAT",
    name: "Matthew",
    shortName: "Matt",
    testament: "NT",
    category: "Gospels",
    eraId: "act6",
    chapterCount: 28,
    author: "Matthew (Levi)",
    date: "c. AD 60",
    keyTheme: "Jesus the Messianic King Fulfilling Scripture",
    context: "Written especially to Jewish readers; structures Jesus' ministry around five major discourses (starting with the Sermon on the Mount) proving He is the promised Son of David."
  },
  {
    id: "MRK",
    name: "Mark",
    shortName: "Mark",
    testament: "NT",
    category: "Gospels",
    eraId: "act6",
    chapterCount: 16,
    author: "John Mark (Peter's Memoirs)",
    date: "c. AD 55",
    keyTheme: "Jesus the Suffering Servant in Action",
    context: "Fast-paced, action-oriented Gospel ('immediately') showing Jesus' authoritative deeds of power, His identity as Son of God, and His sacrificial ransom on the cross."
  },
  {
    id: "LUK",
    name: "Luke",
    shortName: "Luke",
    testament: "NT",
    category: "Gospels",
    eraId: "act6",
    chapterCount: 24,
    author: "Luke the Physician",
    date: "c. AD 60",
    keyTheme: "Jesus the Compassionate Savior for All People",
    context: "A carefully investigated historical narrative emphasizing Jesus' compassion for the outcasts, poor, Samaritans, women, and sinners (Parables of Good Samaritan & Prodigal Son)."
  },
  {
    id: "JHN",
    name: "John",
    shortName: "John",
    testament: "NT",
    category: "Gospels",
    eraId: "act6",
    chapterCount: 21,
    author: "John the Beloved Apostle",
    date: "c. AD 85 – 90",
    keyTheme: "The Word Made Flesh: Seven Signs & 'I AM' Statements",
    context: "Distinctive theological portrait written so readers may believe Jesus is the Christ, the Son of God, and have eternal life through His seven signs and seven 'I AM' proclamations."
  },
  {
    id: "ACT",
    name: "Acts",
    shortName: "Acts",
    testament: "NT",
    category: "Acts (History)",
    eraId: "act7",
    chapterCount: 28,
    author: "Luke the Physician",
    date: "c. AD 62",
    keyTheme: "The Outpouring of the Spirit & Global Mission",
    context: "Volume 2 of Luke's work: traces the unstoppable advance of the Gospel from Jerusalem to Judea/Samaria and Rome through Peter, Stephen, Philip, and Paul."
  },
  {
    id: "ROM",
    name: "Romans",
    shortName: "Rom",
    testament: "NT",
    category: "Pauline Epistles",
    eraId: "act7",
    chapterCount: 16,
    author: "Paul",
    date: "c. AD 57",
    keyTheme: "Justification by Faith & The Gospel of God",
    context: "Paul's most systematic presentation of the gospel: human sinfulness, justification by faith alone in Christ, sanctification by the Spirit, God's plan for Israel, and transformed community."
  },
  {
    id: "1CO",
    name: "1 Corinthians",
    shortName: "1 Cor",
    testament: "NT",
    category: "Pauline Epistles",
    eraId: "act7",
    chapterCount: 16,
    author: "Paul",
    date: "c. AD 55",
    keyTheme: "The Wisdom of the Cross vs. Church Divisions & Disorder",
    context: "Addresses practical issues in a divided Corinthian church: factions, sexual immorality, lawsuits, spiritual gifts, love (Ch 13), and the cornerstone doctrine of bodily resurrection (Ch 15)."
  },
  {
    id: "2CO",
    name: "2 Corinthians",
    shortName: "2 Cor",
    testament: "NT",
    category: "Pauline Epistles",
    eraId: "act7",
    chapterCount: 13,
    author: "Paul",
    date: "c. AD 56",
    keyTheme: "Power in Weakness & The Ministry of Reconciliation",
    context: "Paul's most deeply personal and emotional letter, defending his apostolic authority through suffering ('my grace is sufficient for you, for my power is made perfect in weakness')."
  },
  {
    id: "GAL",
    name: "Galatians",
    shortName: "Gal",
    testament: "NT",
    category: "Pauline Epistles",
    eraId: "act7",
    chapterCount: 6,
    author: "Paul",
    date: "c. AD 49 or 55",
    keyTheme: "Christian Freedom & Justification by Faith Not Law",
    context: "Fiery defense of gospel freedom against Judaizers requiring circumcision, emphasizing adoption as sons and the Fruit of the Spirit."
  },
  {
    id: "EPH",
    name: "Ephesians",
    shortName: "Eph",
    testament: "NT",
    category: "Pauline Epistles",
    eraId: "act7",
    chapterCount: 6,
    author: "Paul",
    date: "c. AD 61",
    keyTheme: "Rich in Christ & The Unity of His Body",
    context: "Written from Roman imprisonment: Ch 1–3 celebrate our cosmic blessings in Christ (predestined, redeemed, sealed), while Ch 4–6 exhort unity, family relationships, and the Armor of God."
  },
  {
    id: "PHP",
    name: "Philippians",
    shortName: "Phil",
    testament: "NT",
    category: "Pauline Epistles",
    eraId: "act7",
    chapterCount: 4,
    author: "Paul",
    date: "c. AD 61",
    keyTheme: "Joy in Christ & The Christ Hymn of Humility",
    context: "A warm letter of gratitude overflowed with 'Rejoice in the Lord always', featuring the Carmen Christi (Phil 2:5-11) celebrating Christ's self-emptying service and supreme exaltation."
  },
  {
    id: "COL",
    name: "Colossians",
    shortName: "Col",
    testament: "NT",
    category: "Pauline Epistles",
    eraId: "act7",
    chapterCount: 4,
    author: "Paul",
    date: "c. AD 61",
    keyTheme: "The Supremacy & Complete Sufficiency of Christ",
    context: "Combats hollow philosophy by declaring Christ is the image of the invisible God, creator and reconciler of all things, in whom dwells the whole fullness of deity."
  },
  {
    id: "1TH",
    name: "1 Thessalonians",
    shortName: "1 Thess",
    testament: "NT",
    category: "Pauline Epistles",
    eraId: "act7",
    chapterCount: 5,
    author: "Paul",
    date: "c. AD 51",
    keyTheme: "Holy Living in Expectation of Christ's Return",
    context: "Encourages a young persecuted church, answering comfortingly about believers who have fallen asleep prior to Christ's second coming."
  },
  {
    id: "2TH",
    name: "2 Thessalonians",
    shortName: "2 Thess",
    testament: "NT",
    category: "Pauline Epistles",
    eraId: "act7",
    chapterCount: 3,
    author: "Paul",
    date: "c. AD 51",
    keyTheme: "The Man of Lawlessness & Diligent Work",
    context: "Clarifies misunderstandings about the Day of the Lord (explaining the rebellion and man of lawlessness come first) and warns against idleness."
  },
  {
    id: "1TI",
    name: "1 Timothy",
    shortName: "1 Tim",
    testament: "NT",
    category: "Pauline Epistles",
    eraId: "act7",
    chapterCount: 6,
    author: "Paul",
    date: "c. AD 63",
    keyTheme: "Church Order, Elders, Deacons & Sound Doctrine",
    context: "Pastoral manual instructing young Timothy on church leadership qualifications, godliness, prayer, handling wealth, and guarding the gospel deposit."
  },
  {
    id: "2TI",
    name: "2 Timothy",
    shortName: "2 Tim",
    testament: "NT",
    category: "Pauline Epistles",
    eraId: "act7",
    chapterCount: 4,
    author: "Paul",
    date: "c. AD 67",
    keyTheme: "Finish the Race & All Scripture is Breathed Out by God",
    context: "Paul's final letter before martyrdom in Rome: charges Timothy to preach the Word in season and out of season, holding fast to inspired Scripture (2 Tim 3:16)."
  },
  {
    id: "TIT",
    name: "Titus",
    shortName: "Titus",
    testament: "NT",
    category: "Pauline Epistles",
    eraId: "act7",
    chapterCount: 3,
    author: "Paul",
    date: "c. AD 63",
    keyTheme: "Appointing Elders & Grace Adorning Good Works",
    context: "Instructs Titus in Crete on character of elders and how the grace of God trains believers to renounce ungodliness and live zealous for good works."
  },
  {
    id: "PHM",
    name: "Philemon",
    shortName: "Philem",
    testament: "NT",
    category: "Pauline Epistles",
    eraId: "act7",
    chapterCount: 1,
    author: "Paul",
    date: "c. AD 61",
    keyTheme: "Gospel Reconciliation & Brotherhood in Christ",
    context: "A masterclass in Christian persuasion: Paul pleads with Philemon to welcome back his runaway slave Onesimus not merely as a servant, but as a beloved brother in Christ."
  },
  {
    id: "HEB",
    name: "Hebrews",
    shortName: "Heb",
    testament: "NT",
    category: "General Epistles",
    eraId: "act7",
    chapterCount: 13,
    author: "Unknown (Paul, Apollos or Barnabas)",
    date: "c. AD 65",
    keyTheme: "Jesus is Better: High Priest & Better Covenant",
    context: "Demonstrates that Jesus is superior to angels, Moses, Levitical priests, and sacrifices—exhorting Jewish Christians not to drift back but endure with faith (Ch 11 Hall of Faith)."
  },
  {
    id: "JAS",
    name: "James",
    shortName: "James",
    testament: "NT",
    category: "General Epistles",
    eraId: "act7",
    chapterCount: 5,
    author: "James (Brother of Jesus)",
    date: "c. AD 45 – 49",
    keyTheme: "Living Faith Demonstrated by Action & Wisdom",
    context: "New Testament Proverbs: challenges believers to be doers of the Word and not hearers only, taming the tongue, showing no favoritism, and living genuine faith."
  },
  {
    id: "1PE",
    name: "1 Peter",
    shortName: "1 Pet",
    testament: "NT",
    category: "General Epistles",
    eraId: "act7",
    chapterCount: 5,
    author: "Peter",
    date: "c. AD 64",
    keyTheme: "Living Hope Amidst Fiery Trials & Exiles on Earth",
    context: "Encourages elect exiles facing hostility to stand firm in God's grace, walking in holiness, submission, and suffering following the footsteps of Christ."
  },
  {
    id: "2PE",
    name: "2 Peter",
    shortName: "2 Pet",
    testament: "NT",
    category: "General Epistles",
    eraId: "act7",
    chapterCount: 3,
    author: "Peter",
    date: "c. AD 67",
    keyTheme: "Grow in Grace & Beware of False Teachers",
    context: "Exhorts believers to confirm their calling, warns sharply against mockers and false teachers, and affirms the certainty of the Day of the Lord and New Heavens & Earth."
  },
  {
    id: "1JN",
    name: "1 John",
    shortName: "1 John",
    testament: "NT",
    category: "General Epistles",
    eraId: "act7",
    chapterCount: 5,
    author: "John",
    date: "c. AD 90",
    keyTheme: "Assurance of Salvation, Light, Love & Truth",
    context: "Provides assurance of eternal life through three tests: believing Jesus is the incarnate Son of God, walking in the light of obedience, and loving brothers and sisters."
  },
  {
    id: "2JN",
    name: "2 John",
    shortName: "2 John",
    testament: "NT",
    category: "General Epistles",
    eraId: "act7",
    chapterCount: 1,
    author: "John",
    date: "c. AD 90",
    keyTheme: "Walking in Truth & Rejecting Deceivers",
    context: "Brief letter urging the elect lady and her children to love one another by walking in truth, warning not to offer hospitality to itinerant false teachers."
  },
  {
    id: "3JN",
    name: "3 John",
    shortName: "3 John",
    testament: "NT",
    category: "General Epistles",
    eraId: "act7",
    chapterCount: 1,
    author: "John",
    date: "c. AD 90",
    keyTheme: "Commending Gaius for Hospitality to Truth Workers",
    context: "Praises Gaius for faithful hospitality to missionaries, contrasts him with domineering Diotrephes, and commends Demetrius."
  },
  {
    id: "JUD",
    name: "Jude",
    shortName: "Jude",
    testament: "NT",
    category: "General Epistles",
    eraId: "act7",
    chapterCount: 1,
    author: "Jude (Brother of James & Jesus)",
    date: "c. AD 68 or 75",
    keyTheme: "Contend Earnestly for the Faith Once Delivered",
    context: "Urgent call to defend the faith against stealthy apostates who turn grace into license, closing with one of Scripture's greatest doxologies (Him who is able to keep you from stumbling)."
  },
  {
    id: "REV",
    name: "Revelation",
    shortName: "Rev",
    testament: "NT",
    category: "Apocalyptic",
    eraId: "act8",
    chapterCount: 22,
    author: "John",
    date: "c. AD 95",
    keyTheme: "The Victory of the Lamb & New Jerusalem",
    context: "Unveils the risen Christ reigning in glory; reveals the ultimate triumph of God's Kingdom over Babylon, beast, and serpent, concluding in the New Heaven and New Earth."
  }
];

// Helper to look up any book by ID
function getBookById(bookId) {
  return BIBLE_BOOKS.find((b) => b.id === bookId);
}

// Generate all canonical chapters list formatted cleanly
function getAllChaptersMetadata() {
  const chapters = [];
  BIBLE_BOOKS.forEach((book) => {
    for (let ch = 1; ch <= book.chapterCount; ch++) {
      chapters.push({
        chapterKey: `${book.id}-${ch}`,
        bookId: book.id,
        bookName: book.name,
        chapterNumber: ch,
        title: `${book.name} ${ch}`,
        eraId: book.eraId
      });
    }
  });
  return chapters;
}

// --- FILE: src/storage.js ---


const STORAGE_KEY = "bible_outline_studio_v1";

// Returns empty/default user notes database
function createInitialStorage() {
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
    chapters
  };
}

function loadOutlineStorage() {
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
    BIBLE_BOOKS.forEach((book) => {
      if (!data.books[book.id]) {
        data.books[book.id] = defaultData.books[book.id];
      }
      for (let ch = 1; ch <= book.chapterCount; ch++) {
        const chKey = `${book.id}-${ch}`;
        if (!data.chapters[chKey]) {
          data.chapters[chKey] = defaultData.chapters[chKey];
        }
      }
    });
    return data;
  } catch (err) {
    console.error("Error loading Bible outline storage:", err);
    return createInitialStorage();
  }
}

function saveOutlineStorage(data) {
  try {
    data.lastSaved = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Error saving Bible outline storage:", err);
  }
}

let saveTimer = null;
function debouncedSaveOutlineStorage(data, delay = 250) {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    saveOutlineStorage(data);
  }, delay);
}

// Helper to inject sample Genesis 1 & Matthew 1 example outline so user can see it in action
function injectExampleOutlines(data) {
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
function exportToMarkdown(data, bookId = null) {
  const booksToExport = bookId ? [BIBLE_BOOKS.find((b) => b.id === bookId)] : BIBLE_BOOKS;

  let md = "";
  if (!bookId) {
    md += "# COMPLETE BIBLE OUTLINE & CHAPTER STUDY\n\n";
    md += `Generated from Bible Outline & Storyline Studio (${new Date().toLocaleDateString()})\n\n`;
    md += "---\n\n";
  }

  booksToExport.forEach((book) => {
    const bookData = data.books[book.id];
    const hasSummary = bookData && bookData.bookSummary.trim().length > 0;

    // Check if book has any outlined chapters
    let outlinedCount = 0;
    for (let ch = 1; ch <= book.chapterCount; ch++) {
      const chKey = `${book.id}-${ch}`;
      const chData = data.chapters[chKey];
      if (chData && (chData.chapterTitle.trim() || chData.notes.trim() || chData.sections.length > 0)) {
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

      const hasAnyNotes = blocks.some((b) => b.notes && b.notes.trim().length > 0);
      if (!hasAnyNotes && !bookId) {
        continue;
      }

      md += `### Chapter ${ch}\n\n`;

      blocks.forEach((block) => {
        md += `#### ${block.heading}${block.verses ? ` (${block.verses})` : ""}\n\n`;
        if (block.notes && block.notes.trim()) {
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

// --- FILE: src/firebase_config.js ---
// Firebase Auth (Google SSO) & Cloud Sync Configuration
// Replace these values with your Firebase Project config from console.firebase.google.com

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAn_aeb_sHY7sToqlLeXrJAHBtf5Hlp4uc",
  authDomain: "bible-outline-f10cc.firebaseapp.com",
  projectId: "bible-outline-f10cc",
  storageBucket: "bible-outline-f10cc.firebasestorage.app",
  messagingSenderId: "74158682451",
  appId: "1:74158682451:web:8aef02018d3ada0b9831a6",
  measurementId: "G-SVT2LTW7R4"
};

// Check if Firebase credentials have been configured
function isFirebaseConfigured() {
  return (
    FIREBASE_CONFIG.apiKey &&
    FIREBASE_CONFIG.apiKey !== "YOUR_FIREBASE_API_KEY" &&
    FIREBASE_CONFIG.projectId &&
    FIREBASE_CONFIG.projectId !== "YOUR_PROJECT_ID"
  );
}

// --- FILE: src/firebase_sync.js ---


let firebaseApp = null;
let auth = null;
let db = null;
let googleProvider = null;
let cachedFirebaseSDK = null;

// Dynamically initialize Firebase Auth & Firestore ES Module SDKs
async function ensureFirebase() {
  if (cachedFirebaseSDK) return cachedFirebaseSDK;

  if (!isFirebaseConfigured()) {
    throw new Error(
      "Firebase is not configured yet. Open src/firebase_config.js to paste your Firebase credentials (console.firebase.google.com)."
    );
  }

  // Load official Firebase V9/V10 JS SDK modules from CDN
  const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js");
  const { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signOut, onAuthStateChanged } = await import(
    "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"
  );
  const { getFirestore, doc, setDoc, getDoc, serverTimestamp } = await import(
    "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"
  );

  firebaseApp = initializeApp(FIREBASE_CONFIG);
  auth = getAuth(firebaseApp);
  db = getFirestore(firebaseApp);
  googleProvider = new GoogleAuthProvider();

  cachedFirebaseSDK = {
    auth,
    db,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
    signOut,
    onAuthStateChanged,
    doc,
    setDoc,
    getDoc,
    serverTimestamp
  };

  return cachedFirebaseSDK;
}

function preloadFirebaseSDK() {
  ensureFirebase().catch(() => {});
}

async function listenForAuthChanges(callback) {
  try {
    const { auth, onAuthStateChanged, getRedirectResult } = await ensureFirebase();
    // Check if we just returned from Google OAuth redirect
    getRedirectResult(auth).catch(() => {});
    onAuthStateChanged(auth, (user) => {
      callback(user);
    });
  } catch (err) {
    console.warn("Firebase Auth listener skip:", err);
  }
}

async function signInWithGoogleSSO() {
  const { auth, signInWithPopup } = await ensureFirebase();
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

async function signInWithGoogleRedirect() {
  const { auth, signInWithRedirect } = await ensureFirebase();
  await signInWithRedirect(auth, googleProvider);
}

async function signOutUser() {
  const { auth, signOut } = await ensureFirebase();
  await signOut(auth);
}

async function saveOutlinesToCloud(user, localData) {
  if (!user || !user.uid) return false;
  const { db, doc, setDoc, serverTimestamp } = await ensureFirebase();
  const userDocRef = doc(db, "users", user.uid);

  // Extract non-empty books and chapters for lightweight cloud storage
  const activeBooks = {};
  const activeChapters = {};

  if (localData.books) {
    for (const [bid, b] of Object.entries(localData.books)) {
      if (b && b.bookSummary && b.bookSummary.trim()) {
        activeBooks[bid] = b;
      }
    }
  }

  if (localData.chapters) {
    for (const [cid, ch] of Object.entries(localData.chapters)) {
      const activeSections = Array.isArray(ch.headingBlocks)
        ? ch.headingBlocks
            .map((hb) => {
              const pts = Array.isArray(hb.points)
                ? hb.points.map((p) => (p || "").trim()).filter((p) => p.length > 0)
                : [];
              if (pts.length === 0) return null;
              return {
                heading: hb.heading || "Section",
                points: pts
              };
            })
            .filter(Boolean)
        : [];

      const hasSummary = Boolean(ch.takeaway && ch.takeaway.trim().length > 0);

      if (activeSections.length > 0 || hasSummary) {
        const compactCh = {
          sections: activeSections
        };
        if (hasSummary) {
          compactCh.takeaway = ch.takeaway.trim();
        }
        activeChapters[cid] = compactCh;
      }
    }
  }

  const payload = JSON.parse(
    JSON.stringify({
      email: user.email || "",
      displayName: user.displayName || "User",
      lastSyncedTimestamp: Date.now(),
      books: activeBooks,
      chapters: activeChapters
    })
  );

  await setDoc(userDocRef, payload, { merge: true });

  return true;
}

let cloudSaveTimer = null;
function debouncedCloudAutoSave(user, localData, onStatusUpdate, delayMs = 1200) {
  if (!user || !user.uid) return;
  if (cloudSaveTimer) clearTimeout(cloudSaveTimer);

  if (onStatusUpdate) {
    onStatusUpdate("☁️ Saving to Firebase...");
  }

  cloudSaveTimer = setTimeout(async () => {
    try {
      await saveOutlinesToCloud(user, localData);
      if (onStatusUpdate) {
        onStatusUpdate("☁️ Auto-saved to Firebase");
      }
    } catch (err) {
      console.warn("Cloud auto-save error:", err);
      if (onStatusUpdate) {
        const msg = err.message || "Firebase offline";
        onStatusUpdate(`⚠️ ${msg.slice(0, 32)}`);
      }
    }
  }, delayMs);
}

async function loadOutlinesFromCloud(user) {
  if (!user || !user.uid) return null;
  const { db, doc, getDoc } = await ensureFirebase();
  const userDocRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userDocRef);

  if (snapshot.exists()) {
    const data = snapshot.data();
    return {
      books: data.books || {},
      chapters: data.chapters || {}
    };
  }
  return null;
}


// --- FILE: src/esv_api.js ---
// ESV Bible API v3 Integration
// Authorization Token provided by user

const ESV_API_TOKEN = "60e86cf50aef5557ba669dbc6847792196909d81";

async function fetchESVChapter(bookName, chapterNumber) {
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
function formatESVTextToHTML(rawText) {
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

      // Quiet verse numbers [1], [2], [14]
      const withFormattedVerses = t.replace(/\[(\d+)\]/g, (match, vNum) => {
        return `<span class="esv-verse-num inline-block font-mono text-xs text-[#C4B79C] mr-1.5 select-none cursor-pointer hover:underline" data-verse="${vNum}" title="Click to insert v${vNum} quote into outline"><sup>${vNum}</sup></span>`;
      });

      return `<p class="leading-[1.8] text-[#EAE8E2]">${withFormattedVerses}</p>`;
    })
    .join("");

  return formatted;
}

// Extracts ESV section headings and their verse ranges from raw ESV API text
function extractESVHeadings(rawText, canonicalTitle = "") {
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


// --- FILE: src/components/Sidebar.js ---


function renderSidebar({
  selectedBookId,
  filterTestament,
  searchQuery,
  data,
  isCollapsed = false
}) {
  if (isCollapsed) {
    return `
      <aside class="w-12 bg-[#121211] border-r border-[#262623] h-screen flex flex-col items-center py-3 select-none">
        <button
          id="toggle-sidebar-btn"
          class="p-2 rounded text-[#9A9891] hover:text-[#EAE8E2] transition"
          title="Show Book List (⌘\)"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      </aside>
    `;
  }

  // Calculate overall completed chapters
  let outlinedChapters = 0;
  for (const chKey in data.chapters) {
    const ch = data.chapters[chKey];
    if (
      ch &&
      (Array.isArray(ch.headingBlocks) &&
        ch.headingBlocks.some((b) => b.notes && b.notes.trim().length > 0))
    ) {
      outlinedChapters++;
    }
  }

  const filteredBooks = BIBLE_BOOKS.filter((book) => {
    if (filterTestament !== "ALL" && book.testament !== filterTestament) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return book.name.toLowerCase().includes(q) || book.keyTheme.toLowerCase().includes(q);
    }
    return true;
  });

  return `
    <aside class="w-64 bg-[#141413] border-r border-[#242422] flex flex-col h-screen select-none shrink-0 text-[#EAE8E2]">
      <!-- Minimal Brand Header -->
      <div class="px-4 py-3 border-b border-[#242422] flex items-center justify-between">
        <div>
          <h1 class="font-serif font-semibold text-sm tracking-tight text-[#EAE8E2]">
            Bible Outline Studio
          </h1>
          <p class="text-[11px] text-[#8C8A84]">
            ${outlinedChapters} / 1,189 ch outlined
          </p>
        </div>
        <button
          id="toggle-sidebar-btn"
          class="p-1 rounded text-[#8C8A84] hover:text-[#EAE8E2] transition"
          title="Hide Sidebar"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <!-- Minimal Search & OT/NT Filter -->
      <div class="p-3 border-b border-[#242422] space-y-2">
        <input
          id="sidebar-search-input"
          type="text"
          placeholder="Search books..."
          value="${searchQuery.replace(/"/g, '&quot;')}"
          class="w-full bg-[#1C1C1A] border border-[#2B2B28] rounded-md px-3 py-1 text-xs text-[#EAE8E2] placeholder:text-[#6D6B66] focus:outline-none focus:border-[#C4B79C]"
        />

        <div class="grid grid-cols-3 gap-0.5 bg-[#121211] p-0.5 rounded-md border border-[#242422] text-[11px]">
          <button
            data-testament="ALL"
            class="filter-testament-btn py-0.5 rounded transition ${
              filterTestament === "ALL"
                ? "bg-[#262623] text-[#EAE8E2] font-medium"
                : "text-[#8C8A84] hover:text-[#EAE8E2]"
            }"
          >
            All (66)
          </button>
          <button
            data-testament="OT"
            class="filter-testament-btn py-0.5 rounded transition ${
              filterTestament === "OT"
                ? "bg-[#262623] text-[#EAE8E2] font-medium"
                : "text-[#8C8A84] hover:text-[#EAE8E2]"
            }"
          >
            OT (39)
          </button>
          <button
            data-testament="NT"
            class="filter-testament-btn py-0.5 rounded transition ${
              filterTestament === "NT"
                ? "bg-[#262623] text-[#EAE8E2] font-medium"
                : "text-[#8C8A84] hover:text-[#EAE8E2]"
            }"
          >
            NT (27)
          </button>
        </div>
      </div>

      <!-- Quiet Book List -->
      <div class="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
        ${filteredBooks
          .map((book) => {
            let chCount = 0;
            for (let c = 1; c <= book.chapterCount; c++) {
              const ch = data.chapters[`${book.id}-${c}`];
              if (
                ch &&
                Array.isArray(ch.headingBlocks) &&
                ch.headingBlocks.some((b) => b.notes && b.notes.trim().length > 0)
              ) {
                chCount++;
              }
            }
            const isSelected = book.id === selectedBookId;

            return `
              <button
                data-book-id="${book.id}"
                class="book-nav-card w-full text-left px-3 py-1.5 rounded-md transition flex items-center justify-between text-xs ${
                  isSelected
                    ? "bg-[#2A2A27] text-[#EAE8E2] font-medium shadow-2xs"
                    : "text-[#A19E97] hover:bg-[#1E1E1C] hover:text-[#EAE8E2]"
                }"
              >
                <span class="font-serif ${isSelected ? "text-[#DBCFB3]" : ""}">${book.name}</span>
                <span class="text-[11px] font-mono ${
                  chCount > 0 ? "text-[#C4B79C]" : "text-[#5B5953]"
                }">
                  ${chCount > 0 ? `${chCount}/` : ""}${book.chapterCount}
                </span>
              </button>
            `;
          })
          .join("")}
      </div>
    </aside>
  `;
}

// --- FILE: src/components/TopNavbar.js ---
function renderTopNavbar({ activeView, selectedBook, selectedChapterNum, googleUser, cloudSyncStatus }) {
  return `
    <header class="h-12 bg-[#141413] border-b border-[#242422] px-6 flex items-center justify-between shrink-0 select-none text-xs">
      <!-- Left: Book & Chapter indicator -->
      <div class="flex items-center gap-2">
        <span class="font-serif font-semibold text-sm text-[#EAE8E2]">
          ${selectedBook.name}
        </span>
        <span class="text-[#6D6B66]">•</span>
        <span class="font-mono text-xs text-[#C4B79C]">
          Chapter ${selectedChapterNum} of ${selectedBook.chapterCount}
        </span>
      </div>

      <!-- Center: Quiet View Mode Switcher -->
      <nav class="flex items-center gap-1 bg-[#1A1A18] p-0.5 rounded-md border border-[#262624]">
        <button
          data-view="chapter-outliner"
          class="studio-view-btn px-3 py-1 rounded text-xs transition ${
            activeView === "chapter-outliner"
              ? "bg-[#2B2B28] text-[#EAE8E2] font-medium shadow-2xs"
              : "text-[#8C8A84] hover:text-[#EAE8E2]"
          }"
        >
          Side-by-Side Outliner
        </button>

        <button
          data-view="book-rollup"
          class="studio-view-btn px-3 py-1 rounded text-xs transition ${
            activeView === "book-rollup"
              ? "bg-[#2B2B28] text-[#EAE8E2] font-medium shadow-2xs"
              : "text-[#8C8A84] hover:text-[#EAE8E2]"
          }"
        >
          Full Book Outline (${selectedBook.name})
        </button>
      </nav>

      <!-- Right: Quiet Actions & Cloud SSO Modal Trigger -->
      <div class="flex items-center gap-3">
        <button
          id="load-demo-btn"
          class="text-[#8C8A84] hover:text-[#C4B79C] transition text-xs"
          title="Load sample example outline notes for Genesis 1-3"
        >
          Sample Outlines
        </button>

        <span class="text-[#333330]">|</span>

        <button
          id="open-cloud-sso-btn"
          class="px-3 py-1 rounded bg-[#1C1C1A] hover:bg-[#262623] border border-[#2B2B28] text-[#EAE8E2] transition flex items-center gap-1.5 text-xs font-medium"
          title="${googleUser ? 'Click to manage Google SSO / Firebase Cloud Sync' : 'Direct 1-click Google Sign-In to cloud-sync your Bible outlines'}"
        >
          ${
            googleUser
              ? `<span class="text-[10px]">🟢</span><span class="text-[#C4B79C]">${googleUser.displayName || "Google"} • Synced</span>`
              : `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg><span>Sign in with Google</span>`
          }
        </button>

        <span class="text-[#333330]">|</span>

        <button
          id="export-current-book-btn"
          class="px-2.5 py-1 rounded bg-[#20201E] hover:bg-[#2A2A27] border border-[#2B2B28] text-[#EAE8E2] transition flex items-center gap-1.5"
        >
          <span>Export .md</span>
        </button>
      </div>
    </header>

    <!-- Google SSO & Production Publishing Modal -->
    <div
      id="cloud-sso-modal"
      class="hidden fixed inset-0 bg-black/75 backdrop-blur-2xs z-50 flex items-center justify-center p-4 text-[#EAE8E2]"
    >
      <div class="bg-[#171715] border border-[#2A2A27] rounded-xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
        <div class="flex items-center justify-between border-b border-[#242422] pb-3">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded bg-[#2A2A27] flex items-center justify-center text-xs">☁️</span>
            <h3 class="font-serif text-lg font-bold text-[#EAE8E2]">Google SSO & Firebase Sync</h3>
          </div>
          <button id="close-cloud-sso-modal-btn" class="text-[#8C8A84] hover:text-[#EAE8E2] text-sm">
            ✕
          </button>
        </div>

        <div class="space-y-4 text-xs leading-relaxed text-[#A19E97]">
          <!-- SSO Section -->
          <div class="bg-[#1C1C1A] border border-[#262624] rounded-lg p-4 space-y-3">
            <h4 class="font-semibold text-[#DBCFB3] flex items-center justify-between">
              <span>Google SSO (Firebase Authentication)</span>
              ${
                googleUser
                  ? `<span class="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-mono">Signed In</span>`
                  : `<span class="px-2 py-0.5 rounded text-[10px] bg-[#2A2A27] text-[#8C8A84] font-mono">Offline / Local Storage</span>`
              }
            </h4>

            ${
              googleUser
                ? `
                    <div class="flex items-center justify-between bg-[#141413] p-2.5 rounded border border-[#242422]">
                      <div>
                        <div class="font-medium text-[#EAE8E2]">${googleUser.displayName || googleUser.email}</div>
                        <div class="text-[10px] font-mono text-[#6D6B66]">${googleUser.email}</div>
                      </div>
                      <button
                        id="sso-signout-btn"
                        class="px-2.5 py-1 rounded bg-[#282825] hover:bg-[#353531] text-[#EAE8E2]"
                      >
                        Sign Out
                      </button>
                    </div>

                    <div class="grid grid-cols-2 gap-2 pt-1">
                      <button
                        id="sso-backup-cloud-btn"
                        class="py-2 rounded bg-[#C4B79C] hover:bg-[#DBCFB3] text-[#141413] font-semibold transition"
                      >
                        ↑ Backup Outlines to Firebase
                      </button>
                      <button
                        id="sso-restore-cloud-btn"
                        class="py-2 rounded bg-[#242422] hover:bg-[#2E2E2A] text-[#EAE8E2] border border-[#2E2E2A] transition"
                      >
                        ↓ Restore from Firebase
                      </button>
                    </div>
                  `
                : `
                    <p class="text-[11px] text-[#8C8A84]">
                      Your outlines are currently saved automatically to your local browser storage. Sign in with your Google account to back up and sync your outlines across devices:
                    </p>

                    <div class="space-y-2 pt-1">
                      <button
                        id="sso-signin-google-btn"
                        class="w-full py-2.5 rounded bg-[#4285F4] hover:bg-[#3367D6] text-white font-semibold transition flex items-center justify-center gap-2 shadow"
                      >
                        <svg class="w-4 h-4 bg-white rounded-full p-0.5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
                        <span>Sign in with Google (Pop-Up)</span>
                      </button>

                      <button
                        id="sso-signin-google-redirect-btn"
                        class="w-full py-2 rounded bg-[#242422] hover:bg-[#2E2E2A] text-[#EAE8E2] border border-[#3A3A36] text-xs transition"
                      >
                        If pop-up is blocked: Sign in via Full Page Redirect
                      </button>
                    </div>
                  `
            }
            ${
              cloudSyncStatus
                ? `<div class="text-[11px] text-[#C4B79C] font-mono">${cloudSyncStatus}</div>`
                : ""
            }
          </div>
        </div>
      </div>
    </div>
  `;
}

// --- FILE: src/components/BookRollupView.js ---



function renderBookRollupView({
  selectedBook,
  data
}) {
  const bookData = data.books[selectedBook.id] || { bookSummary: "" };

  return `
    <div class="max-w-3xl mx-auto p-10 space-y-10 text-[#EAE8E2] bg-[#141413] min-h-full">
      <!-- Quiet Book Header -->
      <div class="border-b border-[#242422] pb-6 space-y-3">
        <div class="flex items-center justify-between text-xs text-[#8C8A84]">
          <span>${selectedBook.testament} • ${selectedBook.category}</span>
          <span>${selectedBook.author} • ${selectedBook.date}</span>
        </div>

        <h1 class="font-serif text-3xl font-bold text-[#EAE8E2] tracking-tight">
          ${selectedBook.name}
        </h1>

        <p class="text-xs leading-relaxed text-[#A19E97]">
          ${selectedBook.context}
        </p>
      </div>

      <!-- Overall Book Summary Section -->
      <div class="space-y-2">
        <label class="block text-xs font-mono uppercase tracking-wider text-[#C4B79C]">
          Overall Book Summary
        </label>
        <textarea
          id="book-summary-textarea"
          rows="4"
          placeholder="Write your synthesis of what happens across the entire book of ${selectedBook.name}..."
          class="w-full bg-[#191917] border border-[#262624] focus:border-[#C4B79C] rounded-md p-4 text-[#EAE8E2] text-sm leading-relaxed placeholder:text-[#6D6B66] focus:outline-none transition"
        >${(bookData.bookSummary || "").replace(/</g, "&lt;")}</textarea>
      </div>

      <!-- Complete Book Chapter Rollup -->
      <div class="space-y-6 pt-4">
        <div class="flex items-center justify-between border-b border-[#242422] pb-2">
          <h2 class="font-serif text-xl font-bold text-[#EAE8E2]">
            Complete Book Outline (${selectedBook.chapterCount} ch)
          </h2>
        </div>

        <div class="space-y-8">
          ${(() => {
            const rows = [];
            for (let ch = 1; ch <= selectedBook.chapterCount; ch++) {
              const chKey = `${selectedBook.id}-${ch}`;
              const chData = data.chapters[chKey] || {
                headingBlocks: [],
                chapterScripture: "",
                takeaway: ""
              };

              let blocks = chData.headingBlocks;
              if (!Array.isArray(blocks) || blocks.length === 0) {
                blocks = extractESVHeadings(chData.chapterScripture, `${selectedBook.name} ${ch}`).map(
                  (h) => ({
                    heading: h.heading,
                    verses: h.verses,
                    notes: ""
                  })
                );
              }

              rows.push(`
                <div class="border-b border-[#222220] pb-6 space-y-4">
                  <div class="flex items-center justify-between">
                    <h3 class="font-serif text-lg font-bold text-[#DBCFB3]">
                      Chapter ${ch}
                    </h3>
                    <button
                      data-chapter-num="${ch}"
                      class="open-chapter-editor-btn text-xs text-[#8C8A84] hover:text-[#EAE8E2] transition"
                    >
                      Outline Side-by-Side →
                    </button>
                  </div>

                  <div class="space-y-4">
                    ${blocks
                      .map((block) => `
                        <div class="space-y-1">
                          <div class="flex items-center gap-2">
                            <span class="font-serif font-semibold text-sm text-[#EAE8E2]">
                              ${block.heading}
                            </span>
                            ${
                              block.verses
                                ? `<span class="text-xs font-mono text-[#7B7974]">(${block.verses})</span>`
                                : ""
                            }
                          </div>
                          ${(() => {
                            const pts = Array.isArray(block.points)
                              ? block.points.filter((p) => p && p.trim().length > 0)
                              : block.notes
                              ? block.notes
                                  .split("\n")
                                  .map((p) => p.replace(/^[•\-\*]\s*/, "").trim())
                                  .filter(Boolean)
                              : [];

                            if (pts.length > 0) {
                              return `
                                <ul class="space-y-1 pl-3 text-sm text-[#EAE8E2]">
                                  ${pts
                                    .map(
                                      (pt) => `
                                    <li class="flex items-start gap-2">
                                      <span class="text-[#C4B79C] select-none">•</span>
                                      <span>${pt.replace(/</g, "&lt;")}</span>
                                    </li>
                                  `
                                    )
                                    .join("")}
                                </ul>
                              `;
                            }
                            return `
                              <div class="text-xs text-[#6D6B66] italic">
                                No outline points under "${block.heading}"
                              </div>
                            `;
                          })()}
                        </div>
                      `)
                      .join("")}
                  </div>

                  ${
                    chData.takeaway && chData.takeaway.trim()
                      ? `
                          <div class="text-xs text-[#C4B79C] pt-1">
                            Takeaway: ${chData.takeaway}
                          </div>
                        `
                      : ""
                  }
                </div>
              `);
            }
            return rows.join("");
          })()}
        </div>
      </div>
    </div>
  `;
}

// --- FILE: src/components/ChapterEditorView.js ---



function renderChapterEditorView({
  selectedBook,
  chapterNum,
  splitViewMode = "split", // 'split' | 'outline' | 'scripture'
  isLoadingESV = false,
  esvErrorMessage = null,
  data
}) {
  const chKey = `${selectedBook.id}-${chapterNum}`;
  const chData = data.chapters[chKey] || {
    headingBlocks: [],
    chapterScripture: "",
    takeaway: "",
    status: "empty"
  };

  const bookData = data.books[selectedBook.id] || { bookSummary: "" };

  // Always compute exact ESV section headings from the scripture text
  const extractedHeadings = extractESVHeadings(
    chData.chapterScripture,
    `${selectedBook.name} ${chapterNum}`
  );

  // Sync headingBlocks with extractedHeadings while preserving user notes/points
  const existingBlocks = Array.isArray(chData.headingBlocks) ? chData.headingBlocks : [];
  let blocks = extractedHeadings.map((esvH, idx) => {
    const matchByTitle = existingBlocks.find(
      (eb) =>
        eb &&
        eb.heading &&
        esvH &&
        esvH.heading &&
        eb.heading.toLowerCase() === esvH.heading.toLowerCase() &&
        eb.heading !== "Chapter Overview"
    );
    const matchPos = existingBlocks[idx];
    let notesToKeep = "";
    let pointsToKeep = [""];

    if (matchByTitle) {
      notesToKeep = matchByTitle.notes || "";
      if (Array.isArray(matchByTitle.points) && matchByTitle.points.length > 0) {
        pointsToKeep = matchByTitle.points;
      } else if (notesToKeep) {
        pointsToKeep = notesToKeep
          .split("\n")
          .map((l) => l.replace(/^[•\-\*]\s*/, "").trim())
          .filter((l) => l.length > 0);
        if (pointsToKeep.length === 0) pointsToKeep = [""];
      }
    } else if (matchPos) {
      notesToKeep = matchPos.notes || "";
      if (Array.isArray(matchPos.points) && matchPos.points.length > 0) {
        pointsToKeep = matchPos.points;
      } else if (notesToKeep) {
        pointsToKeep = notesToKeep
          .split("\n")
          .map((l) => l.replace(/^[•\-\*]\s*/, "").trim())
          .filter((l) => l.length > 0);
        if (pointsToKeep.length === 0) pointsToKeep = [""];
      }
    }

    return {
      heading: esvH.heading,
      verses: esvH.verses,
      notes: notesToKeep,
      points: pointsToKeep
    };
  });

  if (existingBlocks.length > extractedHeadings.length) {
    for (let i = extractedHeadings.length; i < existingBlocks.length; i++) {
      const extra = existingBlocks[i];
      if (extra && extra.heading && !extractedHeadings.some((h) => h && h.heading === extra.heading)) {
        if (!Array.isArray(extra.points) || extra.points.length === 0) {
          extra.points = extra.notes
            ? extra.notes
                .split("\n")
                .map((l) => l.replace(/^[•\-\*]\s*/, "").trim())
                .filter(Boolean)
            : [""];
          if (extra.points.length === 0) extra.points = [""];
        }
        blocks.push(extra);
      }
    }
  }

  chData.headingBlocks = blocks;

  // Initialize collapse state for this chapter on global window.collapsedHeadingsMap
  window.collapsedHeadingsMap = window.collapsedHeadingsMap || {};
  if (!window.collapsedHeadingsMap[chKey]) {
    window.collapsedHeadingsMap[chKey] = {};
  }
  const chCollapsedState = window.collapsedHeadingsMap[chKey];

  const currentBookIdx = BIBLE_BOOKS.findIndex((b) => b.id === selectedBook.id);
  const hasPrevChapter = chapterNum > 1 || currentBookIdx > 0;
  const hasNextChapter = chapterNum < selectedBook.chapterCount || currentBookIdx < BIBLE_BOOKS.length - 1;

  let prevLabel = "← Prev";
  if (chapterNum === 1 && currentBookIdx > 0) {
    const prevB = BIBLE_BOOKS[currentBookIdx - 1];
    prevLabel = `← ${prevB.shortName} ${prevB.chapterCount}`;
  } else if (chapterNum > 1) {
    prevLabel = `← Ch ${chapterNum - 1}`;
  }

  let nextLabel = "Next →";
  if (chapterNum === selectedBook.chapterCount && currentBookIdx < BIBLE_BOOKS.length - 1) {
    const nextB = BIBLE_BOOKS[currentBookIdx + 1];
    nextLabel = `${nextB.shortName} 1 →`;
  } else if (chapterNum < selectedBook.chapterCount) {
    nextLabel = `Ch ${chapterNum + 1} →`;
  }

  // Count how many heading blocks have non-empty bullet points
  const outlinedHeadingsCount = blocks.filter(
    (b) => Array.isArray(b.points) && b.points.some((pt) => pt && pt.trim().length > 0)
  ).length;

  return `
    <div class="h-full flex flex-col overflow-hidden text-[#EAE8E2] bg-[#161614]">
      <!-- Sub-header Toolbar: Stepper & View Controls -->
      <div class="px-6 py-2.5 border-b border-[#242422] flex items-center justify-between gap-3 shrink-0 text-xs bg-[#181816]">
        <!-- Left: Synchronized Stepper -->
        <div class="flex items-center gap-2">
          <button
            id="prev-chapter-btn"
            ${!hasPrevChapter ? "disabled" : ""}
            class="px-3 py-1 rounded bg-[#20201E] hover:bg-[#2A2A27] disabled:opacity-20 border border-[#2B2B28] text-[#EAE8E2] transition"
            title="Step to previous chapter (ArrowLeft)"
          >
            ${prevLabel}
          </button>
          <span class="font-serif font-medium text-sm text-[#DBCFB3] px-2">
            ${selectedBook.name} ${chapterNum}
          </span>
          <button
            id="next-chapter-btn"
            ${!hasNextChapter ? "disabled" : ""}
            class="px-3 py-1 rounded bg-[#C4B79C] hover:bg-[#DBCFB3] text-[#141413] font-semibold disabled:opacity-20 transition"
            title="Step to next chapter (ArrowRight)"
          >
            ${nextLabel}
          </button>
        </div>

        <!-- Center: Overall Book Summary Toggle -->
        <button
          id="toggle-book-summary-box-btn"
          class="text-[#A19E97] hover:text-[#EAE8E2] transition flex items-center gap-1.5"
        >
          <span>Book Summary (${selectedBook.name})</span>
          <span class="text-[10px] text-[#6D6B66]">[${bookData.bookSummary ? "Written" : "Add"}]</span>
        </button>

        <!-- Right: Refresh ESV -->
        <div class="flex items-center gap-2">
          <button
            id="refresh-esv-btn"
            class="text-xs text-[#7B7974] hover:text-[#C4B79C] transition flex items-center gap-1"
            title="Refresh ESV text & headings from Crossway API"
          >
            <span>↻</span>
            <span>Refresh ESV Scripture</span>
          </button>
        </div>
      </div>

      <!-- Expandable Overall Book Summary Banner -->
      <div
        id="book-summary-collapsible"
        class="bg-[#1C1C1A] border-b border-[#282825] p-4 px-6 space-y-1.5 shrink-0 ${
          bookData.bookSummary ? "" : "hidden"
        }"
      >
        <div class="flex items-center justify-between text-xs">
          <span class="font-serif text-[#C4B79C]">Overall Book Summary — ${selectedBook.name}</span>
          <button id="hide-book-summary-box-btn" class="text-[#6D6B66] hover:text-[#EAE8E2]">Close</button>
        </div>
        <textarea
          id="quick-book-summary-textarea"
          rows="3"
          placeholder="Write your summary of what happens across the entire book of ${selectedBook.name} here..."
          class="w-full bg-[#141413] border border-[#282825] rounded p-3 text-[#EAE8E2] text-sm leading-relaxed placeholder:text-[#6D6B66] focus:outline-none focus:border-[#C4B79C]"
        >${(bookData.bookSummary || "").replace(/</g, "&lt;")}</textarea>
      </div>

      <!-- MAIN SPLIT WORKSPACE -->
      <div class="flex-1 grid grid-cols-2 divide-x divide-[#242422] overflow-hidden">
        <!-- COLUMN 1 / PANEL A: UNIFIED OUTLINE CANVAS WITH BULLETED LIST EDITOR -->
        <div class="h-full overflow-hidden flex flex-col bg-[#161614] p-6 space-y-3">
                  <!-- Top Bar & One-Click Chapter Selector for Current Book -->
                  <div class="space-y-2 border-b border-[#262624] pb-2.5 shrink-0">
                    <div class="flex items-center justify-between gap-2">
                      <div class="flex items-center gap-1.5 text-xs">
                        <span class="font-mono uppercase tracking-wider text-[#DBCFB3] font-semibold">
                          ${selectedBook.name} Chapters:
                        </span>
                      </div>
                      <!-- Real-Time Save Indicator -->
                      <div
                        id="editor-save-indicator"
                        class="text-[11px] font-mono text-[#34A853] flex items-center gap-1"
                      >
                        <span>✓</span>
                        <span>Saved</span>
                      </div>
                    </div>

                    <!-- Compact Chapter Number Bar -->
                    <div class="flex items-center gap-1.5 overflow-x-auto py-1 min-h-[38px] no-scrollbar">
                      ${Array.from({ length: selectedBook.chapterCount }, (_, i) => i + 1)
                        .map((chN) => {
                          const cKey = `${selectedBook.id}-${chN}`;
                          const cStatus = data.chapters?.[cKey]?.status || "empty";
                          const isCur = chN === chapterNum;
                          return `
                            <button
                              type="button"
                              data-quick-ch="${chN}"
                              class="quick-chapter-pill shrink-0 px-2.5 py-1.5 rounded text-xs leading-none font-mono transition flex items-center gap-1 ${
                                isCur
                                  ? "bg-[#C4B79C] text-[#141413] font-bold shadow-2xs"
                                  : cStatus !== "empty"
                                  ? "bg-[#252522] text-[#DBCFB3] hover:bg-[#30302C]"
                                  : "bg-[#181816] text-[#6D6B66] hover:bg-[#22221F] hover:text-[#EAE8E2]"
                              }"
                              title="Jump to ${selectedBook.name} ${chN}"
                            >
                              <span>${chN}</span>
                              ${cStatus !== "empty" && !isCur ? '<span class="w-1.5 h-1.5 rounded-full bg-[#C4B79C]"></span>' : ""}
                            </button>
                          `;
                        })
                        .join("")}
                    </div>

                    <!-- Google Docs Rich Toolbar Row -->
                    <div class="flex items-center justify-between pt-1">

                    <!-- Google Docs Rich Toolbar Buttons -->
                    <div class="flex items-center gap-1 bg-[#1A1A18] p-1 rounded border border-[#2B2B28] text-xs">
                      <button
                        type="button"
                        data-rich-command="bold"
                        class="rich-toolbar-btn px-2 py-1 rounded hover:bg-[#2A2A27] text-[#EAE8E2] font-bold transition"
                        title="Bold (Cmd+B)"
                      >
                        B
                      </button>
                      <button
                        type="button"
                        data-rich-command="italic"
                        class="rich-toolbar-btn px-2 py-1 rounded hover:bg-[#2A2A27] text-[#EAE8E2] italic transition"
                        title="Italic (Cmd+I)"
                      >
                        I
                      </button>
                      <span class="w-[1px] h-4 bg-[#2D2D2A] mx-0.5"></span>
                      <button
                        type="button"
                        data-rich-command="insertUnorderedList"
                        class="rich-toolbar-btn px-2.5 py-1 rounded hover:bg-[#2A2A27] text-[#C4B79C] font-mono transition flex items-center gap-1"
                        title="Create or toggle Bulleted List (•)"
                      >
                        <span>•</span>
                        <span>Bulleted List</span>
                      </button>
                      <button
                        type="button"
                        data-rich-command="insertOrderedList"
                        class="rich-toolbar-btn px-2.5 py-1 rounded hover:bg-[#2A2A27] text-[#A19E97] font-mono transition flex items-center gap-1"
                        title="Create Numbered List (1.)"
                      >
                        <span>1.</span>
                        <span>Numbered List</span>
                      </button>
                      <span class="w-[1px] h-4 bg-[#2D2D2A] mx-0.5"></span>
                      <button
                        type="button"
                        data-rich-command="indent"
                        class="rich-toolbar-btn px-2 py-1 rounded hover:bg-[#2A2A27] text-[#C4B79C] font-mono transition flex items-center gap-1"
                        title="Indent Sub-bullet (Tab)"
                      >
                        <span>→ Sub-bullet</span>
                      </button>
                      <button
                        type="button"
                        data-rich-command="outdent"
                        class="rich-toolbar-btn px-2 py-1 rounded hover:bg-[#2A2A27] text-[#A19E97] font-mono transition flex items-center gap-1"
                        title="Outdent Bullet (Shift+Tab)"
                      >
                        <span>← Outdent</span>
                      </button>
                      <span class="w-[1px] h-4 bg-[#2D2D2A] mx-0.5"></span>
                      <button
                        type="button"
                        id="toggle-rich-headings-btn"
                        class="px-2 py-1 rounded hover:bg-[#2A2A27] text-[#A19E97] transition flex items-center gap-1"
                        title="Collapse or Expand all ESV Section Headings inside this box"
                      >
                        <span>▼</span>
                        <span>Toggle Headings</span>
                      </button>
                      <button
                        type="button"
                        id="reinsert-esv-headings-btn"
                        class="px-2 py-1 rounded hover:bg-[#2A2A27] text-[#8C8A84] hover:text-[#C4B79C] transition"
                        title="Reset/Insert ESV Section Headings into this document box"
                      >
                        📑 Insert ESV Headings
                      </button>
                    </div>
                  </div>

                  <!-- ONE UNIFIED CHAPTER OUTLINE DOCUMENT (INDESTRUCTIBLE HEADERS) -->
                  <div
                    id="chapter-rich-outline-editor"
                    class="flex-1 bg-[#1A1A18] border border-[#2B2B28] rounded-lg p-5 space-y-4 overflow-y-auto shadow-inner"
                  >${blocks
                    .map((block, idx) => {
                      const isCol = Boolean(chCollapsedState[idx]);
                      const pts =
                        Array.isArray(block.points) && block.points.length > 0
                          ? block.points.filter((p) => p !== null && p !== undefined)
                          : [""];

                      return `
                        <div
                          class="esv-rich-section-wrap border border-[#2B2B28] rounded-md bg-[#181816] overflow-hidden transition"
                          data-heading-index="${idx}"
                        >
                          <!-- INDESTRUCTIBLE HEADING BAR (CAN NEVER BE DELETED BY BACKSPACE) -->
                          <div
                            data-toggle-heading="${idx}"
                            class="esv-rich-heading-banner flex items-center justify-between px-4 py-2.5 bg-[#20201D] border-b border-[#2A2A27] cursor-pointer select-none hover:bg-[#262623] transition"
                          >
                            <div class="flex items-center gap-2.5">
                              <span class="rich-heading-toggle-icon font-mono text-xs text-[#8C8A84] w-4 text-center">
                                ${isCol ? "▶" : "▼"}
                              </span>
                              <span class="w-5 h-5 rounded bg-[#272724] text-[#A19E97] font-mono text-[11px] flex items-center justify-center">
                                ${idx + 1}
                              </span>
                              <h4 class="font-serif font-semibold text-sm md:text-base text-[#DBCFB3]">
                                ${block.heading}
                              </h4>
                              ${
                                block.verses
                                  ? `<span class="text-xs font-mono text-[#7B7974] font-normal">(${block.verses})</span>`
                                  : ""
                              }
                            </div>
                          </div>

                          <!-- PROTECTED BULLETED LIST EDITOR CANVAS FOR THIS SECTION -->
                          <div
                            data-section-body="${idx}"
                            class="esv-rich-heading-body ${isCol ? "hidden" : ""}"
                          >
                            <div
                              contenteditable="true"
                              spellcheck="false"
                              data-section-editor="${idx}"
                              placeholder="Outline what happened under '${
                                block.heading
                              }'... Click '• Bulleted List' above or press Tab to indent sub-bullets."
                              class="section-bullet-canvas p-4 text-[#EAE8E2] font-sans text-sm md:text-base leading-[1.8] outline-none min-h-[70px] focus:bg-[#1C1C1A] transition"
                            >
                              <ul style="list-style-type: disc; margin-left: 1.5rem;">
                                ${pts
                                  .map(
                                    (p) =>
                                      `<li>${
                                        (p || "")
                                          .replace(/^•\s*/, "")
                                          .replace(/</g, "&lt;")
                                          .replace(/>/g, "&gt;") || "<br>"
                                      }</li>`
                                  )
                                  .join("")}
                              </ul>
                            </div>
                          </div>
                        </div>
                      `;
                    })
                    .join("")}
                  </div>
                </div>

        <!-- COLUMN 2 / PANEL B: BIBLE SCRIPTURE READER -->
        <div class="h-full overflow-y-auto p-8 bg-[#151513] flex flex-col">
          <!-- Quiet Bible Reader Header -->
          <div class="flex items-center justify-between border-b border-[#242422] pb-2 shrink-0">
            <span class="text-xs font-mono uppercase tracking-wider text-[#A19E97]">
              ESV Scripture • ${selectedBook.name} ${chapterNum}
            </span>
            <span class="text-[11px] font-mono text-[#7B7974]">
              Click any verse number badge to quote
            </span>
          </div>

          <!-- Scripture Reader Display -->
          <div class="flex-1 pt-4">
            ${
              isLoadingESV
                ? `
                    <div class="flex flex-col items-center justify-center py-20 text-xs text-[#8C8A84] space-y-2">
                      <div>Fetching ${selectedBook.name} ${chapterNum} from official ESV API...</div>
                    </div>
                  `
                : esvErrorMessage
                ? `
                    <div class="text-xs text-[#E57373] py-4">
                      ${esvErrorMessage}
                    </div>
                  `
                : chData.chapterScripture && chData.chapterScripture.trim()
                ? `
                    <div
                      id="scripture-reader-display"
                      class="font-serif text-base leading-[1.8] text-[#EAE8E2] space-y-3"
                    >${formatESVTextToHTML(chData.chapterScripture)}</div>
                  `
                : `
                    <div class="text-xs text-[#8C8A84] py-8">
                      Loading scripture...
                    </div>
                  `
            }
          </div>
        </div>
      </div>
    </div>
  `;
}

// --- FILE: src/main.js ---









// Global map of collapsed states for headings
window.collapsedHeadingsMap = window.collapsedHeadingsMap || {};

class BibleOutlineStudio {
  constructor() {
    this.data = loadOutlineStorage();
    this.selectedBookId = "GEN";
    this.selectedChapterNum = 1;
    this.activeView = "chapter-outliner"; // 'chapter-outliner' (side-by-side) | 'book-rollup'
    this.splitViewMode = "split"; // 'split' | 'outline' | 'scripture'
    this.isCollapsed = false;

    // SSO & Cloud Sync state
    this.googleUser = null;
    this.cloudSyncStatus = "";

    // Loading & error state for auto-loading ESV
    this.isLoadingESV = false;
    this.esvErrorMessage = null;

    // Sidebar filters
    this.filterTestament = "ALL";
    this.searchQuery = "";

    this.rootElement = document.getElementById("app");
    this.render();
    this.autoLoadESVForCurrentChapter(true);

    // Listen for persisted Google SSO sign-in session
    listenForAuthChanges((user) => {
      this.googleUser = user;
      if (user) {
        this.cloudSyncStatus = `Synced as ${user.displayName || user.email}`;
        this.syncCloudOutlinesWithLocal(user);
      } else {
        this.cloudSyncStatus = "Not signed in";
      }
      this.render();
    });
  }

  // Two-way synchronization between Firestore cloud outlines & local storage
  async syncCloudOutlinesWithLocal(user) {
    if (!user) return;
    try {
      const cloudData = await loadOutlinesFromCloud(user);
      if (cloudData && cloudData.chapters) {
        let merged = false;
        for (const [cid, ch] of Object.entries(cloudData.chapters)) {
          if (!ch) continue;
          if (!this.data.chapters[cid]) {
            this.data.chapters[cid] = { headingBlocks: [], status: "in-progress" };
          }
          if (ch.takeaway) {
            this.data.chapters[cid].takeaway = ch.takeaway;
          }
          const cloudSections = ch.sections || ch.headingBlocks || [];
          cloudSections.forEach((cs, sIdx) => {
            let match = this.data.chapters[cid].headingBlocks.find(
              (hb) => hb.heading && hb.heading.toLowerCase() === cs.heading.toLowerCase()
            );
            if (!match) {
              match = this.data.chapters[cid].headingBlocks[sIdx];
            }
            if (match) {
              match.points = Array.isArray(cs.points) ? cs.points : [];
            } else {
              this.data.chapters[cid].headingBlocks.push({
                heading: cs.heading,
                points: Array.isArray(cs.points) ? cs.points : []
              });
            }
          });
          merged = true;
        }
        if (merged) {
          saveOutlineStorage(this.data);
          this.render();
        }
      }
      await saveOutlinesToCloud(user, this.data);
    } catch (err) {
      console.warn("Cloud sync error:", err);
    }
  }

  notifyDataChanged() {
    const saveBadge = document.getElementById("editor-save-indicator");
    if (saveBadge) {
      saveBadge.innerHTML = `<span class="text-[#A19E97]">⏳</span><span class="text-[#A19E97]">Saving...</span>`;
    }
    debouncedSaveOutlineStorage(this.data, 200);
    setTimeout(() => {
      if (saveBadge && !this.googleUser) {
        saveBadge.innerHTML = `<span class="text-[#34A853]">✓</span><span class="text-[#34A853]">Saved locally</span>`;
      }
    }, 300);

    if (this.googleUser) {
      debouncedCloudAutoSave(
        this.googleUser,
        this.data,
        (status) => {
          this.cloudSyncStatus = status;
          const ssoBtn = document.getElementById("open-cloud-sso-btn");
          if (ssoBtn) {
            ssoBtn.innerHTML = `<span class="text-[10px]">🟢</span><span>${
              this.googleUser.displayName || "Google"
            } • ${status}</span>`;
          }
          if (saveBadge && status.includes("Auto-saved")) {
            saveBadge.innerHTML = `<span class="text-[#34A853]">🟢</span><span class="text-[#34A853]">Saved to cloud</span>`;
          }
        },
        1000
      );
    }
  }

  getSelectedBook() {
    return getBookById(this.selectedBookId) || BIBLE_BOOKS[0];
  }

  // Synchronize headingBlocks with ESV Scripture text
  syncHeadingBlocksForChapter(chKey, text, bookName, chNum) {
    if (!text) return;
    const extracted = extractESVHeadings(text, `${bookName} ${chNum}`);
    const existing = Array.isArray(this.data.chapters[chKey]?.headingBlocks)
      ? this.data.chapters[chKey].headingBlocks
      : [];

    const synced = extracted.map((h, idx) => {
      const matchTitle = existing.find(
        (eb) => eb.heading.toLowerCase() === h.heading.toLowerCase() && !eb.heading.includes("Overview")
      );
      const matchIdx = existing[idx];
      const pts = matchTitle?.points || matchIdx?.points || [""];
      const nts = matchTitle?.notes || matchIdx?.notes || "";
      return {
        heading: h.heading,
        verses: h.verses,
        notes: nts,
        points: pts
      };
    });

    const currentRichHTML = this.data.chapters[chKey]?.chapterOutlineRichHTML;
    const currentStatus = this.data.chapters[chKey]?.status || "empty";

    if (!this.data.chapters[chKey]) {
      this.data.chapters[chKey] = {
        headingBlocks: synced,
        chapterScripture: text,
        status: currentStatus,
        chapterOutlineRichHTML: currentRichHTML
      };
    } else {
      this.data.chapters[chKey].headingBlocks = synced;
      if (currentRichHTML) {
        this.data.chapters[chKey].chapterOutlineRichHTML = currentRichHTML;
      }
    }
  }

  // Auto-loads ESV text for the current chapter and syncs section headings
  async autoLoadESVForCurrentChapter(forceRefresh = false) {
    const book = this.getSelectedBook();
    const chKey = `${book.id}-${this.selectedChapterNum}`;
    const chData = this.data.chapters[chKey] || {};

    if (!forceRefresh && chData.chapterScripture && chData.chapterScripture.trim().length > 0) {
      this.syncHeadingBlocksForChapter(chKey, chData.chapterScripture, book.name, this.selectedChapterNum);
      return;
    }

    this.isLoadingESV = true;
    this.esvErrorMessage = null;
    this.render();

    try {
      const text = await fetchESVChapter(book.name, this.selectedChapterNum);
      if (!this.data.chapters[chKey]) {
        this.data.chapters[chKey] = {
          headingBlocks: [],
          chapterScripture: "",
          takeaway: "",
          status: "empty"
        };
      }
      this.data.chapters[chKey].chapterScripture = text;
      this.syncHeadingBlocksForChapter(chKey, text, book.name, this.selectedChapterNum);
      saveOutlineStorage(this.data);
    } catch (err) {
      console.warn("Failed to auto-load ESV chapter:", err);
      this.esvErrorMessage = err.message || "Could not connect to ESV API.";
    } finally {
      this.isLoadingESV = false;
      this.render();
    }
  }

  // Save active editor canvas back to data state synchronously before changing chapter/book
  saveActiveChapterEditorBeforeSwitch() {
    const richEditor = document.getElementById("chapter-rich-outline-editor");
    if (!richEditor) return;

    const chKey = `${this.selectedBookId}-${this.selectedChapterNum}`;
    if (!this.data.chapters[chKey]) {
      this.data.chapters[chKey] = { headingBlocks: [], status: "empty" };
    }

    const canvases = richEditor.querySelectorAll(".section-bullet-canvas");
    canvases.forEach((canvas) => {
      const hIdx = parseInt(canvas.getAttribute("data-section-editor"), 10);
      const block = this.data.chapters[chKey].headingBlocks[hIdx];
      if (block) {
        const lis = Array.from(canvas.querySelectorAll("li"))
          .map((li) => li.innerText.trim())
          .filter((p) => p.length > 0);
        block.points = lis;
        block.notes = lis.join("\n");
      }
    });

    saveOutlineStorage(this.data);
  }

  // Synchronized step to previous chapter / previous book
  stepToPrevChapter() {
    this.saveActiveChapterEditorBeforeSwitch();
    const book = this.getSelectedBook();
    if (this.selectedChapterNum > 1) {
      this.selectedChapterNum--;
      this.render();
      this.autoLoadESVForCurrentChapter();
    } else {
      const bookIdx = BIBLE_BOOKS.findIndex((b) => b.id === book.id);
      if (bookIdx > 0) {
        const prevBook = BIBLE_BOOKS[bookIdx - 1];
        this.selectedBookId = prevBook.id;
        this.selectedChapterNum = prevBook.chapterCount;
        this.render();
        this.autoLoadESVForCurrentChapter();
      }
    }
  }

  // Synchronized step to next chapter / next book side-by-side
  stepToNextChapter() {
    this.saveActiveChapterEditorBeforeSwitch();
    const book = this.getSelectedBook();
    if (this.selectedChapterNum < book.chapterCount) {
      this.selectedChapterNum++;
      this.render();
      this.autoLoadESVForCurrentChapter();
    } else {
      const bookIdx = BIBLE_BOOKS.findIndex((b) => b.id === book.id);
      if (bookIdx < BIBLE_BOOKS.length - 1) {
        const nextBook = BIBLE_BOOKS[bookIdx + 1];
        this.selectedBookId = nextBook.id;
        this.selectedChapterNum = 1;
        this.render();
        this.autoLoadESVForCurrentChapter();
      }
    }
  }

  render() {
    try {
      console.log("📖 Rendering Bible Outline Studio...");
      this.rootElement = document.getElementById("app");
      if (!this.rootElement) {
        console.warn("⚠️ #app element not found! Creating or falling back to document.body...");
        this.rootElement = document.createElement("div");
        this.rootElement.id = "app";
        document.body.appendChild(this.rootElement);
      }

      const book = this.getSelectedBook();

      this.rootElement.innerHTML = `
        <div class="flex h-screen w-screen overflow-hidden bg-[#141413] font-sans text-[#EAE8E2]">
          <!-- Sidebar -->
          <div id="sidebar-container" class="h-full shrink-0">
            ${renderSidebar({
              selectedBookId: this.selectedBookId,
              filterTestament: this.filterTestament,
              searchQuery: this.searchQuery,
              data: this.data,
              isCollapsed: this.isCollapsed
            })}
          </div>

          <!-- Main Content Column -->
          <div class="flex-1 flex flex-col h-full overflow-hidden">
            <!-- Top Navbar -->
            ${renderTopNavbar({
              activeView: this.activeView,
              selectedBook: book,
              selectedChapterNum: this.selectedChapterNum,
              googleUser: this.googleUser,
              cloudSyncStatus: this.cloudSyncStatus
            })}

            <!-- Main Scrollable Canvas -->
            <main id="main-scroll-canvas" class="flex-1 flex flex-col overflow-hidden bg-[#161614]">
              ${
                this.activeView === "book-rollup"
                  ? renderBookRollupView({
                      selectedBook: book,
                      data: this.data
                    })
                  : renderChapterEditorView({
                      selectedBook: book,
                      chapterNum: this.selectedChapterNum,
                      splitViewMode: this.splitViewMode,
                      isLoadingESV: this.isLoadingESV,
                      esvErrorMessage: this.esvErrorMessage,
                      data: this.data
                    })
              }
            </main>
          </div>
        </div>
      `;

      this.attachEventListeners();
    } catch (err) {
      console.error("Studio Render Error:", err);
      this.rootElement.innerHTML = `
        <div class="h-screen w-screen flex flex-col items-center justify-center bg-[#141413] text-[#EAE8E2] p-8 space-y-5 font-mono">
          <div class="text-[#E57373] text-2xl font-bold flex items-center gap-2">
            <span>⚠️ Studio Render Error</span>
          </div>
          <div class="bg-[#1C1C1A] border border-[#2B2B28] p-4 rounded max-w-2xl w-full text-xs text-[#EAE8E2] whitespace-pre-wrap overflow-x-auto">
            ${err.stack || err.message}
          </div>
          <button id="reset-app-storage-btn" class="px-5 py-2.5 bg-[#C4B79C] hover:bg-[#DBCFB3] text-[#141413] rounded font-semibold transition">
            Reset Application Storage & Reload
          </button>
        </div>
      `;
      const resetBtn = document.getElementById("reset-app-storage-btn");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          localStorage.clear();
          window.location.reload();
        });
      }
    }
  }

  attachEventListeners() {
    const book = this.getSelectedBook();
    const chKey = `${this.selectedBookId}-${this.selectedChapterNum}`;

    // 1. Sidebar interactions
    const toggleSidebarBtn = document.getElementById("toggle-sidebar-btn");
    if (toggleSidebarBtn) {
      toggleSidebarBtn.addEventListener("click", () => {
        this.isCollapsed = !this.isCollapsed;
        this.render();
      });
    }

    const testamentBtns = document.querySelectorAll(".filter-testament-btn");
    testamentBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.filterTestament = btn.getAttribute("data-testament");
        this.render();
      });
    });

    const searchInput = document.getElementById("sidebar-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value;
        this.render();
      });
    }

    const bookCards = document.querySelectorAll(".book-nav-card");
    bookCards.forEach((card) => {
      card.addEventListener("click", () => {
        this.saveActiveChapterEditorBeforeSwitch();
        const bId = card.getAttribute("data-book-id");
        this.selectedBookId = bId;
        this.selectedChapterNum = 1;
        this.render();
        this.autoLoadESVForCurrentChapter();
      });
    });

    // 2. Navbar view switchers
    const studioViewBtns = document.querySelectorAll(".studio-view-btn");
    studioViewBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.saveActiveChapterEditorBeforeSwitch();
        this.activeView = btn.getAttribute("data-view");
        this.render();
      });
    });

    // Load example outlines button
    const demoBtn = document.getElementById("load-demo-btn");
    if (demoBtn) {
      demoBtn.addEventListener("click", () => {
        this.data = injectExampleOutlines(this.data);
        saveOutlineStorage(this.data);
        this.selectedBookId = "GEN";
        this.selectedChapterNum = 1;
        this.activeView = "chapter-outliner";
        this.render();
        this.autoLoadESVForCurrentChapter();
      });
    }

    // Export button
    const exportCurMd = document.getElementById("export-current-book-btn");
    if (exportCurMd) {
      exportCurMd.addEventListener("click", () => {
        this.saveActiveChapterEditorBeforeSwitch();
        const md = exportToMarkdown(this.data, this.selectedBookId);
        this.downloadFile(`${book.shortName}_Outline.md`, md, "text/markdown");
      });
    }

    // Google SSO & Cloud Sync Modal
    const openSsoBtn = document.getElementById("open-cloud-sso-btn");
    const closeSsoBtn = document.getElementById("close-cloud-sso-modal-btn");
    const ssoModal = document.getElementById("cloud-sso-modal");

    if (openSsoBtn) {
      openSsoBtn.addEventListener("click", async () => {
        if (!this.googleUser) {
          try {
            openSsoBtn.disabled = true;
            openSsoBtn.innerHTML = `<span>⏳ Opening Google Sign-In...</span>`;
            const user = await signInWithGoogleSSO();
            this.googleUser = user;
            this.cloudSyncStatus = `Signed in as ${user.displayName || user.email}`;
            await this.syncCloudOutlinesWithLocal(user);
            this.render();
          } catch (err) {
            console.error("Google Sign-In Error:", err);
            alert(
              `Google Sign-In Error:\n${err.message}\n\nNote: If you are testing on Vercel, remember to add your Vercel domain (e.g., vercel.app) to console.firebase.google.com -> Authentication -> Settings -> Authorized domains.`
            );
            this.cloudSyncStatus = `Notice: ${err.message}`;
            this.render();
          }
        } else if (ssoModal) {
          ssoModal.classList.remove("hidden");
        }
      });
    }
    if (closeSsoBtn && ssoModal) {
      closeSsoBtn.addEventListener("click", () => {
        ssoModal.classList.add("hidden");
      });
    }

    const signInBtn = document.getElementById("sso-signin-google-btn");
    if (signInBtn) {
      signInBtn.addEventListener("click", async () => {
        try {
          signInBtn.disabled = true;
          signInBtn.innerHTML = `<span>⏳ Opening Google Pop-Up...</span>`;
          const user = await signInWithGoogleSSO();
          this.googleUser = user;
          this.cloudSyncStatus = `Signed in as ${user.displayName || user.email}`;
          await this.syncCloudOutlinesWithLocal(user);
          this.render();
        } catch (err) {
          console.error("Google SSO Error:", err);
          alert(
            `Google Pop-Up Error:\n${err.message}\n\nTip: You can try clicking "Sign in via Full Page Redirect" directly below.`
          );
          this.cloudSyncStatus = `Notice: ${err.message}`;
          this.render();
        }
      });
    }

    const redirectBtn = document.getElementById("sso-signin-google-redirect-btn");
    if (redirectBtn) {
      redirectBtn.addEventListener("click", async () => {
        redirectBtn.disabled = true;
        redirectBtn.innerHTML = `<span>Redirecting to Google...</span>`;
        await signInWithGoogleRedirect();
      });
    }

    const signOutBtn = document.getElementById("sso-signout-btn");
    if (signOutBtn) {
      signOutBtn.addEventListener("click", async () => {
        await signOutUser();
        this.googleUser = null;
        this.cloudSyncStatus = "Signed out of Google SSO.";
        this.render();
      });
    }

    const backupBtn = document.getElementById("sso-backup-cloud-btn");
    if (backupBtn) {
      backupBtn.addEventListener("click", async () => {
        try {
          this.cloudSyncStatus = "Backing up outlines to Firebase Cloud...";
          this.render();
          await saveOutlinesToCloud(this.googleUser, this.data);
          this.cloudSyncStatus = "✓ All outlines backed up to Firebase Cloud!";
          this.render();
        } catch (err) {
          this.cloudSyncStatus = `Error backing up: ${err.message}`;
          this.render();
        }
      });
    }

    const restoreBtn = document.getElementById("sso-restore-cloud-btn");
    if (restoreBtn) {
      restoreBtn.addEventListener("click", async () => {
        try {
          this.cloudSyncStatus = "Restoring outlines from Firebase Cloud...";
          this.render();
          const cloudData = await loadOutlinesFromCloud(this.googleUser);
          if (cloudData) {
            this.data = { ...this.data, ...cloudData };
            saveOutlineStorage(this.data);
            this.cloudSyncStatus = "✓ Outlines restored from Firebase Cloud!";
            this.render();
          } else {
            this.cloudSyncStatus = "No cloud backup found for this account yet.";
            this.render();
          }
        } catch (err) {
          this.cloudSyncStatus = `Error restoring: ${err.message}`;
          this.render();
        }
      });
    }

    // Overall Book Summary Box toggle & auto-save
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
        if (!this.data.books[this.selectedBookId]) {
          this.data.books[this.selectedBookId] = { bookSummary: "" };
        }
        this.data.books[this.selectedBookId].bookSummary = e.target.value;
        this.notifyDataChanged();
      });
    }

    // 3. Book Rollup View interactions
    const bookSummaryArea = document.getElementById("book-summary-textarea");
    if (bookSummaryArea) {
      bookSummaryArea.addEventListener("input", (e) => {
        if (!this.data.books[this.selectedBookId]) {
          this.data.books[this.selectedBookId] = { bookSummary: "" };
        }
        this.data.books[this.selectedBookId].bookSummary = e.target.value;
        this.notifyDataChanged();
      });
    }

    const openChapterEditorBtns = document.querySelectorAll(".open-chapter-editor-btn");
    openChapterEditorBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.saveActiveChapterEditorBeforeSwitch();
        const ch = parseInt(btn.getAttribute("data-chapter-num"), 10);
        this.selectedChapterNum = ch;
        this.activeView = "chapter-outliner";
        this.render();
        this.autoLoadESVForCurrentChapter();
      });
    });

    const quickChapterPills = document.querySelectorAll(".quick-chapter-pill");
    quickChapterPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        this.saveActiveChapterEditorBeforeSwitch();
        const ch = parseInt(pill.getAttribute("data-quick-ch"), 10);
        this.selectedChapterNum = ch;
        this.render();
        this.autoLoadESVForCurrentChapter();
      });
    });

    // 4. Chapter Outline & Side-by-Side Scripture Reader interactions
    // Toggle Collapse / Expand per Heading Bar
    const toggleHeadingBars = document.querySelectorAll(".toggle-heading-bar");
    toggleHeadingBars.forEach((bar) => {
      bar.addEventListener("click", (e) => {
        // Prevent toggle if clicking bullet button
        if (e.target.closest(".heading-insert-bullet-btn")) return;
        const idx = parseInt(bar.getAttribute("data-toggle-heading"), 10);
        if (!window.collapsedHeadingsMap[chKey]) {
          window.collapsedHeadingsMap[chKey] = {};
        }
        window.collapsedHeadingsMap[chKey][idx] = !window.collapsedHeadingsMap[chKey][idx];
        this.render();
      });
    });

    // Expand All / Collapse All buttons
    const expandAllBtn = document.getElementById("expand-all-headings-btn");
    if (expandAllBtn) {
      expandAllBtn.addEventListener("click", () => {
        window.collapsedHeadingsMap[chKey] = {};
        this.render();
      });
    }

    const collapseAllBtn = document.getElementById("collapse-all-headings-btn");
    if (collapseAllBtn) {
      collapseAllBtn.addEventListener("click", () => {
        const blocks = this.data.chapters[chKey]?.headingBlocks || [];
        if (!window.collapsedHeadingsMap[chKey]) {
          window.collapsedHeadingsMap[chKey] = {};
        }
        blocks.forEach((_, idx) => {
          window.collapsedHeadingsMap[chKey][idx] = true;
        });
        this.render();
      });
    }

    // Add Custom Heading button
    const addCustomHeadingBtn = document.getElementById("add-custom-heading-btn");
    if (addCustomHeadingBtn) {
      addCustomHeadingBtn.addEventListener("click", () => {
        const title = prompt("Enter new section heading:");
        if (!title || !title.trim()) return;
        if (!this.data.chapters[chKey]) {
          this.data.chapters[chKey] = { headingBlocks: [] };
        }
        if (!Array.isArray(this.data.chapters[chKey].headingBlocks)) {
          this.data.chapters[chKey].headingBlocks = [];
        }
        this.data.chapters[chKey].headingBlocks.push({
          heading: title.trim(),
          verses: "custom",
          notes: ""
        });
        this.notifyDataChanged();
        this.render();
      });
    }

    // Refresh ESV button
    const refreshESVBtn = document.getElementById("refresh-esv-btn");
    if (refreshESVBtn) {
      refreshESVBtn.addEventListener("click", () => {
        this.autoLoadESVForCurrentChapter(true);
      });
    }

    // Helper to guarantee a bulleted list (<ul><li>...</li></ul>) in a section canvas
    const ensureSectionBulletedList = (canvas) => {
      if (!canvas) return;
      const hasUl = canvas.querySelector("ul, ol");
      if (!hasUl) {
        const text = canvas.textContent.trim();
        canvas.innerHTML = `<ul style="list-style-type: disc; margin-left: 1.5rem;"><li>${
          text || "<br>"
        }</li></ul>`;
      }
      // Place cursor inside the list item
      const li = canvas.querySelector("li");
      if (li) {
        canvas.focus();
        const sel = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(li);
        range.collapse(false);
        if (sel) {
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    };

    // Dedicated Bulleted List Canvases under Indestructible Section Headers
    const sectionCanvases = document.querySelectorAll(".section-bullet-canvas");
    sectionCanvases.forEach((canvas) => {
      // Sub-bullet Tab / Shift+Tab keyboard shortcuts like Google Docs
      canvas.addEventListener("keydown", (e) => {
        if (e.key === "Tab") {
          e.preventDefault();
          if (e.shiftKey) {
            document.execCommand("outdent", false, null);
          } else {
            document.execCommand("indent", false, null);
          }
          canvas.dispatchEvent(new Event("input"));
        }
      });

      // Auto-save on input & auto-convert start of line asterisk (*) or dash (-) to bullet list
      canvas.addEventListener("input", () => {
        if (!canvas.querySelector("ul, ol")) {
          const text = canvas.textContent;
          if (/^[-*]\s/.test(text)) {
            ensureSectionBulletedList(canvas);
          }
        }

        // Style sub-bullets cleanly with open circle markers
        const subUls = canvas.querySelectorAll("ul ul");
        subUls.forEach((subUl) => {
          subUl.style.listStyleType = "circle";
          subUl.style.marginLeft = "1.5rem";
        });

        const editor = document.getElementById("chapter-rich-outline-editor");
        if (editor) {
          if (!this.data.chapters[chKey]) {
            this.data.chapters[chKey] = { headingBlocks: [], status: "empty" };
          }
          const hIdx = parseInt(canvas.getAttribute("data-section-editor"), 10);
          const block = this.data.chapters[chKey].headingBlocks[hIdx];
          if (block) {
            const lis = Array.from(canvas.querySelectorAll("li"))
              .map((li) => li.innerText.trim())
              .filter((p) => p.length > 0);
            block.points = lis;
            block.notes = lis.join("\n");
          }
          if (this.data.chapters[chKey].status === "empty" && canvas.textContent.trim().length > 0) {
            this.data.chapters[chKey].status = "in-progress";
          }
          this.notifyDataChanged();
        }
      });
    });

    // Ensure Bullet List button on each section header bar
    const ensureBulletBtns = document.querySelectorAll("button[data-ensure-bullet]");
    ensureBulletBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const idx = btn.getAttribute("data-ensure-bullet");
        const canvas = document.querySelector(`.section-bullet-canvas[data-section-editor="${idx}"]`);
        if (canvas) {
          ensureSectionBulletedList(canvas);
          const editor = document.getElementById("chapter-rich-outline-editor");
          if (editor) {
            if (!this.data.chapters[chKey]) {
              this.data.chapters[chKey] = { headingBlocks: [] };
            }
            this.data.chapters[chKey].chapterOutlineRichHTML = editor.innerHTML;
            this.notifyDataChanged();
          }
        }
      });
    });

    // Collapse/Expand Section Headings by clicking banner
    const headingBanners = document.querySelectorAll(".esv-rich-heading-banner");
    headingBanners.forEach((banner) => {
      banner.addEventListener("click", () => {
        const body = banner.nextElementSibling;
        const icon = banner.querySelector(".rich-heading-toggle-icon");
        if (body && body.classList.contains("esv-rich-heading-body")) {
          body.classList.toggle("hidden");
          if (icon) {
            icon.textContent = body.classList.contains("hidden") ? "▶" : "▼";
          }
        }
      });
    });

    // Google Docs Rich Toolbar formatting buttons
    const richToolbarBtns = document.querySelectorAll("button[data-rich-command]");
    richToolbarBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const cmd = btn.getAttribute("data-rich-command");
        const activeCanvas =
          document.activeElement?.matches(".section-bullet-canvas")
            ? document.activeElement
            : document.querySelector(".section-bullet-canvas");

        if (activeCanvas) {
          activeCanvas.focus();
          if (cmd === "insertUnorderedList") {
            // Guarantee a bulleted list is created/active
            ensureSectionBulletedList(activeCanvas);
          } else {
            document.execCommand(cmd, false, null);
          }
          const editor = document.getElementById("chapter-rich-outline-editor");
          if (editor) {
            if (!this.data.chapters[chKey]) {
              this.data.chapters[chKey] = { headingBlocks: [] };
            }
            this.data.chapters[chKey].chapterOutlineRichHTML = editor.innerHTML;
            this.notifyDataChanged();
          }
        }
      });
    });

    // Toggle all ESV section headings inside the rich textbox
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

    // Insert / reset ESV headings inside the rich textbox
    const reinsertHeadingsBtn = document.getElementById("reinsert-esv-headings-btn");
    if (reinsertHeadingsBtn) {
      reinsertHeadingsBtn.addEventListener("click", () => {
        const book = this.getSelectedBook();
        const blocks = this.data.chapters[chKey]?.headingBlocks || [];
        if (blocks.length === 0) return;

        const newHTML = blocks
          .map(
            (block, idx) => `
              <div class="esv-rich-heading-wrap my-3 first:mt-0" data-heading-index="${idx}">
                <div
                  contenteditable="false"
                  class="esv-rich-heading-banner flex items-center justify-between px-3.5 py-2 bg-[#20201D] border border-[#2F2F2B] rounded cursor-pointer select-none hover:bg-[#272723] transition"
                >
                  <div class="flex items-center gap-2">
                    <span class="rich-heading-toggle-icon font-mono text-xs text-[#8C8A84]">▼</span>
                    <h4 class="font-serif font-bold text-[#DBCFB3] text-sm md:text-base">
                      ${block.heading}
                    </h4>
                    ${
                      block.verses
                        ? `<span class="text-xs font-mono text-[#7B7974] font-normal">(${block.verses})</span>`
                        : ""
                    }
                  </div>
                  <span class="text-[10px] font-mono text-[#6D6B66] uppercase tracking-wider">
                    Section Heading
                  </span>
                </div>
                <div class="esv-rich-heading-body pt-2.5 pb-1">
                  <ul style="list-style-type: disc; margin-left: 1.5rem;">
                    <li><br></li>
                  </ul>
                </div>
              </div>
            `
          )
          .join("");

        if (richEditor) {
          richEditor.innerHTML = newHTML;
          if (!this.data.chapters[chKey]) {
            this.data.chapters[chKey] = { headingBlocks: [] };
          }
          this.data.chapters[chKey].chapterOutlineRichHTML = newHTML;
          this.notifyDataChanged();
        }
      });
    }

    // Interactive Verse badges click handler
    const verseBadges = document.querySelectorAll(".esv-verse-num");
    verseBadges.forEach((badge) => {
      badge.addEventListener("click", () => {
        const vNum = badge.getAttribute("data-verse");
        if (!richEditor) return;

        richEditor.focus();
        const sel = window.getSelection();
        if (sel && sel.getRangeAt && sel.rangeCount > 0) {
          const range = sel.getRangeAt(0);
          const textNode = document.createTextNode(` (v${vNum}) `);
          range.insertNode(textNode);
          range.setStartAfter(textNode);
          range.setEndAfter(textNode);
          sel.removeAllRanges();
          sel.addRange(range);
        } else {
          richEditor.innerHTML += ` (v${vNum}) `;
        }

        if (!this.data.chapters[chKey]) {
          this.data.chapters[chKey] = { headingBlocks: [] };
        }
        this.data.chapters[chKey].chapterOutlineRichHTML = richEditor.innerHTML;
        this.notifyDataChanged();
      });
    });

    // Chapter Takeaway
    const chapterTakeawayInput = document.getElementById("chapter-takeaway-input");
    if (chapterTakeawayInput) {
      chapterTakeawayInput.addEventListener("input", (e) => {
        if (!this.data.chapters[chKey]) {
          this.data.chapters[chKey] = { headingBlocks: [] };
        }
        this.data.chapters[chKey].takeaway = e.target.value;
        this.notifyDataChanged();
      });
    }

    // Split view switcher buttons
    const splitBtns = document.querySelectorAll(".split-mode-btn");
    splitBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.splitViewMode = btn.getAttribute("data-split-mode");
        this.render();
      });
    });

    // Previous & Next Chapter stepping buttons
    const prevChBtn = document.getElementById("prev-chapter-btn");
    if (prevChBtn) {
      prevChBtn.addEventListener("click", () => this.stepToPrevChapter());
    }

    const nextChBtn = document.getElementById("next-chapter-btn");
    if (nextChBtn) {
      nextChBtn.addEventListener("click", () => this.stepToNextChapter());
    }

    // Keyboard shortcuts: Left / Right arrow
    const handleKeyDown = (e) => {
      const tag = e.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (this.activeView === "chapter-outliner") {
        if (e.key === "ArrowRight") {
          this.stepToNextChapter();
        } else if (e.key === "ArrowLeft") {
          this.stepToPrevChapter();
        }
      }
    };
    window.removeEventListener("keydown", window.appNavListener);
    window.appNavListener = handleKeyDown;
    window.addEventListener("keydown", window.appNavListener);
  }

  downloadFile(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

// Initialize app safely
function initApp() {
  if (!window.bibleOutlineApp) {
    window.bibleOutlineApp = new BibleOutlineStudio();
    preloadFirebaseSDK();
    console.log("⚡ window.bibleOutlineApp initialized successfully!");
  }
}

initApp();
window.addEventListener("DOMContentLoaded", initApp);
window.addEventListener("load", initApp);

