// File: src/components/Footer.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Footer() {
  const { pathname } = useLocation();
  const { themeName } = useContext(ThemeContext);

  if (pathname === "/") return null;

  const isLight = themeName === "light";
  const bg = isLight
    ? "#AEE3F5"
    : "linear-gradient(to top, #1a202c 0%, #2d3748 100%)";
  const color = isLight ? "#111827" : "#EDF2F7";

  const containerStyle = {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    background: bg,
    ...(isLight && {
      backgroundImage:
        "radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 40%)",
    }),
    color: color,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "4rem",
    textAlign: "center",
    boxShadow: "0 -2px 8px rgba(0,0,0,0.1)",
    zIndex: 1000,
  };

  const year = new Date().getFullYear();

  return (
    <footer style={containerStyle}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <p style={{ margin: 0, fontSize: "1rem" }}>
          © {year} Vita Nova. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
