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

  const upd = (key) => (e) =>
    setActivity((s) => ({ ...s, [key]: e.target.value }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h3 style={{ fontSize: "1.3rem", fontWeight: 600, color: "#2D3748" }}>
        🔥 Activity Details{" "}
        <span style={{ fontWeight: 400, fontSize: "0.9rem", color: "#718096" }}>
          (optional)
        </span>
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: "1rem",
        }}
      >
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
            {[
              "Run",
              "Bike",
              "Hike",
              "Swim",
              "Gym",
              "Walk",
              "Yoga",
              "Other",
            ].map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

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
      </div>

      {/* Comments & Photos */}
      <details style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <summary
          style={{
            fontSize: "1rem",
            fontWeight: 500,
            color: "#4A5568",
            cursor: "pointer",
          }}
        >
          🗒️ Additional Comments
        </summary>
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

      <div style={{ marginTop: "1rem" }}>
        <h3 style={{ fontSize: "1.3rem", fontWeight: 600, color: "#2D3748" }}>
          📸 Photos
        </h3>
        <PhotoUploader onFiles={setPhotos} />
        {photos.length > 0 && (
          <p
            style={{
              marginTop: "0.5rem",
              fontSize: "0.9rem",
              color: "#4A5568",
            }}
          >
            {photos.length} file{photos.length > 1 ? "s" : ""} selected
          </p>
        )}
      </div>
    </div>
  );
}
