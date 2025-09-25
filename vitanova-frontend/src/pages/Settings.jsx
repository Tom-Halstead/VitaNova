// File: src/components/Settings.jsx
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { exportData, deleteAccount } from "../api/ApiServices";
import { API_BASE, getLogoutUrl } from "../utils/authUtils";

export default function Settings() {
  const { themeName, setThemeName } = useContext(ThemeContext);

  const handleAccountDeletion = async () => {
    if (!window.confirm("Delete your account? This cannot be undone.")) return;

    try {
      // 1) Delete server-side account
      await deleteAccount();

      // 2) Clear Spring session (ignore errors)
      await fetch(`${API_BASE}/logout`, {
        method: "POST",
        credentials: "include",
      }).catch(() => {});

      // 3) Hosted UI logout
      window.location.assign(getLogoutUrl());
    } catch {
      alert("Error deleting account. Please try again later.");
    }
  };

  return (
    <div
      className="card"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "1.75rem",
          fontWeight: 600,
          marginBottom: "1.5rem",
        }}
      >
        Settings & Privacy
      </h2>

      <div style={{ marginBottom: "1.5rem" }}>
        <label
          htmlFor="theme-select"
          style={{
            display: "block",
            marginBottom: "0.5rem",
            color: "var(--text)",
          }}
        >
          Choose Theme:
        </label>
        <select
          id="theme-select"
          value={themeName}
          onChange={(e) => setThemeName(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            fontSize: "1rem",
            background: "var(--bg)",
            color: "var(--text)",
            border: "1px solid var(--border)",
            borderRadius: "0.25rem",
          }}
        >
          <option value="light">Light Mode</option>
          <option value="dark">Dark Mode</option>
        </select>
      </div>

      <button
        onClick={exportData}
        className="bg-primary-gradient"
        style={{
          width: "100%",
          padding: "0.75rem",
          fontSize: "1rem",
          fontWeight: 600,
          color: "#FFF",
          border: "none",
          borderRadius: "0.5rem",
          cursor: "pointer",
          marginBottom: "1rem",
        }}
      >
        Export My Data
      </button>

      <button
        onClick={handleAccountDeletion}
        style={{
          width: "100%",
          padding: "0.75rem",
          fontSize: "1rem",
          fontWeight: 600,
          background: "var(--primary)",
          color: "#FFF",
          border: "none",
          borderRadius: "0.5rem",
          cursor: "pointer",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "var(--primary-alt)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "var(--primary)")
        }
      >
        Delete My Account
      </button>
    </div>
  );
}
