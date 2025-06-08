// File: src/pages/DashboardItems/InsightItems/InsightCard.jsx
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function InsightCard({ title, summary, details }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);
  const [maxH, setMaxH] = useState("0px");

  // adjust max-height when toggling
  useEffect(() => {
    if (contentRef.current) {
      setMaxH(open ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [open]);

  return (
    <div
      style={{
        marginBottom: 16,
        padding: 16,
        background: "var(--bg)",
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        transition: "background 0.3s ease",
      }}
    >
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <h4 style={{ margin: 0, color: "var(--text)" }}>{title}</h4>
        {open ? <ChevronUp /> : <ChevronDown />}
      </div>

      <p style={{ color: "var(--text-light)", margin: "8px 0" }}>{summary}</p>

      <div
        ref={contentRef}
        style={{
          maxHeight: maxH,
          overflow: "hidden",
          transition: "max-height 0.4s ease, opacity 0.4s ease",
          opacity: open ? 1 : 0,
        }}
      >
        <div style={{ marginTop: 8, color: "var(--text)" }}>{details}</div>
      </div>
    </div>
  );
}
