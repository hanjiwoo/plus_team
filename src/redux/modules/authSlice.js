import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: !!localStorage.getItem("accessToken"),
  email: localStorage.getItem("email"),
  displayName: localStorage.getItem("displayName"),
  uid: localStorage.getItem("uid"),
  photoURL: localStorage.getItem("photoURL"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, displayName, uid, photoURL } = action.payload;
      localStorage.setItem("email", email);
      localStorage.setItem("displayName", displayName);
      localStorage.setItem("uid", uid);
      localStorage.setItem("photoURL", photoURL);
      state.isLogin = true;
      state.email = email;
      state.displayName = displayName;
      state.uid = uid;
      state.photoURL = photoURL;
    },
    logout: (state, action) => {
      localStorage.clear();
      return (state = {});
    },
    updateNickname: (state, action) => {
      localStorage.setItem("displayName", action.payload);
      state.displayName = action.payload;
    },
  },
});

export const { login, logout, updateNickname } = authSlice.actions;
export default authSlice.reducer;
