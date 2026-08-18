// Firebase Auth (Google SSO) & Cloud Sync Configuration
// Replace these values with your Firebase Project config from console.firebase.google.com

export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAn_aeb_sHY7sToqlLeXrJAHBtf5Hlp4uc",
  authDomain: "bible-outline-f10cc.firebaseapp.com",
  projectId: "bible-outline-f10cc",
  storageBucket: "bible-outline-f10cc.firebasestorage.app",
  messagingSenderId: "74158682451",
  appId: "1:74158682451:web:8aef02018d3ada0b9831a6",
  measurementId: "G-SVT2LTW7R4"
};

// Check if Firebase credentials have been configured
export function isFirebaseConfigured() {
  return (
    FIREBASE_CONFIG.apiKey &&
    FIREBASE_CONFIG.apiKey !== "YOUR_FIREBASE_API_KEY" &&
    FIREBASE_CONFIG.projectId &&
    FIREBASE_CONFIG.projectId !== "YOUR_PROJECT_ID"
  );
}
