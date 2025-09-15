// File: src/components/ActionsSection.jsx
import React from "react";

export default function ActionsSection({ saving, onPreview }) {
  const btnPrimary = {
    flex: 1,
    padding: "0.75rem",
    background: "linear-gradient(90deg, var(--primary-alt), var(--primary))",
    color: "#FFF",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: 600,
    transition: "transform 0.2s ease",
  };
  const btnSecondary = {
    flex: 1,
    padding: "0.75rem",
    background: "var(--bg)",
    color: "var(--primary)",
    border: "1px solid var(--primary)",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: 600,
    transition: "background 0.2s ease, color 0.2s ease, transform 0.2s ease",
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        marginTop: "2rem",
        flexWrap: "wrap",
      }}
    >
      <button
        type="button"
        onClick={onPreview}
        style={btnSecondary}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--primary)";
          e.currentTarget.style.color = "var(--bg)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "var(--bg)";
          e.currentTarget.style.color = "var(--primary)";
        }}
      >
        <span role="img">👁️</span> Preview
      </button>
      <button
        type="submit"
        disabled={saving}
        style={btnPrimary}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {saving ? "Saving…" : "Save Entry"}
      </button>
    </div>
  );
}
