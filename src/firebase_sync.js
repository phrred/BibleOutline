import { FIREBASE_CONFIG, isFirebaseConfigured } from "./firebase_config.js";

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

export function preloadFirebaseSDK() {
  ensureFirebase().catch(() => {});
}

export async function listenForAuthChanges(callback) {
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

export async function signInWithGoogleSSO() {
  const { auth, signInWithPopup } = await ensureFirebase();
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

export async function signInWithGoogleRedirect() {
  const { auth, signInWithRedirect } = await ensureFirebase();
  await signInWithRedirect(auth, googleProvider);
}

export async function signOutUser() {
  const { auth, signOut } = await ensureFirebase();
  await signOut(auth);
}

// Clean and compact chapter outline data for lean, high-fidelity storage
export function cleanChapterData(ch) {
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
  const deletedHeadings = Array.isArray(ch.deletedHeadings) && ch.deletedHeadings.length > 0 ? ch.deletedHeadings : null;
  const headingsInitialized = Boolean(ch.headingsInitialized);

  const hasContent = activeSections.length > 0 || takeaway.length > 0 || richHTML.length > 0 || Boolean(deletedHeadings);
  if (!hasContent) return null;

  const compact = {};
  if (activeSections.length > 0) compact.headingBlocks = activeSections;
  if (takeaway) compact.takeaway = takeaway;
  if (richHTML) compact.chapterOutlineRichHTML = richHTML;
  if (status) compact.status = status;
  if (updatedAt) compact.updatedAt = updatedAt;
  if (deletedHeadings) compact.deletedHeadings = deletedHeadings;
  if (headingsInitialized) compact.headingsInitialized = true;
  return compact;
}

// Extract active content for a specific book to store in its own subcollection document
export function extractBookData(bookId, localData) {
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
export async function saveBookToCloud(user, bookId, localData) {
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
export function debouncedCloudAutoSaveBook(user, bookId, localData, onStatusUpdate, delayMs = 900) {
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
export async function saveQuizToCloud(user, quizRecord) {
  if (!user || !user.uid || !quizRecord) return false;
  const qId = quizRecord.id || `quiz_${quizRecord.date || Date.now()}`;
  const { db, doc, setDoc } = await ensureFirebase();
  const quizDocRef = doc(db, "users", user.uid, "quizzes", qId);
  const payload = JSON.parse(JSON.stringify({ ...quizRecord, id: qId }));
  await setDoc(quizDocRef, payload, { merge: true });
  return true;
}

// Save book mastery ratings into /users/{uid}/meta/mastery
export async function saveMasteryToCloud(user, bookMastery) {
  if (!user || !user.uid || !bookMastery) return false;
  const { db, doc, setDoc } = await ensureFirebase();
  const masteryDocRef = doc(db, "users", user.uid, "meta", "mastery");
  const payload = JSON.parse(JSON.stringify({ bookMastery, updatedAt: Date.now() }));
  await setDoc(masteryDocRef, payload, { merge: true });
  return true;
}

// Delete a specific quiz record from /users/{uid}/quizzes/{quizId}
export async function deleteQuizFromCloud(user, quizId) {
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
export async function clearAllQuizzesFromCloud(user) {
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
export async function saveAllOutlinesToCloud(user, localData) {
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
export async function loadOutlinesFromCloud(user) {
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
        const qData = qDoc.data() || {};
        const qId = qDoc.id || qData.id || `quiz_${qData.date || Date.now()}`;
        quizHistory.push({ ...qData, id: qId });
      });
      quizHistory.sort((a, b) => (b.date || 0) - (a.date || 0));
    }
  } catch (err) {
    console.warn("Quizzes subcollection load fallback:", err);
  }

  if (quizHistory.length === 0 && Array.isArray(rootData.quizHistory)) {
    quizHistory = rootData.quizHistory.map((q, idx) => ({
      ...q,
      id: q.id || `quiz_${q.date || Date.now()}_${idx}`
    }));
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
export const saveOutlinesToCloud = saveAllOutlinesToCloud;
export const debouncedCloudAutoSave = (user, localData, onStatusUpdate, delayMs) => {
  debouncedCloudAutoSaveBook(user, localData?.selectedBookId || "GEN", localData, onStatusUpdate, delayMs);
};

// Deep merge cloud outlines into local storage state without resurrecting deleted headings
export function mergeCloudAndLocalState(cloudData, localData) {
  if (!cloudData || !localData) return false;
  let merged = false;

  if (!localData.books) localData.books = {};
  if (!localData.chapters) localData.chapters = {};

  // 1. Merge Book Summaries & Themes
  if (cloudData.books) {
    for (const [bid, b] of Object.entries(cloudData.books)) {
      if (!b) continue;
      if (!localData.books[bid]) {
        localData.books[bid] = { bookSummary: "", myBookTheme: "", updatedAt: null };
      }
      if (b.bookSummary && b.bookSummary.trim()) {
        localData.books[bid].bookSummary = b.bookSummary;
        merged = true;
      }
      if (b.myBookTheme && b.myBookTheme.trim()) {
        localData.books[bid].myBookTheme = b.myBookTheme;
        merged = true;
      }
    }
  }

  // 2. Merge Chapters
  if (cloudData.chapters) {
    for (const [cid, ch] of Object.entries(cloudData.chapters)) {
      if (!ch) continue;
      if (!localData.chapters[cid]) {
        localData.chapters[cid] = { headingBlocks: [], status: "in-progress" };
      }
      if (!Array.isArray(localData.chapters[cid].headingBlocks)) {
        localData.chapters[cid].headingBlocks = [];
      }
      if (ch.takeaway) {
        localData.chapters[cid].takeaway = ch.takeaway;
        merged = true;
      }
      if (ch.chapterOutlineRichHTML) {
        localData.chapters[cid].chapterOutlineRichHTML = ch.chapterOutlineRichHTML;
        merged = true;
      }
      if (ch.status && ch.status !== "empty") {
        localData.chapters[cid].status = ch.status;
      }
      if (Array.isArray(ch.deletedHeadings) && ch.deletedHeadings.length > 0) {
        if (!Array.isArray(localData.chapters[cid].deletedHeadings)) {
          localData.chapters[cid].deletedHeadings = [];
        }
        ch.deletedHeadings.forEach((dh) => {
          const dhKey = (dh || "").toLowerCase().trim();
          if (dhKey && !localData.chapters[cid].deletedHeadings.includes(dhKey)) {
            localData.chapters[cid].deletedHeadings.push(dhKey);
          }
        });
      }
      if (ch.headingsInitialized) {
        localData.chapters[cid].headingsInitialized = true;
      }

      const cloudSections = ch.headingBlocks || ch.sections || [];
      const localDeleted = localData.chapters[cid].deletedHeadings || [];
      if (Array.isArray(cloudSections) && cloudSections.length > 0) {
        cloudSections.forEach((cs, sIdx) => {
          if (!cs) return;
          const csHeading = (cs.heading || "").trim();
          if (csHeading && localDeleted.includes(csHeading.toLowerCase())) {
            return; // Do not resurrect locally deleted headings from cloud sync
          }
          let match = localData.chapters[cid].headingBlocks.find(
            (hb) => hb && hb.heading && csHeading && hb.heading.toLowerCase() === csHeading.toLowerCase()
          );
          if (!match && localData.chapters[cid].headingBlocks[sIdx]) {
            match = localData.chapters[cid].headingBlocks[sIdx];
          }

          const pts = Array.isArray(cs.points) && cs.points.length > 0
            ? cs.points.map((p) => (p || "").trim()).filter(Boolean)
            : cs.notes
            ? cs.notes.split("\n").map((p) => p.replace(/^[•\-\*]\s*/, "").trim()).filter(Boolean)
            : [""];
          const nts = cs.notes || (pts.filter(Boolean).length > 0 ? pts.join("\n") : "");

          if (match) {
            if (pts.filter(Boolean).length > 0) {
              match.points = pts;
            }
            if (nts.trim().length > 0) {
              match.notes = nts;
            }
            if (cs.verses) match.verses = cs.verses;
          } else {
            localData.chapters[cid].headingBlocks.push({
              heading: csHeading || "Section",
              verses: cs.verses || "",
              notes: nts,
              points: pts
            });
          }
        });
        merged = true;
      }
    }
  }

  // 3. Merge Quiz History
  if (Array.isArray(cloudData.quizHistory) && cloudData.quizHistory.length > 0) {
    if (!Array.isArray(localData.quizHistory)) localData.quizHistory = [];
    const existingIds = new Set(localData.quizHistory.map((q) => q.id || `${q.date}`));
    cloudData.quizHistory.forEach((q) => {
      const qKey = q.id || `${q.date}`;
      if (!existingIds.has(qKey)) {
        localData.quizHistory.push(q);
        existingIds.add(qKey);
        merged = true;
      }
    });
    localData.quizHistory.sort((a, b) => (b.date || 0) - (a.date || 0));
  }

  // 4. Merge Book Mastery
  if (cloudData.bookMastery && typeof cloudData.bookMastery === "object") {
    localData.bookMastery = { ...localData.bookMastery, ...cloudData.bookMastery };
    merged = true;
  }

  return merged;
}

// Two-way synchronization between Firestore cloud outlines & local storage
export async function syncCloudOutlinesWithLocal(user, localData) {
  if (!user) return { merged: false, data: localData };
  try {
    const cloudData = await loadOutlinesFromCloud(user);
    let merged = false;
    if (cloudData) {
      merged = mergeCloudAndLocalState(cloudData, localData);
    }
    await saveAllOutlinesToCloud(user, localData);
    return { merged, data: localData };
  } catch (err) {
    console.warn("Cloud sync error:", err);
    return { merged: false, data: localData };
  }
}

