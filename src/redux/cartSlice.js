import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: savedCart,
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const stock = product.stock;
      const qty = product.quantity || 1;

      // Find product by id
      const existingProduct = state.items.find(
        (item) => item.id === product.id,
      );

      if (existingProduct) {
        // Check stock and quantity
        if (existingProduct.quantity + qty >= stock) {
          toast.error(`You can't add more than ${stock} product(s)`);
          return;
        }

        // Update product quantity
        existingProduct.quantity += qty;
      } else {
        // Add new product
        if (stock < 1) {
          toast.error("This product is out of stock");
          return;
        }
        if (qty > stock) {
          toast.error(`You can't add more than ${stock} product(s)`);
          return;
        }

        state.items.push({
          ...product,
          quantity: qty,
        });
      }
      // Save Cart to Local Storage
      localStorage.setItem("cart", JSON.stringify(state.items));

      // Success Message
      toast.success("Product added to the cart");
    },

    removeFromCart: (state, action) => {
      // Get the product ID
      const id = action.payload;
      // Filter
      state.items = state.items.filter((item) => item.id !== id);
      // Save Cart to Local Storage
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    increaseQty: (state, action) => {
      // Find item by ID
      const product = state.items.find((item) => item.id === action.payload);

      // Quantity and stock
      if (product && product.quantity < product.stock) {
        product.quantity += 1;
      } else if (product) {
        toast.error(`You can't add more than ${product.stock} product(s)`);
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    decreaseQty: (state, action) => {
      const product = state.items.find((item) => item.id === action.payload);

      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
