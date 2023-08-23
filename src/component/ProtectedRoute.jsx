import { useGetUserQuery } from "../utils/userApi";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { data, isLoading } = useGetUserQuery();

  if (!data) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
