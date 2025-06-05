// src/components/EntryPreview.jsx

export default function EntryPreview({
  date,
  moodPre,
  moodPost,
  text,
  getEmoji,
  photos,

  // ── NEW props (no surface) ──
  activityType,
  durationMin,
  distance,
  distanceUnit,
  calories,
  location,
  avgHeartRate,
  maxHeartRate,
  equipment,
  notes,
}) {
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
      <h2
        style={{
          fontSize: "1.75rem",
          color: "#2D3748",
          marginBottom: "1.5rem",
        }}
      >
        📋 Preview
      </h2>

      <p>
        <strong>Date:</strong> {date}
      </p>
      <p>
        <strong>Mood Before:</strong> {getEmoji(moodPre)} ({moodPre})
      </p>
      <p>
        <strong>Mood After:</strong> {getEmoji(moodPost)} ({moodPost})
      </p>

      {text && (
        <>
          <h3 style={{ marginTop: "1rem", fontWeight: 600 }}>Journal Text</h3>
          <p style={{ whiteSpace: "pre-wrap" }}>{text}</p>
        </>
      )}

      {/* ── Activity Preview (no surface) ── */}
      {activityType && (
        <div style={{ marginTop: "2rem" }}>
          <h3 style={{ fontWeight: 600 }}>Activity Details</h3>
          <p>
            <strong>Type:</strong> {activityType}
          </p>
          {durationMin && (
            <p>
              <strong>Duration:</strong> {durationMin} min
            </p>
          )}
          {distance && (
            <p>
              <strong>Distance:</strong> {distance} {distanceUnit}
            </p>
          )}
          {calories && (
            <p>
              <strong>Calories:</strong> {calories} kcal
            </p>
          )}
          {location && (
            <p>
              <strong>Location:</strong> {location}
            </p>
          )}
          {(avgHeartRate || maxHeartRate) && (
            <p>
              <strong>Heart Rate:</strong>{" "}
              {avgHeartRate ? `Avg ${avgHeartRate} bpm` : ""}{" "}
              {maxHeartRate ? `/ Max ${maxHeartRate} bpm` : ""}
            </p>
          )}
          {equipment && (
            <p>
              <strong>Equipment:</strong> {equipment}
            </p>
          )}
          {notes && (
            <>
              <h4 style={{ marginTop: "0.5rem", fontWeight: 500 }}>Notes</h4>
              <p style={{ whiteSpace: "pre-wrap" }}>{notes}</p>
            </>
          )}
        </div>
      )}

      {/* ── Photos ── */}
      {photos && photos.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h3 style={{ fontWeight: 600 }}>Photos</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {photos.map((file, i) => (
              <div
                key={i}
                style={{
                  width: "120px",
                  height: "120px",
                  overflow: "hidden",
                  borderRadius: "0.5rem",
                  border: "1px solid #CBD5E0",
                }}
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${i + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
