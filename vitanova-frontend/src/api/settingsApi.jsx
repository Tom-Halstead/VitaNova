import { request } from "../api/ApiServices";

/**
 * Export all my data (returns a Blob).
 * @returns {Promise<Blob>}
 */
export async function exportData() {
  const res = await fetch(`${API_BASE}/api/settings/export`, {
    credentials: "include",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Export failed: ${res.status} ${text}`);
  }
  return res.blob();
}

/**
 * Delete my account & data.
 * @returns {null}
 */
export function deleteAccount() {
  return request("/api/users/me", { method: "DELETE" });
}

/**
 * Toggle UI theme.
 * @param {{ theme:string }} data
 * @returns {{ theme:string }}
 */
export function toggleTheme(data) {
  return request("/api/settings/theme", { method: "PUT", body: data });
}
