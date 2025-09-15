// File: src/pages/NewEntry.jsx
import React, { useState } from "react";
import { createEntry } from "../../api/EntriesApi";

import EntryPreview from "./EntryPreview";
import JournalSection from "./JournalSection";
import ActivityDetails from "./ActivityDetails";
import ActionsSection from "./ActionsSection";

export default function NewEntry() {
  // ── State ──
  const [text, setText] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [moodPre, setMoodPre] = useState(3);
  const [moodPost, setMoodPost] = useState(3);
  const [photos, setPhotos] = useState([]);
  const [activityState, setActivityState] = useState({
    type: "",
    duration: "",
    distance: "",
    unit: "mi",
    calories: 0,
    location: "",
    avgHr: "",
    maxHr: "",
    equipment: "",
    notes: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const getEmoji = (v) => {
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
    return map.hasOwnProperty(v) ? map[v] : "❓";
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

    Object.entries(activityState).forEach(([key, val]) => {
      if (val || val === 0) form.append(key, val);
    });

    try {
      await createEntry(form);
      // reset
      setText("");
      setDate(new Date().toISOString().slice(0, 10));
      setMoodPre(3);
      setMoodPost(3);
      setPhotos([]);
      setActivityState({
        type: "",
        duration: "",
        distance: "",
        unit: "mi",
        calories: 0,
        location: "",
        avgHr: "",
        maxHr: "",
        equipment: "",
        notes: "",
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2500);
    } catch {
      setError("❌ Could not save entry. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // shared styles
  const container = {
    minHeight: "100vh",
    background: "var(--bg-alt)",
    color: "var(--text)",
    padding: "1.5rem",
    display: "flex",
    justifyContent: "center",
    fontFamily: "'Lato', sans-serif",
  };
  const card = {
    position: "relative",
    background: "var(--bg)",
    color: "var(--text)",
    borderRadius: "0.75rem",
    padding: "2rem",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
    width: "100%",
    maxWidth: "1200px",
    margin: "1em 0 5em 0",
  };
  const title = {
    fontSize: "1.3rem",
    fontWeight: 600,
    color: "var(--text)",
    marginBottom: "1rem",
    textAlign: "center",
  };

  if (showPreview) {
    return (
      <div style={container}>
        <div style={card}>
          <h2 style={title}>
            <span role="img" aria-label="Preview">
              📋
            </span>{" "}
            Preview
          </h2>
          <EntryPreview
            date={date}
            moodPre={moodPre}
            moodPost={moodPost}
            text={text}
            getEmoji={getEmoji}
            photos={photos}
            {...activityState}
          />
          <button
            onClick={() => setShowPreview(false)}
            style={{
              marginTop: "1.5rem",
              width: "100%",
              padding: "0.75rem",
              background: "var(--border)",
              color: "var(--text)",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
            }}
          >
            <span role="img">←</span> Back to Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={container}>
      <div style={card}>
        {showSuccess && (
          <div
            style={{
              position: "fixed",
              top: "1.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              background: "var(--success-bg)",
              color: "var(--success-text)",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              zIndex: 1000,
              fontWeight: 600,
            }}
          >
            <span role="img" aria-label="Save Success">
              ✅
            </span>{" "}
            Entry saved successfully!
          </div>
        )}

        <h2 style={title}>
          <span role="img" aria-label="New Entry">
            📝
          </span>{" "}
          New Journal / Activity Entry
        </h2>
        {error && (
          <div
            style={{
              background: "var(--error-bg)",
              color: "var(--error-text)",
              padding: "0.75rem 1rem",
              borderRadius: "0.5rem",
              textAlign: "center",
              marginBottom: "1.5rem",
            }}
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
        >
          <JournalSection
            text={text}
            setText={setText}
            date={date}
            setDate={setDate}
            moodPre={moodPre}
            setMoodPre={setMoodPre}
            moodPost={moodPost}
            setMoodPost={setMoodPost}
          />

          <ActivityDetails
            activity={activityState}
            setActivity={setActivityState}
            photos={photos}
            setPhotos={setPhotos}
          />

          <ActionsSection
            saving={saving}
            onPreview={() => setShowPreview(true)}
          />
        </form>
      </div>
    </div>
  );
}
