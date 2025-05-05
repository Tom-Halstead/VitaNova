import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8080";

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    fetch(`${API_BASE}/api/users/me`, { credentials: "include" })
      .then((r) => setStatus(r.ok ? "ok" : "fail"))
      .catch(() => setStatus("fail"));
  }, []);

  if (status === "checking")
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>Loading…</div>
    );
  if (status === "fail") return <Navigate to="/" replace />;
  return children;
}
