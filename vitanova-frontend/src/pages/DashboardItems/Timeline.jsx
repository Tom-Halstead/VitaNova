// src/pages/Timeline.jsx

import React, { useEffect, useState } from "react";
import { listEntries } from "../../api/EntriesApi";
import { listGoals } from "../../api/GoalsApi";
import TimelineEvent from "./TimelineEvent";
import { useNavigate } from "react-router-dom";

export default function Timeline() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([listEntries(0, 1000), listGoals()])
      .then(([entryResp, goalResp]) => {
        // 1) Pull out entries
        const entries = Array.isArray(entryResp.entries)
          ? entryResp.entries
          : [];

        // 2) Pull out goals (supports paged .content or raw array)
        const rawGoals = Array.isArray(goalResp)
          ? goalResp
          : Array.isArray(goalResp.content)
          ? goalResp.content
          : [];

        // 3) Map entries → events
        const entryEvents = entries.map((e) => ({
          id: e.entryId,
          sortDate: new Date(e.entryDate),
          displayDate: formatDate(e.entryDate),
          type: "entry",
          title: "Journal Entry",
          detail:
            typeof e.text === "string"
              ? e.text.length > 30
                ? e.text.slice(0, 30) + "…"
                : e.text
              : "",
          fullDetail: `📅 ${formatDate(e.entryDate)}\n${e.text || ""}`,
        }));

        // 4) Map goals → events
        const goalEvents = rawGoals
          .map((g) => {
            const placement = g.completionDate || g.dueDate;
            if (!placement) return null;
            return {
              id: g.goalId,
              sortDate: new Date(placement),
              displayDate: formatDate(placement),
              type: "goal",
              title: `Goal: ${g.type}`,
              detail: `Progress ${g.currentValue || 0}/${g.targetValue}`,
              fullDetail:
                `🟢 Started: ${
                  g.createdAt ? formatDate(g.createdAt) : "Unknown"
                }\n` +
                `🔴 Finished: ${
                  g.completionDate ? formatDate(g.completionDate) : "Pending"
                }\n` +
                `📈 Progress: ${g.currentValue || 0}/${g.targetValue}`,
            };
          })
          .filter(Boolean);

        // 5) Combine & sort by date ascending
        const combined = [...entryEvents, ...goalEvents].sort(
          (a, b) => a.sortDate - b.sortDate
        );
        setEvents(combined);
      })
      .catch((err) => console.error("Failed to load timeline data:", err))
      .finally(() => setLoading(false));
  }, []);

  // Helper to format ISO or YYYY-MM-DD
  const formatDate = (iso) => {
    const d = new Date(iso);
    if (isNaN(d)) return iso;
    return d.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <span style={styles.loadingText}>Loading timeline…</span>
      </div>
    );
  }

  if (!events.length) {
    return (
      <div style={styles.loadingContainer}>
        <span style={styles.loadingText}>No events to display.</span>
      </div>
    );
  }

  return (
    <div style={styles.pageWrapper}>
      <h2 style={styles.pageHeader}>🕓 Activity & Goal Timeline</h2>
      <div style={styles.timelineContainer}>
        <div style={styles.spine} />
        {events.map((evt, idx) => (
          <TimelineEvent
            key={`${evt.type}-${evt.id}-${idx}`}
            evt={evt}
            idx={idx}
          />
        ))}
      </div>
    </div>
  );
}

// Styles for Timeline.jsx
const styles = {
  pageWrapper: {
    fontFamily: "'Lato', sans-serif",
    padding: "2rem 1rem",
    background: "#F7FAFC",
  },
  pageHeader: {
    fontSize: "1.75rem",
    fontWeight: 600,
    color: "#1F2937",
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  loadingContainer: {
    minHeight: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: "1rem",
    color: "#6B7280",
  },
  timelineContainer: {
    position: "relative",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "2rem 0",
  },
  spine: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "50%",
    width: "4px",
    background: "#E5E7EB",
    transform: "translateX(-2px)",
  },
};
