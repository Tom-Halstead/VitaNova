// src/index.js
import process from "process";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";        // ← render App, not AppRoutes
import "./index.css";

// 1) Polyfill the `process` global at runtime:
window.process = process;

// 2) Read PUBLIC_URL (CRA injects this at build time)
const PUBLIC_URL = process.env.PUBLIC_URL || "";

// 3) Bootstrap your entire app under a single router:
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={PUBLIC_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
