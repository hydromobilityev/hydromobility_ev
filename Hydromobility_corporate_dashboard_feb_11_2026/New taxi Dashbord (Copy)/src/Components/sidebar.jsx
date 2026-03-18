import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logoIcon from "../assets/logos/Fab-icon logo.webp";
import { useAuth } from "../context/AuthContext";
import { api_url, customer_get_about, img_url } from "../constants/constant";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";

const iconMap = {
  Home: "fas fa-home",
  Car: "fas fa-car",
  List: "fas fa-list",
  CalendarPlus: "fas fa-calendar-plus",
  Users: "fas fa-users",
  UsersRound: "fas fa-user-group",
  FileText: "fas fa-file-alt",
  CreditCard: "fas fa-credit-card",
  Settings: "fas fa-cog",
  User: "fas fa-user",
  UserTie: "fas fa-user-tie",
  Building: "fas fa-building",
  ChartLine: "fas fa-chart-line",
  CarSide: "fas fa-car-side",
  FileInvoice: "fas fa-file-invoice-dollar",
  TachometerAlt: "fas fa-tachometer-alt",
  CalendarCheck: "fas fa-calendar-check",
  ChevronRight: "fas fa-chevron-right",
  Bars: "fas fa-bars",
  Times: "fas fa-times",
  Briefcase: "fas fa-briefcase",
  Cogs: "fas fa-cogs",
  History: "fas fa-history",
  MoneyBillWave: "fas fa-money-bill-wave",
  ChartBar: "fas fa-chart-bar",
  UserShield: "fas fa-user-shield",
  IdCard: "fas fa-id-card",
  Dashboard: "fas fa-tachometer-alt",
  BookRide: "fas fa-calendar-plus",
  AgentDashboard: "fas fa-tachometer-alt",
  CalendarDay: "fas fa-calendar-day",
  Calendar: "fas fa-calendar",
  CalendarAlt: "fas fa-calendar-alt",
  Clock: "fas fa-clock",
  Phone: "fas fa-phone",
  Envelope: "fas fa-envelope",
  Headset: "fas fa-headset",
  LifeRing: "fas fa-life-ring",
  Comments: "fas fa-comments",
};

export function AppSidebar({ collapsed, setCollapsed, isMobile, onClose }) {
  const [openSections, setOpenSections] = useState({});
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [supportData, setSupportData] = useState(null);
  const [loadingSupportData, setLoadingSupportData] = useState(false);
  const [supportError, setSupportError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isCorporateCustomer, isCorporateAgent } = useAuth();
  const { t } = useTranslation();
  const { language } = useLanguage();

  useEffect(() => {
    if (showSupportModal) {
      fetchSupportData();
    }
  }, [showSupportModal, language]);

  const fetchSupportData = async () => {
    setLoadingSupportData(true);
    setSupportError(null);

    try {
      const langParam = language;

      const formData = new FormData();
      formData.append("lang", langParam);

      const response = await fetch(`${api_url}${customer_get_about}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.status === 1) {
        setSupportData(data.result);
      } else {
        setSupportError(data.message || "Failed to load support information");
        setSupportData({
          phone_number: "+21624978684",
          email: "tunisianlahnina@gmail.com",
          address: "Bardo tunisia",
          app_version: "1.0",
          about_us:
            language === "ar"
              ? "يمكنك الآن الحصول على تطبيق متقدم لحجز سيارات الأجرة لنظامي Android و iOS. يعمل التطبيق في الوقت الفعلي ويحتوي على ميزة الدفع عبر الهاتف المحمول المتكاملة التي تضمن إمكانية دفع رسوم السائقين المسجلين تلقائيًا. هناك نوعان من تطبيقات الهاتف المحمول التي تأتي مع تطبيق Taxi Booking"
              : "You can now get an advanced taxi booking application for both Android and iOS. The app works in real-time and contains an integrated mobile payment feature that ensures the ability to automatically pay the fees of registered drivers. There are two types of mobile applications that come with the Taxi Booking app",
        });
      }
    } catch (error) {
      setSupportError(
        "Unable to connect to support server. Please try again later.",
      );
      setSupportData({
        phone_number: "+21624978684",
        email: "tunisianlahnina@gmail.com",
        address: "Bardo tunisia",
        app_version: "1.0",
        about_us:
          language === "ar"
            ? "يمكنك الآن الحصول على تطبيق متقدم لحجز سيارات الأجرة لنظامي Android و iOS. يعمل التطبيق في الوقت الفعلي ويحتوي على ميزة الدفع عبر الهاتف المحمول المتكاملة التي تضمن إمكانية دفع رسوم السائقين المسجلين تلقائيًا. هناك نوعان من تطبيقات الهاتف المحمول التي تأتي مع تطبيق Taxi Booking"
            : "You can now get an advanced taxi booking application for both Android and iOS. The app works in real-time and contains an integrated mobile payment feature that ensures the ability to automatically pay the fees of registered drivers. There are two types of mobile applications that come with the Taxi Booking app",
      });
    } finally {
      setLoadingSupportData(false);
    }
  };

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);

    const userType = user?.user_type;
    if (userType === "corporate_agent") {
      localStorage.removeItem("ride_booker_token");
      localStorage.removeItem("ride_booker_data");
      navigate("/ridebooker_login");
    } else {
      navigate("/login");
    }
  };

  const getTranslatedMenu = () => {
    const translations = {
      dashboard: t("dashboard") || "Dashboard",
      rideManagement: t("ride_management") || "Ride Management",
      hydroEVRides: t("hydromobility_ev_rides") || "",
      hydroEVCentral:
        t("hydromobility_ev_central") || "",
      teamManagement: t("team_management") || "",
      people: t("people") || "People",
      groupsDepartments: t("groups_departments") || "",
      policies: t("policies") || "Policies",
      company: t("company") || "Company",
      billing: t("billing") || "Billing",
      settings: t("settings") || "Settings",
      myProfile: t("my_profile") || "My Profile",
      support: t("support") || "Support",
      bookNewRide: t("book_new_ride") || "Book New Ride",
      myRides: t("my_rides") || "My Rides",
      todaysRides: t("today_rides") || "Today's Rides",
      futureRides: t("future_rides") || "Future Rides",
      pastRides: t("past_rides") || "Past Rides",
      account: t("account") || "Account",
      profile: t("profile") || "Profile",
    };

    return translations;
  };

  const corporateCustomerNavigation = [
    {
      title: getTranslatedMenu().dashboard,
      url: "/corporate-dashboard",
      icon: "Dashboard",
      section: null,
    },
    {
      section: getTranslatedMenu().rideManagement,
      items: [
        {
          title: getTranslatedMenu().hydroEVRides,
          url: "/rides",
          icon: "List",
        },
        {
          title: getTranslatedMenu().hydroEVCentral,
          url: "/ride-booker",
          icon: "CalendarPlus",
        },
      ],
    },
    {
      section: getTranslatedMenu().teamManagement,
      items: [
        {
          title: getTranslatedMenu().people,
          url: "/people",
          icon: "Users",
        },
        {
          title: getTranslatedMenu().groupsDepartments,
          url: "/groups",
          icon: "UsersRound",
        },
        {
          title: getTranslatedMenu().policies,
          url: "/policies",
          icon: "FileText",
        },
      ],
    },
    {
      section: getTranslatedMenu().company,
      items: [
        {
          title: getTranslatedMenu().billing,
          url: "/billing",
          icon: "CreditCard",
        },
        {
          title: getTranslatedMenu().settings,
          url: "/settings",
          icon: "Settings",
        },
      ],
    },
    {
      title: getTranslatedMenu().support,
      url: "#",
      icon: "Headset",
      section: null,
      isSupport: true,
    },
  ];

  const corporateAgentNavigation = [
    {
      title: getTranslatedMenu().bookNewRide,
      url: "/ride-booking",
      icon: "CalendarPlus",
      section: null,
      highlight: true,
    },
    {
      section: getTranslatedMenu().myRides,
      items: [
        {
          title: getTranslatedMenu().todaysRides,
          url: "/agent/today-rides",
          icon: "CalendarDay",
        },
        {
          title: getTranslatedMenu().futureRides,
          url: "/agent/future-rides",
          icon: "Calendar",
        },
        {
          title: getTranslatedMenu().pastRides,
          url: "/agent/past-rides",
          icon: "History",
        },
      ],
    },
  ];

  const getNavigation = () => {
    if (isCorporateCustomer) {
      return corporateCustomerNavigation;
    } else if (isCorporateAgent) {
      return corporateAgentNavigation;
    }
    return [];
  };

  const filteredNavigation = getNavigation();

  useEffect(() => {
    const initialOpenState = {};
    filteredNavigation.forEach((item) => {
      if (item.section) {
        initialOpenState[item.section] = true;
      }
    });
    setOpenSections(initialOpenState);
  }, [user]);

  useEffect(() => {
    if (isMobile) setCollapsed(true);
  }, [location, isMobile]);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const isSectionActive = (sectionItems) => {
    return (
      sectionItems?.some((item) => location.pathname === item.url) || false
    );
  };

  const handleSidebarClick = () => {
    if (isMobile) onClose?.();
  };

  const handleSupportClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowSupportModal(true);
  };

  const getUserDisplayInfo = () => {
    if (isCorporateAgent) {
      return {
        name:
          `${user?.first_name || ""} ${user?.last_name || ""}`.trim() ||
          "Agent",
        email: user?.email || "agent@company.com",
        role: "Corporate Agent",
        avatarColor: "bg-green-100 text-green-600",
        bgColor: "bg-green-50",
        textColor: "text-green-600",
        borderColor: "border-green-200",
        icon: "fas fa-user-tie",
        logoutText: "Logout (Agent Portal)",
        portalType: "Agent Portal",
        phone_number: user?.phone_number || "",
      };
    } else {
      return {
        name:
          `${user?.first_name || ""} ${user?.last_name || ""}`.trim() || "User",
        email: user?.email || "user@company.com",
        role: "Corporate Manager",
        avatarColor: "bg-green-100 text-green-600",
        bgColor: "bg-green-50",
        textColor: "text-green-600",
        borderColor: "border-green-200",
        icon: "fas fa-user",
        logoutText: "Logout (Corporate Portal)",
        portalType: "Corporate Portal",
        phone_number: user?.phone_number || "",
      };
    }
  };

  const userInfo = getUserDisplayInfo();

  const getPortalName = () => {
    if (isCorporateAgent) {
      return "Hydromobility EV Ride Booker";
    }
    return "Hydromobility EV";
  };

  const handleEmailClick = (email) => {
    if (!email) return;
    const subject = `Support Request - ${getPortalName()}`;
    const body = `Hello Support Team,\n\nI need assistance with:\n\nUser: ${
      userInfo.name
    }\nEmail: ${user?.email}\nPhone: ${
      user?.phone_number || "Not provided"
    }\n\nIssue Description:\n`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  const handlePhoneClick = (phone) => {
    if (!phone) return;
    window.location.href = `tel:${phone.replace(/\D/g, "")}`;
  };

  const handleSupportModalClose = () => {
    setShowSupportModal(false);
  };

  const sidebarClasses = `
    bg-white border-r border-gray-200 flex flex-col h-screen transition-all duration-300
    ${
      isMobile
        ? `fixed left-0 top-0 z-50 ${
            collapsed ? "-translate-x-full" : "translate-x-0"
          }`
        : `relative ${collapsed ? "w-16" : "w-64"}`
    }
  `;

  const overlayClasses = `
    fixed inset-0 bg-black/20 z-40 transition-opacity duration-300
    ${isMobile && !collapsed ? "opacity-100" : "opacity-0 pointer-events-none"}
  `;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && <div className={overlayClasses} onClick={onClose} />}

      {/* Sidebar */}
      <div className={sidebarClasses}>
        {/* Header */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => !isMobile && setCollapsed(!collapsed)}
                className="cursor-pointer"
              >
                <img
                  src={logoIcon}
                  alt=""
                  className="h-8 w-12 object-cover"
                />
              </button>
              {(!collapsed || isMobile) && (
                <div>
                  <span className="text-lg font-semibold text-gray-900 block">
                    {getPortalName()}
                  </span>
                </div>
              )}
            </div>
            {isMobile && (
              <button
                onClick={onClose}
                className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-gray-100 cursor-pointer"
              >
                <i className={`${iconMap.Times} text-gray-500`}></i>
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div
          className="flex-1 overflow-y-auto p-2"
          onClick={handleSidebarClick}
        >
          <nav className="space-y-1">
            {filteredNavigation.map((item, index) => {
              if (item.section) {
                const isActive = isSectionActive(item.items);
                const activeClass = isCorporateAgent
                  ? "bg-green-50 text-green-600"
                  : "bg-green-50 text-green-600";

                return (
                  <div key={index} className="mb-2">
                    <div className="px-2 py-1">
                      <button
                        onClick={() => toggleSection(item.section)}
                        className={`w-full flex items-center justify-between p-2 rounded-md transition-colors cursor-pointer ${
                          isActive
                            ? `${activeClass} cursor-pointer`
                            : "text-gray-700 hover:bg-gray-100 cursor-pointer"
                        }`}
                      >
                        {(!collapsed || isMobile) && (
                          <span className="text-xs font-semibold uppercase tracking-wider">
                            {item.section}
                          </span>
                        )}
                        <i
                          className={`${
                            iconMap.ChevronRight
                          } ml-auto transition-transform duration-200 cursor-pointer ${
                            openSections[item.section] ? "rotate-90" : ""
                          }`}
                        ></i>
                      </button>
                    </div>

                    {openSections[item.section] && (
                      <div className="mt-1 space-y-1 ml-1">
                        {item.items.map((subItem) => {
                          if (subItem.isSupport) {
                            return (
                              <button
                                key={subItem.title}
                                onClick={handleSupportClick}
                                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors w-full text-left text-gray-700 hover:bg-gray-100 cursor-pointer"
                              >
                                <i
                                  className={`${
                                    iconMap[subItem.icon]
                                  } w-4 text-center`}
                                ></i>
                                {(!collapsed || isMobile) && (
                                  <span className="truncate">
                                    {subItem.title}
                                  </span>
                                )}
                              </button>
                            );
                          }

                          return (
                            <NavLink
                              key={subItem.title}
                              to={subItem.url}
                              className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                                  isActive
                                    ? `${userInfo.bgColor} ${userInfo.textColor} border-r-2 ${userInfo.borderColor} font-medium`
                                    : "text-gray-700 hover:bg-gray-100"
                                }`
                              }
                            >
                              <i
                                className={`${
                                  iconMap[subItem.icon]
                                } w-4 text-center`}
                              ></i>
                              {(!collapsed || isMobile) && (
                                <span className="truncate">
                                  {subItem.title}
                                </span>
                              )}
                            </NavLink>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              if (item.highlight && isCorporateAgent) {
                return (
                  <NavLink
                    key={item.title}
                    to={item.url}
                    end
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-3 rounded-md text-sm transition-colors mb-2 mx-2 ${
                        isActive
                          ? "bg-green-600 text-white border-r-2 border-green-700 font-medium shadow-sm"
                          : "bg-green-500 text-white hover:bg-green-600 shadow-sm"
                      }`
                    }
                  >
                    <i className={`${iconMap[item.icon]} w-4 text-center`}></i>
                    {(!collapsed || isMobile) && (
                      <span className="font-semibold">{item.title}</span>
                    )}
                  </NavLink>
                );
              }

              if (item.isSupport) {
                return (
                  <button
                    key={item.title}
                    onClick={handleSupportClick}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors w-full text-left text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    <i className={`${iconMap[item.icon]} w-4 text-center`}></i>
                    {(!collapsed || isMobile) && <span>{item.title}</span>}
                  </button>
                );
              }

              return (
                <NavLink
                  key={item.title}
                  to={item.url}
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                      isActive
                        ? `${userInfo.bgColor} ${userInfo.textColor} border-r-2 ${userInfo.borderColor} font-medium`
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  <i className={`${iconMap[item.icon]} w-4 text-center`}></i>
                  {(!collapsed || isMobile) && <span>{item.title}</span>}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer / User Profile & Logout */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div
              className={`h-10 w-10 rounded-full overflow-hidden flex items-center justify-center ${userInfo.avatarColor}`}
            >
              {user?.profile_picture ? (
                <img
                  src={`${img_url}${user.profile_picture}`}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-lg font-semibold">
                  <i className={userInfo.icon}></i>
                </span>
              )}
            </div>
            {(!collapsed || isMobile) && (
              <div className="flex flex-col overflow-hidden flex-1">
                <span className="text-sm font-medium text-gray-900 truncate">
                  {userInfo.name}
                </span>
                <span className="text-xs text-gray-400 truncate">
                  {userInfo.email}
                </span>
                <span className="text-xs text-gray-400 truncate">
                  {userInfo.phone_number}
                </span>
              </div>
            )}

            {/* Logout Button */}
            <button
              onClick={() => setShowLogoutModal(true)}
              className="ml-auto p-2 rounded-md hover:bg-gray-100 cursor-pointer"
              title={userInfo.logoutText}
            >
              <i className="fas fa-sign-out-alt text-gray-500 hover:text-red-500"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Support Modal with API Data */}
      {showSupportModal && (
        <>
          <div
            className="fixed inset-0 bg-black/20 z-50 transition-opacity duration-300"
            onClick={handleSupportModalClose}
          ></div>

          <div className="fixed bottom-4 right-4 z-50 max-w-md w-[calc(100vw-2rem)] sm:w-96">
            <div className="bg-white rounded-lg shadow-2xl border border-gray-200 animate-slide-up">
              {/* Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-white">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <i className="fas fa-headset text-blue-600"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {t("support_center")}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t("get_help_with")} {getPortalName()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleSupportModalClose}
                  className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  <i className="fas fa-times text-gray-500"></i>
                </button>
              </div>

              {/* Content */}
              <div className="p-4 max-h-[60vh] overflow-y-auto">
                {loadingSupportData ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
                    <p className="text-gray-600 text-sm">
                      {t("loading_support_information")}...
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {t("language")}: {language.toUpperCase()}
                    </p>
                  </div>
                ) : supportError ? (
                  <div className="py-4 text-center">
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
                      <i className="fas fa-exclamation-triangle text-red-600"></i>
                    </div>
                    <p className="text-red-600 text-sm mb-2">{supportError}</p>
                    <button
                      onClick={fetchSupportData}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200 cursor-pointer"
                    >
                      {t("retry")}
                    </button>
                  </div>
                ) : supportData ? (
                  <div className="space-y-4">
                    {/* Company Contact Information from API */}
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-3">
                        <i className="fas fa-building text-blue-500"></i>
                        <h4 className="font-semibold text-gray-900 text-sm">
                          Company Contact
                        </h4>
                      </div>

                      {/* Phone */}
                      <div
                        className="flex items-center gap-3 mb-3 p-2 rounded-md bg-white hover:bg-blue-100 transition-colors cursor-pointer group"
                        onClick={() =>
                          handlePhoneClick(supportData.phone_number)
                        }
                      >
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                          <i className="fas fa-phone text-green-600 text-xs"></i>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500">
                            {t("phone_support")}
                          </p>
                          <p className="text-sm font-medium text-green-700">
                            {supportData.phone_number}
                          </p>
                        </div>
                        <i className="fas fa-external-link-alt text-gray-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity"></i>
                      </div>

                      {/* Email */}
                      <div
                        className="flex items-center gap-3 mb-3 p-2 rounded-md bg-white hover:bg-blue-100 transition-colors cursor-pointer group"
                        onClick={() => handleEmailClick(supportData.email)}
                      >
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <i className="fas fa-envelope text-blue-600 text-xs"></i>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500">
                            {t("email_support")}
                          </p>
                          <p className="text-sm font-medium text-blue-700 truncate">
                            {supportData.email}
                          </p>
                        </div>
                        <i className="fas fa-external-link-alt text-gray-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity"></i>
                      </div>

                      {/* Address */}
                      <div className="flex items-start gap-3 p-2 rounded-md">
                        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
                          <i className="fas fa-map-marker-alt text-gray-600 text-xs"></i>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500">
                            {t("address")}
                          </p>
                          <p className="text-sm font-medium text-gray-800">
                            {supportData.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-gray-200 bg-gray-50 rounded-b-lg flex gap-2">
                <button
                  onClick={handleSupportModalClose}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer text-xs font-medium"
                >
                  {t("close")}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowLogoutModal(false)}
          ></div>

          <div className="relative bg-white rounded-lg p-6 w-80 text-center z-10 shadow-xl">
            <div className="mb-4">
              <i className="fas fa-sign-out-alt text-3xl text-red-500 mb-3"></i>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t("confirm_logout")}
              </h3>
              <p className="text-sm text-gray-600">
                {t("are_you_sure_you_want_to_logout_from")}{" "}
                {userInfo.portalType}?
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {isCorporateAgent
                  ? "You will be redirected to ride booker login page"
                  : "You will be redirected to corporate login page"}
              </p>
            </div>

            <div className="flex justify-center gap-3">
              <button
                className="px-5 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors cursor-pointer"
                onClick={() => setShowLogoutModal(false)}
              >
                {t("cancel")}
              </button>
              <button
                className="px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors cursor-pointer"
                onClick={handleLogout}
              >
                {t("yes_logout")}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

export default AppSidebar;
