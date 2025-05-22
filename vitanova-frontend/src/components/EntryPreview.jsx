// src/components/EntryPreview.jsx
import React from "react";

export default function EntryPreview({
  date,
  moodPre,
  moodPost,
  text,
  getEmoji,
  photos = [],
}) {
  // Show placeholders for each file uploaded
  return (
    <div
      style={{
        flex: "1 1 400px",
        background: "#FFFFFF",
        borderRadius: "0.5rem",
        padding: "2rem",
        boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        border: "1px solid #E5E7EB",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ flex: 1 }} />
        <h3
          style={{
            flex: 1,
            textAlign: "center",
            margin: 0,
            fontSize: "1.5rem",
            color: "#374151",
          }}
        >
          Entry Preview
        </h3>
        <div
          style={{
            flex: 1,
            textAlign: "right",
            fontSize: "1rem",
            color: "#374151",
          }}
        >
          {date || "—"}
        </div>
      </div>

      {/* Emojis + Labels */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "1.5rem",
          color: "#374151",
        }}
      >
        <div style={{ fontSize: "1.1rem", margin: "1rem 0 0.5rem" }}>
          Mood Before
        </div>
        <span style={{ fontSize: "2.5rem", margin: "0 0.5rem" }}>
          {getEmoji(moodPre)}
        </span>

        <div style={{ fontSize: "1.1rem", margin: "1rem 0 0.5rem" }}>
          Mood After
        </div>
        <span style={{ fontSize: "2.5rem", margin: "0 0.5rem" }}>
          {getEmoji(moodPost)}
        </span>
      </div>

      {/* Photos */}
      {photos.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            marginBottom: "1.5rem",
          }}
        >
          {photos.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`Entry photo ${idx + 1}`}
              style={{
                maxHeight: "120px",
                borderRadius: "0.375rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                objectFit: "cover",
              }}
            />
          ))}
        </div>
      )}

      {/* Text */}
      <div
        style={{
          background: "#F9FAFB",
          padding: "1rem",
          borderRadius: "0.375rem",
          border: "1px solid #E5E7EB",
          whiteSpace: "pre-wrap",
          color: "#374151",
          lineHeight: "1.6",
          minHeight: "200px",
        }}
      >
        {text || "Your text preview will appear here..."}
      </div>
    </div>
  );
}
