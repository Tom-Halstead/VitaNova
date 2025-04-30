import React, { useState } from "react";
import MoodInput from "../components/MoodInput";
import PhotoUploader from "../components/PhotoUploader";
import { createEntry } from "../api/entriesApi";

export default function NewEntry() {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [moodPre, setMoodPre] = useState(3);
  const [moodPost, setMoodPost] = useState(3);
  const [photos, setPhotos] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("text", text);
    form.append("entryDate", date);
    form.append("moodPre", moodPre);
    form.append("moodPost", moodPost);
    Array.from(photos).forEach((f) => form.append("photos[]", f));
    await createEntry(form);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Journal text"
        className="w-full border p-2"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <MoodInput label="Mood Pre" value={moodPre} onChange={setMoodPre} />
      <MoodInput label="Mood Post" value={moodPost} onChange={setMoodPost} />
      <PhotoUploader onFiles={setPhotos} />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">
        Save Entry
      </button>
    </form>
  );
}
