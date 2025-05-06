import React from "react";
import { exportData, deleteAccount } from "../api/SettingsApi";

export default function Settings() {
  return (
    <div className="p-6 bg-white rounded shadow max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-semibold">Settings & Privacy</h2>
      <button onClick={exportData} className="btn btn-primary w-full">
        Export My Data
      </button>
      <button onClick={deleteAccount} className="btn btn-danger w-full">
        Delete My Account
      </button>
    </div>
  );
}
