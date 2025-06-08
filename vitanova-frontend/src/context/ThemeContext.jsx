// File: src/context/ThemeContext.js
import React, { createContext, useState, useEffect } from "react";

// Only light + dark
export const themes = {
  light: {
    "--bg": "#FFFFFF",
    "--bg-alt": "#F7F8FA",
    "--primary": "#4F46E5",
    "--primary-alt": "#667EEA",
    "--text": "#1F2937",
    "--text-light": "#6B7280",
    "--border": "#E5E7EB",
  },
  dark: {
    "--bg": "#121212",
    "--bg-alt": "#1F1F1F",
    "--primary": "#4F46E5",
    "--primary-alt": "#3B82F6",
    // bumped contrast here:
    "--text": "#FFFFFF", // pure white for body text
    "--text-light": "#CCCCCC", // lighter gray for secondary text
    "--border": "#2D2D2D",
  },
};

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const theme = themes[themeName];
    Object.entries(theme).forEach(([k, v]) =>
      document.documentElement.style.setProperty(k, v)
    );
    localStorage.setItem("theme", themeName);
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName }}>
      {children}
    </ThemeContext.Provider>
  );
}
