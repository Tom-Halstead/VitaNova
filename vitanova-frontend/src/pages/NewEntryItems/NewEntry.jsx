// src/pages/NewEntry.jsx

import React, { useState } from "react";
import MoodInput from "../../components/MoodInput";
import PhotoUploader from "../../components/PhotoUploader";
import { createEntry } from "../../api/EntriesApi";
import EntryPreview from "../../components/EntryPreview";

export default function NewEntry() {
  const [text, setText] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [moodPre, setMoodPre] = useState(3);
  const [moodPost, setMoodPost] = useState(3);
  const [photos, setPhotos] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const getEmoji = (value) => {
    const map = {
      "-8": "🤮",
      "-7": "😖",
      "-6": "😞",
      "-5": "😔",
      "-4": "😢",
      "-3": "😟",
      "-2": "😰",
      "-1": "😬",
      0: "😐",
      1: "🙂",
      2: "😊",
      3: "😌",
      4: "😃",
      5: "😄",
      6: "🤩",
      7: "🥳",
      8: "🤯",
      9: "😍",
      10: "😇",
    };
    return map.hasOwnProperty(value) ? map[value] : "❓";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const form = new FormData();
    form.append("text", text);
    form.append("entryDate", date);
    form.append("moodPre", moodPre);
    form.append("moodPost", moodPost);
    photos.forEach((f) => form.append("photos[]", f));

    try {
      await createEntry(form);
      setText("");
      setDate(new Date().toISOString().slice(0, 10));
      setMoodPre(3);
      setMoodPost(3);
      setPhotos([]);

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2500);
    } catch {
      setError("❌ Could not save entry. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Shared style for the primary “Save Entry” button
  const buttonBase = {
    padding: "0.55rem 1.1rem",
    background: "linear-gradient(90deg, #805AD5, #6B46C1)",
    color: "#FFF",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: 600,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    transition:
      "transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
  };
  const hoverUp = (e) => {
    e.currentTarget.style.background =
      "linear-gradient(90deg, #6B46C1, #805AD5)";
    e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.12)";
  };
  const hoverDown = (e) => {
    e.currentTarget.style.background =
      "linear-gradient(90deg, #805AD5, #6B46C1)";
    e.currentTarget.style.transform = "translateY(0) scale(1)";
    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
  };

  // Style for the smaller “Preview” button in bottom-right
  const previewButtonStyle = {
    position: "absolute",
    bottom: "1rem",
    right: "1rem",
    padding: "0.45rem 0.9rem",
    background: "linear-gradient(90deg, #E53E3E, #C53030)",
    color: "#FFF",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: 600,
    boxShadow: "0 3px 10px rgba(0, 0, 0, 0.08)",
    transition:
      "transform 0.15s ease, background 0.15s ease, box-shadow 0.15s ease",
  };
  const previewHoverIn = (e) => {
    e.currentTarget.style.background =
      "linear-gradient(90deg, #C53030, #E53E3E)";
    e.currentTarget.style.transform = "translateY(-1px) scale(1.02)";
    e.currentTarget.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.12)";
  };
  const previewHoverOut = (e) => {
    e.currentTarget.style.background =
      "linear-gradient(90deg, #E53E3E, #C53030)";
    e.currentTarget.style.transform = "translateY(0) scale(1)";
    e.currentTarget.style.boxShadow = "0 3px 10px rgba(0, 0, 0, 0.08)";
  };

  if (showPreview) {
    return (
      <div
        style={{
          minHeight: "90vh",
          margin: "2rem auto",
          width: "95vw",
          maxWidth: "900px",
          fontFamily: "'Lato', sans-serif",
          padding: "1rem",
        }}
      >
        <EntryPreview
          date={date}
          moodPre={moodPre}
          moodPost={moodPost}
          text={text}
          getEmoji={getEmoji}
          photos={photos}
        />
        <button
          type="button"
          onClick={() => setShowPreview(false)}
          style={{
            ...buttonBase,
            background: "linear-gradient(90deg, #CBD5E0, #A0AEC0)",
            color: "#2D3748",
            marginTop: "1.5rem",
            alignSelf: "center",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(90deg, #A0AEC0, #CBD5E0)";
            e.currentTarget.style.transform = "translateY(-1px) scale(1.02)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(90deg, #CBD5E0, #A0AEC0)";
            e.currentTarget.style.transform = "translateY(0) scale(1)";
          }}
        >
          ← Back to Form
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "90vh",
        margin: "2rem auto",
        width: "95vw",
        maxWidth: "900px",
        fontFamily: "'Lato', sans-serif",
        padding: "1rem",
        position: "relative",
      }}
    >
      {showSuccess && (
        <div
          style={{
            position: "fixed",
            top: "4rem",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#48BB78",
            color: "#FFF",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            zIndex: 1000,
            fontSize: "1rem",
            fontWeight: 600,
            opacity: 0.95,
          }}
        >
          ✅ Entry saved successfully!
        </div>
      )}

      <h2
        style={{
          fontSize: "1.75rem",
          color: "#2D3748",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        📝 New Journal Entry
      </h2>

      {error && (
        <div
          style={{
            background: "#FED7D7",
            color: "#C53030",
            padding: "0.75rem 1rem",
            borderRadius: "0.5rem",
            textAlign: "center",
            marginBottom: "1rem",
            fontWeight: 600,
          }}
        >
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          background: "#FFF",
          borderRadius: "0.75rem",
          padding: "2rem",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          position: "relative",
        }}
      >
        {/* Journal Textarea */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your journal entry..."
          style={{
            width: "100%",
            minHeight: "180px",
            border: "1px solid #CBD5E0",
            borderRadius: "0.625rem",
            padding: "1rem",
            fontSize: "1rem",
            lineHeight: 1.6,
            resize: "vertical",
            outline: "none",
            transition: "border-color 0.2s ease",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#805AD5")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#CBD5E0")}
          required
        />

        {/* ───── Grid Row: Date + Mood Inputs ───── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "150px 1fr 1fr",
            gap: "1rem",
            alignItems: "start", // ← changed from "center" to "start"
          }}
        >
          {/* Date Column */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              htmlFor="entry-date"
              style={{
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "#4A5568",
                marginBottom: "0.3rem",
              }}
            >
              📅 Entry Date
            </label>
            <input
              id="entry-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                border: "1px solid #CBD5E0",
                borderRadius: "0.5rem",
                padding: "0.5rem",
                fontSize: "0.95rem",
                outline: "none",
                transition: "border-color 0.2s ease",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#805AD5")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#CBD5E0")}
              required
            />
          </div>

          {/* Mood Before */}
          <div>
            <MoodInput
              label="Mood Before"
              value={moodPre}
              onChange={setMoodPre}
            />
          </div>

          {/* Mood After */}
          <div>
            <MoodInput
              label="Mood After"
              value={moodPost}
              onChange={setMoodPost}
            />
          </div>
        </div>

        {/* Photo Uploader */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <PhotoUploader onFiles={setPhotos} />
          {photos.length > 0 && (
            <p
              style={{
                marginTop: "0.5rem",
                fontSize: "0.875rem",
                fontStyle: "italic",
                color: "#4A5568",
                textAlign: "center",
              }}
            >
              {photos.length} file{photos.length > 1 ? "s" : ""} selected:{" "}
              {photos.map((f) => f.name).join(", ")}
            </p>
          )}
        </div>

        {/* “Save Entry” button */}
        <button
          type="submit"
          disabled={saving}
          style={{
            ...buttonBase,
            marginTop: "1rem",
            alignSelf: "flex-start",
          }}
          onMouseEnter={hoverUp}
          onMouseLeave={hoverDown}
        >
          {saving ? "Saving…" : "Save Entry"}
        </button>

        {/* “Preview” button (bottom-right of form) */}
        <button
          type="button"
          onClick={() => setShowPreview(true)}
          style={previewButtonStyle}
          onMouseEnter={previewHoverIn}
          onMouseLeave={previewHoverOut}
        >
          👁️ Preview
        </button>
      </form>
    </div>
  );
}
