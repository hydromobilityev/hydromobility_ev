import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RideBookingRedirect = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = user?.role || user?.user_type;

    if (userRole === "corporate_agent") {
      navigate("/ride-booking");
    } else if (userRole === "corporate_customer") {
      const width = 500;
      const height = 600;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      window.open(
        "/ridebooker_login",
        "_blank",
        `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`,
      );

      setTimeout(() => {
        navigate(-1);
      }, 100);
    } else {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default RideBookingRedirect;
