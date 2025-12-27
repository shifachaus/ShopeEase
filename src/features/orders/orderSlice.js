import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    items: [],
  },

  reducers: {
    newOrder(state, action) {
      state.items = action.payload;
    },
  },
});

export const { newOrder } = orderSlice.actions;
export default orderSlice.reducer;
