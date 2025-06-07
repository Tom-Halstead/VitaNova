import React from "react";

export default function GoalModal({
  goal,
  draft,
  editingId,
  onSave,
  onCancel,
  onStartEdit,
  onClose,
}) {
  const pct =
    goal.targetValue > 0
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
            {new Date(goal.completionDate).toLocaleDateString()}
          </div>
          <div>
            <strong>Status:</strong> {goal.status}
          </div>
          <div>
            <strong>Due by:</strong>{" "}
            {goal.dueDate ? new Date(goal.dueDate).toLocaleDateString() : "–"}
          </div>
        </div>

        {goal.status === "COMPLETED" &&
          (editingId === goal.goalId ? (
            <>
              <label htmlFor="edit" style={styles.label}>
                Edit Reflection
              </label>
              <textarea
                id="edit"
                value={draft}
                onChange={(e) => onStartEdit(goal.goalId, e.target.value)}
                style={styles.textarea}
              />
              <div style={styles.modalButtons}>
                <button
                  onClick={() => onSave(goal.goalId)}
                  style={styles.saveBtn}
                >
                  Save
                </button>
                <button onClick={onCancel} style={styles.cancelBtn}>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <label style={styles.label}>Reflection</label>
              <p style={styles.display}>
                {goal.reflectionText || "No reflection."}
              </p>
              <button
                onClick={() => onStartEdit(goal.goalId, goal.reflectionText)}
                style={styles.saveBtn}
              >
                Edit Reflection
              </button>
            </>
          ))}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  modal: {
    background: "#FFF",
    borderRadius: "0.75rem",
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
    padding: "2rem",
    maxWidth: "500px",
    width: "90%",
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    background: "transparent",
    border: "none",
    fontSize: "1.25rem",
    cursor: "pointer",
  },
  title: { margin: 0, fontSize: "1.5rem", fontWeight: 600 },
  progress: {
    fontSize: "1rem",
    fontWeight: 600,
    color: "#4F46E5",
    margin: "1rem 0",
  },
  meta: {
    color: "#6B7280",
    marginBottom: "1rem",
    fontSize: "0.95rem",
    lineHeight: 1.4,
  },
  label: { display: "block", marginBottom: "0.25rem", fontWeight: 600 },
  textarea: {
    width: "100%",
    minHeight: "80px",
    padding: "0.75rem",
    border: "1px solid #E5E7EB",
    borderRadius: "0.5rem",
    marginBottom: "1rem",
    resize: "vertical",
  },
  display: {
    minHeight: "80px",
    padding: "0.75rem",
    background: "#F9FAFB",
    border: "1px solid #E5E7EB",
    borderRadius: "0.5rem",
    marginBottom: "1rem",
  },
  modalButtons: { display: "flex", gap: "0.5rem" },
  saveBtn: {
    flex: 1,
    padding: "0.5rem",
    background: "#4F46E5",
    color: "#FFF",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontWeight: 600,
  },
  cancelBtn: {
    flex: 1,
    padding: "0.5rem",
    background: "#E5E7EB",
    color: "#374151",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontWeight: 600,
  },
};
