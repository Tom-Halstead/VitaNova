// src/pages/NewEntry.jsx

import React, { useState } from "react";
import MoodInput from "../../components/MoodInput";
import PhotoUploader from "../../components/PhotoUploader";
import { createEntry } from "../../api/EntriesApi";
import EntryPreview from "../../components/EntryPreview";

export default function NewEntry() {
  // ── Journal states ──
  const [text, setText] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [moodPre, setMoodPre] = useState(3);
  const [moodPost, setMoodPost] = useState(3);
  const [photos, setPhotos] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // ── Activity states ──
  const [activityType, setActivityType] = useState("");
  const [durationMin, setDurationMin] = useState("");
  const [distance, setDistance] = useState("");
  const [distanceUnit, setDistanceUnit] = useState("mi");
  const [calories, setCalories] = useState(0);
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

    // ── Append activity fields ──
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

      // Reset everything
      setText("");
      setDate(new Date().toISOString().slice(0, 10));
      setMoodPre(3);
      setMoodPost(3);
      setPhotos([]);

      setActivityType("");
      setDurationMin("");
      setDistance("");
      setDistanceUnit("mi");
      setCalories(0);
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

  // ── Shared Styles ──
  const containerStyle = {
    minHeight: "100vh",
    background: "#F7FAFC",
    padding: "1.5rem",
    fontFamily: "'Lato', sans-serif",
    display: "flex",
    justifyContent: "center",
    marginBottom: "4.5em",
  };

  const cardStyle = {
    position: "relative", // so the Preview button can be absolute
    background: "#FFFFFF",
    borderRadius: "0.75rem",
    padding: "2rem",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
    width: "100%",
    maxWidth: "1200px",
  };

  const sectionTitleStyle = {
    fontSize: "1.3rem",
    fontWeight: 600,
    color: "#2D3748",
    marginBottom: "1rem",
  };

  const labelStyle = {
    fontSize: "0.95rem",
    fontWeight: 500,
    color: "#4A5568",
    marginBottom: "0.3rem",
  };

  const inputBaseStyle = {
    border: "1px solid #CBD5E0",
    borderRadius: "0.5rem",
    padding: "0.75rem 0.9rem",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    width: "100%",
    boxSizing: "border-box",
  };

  const inputFocus = (e) => {
    e.currentTarget.style.borderColor = "#805AD5";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(128, 90, 213, 0.2)";
  };

  const inputBlur = (e) => {
    e.currentTarget.style.borderColor = "#CBD5E0";
    e.currentTarget.style.boxShadow = "none";
  };

  const buttonPrimary = {
    padding: "0.75rem 1.5rem",
    background: "linear-gradient(90deg, #805AD5, #6B46C1)",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: 600,
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
    transition: "transform 0.2s ease, background 0.2s ease",
    marginTop: "1.5rem",
  };

  const buttonPrimaryHover = (e) => {
    e.currentTarget.style.background =
      "linear-gradient(90deg, #6B46C1, #805AD5)";
    e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
  };

  const buttonPrimaryLeave = (e) => {
    e.currentTarget.style.background =
      "linear-gradient(90deg, #805AD5, #6B46C1)";
    e.currentTarget.style.transform = "translateY(0) scale(1)";
  };

  const buttonSecondary = {
    position: "absolute",
    bottom: "1.5rem",
    right: "1.5rem",
    padding: "0.7rem 1.3rem",
    background: "#E53E3E",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: 600,
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease, background 0.2s ease",
  };

  const buttonSecondaryHover = (e) => {
    e.currentTarget.style.background = "#C53030";
    e.currentTarget.style.transform = "translateY(-2px) scale(1.03)";
  };

  const buttonSecondaryLeave = (e) => {
    e.currentTarget.style.background = "#E53E3E";
    e.currentTarget.style.transform = "translateY(0) scale(1)";
  };

  // If preview is active, show only the preview
  if (showPreview) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h2 style={{ ...sectionTitleStyle, textAlign: "center" }}>
            📋 Preview
          </h2>
          <EntryPreview
            date={date}
            moodPre={moodPre}
            moodPost={moodPost}
            text={text}
            getEmoji={getEmoji}
            photos={photos}
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
              ...buttonPrimary,
              background: "#CBD5E0",
              color: "#2D3748",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#A0AEC0";
              e.currentTarget.style.transform = "translateY(-1px) scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#CBD5E0";
              e.currentTarget.style.transform = "translateY(0) scale(1)";
            }}
          >
            ← Back to Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {showSuccess && (
          <div
            style={{
              position: "fixed",
              top: "1.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              background: "#48BB78",
              color: "#FFFFFF",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
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
            ...sectionTitleStyle,
            textAlign: "center",
            marginBottom: "2rem",
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
              marginBottom: "1.5rem",
              fontWeight: 600,
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* ── Journal Section ── */}
          <div style={{ marginBottom: "2.5rem" }}>
            <h3 style={sectionTitleStyle}>🖋 Journal Entry</h3>
            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="entry-text" style={labelStyle}>
                Your Thoughts
              </label>
              <textarea
                id="entry-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your journal entry..."
                style={{
                  ...inputBaseStyle,
                  minHeight: "160px",
                  resize: "vertical",
                }}
                onFocus={inputFocus}
                onBlur={inputBlur}
                required
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "1rem",
                marginTop: "1.5rem",
              }}
            >
              {/* Date */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="entry-date" style={labelStyle}>
                  📅 Entry Date
                </label>
                <input
                  id="entry-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={inputBaseStyle}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  required
                />
              </div>

              {/* Mood Before */}
              <div style={{ minWidth: "240px" }}>
                <MoodInput
                  label="Mood Before"
                  value={moodPre}
                  onChange={setMoodPre}
                />
              </div>

              {/* Mood After */}
              <div style={{ minWidth: "240px" }}>
                <MoodInput
                  label="Mood After"
                  value={moodPost}
                  onChange={setMoodPost}
                />
              </div>
            </div>
          </div>

          {/* ── Activity Section ── */}
          <div style={{ marginBottom: "2.5rem" }}>
            <h3 style={sectionTitleStyle}>
              🔥 Activity Details{" "}
              <span
                style={{
                  fontWeight: 400,
                  fontSize: "0.9rem",
                  color: "#718096",
                }}
              >
                (optional)
              </span>
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              {/* Activity Type */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="activity-type" style={labelStyle}>
                  Activity Type
                </label>
                <select
                  id="activity-type"
                  value={activityType}
                  onChange={(e) => setActivityType(e.target.value)}
                  style={inputBaseStyle}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
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

              {/* Duration */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="duration-min" style={labelStyle}>
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
                  style={inputBaseStyle}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                />
              </div>

              {/* Distance */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="distance" style={labelStyle}>
                  Distance
                </label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input
                    id="distance"
                    type="number"
                    min="0"
                    step="0.01"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    placeholder="e.g. 5.2"
                    style={{ ...inputBaseStyle, flex: 2 }}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                  />
                  <select
                    id="distance-unit"
                    value={distanceUnit}
                    onChange={(e) => setDistanceUnit(e.target.value)}
                    style={{ ...inputBaseStyle, flex: 1 }}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                  >
                    <option value="mi">mi</option>
                    <option value="km">km</option>
                    <option value="m">m</option>
                    <option value="laps">laps</option>
                    <option value="steps">steps</option>
                  </select>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              {/* Calories (Slider + Text) */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="calories" style={labelStyle}>
                  Calories Burned
                </label>
                <input
                  id="calories"
                  type="range"
                  min="0"
                  max="2000"
                  step="10"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  style={{ width: "100%", marginBottom: "0.5rem" }}
                />
                <input
                  type="number"
                  min="0"
                  step="10"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  placeholder="e.g. 350"
                  style={{ ...inputBaseStyle }}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                />
              </div>

              {/* Location */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="location" style={labelStyle}>
                  Location / Route
                </label>
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Central Park Loop"
                  style={inputBaseStyle}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                />
              </div>

              {/* Equipment */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="equipment" style={labelStyle}>
                  Equipment
                </label>
                <select
                  id="equipment"
                  value={equipment}
                  onChange={(e) => setEquipment(e.target.value)}
                  style={inputBaseStyle}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                >
                  <option value="">— Select —</option>
                  <option value="Other">Walk</option>
                  <option value="Other">Run</option>
                  <option value="Road Bike">Road Bike</option>
                  <option value="Treadmill">Treadmill</option>
                  <option value="Stationary Bike">Stationary Bike</option>
                  <option value="Elliptical">Elliptical</option>
                  <option value="Free Weights">Free Weights</option>
                  <option value="Yoga Mat">Yoga Mat</option>

                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              {/* Avg Heart Rate */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="avg-hr" style={labelStyle}>
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
                  style={inputBaseStyle}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                />
              </div>

              {/* Max Heart Rate */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="max-hr" style={labelStyle}>
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
                  style={inputBaseStyle}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                />
              </div>
            </div>

            {/* ── Additional Comments (collapsible) ── */}
            <details style={{ marginBottom: "1.5rem" }}>
              <summary
                style={{
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "#4A5568",
                  cursor: "pointer",
                  marginBottom: "0.5rem",
                  outline: "none",
                }}
                onFocus={(e) => (e.currentTarget.style.color = "#805AD5")}
                onBlur={(e) => (e.currentTarget.style.color = "#4A5568")}
              >
                🗒️ Additional Comments (click to expand)
              </summary>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="How did it feel? Conditions, additional comments..."
                rows={3}
                style={{
                  ...inputBaseStyle,
                  marginTop: "0.5rem",
                  minHeight: "100px",
                  resize: "vertical",
                }}
                onFocus={inputFocus}
                onBlur={inputBlur}
              />
            </details>
          </div>

          {/* ── Photos Section ── */}
          <div style={{ marginBottom: "2.5rem" }}>
            <h3 style={sectionTitleStyle}>📸 Photos (optional)</h3>
            <PhotoUploader onFiles={setPhotos} />
            {photos.length > 0 && (
              <p
                style={{
                  marginTop: "0.75rem",
                  fontSize: "0.9rem",
                  color: "#4A5568",
                }}
              >
                {photos.length} file{photos.length > 1 ? "s" : ""} selected:{" "}
                {photos.map((f) => f.name).join(", ")}
              </p>
            )}
          </div>

          {/* ── Preview Button ── */}
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            style={buttonSecondary}
            onMouseEnter={buttonSecondaryHover}
            onMouseLeave={buttonSecondaryLeave}
          >
            👁️ Preview
          </button>

          {/* ── Save Button ── */}
          <button
            type="submit"
            disabled={saving}
            style={buttonPrimary}
            onMouseEnter={buttonPrimaryHover}
            onMouseLeave={buttonPrimaryLeave}
          >
            {saving ? "Saving…" : "Save Entry"}
          </button>
        </form>
      </div>
    </div>
  );
}
