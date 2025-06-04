import { request } from "../api/ApiServices";

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

/**
 * Delete a goal.
 * @param {string} id
 * @returns {Promise<void>}
 */
export function deleteGoal(id) {
  return request(`/api/goals/${id}`, { method: "DELETE" });
}
