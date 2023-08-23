import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: JSON.parse(localStorage.getItem("cart")) || [],
  },

  reducers: {
    addItems: (state, action) => {
      console.log(action.payload, "ACTION");
      const exists = state.items?.find(
        (item) => item._id === action.payload._id
      );
      if (exists) {
        state.items = state.items?.map((item) => {
          return item._id === action.payload._id
            ? { ...exists, qty: exists.qty + action.payload.qty }
            : item;
        });
        localStorage.setItem("cart", JSON.stringify(state.items));
      } else {
        state.items.push(action.payload);
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },

    removeItems: (state, action) => {
      const exists = state.items.find((item) => item.id === action.payload.id);

      if (exists) {
        state.items = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...action.payload, qty: exists.qty - 1 }
            : item
        );
        localStorage.setItem("cart", JSON.stringify(state.items));
      }

      if (exists?.qty === 1) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
  },
});

export const { addItems, removeItems } = cartSlice.actions;
export default cartSlice.reducer;
