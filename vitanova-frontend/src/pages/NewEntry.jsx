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
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-xl mx-auto p-4 bg-white rounded shadow"
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your journal entry..."
        className="w-full h-32 border rounded p-3 focus:border-indigo-600"
      />
      <div className="flex flex-col sm:flex-row sm:space-x-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded p-2 flex-1 focus:border-indigo-600"
        />
        <div className="flex-1">
          <MoodInput
            label="Mood Before"
            value={moodPre}
            onChange={setMoodPre}
          />
        </div>
        <div className="flex-1">
          <MoodInput
            label="Mood After"
            value={moodPost}
            onChange={setMoodPost}
          />
        </div>
      </div>
      <PhotoUploader onFiles={setPhotos} />
      <button type="submit" className="btn btn-primary w-full">
        Save Entry
      </button>
    </form>
  );
}
