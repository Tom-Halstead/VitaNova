import React from "react";
import { exportData, deleteAccount } from "../api/settingsApi";

export default function Settings() {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl">Settings & Privacy</h2>
      <button onClick={exportData} className="bg-blue-600 text-white px-4 py-2">
        Export My Data
      </button>
      <button
        onClick={deleteAccount}
        className="bg-red-600 text-white px-4 py-2"
      >
        Delete My Account
      </button>
    </div>
  );
}
