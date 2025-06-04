// src/pages/ReflectiveInsightsItems/AllGoalsTabView.jsx

import React, { useState, useEffect } from "react";
import { updateGoal } from "../../api/GoalsApi"; // Adjust path if necessary

export default function AllGoalsTabView({ goals }) {
  // Local copy of goals so edits can be shown immediately
  const [localGoals, setLocalGoals] = useState([]);
  // Which goal ID is currently selected in the tab row
  const [selectedGoalId, setSelectedGoalId] = useState(null);
  // Which goal ID is currently in “reflection editing” mode
  const [editingGoalId, setEditingGoalId] = useState(null);
  // Draft text for the reflection textarea
  const [draftReflection, setDraftReflection] = useState("");

  // Whenever the parent‐supplied `goals` prop changes:
  useEffect(() => {
    if (Array.isArray(goals)) {
      setLocalGoals(goals.slice()); // shallow copy
      if (goals.length > 0 && !goals.some((g) => g.goalId === selectedGoalId)) {
        setSelectedGoalId(goals[0].goalId);
      }
    } else {
      setLocalGoals([]);
      setSelectedGoalId(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goals]);

  // Find the currently selectedGoal object from localGoals
  const selectedGoal =
    localGoals.find((g) => g.goalId === selectedGoalId) || localGoals[0] || {};

  // Handler: enter “edit” mode for a given goal
  const startEditing = (id) => {
    const goal = localGoals.find((g) => g.goalId === id);
    setEditingGoalId(id);
    setDraftReflection(goal?.reflectionText || "");
  };

  // Handler: cancel editing
  const cancelEditing = () => {
    setEditingGoalId(null);
    setDraftReflection("");
  };

  // Handler: save the draftReflection to the API and update local state
  const saveReflection = async (id) => {
    try {
      await updateGoal(id, { reflectionText: draftReflection });
      // Update localGoals so UI reflects the saved text
      setLocalGoals((prev) =>
        prev.map((g) =>
          g.goalId === id ? { ...g, reflectionText: draftReflection } : g
        )
      );
      setEditingGoalId(null);
      setDraftReflection("");
    } catch (err) {
      console.error("Failed to save reflection:", err);
      // (Optionally show a toast / error message here)
    }
  };

  // If there are no goals at all, show a placeholder panel
  if (!Array.isArray(localGoals) || localGoals.length === 0) {
    return (
      <div
        style={{
          padding: "1.5rem",
          background: "#F3F4F6",
          borderRadius: "0.75rem",
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.08)",
          marginTop: "1.5rem",
          textAlign: "center",
          color: "#6B7280",
          fontStyle: "italic",
          fontSize: "1rem",
        }}
      >
        No goals available to display.
      </div>
    );
  }

  return (
    <div
      style={{
        marginTop: "1.5rem",
        background: "#FFFFFF",
        borderRadius: "0.75rem",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.08)",
        padding: "1rem",
      }}
    >
      {/* ─── Tabs Row ─── */}
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          borderBottom: "2px solid #E5E7EB",
          paddingBottom: "0.5rem",
          marginBottom: "1rem",
        }}
      >
        {localGoals.map((g) => {
          const isActive = g.goalId === selectedGoalId;
          const isCompleted = g.status === "COMPLETED";

          // Determine base colors based on status:
          //  • Active (not completed) → purple‐theme
          //  • Completed → green‐theme
          const selectedBg = isCompleted
            ? "linear-gradient(90deg, #1E8449, #28B463)" // dark green → bright green
            : "linear-gradient(90deg, #6D28D9, #4F46E5)"; // dark purple → indigo
          const hoverBg = isCompleted ? "#E9F7EF" : "#F3E8FF"; // light mint  vs. light lavender
          const textColor = isActive ? "#FFFFFF" : "#374151";

          return (
            <button
              key={g.goalId}
              onClick={() => setSelectedGoalId(g.goalId)}
              style={{
                flexShrink: 0,
                padding: "0.6rem 1.2rem",
                marginRight: "0.5rem",
                border: "none",
                borderRadius: "0.5rem 0.5rem 0 0",
                background: isActive ? selectedBg : "transparent",
                color: textColor,
                fontWeight: isActive ? 600 : 500,
                fontSize: "0.95rem",
                cursor: "pointer",
                transition: "background 0.25s, color 0.25s",
                boxShadow: isActive
                  ? isCompleted
                    ? "0 4px 12px rgba(40, 180, 99, 0.2)" // green shadow
                    : "0 4px 12px rgba(79, 70, 229, 0.2)" // purple shadow
                  : "none",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = hoverBg;
                  e.currentTarget.style.color = "#1F2937";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#374151";
                }
              }}
            >
              {g.type.length > 12 ? g.type.slice(0, 12) + "…" : g.type} (
              {new Date(g.createdAt).toLocaleDateString()})
            </button>
          );
        })}
      </div>

      {/* ─── Details Panel ─── */}
      <div
        style={{
          padding: "1.25rem",
          background: "linear-gradient(135deg, #F9FAFB, #FFFFFF)",
          borderRadius: "0.5rem",
          boxShadow: "inset 0 2px 6px rgba(0,0,0,0.04)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h4
          style={{
            margin: 0,
            fontSize: "1.3rem",
            fontWeight: 700,
            color: "#1F2937",
            marginBottom: "0.75rem",
            textShadow: "0 1px 2px rgba(0,0,0,0.05)",
          }}
        >
          {selectedGoal.type}
        </h4>

        <p
          style={{
            margin: 0,
            fontSize: "1.05rem",
            fontWeight: 600,
            color: "#4F46E5",
            marginBottom: "0.75rem",
          }}
        >
          Progress:{" "}
          <span style={{ color: "#9333EA" }}>
            {selectedGoal.currentValue} / {selectedGoal.targetValue}
          </span>{" "}
          (
          {selectedGoal.targetValue > 0
            ? Math.round(
                (selectedGoal.currentValue / selectedGoal.targetValue) * 100
              )
            : 0}
          %)
        </p>

        <div
          style={{
            color: "#6B7280",
            marginBottom: "1rem",
            fontSize: "0.95rem",
          }}
        >
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

        {/* Only show reflection section if this goal is COMPLETED */}
        {selectedGoal.status === "COMPLETED" && (
          <>
            <label
              htmlFor={`reflection-${selectedGoal.goalId}`}
              style={{
                display: "block",
                marginBottom: "0.25rem",
                fontWeight: 600,
                color: "#374151",
                fontSize: "0.95rem",
              }}
            >
              Reflection
            </label>

            {editingGoalId === selectedGoal.goalId ? (
              <>
                <textarea
                  id={`reflection-edit-${selectedGoal.goalId}`}
                  value={draftReflection}
                  onChange={(e) => setDraftReflection(e.target.value)}
                  placeholder="Write your reflection here..."
                  style={{
                    width: "100%",
                    minHeight: "80px",
                    padding: "0.75rem",
                    border: "1px solid #E5E7EB",
                    borderRadius: "0.5rem",
                    outline: "none",
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "0.875rem",
                    color: "#374151",
                    marginBottom: "1rem",
                    resize: "vertical",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "#6366F1")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "#E5E7EB")
                  }
                />
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    onClick={() => saveReflection(selectedGoal.goalId)}
                    style={{
                      flex: 1,
                      padding: "0.6rem",
                      background: "#4F46E5",
                      color: "#FFF",
                      border: "none",
                      borderRadius: "0.5rem",
                      cursor: "pointer",
                      fontWeight: 600,
                      transition: "background 0.2s, transform 0.1s",
                      boxShadow: "0 2px 6px rgba(79, 70, 229, 0.2)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#4338CA";
                      e.currentTarget.style.transform = "scale(1.03)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#4F46E5";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    style={{
                      flex: 1,
                      padding: "0.6rem",
                      background: "#E5E7EB",
                      color: "#374151",
                      border: "none",
                      borderRadius: "0.5rem",
                      cursor: "pointer",
                      fontWeight: 600,
                      transition: "background 0.2s, transform 0.1s",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#D1D5DB";
                      e.currentTarget.style.transform = "scale(1.03)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#E5E7EB";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p
                  id={`reflection-display-${selectedGoal.goalId}`}
                  style={{
                    minHeight: "80px",
                    padding: "0.75rem",
                    border: "1px solid #E5E7EB",
                    borderRadius: "0.5rem",
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "0.875rem",
                    color: "#374151",
                    whiteSpace: "pre-wrap",
                    background: "#FFFFFF",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                    marginBottom: "1rem",
                  }}
                >
                  {selectedGoal.reflectionText || "No reflection written."}
                </p>
                <button
                  onClick={() => startEditing(selectedGoal.goalId)}
                  style={{
                    padding: "0.6rem",
                    background: "#6366F1",
                    color: "#FFF",
                    border: "none",
                    borderRadius: "0.5rem",
                    cursor: "pointer",
                    fontWeight: 600,
                    transition: "background 0.2s, transform 0.1s",
                    boxShadow: "0 2px 6px rgba(99, 102, 241, 0.2)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#4F46E5";
                    e.currentTarget.style.transform = "scale(1.03)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#6366F1";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
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
