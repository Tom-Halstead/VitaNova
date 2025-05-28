import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getEntry, deleteEntry } from "../../api/EntriesApi";

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
    getEntry(id).then(setEntry);
  }, [id]);

  if (!entry) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          fontFamily: "'Lato', sans-serif",
          fontSize: "1.25rem",
          color: "#6B7280",
        }}
      >
        Loading…
      </div>
    );
  }

  const findEmotion = (value) =>
    emotions.find((e) => e.value === value) || { icon: "❓", label: "Unknown" };

  const photos = entry.photos || [];

  const handleDelete = () => {
    if (!window.confirm("Really delete this entry?")) return;
    deleteEntry(id).then(() => navigate("/entries"));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem",
        background: "#F3F4F6",
        fontFamily: "'Lato', sans-serif",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "#FFFFFF",
          borderRadius: "0.75rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          padding: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <Link
            to="/entries"
            style={{
              color: "#4F46E5",
              textDecoration: "none",
              fontWeight: 600,
              fontFamily: "'Lato', sans-serif",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#4338CA")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#4F46E5")}
          >
            ← Back to all entries
          </Link>
          <button
            onClick={handleDelete}
            style={{
              background: "#E53E3E",
              color: "#FFFFFF",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              cursor: "pointer",
              fontFamily: "'Lato', sans-serif",
              fontWeight: 600,
            }}
          >
            Delete
          </button>
        </div>

        <h2
          style={{
            fontSize: "2rem",
            fontWeight: 600,
            color: "#374151",
            marginBottom: "1rem",
          }}
        >
          Journal Entry on{" "}
          {new Date(entry.entryDate).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h2>

        <p
          style={{
            color: "#4B5563",
            lineHeight: 1.6,
            marginBottom: "1.5rem",
            whiteSpace: "pre-wrap",
          }}
        >
          {entry.text}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "2rem",
          }}
        >
          {["moodPre", "moodPost"].map((key, idx) => {
            const { icon, label } = findEmotion(entry[key]);
            return (
              <div key={idx} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "3rem" }}>{icon}</div>
                <div
                  style={{
                    marginTop: "0.25rem",
                    fontSize: "1rem",
                    color: "#374151",
                    fontWeight: 600,
                  }}
                >
                  {idx === 0 ? "Mood Before" : "Mood After"}: {label}
                </div>
              </div>
            );
          })}
        </div>

        {photos.length > 0 && (
          <div>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: 500,
                color: "#374151",
                marginBottom: "0.75rem",
              }}
            >
              Photos
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                gap: "1rem",
              }}
            >
              {photos.map((p) => (
                <img
                  key={p.photoId}
                  src={p.url}
                  alt=""
                  style={{
                    width: "100%",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "0.5rem",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
