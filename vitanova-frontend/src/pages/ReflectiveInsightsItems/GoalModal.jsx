// File: src/pages/ReflectiveInsightsItems/GoalModal.jsx
import React, { useState } from "react";

export default function GoalModal({ goal, onSave, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(goal.reflectionText || "");

  const pct = goal.targetValue
    ? Math.round((goal.currentValue / goal.targetValue) * 100)
    : 0;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={styles.closeBtn}>
          ✕
        </button>
        <h3 style={styles.title}>{goal.type}</h3>
        <p style={styles.progress}>
          Progress: {goal.currentValue} / {goal.targetValue} ({pct}%)
        </p>
        <div style={styles.meta}>
          <div>
            <strong>Created:</strong>{" "}
            {new Date(goal.createdAt).toLocaleDateString()}
          </div>
          <div>
            <strong>Completed:</strong>{" "}
            {goal.completionDate
              ? new Date(goal.completionDate).toLocaleDateString()
              : "—"}
          </div>
          <div>
            <strong>Status:</strong> {goal.status}
          </div>
          <div>
            <strong>Due by:</strong>{" "}
            {goal.dueDate ? new Date(goal.dueDate).toLocaleDateString() : "—"}
          </div>
        </div>

        {goal.status === "COMPLETED" && (
          <>
            {isEditing ? (
              <>
                <label htmlFor="reflection-edit" style={styles.label}>
                  Edit Reflection
                </label>
                <textarea
                  id="reflection-edit"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  style={styles.textarea}
                />
                <div style={styles.buttonGroup}>
                  <button
                    style={styles.saveBtn}
                    onClick={() => {
                      onSave(goal.goalId, text);
                      setIsEditing(false);
                    }}
                  >
                    Save
                  </button>
                  <button
                    style={styles.cancelBtn}
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <label style={styles.label}>Reflection</label>
                <p style={styles.display}>
                  {goal.reflectionText || "No reflection written."}
                </p>
                <button
                  style={styles.editBtn}
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  modal: {
    background: "var(--bg)",
    borderRadius: "8px",
    padding: "2rem",
    maxWidth: "500px",
    width: "90%",
    position: "relative",
    boxSizing: "border-box",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
  },
  closeBtn: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    background: "transparent",
    border: "none",
    fontSize: "1.25rem",
    cursor: "pointer",
    color: "var(--text-light)",
  },
  title: {
    margin: 0,
    fontSize: "1.5rem",
    color: "var(--text)",
    marginBottom: "0.5rem",
  },
  progress: {
    fontSize: "1rem",
    fontWeight: 600,
    color: "var(--primary)",
    marginBottom: "1rem",
  },
  meta: {
    fontSize: "0.95rem",
    color: "var(--text-light)",
    marginBottom: "1.5rem",
    lineHeight: 1.4,
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: 600,
    color: "var(--text)",
  },
  textarea: {
    width: "100%",
    minHeight: "80px",
    padding: "0.75rem",
    border: "1px solid var(--border)",
    borderRadius: "4px",
    resize: "vertical",
    marginBottom: "1rem",
    fontFamily: "'Lato', sans-serif",
    fontSize: "0.875rem",
    color: "var(--text)",
    background: "var(--bg)",
  },
  display: {
    minHeight: "80px",
    padding: "0.75rem",
    background: "var(--bg-alt)",
    border: "1px solid var(--border)",
    borderRadius: "4px",
    marginBottom: "1rem",
    fontFamily: "'Lato', sans-serif",
    fontSize: "0.875rem",
    color: "var(--text)",
  },
  editBtn: {
    padding: "0.5rem 1rem",
    background: "var(--primary)",
    color: "#FFF",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: 600,
  },
  buttonGroup: {
    display: "flex",
    gap: "0.5rem",
  },
  saveBtn: {
    flex: 1,
    padding: "0.5rem",
    background: "var(--success-bg)",
    color: "var(--success-text)",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: 600,
  },
  cancelBtn: {
    flex: 1,
    padding: "0.5rem",
    background: "var(--border)",
    color: "var(--text)",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: 600,
  },
};
