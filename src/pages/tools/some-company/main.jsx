import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../../../index.css"; // Global Tailwind
import "./some-company.css"; // Swiss+Minimal 頁面樣式

// Chart.js 全域預設字體,跟頁面同一組
if (typeof Chart !== "undefined") {
  Chart.defaults.font.family =
    "'Inter Tight', 'Noto Sans TC', 'Helvetica Neue', sans-serif";
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
