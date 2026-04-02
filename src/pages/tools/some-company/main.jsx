import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../../../index.css"; // Global Tailwind

// Chart.js 全域預設字體
if (typeof Chart !== "undefined") {
  Chart.defaults.font.family = "'Noto Sans TC', sans-serif";
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
