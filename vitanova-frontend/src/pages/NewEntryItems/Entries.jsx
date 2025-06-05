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

  // Fetch entries with pagination
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
      // If deleting the last item on a non‐zero page, step back
      if (entries.length === 1 && page > 0) {
        setPage(page - 1);
      } else {
        loadEntries();
      }
    });
  };

  // While loading
  if (loading) {
    return <div style={styles.loadingContainer}>Loading entries…</div>;
  }

  // If no entries exist
  if (entries.length === 0) {
    return (
      <div style={styles.loadingContainer}>
        No entries yet. Create your first journal entry!
      </div>
    );
  }

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div style={styles.pageContainer}>
      <div style={styles.innerWrapper}>
        <h2 style={styles.pageTitle}>Your Entries</h2>

        {/* ── Page Size Selector ── */}
        <div style={styles.pageSizeContainer}>
          <label style={styles.pageSizeLabel}>
            Show
            <select
              value={pageSize}
              onChange={(e) => {
                setPage(0);
                setPageSize(+e.target.value);
              }}
              style={styles.pageSizeSelect}
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

        {/* ── Entries Grid ── */}
        <div style={styles.entriesGrid}>
          {entries.map((e) => {
            // Format date as YYYY-MM-DD without timezone shift
            const displayDate = new Date(
              e.entryDate + "T00:00:00Z"
            ).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
              timeZone: "UTC",
            });

            // Build a short activity summary (optional fields)
            const activityParts = [];
            if (e.activityType) activityParts.push(e.activityType);
            if (e.durationMin) activityParts.push(`${e.durationMin} min`);
            if (e.distance)
              activityParts.push(`${e.distance}${e.distanceUnit}`);
            // Only show first three parts
            const activitySummary = activityParts.slice(0, 3).join(" · ");

            return (
              <div key={e.entryId} style={styles.entryWrapper}>
                {/* Delete button */}
                <button
                  onClick={() => handleDelete(e.entryId)}
                  title="Delete entry"
                  style={styles.deleteButton}
                >
                  <Trash2
                    size={18}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  />
                </button>

                <Link to={`/entries/${e.entryId}`} style={styles.entryLink}>
                  <div
                    style={{
                      ...styles.entryCard,
                      borderLeft: e.activityType
                        ? "4px solid #6366F1"
                        : "4px solid transparent",
                    }}
                    onMouseEnter={(evt) =>
                      (evt.currentTarget.style.boxShadow =
                        "0 8px 24px rgba(0, 0, 0, 0.10)")
                    }
                    onMouseLeave={(evt) =>
                      (evt.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(0, 0, 0, 0.05)")
                    }
                  >
                    <time dateTime={e.entryDate} style={styles.entryDate}>
                      {displayDate}
                    </time>

                    <p style={styles.entrySnippet}>
                      {e.text.length > 100
                        ? `${e.text.slice(0, 100)}…`
                        : e.text}
                    </p>

                    {activitySummary && (
                      <div style={styles.activityBadge}>{activitySummary}</div>
                    )}

                    <div style={styles.viewMoreContainer}>
                      <span
                        style={styles.viewMoreText}
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
            );
          })}
        </div>

        {/* ── Pagination ── */}
        <div style={styles.paginationContainer}>
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            style={{
              ...styles.pageButton,
              ...(page === 0 ? styles.pageButtonDisabled : {}),
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
                ...styles.pageButton,
                ...(i === page ? styles.pageButtonActive : {}),
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
              ...styles.pageButton,
              ...(page === totalPages - 1 ? styles.pageButtonDisabled : {}),
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

const styles = {
  loadingContainer: {
    minHeight: "60vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Lato', sans-serif",
    color: "#6B7280",
    fontSize: "1.1rem",
  },

  pageContainer: {
    background: "#F9FAFB",
    minHeight: "100vh",
    padding: "3rem 1rem",
    fontFamily: "'Lato', sans-serif",
    boxSizing: "border-box",
  },
  innerWrapper: {
    maxWidth: "1000px",
    margin: "0 auto",
  },
  pageTitle: {
    fontSize: "1.75rem",
    fontWeight: 600,
    color: "#1F2937",
    textAlign: "center",
    marginBottom: "2rem",
  },

  pageSizeContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "1.5rem",
  },
  pageSizeLabel: {
    fontSize: "0.9rem",
    color: "#4B5563",
    display: "flex",
    alignItems: "center",
  },
  pageSizeSelect: {
    margin: "0 0.5rem",
    padding: "0.3rem 0.6rem",
    border: "1px solid #E5E7EB",
    borderRadius: "0.5rem",
    fontFamily: "'Lato', sans-serif",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border 0.2s",
  },

  entriesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1.5rem",
  },
  entryWrapper: {
    position: "relative",
  },
  deleteButton: {
    position: "absolute",
    top: "0.75rem",
    right: "0.75rem",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    zIndex: 2,
  },
  entryLink: {
    textDecoration: "none",
    color: "inherit",
  },
  entryCard: {
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
    boxSizing: "border-box",
  },
  entryDate: {
    fontSize: "0.875rem",
    color: "#6B7280",
    fontWeight: 500,
  },
  entrySnippet: {
    margin: "0.75rem 0 0",
    color: "#374151",
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: "1rem",
    flexGrow: 1,
  },
  activityBadge: {
    marginTop: "0.75rem",
    padding: "0.3rem 0.6rem",
    background: "#E0E7FF",
    color: "#3730A3",
    fontSize: "0.85rem",
    borderRadius: "0.375rem",
    display: "inline-block",
    fontWeight: 600,
  },
  viewMoreContainer: {
    marginTop: "1.25rem",
    textAlign: "right",
  },
  viewMoreText: {
    fontSize: "0.9rem",
    color: "#6366F1",
    fontWeight: 600,
    cursor: "pointer",
    transition: "color 0.2s ease",
  },

  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "4.5rem 0",
    gap: "0.5rem",
    flexWrap: "wrap",
  },
  pageButton: {
    padding: "0.5rem 0.75rem",
    border: "1px solid #E5E7EB",
    borderRadius: "0.5rem",
    background: "#FFFFFF",
    color: "#374151",
    fontSize: "0.9rem",
    cursor: "pointer",
    transition: "background 0.2s ease, color 0.2s ease",
  },
  pageButtonDisabled: {
    cursor: "not-allowed",
    opacity: 0.5,
  },
  pageButtonActive: {
    background: "#6366F1",
    color: "#FFFFFF",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
  },
};
