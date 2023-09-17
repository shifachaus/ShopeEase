import { Routes, Route, useNavigate, Link } from "react-router-dom";
import Body from "./component/Body";
import SingleProduct from "./component/SingleProduct";
import Cart from "./component/Cart";
import Products from "./component/Products";
import LoginSignUp from "./component/user/LoginSignUp";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Profile from "./component/user/Profile";
import { useLazyGetUserQuery } from "./utils/userApi";
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
import Dashboard from "./component/admin/Dashboard";
import ProductList from "./component/admin/ProductList";
import NewProduct from "./component/admin/NewProduct";
import UpdateProduct from "./component/admin/UpdateProduct";
import OrderList from "./component/admin/OrderList";
import ProcessOrder from "./component/admin/ProcessOrder";
import UsersList from "./component/admin/UsersList";
import UpdateUser from "./component/admin/UpdateUser";
import SharedLayout from "./component/SharedLayout";
import ProductReviews from "./component/admin/ProductReviews";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const [getUser, results] = useLazyGetUserQuery();
  const userData = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(results);

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
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route path="/" element={<Body />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/product/:id" element={<SingleProduct />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/login" element={<LoginSignUp />}></Route>
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

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/order/:id"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          ></Route>
        </Route>

        {/* DASHBOARD */}

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
      </Routes>
    </div>
  );
}

export default App;
