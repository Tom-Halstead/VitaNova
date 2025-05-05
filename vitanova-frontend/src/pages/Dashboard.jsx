// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { fetchSummary, fetchMoodTrend } from "../api/dashboardApi";
import InteractiveChart from "../components/InteractiveChart";
import Card from "../components/Card";

function Timeline() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchSummary().then(setData);
  }, []);
  return <InteractiveChart data={data} />;
}
function Trends() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchMoodTrend().then(setData);
  }, []);
  return <InteractiveChart data={data} />;
}
function Insights() {
  return (
    <div style={{ color: "#6B7280", fontSize: "1rem" }}>
      Insights coming soon.
    </div>
  );
}

export default function Dashboard() {
  const [summary, setSummary] = useState({});
  useEffect(() => {
    fetchSummary().then(setSummary);
  }, []);

  const activeLinkStyle = {
    color: "#4F46E5",
    fontWeight: 600,
    textDecoration: "none",
  };
  const inactiveLinkStyle = {
    color: "#374151",
    textDecoration: "none",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem",
        backgroundColor: "#F9FAFB",
        fontFamily: "sans-serif",
      }}
    >
      {/* Navigation */}
      <nav
        style={{
          display: "flex",
          gap: "1.5rem",
          borderBottom: "1px solid #E5E7EB",
          paddingBottom: "0.75rem",
          marginBottom: "2rem",
        }}
      >
        <NavLink end to="" style={({ isActive }) =>
            isActive ? activeLinkStyle : inactiveLinkStyle
        }>
          Timeline
        </NavLink>
        <NavLink to="trends" style={({ isActive }) =>
            isActive ? activeLinkStyle : inactiveLinkStyle
        }>
          Trends
        </NavLink>
        <NavLink to="insights" style={({ isActive }) =>
            isActive ? activeLinkStyle : inactiveLinkStyle
        }>
          Insights
        </NavLink>
      </nav>

      {/* Chart / Views */}
      <div style={{ marginBottom: "2rem" }}>
        <Routes>
          <Route path="/" element={<Timeline />} />
          <Route path="trends" element={<Trends />} />
          <Route path="insights" element={<Insights />} />
        </Routes>
      </div>

      {/* Summary Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        <Card title="Total Entries">
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827" }}>
            {summary.totalEntries ?? "—"}
          </div>
        </Card>
        <Card title="Avg Mood (Pre)">
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827" }}>
            {summary.avgMoodPre ?? "—"}
          </div>
        </Card>
        <Card title="Current Streak">
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827" }}>
            {summary.currentStreak ?? "—"}
          </div>
        </Card>
      </div>
    </div>
  );
}
