import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBIFfmOTwKAfkklgVQudqmS8AEX7Km8hSk",
  authDomain: "my-landing-page-2ca68.firebaseapp.com",
  projectId: "my-landing-page-2ca68",
  storageBucket: "my-landing-page-2ca68.firebasestorage.app",
  messagingSenderId: "847051837050",
  appId: "1:847051837050:web:c5e2bc56252e0d3ab835c3",
  measurementId: "G-BZGQHXQED1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
