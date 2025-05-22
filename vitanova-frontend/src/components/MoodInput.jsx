import React from "react";

const emotions = [
  { value: -8, label: "Terrible", icon: "🤮" },
  { value: -7, label: "Very Bad", icon: "😖" },
  { value: -6, label: "Bad", icon: "😞" },
  { value: -5, label: "Disappointed", icon: "😔" },
  { value: -4, label: "Sad", icon: "😢" },
  { value: -3, label: "Upset", icon: "😟" },
  { value: -2, label: "Anxious", icon: "😰" },
  { value: -1, label: "Nervous", icon: "😬" },
  { value: 0, label: "Neutral", icon: "😐" },
  { value: 1, label: "Okay", icon: "🙂" },
  { value: 2, label: "Content", icon: "😊" },
  { value: 3, label: "Pleased", icon: "😌" },
  { value: 4, label: "Happy", icon: "😃" },
  { value: 5, label: "Joyful", icon: "😄" },
  { value: 6, label: "Excited", icon: "🤩" },
  { value: 7, label: "Delighted", icon: "🥳" },
  { value: 8, label: "Ecstatic", icon: "🤯" },
  { value: 9, label: "Overjoyed", icon: "😍" },
  { value: 10, label: "Blissful", icon: "😇" },
];

export default function MoodInput({ label, value, onChange }) {
  return (
    <div style={{ marginBottom: "1rem", fontFamily: "'Lato', sans-serif" }}>
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
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
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
            {em.icon} {em.label}
          </option>
        ))}
      </select>
    </div>
  );
}
