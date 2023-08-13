import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./productApi";
import cartSlice from "./cartSlice";

const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
export default store;
