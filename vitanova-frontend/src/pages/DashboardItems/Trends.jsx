// File: src/pages/Trends.jsx
import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { listEntries } from "../../api/EntriesApi";

function ChartContainer({ title, children }) {
  return (
    <div
      style={{
        marginBottom: "2rem",
        padding: "1rem",
        background: "var(--bg)",
        borderRadius: "0.5rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <h3 style={{ margin: "0 0 1rem", color: "var(--text)" }}>{title}</h3>
      <div style={{ width: "100%", height: 300 }}>{children}</div>
    </div>
  );
}

export default function Trends() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const { entries = [] } = await listEntries(0, 1000);
        // aggregate per date
        const agg = entries.reduce((acc, e) => {
          const d = e.entryDate;
          if (!acc[d]) acc[d] = { sumPre: 0, sumPost: 0, count: 0 };
          acc[d].sumPre += e.moodPre;
          acc[d].sumPost += e.moodPost;
          acc[d].count += 1;
          return acc;
        }, {});

        const chart = Object.entries(agg)
          .sort(([a], [b]) => new Date(a) - new Date(b))
          .map(([date, { sumPre, sumPost, count }]) => {
            const avgPre = sumPre / count;
            const avgPost = sumPost / count;
            return {
              date,
              avgMoodPre: +avgPre.toFixed(2),
              avgMoodPost: +avgPost.toFixed(2),
              entryCount: count,
              moodDelta: +(avgPost - avgPre).toFixed(2),
            };
          });

        setData(chart);
      } catch (err) {
        console.error("Failed to load trends:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "2rem", color: "var(--text-light)" }}>
        Loading trends…
      </div>
    );
  }

  if (!data.length) {
    return (
      <div style={{ padding: "2rem", color: "var(--text-light)" }}>
        No trend data available.
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", background: "var(--bg-alt)" }}>
      {/* 1) Mood Trends */}
      <ChartContainer title="📈 Mood Trends">
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(str) =>
                new Date(str).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })
              }
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
            <Tooltip />
            <Line
              type="monotone"
              dataKey="avgMoodPre"
              name="Mood Before"
              stroke="var(--primary)"
              dot={{ r: 2, fill: "var(--primary)" }}
            />
            <Line
              type="monotone"
              dataKey="avgMoodPost"
              name="Mood After"
              stroke="var(--primary-alt)"
              dot={{ r: 2, fill: "var(--primary-alt)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* 2) Daily Entry Count */}
      <ChartContainer title="📊 Daily Entry Count">
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(str) =>
                new Date(str).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })
              }
              tick={{ fill: "var(--text-light)", fontSize: 12 }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fill: "var(--text-light)", fontSize: 12 }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
            />
            <Tooltip />
            <Bar dataKey="entryCount" name="Entries" fill="var(--primary)" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* 3) Mood Change (Post–Pre) */}
      <ChartContainer title="🔄 Mood Change (After − Before)">
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(str) =>
                new Date(str).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })
              }
              tick={{ fill: "var(--text-light)", fontSize: 12 }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => (v > 0 ? `+${v}` : v)}
              tick={{ fill: "var(--text-light)", fontSize: 12 }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="moodDelta"
              name="Mood Δ"
              stroke="var(--primary-alt)"
              dot={{ r: 2, fill: "var(--primary-alt)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
