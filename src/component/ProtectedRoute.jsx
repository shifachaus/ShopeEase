import { useGetUserQuery } from "../utils/userApi";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, children }) => {
  const { data, isLoading } = useGetUserQuery();
  console.log(data?.user?.role, "GGG", isAdmin);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data?.success === false) {
    return <Navigate to="/" />;
  }

  if (isAdmin === true && data?.user?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
