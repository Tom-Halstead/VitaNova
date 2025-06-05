// src/pages/EntryDetail.jsx

import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getEntry, deleteEntry } from "../../api/EntriesApi";

/**
 * Emotions lookup (value → {icon, label})
 */
const emotions = [
  { value: -8, label: "Terrible", icon: "🤮" },
  { value: -7, label: "Very Bad", icon: "😖" },
  { value: -6, label: "Bad", icon: "😞" },
  { value: -5, label: "Disappointed", icon: "😔" },
  { value: -4, label: "Sad", icon: "😢" },
  { value: -3, label: "Upset", icon: "😟" },
  { value: -2, label: "Anxious", icon: "😰" },
  { value: -1, label: "Nervous", icon: "😬" },
  { value: 0, label: "Neutral", icon: "😐" },
  { value: 1, label: "Okay", icon: "🙂" },
  { value: 2, label: "Content", icon: "😊" },
  { value: 3, label: "Pleased", icon: "😌" },
  { value: 4, label: "Happy", icon: "😃" },
  { value: 5, label: "Joyful", icon: "😄" },
  { value: 6, label: "Excited", icon: "🤩" },
  { value: 7, label: "Delighted", icon: "🥳" },
  { value: 8, label: "Ecstatic", icon: "🤯" },
  { value: 9, label: "Overjoyed", icon: "😍" },
  { value: 10, label: "Blissful", icon: "😇" },
];

export default function EntryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    getEntry(id).then(setEntry).catch(console.error);
  }, [id]);

  if (!entry) {
    return <div style={detailStyles.loadingContainer}>Loading…</div>;
  }

  const findEmotion = (value) =>
    emotions.find((e) => e.value === value) || { icon: "❓", label: "Unknown" };

  // Build the UTC‐safe display date
  const displayDate = new Date(
    entry.entryDate + "T00:00:00Z"
  ).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  const photos = entry.photos || [];

  const handleDelete = () => {
    if (!window.confirm("Really delete this entry?")) return;
    deleteEntry(id).then(() => navigate("/entries"));
  };

  return (
    <div style={detailStyles.pageWrapper}>
      <div style={detailStyles.card}>
        {/* ── Top Bar: Back + Delete ── */}
        <div style={detailStyles.topBar}>
          <Link
            to="/entries"
            style={detailStyles.backLink}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#4338CA")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#4F46E5")}
          >
            ← Back to all entries
          </Link>
          <button
            onClick={handleDelete}
            style={detailStyles.deleteBtn}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#C53030")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#E53E3E")}
          >
            Delete
          </button>
        </div>

        {/* ── Title / Date ── */}
        <h2 style={detailStyles.title}>Journal Entry on {displayDate}</h2>

        {/* ── Journal Text ── */}
        <div style={detailStyles.section}>
          <h3 style={detailStyles.sectionHeader}>🖋 Your Thoughts</h3>
          <div style={detailStyles.journalTextBox}>
            <p style={detailStyles.journalText}>{entry.text}</p>
          </div>
        </div>

        {/* ── Mood Before & After ── */}
        <div style={detailStyles.section}>
          <h3 style={detailStyles.sectionHeader}>😊 Mood</h3>
          <div style={detailStyles.moodGrid}>
            {["moodPre", "moodPost"].map((key, idx) => {
              const { icon, label } = findEmotion(entry[key]);
              return (
                <div key={idx} style={detailStyles.moodCard}>
                  <div style={detailStyles.moodIcon}>{icon}</div>
                  <div style={detailStyles.moodLabel}>
                    {idx === 0 ? "Before" : "After"}: {label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Activity Details ── */}
        {entry.activityType && (
          <div style={detailStyles.section}>
            <h3 style={detailStyles.sectionHeader}>🔥 Activity Details</h3>
            <div style={detailStyles.activityGrid}>
              {renderActivityRow(<RunSVG />, "Type", entry.activityType)}
              {renderActivityRow(
                <DurationSVG />,
                "Duration",
                entry.durationMin ? `${entry.durationMin} min` : ""
              )}
              {renderActivityRow(
                <DistanceSVG />,
                "Distance",
                entry.distance ? `${entry.distance} ${entry.distanceUnit}` : ""
              )}
              {renderActivityRow(
                <CaloriesSVG />,
                "Calories",
                entry.calories ? `${entry.calories} kcal` : ""
              )}
              {renderActivityRow(
                <LocationSVG />,
                "Location",
                entry.location || ""
              )}
              {renderActivityRow(
                <HeartSVG />,
                "Heart Rate",
                entry.avgHeartRate || entry.maxHeartRate
                  ? `${
                      entry.avgHeartRate ? `Avg ${entry.avgHeartRate} bpm` : ""
                    }${entry.avgHeartRate && entry.maxHeartRate ? " / " : ""}${
                      entry.maxHeartRate ? `Max ${entry.maxHeartRate} bpm` : ""
                    }`
                  : ""
              )}
              {renderActivityRow(
                <EquipmentSVG />,
                "Equipment",
                entry.equipment || ""
              )}
            </div>
            {entry.notes && (
              <div style={{ marginTop: "1.5rem" }}>
                <h4 style={detailStyles.subHeader}>🗒️ Notes</h4>
                <div style={detailStyles.notesBox}>
                  <p style={detailStyles.notesText}>{entry.notes}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Photos ── */}
        {photos.length > 0 && (
          <div style={detailStyles.section}>
            <h3 style={detailStyles.sectionHeader}>📸 Photos</h3>
            <div style={detailStyles.photosGrid}>
              {photos.map((p) => (
                <img
                  key={p.photoId}
                  src={p.url}
                  alt=""
                  style={detailStyles.photoThumb}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/** Helper for rendering a single row */
function renderActivityRow(iconNode, label, value) {
  if (!value) return null;
  return (
    <div
      style={detailStyles.activityRow}
      onMouseEnter={(e) =>
        Object.assign(e.currentTarget.style, detailStyles.activityRowHover)
      }
      onMouseLeave={(e) =>
        Object.assign(e.currentTarget.style, {
          background: "#FFFFFF",
          transform: "none",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        })
      }
    >
      <div style={detailStyles.activityIconWrapper}>{iconNode}</div>
      <div style={detailStyles.activityLabel}>{label}</div>
      <div style={detailStyles.activityValue}>{value}</div>
    </div>
  );
}

/** Inline SVG icons (same triangle fill colors used above) */
const RunSVG = () => (
  <svg viewBox="0 0 24 24" fill="#805AD5" width="20" height="20">
    <path d="M13.49 5.48c.88 0 1.6-.72 1.6-1.6s-.72-1.6-1.6-1.6-1.6.72-1.6 1.6.72 1.6 1.6 1.6zM17.2 7.07c.25.11.53.04.7-.17l.58-.7c.25-.3.19-.75-.15-1-.34-.24-.8-.18-1.04.12l-.58.7c-.25.3-.19.75.15 1zm-2.66 8.11l1.72 3.62c.14.29.44.46.76.46h1.02c.55 0 .99-.45.99-1 0-.17-.04-.34-.11-.49l-1.73-3.63c-.35-.73-1.16-1.02-1.89-.68-.73.35-1.02 1.15-.67 1.88zm3.46-4.76c.34.25.79.19 1.04-.12l.58-.7c.34-.42.29-1-.12-1.34-.42-.34-1-.29-1.34.12l-.58.7c-.34.42-.29 1 .12 1.34zm-4.36 1.46c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1s-1 .45-1 1v3c0 .55.45 1 1 1z" />
  </svg>
);

const DurationSVG = () => (
  <svg viewBox="0 0 24 24" fill="#D53F8C" width="20" height="20">
    <path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0-5c.55 0 1 .45 1 1v3a1 1 0 01-2 0V3c0-.55.45-1 1-1zm5.66 2.34a1 1 0 011.32-.08l2.12 1.77a1 1 0 01-1.32 1.52L16.66 5.78a1 1 0 01-.08-1.32zM19 11a1 1 0 011 1v2a1 1 0 01-2 0v-2a1 1 0 011-1zm-2.34 5.66a1 1 0 01.08 1.32l-1.77 2.12a1 1 0 11-1.52-1.32l1.77-2.12a1 1 0 011.44-.0zM12 17a1 1 0 011 1v3c0 .55-.45 1-1 1s-1-.45-1-1v-3a1 1 0 011-1zm-5.66-2.34a1 1 0 011.32-.08l2.12 1.77a1 1 0 01-1.32 1.52L5.78 16.66a1 1 0 01-.08-1.32zm-2.34-5.66a1 1 0 011-1h2a1 1 0 010 2H5a1 1 0 01-1-1zm2.34-5.66a1 1 0 01-.08 1.32L5.78 5.78a1 1 0 11-1.52-1.32L6.06 1.36a1 1 0 011.32-.08z" />
  </svg>
);

const DistanceSVG = () => (
  <svg viewBox="0 0 24 24" fill="#38A169" width="20" height="20">
    <path d="M12 2a10 10 0 00-3.22 19.43c.51.1.7-.22.7-.49 0-.24-.01-1.04-.01-1.89-2.85.62-3.45-1.37-3.45-1.37-.47-1.17-1.15-1.48-1.15-1.48-.94-.64.07-.63.07-.63 1.04.07 1.58 1.07 1.58 1.07.92 1.56 2.42 1.11 3.01.85.09-.66.36-1.11.65-1.36-2.27-.26-4.65-1.13-4.65-5.03 0-1.11.39-2.01 1.03-2.72-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.03a9.56 9.56 0 012.5-.34c.85 0 1.71.11 2.5.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.4.2 2.44.1 2.7.64.71 1.03 1.61 1.03 2.72 0 3.9-2.38 4.78-4.65 5.03.37.33.7.98.7 1.98 0 1.43-.01 2.58-.01 2.93 0 .27.19.59.7.49A10 10 0 0012 2z" />
  </svg>
);

const CaloriesSVG = () => (
  <svg viewBox="0 0 24 24" fill="#DD6B20" width="20" height="20">
    <path d="M12 2c-1.63 0-3.25.92-4.04 2.56C7.17 4.3 6.8 4 6.35 4 5 4 4 5 4 6.35c0 .45.3.82.56 1.61C4.92 8.75 4 10.37 4 12c0 4.41 3.59 8 8 8 4.41 0 8-3.59 8-8 0-1.63-.92-3.25-2.56-4.04.3-.79.56-1.16.56-1.61 0-1.35-1-2.35-2.35-2.35-.45 0-.82.3-1.61.56C15.25 2.92 13.63 2 12 2z" />
  </svg>
);

const LocationSVG = () => (
  <svg viewBox="0 0 24 24" fill="#4299E1" width="20" height="20">
    <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
  </svg>
);

const HeartSVG = () => (
  <svg viewBox="0 0 24 24" fill="#E53E3E" width="20" height="20">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 6.42 3.42 5 5.5 5c1.14 0 2.21.5 2.96 1.38C9.29 5.5 10.36 5 11.5 5 13.58 5 15 6.42 15 8.5c0 3.77-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const EquipmentSVG = () => (
  <svg viewBox="0 0 24 24" fill="#718096" width="20" height="20">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-1 13H5V7h14v10z" />
    <path d="M7 9h10v2H7zM7 13h6v2H7z" />
  </svg>
);

const detailStyles = {
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    fontFamily: "'Lato', sans-serif",
    fontSize: "1.25rem",
    color: "#6B7280",
  },
  pageWrapper: {
    minHeight: "100vh",
    padding: "2rem",
    background: "#F3F4F6",
    fontFamily: "'Lato', sans-serif",
    boxSizing: "border-box",
  },
  card: {
    maxWidth: "800px",
    margin: "0 auto",
    background: "#FFFFFF",
    borderRadius: "0.75rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    padding: "2rem",
    boxSizing: "border-box",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
  },
  backLink: {
    color: "#4F46E5",
    textDecoration: "none",
    fontWeight: 600,
    fontFamily: "'Lato', sans-serif",
    transition: "color 0.2s",
  },
  deleteBtn: {
    background: "#E53E3E",
    color: "#FFFFFF",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    cursor: "pointer",
    fontFamily: "'Lato', sans-serif",
    fontWeight: 600,
    transition: "background 0.2s ease",
  },
  title: {
    fontSize: "2rem",
    fontWeight: 600,
    color: "#374151",
    marginBottom: "1.5rem",
  },
  section: {
    marginBottom: "2.5rem",
  },
  sectionHeader: {
    fontSize: "1.25rem",
    fontWeight: 600,
    color: "#374151",
    marginBottom: "1rem",
    borderBottom: "2px solid #E2E8F0",
    paddingBottom: "0.5rem",
  },
  journalTextBox: {
    background: "#FAFAFF",
    borderLeft: "4px solid #805AD5",
    borderRadius: "0.5rem",
    padding: "1rem 1.25rem",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.03)",
  },
  journalText: {
    fontSize: "1rem",
    lineHeight: 1.6,
    color: "#4A5568",
    whiteSpace: "pre-wrap",
  },
  moodGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1rem",
  },
  moodCard: {
    background: "#FDF2F8",
    borderRadius: "0.5rem",
    padding: "1rem",
    textAlign: "center",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.04)",
  },
  moodIcon: {
    fontSize: "2.5rem",
    marginBottom: "0.5rem",
  },
  moodLabel: {
    fontSize: "1rem",
    fontWeight: 600,
    color: "#374151",
  },
  activityGrid: {
    background: "#FFFFFF",
    borderRadius: "0.75rem",
    border: "1px solid #E2E8F0",
    padding: "1rem",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.04)",
  },
  activityRow: {
    display: "grid",
    gridTemplateColumns: "32px 1fr 1fr",
    alignItems: "center",
    padding: "0.75rem 1rem",
    borderRadius: "0.5rem",
    background: "#FFFFFF",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    transition:
      "background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
    cursor: "default",
    marginBottom: "0.75rem",
  },
  activityRowHover: {
    background: "#F7FAFC",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.10)",
  },
  activityIconWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  activityLabel: {
    fontSize: "0.95rem",
    fontWeight: 600,
    color: "#4A5568",
    paddingLeft: "0.5rem",
  },
  activityValue: {
    fontSize: "1rem",
    fontWeight: 500,
    color: "#2D3748",
    paddingLeft: "0.5rem",
  },
  subHeader: {
    fontSize: "1.1rem",
    fontWeight: 600,
    color: "#374151",
    marginBottom: "0.5rem",
  },
  notesBox: {
    background: "#FFF8E1",
    borderRadius: "0.5rem",
    padding: "0.75rem 1rem",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.04)",
  },
  notesText: {
    fontSize: "1rem",
    lineHeight: 1.6,
    color: "#4A5568",
    whiteSpace: "pre-wrap",
  },
  photosGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
    gap: "1rem",
  },
  photoThumb: {
    width: "100%",
    height: "120px",
    objectFit: "cover",
    borderRadius: "0.5rem",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
  },
};
