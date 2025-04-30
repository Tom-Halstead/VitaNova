/* src/index.js */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// You can log performance metrics or send to analytics
reportWebVitals();

// With these in place, running `npm start` will:
// - Serve `index.html` from public/
// - Initialize React at src/index.js
// - Mount <App />: sets up router, NavBar, and page components
// - Hitting `/` shows Home.js; after Cognito login, redirection to `/dashboard/...` renders Dashboard.js and subviews
