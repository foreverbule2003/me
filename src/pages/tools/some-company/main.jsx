import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../../../index.css"; // Global Tailwind
import "./some-company.css"; // Swiss+Minimal 頁面樣式
import Chart from "chart.js/auto";

// 圖表元件讀全域 Chart；改用 npm 套件打包，不再從 CDN 載入未鎖版本的腳本
window.Chart = Chart;

// Chart.js 全域預設字體,跟頁面同一組
Chart.defaults.font.family =
  "'Inter Tight', 'Noto Sans TC', 'Helvetica Neue', sans-serif";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
