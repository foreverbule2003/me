/**
 * Firebase Configuration (Vite ESM Version)
 *
 * 統一的 Firebase 初始化設定
 */

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  addDoc,
  getDocs,
  updateDoc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";

import { firebaseConfig } from "./firebase-config";

// Check if config is valid
const isFirebaseConfigValid =
  firebaseConfig &&
  firebaseConfig.projectId &&
  firebaseConfig.projectId !== "undefined";

// Initialize Firebase safely
let app, db, auth;

if (isFirebaseConfigValid) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
  } catch (error) {
    console.error("Firebase initialization failed:", error);
  }
} else {
  console.warn(
    "Firebase configuration is missing or incomplete. Some features like sync and auth will be disabled. Please check your .env file.",
  );
}

const googleProvider = isFirebaseConfigValid ? new GoogleAuthProvider() : null;

// Export
export {
  db,
  auth,
  googleProvider,
  // Firestore functions
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  addDoc,
  getDocs,
  updateDoc,
  orderBy,
  query,
  serverTimestamp,
  // Auth functions
  signInWithPopup,
  signOut,
  onAuthStateChanged,
};
