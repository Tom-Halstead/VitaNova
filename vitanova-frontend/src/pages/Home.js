// src/pages/Home.js
import React from 'react';

export default function Home() {
  const handleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/cognito';
  };

  return (
    <div className="home-container">
      <h1 className="text-4xl font-bold text-indigo-600 mb-4">
        Welcome to Vita Nova
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Track your mood, journal entries, and goals effortlessly.
      </p>

      {/* Full navigation out of CRA */}
      <button
        onClick={handleLogin}
        className="btn btn-primary"
      >
        Sign In / Sign Up
      </button>
    </div>
  );
}
