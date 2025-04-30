import React from "react";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to Vita Nova</h1>
      <p className="mb-8">
        Track your mood, journal entries, and goals effortlessly.
      </p>
      <a
        href="/oauth2/authorization/cognito"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg"
      >
        Sign In / Sign Up
      </a>
    </div>
  );
}
