import  { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import AppSidebar from "./Components/sidebar";
import Header from "./Components/Header";
import Home from "./pages/Home";
import Rides from "./pages/Ridelist";
import RideBooker from "./pages/Ridebooker";
import People from "./pages/People";
import Groups from "./pages/Groups";
import Policies from "./pages/Policies";
import Billing from "./pages/Billing";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import RideBookerLogin from "./pages/RidebookerLogin";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./route/ProtectedRoute";
import PublicRoute from "./route/PublicRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RideBooking from "./pages/Ridebooking";
import { useLocation } from "react-router-dom";
import TodayRides from "./pages/TodayRides";
import FutureRides from "./pages/FutureRides";
import PastRides from "./pages/PastRides";
import { LanguageProvider } from "./context/LanguageContext";
import RideDetails from "./pages/TodayRideDetails";
import FutureRideDetails from "./pages/FutureRideDetails";
import { LoadScript } from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY } from "./constants/constant";

import PastRideDetails from "./pages/PastRideDetails";

import CorporateAgentRideBooker from "./pages/AgentRidebooker";
const Layout = ({
  sidebarCollapsed,
  toggleSidebar,
  isMobile,
  closeMobileSidebar,
}) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const hideHeaderRoutes = ["/ride-booking"];

  const hideHeader = hideHeaderRoutes.includes(location.pathname);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <div className="h-screen flex bg-gray-50 overflow-hidden">
        <AppSidebar
          collapsed={sidebarCollapsed}
          setCollapsed={toggleSidebar}
          isMobile={isMobile}
          onClose={closeMobileSidebar}
        />

        <div className="flex-1 flex flex-col min-w-0">
          {!hideHeader && (
            <Header
              sidebarCollapsed={sidebarCollapsed}
              toggleSidebar={toggleSidebar}
              isMobile={isMobile}
            />
          )}

          <main
            className={`flex-1 overflow-auto p-2 md:p-4 ${
              hideHeader ? "pt-0" : "pt-14 lg:pt-8"
            }`}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

const AppRoutes = () => {
  const {  isCorporateCustomer, isCorporateAgent } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) setSidebarCollapsed(true);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const closeMobileSidebar = () => isMobile && setSidebarCollapsed(true);

  return (
    <Routes>
      {/* Public  */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/ridebooker_login" element={<RideBookerLogin />} />
      </Route>

      {/* Protected    */}
      <Route element={<ProtectedRoute />}>
        <Route
          element={
            <Layout
              sidebarCollapsed={sidebarCollapsed}
              toggleSidebar={toggleSidebar}
              isMobile={isMobile}
              closeMobileSidebar={closeMobileSidebar}
            />
          }
        >
          {isCorporateCustomer && <Route path="/" element={<Home />} />}

          <Route path="/rides" element={<Rides />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/settings" element={<Settings />} />

          {isCorporateCustomer && (
            <>
              <Route path="/ride-booker" element={<RideBooker />} />

              <Route path="/people" element={<People />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/policies" element={<Policies />} />
              <Route path="/profile" element={<Profile />} />
            </>
          )}

          {isCorporateAgent && (
            <>
              <Route path="/ride-booker" element={<RideBooker />} />
              <Route
                path="/agent-ride-booker"
                element={<CorporateAgentRideBooker />}
              />
              <Route path="/ride-details/:tripId" element={<RideDetails />} />
              <Route
                path="/future-ride-details/:tripId"
                element={<FutureRideDetails />}
              />
              <Route
                path="/past-ride-details/:tripId"
                element={<PastRideDetails />}
              />
              <Route path="/ride-booking" element={<RideBooking />} />
              <Route path="/agent/today-rides" element={<TodayRides />} />
              <Route path="/agent/future-rides" element={<FutureRides />} />
              <Route path="/agent/past-rides" element={<PastRides />} />
            </>
          )}

          <Route
            path="*"
            element={
              isCorporateCustomer ? (
                <Navigate to="/" replace />
              ) : isCorporateAgent ? (
                <Navigate to="/agent/today-rides" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

const App = () => (
  <LoadScript
    googleMapsApiKey={GOOGLE_MAPS_API_KEY}
    libraries={["places", "geometry", "drawing"]}
  >
    <LanguageProvider>
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={3000} />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  </LoadScript>
);

export default App;
