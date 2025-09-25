// File: src/utils/authUtils.js

// ---- Centralized config ----
export const API_BASE = (
  process.env.REACT_APP_API_BASE ||
  (process.env.NODE_ENV === "production"
    ? "https://api.vitanova-app.com"
    : "http://localhost:8080")
).trim();

export const COGNITO_DOMAIN =
  "https://us-east-2d1agk3shc.auth.us-east-2.amazoncognito.com";
export const CLIENT_ID = "2j12r8o421t03pnhhm0hjfi5qu";
export const LOGOUT_REDIRECT = "https://vitanova-app.com"; // must be allowed in Cognito

export const getLogoutUrl = () =>
  `${COGNITO_DOMAIN}/logout?client_id=${CLIENT_ID}&logout_uri=${encodeURIComponent(
    LOGOUT_REDIRECT
  )}`;

// ---- Auth state helper ----
/**
 * We rely on the JSESSIONID cookie; check via an API call.
 */
export async function isAuthenticated() {
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
