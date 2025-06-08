// File: src/pages/JournalSection.jsx
import React from "react";
import MoodInput from "../../components/MoodInput";

export default function JournalSection({
  text,
  setText,
  date,
  setDate,
  moodPre,
  setMoodPre,
  moodPost,
  setMoodPost,
}) {
  const labelStyle = {
    fontSize: "0.95rem",
    fontWeight: 500,
    color: "var(--text)", // increased contrast
    marginBottom: "0.3rem",
  };
  const inputStyle = {
    border: "1px solid var(--border)",
    borderRadius: "0.5rem",
    padding: "0.75rem 0.9rem",
    width: "100%",
    fontSize: "1rem",
    color: "var(--text)",
    background: "var(--bg)",
    boxSizing: "border-box",
  };
  const titleStyle = {
    fontSize: "1.3rem",
    fontWeight: 600,
    color: "var(--text)",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h3 style={titleStyle}>🖋 Journal Entry</h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label htmlFor="entry-text" style={labelStyle}>
          Your Thoughts
        </label>
        <textarea
          id="entry-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your journal entry..."
          style={{ ...inputStyle, minHeight: "140px", resize: "vertical" }}
          required
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="entry-date" style={labelStyle}>
            📅 Entry Date
          </label>
          <input
            id="entry-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        <MoodInput
          label="Mood Before"
          value={moodPre}
          onChange={setMoodPre}
          labelColor="var(--text)" // stronger contrast
          iconColor="var(--primary)" // accent color for the emoji
        />

        <MoodInput
          label="Mood After"
          value={moodPost}
          onChange={setMoodPost}
          labelColor="var(--text)"
          iconColor="var(--primary)"
        />
      </div>
    </div>
  );
}
