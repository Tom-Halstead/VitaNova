import React, { useEffect, useState } from "react";
import { listEntries } from "../api/entriesApi";
import { Link } from "react-router-dom";

export default function EntryList() {
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    listEntries(0, 10).then(setEntries);
  }, []);
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl">Your Entries</h2>
      <ul>
        {entries.map((e) => (
          <li key={e.entryId}>
            <Link to={`/entries/${e.entryId}`} className="hover:underline">
              {e.entryDate}: {e.text.substring(0, 30)}...
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
