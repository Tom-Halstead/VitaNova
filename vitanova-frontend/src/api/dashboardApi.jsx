// src/api/dashboardApi.js

import { request } from "../api/ApiServices";

// src/api/DashboardApi.js
export async function fetchSummary() {
  const res = await fetch("/api/dashboard/summary", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to load summary");
  return res.json(); // { totalEntries, avgMoodPre, avgMoodPost, totalPhotos }
}

export async function fetchMoodTrend(days = 30) {
  const res = await fetch(`/api/dashboard/mood-trend?days=${days}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to load mood trend");
  return res.json(); // [ { date, avgMood }, … ]
}

export async function fetchFrequency(days = 30) {
  const res = await fetch(`/api/dashboard/frequency?days=${days}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to load frequency");
  return res.json(); // [ { date, count }, … ]
}
