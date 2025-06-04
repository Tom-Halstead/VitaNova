import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const activeStyle = {
  color: "#4F46E5",
  fontWeight: 600,
  textDecoration: "none",
};
const inactiveStyle = { color: "#374151", textDecoration: "none" };

export default function Dashboard() {
  return (
    <div style={{ minHeight: "100vh", background: "#F9FAFB", padding: "2rem" }}>
      <nav
        style={{
          display: "flex",
          gap: "1.5rem",
          borderBottom: "1px solid #E5E7EB",
          paddingBottom: "0.75rem",
          marginBottom: "2rem",
        }}
      >
        <NavLink
          end
          to=""
          style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
        >
          Timeline
        </NavLink>
        <NavLink
          to="trends"
          style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
        >
          Trends
        </NavLink>
        <NavLink
          to="insights"
          style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
        >
          Insights
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
