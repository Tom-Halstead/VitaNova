// src/pages/Entries.jsx

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
      // If deleting last item on page, go back one page
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
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "'Lato', sans-serif",
          color: "#6B7280",
        }}
      >
        Loading entries…
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
        background: "#F9FAFB",
        minHeight: "100vh",
        padding: "3rem 1rem",
        fontFamily: "'Lato', sans-serif",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h2
          style={{
            fontSize: "1.75rem",
            fontWeight: 600,
            color: "#1F2937",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          Your Entries
        </h2>

        {/* Page size selector */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "1.5rem",
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
                padding: "0.3rem 0.6rem",
                border: "1px solid #E5E7EB",
                borderRadius: "0.5rem",
                fontFamily: "'Lato', sans-serif",
                fontSize: "0.9rem",
                outline: "none",
                transition: "border 0.2s",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#6366F1")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
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
                  top: "0.75rem",
                  right: "0.75rem",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Trash2
                  size={20}
                  className="text-gray-400 hover:text-red-600 transition-colors"
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
                    borderRadius: "0.75rem",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    transition: "box-shadow 0.2s ease",
                    padding: "1.5rem",
                  }}
                  onMouseEnter={(evt) =>
                    (evt.currentTarget.style.boxShadow =
                      "0 6px 18px rgba(0, 0, 0, 0.1)")
                  }
                  onMouseLeave={(evt) =>
                    (evt.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(0, 0, 0, 0.05)")
                  }
                >
                  <div>
                    <time
                      dateTime={e.entryDate}
                      style={{
                        fontSize: "0.875rem",
                        color: "#6B7280",
                        fontWeight: 500,
                      }}
                    >
                      {new Date(e.entryDate).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>

                    <p
                      style={{
                        margin: "0.75rem 0 0",
                        color: "#374151",
                        fontWeight: 500,
                        lineHeight: 1.5,
                        fontSize: "1rem",
                      }}
                    >
                      {e.text.length > 100
                        ? `${e.text.slice(0, 100)}…`
                        : e.text}
                    </p>
                  </div>

                  <div style={{ marginTop: "1.25rem", textAlign: "right" }}>
                    <span
                      style={{
                        fontSize: "0.9rem",
                        color: "#6366F1",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(evt) =>
                        (evt.currentTarget.style.color = "#4F46E5")
                      }
                      onMouseLeave={(evt) =>
                        (evt.currentTarget.style.color = "#6366F1")
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
            margin: "4.5rem 0",
            gap: "0.5rem",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            style={{
              padding: "0.5rem 0.75rem",
              border: "1px solid #E5E7EB",
              borderRadius: "0.5rem",
              background: "#FFFFFF",
              color: "#374151",
              fontSize: "0.9rem",
              cursor: page === 0 ? "not-allowed" : "pointer",
              opacity: page === 0 ? 0.5 : 1,
              transition: "background 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (page > 0) {
                e.currentTarget.style.background = "#F3F4F6";
                e.currentTarget.style.color = "#1F2937";
              }
            }}
            onMouseLeave={(e) => {
              if (page > 0) {
                e.currentTarget.style.background = "#FFFFFF";
                e.currentTarget.style.color = "#374151";
              }
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
                border: "1px solid #E5E7EB",
                borderRadius: "0.5rem",
                background: i === page ? "#6366F1" : "#FFFFFF",
                color: i === page ? "#FFFFFF" : "#374151",
                fontSize: "0.9rem",
                cursor: "pointer",
                boxShadow:
                  i === page ? "0 4px 12px rgba(0, 0, 0, 0.06)" : "none",
                transition: "background 0.2s ease, color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (i !== page) {
                  e.currentTarget.style.background = "#F3F4F6";
                  e.currentTarget.style.color = "#1F2937";
                }
              }}
              onMouseLeave={(e) => {
                if (i !== page) {
                  e.currentTarget.style.background = "#FFFFFF";
                  e.currentTarget.style.color = "#374151";
                }
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
              border: "1px solid #E5E7EB",
              borderRadius: "0.5rem",
              background: "#FFFFFF",
              color: "#374151",
              fontSize: "0.9rem",
              cursor: page === totalPages - 1 ? "not-allowed" : "pointer",
              opacity: page === totalPages - 1 ? 0.5 : 1,
              transition: "background 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (page < totalPages - 1) {
                e.currentTarget.style.background = "#F3F4F6";
                e.currentTarget.style.color = "#1F2937";
              }
            }}
            onMouseLeave={(e) => {
              if (page < totalPages - 1) {
                e.currentTarget.style.background = "#FFFFFF";
                e.currentTarget.style.color = "#374151";
              }
            }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
