import { getBookById } from "./bible_catalog.js";

// --------------------------------------------------------------------------
// COMPACT QUESTION BANK REPOSITORY
// Auto-hydrated at load time for minimal bundle footprint and fast evaluation
// Contains all 300 BMPI Assessment Questions + 100 GFC Exam Questions + Diagnostic Pools
// --------------------------------------------------------------------------

export const RAW_QUESTIONS = [
  {
    "id": "bmpi_1",
    "t": "book_chapter",
    "p": "In what book & chapter does the opening declaration of Scripture appear: 'In the beginning God created the heavens and the earth'?",
    "b": "GEN",
    "c": 1,
    "a": [
      "Genesis 1",
      "Gen 1",
      "Genesis 1:1",
      "Gen 1:1"
    ],
    "d": "Genesis 1 (Genesis 1:1)",
    "e": "Genesis 1:1 begins the biblical canon with cosmic creation."
  },
  {
    "id": "bmpi_2",
    "t": "book_id",
    "p": "In what book does the bride describe her beloved: 'My beloved is radiant and ruddy, distinguished among ten thousand'?",
    "b": "SNG",
    "c": 5,
    "a": [
      "Song of Songs",
      "Song of Solomon",
      "Canticles",
      "Song"
    ],
    "d": "Song of Songs (Song 5:10)",
    "e": "Song of Songs 5:10 contains the poetic celebration of marital love."
  },
  {
    "id": "bmpi_3",
    "t": "facts",
    "p": "Which prophet lamented over his unheeding people: 'The harvest is past, the summer is ended, and we are not saved'?",
    "b": "JER",
    "c": 8,
    "a": [
      "Jeremiah",
      "Jer"
    ],
    "d": "Jeremiah (Jeremiah 8:20)",
    "e": "Jeremiah 8:20 is the sorrowful lament of the weeping prophet over Judah's spiritual blindness."
  },
  {
    "id": "bmpi_4",
    "t": "facts",
    "p": "To which imprisoned prophet did God give the promise: 'Call to me and I will answer you, and will tell you great and hidden things that you have not known'?",
    "b": "JER",
    "c": 33,
    "a": [
      "Jeremiah",
      "Jer"
    ],
    "d": "Jeremiah (Jeremiah 33:3)",
    "e": "Jeremiah 33:3 was given while Jeremiah was shut up in the court of the guard."
  },
  {
    "id": "bmpi_5",
    "t": "book_chapter",
    "p": "In what book & chapter does the foundational creation ordinance appear: 'Therefore a man shall leave his father and his mother and hold fast to his wife, and they shall become one flesh'?",
    "b": "GEN",
    "c": 2,
    "a": [
      "Genesis 2",
      "Gen 2",
      "Genesis 2:24",
      "Gen 2:24"
    ],
    "d": "Genesis 2 (Genesis 2:24)",
    "e": "Genesis 2:24 establishes the divine pattern for marriage."
  },
  {
    "id": "bmpi_6",
    "t": "facts",
    "p": "Which prophet wrote the victorious testimony amidst national ruin: 'The steadfast love of the Lord never ceases; his mercies never come to an end; they are new every morning; great is your faithfulness'?",
    "b": "LAM",
    "c": 3,
    "a": [
      "Jeremiah",
      "Jer"
    ],
    "d": "Jeremiah (Lamentations 3:22\u201323)",
    "e": "Jeremiah penned Lamentations 3:22\u201323 following the destruction of Jerusalem."
  },
  {
    "id": "bmpi_7",
    "t": "facts",
    "p": "To which perplexed prophet did God declare: 'Look among the nations, and see; wonder and be astounded. For I am doing a work in your days that you would not believe if told'?",
    "b": "HAB",
    "c": 1,
    "a": [
      "Habakkuk",
      "Hab"
    ],
    "d": "Habakkuk (Habakkuk 1:5)",
    "e": "Habakkuk 1:5 announced God raising up the Chaldeans."
  },
  {
    "id": "bmpi_8",
    "t": "book_id",
    "p": "In what prophetic book does the promise appear: 'For the earth will be filled with the knowledge of the glory of the Lord as the waters cover the sea'?",
    "b": "HAB",
    "c": 2,
    "a": [
      "Habakkuk",
      "Hab"
    ],
    "d": "Habakkuk (Habakkuk 2:14)",
    "e": "Habakkuk 2:14 foretells the universal triumph of God's glory."
  },
  {
    "id": "bmpi_9",
    "t": "book_id",
    "p": "In what epistle does Paul urge a brother: 'receive him no longer as a bondservant but more than a bondservant, as a beloved brother... If you consider me your partner, receive him as you would receive me'?",
    "b": "PHM",
    "c": 1,
    "a": [
      "Philemon",
      "Phm"
    ],
    "d": "Philemon (Philemon 1:16\u201317)",
    "e": "Paul wrote Philemon to reconcile Philemon and the runaway slave Onesimus."
  },
  {
    "id": "bmpi_10",
    "t": "book_id",
    "p": "In what book does the first Gospel prophecy appear: 'I will put enmity between you and the woman, and between your offspring and her offspring; he shall bruise your head, and you shall bruise his heel'?",
    "b": "GEN",
    "c": 3,
    "a": [
      "Genesis",
      "Gen"
    ],
    "d": "Genesis (Genesis 3:15)",
    "e": "Genesis 3:15 is the Protoevangelium foretelling Christ's victory over Satan."
  },
  {
    "id": "bmpi_11",
    "t": "book_id",
    "p": "In what book does the prophet rejoice: 'Though the fig tree should not blossom, nor fruit be on the vines... yet I will rejoice in the Lord; I will take joy in the God of my salvation'?",
    "b": "HAB",
    "c": 3,
    "a": [
      "Habakkuk",
      "Hab"
    ],
    "d": "Habakkuk (Habakkuk 3:17\u201318)",
    "e": "Habakkuk 3:17\u201319 is one of Scripture's greatest confessions of triumphant faith."
  },
  {
    "id": "bmpi_12",
    "t": "book_id",
    "p": "In what prophetic book does God encourage Zerubbabel: 'Not by might, nor by power, but by my Spirit, says the Lord of hosts'?",
    "b": "ZEC",
    "c": 4,
    "a": [
      "Zechariah",
      "Zec"
    ],
    "d": "Zechariah (Zechariah 4:6)",
    "e": "Zechariah 4:6 encouraged the post-exilic rebuilding of the temple."
  },
  {
    "id": "bmpi_13",
    "t": "book_id",
    "p": "Which New Testament book opens with: 'In the first book, O Theophilus, I have dealt with all that Jesus began to do and teach, until the day when he was taken up'?",
    "b": "ACT",
    "c": 1,
    "a": [
      "Acts",
      "Acts of the Apostles",
      "Act"
    ],
    "d": "Acts (Acts 1:1\u20132)",
    "e": "Acts 1:1 opens Luke's second volume addressed to Theophilus."
  },
  {
    "id": "bmpi_14",
    "t": "book_id",
    "p": "In what epistle does the command appear: 'do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God. And the peace of God... will guard your hearts'?",
    "b": "PHP",
    "c": 4,
    "a": [
      "Philippians",
      "Phil",
      "Php"
    ],
    "d": "Philippians (Philippians 4:6\u20137)",
    "e": "Philippians 4:6\u20137 provides God's prescription for overcoming anxiety."
  },
  {
    "id": "bmpi_15",
    "t": "book_id",
    "p": "In what epistle does the closing exhortation appear: 'But grow in the grace and knowledge of our Lord and Savior Jesus Christ. To him be the glory both now and to the day of eternity'?",
    "b": "2PE",
    "c": 3,
    "a": [
      "2 Peter",
      "2 Pet",
      "Second Peter"
    ],
    "d": "2 Peter (2 Peter 3:18)",
    "e": "2 Peter 3:18 concludes Peter's final epistle."
  },
  {
    "id": "bmpi_16",
    "t": "book_id",
    "p": "In what epistle does the command appear: 'Finally, be strong in the Lord and in the strength of his might. Put on the whole armor of God, that you may be able to stand against the schemes of the devil'?",
    "b": "EPH",
    "c": 6,
    "a": [
      "Ephesians",
      "Eph"
    ],
    "d": "Ephesians (Ephesians 6:10\u201311)",
    "e": "Ephesians 6:10\u201318 describes spiritual warfare and the armor of God."
  },
  {
    "id": "bmpi_17",
    "t": "book_id",
    "p": "In what epistle does the author ask: 'What good is it, my brothers, if someone says he has faith but does not have works? Can that faith save him?'",
    "b": "JAS",
    "c": 2,
    "a": [
      "James",
      "Jas"
    ],
    "d": "James (James 2:14)",
    "e": "James 2:14\u201326 demonstrates that genuine saving faith always produces righteous works."
  },
  {
    "id": "bmpi_18",
    "t": "book_id",
    "p": "In what epistle is a young minister charged: 'Do your best to present yourself to God as one approved, a worker who has no need to be ashamed, rightly handling the word of truth'?",
    "b": "2TI",
    "c": 2,
    "a": [
      "2 Timothy",
      "2 Tim",
      "Second Timothy"
    ],
    "d": "2 Timothy (2 Timothy 2:15)",
    "e": "2 Timothy 2:15 instructs Timothy on diligent pastoral ministry."
  },
  {
    "id": "bmpi_19",
    "t": "book_id",
    "p": "In what book does the promise appear: 'He who goes out weeping, bearing the seed for sowing, shall come home with shouts of joy, bringing his sheaves with him'?",
    "b": "PSA",
    "c": 126,
    "a": [
      "Psalms",
      "Psalm",
      "Psalm 126",
      "Psalms 126",
      "Ps 126"
    ],
    "d": "Psalms (Psalm 126:6)",
    "e": "Psalm 126:6 is a song of ascents celebrating restoration from captivity."
  },
  {
    "id": "bmpi_20",
    "t": "book_chapter",
    "p": "In what book & chapter does God call Abram: 'Go from your country and your kindred and your father's house to the land that I will show you. And I will make of you a great nation...'?",
    "b": "GEN",
    "c": 12,
    "a": [
      "Genesis 12",
      "Gen 12",
      "Genesis 12:1-3"
    ],
    "d": "Genesis 12 (Genesis 12:1\u20133)",
    "e": "Genesis 12:1\u20133 is the foundational Abrahamic Covenant."
  },
  {
    "id": "bmpi_21",
    "t": "book_id",
    "p": "In what book does Moses strike the rock twice at Meribah in anger rather than speaking to it as God commanded, resulting in his exclusion from entering Canaan?",
    "b": "NUM",
    "c": 20,
    "a": [
      "Numbers",
      "Num"
    ],
    "d": "Numbers (Numbers 20:8\u201312)",
    "e": "Numbers 20 records Moses striking the rock at Meribah."
  },
  {
    "id": "bmpi_22",
    "t": "facts",
    "p": "Which leader delivered the farewell charge: 'Be strong and courageous. Do not fear or be in dread of them, for it is the Lord your God who goes with you. He will not leave you or forsake you'?",
    "b": "DEU",
    "c": 31,
    "a": [
      "Moses"
    ],
    "d": "Moses (Deuteronomy 31:6)",
    "e": "Deuteronomy 31:6 is Moses' charge to Israel and Joshua before his death."
  },
  {
    "id": "bmpi_23",
    "t": "book_id",
    "p": "In what book does a devoted daughter-in-law declare: 'Do not urge me to leave you or to return from following you. For where you go I will go, and where you lodge I will lodge. Your people shall be my people, and your God my God'?",
    "b": "RUT",
    "c": 1,
    "a": [
      "Ruth",
      "Rut"
    ],
    "d": "Ruth (Ruth 1:16)",
    "e": "Ruth 1:16 is Ruth's covenant pledge of loyalty to Naomi and Yahweh."
  },
  {
    "id": "bmpi_24",
    "t": "facts",
    "p": "Who accepted Mordecai's challenge: 'And who knows whether you have not come to the kingdom for such a time as this?' and risked her life before the king?",
    "b": "EST",
    "c": 4,
    "a": [
      "Esther",
      "Queen Esther",
      "Hadassah"
    ],
    "d": "Esther (Esther 4:14\u201316)",
    "e": "Esther 4:14\u201316 records Queen Esther interceding for her people in Persia."
  },
  {
    "id": "bmpi_25",
    "t": "book_id",
    "p": "In what epistle does the triumph over death climax with: 'Death is swallowed up in victory... But thanks be to God, who gives us the victory through our Lord Jesus Christ'?",
    "b": "1CO",
    "c": 15,
    "a": [
      "1 Corinthians",
      "1 Cor",
      "First Corinthians"
    ],
    "d": "1 Corinthians (1 Corinthians 15:54\u201357)",
    "e": "1 Corinthians 15:54\u201357 celebrates Christ's victory over the grave."
  },
  {
    "id": "bmpi_26",
    "t": "book_id",
    "p": "In what epistle does the encouragement appear: 'And let us not grow weary of doing good, for in due season we will reap, if we do not give up'?",
    "b": "GAL",
    "c": 6,
    "a": [
      "Galatians",
      "Gal"
    ],
    "d": "Galatians (Galatians 6:9)",
    "e": "Galatians 6:9 encourages steadfast perseverance in ministry."
  },
  {
    "id": "bmpi_27",
    "t": "book_id",
    "p": "In what prophetic book does the repeated judgment formula appear: 'For three transgressions of Judah, and for four, I will not revoke the punishment...'?",
    "b": "AMO",
    "c": 2,
    "a": [
      "Amos",
      "Amo"
    ],
    "d": "Amos (Amos 2:4)",
    "e": "Amos 1\u20132 pronounces divine judgment on the nations and Israel."
  },
  {
    "id": "bmpi_28",
    "t": "book_id",
    "p": "In what epistle does Paul open with praise: 'Blessed be the God and Father of our Lord Jesus Christ, who has blessed us in Christ with every spiritual blessing in the heavenly places'?",
    "b": "EPH",
    "c": 1,
    "a": [
      "Ephesians",
      "Eph"
    ],
    "d": "Ephesians (Ephesians 1:3)",
    "e": "Ephesians 1:3\u201314 is a doxology of sovereign election, redemption, and sealing."
  },
  {
    "id": "bmpi_29",
    "t": "book_id",
    "p": "In what book do the rhetorical questions on God's omnipresence appear: 'Where shall I go from your Spirit? Or where shall I flee from your presence?'",
    "b": "PSA",
    "c": 139,
    "a": [
      "Psalms",
      "Psalm",
      "Psalm 139",
      "Psalms 139",
      "Ps 139"
    ],
    "d": "Psalms (Psalm 139:7)",
    "e": "Psalm 139:7\u201312 proclaims God's inescapable presence and omniscience."
  },
  {
    "id": "bmpi_30",
    "t": "facts",
    "p": "Which patriarch declared to his brothers: 'As for you, you meant evil against me, but God meant it for good, to bring it about that many people should be kept alive'?",
    "b": "GEN",
    "c": 50,
    "a": [
      "Joseph"
    ],
    "d": "Joseph (Genesis 50:20)",
    "e": "Genesis 50:20 is Joseph's classic confession of God's overarching providence."
  },
  {
    "id": "bmpi_31",
    "t": "book_id",
    "p": "In what book of the Pentateuch is the foundational Shema given: 'Hear, O Israel: The Lord our God, the Lord is one. You shall love the Lord your God with all your heart and with all your soul and with all your might'?",
    "b": "DEU",
    "c": 6,
    "a": [
      "Deuteronomy",
      "Deut",
      "Dt"
    ],
    "d": "Deuteronomy (Deuteronomy 6:4\u20135)",
    "e": "Deuteronomy 6:4\u20135 is the cornerstone confession of monotheism and supreme devotion."
  },
  {
    "id": "bmpi_32",
    "t": "facts",
    "p": "To which military leader taking over leadership after Moses did God promise: 'Every place that the sole of your foot will tread upon I have given to you, just as I promised to Moses'?",
    "b": "JOS",
    "c": 1,
    "a": [
      "Joshua",
      "Joshua son of Nun"
    ],
    "d": "Joshua (Joshua 1:3)",
    "e": "Joshua 1:3 is God's commissioning promise to Joshua."
  },
  {
    "id": "bmpi_33",
    "t": "facts",
    "p": "Which prophet and judge committed to Israel: 'Far be it from me that I should sin against the Lord by ceasing to pray for you, and I will instruct you in the good and the right way'?",
    "b": "1SA",
    "c": 12,
    "a": [
      "Samuel"
    ],
    "d": "Samuel (1 Samuel 12:23)",
    "e": "1 Samuel 12:23 illustrates the pastoral intercession and teaching role of Samuel."
  },
  {
    "id": "bmpi_34",
    "t": "book_id",
    "p": "In what poetic book does Zophar pose the rhetorical question: 'Can you find out the deep things of God? Can you find out the limit of the Almighty?'",
    "b": "JOB",
    "c": 11,
    "a": [
      "Job"
    ],
    "d": "Job (Job 11:7)",
    "e": "Job 11:7 reflects the transcendent mystery of God's wisdom and sovereign purposes."
  },
  {
    "id": "bmpi_35",
    "t": "book_id",
    "p": "In what epistle is divine wisdom characterized: 'the wisdom from above is first pure, then peaceable, gentle, open to reason, full of mercy and good fruits, impartial and sincere'?",
    "b": "JAS",
    "c": 3,
    "a": [
      "James",
      "Jas"
    ],
    "d": "James (James 3:17)",
    "e": "James 3:17 contrasts heavenly wisdom with worldly, unspiritual wisdom."
  },
  {
    "id": "bmpi_36",
    "t": "book_id",
    "p": "In what apocalyptic book do the 144,000 redeemed from the earth sing a new song before the throne and the four living creatures?",
    "b": "REV",
    "c": 14,
    "a": [
      "Revelation",
      "Rev",
      "Apocalypse"
    ],
    "d": "Revelation (Revelation 14:3)",
    "e": "Revelation 14:3 depicts the heavenly chorus of the redeemed."
  },
  {
    "id": "bmpi_37",
    "t": "book_id",
    "p": "In what epistle does the description of Christ's return appear: 'For the Lord himself will descend from heaven with a cry of command, with the voice of an archangel, and with the sound of the trumpet of God. And the dead in Christ will rise first'?",
    "b": "1TH",
    "c": 4,
    "a": [
      "1 Thessalonians",
      "1 Thess",
      "First Thessalonians"
    ],
    "d": "1 Thessalonians (1 Thessalonians 4:16\u201317)",
    "e": "1 Thessalonians 4:16\u201317 gives Paul's classic teaching on the return of Christ."
  },
  {
    "id": "bmpi_38",
    "t": "book_id",
    "p": "In what historical book does James deliver the verdict: 'Therefore my judgment is that we should not trouble those of the Gentiles who turn to God, but should write to them to abstain from the things polluted by idols...'?",
    "b": "ACT",
    "c": 15,
    "a": [
      "Acts",
      "Acts of the Apostles",
      "Act"
    ],
    "d": "Acts (Acts 15:19\u201320)",
    "e": "Acts 15:19\u201320 records the decisive decree of the Jerusalem Council."
  },
  {
    "id": "bmpi_39",
    "t": "book_id",
    "p": "In what wisdom book does the observation appear: 'Because the sentence against an evil deed is not executed speedily, the heart of the children of man is fully set to do evil'?",
    "b": "ECC",
    "c": 8,
    "a": [
      "Ecclesiastes",
      "Eccl",
      "Qoheleth"
    ],
    "d": "Ecclesiastes (Ecclesiastes 8:11)",
    "e": "Ecclesiastes 8:11 reflects on societal injustice when judgment is delayed."
  },
  {
    "id": "bmpi_40",
    "t": "facts",
    "p": "Which dying patriarch made the sons of Israel swear an oath: 'God will surely visit you, and you shall carry up my bones from here'?",
    "b": "GEN",
    "c": 50,
    "a": [
      "Joseph"
    ],
    "d": "Joseph (Genesis 50:25)",
    "e": "Genesis 50:25 and Hebrews 11:22 celebrate Joseph's faith regarding the Exodus."
  },
  {
    "id": "bmpi_41",
    "t": "book_id",
    "p": "In what book is the 'Law of the King' given, commanding the future king to write for himself a copy of the law and read it all the days of his life so that his heart may not be lifted up above his brothers?",
    "b": "DEU",
    "c": 17,
    "a": [
      "Deuteronomy",
      "Deut",
      "Dt"
    ],
    "d": "Deuteronomy (Deuteronomy 17:18\u201320)",
    "e": "Deuteronomy 17:18\u201320 prescribes royal humility and daily saturation in God's Word."
  },
  {
    "id": "bmpi_42",
    "t": "facts",
    "p": "To which newly appointed leader did God charge: 'This Book of the Law shall not depart from your mouth, but you shall meditate on it day and night, so that you may be careful to do according to all that is written in it'?",
    "b": "JOS",
    "c": 1,
    "a": [
      "Joshua",
      "Joshua son of Nun"
    ],
    "d": "Joshua (Joshua 1:8)",
    "e": "Joshua 1:8 is God's charge to Joshua for spiritual courage and prosperity."
  },
  {
    "id": "bmpi_43",
    "t": "facts",
    "p": "Which prophet confronted King Saul saying: 'Has the Lord as great delight in burnt offerings and sacrifices, as in obeying the voice of the Lord? Behold, to obey is better than sacrifice, and to listen than the fat of rams'?",
    "b": "1SA",
    "c": 15,
    "a": [
      "Samuel"
    ],
    "d": "Samuel (1 Samuel 15:22)",
    "e": "1 Samuel 15:22 marks the divine rejection of Saul's kingship for disobedience."
  },
  {
    "id": "bmpi_44",
    "t": "facts",
    "p": "Which suffering patriarch confessed in the midst of affliction: 'But he knows the way that I take; when he has tried me, I shall come out as gold'?",
    "b": "JOB",
    "c": 23,
    "a": [
      "Job"
    ],
    "d": "Job (Job 23:10)",
    "e": "Job 23:10 expresses unshakeable confidence in God's refining purpose."
  },
  {
    "id": "bmpi_45",
    "t": "book_id",
    "p": "In what book are believers urged: 'Remember your leaders, those who spoke to you the word of God. Consider the outcome of their way of life, and imitate their faith'?",
    "b": "HEB",
    "c": 13,
    "a": [
      "Hebrews",
      "Heb"
    ],
    "d": "Hebrews (Hebrews 13:7)",
    "e": "Hebrews 13:7 highlights the power of godly pastoral modeling."
  },
  {
    "id": "bmpi_46",
    "t": "book_id",
    "p": "Which short letter is addressed by 'the elder to the elect lady and her children, whom I love in truth'?",
    "b": "2JN",
    "c": 1,
    "a": [
      "2 John",
      "2 Jn",
      "Second John"
    ],
    "d": "2 John (2 John 1:1)",
    "e": "2 John 1:1 is addressed to the elect lady and her children walking in truth."
  },
  {
    "id": "bmpi_47",
    "t": "book_id",
    "p": "In what pastoral epistle does Paul explain that the grace of God has appeared, 'training us to renounce ungodliness and worldly passions, and to live self-controlled, upright, and godly lives in the present age'?",
    "b": "TIT",
    "c": 2,
    "a": [
      "Titus",
      "Tit"
    ],
    "d": "Titus (Titus 2:11\u201312)",
    "e": "Titus 2:11\u201314 explains the sanctifying power of sovereign grace."
  },
  {
    "id": "bmpi_48",
    "t": "book_id",
    "p": "In what epistle does the author demonstrate that Christ's eternal high priesthood belongs to the order of Melchizedek rather than the temporal Levitical priesthood of Aaron?",
    "b": "HEB",
    "c": 7,
    "a": [
      "Hebrews",
      "Heb"
    ],
    "d": "Hebrews (Hebrews 7:11\u201317)",
    "e": "Hebrews 7 expounds the superior, indestructible priesthood of Melchizedek fulfilled in Jesus."
  },
  {
    "id": "bmpi_49",
    "t": "book_id",
    "p": "In what book does the ironic counsel appear: 'Rejoice, O young man, in your youth, and let your heart cheer you in the days of your youth... but know that for all these things God will bring you into judgment'?",
    "b": "ECC",
    "c": 11,
    "a": [
      "Ecclesiastes",
      "Eccl",
      "Qoheleth"
    ],
    "d": "Ecclesiastes (Ecclesiastes 11:9)",
    "e": "Ecclesiastes 11:9 balances youthful joy with ultimate divine accountability."
  },
  {
    "id": "bmpi_50",
    "t": "book_id",
    "p": "In what book does God institute the Passover: 'The blood shall be a sign for you, on the houses where you are. And when I see the blood, I will pass over you, and no plague will befall you to destroy you'?",
    "b": "EXO",
    "c": 12,
    "a": [
      "Exodus",
      "Exo",
      "Ex"
    ],
    "d": "Exodus (Exodus 12:13)",
    "e": "Exodus 12:13 is the institution of the Passover lamb and deliverance from Egypt."
  },
  {
    "id": "bmpi_51",
    "t": "book_id",
    "p": "In what book does the theological maxim appear: 'The secret things belong to the Lord our God, but the things that are revealed belong to us and to our children forever, that we may do all the words of this law'?",
    "b": "DEU",
    "c": 29,
    "a": [
      "Deuteronomy",
      "Deut",
      "Dt"
    ],
    "d": "Deuteronomy (Deuteronomy 29:29)",
    "e": "Deuteronomy 29:29 balances God's unsearchable mysteries with His revealed commandments."
  },
  {
    "id": "bmpi_52",
    "t": "facts",
    "p": "Which leader testified at the end of his life: 'Not one word has failed of all the good things that the Lord your God promised concerning you. All have come to pass for you; not one of them has failed'?",
    "b": "JOS",
    "c": 23,
    "a": [
      "Joshua",
      "Joshua son of Nun"
    ],
    "d": "Joshua (Joshua 23:14)",
    "e": "Joshua 23:14 is Joshua's farewell testimony to God's unbroken faithfulness."
  },
  {
    "id": "bmpi_53",
    "t": "book_id",
    "p": "In what book does the Lord say to Samuel regarding the anointing of David: 'Do not look on his appearance or on the height of his stature... For the Lord sees not as man sees: man looks on the outward appearance, but the Lord looks on the heart'?",
    "b": "1SA",
    "c": 16,
    "a": [
      "1 Samuel",
      "1 Sam",
      "First Samuel"
    ],
    "d": "1 Samuel (1 Samuel 16:7)",
    "e": "1 Samuel 16:7 establishes God's standard of inner character in leadership."
  },
  {
    "id": "bmpi_54",
    "t": "facts",
    "p": "Who confessed in humble submission after God spoke from the whirlwind: 'I know that you can do all things, and that no purpose of yours can be thwarted'?",
    "b": "JOB",
    "c": 42,
    "a": [
      "Job"
    ],
    "d": "Job (Job 42:2)",
    "e": "Job 42:2 marks Job's total surrender to the sovereign majesty of God."
  },
  {
    "id": "bmpi_55",
    "t": "book_id",
    "p": "In what epistle did Paul charge his coworker: 'This is why I left you in Crete, so that you might put what remained into order and appoint elders in every town as I directed you'?",
    "b": "TIT",
    "c": 1,
    "a": [
      "Titus",
      "Tit"
    ],
    "d": "Titus (Titus 1:5)",
    "e": "Titus 1:5 sets forth the apostolic mandate to establish godly church leadership in Crete."
  },
  {
    "id": "bmpi_56",
    "t": "book_id",
    "p": "In what general epistle does the author record that the archangel Michael, when contending with the devil about the body of Moses, did not presume to pronounce a blasphemous judgment, but said, 'The Lord rebuke you'?",
    "b": "JUD",
    "c": 1,
    "a": [
      "Jude",
      "Jud"
    ],
    "d": "Jude (Jude 1:9)",
    "e": "Jude 1:9 warns against blaspheming angelic majesties using the example of Michael."
  },
  {
    "id": "bmpi_57",
    "t": "book_id",
    "p": "In what book does the opening funeral dirge lament: 'How lonely sits the city that was full of people! How like a widow has she become, she who was great among the nations!'?",
    "b": "LAM",
    "c": 1,
    "a": [
      "Lamentations",
      "Lam"
    ],
    "d": "Lamentations (Lamentations 1:1)",
    "e": "Lamentations 1:1 is the grief-stricken opening over the destruction of Jerusalem."
  },
  {
    "id": "bmpi_58",
    "t": "book_id",
    "p": "In what book does the psalmist recount of Joseph: 'He had sent a man ahead of them, Joseph, who was sold as a slave. His feet were hurt with fetters; his neck was put in a collar of iron; until what he had said came to pass, the word of the Lord tested him'?",
    "b": "PSA",
    "c": 105,
    "a": [
      "Psalms",
      "Psalm",
      "Psalm 105",
      "Psalms 105",
      "Ps 105"
    ],
    "d": "Psalms (Psalm 105:17\u201319)",
    "e": "Psalm 105:17\u201319 reflects on God's sovereign testing and elevation of Joseph."
  },
  {
    "id": "bmpi_59",
    "t": "book_id",
    "p": "In what book does the bride express intimate devotion: 'I am my beloved's, and his desire is for me'?",
    "b": "SNG",
    "c": 7,
    "a": [
      "Song of Songs",
      "Song of Solomon",
      "Canticles",
      "Song"
    ],
    "d": "Song of Songs (Song 7:10)",
    "e": "Song of Songs 7:10 expresses the beauty of mutual marital delight."
  },
  {
    "id": "bmpi_60",
    "t": "book_id",
    "p": "In what book of the Law does the principle of substitutionary blood atonement appear: 'For the life of the flesh is in the blood, and I have given it for you on the altar to make atonement for your souls'?",
    "b": "LEV",
    "c": 17,
    "a": [
      "Leviticus",
      "Lev",
      "Lv"
    ],
    "d": "Leviticus (Leviticus 17:11)",
    "e": "Leviticus 17:11 is the central Old Testament text on blood atonement."
  },
  {
    "id": "bmpi_61",
    "t": "book_id",
    "p": "In what historical book did God promise Solomon: 'if my people who are called by my name humble themselves, and pray and seek my face and turn from their wicked ways, then I will hear from heaven and will forgive their sin and heal their land'?",
    "b": "2CH",
    "c": 7,
    "a": [
      "2 Chronicles",
      "2 Chron",
      "Second Chronicles"
    ],
    "d": "2 Chronicles (2 Chronicles 7:14)",
    "e": "2 Chronicles 7:14 is God's covenant promise at the dedication of the temple."
  },
  {
    "id": "bmpi_62",
    "t": "facts",
    "p": "Which prophet challenged the prophets of Baal on Mount Carmel: 'How long will you go limping between two different opinions? If the Lord is God, follow him; but if Baal, then follow him'?",
    "b": "1KI",
    "c": 18,
    "a": [
      "Elijah",
      "Elijah the Tishbite"
    ],
    "d": "Elijah (1 Kings 18:21)",
    "e": "1 Kings 18:21 records Elijah's dramatic power encounter on Mount Carmel."
  },
  {
    "id": "bmpi_63",
    "t": "facts",
    "p": "Which young shepherd confronted Goliath declaring: 'You come to me with a sword and with a spear and with a javelin, but I come to you in the name of the Lord of hosts, the God of the armies of Israel'?",
    "b": "1SA",
    "c": 17,
    "a": [
      "David"
    ],
    "d": "David (1 Samuel 17:45)",
    "e": "1 Samuel 17:45 shows David's faith in the sovereign power of Yahweh."
  },
  {
    "id": "bmpi_64",
    "t": "facts",
    "p": "Which king of Judah prayed when confronted by an overwhelming allied army: 'O our God, will you not execute judgment on them? For we are powerless against this great horde that is coming against us. We do not know what to do, but our eyes are on you'?",
    "b": "2CH",
    "c": 20,
    "a": [
      "Jehoshaphat",
      "King Jehoshaphat"
    ],
    "d": "Jehoshaphat (2 Chronicles 20:12)",
    "e": "2 Chronicles 20:12 is Jehoshaphat's model prayer of total reliance on God."
  },
  {
    "id": "bmpi_65",
    "t": "book_id",
    "p": "In what pastoral epistle does Paul charge Timothy regarding church leadership: 'Do not be hasty in the laying on of hands, nor take part in the sins of others; keep yourself pure'?",
    "b": "1TI",
    "c": 5,
    "a": [
      "1 Timothy",
      "1 Tim",
      "First Timothy"
    ],
    "d": "1 Timothy (1 Timothy 5:22)",
    "e": "1 Timothy 5:22 warns against careless ordination and compromising leadership."
  },
  {
    "id": "bmpi_66",
    "t": "facts",
    "p": "Which king of Judah, after falling mortally ill, wept bitterly and prayed to the Lord, receiving 15 additional years of life and the miraculous retreat of the sun's shadow?",
    "b": "2KI",
    "c": 20,
    "a": [
      "Hezekiah",
      "King Hezekiah"
    ],
    "d": "Hezekiah (2 Kings 20:1\u20136, Isaiah 38)",
    "e": "2 Kings 20 records Hezekiah's prayer, recovery, and the sign on the dial of Ahaz."
  },
  {
    "id": "bmpi_67",
    "t": "book_id",
    "p": "In what book does the dramatic confession appear: 'The Lord gave, and the Lord has taken away; blessed be the name of the Lord'?",
    "b": "JOB",
    "c": 1,
    "a": [
      "Job"
    ],
    "d": "Job (Job 1:21)",
    "e": "Job 1:21 is Job's worshipful response after losing all his possessions and children."
  },
  {
    "id": "bmpi_68",
    "t": "facts",
    "p": "Which prophet saw the vision of the Lord seated on a throne, high and lifted up, with the train of His robe filling the temple, crying: 'Woe is me! For I am lost; for I am a man of unclean lips'?",
    "b": "ISA",
    "c": 6,
    "a": [
      "Isaiah",
      "Isa"
    ],
    "d": "Isaiah (Isaiah 6:1\u20135)",
    "e": "Isaiah 6:1\u20138 is Isaiah's heavenly commissioning vision."
  },
  {
    "id": "bmpi_69",
    "t": "book_id",
    "p": "In what prophetic book does the Lord declare through the prophet: 'For my thoughts are not your thoughts, neither are your ways my ways, declares the Lord. For as the heavens are higher than the earth, so are my ways higher than your ways'?",
    "b": "ISA",
    "c": 55,
    "a": [
      "Isaiah",
      "Isa"
    ],
    "d": "Isaiah (Isaiah 55:8\u20139)",
    "e": "Isaiah 55:8\u20139 proclaims the infinite superiority of God's wisdom and counsel."
  },
  {
    "id": "bmpi_70",
    "t": "book_id",
    "p": "In what book of the Pentateuch is the holiness code repeatedly grounded in: 'You shall be holy, for I the Lord your God am holy'?",
    "b": "LEV",
    "c": 19,
    "a": [
      "Leviticus",
      "Lev",
      "Lv"
    ],
    "d": "Leviticus (Leviticus 19:2)",
    "e": "Leviticus 19:2 sets the standard of moral and ritual holiness reflecting God's character."
  },
  {
    "id": "bmpi_71",
    "t": "book_id",
    "p": "In what Gospel does Jesus call Peter and Andrew with the words: 'Follow me, and I will make you fishers of men'?",
    "b": "MAT",
    "c": 4,
    "a": [
      "Matthew",
      "Mark",
      "Mat",
      "Mrk"
    ],
    "d": "Matthew (Matthew 4:19 / Mark 1:17)",
    "e": "Matthew 4:19 and Mark 1:17 record Jesus' initial call of the disciples into evangelistic ministry."
  },
  {
    "id": "bmpi_72",
    "t": "book_id",
    "p": "In what historical book does the refrain appear: 'In those days there was no king in Israel. Everyone did what was right in his own eyes'?",
    "b": "JDG",
    "c": 21,
    "a": [
      "Judges",
      "Jdg"
    ],
    "d": "Judges (Judges 21:25)",
    "e": "Judges 21:25 summarizes the moral and spiritual anarchy of the Judges era."
  },
  {
    "id": "bmpi_73",
    "t": "book_id",
    "p": "In what Gospel does Jesus command His disciples: 'The harvest is plentiful, but the laborers are few; therefore pray earnestly to the Lord of the harvest to send out laborers into his harvest'?",
    "b": "MAT",
    "c": 9,
    "a": [
      "Matthew",
      "Luke",
      "Mat",
      "Luk"
    ],
    "d": "Matthew (Matthew 9:37\u201338 / Luke 10:2)",
    "e": "Matthew 9:37\u201338 reveals Christ's compassion for the unshepherded crowds."
  },
  {
    "id": "bmpi_74",
    "t": "book_id",
    "p": "In what book does David invite believers: 'Oh, magnify the Lord with me, and let us exalt his name together!'?",
    "b": "PSA",
    "c": 34,
    "a": [
      "Psalms",
      "Psalm",
      "Psalm 34",
      "Psalms 34",
      "Ps 34"
    ],
    "d": "Psalms (Psalm 34:3)",
    "e": "Psalm 34:3 is a call to corporate praise after experiencing God's deliverance."
  },
  {
    "id": "bmpi_75",
    "t": "book_id",
    "p": "In what epistle does Paul declare: 'For in him the whole fullness of deity dwells bodily, and you have been filled in him, who is the head of all rule and authority'?",
    "b": "COL",
    "c": 2,
    "a": [
      "Colossians",
      "Col"
    ],
    "d": "Colossians (Colossians 2:9\u201310)",
    "e": "Colossians 2:9\u201310 asserts the absolute deity of Christ and the believer's completeness in Him."
  },
  {
    "id": "bmpi_76",
    "t": "book_id",
    "p": "In what Gospel does the Great Commission charge appear: 'Go into all the world and proclaim the gospel to the whole creation'?",
    "b": "MRK",
    "c": 16,
    "a": [
      "Mark",
      "Gospel of Mark",
      "Mrk"
    ],
    "d": "Mark (Mark 16:15)",
    "e": "Mark 16:15 gives the evangelistic mandate to preach the gospel to all creation."
  },
  {
    "id": "bmpi_77",
    "t": "book_id",
    "p": "In what Gospel does the prologue open: 'In the beginning was the Word, and the Word was with God, and the Word was God'?",
    "b": "JHN",
    "c": 1,
    "a": [
      "John",
      "Gospel of John",
      "Jhn"
    ],
    "d": "John (John 1:1)",
    "e": "John 1:1 presents the eternal deity and preexistence of the incarnate Logos."
  },
  {
    "id": "bmpi_78",
    "t": "book_id",
    "p": "In what book does the psalmist testify: 'Your word is a lamp to my feet and a light to my path'?",
    "b": "PSA",
    "c": 119,
    "a": [
      "Psalms",
      "Psalm",
      "Psalm 119",
      "Psalms 119",
      "Ps 119"
    ],
    "d": "Psalms (Psalm 119:105)",
    "e": "Psalm 119:105 celebrates the illuminating guidance of God's Word."
  },
  {
    "id": "bmpi_79",
    "t": "book_id",
    "p": "In what prophetic book does the Lord declare: 'And I sought for a man among them who should build up the wall and stand in the breach before me for the land, that I should not destroy it, but I found none'?",
    "b": "EZE",
    "c": 22,
    "a": [
      "Ezekiel",
      "Eze"
    ],
    "d": "Ezekiel (Ezekiel 22:30)",
    "e": "Ezekiel 22:30 shows God seeking intercessors and righteous spiritual leaders in times of national crisis."
  },
  {
    "id": "bmpi_80",
    "t": "facts",
    "p": "Which young exiled leader 'resolved that he would not defile himself with the king's food, or with the wine that he drank' in Babylon?",
    "b": "DAN",
    "c": 1,
    "a": [
      "Daniel",
      "Belteshazzar"
    ],
    "d": "Daniel (Daniel 1:8)",
    "e": "Daniel 1:8 records Daniel's early resolve for holy living in pagan Babylon."
  },
  {
    "id": "bmpi_81",
    "t": "book_id",
    "p": "In what book of the Pentateuch is Moses described: 'Now the man Moses was very meek, more than all people who were on the face of the earth'?",
    "b": "NUM",
    "c": 12,
    "a": [
      "Numbers",
      "Num"
    ],
    "d": "Numbers (Numbers 12:3)",
    "e": "Numbers 12:3 highlights Moses' genuine meekness when opposed by Aaron and Miriam."
  },
  {
    "id": "bmpi_82",
    "t": "book_id",
    "p": "In what Gospel does Jesus teach servant leadership: 'whoever would be great among you must be your servant... even as the Son of Man came not to be served but to serve, and to give his life as a ransom for many'?",
    "b": "MAT",
    "c": 20,
    "a": [
      "Matthew",
      "Mark",
      "Mat",
      "Mrk"
    ],
    "d": "Matthew (Matthew 20:26\u201328 / Mark 10:43\u201345)",
    "e": "Matthew 20:26\u201328 redefines true kingdom leadership as humble servanthood modeled by Christ."
  },
  {
    "id": "bmpi_83",
    "t": "book_id",
    "p": "In what Gospel does Jesus declare: 'I am the good shepherd. The good shepherd lays down his life for the sheep'?",
    "b": "JHN",
    "c": 10,
    "a": [
      "John",
      "Gospel of John",
      "Jhn"
    ],
    "d": "John (John 10:11)",
    "e": "John 10:11 portrays Jesus as the sacrificial Good Shepherd."
  },
  {
    "id": "bmpi_84",
    "t": "book_id",
    "p": "In what Gospel does the distressed father cry out to Jesus: 'I believe; help my unbelief!'?",
    "b": "MRK",
    "c": 9,
    "a": [
      "Mark",
      "Gospel of Mark",
      "Mrk"
    ],
    "d": "Mark (Mark 9:24)",
    "e": "Mark 9:23\u201324 records the father's honest prayer when Jesus heals his demonized son."
  },
  {
    "id": "bmpi_85",
    "t": "book_id",
    "p": "In what book does the promise appear: 'Delight yourself in the Lord, and he will give you the desires of your heart'?",
    "b": "PSA",
    "c": 37,
    "a": [
      "Psalms",
      "Psalm",
      "Psalm 37",
      "Psalms 37",
      "Ps 37"
    ],
    "d": "Psalms (Psalm 37:4)",
    "e": "Psalm 37:4 encourages finding ultimate satisfaction in Yahweh."
  },
  {
    "id": "bmpi_86",
    "t": "book_id",
    "p": "In what prophetic book does the Lord say He will return to His place until they acknowledge their guilt, prompting the plea: 'Come, let us return to the Lord; for he has torn us, that he may heal us'?",
    "b": "HOS",
    "c": 6,
    "a": [
      "Hosea",
      "Hos"
    ],
    "d": "Hosea (Hosea 5:15\u20136:1)",
    "e": "Hosea 6:1 calls backsliding Israel to genuine covenant repentance."
  },
  {
    "id": "bmpi_87",
    "t": "book_id",
    "p": "In what prophetic book does the promise appear: 'You keep him in perfect peace whose mind is stayed on you, because he trusts in you'?",
    "b": "ISA",
    "c": 26,
    "a": [
      "Isaiah",
      "Isa"
    ],
    "d": "Isaiah (Isaiah 26:3)",
    "e": "Isaiah 26:3 promises unshakable peace to those whose minds are fixed on God."
  },
  {
    "id": "bmpi_88",
    "t": "book_id",
    "p": "In what epistle does Paul declare: 'I have been crucified with Christ. It is no longer I who live, but Christ who lives in me. And the life I now live in the flesh I live by faith in the Son of God'?",
    "b": "GAL",
    "c": 2,
    "a": [
      "Galatians",
      "Gal"
    ],
    "d": "Galatians (Galatians 2:20)",
    "e": "Galatians 2:20 is Paul's testimony of union with Christ in His death and resurrection."
  },
  {
    "id": "bmpi_89",
    "t": "book_id",
    "p": "In what prophetic book does the prophecy appear: 'All we like sheep have gone astray; we have turned\u2014every one\u2014to his own way; and the Lord has laid on him the iniquity of us all'?",
    "b": "ISA",
    "c": 53,
    "a": [
      "Isaiah",
      "Isa"
    ],
    "d": "Isaiah (Isaiah 53:6)",
    "e": "Isaiah 53:6 foretells Christ's substitutionary sin-bearing on the cross."
  },
  {
    "id": "bmpi_90",
    "t": "book_id",
    "p": "In what book does David pray following his conviction of sin: 'Create in me a clean heart, O God, and renew a right spirit within me'?",
    "b": "PSA",
    "c": 51,
    "a": [
      "Psalms",
      "Psalm",
      "Psalm 51",
      "Psalms 51",
      "Ps 51"
    ],
    "d": "Psalms (Psalm 51:10)",
    "e": "Psalm 51:10 is David's prayer of brokenhearted repentance."
  },
  {
    "id": "bmpi_91",
    "t": "book_id",
    "p": "In what epistle does Paul state the core principle of Christian pilgrimage: 'for we walk by faith, not by sight'?",
    "b": "2CO",
    "c": 5,
    "a": [
      "2 Corinthians",
      "2 Cor",
      "Second Corinthians"
    ],
    "d": "2 Corinthians (2 Corinthians 5:7)",
    "e": "2 Corinthians 5:7 defines walking by unseen eternal realities."
  },
  {
    "id": "bmpi_92",
    "t": "book_id",
    "p": "In what wisdom book does the proverb appear: 'A soft answer turns away wrath, but a harsh word stirs up anger'?",
    "b": "PRO",
    "c": 15,
    "a": [
      "Proverbs",
      "Prov",
      "Pr"
    ],
    "d": "Proverbs (Proverbs 15:1)",
    "e": "Proverbs 15:1 teaches the pacifying power of gentle communication."
  },
  {
    "id": "bmpi_93",
    "t": "book_id",
    "p": "In what epistle does Paul declare the universal need of humanity: 'for all have sinned and fall short of the glory of God'?",
    "b": "ROM",
    "c": 3,
    "a": [
      "Romans",
      "Rom"
    ],
    "d": "Romans (Romans 3:23)",
    "e": "Romans 3:23 establishes universal human guilt requiring divine justification in Christ."
  },
  {
    "id": "bmpi_94",
    "t": "book_id",
    "p": "In what prophetic book does God promise: 'so shall my word be that goes out from my mouth; it shall not return to me empty, but it shall accomplish that which I purpose'?",
    "b": "ISA",
    "c": 55,
    "a": [
      "Isaiah",
      "Isa"
    ],
    "d": "Isaiah (Isaiah 55:11)",
    "e": "Isaiah 55:11 guarantees the sovereign efficacy of God's Word."
  },
  {
    "id": "bmpi_95",
    "t": "book_id",
    "p": "In what wisdom book does the guidance command appear: 'Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths'?",
    "b": "PRO",
    "c": 3,
    "a": [
      "Proverbs",
      "Prov",
      "Pr"
    ],
    "d": "Proverbs (Proverbs 3:5\u20136)",
    "e": "Proverbs 3:5\u20136 gives the classic biblical pattern for divine guidance."
  },
  {
    "id": "bmpi_96",
    "t": "book_id",
    "p": "In what wisdom book does the proverb appear: 'The king's heart is a stream of water in the hand of the Lord; he turns it wherever he will'?",
    "b": "PRO",
    "c": 21,
    "a": [
      "Proverbs",
      "Prov",
      "Pr"
    ],
    "d": "Proverbs (Proverbs 21:1)",
    "e": "Proverbs 21:1 asserts God's sovereign control over earthly rulers."
  },
  {
    "id": "bmpi_97",
    "t": "book_chapter",
    "p": "In what book & chapter does the promise appear: 'they who wait for the Lord shall renew their strength; they shall mount up with wings like eagles; they shall run and not be weary; they shall walk and not faint'?",
    "b": "ISA",
    "c": 40,
    "a": [
      "Isaiah 40",
      "Isa 40",
      "Isaiah 40:31",
      "Isa 40:31"
    ],
    "d": "Isaiah 40 (Isaiah 40:31)",
    "e": "Isaiah 40:31 promises divine endurance to those who wait upon Yahweh."
  },
  {
    "id": "bmpi_98",
    "t": "book_id",
    "p": "In what Gospel does the incarnational summary appear: 'And the Word became flesh and dwelt among us, and we have seen his glory, glory as of the only Son from the Father, full of grace and truth'?",
    "b": "JHN",
    "c": 1,
    "a": [
      "John",
      "Gospel of John",
      "Jhn"
    ],
    "d": "John (John 1:14)",
    "e": "John 1:14 encapsulates the divine Incarnation of the Son of God."
  },
  {
    "id": "bmpi_99",
    "t": "book_id",
    "p": "In what book does Peter preach before the Sanhedrin: 'And there is salvation in no one else, for there is no other name under heaven given among men by which we must be saved'?",
    "b": "ACT",
    "c": 4,
    "a": [
      "Acts",
      "Acts of the Apostles",
      "Act"
    ],
    "d": "Acts (Acts 4:12)",
    "e": "Acts 4:12 proclaims the exclusive saving power of Jesus Christ."
  },
  {
    "id": "bmpi_100",
    "t": "book_id",
    "p": "In what Gospel does Jesus comfort His disciples in the Upper Room: 'Let not your hearts be troubled. Believe in God; believe also in me'?",
    "b": "JHN",
    "c": 14,
    "a": [
      "John",
      "Gospel of John",
      "Jhn"
    ],
    "d": "John (John 14:1)",
    "e": "John 14:1 opens the Farewell Discourse with comforting assurance."
  },
  {
    "id": "bmpi_101",
    "t": "book_id",
    "p": "In what epistle does Paul explain our co-crucifixion with Christ: 'We know that our old self was crucified with him in order that the body of sin might be brought to nothing, so that we would no longer be enslaved to sin'?",
    "b": "ROM",
    "c": 6,
    "a": [
      "Romans",
      "Rom"
    ],
    "d": "Romans (Romans 6:6)",
    "e": "Romans 6:6 explains liberation from the tyranny of sin through union with Christ."
  },
  {
    "id": "bmpi_102",
    "t": "book_id",
    "p": "In what epistle does Paul proclaim: 'No, in all these things we are more than conquerors through him who loved us'?",
    "b": "ROM",
    "c": 8,
    "a": [
      "Romans",
      "Rom"
    ],
    "d": "Romans (Romans 8:37)",
    "e": "Romans 8:37 celebrates the unshakeable security of the believer in Christ's love."
  },
  {
    "id": "bmpi_103",
    "t": "book_id",
    "p": "In what epistle does the promise appear: 'No temptation has overtaken you that is not common to man. God is faithful, and he will not let you be tempted beyond your ability, but with the temptation he will also provide the way of escape'?",
    "b": "1CO",
    "c": 10,
    "a": [
      "1 Corinthians",
      "1 Cor",
      "First Corinthians"
    ],
    "d": "1 Corinthians (1 Corinthians 10:13)",
    "e": "1 Corinthians 10:13 assures believers of God's faithfulness amidst temptation."
  },
  {
    "id": "bmpi_104",
    "t": "book_id",
    "p": "In what epistle does the 'Love Chapter' conclude: 'So now faith, hope, and love abide, these three; but the greatest of these is love'?",
    "b": "1CO",
    "c": 13,
    "a": [
      "1 Corinthians",
      "1 Cor",
      "First Corinthians"
    ],
    "d": "1 Corinthians (1 Corinthians 13:13)",
    "e": "1 Corinthians 13:13 exalts love above all spiritual gifts and virtues."
  },
  {
    "id": "bmpi_105",
    "t": "book_id",
    "p": "In what epistle does the golden chain of redemption appear: 'And we know that for those who love God all things work together for good, for those who are called according to his purpose. For those whom he foreknew he also predestined to be conformed to the image of his Son'?",
    "b": "ROM",
    "c": 8,
    "a": [
      "Romans",
      "Rom"
    ],
    "d": "Romans (Romans 8:28\u201329)",
    "e": "Romans 8:28\u201330 details God's sovereign providence conforming believers to Christ."
  },
  {
    "id": "bmpi_106",
    "t": "book_id",
    "p": "In what Gospel does Jesus command in the Sermon on the Mount: 'But seek first the kingdom of God and his righteousness, and all these things will be added to you'?",
    "b": "MAT",
    "c": 6,
    "a": [
      "Matthew",
      "Gospel of Matthew",
      "Mat"
    ],
    "d": "Matthew (Matthew 6:33)",
    "e": "Matthew 6:33 establishes the primary priority of God's kingdom over earthly anxieties."
  },
  {
    "id": "bmpi_107",
    "t": "book_id",
    "p": "In what epistle does Paul explain apostolic warfare: 'For the weapons of our warfare are not of the flesh but have divine power to destroy strongholds'?",
    "b": "2CO",
    "c": 10,
    "a": [
      "2 Corinthians",
      "2 Cor",
      "Second Corinthians"
    ],
    "d": "2 Corinthians (2 Corinthians 10:4)",
    "e": "2 Corinthians 10:4\u20135 teaches demolishing arguments and taking every thought captive to obey Christ."
  },
  {
    "id": "bmpi_108",
    "t": "book_id",
    "p": "In what prophetic book does the Bethlehem prophecy appear: 'But you, O Bethlehem Ephrathah, who are too little to be among the clans of Judah, from you shall come forth for me one who is to be ruler in Israel, whose coming forth is from of old, from ancient days'?",
    "b": "MIC",
    "c": 5,
    "a": [
      "Micah",
      "Mic"
    ],
    "d": "Micah (Micah 5:2)",
    "e": "Micah 5:2 foretells the birthplace and eternal preexistence of the Messiah."
  },
  {
    "id": "bmpi_109",
    "t": "book_id",
    "p": "In what prophetic book does the summary of true religion appear: 'He has told you, O man, what is good; and what does the Lord require of you but to do justice, and to love kindness, and to walk humbly with your God'?",
    "b": "MIC",
    "c": 6,
    "a": [
      "Micah",
      "Mic"
    ],
    "d": "Micah (Micah 6:8)",
    "e": "Micah 6:8 summarizes the heart of genuine covenant obedience."
  },
  {
    "id": "bmpi_110",
    "t": "book_id",
    "p": "In what post-exilic prophetic book does the Lord challenge the returned remnant: 'Is it a time for you yourselves to dwell in your paneled houses, while this house lies in ruins?'",
    "b": "HAG",
    "c": 1,
    "a": [
      "Haggai",
      "Hag"
    ],
    "d": "Haggai (Haggai 1:4)",
    "e": "Haggai 1:4 rebukes the returned exiles for prioritizing personal luxury over rebuilding the temple."
  },
  {
    "id": "bmpi_111",
    "t": "book_id",
    "p": "Which Minor Prophet repeatedly emphasizes 'the Day of the Lord' five times as both a devastating locust plague and a future cosmic judgment and restoration?",
    "b": "JOE",
    "c": 1,
    "a": [
      "Joel",
      "Joe"
    ],
    "d": "Joel",
    "e": "Joel 1\u20133 focuses extensively on the themes of the Day of the Lord and the outpouring of the Spirit."
  },
  {
    "id": "bmpi_112",
    "t": "book_id",
    "p": "Which two Old Testament books trace the era of charismatic leaders and judges delivering Israel between the conquest and the monarchy?",
    "b": "JDG",
    "c": 1,
    "a": [
      "Judges and Ruth",
      "Judges & Ruth",
      "Judges",
      "Ruth"
    ],
    "d": "Judges and Ruth",
    "e": "Judges and Ruth document life, leadership, and redemption during the judges era."
  },
  {
    "id": "bmpi_113",
    "t": "book_id",
    "p": "Which two historical books trace the post-exilic return of the Jewish remnant, the rebuilding of the second temple, and the reconstruction of Jerusalem's defensive walls?",
    "b": "EZR",
    "c": 1,
    "a": [
      "Ezra and Nehemiah",
      "Ezra & Nehemiah",
      "Ezra",
      "Nehemiah"
    ],
    "d": "Ezra and Nehemiah",
    "e": "Ezra and Nehemiah chronicle the post-exilic restoration under Zerubbabel, Ezra, and Nehemiah."
  },
  {
    "id": "bmpi_114",
    "t": "book_id",
    "p": "Which book of the Pentateuch is structured around the lives of four key patriarchs: Abraham, Isaac, Jacob, and Joseph?",
    "b": "GEN",
    "c": 12,
    "a": [
      "Genesis",
      "Gen"
    ],
    "d": "Genesis (Genesis 12\u201350)",
    "e": "Genesis 12\u201350 records the foundational patriarchal history of the covenant family."
  },
  {
    "id": "bmpi_115",
    "t": "book_id",
    "p": "Which Old Testament historical book chronicles Israel's initial military conquest of Canaan and the division of the Promised Land among the twelve tribes?",
    "b": "JOS",
    "c": 1,
    "a": [
      "Joshua",
      "Jos"
    ],
    "d": "Joshua",
    "e": "Joshua records the crossing of the Jordan, conquest of Jericho and Ai, and tribal allocations."
  },
  {
    "id": "bmpi_116",
    "t": "book_id",
    "p": "Which poetic wisdom book wrestles with the profound mystery of innocent human suffering and divine sovereignty through poetic dialogues and God's speeches from the whirlwind?",
    "b": "JOB",
    "c": 1,
    "a": [
      "Job"
    ],
    "d": "Job",
    "e": "Job addresses the theological problem of righteous suffering and God's unsearchable sovereignty."
  },
  {
    "id": "bmpi_117",
    "t": "book_id",
    "p": "Which book of the Law details the sacrificial system, priestly consecration, and the annual Day of Atonement (Yom Kippur)?",
    "b": "LEV",
    "c": 1,
    "a": [
      "Leviticus",
      "Lev",
      "Lv"
    ],
    "d": "Leviticus",
    "e": "Leviticus provides the liturgical, ceremonial, and moral holiness requirements for Israel."
  },
  {
    "id": "bmpi_118",
    "t": "book_id",
    "p": "Which book of the Law contains Moses' series of farewell sermons on the plains of Moab reiterating the covenant to the new generation before entering Canaan?",
    "b": "DEU",
    "c": 1,
    "a": [
      "Deuteronomy",
      "Deut",
      "Dt"
    ],
    "d": "Deuteronomy",
    "e": "Deuteronomy ('second law') restates the covenant, Shema, and blessings/curses."
  },
  {
    "id": "bmpi_119",
    "t": "book_id",
    "p": "Which historical books trace the monarchy from Solomon's golden reign and the division into Northern/Southern kingdoms through the eventual falls of Samaria and Jerusalem?",
    "b": "1KI",
    "c": 1,
    "a": [
      "1 Kings and 2 Kings",
      "1 & 2 Kings",
      "1 Kings",
      "2 Kings",
      "Kings"
    ],
    "d": "1 & 2 Kings",
    "e": "1 & 2 Kings narrate the monarchic history of Israel and Judah."
  },
  {
    "id": "bmpi_120",
    "t": "book_id",
    "p": "Which Major Prophet served as the 'weeping prophet' warning Judah of impending Babylonian exile for over 40 years, while also weeping over the fallen city in Lamentations?",
    "b": "JER",
    "c": 1,
    "a": [
      "Jeremiah",
      "Jer"
    ],
    "d": "Jeremiah",
    "e": "Jeremiah authored both his prophetic book and the funeral laments of Lamentations."
  },
  {
    "id": "bmpi_121",
    "t": "book_id",
    "p": "Which poetic book celebrates in rich lyrical imagery the intimate marital love between a bridegroom and his bride, reflecting Christ's love for His church?",
    "b": "SNG",
    "c": 1,
    "a": [
      "Song of Songs",
      "Song of Solomon",
      "Canticles",
      "Song"
    ],
    "d": "Song of Songs",
    "e": "Song of Songs celebrates pure marital passion and covenant intimacy."
  },
  {
    "id": "bmpi_122",
    "t": "book_id",
    "p": "Which book of the Pentateuch chronicles Israel's 40-year wilderness wanderings, two military censuses, and repeated rebellions from Sinai to the Jordan?",
    "b": "NUM",
    "c": 1,
    "a": [
      "Numbers",
      "Num"
    ],
    "d": "Numbers",
    "e": "Numbers (in the wilderness) recounts the journeys, censuses, and trials of Israel."
  },
  {
    "id": "bmpi_123",
    "t": "book_id",
    "p": "Which book of the Bible traces redemptive history from cosmic origins and human creation down to the death of Joseph in Egypt?",
    "b": "GEN",
    "c": 1,
    "a": [
      "Genesis",
      "Gen"
    ],
    "d": "Genesis",
    "e": "Genesis spans primeval origins (1\u201311) to patriarchal history (12\u201350)."
  },
  {
    "id": "bmpi_124",
    "t": "facts",
    "p": "Which cupbearer to King Artaxerxes persevered through mockery and military threats to lead the remnant in rebuilding Jerusalem's walls in just 52 days?",
    "b": "NEH",
    "c": 1,
    "a": [
      "Nehemiah"
    ],
    "d": "Nehemiah",
    "e": "Nehemiah organized the reconstruction of Jerusalem's defensive walls amidst severe opposition."
  },
  {
    "id": "bmpi_125",
    "t": "book_id",
    "p": "Which two Old Testament books illustrate how a scribe skilled in the Law of Moses brought spiritual and covenant renewal to the returned remnant?",
    "b": "EZR",
    "c": 7,
    "a": [
      "Ezra and Nehemiah",
      "Ezra & Nehemiah",
      "Ezra",
      "Nehemiah"
    ],
    "d": "Ezra and Nehemiah (Ezra 7\u201310, Nehemiah 8)",
    "e": "Ezra read and expounded the Law of Moses publicly to the assembled congregation in Nehemiah 8."
  },
  {
    "id": "bmpi_126",
    "t": "book_id",
    "p": "Which historical books trace the monarchy during the united kingdom under Saul, David, and Solomon?",
    "b": "1SA",
    "c": 1,
    "a": [
      "1 Samuel, 2 Samuel, 1 Kings",
      "1 Samuel",
      "2 Samuel",
      "1 Kings",
      "Samuel and Kings"
    ],
    "d": "1 Samuel, 2 Samuel, 1 Kings",
    "e": "1 & 2 Samuel and 1 Kings cover the United Monarchy before the kingdom split under Rehoboam."
  },
  {
    "id": "bmpi_127",
    "t": "book_id",
    "p": "In which historical book is the name of God never explicitly mentioned, yet His sovereign providence is vividly displayed saving the Jewish people from genocide?",
    "b": "EST",
    "c": 1,
    "a": [
      "Esther",
      "Est"
    ],
    "d": "Esther",
    "e": "Esther showcases the unseen, flawless providence of God orchestrating deliverance in Persia."
  },
  {
    "id": "bmpi_128",
    "t": "book_id",
    "p": "Which two Old Testament books contain the full historical records of the Ten Commandments given at Mount Sinai?",
    "b": "EXO",
    "c": 20,
    "a": [
      "Exodus and Deuteronomy",
      "Exodus & Deuteronomy",
      "Exodus",
      "Deuteronomy"
    ],
    "d": "Exodus & Deuteronomy (Exodus 20, Deuteronomy 5)",
    "e": "The Decalogue is recorded in Exodus 20 and restated in Deuteronomy 5."
  },
  {
    "id": "bmpi_129",
    "t": "book_id",
    "p": "Which wisdom book shows that a righteous person's sufferings become clearer when understood as allowed by God for deeper consecration and faith beyond circumstances?",
    "b": "JOB",
    "c": 1,
    "a": [
      "Job"
    ],
    "d": "Job",
    "e": "Job demonstrates unwavering devotion to God regardless of unexplained calamity."
  },
  {
    "id": "bmpi_130",
    "t": "book_id",
    "p": "Which book of the Pentateuch details the burning bush, the Ten Plagues, the crossing of the Red Sea, the giving of the Law, and the construction of the Tabernacle?",
    "b": "EXO",
    "c": 1,
    "a": [
      "Exodus",
      "Exo",
      "Ex"
    ],
    "d": "Exodus",
    "e": "Exodus recounts redemption from slavery, covenant ratification, and God dwelling with His people."
  },
  {
    "id": "bmpi_131",
    "t": "book_id",
    "p": "Which Old Testament historical book contains the most extensive biographical account of the rise and tragic fall of Saul, the first king of Israel?",
    "b": "1SA",
    "c": 9,
    "a": [
      "1 Samuel",
      "1 Sam",
      "First Samuel"
    ],
    "d": "1 Samuel (1 Samuel 9\u201331)",
    "e": "1 Samuel records Saul's anointing, military victories, unlawful sacrifice, jealousy of David, and death on Mount Gilboa."
  },
  {
    "id": "bmpi_132",
    "t": "book_id",
    "p": "Which two Old Testament books serve primarily to stimulate and guide the holy worship and praises of God's covenant people?",
    "b": "PSA",
    "c": 1,
    "a": [
      "Psalms and Leviticus",
      "Leviticus and Psalms",
      "Psalms",
      "Leviticus"
    ],
    "d": "Psalms & Leviticus",
    "e": "Leviticus prescribes ceremonial worship while Psalms provides the hymnal and prayerbook of Israel."
  },
  {
    "id": "bmpi_133",
    "t": "book_id",
    "p": "Which book of the Pentateuch reviews Israel's 40-year wanderings and provides Moses' final covenant charges, blessings, and curses before Israel crosses into Canaan?",
    "b": "DEU",
    "c": 1,
    "a": [
      "Deuteronomy",
      "Deut",
      "Dt"
    ],
    "d": "Deuteronomy",
    "e": "Deuteronomy is Moses' covenant renewal sermon on the plains of Moab."
  },
  {
    "id": "bmpi_134",
    "t": "book_id",
    "p": "Which Old Testament books give firsthand accounts of Jewish life during the Babylonian/Persian exile or apocalyptic messages directed to exiles?",
    "b": "DAN",
    "c": 1,
    "a": [
      "Daniel, Esther, Ezekiel",
      "Daniel",
      "Esther",
      "Ezekiel"
    ],
    "d": "Daniel, Esther, Ezekiel",
    "e": "Ezekiel and Daniel ministered in Babylon while Esther lived in the Persian royal court of Susa."
  },
  {
    "id": "bmpi_135",
    "t": "book_id",
    "p": "Which two historical books treat in full detail the reign of King David, the establishment of Jerusalem as capital, and the Davidic Covenant?",
    "b": "2SA",
    "c": 1,
    "a": [
      "2 Samuel and 1 Chronicles",
      "2 Samuel & 1 Chronicles",
      "2 Samuel",
      "1 Chronicles"
    ],
    "d": "2 Samuel & 1 Chronicles",
    "e": "2 Samuel and 1 Chronicles focus on David's righteous kingship, military conquests, and temple preparations."
  },
  {
    "id": "bmpi_136",
    "t": "book_id",
    "p": "Which book of the Bible opens with Israel under severe Egyptian oppression 400 years after Joseph and concludes with God's glorious presence filling the newly built Tabernacle?",
    "b": "EXO",
    "c": 1,
    "a": [
      "Exodus",
      "Exo",
      "Ex"
    ],
    "d": "Exodus",
    "e": "Exodus spans from slavery in Egypt to the glory of Yahweh filling the completed Tabernacle (Exodus 40)."
  },
  {
    "id": "bmpi_137",
    "t": "book_id",
    "p": "Which poetic book contains 150 prayers and songs expressing total dependence upon God, personal lament, thanksgiving, and exuberant corporate worship?",
    "b": "PSA",
    "c": 1,
    "a": [
      "Psalms",
      "Psalm",
      "Psalter"
    ],
    "d": "Psalms",
    "e": "The Book of Psalms is the inspired collection of 150 liturgical songs and prayers."
  },
  {
    "id": "bmpi_138",
    "t": "book_id",
    "p": "Which Major Prophet experienced dramatic visions by the Chebar Canal in Babylon, warning of Jerusalem's fall (ch. 1\u201324) and concluding with future restoration, the dry bones vision, and the new temple (ch. 33\u201348)?",
    "b": "EZE",
    "c": 1,
    "a": [
      "Ezekiel",
      "Eze"
    ],
    "d": "Ezekiel",
    "e": "Ezekiel transitions from judgments on Jerusalem to glorious visions of Israel's national and spiritual rebirth."
  },
  {
    "id": "bmpi_139",
    "t": "book_id",
    "p": "In which prophetic book was the prophet commanded to marry an unfaithful woman named Gomer as a living visual parable of God's redeeming covenant love toward unfaithful Israel?",
    "b": "HOS",
    "c": 1,
    "a": [
      "Hosea",
      "Hos"
    ],
    "d": "Hosea",
    "e": "Hosea's marriage to Gomer symbolizes Yahweh's unfailing love and redemption of spiritual adulterers."
  },
  {
    "id": "bmpi_140",
    "t": "book_id",
    "p": "Which Minor Prophet used a catastrophic locust plague as a vivid forewarning of the imminent 'Day of the Lord' and prophesied the future outpouring of the Spirit on all flesh?",
    "b": "JOE",
    "c": 1,
    "a": [
      "Joel",
      "Joe"
    ],
    "d": "Joel",
    "e": "Joel 2:28\u201332 was famously quoted by Peter on the Day of Pentecost in Acts 2."
  },
  {
    "id": "bmpi_141",
    "t": "book_id",
    "p": "Which prophetic book was delivered by a herdsman and tender of sycamore figs from Tekoa, pronouncing divine judgment on Northern Israel for social injustice and empty ritualism?",
    "b": "AMO",
    "c": 1,
    "a": [
      "Amos",
      "Amo"
    ],
    "d": "Amos",
    "e": "Amos was a Judean layman called to roar like a lion against the decadent northern kingdom of Jeroboam II."
  },
  {
    "id": "bmpi_142",
    "t": "book_id",
    "p": "Which book combines historical court narratives of faith under pagan rule (fiery furnace, lions' den) with apocalyptic visions showing that the Most High rules the kingdom of men?",
    "b": "DAN",
    "c": 1,
    "a": [
      "Daniel",
      "Dan"
    ],
    "d": "Daniel",
    "e": "Daniel 1\u20136 records faithful living in exile while 7\u201312 foretells the rise and fall of world empires."
  },
  {
    "id": "bmpi_143",
    "t": "book_id",
    "p": "Which Old Testament Major Prophet is addressed by God as 'son of man' over 90 times throughout his prophetic book?",
    "b": "EZE",
    "c": 2,
    "a": [
      "Ezekiel",
      "Eze"
    ],
    "d": "Ezekiel (Ezekiel 2:1)",
    "e": "God consistently addresses Ezekiel as 'son of man' (ben-adam) emphasizing human frailty before divine majesty."
  },
  {
    "id": "bmpi_144",
    "t": "book_id",
    "p": "Which prophetic book highlights God's missionary compassion for Gentile nations through a reluctant prophet who was swallowed by a great fish after fleeing toward Tarshish?",
    "b": "JON",
    "c": 1,
    "a": [
      "Jonah",
      "Jon"
    ],
    "d": "Jonah",
    "e": "Jonah demonstrates that God's redeeming mercy extends even to ruthless pagan cities like Nineveh."
  },
  {
    "id": "bmpi_145",
    "t": "book_id",
    "p": "Which book of the Law contains the comprehensive legal and ceremonial regulations detailing how Israel was to maintain holiness in worship, diet, and community life?",
    "b": "LEV",
    "c": 1,
    "a": [
      "Leviticus",
      "Lev",
      "Lv"
    ],
    "d": "Leviticus",
    "e": "Leviticus provides the liturgical framework for living as God's set-apart, holy nation."
  },
  {
    "id": "bmpi_146",
    "t": "book_id",
    "p": "Which Old Testament wisdom book focuses primarily on horizontal human relationships, parenting, speech, work ethic, and financial prudence?",
    "b": "PRO",
    "c": 1,
    "a": [
      "Proverbs",
      "Prov",
      "Pr"
    ],
    "d": "Proverbs",
    "e": "The Book of Proverbs provides inspired practical wisdom for daily righteous living."
  },
  {
    "id": "bmpi_147",
    "t": "book_id",
    "p": "Which Minor Prophet from Moresheth was a contemporary of Isaiah who preached against urban exploitation and foretold the Messiah's birth in Bethlehem Ephrathah?",
    "b": "MIC",
    "c": 1,
    "a": [
      "Micah",
      "Mic"
    ],
    "d": "Micah",
    "e": "Micah ministered to rural Judah while Isaiah ministered in Jerusalem's royal court."
  },
  {
    "id": "bmpi_148",
    "t": "book_id",
    "p": "Which prophetic book is a poetic oracle announcing the certain, total destruction of Nineveh, the capital of the brutal Assyrian Empire?",
    "b": "NAH",
    "c": 1,
    "a": [
      "Nahum",
      "Nah"
    ],
    "d": "Nahum",
    "e": "Nahum prophesied the fall of Nineveh, which was fulfilled when the city fell in 612 BC."
  },
  {
    "id": "bmpi_149",
    "t": "book_id",
    "p": "Which post-exilic prophetic book consists of four messages delivered over four months in 520 BC, prodding Zerubbabel and Joshua to resume rebuilding the temple?",
    "b": "HAG",
    "c": 1,
    "a": [
      "Haggai",
      "Hag"
    ],
    "d": "Haggai",
    "e": "Haggai's concise messages successfully motivated the exiles to complete the second temple."
  },
  {
    "id": "bmpi_150",
    "t": "book_id",
    "p": "Which post-exilic prophetic book contains eight night visions (including the four horsemen and golden lampstand) alongside rich prophecies of the Messiah riding on a donkey?",
    "b": "ZEC",
    "c": 1,
    "a": [
      "Zechariah",
      "Zec"
    ],
    "d": "Zechariah",
    "e": "Zechariah provided apocalyptic encouragement to the post-exilic community and rich messianic detail."
  },
  {
    "id": "bmpi_151",
    "t": "book_id",
    "p": "Which prophetic book depicts a prophet's honest wrestling with apparent contradictions in God's justice, culminating in the declaration: 'the righteous shall live by his faith'?",
    "b": "HAB",
    "c": 2,
    "a": [
      "Habakkuk",
      "Hab"
    ],
    "d": "Habakkuk",
    "e": "Habakkuk moves from questioning God's ways to radiant faith on the heights."
  },
  {
    "id": "bmpi_152",
    "t": "book_id",
    "p": "Which post-exilic prophetic book addresses spiritual lethargy, corrupt priests, and marital infidelity approximately a century after the return, concluding with the promise of Elijah?",
    "b": "MAL",
    "c": 1,
    "a": [
      "Malachi",
      "Mal"
    ],
    "d": "Malachi",
    "e": "Malachi closes the Old Testament canon confronting spiritual apathy with disputation oracles."
  },
  {
    "id": "bmpi_153",
    "t": "book_id",
    "p": "Which apocalyptic New Testament book provides the climactic unveiling of Jesus Christ as the triumphant Lamb, reigning King, and Judge of the cosmos?",
    "b": "REV",
    "c": 1,
    "a": [
      "Revelation",
      "Rev",
      "Apocalypse"
    ],
    "d": "Revelation",
    "e": "Revelation provides the prophetic climax of redemptive history."
  },
  {
    "id": "bmpi_154",
    "t": "book_id",
    "p": "In which joyful prison epistle does Paul declare that the Christian life transcends adverse circumstances: 'Rejoice in the Lord always; again I will say, rejoice'?",
    "b": "PHP",
    "c": 4,
    "a": [
      "Philippians",
      "Phil",
      "Php"
    ],
    "d": "Philippians",
    "e": "Philippians radiates Christ-centered joy despite Roman imprisonment."
  },
  {
    "id": "bmpi_155",
    "t": "book_id",
    "p": "Which short letter urges believers to 'contend for the faith that was once for all delivered to the saints' against ungodly infiltrators?",
    "b": "JUD",
    "c": 1,
    "a": [
      "Jude",
      "Jud"
    ],
    "d": "Jude",
    "e": "Jude warns against apostates and urges building up believers in holy faith."
  },
  {
    "id": "bmpi_156",
    "t": "book_id",
    "p": "Which Gospel presents Jesus with rapid, action-oriented urgency as the tireless Servant of the Lord who came 'not to be served but to serve, and to give his life as a ransom for many'?",
    "b": "MRK",
    "c": 10,
    "a": [
      "Mark",
      "Gospel of Mark",
      "Mrk"
    ],
    "d": "Mark",
    "e": "Mark emphasizes the servanthood, authority, and suffering of Christ."
  },
  {
    "id": "bmpi_157",
    "t": "book_id",
    "p": "In which epistle does Paul systematically address severe congregational factions, lawsuits, sexual immorality, marriage, Christian liberty, the Lord's Supper, spiritual gifts, and the resurrection?",
    "b": "1CO",
    "c": 1,
    "a": [
      "1 Corinthians",
      "1 Cor",
      "First Corinthians"
    ],
    "d": "1 Corinthians",
    "e": "1 Corinthians applies the gospel of the cross to resolve practical church crises."
  },
  {
    "id": "bmpi_158",
    "t": "book_id",
    "p": "Which Gospel was written with the explicit purpose: 'these are written so that you may believe that Jesus is the Christ, the Son of God, and that by believing you may have life in his name'?",
    "b": "JHN",
    "c": 20,
    "a": [
      "John",
      "Gospel of John",
      "Jhn"
    ],
    "d": "John",
    "e": "John 20:30\u201331 states the evangelistic and theological purpose of the fourth Gospel."
  },
  {
    "id": "bmpi_159",
    "t": "book_id",
    "p": "Which moving final epistle was written by Paul from a cold Roman dungeon shortly before his execution, urging Timothy to 'fan into flame the gift of God' and 'preach the word'?",
    "b": "2TI",
    "c": 1,
    "a": [
      "2 Timothy",
      "2 Tim",
      "Second Timothy"
    ],
    "d": "2 Timothy",
    "e": "2 Timothy is Paul's last recorded apostolic testament and pastoral charge."
  },
  {
    "id": "bmpi_160",
    "t": "book_id",
    "p": "Which prison epistle exalts the absolute cosmic supremacy and all-sufficiency of Christ over hollow human philosophies, legalism, and mystical asceticism?",
    "b": "COL",
    "c": 1,
    "a": [
      "Colossians",
      "Col"
    ],
    "d": "Colossians",
    "e": "Colossians presents Christ as the image of the invisible God in whom all fullness dwells."
  },
  {
    "id": "bmpi_161",
    "t": "book_id",
    "p": "Which New Testament book traces the geographical and ethnic expansion of the Gospel from Jerusalem through Judea and Samaria to the ends of the earth?",
    "b": "ACT",
    "c": 1,
    "a": [
      "Acts",
      "Acts of the Apostles",
      "Act"
    ],
    "d": "Acts",
    "e": "Acts chronicles the unstoppable spread of the early church through the Holy Spirit."
  },
  {
    "id": "bmpi_162",
    "t": "book_id",
    "p": "In which intensely personal epistle does Paul defend his apostolic integrity, explain the glory of the New Covenant ministry, plead for the Jerusalem collection, and boast in his weaknesses?",
    "b": "2CO",
    "c": 1,
    "a": [
      "2 Corinthians",
      "2 Cor",
      "Second Corinthians"
    ],
    "d": "2 Corinthians",
    "e": "2 Corinthians reveals Paul's pastoral heart, vulnerability, and apostolic authority."
  },
  {
    "id": "bmpi_163",
    "t": "book_id",
    "p": "Which New Testament historical book provides the essential chronological and geographical framework for understanding the background of Paul's epistles?",
    "b": "ACT",
    "c": 13,
    "a": [
      "Acts",
      "Acts of the Apostles",
      "Act"
    ],
    "d": "Acts",
    "e": "Acts 13\u201328 records Paul's three missionary journeys and journey to Rome."
  },
  {
    "id": "bmpi_164",
    "t": "book_id",
    "p": "Which pastoral epistle was written to Timothy ministering at Ephesus, establishing qualifications for overseers and deacons and guiding conduct in the household of God?",
    "b": "1TI",
    "c": 3,
    "a": [
      "1 Timothy",
      "1 Tim",
      "First Timothy"
    ],
    "d": "1 Timothy",
    "e": "1 Timothy 3:15 provides the blueprint for order, sound doctrine, and godliness in the local church."
  },
  {
    "id": "bmpi_165",
    "t": "book_id",
    "p": "Which Gospel emphasizes Jesus' universal compassion for outcasts, the poor, women, and Samaritans, presenting Him as the Son of Man who came 'to seek and to save the lost'?",
    "b": "LUK",
    "c": 19,
    "a": [
      "Luke",
      "Gospel of Luke",
      "Luk"
    ],
    "d": "Luke",
    "e": "Luke 19:10 captures the central mission of Christ in Luke's Gospel."
  },
  {
    "id": "bmpi_166",
    "t": "book_id",
    "p": "Which brief personal epistle commends Gaius for his faithful hospitality to traveling missionaries and rebukes the arrogant, inhospitable Diotrephes?",
    "b": "3JN",
    "c": 1,
    "a": [
      "3 John",
      "3 Jn",
      "Third John"
    ],
    "d": "3 John",
    "e": "3 John commends supporting gospel workers as 'fellow workers for the truth.'"
  },
  {
    "id": "bmpi_167",
    "t": "book_id",
    "p": "In which fiery polemical epistle does Paul vigorously defend justification by faith alone apart from the works of the Law against Judaizing legalism?",
    "b": "GAL",
    "c": 1,
    "a": [
      "Galatians",
      "Gal"
    ],
    "d": "Galatians",
    "e": "Galatians is the Magna Carta of Christian liberty and justification by faith."
  },
  {
    "id": "bmpi_168",
    "t": "book_id",
    "p": "Which majestic epistle expounds the eternal mystery of the church as Christ's body and temple, urging believers to 'walk in a manner worthy of the calling to which you have been called'?",
    "b": "EPH",
    "c": 4,
    "a": [
      "Ephesians",
      "Eph"
    ],
    "d": "Ephesians",
    "e": "Ephesians connects cosmic theology with practical Christian walk in unity, purity, and warfare."
  },
  {
    "id": "bmpi_169",
    "t": "book_id",
    "p": "Which Gospel opens with the genealogy of Jesus tracing through David and Abraham, emphasizing Jesus as the long-awaited Messianic King who fulfills Old Testament prophecy?",
    "b": "MAT",
    "c": 1,
    "a": [
      "Matthew",
      "Gospel of Matthew",
      "Mat"
    ],
    "d": "Matthew",
    "e": "Matthew presents Jesus as the King of the Jews and authoritative interpreter of the Law."
  },
  {
    "id": "bmpi_170",
    "t": "book_id",
    "p": "Which brief epistle warns the 'elect lady' to walk in love and truth while refusing hospitality and welcome to deceptive antichrists who deny that Jesus came in the flesh?",
    "b": "2JN",
    "c": 1,
    "a": [
      "2 John",
      "2 Jn",
      "Second John"
    ],
    "d": "2 John",
    "e": "2 John balances loving Christian fellowship with uncompromising vigilance against false doctrine."
  },
  {
    "id": "bmpi_171",
    "t": "book_id",
    "p": "Which epistle was written to Jewish believers tempted to retreat into Judaism, demonstrating the supreme finality of Christ over angels, Moses, and the Levitical priesthood?",
    "b": "HEB",
    "c": 1,
    "a": [
      "Hebrews",
      "Heb"
    ],
    "d": "Hebrews",
    "e": "Hebrews presents Jesus as the ultimate High Priest and mediator of a better covenant."
  },
  {
    "id": "bmpi_172",
    "t": "book_id",
    "p": "Which masterpiece of Christian doctrine systematically unfolds the righteousness of God, universal condemnation, justification by grace, sanctification, election, and transformed living?",
    "b": "ROM",
    "c": 1,
    "a": [
      "Romans",
      "Rom"
    ],
    "d": "Romans",
    "e": "Romans is Paul's comprehensive theological exposition of the Gospel of God."
  },
  {
    "id": "bmpi_173",
    "t": "book_id",
    "p": "In which early epistle does Paul comfort believers regarding deceased saints, concluding every chapter with an explicit reference to the blessed hope of Christ's return?",
    "b": "1TH",
    "c": 1,
    "a": [
      "1 Thessalonians",
      "1 Thess",
      "First Thessalonians"
    ],
    "d": "1 Thessalonians",
    "e": "1 Thessalonians encourages holy living in light of the imminent return of Christ."
  },
  {
    "id": "bmpi_174",
    "t": "book_id",
    "p": "Which epistle corrects the error that the 'Day of the Lord' had already arrived, explaining that the rebellion and the revealing of the 'man of lawlessness' must occur first?",
    "b": "2TH",
    "c": 2,
    "a": [
      "2 Thessalonians",
      "2 Thess",
      "Second Thessalonians"
    ],
    "d": "2 Thessalonians",
    "e": "2 Thessalonians clarifies prophetic chronology regarding the antichrist and the second coming."
  },
  {
    "id": "bmpi_175",
    "t": "book_id",
    "p": "In which masterclass of Christian tact and persuasion does Paul appeal for the freedom and brotherhood of the runaway slave Onesimus?",
    "b": "PHM",
    "c": 1,
    "a": [
      "Philemon",
      "Phm"
    ],
    "d": "Philemon",
    "e": "Philemon demonstrates how the gospel transforms social and domestic relationships in Christ."
  },
  {
    "id": "bmpi_176",
    "t": "book_id",
    "p": "Which highly practical epistle acts as the 'Proverbs of the New Testament', testing genuine living faith through trials, speech, impartiality, and good works?",
    "b": "JAS",
    "c": 1,
    "a": [
      "James",
      "Jas"
    ],
    "d": "James",
    "e": "James insists that genuine faith without works is dead."
  },
  {
    "id": "bmpi_177",
    "t": "book_id",
    "p": "Which general epistle was written by Peter to 'elect exiles of the Dispersion' suffering persecution, calling them to steadfast hope, holy submission, and fiery trials?",
    "b": "1PE",
    "c": 1,
    "a": [
      "1 Peter",
      "1 Pet",
      "First Peter"
    ],
    "d": "1 Peter",
    "e": "1 Peter provides pastoral encouragement and theological grounding for Christian suffering."
  },
  {
    "id": "bmpi_178",
    "t": "book_id",
    "p": "Which epistle was written so that 'you who believe in the name of the Son of God... may know that you have eternal life' through the tests of righteousness, love, and sound doctrine?",
    "b": "1JN",
    "c": 5,
    "a": [
      "1 John",
      "1 Jn",
      "First John"
    ],
    "d": "1 John",
    "e": "1 John provides moral, relational, and doctrinal tests of genuine eternal life."
  },
  {
    "id": "bmpi_179",
    "t": "book_id",
    "p": "Which short epistle draws upon vivid Old Testament judgments (unbelieving generation in Egypt, fallen angels, Sodom and Gomorrah) to warn against corrupt false teachers?",
    "b": "JUD",
    "c": 1,
    "a": [
      "Jude",
      "Jud"
    ],
    "d": "Jude",
    "e": "Jude warns of divine judgment upon apostates who pervert God's grace into sensuality."
  },
  {
    "id": "bmpi_180",
    "t": "book_id",
    "p": "Which pastoral epistle instructs an apostolic representative in Crete to appoint elders of godly character, silence rebellious deceivers, and model sound doctrine in daily life?",
    "b": "TIT",
    "c": 1,
    "a": [
      "Titus",
      "Tit"
    ],
    "d": "Titus",
    "e": "Titus outlines healthy church structure, sound doctrine, and godly living in pagan Crete."
  },
  {
    "id": "bmpi_181",
    "t": "book_id",
    "p": "Which two biblical books (one Old Testament wisdom book, one New Testament general epistle) provide the most extensive theological treatments on the meaning and response to suffering?",
    "b": "JOB",
    "c": 1,
    "a": [
      "Job and 1 Peter",
      "Job & 1 Peter",
      "Job",
      "1 Peter"
    ],
    "d": "Job & 1 Peter",
    "e": "Job explores righteous suffering and sovereignty; 1 Peter provides pastoral theology for suffering in Christ."
  },
  {
    "id": "bmpi_182",
    "t": "book_id",
    "p": "Which three New Testament books provide the most profound Christological treatises establishing the full deity and supremacy of Jesus Christ?",
    "b": "JHN",
    "c": 1,
    "a": [
      "John, Colossians, Hebrews",
      "John",
      "Colossians",
      "Hebrews"
    ],
    "d": "John, Colossians, Hebrews",
    "e": "John 1, Colossians 1, and Hebrews 1 form the supreme New Testament triad on Christ's eternal deity."
  },
  {
    "id": "bmpi_183",
    "t": "book_id",
    "p": "Which three New Testament books provide extensive theological arguments developing the core doctrine of justification by faith apart from legalism?",
    "b": "ROM",
    "c": 3,
    "a": [
      "Romans, Galatians, Hebrews",
      "Romans",
      "Galatians",
      "Hebrews"
    ],
    "d": "Romans, Galatians, Hebrews",
    "e": "Romans, Galatians, and Hebrews expound salvation by faith alone in Christ's finished work."
  },
  {
    "id": "bmpi_184",
    "t": "book_id",
    "p": "Which two Pauline epistles are most intensely focused on doctrinal teaching and pastoral encouragement regarding the Second Coming of Christ and the Day of the Lord?",
    "b": "1TH",
    "c": 4,
    "a": [
      "1 Thessalonians and 2 Thessalonians",
      "1 & 2 Thessalonians",
      "1 Thessalonians",
      "2 Thessalonians"
    ],
    "d": "1 & 2 Thessalonians",
    "e": "1 and 2 Thessalonians provide detailed eschatological teaching on Christ's return and the man of lawlessness."
  },
  {
    "id": "bmpi_185",
    "t": "book_id",
    "p": "Which two general epistles share close thematic parallels in exposing, condemning, and guarding the church against dangerous false teachers and apostates?",
    "b": "2PE",
    "c": 2,
    "a": [
      "2 Peter and Jude",
      "2 Peter & Jude",
      "2 Peter",
      "Jude"
    ],
    "d": "2 Peter & Jude",
    "e": "2 Peter 2 and Jude share striking parallels warning against deceptive, sensual false teachers."
  },
  {
    "id": "bmpi_186",
    "t": "book_id",
    "p": "Which Gospel provides the most vivid historical and human details of Jesus' earthly life, including His birth in a manger, childhood growth in wisdom, and tears over Jerusalem?",
    "b": "LUK",
    "c": 2,
    "a": [
      "Luke",
      "Gospel of Luke",
      "Luk"
    ],
    "d": "Luke",
    "e": "Luke highlights the true humanity, compassion, and historical setting of the Son of Man."
  },
  {
    "id": "bmpi_187",
    "t": "book_id",
    "p": "Which Gospel contains the most exhaustive recorded treatment of Christ's Olivet Discourse on the end of the age and the final judgment (chapters 24\u201325)?",
    "b": "MAT",
    "c": 24,
    "a": [
      "Matthew",
      "Gospel of Matthew",
      "Mat"
    ],
    "d": "Matthew (Matthew 24\u201325)",
    "e": "Matthew 24\u201325 provides the longest account of the Olivet Discourse, parables of readiness, and the sheep/goats judgment."
  },
  {
    "id": "bmpi_188",
    "t": "book_id",
    "p": "Which one of the four Gospels contains no recorded narrative parables, focusing instead on seven public miraculous 'signs' and extended theological discourses?",
    "b": "JHN",
    "c": 1,
    "a": [
      "John",
      "Gospel of John",
      "Jhn"
    ],
    "d": "John",
    "e": "John contains no narrative parables, featuring instead miraculous signs and 'I AM' discourses."
  },
  {
    "id": "bmpi_189",
    "t": "book_id",
    "p": "In which epistle does Paul unfold the cosmic scope of the church as God's mystery to display His manifold wisdom to rulers and authorities in the heavenly realms?",
    "b": "EPH",
    "c": 3,
    "a": [
      "Ephesians",
      "Eph"
    ],
    "d": "Ephesians (Ephesians 3:10)",
    "e": "Ephesians 3:10 reveals the church as the theater of God's wisdom before celestial beings."
  },
  {
    "id": "bmpi_190",
    "t": "book_id",
    "p": "Which general epistle contains almost no explicit doctrinal discussion of the Holy Spirit, focusing instead on practical wisdom, ethical tests, and controlling the tongue?",
    "b": "JAS",
    "c": 1,
    "a": [
      "James",
      "Jas"
    ],
    "d": "James",
    "e": "James is distinctive for its intense ethical and practical focus with minimal pneumatological exposition."
  },
  {
    "id": "bmpi_191",
    "t": "book_id",
    "p": "In what book does Paul provide the foundational doctrinal exposition of the believer's spiritual union with Christ in His death, burial, and resurrection (chapter 6)?",
    "b": "ROM",
    "c": 6,
    "a": [
      "Romans",
      "Rom"
    ],
    "d": "Romans (Romans 6)",
    "e": "Romans 6 explains that union with Christ breaks the dominating power of sin in the believer's life."
  },
  {
    "id": "bmpi_192",
    "t": "book_id",
    "p": "In what New Testament book does Paul trace the universal doctrinal consequence of the Fall: 'just as sin came into the world through one man, and death through sin, and so death spread to all men'?",
    "b": "ROM",
    "c": 5,
    "a": [
      "Romans",
      "Rom"
    ],
    "d": "Romans (Romans 5:12)",
    "e": "Romans 5:12\u201321 contrasts the cosmic ruin in Adam with the abundant grace in Christ."
  },
  {
    "id": "bmpi_193",
    "t": "book_chapter",
    "p": "In what book & chapter is the foundational historical narrative of the Fall of mankind, the serpent's deception, and the original sin in Eden?",
    "b": "GEN",
    "c": 3,
    "a": [
      "Genesis 3",
      "Gen 3"
    ],
    "d": "Genesis 3",
    "e": "Genesis 3 records the historical entrance of sin, curse, and the first Gospel promise."
  },
  {
    "id": "bmpi_194",
    "t": "book_chapter",
    "p": "In what epistle does Paul write the most extensive two-chapter treatise on cheerful, sacrificial Christian stewardship and giving (chapters 8\u20139)?",
    "b": "2CO",
    "c": 8,
    "a": [
      "2 Corinthians",
      "2 Cor",
      "2 Corinthians 8-9"
    ],
    "d": "2 Corinthians (2 Corinthians 8\u20139)",
    "e": "2 Corinthians 8\u20139 presents the grace of giving modeled on Christ's self-giving love."
  },
  {
    "id": "bmpi_195",
    "t": "book_id",
    "p": "In what book of the Pentateuch did God give Moses exact divine blueprints to build the Tabernacle 'according to the pattern that was shown you on the mountain'?",
    "b": "EXO",
    "c": 25,
    "a": [
      "Exodus",
      "Exo",
      "Ex"
    ],
    "d": "Exodus (Exodus 25\u201331)",
    "e": "Exodus 25:40 records God's precise command for constructing the Tabernacle and its sacred furnishings."
  },
  {
    "id": "bmpi_196",
    "t": "book_id",
    "p": "Which New Testament book provides the most comprehensive typological exposition demonstrating how the Old Testament sacrificial system, priesthood, and sanctuary prefigured Christ?",
    "b": "HEB",
    "c": 8,
    "a": [
      "Hebrews",
      "Heb"
    ],
    "d": "Hebrews",
    "e": "Hebrews 8\u201310 demonstrates that the Levitical system was a shadow of the heavenly reality in Christ."
  },
  {
    "id": "bmpi_197",
    "t": "book_chapter",
    "p": "In what book & chapter does Paul write the famous hymn of agape love: 'Love is patient and kind; love does not envy or boast; it is not arrogant or rude'?",
    "b": "1CO",
    "c": 13,
    "a": [
      "1 Corinthians 13",
      "1 Cor 13",
      "1Cor 13"
    ],
    "d": "1 Corinthians 13",
    "e": "1 Corinthians 13 presents love as the supreme, enduring mark of Christian maturity."
  },
  {
    "id": "bmpi_198",
    "t": "book_id",
    "p": "Which Gospel places supreme emphasis on God as Father, using the title 'Father' over 100 times to describe Jesus' intimate relationship and the believer's adoption?",
    "b": "JHN",
    "c": 1,
    "a": [
      "John",
      "Gospel of John",
      "Jhn"
    ],
    "d": "John",
    "e": "John's Gospel emphasizes the Father's love, mission of the Son, and the fellowship of believers."
  },
  {
    "id": "bmpi_199",
    "t": "book_id",
    "p": "Which two apostolic epistles contain the classic foundational texts affirming the verbal inspiration and authority of Scripture ('All Scripture is breathed out by God' / 'men spoke from God as they were carried along by the Holy Spirit')?",
    "b": "2TI",
    "c": 3,
    "a": [
      "2 Timothy and 2 Peter",
      "2 Timothy & 2 Peter",
      "2 Timothy",
      "2 Peter"
    ],
    "d": "2 Timothy & 2 Peter (2 Timothy 3:16, 2 Peter 1:21)",
    "e": "2 Timothy 3:16 and 2 Peter 1:21 are the foundational pillars on the divine inspiration of Scripture."
  },
  {
    "id": "bmpi_200",
    "t": "book_id",
    "p": "Which two Pauline epistles contain explicit teaching on spiritual warfare against demonic rulers, principalities, and cosmic powers of darkness?",
    "b": "EPH",
    "c": 6,
    "a": [
      "Ephesians and Colossians",
      "Ephesians & Colossians",
      "Ephesians",
      "Colossians"
    ],
    "d": "Ephesians & Colossians (Ephesians 6, Colossians 2)",
    "e": "Ephesians 6:10\u201318 and Colossians 2:15 explain victory over cosmic spiritual powers through Christ."
  },
  {
    "id": "bmpi_201",
    "t": "book_id",
    "p": "In which two Pauline epistles would you find the most extensive theological exposition of justification by faith alone apart from the works of the Law?",
    "b": "ROM",
    "c": 3,
    "a": [
      "Romans and Galatians",
      "Romans & Galatians",
      "Romans",
      "Galatians"
    ],
    "d": "Romans & Galatians",
    "e": "Romans and Galatians establish that a sinner is declared righteous solely through faith in Jesus Christ."
  },
  {
    "id": "bmpi_202",
    "t": "book_id",
    "p": "In which general epistle does Peter explain God's design in allowing painful trials to refine our faith like gold tested by fire?",
    "b": "1PE",
    "c": 1,
    "a": [
      "1 Peter",
      "1 Pet",
      "First Peter"
    ],
    "d": "1 Peter (1 Peter 1:6\u20137)",
    "e": "1 Peter 1:6\u20137 teaches that temporary trials authenticate genuine faith resulting in praise at Christ's revelation."
  },
  {
    "id": "bmpi_203",
    "t": "book_chapter",
    "p": "In what book and chapters does Paul give the most extensive biblical instruction on the distribution, purpose, and orderly practice of spiritual gifts (spiritual gifts, the body, and prophecy/tongues)?",
    "b": "1CO",
    "c": 12,
    "a": [
      "1 Corinthians 12-14",
      "1 Corinthians 12",
      "1 Cor 12-14",
      "1 Cor 12"
    ],
    "d": "1 Corinthians 12\u201314",
    "e": "1 Corinthians 12\u201314 regulates spiritual gifts for the edification of the local church."
  },
  {
    "id": "bmpi_204",
    "t": "book_id",
    "p": "Which two pastoral epistles contain the detailed biblical qualifications for elders/overseers and deacons in the local church?",
    "b": "1TI",
    "c": 3,
    "a": [
      "1 Timothy and Titus",
      "1 Timothy & Titus",
      "1 Timothy",
      "Titus"
    ],
    "d": "1 Timothy & Titus (1 Timothy 3, Titus 1)",
    "e": "1 Timothy 3:1\u201313 and Titus 1:5\u20139 define the character qualifications for pastoral leadership."
  },
  {
    "id": "bmpi_205",
    "t": "book_id",
    "p": "Which New Testament book depicts the heavenly throne room with the Lamb looking as if it had been slain taking the seven-sealed scroll to execute cosmic judgment and redemption?",
    "b": "REV",
    "c": 5,
    "a": [
      "Revelation",
      "Rev",
      "Apocalypse"
    ],
    "d": "Revelation (Revelation 5)",
    "e": "Revelation 5 reveals the Lion of Judah, the slain Lamb, as the only One worthy to open the seals."
  },
  {
    "id": "bmpi_206",
    "t": "book_chapter",
    "p": "In what book & chapter is the famous 'Hall of Faith' reviewing the triumphant perseverance of Old Testament heroes from Abel to the prophets?",
    "b": "HEB",
    "c": 11,
    "a": [
      "Hebrews 11",
      "Heb 11"
    ],
    "d": "Hebrews 11",
    "e": "Hebrews 11 defines faith and showcases OT patriarchs and martyrs who persevered trusting God's promises."
  },
  {
    "id": "bmpi_207",
    "t": "book_chapter",
    "p": "In what book and three consecutive chapters does Paul address God's sovereign election, the hardening of ethnic Israel, and the future salvation of 'all Israel' (chapters 9\u201311)?",
    "b": "ROM",
    "c": 9,
    "a": [
      "Romans 9-11",
      "Romans 9",
      "Rom 9-11",
      "Rom 9"
    ],
    "d": "Romans 9\u201311",
    "e": "Romans 9\u201311 addresses sovereign grace, Israel's stumbling over Christ, and their future restoration."
  },
  {
    "id": "bmpi_208",
    "t": "book_id",
    "p": "In which epistle does John provide the profound theological declaration: 'God is love, and whoever abides in love abides in God, and God abides in him'?",
    "b": "1JN",
    "c": 4,
    "a": [
      "1 John",
      "1 Jn",
      "First John"
    ],
    "d": "1 John (1 John 4:8, 16)",
    "e": "1 John 4:8 and 16 define the very essence of God's character as holy, self-giving love."
  },
  {
    "id": "bmpi_209",
    "t": "book_chapter",
    "p": "In what book and chapters is the Sermon on the Mount (the Beatitudes, Lord's Prayer, and wise/foolish builders)?",
    "b": "MAT",
    "c": 5,
    "a": [
      "Matthew 5-7",
      "Matthew 5",
      "Mat 5-7",
      "Mat 5"
    ],
    "d": "Matthew 5\u20137",
    "e": "Matthew 5\u20137 is Jesus' manifesto on the character, ethics, and righteousness of the Kingdom of God."
  },
  {
    "id": "bmpi_210",
    "t": "book_chapter",
    "p": "In what book and chapters is Jesus' Upper Room Farewell Discourse and High Priestly Prayer (the True Vine, promise of the Holy Spirit, and prayer for unity)?",
    "b": "JHN",
    "c": 14,
    "a": [
      "John 14-17",
      "John 14",
      "Jhn 14-17",
      "Jhn 14"
    ],
    "d": "John 14\u201317",
    "e": "John 14\u201317 contains Jesus' intimate last discourse to the eleven and His prayer to the Father."
  },
  {
    "id": "bmpi_211",
    "t": "book_id",
    "p": "Which two Old Testament books contain explicit prophetic declarations of personal, bodily resurrection from the dead ('In my flesh I shall see God' / 'Many of those who sleep in the dust of the earth shall awake')?",
    "b": "JOB",
    "c": 19,
    "a": [
      "Job and Daniel",
      "Job & Daniel",
      "Job",
      "Daniel"
    ],
    "d": "Job & Daniel (Job 19:25\u201327, Daniel 12:2)",
    "e": "Job 19:25\u201327 and Daniel 12:2 provide clear Old Testament witnesses to bodily resurrection."
  },
  {
    "id": "bmpi_212",
    "t": "book_id",
    "p": "Which single New Testament book provides the most comprehensive prophetic narrative of the final triumph of Christ, the binding of Satan, the Millennium, and the New Jerusalem?",
    "b": "REV",
    "c": 1,
    "a": [
      "Revelation",
      "Rev",
      "Apocalypse"
    ],
    "d": "Revelation",
    "e": "The Book of Revelation is the capstone of prophetic revelation culminating in the new creation."
  },
  {
    "id": "bmpi_213",
    "t": "book_id",
    "p": "Which two Old Testament books explicitly name Satan by name as an adversary standing before the Lord (in the heavenly council against Job and against Joshua the high priest)?",
    "b": "JOB",
    "c": 1,
    "a": [
      "Job and Zechariah",
      "Job & Zechariah",
      "Job",
      "Zechariah"
    ],
    "d": "Job & Zechariah (Job 1\u20132, Zechariah 3:1)",
    "e": "Job 1\u20132 and Zechariah 3:1 explicitly portray the adversary (ha-Satan) accusing God's servants."
  },
  {
    "id": "bmpi_214",
    "t": "book_id",
    "p": "Which Old Testament Major Prophet had dramatic visions of the valley of dry bones coming to life and the glory of the Lord departing and returning to the temple?",
    "b": "EZE",
    "c": 37,
    "a": [
      "Ezekiel",
      "Eze"
    ],
    "d": "Ezekiel (Ezekiel 37)",
    "e": "Ezekiel 37 depicts the spiritual and national resurrection of Israel by the Spirit of God."
  },
  {
    "id": "bmpi_215",
    "t": "book_id",
    "p": "In which Gospel does Jesus tell Peter: 'Simon, Simon, behold, Satan demanded to have you, that he might sift you like wheat, but I have prayed for you that your faith may not fail'?",
    "b": "LUK",
    "c": 22,
    "a": [
      "Luke",
      "Gospel of Luke",
      "Luk"
    ],
    "d": "Luke (Luke 22:31\u201332)",
    "e": "Luke 22:31\u201332 records Jesus' pastoral intercession for Peter prior to his denial."
  },
  {
    "id": "bmpi_216",
    "t": "facts",
    "p": "Which boy king began reigning over Judah at age eight, purged idolatry throughout the land, and led nationwide covenant renewal when the Book of the Law was rediscovered in the temple?",
    "b": "2KI",
    "c": 22,
    "a": [
      "Josiah",
      "King Josiah"
    ],
    "d": "Josiah (2 Kings 22\u201323)",
    "e": "Josiah was the godly reformer king who turned to the Lord with all his heart, soul, and might."
  },
  {
    "id": "bmpi_217",
    "t": "facts",
    "p": "Which great king of Israel united the twelve tribes, conquered Jerusalem as capital, wrote numerous psalms, and is remembered as a 'man after God's own heart'?",
    "b": "2SA",
    "c": 5,
    "a": [
      "David",
      "King David"
    ],
    "d": "David",
    "e": "David established the United Kingdom and received the eternal Davidic Covenant (2 Samuel 7)."
  },
  {
    "id": "bmpi_218",
    "t": "facts",
    "p": "Which apostle was thoroughly trained in Jewish law under Gamaliel and equipped by God to be the primary apostle and theologian to the Gentile world?",
    "b": "ACT",
    "c": 22,
    "a": [
      "Paul",
      "Saul of Tarsus",
      "Apostle Paul"
    ],
    "d": "Paul",
    "e": "Paul used his rigorous rabbinic and Hellenistic background to contextualize theology across the Roman Empire."
  },
  {
    "id": "bmpi_219",
    "t": "facts",
    "p": "Which judge of Israel delivered his people from the Midianites with only 300 men blowing trumpets and holding torches in clay jars?",
    "b": "JDG",
    "c": 7,
    "a": [
      "Gideon",
      "Jerubbaal"
    ],
    "d": "Gideon (Judges 7)",
    "e": "Judges 7 records God trimming Gideon's army to 300 to show that deliverance belongs to the Lord."
  },
  {
    "id": "bmpi_220",
    "t": "facts",
    "p": "Which trusted apostolic coworker of Paul was sent to handle tough assignments in Corinth and was left in Crete to set church leadership in order?",
    "b": "TIT",
    "c": 1,
    "a": [
      "Titus"
    ],
    "d": "Titus",
    "e": "Titus was Paul's dependable trouble-shooter deployed to challenging ministry environments."
  },
  {
    "id": "bmpi_221",
    "t": "facts",
    "p": "Which beloved physician and faithful travel companion of Paul authored both the third Gospel and the Book of Acts?",
    "b": "COL",
    "c": 4,
    "a": [
      "Luke",
      "Dr. Luke",
      "Saint Luke"
    ],
    "d": "Luke",
    "e": "Luke's two-volume historical work (Luke\u2013Acts) comprises over 25% of the New Testament."
  },
  {
    "id": "bmpi_222",
    "t": "facts",
    "p": "Which king of Israel built the first magnificent temple in Jerusalem and was granted extraordinary wisdom by God, but had his heart led astray in old age by foreign wives?",
    "b": "1KI",
    "c": 3,
    "a": [
      "Solomon",
      "King Solomon",
      "Jedidiah"
    ],
    "d": "Solomon",
    "e": "1 Kings 3\u201311 records Solomon's unparalleled wisdom, temple construction, and tragic idolatry."
  },
  {
    "id": "bmpi_223",
    "t": "facts",
    "p": "Which godly king of Judah reopened and cleansed the temple, celebrated a grand national Passover, and trusted God when the Assyrian army under Sennacherib besieged Jerusalem?",
    "b": "2KI",
    "c": 18,
    "a": [
      "Hezekiah",
      "King Hezekiah"
    ],
    "d": "Hezekiah (2 Kings 18\u201320)",
    "e": "Hezekiah trusted in the Lord and was miraculously delivered when an angel struck 185,000 Assyrian soldiers."
  },
  {
    "id": "bmpi_224",
    "t": "facts",
    "p": "Which fisherman apostle confessed Jesus as 'the Christ, the Son of the living God', preached at Pentecost, and opened the door of the Gospel to Gentiles at Cornelius's house?",
    "b": "MAT",
    "c": 16,
    "a": [
      "Peter",
      "Simon Peter",
      "Cephas",
      "Simon"
    ],
    "d": "Peter (Simon Peter)",
    "e": "Peter was the leading spokesman of the twelve apostles in the Gospels and early Acts."
  },
  {
    "id": "bmpi_225",
    "t": "facts",
    "p": "Which faithful spy alongside Joshua wholly followed the Lord into old age and declared at age 85: 'Give me this hill country... the Lord will be with me, and I shall drive them out'?",
    "b": "JOS",
    "c": 14,
    "a": [
      "Caleb",
      "Caleb son of Jephunneh"
    ],
    "d": "Caleb (Joshua 14:12)",
    "e": "Joshua 14:6\u201315 celebrates Caleb's lifelong faith and inheritance of Hebron."
  },
  {
    "id": "bmpi_226",
    "t": "facts",
    "p": "Which godly high priest protected the infant Joash during Athaliah's bloody coup and later orchestrated his coronation as king of Judah?",
    "b": "2KI",
    "c": 11,
    "a": [
      "Jehoiada",
      "Jehoiada the priest"
    ],
    "d": "Jehoiada (2 Kings 11\u201312)",
    "e": "Jehoiada guided young King Joash in righteousness throughout his lifetime."
  },
  {
    "id": "bmpi_227",
    "t": "facts",
    "p": "Which patriarch was providentially sold into Egyptian slavery to preserve his family and the covenant line during a catastrophic seven-year famine?",
    "b": "GEN",
    "c": 45,
    "a": [
      "Joseph"
    ],
    "d": "Joseph (Genesis 45:5\u20138)",
    "e": "Genesis 45:5 records Joseph recognizing God's hand in preserving life in Egypt."
  },
  {
    "id": "bmpi_228",
    "t": "facts",
    "p": "Which Old Testament prophet stood on his watchtower to dialogue with God over apparent divine injustice, concluding with an act of resolute faith in Yahweh his strength?",
    "b": "HAB",
    "c": 2,
    "a": [
      "Habakkuk",
      "Hab"
    ],
    "d": "Habakkuk (Habakkuk 2\u20133)",
    "e": "Habakkuk's dialogue with God transitions from deep perplexity to triumphant worship."
  },
  {
    "id": "bmpi_229",
    "t": "facts",
    "p": "Which sensitive and weeping prophet faithfully ministered for over 40 years despite constant rejection, loneliness, mockery, and imprisonment in a muddy cistern?",
    "b": "JER",
    "c": 1,
    "a": [
      "Jeremiah",
      "Jer"
    ],
    "d": "Jeremiah",
    "e": "Jeremiah was called from the womb and sustained by God amidst relentless opposition."
  },
  {
    "id": "bmpi_230",
    "t": "facts",
    "p": "Which military and spiritual leader succeeded Moses, led Israel across the Jordan, and challenged the people in his farewell address: 'Choose this day whom you will serve... as for me and my house, we will serve the Lord'?",
    "b": "JOS",
    "c": 24,
    "a": [
      "Joshua",
      "Joshua son of Nun"
    ],
    "d": "Joshua (Joshua 24:15)",
    "e": "Joshua 24:15 is Joshua's famous covenant charge at Shechem."
  },
  {
    "id": "bmpi_231",
    "t": "facts",
    "p": "Which seer ministered at the royal court of David and offered David the choice of three divine punishments following the unlawful census?",
    "b": "2SA",
    "c": 24,
    "a": [
      "Gad",
      "Gad the seer"
    ],
    "d": "Gad (2 Samuel 24:11)",
    "e": "2 Samuel 24:11 identifies Gad as David's personal seer and court prophet."
  },
  {
    "id": "bmpi_232",
    "t": "facts",
    "p": "Which handsome son of David stole the hearts of Israel and launched a major rebellion against his father, forcing David to flee Jerusalem before being killed in the forest of Ephraim?",
    "b": "2SA",
    "c": 15,
    "a": [
      "Absalom"
    ],
    "d": "Absalom (2 Samuel 15\u201318)",
    "e": "2 Samuel 15\u201318 records Absalom's tragic insurrection against King David."
  },
  {
    "id": "bmpi_233",
    "t": "facts",
    "p": "Which prophetess and sister of Moses challenged his sole leadership authority and was struck temporarily with leprosy outside the camp?",
    "b": "NUM",
    "c": 12,
    "a": [
      "Miriam"
    ],
    "d": "Miriam (Numbers 12:1\u201315)",
    "e": "Numbers 12 records God defending Moses' meekness and chastening Miriam with leprosy."
  },
  {
    "id": "bmpi_234",
    "t": "facts",
    "p": "Who was the first king of Israel whose lack of integrity and unlawful sacrifice at Gilgal caused God to reject his dynasty?",
    "b": "1SA",
    "c": 13,
    "a": [
      "Saul",
      "King Saul",
      "Saul of Kish"
    ],
    "d": "Saul (1 Samuel 13\u201315)",
    "e": "1 Samuel 13 and 15 record King Saul's disobedience resulting in God tearing the kingdom from him."
  },
  {
    "id": "bmpi_235",
    "t": "facts",
    "p": "Which king of Judah began his reign with great spiritual reforms but finished poorly by imprisoning Hanani the seer and seeking physicians rather than the Lord when afflicted in his feet?",
    "b": "2CH",
    "c": 16,
    "a": [
      "Asa",
      "King Asa"
    ],
    "d": "Asa (2 Chronicles 14\u201316)",
    "e": "2 Chronicles 16:7\u201312 warns how King Asa failed to trust God in his later years."
  },
  {
    "id": "bmpi_236",
    "t": "facts",
    "p": "Which prophet and judge transitioned Israel from the period of the judges to the monarchy and is remembered for his powerful life of prayer and intercession?",
    "b": "1SA",
    "c": 7,
    "a": [
      "Samuel"
    ],
    "d": "Samuel",
    "e": "Samuel was the pivotal transition leader from theocracy to the Davidic kingdom."
  },
  {
    "id": "bmpi_237",
    "t": "facts",
    "p": "Which court prophet courageously confronted King David over his sin with Bathsheba and Uriah with the piercing words: 'You are the man!'?",
    "b": "2SA",
    "c": 12,
    "a": [
      "Nathan",
      "Nathan the prophet"
    ],
    "d": "Nathan (2 Samuel 12:7)",
    "e": "Nathan used a parable of a poor man's ewe lamb to convict David of his grievous sin."
  },
  {
    "id": "bmpi_238",
    "t": "facts",
    "p": "Which prophet called down fire from heaven on Mount Carmel in a dramatic power encounter with 450 prophets of Baal, and was later fed by ravens in the wilderness?",
    "b": "1KI",
    "c": 18,
    "a": [
      "Elijah",
      "Elijah the Tishbite"
    ],
    "d": "Elijah (1 Kings 17\u201319)",
    "e": "1 Kings 18 records Elijah's supernatural vindication of Yahweh as the one true God."
  },
  {
    "id": "bmpi_239",
    "t": "facts",
    "p": "Which patriarch received the covenant promise: 'in you all the families of the earth shall be blessed' and believed the Lord, and it was counted to him as righteousness?",
    "b": "GEN",
    "c": 12,
    "a": [
      "Abraham",
      "Abram"
    ],
    "d": "Abraham (Genesis 12:3, 15:6)",
    "e": "Genesis 12:1\u20133 and 15:6 establish Abraham as the father of all who believe."
  },
  {
    "id": "bmpi_240",
    "t": "facts",
    "p": "Which supreme Old Testament mediator and prophet spoke with God face to face 'as a man speaks to his friend' and led Israel out of Egyptian bondage?",
    "b": "EXO",
    "c": 33,
    "a": [
      "Moses"
    ],
    "d": "Moses (Exodus 33:11)",
    "e": "Exodus 33:11 and Deuteronomy 34:10 celebrate Moses' unique intimacy with God."
  },
  {
    "id": "bmpi_241",
    "t": "facts",
    "p": "Which scribe and priest 'set his heart to study the Law of the Lord, and to do it and to teach his statutes and rules in Israel'?",
    "b": "EZR",
    "c": 7,
    "a": [
      "Ezra",
      "Ezra the scribe",
      "Ezra the priest"
    ],
    "d": "Ezra (Ezra 7:10)",
    "e": "Ezra 7:10 is the classic model of personal study, obedience, and exposition of Scripture."
  },
  {
    "id": "bmpi_242",
    "t": "facts",
    "p": "Which powerful king of Judah became proud after great military success and entered the temple to burn incense unlawfully, being struck with leprosy on his forehead?",
    "b": "2CH",
    "c": 26,
    "a": [
      "Uzziah",
      "King Uzziah",
      "Azariah"
    ],
    "d": "Uzziah (2 Chronicles 26:16\u201321)",
    "e": "2 Chronicles 26:16 warns that when Uzziah became strong, his heart was lifted up to his destruction."
  },
  {
    "id": "bmpi_243",
    "t": "facts",
    "p": "Which female judge and prophetess of Israel held court under a palm tree and inspired Barak to lead 10,000 men to defeat the Canaanite commander Sisera?",
    "b": "JDG",
    "c": 4,
    "a": [
      "Deborah"
    ],
    "d": "Deborah (Judges 4\u20135)",
    "e": "Judges 4\u20135 celebrates Deborah as a mother in Israel and victorious judge."
  },
  {
    "id": "bmpi_244",
    "t": "facts",
    "p": "Which prophet stood alone before King Ahab and King Jehoshaphat, faithfully prophesying Ahab's death in battle despite 400 court prophets lying to them?",
    "b": "1KI",
    "c": 22,
    "a": [
      "Micaiah",
      "Micaiah son of Imlah"
    ],
    "d": "Micaiah (1 Kings 22)",
    "e": "1 Kings 22:14: Micaiah declared: 'What the Lord says to me, that the will I speak.'"
  },
  {
    "id": "bmpi_245",
    "t": "facts",
    "p": "Which prophet prophesied during the reigns of Josiah, Jehoiakim, and Zedekiah, enduring the stocks, mockery, and imprisonment while predicting the 70-year Babylonian exile?",
    "b": "JER",
    "c": 1,
    "a": [
      "Jeremiah",
      "Jer"
    ],
    "d": "Jeremiah (Jeremiah 25:11)",
    "e": "Jeremiah faithfully delivered God's unpopular message of surrender to Babylon."
  },
  {
    "id": "bmpi_246",
    "t": "facts",
    "p": "Which Jewish queen in the Persian empire displayed courage by approaching King Ahasuerus uninvited, saving her people from Haman's genocidal plot?",
    "b": "EST",
    "c": 4,
    "a": [
      "Esther",
      "Queen Esther",
      "Hadassah"
    ],
    "d": "Esther (Esther 4\u20137)",
    "e": "Esther's heroic intervention led to the deliverance of the Jews and the feast of Purim."
  },
  {
    "id": "bmpi_247",
    "t": "facts",
    "p": "Which generous Levite from Cyprus, named 'Son of Encouragement', vouched for Saul in Jerusalem and recruited him to teach the flourishing multicultural church in Antioch?",
    "b": "ACT",
    "c": 4,
    "a": [
      "Barnabas",
      "Joseph of Cyprus"
    ],
    "d": "Barnabas (Acts 4:36, 11:22\u201326)",
    "e": "Acts 11:24 describes Barnabas as a good man full of the Holy Spirit and of faith."
  },
  {
    "id": "bmpi_248",
    "t": "facts",
    "p": "Which leader invested deeply in twelve disciples during a three-year earthly ministry, launching a global movement that transformed human history?",
    "b": "MAT",
    "c": 10,
    "a": [
      "Jesus",
      "Jesus Christ",
      "Christ"
    ],
    "d": "Jesus (Jesus Christ)",
    "e": "Jesus Christ modeled discipling a core group to carry out the Great Commission."
  },
  {
    "id": "bmpi_249",
    "t": "facts",
    "p": "Which post-exilic prophet delivered four piercing messages in 520 BC challenging the remnant: 'Consider your ways!' and motivating them to rebuild the temple?",
    "b": "HAG",
    "c": 1,
    "a": [
      "Haggai",
      "Hag"
    ],
    "d": "Haggai (Haggai 1:5\u20138)",
    "e": "Haggai's prophetic ministry ignited the completion of the second temple."
  },
  {
    "id": "bmpi_250",
    "t": "facts",
    "p": "Which aged statesman studied Jeremiah's prophecies in Babylon, calculated that the 70 years of exile were near completion, and prayed a passionate prayer of confession in chapter 9?",
    "b": "DAN",
    "c": 9,
    "a": [
      "Daniel"
    ],
    "d": "Daniel (Daniel 9:1\u20133)",
    "e": "Daniel 9:2 records Daniel studying Jeremiah's scrolls and interceding for Jerusalem's restoration."
  },
  {
    "id": "bmpi_251",
    "t": "facts",
    "p": "Which cupbearer to the Persian king prayed continually during crises, mobilized ordinary families to rebuild Jerusalem's walls, and instituted economic reforms for the poor?",
    "b": "NEH",
    "c": 1,
    "a": [
      "Nehemiah"
    ],
    "d": "Nehemiah (Nehemiah 1\u20136)",
    "e": "Nehemiah combined dependent prayer with brilliant organizational and defensive strategy."
  },
  {
    "id": "bmpi_252",
    "t": "facts",
    "p": "Which 'beloved disciple' reclined next to Jesus at the Last Supper and in his old age was exiled to Patmos, receiving the apocalyptic vision of Revelation?",
    "b": "REV",
    "c": 1,
    "a": [
      "John",
      "Apostle John",
      "Saint John"
    ],
    "d": "John (Apostle John)",
    "e": "John authored the fourth Gospel, three epistles, and the Apocalypse."
  },
  {
    "id": "bmpi_253",
    "t": "facts",
    "p": "Which apostle planted local churches across Galatia, Macedonia, Achaia, and Asia Minor, declaring: 'I press on toward the goal for the prize of the upward call of God in Christ Jesus'?",
    "b": "PHP",
    "c": 3,
    "a": [
      "Paul",
      "Apostle Paul",
      "Saul of Tarsus"
    ],
    "d": "Paul (Apostle Paul)",
    "e": "Paul was the primary pioneer missionary and theologian of the New Testament church."
  },
  {
    "id": "bmpi_254",
    "t": "facts",
    "p": "Which godly ministry couple hosted house churches in Corinth, Ephesus, and Rome, and privately explained the way of God more accurately to the eloquent Apollos?",
    "b": "ACT",
    "c": 18,
    "a": [
      "Priscilla and Aquila",
      "Priscilla & Aquila",
      "Aquila and Priscilla",
      "Prisca and Aquila"
    ],
    "d": "Priscilla & Aquila (Acts 18:24\u201326)",
    "e": "Acts 18:26 shows Priscilla and Aquila mentoring Apollos in sound doctrine."
  },
  {
    "id": "bmpi_255",
    "t": "facts",
    "p": "Which prophet and leader from Jerusalem accompanied Paul on his second missionary journey and sang hymns at midnight in the Philippian jail?",
    "b": "ACT",
    "c": 15,
    "a": [
      "Silas",
      "Silvanus"
    ],
    "d": "Silas (Silvanus) (Acts 15:40, 16:25)",
    "e": "Acts 16:25 records Paul and Silas praying and singing hymns in prison."
  },
  {
    "id": "bmpi_256",
    "t": "facts",
    "p": "Which godly deaconess and servant of the church at Cenchreae was commended by Paul in Romans 16 as a patron of many and the trusted courier of the Epistle to the Romans?",
    "b": "ROM",
    "c": 16,
    "a": [
      "Phoebe"
    ],
    "d": "Phoebe (Romans 16:1\u20132)",
    "e": "Romans 16:1\u20132 commends Phoebe as a servant (diakonos) and patron (prostatis)."
  },
  {
    "id": "bmpi_257",
    "t": "facts",
    "p": "Which silversmith in Ephesus stirred up a citywide riot against Paul because the Gospel was destroying the lucrative trade in silver shrines of Artemis?",
    "b": "ACT",
    "c": 19,
    "a": [
      "Demetrius"
    ],
    "d": "Demetrius (Acts 19:24\u201329)",
    "e": "Acts 19:24 records Demetrius inciting the silversmiths against Paul's preaching."
  },
  {
    "id": "bmpi_258",
    "t": "facts",
    "p": "Which eloquent Jewish believer from Alexandria was mighty in the scriptures and vigorously refuted Jewish opponents in public, showing from Scripture that Jesus was the Christ?",
    "b": "ACT",
    "c": 18,
    "a": [
      "Apollos"
    ],
    "d": "Apollos (Acts 18:24\u201328)",
    "e": "Acts 18:24\u201328 highlights Apollos's powerful evangelistic and apologetic preaching."
  },
  {
    "id": "bmpi_259",
    "t": "facts",
    "p": "Which patriarch demonstrated supreme obedience on Mount Moriah by trusting that God was able to raise his son Isaac even from the dead?",
    "b": "GEN",
    "c": 22,
    "a": [
      "Abraham",
      "Abram"
    ],
    "d": "Abraham (Genesis 22, Hebrews 11:17\u201319)",
    "e": "Genesis 22:1\u201314 records the testing of Abraham and God providing the ram in the thicket."
  },
  {
    "id": "bmpi_260",
    "t": "facts",
    "p": "Which former coworker of Paul deserted him during his final imprisonment in Rome because he was 'in love with this present world'?",
    "b": "2TI",
    "c": 4,
    "a": [
      "Demas"
    ],
    "d": "Demas (2 Timothy 4:10)",
    "e": "2 Timothy 4:10 mourns Demas deserting Paul and going to Thessalonica."
  },
  {
    "id": "bmpi_261",
    "t": "facts",
    "p": "Which young man in Troas fell asleep during Paul's prolonged midnight sermon, plunged from a third-story window to his death, and was miraculously raised to life by Paul?",
    "b": "ACT",
    "c": 20,
    "a": [
      "Eutychus"
    ],
    "d": "Eutychus (Acts 20:9\u201312)",
    "e": "Acts 20:9\u201312 records Paul raising Eutychus from the dead."
  },
  {
    "id": "bmpi_262",
    "t": "facts",
    "p": "Which businesswoman and seller of purple goods from Thyatira had her heart opened by the Lord at Philippi, becoming the first recorded European convert to Christianity?",
    "b": "ACT",
    "c": 16,
    "a": [
      "Lydia"
    ],
    "d": "Lydia (Acts 16:14\u201315)",
    "e": "Acts 16:14 records the Lord opening Lydia's heart to heed Paul's message."
  },
  {
    "id": "bmpi_263",
    "t": "facts",
    "p": "Which Christian woman is greeted as 'our sister' in the opening of the Epistle to Philemon, likely Philemon's wife and hostess of the Colossian house church?",
    "b": "PHM",
    "c": 1,
    "a": [
      "Apphia"
    ],
    "d": "Apphia (Philemon 1:2)",
    "e": "Philemon 1:2 greets Philemon, Apphia our sister, and Archippus our fellow soldier."
  },
  {
    "id": "bmpi_264",
    "t": "facts",
    "p": "Which metal craftsman did Paul warn Timothy about in his last letter, stating: 'Alexander the coppersmith did me great harm; the Lord will repay him according to his deeds'?",
    "b": "2TI",
    "c": 4,
    "a": [
      "Alexander",
      "Alexander the coppersmith"
    ],
    "d": "Alexander the coppersmith (2 Timothy 4:14)",
    "e": "2 Timothy 4:14\u201315 warns Timothy to beware of Alexander's fierce opposition to sound teaching."
  },
  {
    "id": "bmpi_265",
    "t": "facts",
    "p": "Which son of Aaron was invested with the high priestly garments on Mount Hor and served alongside Joshua in dividing the Promised Land by lot?",
    "b": "NUM",
    "c": 20,
    "a": [
      "Eleazar",
      "Eleazar the priest"
    ],
    "d": "Eleazar (Numbers 20:26\u201328, Joshua 14:1)",
    "e": "Eleazar succeeded Aaron as High Priest throughout the conquest and settlement."
  },
  {
    "id": "bmpi_266",
    "t": "facts",
    "p": "Which wealthy Christian citizen of Colossae hosted a house church and received Paul's personal letter pleading for the reconciliation of his runaway slave Onesimus?",
    "b": "PHM",
    "c": 1,
    "a": [
      "Philemon"
    ],
    "d": "Philemon (Philemon 1:1\u20132)",
    "e": "Philemon hosted the Colossian congregation in his household."
  },
  {
    "id": "bmpi_267",
    "t": "facts",
    "p": "Which young apostolic coworker is the only contemporary leader explicitly named at the conclusion of the Epistle to the Hebrews: 'our brother Timothy has been released'?",
    "b": "HEB",
    "c": 13,
    "a": [
      "Timothy"
    ],
    "d": "Timothy (Hebrews 13:23)",
    "e": "Hebrews 13:23 mentions Timothy's recent release from imprisonment."
  },
  {
    "id": "bmpi_268",
    "t": "facts",
    "p": "Which two men does Paul name in 1 Timothy as examples of those who rejected a good conscience and shipwrecked their faith, whom Paul handed over to Satan to learn not to blaspheme?",
    "b": "1TI",
    "c": 1,
    "a": [
      "Hymenaeus and Alexander",
      "Hymenaeus & Alexander",
      "Hymenaeus",
      "Alexander"
    ],
    "d": "Hymenaeus and Alexander (1 Timothy 1:19\u201320)",
    "e": "1 Timothy 1:20 records apostolic discipline against Hymenaeus and Alexander."
  },
  {
    "id": "bmpi_269",
    "t": "facts",
    "p": "Which young cousin of Barnabas deserted the first missionary journey at Perga, caused a sharp disagreement between Paul and Barnabas, but was later commended by Paul as 'very useful to me for ministry'?",
    "b": "2TI",
    "c": 4,
    "a": [
      "John Mark",
      "Mark"
    ],
    "d": "John Mark (Acts 15:37\u201339, 2 Timothy 4:11)",
    "e": "2 Timothy 4:11 marks the full restoration of Mark as Paul's valued coworker and author of the second Gospel."
  },
  {
    "id": "bmpi_270",
    "t": "facts",
    "p": "Which faithful missionary brother served as coworker to Paul and later as amanuensis/courier for Peter's first epistle ('By Silvanus, a faithful brother as I regard him, I have written briefly to you')?",
    "b": "1PE",
    "c": 5,
    "a": [
      "Silvanus",
      "Silas"
    ],
    "d": "Silvanus (Silas) (1 Peter 5:12)",
    "e": "1 Peter 5:12 acknowledges Silvanus in the composition and transmission of 1 Peter."
  },
  {
    "id": "bmpi_271",
    "t": "facts",
    "p": "Which prophet served as Elijah's attendant, asked for a double portion of his spirit at the Jordan River, and performed twice as many recorded miracles across Northern Israel?",
    "b": "2KI",
    "c": 2,
    "a": [
      "Elisha",
      "Elisha son of Shaphat"
    ],
    "d": "Elisha (2 Kings 2:9\u201315)",
    "e": "Elisha succeeded Elijah with a miraculous ministry of pastoral compassion and prophetic power."
  },
  {
    "id": "bmpi_272",
    "t": "facts",
    "p": "Which prophet's autobiographical book candidly recounts his own nationalistic prejudice, anger at God's mercy to Nineveh, and God's object lesson through a sheltering plant and a worm?",
    "b": "JON",
    "c": 4,
    "a": [
      "Jonah",
      "Jonah son of Amittai"
    ],
    "d": "Jonah (Jonah 4)",
    "e": "Jonah 4 contrasts Jonah's bitter exclusivity with Yahweh's boundless compassion."
  },
  {
    "id": "bmpi_273",
    "t": "facts",
    "p": "Which apostle is the only contemporary leader referred to by Peter in 2 Peter: 'count the patience of our Lord as salvation, just as our beloved brother Paul also wrote to you according to the wisdom given him'?",
    "b": "2PE",
    "c": 3,
    "a": [
      "Paul",
      "Apostle Paul"
    ],
    "d": "Paul (2 Peter 3:15\u201316)",
    "e": "2 Peter 3:15\u201316 equates Paul's letters with the rest of inspired Scripture."
  },
  {
    "id": "bmpi_274",
    "t": "facts",
    "p": "Which Gentile author investigated eyewitness accounts from the beginning and wrote an orderly narrative so that Theophilus might have certainty concerning what he had been taught?",
    "b": "LUK",
    "c": 1,
    "a": [
      "Luke",
      "Dr. Luke",
      "Saint Luke"
    ],
    "d": "Luke (Luke 1:1\u20134)",
    "e": "Luke's historical prologue establishes the rigorous historical basis of the Gospel."
  },
  {
    "id": "bmpi_275",
    "t": "facts",
    "p": "Which elderly high priest at Shiloh failed to discipline his blasphemous sons Hophni and Phinehas, resulting in his sons dying in battle, the Ark being captured, and his own sudden death?",
    "b": "1SA",
    "c": 4,
    "a": [
      "Eli",
      "Eli the priest"
    ],
    "d": "Eli (1 Samuel 2:27\u201336, 4:18)",
    "e": "1 Samuel 4:18 records the tragic death of Eli upon hearing that the Ark of God was captured."
  },
  {
    "id": "bmpi_276",
    "t": "facts",
    "p": "Which righteous king of Judah established judges throughout the fortified cities of Judah but was rebuked by the prophet Jehu for making an ungodly military alliance with wicked King Ahab of Israel?",
    "b": "2CH",
    "c": 19,
    "a": [
      "Jehoshaphat",
      "King Jehoshaphat"
    ],
    "d": "Jehoshaphat (2 Chronicles 19:1\u20133)",
    "e": "2 Chronicles 19:2: 'Should you help the wicked and love those who hate the Lord?'"
  },
  {
    "id": "bmpi_277",
    "t": "facts",
    "p": "Which young coworker of Paul was prone to timidity and stomach ailments, prompting Paul to encourage him: 'God gave us a spirit not of fear but of power and love and self-control'?",
    "b": "2TI",
    "c": 1,
    "a": [
      "Timothy"
    ],
    "d": "Timothy (2 Timothy 1:7)",
    "e": "2 Timothy 1:7 encouraged young Timothy in his pastoral calling amidst persecution."
  },
  {
    "id": "bmpi_278",
    "t": "facts",
    "p": "Which Colossian believer was urged by Paul: 'if he has wronged you at all, or owes you anything, charge that to my account. I, Paul, write this with my own hand: I will repay it'?",
    "b": "PHM",
    "c": 1,
    "a": [
      "Philemon"
    ],
    "d": "Philemon (Philemon 1:18\u201319)",
    "e": "Paul beautifully models Christ's substitutionary imputation in his plea to Philemon."
  },
  {
    "id": "bmpi_279",
    "t": "facts",
    "p": "Which apostle, the brother of John and son of Zebedee, was the first of the twelve apostles to be martyred when King Herod Agrippa I executed him with the sword?",
    "b": "ACT",
    "c": 12,
    "a": [
      "James",
      "James son of Zebedee",
      "James the brother of John"
    ],
    "d": "James (son of Zebedee) (Acts 12:2)",
    "e": "Acts 12:2 records Herod Agrippa I executing James with the sword in Jerusalem."
  },
  {
    "id": "bmpi_280",
    "t": "facts",
    "p": "Which post-exilic prophet confronted the returned remnant for offering blemished sacrifices, withholding tithes, and committing widespread divorce, promising that God would send His messenger to prepare the way?",
    "b": "MAL",
    "c": 1,
    "a": [
      "Malachi",
      "Mal"
    ],
    "d": "Malachi (Malachi 1\u20133)",
    "e": "Malachi addressed the spiritual lethargy and nominalism of the post-exilic community."
  },
  {
    "id": "bmpi_281",
    "t": "book_id",
    "p": "In which Old Testament narrative does Boaz act as the righteous 'kinsman-redeemer' (goel) for Ruth and Naomi, concluding with the genealogy of King David?",
    "b": "RUT",
    "c": 4,
    "a": [
      "Ruth",
      "Rut"
    ],
    "d": "Ruth (Ruth 4)",
    "e": "Ruth 4:18\u201322 connects Boaz and Ruth to the messianic royal line of David and Jesus."
  },
  {
    "id": "bmpi_282",
    "t": "book_id",
    "p": "Which wisdom book attributed to Solomon in his mature years warns against cynical secularism by demonstrating that all earthly pursuits 'under the sun' are vanity without God?",
    "b": "ECC",
    "c": 1,
    "a": [
      "Ecclesiastes",
      "Eccl",
      "Qoheleth"
    ],
    "d": "Ecclesiastes",
    "e": "Ecclesiastes explores life 'under the sun' pointing toward eternal accountability."
  },
  {
    "id": "bmpi_283",
    "t": "book_id",
    "p": "In which single-chapter Old Testament prophetic book does God pronounce total destruction on Edom for gloating and violence against their brother Jacob during Jerusalem's fall?",
    "b": "OBA",
    "c": 1,
    "a": [
      "Obadiah",
      "Oba"
    ],
    "d": "Obadiah",
    "e": "Obadiah is a 21-verse prophecy of divine retribution against the pride of Edom."
  },
  {
    "id": "bmpi_284",
    "t": "book_id",
    "p": "Which Minor Prophet during the reign of King Josiah repeatedly uses 'the Day of the Lord' as a major theme warning of universal judgment and concluding with God rejoicing over His remnant with singing?",
    "b": "ZEP",
    "c": 1,
    "a": [
      "Zephaniah",
      "Zep"
    ],
    "d": "Zephaniah",
    "e": "Zephaniah 3:17: 'The Lord your God is in your midst... he will exult over you with loud singing.'"
  },
  {
    "id": "bmpi_285",
    "t": "book_chapter",
    "p": "In what book & chapter does the ironic admonition appear: 'Rejoice, O young man, in your youth... but know that for all these things God will bring you into judgment'?",
    "b": "ECC",
    "c": 11,
    "a": [
      "Ecclesiastes 11",
      "Eccl 11"
    ],
    "d": "Ecclesiastes 11 (Ecclesiastes 11:9)",
    "e": "Ecclesiastes 11:9 warns young people to live in joyous yet accountable awareness of God's judgment."
  },
  {
    "id": "bmpi_286",
    "t": "book_id",
    "p": "Which Minor Prophet opens with God declaring: 'I will utterly sweep away everything from the face of the earth' and urges: 'Seek the Lord, all you humble of the land... seek righteousness; seek humility'?",
    "b": "ZEP",
    "c": 2,
    "a": [
      "Zephaniah",
      "Zep"
    ],
    "d": "Zephaniah (Zephaniah 1:2, 2:3)",
    "e": "Zephaniah proclaims both catastrophic global judgment and the preservation of a humble remnant."
  },
  {
    "id": "bmpi_287",
    "t": "book_chapter",
    "p": "In what book & chapter does the grand conclusion appear: 'The end of the matter; all has been heard. Fear God and keep his commandments, for this is the whole duty of man'?",
    "b": "ECC",
    "c": 12,
    "a": [
      "Ecclesiastes 12",
      "Eccl 12"
    ],
    "d": "Ecclesiastes 12 (Ecclesiastes 12:13)",
    "e": "Ecclesiastes 12:13 resolves the search for life's ultimate meaning in reverent obedience to God."
  },
  {
    "id": "bmpi_288",
    "t": "book_id",
    "p": "Which prophetic book opens: 'The Lord is a jealous and avenging God... slow to anger and great in power, and the Lord will by no means clear the guilty', predicting the overthrow of Nineveh?",
    "b": "NAH",
    "c": 1,
    "a": [
      "Nahum",
      "Nah"
    ],
    "d": "Nahum (Nahum 1:2\u20133)",
    "e": "Nahum proclaims divine vengeance against oppressive, bloodthirsty Nineveh."
  },
  {
    "id": "bmpi_289",
    "t": "book_chapter",
    "p": "In what epistle & chapter does Paul enforce the work ethic rule: 'If anyone is not willing to work, let him not eat'?",
    "b": "2TH",
    "c": 3,
    "a": [
      "2 Thessalonians 3",
      "2 Thess 3",
      "2Thess 3"
    ],
    "d": "2 Thessalonians 3 (2 Thessalonians 3:10)",
    "e": "2 Thessalonians 3:10 rebukes idleness caused by misguided eschatological fanaticism."
  },
  {
    "id": "bmpi_290",
    "t": "book_id",
    "p": "Which Pauline epistle concludes every one of its five chapters with a direct reference to the second coming of Jesus Christ?",
    "b": "1TH",
    "c": 1,
    "a": [
      "1 Thessalonians",
      "1 Thess",
      "First Thessalonians"
    ],
    "d": "1 Thessalonians",
    "e": "1 Thessalonians 1:10, 2:19, 3:13, 4:16\u201317, 5:23 all spotlight the return of Christ."
  },
  {
    "id": "bmpi_291",
    "t": "book_chapter",
    "p": "In what epistle & chapter does Paul give the rapid-fire commands: 'Do not quench the Spirit. Do not despise prophecies, but test everything; hold fast what is good'?",
    "b": "1TH",
    "c": 5,
    "a": [
      "1 Thessalonians 5",
      "1 Thess 5",
      "1Thess 5"
    ],
    "d": "1 Thessalonians 5 (1 Thessalonians 5:19\u201321)",
    "e": "1 Thessalonians 5:19\u201321 balances openness to the Spirit's work with rigorous discernment."
  },
  {
    "id": "bmpi_292",
    "t": "book_chapter",
    "p": "In what book & chapter does the closing universal invitation of Scripture appear: 'The Spirit and the Bride say, \"Come.\" And let the one who hears say, \"Come.\" And let the one who is thirsty come; let the one who desires take the water of life without price'?",
    "b": "REV",
    "c": 22,
    "a": [
      "Revelation 22",
      "Rev 22"
    ],
    "d": "Revelation 22 (Revelation 22:17)",
    "e": "Revelation 22:17 is the final gospel invitation of the biblical canon."
  },
  {
    "id": "bmpi_293",
    "t": "book_chapter",
    "p": "In what epistle & chapter does John provide the reassuring promise of cleansing: 'If we confess our sins, he is faithful and just to forgive us our sins and to cleanse us from all unrighteousness'?",
    "b": "1JN",
    "c": 1,
    "a": [
      "1 John 1",
      "1 Jn 1",
      "1John 1"
    ],
    "d": "1 John 1 (1 John 1:9)",
    "e": "1 John 1:9 assures believers of daily forgiveness and restoration of fellowship through confession."
  },
  {
    "id": "bmpi_294",
    "t": "book_chapter",
    "p": "In what book & chapter does the vision of the New Jerusalem declare: 'He will wipe away every tear from their eyes, and death shall be no more, neither shall there be mourning, nor crying, nor pain anymore, for the former things have passed away'?",
    "b": "REV",
    "c": 21,
    "a": [
      "Revelation 21",
      "Rev 21"
    ],
    "d": "Revelation 21 (Revelation 21:4)",
    "e": "Revelation 21:1\u20134 depicts eternal glory in the new heaven and new earth."
  },
  {
    "id": "bmpi_295",
    "t": "book_id",
    "p": "In which short epistle does John denounce Diotrephes, 'who likes to put himself first', for speaking wicked nonsense and refusing to welcome traveling missionary brethren?",
    "b": "3JN",
    "c": 1,
    "a": [
      "3 John",
      "3 Jn",
      "Third John"
    ],
    "d": "3 John (3 John 1:9\u201310)",
    "e": "3 John 1:9\u201310 exposes arrogant, authoritarian leadership in the church."
  },
  {
    "id": "bmpi_296",
    "t": "book_id",
    "p": "In which personal letter to his friend Gaius does John declare his greatest pastoral joy: 'I have no greater joy than to hear that my children are walking in the truth'?",
    "b": "3JN",
    "c": 1,
    "a": [
      "3 John",
      "3 Jn",
      "Third John"
    ],
    "d": "3 John (3 John 1:4)",
    "e": "3 John 1:4 captures the heartbeat of apostolic ministry."
  },
  {
    "id": "bmpi_297",
    "t": "book_id",
    "p": "In which practical epistle does the author cite Elijah praying for drought and rain to prove that: 'The prayer of a righteous person has great power as it is working'?",
    "b": "JAS",
    "c": 5,
    "a": [
      "James",
      "Jas"
    ],
    "d": "James (James 5:16\u201318)",
    "e": "James 5:16\u201318 uses Elijah as an inspiring model of fervent, prevailing prayer."
  },
  {
    "id": "bmpi_298",
    "t": "book_id",
    "p": "In what pastoral epistle does Paul outline intergenerational women's mentoring: 'Older women likewise are to be reverent in behavior... and so train the young women to love their husbands and children'?",
    "b": "TIT",
    "c": 2,
    "a": [
      "Titus",
      "Tit"
    ],
    "d": "Titus (Titus 2:3\u20135)",
    "e": "Titus 2:3\u20135 establishes the biblical model of discipleship among Christian women."
  },
  {
    "id": "bmpi_299",
    "t": "book_id",
    "p": "In which Gospel does the unique parable of the Growing Seed appear: 'The earth produces by itself, first the blade, then the ear, then the full grain in the ear'?",
    "b": "MRK",
    "c": 4,
    "a": [
      "Mark",
      "Gospel of Mark",
      "Mrk"
    ],
    "d": "Mark (Mark 4:26\u201329)",
    "e": "Mark 4:26\u201329 is a parable found exclusively in the Gospel of Mark illustrating the mysterious growth of the Kingdom."
  },
  {
    "id": "bmpi_300",
    "t": "facts",
    "p": "Which post-exilic leader illustrates focused biblical ministry: 'For Ezra had set his heart to study the Law of the Lord, and to do it and to teach his statutes and rules in Israel'?",
    "b": "EZR",
    "c": 7,
    "a": [
      "Ezra",
      "Ezra the scribe",
      "Ezra the priest"
    ],
    "d": "Ezra (Ezra 7:10)",
    "e": "Ezra 7:10 stands as the quintessential model of personal devotion, life obedience, and faithful biblical exposition."
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

export const BMPI_TEST_300_BANK = CURATED_QUESTION_BANK.filter(q => q.id.startsWith("bmpi_"));
export const GFC_TEST_100_BANK = CURATED_QUESTION_BANK.filter(q => q.id.startsWith("gfc_"));
