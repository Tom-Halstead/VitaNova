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
  const textColor = isLight ? "#1f2937" : "#edf2f7";

  const footerStyle = {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: isLight ? "rgba(174,227,245,0.75)" : "rgba(45,55,72,0.75)",
    backdropFilter: "blur(10px) saturate(180%)",
    color: textColor,
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
    <footer style={footerStyle}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <p style={{ margin: 0, fontSize: "1rem" }}>
          © {year} Vita Nova. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
