import React from "react";

export default function PhotoUploader({ onFiles }) {
  return (
    <div
      style={{
        marginBottom: "1rem",
        fontFamily: "'Lato', sans-serif",
      }}
    >
      <label
        style={{
          display: "block",
          fontSize: "0.875rem",
          color: "#374151",
          marginBottom: "0.5rem",
        }}
      >
        Upload Photos
      </label>
      {/* Hidden file input paired with styled button */}
      <input
        id="photo-upload"
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => onFiles(e.target.files)}
        style={{ display: "none" }}
      />
      <label
        htmlFor="photo-upload"
        style={{
          display: "inline-block",
          padding: "0.5rem 1rem",
          background: "linear-gradient(90deg, #4F46E5, #667EEA)",
          color: "#FFF",
          borderRadius: "0.375rem",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          transition: "transform 0.2s, box-shadow 0.2s",
          fontSize: "0.875rem",
          fontWeight: 600,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
        }}
      >
        Choose Photos
      </label>
    </div>
  );
}
