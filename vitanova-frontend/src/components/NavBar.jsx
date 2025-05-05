import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import { isAuthenticated } from "../utils/authUtils";

export default function NavBar() {
  const { pathname } = useLocation();
  if (pathname === "/") return null;

  const base = {
    textDecoration: "none",
    padding: "0.5rem",
    transition: "color 0.2s",
  };
  const active = { ...base, color: "#FFF", fontWeight: 600 };
  const inactive = { ...base, color: "rgba(255,255,255,0.7)" };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "linear-gradient(90deg,#4F46E5,#6366F1)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}
    >
      <nav
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.75rem 1rem",
        }}
      >
        <div style={{ display: "flex", gap: "1rem" }}>
          {[
            ["dashboard", "Dashboard"],
            ["new-entry", "New Entry"],
            ["entries", "Entries"],
            ["insights-goals", "Insights & Goals"],
            ["settings", "Settings"],
          ].map(([to, label]) => (
            <NavLink
              key={to}
              to={`/${to}`}
              style={({ isActive }) => (isActive ? active : inactive)}
            >
              {label}
            </NavLink>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "3rem" }}>
          <ThemeSwitcher />
          {/* show logout if authenticated */}
          {/* You may check via isAuthenticated() */}
          <button
            onClick={() => (window.location.href = "/logout")}
            style={{
              padding: "0.5rem 1rem",
              background: "#EF4444",
              color: "#FFF",
              border: "none",
              borderRadius: "0.375rem",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#DC2626")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#EF4444")}
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}
