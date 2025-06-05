// src/pages/EntryDetail.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEntry, deleteEntry } from "../../api/EntriesApi";

// Emotions lookup
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
    getEntry(id)
      .then((data) => setEntry(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!entry) {
    return <div style={detailStyles.loadingContainer}>Loading…</div>;
  }

  const findEmotion = (value) =>
    emotions.find((e) => e.value === value) || { icon: "❓", label: "Unknown" };

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
    deleteEntry(id).then(() => navigate(-1));
  };

  return (
    <div style={detailStyles.pageWrapper}>
      <div style={detailStyles.card}>
        {/* Top bar: dynamic “Back” + Delete */}
        <div style={detailStyles.topBar}>
          <button
            onClick={() => navigate(-1)}
            style={detailStyles.backBtn}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#4338CA")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#4F46E5")}
          >
            ← Back
          </button>
          <button
            onClick={handleDelete}
            style={detailStyles.deleteBtn}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#C53030")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#E53E3E")}
          >
            Delete
          </button>
        </div>

        <h2 style={detailStyles.title}>Journal Entry on {displayDate}</h2>

        {/* Journal Text */}
        <div style={detailStyles.section}>
          <h3 style={detailStyles.sectionHeader}>🖋 Your Thoughts</h3>
          <div style={detailStyles.journalTextBox}>
            <p style={detailStyles.journalText}>{entry.text}</p>
          </div>
        </div>

        {/* Mood Before & After */}
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

        {/* Photos */}
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
  backBtn: {
    background: "transparent",
    border: "none",
    color: "#4F46E5",
    fontFamily: "'Lato', sans-serif",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
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
