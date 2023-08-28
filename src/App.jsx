import { Routes, Route, useNavigate, Link } from "react-router-dom";
import Header from "./component/Header";
import Body from "./component/Body";
import SingleProduct from "./component/SingleProduct";
import Cart from "./component/Cart";
import Products from "./component/Products";
import LoginSignUp from "./component/user/LoginSignUp";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Profile from "./component/user/Profile";
import { useGetUserQuery } from "./utils/userApi";
import { login, logout } from "./utils/userSlice";
import ProtectedRoute from "./component/ProtectedRoute";
import UpdateProfile from "./component/UpdateProfile";
import UpdatePassword from "./component/UpdatePassword";
import ForgotPassword from "./component/ForgotPassword";
import ResetPassword from "./component/ResetPassword";
import Shipping from "./component/Shipping";
import ConfirmOrder from "./component/ConfirmOrder";
import Payment from "./component/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Success from "./component/Success";
import MyOrders from "./component/MyOrders";
import OrderDetails from "./component/OrderDetails";
import Footer from "./component/Footer";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const { data, error, isLoading } = useGetUserQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log(data, "APP", isLoading);

  useEffect(() => {
    if (error) return;
    if (data) {
      dispatch(login(data));
    } else {
      dispatch(logout());
    }

    return () => {
      dispatch(login(null));
    };
  }, [data]);

  useEffect(() => {
    getStripeApiKey();
  }, []);

  async function getStripeApiKey() {
    try {
      const res = await fetch("http://localhost:4000/api/v1/stripeapikey", {
        credentials: "include",
      });
      const data = await res.json();
      // console.log(data);
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Body />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/product/:id" element={<SingleProduct />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/login" element={<LoginSignUp />}></Route>
        {/* <Route path="/account" element={<Profile />}></Route> */}
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/me/update"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/password/update"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />

        <Route path="/password/forgot" element={<ForgotPassword />}></Route>
        <Route
          path="/password/reset/:token"
          element={<ResetPassword />}
        ></Route>

        <Route
          path="/shipping"
          element={
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order/confirm"
          element={
            <ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />
        {stripeApiKey && (
          <Route
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              </Elements>
            }
          />
        )}

        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <Success />
            </ProtectedRoute>
          }
        />

        {/* <Route
          path="/order/me"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        /> */}

        <Route path="/orders" element={<MyOrders />}></Route>
        <Route path="/order/:id" element={<OrderDetails />}></Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
