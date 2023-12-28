import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../modules/authSlice";
import post from "../modules/postSlice";
const store = configureStore({
  reducer: {
    authSlice,
    post,
  },
});

export default store;
