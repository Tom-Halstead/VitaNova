import React, { useEffect, useState } from "react";
import { listGoals, createGoal, updateGoal } from "../api/GoalsApi";

export default function ReflectiveInsights() {
  const [goals, setGoals] = useState([]);
  const [newType, setNewType] = useState("");
  const [newTarget, setNewTarget] = useState(0);
  const [newDue, setNewDue] = useState("");

  useEffect(() => {
    async function fetchGoals() {
      const data = await listGoals();
      setGoals(data);
    }
    fetchGoals();
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

  const handleUpdate = async (id) => {
    const g = goals.find((g) => g.goalId === id);
    const updated = await updateGoal(id, { currentValue: g.currentValue + 1 });
    setGoals((prev) => prev.map((x) => (x.goalId === id ? updated : x)));
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "2rem auto",
        fontFamily: "'Lato', sans-serif",
      }}
    >
      <h2
        style={{
          fontSize: "1.75rem",
          fontWeight: 600,
          color: "#374151",
          marginBottom: "1rem",
          textAlign: "center",
        }}
      >
        Reflective Insights & Goals
      </h2>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Goal type"
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
          style={{
            flex: 1,
            padding: "0.75rem",
            border: "1px solid #E5E7EB",
            borderRadius: "0.375rem",
            outline: "none",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#667EEA")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
        />
        <input
          type="number"
          placeholder="Target"
          value={newTarget}
          onChange={(e) => setNewTarget(+e.target.value)}
          style={{
            width: "100px",
            padding: "0.75rem",
            border: "1px solid #E5E7EB",
            borderRadius: "0.375rem",
            outline: "none",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#667EEA")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
        />
        <input
          type="date"
          value={newDue}
          onChange={(e) => setNewDue(e.target.value)}
          style={{
            padding: "0.75rem",
            border: "1px solid #E5E7EB",
            borderRadius: "0.375rem",
            outline: "none",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#667EEA")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
        />
        <button
          onClick={handleCreate}
          style={{
            padding: "0.75rem 1.5rem",
            background: "linear-gradient(90deg, #4F46E5, #667EEA)",
            color: "#FFF",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {goals.map((goal) => (
          <div
            key={goal.goalId}
            style={{
              background: "#FFFFFF",
              borderRadius: "0.5rem",
              padding: "1.5rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <h3 style={{ margin: 0, fontSize: "1.25rem", color: "#374151" }}>
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
            <small style={{ color: "#6B7280", marginBottom: "1rem" }}>
              Due by {new Date(goal.dueDate).toLocaleDateString()}
            </small>
            <button
              onClick={() => handleUpdate(goal.goalId)}
              style={{
                padding: "0.5rem",
                background: "#E0E7FF",
                color: "#3730A3",
                border: "none",
                borderRadius: "0.375rem",
                cursor: "pointer",
                fontWeight: 600,
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#C7D2FE")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#E0E7FF")
              }
            >
              +1
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
