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
    const g = goals.find((g) => g.goalId === id);
    const updated = await updateGoal(id, { currentValue: g.currentValue + 1 });
    setGoals((prev) => prev.map((x) => (x.goalId === id ? updated : x)));
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Reflective Insights & Goals</h2>
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Goal type"
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
          className="border p-2 rounded flex-1 focus:border-indigo-600"
        />
        <input
          type="number"
          placeholder="Target"
          value={newTarget}
          onChange={(e) => setNewTarget(+e.target.value)}
          className="border p-2 rounded w-24 focus:border-indigo-600"
        />
        <input
          type="date"
          value={newDue}
          onChange={(e) => setNewDue(e.target.value)}
          className="border p-2 rounded focus:border-indigo-600"
        />
        <button onClick={handleCreate} className="btn btn-primary">
          Add Goal
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {goals.map((goal) => (
          <Card key={goal.goalId} title={goal.type} className="card">
            <div className="text-lg font-medium">
              {goal.currentValue}/{goal.targetValue}
            </div>
            <button
              onClick={() => handleUpdate(goal.goalId)}
              className="mt-2 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              +1
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
