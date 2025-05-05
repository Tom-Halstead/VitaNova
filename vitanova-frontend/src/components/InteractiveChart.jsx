import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function InteractiveChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="avgMoodPre" stroke="#8884d8" />
        <Line type="monotone" dataKey="avgMoodPost" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
