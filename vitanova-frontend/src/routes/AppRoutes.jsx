import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/DashboardItems/Dashboard";
import Timeline from "../pages/DashboardItems/Timeline";
import Trends from "../pages/DashboardItems/Trends";
import Insights from "../pages/DashboardItems/Insights";
import NewEntry from "../pages/NewEntryItems/NewEntry";
import EntryList from "../pages/NewEntryItems/Entries";
import EntryDetail from "../pages/NewEntryItems/EntryDetail";
import ReflectiveInsights from "../pages/ReflectiveInsightsItems/ReflectiveInsights";
import Settings from "../pages/Settings";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public home */}
      <Route path="/" element={<Home />} />

      {/* Dashboard layout with nested child views */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<Timeline />} />
        <Route path="trends" element={<Trends />} />
        <Route path="insights" element={<Insights />} />
      </Route>

      {/* Other protected routes */}
      <Route
        path="/new-entry"
        element={
          <ProtectedRoute>
            <NewEntry />
          </ProtectedRoute>
        }
      />
      <Route
        path="/entries"
        element={
          <ProtectedRoute>
            <EntryList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/entries/:id"
        element={
          <ProtectedRoute>
            <EntryDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/insights-goals"
        element={
          <ProtectedRoute>
            <ReflectiveInsights />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
