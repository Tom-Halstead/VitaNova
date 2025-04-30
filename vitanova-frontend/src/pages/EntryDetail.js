import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEntry } from "../api/entriesApi";
import MoodInput from "../components/MoodInput";

export default function EntryDetail() {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  useEffect(() => {
    getEntry(id).then(setEntry);
  }, [id]);
  if (!entry) return <div>Loading...</div>;
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl">Entry on {entry.entryDate}</h2>
      <p>{entry.text}</p>
      <MoodInput label="Mood Pre" value={entry.moodPre} onChange={() => {}} />
      <MoodInput label="Mood Post" value={entry.moodPost} onChange={() => {}} />
      {/* Photo gallery omitted for brevity */}
    </div>
  );
}
