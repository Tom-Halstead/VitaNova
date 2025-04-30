import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import NewEntry from "../pages/NewEntry";
import EntryList from "../pages/EntryList";
import EntryDetail from "../pages/EntryDetail";
import ReflectiveInsights from "../pages/ReflectiveInsights";
import Settings from "../pages/Settings";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
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
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
