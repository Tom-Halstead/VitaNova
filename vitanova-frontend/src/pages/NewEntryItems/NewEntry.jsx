// src/pages/NewEntry.jsx

import React, { useState } from "react";
import MoodInput from "../../components/MoodInput";
import PhotoUploader from "../../components/PhotoUploader";
import { createEntry } from "../../api/EntriesApi";
import EntryPreview from "../../components/EntryPreview";

export default function NewEntry() {
  // ── Existing journal states ──
  const [text, setText] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [moodPre, setMoodPre] = useState(3);
  const [moodPost, setMoodPost] = useState(3);
  const [photos, setPhotos] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // ── NEW: Activity‐tracking states (no "surface") ──
  const [activityType, setActivityType] = useState("");
  const [durationMin, setDurationMin] = useState("");
  const [distance, setDistance] = useState("");
  const [distanceUnit, setDistanceUnit] = useState("mi");
  const [calories, setCalories] = useState("");
  const [location, setLocation] = useState("");
  const [avgHr, setAvgHr] = useState("");
  const [maxHr, setMaxHr] = useState("");
  const [equipment, setEquipment] = useState("");
  const [notes, setNotes] = useState("");

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

    // ── NEW: Append activity fields (no 'surface') ──
    if (activityType) form.append("activityType", activityType);
    if (durationMin) form.append("durationMin", durationMin);
    if (distance) form.append("distance", distance);
    if (distanceUnit) form.append("distanceUnit", distanceUnit);
    if (calories) form.append("calories", calories);
    if (location) form.append("location", location);
    if (avgHr) form.append("avgHeartRate", avgHr);
    if (maxHr) form.append("maxHeartRate", maxHr);
    if (equipment) form.append("equipment", equipment);
    if (notes) form.append("notes", notes);

    try {
      await createEntry(form);
      // reset all fields (including the new ones)
      setText("");
      setDate(new Date().toISOString().slice(0, 10));
      setMoodPre(3);
      setMoodPost(3);
      setPhotos([]);

      setActivityType("");
      setDurationMin("");
      setDistance("");
      setDistanceUnit("mi");
      setCalories("");
      setLocation("");
      setAvgHr("");
      setMaxHr("");
      setEquipment("");
      setNotes("");

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2500);
    } catch {
      setError("❌ Could not save entry. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // ── Button styling omitted for brevity (same as before) ──

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
          // ── NEW: Pass all activity props (no surface) ──
          activityType={activityType}
          durationMin={durationMin}
          distance={distance}
          distanceUnit={distanceUnit}
          calories={calories}
          location={location}
          avgHeartRate={avgHr}
          maxHeartRate={maxHr}
          equipment={equipment}
          notes={notes}
        />
        <button
          type="button"
          onClick={() => setShowPreview(false)}
          style={{
            /* same “Back to Form” styling as before */
            padding: "0.55rem 1.1rem",
            background: "linear-gradient(90deg, #CBD5E0, #A0AEC0)",
            color: "#2D3748",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
            fontSize: "0.95rem",
            fontWeight: 600,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
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
        📝 New Journal / Activity Entry
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
        {/* ── Journal Textarea ── */}
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

        {/* ── Grid Row: Date + Mood Before/After ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "150px 1fr 1fr",
            gap: "1rem",
            alignItems: "start",
          }}
        >
          {/* Date */}
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

        {/* ── Activity Fields (no 'surface') ── */}
        <fieldset
          style={{
            border: "1px solid #CBD5E0",
            borderRadius: "0.5rem",
            padding: "1rem",
          }}
        >
          <legend
            style={{ fontSize: "1rem", fontWeight: 600, color: "#4A5568" }}
          >
            🔥 Activity Details (optional)
          </legend>

          {/* Activity Type & Duration */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            {/* Activity Type */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                htmlFor="activity-type"
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: "#4A5568",
                  marginBottom: "0.25rem",
                }}
              >
                Activity Type
              </label>
              <select
                id="activity-type"
                value={activityType}
                onChange={(e) => setActivityType(e.target.value)}
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
              >
                <option value="">— Select —</option>
                <option value="Run">Run</option>
                <option value="Bike">Bike</option>
                <option value="Hike">Hike</option>
                <option value="Swim">Swim</option>
                <option value="Gym">Gym</option>
                <option value="Walk">Walk</option>
                <option value="Yoga">Yoga</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Duration (min) */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                htmlFor="duration-min"
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: "#4A5568",
                  marginBottom: "0.25rem",
                }}
              >
                Duration (minutes)
              </label>
              <input
                id="duration-min"
                type="number"
                min="0"
                step="1"
                value={durationMin}
                onChange={(e) => setDurationMin(e.target.value)}
                placeholder="e.g. 45"
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
              />
            </div>
          </div>

          {/* Distance & Unit */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            {/* Distance */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                htmlFor="distance"
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: "#4A5568",
                  marginBottom: "0.25rem",
                }}
              >
                Distance
              </label>
              <input
                id="distance"
                type="number"
                min="0"
                step="0.01"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                placeholder="e.g. 5.2"
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
              />
            </div>

            {/* Distance Unit */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                htmlFor="distance-unit"
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: "#4A5568",
                  marginBottom: "0.25rem",
                }}
              >
                Unit
              </label>
              <select
                id="distance-unit"
                value={distanceUnit}
                onChange={(e) => setDistanceUnit(e.target.value)}
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
              >
                <option value="mi">mi</option>
                <option value="km">km</option>
                <option value="m">m</option>
                <option value="laps">laps</option>
                <option value="steps">steps</option>
              </select>
            </div>
          </div>

          {/* Calories & Location */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            {/* Calories */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                htmlFor="calories"
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: "#4A5568",
                  marginBottom: "0.25rem",
                }}
              >
                Calories Burned
              </label>
              <input
                id="calories"
                type="number"
                min="0"
                step="1"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="e.g. 350"
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
              />
            </div>

            {/* Location */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                htmlFor="location"
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: "#4A5568",
                  marginBottom: "0.25rem",
                }}
              >
                Location / Route
              </label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Central Park Loop"
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
              />
            </div>
          </div>

          {/* Heart Rate & Equipment */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            {/* Avg HR */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                htmlFor="avg-hr"
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: "#4A5568",
                  marginBottom: "0.25rem",
                }}
              >
                Avg Heart Rate (bpm)
              </label>
              <input
                id="avg-hr"
                type="number"
                min="0"
                step="1"
                value={avgHr}
                onChange={(e) => setAvgHr(e.target.value)}
                placeholder="e.g. 145"
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
              />
            </div>

            {/* Max HR */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                htmlFor="max-hr"
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: "#4A5568",
                  marginBottom: "0.25rem",
                }}
              >
                Max Heart Rate (bpm)
              </label>
              <input
                id="max-hr"
                type="number"
                min="0"
                step="1"
                value={maxHr}
                onChange={(e) => setMaxHr(e.target.value)}
                placeholder="e.g. 175"
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
              />
            </div>
          </div>

          {/* Equipment */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "1rem",
            }}
          >
            <label
              htmlFor="equipment"
              style={{
                fontSize: "0.9rem",
                fontWeight: 500,
                color: "#4A5568",
                marginBottom: "0.25rem",
              }}
            >
              Equipment
            </label>
            <input
              id="equipment"
              type="text"
              value={equipment}
              onChange={(e) => setEquipment(e.target.value)}
              placeholder="e.g. Treadmill #5"
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
            />
          </div>

          {/* Notes */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "1rem",
            }}
          >
            <label
              htmlFor="notes"
              style={{
                fontSize: "0.9rem",
                fontWeight: 500,
                color: "#4A5568",
                marginBottom: "0.25rem",
              }}
            >
              Notes / Comments
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How did it feel? Conditions, terrain, etc."
              rows={3}
              style={{
                border: "1px solid #CBD5E0",
                borderRadius: "0.5rem",
                padding: "0.75rem",
                fontSize: "0.95rem",
                lineHeight: 1.5,
                resize: "vertical",
                outline: "none",
                transition: "border-color 0.2s ease",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#805AD5")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#CBD5E0")}
            />
          </div>
        </fieldset>

        {/* ── Photo Uploader ── */}
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

        {/* ── “Save Entry” button ── */}
        <button
          type="submit"
          disabled={saving}
          style={{
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
            marginTop: "1rem",
            alignSelf: "flex-start",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(90deg, #6B46C1, #805AD5)";
            e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(90deg, #805AD5, #6B46C1)";
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
          }}
        >
          {saving ? "Saving…" : "Save Entry"}
        </button>

        {/* ── “Preview” button ── */}
        <button
          type="button"
          onClick={() => setShowPreview(true)}
          style={{
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
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(90deg, #C53030, #E53E3E)";
            e.currentTarget.style.transform = "translateY(-1px) scale(1.02)";
            e.currentTarget.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(90deg, #E53E3E, #C53030)";
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = "0 3px 10px rgba(0, 0, 0, 0.08)";
          }}
        >
          👁️ Preview
        </button>
      </form>
    </div>
  );
}
