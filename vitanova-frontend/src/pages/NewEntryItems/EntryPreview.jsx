// File: src/components/EntryPreview.jsx

import React, { useState, useEffect } from "react";

export default function EntryPreview({
  date,
  moodPre,
  moodPost,
  text,
  getEmoji,
  photos = [],
  activityType,
  duration,
  distance,
  unit,
  calories,
  location,
  avgHr,
  maxHr,
  equipment,
  notes,
}) {
  // ── Responsive state ──
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ── Determine if any activity fields exist ──
  const hasActivity =
    Boolean(activityType) ||
    Boolean(duration) ||
    Boolean(distance) ||
    Boolean(calories) ||
    Boolean(location) ||
    Boolean(avgHr) ||
    Boolean(maxHr) ||
    Boolean(equipment) ||
    Boolean(notes);

  // ── Helper to render only fields that have values ──
  const renderField = (iconNode, label, value) => {
    if (!value) return null;
    return (
      <div
        style={{
          ...styles.activityRow,
          ...(isMobile ? styles.activityRowMobile : {}),
        }}
        onMouseEnter={(e) =>
          Object.assign(e.currentTarget.style, styles.activityRowHover)
        }
        onMouseLeave={(e) =>
          Object.assign(e.currentTarget.style, {
            background: "var(--bg)",
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

  // ── Inline SVG icons ──
  const RunSVG = () => (
    <svg viewBox="0 0 24 24" fill="var(--primary)" width="20" height="20">
      {/* … */}
    </svg>
  );
  const DurationSVG = () => (
    <svg viewBox="0 0 24 24" fill="var(--primary-alt)" width="20" height="20">
      {/* … */}
    </svg>
  );
  const DistanceSVG = () => (
    <svg viewBox="0 0 24 24" fill="var(--secondary)" width="20" height="20">
      {/* … */}
    </svg>
  );
  const CaloriesSVG = () => (
    <svg viewBox="0 0 24 24" fill="var(--accent)" width="20" height="20">
      {/* … */}
    </svg>
  );
  const LocationSVG = () => (
    <svg viewBox="0 0 24 24" fill="var(--highlight)" width="20" height="20">
      {/* … */}
    </svg>
  );
  const HeartSVG = () => (
    <svg viewBox="0 0 24 24" fill="var(--error)" width="20" height="20">
      {/* … */}
    </svg>
  );
  const EquipmentSVG = () => (
    <svg viewBox="0 0 24 24" fill="var(--text-light)" width="20" height="20">
      {/* … */}
    </svg>
  );

  return (
    <div style={styles.outerContainer}>
      <div style={styles.cardContainer}>
        <h2 style={styles.header}>
          <span role="img" aria-label="Image">
            📋
          </span>{" "}
          Entry Preview
          <div style={styles.headerUnderline} />
        </h2>

        {/* ── Date & Mood Summary ── */}
        <div
          style={{
            ...styles.summaryGrid,
            ...(isMobile ? styles.summaryGridMobile : {}),
          }}
        >
          <div style={{ ...styles.summaryBox, background: "var(--bg)" }}>
            <span style={styles.summaryIcon} role="img" aria-label="Date">
              📅
            </span>
            <span style={styles.summaryLabel}>Date</span>
            <span style={styles.summaryValue}>{date}</span>
          </div>
          <div style={{ ...styles.summaryBox, background: "var(--bg)" }}>
            <span style={styles.summaryIcon} role="img" aria-label="MoodBefore">
              😊
            </span>
            <span style={styles.summaryLabel}>Mood Before</span>
            <span style={styles.summaryValue}>
              {getEmoji(moodPre)} ({moodPre})
            </span>
          </div>
          <div style={{ ...styles.summaryBox, background: "var(--bg)" }}>
            <span style={styles.summaryIcon} role="img" aria-label="MoodAfter">
              😊
            </span>
            <span style={styles.summaryLabel}>Mood After</span>
            <span style={styles.summaryValue}>
              {getEmoji(moodPost)} ({moodPost})
            </span>
          </div>
        </div>

        {/* ── Journal Text ── */}
        {text && (
          <div style={styles.section}>
            <h3 style={styles.sectionHeader}>
              <span role="img" aria-label="JournalText">
                🖋
              </span>{" "}
              Journal Text
            </h3>
            <div style={styles.journalCard}>
              <p style={styles.journalText}>{text}</p>
            </div>
          </div>
        )}

        {/* ── Activity Details ── */}
        {hasActivity && (
          <div style={styles.section}>
            <h3 style={styles.sectionHeader}>
              <span role="img" aria-label="ActivityDetails">
                🔥
              </span>{" "}
              Activity Details
            </h3>
            <div
              style={{
                ...styles.activitySection,
                ...(isMobile ? styles.activitySectionMobile : {}),
              }}
            >
              {renderField(RunSVG(), "Type", activityType)}
              {renderField(
                DurationSVG(),
                "Duration",
                duration ? `${duration} min` : ""
              )}
              {renderField(
                DistanceSVG(),
                "Distance",
                distance && unit ? `${distance} ${unit}` : ""
              )}
              {renderField(
                CaloriesSVG(),
                "Calories",
                calories ? `${calories} kcal` : ""
              )}
              {renderField(LocationSVG(), "Location", location)}
              {renderField(
                HeartSVG(),
                "Heart Rate",
                avgHr || maxHr
                  ? `${avgHr ? `Avg ${avgHr} bpm` : ""}${
                      avgHr && maxHr ? " / " : ""
                    }${maxHr ? `Max ${maxHr} bpm` : ""}`
                  : ""
              )}
              {renderField(EquipmentSVG(), "Equipment", equipment)}
            </div>

            {notes && (
              <div style={{ marginTop: isMobile ? "1rem" : "2rem" }}>
                <h4 style={styles.subHeader}>
                  <span role="img" aria-label="Notes">
                    🗒️
                  </span>{" "}
                  Notes
                </h4>
                <div style={styles.notesCard}>
                  <p style={styles.notesText}>{notes}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Photos ── */}
        {photos.length > 0 && (
          <div style={styles.section}>
            <h3 style={styles.sectionHeader}>
              <span role="img" aria-label="Photos">
                📸
              </span>{" "}
              Photos
            </h3>
            <div
              style={{
                ...styles.photosGrid,
                ...(isMobile ? styles.photosGridMobile : {}),
              }}
            >
              {photos.map((file, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.photoWrapper,
                    ...(isMobile ? styles.photoWrapperMobile : {}),
                  }}
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
    background: "var(--bg-alt)",
    padding: "2rem 1rem",
    display: "flex",
    justifyContent: "center",
    fontFamily: "'Lato', sans-serif",
    color: "var(--text)",
  },
  cardContainer: {
    width: "100%",
    maxWidth: "900px",
    background: "var(--bg)",
    borderRadius: "1rem",
    padding: "2rem",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
    boxSizing: "border-box",
  },
  header: {
    fontSize: "1.9rem",
    color: "var(--text)",
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
    background: "var(--primary)",
    borderRadius: "2px",
  },
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem",
  },
  summaryGridMobile: {
    gridTemplateColumns: "1fr",
  },
  summaryBox: {
    borderRadius: "0.75rem",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
    transition: "transform 0.2s ease",
  },
  section: {
    marginTop: "2.5rem",
  },
  sectionHeader: {
    fontSize: "1.4rem",
    fontWeight: 600,
    color: "var(--text)",
    marginBottom: "1rem",
    borderBottom: "2px solid var(--border)",
    paddingBottom: "0.5rem",
  },
  journalCard: {
    background: "var(--bg-alt)",
    borderLeft: "4px solid var(--primary)",
    borderRadius: "0.5rem",
    padding: "1rem 1.25rem",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.03)",
  },
  journalText: {
    fontSize: "1rem",
    lineHeight: 1.6,
    color: "var(--text)",
    whiteSpace: "pre-wrap",
  },
  activitySection: {
    background: "var(--bg)",
    borderRadius: "0.75rem",
    border: "1px solid var(--border)",
    padding: "1rem",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.04)",
  },
  activitySectionMobile: {
    padding: "0.5rem",
  },
  activityRow: {
    display: "grid",
    gridTemplateColumns: "32px 1fr 1fr",
    alignItems: "center",
    padding: "0.75rem 1rem",
    borderRadius: "0.5rem",
    background: "var(--bg)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    transition:
      "background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
    cursor: "default",
    marginBottom: "0.75rem",
  },
  activityRowMobile: {
    gridTemplateColumns: "32px 1fr",
    padding: "0.5rem",
  },
  activityRowHover: {
    background: "var(--bg-alt)",
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
    color: "var(--text-light)",
    paddingLeft: "0.5rem",
  },
  activityValue: {
    fontSize: "1rem",
    fontWeight: 500,
    color: "var(--text)",
    paddingLeft: "0.5rem",
  },
  photosGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.75rem",
  },
  photosGridMobile: {
    justifyContent: "center",
    gap: "0.5rem",
  },
  photoWrapper: {
    width: "120px",
    height: "120px",
    overflow: "hidden",
    borderRadius: "0.75rem",
    border: "1px solid var(--border)",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.02)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  photoWrapperMobile: {
    width: "80px",
    height: "80px",
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
  subHeader: {
    fontSize: "1.1rem",
    fontWeight: 600,
    color: "var(--text)",
    marginBottom: "0.5rem",
  },
  notesCard: {
    background: "var(--bg-alt)",
    borderRadius: "0.5rem",
    padding: "0.75rem 1rem",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.04)",
  },
  notesText: {
    fontSize: "1rem",
    lineHeight: 1.6,
    color: "var(--text)",
    whiteSpace: "pre-wrap",
  },
};
