// src/App.js
import React from "react";
import NavBar from "./components/NavBar";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <>
      <NavBar />
      <div style={{ padding: "1rem" }}>
        <AppRoutes />
      </div>
    </>
  );
}
