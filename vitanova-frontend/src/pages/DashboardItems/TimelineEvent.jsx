// File: src/components/TimelineEvent.jsx
import React, { useState } from "react";

export default function TimelineEvent({ evt, idx, onSelect }) {
  const [hover, setHover] = useState(false);
  const isLeft = idx % 2 === 0;
  const lines = (evt.fullDetail || "").split("\n").slice(0, 3);

  return (
    <div
      style={{
        ...styles.wrapper,
        flexDirection: isLeft ? "row-reverse" : "row",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        style={{
          ...styles.icon,
          borderColor:
            evt.type === "entry" ? "var(--primary)" : "var(--error-bg)",
        }}
        onClick={onSelect}
      >
        {evt.type === "entry" ? (
          <svg viewBox="0 0 24 24" fill="var(--primary)" width="20" height="20">
            {/* pen icon path */}
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="var(--error-bg)"
            width="20"
            height="20"
          >
            {/* flag icon path */}
          </svg>
        )}
      </div>

      <div
        style={{
          ...styles.card,
          alignItems: isLeft ? "flex-end" : "flex-start",
        }}
        onClick={onSelect}
      >
        <div style={styles.date}>{evt.displayDate}</div>
        <div style={styles.title}>{evt.title}</div>
        <div style={styles.detail}>{evt.detail}</div>

        {hover && (
          <div style={styles.tooltip}>
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
  wrapper: {
    display: "flex",
    alignItems: "center",
    marginBottom: "2.5rem",
    position: "relative",
    zIndex: 1,
  },
  icon: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "var(--bg)",
    border: "3px solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "transform 0.2s",
  },
  card: {
    background: "var(--bg)",
    borderRadius: "0.75rem",
    padding: "1rem 1.25rem",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    maxWidth: "300px",
    cursor: "pointer",
    position: "relative",
    color: "var(--text)",
  },
  date: {
    fontSize: "0.875rem",
    color: "var(--text-light)",
    marginBottom: "0.5rem",
  },
  title: {
    fontSize: "1rem",
    fontWeight: 600,
    color: "var(--text)",
    marginBottom: "0.5rem",
  },
  detail: {
    fontSize: "0.9rem",
    color: "var(--text-light)",
    lineHeight: 1.4,
  },
  tooltip: {
    position: "absolute",
    bottom: "100%",
    left: "50%",
    transform: "translateX(-50%) translateY(-8px)",
    background: "var(--text)",
    color: "var(--bg)",
    padding: "0.5rem",
    borderRadius: "0.25rem",
    fontSize: "0.85rem",
    whiteSpace: "pre-wrap",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    zIndex: 10,
    pointerEvents: "none",
  },
};
