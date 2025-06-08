// src/components/EntryPreview.jsx

import React from "react";

export default function EntryPreview({
  date,
  moodPre,
  moodPost,
  text,
  getEmoji,
  photos,
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
  // ── Define hasActivity here ──
  const hasActivity =
    !!activityType ||
    !!durationMin ||
    !!distance ||
    !!calories ||
    !!location ||
    !!avgHeartRate ||
    !!maxHeartRate ||
    !!equipment ||
    !!notes;

  // Helper to render only fields that have values
  const renderField = (iconNode, label, value) => {
    if (!value) return null;
    return (
      <div
        style={styles.activityRow}
        onMouseEnter={(e) =>
          Object.assign(e.currentTarget.style, styles.activityRowHover)
        }
        onMouseLeave={(e) =>
          Object.assign(e.currentTarget.style, {
            background: "#FFFFFF",
            transform: "none",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
          })
        }
      >
        <div style={styles.activityIconWrapper}>{iconNode}</div>
        <div style={styles.activityLabel}>{label}</div>
        <div style={styles.activityValue}>{value}</div>
      </div>
    );
  };

  // Inline SVG icons (same color scheme as before)
  const RunSVG = () => (
    <svg viewBox="0 0 24 24" fill="#805AD5" width="20" height="20">
      <path d="M13.49 5.48c.88 0 1.6-.72 1.6-1.6s-.72-1.6-1.6-1.6-1.6.72-1.6 1.6.72 1.6 1.6 1.6zM17.2 7.07c.25.11.53.04.7-.17l.58-.7c.25-.3.19-.75-.15-1-.34-.24-.8-.18-1.04.12l-.58.7c-.25.3-.19.75.15 1zm-2.66 8.11l1.72 3.62c.14.29.44.46.76.46h1.02c.55 0 .99-.45.99-1 0-.17-.04-.34-.11-.49l-1.73-3.63c-.35-.73-1.16-1.02-1.89-.68-.73.35-1.02 1.15-.67 1.88zm3.46-4.76c.34.25.79.19 1.04-.12l.58-.7c.34-.42.29-1-.12-1.34-.42-.34-1-.29-1.34.12l-.58.7c-.34.42-.29 1 .12 1.34zm-4.36 1.46c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1s-1 .45-1 1v3c0 .55.45 1 1 1z" />
    </svg>
  );

  const DurationSVG = () => (
    <svg viewBox="0 0 24 24" fill="#D53F8C" width="20" height="20">
      <path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0-5c.55 0 1 .45 1 1v3a1 1 0 01-2 0V3c0-.55.45-1 1-1zm5.66 2.34a1 1 0 011.32-.08l2.12 1.77a1 1 0 01-1.32 1.52L16.66 5.78a1 1 0 01-.08-1.32zM19 11a1 1 0 011 1v2a1 1 0 01-2 0v-2a1 1 0 011-1zm-2.34 5.66a1 1 0 01.08 1.32l-1.77 2.12a1 1 0 11-1.52-1.32l1.77-2.12a1 1 0 011.44-.0zM12 17a1 1 0 011 1v3c0 .55-.45 1-1 1s-1-.45-1-1v-3a1 1 0 011-1zm-5.66-2.34a1 1 0 011.32-.08l2.12 1.77a1 1 0 01-1.32 1.52L5.78 16.66a1 1 0 01-.08-1.32zm-2.34-5.66a1 1 0 011-1h2a1 1 0 010 2H5a1 1 0 01-1-1zm2.34-5.66a1 1 0 01-.08 1.32L5.78 5.78a1 1 0 11-1.52-1.32L6.06 1.36a1 1 0 011.32-.08z" />
    </svg>
  );

  const DistanceSVG = () => (
    <svg viewBox="0 0 24 24" fill="#38A169" width="20" height="20">
      <path d="M12 2a10 10 0 00-3.22 19.43c.51.1.7-.22.7-.49 0-.24-.01-1.04-.01-1.89-2.85.62-3.45-1.37-3.45-1.37-.47-1.17-1.15-1.48-1.15-1.48-.94-.64.07-.63.07-.63 1.04.07 1.58 1.07 1.58 1.07.92 1.56 2.42 1.11 3.01.85.09-.66.36-1.11.65-1.36-2.27-.26-4.65-1.13-4.65-5.03 0-1.11.39-2.01 1.03-2.72-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.03a9.56 9.56 0 012.5-.34c.85 0 1.71.11 2.5.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.4.2 2.44.1 2.7.64.71 1.03 1.61 1.03 2.72 0 3.9-2.38 4.78-4.65 5.03.37.33.7.98.7 1.98 0 1.43-.01 2.58-.01 2.93 0 .27.19.59.7.49A10 10 0 0012 2z" />
    </svg>
  );

  const CaloriesSVG = () => (
    <svg viewBox="0 0 24 24" fill="#DD6B20" width="20" height="20">
      <path d="M12 2c-1.63 0-3.25.92-4.04 2.56C7.17 4.3 6.8 4 6.35 4 5 4 4 5 4 6.35c0 .45.3.82.56 1.61C4.92 8.75 4 10.37 4 12c0 4.41 3.59 8 8 8 4.41 0 8-3.59 8-8 0-1.63-.92-3.25-2.56-4.04.3-.79.56-1.16.56-1.61 0-1.35-1-2.35-2.35-2.35-.45 0-.82.3-1.61.56C15.25 2.92 13.63 2 12 2z" />
    </svg>
  );

  const LocationSVG = () => (
    <svg viewBox="0 0 24 24" fill="#4299E1" width="20" height="20">
      <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
    </svg>
  );

  const HeartSVG = () => (
    <svg viewBox="0 0 24 24" fill="#E53E3E" width="20" height="20">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 6.42 3.42 5 5.5 5c1.14 0 2.21.5 2.96 1.38C9.29 5.5 10.36 5 11.5 5 13.58 5 15 6.42 15 8.5c0 3.77-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );

  const EquipmentSVG = () => (
    <svg viewBox="0 0 24 24" fill="#718096" width="20" height="20">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-1 13H5V7h14v10z" />
      <path d="M7 9h10v2H7zM7 13h6v2H7z" />
    </svg>
  );

  return (
    <div style={styles.outerContainer}>
      <div style={styles.cardContainer}>
        <h2 style={styles.header}>
          📋 Entry Preview
          <div style={styles.headerUnderline}></div>
        </h2>

        {/* ── Date & Mood Summary ── */}
        <div style={styles.summaryGrid}>
          <div style={{ ...styles.summaryBox, background: "#EDF2FF" }}>
            <span style={styles.summaryIcon}>📅</span>
            <span style={styles.summaryLabel}>Date</span>
            <span style={styles.summaryValue}>{date}</span>
          </div>
          <div style={{ ...styles.summaryBox, background: "#FEF3C7" }}>
            <span style={styles.summaryIcon}>😊</span>
            <span style={styles.summaryLabel}>Mood Before</span>
            <span style={styles.summaryValue}>
              {getEmoji(moodPre)} ({moodPre})
            </span>
          </div>
          <div style={{ ...styles.summaryBox, background: "#FCE7F3" }}>
            <span style={styles.summaryIcon}>😊</span>
            <span style={styles.summaryLabel}>Mood After</span>
            <span style={styles.summaryValue}>
              {getEmoji(moodPost)} ({moodPost})
            </span>
          </div>
        </div>

        {/* ── Journal Text ── */}
        {text && (
          <div style={styles.section}>
            <h3 style={styles.sectionHeader}>🖋 Journal Text</h3>
            <div style={styles.journalCard}>
              <p style={styles.journalText}>{text}</p>
            </div>
          </div>
        )}

        {/* ── Activity Details ── */}
        {hasActivity && (
          <div style={styles.section}>
            <h3 style={styles.sectionHeader}>🔥 Activity Details</h3>
            <div style={styles.activitySection}>
              {renderField(RunSVG(), "Type", activityType)}
              {renderField(
                DurationSVG(),
                "Duration (min)",
                durationMin ? `${durationMin} min` : ""
              )}
              {renderField(
                DistanceSVG(),
                "Distance",
                distance ? `${distance} ${distanceUnit}` : ""
              )}
              {renderField(
                CaloriesSVG(),
                "Calories",
                calories ? `${calories} kcal` : ""
              )}
              {renderField(LocationSVG(), "Location", location || "")}
              {renderField(
                HeartSVG(),
                "Heart Rate",
                avgHeartRate || maxHeartRate
                  ? `${avgHeartRate ? `Avg ${avgHeartRate} bpm` : ""}${
                      avgHeartRate && maxHeartRate ? " / " : ""
                    }${maxHeartRate ? `Max ${maxHeartRate} bpm` : ""}`
                  : ""
              )}
              {renderField(EquipmentSVG(), "Equipment", equipment || "")}
            </div>

            {notes && (
              <div style={{ marginTop: "2rem" }}>
                <h4 style={styles.subHeader}>🗒️ Notes</h4>
                <div style={styles.notesCard}>
                  <p style={styles.notesText}>{notes}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Photos ── */}
        {photos && photos.length > 0 && (
          <div style={styles.section}>
            <h3 style={styles.sectionHeader}>📸 Photos</h3>
            <div style={styles.photosGrid}>
              {photos.map((file, i) => (
                <div
                  key={i}
                  style={styles.photoWrapper}
                  onMouseEnter={(e) =>
                    Object.assign(
                      e.currentTarget.style,
                      styles.photoWrapperHover
                    )
                  }
                  onMouseLeave={(e) =>
                    Object.assign(e.currentTarget.style, {
                      transform: "none",
                      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.02)",
                    })
                  }
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${i + 1}`}
                    style={styles.photo}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  outerContainer: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #FFFFFF 0%, #EDF2F7 100%)",
    padding: "2rem 1rem",
    display: "flex",
    justifyContent: "center",
    fontFamily: "'Lato', sans-serif",
  },

  cardContainer: {
    width: "100%",
    maxWidth: "900px",
    background: "#FFFFFF",
    borderRadius: "1rem",
    padding: "2rem",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
    boxSizing: "border-box",
  },

  header: {
    fontSize: "1.9rem",
    color: "#2D3748",
    marginBottom: "1.5rem",
    position: "relative",
    textAlign: "center",
  },
  headerUnderline: {
    position: "absolute",
    bottom: "-4px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "80px",
    height: "4px",
    background: "#805AD5",
    borderRadius: "2px",
  },

  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem",
  },
  summaryBox: {
    borderRadius: "0.75rem",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    background: "#FFFFFF",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
    transition: "transform 0.2s ease",
  },
  summaryIcon: {
    fontSize: "1.5rem",
    marginBottom: "0.5rem",
  },
  summaryLabel: {
    fontSize: "0.95rem",
    fontWeight: 600,
    color: "#4A5568",
    marginBottom: "0.25rem",
  },
  summaryValue: {
    fontSize: "1rem",
    color: "#2D3748",
  },

  section: {
    marginTop: "2.5rem",
  },
  sectionHeader: {
    fontSize: "1.4rem",
    fontWeight: 600,
    color: "#2D3748",
    marginBottom: "1rem",
    borderBottom: "2px solid #E2E8F0",
    paddingBottom: "0.5rem",
  },

  journalCard: {
    background: "#FAFAFF",
    borderLeft: "4px solid #805AD5",
    borderRadius: "0.5rem",
    padding: "1rem 1.25rem",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.03)",
  },
  journalText: {
    fontSize: "1rem",
    lineHeight: 1.6,
    color: "#4A5568",
    whiteSpace: "pre-wrap",
  },

  activitySection: {
    background: "#FFFFFF",
    borderRadius: "0.75rem",
    border: "1px solid #E2E8F0",
    padding: "1rem",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.04)",
  },
  activityRow: {
    display: "grid",
    gridTemplateColumns: "32px 1fr 1fr",
    alignItems: "center",
    padding: "0.75rem 1rem",
    borderRadius: "0.5rem",
    background: "#FFFFFF",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    transition:
      "background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
    cursor: "default",
    marginBottom: "0.75rem",
  },
  activityRowHover: {
    background: "#F7FAFC",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.10)",
  },
  activityIconWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  activityLabel: {
    fontSize: "0.95rem",
    fontWeight: 600,
    color: "#4A5568",
    paddingLeft: "0.5rem",
  },
  activityValue: {
    fontSize: "1rem",
    fontWeight: 500,
    color: "#2D3748",
    paddingLeft: "0.5rem",
  },

  subHeader: {
    fontSize: "1.1rem",
    fontWeight: 600,
    color: "#2D3748",
    marginBottom: "0.5rem",
  },
  notesCard: {
    background: "#FFF8E1",
    borderRadius: "0.5rem",
    padding: "0.75rem 1rem",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.04)",
  },
  notesText: {
    fontSize: "1rem",
    lineHeight: 1.6,
    color: "#4A5568",
    whiteSpace: "pre-wrap",
  },

  photosGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.75rem",
  },
  photoWrapper: {
    width: "120px",
    height: "120px",
    overflow: "hidden",
    borderRadius: "0.75rem",
    border: "1px solid #E2E8F0",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.02)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  photoWrapperHover: {
    transform: "translateY(-3px)",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.08)",
  },
  photo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};
