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
      try {
        // Fetch entries
        const { entries: fetchedEntries = [] } = await listEntries(0, 1000);
        setEntries(fetchedEntries);

        // Aggregate by date
        const agg = fetchedEntries.reduce((acc, e) => {
          const d = e.entryDate;
          if (!acc[d]) acc[d] = { sumPre: 0, sumPost: 0, count: 0 };
          const moodPre = typeof e.moodPre === "number" ? e.moodPre : 0;
          const moodPost = typeof e.moodPost === "number" ? e.moodPost : 0;
          acc[d].sumPre += moodPre;
          acc[d].sumPost += moodPost;
          acc[d].count += 1;
          return acc;
        }, {});

        // Build sorted trend array
        const trend = Object.entries(agg)
          .sort(([a], [b]) => new Date(a) - new Date(b))
          .map(([date, { sumPre, sumPost, count }]) => ({
            date,
            avgPre: sumPre / count,
            avgPost: sumPost / count,
          }));

        // No data → flag and exit
        if (trend.length === 0) {
          setMetrics({ hasData: false });
          return;
        }

        // Compute core metrics
        const avgPre = trend.reduce((s, d) => s + d.avgPre, 0) / trend.length;
        const avgPost = trend.reduce((s, d) => s + d.avgPost, 0) / trend.length;
        const improvementDays = trend.filter(
          (d) => d.avgPost > d.avgPre
        ).length;
        const improvementRate = Math.round(
          (improvementDays / trend.length) * 100
        );

        // Calculate streaks
        let maxStreak = 0,
          curr = 0;
        trend.forEach((d) => {
          if (d.avgPost > d.avgPre) {
            curr++;
            maxStreak = Math.max(maxStreak, curr);
          } else {
            curr = 0;
          }
        });

        // Best/Worst days
        const best = trend.reduce(
          (b, d) => (d.avgPost > b.avgPost ? d : b),
          trend[0]
        );
        const worst = trend.reduce(
          (w, d) => (d.avgPost < w.avgPost ? d : w),
          trend[0]
        );

        // Weekend vs Weekday averages
        const weekendVals = [];
        const weekdayVals = [];
        trend.forEach((d) => {
          const day = new Date(d.date).getDay();
          (day === 0 || day === 6 ? weekendVals : weekdayVals).push(d.avgPost);
        });
        const avgWeekend = weekendVals.length
          ? weekendVals.reduce((a, b) => a + b, 0) / weekendVals.length
          : 0;
        const avgWeekday = weekdayVals.length
          ? weekdayVals.reduce((a, b) => a + b, 0) / weekdayVals.length
          : 0;

        // Save metrics
        setMetrics({
          hasData: true,
          avgPre,
          avgPost,
          improvementRate,
          maxStreak,
          best,
          worst,
          avgWeekend: avgWeekend.toFixed(2),
          avgWeekday: avgWeekday.toFixed(2),
        });
      } catch (err) {
        console.error("Failed to load insights:", err);
        setMetrics({ hasData: false });
      }
    })();
  }, []);

  // Loading state
  if (!metrics) {
    return (
      <div
        style={{
          padding: 24,
          color: "var(--text-light)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "200px",
        }}
      >
        Loading insights…
      </div>
    );
  }

  // No entries at all
  if (entries.length === 0) {
    return (
      <div
        style={{
          padding: 24,
          color: "var(--text-light)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "200px",
        }}
      >
        No entries yet—create a journal entry to see your insights.
      </div>
    );
  }

  // Build summary cards
  const summaryCards = [
    {
      title: "Average Mood Change",
      summary: `You go from ${metrics.avgPre.toFixed(
        2
      )} → ${metrics.avgPost.toFixed(2)} on average.`,
      details: `That’s a net change of ${(
        metrics.avgPost - metrics.avgPre
      ).toFixed(2)} points.`,
    },
    {
      title: "Weekend vs Weekday",
      summary: `Weekday avg ${metrics.avgWeekday}, weekend avg ${metrics.avgWeekend}.`,
      details: "Try journaling more on weekdays to smooth out slumps!",
    },
  ];

  if (metrics.hasData) {
    summaryCards.push(
      {
        title: "Best Day",
        summary: `${new Date(
          metrics.best.date
        ).toLocaleDateString()} (${metrics.best.avgPost.toFixed(2)})`,
        details: "That was your peak—what made it special?",
      },
      {
        title: "Lowest Day",
        summary: `${new Date(
          metrics.worst.date
        ).toLocaleDateString()} (${metrics.worst.avgPost.toFixed(2)})`,
        details:
          "Reflect on what might’ve dragged you down and plan to address it.",
      }
    );
  }

  // Build progress bars
  const progressBars = [
    {
      label: "Days Improved",
      percent: metrics.hasData ? metrics.improvementRate : 0,
      color: "var(--primary-alt)",
    },
    {
      label: "Max Improvement Streak",
      percent: entries.length
        ? Math.round((metrics.maxStreak / entries.length) * 100)
        : 0,
      color: "var(--primary)",
    },
  ];

  return (
    <div
      style={{
        padding: 24,
        background: "var(--bg-alt)",
        color: "var(--text)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: 800, width: "100%" }}>
        <h2 style={{ marginBottom: 16, textAlign: "center" }}>
          <span role="img" aria-label="Personalized Insights">
            🔍
          </span>{" "}
          Personalized Insights
        </h2>

        {/* summary cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
            marginBottom: 24,
          }}
        >
          {summaryCards.map((c, i) => (
            <InsightCard
              key={i}
              title={c.title}
              summary={c.summary}
              details={c.details}
            />
          ))}
        </div>

        {/* progress bars grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
          }}
        >
          {progressBars.map((b, i) => (
            <ProgressBar
              key={i}
              label={b.label}
              percent={b.percent}
              color={b.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
