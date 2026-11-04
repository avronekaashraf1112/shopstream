import { api } from "./axios";

export async function fetchUsers({ search = "", limit = 10, skip = 0 }) {
  const url = search ? "/users/search" : "/users";

  const response = await api.get(url, {
    params: {
      q: search || undefined,
      limit,
      skip,
    },
  });
  return response.data;
}

export async function deleteUser(id) {
  const response = await api.delete(`/users/${id}`);
  return response.data;
}

export async function addUser(userData) {
  const response = await api.post("/users/add", userData);
  return response.data;
}
export async function updateUser(id, userData) {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
}

export async function getUserById(id) {
  const response = await api.get(`/users/${id}`);
  return response.data;
}

export async function fetchUsersBasic() {
  const response = await api.get("/users", {
    params: { limit: 0, select: "firstName,lastName,email,image" },
  });
  return response.data.users;
}
