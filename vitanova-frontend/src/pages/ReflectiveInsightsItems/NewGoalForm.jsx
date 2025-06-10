// File: src/pages/ReflectiveInsightsItems/NewGoalForm.jsx
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
      <div style={styles.field}>
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

      <div style={styles.field}>
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

      <div style={styles.field}>
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

      <div style={styles.buttonContainer}>
        <button
          onClick={onCreate}
          style={styles.button}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.02)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Add Goal
        </button>
      </div>
    </div>
  );
}

const styles = {
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "0.5rem",
    background: "var(--bg)",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    marginBottom: "1rem",
  },
  field: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "0.25rem",
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "var(--text)",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    fontSize: "0.9rem",
    border: "1px solid var(--border)",
    borderRadius: "0.4rem",
    outline: "none",
    background: "var(--bg)",
    color: "var(--text)",
    marginRight: "1rem",
  },
  buttonContainer: {
    display: "flex",
    alignItems: "flex-end",
  },
  button: {
    width: "100%",
    padding: "0.6rem",
    fontSize: "0.9rem",
    background: "linear-gradient(90deg, var(--primary-alt), var(--primary))",
    color: "#FFF",
    border: "none",
    borderRadius: "0.4rem",
    cursor: "pointer",
    fontWeight: 600,
    transition: "transform 0.1s",
  },
};
