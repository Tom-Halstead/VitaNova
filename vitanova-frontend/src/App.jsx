import React from "react";
import NavBar from "./components/NavBar";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <NavBar /> {/* persistent navbar, hidden on Home */}
      <AppRoutes /> {/* renders routes via Outlet nesting */}
      <Footer /> {/* persistent navbar, hidden on Home */}
    </>
  );
}
