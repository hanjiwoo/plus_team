import { createSlice } from "@reduxjs/toolkit";
const initialState = false;

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    toggle: (state, action) => {
      return !state;
    },
  },
});

export const { toggle } = postSlice.actions;
export default postSlice.reducer;
