// File: src/pages/ReflectiveInsightsItems/GoalTimelineBar.jsx
import React, { useMemo, useState } from "react";

/** Parse ISO string to Date */
function parseISO(dateString) {
  return new Date(dateString);
}
/** Clamp to [0,1] */
function clamp01(x) {
  return Math.min(Math.max(x, 0), 1);
}

export default function GoalTimelineBar({
  completedGoals,
  startDate,
  onSelectGoal,
}) {
  const [tooltip, setTooltip] = useState({
    visible: false,
    xPct: "0%",
    text: "",
  });

  // Compute endDate and span
  const { endDate, spanMs } = useMemo(() => {
    if (!completedGoals.length) return { endDate: startDate, spanMs: 1 };
    const dates = completedGoals
      .map((g) => parseISO(g.completionDate))
      .filter((d) => d instanceof Date && !isNaN(d));
    const latest =
      dates.length === 0
        ? startDate
        : new Date(Math.max(...dates.map((d) => d.getTime())));
    const span = Math.max(latest.getTime() - startDate.getTime(), 1);
    return { endDate: latest, spanMs: span };
  }, [completedGoals, startDate]);

  if (!completedGoals.length) {
    return (
      <div style={styles.empty}>
        No completed goals yet — your timeline will appear here once you mark a
        goal complete.
      </div>
    );
  }

  // Compute offset percentage
  const offsetPct = (iso) => {
    const d = parseISO(iso);
    if (!(d instanceof Date) || isNaN(d)) return "0%";
    const pct = clamp01((d.getTime() - startDate.getTime()) / spanMs) * 100;
    return pct.toFixed(2) + "%";
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.header}>Timeline of Completed Goals</h3>
      <div style={styles.bar}>
        <div style={{ ...styles.endpoint, left: 0 }}>
          {startDate.toLocaleDateString()}
        </div>
        <div style={{ ...styles.endpoint, left: "100%" }}>
          {endDate.toLocaleDateString()}
        </div>

        {completedGoals.map((g) => {
          if (!g.completionDate) return null;
          const x = offsetPct(g.completionDate);
          return (
            <div
              key={g.goalId}
              style={{ ...styles.markerWrapper, left: x }}
              onMouseEnter={() =>
                setTooltip({
                  visible: true,
                  xPct: x,
                  text: `${g.type} — ${new Date(
                    g.completionDate
                  ).toLocaleDateString()}`,
                })
              }
              onMouseLeave={() => setTooltip((t) => ({ ...t, visible: false }))}
              onClick={() => onSelectGoal(g)}
            >
              <div style={styles.marker} />
            </div>
          );
        })}

        {tooltip.visible && (
          <div style={{ ...styles.tooltip, left: tooltip.xPct }}>
            {tooltip.text}
            <div style={styles.tooltipArrow} />
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  empty: {
    padding: "1rem",
    background: "var(--bg)",
    borderRadius: "0.75rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    marginTop: "2rem",
    textAlign: "center",
    color: "var(--text-light)",
    fontStyle: "italic",
  },
  container: {
    marginTop: "3rem",
    background: "var(--bg)",
    padding: "1.5rem",
    borderRadius: "0.75rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  header: {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "var(--text)",
    marginBottom: "3rem",
    justifySelf: "center",
  },
  bar: {
    position: "relative",
    height: "4rem",
    borderTop: "4px solid var(--border)",
    margin: "4rem, 2rem, 4rem, 0rem",
  },
  endpoint: {
    position: "absolute",
    top: "-2.25rem",
    fontSize: "0.75rem",
    color: "var(--text-light)",
    transform: "translateX(-50%)",
  },
  markerWrapper: {
    position: "absolute",
    top: "-0.75rem",
    transform: "translateX(-50%)",
    cursor: "pointer",
  },
  marker: {
    width: "1.25rem",
    height: "1.25rem",
    background: "linear-gradient(135deg, var(--primary-alt), var(--primary))",
    borderRadius: "50%",
    border: "2px solid var(--bg)",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  },
  tooltip: {
    position: "absolute",
    top: "-2rem",
    transform: "translateX(-50%)",
    background: "var(--text)",
    color: "var(--bg)",
    padding: "0.25rem 0.5rem",
    borderRadius: "0.25rem",
    fontSize: "0.75rem",
    whiteSpace: "nowrap",
    pointerEvents: "none",
  },
  tooltipArrow: {
    position: "absolute",
    bottom: "-0.3rem",
    left: "50%",
    transform: "translateX(-50%)",
    width: 0,
    height: 0,
    borderLeft: "0.3rem solid transparent",
    borderRight: "0.3rem solid transparent",
    borderTop: "0.3rem solid var(--text)",
  },
};
