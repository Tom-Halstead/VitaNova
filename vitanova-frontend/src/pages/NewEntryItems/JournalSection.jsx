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
  const label = {
    fontSize: "0.95rem",
    fontWeight: 500,
    color: "#4A5568",
    marginBottom: "0.3rem",
  };
  const input = {
    border: "1px solid #CBD5E0",
    borderRadius: "0.5rem",
    padding: "0.75rem 0.9rem",
    width: "100%",
    fontSize: "1rem",
    boxSizing: "border-box",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h3 style={{ fontSize: "1.3rem", fontWeight: 600, color: "#2D3748" }}>
        🖋 Journal Entry
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label htmlFor="entry-text" style={label}>
          Your Thoughts
        </label>
        <textarea
          id="entry-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your journal entry..."
          style={{ ...input, minHeight: "140px", resize: "vertical" }}
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
          <label htmlFor="entry-date" style={label}>
            📅 Entry Date
          </label>
          <input
            id="entry-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={input}
            required
          />
        </div>
        <MoodInput label="Mood Before" value={moodPre} onChange={setMoodPre} />
        <MoodInput label="Mood After" value={moodPost} onChange={setMoodPost} />
      </div>
    </div>
  );
}
