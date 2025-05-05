import React, { useEffect, useState } from "react";
import { listEntries } from "../api/entriesApi";
import { Link } from "react-router-dom";

export default function EntryList() {
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    listEntries(0, 10).then(setEntries);
  }, []);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-semibold">Your Entries</h2>
      <ul className="divide-y">
        {entries.map((e) => (
          <li key={e.entryId} className="py-2">
            <Link
              to={`/entries/${e.entryId}`}
              className="text-indigo-600 hover:underline"
            >
              {e.entryDate}: {e.text.slice(0, 30)}...
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
