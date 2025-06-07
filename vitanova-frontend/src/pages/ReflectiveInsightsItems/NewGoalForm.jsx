import React from "react";

export default function NewGoalForm({
  newType,
  setNewType,
  newTarget,
  setNewTarget,
  newDue,
  setNewDue,
  onCreate,
}) {
  return (
    <div style={styles.form}>
      <div>
        <label htmlFor="goal-type" style={styles.label}>
          Goal Type
        </label>
        <input
          id="goal-type"
          type="text"
          placeholder="e.g. Read Books"
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
          style={styles.input}
        />
      </div>
      <div>
        <label htmlFor="goal-target" style={styles.label}>
          Target Value
        </label>
        <input
          id="goal-target"
          type="number"
          placeholder="100"
          value={newTarget}
          onChange={(e) => setNewTarget(e.target.value)}
          style={styles.input}
        />
      </div>
      <div>
        <label htmlFor="goal-due" style={styles.label}>
          Due Date
        </label>
        <input
          id="goal-due"
          type="date"
          value={newDue}
          onChange={(e) => setNewDue(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={{ display: "flex", alignItems: "flex-end" }}>
        <button onClick={onCreate} style={styles.button}>
          Add Goal
        </button>
      </div>
    </div>
  );
}

const styles = {
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "1.5rem",
    background: "#FFF",
    padding: "1.5rem",
    borderRadius: "0.75rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    marginBottom: "2rem",
  },
  label: {
    display: "block",
    marginBottom: "0.25rem",
    fontWeight: 600,
    color: "#374151",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #E5E7EB",
    borderRadius: "0.5rem",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    background: "linear-gradient(90deg,#6366F1,#4F46E5)",
    color: "#FFF",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontWeight: 600,
  },
};
