import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./productApi";
import cartSlice from "./cartSlice";
import { userApi } from "./userApi";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    cart: cartSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware, userApi.middleware),
});
export default store;
