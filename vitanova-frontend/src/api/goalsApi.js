export async function listGoals() {
  return fetch("/api/goals", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  }).then((res) => res.json());
}

export async function createGoal(data) {
  return fetch("/api/goals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

export async function updateGoal(id, data) {
  return fetch(`/api/goals/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}
