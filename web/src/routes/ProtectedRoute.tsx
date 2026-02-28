import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import type { RootState } from "../app/stores";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = useSelector((state: RootState) => state.auth.token);

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
