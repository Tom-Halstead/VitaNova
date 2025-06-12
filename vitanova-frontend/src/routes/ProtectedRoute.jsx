import React, { useEffect, useState, useCallback } from "react";
import { Navigate } from "react-router-dom";

const API_BASE = "http://localhost:8080";

export default function ProtectedRoute({ children }) {
  const [auth, setAuth] = useState({ status: "checking", error: null });

  const checkAuth = useCallback(async () => {
    setAuth({ status: "checking", error: null });
    try {
      const res = await fetch(`${API_BASE}/api/users/me`, {
        credentials: "include",
      });
      if (res.ok) {
        setAuth({ status: "ok", error: null });
      } else if (res.status === 401 || res.status === 403) {
        setAuth({ status: "unauthorized", error: null });
      } else {
        setAuth({ status: "error", error: `Server error: ${res.status}` });
      }
    } catch (e) {
      setAuth({ status: "error", error: e.message || "Network error" });
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const { status, error } = auth;

  if (status === "checking") {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "2rem",
          fontFamily: "'Lato', sans-serif",
        }}
      >
        Checking authentication...
      </div>
    );
  }

  if (status === "unauthorized") {
    return <Navigate to="/" replace />;
  }

  if (status === "error") {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "2rem",
          fontFamily: "'Lato', sans-serif",
        }}
      >
        <p style={{ color: "#EF4444", marginBottom: "1rem" }}>Error: {error}</p>
        <button
          onClick={checkAuth}
          style={{
            padding: "0.5rem 1rem",
            background: "#4F46E5",
            color: "#FFF",
            border: "none",
            borderRadius: "0.375rem",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#4338CA")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#4F46E5")}
        >
          Retry
        </button>
      </div>
    );
  }

  return children;
}
