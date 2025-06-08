// File: src/components/InteractiveChart.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Custom tooltip component
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const date = new Date(label);
  return (
    <div
      style={{
        background: "var(--bg)",
        border: "1px solid var(--border)",
        padding: "0.5rem",
        borderRadius: "0.25rem",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        fontFamily: "'Lato', sans-serif",
      }}
    >
      <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--text)" }}>
        {date.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>
      {payload.map((entry) => (
        <p
          key={entry.dataKey}
          style={{
            margin: "0.25rem 0",
            color: entry.stroke,
            fontSize: "0.9rem",
          }}
        >
          <strong>{entry.name}:</strong> {entry.value}
        </p>
      ))}
    </div>
  );
}

export default function InteractiveChart({ data }) {
  return (
    <div
      style={{
        width: "100%",
        height: 350,
        fontFamily: "'Lato', sans-serif",
        background: "var(--bg)",
        borderRadius: "0.5rem",
        padding: "1rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey="date"
            tickFormatter={(str) => {
              const d = new Date(str);
              return d.toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              });
            }}
            tick={{ fill: "var(--text-light)", fontSize: 12 }}
            axisLine={{ stroke: "var(--border)" }}
            tickLine={false}
          />
          <YAxis
            domain={[1, 10]}
            tick={{ fill: "var(--text-light)", fontSize: 12 }}
            axisLine={{ stroke: "var(--border)" }}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="avgMoodPre"
            name="Mood (Before)"
            stroke="var(--primary)"
            strokeWidth={2}
            dot={{ r: 3, fill: "var(--primary)" }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="avgMoodPost"
            name="Mood (After)"
            stroke="var(--primary-alt)"
            strokeWidth={2}
            dot={{ r: 3, fill: "var(--primary-alt)" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
