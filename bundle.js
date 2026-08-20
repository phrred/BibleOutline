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
      "Creation of the heavens and the earth",
      "The Fall of Man and the serpent in the Garden",
      "Cain and Abel",
      "The Great Flood and Noah's Ark",
      "The Tower of Babel"
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
      "The Abrahamic Covenant & Call",
      "The Binding of Isaac",
      "Jacob wrestling with God",
      "Joseph sold into slavery and exalted in Egypt",
      "Job's suffering and encounter with God"
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
      "The Burning Bush and the Ten Plagues of Egypt",
      "Crossing the Red Sea and the Ten Commandments",
      "The Tabernacle and Levitical offerings",
      "The Twelve Spies and Wilderness Wandering",
      "The Conquest of Jericho and the Promised Land"
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
      "Samuel anoints David and the Davidic Covenant",
      "Solomon dedicates the Temple in Jerusalem",
      "The Psalms: Prayers, laments, and praises",
      "Wisdom literature: Proverbs, Ecclesiastes, and Song of Solomon",
      "The Division of the Kingdom into Israel and Judah"
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
      "Prophetic warnings and New Covenant promises",
      "The Fall of Jerusalem and Babylonian Exile",
      "Rebuilding the Second Temple under Zerubbabel",
      "Esther's deliverance of the Jews in Persia",
      "Nehemiah rebuilding the walls of Jerusalem"
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
      "The Incarnation and Virgin Birth of Jesus",
      "The Sermon on the Mount and Parables of the Kingdom",
      "The Transfiguration and Miracles of Jesus",
      "The Crucifixion and Atonement on the Cross",
      "The Bodily Resurrection and Great Commission"
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
      "The Day of Pentecost and the birth of the Church",
      "The Conversion of Saul and Missionary Journeys",
      "The Jerusalem Council",
      "Paul's Epistles expounding gospel justification and life",
      "The General Epistles encouraging perseverance under trial"
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
      "Letters to the Seven Churches of Asia Minor",
      "The Lamb slain standing before the Throne",
      "The Seals, Trumpets, and Bowls of Judgment",
      "The Return of Christ and Final Defeat of Evil",
      "The New Heaven, New Earth, and New Jerusalem"
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
    chapters,
    quizHistory: [],
    bookMastery: {}
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
    if (!data.books) data.books = defaultData.books;
    if (!data.chapters) data.chapters = defaultData.chapters;
    if (!Array.isArray(data.quizHistory)) data.quizHistory = [];
    if (!data.bookMastery) data.bookMastery = {};

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
      const hasHeadingNotes = Array.isArray(chData?.headingBlocks) && chData.headingBlocks.some((b) => (b.notes && b.notes.trim()) || (Array.isArray(b.points) && b.points.length > 0));
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
  const {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
    signOut,
    onAuthStateChanged
  } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js");
  const {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    getDocs,
    collection,
    query,
    orderBy,
    limit,
    writeBatch,
    deleteDoc,
    serverTimestamp
  } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");

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
    getDocs,
    collection,
    query,
    orderBy,
    limit,
    writeBatch,
    deleteDoc,
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

// Clean and compact chapter outline data for lean, high-fidelity storage
function cleanChapterData(ch) {
  if (!ch) return null;
  const activeSections = Array.isArray(ch.headingBlocks)
    ? ch.headingBlocks
        .map((hb) => {
          const pts = Array.isArray(hb.points)
            ? hb.points.map((p) => (p || "").trim()).filter((p) => p.length > 0)
            : [];
          const notes = (hb.notes || "").trim();
          const verses = (hb.verses || "").trim();
          const heading = (hb.heading || "").trim();
          if (!heading && pts.length === 0 && !notes) return null;
          const block = { heading: heading || "Section" };
          if (verses) block.verses = verses;
          if (pts.length > 0) block.points = pts;
          if (notes) block.notes = notes;
          return block;
        })
        .filter(Boolean)
    : [];

  const takeaway = (ch.takeaway || "").trim();
  const richHTML = (ch.chapterOutlineRichHTML || "").trim();
  const status = ch.status && ch.status !== "empty" ? ch.status : null;
  const updatedAt = ch.updatedAt || null;

  const hasContent = activeSections.length > 0 || takeaway.length > 0 || richHTML.length > 0;
  if (!hasContent) return null;

  const compact = {};
  if (activeSections.length > 0) compact.headingBlocks = activeSections;
  if (takeaway) compact.takeaway = takeaway;
  if (richHTML) compact.chapterOutlineRichHTML = richHTML;
  if (status) compact.status = status;
  if (updatedAt) compact.updatedAt = updatedAt;
  return compact;
}

// Extract active content for a specific book to store in its own subcollection document
function extractBookData(bookId, localData) {
  if (!bookId || !localData) return null;
  const b = localData.books?.[bookId] || {};
  const bookSummary = (b.bookSummary || "").trim();
  const myBookTheme = (b.myBookTheme || "").trim();
  const updatedAt = b.updatedAt || Date.now();

  const chaptersMap = {};
  if (localData.chapters) {
    const prefix = `${bookId}-`;
    for (const [cid, ch] of Object.entries(localData.chapters)) {
      if (cid.startsWith(prefix)) {
        const cleaned = cleanChapterData(ch);
        if (cleaned) {
          chaptersMap[cid] = cleaned;
        }
      }
    }
  }

  const hasAnyChapters = Object.keys(chaptersMap).length > 0;
  const hasBookContent = bookSummary.length > 0 || myBookTheme.length > 0;

  if (!hasAnyChapters && !hasBookContent) {
    return null;
  }

  return {
    bookId,
    bookSummary,
    myBookTheme,
    updatedAt,
    chapters: chaptersMap
  };
}

// Save only a single book document to /users/{uid}/books/{bookId} (Option A: Granular Save)
async function saveBookToCloud(user, bookId, localData) {
  if (!user || !user.uid || !bookId) return false;
  const { db, doc, setDoc } = await ensureFirebase();

  const bookData = extractBookData(bookId, localData);
  const bookDocRef = doc(db, "users", user.uid, "books", bookId);

  if (bookData) {
    const payload = JSON.parse(JSON.stringify(bookData));
    await setDoc(bookDocRef, payload, { merge: true });
  }

  // Update root document metadata for cloud sync state
  try {
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(
      userDocRef,
      {
        email: user.email || "",
        displayName: user.displayName || "User",
        lastSyncedTimestamp: Date.now(),
        storageModel: "book_subcollections_v2",
        lastActiveBookId: bookId
      },
      { merge: true }
    );
  } catch (_) {}

  return true;
}

// Granular per-book debounced cloud auto-save
const bookSaveTimers = new Map();
function debouncedCloudAutoSaveBook(user, bookId, localData, onStatusUpdate, delayMs = 900) {
  if (!user || !user.uid || !bookId) return;

  if (bookSaveTimers.has(bookId)) {
    clearTimeout(bookSaveTimers.get(bookId));
  }

  if (onStatusUpdate) {
    onStatusUpdate(`☁️ Saving ${bookId}...`);
  }

  const timer = setTimeout(async () => {
    bookSaveTimers.delete(bookId);
    try {
      await saveBookToCloud(user, bookId, localData);
      if (onStatusUpdate) {
        onStatusUpdate(`☁️ ${bookId} saved to cloud`);
      }
    } catch (err) {
      console.warn(`Cloud auto-save error for ${bookId}:`, err);
      if (onStatusUpdate) {
        const msg = err.message || "Firebase offline";
        onStatusUpdate(`⚠️ ${msg.slice(0, 32)}`);
      }
    }
  }, delayMs);

  bookSaveTimers.set(bookId, timer);
}

// Save a completed diagnostic quiz record into /users/{uid}/quizzes/{quizId}
async function saveQuizToCloud(user, quizRecord) {
  if (!user || !user.uid || !quizRecord) return false;
  const qId = quizRecord.id || `quiz_${quizRecord.date || Date.now()}`;
  const { db, doc, setDoc } = await ensureFirebase();
  const quizDocRef = doc(db, "users", user.uid, "quizzes", qId);
  const payload = JSON.parse(JSON.stringify({ ...quizRecord, id: qId }));
  await setDoc(quizDocRef, payload, { merge: true });
  return true;
}

// Save book mastery ratings into /users/{uid}/meta/mastery
async function saveMasteryToCloud(user, bookMastery) {
  if (!user || !user.uid || !bookMastery) return false;
  const { db, doc, setDoc } = await ensureFirebase();
  const masteryDocRef = doc(db, "users", user.uid, "meta", "mastery");
  const payload = JSON.parse(JSON.stringify({ bookMastery, updatedAt: Date.now() }));
  await setDoc(masteryDocRef, payload, { merge: true });
  return true;
}

// Delete a specific quiz record from /users/{uid}/quizzes/{quizId}
async function deleteQuizFromCloud(user, quizId) {
  if (!user || !user.uid || !quizId) return false;
  try {
    const { db, doc, deleteDoc } = await ensureFirebase();
    const quizDocRef = doc(db, "users", user.uid, "quizzes", quizId);
    await deleteDoc(quizDocRef);
    return true;
  } catch (err) {
    console.warn("Delete quiz from cloud error:", err);
    return false;
  }
}

// Clear all quiz records in /users/{uid}/quizzes
async function clearAllQuizzesFromCloud(user) {
  if (!user || !user.uid) return false;
  try {
    const { db, doc, deleteDoc, getDocs, collection } = await ensureFirebase();
    const quizzesColRef = collection(db, "users", user.uid, "quizzes");
    const quizzesSnap = await getDocs(quizzesColRef);
    const deletePromises = [];
    quizzesSnap.forEach((qDoc) => {
      deletePromises.push(deleteDoc(qDoc.ref));
    });
    await Promise.all(deletePromises);
    return true;
  } catch (err) {
    console.warn("Clear quizzes from cloud error:", err);
    return false;
  }
}

// Full backup of all active books, quizzes, and mastery across subcollections
async function saveAllOutlinesToCloud(user, localData) {
  if (!user || !user.uid) return false;
  const { db, doc, setDoc } = await ensureFirebase();

  // 1. Root user doc
  const userDocRef = doc(db, "users", user.uid);
  await setDoc(
    userDocRef,
    {
      email: user.email || "",
      displayName: user.displayName || "User",
      lastSyncedTimestamp: Date.now(),
      storageModel: "book_subcollections_v2"
    },
    { merge: true }
  );

  // 2. Discover and save all active books to /users/{uid}/books/{bookId}
  const activeBookIds = new Set();
  if (localData.books) {
    Object.keys(localData.books).forEach((bid) => activeBookIds.add(bid));
  }
  if (localData.chapters) {
    Object.keys(localData.chapters).forEach((cid) => {
      const bid = cid.split("-")[0];
      if (bid) activeBookIds.add(bid);
    });
  }

  const bookSavePromises = [];
  for (const bid of activeBookIds) {
    const bookData = extractBookData(bid, localData);
    if (bookData) {
      const bookDocRef = doc(db, "users", user.uid, "books", bid);
      bookSavePromises.push(setDoc(bookDocRef, JSON.parse(JSON.stringify(bookData)), { merge: true }));
    }
  }
  await Promise.all(bookSavePromises);

  // 3. Save quiz history (up to 50 items) to /users/{uid}/quizzes/{quizId}
  if (Array.isArray(localData.quizHistory) && localData.quizHistory.length > 0) {
    const quizPromises = localData.quizHistory.slice(0, 50).map((q) => {
      const qId = q.id || `quiz_${q.date || Date.now()}`;
      const qRef = doc(db, "users", user.uid, "quizzes", qId);
      return setDoc(qRef, JSON.parse(JSON.stringify({ ...q, id: qId })), { merge: true });
    });
    await Promise.all(quizPromises);
  }

  // 4. Save mastery to /users/{uid}/meta/mastery
  if (localData.bookMastery && Object.keys(localData.bookMastery).length > 0) {
    await saveMasteryToCloud(user, localData.bookMastery);
  }

  return true;
}

// Load all outlines from subcollections, with backward-compatibility for legacy v1 single-doc data
async function loadOutlinesFromCloud(user) {
  if (!user || !user.uid) return null;
  const { db, doc, getDoc, getDocs, collection } = await ensureFirebase();

  const userDocRef = doc(db, "users", user.uid);
  const rootSnap = await getDoc(userDocRef);
  const rootData = rootSnap.exists() ? rootSnap.data() : {};

  // Fetch books subcollection
  const booksColRef = collection(db, "users", user.uid, "books");
  const booksSnap = await getDocs(booksColRef);

  const booksMap = {};
  const chaptersMap = {};

  if (!booksSnap.empty) {
    // Loaded from Option A Subcollections!
    booksSnap.forEach((bDoc) => {
      const bData = bDoc.data();
      const bid = bDoc.id || bData.bookId;
      if (bid) {
        booksMap[bid] = {
          bookSummary: bData.bookSummary || "",
          myBookTheme: bData.myBookTheme || "",
          updatedAt: bData.updatedAt || null
        };
        if (bData.chapters && typeof bData.chapters === "object") {
          for (const [cid, ch] of Object.entries(bData.chapters)) {
            if (ch) {
              chaptersMap[cid] = ch;
            }
          }
        }
      }
    });
  } else if (rootData.books || rootData.chapters) {
    // Backward compatibility: Legacy monolithic v1 format found on root doc!
    if (rootData.books) {
      for (const [bid, b] of Object.entries(rootData.books)) {
        if (b) booksMap[bid] = b;
      }
    }
    if (rootData.chapters) {
      for (const [cid, ch] of Object.entries(rootData.chapters)) {
        if (ch) chaptersMap[cid] = ch;
      }
    }

    // Auto-migrate legacy format to Option A subcollections in background
    setTimeout(() => {
      saveAllOutlinesToCloud(user, {
        books: booksMap,
        chapters: chaptersMap,
        quizHistory: rootData.quizHistory || [],
        bookMastery: rootData.bookMastery || {}
      }).catch((e) => console.warn("Auto-migration to subcollections notice:", e));
    }, 500);
  }

  // Fetch quizzes subcollection
  let quizHistory = [];
  try {
    const quizzesColRef = collection(db, "users", user.uid, "quizzes");
    const quizzesSnap = await getDocs(quizzesColRef);
    if (!quizzesSnap.empty) {
      quizzesSnap.forEach((qDoc) => {
        quizHistory.push(qDoc.data());
      });
      quizHistory.sort((a, b) => (b.date || 0) - (a.date || 0));
    }
  } catch (err) {
    console.warn("Quizzes subcollection load fallback:", err);
  }

  if (quizHistory.length === 0 && Array.isArray(rootData.quizHistory)) {
    quizHistory = rootData.quizHistory;
  }

  // Fetch mastery doc
  let bookMastery = {};
  try {
    const masteryDocRef = doc(db, "users", user.uid, "meta", "mastery");
    const masterySnap = await getDoc(masteryDocRef);
    if (masterySnap.exists()) {
      bookMastery = masterySnap.data().bookMastery || {};
    } else if (rootData.bookMastery) {
      bookMastery = rootData.bookMastery;
    }
  } catch (_) {}

  return {
    books: booksMap,
    chapters: chaptersMap,
    quizHistory,
    bookMastery,
    lastSyncedTimestamp: rootData.lastSyncedTimestamp || Date.now()
  };
}

// Aliases for compatibility
const saveOutlinesToCloud = saveAllOutlinesToCloud;
const debouncedCloudAutoSave = (user, localData, onStatusUpdate, delayMs) => {
  debouncedCloudAutoSaveBook(user, localData?.selectedBookId || "GEN", localData, onStatusUpdate, delayMs);
};

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

// --- FILE: src/quiz_engine.js ---
// Canonical Book Alias Map for Smart Normalization
const BOOK_ALIASES = {
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
function cleanText(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .replace(/[“”"''`.,\/#!$%\^&\*;:{}=\-_~()\[\]]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Levenshtein distance for typo tolerance
function levenshteinDistance(a, b) {
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
function parseBookAndChapter(input) {
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
function evaluateAnswer(question, userInput) {
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

const CURATED_QUESTION_BANK = [
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
  }
];

// --------------------------------------------------------------------------
// DYNAMIC QUESTION GENERATOR (Specific Details & Concrete Narrative Focus)
// --------------------------------------------------------------------------

function generateDynamicQuestions({ scope = "ALL", count = 25, questionTypes = null, specificBookId = null }) {
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
    if (scope === "WISDOM" && q.genre !== "Wisdom & Poetry") return false;
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

class DiagnosticSession {
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

        <button
          data-view="quiz-diagnostic"
          class="studio-view-btn px-3 py-1 rounded text-xs transition flex items-center gap-1.5 ${
            activeView === "quiz-diagnostic"
              ? "bg-[#2B2B28] text-[#EAE8E2] font-medium shadow-2xs"
              : "text-[#8C8A84] hover:text-[#EAE8E2]"
          }"
        >
          <span>🎯</span>
          <span>Diagnostic & Quizzes</span>
        </button>
      </nav>

      <!-- Right: Quiet Actions & Cloud SSO Modal Trigger -->
      <div class="flex items-center gap-3">
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
    <div class="h-full w-full overflow-y-auto bg-[#141413] text-[#EAE8E2]">
      <div class="max-w-3xl mx-auto p-6 md:p-10 space-y-10">
      <!-- Quiet Book Header -->
      <div class="border-b border-[#242422] pb-6 space-y-3">
        <div class="flex items-center justify-between text-xs text-[#8C8A84]">
          <span>${selectedBook.testament} • ${selectedBook.category}</span>
          <span>${selectedBook.author} • ${selectedBook.date}</span>
        </div>

        <div class="flex items-center justify-between">
          <h1 class="font-serif text-3xl font-bold text-[#EAE8E2] tracking-tight">
            ${selectedBook.name}
          </h1>

          <button
            data-launch-book-quiz="${selectedBook.id}"
            class="launch-book-quiz-btn px-3 py-1.5 rounded-lg bg-[#22221F] hover:bg-[#C4B79C] text-[#C4B79C] hover:text-[#141413] border border-[#33332E] text-xs font-semibold transition shadow flex items-center gap-1.5"
            title="Launch a chapter mastery quiz for ${selectedBook.name}"
          >
            <span>📝 Quiz This Book</span>
            <span>→</span>
          </button>
        </div>

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
      <div
        class="flex-1 grid grid-cols-2 divide-x divide-[#242422] overflow-hidden"
        style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));"
      >
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

// --- FILE: src/components/DiagnosticQuizView.js ---
// Format milliseconds into human-readable duration e.g. "2m 15s"
function formatDuration(ms) {
  if (!ms || isNaN(ms)) return "1m";
  const totalSec = Math.max(1, Math.round(ms / 1000));
  const mins = Math.floor(totalSec / 60);
  const secs = totalSec % 60;
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs > 0 ? `${secs}s` : ""}`;
}

// Format timestamp into date & time string
function formatTimestamp(ts) {
  if (!ts) return "Recently";
  const d = new Date(ts);
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

// Get clean label for test scope or specific book
function getTestScopeLabel(scope, specificBookId) {
  if (specificBookId) {
    const book = getBookById(specificBookId);
    return `${book?.name || specificBookId} Chapter Quiz`;
  }
  const scopeMap = {
    ALL: "Whole Bible (66 Books)",
    OT: "Old Testament (39 Books)",
    NT: "New Testament (27 Books)",
    GOSPELS: "The Gospels (4 Books)",
    EPISTLES: "Epistles & Letters (21 Books)",
    PENTATEUCH: "Pentateuch (5 Books)",
    HISTORICAL: "Historical Books (12 Books)",
    PROPHETS: "The Prophets (17 Books)",
    WISDOM: "Wisdom & Poetry (5 Books)"
  };
  return scopeMap[scope] || scope || "Whole Bible Diagnostic";
}

function renderDiagnosticQuizView({
  activeQuizTab = "diagnostic", // "diagnostic" | "book-quizzes" | "history"
  session = null,
  scorecard = null,
  viewingPastTest = null,
  questionReviewFilter = "all", // "all" | "missed"
  selectedScope = "ALL",
  selectedQuestionCount = 25,
  selectedBookId = "GEN",
  historySearchQuery = "",
  historyScopeFilter = "ALL",
  retakeModalTest = null,
  data = {}
}) {
  const quizHistory = Array.isArray(data.quizHistory) ? data.quizHistory : [];
  const historyCount = quizHistory.length;

  return `
    <div class="h-full w-full overflow-y-auto bg-[#161614] text-[#EAE8E2] p-4 md:p-8 select-none">
      <div class="max-w-4xl mx-auto space-y-6">

        <!-- Top Header & Mode Navigation -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2A2A27] pb-5">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-[#C4B79C]/15 text-[#C4B79C] border border-[#C4B79C]/30">
                Bible Mastery Studio
              </span>
              <span class="text-xs text-[#8C8A84]">•</span>
              <span class="text-xs text-[#8C8A84]">Exam Mode & Weakness Diagnostic</span>
            </div>
            <h1 class="font-serif text-2xl md:text-3xl font-bold text-[#EAE8E2] mt-1">
              Bible Diagnostic & Chapter Quiz Studio
            </h1>
            <p class="text-xs text-[#A19E97] mt-0.5">
              Identify weak areas across all 66 books, track your test history, review past answers, and retake tests for complete mastery.
            </p>
          </div>

          <!-- Tab Switcher (Only when not actively in an exam) -->
          ${
            !session || session.status === "completed"
              ? `
                <div class="flex items-center gap-1 bg-[#1C1C1A] p-1 rounded-lg border border-[#2B2B28] self-start shrink-0 text-xs">
                  <button
                    data-quiz-tab="diagnostic"
                    class="quiz-tab-switch-btn px-3 py-1.5 rounded transition flex items-center gap-1.5 ${
                      activeQuizTab === "diagnostic" && !viewingPastTest
                        ? "bg-[#2E2E2A] text-[#EAE8E2] font-semibold shadow-2xs"
                        : "text-[#8C8A84] hover:text-[#EAE8E2]"
                    }"
                  >
                    <span>🎯 Diagnostic Test</span>
                  </button>
                  <button
                    data-quiz-tab="book-quizzes"
                    class="quiz-tab-switch-btn px-3 py-1.5 rounded transition flex items-center gap-1.5 ${
                      activeQuizTab === "book-quizzes" && !viewingPastTest
                        ? "bg-[#2E2E2A] text-[#EAE8E2] font-semibold shadow-2xs"
                        : "text-[#8C8A84] hover:text-[#EAE8E2]"
                    }"
                  >
                    <span>📖 Book Quizzes (66)</span>
                  </button>
                  <button
                    data-quiz-tab="history"
                    class="quiz-tab-switch-btn px-3 py-1.5 rounded transition flex items-center gap-1.5 ${
                      activeQuizTab === "history" || viewingPastTest
                        ? "bg-[#2E2E2A] text-[#EAE8E2] font-semibold shadow-2xs"
                        : "text-[#8C8A84] hover:text-[#EAE8E2]"
                    }"
                  >
                    <span>📊 History & Progress</span>
                    ${
                      historyCount > 0
                        ? `<span class="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-[#C4B79C]/20 text-[#C4B79C]">${historyCount}</span>`
                        : ""
                    }
                  </button>
                </div>
              `
              : ""
          }
        </div>

        <!-- Render Current Active Sub-State -->
        ${(() => {
          // 1. If currently in an active exam session
          if (session && session.status === "in-progress") {
            return renderActiveExamView(session);
          }

          // 2. If viewing a past test from history
          if (viewingPastTest) {
            return renderPastTestReviewView({ test: viewingPastTest, questionReviewFilter });
          }

          // 3. If just finished an exam and scorecard is available
          if (scorecard) {
            return renderScorecardView({
              scorecard,
              questionReviewFilter,
              isNewCompletion: true,
              questions: session?.questions,
              answers: session?.answers
            });
          }

          // 4. Tab: Test History & Progress
          if (activeQuizTab === "history") {
            return renderTestHistoryAndProgressView({
              data,
              historySearchQuery,
              historyScopeFilter
            });
          }

          // 5. Tab: Book Quizzes
          if (activeQuizTab === "book-quizzes") {
            return renderBookQuizzesListView({ selectedBookId, data });
          }

          // 6. Tab: Diagnostic Configurator (Default)
          return renderDiagnosticConfiguratorView({ selectedScope, selectedQuestionCount });
        })()}

      </div>

      <!-- Retake Modal Overlay -->
      ${retakeModalTest ? renderRetakeModal(retakeModalTest) : ""}
    </div>
  `;
}

// --------------------------------------------------------------------------
// 1. DIAGNOSTIC CONFIGURATOR VIEW
// --------------------------------------------------------------------------
function renderDiagnosticConfiguratorView({ selectedScope, selectedQuestionCount }) {
  const scopes = [
    { id: "ALL", label: "Whole Bible", desc: "All 66 Books (Old & New Testaments)", badge: "66 Books" },
    { id: "OT", label: "Old Testament", desc: "Creation, Law, History & Prophets", badge: "39 Books" },
    { id: "NT", label: "New Testament", desc: "Gospels, Acts, Epistles & Revelation", badge: "27 Books" },
    { id: "GOSPELS", label: "The Gospels", desc: "Matthew, Mark, Luke, and John", badge: "4 Books" },
    { id: "EPISTLES", label: "Epistles & Letters", desc: "Pauline & General Epistles", badge: "21 Books" },
    { id: "PENTATEUCH", label: "Pentateuch (Torah)", desc: "Genesis through Deuteronomy", badge: "5 Books" },
    { id: "HISTORICAL", label: "Historical Books", desc: "Joshua through Esther", badge: "12 Books" },
    { id: "PROPHETS", label: "The Prophets", desc: "Major and Minor Prophets", badge: "17 Books" },
    { id: "WISDOM", label: "Wisdom & Poetry", desc: "Job, Psalms, Proverbs, Eccl, Song", badge: "5 Books" }
  ];

  const lengths = [
    { count: 10, label: "10 Questions", desc: "Quick 3-minute diagnostic check" },
    { count: 25, label: "25 Questions", desc: "Standard comprehensive diagnostic" },
    { count: 50, label: "50 Questions", desc: "Deep full-length mastery exam" }
  ];

  return `
    <div class="space-y-6">
      <!-- Info Card -->
      <div class="bg-[#1C1C1A] border border-[#2B2B28] rounded-xl p-5 space-y-3">
        <div class="flex items-center gap-2 text-[#C4B79C] font-semibold text-sm">
          <span>📋</span>
          <span>How the Diagnostic Assessment Works</span>
        </div>
        <p class="text-xs text-[#A19E97] leading-relaxed">
          Questions are dynamically pulled from a rich library covering <strong class="text-[#EAE8E2]">Book & Chapter locations</strong> (e.g. <em>Genesis 12</em>, <em>Matthew 28</em>), <strong class="text-[#EAE8E2]">Chapter recall</strong> (e.g. <em>1 Samuel 17</em>), <strong class="text-[#EAE8E2]">Key verse fill-ins</strong> (e.g. <em>Ephesians 2:8</em>), and <strong class="text-[#EAE8E2]">Biblical characters & events</strong>. Answers are fill-in-the-blank with typo tolerance and abbreviation support.
        </p>
      </div>

      <!-- Step 1: Choose Scope -->
      <div class="space-y-3">
        <label class="text-xs font-mono uppercase tracking-wider text-[#8C8A84] flex items-center justify-between">
          <span>1. Select Diagnostic Scope</span>
          <span class="text-[#C4B79C]">Scope: ${selectedScope}</span>
        </label>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          ${scopes
            .map((s) => {
              const isSelected = selectedScope === s.id;
              return `
                <button
                  data-select-scope="${s.id}"
                  class="select-scope-btn text-left p-3.5 rounded-xl border transition flex flex-col justify-between space-y-2 ${
                    isSelected
                      ? "bg-[#252522] border-[#C4B79C] text-[#EAE8E2] ring-1 ring-[#C4B79C]"
                      : "bg-[#1A1A18] border-[#262623] hover:border-[#383834] text-[#8C8A84] hover:text-[#EAE8E2]"
                  }"
                >
                  <div class="flex items-center justify-between">
                    <span class="font-serif font-bold text-sm text-[#EAE8E2]">${s.label}</span>
                    <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#141413] border border-[#2B2B28] text-[#C4B79C]">
                      ${s.badge}
                    </span>
                  </div>
                  <p class="text-[11px] text-[#A19E97]">${s.desc}</p>
                </button>
              `;
            })
            .join("")}
        </div>
      </div>

      <!-- Step 2: Choose Test Size -->
      <div class="space-y-3 pt-2">
        <label class="text-xs font-mono uppercase tracking-wider text-[#8C8A84]">
          2. Select Number of Questions
        </label>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          ${lengths
            .map((l) => {
              const isSelected = selectedQuestionCount === l.count;
              return `
                <button
                  data-select-count="${l.count}"
                  class="select-count-btn text-left p-3.5 rounded-xl border transition flex flex-col justify-between space-y-1.5 ${
                    isSelected
                      ? "bg-[#252522] border-[#C4B79C] text-[#EAE8E2] ring-1 ring-[#C4B79C]"
                      : "bg-[#1A1A18] border-[#262623] hover:border-[#383834] text-[#8C8A84] hover:text-[#EAE8E2]"
                  }"
                >
                  <div class="font-bold text-sm text-[#EAE8E2]">${l.label}</div>
                  <p class="text-[11px] text-[#A19E97]">${l.desc}</p>
                </button>
              `;
            })
            .join("")}
        </div>
      </div>

      <!-- Launch Action -->
      <div class="pt-4 flex items-center justify-between">
        <div class="text-xs text-[#8C8A84] flex items-center gap-1.5">
          <span>🔒 Exam Mode:</span>
          <span>No answers revealed until final scorecard</span>
        </div>

        <button
          id="start-diagnostic-btn"
          class="px-6 py-3 rounded-xl bg-[#C4B79C] hover:bg-[#DBCFB3] text-[#141413] font-serif font-bold text-sm tracking-wide transition shadow-lg flex items-center gap-2"
        >
          <span>🔥 Begin Diagnostic Exam</span>
          <span>→</span>
        </button>
      </div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// 2. ACTIVE EXAM RUNNER VIEW
// --------------------------------------------------------------------------
function renderActiveExamView(session) {
  const q = session.getCurrentQuestion();
  const total = session.questions.length;
  const currentIdx = session.currentIndex;
  const progressPct = Math.round(((currentIdx + 1) / total) * 100);
  const currentAns = session.answers[q.id]?.userInput || "";

  // Question type badge labels
  const typeLabels = {
    book_chapter: "Book & Chapter Location",
    chapter_in_book: "Chapter in Book",
    verse_completion: "Scripture Verse Completion",
    facts: "Characters, Places & Facts",
    book_id: "Book Identification"
  };

  return `
    <div class="max-w-2xl mx-auto space-y-6 py-4">
      <!-- Progress Bar & Top Meta -->
      <div class="space-y-2">
        <div class="flex items-center justify-between text-xs text-[#8C8A84] font-mono">
          <span>Question ${currentIdx + 1} of ${total}</span>
          <span class="px-2 py-0.5 rounded bg-[#1F1F1D] border border-[#2D2D29] text-[#C4B79C]">
            ${typeLabels[q.type] || "Question"}
          </span>
          <span>${progressPct}% Completed</span>
        </div>
        <div class="w-full h-1.5 rounded-full bg-[#20201D] overflow-hidden">
          <div class="h-full bg-[#C4B79C] transition-all duration-300" style="width: ${progressPct}%;"></div>
        </div>
      </div>

      <!-- Question Card -->
      <div class="bg-[#1C1C1A] border border-[#2B2B28] rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
        <!-- Question Meta -->
        <div class="flex items-center justify-between text-xs">
          <span class="text-[11px] font-mono text-[#8C8A84] uppercase tracking-wider">
            Diagnostic Question ${currentIdx + 1}
          </span>
          <span class="text-[11px] text-[#6D6B66]">Press Enter ↵ to advance</span>
        </div>

        <!-- Prompt -->
        <div class="space-y-2">
          <h2 class="font-serif text-lg md:text-xl font-medium text-[#EAE8E2] leading-relaxed">
            ${q.prompt}
          </h2>
        </div>

        <!-- Fill-in-the-Blank Text Input -->
        <div class="space-y-2 pt-2">
          <div class="relative">
            <input
              id="exam-answer-input"
              type="text"
              autocomplete="off"
              autofocus
              placeholder="${
                q.type === "book_chapter"
                  ? "e.g. Genesis 12, Matthew 28, Psalm 23"
                  : q.type === "chapter_in_book"
                  ? "e.g. 10, Luke 10, or Chapter 10"
                  : q.type === "verse_completion"
                  ? "e.g. grace, life, heart"
                  : "Type your answer here..."
              }"
              value="${currentAns.replace(/"/g, "&quot;")}"
              class="w-full bg-[#141413] border-2 border-[#33332F] focus:border-[#C4B79C] rounded-xl px-4 py-3.5 text-base text-[#EAE8E2] placeholder:text-[#5B5953] focus:outline-none transition shadow-inner font-sans"
            />
          </div>
          <p class="text-[11px] text-[#8C8A84] italic">
            Smart matching accepts abbreviations (e.g. <em>Gen 12</em>, <em>1 Sam 17</em>, <em>Mt 28</em>, <em>Ps 23</em>).
          </p>
        </div>

        <!-- Controls: Prev, Skip, Submit/Next -->
        <div class="pt-4 border-t border-[#262624] flex items-center justify-between">
          <button
            id="exam-prev-btn"
            class="px-4 py-2 rounded-lg bg-[#242421] hover:bg-[#2C2C28] text-[#A19E97] hover:text-[#EAE8E2] text-xs transition ${
              currentIdx === 0 ? "opacity-30 pointer-events-none" : ""
            }"
          >
            ← Previous
          </button>

          <div class="flex items-center gap-2">
            <button
              id="exam-skip-btn"
              class="px-4 py-2 rounded-lg text-[#8C8A84] hover:text-[#EAE8E2] text-xs transition"
            >
              Skip
            </button>

            ${
              currentIdx === total - 1
                ? `
                  <button
                    id="exam-finish-btn"
                    class="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow flex items-center gap-1.5"
                  >
                    <span>✓ Submit Exam</span>
                  </button>
                `
                : `
                  <button
                    id="exam-next-btn"
                    class="px-5 py-2.5 rounded-lg bg-[#C4B79C] hover:bg-[#DBCFB3] text-[#141413] font-semibold text-xs transition shadow flex items-center gap-1.5"
                  >
                    <span>Next Question →</span>
                  </button>
                `
            }
          </div>
        </div>
      </div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// 3. SCORECARD & DETAILED QUESTION REVIEW (Shared Component)
// --------------------------------------------------------------------------
function renderScorecardView({
  scorecard,
  questionReviewFilter = "all",
  isNewCompletion = false,
  pastTestId = null,
  questions = null,
  answers = null
}) {
  const totalQuestions =
    scorecard.totalQuestions ||
    (questions && questions.length) ||
    (scorecard.allReviewedQuestions && scorecard.allReviewedQuestions.length) ||
    0;
  let totalCorrect = scorecard.totalCorrect !== undefined ? scorecard.totalCorrect : 0;
  const overallPct =
    scorecard.overallPct !== undefined
      ? scorecard.overallPct
      : totalQuestions > 0
      ? Math.round((totalCorrect / totalQuestions) * 100)
      : 0;
  const byTestament = scorecard.byTestament || {};
  const byGenre = scorecard.byGenre || {};
  const weakBooks = scorecard.weakBooks || [];

  // Normalize reviewed questions array
  let allReviewedQuestions = Array.isArray(scorecard.allReviewedQuestions) ? [...scorecard.allReviewedQuestions] : [];
  let missedQuestions = Array.isArray(scorecard.missedQuestions) ? [...scorecard.missedQuestions] : [];

  // If questions & answers are provided (or available on scorecard), reconstruct review data if missing
  const questionPool = questions || scorecard.questions || [];
  const answerPool = answers || scorecard.answers || {};

  if (
    (allReviewedQuestions.length === 0 || (missedQuestions.length === 0 && totalQuestions > totalCorrect)) &&
    questionPool.length > 0
  ) {
    allReviewedQuestions = [];
    missedQuestions = [];
    let derivedCorrect = 0;

    questionPool.forEach((q) => {
      const ans = answerPool ? answerPool[q.id] : null;
      const isCorrect = ans ? Boolean(ans.isCorrect) : false;
      if (isCorrect) derivedCorrect++;

      const qItem = {
        question: q,
        isCorrect,
        userAnswer: ans ? (ans.userInput || "(No answer)") : "(Skipped)",
        correctAnswer: q.displayAnswer || "(See context)",
        explanation: q.explanation || ""
      };

      allReviewedQuestions.push(qItem);
      if (!isCorrect) {
        missedQuestions.push(qItem);
      }
    });

    if (totalCorrect === 0 && derivedCorrect > 0) {
      totalCorrect = derivedCorrect;
    }
  }

  // Strictly synchronize missedQuestions from allReviewedQuestions whenever allReviewedQuestions is populated
  if (allReviewedQuestions.length > 0) {
    missedQuestions = allReviewedQuestions.filter((item) => !item.isCorrect);
  } else if (missedQuestions.length > 0) {
    allReviewedQuestions = [...missedQuestions];
  }

  // Grade color calculation
  const gradeColor =
    overallPct >= 90
      ? "text-emerald-400 border-emerald-500/40 bg-emerald-500/10"
      : overallPct >= 75
      ? "text-[#C4B79C] border-[#C4B79C]/40 bg-[#C4B79C]/10"
      : overallPct >= 60
      ? "text-amber-400 border-amber-500/40 bg-amber-500/10"
      : "text-rose-400 border-rose-500/40 bg-rose-500/10";

  const questionsToDisplay =
    questionReviewFilter === "missed"
      ? missedQuestions
      : allReviewedQuestions && allReviewedQuestions.length > 0
      ? allReviewedQuestions
      : missedQuestions;

  return `
    <div class="space-y-8">
      <!-- Top Scorecard Summary Banner -->
      <div class="bg-[#1C1C1A] border border-[#2B2B28] rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#262624] pb-6">
          <div class="space-y-1.5">
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono uppercase tracking-widest text-[#C4B79C]">
                ${isNewCompletion ? "Diagnostic Assessment Results" : "Past Test Review"}
              </span>
              ${
                scorecard.durationMs
                  ? `<span class="text-xs text-[#8C8A84]">• Duration: ${formatDuration(scorecard.durationMs)}</span>`
                  : ""
              }
            </div>
            <h2 class="font-serif text-2xl md:text-3xl font-bold text-[#EAE8E2]">
              ${
                overallPct >= 90
                  ? "Outstanding Biblical Mastery! 🏆"
                  : overallPct >= 75
                  ? "Strong Working Knowledge! 📜"
                  : overallPct >= 60
                  ? "Good Foundation — Targeted Review Recommended 📖"
                  : "Diagnostic Complete — Focus on Identified Weak Areas 🎯"
              }
            </h2>
            <p class="text-xs text-[#A19E97]">
              Answered <strong>${totalCorrect}</strong> correctly out of <strong>${totalQuestions}</strong> questions.
            </p>
          </div>

          <!-- Big Circle Grade -->
          <div class="w-24 h-24 rounded-2xl border-2 ${gradeColor} flex flex-col items-center justify-center shrink-0 shadow-lg">
            <span class="font-mono text-3xl font-bold">${overallPct}%</span>
            <span class="text-[10px] font-mono uppercase tracking-wider mt-0.5">Accuracy</span>
          </div>
        </div>

        <!-- Breakdown by Testament & Genre -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Testament Split -->
          <div class="bg-[#141413] border border-[#262624] rounded-xl p-4 space-y-3">
            <h3 class="text-xs font-mono uppercase tracking-wider text-[#8C8A84]">
              Score by Testament
            </h3>
            <div class="space-y-2.5 text-xs">
              ${["OT", "NT"]
                .map((t) => {
                  const stat = byTestament[t] || { correct: 0, total: 0 };
                  const pct = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
                  return `
                    <div>
                      <div class="flex items-center justify-between mb-1">
                        <span class="font-serif text-[#DBCFB3]">${t === "OT" ? "Old Testament" : "New Testament"}</span>
                        <span class="font-mono text-[11px] ${pct >= 70 ? "text-emerald-400" : "text-amber-400"}">${stat.correct}/${stat.total} (${pct}%)</span>
                      </div>
                      <div class="w-full h-1.5 rounded-full bg-[#242421] overflow-hidden">
                        <div class="h-full ${pct >= 70 ? "bg-emerald-500" : "bg-amber-500"}" style="width: ${pct}%;"></div>
                      </div>
                    </div>
                  `;
                })
                .join("")}
            </div>
          </div>

          <!-- Genre Breakdown -->
          <div class="bg-[#141413] border border-[#262624] rounded-xl p-4 space-y-3">
            <h3 class="text-xs font-mono uppercase tracking-wider text-[#8C8A84]">
              Score by Category
            </h3>
            <div class="space-y-2 text-xs">
              ${
                Object.keys(byGenre).length > 0
                  ? Object.entries(byGenre)
                      .map(([genre, stat]) => {
                        const pct = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
                        return `
                          <div class="flex items-center justify-between">
                            <span class="text-[#A19E97] truncate pr-2">${genre}</span>
                            <span class="font-mono text-[11px] shrink-0 ${pct >= 70 ? "text-emerald-400" : "text-amber-400"}">
                              ${stat.correct}/${stat.total} (${pct}%)
                            </span>
                          </div>
                        `;
                      })
                      .join("")
                  : `<p class="text-xs text-[#8C8A84] italic">Specific category details available for broad diagnostics.</p>`
              }
            </div>
          </div>
        </div>

        <!-- Identified Weak Books & Immediate Action -->
        ${
          weakBooks.length > 0
            ? `
              <div class="bg-[#241A17] border border-[#4A2822] rounded-xl p-4 space-y-3">
                <div class="flex items-center gap-2 text-rose-300 font-semibold text-xs">
                  <span>⚠️</span>
                  <span>Identified Weak Books (${weakBooks.length} Books with Missed Content)</span>
                </div>
                <p class="text-[11px] text-stone-300">
                  Focus your study outlines on these specific books or take a targeted Chapter Quiz to master them:
                </p>
                <div class="flex flex-wrap gap-2 pt-1">
                  ${weakBooks
                    .map(
                      (wb) => `
                        <button
                          data-launch-book-quiz="${wb.bookId}"
                          class="launch-book-quiz-btn px-2.5 py-1 rounded-lg bg-[#381F1A] hover:bg-[#4E2B24] border border-[#5C322B] text-rose-200 text-xs transition flex items-center gap-1.5"
                          title="Click to launch a chapter mastery quiz for ${wb.bookName}"
                        >
                          <span class="font-serif font-bold">${wb.bookName}</span>
                          <span class="font-mono text-[10px] text-rose-400">(${wb.correct}/${wb.total})</span>
                          <span class="text-[10px]">📝 Quiz Book →</span>
                        </button>
                      `
                    )
                    .join("")}
                </div>
              </div>
            `
            : `
              <div class="bg-[#162319] border border-[#234A2D] rounded-xl p-4 text-emerald-300 text-xs flex items-center gap-2">
                <span>✓</span>
                <span>No major book weaknesses detected in this assessment run!</span>
              </div>
            `
        }

        <!-- Actions: Return & Retake -->
        <div class="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#262624]">
          <div class="flex items-center gap-2">
            ${
              !isNewCompletion
                ? `
                  <button
                    id="back-to-history-btn"
                    class="px-4 py-2 rounded-lg bg-[#2A2A27] hover:bg-[#383834] text-[#EAE8E2] text-xs font-semibold transition flex items-center gap-1.5"
                  >
                    <span>← Back to Test History</span>
                  </button>
                `
                : `
                  <button
                    id="reset-diagnostic-config-btn"
                    class="px-4 py-2 rounded-lg bg-[#2A2A27] hover:bg-[#383834] text-[#EAE8E2] text-xs font-semibold transition"
                  >
                    ← Start New Diagnostic
                  </button>
                `
            }
            <button
              data-quiz-tab="history"
              class="quiz-tab-switch-btn px-3.5 py-2 rounded-lg bg-[#1F1F1D] hover:bg-[#2A2A27] border border-[#2B2B28] text-[#C4B79C] text-xs font-semibold transition"
            >
              📊 View Full History
            </button>
          </div>

          ${
            pastTestId
              ? `
                <button
                  data-open-retake-modal="${pastTestId}"
                  class="px-5 py-2 rounded-lg bg-[#C4B79C] hover:bg-[#DBCFB3] text-[#141413] text-xs font-bold font-serif transition flex items-center gap-1.5 shadow"
                >
                  <span>🔄 Retake This Test</span>
                </button>
              `
              : ""
          }
        </div>
      </div>

      <!-- Detailed Question-by-Question Deep Dive Review -->
      <div class="space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2A2A27] pb-3">
          <div>
            <h3 class="font-serif text-lg font-bold text-[#EAE8E2] flex items-center gap-2">
              <span>🔍</span>
              <span>Question Review & Side-by-Side Scripture Deep Dive</span>
            </h3>
            <span class="text-xs text-[#8C8A84]">
              ${allReviewedQuestions.length > 0 ? missedQuestions.length : totalQuestions - totalCorrect} missed • ${totalCorrect} correct of ${totalQuestions} total
            </span>
          </div>

          <!-- Review Filter Controls: All vs Missed Only -->
          <div class="flex items-center gap-1 bg-[#1C1C1A] p-1 rounded-lg border border-[#2B2B28] text-xs self-start shrink-0">
            <button
              data-set-review-filter="all"
              class="set-review-filter-btn px-3 py-1 rounded transition ${
                questionReviewFilter === "all"
                  ? "bg-[#2E2E2A] text-[#EAE8E2] font-semibold shadow-2xs"
                  : "text-[#8C8A84] hover:text-[#EAE8E2]"
              }"
            >
              All (${allReviewedQuestions.length || totalQuestions})
            </button>
            <button
              data-set-review-filter="missed"
              class="set-review-filter-btn px-3 py-1 rounded transition ${
                questionReviewFilter === "missed"
                  ? "bg-[#2E2E2A] text-rose-300 font-semibold shadow-2xs"
                  : "text-[#8C8A84] hover:text-[#EAE8E2]"
              }"
            >
              Missed Only (${allReviewedQuestions.length > 0 ? missedQuestions.length : totalQuestions - totalCorrect})
            </button>
          </div>
        </div>

        <div class="space-y-3">
          ${
            questionsToDisplay.length === 0
              ? `
                <div class="bg-[#1C1C1A] border border-[#2B2B28] rounded-xl p-8 text-center space-y-2">
                  ${
                    totalCorrect === totalQuestions && totalQuestions > 0
                      ? `
                        <div class="text-2xl">🎉</div>
                        <h4 class="font-serif text-base font-bold text-[#EAE8E2]">Perfect Score — No Missed Questions!</h4>
                        <p class="text-xs text-[#8C8A84]">You answered every single question correctly in this test session.</p>
                      `
                      : questionReviewFilter === "missed" && missedQuestions.length === 0
                      ? `
                        <div class="text-2xl">🎉</div>
                        <h4 class="font-serif text-base font-bold text-[#EAE8E2]">No Missed Questions in this View</h4>
                        <p class="text-xs text-[#8C8A84]">Switch to 'All' to review all questions from this test.</p>
                      `
                      : `
                        <div class="text-2xl">📝</div>
                        <h4 class="font-serif text-base font-bold text-[#EAE8E2]">Legacy Test Session</h4>
                        <p class="text-xs text-[#8C8A84] max-w-md mx-auto">Detailed question-by-question data was not recorded for this earlier test session. Retake this test or start a new diagnostic to review every question in full detail.</p>
                      `
                  }
                </div>
              `
              : questionsToDisplay
                  .map((item, idx) => {
                    const q = item.question;
                    const isPassed = Boolean(item.isCorrect);
                    return `
                      <div class="bg-[#1C1C1A] border ${
                        isPassed ? "border-[#243A2A]" : "border-[#3A2420]"
                      } rounded-xl p-5 space-y-3 shadow-md transition">
                        <!-- Header: Badge & Status -->
                        <div class="flex items-center justify-between text-xs">
                          <span class="px-2 py-0.5 rounded ${
                            isPassed
                              ? "bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold uppercase"
                              : "bg-rose-500/20 text-rose-400 font-mono text-[10px] font-bold uppercase"
                          }">
                            ${isPassed ? "✓ Correct" : "✗ Missed"} (Question ${idx + 1})
                          </span>
                          <span class="text-[11px] font-mono text-[#8C8A84]">
                            ${q.scope || "Bible"} • ${q.genre || "Scripture"}
                          </span>
                        </div>

                        <!-- Prompt -->
                        <h4 class="font-serif text-base font-semibold text-[#EAE8E2]">
                          ${q.prompt}
                        </h4>

                        <!-- Answers Comparison -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-[#141413] p-3 rounded-lg border border-[#242422]">
                          <div>
                            <span class="text-[#8C8A84] block text-[10px] uppercase font-mono">Your Answer:</span>
                            <span class="${isPassed ? "text-emerald-400" : "text-rose-400"} font-mono font-medium">
                              ${item.userAnswer || "(No answer)"}
                            </span>
                          </div>
                          <div>
                            <span class="text-[#8C8A84] block text-[10px] uppercase font-mono">Correct Answer:</span>
                            <span class="text-emerald-400 font-mono font-bold">${item.correctAnswer || q.displayAnswer}</span>
                          </div>
                        </div>

                        <!-- Explanation & Inline Scripture Inspect Button -->
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#262624]">
                          <p class="text-xs text-[#A19E97] leading-relaxed flex-1">
                            💡 <strong>Context:</strong> ${item.explanation || q.explanation || "Biblical reference."}
                          </p>

                          ${
                            q.bookId && q.chapterNum
                              ? `
                                <button
                                  data-inspect-scripture="true"
                                  data-book-id="${q.bookId}"
                                  data-chapter="${q.chapterNum}"
                                  data-q-idx="${idx}"
                                  class="inspect-scripture-btn shrink-0 px-3 py-1.5 rounded-lg bg-[#2A2A27] hover:bg-[#C4B79C] text-[#DBCFB3] hover:text-[#141413] text-xs font-semibold transition border border-[#383834] flex items-center gap-1.5 shadow"
                                >
                                  <span>📖 Inspect Scripture (${getBookById(q.bookId)?.shortName || q.bookId} ${q.chapterNum})</span>
                                  <span class="inspect-icon-${idx} font-mono text-[10px]">▼</span>
                                </button>
                              `
                              : ""
                          }
                        </div>

                        <!-- Inline Scripture Reader Container -->
                        <div id="inline-scripture-container-${idx}" class="hidden pt-3 border-t border-[#262624] space-y-2">
                          <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                              <span class="text-xs font-serif font-bold text-[#C4B79C]">📖 ${getBookById(q.bookId)?.name || q.bookId} Chapter ${q.chapterNum} (ESV)</span>
                            </div>
                            <button data-close-scripture="${idx}" class="text-[11px] text-[#8C8A84] hover:text-[#EAE8E2] px-2 py-0.5 rounded bg-[#141413] border border-[#2B2B28] transition">✕ Close</button>
                          </div>
                          <div id="inline-scripture-body-${idx}" class="bg-[#121211] border border-[#2B2B28] rounded-xl p-4 max-h-72 overflow-y-auto font-serif text-xs leading-relaxed text-[#DBCFB3] select-text shadow-inner">
                            <div class="text-[#8C8A84] italic animate-pulse">Loading ESV Scripture...</div>
                          </div>
                        </div>
                      </div>
                    `;
                  })
                  .join("")
          }
        </div>
      </div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// 4. PAST TEST REVIEW WRAPPER
// --------------------------------------------------------------------------
function renderPastTestReviewView({ test, questionReviewFilter = "all" }) {
  // Synthesize scorecard object from test snapshot if necessary
  const scorecard = test.scorecard || {
    totalQuestions: test.total || test.questionCount || (test.questions && test.questions.length) || 0,
    totalCorrect: test.correct !== undefined ? test.correct : 0,
    overallPct: test.pct !== undefined ? test.pct : 0,
    durationMs: test.durationMs || 0,
    byTestament: test.byTestament || {},
    byGenre: test.byGenre || {},
    weakBooks: test.weakBooks || [],
    missedQuestions: test.missedQuestions || [],
    allReviewedQuestions: test.allReviewedQuestions || []
  };

  return renderScorecardView({
    scorecard,
    questionReviewFilter,
    isNewCompletion: false,
    pastTestId: test.id || `hist_${test.date || ""}`,
    questions: test.questions,
    answers: test.answers
  });
}

// --------------------------------------------------------------------------
// 5. TEST HISTORY & PROGRESS DASHBOARD VIEW
// --------------------------------------------------------------------------
function renderTestHistoryAndProgressView({ data, historySearchQuery = "", historyScopeFilter = "ALL" }) {
  const quizHistory = Array.isArray(data.quizHistory) ? [...data.quizHistory] : [];
  // Sort by latest date descending
  quizHistory.sort((a, b) => (b.date || 0) - (a.date || 0));

  const totalTests = quizHistory.length;
  let totalQuestions = 0;
  let totalCorrect = 0;
  let highestScore = 0;
  const recentScores = [];

  // Cumulative OT / NT and weak books tracking
  const cumulativeTestament = { OT: { correct: 0, total: 0 }, NT: { correct: 0, total: 0 } };
  const cumulativeWeakBooksMap = {};

  quizHistory.forEach((t, i) => {
    const qCount = t.total || t.questionCount || (t.scorecard?.totalQuestions) || 0;
    const cCount = t.correct !== undefined ? t.correct : (t.scorecard?.totalCorrect || 0);
    const scorePct = t.pct !== undefined ? t.pct : (t.scorecard?.overallPct || 0);

    totalQuestions += qCount;
    totalCorrect += cCount;
    if (scorePct > highestScore) highestScore = scorePct;
    if (i < 5) recentScores.push(scorePct);

    // Testament aggregation
    if (t.scorecard?.byTestament) {
      if (t.scorecard.byTestament.OT) {
        cumulativeTestament.OT.correct += t.scorecard.byTestament.OT.correct;
        cumulativeTestament.OT.total += t.scorecard.byTestament.OT.total;
      }
      if (t.scorecard.byTestament.NT) {
        cumulativeTestament.NT.correct += t.scorecard.byTestament.NT.correct;
        cumulativeTestament.NT.total += t.scorecard.byTestament.NT.total;
      }
    }

    // Cumulative weak books
    const weakList = t.scorecard?.weakBooks || t.weakBooks || [];
    weakList.forEach((wb) => {
      if (!cumulativeWeakBooksMap[wb.bookId]) {
        cumulativeWeakBooksMap[wb.bookId] = {
          bookId: wb.bookId,
          bookName: wb.bookName || wb.bookId,
          missCount: 0
        };
      }
      cumulativeWeakBooksMap[wb.bookId].missCount += (wb.total - wb.correct) || 1;
    });
  });

  const careerAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  const recentAvg =
    recentScores.length > 0
      ? Math.round(recentScores.reduce((a, b) => a + b, 0) / recentScores.length)
      : 0;

  const weakBooksList = Object.values(cumulativeWeakBooksMap).sort((a, b) => b.missCount - a.missCount);

  // Filter history list
  const filteredHistory = quizHistory.filter((t) => {
    // Scope filter
    if (historyScopeFilter !== "ALL") {
      if (historyScopeFilter === "BOOK_QUIZZES" && !t.specificBookId) return false;
      if (historyScopeFilter !== "BOOK_QUIZZES" && t.scope !== historyScopeFilter) return false;
    }
    // Search query
    if (historySearchQuery && historySearchQuery.trim()) {
      const q = historySearchQuery.toLowerCase().trim();
      const scopeLabel = getTestScopeLabel(t.scope, t.specificBookId).toLowerCase();
      return scopeLabel.includes(q);
    }
    return true;
  });

  return `
    <div class="space-y-8">
      <!-- Top Analytics Metric Cards -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <!-- 1. Career Accuracy -->
        <div class="bg-[#1C1C1A] border border-[#2B2B28] rounded-xl p-4 space-y-1">
          <span class="text-[10px] font-mono uppercase tracking-wider text-[#8C8A84]">Career Accuracy</span>
          <div class="text-2xl font-bold font-mono ${
            careerAccuracy >= 80 ? "text-emerald-400" : careerAccuracy >= 60 ? "text-[#C4B79C]" : "text-amber-400"
          }">
            ${careerAccuracy}%
          </div>
          <p class="text-[11px] text-[#8C8A84]">${totalCorrect}/${totalQuestions} questions</p>
        </div>

        <!-- 2. Tests Completed -->
        <div class="bg-[#1C1C1A] border border-[#2B2B28] rounded-xl p-4 space-y-1">
          <span class="text-[10px] font-mono uppercase tracking-wider text-[#8C8A84]">Tests Completed</span>
          <div class="text-2xl font-bold font-mono text-[#EAE8E2]">${totalTests}</div>
          <p class="text-[11px] text-[#8C8A84]">${totalQuestions} total questions</p>
        </div>

        <!-- 3. Best Score -->
        <div class="bg-[#1C1C1A] border border-[#2B2B28] rounded-xl p-4 space-y-1">
          <span class="text-[10px] font-mono uppercase tracking-wider text-[#8C8A84]">Best Score</span>
          <div class="text-2xl font-bold font-mono text-emerald-400">
            ${totalTests > 0 ? `${highestScore}%` : "—"}
          </div>
          <p class="text-[11px] text-[#8C8A84]">Peak achievement</p>
        </div>

        <!-- 4. Recent Average -->
        <div class="bg-[#1C1C1A] border border-[#2B2B28] rounded-xl p-4 space-y-1">
          <span class="text-[10px] font-mono uppercase tracking-wider text-[#8C8A84]">Recent Average</span>
          <div class="text-2xl font-bold font-mono text-[#C4B79C]">
            ${recentScores.length > 0 ? `${recentAvg}%` : "—"}
          </div>
          <p class="text-[11px] text-[#8C8A84]">Last ${recentScores.length} tests</p>
        </div>
      </div>

      <!-- Mastery Distribution & Score Trend Timeline -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Testament Mastery Split -->
        <div class="bg-[#1C1C1A] border border-[#2B2B28] rounded-xl p-5 space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-xs font-mono uppercase tracking-wider text-[#8C8A84]">
              Testament Mastery Split
            </h3>
            <span class="text-[10px] font-mono text-[#C4B79C]">OT vs NT</span>
          </div>

          <div class="space-y-3 text-xs">
            ${["OT", "NT"]
              .map((t) => {
                const stat = cumulativeTestament[t];
                const pct = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
                return `
                  <div>
                    <div class="flex items-center justify-between mb-1.5">
                      <span class="font-serif text-[#DBCFB3] font-medium">${t === "OT" ? "Old Testament (39 Books)" : "New Testament (27 Books)"}</span>
                      <span class="font-mono text-[11px] ${pct >= 70 ? "text-emerald-400" : "text-amber-400"}">
                        ${stat.total > 0 ? `${stat.correct}/${stat.total} (${pct}%)` : "No tests yet"}
                      </span>
                    </div>
                    <div class="w-full h-2 rounded-full bg-[#141413] border border-[#242422] overflow-hidden">
                      <div class="h-full ${pct >= 70 ? "bg-emerald-500" : "bg-amber-500"} transition-all duration-500" style="width: ${pct}%;"></div>
                    </div>
                  </div>
                `;
              })
              .join("")}
          </div>
        </div>

        <!-- Recent Score Trend Strip -->
        <div class="bg-[#1C1C1A] border border-[#2B2B28] rounded-xl p-5 space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-xs font-mono uppercase tracking-wider text-[#8C8A84]">
              Score Trend (Last 10 Tests)
            </h3>
            <span class="text-[10px] font-mono text-[#8C8A84]">Chronological</span>
          </div>

          ${
            quizHistory.length === 0
              ? `
                <div class="h-20 flex items-center justify-center text-xs text-[#8C8A84] italic">
                  Take a test to see your score trend over time!
                </div>
              `
              : `
                <div class="flex items-end gap-1.5 h-20 pt-2">
                  ${quizHistory
                    .slice(0, 10)
                    .reverse()
                    .map((t, idx) => {
                      const pct = t.pct !== undefined ? t.pct : (t.scorecard?.overallPct || 0);
                      const barColor =
                        pct >= 85 ? "bg-emerald-500" : pct >= 70 ? "bg-[#C4B79C]" : pct >= 50 ? "bg-amber-500" : "bg-rose-500";
                      return `
                        <div
                          class="flex-1 flex flex-col items-center gap-1 group relative cursor-pointer"
                          data-review-past-test="${t.id || idx}"
                          title="${getTestScopeLabel(t.scope, t.specificBookId)}: ${pct}% on ${formatTimestamp(t.date)}"
                        >
                          <div class="w-full rounded-t ${barColor} transition-all group-hover:brightness-125" style="height: ${Math.max(12, pct)}%;"></div>
                          <span class="text-[9px] font-mono text-[#8C8A84] group-hover:text-[#EAE8E2]">${pct}%</span>
                        </div>
                      `;
                    })
                    .join("")}
                </div>
              `
          }
        </div>
      </div>

      <!-- Cumulative Identified Weak Areas -->
      ${
        weakBooksList.length > 0
          ? `
            <div class="bg-[#241A17] border border-[#4A2822] rounded-xl p-4 space-y-3">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2 text-rose-300 font-semibold text-xs">
                  <span>⚠️</span>
                  <span>Identified Priority Books for Study (${weakBooksList.length} Books with Recurring Misses)</span>
                </div>
                <span class="text-[10px] font-mono text-rose-400">Targeted Review</span>
              </div>
              <p class="text-[11px] text-stone-300">
                You frequently miss questions in these books. Launch a chapter quiz or study their outlines to strengthen your mastery:
              </p>
              <div class="flex flex-wrap gap-2 pt-1">
                ${weakBooksList.slice(0, 8).map((wb) => `
                  <button
                    data-launch-book-quiz="${wb.bookId}"
                    class="launch-book-quiz-btn px-2.5 py-1 rounded-lg bg-[#381F1A] hover:bg-[#4E2B24] border border-[#5C322B] text-rose-200 text-xs transition flex items-center gap-1.5"
                    title="Click to quiz ${wb.bookName}"
                  >
                    <span class="font-serif font-bold">${wb.bookName}</span>
                    <span class="font-mono text-[10px] text-rose-400">(${wb.missCount} missed)</span>
                    <span class="text-[10px]">📝 Quiz Book →</span>
                  </button>
                `).join("")}
              </div>
            </div>
          `
          : ""
      }

      <!-- Past Test Sessions Log -->
      <div class="space-y-4">
        <!-- List Header & Filter Controls -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#2A2A27] pb-3">
          <div class="flex items-center gap-2">
            <h3 class="font-serif text-lg font-bold text-[#EAE8E2]">
              📜 Past Test History (${filteredHistory.length})
            </h3>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <!-- Search Input -->
            <div class="relative">
              <input
                id="history-search-input"
                type="text"
                placeholder="Search history..."
                value="${historySearchQuery.replace(/"/g, "&quot;")}"
                class="w-36 sm:w-44 px-2.5 py-1 text-xs bg-[#141413] border border-[#2B2B28] rounded-lg text-[#EAE8E2] placeholder:text-[#6D6B66] focus:outline-none focus:border-[#C4B79C] transition"
              />
              ${
                historySearchQuery
                  ? `<button id="clear-history-search-btn" class="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-[#8C8A84] hover:text-[#EAE8E2]">✕</button>`
                  : ""
              }
            </div>

            <!-- Scope Filters -->
            <div class="flex flex-wrap items-center gap-1 bg-[#1C1C1A] p-1 rounded-lg border border-[#2B2B28] text-xs">
              ${[
                { id: "ALL", label: "All Tests" },
                { id: "NT", label: "NT" },
                { id: "OT", label: "OT" },
                { id: "BOOK_QUIZZES", label: "Book Quizzes" }
              ]
                .map(
                  (f) => `
                    <button
                      data-history-scope="${f.id}"
                      class="filter-history-scope-btn px-2.5 py-1 rounded transition ${
                        historyScopeFilter === f.id
                          ? "bg-[#2E2E2A] text-[#EAE8E2] font-semibold"
                          : "text-[#8C8A84] hover:text-[#EAE8E2]"
                      }"
                    >
                      ${f.label}
                    </button>
                  `
                )
                .join("")}
            </div>
          </div>
        </div>

        <!-- History Cards List -->
        ${
          filteredHistory.length === 0
            ? `
              <div class="bg-[#1C1C1A] border border-[#2B2B28] rounded-xl p-8 text-center space-y-3">
                <div class="text-3xl">📝</div>
                <h4 class="font-serif text-base font-bold text-[#EAE8E2]">No Past Tests Found</h4>
                <p class="text-xs text-[#8C8A84] max-w-sm mx-auto">
                  Take a diagnostic test or an individual book quiz to start recording your progress and reviewing past answers.
                </p>
                <button
                  data-quiz-tab="diagnostic"
                  class="quiz-tab-switch-btn px-4 py-2 bg-[#C4B79C] hover:bg-[#DBCFB3] text-[#141413] rounded-lg font-semibold text-xs transition inline-flex items-center gap-1.5 shadow"
                >
                  <span>🎯 Take Your First Test</span>
                </button>
              </div>
            `
            : `
              <div class="space-y-3">
                ${filteredHistory
                  .map((t, idx) => {
                    const testId = t.id || `hist_${t.date || idx}`;
                    const scorePct = t.pct !== undefined ? t.pct : (t.scorecard?.overallPct || 0);
                    const correctCount = t.correct !== undefined ? t.correct : (t.scorecard?.totalCorrect || 0);
                    const totalCount = t.total || t.questionCount || (t.scorecard?.totalQuestions) || 0;
                    const scopeLabel = getTestScopeLabel(t.scope, t.specificBookId);
                    const durationText = formatDuration(t.durationMs || t.scorecard?.durationMs);
                    const dateText = formatTimestamp(t.date);

                    const badgeColor =
                      scorePct >= 90
                        ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                        : scorePct >= 75
                        ? "bg-[#C4B79C]/15 text-[#C4B79C] border-[#C4B79C]/30"
                        : scorePct >= 60
                        ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                        : "bg-rose-500/15 text-rose-400 border-rose-500/30";

                    return `
                      <div class="bg-[#1C1C1A] hover:bg-[#20201E] border border-[#2B2B28] rounded-xl p-4 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm group">
                        <!-- Left: Info & Score -->
                        <div class="space-y-1">
                          <div class="flex items-center gap-2">
                            <span class="px-2 py-0.5 rounded font-mono text-[10px] font-bold border ${badgeColor}">
                              ${scorePct}% Accuracy
                            </span>
                            <span class="text-xs font-serif font-bold text-[#EAE8E2]">
                              ${scopeLabel}
                            </span>
                          </div>
                          <div class="flex items-center gap-2 text-xs text-[#8C8A84] font-mono">
                            <span>${correctCount}/${totalCount} correct</span>
                            <span>•</span>
                            <span>⏱️ ${durationText}</span>
                            <span>•</span>
                            <span>📅 ${dateText}</span>
                          </div>
                        </div>

                        <!-- Right: Action Buttons (Review, Retake, Delete) -->
                        <div class="flex items-center gap-2 shrink-0">
                          <button
                            data-review-past-test="${testId}"
                            class="review-past-test-btn px-3 py-1.5 rounded-lg bg-[#2A2A27] hover:bg-[#C4B79C] text-[#DBCFB3] hover:text-[#141413] text-xs font-semibold transition border border-[#383834] flex items-center gap-1 shadow-xs"
                          >
                            <span>🔍 Review</span>
                          </button>

                          <button
                            data-open-retake-modal="${testId}"
                            class="open-retake-modal-btn px-3 py-1.5 rounded-lg bg-[#2A2A27] hover:bg-[#383834] text-[#EAE8E2] text-xs font-semibold transition border border-[#383834] flex items-center gap-1"
                          >
                            <span>🔄 Retake</span>
                          </button>

                          <button
                            data-delete-past-test="${testId}"
                            class="delete-past-test-btn px-2.5 py-1.5 rounded-lg bg-transparent hover:bg-rose-500/20 text-[#8C8A84] hover:text-rose-400 text-xs transition"
                            title="Delete this test record"
                          >
                            <span>🗑️</span>
                          </button>
                        </div>
                      </div>
                    `;
                  })
                  .join("")}
              </div>
            `
        }

        <!-- Bottom Clear All History Option -->
        ${
          quizHistory.length > 0
            ? `
              <div class="pt-4 flex items-center justify-between border-t border-[#262624]">
                <span class="text-xs text-[#6D6B66]">Test history syncs automatically to Google SSO Cloud.</span>
                <button
                  id="clear-all-quiz-history-btn"
                  class="text-xs text-[#8C8A84] hover:text-rose-400 transition underline underline-offset-2"
                >
                  Clear All Test History
                </button>
              </div>
            `
            : ""
        }
      </div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// 6. RETAKE MODAL OVERLAY
// --------------------------------------------------------------------------
function renderRetakeModal(test) {
  const scopeLabel = getTestScopeLabel(test.scope, test.specificBookId);
  const totalQ = test.total || test.questionCount || (test.scorecard?.totalQuestions) || (test.questions?.length) || 25;
  const missedCount = test.scorecard?.missedQuestions?.length || test.missedQuestions?.length || (test.total && test.correct !== undefined ? test.total - test.correct : 0);
  const testId = test.id || `hist_${test.date || ""}`;

  return `
    <div id="retake-quiz-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs animate-fade-in">
      <div class="bg-[#1C1C1A] border border-[#2B2B28] rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl">
        <!-- Modal Header -->
        <div class="flex items-center justify-between border-b border-[#2A2A27] pb-3">
          <div class="space-y-0.5">
            <span class="text-[10px] font-mono uppercase tracking-widest text-[#C4B79C]">Retake Test</span>
            <h3 class="font-serif text-lg font-bold text-[#EAE8E2]">${scopeLabel}</h3>
          </div>
          <button id="close-retake-modal-btn" class="text-xs text-[#8C8A84] hover:text-[#EAE8E2] px-2 py-1 rounded bg-[#141413] border border-[#2A2A27] transition">
            ✕ Close
          </button>
        </div>

        <p class="text-xs text-[#A19E97]">
          Select which questions you would like to retake for this assessment:
        </p>

        <!-- Retake Options -->
        <div class="space-y-2.5">
          <!-- 1. Exact Same Questions -->
          <button
            data-action-retake="exact"
            data-test-id="${testId}"
            class="retake-option-btn w-full text-left p-3.5 rounded-xl bg-[#141413] hover:bg-[#252522] border border-[#262623] hover:border-[#C4B79C] transition space-y-1 group"
          >
            <div class="flex items-center justify-between">
              <span class="font-serif font-bold text-sm text-[#EAE8E2] group-hover:text-[#C4B79C]">
                🎯 Retake Exact Questions
              </span>
              <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#1C1C1A] border border-[#2B2B28] text-[#C4B79C]">
                ${totalQ} Questions
              </span>
            </div>
            <p class="text-[11px] text-[#8C8A84]">
              Test yourself on the exact same questions from this test session to verify mastery.
            </p>
          </button>

          <!-- 2. Only Missed Questions -->
          ${
            missedCount > 0
              ? `
                <button
                  data-action-retake="missed"
                  data-test-id="${testId}"
                  class="retake-option-btn w-full text-left p-3.5 rounded-xl bg-[#141413] hover:bg-[#252522] border border-[#262623] hover:border-rose-400 transition space-y-1 group"
                >
                  <div class="flex items-center justify-between">
                    <span class="font-serif font-bold text-sm text-rose-300 group-hover:text-rose-200">
                      ⚡ Retake Only Missed Questions
                    </span>
                    <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 font-bold">
                      ${missedCount} Missed
                    </span>
                  </div>
                  <p class="text-[11px] text-[#8C8A84]">
                    Focused remedial drill containing only the questions you got wrong previously.
                  </p>
                </button>
              `
              : ""
          }

          <!-- 3. New Questions with Same Settings -->
          <button
            data-action-retake="new"
            data-test-id="${testId}"
            class="retake-option-btn w-full text-left p-3.5 rounded-xl bg-[#141413] hover:bg-[#252522] border border-[#262623] hover:border-[#C4B79C] transition space-y-1 group"
          >
            <div class="flex items-center justify-between">
              <span class="font-serif font-bold text-sm text-[#EAE8E2] group-hover:text-[#C4B79C]">
                ✨ New Test with Same Settings
              </span>
              <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#1C1C1A] border border-[#2B2B28] text-[#8C8A84]">
                Randomized
              </span>
            </div>
            <p class="text-[11px] text-[#8C8A84]">
              Generate a fresh set of questions with the same scope (${scopeLabel}) and length.
            </p>
          </button>
        </div>
      </div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// 7. BOOK QUIZZES LIST VIEW (All 66 Books)
// --------------------------------------------------------------------------
function renderBookQuizzesListView({ selectedBookId, data }) {
  return `
    <div class="space-y-6">
      <div class="bg-[#1C1C1A] border border-[#2B2B28] rounded-xl p-5 space-y-2">
        <h3 class="font-serif text-base font-bold text-[#EAE8E2] flex items-center gap-2">
          <span>📖</span>
          <span>Individual Book Chapter Mastery Quizzes</span>
        </h3>
        <p class="text-xs text-[#A19E97] leading-relaxed">
          Select any of the 66 books to take a targeted chapter-recall quiz. Questions will test your mastery of what happened in each specific chapter of that book.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        ${BIBLE_BOOKS.map((b) => {
          return `
            <button
              data-launch-book-quiz="${b.id}"
              class="launch-book-quiz-btn text-left p-3.5 rounded-xl bg-[#1C1C1A] hover:bg-[#262623] border border-[#2B2B28] hover:border-[#C4B79C]/60 transition flex flex-col justify-between space-y-2 group"
            >
              <div class="flex items-start justify-between">
                <div>
                  <span class="text-[10px] font-mono text-[#8C8A84] uppercase tracking-wider">${b.category}</span>
                  <h4 class="font-serif font-bold text-sm text-[#EAE8E2] group-hover:text-[#C4B79C] transition">
                    ${b.name}
                  </h4>
                </div>
                <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#141413] text-[#A19E97] border border-[#242422]">
                  ${b.chapterCount} ch
                </span>
              </div>
              <p class="text-[11px] text-[#8C8A84] line-clamp-2">${b.keyTheme}</p>
              <div class="pt-1.5 border-t border-[#262624] flex items-center justify-between text-[11px] text-[#C4B79C] font-semibold">
                <span>Start Quiz</span>
                <span>→</span>
              </div>
            </button>
          `;
        }).join("")}
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
    this.activeView = "chapter-outliner"; // 'chapter-outliner' (side-by-side) | 'book-rollup' | 'quiz-diagnostic'
    this.splitViewMode = "split"; // 'split' | 'outline' | 'scripture'
    this.isCollapsed = false;

    // Quiz & Diagnostic state
    this.activeQuizTab = "diagnostic"; // 'diagnostic' | 'book-quizzes' | 'history'
    this.quizSession = null;
    this.quizScorecard = null;
    this.viewingPastTest = null;
    this.questionReviewFilter = "all"; // 'all' | 'missed'
    this.historySearchQuery = "";
    this.historyScopeFilter = "ALL";
    this.retakeModalTest = null;
    this.selectedQuizScope = "ALL";
    this.selectedQuizQuestionCount = 25;

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

    // Listen for browser Back & Forward navigation buttons
    window.addEventListener("popstate", () => this.handlePopState());
    window.addEventListener("hashchange", () => this.handlePopState());

    // Restore initial state from URL Hash or set default
    this.syncStateFromHash({ isInitial: true });

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
      if (cloudData) {
        let merged = false;

        // 1. Merge Book Summaries & Themes
        if (cloudData.books) {
          for (const [bid, b] of Object.entries(cloudData.books)) {
            if (!b) continue;
            if (!this.data.books[bid]) {
              this.data.books[bid] = { bookSummary: "", myBookTheme: "", updatedAt: null };
            }
            if (b.bookSummary && b.bookSummary.trim()) {
              this.data.books[bid].bookSummary = b.bookSummary;
              merged = true;
            }
            if (b.myBookTheme && b.myBookTheme.trim()) {
              this.data.books[bid].myBookTheme = b.myBookTheme;
              merged = true;
            }
          }
        }

        // 2. Merge Chapters
        if (cloudData.chapters) {
          for (const [cid, ch] of Object.entries(cloudData.chapters)) {
            if (!ch) continue;
            if (!this.data.chapters[cid]) {
              this.data.chapters[cid] = { headingBlocks: [], status: "in-progress" };
            }
            if (ch.takeaway) {
              this.data.chapters[cid].takeaway = ch.takeaway;
              merged = true;
            }
            if (ch.chapterOutlineRichHTML) {
              this.data.chapters[cid].chapterOutlineRichHTML = ch.chapterOutlineRichHTML;
              merged = true;
            }
            if (ch.status && ch.status !== "empty") {
              this.data.chapters[cid].status = ch.status;
            }
            const cloudSections = ch.headingBlocks || ch.sections || [];
            if (Array.isArray(cloudSections) && cloudSections.length > 0) {
              cloudSections.forEach((cs, sIdx) => {
                let match = this.data.chapters[cid].headingBlocks.find(
                  (hb) => hb.heading && hb.heading.toLowerCase() === cs.heading.toLowerCase()
                );
                if (!match) {
                  match = this.data.chapters[cid].headingBlocks[sIdx];
                }
                if (match) {
                  if (Array.isArray(cs.points) && cs.points.length > 0) {
                    match.points = cs.points;
                  }
                  if (cs.notes && cs.notes.trim()) {
                    match.notes = cs.notes;
                  }
                } else {
                  this.data.chapters[cid].headingBlocks.push({
                    heading: cs.heading || "Section",
                    verses: cs.verses || "",
                    notes: cs.notes || "",
                    points: Array.isArray(cs.points) ? cs.points : []
                  });
                }
              });
              merged = true;
            }
          }
        }

        // 3. Merge Quiz History
        if (Array.isArray(cloudData.quizHistory) && cloudData.quizHistory.length > 0) {
          if (!Array.isArray(this.data.quizHistory)) this.data.quizHistory = [];
          const existingIds = new Set(this.data.quizHistory.map((q) => q.id || `${q.date}`));
          cloudData.quizHistory.forEach((q) => {
            const qKey = q.id || `${q.date}`;
            if (!existingIds.has(qKey)) {
              this.data.quizHistory.push(q);
              existingIds.add(qKey);
              merged = true;
            }
          });
          this.data.quizHistory.sort((a, b) => (b.date || 0) - (a.date || 0));
        }

        // 4. Merge Book Mastery
        if (cloudData.bookMastery && typeof cloudData.bookMastery === "object") {
          this.data.bookMastery = { ...this.data.bookMastery, ...cloudData.bookMastery };
          merged = true;
        }

        if (merged) {
          saveOutlineStorage(this.data);
          this.render();
        }
      }
      await saveAllOutlinesToCloud(user, this.data);
    } catch (err) {
      console.warn("Cloud sync error:", err);
    }
  }

  notifyDataChanged(bookId = null) {
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
      const targetBook = bookId || this.selectedBookId || "GEN";
      debouncedCloudAutoSaveBook(
        this.googleUser,
        targetBook,
        this.data,
        (status) => {
          this.cloudSyncStatus = status;
          const ssoBtn = document.getElementById("open-cloud-sso-btn");
          if (ssoBtn) {
            ssoBtn.innerHTML = `<span class="text-[10px]">🟢</span><span>${
              this.googleUser.displayName || "Google"
            } • ${status}</span>`;
          }
          if (saveBadge && status.includes("saved to cloud")) {
            saveBadge.innerHTML = `<span class="text-[#34A853]">🟢</span><span class="text-[#34A853]">Saved to cloud</span>`;
          }
        },
        800
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

  // Get canonical URL hash for current or specified state
  getHashForState({
    activeView = this.activeView,
    bookId = this.selectedBookId,
    chapterNum = this.selectedChapterNum,
    activeQuizTab = this.activeQuizTab,
    viewingPastTest = this.viewingPastTest,
    selectedQuizBookId = this.selectedQuizBookId
  } = {}) {
    if (activeView === "book-rollup") {
      return `#/book/${bookId}`;
    }
    if (activeView === "quiz-diagnostic") {
      if (viewingPastTest) {
        const tId = viewingPastTest.id || `hist_${viewingPastTest.date || ""}`;
        return `#/quiz/history/${tId}`;
      }
      if (activeQuizTab === "book-quizzes") {
        return selectedQuizBookId ? `#/quiz/book-quizzes/${selectedQuizBookId}` : `#/quiz/book-quizzes`;
      }
      if (activeQuizTab === "history") {
        return `#/quiz/history`;
      }
      return `#/quiz/diagnostic`;
    }
    return `#/${bookId}/${chapterNum}`;
  }

  // Navigate to new state and manage browser history stack
  navigateTo(options = {}, { push = true, forceLoadESV = false } = {}) {
    this.saveActiveChapterEditorBeforeSwitch();

    let bookChanged = false;
    let chapterChanged = false;

    if (options.bookId && options.bookId !== this.selectedBookId) {
      this.selectedBookId = options.bookId;
      bookChanged = true;
    }
    if (options.chapterNum !== undefined && parseInt(options.chapterNum, 10) !== this.selectedChapterNum) {
      this.selectedChapterNum = parseInt(options.chapterNum, 10);
      chapterChanged = true;
    }
    if (options.activeView !== undefined && options.activeView !== this.activeView) {
      this.activeView = options.activeView;
    }
    if (options.activeQuizTab !== undefined && options.activeQuizTab !== this.activeQuizTab) {
      this.activeQuizTab = options.activeQuizTab;
    }
    if (options.viewingPastTest !== undefined) {
      this.viewingPastTest = options.viewingPastTest;
    }
    if (options.selectedQuizBookId !== undefined) {
      this.selectedQuizBookId = options.selectedQuizBookId;
    }

    const targetHash = this.getHashForState();
    if (window.location.hash !== targetHash) {
      if (push) {
        window.history.pushState({ hash: targetHash }, "", targetHash);
      } else {
        window.history.replaceState({ hash: targetHash }, "", targetHash);
      }
    }

    this.render();

    if (bookChanged || chapterChanged || forceLoadESV) {
      this.autoLoadESVForCurrentChapter();
    }
  }

  // Handle browser Back / Forward buttons (popstate)
  handlePopState() {
    this.saveActiveChapterEditorBeforeSwitch();
    this.syncStateFromHash({ isInitial: false });
  }

  // Parse window.location.hash and sync application state
  syncStateFromHash({ isInitial = false } = {}) {
    const rawHash = window.location.hash.trim().replace(/^#\/?/, "");
    if (!rawHash) {
      // Set default URL hash without adding extra history item
      const defaultHash = this.getHashForState();
      window.history.replaceState({ hash: defaultHash }, "", defaultHash);
      if (isInitial) {
        this.render();
        this.autoLoadESVForCurrentChapter(true);
      }
      return;
    }

    const parts = rawHash.split("/").map((p) => decodeURIComponent(p).trim()).filter(Boolean);
    const firstPart = parts[0]?.toLowerCase();

    let bookChanged = false;
    let chapterChanged = false;

    if (firstPart === "book" || firstPart === "rollup") {
      // #/book/:bookId
      this.activeView = "book-rollup";
      const bId = parts[1]?.toUpperCase();
      if (bId && getBookById(bId)) {
        if (this.selectedBookId !== bId) {
          this.selectedBookId = bId;
          this.selectedChapterNum = 1;
          bookChanged = true;
        }
      }
    } else if (firstPart === "quiz" || firstPart === "quiz-diagnostic") {
      // #/quiz/:tab
      this.activeView = "quiz-diagnostic";
      const tab = parts[1]?.toLowerCase();
      if (tab === "history") {
        this.activeQuizTab = "history";
        const testId = parts[2];
        if (testId) {
          const found = Array.isArray(this.data.quizHistory)
            ? this.data.quizHistory.find(
                (t, idx) =>
                  (t.id || `hist_${t.date || idx}`) == testId ||
                  idx == testId ||
                  t.date == testId ||
                  `hist_${t.date}` == testId
              )
            : null;
          this.viewingPastTest = found || null;
        } else {
          this.viewingPastTest = null;
        }
      } else if (tab === "book-quizzes" || tab === "book") {
        this.activeQuizTab = "book-quizzes";
        this.viewingPastTest = null;
        if (parts[2]) {
          this.selectedQuizBookId = parts[2].toUpperCase();
        }
      } else {
        this.activeQuizTab = "diagnostic";
        this.viewingPastTest = null;
      }
    } else if (firstPart === "chapter" && parts.length >= 2) {
      // #/chapter/:bookId/:chapterNum
      this.activeView = "chapter-outliner";
      const bId = parts[1]?.toUpperCase();
      const chNum = parseInt(parts[2], 10) || 1;
      const bObj = getBookById(bId);
      if (bObj) {
        if (this.selectedBookId !== bObj.id) {
          this.selectedBookId = bObj.id;
          bookChanged = true;
        }
        const validCh = Math.max(1, Math.min(chNum, bObj.chapterCount));
        if (this.selectedChapterNum !== validCh) {
          this.selectedChapterNum = validCh;
          chapterChanged = true;
        }
      }
    } else {
      // #/:bookId or #/:bookId/:chapterNum (e.g. #/GEN/1, #/ROM/8, #/MAT)
      const bId = parts[0]?.toUpperCase();
      const bObj = getBookById(bId);
      if (bObj) {
        this.activeView = "chapter-outliner";
        if (this.selectedBookId !== bObj.id) {
          this.selectedBookId = bObj.id;
          bookChanged = true;
        }
        const chNum = parseInt(parts[1], 10) || 1;
        const validCh = Math.max(1, Math.min(chNum, bObj.chapterCount));
        if (this.selectedChapterNum !== validCh) {
          this.selectedChapterNum = validCh;
          chapterChanged = true;
        }
      }
    }

    this.render();

    if (isInitial || bookChanged || chapterChanged) {
      this.autoLoadESVForCurrentChapter(isInitial);
    }
  }

  // Synchronized step to previous chapter / previous book with browser history
  stepToPrevChapter() {
    const book = this.getSelectedBook();
    if (this.selectedChapterNum > 1) {
      this.navigateTo({
        bookId: this.selectedBookId,
        chapterNum: this.selectedChapterNum - 1,
        activeView: "chapter-outliner"
      });
    } else {
      const bookIdx = BIBLE_BOOKS.findIndex((b) => b.id === book.id);
      if (bookIdx > 0) {
        const prevBook = BIBLE_BOOKS[bookIdx - 1];
        this.navigateTo({
          bookId: prevBook.id,
          chapterNum: prevBook.chapterCount,
          activeView: "chapter-outliner"
        });
      }
    }
  }

  // Synchronized step to next chapter / next book with browser history
  stepToNextChapter() {
    const book = this.getSelectedBook();
    if (this.selectedChapterNum < book.chapterCount) {
      this.navigateTo({
        bookId: this.selectedBookId,
        chapterNum: this.selectedChapterNum + 1,
        activeView: "chapter-outliner"
      });
    } else {
      const bookIdx = BIBLE_BOOKS.findIndex((b) => b.id === book.id);
      if (bookIdx < BIBLE_BOOKS.length - 1) {
        const nextBook = BIBLE_BOOKS[bookIdx + 1];
        this.navigateTo({
          bookId: nextBook.id,
          chapterNum: 1,
          activeView: "chapter-outliner"
        });
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
                this.activeView === "quiz-diagnostic"
                  ? renderDiagnosticQuizView({
                      activeQuizTab: this.activeQuizTab,
                      session: this.quizSession,
                      scorecard: this.quizScorecard,
                      viewingPastTest: this.viewingPastTest,
                      questionReviewFilter: this.questionReviewFilter,
                      selectedScope: this.selectedQuizScope,
                      selectedQuestionCount: this.selectedQuizQuestionCount,
                      selectedBookId: this.selectedBookId,
                      historySearchQuery: this.historySearchQuery,
                      historyScopeFilter: this.historyScopeFilter,
                      retakeModalTest: this.retakeModalTest,
                      data: this.data
                    })
                  : this.activeView === "book-rollup"
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
        const bId = card.getAttribute("data-book-id");
        this.navigateTo({
          bookId: bId,
          chapterNum: 1,
          activeView: "chapter-outliner"
        });
      });
    });

    // 2. Navbar view switchers
    const studioViewBtns = document.querySelectorAll(".studio-view-btn");
    studioViewBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.navigateTo({
          activeView: btn.getAttribute("data-view")
        });
      });
    });

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
            await this.syncCloudOutlinesWithLocal(this.googleUser);
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

    // 5. Quiz & Diagnostic Studio interactions
    const quizTabBtns = document.querySelectorAll(".quiz-tab-switch-btn");
    quizTabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const tab = btn.getAttribute("data-quiz-tab");
        this.quizSession = null;
        this.quizScorecard = null;
        this.retakeModalTest = null;
        this.navigateTo({
          activeView: "quiz-diagnostic",
          activeQuizTab: tab,
          viewingPastTest: null
        });
      });
    });

    const selectScopeBtns = document.querySelectorAll(".select-scope-btn");
    selectScopeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.selectedQuizScope = btn.getAttribute("data-select-scope");
        this.render();
      });
    });

    const selectCountBtns = document.querySelectorAll(".select-count-btn");
    selectCountBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.selectedQuizQuestionCount = parseInt(btn.getAttribute("data-select-count"), 10);
        this.render();
      });
    });

    const startDiagnosticBtn = document.getElementById("start-diagnostic-btn");
    if (startDiagnosticBtn) {
      startDiagnosticBtn.addEventListener("click", () => {
        this.quizSession = new DiagnosticSession({
          scope: this.selectedQuizScope,
          questionCount: this.selectedQuizQuestionCount
        });
        this.quizScorecard = null;
        this.viewingPastTest = null;
        this.retakeModalTest = null;
        this.render();
      });
    }

    const launchBookQuizBtns = document.querySelectorAll(".launch-book-quiz-btn");
    launchBookQuizBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const bId = btn.getAttribute("data-launch-book-quiz");
        const bObj = getBookById(bId);
        if (!bObj) return;
        this.selectedBookId = bId;
        this.activeView = "quiz-diagnostic";
        this.activeQuizTab = "diagnostic";
        this.quizSession = new DiagnosticSession({
          scope: "ALL",
          questionCount: Math.min(bObj.chapterCount, 15),
          specificBookId: bId
        });
        this.quizScorecard = null;
        this.viewingPastTest = null;
        this.retakeModalTest = null;
        this.render();
      });
    });

    const examInput = document.getElementById("exam-answer-input");
    const saveCurrentExamInput = () => {
      if (examInput && this.quizSession) {
        this.quizSession.submitCurrentAnswer(examInput.value);
      }
    };

    const finishCurrentExamSession = () => {
      saveCurrentExamInput();
      this.quizScorecard = this.quizSession.finishExam();
      if (!Array.isArray(this.data.quizHistory)) this.data.quizHistory = [];
      const newRecord = {
        id: `quiz_${Date.now()}`,
        date: Date.now(),
        scope: this.quizSession.scope,
        specificBookId: this.quizSession.specificBookId,
        questionCount: this.quizScorecard.totalQuestions,
        durationMs: this.quizScorecard.durationMs,
        questions: this.quizSession.questions,
        answers: this.quizSession.answers,
        scorecard: this.quizScorecard,
        // Legacy compat fields
        total: this.quizScorecard.totalQuestions,
        correct: this.quizScorecard.totalCorrect,
        pct: this.quizScorecard.overallPct
      };
      this.data.quizHistory.unshift(newRecord);
      this.notifyDataChanged();
      if (this.googleUser) {
        saveQuizToCloud(this.googleUser, newRecord).catch(() => {});
        if (this.data.bookMastery) {
          saveMasteryToCloud(this.googleUser, this.data.bookMastery).catch(() => {});
        }
      }
      this.render();
    };

    if (examInput) {
      examInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          saveCurrentExamInput();
          if (this.quizSession.currentIndex < this.quizSession.questions.length - 1) {
            this.quizSession.nextQuestion();
            this.render();
          } else {
            finishCurrentExamSession();
          }
        }
      });
    }

    const examNextBtn = document.getElementById("exam-next-btn");
    if (examNextBtn) {
      examNextBtn.addEventListener("click", () => {
        saveCurrentExamInput();
        this.quizSession.nextQuestion();
        this.render();
      });
    }

    const examPrevBtn = document.getElementById("exam-prev-btn");
    if (examPrevBtn) {
      examPrevBtn.addEventListener("click", () => {
        saveCurrentExamInput();
        this.quizSession.prevQuestion();
        this.render();
      });
    }

    const examSkipBtn = document.getElementById("exam-skip-btn");
    if (examSkipBtn) {
      examSkipBtn.addEventListener("click", () => {
        this.quizSession.nextQuestion();
        this.render();
      });
    }

    const examFinishBtn = document.getElementById("exam-finish-btn");
    if (examFinishBtn) {
      examFinishBtn.addEventListener("click", () => {
        finishCurrentExamSession();
      });
    }

    const resetDiagBtn = document.getElementById("reset-diagnostic-config-btn");
    if (resetDiagBtn) {
      resetDiagBtn.addEventListener("click", () => {
        this.quizSession = null;
        this.quizScorecard = null;
        this.retakeModalTest = null;
        this.navigateTo({
          activeView: "quiz-diagnostic",
          activeQuizTab: "diagnostic",
          viewingPastTest: null
        });
      });
    }

    const backToHistoryBtn = document.getElementById("back-to-history-btn");
    if (backToHistoryBtn) {
      backToHistoryBtn.addEventListener("click", () => {
        this.quizSession = null;
        this.quizScorecard = null;
        this.retakeModalTest = null;
        this.navigateTo({
          activeView: "quiz-diagnostic",
          activeQuizTab: "history",
          viewingPastTest: null
        });
      });
    }

    // Question review filter toggles (All vs Missed Only)
    const reviewFilterBtns = document.querySelectorAll(".set-review-filter-btn");
    reviewFilterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.questionReviewFilter = btn.getAttribute("data-set-review-filter");
        this.render();
      });
    });

    // History scope filter buttons
    const filterHistoryScopeBtns = document.querySelectorAll(".filter-history-scope-btn");
    filterHistoryScopeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.historyScopeFilter = btn.getAttribute("data-history-scope");
        this.render();
      });
    });

    // History search input
    const historySearchInput = document.getElementById("history-search-input");
    if (historySearchInput) {
      historySearchInput.addEventListener("input", (e) => {
        this.historySearchQuery = e.target.value;
        this.render();
        const reSearchInput = document.getElementById("history-search-input");
        if (reSearchInput) {
          reSearchInput.focus();
          reSearchInput.setSelectionRange(reSearchInput.value.length, reSearchInput.value.length);
        }
      });
    }

    const clearHistorySearchBtn = document.getElementById("clear-history-search-btn");
    if (clearHistorySearchBtn) {
      clearHistorySearchBtn.addEventListener("click", () => {
        this.historySearchQuery = "";
        this.render();
      });
    }

    // Review past test buttons
    const reviewPastTestBtns = document.querySelectorAll("[data-review-past-test]");
    reviewPastTestBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const testId = btn.getAttribute("data-review-past-test");
        const found = this.data.quizHistory.find(
          (t, idx) =>
            (t.id || `hist_${t.date || idx}`) == testId ||
            idx == testId ||
            t.date == testId ||
            `hist_${t.date}` == testId
        );
        if (found) {
          this.quizScorecard = null;
          this.questionReviewFilter = "all";
          this.navigateTo({
            activeView: "quiz-diagnostic",
            activeQuizTab: "history",
            viewingPastTest: found
          });
        }
      });
    });

    // Open Retake Modal
    const openRetakeModalBtns = document.querySelectorAll("[data-open-retake-modal]");
    openRetakeModalBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const testId = btn.getAttribute("data-open-retake-modal");
        const found = this.data.quizHistory.find(
          (t, idx) =>
            (t.id || `hist_${t.date || idx}`) == testId ||
            idx == testId ||
            t.date == testId ||
            `hist_${t.date}` == testId
        );
        if (found) {
          this.retakeModalTest = found;
          this.render();
        } else if (this.viewingPastTest) {
          this.retakeModalTest = this.viewingPastTest;
          this.render();
        }
      });
    });

    // Close Retake Modal
    const closeRetakeModalBtn = document.getElementById("close-retake-modal-btn");
    if (closeRetakeModalBtn) {
      closeRetakeModalBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.retakeModalTest = null;
        this.render();
      });
    }

    const retakeModalOverlay = document.getElementById("retake-quiz-modal");
    if (retakeModalOverlay) {
      retakeModalOverlay.addEventListener("click", (e) => {
        if (e.target.id === "retake-quiz-modal") {
          this.retakeModalTest = null;
          this.render();
        }
      });
    }

    // Retake Option selected
    const retakeOptionBtns = document.querySelectorAll(".retake-option-btn");
    retakeOptionBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const action = btn.getAttribute("data-action-retake");
        const testId = btn.getAttribute("data-test-id");
        const test =
          this.retakeModalTest ||
          this.data.quizHistory.find(
            (t, idx) =>
              (t.id || `hist_${t.date || idx}`) == testId ||
              idx == testId ||
              t.date == testId ||
              `hist_${t.date}` == testId
          ) ||
          this.viewingPastTest;

        if (!test) {
          this.retakeModalTest = null;
          this.render();
          return;
        }

        let newSession = null;
        if (action === "exact") {
          const questions =
            test.questions ||
            (test.scorecard?.allReviewedQuestions?.map((r) => r.question)) ||
            [];
          if (questions.length > 0) {
            newSession = new DiagnosticSession({
              scope: test.scope || "ALL",
              specificBookId: test.specificBookId,
              customQuestions: questions
            });
          } else {
            newSession = new DiagnosticSession({
              scope: test.scope || "ALL",
              questionCount: test.questionCount || test.total || 25,
              specificBookId: test.specificBookId
            });
          }
        } else if (action === "missed") {
          const missedList = test.scorecard?.missedQuestions || test.missedQuestions || [];
          const missedQuestions = missedList.map((m) => m.question || m).filter(Boolean);
          if (missedQuestions.length > 0) {
            newSession = new DiagnosticSession({
              scope: test.scope || "ALL",
              specificBookId: test.specificBookId,
              customQuestions: missedQuestions
            });
          } else {
            // For legacy tests where specific missed questions list is not available, launch targeted drill
            newSession = new DiagnosticSession({
              scope: test.scope || "ALL",
              questionCount: Math.min(test.questionCount || test.total || 10, 10),
              specificBookId: test.specificBookId
            });
          }
        } else {
          // "new" randomized test with same settings
          newSession = new DiagnosticSession({
            scope: test.scope || "ALL",
            questionCount: test.questionCount || test.total || 25,
            specificBookId: test.specificBookId
          });
        }

        if (newSession) {
          this.quizSession = newSession;
          this.quizScorecard = null;
          this.viewingPastTest = null;
          this.retakeModalTest = null;
          this.activeView = "quiz-diagnostic";
          this.activeQuizTab = "diagnostic";
          this.render();
        }
      });
    });

    // Delete single past test record
    const deletePastTestBtns = document.querySelectorAll(".delete-past-test-btn");
    deletePastTestBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const testId = btn.getAttribute("data-delete-past-test");
        if (confirm("Delete this test session from your history?")) {
          this.data.quizHistory = this.data.quizHistory.filter(
            (t, idx) => (t.id || `hist_${t.date || idx}`) != testId && idx != testId
          );
          if (
            this.viewingPastTest &&
            (this.viewingPastTest.id == testId || `hist_${this.viewingPastTest.date}` == testId)
          ) {
            this.viewingPastTest = null;
          }
          this.notifyDataChanged();
          if (this.googleUser) {
            deleteQuizFromCloud(this.googleUser, testId).catch(() => {});
          }
          this.render();
        }
      });
    });

    // Clear all test history
    const clearAllHistoryBtn = document.getElementById("clear-all-quiz-history-btn");
    if (clearAllHistoryBtn) {
      clearAllHistoryBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to permanently clear all test history? This cannot be undone.")) {
          this.data.quizHistory = [];
          this.viewingPastTest = null;
          this.notifyDataChanged();
          if (this.googleUser) {
            clearAllQuizzesFromCloud(this.googleUser).catch(() => {});
          }
          this.render();
        }
      });
    }

    // Inline Scripture Inspection on Questions in Quiz Scorecard / Review
    const inspectBtns = document.querySelectorAll(".inspect-scripture-btn");
    inspectBtns.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const bId = btn.getAttribute("data-book-id");
        const ch = parseInt(btn.getAttribute("data-chapter"), 10);
        const qIdx = btn.getAttribute("data-q-idx");
        const container = document.getElementById(`inline-scripture-container-${qIdx}`);
        const body = document.getElementById(`inline-scripture-body-${qIdx}`);
        const icon = btn.querySelector(`.inspect-icon-${qIdx}`);

        if (!container || !body) return;

        const isHidden = container.classList.contains("hidden");
        if (!isHidden) {
          container.classList.add("hidden");
          if (icon) icon.textContent = "▼";
          return;
        }

        container.classList.remove("hidden");
        if (icon) icon.textContent = "▲";

        if (body.getAttribute("data-loaded") === "true") return;

        const book = getBookById(bId);
        const bookName = book?.name || bId;

        // Check local chapter notes cache first
        const chKey = `${bId}-${ch}`;
        const chapterData = this.data.chapters ? this.data.chapters[chKey] : null;
        if (chapterData && chapterData.chapterScripture) {
          body.innerHTML = formatESVTextToHTML(chapterData.chapterScripture);
          body.setAttribute("data-loaded", "true");
          return;
        }

        const loadScripture = async () => {
          try {
            body.innerHTML = `<div class="text-[#8C8A84] italic animate-pulse">📖 Loading ${bookName} ${ch} (ESV Scripture)...</div>`;
            const esvText = await fetchESVChapter(bookName, ch);
            if (esvText) {
              body.innerHTML = formatESVTextToHTML(esvText);
              body.setAttribute("data-loaded", "true");
              // Cache into chapter data for fast subsequent lookups
              if (this.data.chapters && this.data.chapters[chKey]) {
                this.data.chapters[chKey].chapterScripture = esvText;
              }
            } else {
              body.innerHTML = `<p class="text-[#8C8A84] italic">Scripture text unavailable for ${bookName} ${ch}.</p>`;
            }
          } catch (err) {
            console.error("Failed to load inline scripture:", err);
            body.innerHTML = `
              <div class="space-y-2 p-2 bg-rose-950/20 border border-rose-900/40 rounded-lg">
                <p class="text-rose-400 text-xs font-semibold">Could not load ESV scripture: ${err.message}</p>
                <button class="retry-inspect-btn text-xs px-3 py-1 bg-[#2A2A27] hover:bg-[#383834] text-[#EAE8E2] rounded transition">
                  🔄 Retry Loading
                </button>
              </div>
            `;
            body.querySelector(".retry-inspect-btn")?.addEventListener("click", (ev) => {
              ev.stopPropagation();
              loadScripture();
            });
          }
        };

        await loadScripture();
      });
    });

    // Close buttons on inline scripture inspector
    const closeScriptureBtns = document.querySelectorAll("[data-close-scripture]");
    closeScriptureBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const qIdx = btn.getAttribute("data-close-scripture");
        const container = document.getElementById(`inline-scripture-container-${qIdx}`);
        const inspectBtn = document.querySelector(`[data-inspect-scripture="true"][data-q-idx="${qIdx}"]`);
        const icon = inspectBtn ? inspectBtn.querySelector(`.inspect-icon-${qIdx}`) : null;
        if (container) {
          container.classList.add("hidden");
          if (icon) icon.textContent = "▼";
        }
      });
    });

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

