import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [auth, setAuth] = useState("checking"); // 'checking' | 'ok' | 'fail';

  useEffect(() => {
    fetch("/api/users/me", {
      credentials: "include", // <— send the JSESSIONID cookie
    })
      .then((res) => {
        if (res.ok) setAuth("ok");
        else setAuth("fail");
      })
      .catch(() => setAuth("fail"));
  }, []);

  if (auth === "checking") return <div>Loading…</div>;
  if (auth === "fail") return <Navigate to="/" replace />;
  return children;
}
