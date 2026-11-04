import { api } from "./axios"; // Calling the api we create from the axios file here

export async function getProducts(limit = 6, skip = 6) {
  const response = await api.get(`/products?limit=${limit}&skip=${skip}`);
  return response.data.products;
}

// To fetch and use the searchbar in the Navbar
// ${encodeURIComponent(search)} => to make the spaces, sympols and words encoded in the URL

export function searchProductsEndpoint(search, limit, skip) {
  return `/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
}

export async function searchProducts(search, limit, skip) {
  const response = await api.get(searchProductsEndpoint(search, limit, skip));
  return response.data;
}

export async function getProductById(id) {
  const response = await api.get(`/products/${id}`);
  return response.data;
}

// Async fn. that get products by limit and skip:

export async function fetchProducts({
  search = "",
  sortBy = "",
  order = "",
  category = "",
  limit = 9,
  skip = 0,
}) {
  let url = "/products";

  if (search) {
    url = "/products/search";
  } else if (category) {
    url = `/products/category/${category}`;
  }

  const response = await api.get(url, {
    params: {
      q: search || undefined,
      sortBy: sortBy || undefined,
      order: order || undefined,
      limit,
      skip,
    },
  });
  return response.data;
}

// To get the categories from API
export async function fetchCategories() {
  const response = await api.get("/products/categories");
  return response.data;
}

export async function deleteProduct(id) {
  const response = await api.delete(`/products/${id}`);
  return response.data;
}

export async function addProduct(productData) {
  const response = await api.post("/products/add", productData);
  return response.data;
}

export async function updateProduct(id, productData) {
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
}

export async function fetchProductsBasic() {
  const response = await api.get("/products", {
    params: {
      limit: 0,
      select: "title,price,thumbnail,discountPercentage",
    },
  });
  return response.data.products;
}
