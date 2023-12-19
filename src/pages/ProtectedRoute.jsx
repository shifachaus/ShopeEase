import { useGetUserQuery } from "../utils/userApi";
import { Navigate } from "react-router-dom";
import Loading from "../component/Loading";

const ProtectedRoute = ({ isAdmin, isUser, children }) => {
  const { data, isLoading } = useGetUserQuery();

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

  if (isUser === true && data?.user?.role !== "user") {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
