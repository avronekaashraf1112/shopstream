import { api } from "./axios";

async function getTotal(path) {
  const response = await api.get(path, { params: { limit: 1 } });
  return response.data.total;
}

export async function fetchDashboardStats() {
  const [products, users, carts] = await Promise.all([
    // Promise.all => is used to run multiple asynchronous operations in parallel and wait for all of them to complete.
    // In this case, it is fetching the total counts of products, users, and carts from the API endpoints . The results are then returned as an object containing the totals for each category.
    getTotal("/products"),
    getTotal("/users"),
    getTotal("/carts"),
  ]);
  return { products, users, carts };
}

export async function fetchUserRoleCounts() {
  const countByRole = async function (role) {
    const response = await api.get("/users/filter", {
      params: { key: "role", value: role, limit: 1 },
    });
    return response.data.total;
  };
  const [admins, moderators, customers] = await Promise.all([
    countByRole("admin"),
    countByRole("moderator"),
    countByRole("user"),
  ]);
  return { admins, moderators, customers };
}
