import React from "react";
export default function Home() {
  return (
    <div className="home-container">
      <h1 className="text-4xl font-bold text-indigo-600 mb-4">
        Welcome to Vita Nova
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Track your mood, journal entries, and goals effortlessly.
      </p>
      <a
        href="/oauth2/authorization/cognito"
        className="btn btn-primary"
        rel="noopener noreferrer"
      >
        Sign In / Sign Up
      </a>
    </div>
  );
}
