import React, { useEffect, useState } from "react";
import { listEntries, deleteEntry } from "../../api/EntriesApi";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

export default function Entries() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const loadEntries = () => {
    setLoading(true);
    listEntries(page, pageSize)
      .then(({ entries, total }) => {
        setEntries(entries);
        setTotal(total);
      })
      .catch((err) => console.error("Failed to load entries:", err))
      .finally(() => setLoading(false));
  };

  useEffect(loadEntries, [page, pageSize]);

  const handleDelete = (entryId) => {
    if (!window.confirm("Delete this entry?")) return;
    deleteEntry(entryId).then(() => {
      // If deleting last item on page, go back a page
      if (entries.length === 1 && page > 0) {
        setPage(page - 1);
      } else {
        loadEntries();
      }
    });
  };

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          margin: "2rem",
          fontFamily: "'Lato', sans-serif",
        }}
      >
        <div>Loading entries...</div>
      </div>
    );
  }

  if (!entries.length) {
    return (
      <div
        style={{
          textAlign: "center",
          margin: "2rem",
          fontFamily: "'Lato', sans-serif",
          color: "#6B7280",
        }}
      >
        No entries yet. Create your first journal entry!
      </div>
    );
  }

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "2rem auto",
        padding: "0 1rem",
        fontFamily: "'Lato', sans-serif",
      }}
    >
      <h2
        style={{
          fontSize: "1.75rem",
          fontWeight: 600,
          color: "#374151",
          textAlign: "center",
          marginBottom: "1.5rem",
        }}
      >
        Your Entries
      </h2>

      {/* Page size selector */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "1rem",
        }}
      >
        <label style={{ fontSize: "0.9rem", color: "#4B5563" }}>
          Show
          <select
            value={pageSize}
            onChange={(e) => {
              setPage(0);
              setPageSize(+e.target.value);
            }}
            style={{
              margin: "0 0.5rem",
              padding: "0.25rem 0.5rem",
              fontFamily: "'Lato', sans-serif",
            }}
          >
            {[5, 10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          per page
        </label>
      </div>

      {/* Entries grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {entries.map((e) => (
          <div key={e.entryId} style={{ position: "relative" }}>
            {/* Delete button */}
            <button
              onClick={() => handleDelete(e.entryId)}
              title="Delete entry"
              style={{
                position: "absolute",
                top: "0.5rem",
                right: "0.5rem",
                background: "transparent",
                border: "none",
                fontSize: "1.25rem",
                cursor: "pointer",
              }}
            >
              <Trash2
                size={20}
                className="text-gray-500 hover:text-red-600 transition-colors"
              />
            </button>

            <Link
              to={`/entries/${e.entryId}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "0.5rem",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  transition: "box-shadow 0.2s",
                  padding: "1rem",
                }}
                onMouseEnter={(evt) =>
                  (evt.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.1)")
                }
                onMouseLeave={(evt) =>
                  (evt.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(0,0,0,0.05)")
                }
              >
                <div>
                  <time
                    dateTime={e.entryDate}
                    style={{ fontSize: "0.875rem", color: "#6B7280" }}
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
                    {e.text.length > 100
                      ? `${e.text.slice(0, 100)}...`
                      : e.text}
                  </p>
                </div>
                <div style={{ marginTop: "1rem", textAlign: "right" }}>
                  <span
                    style={{
                      fontSize: "0.875rem",
                      color: "#4F46E5",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "color 0.2s",
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
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "3rem 0",
          gap: "0.5rem",
        }}
      >
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          style={{
            padding: "0.5rem 0.75rem",
            border: "1px solid #D1D5DB",
            borderRadius: "0.25rem",
            background: "#FFFFFF",
            color: "#374151",
            cursor: page === 0 ? "default" : "pointer",
            opacity: page === 0 ? 0.5 : 1,
          }}
        >
          ← Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            style={{
              padding: "0.5rem 0.75rem",
              border: "1px solid #D1D5DB",
              borderRadius: "0.25rem",
              background: i === page ? "#4F46E5" : "#FFFFFF",
              color: i === page ? "#FFFFFF" : "#374151",
              cursor: "pointer",
            }}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={page === totalPages - 1}
          style={{
            padding: "0.5rem 0.75rem",
            border: "1px solid #D1D5DB",
            borderRadius: "0.25rem",
            background: "#FFFFFF",
            color: "#374151",
            cursor: page === totalPages - 1 ? "default" : "pointer",
            opacity: page === totalPages - 1 ? 0.5 : 1,
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
