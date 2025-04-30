import React, { useState, useEffect } from "react";
import { toggleTheme } from "../api/settingsApi";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = document.documentElement.getAttribute("data-theme");
    if (saved) setTheme(saved);
  }, []);

  const handleToggle = async () => {
    const next = theme === "light" ? "dark" : "light";
    await toggleTheme(next);
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <button
      onClick={handleToggle}
      className="px-2 py-1 bg-gray-200 rounded"
      aria-label="Toggle theme"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
