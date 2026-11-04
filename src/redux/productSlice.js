import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductById } from "../services/products";

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    return await getProductById(id);
  },
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    selectedProduct: null,
    loading: true,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.selectedProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load the product.";
      });
  },
});

export default productSlice.reducer;
