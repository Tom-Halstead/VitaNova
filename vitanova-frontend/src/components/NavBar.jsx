import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import { isAuthenticated } from "../utils/authUtils";

export default function NavBar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (pathname === "/") return null;

  // unchanged desktop grid:
  const navStyle = {
    display: "grid",
    gridTemplateColumns: mobile ? "1fr 1fr 1fr 1fr" : "repeat(12,1fr)",
    alignItems: "center",
    padding: "0.75rem 1rem",
    background:
      "linear-gradient(to bottom, #7AB6F7 0%, #709FDE 50%, #7AB6F7 100%)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  };

  // show only on mobile
  const toggleStyle = {
    display: mobile ? "block" : "none",
    gridColumn: "12/13",
    justifySelf: "end",
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    color: "#fff",
    cursor: "pointer",
  };

  // desktop links untouched
  const linksStyle = {
    display: mobile ? "none" : "flex",
    gridColumn: "4/9",
    gap: "1rem",
  };

  const activeLink = {
    color: "#FFFFFF",
    fontWeight: 700,
    textDecoration: "none",
    transition: "color 0.2s",
  };
  const baseLink = {
    color: "#E9E9E9",
    textDecoration: "none",
    transition: "color 0.2s",
  };

  // **MOBILE DROPDOWN PANEL**
  const panelStyle = {
    display: open && mobile ? "flex" : "none",
    flexDirection: "column",
    position: "fixed",
    top: "3.5rem",
    left: "1rem",
    right: "1rem",
    background: "linear-gradient(180deg, #709FDE 0%, #7AB6F7 100%)",
    borderRadius: "0.5rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    padding: "0.75rem 0",
    gap: "0.5rem",
    zIndex: 99,
  };

  const mobileLinkStyle = {
    color: "#fff",
    padding: "0.75rem 1rem",
    textAlign: "center",
    textDecoration: "none",
    fontWeight: 500,
  };
  const mobileActive = {
    ...mobileLinkStyle,
    background: "rgba(255,255,255,0.2)",
    borderRadius: "0.375rem",
    fontWeight: 600,
  };

  // actions in mobile panel:
  const mobileActions = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    borderTop: "1px solid rgba(255,255,255,0.4)",
    marginTop: "0.5rem",
    paddingTop: "0.5rem",
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
            ["insights-goals", "Insights & Goals"],
            ["settings", "Settings"],
          ].map(([to, label]) => (
            <NavLink
              key={to}
              to={`/${to}`}
              end
              style={({ isActive }) => (isActive ? activeLink : baseLink)}
            >
              <span
                onMouseEnter={(e) => (e.currentTarget.style.color = "#4F46E5")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "")}
              >
                {label}
              </span>
            </NavLink>
          ))}
        </div>

        {/* desktop actions */}
        <div
          style={{
            display: mobile ? "none" : "flex",
            gap: "1rem",
            gridColumn: "9/12",
            justifySelf: "end",
          }}
        >
          <ThemeSwitcher />
          {isAuthenticated() && (
            <button
              onClick={() =>
                (window.location.href =
                  "https://us-east-2d1agk3shc.auth.us-east-2.amazoncognito.com/logout?client_id=2j12r8o421t03pnhhm0hjfi5qu&logout_uri=http://localhost:3000")
              }
              style={{
                padding: "0.5rem 1rem",
                background: "#FCA5A5",
                color: "#FFF",
                border: "none",
                borderRadius: "0.375rem",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#F87171")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#FCA5A5")
              }
            >
              Logout
            </button>
          )}
        </div>

        {/* mobile dropdown */}
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
              style={({ isActive }) =>
                isActive ? mobileActive : mobileLinkStyle
              }
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          ))}

          <div style={mobileActions}>
            <ThemeSwitcher />
            {isAuthenticated() && (
              <button
                onClick={() =>
                  (window.location.href =
                    "https://us-east-2d1agk3shc.auth.us-east-2.amazoncognito.com/logout?client_id=2j12r8o421t03pnhhm0hjfi5qu&logout_uri=http://localhost:3000")
                }
                style={{
                  padding: "0.75rem 1rem",
                  background: "#FCA5A5",
                  color: "#FFF",
                  border: "none",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                  width: "100%",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#F87171")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#FCA5A5")
                }
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
