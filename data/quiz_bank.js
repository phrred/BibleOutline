import { getBookById } from "./bible_catalog.js";

// --------------------------------------------------------------------------
// COMPACT QUESTION BANK REPOSITORY
// Auto-hydrated at load time for minimal bundle footprint and fast evaluation
// --------------------------------------------------------------------------

export const RAW_QUESTIONS = [
  {
    "id": "bmpi_pent_2",
    "t": "facts",
    "p": "This leader had his priestly leadership confirmed when his dry almond rod miraculously sprouted, budded, and produced ripe almonds.",
    "b": "NUM",
    "c": 17,
    "a": [
      "Aaron",
      "Aaron the priest"
    ],
    "e": "Numbers 17:8: Aaron's rod sprouted, budded, blossomed, and produced almonds, proving God's choice."
  },
  {
    "id": "bmpi_pent_7",
    "t": "book_chapter",
    "p": "Book & chapter containing the Protoevangelium (first Gospel promise): 'I will put enmity between you and the woman, and between your offspring and hers; he will crush your head, and you will strike his heel.'",
    "b": "GEN",
    "c": 3,
    "a": [
      "Genesis 3",
      "Gen 3",
      "Genesis 3:15",
      "Gen 3:15"
    ],
    "e": "Genesis 3:15: First prophetic announcement of Christ defeating Satan."
  },
  {
    "id": "bmpi_pent_8",
    "t": "book_chapter",
    "p": "Book & chapter where God formally cuts His covenant of circumcision with Abraham and promises he will be the father of a multitude of nations:",
    "b": "GEN",
    "c": 17,
    "a": [
      "Genesis 17",
      "Gen 17",
      "Genesis 17:1-7"
    ],
    "e": "Genesis 17: God changes Abram's name to Abraham and establishes circumcision."
  },
  {
    "id": "bmpi_pent_9",
    "t": "chapter_in_book",
    "p": "What chapter in Leviticus describes Yom Kippur (The Day of Atonement) and the scapegoat sent into the wilderness?",
    "b": "LEV",
    "c": 16,
    "a": [
      "16",
      "Leviticus 16",
      "Lev 16",
      "ch 16",
      "chapter 16"
    ],
    "d": "Leviticus 16 (or Chapter 16)",
    "e": "Leviticus 16 details the high priest entering the Holy of Holies once a year with blood for atonement."
  },
  {
    "id": "bmpi_pent_10",
    "t": "facts",
    "p": "Which two books in the Pentateuch record the Ten Commandments (Decalogue)?",
    "b": "EXO",
    "c": 20,
    "a": [
      "Exodus and Deuteronomy",
      "Exodus & Deuteronomy",
      "Exodus, Deuteronomy",
      "Deuteronomy and Exodus",
      "Exo and Deut"
    ],
    "e": "The Ten Commandments are given at Sinai in Exodus 20 and repeated before entering Canaan in Deuteronomy 5."
  },
  {
    "id": "bmpi_pent_11",
    "t": "book_id",
    "p": "In what book does Moses make a bronze serpent and set it on a pole so anyone bitten by a fiery serpent would look at it and live?",
    "b": "NUM",
    "c": 21,
    "a": [
      "Numbers",
      "Num"
    ],
    "e": "Numbers 21:8-9: Jesus refers to this in John 3:14 ('As Moses lifted up the serpent in the wilderness...')."
  },
  {
    "id": "bmpi_pent_12",
    "t": "facts",
    "p": "Which patriarch told his brothers: 'As for you, you meant evil against me, but God meant it for good, to bring it about that many people should be kept alive'?",
    "b": "GEN",
    "c": 50,
    "a": [
      "Joseph",
      "Joseph son of Jacob"
    ],
    "e": "Genesis 50:20: The climax of Joseph's life and the theme of God's providence."
  },
  {
    "id": "bmpi_pent_13",
    "t": "book_chapter",
    "p": "Book & chapter where God reveals His name 'I AM WHO I AM' (Yahweh) to Moses at the burning bush:",
    "b": "EXO",
    "c": 3,
    "a": [
      "Exodus 3",
      "Exo 3",
      "Exodus 3:14",
      "Exodus ch 3"
    ],
    "e": "Exodus 3:14: God speaks to Moses at Mount Horeb from the burning bush."
  },
  {
    "id": "bmpi_pent_14",
    "t": "chapter_in_book",
    "p": "What chapter in Exodus institutes the Passover lamb and the deliverance from the tenth plague?",
    "b": "EXO",
    "c": 12,
    "a": [
      "12",
      "Exodus 12",
      "Exo 12",
      "ch 12",
      "chapter 12"
    ],
    "d": "Exodus 12 (or Chapter 12)",
    "e": "Exodus 12: The blood of the Passover lamb placed on doorposts protects Israel's firstborn."
  },
  {
    "id": "bmpi_pent_15",
    "t": "facts",
    "p": "Moses' father-in-law who gave him practical advice on delegating judicial leadership and appointing capable leaders over thousands, hundreds, fifties, and tens:",
    "b": "EXO",
    "c": 18,
    "a": [
      "Jethro",
      "Reuel",
      "Jethro the priest of Midian"
    ],
    "d": "Jethro (Reuel)",
    "e": "Exodus 18:13-27: Jethro's delegation model is a foundational biblical leadership principle."
  },
  {
    "id": "bmpi_hist_2",
    "t": "facts",
    "p": "This godly high priest protected young Joash in a coup d'\u00e9tat against Athaliah and crowned him king, influencing the nation for good throughout his life:",
    "b": "2KI",
    "c": 11,
    "a": [
      "Jehoiada",
      "Jehoiada the priest"
    ],
    "e": "2 Kings 11-12 & 2 Chronicles 24: Jehoiada guided King Joash in righteousness."
  },
  {
    "id": "bmpi_hist_7",
    "t": "facts",
    "p": "This prophet and judge transitioned Israel from decentralized judges to centralized monarchy, exemplifying prayer: 'Far be it from me that I should sin against the Lord by ceasing to pray for you':",
    "b": "1SA",
    "c": 12,
    "a": [
      "Samuel",
      "Prophet Samuel"
    ],
    "e": "1 Samuel 12:23: Samuel's dedication to intercession and teaching."
  },
  {
    "id": "bmpi_hist_9",
    "t": "facts",
    "p": "This prophet had a classic power encounter with 450 prophets of Baal on Mount Carmel, calling down fire from heaven:",
    "b": "1KI",
    "c": 18,
    "a": [
      "Elijah",
      "Elijah the Tishbite"
    ],
    "e": "1 Kings 18: Elijah's victory on Mount Carmel."
  },
  {
    "id": "bmpi_hist_10",
    "t": "facts",
    "p": "This king of Judah prospered when he sought God, but grew proud and entered the Temple to burn incense, being struck by God with leprosy on his forehead:",
    "b": "2CH",
    "c": 26,
    "a": [
      "Uzziah",
      "Azariah",
      "King Uzziah"
    ],
    "d": "Uzziah (Azariah)",
    "e": "2 Chronicles 26:16-21: Uzziah's pride and unlawful usurpation of the priesthood."
  },
  {
    "id": "bmpi_hist_11",
    "t": "facts",
    "p": "This prophetess and judge led Israel during a time of crisis against Jabin king of Hazor and his general Sisera:",
    "b": "JDG",
    "c": 4,
    "a": [
      "Deborah"
    ],
    "e": "Judges 4-5: Deborah judged Israel and summoned Barak to battle."
  },
  {
    "id": "bmpi_hist_12",
    "t": "facts",
    "p": "This courageous prophet stood alone against 400 false prophets before Ahab and Jehoshaphat, speaking truth despite being slapped and imprisoned:",
    "b": "1KI",
    "c": 22,
    "a": [
      "Micaiah",
      "Micaiah son of Imlah"
    ],
    "e": "1 Kings 22: Micaiah prophesied Ahab's defeat and death at Ramoth-gilead."
  },
  {
    "id": "bmpi_hist_13",
    "t": "facts",
    "p": "This wise king built the glorious temple in Jerusalem but finished poorly as his foreign wives turned his heart away after other gods:",
    "b": "1KI",
    "c": 11,
    "a": [
      "Solomon",
      "King Solomon"
    ],
    "e": "1 Kings 11: Solomon's divided loyalty and tragic decline in old age."
  },
  {
    "id": "bmpi_hist_14",
    "t": "facts",
    "p": "Aaron's son and successor as high priest, who served alongside Joshua in dividing the Promised Land by lot:",
    "b": "NUM",
    "c": 20,
    "a": [
      "Eleazar",
      "Eleazar the priest"
    ],
    "e": "Numbers 20:25-28 & Joshua 14:1: Eleazar succeeded Aaron on Mount Hor.",
    "g": "Historical"
  },
  {
    "id": "bmpi_hist_15",
    "t": "facts",
    "p": "Elijah's servant and successor who received a double portion of his spirit and performed numerous miracles demonstrating God's compassion and power:",
    "b": "2KI",
    "c": 2,
    "a": [
      "Elisha",
      "Elisha son of Shaphat"
    ],
    "e": "2 Kings 2-13: Elisha's extensive prophetic and pastoral ministry in Israel."
  },
  {
    "id": "bmpi_hist_16",
    "t": "facts",
    "p": "This priest at Shiloh failed to discipline his corrupt sons Hophni and Phinehas, resulting in his sons dying on the same day and the Ark being captured:",
    "b": "1SA",
    "c": 2,
    "a": [
      "Eli",
      "Eli the priest"
    ],
    "e": "1 Samuel 2-4: Eli's negative example of parental and spiritual negligence."
  },
  {
    "id": "bmpi_hist_17",
    "t": "facts",
    "p": "This godly king sent Levites to teach the Law in Judah's cities and appointed honest judges, though he made an unwise alliance with wicked King Ahab:",
    "b": "2CH",
    "c": 17,
    "a": [
      "Jehoshaphat",
      "King Jehoshaphat"
    ],
    "e": "2 Chronicles 17-20: Jehoshaphat led Judah to victory through prayer and worship."
  },
  {
    "id": "bmpi_hist_18",
    "t": "book_id",
    "p": "In what Old Testament book does Boaz act as the kinsman-redeemer (Go'el), foreshadowing Christ and concluding with the genealogy of David?",
    "b": "RUT",
    "c": 4,
    "a": [
      "Ruth",
      "Book of Ruth",
      "Rut"
    ],
    "e": "Ruth 4: Boaz marries Ruth to redeem Elimelech's line, fathering Obed the grandfather of David."
  },
  {
    "id": "bmpi_poet_2",
    "t": "book_id",
    "p": "In what book does this observation occur: 'Because the sentence against an evil deed is not executed speedily, the heart of the children of man is fully set to do evil'?",
    "b": "ECC",
    "c": 8,
    "a": [
      "Ecclesiastes",
      "Ecc",
      "Qoheleth"
    ],
    "e": "Ecclesiastes 8:11: Solomon observes how delayed justice encourages wickedness."
  },
  {
    "id": "bmpi_poet_5",
    "t": "book_id",
    "p": "What book reflects on Joseph: 'He had sent a man before them, Joseph, who was sold as a slave. His feet were hurt with fetters; his neck was put in a collar of iron; until what he had said came to pass, the word of the Lord tested him'?",
    "b": "PSA",
    "c": 105,
    "a": [
      "Psalms",
      "Psalm 105",
      "Psalm",
      "Psa 105"
    ],
    "d": "Psalms (Psalm 105)",
    "e": "Psalm 105:17-19: A poetic historical psalm recounting God's covenant faithfulness."
  },
  {
    "id": "bmpi_poet_6",
    "t": "book_id",
    "p": "In what book does the phrase occur: 'I am my beloved's and my beloved is mine; he grazes among the lilies'?",
    "b": "SNG",
    "c": 6,
    "a": [
      "Song of Solomon",
      "Song of Songs",
      "Canticles",
      "Sng"
    ],
    "d": "Song of Solomon (Song of Songs)",
    "e": "Song of Solomon 6:3: The mutual devotion of bride and groom."
  },
  {
    "id": "bmpi_poet_7",
    "t": "book_id",
    "p": "In what book does this historical reflection on Israel's craving occur: 'He gave them what they asked, but sent a wasting disease among them (leanness to their souls)'?",
    "b": "PSA",
    "c": 106,
    "a": [
      "Psalms",
      "Psalm 106",
      "Psalm",
      "Psa 106"
    ],
    "d": "Psalms (Psalm 106)",
    "e": "Psalm 106:15: Warning about demanding things contrary to God's good timing."
  },
  {
    "id": "bmpi_poet_8",
    "t": "book_chapter",
    "p": "Book & chapter containing: 'Delight yourself in the Lord, and he will give you the desires of your heart. Commit your way to the Lord; trust in him, and he will act':",
    "b": "PSA",
    "c": 37,
    "a": [
      "Psalm 37",
      "Psalms 37",
      "Psa 37",
      "Psalm 37:4"
    ],
    "e": "Psalm 37:4-5: David's wisdom psalm on trusting the LORD over evildoers."
  },
  {
    "id": "bmpi_poet_9",
    "t": "book_chapter",
    "p": "Book & chapter where David cries: 'Create in me a clean heart, O God, and renew a right spirit within me. Cast me not away from your presence...':",
    "b": "PSA",
    "c": 51,
    "a": [
      "Psalm 51",
      "Psalms 51",
      "Psa 51",
      "Psalm 51:10"
    ],
    "e": "Psalm 51:10-12: David's great prayer of confession after Nathan's confrontation."
  },
  {
    "id": "bmpi_poet_10",
    "t": "book_chapter",
    "p": "Book & chapter: 'Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths':",
    "b": "PRO",
    "c": 3,
    "a": [
      "Proverbs 3",
      "Prov 3",
      "Proverbs 3:5",
      "Proverbs 3:5-6"
    ],
    "e": "Proverbs 3:5-6: Foundational biblical principle for divine guidance."
  },
  {
    "id": "bmpi_poet_11",
    "t": "book_id",
    "p": "In what book does this saying on divine sovereignty appear: 'The king's heart is a stream of water in the hand of the Lord; he turns it wherever he will'?",
    "b": "PRO",
    "c": 21,
    "a": [
      "Proverbs",
      "Prov",
      "Proverbs 21"
    ],
    "e": "Proverbs 21:1: Affirming God's ultimate sovereignty over earthly rulers."
  },
  {
    "id": "bmpi_prop_2",
    "t": "book_id",
    "p": "In what book does God encourage Zerubbabel: 'Not by might, nor by power, but by my Spirit, says the Lord of hosts'?",
    "b": "ZEC",
    "c": 4,
    "a": [
      "Zechariah",
      "Zec",
      "Zechariah 4"
    ],
    "e": "Zechariah 4:6: The empowerment for rebuilding the Temple."
  },
  {
    "id": "bmpi_prop_7",
    "t": "chapter_in_book",
    "p": "What chapter in Ezekiel contains the vision of the Valley of Dry Bones coming to life by the breath (Spirit) of God?",
    "b": "EZK",
    "c": 37,
    "a": [
      "37",
      "Ezekiel 37",
      "Ezek 37",
      "Ezk 37",
      "ch 37",
      "chapter 37"
    ],
    "d": "Ezekiel 37 (or Chapter 37)",
    "e": "Ezekiel 37:1-14: Prophetic vision of Israel's national and spiritual resurrection.",
    "s": "OT",
    "g": "Major Prophets"
  },
  {
    "id": "bmpi_prop_9",
    "t": "facts",
    "p": "Which prophet foretold the outpouring of the Holy Spirit: 'And it shall come to pass afterward, that I will pour out my Spirit on all flesh; your sons and your daughters shall prophesy...', quoted by Peter in Acts 2?",
    "b": "JOL",
    "c": 2,
    "a": [
      "Joel",
      "Jol"
    ],
    "e": "Joel 2:28-32: Prophesied the outpouring of the Spirit fulfilled at Pentecost.",
    "s": "OT",
    "g": "Minor Prophets"
  },
  {
    "id": "bmpi_prop_10",
    "t": "facts",
    "p": "Which prophet predicted the Messiah would be born in Bethlehem Ephrathah: 'from you shall come forth for me one who is to be ruler in Israel, whose coming forth is from of old, from ancient days'?",
    "b": "MIC",
    "c": 5,
    "a": [
      "Micah",
      "Mic"
    ],
    "e": "Micah 5:2: Quoted by the chief priests and scribes to King Herod in Matthew 2:6."
  },
  {
    "id": "bmpi_prop_11",
    "t": "book_id",
    "p": "In what book does God challenge His people: 'Bring the full tithe into the storehouse, that there may be food in my house. And thereby put me to the test... if I will not open the windows of heaven for you'?",
    "b": "MAL",
    "c": 3,
    "a": [
      "Malachi",
      "Mal"
    ],
    "e": "Malachi 3:10: The final Old Testament prophet addressing covenant unfaithfulness."
  },
  {
    "id": "bmpi_gosp_2",
    "t": "book_chapter",
    "p": "Book & chapter containing the Great Commission: 'Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, teaching them to observe all that I have commanded you':",
    "b": "MAT",
    "c": 28,
    "a": [
      "Matthew 28",
      "Matt 28",
      "Mt 28",
      "Matthew 28:19",
      "Matthew 28:18-20"
    ],
    "e": "Matthew 28:18-20: Jesus' authoritative commission to the Church."
  },
  {
    "id": "bmpi_gosp_6",
    "t": "book_chapter",
    "p": "Book & chapter: 'And the Word became flesh and dwelt among us, and we have seen his glory, glory as of the only Son from the Father, full of grace and truth':",
    "b": "JHN",
    "c": 1,
    "a": [
      "John 1",
      "Jn 1",
      "John 1:14",
      "John ch 1"
    ],
    "e": "John 1:14: The pinnacle declaration of the Incarnation."
  },
  {
    "id": "bmpi_gosp_7",
    "t": "chapter_in_book",
    "p": "In what chapter of Acts does Peter declare before the Sanhedrin: 'And there is salvation in no one else, for there is no other name under heaven given among men by which we must be saved'?",
    "b": "ACT",
    "c": 4,
    "a": [
      "4",
      "Acts 4",
      "Act 4",
      "ch 4",
      "chapter 4"
    ],
    "d": "Acts 4 (or Chapter 4)",
    "e": "Acts 4:12: Peter boldly proclaims the exclusivity of Jesus Christ as Savior."
  },
  {
    "id": "bmpi_gosp_8",
    "t": "facts",
    "p": "Which three chapters in Matthew comprise the complete Sermon on the Mount?",
    "b": "MAT",
    "c": 5,
    "a": [
      "Matthew 5, 6, 7",
      "Matthew 5-7",
      "Matt 5-7",
      "5-7",
      "5, 6, 7"
    ],
    "d": "Matthew 5, 6, and 7",
    "e": "Matthew chapters 5, 6, and 7 contain the Beatitudes, Lord's Prayer, and Kingdom ethics."
  },
  {
    "id": "bmpi_gosp_9",
    "t": "facts",
    "p": "Which four chapters in John contain Jesus' Upper Room Farewell Discourse and High Priestly Prayer?",
    "b": "JHN",
    "c": 14,
    "a": [
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
    "d": "John 14\u201317",
    "e": "John 14\u201317: Jesus comforts His disciples, promises the Holy Spirit, and prays for believers."
  },
  {
    "id": "bmpi_gosp_10",
    "t": "chapter_in_book",
    "p": "What chapter in Luke contains the trilogy of parables: the Lost Sheep, the Lost Coin, and the Prodigal Son?",
    "b": "LUK",
    "c": 15,
    "a": [
      "15",
      "Luke 15",
      "Luk 15",
      "ch 15",
      "chapter 15"
    ],
    "d": "Luke 15 (or Chapter 15)",
    "e": "Luke 15: Demonstrates God's lavish joy over one sinner who repents."
  },
  {
    "id": "bmpi_paul_1",
    "t": "book_chapter",
    "p": "In what book and chapter does Paul explain: 'For the Lord himself will descend from heaven with a cry of command, with the voice of an archangel, and with the sound of the trumpet of God. And the dead in Christ will rise first. Then we who are alive, who are left, will be caught up together with them in the clouds...'?",
    "b": "1TH",
    "c": 4,
    "a": [
      "1 Thessalonians 4",
      "1 Thess 4",
      "1Th 4",
      "1 Thessalonians 4:16-17"
    ],
    "e": "1 Thessalonians 4:13-18: Paul comforts believers concerning the resurrection and the return of Christ."
  },
  {
    "id": "bmpi_paul_2",
    "t": "book_id",
    "p": "In what epistle does Paul write that the grace of God trains us to renounce ungodliness and worldly passions while waiting for our 'blessed hope, the appearing of the glory of our great God and Savior Jesus Christ'?",
    "b": "TIT",
    "c": 2,
    "a": [
      "Titus",
      "Tit"
    ],
    "e": "Titus 2:11-14: Grace transforms daily character and fosters eager expectation of Christ's return."
  },
  {
    "id": "bmpi_paul_3",
    "t": "book_id",
    "p": "In what book does Paul state his purpose for leaving a coworker: 'This is why I left you in Crete, so that you might put what remained into order, and appoint elders in every town as I directed you'?",
    "b": "TIT",
    "c": 1,
    "a": [
      "Titus",
      "Tit"
    ],
    "e": "Titus 1:5: Paul's instructions to Titus on establishing godly church governance."
  },
  {
    "id": "bmpi_paul_4",
    "t": "book_id",
    "p": "What epistle contains the lofty christological declaration: 'For in him the whole fullness of deity dwells bodily, and you have been filled in him, who is the head of all rule and authority'?",
    "b": "COL",
    "c": 2,
    "a": [
      "Colossians",
      "Col"
    ],
    "e": "Colossians 2:9-10: Refutes proto-Gnostic heresy by asserting Christ's complete and bodily deity."
  },
  {
    "id": "bmpi_paul_5",
    "t": "book_chapter",
    "p": "Book & chapter: 'I have been crucified with Christ. It is no longer I who live, but Christ who lives in me. And the life I now live in the flesh I live by faith in the Son of God, who loved me and gave himself for me':",
    "b": "GAL",
    "c": 2,
    "a": [
      "Galatians 2",
      "Gal 2",
      "Galatians 2:20",
      "Gal 2:20"
    ],
    "e": "Galatians 2:20: The heart of the believer's identification and union with Christ."
  },
  {
    "id": "bmpi_paul_6",
    "t": "book_id",
    "p": "In what epistle does Paul pen the famous aphorism: 'for we walk by faith, not by sight'?",
    "b": "2CO",
    "c": 5,
    "a": [
      "2 Corinthians",
      "2 Cor",
      "2Cor"
    ],
    "e": "2 Corinthians 5:7: Living with an eternal heavenly perspective amidst mortal trials."
  },
  {
    "id": "bmpi_paul_7",
    "t": "chapter_in_book",
    "p": "What chapter in Romans teaches that our old self was crucified with Christ so that we would no longer be enslaved to sin, but walk in newness of life?",
    "b": "ROM",
    "c": 6,
    "a": [
      "6",
      "Romans 6",
      "Rom 6",
      "ch 6",
      "chapter 6"
    ],
    "d": "Romans 6 (or Chapter 6)",
    "e": "Romans 6: Explains baptism into Christ's death and resurrection power over sin."
  },
  {
    "id": "bmpi_paul_8",
    "t": "chapter_in_book",
    "p": "In what chapter of Romans does Paul exclaim: 'No, in all these things we are more than conquerors through him who loved us' and declare nothing can separate us from God's love?",
    "b": "ROM",
    "c": 8,
    "a": [
      "8",
      "Romans 8",
      "Rom 8",
      "ch 8",
      "chapter 8"
    ],
    "d": "Romans 8 (or Chapter 8)",
    "e": "Romans 8:37-39: The grand crescendo of Romans affirming eternal security."
  },
  {
    "id": "bmpi_paul_9",
    "t": "book_chapter",
    "p": "Book & chapter: 'No temptation has overtaken you that is not common to man. God is faithful, and he will not let you be tempted beyond your ability, but with the temptation he will also provide the way of escape...':",
    "b": "1CO",
    "c": 10,
    "a": [
      "1 Corinthians 10",
      "1 Cor 10",
      "1Co 10",
      "1 Corinthians 10:13"
    ],
    "e": "1 Corinthians 10:13: God's faithful provision of endurance and escape in temptation."
  },
  {
    "id": "bmpi_paul_10",
    "t": "chapter_in_book",
    "p": "What chapter in 1 Corinthians is known as the 'Love Chapter', concluding with 'So now faith, hope, and love abide, these three; but the greatest of these is love'?",
    "b": "1CO",
    "c": 13,
    "a": [
      "13",
      "1 Corinthians 13",
      "1 Cor 13",
      "ch 13",
      "chapter 13"
    ],
    "d": "1 Corinthians 13 (or Chapter 13)",
    "e": "1 Corinthians 13: Demonstrates that spiritual gifts without love are noisy and unprofitable."
  },
  {
    "id": "bmpi_paul_11",
    "t": "book_id",
    "p": "In what epistle does Paul write: 'For the weapons of our warfare are not of the flesh but have divine power to destroy strongholds. We destroy arguments and every lofty opinion raised against the knowledge of God'?",
    "b": "2CO",
    "c": 10,
    "a": [
      "2 Corinthians",
      "2 Cor",
      "2Cor"
    ],
    "e": "2 Corinthians 10:4-5: Spiritual warfare through biblical truth and taking thoughts captive."
  },
  {
    "id": "bmpi_paul_12",
    "t": "book_id",
    "p": "Which prison epistle emphasizes that true Christian joy transcends difficult circumstances, featuring 'Rejoice in the Lord always; again I will say, rejoice'?",
    "b": "PHP",
    "c": 4,
    "a": [
      "Philippians",
      "Phil",
      "Php"
    ],
    "e": "Philippians: Paul writes from Roman imprisonment with overflowing joy in Christ."
  },
  {
    "id": "bmpi_paul_13",
    "t": "chapter_in_book",
    "p": "What chapter in Ephesians describes the complete Armor of God (belt of truth, breastplate of righteousness, shield of faith, helmet of salvation, sword of the Spirit)?",
    "b": "EPH",
    "c": 6,
    "a": [
      "6",
      "Ephesians 6",
      "Eph 6",
      "ch 6",
      "chapter 6"
    ],
    "d": "Ephesians 6 (or Chapter 6)",
    "e": "Ephesians 6:10-18: The believer's armor for standing against the schemes of the devil."
  },
  {
    "id": "bmpi_paul_14",
    "t": "book_id",
    "p": "In what short letter does Paul urge a Christian slave owner to receive back his runaway slave Onesimus 'no longer as a bondservant but more than a bondservant, as a beloved brother'?",
    "b": "PHM",
    "c": 1,
    "a": [
      "Philemon",
      "Phm"
    ],
    "e": "Philemon: A masterwork of Christian persuasion, reconciliation, and brotherhood."
  },
  {
    "id": "bmpi_paul_15",
    "t": "book_id",
    "p": "Paul's final recorded letter, written from a Roman dungeon facing execution, where he writes 'I have fought the good fight, I have finished the race, I have kept the faith':",
    "b": "2TI",
    "c": 4,
    "a": [
      "2 Timothy",
      "2 Tim",
      "2Ti"
    ],
    "e": "2 Timothy 4:6-8: Paul's final charge and farewell to his son in the faith, Timothy."
  },
  {
    "id": "bmpi_gen_1",
    "t": "book_id",
    "p": "In what epistle does the author instruct: 'Remember your leaders, those who spoke to you the word of God. Consider the outcome of their way of life, and imitate their faith'?",
    "b": "HEB",
    "c": 13,
    "a": [
      "Hebrews",
      "Heb"
    ],
    "e": "Hebrews 13:7: Highlights the crucial leadership principle of godly role modeling."
  },
  {
    "id": "bmpi_gen_2",
    "t": "book_id",
    "p": "Which short epistle opens: 'The elder to the elect lady and her children, whom I love in truth, and not only I, but also all who know the truth'?",
    "b": "2JN",
    "c": 1,
    "a": [
      "2 John",
      "2 Jn",
      "Second John"
    ],
    "e": "2 John 1: Warns against deceivers who do not confess Jesus Christ coming in the flesh."
  },
  {
    "id": "bmpi_gen_3",
    "t": "book_id",
    "p": "In what epistle does the author recount that the archangel Michael, when disputing with the devil about the body of Moses, said: 'The Lord rebuke you!'?",
    "b": "JUD",
    "c": 1,
    "a": [
      "Jude",
      "Jud"
    ],
    "e": "Jude 9: A warning against arrogant blasphemy by illustrating Michael's reverent humility."
  },
  {
    "id": "bmpi_gen_4",
    "t": "book_id",
    "p": "In what epistle does this gospel summary occur: 'For Christ also suffered once for sins, the righteous for the unrighteous, that he might bring us to God, being put to death in the flesh but made alive in the spirit'?",
    "b": "1PE",
    "c": 3,
    "a": [
      "1 Peter",
      "1 Pet",
      "1Pe"
    ],
    "e": "1 Peter 3:18: The heart of Christ's substitutionary suffering on behalf of believers."
  },
  {
    "id": "bmpi_gen_5",
    "t": "book_id",
    "p": "In which short epistle does John commend Gaius for showing hospitality to traveling missionary workers ('fellow workers for the truth') while rebuking Diotrephes?",
    "b": "3JN",
    "c": 1,
    "a": [
      "3 John",
      "3 Jn",
      "Third John"
    ],
    "e": "3 John 1-8: Commends support and hospitality for traveling ministers of the Gospel."
  },
  {
    "id": "bmpi_gen_6",
    "t": "chapter_in_book",
    "p": "What chapter in Revelation describes the New Jerusalem descending out of heaven: 'He will wipe away every tear from their eyes, and death shall be no more, neither shall there be mourning, nor crying, nor pain anymore'?",
    "b": "REV",
    "c": 21,
    "a": [
      "21",
      "Revelation 21",
      "Rev 21",
      "ch 21",
      "chapter 21"
    ],
    "d": "Revelation 21 (or Chapter 21)",
    "e": "Revelation 21: The vision of the new heaven, new earth, and holy city."
  },
  {
    "id": "bmpi_gen_7",
    "t": "chapter_in_book",
    "p": "What chapter in James argues that 'faith by itself, if it does not have works, is dead', using Abraham and Rahab as examples of living faith?",
    "b": "JAS",
    "c": 2,
    "a": [
      "2",
      "James 2",
      "Jas 2",
      "ch 2",
      "chapter 2"
    ],
    "d": "James 2 (or Chapter 2)",
    "e": "James 2:14-26: Demonstrates that genuine saving faith inevitably produces righteous fruit."
  },
  {
    "id": "bmpi_gen_8",
    "t": "chapter_in_book",
    "p": "What chapter in Hebrews explains that Jesus is a high priest forever after the order of Melchizedek, surpassing the Levitical priesthood?",
    "b": "HEB",
    "c": 7,
    "a": [
      "7",
      "Hebrews 7",
      "Heb 7",
      "ch 7",
      "chapter 7"
    ],
    "d": "Hebrews 7 (or Chapter 7)",
    "e": "Hebrews 7: Christ's indestructible life and eternal priesthood superior to Aaron's line."
  },
  {
    "id": "bmpi_gen_9",
    "t": "book_chapter",
    "p": "Book & chapter: 'If we say we have fellowship with him while we walk in darkness, we lie and do not practice the truth. But if we walk in the light, as he is in the light, we have fellowship with one another, and the blood of Jesus his Son cleanses us from all sin':",
    "b": "1JN",
    "c": 1,
    "a": [
      "1 John 1",
      "1 Jn 1",
      "1 John 1:6-7"
    ],
    "e": "1 John 1:6-9: Walking in the light, authentic fellowship, and forgiveness through confession."
  },
  {
    "id": "bmpi_gen_10",
    "t": "chapter_in_book",
    "p": "What chapter in Revelation shows the Lion of the tribe of Judah appearing as a Lamb looking as if it had been slain, alone worthy to open the scroll with seven seals?",
    "b": "REV",
    "c": 5,
    "a": [
      "5",
      "Revelation 5",
      "Rev 5",
      "ch 5",
      "chapter 5"
    ],
    "d": "Revelation 5 (or Chapter 5)",
    "e": "Revelation 5: The heavenly throne room worshiping the Worthy Lamb."
  },
  {
    "id": "nt_q1",
    "t": "facts",
    "p": "Who prepared the way for Jesus in the wilderness?",
    "b": "MAT",
    "c": 3,
    "a": [
      "John the Baptist",
      "John Baptist",
      "John the baptizer"
    ],
    "e": "John the Baptist preached in the wilderness of Judea: 'Prepare the way of the Lord' (Matt 3:1\u20133, Mark 1:3)."
  },
  {
    "id": "nt_q2",
    "t": "chapter_in_book",
    "p": "What chapter in Luke contains the Parable of the Good Samaritan?",
    "b": "LUK",
    "c": 10,
    "a": [
      "10",
      "ch 10",
      "chapter 10",
      "Luke 10",
      "Luk 10"
    ],
    "d": "Luke 10 (or Chapter 10)",
    "e": "Jesus tells the Parable of the Good Samaritan to a lawyer in Luke 10:25\u201337."
  },
  {
    "id": "nt_q3",
    "t": "chapter_in_book",
    "p": "What chapter in Romans describes all having sinned and fallen short of the glory of God?",
    "b": "ROM",
    "c": 3,
    "a": [
      "3",
      "ch 3",
      "chapter 3",
      "Romans 3",
      "Rom 3"
    ],
    "d": "Romans 3 (or Chapter 3)",
    "e": "Romans 3:23 states: 'For all have sinned and fall short of the glory of God.'"
  },
  {
    "id": "nt_q4",
    "t": "facts",
    "p": "Which disciple doubted Jesus' resurrection until he touched His wounds?",
    "b": "JHN",
    "c": 20,
    "a": [
      "Thomas",
      "Doubting Thomas",
      "Didymus"
    ],
    "e": "In John 20:24\u201329, Thomas confessed 'My Lord and my God!' after seeing and touching Jesus' wounds."
  },
  {
    "id": "nt_q5",
    "t": "facts",
    "p": "Who was the couple that helped teach Apollos the way of God more accurately?",
    "b": "ACT",
    "c": 18,
    "a": [
      "Aquila and Priscilla",
      "Priscilla and Aquila",
      "Priscilla & Aquila",
      "Aquila & Priscilla",
      "Prisca and Aquila"
    ],
    "d": "Priscilla and Aquila (or Aquila and Priscilla)",
    "e": "In Acts 18:26, Priscilla and Aquila heard Apollos and explained the way of God to him more accurately."
  },
  {
    "id": "nt_q6",
    "t": "book_chapter",
    "p": "Book & chapter: 'For God did not send his Son into the world to condemn the world, but in order that the world might be saved through him'",
    "b": "JHN",
    "c": 3,
    "a": [
      "John 3",
      "Jn 3",
      "John 3:17",
      "John ch 3"
    ],
    "e": "John 3:17 immediately follows the famous John 3:16 during Jesus' dialogue with Nicodemus."
  },
  {
    "id": "nt_q7",
    "t": "chapter_in_book",
    "p": "What chapter in Matthew contains the Lord's Prayer (in the Sermon on the Mount)?",
    "b": "MAT",
    "c": 6,
    "a": [
      "6",
      "ch 6",
      "chapter 6",
      "Matthew 6",
      "Matt 6",
      "Mt 6"
    ],
    "d": "Matthew 6 (or Chapter 6)",
    "e": "The Lord's Prayer ('Our Father in heaven...') is recorded in Matthew 6:9\u201313 (and Luke 11)."
  },
  {
    "id": "nt_q8",
    "t": "chapter_in_book",
    "p": "What chapter in Acts describes the Day of Pentecost and the coming of the Holy Spirit with tongues of fire?",
    "b": "ACT",
    "c": 2,
    "a": [
      "2",
      "ch 2",
      "chapter 2",
      "Acts 2",
      "Act 2"
    ],
    "d": "Acts 2 (or Chapter 2)",
    "e": "Acts 2 recounts the descent of the Holy Spirit at Pentecost, Peter's sermon, and 3,000 souls being saved."
  },
  {
    "id": "nt_q9",
    "t": "book_id",
    "p": "Which Gospel is generally considered the shortest and earliest written?",
    "b": "MRK",
    "c": 1,
    "a": [
      "Mark",
      "Gospel of Mark",
      "Mrk",
      "Mk"
    ],
    "e": "The Gospel of Mark (16 chapters) is the shortest and widely recognized as the earliest written Gospel."
  },
  {
    "id": "nt_q10",
    "t": "facts",
    "p": "In what city was Jesus born?",
    "b": "LUK",
    "c": 2,
    "a": [
      "Bethlehem",
      "Bethlehem of Judea",
      "City of David"
    ],
    "e": "Jesus was born in Bethlehem of Judea, fulfilling the prophecy of Micah 5:2 (Luke 2:4, Matt 2:1)."
  },
  {
    "id": "nt_q11",
    "t": "chapter_in_book",
    "p": "What chapter is the Jerusalem Council in Acts (debating circumcision & Gentile salvation)?",
    "b": "ACT",
    "c": 15,
    "a": [
      "15",
      "ch 15",
      "chapter 15",
      "Acts 15",
      "Act 15"
    ],
    "d": "Acts 15 (or Chapter 15)",
    "e": "The Jerusalem Council in Acts 15 affirmed that Gentiles are saved by grace through faith without circumcision."
  },
  {
    "id": "nt_q12",
    "t": "chapter_in_book",
    "p": "What chapter in 1 Corinthians is the famous 'Resurrection Chapter'?",
    "b": "1CO",
    "c": 15,
    "a": [
      "15",
      "ch 15",
      "chapter 15",
      "1 Corinthians 15",
      "1 Cor 15"
    ],
    "d": "1 Corinthians 15 (or Chapter 15)",
    "e": "1 Corinthians 15 is Paul's magnificent treatise on the bodily resurrection of Christ and believers."
  },
  {
    "id": "nt_q13",
    "t": "verse_completion",
    "p": "Ephesians 2:8: 'For by ______ you have been saved through faith.'",
    "b": "EPH",
    "c": 2,
    "a": [
      "grace",
      "by grace"
    ],
    "e": "Ephesians 2:8: 'For by grace you have been saved through faith. And this is not your own doing; it is the gift of God.'"
  },
  {
    "id": "nt_q14",
    "t": "book_chapter",
    "p": "What book & chapter does Paul say farewell to the Ephesian elders? ('I do not account my life of any value')",
    "b": "ACT",
    "c": 20,
    "a": [
      "Acts 20",
      "Act 20",
      "Acts ch 20"
    ],
    "e": "In Acts 20:17\u201338 at Miletus, Paul delivers his emotional farewell address to the elders of the church of Ephesus."
  },
  {
    "id": "nt_q15",
    "t": "chapter_in_book",
    "p": "What chapter is the birth of Jesus narrative in Luke (shepherds, angels, manger)?",
    "b": "LUK",
    "c": 2,
    "a": [
      "2",
      "ch 2",
      "chapter 2",
      "Luke 2",
      "Luk 2"
    ],
    "d": "Luke 2 (or Chapter 2)",
    "e": "Luke 2 records Caesar Augustus' census, the journey to Bethlehem, the manger, and the angels announcing Christ's birth to shepherds."
  },
  {
    "id": "nt_q16",
    "t": "verse_completion",
    "p": "Acts 1:8: 'But you will receive ______ when the Holy Spirit has come upon you'",
    "b": "ACT",
    "c": 1,
    "a": [
      "power"
    ],
    "e": "Acts 1:8: 'But you will receive power when the Holy Spirit has come upon you, and you will be my witnesses...'"
  },
  {
    "id": "nt_q17",
    "t": "facts",
    "p": "Which Pharisee and ruler of the Jews secretly met with Jesus at night?",
    "b": "JHN",
    "c": 3,
    "a": [
      "Nicodemus"
    ],
    "e": "In John 3:1\u20139, Nicodemus visited Jesus by night, where Jesus taught him: 'You must be born again.'"
  },
  {
    "id": "nt_q18",
    "t": "verse_completion",
    "p": "1 John 1:9: 'If we ______ ____ _____, he is faithful and just to forgive us our sins'",
    "b": "1JN",
    "c": 1,
    "a": [
      "confess our sins",
      "confess sins"
    ],
    "e": "1 John 1:9 promises: 'If we confess our sins, he is faithful and just to forgive us our sins and to cleanse us from all unrighteousness.'"
  },
  {
    "id": "nt_q19",
    "t": "facts",
    "p": "Who said 'What is truth?' during Jesus' trial?",
    "b": "JHN",
    "c": 18,
    "a": [
      "Pontius Pilate",
      "Pilate"
    ],
    "d": "Pontius Pilate (Pilate)",
    "e": "In John 18:38, the Roman governor Pontius Pilate asked Jesus: 'What is truth?'"
  },
  {
    "id": "nt_q20",
    "t": "chapter_in_book",
    "p": "What chapter in Luke contains the parable of the Good Samaritan who had compassion on the beaten traveler?",
    "b": "LUK",
    "c": 10,
    "a": [
      "10",
      "Luke 10",
      "Luk 10",
      "ch 10",
      "chapter 10"
    ],
    "d": "Luke 15 (or Chapter 15)",
    "e": "Luke 10:25\u201337 contains Jesus's Parable of the Good Samaritan."
  },
  {
    "id": "nt_q21",
    "t": "verse_completion",
    "p": "James 1:22: 'But be ______ of the word, and not hearers only, deceiving yourselves.'",
    "b": "JAS",
    "c": 1,
    "a": [
      "doers",
      "doers of the word"
    ],
    "e": "James 1:22 commands: 'But be doers of the word, and not hearers only, deceiving yourselves.'"
  },
  {
    "id": "nt_q22",
    "t": "book_chapter",
    "p": "Book & chapter: 'All the believers were one in heart and mind. No one claimed that any of their possessions was their own, but they shared everything they had.'",
    "b": "ACT",
    "c": 4,
    "a": [
      "Acts 4",
      "Act 4",
      "Acts ch 4"
    ],
    "e": "Acts 4:32\u201337 describes the radical generosity and unity of the early Jerusalem church."
  },
  {
    "id": "nt_q23",
    "t": "book_chapter",
    "p": "What book & chapter are the Fruits of the Spirit listed? ('love, joy, peace, patience, kindness...')",
    "b": "GAL",
    "c": 5,
    "a": [
      "Galatians 5",
      "Gal 5",
      "Galatians ch 5"
    ],
    "e": "Galatians 5:22\u201323 lists the 9 fruits of the Holy Spirit in contrast to the works of the flesh."
  },
  {
    "id": "nt_q24",
    "t": "facts",
    "p": "Who was the young man mentored by Paul who pastored the church in Ephesus?",
    "b": "1TI",
    "c": 1,
    "a": [
      "Timothy",
      "Timotheus"
    ],
    "e": "Paul wrote 1 & 2 Timothy to his beloved spiritual son Timothy while he was leading the church at Ephesus."
  },
  {
    "id": "nt_q25",
    "t": "facts",
    "p": "Who was the wealthy member of the council that requested the body of Jesus for burial?",
    "b": "MAT",
    "c": 27,
    "a": [
      "Joseph of Arimathea",
      "Joseph of Arimathaea",
      "Joseph Arimathea"
    ],
    "e": "Joseph of Arimathea, a disciple of Jesus, boldly asked Pilate for the body and placed it in his own new tomb (Matt 27:57\u201360)."
  },
  {
    "id": "nt_q26",
    "t": "facts",
    "p": "What trade/profession did Paul have that he shared with Aquila and Priscilla in Corinth?",
    "b": "ACT",
    "c": 18,
    "a": [
      "Tentmaker",
      "Tent making",
      "Tentmakers",
      "Tent maker",
      "Leather worker"
    ],
    "d": "Tentmaker (Tentmaking)",
    "e": "Acts 18:3 notes that Paul stayed and worked with Aquila and Priscilla 'for they were tentmakers by trade.'"
  },
  {
    "id": "nt_q27",
    "t": "facts",
    "p": "Which disciple is known as 'the disciple whom Jesus loved'?",
    "b": "JHN",
    "c": 21,
    "a": [
      "John",
      "Apostle John",
      "John the Apostle",
      "John the Evangelist"
    ],
    "e": "The Apostle John frequently refers to himself anonymously in his Gospel as 'the disciple whom Jesus loved' (John 13:23, 19:26, 21:20)."
  },
  {
    "id": "nt_q28",
    "t": "chapter_in_book",
    "p": "What chapter in Romans opens with: 'I appeal to you therefore, brothers, by the mercies of God, to present your bodies as a living sacrifice, holy and acceptable to God...'?",
    "b": "ROM",
    "c": 12,
    "a": [
      "12",
      "Romans 12",
      "Rom 12",
      "ch 12",
      "chapter 12"
    ],
    "d": "Romans 8 (or Chapter 8)",
    "e": "Romans 12:1\u20132 is the classic exhortation to wholehearted spiritual consecration."
  },
  {
    "id": "nt_q29",
    "t": "chapter_in_book",
    "p": "What chapter is the conversion of Saul on the Damascus Road in Acts?",
    "b": "ACT",
    "c": 9,
    "a": [
      "9",
      "ch 9",
      "chapter 9",
      "Acts 9",
      "Act 9"
    ],
    "d": "Acts 9 (or Chapter 9)",
    "e": "Acts 9 recounts Saul's dramatic encounter with the risen Lord on the road to Damascus."
  },
  {
    "id": "nt_q30",
    "t": "verse_completion",
    "p": "John 14:6: 'I am the way, and the truth, and the ______.'",
    "b": "JHN",
    "c": 14,
    "a": [
      "life"
    ],
    "e": "John 14:6: 'Jesus said to him, \"I am the way, and the truth, and the life. No one comes to the Father except through me.\"'"
  },
  {
    "id": "nt_q31",
    "t": "chapter_in_book",
    "p": "What chapter in John describes Jesus washing the disciples' feet in the Upper Room?",
    "b": "JHN",
    "c": 13,
    "a": [
      "13",
      "ch 13",
      "chapter 13",
      "John 13",
      "Jn 13"
    ],
    "d": "John 13 (or Chapter 13)",
    "e": "In John 13, Jesus displays servant humility by washing His disciples' feet during the Last Supper."
  },
  {
    "id": "nt_q32",
    "t": "facts",
    "p": "In what city were the disciples first called 'Christians'?",
    "b": "ACT",
    "c": 11,
    "a": [
      "Antioch",
      "Antioch of Syria",
      "Syrian Antioch"
    ],
    "e": "Acts 11:26 records: 'And in Antioch the disciples were first called Christians.'"
  },
  {
    "id": "nt_q33",
    "t": "book_chapter",
    "p": "What book & chapter describes the birth of Jesus in a manger in Bethlehem with angels appearing to shepherds in the fields?",
    "b": "LUK",
    "c": 2,
    "a": [
      "Luke 2",
      "Luk 2",
      "Luke 2:1-20"
    ],
    "e": "Luke 2 records the nativity of Jesus and the angels proclaiming peace to shepherds."
  },
  {
    "id": "nt_q34",
    "t": "verse_completion",
    "p": "2 Timothy 3:16: 'All _______ is breathed out by God and profitable for teaching...'",
    "b": "2TI",
    "c": 3,
    "a": [
      "Scripture",
      "scripture"
    ],
    "e": "2 Timothy 3:16: 'All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness.'"
  },
  {
    "id": "nt_q35",
    "t": "facts",
    "p": "What was Matthew's (Levi's) occupation before following Jesus?",
    "b": "MAT",
    "c": 9,
    "a": [
      "Tax collector",
      "Tax-collector",
      "Publican"
    ],
    "d": "Tax Collector",
    "e": "In Matthew 9:9, Jesus saw Matthew sitting at the tax booth and said to him, 'Follow me.'"
  },
  {
    "id": "nt_q36",
    "t": "facts",
    "p": "Who was the mother of Jesus?",
    "b": "LUK",
    "c": 1,
    "a": [
      "Mary",
      "Virgin Mary"
    ],
    "e": "Mary was chosen by God to conceive Jesus through the Holy Spirit (Luke 1:26\u201338)."
  },
  {
    "id": "nt_q37",
    "t": "verse_completion",
    "p": "Philippians 4:4: '______ in the Lord always; again I will say, ______.'",
    "b": "PHP",
    "c": 4,
    "a": [
      "Rejoice",
      "rejoice"
    ],
    "e": "Philippians 4:4: 'Rejoice in the Lord always; again I will say, rejoice.'"
  },
  {
    "id": "nt_q38",
    "t": "chapter_in_book",
    "p": "What chapter in Acts describes the conversion of Saul on the road to Damascus when a light from heaven flashed around him?",
    "b": "ACT",
    "c": 9,
    "a": [
      "9",
      "Acts 9",
      "ch 9",
      "chapter 9"
    ],
    "d": "Acts 2 (or Chapter 2)",
    "e": "Acts 9 records the dramatic conversion of Saul on the road to Damascus."
  },
  {
    "id": "nt_q39",
    "t": "verse_completion",
    "p": "In John 15, what central metaphor does Jesus use to describe believers abiding in Him? ('I am the ______, you are the branches')",
    "b": "JHN",
    "c": 15,
    "a": [
      "vine",
      "true vine"
    ],
    "d": "vine (or true vine)",
    "e": "John 15:5: 'I am the vine; you are the branches. Whoever abides in me and I in him, he it is that bears much fruit.'"
  },
  {
    "id": "nt_q39_iam",
    "t": "facts",
    "p": "How many distinct metaphorical 'I AM' statements (e.g. Bread of Life, Good Shepherd, True Vine) does Jesus make in the Gospel of John?",
    "b": "JHN",
    "c": 15,
    "a": [
      "7",
      "seven",
      "7 statements",
      "seven statements"
    ],
    "e": "John contains 7 distinct 'I AM' declarations: Bread of Life (6:35), Light of the World (8:12), Door (10:7), Good Shepherd (10:11), Resurrection & Life (11:25), Way Truth & Life (14:6), and True Vine (15:1)."
  },
  {
    "id": "nt_q40",
    "t": "facts",
    "p": "What disease did Jesus heal ten men of, though only one returned to thank Him?",
    "b": "LUK",
    "c": 17,
    "a": [
      "Leprosy",
      "leper",
      "lepers"
    ],
    "e": "In Luke 17:11\u201319, Jesus cleansed ten lepers on the border of Samaria and Galilee, and a Samaritan returned to praise God."
  },
  {
    "id": "nt_q41",
    "t": "chapter_in_book",
    "p": "What chapter in Luke contains the Parable of the Rich Fool building bigger barns?",
    "b": "LUK",
    "c": 12,
    "a": [
      "12",
      "ch 12",
      "chapter 12",
      "Luke 12",
      "Luk 12"
    ],
    "d": "Luke 12 (or Chapter 12)",
    "e": "In Luke 12:16\u201321, Jesus warned against greed with the Parable of the Rich Fool."
  },
  {
    "id": "nt_q42",
    "t": "verse_completion",
    "p": "John 11:35 (famous as the shortest verse in English): 'Jesus ______.'",
    "b": "JHN",
    "c": 11,
    "a": [
      "wept"
    ],
    "e": "John 11:35 simply reads: 'Jesus wept.' at the tomb of Lazarus."
  },
  {
    "id": "nt_q43",
    "t": "facts",
    "p": "Who was the runaway slave whom Paul wrote a personal letter to Philemon about?",
    "b": "PHM",
    "c": 1,
    "a": [
      "Onesimus"
    ],
    "e": "In the Epistle to Philemon, Paul asks Philemon to receive back Onesimus no longer as a slave, but as a beloved brother."
  },
  {
    "id": "nt_q44",
    "t": "facts",
    "p": "Who was the short chief tax collector in Jericho who climbed a sycamore tree to see Jesus?",
    "b": "LUK",
    "c": 19,
    "a": [
      "Zacchaeus",
      "Zaccheus"
    ],
    "e": "Luke 19:1\u201310 tells how Zacchaeus climbed a sycamore-fig tree, and Jesus stayed at his house, bringing salvation."
  },
  {
    "id": "nt_q45",
    "t": "facts",
    "p": "Who was the archangel that visited Mary to announce the birth of Jesus?",
    "b": "LUK",
    "c": 1,
    "a": [
      "Gabriel",
      "Angel Gabriel"
    ],
    "e": "Luke 1:26 tells that the angel Gabriel was sent from God to a city of Galilee named Nazareth."
  },
  {
    "id": "nt_q46",
    "t": "facts",
    "p": "Who was the Roman Emperor who ordered the census at the time of Jesus' birth?",
    "b": "LUK",
    "c": 2,
    "a": [
      "Caesar Augustus",
      "Augustus",
      "Augustus Caesar"
    ],
    "e": "Luke 2:1: 'In those days a decree went out from Caesar Augustus that all the world should be registered.'"
  },
  {
    "id": "nt_q47",
    "t": "book_id",
    "p": "In which book does Paul raise the young man Eutychus from the dead after he falls from a third-story window?",
    "b": "ACT",
    "c": 20,
    "a": [
      "Acts",
      "Acts of the Apostles",
      "Act"
    ],
    "d": "Acts (Acts 20)",
    "e": "In Acts 20:9\u201312 in Troas, Eutychus fell asleep during Paul's preaching, fell out of a 3rd story window, and Paul raised him."
  },
  {
    "id": "nt_q48",
    "t": "facts",
    "p": "Who was the Jewish High Priest during the trial and crucifixion of Jesus?",
    "b": "MAT",
    "c": 26,
    "a": [
      "Caiaphas",
      "Joseph Caiaphas"
    ],
    "e": "Caiaphas was the high priest who presided over the Sanhedrin trial of Jesus (Matt 26:57, John 11:49)."
  },
  {
    "id": "nt_q49",
    "t": "verse_completion",
    "p": "1 Corinthians 10:31: 'So, whether you eat or drink, or whatever you do, do all to the ______ ___ _____.'",
    "b": "1CO",
    "c": 10,
    "a": [
      "glory of God"
    ],
    "e": "1 Corinthians 10:31: 'So, whether you eat or drink, or whatever you do, do all to the glory of God.'"
  },
  {
    "id": "nt_q50",
    "t": "book_chapter",
    "p": "What book & chapter describes the Jerusalem Council deciding that Gentile believers do not need to follow Jewish ceremonial circumcision?",
    "b": "ACT",
    "c": 15,
    "a": [
      "Acts 15",
      "Act 15"
    ],
    "e": "Acts 15 details the Jerusalem Council affirming salvation by grace alone through faith."
  },
  {
    "id": "ot_q1",
    "t": "book_id",
    "p": "What book tells of the rebuilding of the temple after the Babylonian exile?",
    "b": "EZR",
    "c": 1,
    "a": [
      "Ezra",
      "Ezr"
    ],
    "e": "The Book of Ezra records the return of the Jewish exiles under Zerubbabel to rebuild the Temple in Jerusalem."
  },
  {
    "id": "ot_q2",
    "t": "facts",
    "p": "Who interpreted King Nebuchadnezzar's troubling dreams in Babylon?",
    "b": "DAN",
    "c": 2,
    "a": [
      "Daniel",
      "Belteshazzar"
    ],
    "e": "In Daniel 2 and 4, God gave Daniel the wisdom to recall and interpret Nebuchadnezzar's dreams of world empires."
  },
  {
    "id": "ot_q3",
    "t": "book_chapter",
    "p": "What book & chapter contains 'The Lord is my shepherd; I shall not want'?",
    "b": "PSA",
    "c": 23,
    "a": [
      "Psalm 23",
      "Psalms 23",
      "Ps 23",
      "Psa 23"
    ],
    "d": "Psalm 23 (or Psalms 23)",
    "e": "Psalm 23 is David's beloved psalm expressing trust in the Lord as the Good Shepherd."
  },
  {
    "id": "ot_q4",
    "t": "chapter_in_book",
    "p": "What chapter in Daniel is Daniel thrown into the lions' den?",
    "b": "DAN",
    "c": 6,
    "a": [
      "6",
      "ch 6",
      "chapter 6",
      "Daniel 6",
      "Dan 6"
    ],
    "d": "Daniel 6 (or Chapter 6)",
    "e": "Daniel 6 describes Daniel being spared in the lions' den under King Darius."
  },
  {
    "id": "ot_q5",
    "t": "book_chapter",
    "p": "What book & chapter does Joseph tell his brothers: 'As for you, you meant evil against me, but God meant it for good'?",
    "b": "GEN",
    "c": 50,
    "a": [
      "Genesis 50",
      "Gen 50",
      "Genesis ch 50"
    ],
    "e": "Genesis 50:20 captures the overarching theological climax of Joseph's story and God's providence."
  },
  {
    "id": "ot_q6",
    "t": "facts",
    "p": "What new name did God give Jacob after wrestling with him at Peniel?",
    "b": "GEN",
    "c": 32,
    "a": [
      "Israel"
    ],
    "e": "Genesis 32:28: 'Your name shall no longer be called Jacob, but Israel, for you have striven with God and with men, and have prevailed.'"
  },
  {
    "id": "ot_q7",
    "t": "facts",
    "p": "Which prophet was thrown into a muddy cistern and is known as the 'weeping prophet'?",
    "b": "JER",
    "c": 38,
    "a": [
      "Jeremiah",
      "Jer"
    ],
    "e": "Jeremiah wept over Jerusalem's unrepentance (Lamentations) and was lowered into Malchiah's muddy cistern (Jer 38:6)."
  },
  {
    "id": "ot_q8",
    "t": "facts",
    "p": "Which prophet was called by God to preach repentance to the wicked Assyrian capital of Nineveh?",
    "b": "JON",
    "c": 1,
    "a": [
      "Jonah",
      "Jon"
    ],
    "e": "God commanded Jonah: 'Arise, go to Nineveh, that great city, and call out against it' (Jonah 1:2)."
  },
  {
    "id": "ot_q9",
    "t": "verse_completion",
    "p": "Proverbs 3:5: 'Trust in the Lord with all your ______ and do not lean on your own understanding.'",
    "b": "PRO",
    "c": 3,
    "a": [
      "heart"
    ],
    "e": "Proverbs 3:5: 'Trust in the Lord with all your heart, and do not lean on your own understanding.'"
  },
  {
    "id": "ot_q10",
    "t": "facts",
    "p": "Who was the left-handed judge from Benjamin who assassinated King Eglon of Moab?",
    "b": "JDG",
    "c": 3,
    "a": [
      "Ehud"
    ],
    "e": "Judges 3:15\u201326 details how Ehud delivered Israel by striking down the corpulent King Eglon."
  },
  {
    "id": "ot_q11",
    "t": "facts",
    "p": "Who built and dedicated the First Temple of the Lord in Jerusalem?",
    "b": "1KI",
    "c": 6,
    "a": [
      "Solomon",
      "King Solomon"
    ],
    "d": "Solomon (King Solomon)",
    "e": "King Solomon built the First Temple over seven years (1 Kings 6; 2 Chron 3\u20137)."
  },
  {
    "id": "ot_q12",
    "t": "facts",
    "p": "Who were the two faithful spies who brought back a good report trusting God to conquer Canaan?",
    "b": "NUM",
    "c": 14,
    "a": [
      "Joshua and Caleb",
      "Caleb and Joshua",
      "Joshua & Caleb",
      "Caleb & Joshua"
    ],
    "d": "Joshua and Caleb (or Caleb and Joshua)",
    "e": "In Numbers 14:6\u20139, Joshua and Caleb stood alone among the 12 spies urging Israel to trust the Lord."
  },
  {
    "id": "ot_q13",
    "t": "chapter_in_book",
    "p": "What chapter in Genesis describes the destruction of Sodom and Gomorrah with fire and sulfur?",
    "b": "GEN",
    "c": 19,
    "a": [
      "19",
      "ch 19",
      "chapter 19",
      "Genesis 19",
      "Gen 19"
    ],
    "d": "Genesis 19 (or Chapter 19)",
    "e": "Genesis 19 records angels rescuing Lot before fire rains down on Sodom and Gomorrah."
  },
  {
    "id": "ot_q14",
    "t": "facts",
    "p": "Whose spirit did King Saul ask the medium (witch) of Endor to summon from the dead?",
    "b": "1SA",
    "c": 28,
    "a": [
      "Samuel",
      "Prophet Samuel"
    ],
    "e": "In 1 Samuel 28, Saul unlawfully consulted the medium of Endor to bring up the deceased prophet Samuel."
  },
  {
    "id": "ot_q15",
    "t": "facts",
    "p": "Which judge defeated the massive army of Midianites with only 300 men holding trumpets and torches?",
    "b": "JDG",
    "c": 7,
    "a": [
      "Gideon",
      "Jerubbaal"
    ],
    "e": "In Judges 7, God reduced Gideon's army down to 300 men so that Israel would know God alone won the victory."
  },
  {
    "id": "ot_q16",
    "t": "chapter_in_book",
    "p": "What chapter in Exodus contains the giving of the Ten Commandments at Mount Sinai?",
    "b": "EXO",
    "c": 20,
    "a": [
      "20",
      "ch 20",
      "chapter 20",
      "Exodus 20",
      "Exo 20"
    ],
    "d": "Exodus 20 (or Chapter 20)",
    "e": "Exodus 20 records the Ten Commandments spoken by God at Mount Sinai (also repeated in Deuteronomy 5)."
  },
  {
    "id": "ot_q17",
    "t": "facts",
    "p": "Who succeeded Moses as the leader of Israel to lead the conquest of the Promised Land?",
    "b": "JOS",
    "c": 1,
    "a": [
      "Joshua",
      "Joshua son of Nun"
    ],
    "e": "Joshua 1:1\u20139: The Lord commissioned Joshua: 'Moses my servant is dead. Now therefore arise, go over this Jordan.'"
  },
  {
    "id": "ot_q18",
    "t": "chapter_in_book",
    "p": "What chapter in Jeremiah is the New Covenant explicitly promised ('I will put my law within them')?",
    "b": "JER",
    "c": 31,
    "a": [
      "31",
      "ch 31",
      "chapter 31",
      "Jeremiah 31",
      "Jer 31"
    ],
    "d": "Jeremiah 31 (or Chapter 31)",
    "e": "Jeremiah 31:31\u201334 foretells the New Covenant written upon the heart, quoted in Hebrews 8."
  },
  {
    "id": "ot_q19",
    "t": "facts",
    "p": "Which judge had supernatural physical strength tied to his Nazirite vow and uncut hair?",
    "b": "JDG",
    "c": 16,
    "a": [
      "Samson"
    ],
    "e": "Judges 13\u201316 chronicles Samson's mighty deeds and downfall through Delilah."
  },
  {
    "id": "ot_q20",
    "t": "facts",
    "p": "In 1 Kings 18, which prophet called down fire from heaven to defeat the 450 prophets of Baal on Mount Carmel?",
    "b": "1KI",
    "c": 18,
    "a": [
      "Elijah",
      "Elijah the Tishbite"
    ],
    "e": "In 1 Kings 18:38, the fire of the Lord fell and consumed the burnt offering for the prophet Elijah."
  },
  {
    "id": "ot_q21",
    "t": "facts",
    "p": "Who was the cupbearer to the Persian king who led the rebuilding of Jerusalem's broken walls in 52 days?",
    "b": "NEH",
    "c": 1,
    "a": [
      "Nehemiah"
    ],
    "e": "Nehemiah mobilized the community to rebuild the walls of Jerusalem amidst intense opposition (Neh 1\u20136)."
  },
  {
    "id": "ot_q22",
    "t": "chapter_in_book",
    "p": "What chapter in 1 Samuel describes David slaying Goliath with a sling and a stone?",
    "b": "1SA",
    "c": 17,
    "a": [
      "17",
      "ch 17",
      "chapter 17",
      "1 Samuel 17",
      "1 Sam 17"
    ],
    "d": "1 Samuel 17 (or Chapter 17)",
    "e": "1 Samuel 17 describes young David defeating the Philistine champion Goliath in the Valley of Elah."
  },
  {
    "id": "ot_q23",
    "t": "chapter_in_book",
    "p": "What chapter in Genesis records God commanding Noah to build the Ark before the Great Flood?",
    "b": "GEN",
    "c": 6,
    "a": [
      "6",
      "ch 6",
      "chapter 6",
      "Genesis 6",
      "Gen 6"
    ],
    "d": "Genesis 6 (or Chapter 6)",
    "e": "Genesis 6:14 records God commanding Noah: 'Make yourself an ark of gopher wood.'"
  },
  {
    "id": "ot_q24",
    "t": "facts",
    "p": "Which Babylonian king threw Shadrach, Meshach, and Abednego into the burning fiery furnace?",
    "b": "DAN",
    "c": 3,
    "a": [
      "Nebuchadnezzar",
      "King Nebuchadnezzar"
    ],
    "e": "In Daniel 3, King Nebuchadnezzar commanded the three Hebrew youths thrown into the fiery furnace for refusing to bow to his golden image."
  },
  {
    "id": "ot_q25",
    "t": "chapter_in_book",
    "p": "What chapter in Exodus is the miraculous crossing of the Red Sea?",
    "b": "EXO",
    "c": 14,
    "a": [
      "14",
      "ch 14",
      "chapter 14",
      "Exodus 14",
      "Exo 14"
    ],
    "d": "Exodus 14 (or Chapter 14)",
    "e": "Exodus 14 describes God parting the Red Sea for Israel and collapsing the waters over Pharaoh's chariots."
  },
  {
    "id": "ot_q26",
    "t": "chapter_in_book",
    "p": "What chapter in Exodus does God appear to Moses in the Burning Bush at Mount Horeb?",
    "b": "EXO",
    "c": 3,
    "a": [
      "3",
      "ch 3",
      "chapter 3",
      "Exodus 3",
      "Exo 3"
    ],
    "d": "Exodus 3 (or Chapter 3)",
    "e": "In Exodus 3, God spoke to Moses from the burning bush and revealed His covenant name: 'I AM WHO I AM'."
  },
  {
    "id": "ot_q27",
    "t": "facts",
    "p": "Who was the barren mother of Samuel who prayed with deep tears at Shiloh for a son?",
    "b": "1SA",
    "c": 1,
    "a": [
      "Hannah"
    ],
    "e": "1 Samuel 1 recounts Hannah's heartfelt prayer at the Tabernacle and the birth of Samuel."
  },
  {
    "id": "ot_q28",
    "t": "facts",
    "p": "Which prophet was married to Gomer to symbolize Israel's unfaithfulness to God?",
    "b": "HOS",
    "c": 1,
    "a": [
      "Hosea"
    ],
    "e": "In Hosea 1:2, God commanded Hosea: 'Go, take to yourself a wife of whoredom and have children of whoredom.'"
  },
  {
    "id": "ot_q29",
    "t": "facts",
    "p": "Which prophet boldly confronted King David about his sin with Bathsheba using a parable of a poor man's ewe lamb?",
    "b": "2SA",
    "c": 12,
    "a": [
      "Nathan",
      "Nathan the prophet"
    ],
    "e": "In 2 Samuel 12:7, the prophet Nathan said to David: 'You are the man!'"
  },
  {
    "id": "ot_q30",
    "t": "facts",
    "p": "Who was the Jewish queen in Susa who risked her life saying 'If I perish, I perish' to save her people?",
    "b": "EST",
    "c": 4,
    "a": [
      "Esther",
      "Hadassah"
    ],
    "e": "Esther 4:14\u201316 details Queen Esther standing before the Persian King Xerxes to avert Haman's genocide."
  },
  {
    "id": "ot_q31",
    "t": "verse_completion",
    "p": "Ecclesiastes 3:1: 'For everything there is a ______, and a time for every matter under heaven.'",
    "b": "ECC",
    "c": 3,
    "a": [
      "season"
    ],
    "e": "Ecclesiastes 3:1: 'For everything there is a season, and a time for every matter under heaven.'"
  },
  {
    "id": "ot_q32",
    "t": "facts",
    "p": "Who was the villainous Persian official in the Book of Esther who built gallows to hang Mordecai?",
    "b": "EST",
    "c": 3,
    "a": [
      "Haman",
      "Haman the Agagite"
    ],
    "e": "Haman plotted the annihilation of the Jews, but was ultimately hanged on his own gallows (Esther 7:10)."
  },
  {
    "id": "ot_q33",
    "t": "facts",
    "p": "Who interpreted Pharaoh's dreams of seven fat cows and seven gaunt cows predicting seven years of famine?",
    "b": "GEN",
    "c": 41,
    "a": [
      "Joseph",
      "Zaphenath-paneah"
    ],
    "e": "In Genesis 41, God revealed Pharaoh's dream to Joseph, leading Pharaoh to make him ruler over Egypt."
  },
  {
    "id": "ot_q34",
    "t": "chapter_in_book",
    "p": "What chapter in Ezekiel is the vision of the Valley of Dry Bones coming to life?",
    "b": "EZE",
    "c": 37,
    "a": [
      "37",
      "ch 37",
      "chapter 37",
      "Ezekiel 37",
      "Ezek 37"
    ],
    "d": "Ezekiel 37 (or Chapter 37)",
    "e": "Ezekiel 37 portrays God's Spirit breathing life into the dry bones, symbolizing Israel's restoration."
  },
  {
    "id": "ot_q35",
    "t": "verse_completion",
    "p": "Proverbs 1:7: 'The ______ of the Lord is the beginning of knowledge; fools despise wisdom and instruction.'",
    "b": "PRO",
    "c": 1,
    "a": [
      "fear",
      "fear of the lord"
    ],
    "e": "Proverbs 1:7: 'The fear of the Lord is the beginning of knowledge; fools despise wisdom and instruction.'"
  },
  {
    "id": "ot_q36",
    "t": "facts",
    "p": "Who was the elderly High Priest at Shiloh who raised young Samuel in the Tabernacle?",
    "b": "1SA",
    "c": 2,
    "a": [
      "Eli",
      "Eli the priest"
    ],
    "e": "Eli was high priest and judge at Shiloh when young Samuel ministered before the Lord (1 Sam 1\u20134)."
  },
  {
    "id": "ot_q37",
    "t": "facts",
    "p": "What did Moses make and set on a pole to heal Israelites bitten by fiery serpents in the wilderness?",
    "b": "NUM",
    "c": 21,
    "a": [
      "Bronze serpent",
      "Bronze snake",
      "Brass serpent",
      "Brass snake"
    ],
    "d": "Bronze Serpent (Bronze Snake)",
    "e": "Numbers 21:8\u20139 recounts Moses lifting the bronze serpent, which Jesus cited as a foreshadowing of the Cross in John 3:14."
  },
  {
    "id": "ot_q38",
    "t": "chapter_in_book",
    "p": "What chapter in Leviticus institutes the Day of Atonement (Yom Kippur) and the scapegoat?",
    "b": "LEV",
    "c": 16,
    "a": [
      "16",
      "ch 16",
      "chapter 16",
      "Leviticus 16",
      "Lev 16"
    ],
    "d": "Leviticus 16 (or Chapter 16)",
    "e": "Leviticus 16 provides the high priestly rituals for Yom Kippur, the Day of Atonement."
  },
  {
    "id": "ot_q39",
    "t": "facts",
    "p": "Who was Jacob's favored wife, the mother of Joseph and Benjamin?",
    "b": "GEN",
    "c": 29,
    "a": [
      "Rachel"
    ],
    "e": "Jacob loved Rachel and served Laban for 14 years to marry her (Genesis 29:18\u201330)."
  },
  {
    "id": "ot_q40",
    "t": "facts",
    "p": "Which Minor Prophet prophesied that the sun of righteousness would rise with healing in its wings before the great Day of the Lord?",
    "b": "MAL",
    "c": 4,
    "a": [
      "Malachi",
      "Mal"
    ],
    "e": "Malachi 4:2 foretells the coming Sun of Righteousness with healing in His wings."
  },
  {
    "id": "ot_q41",
    "t": "verse_completion",
    "p": "Micah 6:8: 'To do justice, and to love kindness, and to walk ______ with your God.'",
    "b": "MIC",
    "c": 6,
    "a": [
      "humbly",
      "humbly with your god"
    ],
    "e": "Micah 6:8: 'He has told you, O man, what is good; and what does the Lord require of you but to do justice, and to love kindness, and to walk humbly with your God?'"
  },
  {
    "id": "ot_q42",
    "t": "chapter_in_book",
    "p": "What chapter in Exodus is the First Passover and tenth plague (death of firstborn) instituted?",
    "b": "EXO",
    "c": 12,
    "a": [
      "12",
      "ch 12",
      "chapter 12",
      "Exodus 12",
      "Exo 12"
    ],
    "d": "Exodus 12 (or Chapter 12)",
    "e": "Exodus 12 details the Passover lamb, blood on the doorposts, and Israel's midnight exodus from Egypt."
  },
  {
    "id": "ot_q43",
    "t": "book_chapter",
    "p": "What book & chapter is the Davidic Covenant where God promises David an eternal throne and kingdom?",
    "b": "2SA",
    "c": 7,
    "a": [
      "2 Samuel 7",
      "2 Sam 7",
      "2Samuel 7",
      "2Sam 7"
    ],
    "e": "In 2 Samuel 7, God establishes the Davidic Covenant, promising that David's throne would be established forever, pointing to Christ."
  },
  {
    "id": "ot_q44",
    "t": "chapter_in_book",
    "p": "What chapter in Genesis contains Cain murdering Abel?",
    "b": "GEN",
    "c": 4,
    "a": [
      "4",
      "ch 4",
      "chapter 4",
      "Genesis 4",
      "Gen 4"
    ],
    "d": "Genesis 4 (or Chapter 4)",
    "e": "Genesis 4 records the birth of Cain and Abel, Cain's jealousy and murder, and the cry 'Am I my brother's keeper?'"
  },
  {
    "id": "ot_q45",
    "t": "facts",
    "p": "Which Minor Prophet described himself as not a professional prophet, but a herdsman and dresser of sycamore figs?",
    "b": "AMO",
    "c": 7,
    "a": [
      "Amos"
    ],
    "e": "Amos 7:14: 'I was no prophet, nor a prophet\u2019s son, but I was a herdsman and a dresser of sycamore figs.'"
  },
  {
    "id": "ot_q46",
    "t": "chapter_in_book",
    "p": "What chapter in Genesis contains God cutting the covenant with Abram with the promise of descendants like stars in the sky?",
    "b": "GEN",
    "c": 15,
    "a": [
      "15",
      "ch 15",
      "chapter 15",
      "Genesis 15",
      "Gen 15"
    ],
    "d": "Genesis 15 (or Chapter 15)",
    "e": "Genesis 15 contains 'And he believed the Lord, and he counted it to him as righteousness' (v6) and the smoking fire pot covenant ritual."
  },
  {
    "id": "ot_q47",
    "t": "chapter_in_book",
    "p": "What chapter in 2 Samuel describes David's grievous sin with Bathsheba and the murder of Uriah the Hittite?",
    "b": "2SA",
    "c": 11,
    "a": [
      "11",
      "ch 11",
      "chapter 11",
      "2 Samuel 11",
      "2 Sam 11"
    ],
    "d": "2 Samuel 11 (or Chapter 11)",
    "e": "2 Samuel 11 records David staying in Jerusalem during spring battles, his adultery with Bathsheba, and Uriah's death."
  },
  {
    "id": "ot_q48",
    "t": "book_chapter",
    "p": "Book & Chapter: 'For I was envious of the arrogant when I saw the prosperity of the wicked. For they have no pangs until death...'",
    "b": "PSA",
    "c": 73,
    "a": [
      "Psalm 73",
      "Psalms 73",
      "Ps 73",
      "Psa 73"
    ],
    "d": "Psalm 73 (or Psalms 73)",
    "e": "Psalm 73 is Asaph's wrestling with the prosperity of the wicked until he 'entered the sanctuary of God' and discerned their end."
  },
  {
    "id": "ot_q49",
    "t": "facts",
    "p": "Who was Moses' father-in-law, the priest of Midian who advised him to appoint judges over Israel?",
    "b": "EXO",
    "c": 18,
    "a": [
      "Jethro",
      "Reuel",
      "Hobab"
    ],
    "d": "Jethro (Reuel)",
    "e": "In Exodus 18, Jethro advised Moses to delegate leadership by appointing able men over thousands, hundreds, fifties, and tens."
  },
  {
    "id": "ot_q50",
    "t": "facts",
    "p": "Who was the woman of Jericho who hid the two Israelite spies and hung a scarlet cord in her window?",
    "b": "JOS",
    "c": 2,
    "a": [
      "Rahab"
    ],
    "e": "Joshua 2 recounts Rahab hiding Joshua's spies; she is later listed in the genealogy of Jesus (Matt 1:5) and the Hall of Faith (Heb 11:31)."
  },
  {
    "id": "bw_q1",
    "t": "book_chapter",
    "p": "What book & chapter contains the heavenly throne room vision where the four living creatures cry day and night: 'Holy, holy, holy is the Lord God Almighty'?",
    "b": "REV",
    "c": 4,
    "a": [
      "Revelation 4",
      "Rev 4"
    ],
    "e": "Revelation 4 depicts the ceaseless worship of the Creator in the heavenly throne room."
  },
  {
    "id": "bw_q2",
    "t": "book_chapter",
    "p": "What book & chapter describes the creation of the heavens and earth and God pronouncing it 'very good'?",
    "b": "GEN",
    "c": 1,
    "a": [
      "Genesis 1",
      "Gen 1",
      "Genesis ch 1"
    ],
    "e": "Genesis 1 chronicles the six days of creation culminating in human image-bearers."
  },
  {
    "id": "bw_q3",
    "t": "book_chapter",
    "p": "What book & chapter describes the Fall of Man and the serpent in the Garden of Eden?",
    "b": "GEN",
    "c": 3,
    "a": [
      "Genesis 3",
      "Gen 3",
      "Genesis ch 3"
    ],
    "e": "Genesis 3 records the Fall of Man and God's promise that the offspring of the woman will crush the serpent's head (Gen 3:15)."
  },
  {
    "id": "bw_q4",
    "t": "book_chapter",
    "p": "What book & chapter is the Binding of Isaac (the Akedah on Mount Moriah)?",
    "b": "GEN",
    "c": 22,
    "a": [
      "Genesis 22",
      "Gen 22",
      "Genesis ch 22"
    ],
    "e": "Genesis 22 recounts Abraham's supreme test of faith where God provides the ram in the thicket."
  },
  {
    "id": "bw_q5",
    "t": "book_chapter",
    "p": "What book & chapter describes the six days of cosmic creation culminating with God resting on the seventh day?",
    "b": "GEN",
    "c": 1,
    "a": [
      "Genesis 1",
      "Gen 1"
    ],
    "e": "Genesis 1 is the historical record of God speaking creation into existence."
  },
  {
    "id": "bw_q6",
    "t": "book_chapter",
    "p": "What book & chapter contains the supreme apostolic treatise on the bodily resurrection of Christ ('O death, where is your victory?')?",
    "b": "1CO",
    "c": 15,
    "a": [
      "1 Corinthians 15",
      "1 Cor 15",
      "1Cor 15"
    ],
    "e": "1 Corinthians 15 details the gospel of Christ's resurrection and the believer's future glorified body."
  },
  {
    "id": "bw_q7",
    "t": "book_chapter",
    "p": "What book & chapter contains the Hall of Faith ('Now faith is the assurance of things hoped for...')?",
    "b": "HEB",
    "c": 11,
    "a": [
      "Hebrews 11",
      "Heb 11",
      "Hebrews ch 11"
    ],
    "e": "Hebrews 11 surveys the great cloud of faithful witnesses throughout redemptive history."
  },
  {
    "id": "bw_q8",
    "t": "book_chapter",
    "p": "What book & chapter describes the New Heaven and New Earth where God wipes away every tear?",
    "b": "REV",
    "c": 21,
    "a": [
      "Revelation 21",
      "Rev 21",
      "Revelation ch 21"
    ],
    "e": "Revelation 21:1\u20134 portrays the descent of the New Jerusalem and eternal fellowship with God."
  },
  {
    "id": "bw_q9",
    "t": "book_chapter",
    "p": "What book & chapter contains the Suffering Servant prophecy ('He was pierced for our transgressions; he was crushed for our iniquities')?",
    "b": "ISA",
    "c": 53,
    "a": [
      "Isaiah 53",
      "Isa 53",
      "Isaiah ch 53"
    ],
    "e": "Isaiah 53 is the pinnacle Old Testament prophecy of Christ's substitutionary atonement."
  },
  {
    "id": "bw_q10",
    "t": "book_chapter",
    "p": "What book & chapter is the Beatitudes / beginning of the Sermon on the Mount ('Blessed are the poor in spirit...')?",
    "b": "MAT",
    "c": 5,
    "a": [
      "Matthew 5",
      "Matt 5",
      "Mt 5",
      "Matthew ch 5"
    ],
    "e": "Matthew 5 opens Jesus' Sermon on the Mount with the eight Beatitudes."
  },
  {
    "id": "det_q1",
    "t": "facts",
    "p": "In Genesis, who was sold into slavery by his brothers for twenty shekels of silver?",
    "b": "GEN",
    "c": 37,
    "a": [
      "Joseph"
    ],
    "e": "In Genesis 37:28, Midianite traders drew Joseph up and sold him to the Ishmaelites for 20 shekels of silver."
  },
  {
    "id": "det_q2",
    "t": "chapter_in_book",
    "p": "What chapter in Genesis contains the incident of the Tower of Babel and the dispersion of languages?",
    "b": "GEN",
    "c": 11,
    "a": [
      "11",
      "ch 11",
      "chapter 11",
      "Genesis 11",
      "Gen 11"
    ],
    "d": "Genesis 11 (or Chapter 11)",
    "e": "Genesis 11 records humanity building a tower to make a name for themselves, where God confused their languages."
  },
  {
    "id": "det_q3",
    "t": "chapter_in_book",
    "p": "What chapter in Genesis describes Jacob's dream of a ladder reaching up to heaven at Bethel?",
    "b": "GEN",
    "c": 28,
    "a": [
      "28",
      "ch 28",
      "chapter 28",
      "Genesis 28",
      "Gen 28"
    ],
    "d": "Genesis 28 (or Chapter 28)",
    "e": "In Genesis 28, Jacob dreamed of angels ascending and descending on a ladder reaching to heaven."
  },
  {
    "id": "det_q4",
    "t": "chapter_in_book",
    "p": "What chapter in Exodus is the incident of Aaron making the Golden Calf while Moses is on the mountain?",
    "b": "EXO",
    "c": 32,
    "a": [
      "32",
      "ch 32",
      "chapter 32",
      "Exodus 32",
      "Exo 32"
    ],
    "d": "Exodus 32 (or Chapter 32)",
    "e": "Exodus 32 describes the golden calf idolatry and Moses breaking the tablets of the law in righteous anger."
  },
  {
    "id": "det_q5",
    "t": "chapter_in_book",
    "p": "In which chapter of Numbers does Balaam's donkey speak after seeing the Angel of the Lord?",
    "b": "NUM",
    "c": 22,
    "a": [
      "22",
      "ch 22",
      "chapter 22",
      "Numbers 22",
      "Num 22"
    ],
    "d": "Numbers 22 (or Chapter 22)",
    "e": "Numbers 22 recounts the Lord opening the mouth of Balaam's donkey to rebuke the prophet."
  },
  {
    "id": "det_q6",
    "t": "verse_completion",
    "p": "Deuteronomy 6:4 (The Shema): 'Hear, O Israel: The Lord our God, the Lord is ______.'",
    "b": "DEU",
    "c": 6,
    "a": [
      "one"
    ],
    "e": "Deuteronomy 6:4 is the foundational Shema: 'Hear, O Israel: The Lord our God, the Lord is one.'"
  },
  {
    "id": "det_q7",
    "t": "chapter_in_book",
    "p": "What chapter in Deuteronomy describes Moses' death on Mount Nebo overlooking the Promised Land?",
    "b": "DEU",
    "c": 34,
    "a": [
      "34",
      "ch 34",
      "chapter 34",
      "Deuteronomy 34",
      "Deut 34"
    ],
    "d": "Deuteronomy 34 (or Chapter 34)",
    "e": "Deuteronomy 34 concludes the Torah with Moses viewing the land from Nebo, dying, and being buried by the Lord."
  },
  {
    "id": "det_q8",
    "t": "chapter_in_book",
    "p": "What chapter in Joshua describes the miraculous collapse of the walls of Jericho?",
    "b": "JOS",
    "c": 6,
    "a": [
      "6",
      "ch 6",
      "chapter 6",
      "Joshua 6",
      "Josh 6"
    ],
    "d": "Joshua 6 (or Chapter 6)",
    "e": "In Joshua 6, Israel marched around Jericho for seven days before blowing trumpets and the walls fell flat."
  },
  {
    "id": "det_q9",
    "t": "chapter_in_book",
    "p": "What chapter in Joshua did the sun stand still in the sky during the battle of Gibeon?",
    "b": "JOS",
    "c": 10,
    "a": [
      "10",
      "ch 10",
      "chapter 10",
      "Joshua 10",
      "Josh 10"
    ],
    "d": "Joshua 10 (or Chapter 10)",
    "e": "Joshua 10:12\u201314 records Joshua commanding the sun to stand still over Gibeon and the moon over Aijalon."
  },
  {
    "id": "det_q10",
    "t": "verse_completion",
    "p": "Joshua 24:15: 'Choose this day whom you will serve... But as for me and my house, we will serve the ______.'",
    "b": "JOS",
    "c": 24,
    "a": [
      "Lord",
      "lord"
    ],
    "e": "Joshua 24:15 is Joshua's famous covenant challenge to the assembled tribes at Shechem."
  },
  {
    "id": "det_q11",
    "t": "facts",
    "p": "Who was the female judge and prophetess of Israel who led the victory alongside Barak against Sisera?",
    "b": "JDG",
    "c": 4,
    "a": [
      "Deborah"
    ],
    "e": "Judges 4\u20135 chronicles Deborah judging Israel under the palm tree and composing her triumphal song."
  },
  {
    "id": "det_q12",
    "t": "facts",
    "p": "Who was the wealthy landowner in Bethlehem who married the Moabite widow Ruth as her kinsman-redeemer?",
    "b": "RUT",
    "c": 2,
    "a": [
      "Boaz"
    ],
    "e": "Boaz acted as the faithful kinsman-redeemer (go'el) for Ruth, becoming the great-grandfather of David (Ruth 4:17)."
  },
  {
    "id": "det_q13",
    "t": "facts",
    "p": "In 1 Samuel 5, which Philistine fish-god idol fell face down and broke before the captured Ark of the Covenant?",
    "b": "1SA",
    "c": 5,
    "a": [
      "Dagon"
    ],
    "e": "1 Samuel 5 describes the Philistine god Dagon falling face down and having its head and hands severed before the Ark in Ashdod."
  },
  {
    "id": "det_q14",
    "t": "facts",
    "p": "In 2 Samuel 9, which lame grandson of King Saul did David show steadfast covenant kindness to at the royal table?",
    "b": "2SA",
    "c": 9,
    "a": [
      "Mephibosheth",
      "Meribbaal"
    ],
    "e": "2 Samuel 9 records David honoring his covenant with Jonathan by restoring Saul's land to Jonathan's son Mephibosheth."
  },
  {
    "id": "det_q15",
    "t": "facts",
    "p": "In 1 Kings 3, what single gift did young King Solomon ask God for in a dream at Gibeon?",
    "b": "1KI",
    "c": 3,
    "a": [
      "Wisdom",
      "An understanding mind",
      "Understanding heart",
      "An understanding heart"
    ],
    "d": "Wisdom (An understanding mind)",
    "e": "Solomon asked for 'an understanding mind to govern your people, that I may discern between good and evil' (1 Kings 3:9)."
  },
  {
    "id": "det_q16",
    "t": "facts",
    "p": "In 1 Kings 10, which foreign monarch traveled from afar to test Solomon with difficult questions and marveled at his palace?",
    "b": "1KI",
    "c": 10,
    "a": [
      "Queen of Sheba",
      "The Queen of Sheba",
      "Sheba"
    ],
    "e": "1 Kings 10 recounts the Queen of Sheba visiting Jerusalem and confessing: 'The half was not told me.'"
  },
  {
    "id": "det_q17",
    "t": "chapter_in_book",
    "p": "What chapter in 1 Kings did the United Monarchy split into Northern Israel and Southern Judah under Rehoboam and Jeroboam?",
    "b": "1KI",
    "c": 12,
    "a": [
      "12",
      "ch 12",
      "chapter 12",
      "1 Kings 12",
      "1 Kings 12"
    ],
    "d": "1 Kings 12 (or Chapter 12)",
    "e": "1 Kings 12 records Rehoboam's foolish refusal of elder advice, leading the 10 northern tribes to break away (931 BC)."
  },
  {
    "id": "det_q18",
    "t": "chapter_in_book",
    "p": "What chapter in 1 Kings is the showdown on Mount Carmel where Elijah calls down fire from heaven against the prophets of Baal?",
    "b": "1KI",
    "c": 18,
    "a": [
      "18",
      "ch 18",
      "chapter 18",
      "1 Kings 18",
      "1 Kings 18"
    ],
    "d": "1 Kings 18 (or Chapter 18)",
    "e": "1 Kings 18 describes the dramatic confrontation on Mount Carmel where the Lord answered Elijah by fire."
  },
  {
    "id": "det_q19",
    "t": "chapter_in_book",
    "p": "What chapter in 2 Kings was Elijah taken up to heaven in a whirlwind by a chariot and horses of fire?",
    "b": "2KI",
    "c": 2,
    "a": [
      "2",
      "ch 2",
      "chapter 2",
      "2 Kings 2",
      "2 Kings 2"
    ],
    "d": "2 Kings 2 (or Chapter 2)",
    "e": "2 Kings 2 portrays Elijah ascending to heaven and Elisha receiving a double portion of his spirit."
  },
  {
    "id": "det_q20",
    "t": "facts",
    "p": "In 2 Kings 5, which Syrian army general was cured of leprosy after dipping seven times in the Jordan River?",
    "b": "2KI",
    "c": 5,
    "a": [
      "Naaman"
    ],
    "e": "In 2 Kings 5, Elisha instructed Naaman the Syrian commander to wash in the Jordan seven times, and his flesh was restored."
  },
  {
    "id": "det_q21",
    "t": "facts",
    "p": "Which godly young king of Judah tore his robes and instituted sweeping national reforms after the Book of the Law was rediscovered in the temple?",
    "b": "2KI",
    "c": 22,
    "a": [
      "Josiah",
      "King Josiah"
    ],
    "d": "Josiah (King Josiah)",
    "e": "2 Kings 22\u201323 recounts King Josiah hearing the words of the Law found by Hilkiah the high priest and purging idolatry."
  },
  {
    "id": "det_q22",
    "t": "book_chapter",
    "p": "What book & chapter is the beloved Shepherd Psalm: 'The Lord is my shepherd; I shall not want. He makes me lie down in green pastures...'?",
    "b": "PSA",
    "c": 23,
    "a": [
      "Psalm 23",
      "Psalms 23",
      "Ps 23"
    ],
    "e": "Psalm 23 is David's classic psalm portraying Yahweh as the Good Shepherd."
  },
  {
    "id": "det_q23",
    "t": "verse_completion",
    "p": "Psalm 119:105: 'Your word is a lamp to my feet and a ______ to my path.'",
    "b": "PSA",
    "c": 119,
    "a": [
      "light"
    ],
    "e": "Psalm 119:105: 'Your word is a lamp to my feet and a light to my path.'"
  },
  {
    "id": "det_q24",
    "t": "verse_completion",
    "p": "Psalm 139:14: 'I praise you, for I am ______ and wonderfully made.'",
    "b": "PSA",
    "c": 139,
    "a": [
      "fearfully"
    ],
    "e": "Psalm 139:14: 'I praise you, for I am fearfully and wonderfully made. Wonderful are your works; my soul knows it very well.'"
  },
  {
    "id": "det_q25",
    "t": "chapter_in_book",
    "p": "What chapter in Isaiah contains Isaiah's vision of God on His throne surrounded by seraphim crying 'Holy, holy, holy'?",
    "b": "ISA",
    "c": 6,
    "a": [
      "6",
      "ch 6",
      "chapter 6",
      "Isaiah 6",
      "Isa 6"
    ],
    "d": "Isaiah 6 (or Chapter 6)",
    "e": "Isaiah 6 describes Isaiah's commission in the year King Uzziah died: 'Here am I! Send me.'"
  },
  {
    "id": "det_q26",
    "t": "verse_completion",
    "p": "Isaiah 9:6: 'For to us a child is born, to us a son is given... and his name shall be called Wonderful Counselor, ______ God, Everlasting Father, Prince of Peace.'",
    "b": "ISA",
    "c": 9,
    "a": [
      "Mighty",
      "mighty"
    ],
    "e": "Isaiah 9:6 is the celebrated prophecy of the divine Messiah."
  },
  {
    "id": "det_q27",
    "t": "verse_completion",
    "p": "Jeremiah 29:11: 'For I know the plans I have for you, declares the Lord, plans for ______ and not for evil, to give you a future and a hope.'",
    "b": "JER",
    "c": 29,
    "a": [
      "welfare",
      "peace",
      "good"
    ],
    "d": "welfare (or peace)",
    "e": "Jeremiah 29:11 was written in a letter to the Jewish exiles living in Babylon."
  },
  {
    "id": "det_q28",
    "t": "chapter_in_book",
    "p": "What chapter in Daniel describes Shadrach, Meshach, and Abednego delivered unharmed from the burning fiery furnace?",
    "b": "DAN",
    "c": 3,
    "a": [
      "3",
      "ch 3",
      "chapter 3",
      "Daniel 3",
      "Dan 3"
    ],
    "d": "Daniel 3 (or Chapter 3)",
    "e": "Daniel 3 chronicles the three Hebrew youths refusing to bow to Nebuchadnezzar's golden image and being protected in the furnace by a fourth figure 'like a son of the gods.'"
  },
  {
    "id": "det_q29",
    "t": "verse_completion",
    "p": "Amos 5:24: 'But let justice roll down like waters, and righteousness like an ever-flowing ______.'",
    "b": "AMO",
    "c": 5,
    "a": [
      "stream",
      "river"
    ],
    "e": "Amos 5:24: 'But let justice roll down like waters, and righteousness like an ever-flowing stream.'"
  },
  {
    "id": "det_q30",
    "t": "verse_completion",
    "p": "Habakkuk 2:4: 'Behold, his soul is puffed up; it is not upright within him, but the righteous shall live by his ______.'",
    "b": "HAB",
    "c": 2,
    "a": [
      "faith"
    ],
    "e": "Habakkuk 2:4 is quoted three times in the New Testament (Romans 1:17, Galatians 3:11, Hebrews 10:38)."
  },
  {
    "id": "det_q31",
    "t": "book_chapter",
    "p": "What book & chapter contains the prophecy: 'Behold, the virgin shall conceive and bear a son, and shall call his name Immanuel'?",
    "b": "ISA",
    "c": 7,
    "a": [
      "Isaiah 7",
      "Isa 7",
      "Isaiah ch 7",
      "Isaiah 7:14"
    ],
    "d": "Isaiah 7 (or Isaiah 7:14)",
    "e": "Isaiah 7:14 is the landmark prophecy given to King Ahaz, fulfilled in the birth of Jesus (Matt 1:23)."
  },
  {
    "id": "det_q32",
    "t": "facts",
    "p": "In which village of Galilee did Jesus perform His first miraculous sign by turning water into wine at a wedding feast?",
    "b": "JHN",
    "c": 2,
    "a": [
      "Cana",
      "Cana of Galilee"
    ],
    "d": "Cana of Galilee",
    "e": "John 2:11: 'This, the first of his signs, Jesus did at Cana in Galilee, and manifested his glory.'"
  },
  {
    "id": "det_q33",
    "t": "chapter_in_book",
    "p": "What chapter in Matthew contains the Transfiguration of Jesus with Moses and Elijah on the mountain?",
    "b": "MAT",
    "c": 17,
    "a": [
      "17",
      "ch 17",
      "chapter 17",
      "Matthew 17",
      "Matt 17"
    ],
    "d": "Matthew 17 (or Chapter 17)",
    "e": "In Matthew 17, Jesus shone like the sun before Peter, James, and John on the Mount of Transfiguration."
  },
  {
    "id": "det_q34",
    "t": "chapter_in_book",
    "p": "What chapter in John describes Jesus raising Lazarus from the dead after four days in the tomb?",
    "b": "JHN",
    "c": 11,
    "a": [
      "11",
      "ch 11",
      "chapter 11",
      "John 11",
      "Jn 11"
    ],
    "d": "John 11 (or Chapter 11)",
    "e": "In John 11:43, Jesus cried with a loud voice: 'Lazarus, come out!' and the dead man walked out."
  },
  {
    "id": "det_q35",
    "t": "chapter_in_book",
    "p": "What chapter in John records Jesus' High Priestly Prayer for Himself, His disciples, and all future believers?",
    "b": "JHN",
    "c": 17,
    "a": [
      "17",
      "ch 17",
      "chapter 17",
      "John 17",
      "Jn 17"
    ],
    "d": "John 17 (or Chapter 17)",
    "e": "John 17 is the High Priestly Prayer where Jesus prays for His church to be sanctified in truth and unified as one."
  },
  {
    "id": "det_q36",
    "t": "facts",
    "p": "Who was the first Christian martyr in Acts, stoned to death while seeing the Son of Man standing at the right hand of God?",
    "b": "ACT",
    "c": 7,
    "a": [
      "Stephen"
    ],
    "e": "Acts 7 recounts Stephen's bold defense before the Sanhedrin and his prayer 'Lord, do not hold this sin against them.'"
  },
  {
    "id": "det_q37",
    "t": "facts",
    "p": "In Acts 8, which evangelist explained the Suffering Servant passage in Isaiah 53 to an Ethiopian royal official in his chariot?",
    "b": "ACT",
    "c": 8,
    "a": [
      "Philip",
      "Philip the evangelist"
    ],
    "d": "Philip (the Evangelist)",
    "e": "In Acts 8:35, Philip began with Isaiah 53 and told the Ethiopian eunuch the good news about Jesus, then baptized him."
  },
  {
    "id": "det_q38",
    "t": "facts",
    "p": "In Acts 10, who was the God-fearing Roman centurion in Caesarea to whom Peter was sent after receiving a vision of clean and unclean animals?",
    "b": "ACT",
    "c": 10,
    "a": [
      "Cornelius"
    ],
    "e": "In Acts 10, the Holy Spirit fell on Cornelius and his household, confirming Gentile inclusion in the church."
  },
  {
    "id": "det_q39",
    "t": "facts",
    "p": "In Acts 17, on which prominent hill in Athens did Paul preach to Stoic and Epicurean philosophers regarding the 'Unknown God'?",
    "b": "ACT",
    "c": 17,
    "a": [
      "Mars Hill",
      "Areopagus",
      "Mars' Hill"
    ],
    "d": "Mars Hill (The Areopagus)",
    "e": "In Acts 17:22\u201331, Paul preached at the Areopagus (Mars Hill) in Athens regarding the Creator God and the resurrection."
  },
  {
    "id": "det_q40",
    "t": "verse_completion",
    "p": "Galatians 2:20: 'I have been ______ with Christ. It is no longer I who live, but Christ who lives in me.'",
    "b": "GAL",
    "c": 2,
    "a": [
      "crucified"
    ],
    "e": "Galatians 2:20: 'I have been crucified with Christ. It is no longer I who live, but Christ who lives in me.'"
  },
  {
    "id": "det_q41",
    "t": "chapter_in_book",
    "p": "What chapter in Ephesians contains the cornerstone statement on salvation: 'For by grace you have been saved through faith. And this is not your own doing; it is the gift of God, not a result of works...'?",
    "b": "EPH",
    "c": 2,
    "a": [
      "2",
      "Ephesians 2",
      "Eph 2",
      "ch 2",
      "chapter 2"
    ],
    "d": "Ephesians 6 (or Chapter 6)",
    "e": "Ephesians 2:8\u20139 provides the core doctrine of salvation by grace through faith alone."
  },
  {
    "id": "det_q42",
    "t": "verse_completion",
    "p": "Philippians 4:13: 'I can do all things through him who ______ me.'",
    "b": "PHP",
    "c": 4,
    "a": [
      "strengthens"
    ],
    "e": "Philippians 4:13: 'I can do all things through him who strengthens me.'"
  },
  {
    "id": "det_q43",
    "t": "verse_completion",
    "p": "James 2:26: 'For as the body apart from the spirit is dead, so also faith apart from ______ is dead.'",
    "b": "JAS",
    "c": 2,
    "a": [
      "works"
    ],
    "e": "James 2:26 emphasizes that genuine living faith produces active fruit and obedience."
  },
  {
    "id": "det_q44",
    "t": "book_chapter",
    "p": "What book & chapter contains the letters dictated by the risen Christ to the Seven Churches of Asia Minor?",
    "b": "REV",
    "c": 2,
    "a": [
      "Revelation 2",
      "Rev 2",
      "Revelation 2-3",
      "Rev 2-3"
    ],
    "d": "Revelation 2 (and 3)",
    "e": "Revelation 2\u20133 contains Christ's specific messages to Ephesus, Smyrna, Pergamum, Thyatira, Sardis, Philadelphia, and Laodicea."
  },
  {
    "id": "supp_pent_1",
    "t": "book_id",
    "p": "Which book contains the foundational marriage principle: 'Therefore a man shall leave his father and his mother and hold fast to his wife, and they shall become one flesh'?",
    "b": "GEN",
    "c": 2,
    "a": [
      "Genesis",
      "Gen",
      "Genesis 2",
      "Gen 2"
    ],
    "d": "Genesis (Genesis 2:24)",
    "e": "Genesis 2:24 establishes the creation design for marriage, quoted by Jesus in Matthew 19 and Paul in Ephesians 5."
  },
  {
    "id": "supp_pent_2",
    "t": "book_id",
    "p": "In which book does Moses strike the rock twice in anger at Meribah, resulting in him not entering the Promised Land?",
    "b": "NUM",
    "c": 20,
    "a": [
      "Numbers",
      "Num",
      "Numbers 20",
      "Num 20"
    ],
    "d": "Numbers (Numbers 20)",
    "e": "Numbers 20 records the tragic incident at the Waters of Meribah where Moses failed to uphold God as holy before the people."
  },
  {
    "id": "supp_pent_3",
    "t": "verse_completion",
    "p": "Deuteronomy 29:29: 'The ______ things belong to the Lord our God, but the things that are revealed belong to us and to our children forever...'",
    "b": "DEU",
    "c": 29,
    "a": [
      "secret",
      "hidden"
    ],
    "e": "Deuteronomy 29:29: 'The secret things belong to the Lord our God, but the things that are revealed belong to us and to our children forever, that we may do all the words of this law.'"
  },
  {
    "id": "supp_pent_4",
    "t": "book_id",
    "p": "In which book is the foundational principle given: 'For the life of the flesh is in the blood, and I have given it for you on the altar to make atonement for your souls'?",
    "b": "LEV",
    "c": 17,
    "a": [
      "Leviticus",
      "Lev",
      "Leviticus 17",
      "Lev 17"
    ],
    "d": "Leviticus (Leviticus 17:11)",
    "e": "Leviticus 17:11 establishes the theological foundation of substitutionary blood atonement."
  },
  {
    "id": "supp_pent_5",
    "t": "facts",
    "p": "Which sister of Moses challenged his spiritual leadership authority and was temporarily struck with leprosy?",
    "b": "NUM",
    "c": 12,
    "a": [
      "Miriam"
    ],
    "e": "Numbers 12 records Miriam and Aaron opposing Moses regarding his Cushite wife and unique prophetic authority."
  },
  {
    "id": "supp_pent_6",
    "t": "facts",
    "p": "Which faithful spy alongside Joshua had a different spirit and wholly followed the Lord, receiving Hebron as his inheritance?",
    "b": "NUM",
    "c": 14,
    "a": [
      "Caleb",
      "Caleb son of Jephunneh"
    ],
    "d": "Eleazar (the High Priest)",
    "e": "Numbers 14:24 and Joshua 14:14 celebrate Caleb's unwavering faith and reward with Hebron."
  },
  {
    "id": "supp_hist_1",
    "t": "verse_completion",
    "p": "Joshua 1:8: 'This Book of the Law shall not depart from your mouth, but you shall ______ on it day and night...'",
    "b": "JOS",
    "c": 1,
    "a": [
      "meditate"
    ],
    "e": "Joshua 1:8: 'This Book of the Law shall not depart from your mouth, but you shall meditate on it day and night, so that you may be careful to do according to all that is written in it.'"
  },
  {
    "id": "supp_hist_2",
    "t": "verse_completion",
    "p": "1 Samuel 15:22: 'Behold, to ______ is better than sacrifice, and to listen than the fat of rams.'",
    "b": "1SA",
    "c": 15,
    "a": [
      "obey"
    ],
    "e": "1 Samuel 15:22 is Samuel's direct rebuke to King Saul after his partial obedience regarding the Amalekites."
  },
  {
    "id": "supp_hist_3",
    "t": "verse_completion",
    "p": "1 Samuel 16:7: 'For the Lord sees not as man sees: man looks on the outward appearance, but the Lord looks on the ______.'",
    "b": "1SA",
    "c": 16,
    "a": [
      "heart"
    ],
    "e": "1 Samuel 16:7: God's counsel to Samuel before anointing young David in Bethlehem."
  },
  {
    "id": "supp_hist_4",
    "t": "book_id",
    "p": "Which book contains the prayer of Jabez ('Oh that you would bless me indeed and enlarge my border, that your hand might be with me...')?",
    "b": "1CH",
    "c": 4,
    "a": [
      "1 Chronicles",
      "1 Chron",
      "1Chronicles",
      "1Chron"
    ],
    "d": "1 Chronicles (1 Chron 4:9\u201310)",
    "e": "1 Chronicles 4:9\u201310 records Jabez praying for God's protection and blessing, and God granted his request."
  },
  {
    "id": "supp_hist_5",
    "t": "facts",
    "p": "Which Godly High Priest hid the boy Joash from wicked Queen Athaliah for six years and crowned him king of Judah?",
    "b": "2KI",
    "c": 11,
    "a": [
      "Jehoiada",
      "Jehoiada the priest"
    ],
    "d": "Jehoiada (the High Priest)",
    "e": "2 Kings 11 describes Jehoiada courageously executing the coup to restore David's rightful line to the throne."
  },
  {
    "id": "supp_hist_6",
    "t": "facts",
    "p": "Which king of Judah was struck with leprosy in the Temple when he arrogantly attempted to burn incense on the altar?",
    "b": "2CH",
    "c": 26,
    "a": [
      "Uzziah",
      "Azariah",
      "King Uzziah"
    ],
    "d": "Uzziah (Azariah)",
    "e": "2 Chronicles 26:16\u201321 recounts King Uzziah's pride leading to his downfall when he usurped the priest's duty."
  },
  {
    "id": "supp_hist_7",
    "t": "facts",
    "p": "Which righteous king of Judah found the lost Book of the Law during temple renovations and tore his clothes in repentance?",
    "b": "2KI",
    "c": 22,
    "a": [
      "Josiah",
      "King Josiah"
    ],
    "d": "Micaiah (son of Imlah)",
    "e": "2 Kings 22: Josiah tore his clothes when Shaphan read the recovered Book of the Law."
  },
  {
    "id": "supp_hist_8",
    "t": "facts",
    "p": "Which beloved son of David led a massive rebellion against his father, briefly taking Jerusalem before being killed in the forest of Ephraim?",
    "b": "2SA",
    "c": 15,
    "a": [
      "Absalom"
    ],
    "e": "2 Samuel 15\u201318 chronicles Absalom's conspiracy, David's flight from Jerusalem, and David's grief over his death."
  },
  {
    "id": "supp_poet_1",
    "t": "verse_completion",
    "p": "Psalm 37:4: '______ yourself in the Lord, and he will give you the desires of your heart.'",
    "b": "PSA",
    "c": 37,
    "a": [
      "Delight",
      "delight"
    ],
    "e": "Psalm 37:4: 'Delight yourself in the Lord, and he will give you the desires of your heart.'"
  },
  {
    "id": "supp_poet_2",
    "t": "verse_completion",
    "p": "Job 23:10: 'But he knows the way that I take; when he has ______ me, I shall come out as gold.'",
    "b": "JOB",
    "c": 23,
    "a": [
      "tried",
      "tested"
    ],
    "d": "tried (or tested)",
    "e": "Job 23:10 is Job's unwavering confession of confidence in God's refining purpose through suffering."
  },
  {
    "id": "supp_poet_3",
    "t": "verse_completion",
    "p": "Proverbs 21:1: 'The king's heart is a stream of water in the hand of the Lord; he ______ it wherever he will.'",
    "b": "PRO",
    "c": 21,
    "a": [
      "turns",
      "directs"
    ],
    "d": "turns (or directs)",
    "e": "Proverbs 21:1 demonstrates God's absolute sovereignty over human rulers and world leaders."
  },
  {
    "id": "supp_poet_4",
    "t": "verse_completion",
    "p": "Ecclesiastes 12:13: 'The end of the matter; all has been heard. Fear God and keep his ______, for this is the whole duty of man.'",
    "b": "ECC",
    "c": 12,
    "a": [
      "commandments"
    ],
    "e": "Ecclesiastes 12:13 is the great grand conclusion of Qoheleth's quest for ultimate meaning under the sun."
  },
  {
    "id": "supp_prop_1",
    "t": "verse_completion",
    "p": "Zechariah 4:6: 'Not by might, nor by power, but by my ______, says the Lord of hosts.'",
    "b": "ZEC",
    "c": 4,
    "a": [
      "Spirit",
      "spirit",
      "Holy Spirit"
    ],
    "e": "Zechariah 4:6 was God's word of encouragement to Zerubbabel as he rebuilt the Second Temple."
  },
  {
    "id": "supp_prop_2",
    "t": "verse_completion",
    "p": "Ezekiel 22:30: 'And I sought for a man among them who should build up the wall and stand in the ______ before me for the land... but I found none.'",
    "b": "EZE",
    "c": 22,
    "a": [
      "gap",
      "breach"
    ],
    "d": "gap (or breach)",
    "e": "Ezekiel 22:30 highlights God's search for righteous intercessory leaders in times of moral decline."
  },
  {
    "id": "supp_prop_3",
    "t": "verse_completion",
    "p": "Isaiah 26:3: 'You keep him in perfect ______ whose mind is stayed on you, because he trusts in you.'",
    "b": "ISA",
    "c": 26,
    "a": [
      "peace"
    ],
    "e": "Isaiah 26:3 promises steadfast peace (shalom shalom) to the heart anchored in God."
  },
  {
    "id": "supp_prop_4",
    "t": "verse_completion",
    "p": "Isaiah 40:31: 'But they who wait for the Lord shall renew their strength; they shall mount up with wings like ______...'",
    "b": "ISA",
    "c": 40,
    "a": [
      "eagles"
    ],
    "e": "Isaiah 40:31: '...they shall run and not be weary; they shall walk and not faint.'"
  },
  {
    "id": "supp_prop_5",
    "t": "verse_completion",
    "p": "Isaiah 55:11: 'So shall my word be that goes out from my mouth; it shall not return to me ______...'",
    "b": "ISA",
    "c": 55,
    "a": [
      "empty",
      "void"
    ],
    "d": "empty (or void)",
    "e": "Isaiah 55:11: '...but it shall accomplish that which I purpose, and shall succeed in the thing for which I sent it.'"
  },
  {
    "id": "supp_prop_6",
    "t": "verse_completion",
    "p": "Haggai 1:4: 'Is it a time for you yourselves to dwell in your paneled houses, while this ______ lies in ruins?'",
    "b": "HAG",
    "c": 1,
    "a": [
      "house",
      "temple",
      "Lord's house"
    ],
    "d": "house (the Temple)",
    "e": "Haggai 1:4 rebuked the returned Jewish exiles for prioritizing their own homes over rebuilding the Temple of the Lord."
  },
  {
    "id": "supp_prop_7",
    "t": "book_id",
    "p": "Which Old Testament book consists of a single chapter declaring the divine judgment and complete downfall of Edom?",
    "b": "OBA",
    "c": 1,
    "a": [
      "Obadiah",
      "Obad"
    ],
    "e": "Obadiah (21 verses) is the shortest book in the Old Testament, condemning Edom for violence against their brother Jacob."
  },
  {
    "id": "supp_prop_8",
    "t": "facts",
    "p": "Which prophet wrestled with God's justice in using the Babylonians to judge Judah, concluding: 'the righteous shall live by his faith'?",
    "b": "HAB",
    "c": 2,
    "a": [
      "Habakkuk",
      "Hab"
    ],
    "e": "Habakkuk 2:4 is the foundational Old Testament declaration of justification by faith."
  },
  {
    "id": "supp_gosp_1",
    "t": "verse_completion",
    "p": "Acts 4:12: 'And there is salvation in no one else, for there is no other ______ under heaven given among men by which we must be saved.'",
    "b": "ACT",
    "c": 4,
    "a": [
      "name"
    ],
    "e": "Acts 4:12 was proclaimed boldly by Peter before the Jewish Sanhedrin in Jerusalem."
  },
  {
    "id": "supp_gosp_2",
    "t": "verse_completion",
    "p": "Matthew 6:33: 'But seek first the ______ of God and his righteousness, and all these things will be added to you.'",
    "b": "MAT",
    "c": 6,
    "a": [
      "kingdom",
      "kingdom of god"
    ],
    "e": "Matthew 6:33 is Jesus' climax command against worry in the Sermon on the Mount."
  },
  {
    "id": "supp_gosp_3",
    "t": "facts",
    "p": "Which early church leader from Cyprus was named Joseph, nicknamed 'Son of Encouragement', and welcomed Paul into ministry?",
    "b": "ACT",
    "c": 4,
    "a": [
      "Barnabas"
    ],
    "e": "Acts 4:36 introduces Barnabas ('Son of Encouragement'), who later partnered with Paul on his 1st missionary journey."
  },
  {
    "id": "supp_gosp_4",
    "t": "facts",
    "p": "Which silversmith in Ephesus stirred up a citywide riot against Paul because the Gospel threatened the trade of Artemis shrines?",
    "b": "ACT",
    "c": 19,
    "a": [
      "Demetrius"
    ],
    "e": "In Acts 19:24\u201329, Demetrius gathered fellow craftsmen shouting 'Great is Artemis of the Ephesians!'"
  },
  {
    "id": "supp_gosp_5",
    "t": "facts",
    "p": "Which eloquent Jewish teacher from Alexandria was mighty in the Scriptures and was mentored more accurately in Ephesus by Priscilla and Aquila?",
    "b": "ACT",
    "c": 18,
    "a": [
      "Apollos"
    ],
    "e": "Acts 18:24\u201328 describes Apollos powerfully refuting the Jews in public, proving from the Scriptures that Jesus was the Christ."
  },
  {
    "id": "supp_epist_1",
    "t": "verse_completion",
    "p": "1 Thessalonians 4:16: 'For the Lord himself will descend from heaven with a cry of command, with the voice of an archangel, and with the sound of the ______ of God.'",
    "b": "1TH",
    "c": 4,
    "a": [
      "trumpet",
      "trumpet of god"
    ],
    "e": "1 Thessalonians 4:16: '...And the dead in Christ will rise first.'"
  },
  {
    "id": "supp_epist_2",
    "t": "verse_completion",
    "p": "Colossians 2:9: 'For in him the whole fullness of ______ dwells bodily.'",
    "b": "COL",
    "c": 2,
    "a": [
      "deity",
      "Godhead",
      "godhead"
    ],
    "d": "deity (Godhead)",
    "e": "Colossians 2:9 is a foundational verse declaring the full and complete deity of Jesus Christ in bodily form."
  },
  {
    "id": "supp_epist_3",
    "t": "verse_completion",
    "p": "1 Corinthians 10:13: 'No temptation has overtaken you that is not common to man. God is ______, and he will not let you be tempted beyond your ability...'",
    "b": "1CO",
    "c": 10,
    "a": [
      "faithful"
    ],
    "e": "1 Corinthians 10:13: '...but with the temptation he will also provide the way of escape, that you may be able to endure it.'"
  },
  {
    "id": "supp_epist_4",
    "t": "verse_completion",
    "p": "2 Corinthians 10:4: 'For the weapons of our warfare are not of the flesh but have divine power to destroy ______.'",
    "b": "2CO",
    "c": 10,
    "a": [
      "strongholds"
    ],
    "e": "2 Corinthians 10:4\u20135 emphasizes spiritual warfare and taking every thought captive to obey Christ."
  },
  {
    "id": "supp_epist_5",
    "t": "verse_completion",
    "p": "2 Thessalonians 3:10: 'If anyone is not willing to work, let him not ______.'",
    "b": "2TH",
    "c": 3,
    "a": [
      "eat"
    ],
    "e": "2 Thessalonians 3:10 establishes the biblical work ethic and warns against idleness."
  },
  {
    "id": "supp_epist_6",
    "t": "facts",
    "p": "In 2 Timothy 4:10, which former ministry associate deserted Paul during his final imprisonment in Rome because he 'fell in love with this present world'?",
    "b": "2TI",
    "c": 4,
    "a": [
      "Demas"
    ],
    "e": "2 Timothy 4:10: 'For Demas, in love with this present world, has deserted me and gone to Thessalonica.'"
  },
  {
    "id": "supp_epist_7",
    "t": "facts",
    "p": "Which fellow worker from Philippi brought a sacrificial financial gift to Paul in prison and nearly died from illness in the work of Christ?",
    "b": "PHP",
    "c": 2,
    "a": [
      "Epaphroditus"
    ],
    "e": "Philippians 2:25\u201330 praises Epaphroditus as 'my brother and fellow worker and fellow soldier, and your messenger.'"
  },
  {
    "id": "supp_epist_8",
    "t": "verse_completion",
    "p": "Hebrews 13:7: 'Remember your leaders, those who spoke to you the word of God. Consider the outcome of their way of life, and ______ their faith.'",
    "b": "HEB",
    "c": 13,
    "a": [
      "imitate",
      "follow"
    ],
    "e": "Hebrews 13:7 emphasizes the power of godly leadership modeling and faithful discipleship."
  },
  {
    "id": "supp_epist_9",
    "t": "verse_completion",
    "p": "1 Peter 3:18: 'For Christ also suffered once for sins, the righteous for the unrighteous, that he might bring us to ______...'",
    "b": "1PE",
    "c": 3,
    "a": [
      "God",
      "god"
    ],
    "e": "1 Peter 3:18: '...being put to death in the flesh but made alive in the spirit.'"
  },
  {
    "id": "supp_epist_10",
    "t": "facts",
    "p": "Which church leader in 3 John loved to put himself first, refused to receive the apostles, and excommunicated members who showed hospitality?",
    "b": "3JN",
    "c": 1,
    "a": [
      "Diotrephes"
    ],
    "e": "3 John 9\u201310 warns against Diotrephes, who loved to have the preeminence and spoke malicious words against the apostles."
  },
  {
    "id": "supp_epist_11",
    "t": "book_id",
    "p": "Which short New Testament letter urges believers to 'contend earnestly for the faith that was once for all delivered to the saints'?",
    "b": "JUD",
    "c": 1,
    "a": [
      "Jude",
      "Book of Jude"
    ],
    "e": "Jude 3 is the core rallying cry of Jude's epistle warning against ungodly apostates."
  },
  {
    "id": "supp_epist_12",
    "t": "facts",
    "p": "In Revelation 3:20, to which of the seven churches of Asia Minor did Jesus give the famous invitation: 'Behold, I stand at the door and knock'?",
    "b": "REV",
    "c": 3,
    "a": [
      "Laodicea",
      "Church in Laodicea",
      "Laodiceans"
    ],
    "d": "Laodicea (Church in Laodicea)",
    "e": "Revelation 3:14\u201322 was written to the lukewarm church in Laodicea."
  },
  {
    "id": "gfc_who_1",
    "t": "facts",
    "p": "Who wrote the Book of Acts?",
    "b": "ACT",
    "c": 1,
    "a": [
      "Luke",
      "Saint Luke",
      "St. Luke",
      "Dr. Luke",
      "Doctor Luke"
    ],
    "e": "Luke, the physician and companion of Paul, wrote both the Gospel of Luke and the Acts of the Apostles (Acts 1:1, Luke 1:1\u20134)."
  },
  {
    "id": "gfc_who_2",
    "t": "facts",
    "p": "Who appeared with Jesus on the Mount of Transfiguration?",
    "b": "MAT",
    "c": 17,
    "a": [
      "Moses and Elijah",
      "Moses & Elijah",
      "Elijah and Moses",
      "Elijah & Moses",
      "Moses, Elijah"
    ],
    "e": "Matthew 17:3 records Moses (representing the Law) and Elijah (representing the Prophets) talking with the transfigured Christ."
  },
  {
    "id": "gfc_who_3",
    "t": "facts",
    "p": "Who directed the rebuilding of the walls of Jerusalem after the Babylonian exile?",
    "b": "NEH",
    "c": 2,
    "a": [
      "Nehemiah",
      "Nehemiah the governor",
      "Nehemiah the cupbearer"
    ],
    "e": "Nehemiah served as cupbearer to Artaxerxes and governor of Judah, leading the rebuilding of Jerusalem's walls in 52 days (Nehemiah 6:15)."
  },
  {
    "id": "gfc_who_4",
    "t": "facts",
    "p": "Which judge killed a thousand Philistines with a donkey's jawbone?",
    "b": "JDG",
    "c": 15,
    "a": [
      "Samson"
    ],
    "e": "Judges 15:15: Samson struck down 1,000 Philistines with a fresh jawbone of a donkey at Lehi."
  },
  {
    "id": "gfc_who_5",
    "t": "facts",
    "p": "Who succeeded Moses and led the Israelites into the Promised Land across the Jordan River?",
    "b": "JOS",
    "c": 1,
    "a": [
      "Joshua",
      "Joshua son of Nun"
    ],
    "e": "Joshua 1: Moses' assistant whom God commissioned: 'Be strong and courageous... for you shall cause this people to inherit the land.'"
  },
  {
    "id": "gfc_who_6",
    "t": "facts",
    "p": "Which apostle was exiled to the island of Patmos where he received the apocalyptic vision of Revelation?",
    "b": "REV",
    "c": 1,
    "a": [
      "John",
      "Apostle John",
      "Saint John",
      "St. John"
    ],
    "d": "John (Apostle John)",
    "e": "Revelation 1:9: 'I, John, your brother and partner in the tribulation... was on the island called Patmos on account of the word of God.'"
  },
  {
    "id": "gfc_who_7",
    "t": "facts",
    "p": "Which pagan prophet was hired by Balak king of Moab to curse Israel, but God compelled him to speak only blessings?",
    "b": "NUM",
    "c": 22,
    "a": [
      "Balaam",
      "Balaam son of Beor"
    ],
    "e": "Numbers 22\u201324: Balaam could only speak what God commanded, prophesying a star and scepter out of Jacob (Numbers 24:17)."
  },
  {
    "id": "gfc_who_8",
    "t": "facts",
    "p": "Who became the first king of the northern 10 tribes of Israel when the united monarchy divided?",
    "b": "1KI",
    "c": 12,
    "a": [
      "Jeroboam",
      "Jeroboam I",
      "Jeroboam son of Nebat"
    ],
    "d": "Jeroboam (son of Nebat)",
    "e": "1 Kings 12: Jeroboam led the northern rebellion against Rehoboam and set up golden calves at Bethel and Dan."
  },
  {
    "id": "gfc_who_9",
    "t": "facts",
    "p": "Which wise and discerning woman intervened to rescue David and his men from shedding blood after her foolish husband Nabal insulted them?",
    "b": "1SA",
    "c": 25,
    "a": [
      "Abigail"
    ],
    "e": "1 Samuel 25: Abigail brought provisions to David, restrained his vengeance, and later became David's wife after Nabal died."
  },
  {
    "id": "gfc_who_10",
    "t": "facts",
    "p": "Which apostle was publicly rebuked by Paul in Antioch for withdrawing from eating with Gentiles out of fear of the circumcision party?",
    "b": "GAL",
    "c": 2,
    "a": [
      "Peter",
      "Cephas",
      "Simon Peter"
    ],
    "d": "Peter (Cephas)",
    "e": "Galatians 2:11\u201314: Paul opposed Peter to his face because his conduct was not in step with the truth of the gospel."
  },
  {
    "id": "gfc_geo_1",
    "t": "facts",
    "p": "On what mountain did God meet with Moses and give him the Ten Commandments?",
    "b": "EXO",
    "c": 19,
    "a": [
      "Mount Sinai",
      "Sinai",
      "Mt. Sinai",
      "Mt Sinai",
      "Mount Horeb",
      "Horeb"
    ],
    "d": "Mount Sinai (Horeb)",
    "e": "Exodus 19\u201320: God descended on Mount Sinai in fire and smoke and audibly proclaimed the Ten Commandments."
  },
  {
    "id": "gfc_geo_2",
    "t": "facts",
    "p": "In what major Greco-Roman city did Demetrius the silversmith stir up a massive theater riot against Paul over Artemis worship?",
    "b": "ACT",
    "c": 19,
    "a": [
      "Ephesus"
    ],
    "e": "Acts 19:23\u201341: The theater riot in Ephesus where the mob shouted 'Great is Artemis of the Ephesians!' for two hours."
  },
  {
    "id": "gfc_geo_3",
    "t": "facts",
    "p": "In what Syrian city were the disciples of Jesus first called 'Christians'?",
    "b": "ACT",
    "c": 11,
    "a": [
      "Antioch",
      "Antioch of Syria",
      "Syrian Antioch"
    ],
    "e": "Acts 11:26: Barnabas and Saul taught a great many people in Antioch, where believers were first given the name Christians."
  },
  {
    "id": "gfc_geo_4",
    "t": "facts",
    "p": "In which river was Jesus baptized by John the Baptist?",
    "b": "MAT",
    "c": 3,
    "a": [
      "Jordan",
      "Jordan River",
      "River Jordan",
      "The Jordan River",
      "The Jordan"
    ],
    "d": "Jordan River",
    "e": "Matthew 3:13: Jesus came from Galilee to the Jordan to be baptized by John."
  },
  {
    "id": "gfc_geo_5",
    "t": "facts",
    "p": "What fortified Canaanite city saw its walls collapse after the Israelites marched around it for seven days?",
    "b": "JOS",
    "c": 6,
    "a": [
      "Jericho"
    ],
    "e": "Joshua 6: The conquest of Jericho where the priests blew ram's horns and the walls fell flat."
  },
  {
    "id": "gfc_geo_6",
    "t": "facts",
    "p": "In what capital city on Mount Moriah did King Solomon build the glorious Temple of the Lord?",
    "b": "1KI",
    "c": 6,
    "a": [
      "Jerusalem",
      "Mount Moriah",
      "Zion"
    ],
    "e": "1 Kings 6 & 2 Chronicles 3:1: Solomon began to build the house of the Lord in Jerusalem on Mount Moriah."
  },
  {
    "id": "gfc_geo_7",
    "t": "facts",
    "p": "To what great Assyrian capital city was the prophet Jonah commanded to preach repentance before fleeing toward Tarshish?",
    "b": "JON",
    "c": 1,
    "a": [
      "Nineveh"
    ],
    "e": "Jonah 1:2: 'Arise, go to Nineveh, that great city, and call out against it, for their evil has come up before me.'"
  },
  {
    "id": "gfc_geo_8",
    "t": "facts",
    "p": "Near what Syrian city was Saul blinded by a blazing light from heaven and confronted by Jesus on the road?",
    "b": "ACT",
    "c": 9,
    "a": [
      "Damascus"
    ],
    "e": "Acts 9:3\u20134: As Saul drew near to Damascus, suddenly a light from heaven shone around him and he fell to the ground."
  },
  {
    "id": "gfc_geo_9",
    "t": "facts",
    "p": "In what garden on the Mount of Olives was Jesus betrayed by Judas and arrested after agonizing in prayer?",
    "b": "MAT",
    "c": 26,
    "a": [
      "Gethsemane",
      "Garden of Gethsemane"
    ],
    "e": "Matthew 26:36: Jesus came with them to a place called Gethsemane and prayed: 'Not as I will, but as you will.'"
  },
  {
    "id": "gfc_geo_10",
    "t": "facts",
    "p": "In what Judean village, the ancestral town of Jesse, was King David born and later anointed by Samuel?",
    "b": "1SA",
    "c": 16,
    "a": [
      "Bethlehem",
      "Bethlehem Ephrathah",
      "City of David"
    ],
    "e": "1 Samuel 16:1: Samuel traveled to Bethlehem to anoint David from among Jesse's sons."
  },
  {
    "id": "gfc_book_1",
    "t": "book_id",
    "p": "In what book does Peter visit the Roman centurion Cornelius in Caesarea and declare that God shows no partiality between Jews and Gentiles?",
    "b": "ACT",
    "c": 10,
    "a": [
      "Acts",
      "Acts of the Apostles",
      "Act"
    ],
    "d": "Acts (Acts 10)",
    "e": "Acts 10 recounts Peter's rooftop vision and the Holy Spirit falling upon Cornelius's Gentile household."
  },
  {
    "id": "gfc_book_2",
    "t": "book_id",
    "p": "In what short letter does Paul urge a Christian master to receive back his runaway slave Onesimus 'no longer as a bondservant but... as a beloved brother'?",
    "b": "PHM",
    "c": 1,
    "a": [
      "Philemon",
      "Philem",
      "Phlm"
    ],
    "e": "Philemon is Paul's personal epistle appealing for reconciliation and Christian brotherhood between Philemon and Onesimus."
  },
  {
    "id": "gfc_book_3",
    "t": "book_id",
    "p": "In what book does Aaron fashion a golden calf from melted earrings while Moses is up on the mountain receiving the Law?",
    "b": "EXO",
    "c": 32,
    "a": [
      "Exodus",
      "Exod",
      "Exo"
    ],
    "d": "Exodus (Exodus 32)",
    "e": "Exodus 32 chronicles Israel's rapid idolatry at Mount Sinai and Moses shattering the stone tablets."
  },
  {
    "id": "gfc_book_4",
    "t": "book_id",
    "p": "In what book is the narrative of Joseph being sold into Egyptian slavery by his brothers and later declaring 'God meant it for good'?",
    "b": "GEN",
    "c": 37,
    "a": [
      "Genesis",
      "Gen",
      "Ge"
    ],
    "d": "Genesis (Genesis 37\u201350)",
    "e": "Genesis 37\u201350 details Joseph's coat of many colors, Potiphar's house, prison, and rise to prime minister of Egypt."
  },
  {
    "id": "gfc_book_5",
    "t": "book_id",
    "p": "In what book do twelve spies explore the land of Canaan, with only Joshua and Caleb trusting the Lord to give them victory?",
    "b": "NUM",
    "c": 13,
    "a": [
      "Numbers",
      "Num",
      "Nu"
    ],
    "d": "Numbers (Numbers 13\u201314)",
    "e": "Numbers 13\u201314 records the 10 fearful spies and the resulting 40-year wandering in the wilderness."
  },
  {
    "id": "gfc_book_6",
    "t": "book_id",
    "p": "In what prophetic book is God's coming judgment on Judah portrayed as a devastating, unstoppable invasion of locusts?",
    "b": "JOL",
    "c": 1,
    "a": [
      "Joel",
      "Jol",
      "Joe"
    ],
    "d": "Joel (Joel 1\u20132)",
    "e": "Joel 1\u20132 uses the locust plague as a warning of the Day of the Lord, followed by the promise of the Spirit in Joel 2:28.",
    "s": "OT",
    "g": "Minor Prophets"
  },
  {
    "id": "gfc_book_7",
    "t": "book_id",
    "p": "In what epistle does the Apostle Paul describe the full Armor of God to withstand the schemes of the devil?",
    "b": "EPH",
    "c": 6,
    "a": [
      "Ephesians",
      "Eph"
    ],
    "d": "Ephesians (Ephesians 6)",
    "e": "Ephesians 6:10\u201320 describes the belt of truth, breastplate of righteousness, shield of faith, helmet of salvation, and sword of the Spirit."
  },
  {
    "id": "gfc_book_8",
    "t": "book_id",
    "p": "In what Old Testament book do the exact prophetic words appear: 'My God, my God, why have you forsaken me? Why are you so far from saving me...'?",
    "b": "PSA",
    "c": 22,
    "a": [
      "Psalms",
      "Psalm",
      "Psalm 22",
      "Psalms 22",
      "Ps 22"
    ],
    "d": "Psalms (Psalm 22:1)",
    "e": "Psalm 22:1 is David's prophetic lament of crucifixion, quoted by Jesus on the cross (Matthew 27:46)."
  },
  {
    "id": "gfc_book_9",
    "t": "book_id",
    "p": "In what book is a prophet commanded by God to marry an unfaithful woman named Gomer as a living object lesson of God's redeeming covenant love?",
    "b": "HOS",
    "c": 1,
    "a": [
      "Hosea",
      "Hos"
    ],
    "d": "Hosea (Hosea 1\u20133)",
    "e": "Hosea 1\u20133 portrays God's relentless, forgiving love for spiritual adulterers."
  },
  {
    "id": "gfc_book_10",
    "t": "book_id",
    "p": "In what Gospel do the Magi from the East follow a miraculous star to Bethlehem and present gifts of gold, frankincense, and myrrh?",
    "b": "MAT",
    "c": 2,
    "a": [
      "Matthew",
      "Matt",
      "Gospel of Matthew"
    ],
    "d": "Matthew (Matthew 2)",
    "e": "Matthew 2:1\u201312 uniquely records the visit and worship of the wise men."
  },
  {
    "id": "gfc_book_11",
    "t": "book_id",
    "p": "In what book does the famous passage appear: 'For everything there is a season, and a time for every matter under heaven: a time to be born, and a time to die...'?",
    "b": "ECC",
    "c": 3,
    "a": [
      "Ecclesiastes",
      "Eccl",
      "Ecc"
    ],
    "d": "Ecclesiastes (Ecclesiastes 3)",
    "e": "Ecclesiastes 3:1\u20138 contains the famous poem on the appointed times and sovereign seasons of life."
  },
  {
    "id": "gfc_book_12",
    "t": "book_id",
    "p": "In what poetic book is the repeated romantic refrain found: 'I adjure you, O daughters of Jerusalem... that you not stir up or awaken love until it pleases'?",
    "b": "SNG",
    "c": 2,
    "a": [
      "Song of Solomon",
      "Song of Songs",
      "Canticles",
      "Song"
    ],
    "d": "Song of Solomon (Song of Songs)",
    "e": "Song of Solomon 2:7, 3:5, 8:4 cautions against premature intimacy outside its covenant timing."
  },
  {
    "id": "gfc_book_13",
    "t": "book_id",
    "p": "In what wisdom book does the passage appear: 'Wisdom has built her house; she has hewn her seven pillars. She has slaughtered her beasts; she has mixed her wine...'?",
    "b": "PRO",
    "c": 9,
    "a": [
      "Proverbs",
      "Prov"
    ],
    "d": "Proverbs (Proverbs 9)",
    "e": "Proverbs 9:1\u20136 contrasts Lady Wisdom's banquet invitation with the destructive feast of Lady Folly."
  },
  {
    "id": "gfc_book_14",
    "t": "book_id",
    "p": "In what prophetic book is the prophet lowered with ropes into a muddy, dark cistern where he sank into the mire because of his preaching?",
    "b": "JER",
    "c": 38,
    "a": [
      "Jeremiah",
      "Jer"
    ],
    "d": "Jeremiah (Jeremiah 38)",
    "e": "Jeremiah 38:6: Jeremiah was cast into the cistern of Malchiah and later rescued by Ebed-melech the Ethiopian."
  },
  {
    "id": "gfc_book_15",
    "t": "book_id",
    "p": "In what book is the Great Commandment commanded: 'You shall love the Lord your God with all your heart and with all your soul and with all your might'?",
    "b": "DEU",
    "c": 6,
    "a": [
      "Deuteronomy",
      "Deut",
      "Deu"
    ],
    "d": "Deuteronomy (Deuteronomy 6:5)",
    "e": "Deuteronomy 6:4\u20135 is the centerpiece Shema, quoted by Jesus as the first and greatest commandment."
  },
  {
    "id": "gfc_book_16",
    "t": "book_id",
    "p": "In what Gospel does Jesus converse with a Samaritan woman at Jacob's well in Sychar, offering her 'living water'?",
    "b": "JHN",
    "c": 4,
    "a": [
      "John",
      "Jn",
      "Gospel of John"
    ],
    "d": "John (John 4)",
    "e": "John 4:1\u201342 records Jesus revealing Himself as the Messiah to the Samaritan woman."
  },
  {
    "id": "gfc_book_17",
    "t": "book_id",
    "p": "In what epistle does the universal verdict on human guilt appear: 'for all have sinned and fall short of the glory of God'?",
    "b": "ROM",
    "c": 3,
    "a": [
      "Romans",
      "Rom"
    ],
    "d": "Romans (Romans 3:23)",
    "e": "Romans 3:23 summarizes the universal need for justification by God's free grace in Jesus Christ."
  },
  {
    "id": "gfc_book_18",
    "t": "book_id",
    "p": "In what Gospel is the Parable of the Good Samaritan told by Jesus in response to the question 'And who is my neighbor?'?",
    "b": "LUK",
    "c": 10,
    "a": [
      "Luke",
      "Luk",
      "Gospel of Luke"
    ],
    "d": "Luke (Luke 10)",
    "e": "Luke 10:25\u201337 uniquely preserves Jesus' famous parable of the merciful Samaritan."
  },
  {
    "id": "gfc_book_19",
    "t": "book_id",
    "p": "In what pastoral letter does Paul instruct: 'Do not rebuke an older man but encourage him as you would a father, younger men as brothers, older women as mothers, younger women as sisters, in all purity'?",
    "b": "1TI",
    "c": 5,
    "a": [
      "1 Timothy",
      "1 Tim",
      "1Ti",
      "First Timothy"
    ],
    "d": "1 Timothy (1 Tim 5:1\u20132)",
    "e": "1 Timothy 5 gives pastoral guidelines for relationships within the household of God."
  },
  {
    "id": "gfc_book_20",
    "t": "book_id",
    "p": "In what historical book does God establish His unconditional Davidic Covenant: 'And your house and your kingdom shall be made sure forever before me. Your throne shall be established forever'?",
    "b": "2SA",
    "c": 7,
    "a": [
      "2 Samuel",
      "2 Sam",
      "2Sa",
      "Second Samuel"
    ],
    "d": "2 Samuel (2 Samuel 7)",
    "e": "2 Samuel 7:12\u201316 contains Nathan's prophecy of David's eternal royal dynasty, fulfilled in Christ."
  },
  {
    "id": "gfc_loc_1",
    "t": "book_chapter",
    "p": "In what book and chapter does God audibly speak the Ten Commandments to Israel from Mount Sinai?",
    "b": "EXO",
    "c": 20,
    "a": [
      "Exodus 20",
      "Exod 20",
      "Exo 20",
      "Ex 20"
    ],
    "e": "Exodus 20 records the initial proclamation of the Decalogue (repeated in Deuteronomy 5)."
  },
  {
    "id": "gfc_loc_2",
    "t": "book_chapter",
    "p": "In what book and chapter is the foundational Call of Abram: 'Go from your country and your kindred and your father's house to the land that I will show you. And I will make of you a great nation...'?",
    "b": "GEN",
    "c": 12,
    "a": [
      "Genesis 12",
      "Gen 12",
      "Ge 12"
    ],
    "e": "Genesis 12:1\u20133 initiates the Abrahamic Covenant of land, seed, and global blessing."
  },
  {
    "id": "gfc_loc_3",
    "t": "facts",
    "p": "Which three chapters in Matthew contain the complete Sermon on the Mount (Beatitudes, Lord's Prayer, Golden Rule)?",
    "b": "MAT",
    "c": 5,
    "a": [
      "Matthew 5-7",
      "Matthew 5, 6, 7",
      "Matt 5-7",
      "5-7",
      "Matthew 5 to 7",
      "5, 6, 7"
    ],
    "d": "Matthew 5\u20137",
    "e": "Matthew chapters 5, 6, and 7 comprise the inaugural discourse of Jesus on Kingdom ethics and discipleship."
  },
  {
    "id": "gfc_loc_4",
    "t": "book_chapter",
    "p": "In what book and chapter does the risen Christ issue the Great Commission: 'Go therefore and make disciples of all nations, baptizing them... and teaching them to observe all that I have commanded you'?",
    "b": "MAT",
    "c": 28,
    "a": [
      "Matthew 28",
      "Matt 28",
      "Mt 28"
    ],
    "e": "Matthew 28:18\u201320 concludes Matthew's Gospel with Christ's universal commission to His church."
  },
  {
    "id": "gfc_loc_5",
    "t": "book_chapter",
    "p": "In what book and chapter is the Holy Spirit poured out on the Day of Pentecost with a rushing wind and tongues as of fire?",
    "b": "ACT",
    "c": 2,
    "a": [
      "Acts 2",
      "Act 2"
    ],
    "e": "Acts 2:1\u20134 describes the birth of the New Testament church at Pentecost and Peter's sermon."
  },
  {
    "id": "gfc_loc_6",
    "t": "book_chapter",
    "p": "In what book and chapter does Paul contrast the Two Adams: 'For as by the one man's disobedience the many were made sinners, so by the one man's obedience the many will be made righteous'?",
    "b": "ROM",
    "c": 5,
    "a": [
      "Romans 5",
      "Rom 5",
      "Ro 5",
      "Romans 5:19"
    ],
    "e": "Romans 5:12\u201321 develops the profound theological parallel and contrast between Adam and Christ."
  },
  {
    "id": "gfc_loc_7",
    "t": "book_chapter",
    "p": "In what book and chapter does the famous 'Love Chapter' conclude: 'So now faith, hope, and love abide, these three; but the greatest of these is love'?",
    "b": "1CO",
    "c": 13,
    "a": [
      "1 Corinthians 13",
      "1 Cor 13",
      "1Co 13",
      "1 Corinthians 13:13"
    ],
    "e": "1 Corinthians 13 defines the character and eternal supremacy of Christian love (agape)."
  },
  {
    "id": "gfc_loc_8",
    "t": "book_chapter",
    "p": "In what book and chapter does Jesus tell Nicodemus: 'Truly, truly, I say to you, unless one is born again he cannot see the kingdom of God'?",
    "b": "JHN",
    "c": 3,
    "a": [
      "John 3",
      "Jn 3",
      "John 3:3"
    ],
    "e": "John 3:1\u201321 records Jesus' nighttime discourse on spiritual regeneration, including John 3:16."
  },
  {
    "id": "gfc_loc_9",
    "t": "book_chapter",
    "p": "In what book and chapter is the ancient serpent (Satan) bound and locked in the bottomless pit for a thousand years?",
    "b": "REV",
    "c": 20,
    "a": [
      "Revelation 20",
      "Rev 20",
      "Revelation 20:2"
    ],
    "e": "Revelation 20:1\u20133 describes the millennial binding of Satan followed by the Great White Throne Judgment."
  },
  {
    "id": "gfc_loc_10",
    "t": "book_chapter",
    "p": "In what book and chapter are Shadrach, Meshach, and Abednego thrown into the blazing fiery furnace and delivered unhurt alongside a fourth figure?",
    "b": "DAN",
    "c": 3,
    "a": [
      "Daniel 3",
      "Dan 3",
      "Da 3"
    ],
    "e": "Daniel 3 records the Hebrew youths refusing to bow to Nebuchadnezzar's golden idol and God protecting them in the flames."
  },
  {
    "id": "gfc_top_1",
    "t": "facts",
    "p": "What is the primary narrative event recorded in Genesis 3?",
    "b": "GEN",
    "c": 3,
    "a": [
      "The Fall",
      "The Fall of Man",
      "The Fall of Humanity",
      "Fall of Man",
      "Original Sin",
      "Temptation and Fall"
    ],
    "d": "The Fall of Man (Original Sin & First Gospel Promise)",
    "e": "Genesis 3 recounts the serpent's deception, the disobedience of Adam and Eve, the curse, and the Protoevangelium (Gen 3:15)."
  },
  {
    "id": "gfc_top_2",
    "t": "facts",
    "p": "What is the central prophetic theme of Isaiah 53?",
    "b": "ISA",
    "c": 53,
    "a": [
      "The Suffering Servant",
      "Suffering Servant",
      "Substitutionary Atonement",
      "Messiah suffering",
      "Christ suffering"
    ],
    "d": "The Suffering Servant (Substitutionary Atonement)",
    "e": "Isaiah 53 foretells the Messiah pierced for our transgressions and bearing our iniquities."
  },
  {
    "id": "gfc_top_3",
    "t": "facts",
    "p": "What is the central doctrinal theme of Romans 4?",
    "b": "ROM",
    "c": 4,
    "a": [
      "Justification by Faith",
      "Abraham's faith counted as righteousness",
      "Faith of Abraham",
      "Abraham justified by faith"
    ],
    "d": "Justification by Faith (Abraham's faith counted as righteousness)",
    "e": "Romans 4 uses Abraham to prove that righteousness is credited through faith apart from works of the Law."
  },
  {
    "id": "gfc_top_4",
    "t": "facts",
    "p": "What is the central subject of Psalm 119 (the longest chapter in the Bible)?",
    "b": "PSA",
    "c": 119,
    "a": [
      "The Word of God",
      "God's Word",
      "The Law of the Lord",
      "Worth of God's Word",
      "Scripture",
      "The Law"
    ],
    "d": "The Word of God (Law, Testimonies, Precepts, and Statutes)",
    "e": "Psalm 119 contains 176 verses meditating on the glory, wisdom, and sufficiency of God's Word."
  },
  {
    "id": "gfc_top_5",
    "t": "facts",
    "p": "What famous title is commonly given to Hebrews 11 due to its survey of Old Testament heroes from Abel to the prophets?",
    "b": "HEB",
    "c": 11,
    "a": [
      "Hall of Faith",
      "Faith Hall of Fame",
      "The Faith Chapter",
      "Heroes of Faith"
    ],
    "d": "The Hall of Faith (Faith's Hall of Fame)",
    "e": "Hebrews 11 defines faith and chronicles the persevering trust of Old Testament saints."
  },
  {
    "id": "gfc_top_6",
    "t": "facts",
    "p": "What major historical ecclesiastical gathering is convened in Acts 15 to settle Gentile circumcision and salvation?",
    "b": "ACT",
    "c": 15,
    "a": [
      "The Jerusalem Council",
      "Jerusalem Council",
      "Council of Jerusalem"
    ],
    "e": "Acts 15 affirmed that Gentiles are saved through the grace of the Lord Jesus Christ without needing circumcision."
  },
  {
    "id": "gfc_top_7",
    "t": "facts",
    "p": "What is the major event of John 17, where Jesus prays for Himself, His disciples, and all future believers?",
    "b": "JHN",
    "c": 17,
    "a": [
      "High Priestly Prayer",
      "Jesus's High Priestly Prayer",
      "The Farewell Prayer",
      "Priestly Prayer",
      "Jesus' prayer"
    ],
    "d": "Jesus' High Priestly Prayer",
    "e": "John 17 records Jesus praying for His disciples to be kept from the evil one and sanctified in the truth."
  },
  {
    "id": "gfc_top_8",
    "t": "facts",
    "p": "What grand climactic reality is revealed in Revelation 21 when the holy city descends out of heaven from God?",
    "b": "REV",
    "c": 21,
    "a": [
      "New Heaven and New Earth",
      "New Jerusalem",
      "The New Creation",
      "New Heaven and Earth"
    ],
    "d": "The New Heaven, New Earth, and New Jerusalem",
    "e": "Revelation 21 depicts God dwelling with humanity in the new creation where death and pain are no more."
  },
  {
    "id": "gfc_top_9",
    "t": "facts",
    "p": "What famous trilogy of parables does Jesus tell in Luke 15 to illustrate God's joy over repentant sinners?",
    "b": "LUK",
    "c": 15,
    "a": [
      "Parables of the Lost",
      "Lost Sheep, Lost Coin, Prodigal Son",
      "The Lost Sheep",
      "Prodigal Son",
      "Parables of Jesus"
    ],
    "d": "The Parables of the Lost Sheep, Lost Coin, and Prodigal Son",
    "e": "Luke 15 shows the seeking shepherd, the searching woman, and the running father celebrating the lost being found."
  },
  {
    "id": "gfc_top_10",
    "t": "facts",
    "p": "What miraculous revelation of God's presence and holy covenant name occurs in Exodus 3?",
    "b": "EXO",
    "c": 3,
    "a": [
      "The Burning Bush",
      "Burning Bush",
      "Call of Moses"
    ],
    "d": "The Burning Bush (God reveals His name 'I AM WHO I AM' to Moses)",
    "e": "Exodus 3 records God appearing to Moses in a bush that burned without being consumed."
  },
  {
    "id": "gfc_quote_1",
    "t": "facts",
    "p": "Who resolved: 'Go, gather all the Jews to be found in Susa, and hold a fast on my behalf... Then I will go to the king, though it is against the law, and if I perish, I perish'?",
    "b": "EST",
    "c": 4,
    "a": [
      "Esther",
      "Queen Esther",
      "Hadassah"
    ],
    "d": "Queen Esther",
    "e": "Esther 4:16: Esther's courageous commitment to risk her life to plead before King Ahasuerus for the Jewish people."
  },
  {
    "id": "gfc_quote_2",
    "t": "facts",
    "p": "Who asked Jesus the cynical question 'What is truth?' during His trial in the Praetorium?",
    "b": "JHN",
    "c": 18,
    "a": [
      "Pontius Pilate",
      "Pilate"
    ],
    "e": "John 18:38: The Roman governor's dismissive remark after Jesus declared He came to bear witness to the truth."
  },
  {
    "id": "gfc_quote_3",
    "t": "facts",
    "p": "Who laughed to herself in her tent, saying: 'After I am worn out, and my lord is old, shall I have pleasure?... Shall I indeed bear a child, now that I am old?'?",
    "b": "GEN",
    "c": 18,
    "a": [
      "Sarah",
      "Sarai"
    ],
    "e": "Genesis 18:12\u201314: Sarah reacted in disbelief before giving birth to Isaac as God promised."
  },
  {
    "id": "gfc_quote_4",
    "t": "facts",
    "p": "Who lamented: 'O Jerusalem, Jerusalem, the city that kills the prophets and stones those who are sent to it! How often would I have gathered your children together as a hen gathers her brood under her wings, and you were not willing!'?",
    "b": "MAT",
    "c": 23,
    "a": [
      "Jesus",
      "Jesus Christ",
      "Christ",
      "The Lord"
    ],
    "d": "Jesus Christ",
    "e": "Matthew 23:37 & Luke 13:34: Jesus weeping over the spiritual blindness of Jerusalem."
  },
  {
    "id": "gfc_quote_5",
    "t": "facts",
    "p": "Who requested of Jesus: 'Say that these two sons of mine are to sit, one at your right hand and one at your left, in your kingdom'?",
    "b": "MAT",
    "c": 20,
    "a": [
      "The mother of James and John",
      "Mother of James and John",
      "Mother of Zebedee's sons",
      "Salome",
      "Zebedee's wife"
    ],
    "d": "The mother of James and John (Zebedee's sons / Salome)",
    "e": "Matthew 20:20\u201321: Prompting Jesus to teach that greatness in the Kingdom is found in serving others."
  },
  {
    "id": "gfc_quote_6",
    "t": "facts",
    "p": "Who asked his father on the way up Mount Moriah: 'Behold, the fire and the wood, but where is the lamb for a burnt offering?'?",
    "b": "GEN",
    "c": 22,
    "a": [
      "Isaac"
    ],
    "e": "Genesis 22:7: Abraham answered: 'God will provide for himself the lamb for a burnt offering, my son.'"
  },
  {
    "id": "gfc_quote_7",
    "t": "facts",
    "p": "Who said of Jesus: 'He must increase, but I must decrease'?",
    "b": "JHN",
    "c": 3,
    "a": [
      "John the Baptist",
      "John Baptist",
      "John the Immerser"
    ],
    "e": "John 3:30: John the Baptist declaring that his joy was fulfilled in exalting the Messiah."
  },
  {
    "id": "gfc_quote_8",
    "t": "facts",
    "p": "Who taunted young David in the Valley of Elah: 'Am I a dog, that you come to me with sticks?' and cursed David by his gods?",
    "b": "1SA",
    "c": 17,
    "a": [
      "Goliath",
      "Goliath of Gath",
      "The Philistine"
    ],
    "d": "Goliath of Gath",
    "e": "1 Samuel 17:43: Goliath's arrogant boast before David struck him with a sling and a stone."
  },
  {
    "id": "gfc_quote_9",
    "t": "facts",
    "p": "Who declared in the midst of agonizing suffering: 'For I know that my Redeemer lives, and at the last he will stand upon the earth. And after my skin has been thus destroyed, yet in my flesh I shall see God'?",
    "b": "JOB",
    "c": 19,
    "a": [
      "Job"
    ],
    "e": "Job 19:25\u201326: Job's profound declaration of confidence in his living Redeemer and bodily resurrection."
  },
  {
    "id": "gfc_quote_10",
    "t": "facts",
    "p": "Who prayed to God at Gibeon: 'Give your servant therefore an understanding mind to govern your people, that I may discern between good and evil, for who is able to govern this your great people?'?",
    "b": "1KI",
    "c": 3,
    "a": [
      "Solomon",
      "King Solomon"
    ],
    "e": "1 Kings 3:9: Solomon's humble request for wisdom which pleased the Lord."
  },
  {
    "id": "gfc_err_1",
    "t": "book_id",
    "p": "To which New Testament book would you turn to correct the error: 'As long as you believe the right things, it doesn\u2019t matter how you live your life'?",
    "b": "JAS",
    "c": 2,
    "a": [
      "James",
      "Jas",
      "Epistle of James"
    ],
    "e": "James 2:17, 26 teaches that faith without works is dead."
  },
  {
    "id": "gfc_err_2",
    "t": "book_id",
    "p": "To which epistle would you turn to correct the error: 'I\u2019m sure I don\u2019t have any spiritual gifts; only special people do'?",
    "b": "1CO",
    "c": 12,
    "a": [
      "1 Corinthians",
      "1 Cor",
      "1Co",
      "First Corinthians"
    ],
    "d": "1 Corinthians (1 Corinthians 12)",
    "e": "1 Corinthians 12:7 explains: 'To each is given the manifestation of the Spirit for the common good.'"
  },
  {
    "id": "gfc_err_3",
    "t": "book_id",
    "p": "To which epistle would you turn to correct the legalistic error: 'We are saved by Jesus, but we also have to do our part by keeping the Old Testament ceremonial law'?",
    "b": "GAL",
    "c": 2,
    "a": [
      "Galatians",
      "Gal"
    ],
    "e": "Galatians 2:16 forcefully argues that justification is through faith in Christ alone, not by works of the law."
  },
  {
    "id": "gfc_err_4",
    "t": "book_id",
    "p": "To which Old Testament book would you turn to correct the retribution error: 'If you are sick or suffering, you must have secret sin; good people don\u2019t suffer'?",
    "b": "JOB",
    "c": 1,
    "a": [
      "Job"
    ],
    "e": "Job refutes the simplistic theology that suffering is always a direct result of personal sin."
  },
  {
    "id": "gfc_err_5",
    "t": "book_id",
    "p": "To which prophetic book would you turn to correct the error: 'God only cares about religious rituals; He doesn\u2019t care about the poor, vulnerable, and oppressed'?",
    "b": "AMO",
    "c": 5,
    "a": [
      "Amos",
      "Amo"
    ],
    "e": "Amos 5:24 declares: 'Let justice roll down like waters, and righteousness like an ever-flowing stream!'"
  },
  {
    "id": "gfc_err_6",
    "t": "book_id",
    "p": "To which book would you turn to correct the doubt: 'I know God promises to bless, but we cannot trust Him through hard trials like barrenness, betrayal, famine, and unjust imprisonment'?",
    "b": "GEN",
    "c": 50,
    "a": [
      "Genesis",
      "Gen"
    ],
    "e": "Genesis showcases God's unbreakable providence through Abraham, Sarah, Isaac, Jacob, and Joseph ('God meant it for good', Gen 50:20)."
  },
  {
    "id": "gfc_err_7",
    "t": "book_id",
    "p": "To which book would you turn to correct the nihilistic error: 'In the end it won\u2019t make any difference whom we followed or what we did; everybody gets treated the exact same when history ends'?",
    "b": "REV",
    "c": 20,
    "a": [
      "Revelation",
      "Rev",
      "Apocalypse"
    ],
    "e": "Revelation 20\u201322 reveals final cosmic judgment, eternal life for the redeemed, and eternal separation for the wicked."
  },
  {
    "id": "gfc_err_8",
    "t": "book_id",
    "p": "To which Gospel would you turn to correct the pluralistic error: 'There\u2019s nothing unique about Jesus; He\u2019s just one path among many, like any other prophet or good moral teacher'?",
    "b": "JHN",
    "c": 14,
    "a": [
      "John",
      "Jn",
      "Gospel of John"
    ],
    "e": "John 1:1\u201314 and John 14:6 present Christ as the eternal Word made flesh: 'I am the way, and the truth, and the life. No one comes to the Father except through me.'"
  },
  {
    "id": "gfc_err_9",
    "t": "book_id",
    "p": "To which pastoral letter would you turn to correct worldly church leadership criteria: 'Pick elders based on corporate business wealth, degrees, popularity, and charismatic good looks'?",
    "b": "1TI",
    "c": 3,
    "a": [
      "1 Timothy",
      "1 Tim",
      "1Ti",
      "First Timothy"
    ],
    "d": "1 Timothy (1 Timothy 3)",
    "e": "1 Timothy 3:1\u20137 sets forth the indispensable spiritual, moral, and character qualifications for overseers/elders."
  },
  {
    "id": "gfc_err_10",
    "t": "book_id",
    "p": "To which book would you turn to correct the ascetic error: 'The Bible doesn\u2019t say anything good about romantic love and marital intimacy; that\u2019s too physical for God to care about'?",
    "b": "SNG",
    "c": 1,
    "a": [
      "Song of Solomon",
      "Song of Songs",
      "Canticles",
      "Song"
    ],
    "d": "Song of Solomon (Song of Songs)",
    "e": "Song of Solomon celebrates the purity, passion, beauty, and emotional delight of marital love as God's good design."
  },
  {
    "id": "gfc_chr_1",
    "t": "facts",
    "p": "Chronologically, which of these events occurred first: God's covenant promise to Abraham, the era of the Judges, Saul being anointed king, or Pentecost?",
    "b": "GEN",
    "c": 12,
    "a": [
      "God's promise to Abraham",
      "Promise to Abraham",
      "Abraham",
      "Abram",
      "God's covenant to Abraham"
    ],
    "d": "God's promise to Abraham (Genesis 12 c. 2090 BC)",
    "e": "Abraham (~2000 BC) preceded the Judges (~1375\u20131050 BC), Saul (~1050 BC), and Pentecost (AD 33).",
    "s": "ALL",
    "g": "Historical"
  },
  {
    "id": "gfc_chr_2",
    "t": "facts",
    "p": "Chronologically, which of these events occurred first: Peter denying Jesus, Jesus being crucified, Timothy being circumcised, or Paul being shipwrecked?",
    "b": "MAT",
    "c": 26,
    "a": [
      "Peter denying Jesus",
      "Peter's denial",
      "Peter denies Jesus",
      "Peter denial"
    ],
    "d": "Peter denies Jesus (Gospels c. AD 30)",
    "e": "Peter's denial occurred early Friday morning before Jesus' crucifixion later that day, followed years later by Timothy's circumcision (Acts 16) and Paul's shipwreck (Acts 27)."
  },
  {
    "id": "gfc_chr_3",
    "t": "facts",
    "p": "Chronologically, which of these events occurred first: the Fall of man in Eden, Noah's Great Flood, the Nativity of Christ, or the descent of the New Jerusalem?",
    "b": "GEN",
    "c": 3,
    "a": [
      "The Fall of man",
      "The Fall",
      "Fall of man",
      "Fall"
    ],
    "d": "The Fall of man (Genesis 3)",
    "e": "The Fall (Gen 3) preceded the Flood (Gen 6\u20139), the Nativity (Matt 1), and the New Jerusalem (Rev 21).",
    "s": "ALL"
  },
  {
    "id": "gfc_chr_4",
    "t": "facts",
    "p": "Chronologically, which of these events occurred first: Israel crossing the Red Sea, David being anointed king, Naaman cleansed of leprosy, or Jesus washing the disciples' feet?",
    "b": "EXO",
    "c": 14,
    "a": [
      "Crossing the Red Sea",
      "Israel crossing the Red Sea",
      "Red Sea",
      "The crossing of the Red Sea"
    ],
    "d": "Crossing the Red Sea (Exodus 14 c. 1446 BC)",
    "e": "The Red Sea crossing (~1446 BC) preceded David (~1000 BC), Naaman (~850 BC), and Jesus washing the disciples' feet (AD 33).",
    "s": "ALL"
  },
  {
    "id": "gfc_chr_5",
    "t": "facts",
    "p": "Chronologically, which of these events occurred first: two disciples meeting Jesus on the road to Emmaus, the Holy Spirit poured out at Pentecost, Stephen being stoned, or Apollos instructed by Priscilla and Aquila?",
    "b": "LUK",
    "c": 24,
    "a": [
      "Two disciples on the road to Emmaus",
      "Road to Emmaus",
      "Emmaus",
      "Disciples on the road to Emmaus"
    ],
    "d": "Two disciples meet Jesus on the road to Emmaus (Luke 24, Resurrection Sunday)",
    "e": "Emmaus occurred on Resurrection Sunday (Luke 24), prior to Pentecost 50 days later (Acts 2), Stephen's martyrdom (Acts 7), and Apollos at Ephesus (Acts 18)."
  },
  {
    "id": "gfc_chr_6",
    "t": "facts",
    "p": "Chronologically, which of these events occurred first: Hannah praying for a son before Eli, Rehoboam splitting the kingdom, the Babylonian Exile, or Nehemiah rebuilding Jerusalem's walls?",
    "b": "1SA",
    "c": 1,
    "a": [
      "Hannah praying for a son",
      "Hannah praying",
      "Hannah's prayer",
      "Hannah"
    ],
    "d": "Hannah praying for a son before Eli (1 Samuel 1 c. 1100 BC)",
    "e": "Hannah praying (~1100 BC) preceded the divided kingdom (~930 BC), the Babylonian Exile (586 BC), and Nehemiah (445 BC)."
  },
  {
    "id": "gfc_chr_7",
    "t": "facts",
    "p": "Chronologically, which divine calling occurred first: God calling Abram out of Ur, God calling Moses at the burning bush, God calling Gideon, or God calling Ananias to lay hands on Saul?",
    "b": "GEN",
    "c": 12,
    "a": [
      "God calling Abram out of Ur",
      "God calling Abram",
      "Abram out of Ur",
      "Abram",
      "Abraham"
    ],
    "d": "God calling Abram out of Ur (Genesis 12 c. 2090 BC)",
    "e": "Abram (~2000 BC) was called before Moses (~1446 BC), Gideon (~1160 BC), and Ananias in Damascus (AD 34).",
    "s": "ALL"
  },
  {
    "id": "gfc_chr_8",
    "t": "facts",
    "p": "Chronologically, which of these events occurred first: Sarah laughing at the promise of a son, Joseph being sold into slavery, the Ten Plagues on Egypt, or Malachi prophesying?",
    "b": "GEN",
    "c": 18,
    "a": [
      "Sarah laughing at the promise of a son",
      "Sarah laughing",
      "Sarah laughs"
    ],
    "d": "Sarah laughs at the promise of a son (Genesis 18 c. 2067 BC)",
    "e": "Sarah laughing (~2067 BC) occurred before Joseph was sold (~1898 BC), the Ten Plagues (~1446 BC), and Malachi (~430 BC)."
  },
  {
    "id": "gfc_chr_9",
    "t": "facts",
    "p": "Chronologically, which of these events occurred first: Herod the Great inquiring where Christ was to be born, Herod Antipas beheading John the Baptist, Herod Agrippa I struck by an angel, or King Agrippa II hearing Paul?",
    "b": "MAT",
    "c": 2,
    "a": [
      "Herod the Great inquiring where Christ was to be born",
      "Herod the Great",
      "Herod inquiring where Christ was to be born"
    ],
    "d": "Herod the Great inquires where the Christ is to be born (Matthew 2 c. 5-4 BC)",
    "e": "Herod the Great (~4 BC, Matt 2) preceded Herod Antipas executing John (~AD 29, Matt 14), Herod Agrippa I struck down (AD 44, Acts 12), and King Agrippa II hearing Paul (AD 59, Acts 26)."
  },
  {
    "id": "gfc_chr_10",
    "t": "facts",
    "p": "Chronologically, which of these events occurred first: Daniel praying despite King Darius's decree, Jesus being baptized, Levi leaving his tax booth, or Barnabas finding Saul in Tarsus?",
    "b": "DAN",
    "c": 6,
    "a": [
      "Daniel praying despite Darius's decree",
      "Daniel praying",
      "Daniel in the lions' den",
      "Daniel"
    ],
    "d": "Daniel prays despite King Darius's decree (Daniel 6 c. 539 BC)",
    "e": "Daniel (~539 BC) preceded Jesus' baptism (~AD 26), Matthew/Levi's calling (~AD 27), and Barnabas seeking Saul (~AD 43).",
    "s": "ALL"
  },
  {
    "id": "gfc_mes_1",
    "t": "book_id",
    "p": "In which Old Testament book was it prophesied that the Messiah would be born in Bethlehem Ephrathah?",
    "b": "MIC",
    "c": 5,
    "a": [
      "Micah",
      "Mic"
    ],
    "d": "Micah (Micah 5:2)",
    "e": "Micah 5:2 foretold that out of little Bethlehem Ephrathah would come the ruler whose origin is from of old, from ancient days."
  },
  {
    "id": "gfc_mes_2",
    "t": "book_id",
    "p": "In which book does the Protoevangelium promise that the seed of the woman will crush the head of the serpent?",
    "b": "GEN",
    "c": 3,
    "a": [
      "Genesis",
      "Gen"
    ],
    "d": "Genesis (Genesis 3:15)",
    "e": "Genesis 3:15 is the earliest Gospel promise of Christ's victory over Satan."
  },
  {
    "id": "gfc_mes_3",
    "t": "book_id",
    "p": "In which prophetic book was it foretold: 'Rejoice greatly, O daughter of Zion!... Behold, your king is coming to you; righteous and having salvation is he, humble and mounted on a donkey, on a colt, the foal of a donkey'?",
    "b": "ZEC",
    "c": 9,
    "a": [
      "Zechariah",
      "Zec"
    ],
    "d": "Zechariah (Zechariah 9:9)",
    "e": "Zechariah 9:9 was fulfilled during Jesus' triumphal entry into Jerusalem on Palm Sunday (Matthew 21:5)."
  },
  {
    "id": "gfc_mes_4",
    "t": "book_id",
    "p": "In which book is the virgin birth prophesied: 'Behold, the virgin shall conceive and bear a son, and shall call his name Immanuel'?",
    "b": "ISA",
    "c": 7,
    "a": [
      "Isaiah",
      "Isa"
    ],
    "d": "Isaiah (Isaiah 7:14)",
    "e": "Isaiah 7:14 is quoted in Matthew 1:22\u201323 as fulfilled in the conception and virgin birth of Jesus."
  },
  {
    "id": "gfc_mes_5",
    "t": "book_id",
    "p": "In which book does the Messiah proclaim: 'The Spirit of the Lord God is upon me, because the Lord has anointed me to bring good news to the poor; he has sent me to bind up the brokenhearted, to proclaim liberty to the captives...'?",
    "b": "ISA",
    "c": 61,
    "a": [
      "Isaiah",
      "Isa"
    ],
    "d": "Isaiah (Isaiah 61:1\u20132)",
    "e": "Isaiah 61:1\u20132 was read by Jesus in the Nazareth synagogue in Luke 4:18\u201319: 'Today this Scripture has been fulfilled in your hearing.'"
  },
  {
    "id": "gfc_mes_6",
    "t": "book_id",
    "p": "In which book is the Messiah declared to be a royal priest forever: 'The Lord has sworn and will not change his mind, \"You are a priest forever after the order of Melchizedek\"'?",
    "b": "PSA",
    "c": 110,
    "a": [
      "Psalms",
      "Psalm",
      "Psalm 110",
      "Psalms 110",
      "Ps 110"
    ],
    "d": "Psalms (Psalm 110:4)",
    "e": "Psalm 110:4 is expounded in Hebrews 5\u20137 as the basis for Christ's eternal, Melchizedekian priesthood."
  },
  {
    "id": "gfc_mes_7",
    "t": "book_id",
    "p": "In which book does the prophetic declaration appear: 'The stone that the builders rejected has become the cornerstone'?",
    "b": "PSA",
    "c": 118,
    "a": [
      "Psalms",
      "Psalm",
      "Psalm 118",
      "Psalms 118",
      "Ps 118"
    ],
    "d": "Psalms (Psalm 118:22)",
    "e": "Psalm 118:22 was cited by Jesus (Matthew 21:42) and Peter (1 Peter 2:7, Acts 4:11) regarding Christ's rejection and supreme exaltation."
  },
  {
    "id": "gfc_mes_8",
    "t": "book_id",
    "p": "In which book was it foretold regarding the Messiah's crucifixion: 'they divide my garments among them, and for my clothing they cast lots'?",
    "b": "PSA",
    "c": 22,
    "a": [
      "Psalms",
      "Psalm",
      "Psalm 22",
      "Psalms 22",
      "Ps 22"
    ],
    "d": "Psalms (Psalm 22:18)",
    "e": "Psalm 22:18 was literally fulfilled at the foot of the cross by the Roman soldiers in John 19:24."
  },
  {
    "id": "gfc_mes_9",
    "t": "book_id",
    "p": "In which book was it prophesied regarding the Messiah's burial: 'And they made his grave with the wicked and with a rich man in his death, although he had done no violence...'?",
    "b": "ISA",
    "c": 53,
    "a": [
      "Isaiah",
      "Isa"
    ],
    "d": "Isaiah (Isaiah 53:9)",
    "e": "Isaiah 53:9 was fulfilled when Joseph of Arimathea, a wealthy council member, buried Jesus in his own new tomb (Matthew 27:57\u201360)."
  },
  {
    "id": "gfc_mes_10",
    "t": "book_id",
    "p": "In which prophetic book was it foretold: 'Behold, I will send you Elijah the prophet before the great and awesome day of the Lord comes'?",
    "b": "MAL",
    "c": 4,
    "a": [
      "Malachi",
      "Mal"
    ],
    "d": "Malachi (Malachi 4:5)",
    "e": "Malachi 4:5 was the final Old Testament prophecy, fulfilled in John the Baptist coming in the spirit and power of Elijah (Matthew 11:14, Luke 1:17)."
  }
];

export function hydrateQuestion(raw) {
  const book = raw.b ? getBookById(raw.b) : null;
  return {
    id: raw.id,
    type: raw.t,
    prompt: raw.p,
    bookId: raw.b || null,
    chapterNum: raw.c !== undefined ? raw.c : null,
    acceptedAnswers: raw.a || [],
    displayAnswer: raw.d || (raw.a && raw.a.length > 0 ? raw.a[0] : ""),
    explanation: raw.e || "",
    scope: raw.s || (book ? book.testament : "OT"),
    genre: raw.g || (book ? book.category : "General")
  };
}

export const CURATED_QUESTION_BANK = RAW_QUESTIONS.map(hydrateQuestion);

export const GFC_TEST_100_BANK = CURATED_QUESTION_BANK.filter(q => q.id.startsWith("gfc_"));
