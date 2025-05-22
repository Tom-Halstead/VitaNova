import React from "react";

const emotions = [
  { value: -8, label: "Terrible" },
  { value: -7, label: "Very Bad" },
  { value: -6, label: "Bad" },
  { value: -5, label: "Disappointed" },
  { value: -4, label: "Sad" },
  { value: -3, label: "Upset" },
  { value: -2, label: "Anxious" },
  { value: -1, label: "Nervous" },
  { value: 0, label: "Neutral" },
  { value: 1, label: "Okay" },
  { value: 2, label: "Content" },
  { value: 3, label: "Pleased" },
  { value: 4, label: "Happy" },
  { value: 5, label: "Joyful" },
  { value: 6, label: "Excited" },
  { value: 7, label: "Delighted" },
  { value: 8, label: "Ecstatic" },
  { value: 9, label: "Overjoyed" },
  { value: 10, label: "Blissful" },
];

export default function MoodInput({ label, value, onChange }) {
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
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{
          width: "100%",
          padding: "0.75rem",
          background: "#FFFFFF",
          border: "1px solid #E5E7EB",
          borderRadius: "0.375rem",
          fontSize: "1rem",
          color: "#374151",
          outline: "none",
          cursor: "pointer",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#667EEA";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(102,126,234,0.3)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "#E5E7EB";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {emotions.map((em) => (
          <option key={em.value} value={em.value}>
            {em.label}
          </option>
        ))}
      </select>
    </div>
  );
}
