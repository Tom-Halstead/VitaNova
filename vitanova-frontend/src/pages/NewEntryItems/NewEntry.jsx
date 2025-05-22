import React, { useState, useEffect } from "react";
import MoodInput from "../../components/MoodInput";
import PhotoUploader from "../../components/PhotoUploader";
import { createEntry } from "../../api/EntriesApi";

export default function NewEntry() {
  // form state
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [moodPre, setMoodPre] = useState(3);
  const [moodPost, setMoodPost] = useState(3);
  const [photos, setPhotos] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // generate previews when photos change
  useEffect(() => {
    const urls = photos.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
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
    photos.forEach((file) => form.append("photos[]", file));

    try {
      await createEntry(form);
      // reset form on success
      setText("");
      setDate("");
      setMoodPre(3);
      setMoodPost(3);
      setPhotos([]);
    } catch (err) {
      console.error(err);
      setError("Could not save entry. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 200px)",
        margin: "2rem auto",
        maxWidth: "1000px",
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

      <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
        <form
          onSubmit={handleSubmit}
          style={{
            flex: "1 1 500px",
            background: "#FFFFFF",
            borderRadius: "0.5rem",
            padding: "2rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
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

          <div style={{ marginTop: "1.5rem" }}>
            <PhotoUploader onFiles={setPhotos} />
          </div>

          {previews.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                marginTop: "1rem",
              }}
            >
              {previews.map((url) => (
                <img
                  key={url}
                  src={url}
                  alt="Preview"
                  style={{
                    maxHeight: "100px",
                    borderRadius: "0.375rem",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                />
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            style={{
              marginTop: "2rem",
              width: "100%",
              padding: "0.75rem",
              fontSize: "1rem",
              background: "linear-gradient(90deg, #4F46E5, #667EEA)",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "0.5rem",
              cursor: saving ? "not-allowed" : "pointer",
              boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
              transition: "transform 0.2s, box-shadow 0.2s",
              opacity: saving ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (!saving) {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.15)";
              }
            }}
            onMouseLeave={(e) => {
              if (!saving) {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.1)";
              }
            }}
          >
            {saving ? "Saving…" : "Save Entry"}
          </button>
        </form>

        <div
          style={{
            flex: "1 1 400px",
            background: "#F3F4F6",
            borderRadius: "0.5rem",
            padding: "1.5rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            height: "fit-content",
          }}
        >
          <h3
            style={{
              fontSize: "1.25rem",
              color: "#374151",
              marginBottom: "1rem",
            }}
          >
            Entry Preview
          </h3>
          <div
            style={{
              whiteSpace: "pre-wrap",
              color: "#374151",
              lineHeight: "1.6",
              minHeight: "200px",
            }}
          >
            {text || "Your text preview will appear here..."}
          </div>
        </div>
      </div>
    </div>
  );
}
