import React from "react";
import NavBar from "./components/NavBar";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <>
      <NavBar /> {/* persistent navbar, hidden on Home */}
      <div style={{ padding: "1rem" }}>
        <AppRoutes /> {/* renders routes via Outlet nesting */}
      </div>
    </>
  );
}
