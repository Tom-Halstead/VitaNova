// File: src/pages/EntryDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEntry, deleteEntry } from "../../api/EntriesApi";

const emotions = [
  { value: -8, icon: "🤮", label: "Terrible" },
  { value: -7, icon: "😖", label: "Very Bad" },
  { value: -6, icon: "😞", label: "Bad" },
  { value: -5, icon: "😔", label: "Disappointed" },
  { value: -4, icon: "😢", label: "Sad" },
  { value: -3, icon: "😟", label: "Upset" },
  { value: -2, icon: "😰", label: "Anxious" },
  { value: -1, icon: "😬", label: "Nervous" },
  { value: 0, icon: "😐", label: "Neutral" },
  { value: 1, icon: "🙂", label: "Okay" },
  { value: 2, icon: "😊", label: "Content" },
  { value: 3, icon: "😌", label: "Pleased" },
  { value: 4, icon: "😃", label: "Happy" },
  { value: 5, icon: "😄", label: "Joyful" },
  { value: 6, icon: "🤩", label: "Excited" },
  { value: 7, icon: "🥳", label: "Delighted" },
  { value: 8, icon: "🤯", label: "Ecstatic" },
  { value: 9, icon: "😍", label: "Overjoyed" },
  { value: 10, icon: "😇", label: "Blissful" },
];

export default function EntryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    getEntry(id).then(setEntry).catch(console.error);
  }, [id]);

  if (!entry) {
    return <div style={styles.loading}>Loading…</div>;
  }

  const findEmotion = (v) =>
    emotions.find((e) => e.value === v) || { icon: "❓", label: "Unknown" };

  const displayDate = new Date(
    entry.entryDate + "T00:00:00Z"
  ).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  const hasActivity =
    entry.activityType ||
    entry.durationMin ||
    entry.distance ||
    entry.calories ||
    entry.location ||
    entry.avgHeartRate ||
    entry.maxHeartRate ||
    entry.equipment ||
    entry.notes;

  const renderField = (label, value) => (
    <div style={styles.fieldRow}>
      <div style={styles.fieldLabel}>{label}</div>
      <div style={styles.fieldValue}>{value}</div>
    </div>
  );

  const handleDelete = () => {
    if (!window.confirm("Really delete this entry?")) return;
    deleteEntry(id).then(() => navigate(-1));
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.topBar}>
          <button onClick={() => navigate(-1)} style={styles.backBtn}>
            ← Back
          </button>
          <button onClick={handleDelete} style={styles.deleteBtn}>
            Delete
          </button>
        </div>

        <h2 style={styles.title}>Journal Entry on {displayDate}</h2>

        <div style={styles.section}>
          <h3 style={styles.sectionHeader}>🖋 Your Thoughts</h3>
          <div style={styles.journalBox}>
            <p style={styles.journalText}>{entry.text}</p>
          </div>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionHeader}>
            {" "}
            <span role="img" aria-label="Mood">
              😊
            </span>{" "}
            Mood
          </h3>
          <div style={styles.moodGrid}>
            {["moodPre", "moodPost"].map((k, i) => {
              const { icon, label } = findEmotion(entry[k]);
              return (
                <div key={k} style={styles.moodCard}>
                  <div style={styles.moodIcon}>{icon}</div>
                  <div style={styles.moodLabel}>
                    {i === 0 ? "Before" : "After"}: {label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {hasActivity && (
          <div style={styles.section}>
            <h3 style={styles.sectionHeader}>
              {" "}
              <span role="img" aria-label="Activity">
                🔥
              </span>{" "}
              Activity Details
            </h3>
            <div style={styles.activityBox}>
              {entry.activityType && renderField("Type", entry.activityType)}
              {entry.durationMin &&
                renderField("Duration", `${entry.durationMin} min`)}
              {entry.distance != null &&
                renderField(
                  "Distance",
                  `${entry.distance} ${entry.distanceUnit}`
                )}
              {entry.calories != null &&
                renderField("Calories", `${entry.calories} kcal`)}
              {entry.location && renderField("Location", entry.location)}
              {(entry.avgHeartRate || entry.maxHeartRate) &&
                renderField(
                  "Heart Rate",
                  `${
                    entry.avgHeartRate ? `Avg ${entry.avgHeartRate} bpm` : ""
                  }${entry.avgHeartRate && entry.maxHeartRate ? " / " : ""}${
                    entry.maxHeartRate ? `Max ${entry.maxHeartRate} bpm` : ""
                  }`
                )}
              {entry.equipment && renderField("Equipment", entry.equipment)}
            </div>
            {entry.notes && (
              <div style={styles.notesSection}>
                <h4 style={styles.subHeader}>
                  <span role="img" aria-label="Notes">
                    🗒️
                  </span>{" "}
                  Notes
                </h4>
                <div style={styles.notesBox}>
                  <p style={styles.notesText}>{entry.notes}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "'Lato', sans-serif",
    fontSize: "1.25rem",
    color: "var(--text-light)",
  },
  page: {
    minHeight: "100vh",
    padding: "2rem",
    background: "var(--bg-alt)",
    fontFamily: "'Lato', sans-serif",
    boxSizing: "border-box",
  },
  card: {
    maxWidth: "800px",
    margin: "0 auto",
    background: "var(--bg)",
    borderRadius: "0.75rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    padding: "2rem",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1.5rem",
  },
  backBtn: {
    background: "transparent",
    border: "none",
    color: "var(--primary)",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
  },
  deleteBtn: {
    background: "var(--error-bg)",
    color: "var(--error-text)",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    cursor: "pointer",
    fontWeight: 600,
  },
  title: {
    fontSize: "2rem",
    fontWeight: 600,
    color: "var(--text)",
    marginBottom: "1.5rem",
  },
  section: {
    marginBottom: "2.5rem",
  },
  sectionHeader: {
    fontSize: "1.25rem",
    fontWeight: 600,
    color: "var(--text)",
    marginBottom: "1rem",
    borderBottom: "2px solid var(--border)",
    paddingBottom: "0.5rem",
  },
  journalBox: {
    background: "var(--bg-alt)",
    borderLeft: "4px solid var(--primary)",
    borderRadius: "0.5rem",
    padding: "1rem 1.25rem",
  },
  journalText: {
    fontSize: "1rem",
    lineHeight: 1.6,
    color: "var(--text-light)",
    whiteSpace: "pre-wrap",
  },
  moodGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1rem",
  },
  moodCard: {
    background: "var(--bg-alt)",
    borderRadius: "0.5rem",
    padding: "1rem",
    textAlign: "center",
  },
  moodIcon: {
    fontSize: "2.5rem",
    marginBottom: "0.5rem",
  },
  moodLabel: {
    fontSize: "1rem",
    fontWeight: 600,
    color: "var(--text-light)",
  },
  activityBox: {
    background: "var(--bg)",
    borderRadius: "0.5rem",
    padding: "1rem",
  },
  fieldRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.75rem 0",
    borderBottom: "1px solid var(--border)",
  },
  fieldLabel: {
    fontSize: "1rem",
    fontWeight: 600,
    color: "var(--text)",
  },
  fieldValue: {
    fontSize: "1rem",
    color: "var(--text-light)",
  },
  notesSection: {
    marginTop: "2rem",
  },
  subHeader: {
    fontSize: "1.1rem",
    fontWeight: 600,
    color: "var(--text)",
    marginBottom: "0.5rem",
  },
  notesBox: {
    background: "var(--bg-alt)",
    borderRadius: "0.5rem",
    padding: "0.75rem 1rem",
  },
  notesText: {
    fontSize: "1rem",
    lineHeight: 1.6,
    color: "var(--text-light)",
    whiteSpace: "pre-wrap",
  },
};
