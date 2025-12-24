import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, doc, setDoc, deleteDoc, onSnapshot, addDoc, getDocs, updateDoc, orderBy, query, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getAuth, signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// 統一的 Firebase 設定
const firebaseConfig = {
  apiKey: "AIzaSyB4VXQaa_bWldNrXfSARgK3w258fac9Fvg",
  authDomain: "my-landing-page-2ca68.firebaseapp.com",
  projectId: "my-landing-page-2ca68",
  storageBucket: "my-landing-page-2ca68.firebasestorage.app",
  messagingSenderId: "847051837050",
  appId: "1:847051837050:web:c5e2bc56252e0d3ab835c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Export for ES modules
export { 
  db, auth, googleProvider,
  // Firestore functions
  collection, doc, setDoc, deleteDoc, onSnapshot, addDoc, getDocs, updateDoc, orderBy, query, serverTimestamp,
  // Auth functions
  signInWithPopup, signOut, onAuthStateChanged
};
