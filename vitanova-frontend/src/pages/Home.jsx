import React from "react";

export default function Home() {
  const handleLogin = () =>
    (window.location.href =
      "https://api.vitanova-app.com/oauth2/authorization/cognito");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        // Lightened background for softness
        fontFamily: "'Lato', sans-serif",
        background: "#AEE3F5",
        // Softer and lighter central fade
        backgroundImage:
          "radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 40%)",
      }}
    >
      <h1
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "3.5rem",
          marginBottom: "1rem",
          // Purple-centric gradient for title
          background: "linear-gradient(90deg, #7F5CE4, #9F7AEA)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
        }}
      >
        Welcome to Vita Nova
      </h1>
      <p
        style={{
          fontSize: "1.25rem",
          // Changed to a soft purple shade for readability
          color: "#6B46C1",
          marginBottom: "2rem",
          textAlign: "center",
          maxWidth: "480px",
          lineHeight: "1.6",
        }}
      >
        Track your mood, journal entries, and goals effortlessly.
      </p>
      <button
        onClick={handleLogin}
        style={{
          padding: "1rem 2rem",
          fontSize: "1.125rem",
          background:
            "linear-gradient(90deg, #7F5CE4 0%, #9F7AEA 50%, #B794F4 100%)",
          color: "#FFF",
          border: "none",
          borderRadius: "0.5rem",
          cursor: "pointer",
          boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
          fontWeight: "600",
          letterSpacing: "0.5px",
          transition:
            "transform 0.2s ease, box-shadow 0.2s ease, background 0.3s ease",
          fontFamily: "'Lato', sans-serif",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background =
            "linear-gradient(90deg, #6B46C1 0%, #805AD5 50%, #9F7AEA 100%)";
          e.currentTarget.style.transform = "scale(1.07)";
          e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background =
            "linear-gradient(90deg, #7F5CE4 0%, #9F7AEA 50%, #B794F4 100%)";
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.2)";
        }}
      >
        Sign In / Sign Up
      </button>
    </div>
  );
}
