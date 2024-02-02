import { Routes, Route } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { Suspense, lazy, useEffect, useState } from "react";

import { useLazyGetUserQuery } from "./utils/userApi";
import { login, logout } from "./utils/userSlice";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Loading from "./component/Loading";

import { SharedLayout, ProtectedRoute } from "./pages";

import { Register } from "./pages/user";

const Landing = lazy(() => import("./pages/Landing"));
const Shop = lazy(() => import("./pages/Shop"));
const SingleProduct = lazy(() => import("./pages/SingleProduct"));
const Cart = lazy(() => import("./pages/Cart"));
const Profile = lazy(() => import("./pages/user/Profile"));
const UpdateProfile = lazy(() => import("./pages/user/UpdateProfile"));
const UpdatePassword = lazy(() => import("./pages/user/UpdatePassword"));
const ForgotPassword = lazy(() => import("./pages/user/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/user/ResetPassword"));
const Shipping = lazy(() => import("./pages/Shipping"));
const ConfirmOrder = lazy(() => import("./pages/ConfirmOrder"));
const Payment = lazy(() => import("./pages/Payment"));
const Success = lazy(() => import("./pages/Success"));
const MyOrders = lazy(() => import("./pages/Order/MyOrders"));
const OrderDetails = lazy(() => import("./pages/Order/OrderDetails"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const ProductList = lazy(() => import("./pages/admin/ProductList"));
const NewProduct = lazy(() => import("./pages/admin/NewProduct"));
const UpdateProduct = lazy(() => import("./pages/admin/UpdateProduct"));
const OrderList = lazy(() => import("./pages/admin/OrderList"));
const ProcessOrder = lazy(() => import("./pages/admin/ProcessOrder"));
const UsersList = lazy(() => import("./pages/admin/UsersList"));
const UpdateUser = lazy(() => import("./pages/admin/UpdateUser"));
const ProductReviews = lazy(() => import("./pages/admin/ProductReviews"));
const SharedLayoutDashboard = lazy(() =>
  import("./pages/admin/SharedLayoutDashboard")
);
const Error = lazy(() => import("./pages/Error"));

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const [getUser, results] = useLazyGetUserQuery();
  const userData = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const fetchUserData = async () => {
    try {
      await getUser();
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (results?.data?.success) {
      dispatch(login(results?.data));
    } else {
      dispatch(logout());
    }

    return () => {
      dispatch(login(null));
    };
  }, [dispatch, getUser, results?.data]);

  useEffect(() => {
    getStripeApiKey();
  }, []);

  useEffect(() => {
    if (userData === null) {
      fetchUserData();
    }
  }, [userData]);

  async function getStripeApiKey() {
    try {
      const res = await fetch(
        "https://shopease-backend.onrender.com/api/v1/stripeapikey",
        {
          credentials: "include",
        }
      );
      const data = await res.json();

      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Landing />} />
            <Route path="/login" element={<Register />} />
            <Route path="/products" element={<Shop />} />
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
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/products" element={<ProductList />} />
            <Route path="/admin/product" element={<NewProduct />} />
            <Route path="/admin/product/:id" element={<UpdateProduct />} />

            <Route path="/admin/orders" element={<OrderList />} />

            <Route path="/admin/order/:id" element={<ProcessOrder />} />

            <Route path="/admin/users" element={<UsersList />} />

            <Route path="/admin/user/:id" element={<UpdateUser />} />

            <Route path="/admin/reviews" element={<ProductReviews />} />
          </Route>

          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
