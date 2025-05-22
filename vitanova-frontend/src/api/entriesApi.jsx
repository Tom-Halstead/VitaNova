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
