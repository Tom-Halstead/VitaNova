// File: src/components/ActiveGoalsGrid.jsx
// (No changes needed here; it already renders directly from props.)
import React from "react";
import GoalCard from "./GoalCard";

export default function ActiveGoalsGrid({
  goals,
  onSliderChange,
  onMarkComplete,
  onDelete,
  onViewDetail,
}) {
  if (!Array.isArray(goals)) return null;

  return (
    <div style={styles.grid}>
      {goals.filter(Boolean).map((g) => (
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
  },
};
