import React, { useState, useEffect } from "react";
import { toggleTheme } from "../api/SettingsApi";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const t = document.documentElement.getAttribute("data-theme");
    if (t) setTheme(t);
  }, []);
  const flip = async () => {
    const next = theme === "light" ? "dark" : "light";
    await toggleTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    setTheme(next);
  };
  return (
    <button
      onClick={flip}
      className="p-2 rounded bg-gray-200 hover:bg-gray-300"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
