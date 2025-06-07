// src/pages/Timeline.jsx

import React, { useEffect, useState } from "react";
import { listEntries } from "../../api/EntriesApi";
import { listGoals } from "../../api/GoalsApi";
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
          date: e.entryDate, // placement
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
            // place on completionDate (if done) or dueDate (if active)
            const placement = g.completionDate || g.dueDate || null;
            if (!placement) return null;

            const started = g.createdAt;
            const finished = g.completionDate;
            return {
              id: g.goalId,
              date: placement,
              type: "goal",
              title: `Goal: ${g.type}`,
              detail: `Progress ${g.currentValue || 0}/${g.targetValue}`,
              fullDetail:
                `🟢 Started: ${started ? formatDate(started) : "Unknown"}\n` +
                `🔴 Finished: ${
                  finished ? formatDate(finished) : "Pending"
                }\n` +
                `📈 Progress: ${g.currentValue || 0}/${g.targetValue}`,
            };
          })
          .filter(Boolean);

        // 5) Combine & sort by date ascending
        const combined = [...entryEvents, ...goalEvents].sort(
          (a, b) =>
            new Date(a.date + "T00:00:00Z") - new Date(b.date + "T00:00:00Z")
        );

        setEvents(combined);
      })
      .catch((err) => {
        console.error("Failed to load timeline data:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Helper to format YYYY-MM-DD → "MMM D, YYYY"
  const formatDate = (iso) =>
    new Date(iso + "T00:00:00Z").toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });

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

        {events.map((evt, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <div
              key={`${evt.type}-${evt.id}-${idx}`}
              style={{
                ...styles.eventWrapper,
                flexDirection: isLeft ? "row-reverse" : "row",
              }}
            >
              {/* Marker */}
              <div
                style={{
                  ...styles.iconCircle,
                  borderColor: evt.type === "entry" ? "#6366F1" : "#D53F8C",
                }}
                onClick={() => {
                  if (evt.type === "entry") {
                    navigate(`/entries/${evt.id}`);
                  } else {
                    // send to your ReflectiveInsights page with query
                    navigate(`/insights-goals?selected=${evt.id}`);
                  }
                }}
                title={evt.fullDetail}
              >
                {evt.type === "entry" ? <PenIcon /> : <FlagIcon />}
              </div>

              {/* Card */}
              <div
                style={{
                  ...styles.eventCard,
                  alignItems: isLeft ? "flex-end" : "flex-start",
                }}
                onClick={() => {
                  if (evt.type === "entry") {
                    navigate(`/entries/${evt.id}`);
                  } else {
                    navigate(`/insights-goals?selected=${evt.id}`);
                  }
                }}
                title={evt.fullDetail}
              >
                <div style={styles.eventDate}>{formatDate(evt.date)}</div>
                <div style={styles.eventTitle}>{evt.title}</div>
                <div style={styles.eventDetail}>{evt.detail}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Icons
function PenIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#6366F1" width="20" height="20">
      <path d="M13.498 2.495a2.5 2.5 0 0 1 3.535 0l4.472 4.472a2.5 2.5 0 0 1 0 3.536l-9.9 9.9a2.5 2.5 0 0 1-1.06.65l-5.369 1.341a.5.5 0 0 1-.605-.605l1.34-5.369a2.5 2.5 0 0 1 .65-1.06l9.9-9.9zm1.414 2.121a.5.5 0 0 0-.707 0l-9.9 9.9a1.5 1.5 0 0 0-.39.636l-.9 3.606 3.606-.9a1.5 1.5 0 0 0 .636-.39l9.9-9.9a.5.5 0 0 0 0-.707l-4.472-4.472z" />
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#D53F8C" width="20" height="20">
      <path d="M4 22h2V2H4v20zM6 2l10 .01c.14 0 .27.05.38.15L20 5v7l-3.62-2.73a.5.5 0 0 0-.5 0L10 11.01V2z" />
    </svg>
  );
}

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
    margin: "0 auto",
    maxWidth: "800px",
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
  eventWrapper: {
    display: "flex",
    alignItems: "center",
    marginBottom: "2.5rem",
    position: "relative",
    zIndex: 1,
  },
  iconCircle: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "#FFF",
    border: "3px solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },
  eventCard: {
    background: "#FFF",
    borderRadius: "0.75rem",
    padding: "1rem 1.25rem",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    maxWidth: "300px",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  eventDate: {
    fontSize: "0.875rem",
    color: "#6B7280",
    marginBottom: "0.5rem",
  },
  eventTitle: {
    fontSize: "1rem",
    fontWeight: 600,
    color: "#2D3748",
    marginBottom: "0.5rem",
  },
  eventDetail: {
    fontSize: "0.9rem",
    color: "#4A5568",
    lineHeight: 1.4,
  },
};

// Hover effects
styles.iconCircle.onMouseEnter = (e) =>
  (e.currentTarget.style.transform = "scale(1.1)");
styles.iconCircle.onMouseLeave = (e) =>
  (e.currentTarget.style.transform = "scale(1)");

styles.eventCard.onMouseEnter = (e) => {
  e.currentTarget.style.transform = "translateY(-4px)";
  e.currentTarget.style.boxShadow = "0 12px 36px rgba(0,0,0,0.12)";
};
styles.eventCard.onMouseLeave = (e) => {
  e.currentTarget.style.transform = "translateY(0)";
  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
};
