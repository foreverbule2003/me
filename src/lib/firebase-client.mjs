/**
 * Shared Firebase Client SDK Module
 * Centralizes configuration and initialization for all client-side tools.
 */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  setDoc,
  writeBatch,
  deleteDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
  getAnalytics, 
  logEvent 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

// Web Vitals for Performance Monitoring
import { onCLS, onINP, onLCP, onFCP, onTTFB } from "https://unpkg.com/web-vitals@3?module";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Singleton App
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
let analytics = null;
try {
  analytics = getAnalytics(app);
} catch (e) {
  console.warn("Analytics blocked or failed");
}

// Export instances and SDK functions for consumption
export {
  app,
  db,
  auth,
  googleProvider,
  analytics,
  // SDK Functions re-export for version consistency
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  setDoc,
  writeBatch,
  deleteDoc,
  onSnapshot,
  // Auth Functions
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  // Analytics
  logEvent,
  getAnalytics,
  // Web Vitals
  onCLS, onINP, onLCP, onFCP, onTTFB
};
