// src/components/TimelineBar.jsx
import React, { useMemo, useState } from "react";

/** Utility: parse ISO → Date */
function parseISO(dateString) {
  return new Date(dateString);
}

/** Utility: add N years to a Date */
function addYears(date, years) {
  const copy = new Date(date);
  copy.setFullYear(copy.getFullYear() + years);
  return copy;
}

/** Clamp x to [0,1] */
function clamp01(x) {
  return Math.min(Math.max(x, 0), 1);
}

/**
 * TimelineBar
 *
 * Props:
 *   - completedGoals: [
 *       { goalId, type, createdAt, completionDate, currentValue, targetValue, reflectionText, … }
 *     ]
 *   - startDate: Date   ← earliest goal creation
 *   - onSelectGoal: fn(goalObj) → void
 *
 * Renders a bar from startDate → (startDate + 2 years).  Places a marker for each completed goal.
 * Hover → shows tooltip with exact completionDate.  Click → calls onSelectGoal(g).
 */
export default function TimelineBar({
  completedGoals,
  startDate,
  onSelectGoal,
}) {
  // Always call hooks at top:
  const [tooltipInfo, setTooltipInfo] = useState({
    visible: false,
    xPct: "0%",
    text: "",
  });

  // Compute endDate = startDate + 2 years, and totalSpanMs
  const { endDate, totalSpanMs } = useMemo(() => {
    const end = addYears(startDate, 2);
    const span = end.getTime() - startDate.getTime();
    return { endDate: end, totalSpanMs: span };
  }, [startDate]);

  // Early return if no completed goals
  if (!Array.isArray(completedGoals) || completedGoals.length === 0) {
    return (
      <div
        style={{
          padding: "1rem",
          background: "#FFFFFF",
          borderRadius: "0.75rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          marginTop: "2rem",
          textAlign: "center",
          color: "#6B7280",
          fontStyle: "italic",
        }}
      >
        No completed goals yet—timeline will appear here once you mark something
        complete.
      </div>
    );
  }

  // Convert completionDate → X% (string) along [startDate → endDate]
  const computeOffsetPercent = (isoString) => {
    const d = parseISO(isoString);
    if (!(d instanceof Date) || isNaN(d)) return "0%";
    const msFromStart = d.getTime() - startDate.getTime();
    const frac = clamp01(msFromStart / totalSpanMs);
    return (frac * 100).toFixed(2) + "%";
  };

  const showTooltip = (xPct, text) => {
    setTooltipInfo({ visible: true, xPct, text });
  };
  const hideTooltip = () => {
    setTooltipInfo((prev) => ({ ...prev, visible: false }));
  };

  return (
    <div
      style={{
        marginTop: "3rem",
        background: "#FFFFFF",
        padding: "1.5rem",
        borderRadius: "0.75rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <h3
        style={{
          fontSize: "1.5rem",
          fontWeight: 600,
          color: "#1F2937",
          marginBottom: "1rem",
        }}
      >
        Two‐Year Timeline of Completed Goals
      </h3>

      <div
        style={{
          position: "relative",
          height: "4rem",
          borderTop: "4px solid #E5E7EB",
          marginTop: "2rem",
        }}
      >
        {/* Left endpoint label */}
        <div
          style={{
            position: "absolute",
            top: "-1.25rem",
            left: "0%",
            color: "#6B7280",
            fontSize: "0.75rem",
          }}
        >
          {startDate.toLocaleDateString()}
        </div>
        {/* Right endpoint label */}
        <div
          style={{
            position: "absolute",
            top: "-1.25rem",
            right: "0%",
            color: "#6B7280",
            fontSize: "0.75rem",
          }}
        >
          {endDate.toLocaleDateString()}
        </div>

        {/* Render one marker for each completed goal */}
        {completedGoals.map((g) => {
          if (!g.completionDate) return null;
          const xPct = computeOffsetPercent(g.completionDate);

          return (
            <div
              key={g.goalId}
              style={{
                position: "absolute",
                top: "-0.5rem",
                left: xPct,
                transform: "translateX(-50%)",
                cursor: "pointer",
              }}
            >
              <div
                onMouseEnter={() =>
                  showTooltip(
                    xPct,
                    new Date(g.completionDate).toLocaleDateString()
                  )
                }
                onMouseLeave={hideTooltip}
                onClick={() => onSelectGoal(g)}
                style={{
                  width: "1rem",
                  height: "1rem",
                  background: "#4F46E5",
                  borderRadius: "50%",
                  border: "2px solid #FFF",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              />
            </div>
          );
        })}

        {/* Tooltip, if visible */}
        {tooltipInfo.visible && (
          <div
            style={{
              position: "absolute",
              top: "-2rem",
              left: tooltipInfo.xPct,
              transform: "translateX(-50%)",
              background: "#374151",
              color: "#FFF",
              padding: "0.25rem 0.5rem",
              borderRadius: "0.25rem",
              fontSize: "0.75rem",
              whiteSpace: "nowrap",
              pointerEvents: "none",
            }}
          >
            {tooltipInfo.text}
            <div
              style={{
                position: "absolute",
                bottom: "-0.3rem",
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "0.3rem solid transparent",
                borderRight: "0.3rem solid transparent",
                borderTop: "0.3rem solid #374151",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
