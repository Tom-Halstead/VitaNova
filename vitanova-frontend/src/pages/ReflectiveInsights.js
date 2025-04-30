import React, { useEffect, useState } from "react";
import { listGoals, createGoal, updateGoal } from "../api/goalsApi";
import Card from "../components/Card";

export default function ReflectiveInsights() {
  const [goals, setGoals] = useState([]);
  const [newType, setNewType] = useState("");
  const [newTarget, setNewTarget] = useState(0);
  const [newDue, setNewDue] = useState("");

  useEffect(() => {
    listGoals().then(setGoals);
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
    const goal = goals.find((g) => g.goalId === id);
    if (!goal) return;
    const updated = await updateGoal(id, {
      currentValue: goal.currentValue + 1,
    });
    setGoals((prev) => prev.map((g) => (g.goalId === id ? updated : g)));
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Reflective Insights & Goals</h2>
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Goal type"
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
          className="border p-2"
        />
        <input
          type="number"
          placeholder="Target"
          value={newTarget}
          onChange={(e) => setNewTarget(Number(e.target.value))}
          className="border p-2"
        />
        <input
          type="date"
          value={newDue}
          onChange={(e) => setNewDue(e.target.value)}
          className="border p-2"
        />
        <button
          onClick={handleCreate}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Goal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map((goal) => (
          <Card
            key={goal.goalId}
            title={goal.type}
            value={
              <div>
                <p>
                  Progress: {goal.currentValue}/{goal.targetValue}
                </p>
                <button
                  onClick={() => handleUpdate(goal.goalId)}
                  className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Increment
                </button>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
}
