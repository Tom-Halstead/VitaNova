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
    // 1) Fetch entries and goals in parallel
    Promise.all([listEntries(0, 1000), listGoals()])
      .then(([entryResp, goalResp]) => {
        // 2) Extract entries array (listEntries returns { entries: [...] })
        const entries = Array.isArray(entryResp.entries)
          ? entryResp.entries
          : [];

        // 3) Extract goals array (listGoals returns a plain array)
        const goals = Array.isArray(goalResp) ? goalResp : [];

        // 4) Map entries → unified “event” objects
        const entryEvents = entries.map((e) => ({
          id: e.entryId,
          date: e.entryDate, // "YYYY-MM-DD"
          type: "entry",
          title: "Journal Entry",
          detail:
            typeof e.text === "string"
              ? e.text.length > 30
                ? e.text.slice(0, 30) + "…"
                : e.text
              : "",
        }));

        // 5) Map goals → unified “event” objects
        const goalEvents = goals.map((g) => ({
          id: g.goalId,
          date: g.dueDate || g.due_date || "", // depending on exact field name
          type: "goal",
          title: `Goal: ${g.type}`,
          detail: `Progress ${g.currentValue}/${g.targetValue}`,
        }));

        // 6) Combine & sort ascending by ISO date
        const combined = [...entryEvents, ...goalEvents]
          .filter((evt) => evt.date) // remove any without a date
          .sort(
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

  // Format "YYYY-MM-DD" → "MMM D, YYYY" without timezone shift
  const formatDate = (iso) => {
    return new Date(iso + "T00:00:00Z").toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
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
        {/* Central vertical spine */}
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
              {/* Circle icon on the spine */}
              <div
                style={styles.iconCircle}
                onClick={() => {
                  if (evt.type === "entry") {
                    navigate(`/entries/${evt.id}`);
                  } else {
                    navigate(`/goals/${evt.id}`);
                  }
                }}
              >
                {evt.type === "entry" ? <PenIcon /> : <FlagIcon />}
              </div>

              {/* Info card */}
              <div
                style={{
                  ...styles.eventCard,
                  alignItems: isLeft ? "flex-end" : "flex-start",
                }}
                onClick={() => {
                  if (evt.type === "entry") {
                    navigate(`/entries/${evt.id}`);
                  } else {
                    navigate(`/goals/${evt.id}`);
                  }
                }}
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

// Purple pen icon for Journal Entries
function PenIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#6366F1" width="20" height="20">
      <path d="M13.498 2.495a2.5 2.5 0 0 1 3.535 0l4.472 4.472a2.5 2.5 0 0 1 0 3.536l-9.9 9.9a2.5 2.5 0 0 1-1.06.65l-5.369 1.341a.5.5 0 0 1-.605-.605l1.34-5.369a2.5 2.5 0 0 1 .65-1.06l9.9-9.9zm1.414 2.121a.5.5 0 0 0-.707 0l-9.9 9.9a1.5 1.5 0 0 0-.39.636l-.9 3.606 3.606-.9a1.5 1.5 0 0 0 .636-.39l9.9-9.9a.5.5 0 0 0 0-.707l-4.472-4.472z" />
    </svg>
  );
}

// Pink flag icon for Goals
function FlagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#D53F8C" width="20" height="20">
      <path d="M4 22h2V2H4v20zM6 2l10 .01c.14 0 .27.05.38.15L20 5v7l-3.62-2.73a.5.5 0 0 0-.5 0L10 11.01V2z" />
    </svg>
  );
}

const styles = {
  // Page wrapper
  pageWrapper: {
    fontFamily: "'Lato', sans-serif",
    padding: "2rem 1rem",
    background: "#F7FAFC",
    boxSizing: "border-box",
  },
  pageHeader: {
    fontSize: "1.75rem",
    fontWeight: 600,
    color: "#1F2937",
    textAlign: "center",
    marginBottom: "1.5rem",
  },

  // Loading / empty states
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

  // Timeline container
  timelineContainer: {
    position: "relative",
    margin: "0 auto",
    maxWidth: "800px",
    padding: "2rem 0",
  },
  // Vertical spine line
  spine: {
    position: "absolute",
    top: "0",
    bottom: "0",
    left: "50%",
    width: "4px",
    marginLeft: "-2px",
    background: "#E5E7EB",
  },

  // Wrapper for each event (alternates left/right)
  eventWrapper: {
    display: "flex",
    alignItems: "center",
    marginBottom: "2.5rem",
    position: "relative",
    zIndex: 1,
  },

  // Circle holding icon
  iconCircle: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "#FFFFFF",
    border: "3px solid #6366F1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },

  // Info card
  eventCard: {
    background: "#FFFFFF",
    borderRadius: "0.75rem",
    padding: "1rem 1.25rem",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
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

// Hover effects via JS assignment:
styles.iconCircle.onMouseEnter = (e) => {
  e.currentTarget.style.transform = "scale(1.1)";
};
styles.iconCircle.onMouseLeave = (e) => {
  e.currentTarget.style.transform = "scale(1)";
};

styles.eventCard.onMouseEnter = (e) => {
  e.currentTarget.style.transform = "translateY(-4px)";
  e.currentTarget.style.boxShadow = "0 12px 36px rgba(0, 0, 0, 0.12)";
};
styles.eventCard.onMouseLeave = (e) => {
  e.currentTarget.style.transform = "translateY(0)";
  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.08)";
};
