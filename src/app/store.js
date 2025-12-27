import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../features/products/productApi";
import cartSlice from "../features/cart/cartSlice";
import { userApi } from "../features/users/userApi";
import userSlice from "../features/users/userSlice";
import orderSlice from "../features/orders/orderSlice";
import { orderApi } from "../features/orders/orderApi";

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
