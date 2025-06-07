import React from "react";
import GoalCard from "./GoalCard";

export default function ActiveGoalsGrid({
  goals,
  onSliderChange,
  onMarkComplete,
  onDelete,
}) {
  return (
    <div style={styles.grid}>
      {goals.map((g) => (
        <GoalCard
          key={g.goalId}
          goal={g}
          onSliderChange={onSliderChange}
          onMarkComplete={onMarkComplete}
          onDelete={onDelete}
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
