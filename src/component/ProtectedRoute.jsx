import { useGetUserQuery } from "../utils/userApi";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";

const ProtectedRoute = ({ isAdmin, children }) => {
  const { data, isLoading } = useGetUserQuery();
  // console.log(data, "PROTECTED ROUTE");
  if (isLoading) {
    return <Loading />;
  }
  if (!data) {
    return <Navigate to="/login" />;
  }

  if (data === false) {
    return <Navigate to="/" />;
  }
  if (isAdmin === true && data?.user?.role !== "admin") {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
