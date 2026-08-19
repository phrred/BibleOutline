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

export async function saveOutlinesToCloud(user, localData) {
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
      chapters: activeChapters,
      quizHistory: Array.isArray(localData.quizHistory) ? localData.quizHistory.slice(0, 50) : []
    })
  );

  await setDoc(userDocRef, payload, { merge: true });

  return true;
}

let cloudSaveTimer = null;
export function debouncedCloudAutoSave(user, localData, onStatusUpdate, delayMs = 1200) {
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

export async function loadOutlinesFromCloud(user) {
  if (!user || !user.uid) return null;
  const { db, doc, getDoc } = await ensureFirebase();
  const userDocRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userDocRef);

  if (snapshot.exists()) {
    const data = snapshot.data();
    return {
      books: data.books || {},
      chapters: data.chapters || {},
      quizHistory: data.quizHistory || []
    };
  }
  return null;
}

