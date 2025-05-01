// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const [auth, setAuth] = useState('checking'); // checking | ok | fail

  useEffect(() => {
    fetch('/api/users/me', { credentials: 'include' })   // ← relative!
      .then(r => setAuth(r.ok ? 'ok' : 'fail'))
      .catch(() => setAuth('fail'));
  }, []);

  if (auth === 'checking') return <div>Loading…</div>;
  if (auth === 'fail')     return <Navigate to="/" replace />;
  return children;
}
