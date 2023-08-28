import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./productApi";
import cartSlice from "./cartSlice";
import { userApi } from "./userApi";
import userSlice from "./userSlice";
import orderSlice from "./orderSlice";
import { orderApi } from "./orderApi";

const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    cart: cartSlice,
    user: userSlice,
    order: orderSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      userApi.middleware,
      orderApi.middleware
    ),
});
export default store;
