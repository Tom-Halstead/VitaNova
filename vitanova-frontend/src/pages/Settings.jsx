import React from "react";
import { useNavigate } from "react-router-dom";
import { exportData, deleteAccount } from "../api/ApiServices";

export default function Settings() {
  const navigate = useNavigate();

  const handleAccountDeletion = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This cannot be undone."
    );
    if (!confirmed) return;

    try {
      deleteAccount();
      // Redirect to homepage after successful deletion
      navigate("/");
    } catch (error) {
      console.error("Account deletion failed:", error);
      alert(
        "There was an error deleting your account. Please try again later."
      );
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "2rem auto",
        padding: "2rem",
        background: "#FFFFFF",
        borderRadius: "0.5rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
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
        Settings & Privacy
      </h2>

      <button
        onClick={exportData}
        style={{
          width: "100%",
          padding: "0.75rem",
          fontSize: "1rem",
          fontWeight: 600,
          background: "linear-gradient(90deg, #4F46E5, #667EEA)",
          color: "#FFF",
          border: "none",
          borderRadius: "0.5rem",
          cursor: "pointer",
          boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
          transition: "transform 0.2s, box-shadow 0.2s",
          marginBottom: "1rem",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.03)";
          e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.1)";
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
          background: "#F87171",
          color: "#FFF",
          border: "none",
          borderRadius: "0.5rem",
          cursor: "pointer",
          boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
          transition: "background 0.2s, transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#EF4444";
          e.currentTarget.style.transform = "scale(1.03)";
          e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#F87171";
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.1)";
        }}
      >
        Delete My Account
      </button>
    </div>
  );
}
