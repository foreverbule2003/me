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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

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
