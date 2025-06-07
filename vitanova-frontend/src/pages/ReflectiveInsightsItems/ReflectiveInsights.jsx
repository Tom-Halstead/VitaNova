// src/pages/ReflectiveInsightsItems/ReflectiveInsights.jsx

import React, { useEffect, useState, useMemo } from "react";
import {
  listGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} from "../../api/GoalsApi";
import NewGoalForm from "./NewGoalForm";
import ActiveGoalsGrid from "./ActiveGoalsGrid";
import TimelineBar from "./GoalTimelineBar";
import AllGoalsTabView from "./AllGoalsTabView";
import GoalModal from "./GoalModal";

export default function ReflectiveInsights() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Popup state
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [editingGoalId, setEditingGoalId] = useState(null);
  const [draftReflection, setDraftReflection] = useState("");

  // “Show All Goals” toggle
  const [showAllTabs, setShowAllTabs] = useState(false);

  // New-goal form state
  const [newType, setNewType] = useState("");
  const [newTarget, setNewTarget] = useState("");
  const [newDue, setNewDue] = useState("");

  // Load
  useEffect(() => {
    (async () => {
      try {
        const page = await listGoals();
        const list = Array.isArray(page.content) ? page.content : [];
        setGoals(
          list.map((g) => ({
            ...g,
            createdAt: g.createdAt || new Date().toISOString(),
            completionDate: g.completionDate || null,
            reflectionText: g.reflectionText || "",
          }))
        );
      } catch {
        setGoals([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Create
  const handleCreate = async () => {
    const num = parseInt(newTarget, 10);
    if (!newType.trim() || isNaN(num) || num <= 0) return;
    const created = await createGoal({
      type: newType.trim(),
      targetValue: num,
      dueDate: newDue || null,
    });
    setGoals((prev) => [
      ...prev,
      {
        ...created,
        createdAt: created.createdAt || new Date().toISOString(),
        completionDate: null,
        reflectionText: "",
      },
    ]);
    setNewType("");
    setNewTarget("");
    setNewDue("");
  };

  // Progress
  const handleSliderChange = (id, pct) => {
    const g = goals.find((x) => x.goalId === id);
    if (!g || g.status === "COMPLETED") return;
    const clamped = Math.min(Math.max(pct, 0), 100);
    const newVal = Math.round((g.targetValue * clamped) / 100);
    if (clamped === 100) {
      markComplete(id);
    } else {
      setGoals((prev) =>
        prev.map((x) => (x.goalId === id ? { ...x, currentValue: newVal } : x))
      );
      updateGoal(id, { currentValue: newVal }).catch(() => {});
    }
  };
  const markComplete = (id) => {
    const now = new Date().toISOString();
    setGoals((prev) =>
      prev.map((x) =>
        x.goalId === id
          ? {
              ...x,
              status: "COMPLETED",
              currentValue: x.targetValue,
              completionDate: now,
            }
          : x
      )
    );
    const g = goals.find((x) => x.goalId === id);
    updateGoal(id, {
      status: "COMPLETED",
      currentValue: g.targetValue,
      completionDate: now,
    }).catch(() => {});
  };

  // Delete
  const handleDelete = async (id) => {
    await deleteGoal(id);
    setGoals((prev) => prev.filter((x) => x.goalId !== id));
    if (editingGoalId === id) setEditingGoalId(null);
    if (selectedGoal?.goalId === id) setSelectedGoal(null);
  };

  // Reflection editing
  const startEditing = (id, text) => {
    setEditingGoalId(id);
    setDraftReflection(text || "");
  };
  const cancelEditing = () => {
    setEditingGoalId(null);
    setDraftReflection("");
  };
  const saveReflection = async (id) => {
    await updateGoal(id, { reflectionText: draftReflection });
    setGoals((prev) =>
      prev.map((x) =>
        x.goalId === id ? { ...x, reflectionText: draftReflection } : x
      )
    );
    setEditingGoalId(null);
    setDraftReflection("");
    setSelectedGoal(null);
  };

  // Split active / completed
  const activeGoals = goals.filter((g) => g.status !== "COMPLETED");
  const completedGoals = goals
    .filter((g) => g.status === "COMPLETED")
    .sort(
      (a, b) =>
        new Date(b.completionDate || 0) - new Date(a.completionDate || 0)
    );

  // Earliest created date
  const earliestDate = useMemo(() => {
    const dates = goals
      .map((g) => new Date(g.createdAt))
      .filter((d) => !isNaN(d));
    return dates.length
      ? new Date(Math.min(...dates.map((d) => d.getTime())))
      : new Date();
  }, [goals]);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.header}>Reflective Insights & Goals</h2>

        {/* New Goal */}
        <NewGoalForm
          newType={newType}
          setNewType={setNewType}
          newTarget={newTarget}
          setNewTarget={setNewTarget}
          newDue={newDue}
          setNewDue={setNewDue}
          onCreate={handleCreate}
        />

        {/* Active Goals */}
        {loading ? (
          <p style={styles.centerText}>Loading goals…</p>
        ) : activeGoals.length === 0 ? (
          <p style={styles.centerText}>No active goals.</p>
        ) : (
          <ActiveGoalsGrid
            goals={activeGoals}
            onSliderChange={handleSliderChange}
            onMarkComplete={markComplete}
            onDelete={handleDelete}
            onViewDetail={(goal) => {
              setSelectedGoal(goal);
              startEditing(goal.goalId, goal.reflectionText);
            }}
          />
        )}

        {/* Timeline of Completed */}
        <div style={styles.section}>
          <TimelineBar
            completedGoals={completedGoals}
            startDate={earliestDate}
            onSelectGoal={(goal) => {
              setSelectedGoal(goal);
              startEditing(goal.goalId, goal.reflectionText);
            }}
          />
        </div>

        {/* Toggle All Goals */}
        <div style={{ ...styles.section, ...styles.toggle }}>
          <button
            onClick={() => setShowAllTabs((v) => !v)}
            style={styles.toggleBtn}
          >
            {showAllTabs ? "Hide All Goals" : "Show All Goals"}
          </button>
        </div>

        {/* All Goals Tab View */}
        {showAllTabs && <AllGoalsTabView goals={goals} />}

        {/* Goal Modal */}
        {selectedGoal && (
          <GoalModal
            goal={selectedGoal}
            draft={draftReflection}
            editingId={editingGoalId}
            onSave={saveReflection}
            onCancel={cancelEditing}
            onStartEdit={startEditing}
            onClose={() => setSelectedGoal(null)}
          />
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#F9FAFB",
    padding: "2rem 1rem",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto 5em auto",
  },
  header: {
    fontSize: "2rem",
    fontWeight: 600,
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  centerText: {
    textAlign: "center",
    color: "#6B7280",
  },
  section: {
    marginBottom: "2em",
  },
  toggle: {
    display: "flex",
    justifyContent: "center",
  },
  toggleBtn: {
    padding: "0.75rem 1.5rem",
    background: "#4F46E5",
    color: "#FFF",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "1rem",
  },
};
