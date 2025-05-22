import { request } from "../api/ApiServices";

// export async function listGoals() {
//   return fetch("/api/goals", {
//     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//   }).then((res) => res.json());
// }

// export async function createGoal(data) {
//   return fetch("/api/goals", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//     body: JSON.stringify(data),
//   }).then((res) => res.json());
// }

// export async function updateGoal(id, data) {
//   return fetch(`/api/goals/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//     body: JSON.stringify(data),
//   }).then((res) => res.json());
// }

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
