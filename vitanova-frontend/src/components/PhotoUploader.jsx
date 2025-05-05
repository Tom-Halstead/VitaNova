import React from "react";
export default function PhotoUploader({ onFiles }) {
  return (
    <div className="mb-4">
      <label className="block text-sm text-gray-700 mb-1">Upload Photos</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => onFiles(e.target.files)}
        className=""
      />
    </div>
  );
}
