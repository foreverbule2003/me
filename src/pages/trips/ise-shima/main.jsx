import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../../../index.css"; // Tailwind CSS
import "./ise-shima.css"; // 頁面專用樣式

// 使用共用 Firebase 設定
import { db } from "../../../lib/firebase.js";

// 導出 db 供未來功能使用 (如收藏同步)
export { db };

// 渲染應用
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
