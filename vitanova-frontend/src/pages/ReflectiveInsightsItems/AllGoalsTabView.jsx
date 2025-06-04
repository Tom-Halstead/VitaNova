// src/pages/ReflectiveInsightsItems/AllGoalsTabView.jsx

import React, { useState, useEffect } from "react";

export default function AllGoalsTabView({ goals }) {
  // Keep track of which goal (by ID) is currently “active” in the tab view:
  const [selectedGoalId, setSelectedGoalId] = useState(null);

  // Whenever the goals array changes (e.g. a new goal is added), default
  // the selected tab to the first goal in the list (if none is currently selected).
  useEffect(() => {
    if (goals.length > 0 && !goals.some((g) => g.goalId === selectedGoalId)) {
      setSelectedGoalId(goals[0].goalId);
    }
  }, [goals, selectedGoalId]);

  // If there are no goals, just show a placeholder
  if (!Array.isArray(goals) || goals.length === 0) {
    return (
      <div
        style={{
          padding: "1rem",
          background: "#FFFFFF",
          borderRadius: "0.75rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          marginTop: "1.5rem",
          textAlign: "center",
          color: "#6B7280",
          fontStyle: "italic",
        }}
      >
        No goals available to display.
      </div>
    );
  }

  // Find the currently selected goal object
  const selectedGoal =
    goals.find((g) => g.goalId === selectedGoalId) || goals[0];

  return (
    <div
      style={{
        marginTop: "1.5rem",
        background: "#FFFFFF",
        borderRadius: "0.75rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        padding: "1rem",
      }}
    >
      {/* --- Tabs row --- */}
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          borderBottom: "2px solid #E5E7EB",
          paddingBottom: "0.5rem",
          marginBottom: "1rem",
        }}
      >
        {goals.map((g) => {
          const isActive = g.goalId === selectedGoalId;
          return (
            <button
              key={g.goalId}
              onClick={() => setSelectedGoalId(g.goalId)}
              style={{
                flexShrink: 0,
                padding: "0.5rem 1rem",
                marginRight: "0.5rem",
                border: "none",
                borderBottom: isActive
                  ? "3px solid #4F46E5"
                  : "3px solid transparent",
                background: "transparent",
                fontWeight: isActive ? 600 : 500,
                color: isActive ? "#1F2937" : "#6B7280",
                cursor: "pointer",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = "#374151";
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = "#6B7280";
              }}
            >
              {g.type.length > 12 ? g.type.slice(0, 12) + "…" : g.type} (
              {new Date(g.createdAt).toLocaleDateString()})
            </button>
          );
        })}
      </div>

      {/* --- Details of the selected goal --- */}
      <div
        style={{
          padding: "1rem",
          background: "#F9FAFB",
          borderRadius: "0.5rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h4
          style={{
            margin: 0,
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "#1F2937",
            marginBottom: "0.75rem",
          }}
        >
          {selectedGoal.type}
        </h4>

        <p
          style={{
            margin: 0,
            fontSize: "1rem",
            fontWeight: 600,
            color: "#4F46E5",
            marginBottom: "0.75rem",
          }}
        >
          Progress: {selectedGoal.currentValue} / {selectedGoal.targetValue} (
          {selectedGoal.targetValue > 0
            ? Math.round(
                (selectedGoal.currentValue / selectedGoal.targetValue) * 100
              )
            : 0}
          %)
        </p>

        <div style={{ color: "#6B7280", marginBottom: "1rem" }}>
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
              htmlFor={`reflection-display-${selectedGoal.goalId}`}
              style={{
                display: "block",
                marginBottom: "0.25rem",
                fontWeight: 600,
                color: "#374151",
              }}
            >
              Reflection
            </label>
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
              }}
            >
              {selectedGoal.reflectionText || "No reflection written."}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
