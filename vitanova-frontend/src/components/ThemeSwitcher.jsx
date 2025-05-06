// src/components/ThemeSwitcher.jsx
import React from "react";
import UseDarkMode from "../components/UseDarkMode";

export default function ThemeSwitcher() {
  const [theme, toggle] = UseDarkMode("light");

  return (
    <button
      onClick={toggle}
      style={{
        padding: "0.5rem",
        borderRadius: "0.375rem",
        background: "rgba(255,255,255,0.1)",
        color: "#FFF",
        border: "none",
        cursor: "pointer",
        transition: "background 0.2s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "rgba(255,255,255,0.2)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
      }
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
