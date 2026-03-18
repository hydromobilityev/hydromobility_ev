import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useRef } from "react";

const RoleProtectedRoute = ({ allowedRole, children }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const toastShown = useRef(false);

  // Not logged in
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // Logged in but role not allowed
  if (user?.user_type !== allowedRole) {
    if (!toastShown.current) {
      toastShown.current = true;
      toast.warn("Access restricted.Please login as ride booker");
      logout();
    }
    return <Navigate to="/login" replace />;
  }

  // Allowed role
  return children;
};

export default RoleProtectedRoute;
