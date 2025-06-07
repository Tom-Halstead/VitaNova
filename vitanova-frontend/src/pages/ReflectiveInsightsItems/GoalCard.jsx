import React from "react";

export default function GoalCard({
  goal,
  onSliderChange,
  onMarkComplete,
  onDelete,
}) {
  const pct =
    goal.targetValue > 0
      ? Math.round((goal.currentValue / goal.targetValue) * 100)
      : 0;

  return (
    <div style={styles.card}>
      <span
        style={{
          ...styles.badge,
          background: goal.status === "EXPIRED" ? "#EF4444" : "#FBBF24",
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

      <div style={styles.field}>
        <label htmlFor={`progress-${goal.goalId}`} style={styles.label}>
          Completion: <span style={{ color: "#4F46E5" }}>{pct}%</span>
        </label>
        <input
          id={`progress-${goal.goalId}`}
          type="range"
          min="0"
          max="100"
          step="1"
          value={pct}
          onChange={(e) =>
            onSliderChange(goal.goalId, parseInt(e.target.value, 10))
          }
          style={styles.slider}
        />
      </div>

      <div style={styles.buttons}>
        <button
          onClick={() => onMarkComplete(goal.goalId)}
          style={styles.completeBtn}
        >
          Mark Complete
        </button>
        <button onClick={() => onDelete(goal.goalId)} style={styles.deleteBtn}>
          Delete
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    position: "relative",
    background: "#FFF",
    borderRadius: "0.75rem",
    padding: "1.5rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
  },
  badge: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    color: "#FFF",
    padding: "0.25rem 0.75rem",
    borderRadius: "999px",
    fontSize: "0.75rem",
    fontWeight: 600,
  },
  title: {
    margin: 0,
    fontSize: "1.25rem",
    color: "#1F2937",
    marginBottom: "0.5rem",
  },
  progress: {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#4F46E5",
    margin: "0.5rem 0 1rem",
  },
  meta: {
    fontSize: "0.875rem",
    color: "#6B7280",
    lineHeight: 1.4,
    marginBottom: "1rem",
  },
  field: { marginBottom: "1rem" },
  label: { display: "block", marginBottom: "0.5rem", fontWeight: 600 },
  slider: {
    width: "100%",
    height: "8px",
    borderRadius: "4px",
    background: "#E5E7EB",
    outline: "none",
  },
  buttons: { display: "flex", gap: "0.5rem" },
  completeBtn: {
    flex: 1,
    padding: "0.5rem",
    background: "#10B981",
    color: "#FFF",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontWeight: 600,
  },
  deleteBtn: {
    flex: 1,
    padding: "0.5rem",
    background: "#FECACA",
    color: "#B91C1C",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontWeight: 600,
  },
};
