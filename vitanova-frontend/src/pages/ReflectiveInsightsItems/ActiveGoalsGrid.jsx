import React from "react";
import GoalCard from "./GoalCard";

export default function ActiveGoalsGrid({
  goals,
  onSliderChange,
  onMarkComplete,
  onDelete,
  onViewDetail, // callback to open goal detail popup
}) {
  if (!Array.isArray(goals)) return null;

  return (
    <div style={styles.grid}>
      {goals
        .filter(Boolean) // drop any undefined/null entries
        .map((g) => (
          <GoalCard
            key={g.goalId}
            goal={g}
            onSliderChange={onSliderChange}
            onMarkComplete={onMarkComplete}
            onDelete={onDelete}
            onViewDetail={() => onViewDetail(g)}
          />
        ))}
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1.5rem",
    marginBottom: "2rem",
  },
};
