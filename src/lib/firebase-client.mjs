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
  apiKey: "AIzaSyB4VXQaa_bWldNrXfSARgK3w258fac9Fvg",
  authDomain: "my-landing-page-2ca68.firebaseapp.com",
  projectId: "my-landing-page-2ca68",
  storageBucket: "my-landing-page-2ca68.firebasestorage.app",
  messagingSenderId: "847051837050",
  appId: "1:847051837050:web:c5e2bc562520d3ab835c3",
};

// Initialize Singleton App
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
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
