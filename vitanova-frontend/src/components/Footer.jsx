// File: src/components/Footer.jsx
import React from "react";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const { pathname } = useLocation();
  if (pathname === "/") return null;
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        background:
          "linear-gradient(to bottom, var(--primary-alt) 0%, var(--primary) 100%)",
        color: "var(--text)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "4rem",
        textAlign: "center",
        boxShadow: "0 -2px 8px rgba(0,0,0,0.1)",
        zIndex: 1000,
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <p style={{ margin: 0, fontSize: "1rem" }}>
          © {year} Vita Nova. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
