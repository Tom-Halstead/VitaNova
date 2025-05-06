import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEntry } from "../api/EntriesApi";
import MoodInput from "../components/MoodInput";

export default function EntryDetail() {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    getEntry(id).then(setEntry);
  }, [id]);
  if (!entry) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 space-y-4 bg-white rounded shadow max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold">Entry on {entry.entryDate}</h2>
      <p className="text-gray-700 whitespace-pre-wrap">{entry.text}</p>
      <div className="flex space-x-4">
        <div className="flex-1">
          <MoodInput
            label="Mood Before"
            value={entry.moodPre}
            onChange={() => {}}
          />
        </div>
        <div className="flex-1">
          <MoodInput
            label="Mood After"
            value={entry.moodPost}
            onChange={() => {}}
          />
        </div>
      </div>
      {/* Photo gallery stub */}
      <div className="grid grid-cols-3 gap-2">
        {entry.photos.map((p) => (
          <img
            key={p.photoId}
            src={p.url}
            alt="Entry"
            className="w-full h-24 object-cover rounded"
          />
        ))}
      </div>
    </div>
  );
}
