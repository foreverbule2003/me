import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../../../index.css"; // Global Tailwind
import "../../../../public/css/cb-theme.css"; // CB Specific Theme

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
