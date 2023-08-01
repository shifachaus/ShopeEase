import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },

  reducers: {
    addItems: (state, action) => {
      state.items.push(action.payload);
      console.log(current(state));
    },
  },
});

export const { addItems } = cartSlice.actions;
export default cartSlice.reducer;
