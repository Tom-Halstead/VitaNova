// src/pages/DashboardItems/Dashboard.jsx
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const activeStyle = {
  color: "var(--primary)",
  fontWeight: 600,
  textDecoration: "none",
};
const inactiveStyle = {
  color: "var(--text-light)",
  textDecoration: "none",
};

export default function Dashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-alt)",
        padding: "2rem",
      }}
    >
      <nav
        style={{
          display: "flex",
          gap: "1.5rem",
          borderBottom: "1px solid var(--border)",
          paddingBottom: "0.75rem",
          marginBottom: "2rem",
        }}
      >
        {[
          ["", "Timeline"],
          ["trends", "Trends"],
          ["insights", "Insights"],
        ].map(([to, label]) => (
          <NavLink
            key={to}
            end={!to}
            to={to}
            style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <Outlet />
    </div>
  );
}
