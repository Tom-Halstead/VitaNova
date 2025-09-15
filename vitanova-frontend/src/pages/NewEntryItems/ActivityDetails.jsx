// File: src/components/ActivityDetails.jsx
import React from "react";
import PhotoUploader from "../../components/PhotoUploader";

export default function ActivityDetails({
  activity,
  setActivity,
  photos,
  setPhotos,
}) {
  const label = {
    fontSize: "0.95rem",
    fontWeight: 500,
    color: "var(--text-light)",
    marginBottom: "0.3rem",
  };
  const input = {
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
  const subtitleStyle = {
    fontWeight: 400,
    fontSize: "0.9rem",
    color: "var(--text-light)",
  };
  const summaryStyle = {
    fontSize: "1rem",
    fontWeight: 500,
    color: "var(--text-light)",
    cursor: "pointer",
  };

  // field‐type mappings
  const cardioTypes = ["Run", "Bike", "Hike", "Swim", "Walk"];
  const outdoorTypes = ["Run", "Bike", "Hike", "Walk"];
  const equipmentTypes = ["Gym", "Other", "Bike", "Swim"];
  const hrTypes = ["Run", "Bike", "Hike", "Swim", "Walk", "Gym"];

  const upd = (key) => (e) =>
    setActivity((s) => ({ ...s, [key]: e.target.value }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h3 style={titleStyle}>
        Activity Details <span style={subtitleStyle}>(select type first)</span>
      </h3>

      {/* Activity Type */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="activity-type" style={label}>
          Activity Type
        </label>
        <select
          id="activity-type"
          value={activity.type}
          onChange={upd("type")}
          style={input}
        >
          <option value="">— Select —</option>
          {["Run", "Bike", "Hike", "Swim", "Gym", "Walk", "Yoga", "Other"].map(
            (o) => (
              <option key={o} value={o}>
                {o}
              </option>
            )
          )}
        </select>
      </div>

      {/* Prompt until type selected */}
      {!activity.type ? (
        <p style={{ color: "var(--text-light)", textAlign: "center" }}>
          Choose an activity type above to see the relevant fields.
        </p>
      ) : (
        <>
          {/* Dynamic fields grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            {/* Duration (always) */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="duration-min" style={label}>
                Duration (min)
              </label>
              <input
                id="duration-min"
                type="number"
                value={activity.duration}
                onChange={upd("duration")}
                placeholder="e.g. 45"
                style={input}
              />
            </div>

            {/* Distance & Unit for cardio */}
            {cardioTypes.includes(activity.type) && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={label}>Distance</label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input
                    type="number"
                    value={activity.distance}
                    onChange={upd("distance")}
                    placeholder="e.g. 5.2"
                    style={{ ...input, flex: 2 }}
                  />
                  <select
                    value={activity.unit}
                    onChange={upd("unit")}
                    style={{ ...input, flex: 1 }}
                  >
                    {["mi", "km", "m", "laps", "steps"].map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Calories (always) */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="calories" style={label}>
                Calories Burned
              </label>
              <input
                id="calories"
                type="range"
                min="0"
                max="2000"
                step="10"
                value={activity.calories}
                onChange={upd("calories")}
                style={{ width: "100%", marginBottom: "0.5rem" }}
              />
              <input
                type="number"
                value={activity.calories}
                onChange={upd("calories")}
                placeholder="e.g. 350"
                style={input}
              />
            </div>

            {/* Location for outdoor */}
            {outdoorTypes.includes(activity.type) && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="location" style={label}>
                  Location / Route
                </label>
                <input
                  id="location"
                  type="text"
                  value={activity.location}
                  onChange={upd("location")}
                  placeholder="e.g. Central Park Loop"
                  style={input}
                />
              </div>
            )}

            {/* Equipment for selected types */}
            {equipmentTypes.includes(activity.type) && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="equipment" style={label}>
                  Equipment
                </label>
                <select
                  value={activity.equipment}
                  onChange={upd("equipment")}
                  style={input}
                >
                  <option value="">— Select —</option>
                  {[
                    "Walk",
                    "Run",
                    "Road Bike",
                    "Treadmill",
                    "Stationary Bike",
                    "Elliptical",
                    "Free Weights",
                    "Yoga Mat",
                    "Other",
                  ].map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Heart Rates for activities that track HR */}
            {hrTypes.includes(activity.type) && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="avg-hr" style={label}>
                    Avg Heart Rate
                  </label>
                  <input
                    id="avg-hr"
                    type="number"
                    value={activity.avgHr}
                    onChange={upd("avgHr")}
                    placeholder="e.g. 145"
                    style={input}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="max-hr" style={label}>
                    Max Heart Rate
                  </label>
                  <input
                    id="max-hr"
                    type="number"
                    value={activity.maxHr}
                    onChange={upd("maxHr")}
                    placeholder="e.g. 175"
                    style={input}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Comments */}
          <details style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            <summary style={summaryStyle}>🗒️ Additional Comments</summary>
            <textarea
              value={activity.notes}
              onChange={upd("notes")}
              placeholder="How did it feel?"
              style={{
                ...input,
                marginTop: "0.5rem",
                minHeight: "100px",
                resize: "vertical",
              }}
            />
          </details>

          {/* Photos */}
          <div style={{ marginTop: "1rem" }}>
            <h3 style={titleStyle}>📸 Photos</h3>
            <PhotoUploader onFiles={setPhotos} />
            {photos.length > 0 && (
              <p style={label}>
                {photos.length} file{photos.length > 1 ? "s" : ""} selected
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
