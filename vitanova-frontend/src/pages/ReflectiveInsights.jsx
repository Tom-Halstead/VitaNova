import React, { useEffect, useState } from "react";
import { listGoals, createGoal, updateGoal } from "../api/GoalsApi";

export default function ReflectiveInsights() {
  const [goals, setGoals] = useState([]);
  const [newType, setNewType] = useState("");
  const [newTarget, setNewTarget] = useState(0);
  const [newDue, setNewDue] = useState("");

  useEffect(() => {
    (async () => {
      const data = await listGoals();
      setGoals(data);
    })();
  }, []);

  const handleCreate = async () => {
    const created = await createGoal({
      type: newType,
      targetValue: newTarget,
      dueDate: newDue,
    });
    setGoals((prev) => [...prev, created]);
    setNewType("");
    setNewTarget(0);
    setNewDue("");
  };

  const handleIncrement = async (id) => {
    const g = goals.find((g) => g.goalId === id);
    const updated = await updateGoal(id, { currentValue: g.currentValue + 1 });
    setGoals((prev) => prev.map((x) => (x.goalId === id ? updated : x)));
  };

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

        {/* ————— New Goal Form ————— */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr auto",
            gap: "3rem",
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
              placeholder="e.g. 10"
              value={newTarget}
              onChange={(e) => setNewTarget(+e.target.value)}
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
              style={{
                height: "3.3em",
                justifySelf: "center",
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

        {/* ————— Goals Grid ————— */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {goals.map((goal) => (
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
                    goal.status === "COMPLETED"
                      ? "#10B981"
                      : goal.status === "EXPIRED"
                      ? "#EF4444"
                      : "#FBBF24",
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
                  {new Date(goal.dueDate).toLocaleDateString()}
                </div>
              </div>

              <button
                onClick={() => handleIncrement(goal.goalId)}
                style={{
                  padding: "0.5rem",
                  background: "#E0E7FF",
                  color: "#3730A3",
                  border: "none",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                  fontWeight: 600,
                  alignSelf: "start",
                  transition: "background 0.2s, transform 0.1s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#C7D2FE";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#E0E7FF";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                +1 Progress
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
