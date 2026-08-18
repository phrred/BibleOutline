import { FIREBASE_CONFIG, isFirebaseConfigured } from "./firebase_config.js";

let firebaseApp = null;
let auth = null;
let db = null;
let googleProvider = null;

// Dynamically initialize Firebase Auth & Firestore ES Module SDKs
async function ensureFirebase() {
  if (firebaseApp) return { auth, db };

  if (!isFirebaseConfigured()) {
    throw new Error(
      "Firebase is not configured yet. Open src/firebase_config.js to paste your Firebase credentials (console.firebase.google.com)."
    );
  }

  // Load official Firebase V9/V10 JS SDK modules from CDN
  const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js");
  const { getAuth, GoogleAuthProvider, signInWithPopup, signOut, fontAuthStateChanged } = await import(
    "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"
  );
  const { getFirestore, doc, setDoc, getDoc, serverTimestamp } = await import(
    "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"
  );

  firebaseApp = initializeApp(FIREBASE_CONFIG);
  auth = getAuth(firebaseApp);
  db = getFirestore(firebaseApp);
  googleProvider = new GoogleAuthProvider();

  return { auth, db, signInWithPopup, signOut, doc, setDoc, getDoc, serverTimestamp };
}

export async function signInWithGoogleSSO() {
  const { auth, signInWithPopup } = await ensureFirebase();
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
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
      const hasNotes =
        Array.isArray(ch.headingBlocks) &&
        ch.headingBlocks.some((hb) => hb.notes && hb.notes.trim().length > 0);
      const hasSummary = ch.takeaway && ch.takeaway.trim().length > 0;
      const isDone = ch.status === "completed";

      if (hasNotes || hasSummary || isDone) {
        activeChapters[cid] = ch;
      }
    }
  }

  await setDoc(
    userDocRef,
    {
      email: user.email || "",
      displayName: user.displayName || "User",
      lastSynced: serverTimestamp(),
      books: activeBooks,
      chapters: activeChapters
    },
    { merge: true }
  );

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
        onStatusUpdate("⚠️ Local saved (Firebase offline)");
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
      chapters: data.chapters || {}
    };
  }
  return null;
}

