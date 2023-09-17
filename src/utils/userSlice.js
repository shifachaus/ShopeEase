import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    login(state, action) {
      // console.log(state, "USER SLICE", action.payload);
      return action.payload;
    },
    logout() {
      return null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
