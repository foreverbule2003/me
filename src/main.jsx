import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // Tailwind CSS
import "../assets/gb-theme.css";
import { initAnalytics } from "./lib/analytics";
import { WIDE_QUERY } from "./lib/shellMode";

// Initialize Performance Monitoring
initAnalytics();

// Landscape shell (desktop): drop the static GameBoy loading shell and mount at body level
let mountEl = document.getElementById("root");
if (document.documentElement.dataset.shell === "switch") {
  document.querySelector(".loading-container")?.remove();
  mountEl = document.createElement("div");
  mountEl.id = "switch-root";
  document.body.appendChild(mountEl);
}

// Shell is chosen at load; crossing the desktop breakpoint rebuilds it
window.matchMedia(WIDE_QUERY).addEventListener("change", () => {
  window.location.reload();
});

ReactDOM.createRoot(mountEl).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
