// src/components/EntryCard.jsx

import React from "react";

export default function EntryCard({ entry }) {
  const formatDate = (iso) => {
    const d = new Date(iso);
    if (isNaN(d)) return iso;
    return d.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // snippet only for journal text
  const snippet =
    entry.text?.length > 100
      ? entry.text.slice(0, 100) + "…"
      : entry.text || "No journal text.";

  return (
    <div style={styles.card}>
      <h3 style={styles.header}>Journal Entry</h3>
      <p style={styles.date}>{formatDate(entry.entryDate)}</p>
      <p style={styles.text}>{snippet}</p>

      <div style={styles.section}>
        <strong>Mood Before:</strong> {entry.moodPre} <strong>After:</strong>{" "}
        {entry.moodPost}
      </div>

      {entry.activityType && (
        <div style={styles.section}>
          <strong>Activity Type:</strong> {entry.activityType} <br />
          <strong>Duration:</strong> {entry.durationMin} min <br />
          <strong>Distance:</strong> {entry.distance} {entry.distanceUnit}{" "}
          <br />
          <strong>Calories:</strong> {entry.calories} kcal <br />
          {entry.location && (
            <>
              <strong>Location:</strong> {entry.location} <br />
            </>
          )}
          {(entry.avgHeartRate || entry.maxHeartRate) && (
            <>
              <strong>Heart Rate:</strong>{" "}
              {entry.avgHeartRate && `Avg ${entry.avgHeartRate} bpm `}
              {entry.maxHeartRate && `/ Max ${entry.maxHeartRate} bpm`}
              <br />
            </>
          )}
          {entry.equipment && (
            <>
              <strong>Equipment:</strong> {entry.equipment} <br />
            </>
          )}
        </div>
      )}

      {entry.notes && (
        <div style={styles.section}>
          <strong>Notes:</strong> {entry.notes}
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    background: "#FFFFFF",
    borderRadius: "0.75rem",
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
    padding: "2rem",
    maxWidth: "500px",
    width: "90%",
    boxSizing: "border-box",
  },
  header: {
    margin: 0,
    fontSize: "1.5rem",
    color: "#2D3748",
    marginBottom: "0.5rem",
  },
  date: {
    fontSize: "0.9rem",
    color: "#6B7280",
    marginBottom: "1rem",
  },
  text: {
    fontSize: "1rem",
    color: "#4A5568",
    lineHeight: 1.5,
    marginBottom: "1rem",
  },
  section: {
    fontSize: "0.95rem",
    color: "#4A5568",
    marginBottom: "0.75rem",
    lineHeight: 1.4,
  },
};
