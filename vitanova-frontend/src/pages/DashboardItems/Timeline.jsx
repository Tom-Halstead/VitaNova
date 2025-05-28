import React, { useEffect, useState } from "react";
import { fetchTimeline } from "../../api/DashboardApi";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function Timeline() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetchTimeline()
  //     .then(setData)
  //     .catch(console.error)
  //     .finally(() => setLoading(false));
  // }, []);

  if (loading)
    return (
      <div style={{ textAlign: "center", color: "#6B7280" }}>
        Loading timeline…
      </div>
    );
  if (!data.length)
    return (
      <div style={{ textAlign: "center", color: "#6B7280" }}>
        No workouts logged yet.
      </div>
    );

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid stroke="#e5e7eb" />
          <XAxis dataKey="date" tick={{ fill: "#374151" }} />
          <YAxis tick={{ fill: "#374151" }} />
          <Tooltip
            contentStyle={{ borderRadius: 8 }}
            formatter={(value, name) => [
              `${value}`,
              name === "totalMinutes" ? "Mins" : "Count",
            ]}
          />
          <Line
            type="monotone"
            dataKey="workoutCount"
            name="Sessions"
            stroke="#4f46e5"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="totalMinutes"
            name="Minutes"
            stroke="#6366f1"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
