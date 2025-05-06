import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import { isAuthenticated } from "../utils/authUtils";

export default function NavBar() {
  const { pathname } = useLocation();
  if (pathname === "/") return null;

  const baseLink = {
    textDecoration: "none",
    padding: "0.5rem",
    transition: "color 0.2s",
    color: "rgba(255, 255, 255, 0.9)",
  };
  const activeLink = { ...baseLink, color: "#FFFFFF", fontWeight: 600 };

  return (
    <>
      <style>{`
        .navbar {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          align-items: center;
          padding: 0.75rem 1rem;
          width: 100%;
          background: linear-gradient(to bottom, #7AB6F7 0%, #709FDE 50%, #7AB6F7 100%);
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .navbar-nav {
          grid-column: 4 / 9;
          display: flex;
          gap: 1rem;
        }
        .navbar-actions {
          grid-column: 9 / 12;
          display: flex;
          align-items: center;
          gap: 2rem;
          justify-self: end;
        }
        @media (max-width: 1024px) {
          .navbar-nav { grid-column: 3 / 10; }
          .navbar-actions { grid-column: 10 / 13; }
        }
        @media (max-width: 768px) {
          .navbar { grid-template-columns: 1fr; }
          .navbar-nav { grid-column: 1 / -1; justify-content: center; margin-bottom: 0.5rem; }
          .navbar-actions { grid-column: 1 / -1; justify-content: center; }
        }
      `}</style>

      <header style={{ position: "sticky", top: 0, zIndex: 100 }}>
        <nav className="navbar">
          <div className="navbar-nav">
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
                style={({ isActive }) => (isActive ? activeLink : baseLink)}
              >
                {label}
              </NavLink>
            ))}
          </div>
          <div className="navbar-actions">
            <div
              style={baseLink}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)")
              }
            >
              <ThemeSwitcher />
            </div>
            {isAuthenticated() && (
              <button
                onClick={() => (window.location.href = "/logout")}
                style={{
                  padding: "0.5rem 1rem",
                  background: "#FCA5A5",
                  color: "#FFF",
                  border: "none",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                  transition: "background 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#F87171";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#FCA5A5";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Logout
              </button>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}
