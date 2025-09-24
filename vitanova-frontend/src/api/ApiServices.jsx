// src/api/apiServices.js

// 1) Export the base URL so it's defined everywhere
export const REACT_APP_API_BASE = (process.env.REACT_APP_API_BASE ?? "").trim();

// 2) Low-level request helper
export async function request(
  path,
  { method = "GET", body, headers = {}, ...opts } = {}
) {
  const config = {
    method,
    credentials: "include",
    headers: { ...headers },
    ...opts,
  };

  if (body instanceof FormData) {
    config.body = body;
  } else if (body != null) {
    config.headers["Content-Type"] = "application/json";
    config.body = JSON.stringify(body);
  }

  const res = await fetch(`${REACT_APP_API_BASE}${path}`, config);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${method} ${path} failed: ${res.status} ${text}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

// 3) Export your higher-level helpers here:

/**
 * Export all user data (returns a Blob).
 */
export async function exportData() {
  const res = await fetch(`${REACT_APP_API_BASE}/api/settings/export`, {
    method: "GET",
    credentials: "include",
    headers: {
      // if you use JWT instead of cookies:
      // Authorization: `Bearer ${localStorage.getItem("token")}`
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Export failed: ${res.status} ${text}`);
  }
  return res.blob();
}

/**
 * Delete the current user account.
 */
export function deleteAccount() {
  // you can return request, or manually do fetch as above
  return request("/api/users/me", { method: "DELETE" });
}
