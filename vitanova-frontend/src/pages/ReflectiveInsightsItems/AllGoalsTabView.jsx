// File: src/pages/ReflectiveInsightsItems/AllGoalsTabView.jsx
import React, { useState, useEffect } from "react";
import { updateGoal } from "../../api/GoalsApi";

export default function AllGoalsTabView({ goals }) {
  const [localGoals, setLocalGoals] = useState([]);
  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const [editingGoalId, setEditingGoalId] = useState(null);
  const [draftReflection, setDraftReflection] = useState("");

  useEffect(() => {
    if (Array.isArray(goals)) {
      setLocalGoals(goals.slice());
      if (goals.length && !goals.some((g) => g.goalId === selectedGoalId)) {
        setSelectedGoalId(goals[0].goalId);
      }
    } else {
      setLocalGoals([]);
      setSelectedGoalId(null);
    }
  }, [goals]);

  const selectedGoal =
    localGoals.find((g) => g.goalId === selectedGoalId) || localGoals[0] || {};

  const startEditing = (id) => {
    const goal = localGoals.find((g) => g.goalId === id);
    setEditingGoalId(id);
    setDraftReflection(goal?.reflectionText || "");
  };
  const cancelEditing = () => {
    setEditingGoalId(null);
    setDraftReflection("");
  };
  const saveReflection = async (id) => {
    try {
      await updateGoal(id, { reflectionText: draftReflection });
      setLocalGoals((prev) =>
        prev.map((g) =>
          g.goalId === id ? { ...g, reflectionText: draftReflection } : g
        )
      );
    } catch (err) {
      console.error("Failed to save reflection:", err);
    } finally {
      setEditingGoalId(null);
      setDraftReflection("");
    }
  };

  if (!localGoals.length) {
    return <div style={styles.empty}>No goals available to display.</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.tabsRow}>
        {localGoals.map((g) => {
          const isActive = g.goalId === selectedGoalId;
          const isCompleted = g.status === "COMPLETED";
          return (
            <button
              key={g.goalId}
              onClick={() => setSelectedGoalId(g.goalId)}
              style={{
                ...styles.tab,
                background: isActive
                  ? isCompleted
                    ? "linear-gradient(90deg, var(--success-bg), var(--primary))"
                    : "linear-gradient(90deg, var(--primary), var(--primary-alt))"
                  : "transparent",
                color: isActive ? "var(--success-text)" : "var(--text)",
                boxShadow: isActive
                  ? isCompleted
                    ? "0 4px 12px rgba(40,180,99,0.2)"
                    : "0 4px 12px rgba(79,70,229,0.2)"
                  : "none",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "var(--bg-alt)";
                  e.currentTarget.style.color = "var(--text)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--text)";
                }
              }}
            >
              {g.type.length > 12 ? g.type.slice(0, 12) + "…" : g.type} (
              {new Date(g.createdAt).toLocaleDateString()})
            </button>
          );
        })}
      </div>

      <div style={styles.panel}>
        <h4 style={styles.panelTitle}>{selectedGoal.type}</h4>
        <p style={styles.panelProgress}>
          Progress:{" "}
          <span style={{ color: "var(--primary)" }}>
            {selectedGoal.currentValue}/{selectedGoal.targetValue}
          </span>{" "}
          (
          {selectedGoal.targetValue
            ? Math.round(
                (selectedGoal.currentValue / selectedGoal.targetValue) * 100
              )
            : 0}
          %)
        </p>

        <div style={styles.meta}>
          <div>
            <strong>Created:</strong>{" "}
            {new Date(selectedGoal.createdAt).toLocaleDateString()}
          </div>
          <div>
            <strong>Due by:</strong>{" "}
            {selectedGoal.dueDate
              ? new Date(selectedGoal.dueDate).toLocaleDateString()
              : "–"}
          </div>
          <div>
            <strong>Status:</strong> {selectedGoal.status}
          </div>
          {selectedGoal.status === "COMPLETED" && (
            <div>
              <strong>Completed:</strong>{" "}
              {new Date(selectedGoal.completionDate).toLocaleDateString()}
            </div>
          )}
        </div>

        {selectedGoal.status === "COMPLETED" && (
          <>
            <label
              htmlFor={`reflection-${selectedGoal.goalId}`}
              style={styles.label}
            >
              Reflection
            </label>
            {editingGoalId === selectedGoal.goalId ? (
              <>
                <textarea
                  id={`reflection-edit-${selectedGoal.goalId}`}
                  value={draftReflection}
                  onChange={(e) => setDraftReflection(e.target.value)}
                  style={styles.textarea}
                />
                <div style={styles.buttonGroup}>
                  <button
                    onClick={() => saveReflection(selectedGoal.goalId)}
                    style={styles.saveBtn}
                  >
                    Save
                  </button>
                  <button onClick={cancelEditing} style={styles.cancelBtn}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p style={styles.display}>
                  {selectedGoal.reflectionText || "No reflection written."}
                </p>
                <button
                  onClick={() => startEditing(selectedGoal.goalId)}
                  style={styles.editBtn}
                >
                  Edit Reflection
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
  empty: {
    padding: "1.5rem",
    background: "var(--bg-alt)",
    borderRadius: "0.75rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    marginTop: "1.5rem",
    textAlign: "center",
    color: "var(--text-light)",
    fontStyle: "italic",
  },
  container: {
    marginTop: "1.5rem",
    background: "var(--bg)",
    borderRadius: "0.75rem",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
    padding: "1rem",
  },
  tabsRow: {
    display: "flex",
    overflowX: "auto",
    borderBottom: "2px solid var(--border)",
    paddingBottom: "0.5rem",
    marginBottom: "1rem",
  },
  tab: {
    flexShrink: 0,
    padding: "0.6rem 1.2rem",
    marginRight: "0.5rem",
    border: "none",
    borderRadius: "0.5rem 0.5rem 0 0",
    fontSize: "0.95rem",
    cursor: "pointer",
    transition: "background 0.25s, color 0.25s",
  },
  panel: {
    padding: "1.25rem",
    background: "var(--bg-alt)",
    borderRadius: "0.5rem",
    boxShadow: "inset 0 2px 6px rgba(0,0,0,0.04)",
  },
  panelTitle: {
    margin: 0,
    fontSize: "1.3rem",
    fontWeight: 700,
    color: "var(--text)",
    marginBottom: "0.75rem",
  },
  panelProgress: {
    margin: 0,
    fontSize: "1.05rem",
    fontWeight: 600,
    color: "var(--primary)",
    marginBottom: "0.75rem",
  },
  meta: {
    color: "var(--text-light)",
    marginBottom: "1rem",
    fontSize: "0.95rem",
    lineHeight: 1.4,
  },
  label: {
    display: "block",
    marginBottom: "0.25rem",
    fontWeight: 600,
    color: "var(--text)",
  },
  textarea: {
    width: "100%",
    minHeight: "80px",
    padding: "0.75rem",
    border: "1px solid var(--border)",
    borderRadius: "0.5rem",
    resize: "vertical",
    marginBottom: "1rem",
    fontSize: "0.875rem",
    color: "var(--text)",
    background: "var(--bg)",
  },
  display: {
    minHeight: "80px",
    padding: "0.75rem",
    background: "var(--bg-alt)",
    border: "1px solid var(--border)",
    borderRadius: "0.5rem",
    marginBottom: "1rem",
    fontSize: "0.875rem",
    color: "var(--text)",
  },
  editBtn: {
    padding: "0.5rem 1rem",
    background: "var(--primary)",
    color: "#FFF",
    border: "none",
    borderRadius: "0.5rem",
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
    borderRadius: "0.5rem",
    fontWeight: 600,
    cursor: "pointer",
  },
  cancelBtn: {
    flex: 1,
    padding: "0.5rem",
    background: "var(--border)",
    color: "var(--text)",
    border: "none",
    borderRadius: "0.5rem",
    fontWeight: 600,
    cursor: "pointer",
  },
};
