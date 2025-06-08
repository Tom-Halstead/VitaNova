// File: src/pages/NewEntryItems/EntryModal.jsx
import React from "react";

export default function EntryModal({ entry, onClose }) {
  const formatDate = (iso) => {
    const d = new Date(iso);
    if (isNaN(d)) return iso;
    return d.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={styles.closeBtn}>
          ✕
        </button>
        <h3 style={styles.header}>Journal Entry</h3>

        <p style={styles.metaLine}>
          <strong>Date:</strong> {formatDate(entry.entryDate)}
        </p>
        <p style={styles.metaLine}>
          <strong>Mood Before:</strong> {entry.moodPre}{" "}
          <span style={styles.emoji}>{entry.getEmoji?.(entry.moodPre)}</span>
        </p>
        <p style={styles.metaLine}>
          <strong>Mood After:</strong> {entry.moodPost}{" "}
          <span style={styles.emoji}>{entry.getEmoji?.(entry.moodPost)}</span>
        </p>

        <div style={styles.section}>
          <strong>Your Thoughts:</strong>
          <p style={styles.text}>
            {entry.text?.slice(0, 200) || "No entry text."}
            {entry.text?.length > 200 ? "…" : ""}
          </p>
        </div>

        {entry.activityType && (
          <div style={styles.section}>
            <strong>Activity Details:</strong>
            {[
              entry.activityType && ["Type", entry.activityType],
              entry.durationMin && ["Duration", `${entry.durationMin} min`],
              entry.distance != null && [
                "Distance",
                `${entry.distance} ${entry.distanceUnit}`,
              ],
              entry.calories != null && ["Calories", `${entry.calories} kcal`],
              entry.location && ["Location", entry.location],
              (entry.avgHeartRate || entry.maxHeartRate) && [
                "Heart Rate",
                `${entry.avgHeartRate ? `Avg ${entry.avgHeartRate} bpm` : ""}${
                  entry.avgHeartRate && entry.maxHeartRate ? " / " : ""
                }${entry.maxHeartRate ? `Max ${entry.maxHeartRate} bpm` : ""}`,
              ],
              entry.equipment && ["Equipment", entry.equipment],
              entry.notes && ["Notes", entry.notes],
            ]
              .filter(Boolean)
              .map(([label, value]) => (
                <p key={label} style={styles.metaLine}>
                  <strong>{label}:</strong> {value}
                </p>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

const baseModal = {
  background: "var(--bg)",
  borderRadius: "0.75rem",
  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
  padding: "2rem",
  maxWidth: "500px",
  width: "90%",
  position: "relative",
  boxSizing: "border-box",
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  modal: {
    ...baseModal,
  },
  closeBtn: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    background: "transparent",
    border: "none",
    fontSize: "1.25rem",
    cursor: "pointer",
    color: "var(--text-light)",
  },
  header: {
    margin: 0,
    fontSize: "1.5rem",
    color: "var(--text)",
    marginBottom: "1rem",
  },
  metaLine: {
    margin: "0.25rem 0",
    fontSize: "0.95rem",
    color: "var(--text-light)",
  },
  emoji: {
    marginLeft: "0.5rem",
  },
  section: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  text: {
    marginTop: "0.5rem",
    fontSize: "1rem",
    color: "var(--text-light)",
    lineHeight: 1.5,
    whiteSpace: "pre-wrap",
  },
};
