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
import { format, parseISO } from "date-fns";

// Custom tooltip component
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.9)",
        border: "1px solid #ccc",
        padding: "0.5rem",
        borderRadius: "0.25rem",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        fontFamily: "'Lato', sans-serif",
      }}
    >
      <p style={{ margin: 0, fontSize: "0.875rem", color: "#374151" }}>
        {format(parseISO(label), "PPP")}
      </p>
      {payload.map((entry) => (
        <p
          key={entry.dataKey}
          style={{ margin: "0.25rem 0", color: entry.stroke }}
        >
          <span style={{ fontWeight: 600 }}>{entry.name}:</span> {entry.value}
        </p>
      ))}
    </div>
  );
}

export default function InteractiveChart({ data }) {
  return (
    <div
      style={{ width: "100%", height: 350, fontFamily: "'Lato', sans-serif" }}
    >
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="date"
            tickFormatter={(str) => format(parseISO(str), "MMM d")}
            tick={{ fill: "#6B7280", fontSize: 12 }}
            axisLine={{ stroke: "#E5E7EB" }}
            tickLine={false}
          />
          <YAxis
            domain={[1, 10]}
            tick={{ fill: "#6B7280", fontSize: 12 }}
            axisLine={{ stroke: "#E5E7EB" }}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="avgMoodPre"
            name="Mood (Before)"
            stroke="#4F46E5"
            strokeWidth={2}
            dot={{ r: 3, fill: "#4F46E5" }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="avgMoodPost"
            name="Mood (After)"
            stroke="#10B981"
            strokeWidth={2}
            dot={{ r: 3, fill: "#10B981" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
