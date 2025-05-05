import React from "react";
export default function Home() {
  const handleLogin = () =>
    (window.location.href =
      "http://localhost:8080/oauth2/authorization/cognito");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg,#E0F2FE,#D1D5DB)",
      }}
    >
      <h1
        style={{ fontSize: "2.5rem", color: "#4F46E5", marginBottom: "1rem" }}
      >
        Welcome to Vita Nova
      </h1>
      <p
        style={{
          fontSize: "1.125rem",
          color: "#374151",
          marginBottom: "2rem",
          textAlign: "center",
          maxWidth: "480px",
        }}
      >
        Track your mood, journal entries, and goals effortlessly.
      </p>
      <button
        onClick={handleLogin}
        style={{
          padding: "0.75rem 1.5rem",
          background: "#4F46E5",
          color: "#FFF",
          border: "none",
          borderRadius: "0.375rem",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#4338CA")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#4F46E5")}
      >
        Sign In / Sign Up
      </button>
    </div>
  );
}
