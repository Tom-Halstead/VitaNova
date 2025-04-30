import React from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import { isAuthenticated } from "../utils/authUtils";

export default function NavBar() {
  const location = useLocation();
  if (location.pathname === "/") return null;

  return (
    <nav className="p-4 bg-blue-600 text-white flex justify-between">
      <div className="flex space-x-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/new-entry">New Entry</Link>
        <Link to="/entries">Entries</Link>
        <Link to="/insights-goals">Reflective Insights & Goals</Link>
        <Link to="/settings">Settings</Link>
      </div>
      <div className="flex items-center space-x-4">
        <ThemeSwitcher />
        {isAuthenticated() && (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location = "/";
            }}
            className="px-3 py-1 border rounded"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
