// Firebase Auth (Google SSO) & Cloud Sync Configuration
// Replace these values with your Firebase Project config from console.firebase.google.com

export const FIREBASE_CONFIG = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
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
