// File: src/utils/authUtils.js
/**
 * Utility for authentication state.
 * Since we rely on JSESSIONID cookie, we check via an API call.
 */
export async function isAuthenticated() {
  try {
    const res = await fetch(
      `${
        process.env.REACT_APP_API_BASE || "http://localhost:8080"
      }/api/users/me`,
      {
        credentials: "include",
      }
    );
    return res.ok;
  } catch {
    return false;
  }
}
