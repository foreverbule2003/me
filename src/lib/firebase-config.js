/**
 * Firebase Project Configuration
 * 
 * 中央化管理專案 ID 與連線設定，避免散佈在各個元件中。
 */

export const firebaseConfig = {
  apiKey: "AIzaSyB4VXQaa_bWldNrXfSARgK3w258fac9Fvg",
  authDomain: "my-landing-page-2ca68.firebaseapp.com",
  projectId: "my-landing-page-2ca68", // 技術專案 ID
  storageBucket: "my-landing-page-2ca68.firebasestorage.app",
  messagingSenderId: "847051837050",
  appId: "1:847051837050:web:c5e2bc56252e0d3ab835c3",
};

export const FIREBASE_PROJECT_ID = firebaseConfig.projectId;
