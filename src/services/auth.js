import { api } from "./axios";

// Post= > sending data in the request as username and password
export async function loginUser(username, password) {
  const response = await api.post("/auth/login", {
    username,
    password,
    expiresInMins: 60, // After one hour the token will expire
  });
  return response.data;
}

export async function getAuthUser(token) {
  const response = await api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function registerUser(userData) {
  const response = await api.post("/users/add", userData);
  return response.data;
}
