// src/pages/ReflectiveInsightsItems/TimelineEvent.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TimelineEvent({ evt, idx }) {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const isLeft = idx % 2 === 0;

  // split fullDetail into lines and take up to 3 for the tooltip
  const lines = evt.fullDetail.split("\n").slice(0, 3);

  return (
    <div
      style={{
        ...styles.eventWrapper,
        flexDirection: isLeft ? "row-reverse" : "row",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* marker */}
      <div
        style={{
          ...styles.iconCircle,
          borderColor: evt.type === "entry" ? "#6366F1" : "#D53F8C",
        }}
        onClick={() =>
          evt.type === "entry"
            ? navigate(`/entries/${evt.id}`)
            : navigate(`/insights-goals?selected=${evt.id}`)
        }
      >
        {evt.type === "entry" ? <PenIcon /> : <FlagIcon />}
      </div>

      {/* card */}
      <div
        style={{
          ...styles.eventCard,
          alignItems: isLeft ? "flex-end" : "flex-start",
        }}
        onClick={() =>
          evt.type === "entry"
            ? navigate(`/entries/${evt.id}`)
            : navigate(`/insights-goals?selected=${evt.id}`)
        }
      >
        <div style={styles.eventDate}>{evt.displayDate}</div>
        <div style={styles.eventTitle}>{evt.title}</div>
        <div style={styles.eventDetail}>{evt.detail}</div>

        {hover && (
          <div style={styles.hoverTooltip}>
            {lines.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        )}
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

// Styles specific to TimelineEvent
const styles = {
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
    position: "relative",
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
  hoverTooltip: {
    position: "absolute",
    bottom: "100%",
    left: "50%",
    transform: "translateX(-50%) translateY(-8px)",
    background: "#374151",
    color: "#FFF",
    padding: "0.5rem",
    borderRadius: "0.25rem",
    fontSize: "0.85rem",
    whiteSpace: "pre-wrap",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    zIndex: 10,
    pointerEvents: "none",
  },
};
