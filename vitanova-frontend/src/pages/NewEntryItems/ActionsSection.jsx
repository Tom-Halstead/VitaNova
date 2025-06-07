import React from "react";

export default function ActionsSection({ saving, onPreview }) {
  const btnPrimary = {
    flex: 1,
    padding: "0.75rem",
    background: "linear-gradient(90deg, #805AD5, #6B46C1)",
    color: "#FFF",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: 600,
    transition: "transform 0.2s ease, background 0.2s ease",
  };
  const btnSecondary = {
    flex: 1,
    padding: "0.75rem",
    background: "#E53E3E",
    color: "#FFF",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: 600,
    transition: "transform 0.2s ease, background 0.2s ease",
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
      <button type="button" onClick={onPreview} style={btnSecondary}>
        👁️ Preview
      </button>
      <button type="submit" disabled={saving} style={btnPrimary}>
        {saving ? "Saving…" : "Save Entry"}
      </button>
    </div>
  );
}
