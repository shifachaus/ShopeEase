import { useGetUserQuery } from "../features/users/userApi";
import { Navigate } from "react-router-dom";
import Loading from "../component/skeletons/Loading";

const ProtectedRoute = ({ isAdmin, isUser, children }) => {
  const { data, isLoading, isError } = useGetUserQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data?.user) {
    return <Navigate to="/login" replace />;
  }

  const role = data.user.role;

  if (isAdmin && role !== "admin") {
    return <Navigate to="/" replace />;
  }

  if (isUser && role !== "user") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
