import { configureStore } from "@reduxjs/toolkit"; // Redux Store
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer, // connect the cartSlice with the store
    products: productReducer,
    auth: authReducer,
  },
});
