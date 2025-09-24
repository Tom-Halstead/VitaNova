// File: src/utils/authUtils.js
/**
 * Utility for authentication state.
 * Since we rely on JSESSIONID cookie, we check via an API call.
 */
export async function isAuthenticated() {
  const API_BASE = (
    process.env.REACT_APP_API_BASE ||
    (process.env.NODE_ENV === "production"
      ? "https://api.vitanova-app.com"
      : "http://localhost:8080")
  ).trim();

  try {
    const res = await fetch(`${API_BASE}/api/users/me`, {
      credentials: "include",
      headers: { Accept: "application/json" },
    });
    return res.ok;
  } catch {
    return false;
  }
}
