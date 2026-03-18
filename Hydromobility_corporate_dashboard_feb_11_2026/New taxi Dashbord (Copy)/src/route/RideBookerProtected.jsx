// route/RideBookerProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useRideBookerAuth } from "../context/RideBookerAuthContext";

const RideBookerProtectedRoute = () => {
  const { isRideBookerAuthenticated, isCorporateAgent } = useRideBookerAuth();

  if (!isRideBookerAuthenticated || !isCorporateAgent) {
    return <Navigate to="/ridebooker_login" replace />;
  }

  return <Outlet />;
};

export default RideBookerProtectedRoute;