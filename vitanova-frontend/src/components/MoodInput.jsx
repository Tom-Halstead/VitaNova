import React from "react";

const emotions = [
  { value: 1.0, label: "Terrible" },
  { value: 1.5, label: "Very Bad" },
  { value: 2.0, label: "Bad" },
  { value: 2.5, label: "Disappointed" },
  { value: 3.0, label: "Sad" },
  { value: 3.5, label: "Upset" },
  { value: 4.0, label: "Anxious" },
  { value: 4.5, label: "Nervous" },
  { value: 5.0, label: "Neutral" },
  { value: 5.5, label: "Okay" },
  { value: 6.0, label: "Content" },
  { value: 6.5, label: "Pleased" },
  { value: 7.0, label: "Happy" },
  { value: 7.5, label: "Joyful" },
  { value: 8.0, label: "Excited" },
  { value: 8.5, label: "Delighted" },
  { value: 9.0, label: "Ecstatic" },
  { value: 9.5, label: "Overjoyed" },
  { value: 10.0, label: "Blissful" },
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
