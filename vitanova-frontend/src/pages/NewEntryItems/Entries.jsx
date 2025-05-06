import React, { useEffect, useState } from "react";
import { listEntries } from "../../api/EntriesApi";
import { Link } from "react-router-dom";

export default function Entries() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEntries() {
      try {
        const data = await listEntries(0, 20);
        setEntries(data);
      } finally {
        setLoading(false);
      }
    }
    fetchEntries();
  }, []);

  if (loading)
    return (
      <div
        style={{
          textAlign: "center",
          margin: "2rem",
          fontFamily: "'Lato', sans-serif",
        }}
      >
        Loading entries...
      </div>
    );

  if (!entries.length)
    return (
      <div
        style={{
          textAlign: "center",
          margin: "2rem",
          fontFamily: "'Lato', sans-serif",
        }}
      >
        No entries yet. Create your first journal entry!
      </div>
    );

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "2rem auto",
        fontFamily: "'Lato', sans-serif",
      }}
    >
      <h2
        style={{
          fontSize: "1.75rem",
          fontWeight: 600,
          color: "#374151",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        Your Entries
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {entries.map((e) => (
          <Link
            key={e.entryId}
            to={`/entries/${e.entryId}`}
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                background: "#FFFFFF",
                padding: "1rem",
                borderRadius: "0.5rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <time
                  style={{ fontSize: "0.875rem", color: "#6B7280" }}
                  dateTime={e.entryDate}
                >
                  {new Date(e.entryDate).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <p
                  style={{
                    margin: "0.5rem 0 0",
                    color: "#374151",
                    fontWeight: 500,
                    lineHeight: 1.5,
                  }}
                >
                  {e.text.length > 100 ? `${e.text.slice(0, 100)}...` : e.text}
                </p>
              </div>
              <div style={{ marginTop: "1rem", alignSelf: "flex-end" }}>
                <span
                  style={{
                    fontSize: "0.875rem",
                    color: "#4F46E5",
                    fontWeight: 600,
                    transition: "color 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(evt) =>
                    (evt.currentTarget.style.color = "#4338CA")
                  }
                  onMouseLeave={(evt) =>
                    (evt.currentTarget.style.color = "#4F46E5")
                  }
                >
                  View →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
