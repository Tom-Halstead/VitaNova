import React, { useEffect, useState } from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';

// Stubs for the three views
function Timeline()  { return <div>Timeline View</div>; }
function Trends()    { return <div>Trends View</div>; }
function Insights()  { return <div>Insights View</div>; }

// Simple stat card
function Card({ title, value }) {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

// Interactive chart placeholder
function InteractiveChart({ data }) {
  return (
    <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
      <span className="text-gray-400">[Interactive Chart]</span>
    </div>
  );
}

export default function Dashboard() {
  const [summary, setSummary] = useState({});
  const [trendData, setTrendData] = useState([]);

  // Fetch summary on mount
  useEffect(() => {
    fetch('/api/dashboard/summary')
      .then(res => res.json())
      .then(setSummary)
      .catch(console.error);
  }, []);

  // Fetch mood-trend when Trends tab mounts
  function loadTrend(days = 30) {
    fetch(`/api/dashboard/mood-trend?days=${days}`)
      .then(res => res.json())
      .then(setTrendData)
      .catch(console.error);
  }

  return (
    <div className="p-6 space-y-6 font-sans">
      {/* Nav */}
      <nav className="flex space-x-4 border-b pb-2">
        <NavLink end to=""       className="hover:underline">Timeline</NavLink>
        <NavLink to="trends"     className="hover:underline">Trends</NavLink>
        <NavLink to="insights"   className="hover:underline">Insights</NavLink>
      </nav>

      {/* Main: either chart or nested view */}
      <Routes>
        <Route
          path="/"
          element={<InteractiveChart data={summary} />}
        />
        <Route
          path="trends"
          element={<Trends onLoad={() => loadTrend()} data={trendData} />}
        />
        <Route
          path="insights"
          element={<Insights />}
        />
      </Routes>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card title="Total Entries"    value={summary.totalEntries    ?? '–'} />
        <Card title="Avg Mood Pre"      value={summary.avgMoodPre       ?? '–'} />
        <Card title="Current Streak"    value={summary.currentStreak    ?? '–'} />
      </div>
    </div>
  );
}
