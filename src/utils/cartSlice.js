import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },

  reducers: {
    addItems: (state, action) => {
      const exists = state.items?.find((item) => item.id === action.payload.id);
      if (exists) {
        state.items = state.items?.map((item) => {
          return item.id === action.payload.id
            ? { ...exists, qty: exists.qty + action.payload.qty }
            : item;
        });
      } else {
        state.items.push(action.payload);
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
      }

      if (exists?.qty === 1) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },
  },
});

export const { addItems, removeItems } = cartSlice.actions;
export default cartSlice.reducer;
