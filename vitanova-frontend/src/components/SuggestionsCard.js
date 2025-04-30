import React from "react";

export default function SuggestionsCard({ suggestions = [] }) {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-sm text-gray-500 mb-2">Suggestions</h3>
      <ul className="list-disc list-inside">
        {suggestions.map((s, idx) => (
          <li key={idx}>{s}</li>
        ))}
      </ul>
    </div>
  );
}
