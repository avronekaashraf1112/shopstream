import { createSlice } from "@reduxjs/toolkit";

const savedToken = localStorage.getItem("token");
const savedUser = JSON.parse(localStorage.getItem("user") || null); // The User is saved as text so we need to convert it to Object

const authSlice = createSlice({
  name: "auth",

  initialState: {
    token: savedToken,
    user: savedUser,
  },

  reducers: {
    loginSucess: (state, action) => {
      const {
        accessToken,
        refreshToken: _refreshToken,
        ...user
      } = action.payload;
      // Action.payload => is the response of the API have the tokens and user information , so we need to separte into acesstoken, refreshtoken and the (...user) rest of the user informations to put it in object called user

      state.token = accessToken;
      state.user = user;
      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { loginSucess, logout } = authSlice.actions;
export default authSlice.reducer;
