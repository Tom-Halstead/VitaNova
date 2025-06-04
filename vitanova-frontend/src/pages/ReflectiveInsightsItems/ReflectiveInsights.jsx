// src/pages/ReflectiveInsightsItems/ReflectiveInsights.jsx

import React, { useEffect, useState, useMemo } from "react";
import {
  listGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} from "../../api/GoalsApi";
import TimelineBar from "../../pages/ReflectiveInsightsItems/TimelineBar";

export default function ReflectiveInsights() {
  const [goals, setGoals] = useState([]);
  const [newType, setNewType] = useState("");
  const [newTarget, setNewTarget] = useState("");
  const [newDue, setNewDue] = useState("");
  const [loading, setLoading] = useState(true);

  // Which completed goal is currently open in the modal
  const [selectedGoal, setSelectedGoal] = useState(null);

  // If user is editing a reflection inside the modal:
  const [editingGoalId, setEditingGoalId] = useState(null);
  const [draftReflection, setDraftReflection] = useState("");

  // 1) Fetch all goals once on mount
  useEffect(() => {
    (async () => {
      try {
        const page = await listGoals();
        // Each “g” already has fields: { goalId, type, targetValue, currentValue, dueDate, status, createdAt, … }
        const initialized = Array.isArray(page.content)
          ? page.content.map((g) => ({
              ...g,
              completionDate: g.completionDate || null,
              reflectionText: g.reflectionText || "",
            }))
          : [];
        setGoals(initialized);
      } catch (err) {
        console.error("Failed to load goals:", err);
        setGoals([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 2) Create a new goal
  const handleCreate = async () => {
    const numericTarget = parseInt(newTarget, 10);
    if (!newType.trim() || isNaN(numericTarget) || numericTarget <= 0) return;

    try {
      const created = await createGoal({
        type: newType.trim(),
        targetValue: numericTarget,
        dueDate: newDue || null,
      });
      setGoals((prev) => [
        ...prev,
        { ...created, completionDate: null, reflectionText: "" },
      ]);
      setNewType("");
      setNewTarget("");
      setNewDue("");
    } catch (err) {
      console.error("Failed to create goal:", err);
    }
  };

  // 3) Slider change → either update progress or mark complete if it hits 100%
  const handleSliderChange = (id, percentage) => {
    const goal = goals.find((g) => g.goalId === id);
    if (!goal || goal.status === "COMPLETED") return;

    const clamped = Math.min(Math.max(percentage, 0), 100);
    const newCurrentValue = Math.round((goal.targetValue * clamped) / 100);

    if (clamped === 100) {
      handleMarkComplete(id);
    } else {
      // optimistic UI update
      setGoals((prev) =>
        prev.map((g) =>
          g.goalId === id ? { ...g, currentValue: newCurrentValue } : g
        )
      );
      updateGoal(id, { currentValue: newCurrentValue }).catch((err) =>
        console.error("Failed to update goal progress:", err)
      );
    }
  };

  // 4) Mark a goal as completed
  const handleMarkComplete = (id) => {
    const goal = goals.find((g) => g.goalId === id);
    if (!goal || goal.status === "COMPLETED") return;

    const completionDate = new Date().toISOString();
    setGoals((prev) =>
      prev.map((g) =>
        g.goalId === id
          ? {
              ...g,
              status: "COMPLETED",
              currentValue: g.targetValue,
              completionDate,
            }
          : g
      )
    );
    updateGoal(id, {
      status: "COMPLETED",
      currentValue: goal.targetValue,
    }).catch((err) => console.error("Failed to mark goal complete:", err));
  };

  // 5) Delete a goal (active or completed)
  const handleDelete = async (id) => {
    try {
      await deleteGoal(id);
      setGoals((prev) => prev.filter((g) => g.goalId !== id));

      // Clear modal/edit states if the deleted goal was open
      if (editingGoalId === id) {
        setEditingGoalId(null);
        setDraftReflection("");
      }
      if (selectedGoal && selectedGoal.goalId === id) {
        setSelectedGoal(null);
      }
    } catch (err) {
      console.error("Failed to delete goal:", err);
    }
  };

  // 6) Start editing reflection in the modal
  const startEditing = (id, currentText) => {
    setEditingGoalId(id);
    setDraftReflection(currentText);
  };
  const cancelEditing = () => {
    setEditingGoalId(null);
    setDraftReflection("");
  };

  // 7) Save reflection text (update both `goals` array and the open `selectedGoal`)
  const saveReflection = (id) => {
    // 7a) Update the local goals state
    setGoals((prev) =>
      prev.map((g) =>
        g.goalId === id ? { ...g, reflectionText: draftReflection } : g
      )
    );

    // 7b) If the modal is showing exactly this goal, update `selectedGoal` as well:
    setSelectedGoal((prev) =>
      prev && prev.goalId === id
        ? { ...prev, reflectionText: draftReflection }
        : prev
    );

    // 7c) Fire the API call
    updateGoal(id, { reflectionText: draftReflection }).catch((err) =>
      console.error("Failed to save reflection:", err)
    );

    // 7d) Close editing mode
    setEditingGoalId(null);
    setDraftReflection("");
  };

  // 8) When user clicks a bubble on the timeline
  const handleSelectGoal = (goalObj) => {
    setSelectedGoal(goalObj);
    setEditingGoalId(null);
    setDraftReflection(goalObj.reflectionText || "");
  };

  // 9) Partition active vs. completed
  const activeGoals = goals.filter((g) => g.status !== "COMPLETED");
  const completedGoals = goals
    .filter((g) => g.status === "COMPLETED")
    .slice()
    .sort((a, b) => {
      const dateA = a.completionDate ? new Date(a.completionDate) : new Date(0);
      const dateB = b.completionDate ? new Date(b.completionDate) : new Date(0);
      return dateB - dateA;
    });

  // 10) Compute earliest creation date (for timeline start)
  const earliestCreatedDate = useMemo(() => {
    if (goals.length === 0) return new Date();
    const dates = goals
      .map((g) => new Date(g.createdAt))
      .filter((d) => d instanceof Date && !isNaN(d));
    if (dates.length === 0) return new Date();
    return new Date(Math.min(...dates.map((d) => d.getTime())));
  }, [goals]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F9FAFB",
        padding: "3rem 1rem",
        fontFamily: "'Lato', sans-serif",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: 600,
            color: "#1F2937",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          Reflective Insights & Goals
        </h2>

        {/** ─── New Goal Form ─── **/}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr auto",
            gap: "2rem",
            background: "#FFFFFF",
            padding: "1.5rem",
            borderRadius: "0.75rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            marginBottom: "2rem",
          }}
        >
          <div>
            <label
              htmlFor="goal-type"
              style={{
                display: "block",
                marginBottom: "0.25rem",
                fontWeight: 600,
                color: "#374151",
              }}
            >
              Goal Type
            </label>
            <input
              id="goal-type"
              type="text"
              placeholder="e.g. Read Books"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #E5E7EB",
                borderRadius: "0.5rem",
                outline: "none",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#6366F1")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
            />
          </div>

          <div>
            <label
              htmlFor="goal-target"
              style={{
                display: "block",
                marginBottom: "0.25rem",
                fontWeight: 600,
                color: "#374151",
              }}
            >
              Target Value
            </label>
            <input
              id="goal-target"
              type="number"
              placeholder="100"
              value={newTarget}
              onChange={(e) => setNewTarget(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #E5E7EB",
                borderRadius: "0.5rem",
                outline: "none",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#6366F1")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
            />
          </div>

          <div>
            <label
              htmlFor="goal-due"
              style={{
                display: "block",
                marginBottom: "0.25rem",
                fontWeight: 600,
                color: "#374151",
              }}
            >
              Due Date
            </label>
            <input
              id="goal-due"
              type="date"
              value={newDue}
              onChange={(e) => setNewDue(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #E5E7EB",
                borderRadius: "0.5rem",
                outline: "none",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#6366F1")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
            />
          </div>

          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <button
              onClick={handleCreate}
              onKeyUp={(event) => {
                if (event.key === "Enter") {
                  handleCreate();
                }
              }}
              style={{
                height: "3.3em",
                width: "100%",
                padding: "0.75rem",
                background: "linear-gradient(90deg, #6366F1, #4F46E5)",
                color: "#FFF",
                border: "none",
                borderRadius: "0.5rem",
                cursor: "pointer",
                fontWeight: 600,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
              }}
            >
              Add Goal
            </button>
          </div>
        </div>

        {/** ─── Active / Expired Goals Grid ─── **/}
        {loading ? (
          <p style={{ textAlign: "center", color: "#6B7280" }}>
            Loading goals…
          </p>
        ) : activeGoals.length === 0 ? (
          <p style={{ textAlign: "center", color: "#6B7280" }}>
            No active goals. Add one above to get started!
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {activeGoals.map((goal) => (
              <div
                key={goal.goalId}
                style={{
                  position: "relative",
                  background: "#FFFFFF",
                  borderRadius: "0.75rem",
                  padding: "1.5rem",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Status badge */}
                <span
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    background:
                      goal.status === "EXPIRED" ? "#EF4444" : "#FBBF24",
                    color: "#FFF",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "999px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                  }}
                >
                  {goal.status}
                </span>

                <h3
                  style={{
                    margin: 0,
                    fontSize: "1.25rem",
                    color: "#1F2937",
                    marginBottom: "0.5rem",
                  }}
                >
                  {goal.type}
                </h3>

                <p
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: "#4F46E5",
                    margin: "0.5rem 0",
                  }}
                >
                  {goal.currentValue} / {goal.targetValue}
                </p>

                <div
                  style={{
                    marginBottom: "1rem",
                    color: "#6B7280",
                  }}
                >
                  <div>
                    <strong>Created:</strong>{" "}
                    {new Date(goal.createdAt).toLocaleDateString()}
                  </div>
                  <div>
                    <strong>Due by:</strong>{" "}
                    {goal.dueDate
                      ? new Date(goal.dueDate).toLocaleDateString()
                      : "–"}
                  </div>
                </div>

                {/* Slider */}
                <div style={{ marginTop: "1rem" }}>
                  <label
                    htmlFor={`progress-${goal.goalId}`}
                    style={{
                      display: "block",
                      marginBottom: "0.25rem",
                      fontWeight: 600,
                      color: "#374151",
                    }}
                  >
                    Completion:{" "}
                    <span style={{ color: "#4F46E5" }}>
                      {goal.targetValue > 0
                        ? Math.round(
                            (goal.currentValue / goal.targetValue) * 100
                          )
                        : 0}
                      %
                    </span>
                  </label>

                  <input
                    id={`progress-${goal.goalId}`}
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={
                      goal.targetValue > 0
                        ? Math.round(
                            (goal.currentValue / goal.targetValue) * 100
                          )
                        : 0
                    }
                    onChange={(e) =>
                      handleSliderChange(
                        goal.goalId,
                        parseInt(e.target.value, 10)
                      )
                    }
                    style={{
                      width: "100%",
                      appearance: "none",
                      height: "8px",
                      borderRadius: "4px",
                      background: "#E5E7EB",
                      outline: "none",
                      transition: "background 0.2s",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.background = "#C7D2FE")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.background = "#E5E7EB")
                    }
                  />
                </div>

                {/* Buttons: Mark Complete / Delete */}
                <div
                  style={{
                    marginTop: "1rem",
                    display: "flex",
                    gap: "0.5rem",
                  }}
                >
                  <button
                    onClick={() => handleMarkComplete(goal.goalId)}
                    style={{
                      padding: "0.5rem",
                      background: "#10B981",
                      color: "#FFF",
                      border: "none",
                      borderRadius: "0.5rem",
                      cursor: "pointer",
                      fontWeight: 600,
                      flex: 1,
                      transition: "background 0.2s, transform 0.1s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#059669";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#10B981";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    Mark Complete
                  </button>

                  <button
                    onClick={() => handleDelete(goal.goalId)}
                    style={{
                      padding: "0.5rem",
                      background: "#FECACA",
                      color: "#B91C1C",
                      border: "none",
                      borderRadius: "0.5rem",
                      cursor: "pointer",
                      fontWeight: 600,
                      flex: 1,
                      transition: "background 0.2s, transform 0.1s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#FCA5A5";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#FECACA";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/** ─── Timeline Bar (Completed Goals Only) ─── **/}
        <TimelineBar
          completedGoals={completedGoals}
          startDate={earliestCreatedDate}
          onSelectGoal={handleSelectGoal}
        />

        {/** ─── Pop-Up Modal for Selected Goal ─── **/}
        {selectedGoal && (
          <div
            style={{
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
            }}
            onClick={() => setSelectedGoal(null)}
          >
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "0.75rem",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                padding: "2rem",
                maxWidth: "500px",
                width: "90%",
                position: "relative",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedGoal(null)}
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  background: "transparent",
                  border: "none",
                  fontSize: "1.25rem",
                  color: "#6B7280",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>

              <h3
                style={{
                  margin: 0,
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: "#1F2937",
                  marginBottom: "1rem",
                }}
              >
                {selectedGoal.type}
              </h3>

              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#4F46E5",
                  marginBottom: "1rem",
                }}
              >
                Progress: {selectedGoal.currentValue} /{" "}
                {selectedGoal.targetValue} (
                {selectedGoal.targetValue > 0
                  ? Math.round(
                      (selectedGoal.currentValue / selectedGoal.targetValue) *
                        100
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
                  <strong>Completed:</strong>{" "}
                  {new Date(selectedGoal.completionDate).toLocaleDateString()}
                </div>
                <div>
                  <strong>Status:</strong> {selectedGoal.status}
                </div>
                <div>
                  <strong>Due by:</strong>{" "}
                  {selectedGoal.dueDate
                    ? new Date(selectedGoal.dueDate).toLocaleDateString()
                    : "–"}
                </div>
              </div>

              {editingGoalId === selectedGoal.goalId ? (
                <>
                  <label
                    htmlFor="reflection-edit-modal"
                    style={{
                      display: "block",
                      marginBottom: "0.25rem",
                      fontWeight: 600,
                      color: "#374151",
                    }}
                  >
                    Edit Reflection
                  </label>
                  <textarea
                    id="reflection-edit-modal"
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
                        padding: "0.5rem",
                        background: "#4F46E5",
                        color: "#FFF",
                        border: "none",
                        borderRadius: "0.5rem",
                        cursor: "pointer",
                        fontWeight: 600,
                        transition: "background 0.2s, transform 0.1s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#4338CA";
                        e.currentTarget.style.transform = "scale(1.05)";
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
                        padding: "0.5rem",
                        background: "#E5E7EB",
                        color: "#374151",
                        border: "none",
                        borderRadius: "0.5rem",
                        cursor: "pointer",
                        fontWeight: 600,
                        transition: "background 0.2s, transform 0.1s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#D1D5DB";
                        e.currentTarget.style.transform = "scale(1.05)";
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
                  <label
                    htmlFor="reflection-display-modal"
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
                    id="reflection-display-modal"
                    style={{
                      minHeight: "80px",
                      padding: "0.75rem",
                      border: "1px solid #E5E7EB",
                      borderRadius: "0.5rem",
                      fontFamily: "'Lato', sans-serif",
                      fontSize: "0.875rem",
                      color: "#374151",
                      whiteSpace: "pre-wrap",
                      background: "#F9FAFB",
                      marginBottom: "1rem",
                    }}
                  >
                    {selectedGoal.reflectionText || "No reflection written."}
                  </p>
                  <button
                    onClick={() =>
                      startEditing(
                        selectedGoal.goalId,
                        selectedGoal.reflectionText
                      )
                    }
                    style={{
                      padding: "0.5rem",
                      background: "#6366F1",
                      color: "#FFF",
                      border: "none",
                      borderRadius: "0.5rem",
                      cursor: "pointer",
                      fontWeight: 600,
                      transition: "background 0.2s, transform 0.1s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#4F46E5";
                      e.currentTarget.style.transform = "scale(1.05)";
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
