import React, { useState, useEffect } from "react";
import MoodInput from "../../components/MoodInput";
import PhotoUploader from "../../components/PhotoUploader";
import { createEntry } from "../../api/EntriesApi";
import EntryPreview from "../../components/EntryPreview";
import testImg from "../../utils/logo192.png";

export default function NewEntry() {
  const [text, setText] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [moodPre, setMoodPre] = useState(3);
  const [moodPost, setMoodPost] = useState(3);
  const [photos, setPhotos] = useState([]);
  // const [previews, setPreviews] = useState([]);
  const [previews, setPreviews] = useState([testImg]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

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

  useEffect(() => {
    if (photos.length > 0) {
      const urls = photos.map((f) => URL.createObjectURL(f));
      setPreviews(urls);
      return () => urls.forEach(URL.revokeObjectURL);
    }
  }, [photos]);

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
      setDate("");
      setMoodPre(3);
      setMoodPost(3);
      setPhotos([]);
    } catch {
      setError("Could not save entry. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Button style shared
  const buttonStyle = {
    margin: "1rem auto",
    display: "block",
    padding: "0.75rem 1.5rem",
    background: "linear-gradient(90deg, #6B46C1, #805AD5)",
    color: "#FFF",
    border: "none",
    borderRadius: "0.375rem",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "background 0.2s, transform 0.2s",
  };

  const hoverProps = (e) => {
    e.currentTarget.style.background =
      "linear-gradient(90deg, #805AD5, #6B46C1)";
    e.currentTarget.style.transform = "scale(1.03)";
  };
  const unhoverProps = (e) => {
    e.currentTarget.style.background =
      "linear-gradient(90deg, #6B46C1, #805AD5)";
    e.currentTarget.style.transform = "scale(1)";
  };

  return (
    <div
      style={{
        minHeight: "90vh",
        margin: "2rem auto",
        maxWidth: "1200px",
        fontFamily: "'Lato', sans-serif",
        paddingBottom: "200px",
      }}
    >
      <h2
        style={{
          fontSize: "1.75rem",
          color: "#374151",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        New Journal Entry
      </h2>

      {error && (
        <div
          style={{
            color: "red",
            textAlign: "center",
            marginBottom: "1rem",
            fontWeight: "bold",
          }}
        >
          {error}
        </div>
      )}

      {/* Toggle between form and preview */}
      {!showPreview ? (
        <>
          <form
            onSubmit={handleSubmit}
            style={{
              background: "#FFFFFF",
              borderRadius: "0.5rem",
              padding: "2rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            {/* Entry text */}
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write your journal entry..."
              style={{
                width: "100%",
                minHeight: "150px",
                border: "1px solid #E5E7EB",
                borderRadius: "0.375rem",
                padding: "1rem",
                fontSize: "1rem",
                lineHeight: "1.5",
                resize: "vertical",
                outline: "none",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#667EEA")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
              required
            />

            {/* Date & Mood Inputs */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                marginTop: "1.5rem",
              }}
            >
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  flex: "1 1 150px",
                  border: "1px solid #E5E7EB",
                  borderRadius: "0.375rem",
                  padding: "0.75rem",
                  fontSize: "1rem",
                  outline: "none",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#667EEA")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
                required
              />
              <div style={{ flex: "1 1 150px" }}>
                <MoodInput
                  label="Mood Before"
                  value={moodPre}
                  onChange={setMoodPre}
                />
              </div>
              <div style={{ flex: "1 1 150px" }}>
                <MoodInput
                  label="Mood After"
                  value={moodPost}
                  onChange={setMoodPost}
                />
              </div>
            </div>

            {/* Photo Uploader */}
            <div style={{ marginTop: "1.5rem" }}>
              <PhotoUploader onFiles={setPhotos} />
              {/* File placeholder text */}
              {photos.length > 0 && (
                <p
                  style={{
                    marginTop: "0.5rem",
                    fontSize: "0.875rem",
                    fontStyle: "italic",
                    color: "#4A5568",
                  }}
                >
                  {photos.length} file{photos.length > 1 ? "s" : ""} selected:{" "}
                  {photos.map((f) => f.name).join(", ")}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={saving}
              style={buttonStyle}
              onMouseEnter={hoverProps}
              onMouseLeave={unhoverProps}
            >
              {saving ? "Saving…" : "Save Entry"}
            </button>

            {/* Preview Toggle */}
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              style={{ ...buttonStyle, marginTop: "0.5rem" }}
              onMouseEnter={hoverProps}
              onMouseLeave={unhoverProps}
            >
              Preview Entry
            </button>
          </form>
        </>
      ) : (
        <>
          <EntryPreview
            date={date}
            moodPre={moodPre}
            moodPost={moodPost}
            text={text}
            getEmoji={getEmoji}
            photos={previews}
          />
          <button
            type="button"
            onClick={() => setShowPreview(false)}
            style={{ ...buttonStyle, marginTop: "1rem" }}
            onMouseEnter={hoverProps}
            onMouseLeave={unhoverProps}
          >
            Back to Form
          </button>
        </>
      )}
    </div>
  );
}
