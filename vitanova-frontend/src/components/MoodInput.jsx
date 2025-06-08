// File: src/components/MoodInput.jsx
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

export default function MoodInput({
  label,
  value,
  onChange,
  labelColor = "var(--text)",
}) {
  return (
    <div style={{ marginBottom: "1rem", fontFamily: "'Lato', sans-serif" }}>
      <label
        style={{
          display: "block",
          fontSize: "0.95rem",
          color: labelColor,
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
          background: "var(--bg)",
          border: "1px solid var(--border)",
          borderRadius: "0.375rem",
          fontSize: "1rem",
          color: "var(--text)",
          outline: "none",
          cursor: "pointer",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--primary)";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(79,70,229,0.3)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--border)";
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
