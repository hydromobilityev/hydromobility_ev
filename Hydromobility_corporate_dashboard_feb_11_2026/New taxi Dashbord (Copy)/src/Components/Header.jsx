import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Header = ({ sidebarCollapsed, toggleSidebar, isMobileSidebarOpen }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user, isCorporateCustomer, isCorporateAgent } = useAuth();

  const notifications = [
    {
      id: 1,
      title: "New ride booked",
      message: "John Doe booked a ride to Airport",
      time: "5 min ago",
      read: false,
      type: "ride",
    },
    {
      id: 2,
      title: "Payment received",
      message: "Payment of $25.50 received from Sarah Smith",
      time: "1 hour ago",
      read: false,
      type: "payment",
    },
    {
      id: 3,
      title: "System update",
      message: "System maintenance scheduled for tonight",
      time: "2 hours ago",
      read: true,
      type: "system",
    },
  ];

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case "ride":
        return "fas fa-car";
      case "payment":
        return "fas fa-credit-card";
      case "system":
        return "fas fa-cog";
      default:
        return "fas fa-bell";
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "ride":
        return "text-blue-500";
      case "payment":
        return "text-green-500";
      case "system":
        return "text-purple-500";
      default:
        return "text-gray-500";
    }
  };

  const getHeaderPosition = () => {
    if (isMobile) {
      return "left-0 right-0";
    }
    return sidebarCollapsed
      ? "lg:left-16 left-0 right-0"
      : "lg:left-64 left-0 right-0";
  };

  const getUserDisplayInfo = () => {
    if (isCorporateAgent) {
      return {
        role: "Corporate Agent",
        badgeColor: "bg-blue-100 text-blue-800",
        badgeIcon: "fas fa-user-tie",
        portalType: "Agent Portal",
      };
    } else if (isCorporateCustomer) {
      return {
        role: "Corporate Manager",
        badgeColor: "bg-green-100 text-green-800",
        badgeIcon: "fas fa-user",
        portalType: "Corporate Portal",
      };
    } else {
      return {
        role: "User",
        badgeColor: "bg-gray-100 text-gray-800",
        badgeIcon: "fas fa-user",
        portalType: "Portal",
      };
    }
  };

  const userInfo = getUserDisplayInfo();

  return (
    <>
      <header
        className={`fixed top-0 h-14 flex items-center justify-between border-b border-gray-200 px-4 bg-white shadow-sm transition-all duration-300 z-40 ${getHeaderPosition()}`}
      >
        {/* Left side  */}
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 transition-colors lg:flex hidden"
            aria-label="Toggle sidebar"
          >
            <i className="fas fa-bars text-gray-600 text-sm"></i>
          </button>

          {/* Mobile    */}
          <button
            onClick={toggleSidebar}
            className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 transition-colors lg:hidden"
            aria-label="Open menu"
          >
            <i className="fas fa-bars text-gray-600 text-sm"></i>
          </button>
        </div>

        <div className="flex items-center space-x-4"></div>
      </header>

      {/* Space for fixed header */}
      <div className="h-14"></div>
    </>
  );
};

export default Header;
