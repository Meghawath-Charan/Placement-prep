import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { session } = useContext(AuthContext);

  if (!session) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;