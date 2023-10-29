import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: JSON.parse(localStorage.getItem("cart")) || [],
    shippingInfo: JSON.parse(localStorage.getItem("shippingInfo")) || {},
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
      console.log(action.payload);
      const exists = state.items.find(
        (item) => item._id === action.payload._id
      );

      if (exists) {
        state.items = state.items.map((item) =>
          item._id === action.payload._id
            ? { ...action.payload, qty: exists.qty - 1 }
            : item
        );
        localStorage.setItem("cart", JSON.stringify(state.items));
      }

      if (exists?.qty === 1) {
        state.items = state.items.filter(
          (item) => item._id !== action.payload._id
        );
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },

    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
    },
  },
});

export const { addItems, removeItems, saveShippingInfo } = cartSlice.actions;
export default cartSlice.reducer;
