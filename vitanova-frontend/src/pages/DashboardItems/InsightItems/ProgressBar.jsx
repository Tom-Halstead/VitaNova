// File: src/pages/DashboardItems/InsightItems/ProgressBar.jsx
import React, { useEffect, useRef, useState } from "react";

export default function ProgressBar({ percent, label, color }) {
  const barRef = useRef(null);
  const [fillW, setFillW] = useState("0%");

  // animate width on mount / percent change
  useEffect(() => {
    // slight delay for CSS transition effect
    requestAnimationFrame(() => {
      setFillW(`${percent}%`);
    });
  }, [percent]);

  return (
    <div style={{ marginBottom: 12 }}>
      <div
        style={{
          fontSize: "0.9rem",
          marginBottom: 4,
          color: "var(--text)",
        }}
      >
        {label}: {percent}%
      </div>
      <div
        style={{
          background: "var(--border)",
          borderRadius: 8,
          height: 12,
          overflow: "hidden",
        }}
      >
        <div
          ref={barRef}
          style={{
            width: fillW,
            height: "100%",
            background: color,
            borderRadius: 8,
            transition: "width 0.8s ease",
          }}
        />
      </div>
    </div>
  );
}
