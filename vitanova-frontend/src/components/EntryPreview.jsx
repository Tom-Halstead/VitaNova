// src/components/EntryPreview.jsx
import React from "react";

export default function EntryPreview({
  date,
  moodPre,
  moodPost,
  text,
  getEmoji,
  photos,
  activityType,
  durationMin,
  distance,
  distanceUnit,
  calories,
  location,
  avgHeartRate,
  maxHeartRate,
  equipment,
  notes,
}) {
  // A little helper to only render a label/value pair if value is non‐empty
  const renderField = (label, value) => {
    if (value === undefined || value === null || value === "") return null;
    return (
      <div style={styles.fieldRow}>
        <span style={styles.fieldLabel}>{label}</span>
        <span style={styles.fieldValue}>{value}</span>
      </div>
    );
  };

  // Check if any activity‐related fields are present
  const hasActivity =
    activityType ||
    durationMin ||
    distance ||
    calories ||
    location ||
    avgHeartRate ||
    maxHeartRate ||
    equipment ||
    notes;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.header}>📋 Entry Preview</h2>

        {/* ── Date & Mood Summary ── */}
        <div style={styles.summaryGrid}>
          <div style={styles.summaryBox}>
            <div style={styles.fieldRow}>
              <span style={styles.fieldLabel}>📅 Date:</span>
              <span style={styles.fieldValue}>{date}</span>
            </div>
          </div>
          <div style={styles.summaryBox}>
            <div style={styles.fieldRow}>
              <span style={styles.fieldLabel}>Mood Before:</span>
              <span style={styles.fieldValue}>
                {getEmoji(moodPre)} ({moodPre})
              </span>
            </div>
          </div>
          <div style={styles.summaryBox}>
            <div style={styles.fieldRow}>
              <span style={styles.fieldLabel}>Mood After:</span>
              <span style={styles.fieldValue}>
                {getEmoji(moodPost)} ({moodPost})
              </span>
            </div>
          </div>
        </div>

        {/* ── Journal Text ── */}
        {text && (
          <div style={{ marginTop: "1.5rem" }}>
            <h3 style={styles.sectionHeader}>🖋 Journal Text</h3>
            <p style={styles.paragraph}>{text}</p>
          </div>
        )}

        {/* ── Activity Details ── */}
        {hasActivity && (
          <div style={{ marginTop: text ? "2rem" : "1.5rem" }}>
            <h3 style={styles.sectionHeader}>🔥 Activity Details</h3>

            <div style={styles.activityGrid}>
              {renderField("Type:", activityType)}
              {renderField("Duration (min):", durationMin)}
              {renderField(
                "Distance:",
                distance && `${distance} ${distanceUnit}`
              )}
              {renderField(
                "Calories:",
                calories !== 0 ? `${calories} kcal` : null
              )}
              {renderField("Location:", location)}
              {renderField(
                "Heart Rate:",
                avgHeartRate || maxHeartRate
                  ? `${avgHeartRate ? `Avg ${avgHeartRate} bpm` : ""}${
                      avgHeartRate && maxHeartRate ? " / " : ""
                    }${maxHeartRate ? `Max ${maxHeartRate} bpm` : ""}`
                  : null
              )}
              {renderField("Equipment:", equipment)}
            </div>

            {/* ── Additional Notes (full‐width) ── */}
            {notes && (
              <div style={{ marginTop: "1.25rem" }}>
                <div style={styles.fieldLabel}>🗒️ Notes:</div>
                <p style={styles.paragraph}>{notes}</p>
              </div>
            )}
          </div>
        )}

        {/* ── Photos ── */}
        {photos && photos.length > 0 && (
          <div style={{ marginTop: hasActivity || text ? "2rem" : "1.5rem" }}>
            <h3 style={styles.sectionHeader}>📸 Photos</h3>
            <div style={styles.photosGrid}>
              {photos.map((file, i) => (
                <div key={i} style={styles.photoWrapper}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${i + 1}`}
                    style={styles.photo}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#F7FAFC",
    padding: "2rem",
    display: "flex",
    justifyContent: "center",
    fontFamily: "'Lato', sans-serif",
  },
  card: {
    background: "#FFFFFF",
    borderRadius: "0.75rem",
    padding: "2rem",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
    width: "100%",
    maxWidth: "900px",
    boxSizing: "border-box",
  },
  header: {
    fontSize: "1.75rem",
    color: "#2D3748",
    marginBottom: "1.5rem",
    textAlign: "center",
  },
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem",
  },
  summaryBox: {
    background: "#F0F4F8",
    borderRadius: "0.5rem",
    padding: "1rem",
  },
  sectionHeader: {
    fontSize: "1.25rem",
    fontWeight: 600,
    color: "#2D3748",
    marginBottom: "0.75rem",
  },
  paragraph: {
    fontSize: "1rem",
    lineHeight: 1.6,
    color: "#4A5568",
    whiteSpace: "pre-wrap",
  },
  activityGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem",
  },
  fieldRow: {
    display: "flex",
    flexDirection: "column",
    background: "#F9FAFB",
    borderRadius: "0.5rem",
    padding: "0.75rem",
  },
  fieldLabel: {
    fontSize: "0.95rem",
    fontWeight: 500,
    color: "#4A5568",
    marginBottom: "0.25rem",
  },
  fieldValue: {
    fontSize: "1rem",
    color: "#2D3748",
  },
  photosGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
  },
  photoWrapper: {
    width: "120px",
    height: "120px",
    overflow: "hidden",
    borderRadius: "0.5rem",
    border: "1px solid #CBD5E0",
  },
  photo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};
