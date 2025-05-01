// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import NewEntry from './pages/NewEntry';
import EntryList from './pages/EntryList';
import EntryDetail from './pages/EntryDetail';
import ReflectiveInsights from './pages/ReflectiveInsights';
import Settings from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      {/* Top‐level navigation (hidden on Home) */}
      <NavBar />

      <Routes>
        {/* Public landing page */}
        <Route path="/" element={<Home />} />

        {/* Dashboard and sub‐routes */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* New journal entry */}
        <Route
          path="/new-entry"
          element={
            <ProtectedRoute>
              <NewEntry />
            </ProtectedRoute>
          }
        />

        {/* Entries list */}
        <Route
          path="/entries"
          element={
            <ProtectedRoute>
              <EntryList />
            </ProtectedRoute>
          }
        />

        {/* Entry detail */}
        <Route
          path="/entries/:id"
          element={
            <ProtectedRoute>
              <EntryDetail />
            </ProtectedRoute>
          }
        />

        {/* Reflective Insights & Goals */}
        <Route
          path="/insights-goals"
          element={
            <ProtectedRoute>
              <ReflectiveInsights />
            </ProtectedRoute>
          }
        />

        {/* Settings */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* Catch-all: redirect to Home (or you can render a 404 component) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
