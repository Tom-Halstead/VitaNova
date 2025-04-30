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
  return <div className="text-gray-600">Insights coming soon.</div>;
}

export default function Dashboard() {
  const [summary, setSummary] = useState({});
  useEffect(() => {
    fetchSummary().then(setSummary);
  }, []);

  return (
    <div className="space-y-8">
      <nav className="flex space-x-6 border-b pb-3">
        <NavLink
          end
          to=""
          className={({ isActive }) =>
            isActive
              ? "text-indigo-600 font-semibold"
              : "text-gray-600 hover:text-indigo-600"
          }
        >
          Timeline
        </NavLink>
        <NavLink
          to="trends"
          className={({ isActive }) =>
            isActive
              ? "text-indigo-600 font-semibold"
              : "text-gray-600 hover:text-indigo-600"
          }
        >
          Trends
        </NavLink>
        <NavLink
          to="insights"
          className={({ isActive }) =>
            isActive
              ? "text-indigo-600 font-semibold"
              : "text-gray-600 hover:text-indigo-600"
          }
        >
          Insights
        </NavLink>
      </nav>

      <div className="space-y-6">
        <Routes>
          <Route path="/" element={<Timeline />} />
          <Route path="trends" element={<Trends />} />
          <Route path="insights" element={<Insights />} />
        </Routes>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card title="Total Entries" className="card">
          <div className="value">{summary.totalEntries ?? "—"}</div>
        </Card>
        <Card title="Avg Mood Pre" className="card">
          <div className="value">{summary.avgMoodPre ?? "—"}</div>
        </Card>
        <Card title="Current Streak" className="card">
          <div className="value">{summary.currentStreak ?? "—"}</div>
        </Card>
      </div>
    </div>
  );
}
