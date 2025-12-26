import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '../../../index.css';  // Tailwind CSS
import './ise-shima.css';  // 頁面專用樣式

// Firebase 初始化
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD-aJVmfhVR_1OTPm4TpjGVg5bXwfuYFT8",
    authDomain: "me-7d785.firebaseapp.com",
    projectId: "me-7d785",
    storageBucket: "me-7d785.firebasestorage.app",
    messagingSenderId: "1025279823808",
    appId: "1:1025279823808:web:98f03edee03420d0dd94f9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// 渲染應用
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
