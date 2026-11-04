import { api } from "./axios";

export async function fetchCarts({ userId = "", limit = 8, skip = 0 }) {
  const url = userId ? `/carts/user/${userId}` : "/carts";
  const response = await api.get(url, { params: { limit, skip } });
  return response.data;
}

export async function getCartById(id) {
  const response = await api.get(`/carts/${id}`);
  return response.data;
}

export async function addCart(cartData) {
  const response = await api.post("/carts/add", cartData);
  return response.data;
}

export async function updateCart(id, cartData) {
  const response = await api.put(`/carts/${id}`, cartData);
  return response.data;
}

export async function deleteCart(id) {
  const response = await api.delete(`/carts/${id}`);
  return response.data;
}
