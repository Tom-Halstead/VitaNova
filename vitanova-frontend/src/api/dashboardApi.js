// src/api/dashboardApi.js

export async function fetchSummary() {
  const res = await fetch("/api/dashboard/summary", {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to load summary");
  return res.json();
}

export async function fetchMoodTrend(days = 30) {
  const res = await fetch(`/api/dashboard/mood-trend?days=${days}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to load mood trend");
  return res.json();
}
