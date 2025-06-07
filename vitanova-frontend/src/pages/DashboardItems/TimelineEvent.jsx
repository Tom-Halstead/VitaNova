import React, { useState } from "react";

export default function TimelineEvent({ evt, idx, onSelect }) {
  const [hover, setHover] = useState(false);
  const isLeft = idx % 2 === 0;
  const lines = (evt.fullDetail || "").split("\n").slice(0, 3);

  return (
    <div
      style={{
        ...styles.eventWrapper,
        flexDirection: isLeft ? "row-reverse" : "row",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        style={{
          ...styles.iconCircle,
          borderColor: evt.type === "entry" ? "#6366F1" : "#D53F8C",
        }}
        onClick={onSelect}
      >
        {evt.type === "entry" ? (
          <svg viewBox="0 0 24 24" fill="#6366F1" width="20" height="20">
            {/* pen icon path */}
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="#D53F8C" width="20" height="20">
            {/* flag icon path */}
          </svg>
        )}
      </div>

      <div
        style={{
          ...styles.eventCard,
          alignItems: isLeft ? "flex-end" : "flex-start",
        }}
        onClick={onSelect}
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
    transition: "transform 0.2s",
  },
  eventCard: {
    background: "#FFF",
    borderRadius: "0.75rem",
    padding: "1rem 1.25rem",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    maxWidth: "300px",
    cursor: "pointer",
    position: "relative",
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
