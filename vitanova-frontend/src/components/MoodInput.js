import React from "react";

export default function MoodInput({ label, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm text-gray-700 mb-1">{label}</label>
      <input
        type="range"
        min="1"
        max="5"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
      <div className="text-center mt-1">{value}</div>
    </div>
  );
}
