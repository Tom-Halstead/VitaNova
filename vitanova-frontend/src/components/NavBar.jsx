// File: src/components/NavBar.jsx
import React, { useState, useEffect, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { isAuthenticated, API_BASE, getLogoutUrl } from "../utils/authUtils";

export default function NavBar() {
  const { pathname } = useLocation();
  const { themeName, setThemeName } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    (async () => setAuthed(await isAuthenticated()))();
  }, [pathname]);

  if (pathname === "/") return null;

  const isLight = themeName === "light";
  const textColor = isLight ? "#1f2937" : "#edf2f7";

  const navStyle = {
    display: "grid",
    gridTemplateColumns: mobile ? "1fr 1fr 1fr 1fr" : "repeat(12,1fr)",
    alignItems: "center",
    padding: "0.75rem 1rem",
    backgroundColor: isLight ? "rgba(174,227,245,0.75)" : "rgba(45,55,72,0.75)",
    backdropFilter: "blur(10px) saturate(180%)",
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

  const baseLink = { color: textColor, textDecoration: "none" };
  const activeLink = { ...baseLink, fontWeight: 700 };

  const panelStyle = {
    display: open && mobile ? "flex" : "none",
    flexDirection: "column",
    position: "fixed",
    top: "3.5rem",
    left: "1rem",
    right: "1rem",
    backgroundColor: isLight ? "rgba(174,227,245,0.85)" : "rgba(45,55,72,0.85)",
    backdropFilter: "blur(10px) saturate(180%)",
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
    backgroundColor: isLight
      ? "rgba(255,255,255,0.5)"
      : "rgba(255,255,255,0.1)",
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
          <button
            onClick={() => setThemeName(isLight ? "dark" : "light")}
            style={{
              marginRight: "1rem",
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

          {authed && (
            <button
              onClick={async () => {
                try {
                  await fetch(`${API_BASE}/logout`, {
                    method: "POST",
                    credentials: "include",
                  });
                } catch {}
                window.location.assign(getLogoutUrl());
              }}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: isLight ? "#C53030" : "#FBB6CE",
                color: "#FFF",
                border: "none",
                borderRadius: "0.375rem",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = isLight
                  ? "#9B2C2C"
                  : "#F687B3")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = isLight
                  ? "#C53030"
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
