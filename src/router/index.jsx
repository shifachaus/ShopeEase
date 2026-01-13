import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import ProtectedRoute from "./ProtectedRoute";
import Loading from "../component/skeletons/Loading";

// User Pages
import { Landing, Cart, Shipping, Payment, Success } from "../pages/shop";
import SharedLayout from "../component/layout/SharedLayout";
import SharedLayoutDashboard from "../component/layout/SharedLayoutDashboard";
import {
  ForgotPassword,
  Profile,
  Register,
  ResetPassword,
  UpdatePassword,
  UpdateProfile,
} from "../pages/user";

// Admin Pages
import {
  NewProduct,
  OrderList,
  ProcessOrder,
  ProductList,
  ProductReviews,
  UpdateProduct,
  UpdateUser,
  UsersList,
} from "../pages/admin";

// Orders
import { MyOrders, OrderDetails } from "../pages/Order";
import Blog from "../pages/blog";

// Lazy-loaded pages
const Shop = lazy(() => import("../pages/Shop/Shop"));
const SingleProduct = lazy(() => import("../pages/shop/SingleProduct"));
const ConfirmOrder = lazy(() => import("../pages/shop/ConfirmOrder"));
const Dashboard = lazy(() => import("../pages/admin/Dashboard"));

const AppRoutes = ({ stripeApiKey }) => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Landing />} />
          <Route path="/login" element={<Register />} />
          <Route path="/products" element={<Shop />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/account" element={<Profile />} />
          <Route path="/me/update" element={<UpdateProfile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />

          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          {stripeApiKey && (
            <Route
              path="/process/payment"
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              }
            />
          )}
          <Route path="/success" element={<Success />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/order/:id" element={<OrderDetails />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute isAdmin={true}>
              <SharedLayoutDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="product" element={<NewProduct />} />
          <Route path="product/:id" element={<UpdateProduct />} />
          <Route path="orders" element={<OrderList />} />
          <Route path="order/:id" element={<ProcessOrder />} />
          <Route path="users" element={<UsersList />} />
          <Route path="user/:id" element={<UpdateUser />} />
          <Route path="reviews" element={<ProductReviews />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
