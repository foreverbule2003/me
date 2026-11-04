/**
 * Shared Firebase Client SDK Module
 * Centralizes configuration and initialization for all client-side tools.
 */
import { initializeApp } from "firebase/app";
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
  deleteField,
  onSnapshot
} from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { 
  getAnalytics, 
  logEvent 
} from "firebase/analytics";

// Web Vitals for Performance Monitoring
// SDK 一律用 npm 套件打包（與 src/lib/firebase.js 同一份），不在執行期從 CDN 載入未鎖版本的腳本
import { onCLS, onINP, onLCP, onFCP, onTTFB } from "web-vitals";

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
  deleteField,
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
