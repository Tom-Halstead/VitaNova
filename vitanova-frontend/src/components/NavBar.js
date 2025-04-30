import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import { isAuthenticated } from "../utils/authUtils";

export default function NavBar() {
  const location = useLocation();
  if (location.pathname === "/") return null;

  return (
    <nav className="bg-white shadow px-6 py-4 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex space-x-6">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 font-semibold border-b-2 border-indigo-600"
                : "text-gray-600 hover:text-indigo-600"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/new-entry"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 font-semibold"
                : "text-gray-600 hover:text-indigo-600"
            }
          >
            New Entry
          </NavLink>
          <NavLink
            to="/entries"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 font-semibold"
                : "text-gray-600 hover:text-indigo-600"
            }
          >
            Entries
          </NavLink>
          <NavLink
            to="/insights-goals"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 font-semibold"
                : "text-gray-600 hover:text-indigo-600"
            }
          >
            Reflective Insights & Goals
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 font-semibold"
                : "text-gray-600 hover:text-indigo-600"
            }
          >
            Settings
          </NavLink>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeSwitcher />
          {isAuthenticated() && (
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location = "/";
              }}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
