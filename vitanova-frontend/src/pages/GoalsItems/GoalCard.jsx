// File: src/components/GoalCard.jsx
import React from "react";

export default function GoalCard({
  goal,
  onSliderChange,
  onMarkComplete,
  onDelete,
  onViewDetail,
}) {
  if (!goal) return null;

  const pct = goal.targetValue
    ? Math.round((goal.currentValue / goal.targetValue) * 100)
    : 0;

  return (
    <div
      style={styles.card}
      onClick={onViewDetail}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.02)";
        e.currentTarget.style.boxShadow = "0 12px 36px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)";
      }}
    >
      <span
        style={{
          ...styles.badge,
          background:
            goal.status === "EXPIRED" ? "var(--error-bg)" : "var(--success-bg)",
          color:
            goal.status === "EXPIRED"
              ? "var(--error-text)"
              : "var(--success-text)",
        }}
      >
        {goal.status}
      </span>

      <h3 style={styles.title}>{goal.type}</h3>
      <p style={styles.progress}>
        {goal.currentValue} / {goal.targetValue}
      </p>

      <div style={styles.meta}>
        <div>
          <strong>Created:</strong>{" "}
          {new Date(goal.createdAt).toLocaleDateString()}
        </div>
        <div>
          <strong>Due by:</strong>{" "}
          {goal.dueDate ? new Date(goal.dueDate).toLocaleDateString() : "–"}
        </div>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <label htmlFor={`progress-${goal.goalId}`} style={styles.label}>
          Completion: <span style={{ color: "var(--primary)" }}>{pct}%</span>
        </label>
        <input
          id={`progress-${goal.goalId}`}
          type="range"
          min="0"
          max="100"
          step="1"
          value={pct}
          onChange={(e) => {
            e.stopPropagation();
            onSliderChange(goal.goalId, +e.target.value);
          }}
          style={styles.slider}
        />
      </div>

      <div style={styles.buttons}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMarkComplete(goal.goalId);
          }}
          style={styles.completeBtn}
        >
          Mark Complete
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(goal.goalId);
          }}
          style={styles.deleteBtn}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    position: "relative",
    background: "var(--bg)",
    borderRadius: "0.75rem",
    padding: "1.5rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  badge: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    padding: "0.25rem 0.75rem",
    borderRadius: "999px",
    fontSize: "0.75rem",
    fontWeight: 600,
  },
  title: {
    margin: 0,
    fontSize: "1.25rem",
    color: "var(--text)",
  },
  progress: {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "var(--primary)",
    margin: "0.5rem 0",
  },
  meta: {
    fontSize: "0.875rem",
    color: "var(--text-light)",
    lineHeight: 1.4,
  },
  label: {
    display: "block",
    marginBottom: "0.25rem",
    fontWeight: 600,
    color: "var(--text)",
  },
  slider: {
    width: "100%",
    height: "8px",
    borderRadius: "4px",
    background: "var(--border)",
    outline: "none",
    transition: "background 0.2s",
  },
  buttons: {
    marginTop: "1rem",
    display: "flex",
    gap: "0.5rem",
  },
  completeBtn: {
    flex: 1,
    padding: "0.5rem",
    background: "var(--success-bg)",
    color: "var(--success-text)",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontWeight: 600,
  },
  deleteBtn: {
    flex: 1,
    padding: "0.5rem",
    background: "var(--error-bg)",
    color: "var(--error-text)",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontWeight: 600,
  },
};
