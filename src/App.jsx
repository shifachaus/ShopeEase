import { Routes, Route, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { lazy, Suspense, useEffect, useState } from "react";

import { useLazyGetUserQuery } from "./utils/userApi";
import { login, logout } from "./utils/userSlice";
import ProtectedRoute from "./component/ProtectedRoute";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Loading from "./component/Loading";

const SharedLayout = lazy(() => import("./component/SharedLayout"));
const Body = lazy(() => import("./component/Home/Body"));
const Products = lazy(() => import("./component/Product/Products"));
const SingleProduct = lazy(() => import("./component/Product/SingleProduct"));
const Cart = lazy(() => import("./component/Cart/Cart"));
const LoginSignUp = lazy(() => import("./component/user/LoginSignUp"));
const Profile = lazy(() => import("./component/user/Profile"));
const UpdateProfile = lazy(() => import("./component/user/UpdateProfile"));
const UpdatePassword = lazy(() => import("./component/user/UpdatePassword"));
const ForgotPassword = lazy(() => import("./component/user/ForgotPassword"));
const ResetPassword = lazy(() => import("./component/user/ResetPassword"));
const Shipping = lazy(() => import("./component/Cart/Shipping"));
const ConfirmOrder = lazy(() => import("./component/Cart/ConfirmOrder"));
const Payment = lazy(() => import("./component/Cart/Payment"));
const Success = lazy(() => import("./component/Cart/Success"));
const MyOrders = lazy(() => import("./component/Order/MyOrders"));
const OrderDetails = lazy(() => import("./component/Order/OrderDetails"));

const Dashboard = lazy(() => import("./component/admin/Dashboard"));
const ProductList = lazy(() => import("./component/admin/ProductList"));
const NewProduct = lazy(() => import("./component/admin/NewProduct"));
const UpdateProduct = lazy(() => import("./component/admin/UpdateProduct"));
const OrderList = lazy(() => import("./component/admin/OrderList"));
const ProcessOrder = lazy(() => import("./component/admin/ProcessOrder"));
const UsersList = lazy(() => import("./component/admin/UsersList"));
const UpdateUser = lazy(() => import("./component/admin/UpdateUser"));
const ProductReviews = lazy(() => import("./component/admin/ProductReviews"));
const Error = lazy(() => import("./component/Error"));

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const [getUser, results] = useLazyGetUserQuery();
  const userData = useSelector((store) => store.user);
  const dispatch = useDispatch();

  // console.log(results);

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
      // console.log(data, "Stripe Api Key");
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
            <Route path="/" element={<Body />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<SingleProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<LoginSignUp />} />
            <Route path="/account" element={<Profile />} />
            <Route path="/me/update" element={<UpdateProfile />} />
            <Route path="/password/update" element={<UpdatePassword />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/order/confirm" element={<ConfirmOrder />} />
            {stripeApiKey && (
              <Route path="/process/payment" element={<Payment />} />
            )}
            <Route path="/success" element={<Success />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/order/:id" element={<OrderDetails />} />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute isAdmin={true}>
                <Dashboard />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/admin/products"
            element={
              <ProtectedRoute isAdmin={true}>
                <ProductList />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/admin/product"
            element={
              <ProtectedRoute isAdmin={true}>
                <NewProduct />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/admin/product/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateProduct />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute isAdmin={true}>
                <OrderList />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/admin/order/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <ProcessOrder />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute isAdmin={true}>
                <UsersList />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/admin/user/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateUser />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/admin/reviews"
            element={
              <ProtectedRoute isAdmin={true}>
                <ProductReviews />
              </ProtectedRoute>
            }
          ></Route>

          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
