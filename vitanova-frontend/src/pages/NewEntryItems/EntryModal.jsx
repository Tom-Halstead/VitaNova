// src/pages/NewEntryItems/EntryModal.jsx

import React from "react";

export default function EntryModal({ entry, onClose }) {
  // Format date
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

        {/* Date & Mood */}
        <p style={styles.metaLine}>
          <strong>Date:</strong> {formatDate(entry.entryDate)}
        </p>
        <p style={styles.metaLine}>
          <strong>Mood Before:</strong> {entry.moodPre}{" "}
          <span style={{ marginLeft: 8 }}>
            {entry.getEmoji?.(entry.moodPre)}
          </span>
        </p>
        <p style={styles.metaLine}>
          <strong>Mood After:</strong> {entry.moodPost}{" "}
          <span style={{ marginLeft: 8 }}>
            {entry.getEmoji?.(entry.moodPost)}
          </span>
        </p>

        {/* Journal text snippet */}
        <div style={styles.section}>
          <strong>Your Thoughts:</strong>
          <p style={styles.text}>
            {entry.text?.slice(0, 200) || "No entry text."}
            {entry.text?.length > 200 ? "…" : ""}
          </p>
        </div>

        {/* Activity details */}
        {entry.activityType && (
          <div style={styles.section}>
            <strong>Activity Details</strong>
            <p style={styles.metaLine}>
              <strong>Type:</strong> {entry.activityType}
            </p>
            {entry.durationMin && (
              <p style={styles.metaLine}>
                <strong>Duration:</strong> {entry.durationMin} min
              </p>
            )}
            {entry.distance != null && (
              <p style={styles.metaLine}>
                <strong>Distance:</strong> {entry.distance} {entry.distanceUnit}
              </p>
            )}
            {entry.calories != null && (
              <p style={styles.metaLine}>
                <strong>Calories:</strong> {entry.calories} kcal
              </p>
            )}
            {(entry.avgHeartRate || entry.maxHeartRate) && (
              <p style={styles.metaLine}>
                <strong>Heart Rate:</strong>{" "}
                {entry.avgHeartRate ? `Avg ${entry.avgHeartRate} bpm` : ""}
                {entry.avgHeartRate && entry.maxHeartRate ? " / " : ""}
                {entry.maxHeartRate ? `Max ${entry.maxHeartRate} bpm` : ""}
              </p>
            )}
            {entry.equipment && (
              <p style={styles.metaLine}>
                <strong>Equipment:</strong> {entry.equipment}
              </p>
            )}
            {entry.notes && (
              <p style={styles.metaLine}>
                <strong>Notes:</strong> {entry.notes}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const baseModal = {
  background: "#FFFFFF",
  borderRadius: "0.75rem",
  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
  padding: "2rem",
  maxWidth: "500px",
  width: "90%",
  position: "relative",
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
  },
  header: {
    margin: 0,
    fontSize: "1.5rem",
    color: "#2D3748",
    marginBottom: "1rem",
  },
  metaLine: {
    margin: "0.25rem 0",
    fontSize: "0.95rem",
    color: "#4A5568",
  },
  section: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  text: {
    marginTop: "0.5rem",
    fontSize: "1rem",
    color: "#4A5568",
    lineHeight: 1.5,
  },
};
