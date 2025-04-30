import React from "react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      {/* Navigation bar appears on all routes except Home */}
      <NavBar />
      {/* Routes will render Home, Dashboard, etc. */}
      <AppRoutes />
    </BrowserRouter>
  );
}
