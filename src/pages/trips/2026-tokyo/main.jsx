import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../../../index.css";
import { ErrorBoundary } from "../../../components/ErrorBoundary.jsx";
import "./tokyo.css";

import { db } from "../../../lib/firebase.js";
export { db };

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
