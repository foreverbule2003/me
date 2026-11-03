import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../../../index.css"; // Global Tailwind
import "../../../../public/css/cb-theme.css"; // CB Specific Theme
import "../../../../public/css/cb-theme-vento.css"; // Ventogrid 草稿（App 外層 .vento）

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
