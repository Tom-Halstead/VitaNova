// File: src/pages/DashboardItems/Insights.jsx
import React, { useEffect, useState } from "react";
import { listEntries } from "../../api/EntriesApi";
import InsightCard from "./InsightItems/InsightCard";
import ProgressBar from "./InsightItems/ProgressBar";

export default function Insights() {
  const [entries, setEntries] = useState([]);
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    (async () => {
      const { entries = [] } = await listEntries(0, 1000);
      setEntries(entries);

      // aggregate per date
      const agg = entries.reduce((acc, e) => {
        const d = e.entryDate;
        if (!acc[d]) acc[d] = { sumPre: 0, sumPost: 0, count: 0 };
        acc[d].sumPre += e.moodPre;
        acc[d].sumPost += e.moodPost;
        acc[d].count += 1;
        return acc;
      }, {});

      // build sorted trend array
      const trend = Object.entries(agg)
        .sort(([a], [b]) => new Date(a) - new Date(b))
        .map(([date, { sumPre, sumPost, count }]) => ({
          date,
          avgPre: sumPre / count,
          avgPost: sumPost / count,
        }));

      // compute metrics
      const avgPre = trend.reduce((s, d) => s + d.avgPre, 0) / trend.length;
      const avgPost = trend.reduce((s, d) => s + d.avgPost, 0) / trend.length;
      const improvementDays = trend.filter((d) => d.avgPost > d.avgPre).length;
      const improvementRate = Math.round(
        (improvementDays / trend.length) * 100
      );
      let maxStreak = 0,
        curr = 0;
      trend.forEach((d) => {
        if (d.avgPost > d.avgPre) {
          curr++;
          maxStreak = Math.max(maxStreak, curr);
        } else curr = 0;
      });
      const best = trend.reduce(
        (b, d) => (d.avgPost > b.avgPost ? d : b),
        trend[0]
      );
      const worst = trend.reduce(
        (w, d) => (d.avgPost < w.avgPost ? d : w),
        trend[0]
      );
      const weekend = [],
        weekday = [];
      trend.forEach((d) => {
        const day = new Date(d.date).getDay();
        (day === 0 || day === 6 ? weekend : weekday).push(d.avgPost);
      });
      const avgWeekend = weekend.length
        ? weekend.reduce((a, b) => a + b, 0) / weekend.length
        : 0;
      const avgWeekday = weekday.length
        ? weekday.reduce((a, b) => a + b, 0) / weekday.length
        : 0;

      setMetrics({
        avgPre,
        avgPost,
        improvementRate,
        maxStreak,
        best,
        worst,
        avgWeekend: avgWeekend.toFixed(2),
        avgWeekday: avgWeekday.toFixed(2),
      });
    })();
  }, []);

  if (!metrics)
    return (
      <div style={{ padding: 24, color: "var(--text-light)" }}>
        Loading insights…
      </div>
    );

  return (
    <div
      style={{ padding: 24, background: "var(--bg-alt)", color: "var(--text)" }}
    >
      <h2 style={{ marginBottom: 16 }}>🔍 Personalized Insights</h2>

      <InsightCard
        title="Average Mood Change"
        summary={`You go from ${metrics.avgPre.toFixed(
          2
        )} → ${metrics.avgPost.toFixed(2)} on average.`}
        details={`That’s a net change of ${(
          metrics.avgPost - metrics.avgPre
        ).toFixed(2)} points.`}
      />

      <ProgressBar
        label="Days Your Mood Improved"
        percent={metrics.improvementRate}
        color="var(--primary-alt)"
      />

      <ProgressBar
        label="Longest Improvement Streak"
        percent={Math.round((metrics.maxStreak / entries.length) * 100)}
        color="var(--primary)"
      />

      <InsightCard
        title="Weekend vs Weekday"
        summary={`Weekdays avg ${metrics.avgWeekday}, weekends avg ${metrics.avgWeekend}.`}
        details="Try journaling more on weekdays to boost those mid-week slumps!"
      />

      <InsightCard
        title="Best Day"
        summary={`${new Date(
          metrics.best.date
        ).toLocaleDateString()} (${metrics.best.avgPost.toFixed(2)})`}
        details="That was your peak—what made it special?"
      />

      <InsightCard
        title="Lowest Day"
        summary={`${new Date(
          metrics.worst.date
        ).toLocaleDateString()} (${metrics.worst.avgPost.toFixed(2)})`}
        details="Reflect on what might’ve dragged you down, then plan to address it."
      />
    </div>
  );
}
