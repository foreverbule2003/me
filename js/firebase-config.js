/**
 * Firebase Configuration (CDN/Browser ESM Version)
 * 
 * 供使用 CDN 載入的頁面使用 (如 trips/2026-ise-shima)
 * 注意：此檔案使用 Firebase CDN，與 Vite 版本 (src/lib/firebase.js) 分開維護
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase 設定
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

export { db };
