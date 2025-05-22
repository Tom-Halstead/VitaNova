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
