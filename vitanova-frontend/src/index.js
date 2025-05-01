
import process from "process";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import "./index.css";

// 2) Polyfill the `process` global at runtime:
window.process = process;

// 3) Read PUBLIC_URL (CRA injects this at build time)
const PUBLIC_URL = process.env.PUBLIC_URL || "";

// 4) Bootstrap your app:
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={PUBLIC_URL}>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>
);
