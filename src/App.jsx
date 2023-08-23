import { Routes, Route, useNavigate, Link } from "react-router-dom";
import Header from "./component/Header";
import Body from "./component/Body";
import SingleProduct from "./component/SingleProduct";
import Cart from "./component/Cart";
import Products from "./component/Products";
import LoginSignUp from "./component/user/LoginSignUp";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Profile from "./component/user/Profile";
import { useGetUserQuery } from "./utils/userApi";
import { login, logout } from "./utils/userSlice";
import ProtectedRoute from "./component/ProtectedRoute";
import UpdateProfile from "./component/UpdateProfile";
import UpdatePassword from "./component/UpdatePassword";
import ForgotPassword from "./component/ForgotPassword";
import ResetPassword from "./component/ResetPassword";

function App() {
  const { data, error, isLoading } = useGetUserQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log(data, "APP");

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
      </Routes>
    </div>
  );
}

export default App;
