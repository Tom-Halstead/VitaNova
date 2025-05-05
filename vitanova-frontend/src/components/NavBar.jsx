// src/components/NavBar.jsx
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import { isAuthenticated } from "../utils/authUtils";

export default function NavBar() {
  const { pathname } = useLocation();
  if (pathname === "/") return null;

  const baseLink = {
    textDecoration: "none",
    fontSize: "1rem",
    padding: "0.5rem",
    transition: "color 0.2s ease, borderBottom 0.2s ease",
  };
  const activeLink = {
    ...baseLink,
    color: "#FFFFFF",
    borderBottom: "2px solid rgba(255,255,255,0.8)",
    fontWeight: 600,
  };
  const inactiveLink = {
    ...baseLink,
    color: "rgba(255,255,255,0.7)",
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "linear-gradient(90deg, #4F46E5 0%, #6366F1 100%)",
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
          <NavLink to="/dashboard" style={({ isActive }) => (isActive ? activeLink : inactiveLink)}>
            Dashboard
          </NavLink>
          <NavLink to="/new-entry" style={({ isActive }) => (isActive ? activeLink : inactiveLink)}>
            New Entry
          </NavLink>
          <NavLink to="/entries" style={({ isActive }) => (isActive ? activeLink : inactiveLink)}>
            Entries
          </NavLink>
          <NavLink to="/insights-goals" style={({ isActive }) => (isActive ? activeLink : inactiveLink)}>
            Insights & Goals
          </NavLink>
          <NavLink to="/settings" style={({ isActive }) => (isActive ? activeLink : inactiveLink)}>
            Settings
          </NavLink>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <ThemeSwitcher />
          {isAuthenticated() && (
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.pathname = "/";
              }}
              style={{
                padding: "0.5rem 1rem",
                fontSize: "0.9rem",
                backgroundColor: "#EF4444",
                color: "#FFF",
                border: "none",
                borderRadius: "0.375rem",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#DC2626")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#EF4444")}
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
