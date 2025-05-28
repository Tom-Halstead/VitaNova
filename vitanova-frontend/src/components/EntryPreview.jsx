// src/components/EntryPreview.jsx
import React, { useState, useEffect } from "react";

export default function EntryPreview({
  date,
  moodPre,
  moodPost,
  text,
  getEmoji,
  photos = [],
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // container
  const container = {
    width: "100%",
    maxWidth: "700px",
    margin: "2rem auto",
    padding: "1.5rem",
    background: "#FFFFFF",
    borderRadius: "0.5rem",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    border: "1px solid #E5E7EB",
    boxSizing: "border-box",
  };

  // header row
  const header = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: isMobile ? "flex-start" : "center",
    marginBottom: "1.5rem",
    gap: isMobile ? "0.5rem" : "0",
  };
  const title = {
    flex: 1,
    fontSize: "1.5rem",
    color: "#374151",
    textAlign: isMobile ? "left" : "center",
    margin: 0,
  };
  const dateStyle = {
    fontSize: "0.95rem",
    color: "#374151",
    textAlign: isMobile ? "left" : "right",
  };

  // mood block
  const moodContainer = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    marginBottom: "1.5rem",
  };
  const moodBlock = {
    textAlign: "center",
    color: "#374151",
  };
  const moodLabel = {
    fontSize: "1.1rem",
    marginBottom: "0.5rem",
  };
  const moodIcon = {
    fontSize: "2.5rem",
  };

  // photos row
  const photosRow = {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    justifyContent: "center",
    marginBottom: "1.5rem",
  };
  const photoStyle = {
    width: isMobile ? "45%" : "120px",
    height: "auto",
    borderRadius: "0.375rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    objectFit: "cover",
  };

  // text
  const textBox = {
    background: "#F9FAFB",
    padding: "1rem",
    borderRadius: "0.375rem",
    border: "1px solid #E5E7EB",
    whiteSpace: "pre-wrap",
    color: "#374151",
    lineHeight: "1.6",
    minHeight: "150px",
  };

  return (
    <div style={container}>
      <div style={header}>
        {!isMobile && <div style={{ flex: 1 }} />}
        <h3 style={title}>Entry Preview</h3>
        <div style={dateStyle}>{date || "—"}</div>
      </div>

      <div style={moodContainer}>
        <div style={moodBlock}>
          <div style={moodLabel}>Mood Before</div>
          <div style={moodIcon}>{getEmoji(moodPre)}</div>
        </div>
        <div style={moodBlock}>
          <div style={moodLabel}>Mood After</div>
          <div style={moodIcon}>{getEmoji(moodPost)}</div>
        </div>
      </div>

      {photos.length > 0 && (
        <div style={photosRow}>
          {photos.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`Entry photo ${idx + 1}`}
              style={photoStyle}
            />
          ))}
        </div>
      )}

      <div style={textBox}>
        {text || "Your text preview will appear here..."}
      </div>
    </div>
  );
}
