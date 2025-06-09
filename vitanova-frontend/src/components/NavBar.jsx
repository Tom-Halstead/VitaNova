// File: src/components/NavBar.jsx
import React, { useState, useEffect, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { isAuthenticated } from "../utils/authUtils";

export default function NavBar() {
  const { pathname } = useLocation();
  const { themeName, setThemeName } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (pathname === "/") return null;

  // Choose nav & text colors based on theme
  const isLight = themeName === "light";
  const navBackground = isLight
    ? "#AEE3F5" // solid sky-blue to match homepage
    : "linear-gradient(to bottom, #1a202c 0%, #2d3748 100%)";
  const textColor = isLight ? "#111827" : "#EDF2F7";

  const navStyle = {
    display: "grid",
    gridTemplateColumns: mobile ? "1fr 1fr 1fr 1fr" : "repeat(12,1fr)",
    alignItems: "center",
    padding: "0.75rem 1rem",
    background: navBackground,
    ...(isLight && {
      backgroundImage:
        "radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 40%)",
    }),
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  };

  const toggleStyle = {
    display: mobile ? "block" : "none",
    gridColumn: "12/13",
    justifySelf: "end",
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    color: textColor,
    cursor: "pointer",
  };

  const linksStyle = {
    display: mobile ? "none" : "flex",
    gridColumn: "4/9",
    gap: "1rem",
  };

  const baseLink = {
    color: textColor,
    textDecoration: "none",
  };
  const activeLink = {
    ...baseLink,
    fontWeight: 700,
  };

  const panelStyle = {
    display: open && mobile ? "flex" : "none",
    flexDirection: "column",
    position: "fixed",
    top: "3.5rem",
    left: "1rem",
    right: "1rem",
    background: isLight
      ? "#AEE3F5"
      : "linear-gradient(180deg, #2d3748 0%, #1a202c 100%)",
    ...(isLight && {
      backgroundImage:
        "radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 40%)",
    }),
    borderRadius: "0.5rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    padding: "0.75rem 0",
    gap: "0.5rem",
    zIndex: 99,
  };

  const mobileLink = {
    color: textColor,
    padding: "0.75rem 1rem",
    textAlign: "center",
    textDecoration: "none",
    fontWeight: 500,
  };
  const mobileActive = {
    ...mobileLink,
    background: isLight ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.1)",
    borderRadius: "0.375rem",
    fontWeight: 600,
  };

  return (
    <header>
      <nav style={navStyle}>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          style={toggleStyle}
        >
          {open ? "✕" : "☰"}
        </button>

        <div style={linksStyle}>
          {[
            ["dashboard", "Dashboard"],
            ["new-entry", "New Entry"],
            ["entries", "Entries"],
            ["insights-goals", "Goals"],
            ["settings", "Settings"],
          ].map(([to, label]) => (
            <NavLink
              key={to}
              to={`/${to}`}
              end
              style={({ isActive }) => (isActive ? activeLink : baseLink)}
            >
              {label}
            </NavLink>
          ))}
        </div>

        <div
          style={{
            display: mobile ? "none" : "flex",
            gap: "1rem",
            gridColumn: "9/12",
            justifySelf: "end",
          }}
        >
          {/* Theme toggle */}
          <button
            onClick={() => setThemeName(isLight ? "dark" : "light")}
            style={{
              fontSize: "1.25rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: textColor,
            }}
            title="Toggle light/dark"
          >
            {isLight ? "🌙" : "☀️"}
          </button>
          {isAuthenticated() && (
            <button
              onClick={() =>
                (window.location.href =
                  "https://us-east-2d1agk3shc.auth.us-east-2.amazoncognito.com/logout?client_id=2j12r8o421t03pnhhm0hjfi5qu&logout_uri=http://localhost:3000")
              }
              style={{
                padding: "0.5rem 1rem",
                background: isLight ? "#E53E3E" : "#FBB6CE",
                color: "#FFF",
                border: "none",
                borderRadius: "0.375rem",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = isLight
                  ? "#C53030"
                  : "#F687B3")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = isLight
                  ? "#E53E3E"
                  : "#FBB6CE")
              }
            >
              Logout
            </button>
          )}
        </div>

        <div style={panelStyle}>
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
              end
              style={({ isActive }) => (isActive ? mobileActive : mobileLink)}
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          <button
            onClick={() => {
              setThemeName(isLight ? "dark" : "light");
              setOpen(false);
            }}
            style={{
              margin: "0.5rem auto",
              background: "none",
              border: "none",
              color: textColor,
              cursor: "pointer",
            }}
          >
            {isLight ? "Switch to Dark" : "Switch to Light"}
          </button>
        </div>
      </nav>
    </header>
  );
}
