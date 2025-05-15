// src/api/apiServices.js

const API_BASE = "http://localhost:8080";

// low-level request helper
async function request(
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

  const res = await fetch(`${API_BASE}${path}`, config);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${method} ${path} failed: ${res.status} ${text}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

// ====================================
// Auth & Profile
// ====================================
/**
 * Register a new userModel.
 * @param {{ email: string, password: string, name: string }} data
 * @returns {{ userId: string, email: string }}
 */
export function signup(data) {
  return request("/api/auth/signup", { method: "POST", body: data });
}

/**
 * Login via Cognito.
 * @param {{ email: string, password: string }} data
 * @returns {{ jwtToken: string, expiresIn: number }}
 */
export function login(data) {
  return request("/api/auth/login", { method: "POST", body: data });
}

/**
 * Fetch current userModel profile.
 * @returns {{ userId: string, name: string, email: string }}
 */
export function fetchCurrentUser() {
  return request("/api/users/me");
}

/**
 * Update current userModel profile.
 * @param {{ name: string }} data
 * @returns {{ userId: string, name: string, email: string }}
 */
export function updateProfile(data) {
  return request("/api/users/me", { method: "PUT", body: data });
}

// ====================================
// Journal Entries
// ====================================
/**
 * Create a new journal entry with moods & photos.
 * @param {FormData} formData
 * @returns {{ entryId: string, text: string, entryDate: string, moodPre: number, moodPost: number, photos: {photoId:string,url:string}[], createdAt: string }}
 */
export function createEntry(formData) {
  return request("/api/entries", { method: "POST", body: formData });
}

/**
 * List journal entries (paged).
 * @param {number} page
 * @param {number} size
 * @returns {Array<{ entryId:string, text:string, entryDate:string, moodPre:number, moodPost:number, thumbnailUrl:string }>}
 */
export function listEntries(page = 0, size = 10) {
  return request(`/api/entries?page=${page}&size=${size}`);
}

/**
 * Get one entry with moods & photos.
 * @param {string} Id
 * @returns {{ entryId:string, text:string, entryDate:string, moodPre:number, moodPost:number, photos:{photoId:string,url:string}[], createdAt:string, updatedAt:string }}
 */
export function getEntry(id) {
  return request(`/api/entries/${id}`);
}

/**
 * Update an entry (fields + add/remove photos).
 * @param {string} id
 * @param {{ text?:string, entryDate?:string, moodPre?:number, moodPost?:number, newPhotos?:File[], removePhotoIds?:string[] }} options
 * @returns {{ entryId:string, text:string, entryDate:string, moodPre:number, moodPost:number, photos:{photoId:string,url:string}[], updatedAt:string }}
 */
export function updateEntry(
  id,
  { text, entryDate, moodPre, moodPost, newPhotos, removePhotoIds }
) {
  const form = new FormData();
  if (text != null) form.append("text", text);
  if (entryDate != null) form.append("entryDate", entryDate);
  if (moodPre != null) form.append("moodPre", moodPre);
  if (moodPost != null) form.append("moodPost", moodPost);
  if (newPhotos) newPhotos.forEach((f) => form.append("newPhotos[]", f));
  if (removePhotoIds)
    form.append("removePhotoIds", JSON.stringify(removePhotoIds));
  return request(`/api/entries/${id}`, { method: "PATCH", body: form });
}

/**
 * Delete an entry.
 * @param {string} id
 * @returns {null}
 */
export function deleteEntry(id) {
  return request(`/api/entries/${id}`, { method: "DELETE" });
}

// ====================================
// Dashboard & Analytics
// ====================================
/**
 * Get dashboard summary.
 * @returns {{ totalEntries:number, avgMoodPre:number, avgMoodPost:number, currentStreak:number }}
 */
export function getDashboardSummary() {
  return request("/api/dashboard/summary");
}

/**
 * Get mood trend over time.
 * @param {number} days
 * @returns {Array<{ date:string, avgMoodPre:number, avgMoodPost:number }>}
 */
export function getMoodTrend(days = 30) {
  return request(`/api/dashboard/mood-trend?days=${days}`);
}

// ====================================
// Goals & Milestones
// ====================================
/**
 * Create a goal.
 * @param {{ type:string, targetValue:number, dueDate:string }} data
 * @returns {{ goalId:string, type:string, targetValue:number, currentValue:number, dueDate:string, status:string }}
 */
export function createGoal(data) {
  return request("/api/goals", { method: "POST", body: data });
}

/**
 * List my goals.
 * @returns {Array<{ goalId:string, type:string, targetValue:number, currentValue:number, dueDate:string, status:string }>}
 */
export function listGoals() {
  return request("/api/goals");
}

/**
 * Update goal progress or status.
 * @param {string} id
 * @param {{ currentValue?:number, status?:string }} data
 * @returns {{ goalId:string, type:string, targetValue:number, currentValue:number, dueDate:string, status:string }}
 */
export function updateGoal(id, data) {
  return request(`/api/goals/${id}`, { method: "PUT", body: data });
}

// ====================================
// Settings & Privacy
// ====================================
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
