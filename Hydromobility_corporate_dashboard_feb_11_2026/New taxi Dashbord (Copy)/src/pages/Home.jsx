import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {
  api_url,
  corporate_customer_last_month_dashboard,
  driver_tutorials,
  img_url,
} from "../constants/constant";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext";

const Home = () => {
  const { user, appSettings } = useAuth();
  const { t } = useTranslation();
  const [tutorialCards, setTutorialCards] = useState([]);
  const [showTutorials, setShowTutorials] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);

  const [selectedPeriod, setSelectedPeriod] = useState("this_week");
  const [stats, setStats] = useState({
    total_rides: 0,
    total_distance: 0,
    total_spent: 0,
    period: "",
  });
  const [loadingStats, setLoadingStats] = useState(false);

  const handlePeriodChange = (period) => setSelectedPeriod(period);

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const response = await axios.post(`${api_url}${driver_tutorials}`, {
          lang: "en",
        });

        if (response.data.status === 1 && Array.isArray(response.data.result)) {
          const tutorials = response.data.result.map((tut) => ({
            id: tut.id,
            title: tut.title,
            description: tut.description,
            video: `${img_url}${tut.file}`,
            image: `${img_url}${tut.thumbnail_image}`,
          }));
          setTutorialCards(tutorials);
        } else {
        }
      } catch (error) {}
    };

    fetchTutorials();
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    const fetchStats = async () => {
      setLoadingStats(true);
      try {
        const response = await axios.post(
          `${api_url}${corporate_customer_last_month_dashboard}`,
          {
            corporate_customer_id: user.id,
            period: selectedPeriod,
            user_type:
              user.user_type === "corporate_agent" ? "corporate" : "customer",
          },
        );

        if (response.data.status === true) {
          setStats(response.data.result);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, [user?.id, user?.user_type, selectedPeriod]);

  return (
    <div className="min-h-full space-y-4 md:space-y-6 p-3 sm:p-4 md:p-6 mt-2 md:mt-6 lg:mt-4">
      {/* Header Section */}
      <div className="text-center sm:text-left">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
          {t("dashboard")}
        </h1>
        <p className="text-gray-600 mt-1 text-xs sm:text-sm md:text-base">
          {t("welcome_back_here_your_business_overview")}
        </p>
      </div>

      {/* Rides Summary Section */}
      <div className="space-y-3 md:space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
          <h2 className="text-base sm:text-lg md:text-xl font-medium text-gray-900">
            {t("ride_summary")}
          </h2>

          {/* Custom Select Dropdown */}
          <div className="relative w-full sm:w-40 md:w-48">
            <select
              value={selectedPeriod}
              onChange={(e) => handlePeriodChange(e.target.value)}
              className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]/10 appearance-none cursor-pointer"
            >
              <option value="this_week">{t("this_week")}</option>
              <option value="this_month">{t("this_month")}</option>
              <option value="this_quarter">{t("this_quarter")}</option>
              <option value="this_year">{t("this_year")}</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <i className="fas fa-chevron-down text-xs"></i>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {/* Total Spent Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs sm:text-sm font-medium text-gray-500">
                {t("total_spent")}
              </h3>
              <i className="fas fa-dollar-sign text-[#1EC51D] text-sm sm:text-base"></i>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900">
              {loadingStats
                ? "..."
                : `${appSettings?.default_currency_symbol}${stats.total_spent}`}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-green-600 font-medium">
                {loadingStats ? "..." : stats.period.split(" (")[0]}
              </span>
            </p>
          </div>

          {/* Total Rides Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs sm:text-sm font-medium text-gray-500">
                {t("total_rides")}
              </h3>
              <i className="fas fa-car text-[#1EC51D] text-sm sm:text-base"></i>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900">
              {loadingStats ? "..." : stats.total_rides}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-green-600 font-medium">
                {loadingStats ? "..." : stats.period.split(" (")[0]}
              </span>
            </p>
          </div>

          {/* Total Distance Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs sm:text-sm font-medium text-gray-500">
                {t("total_distance")}
              </h3>
              <i className="fas fa-map-marker-alt text-[#1EC51D] text-sm sm:text-base"></i>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900">
              {loadingStats ? "..." : `${stats.total_distance} km`}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-green-600 font-medium">
                {loadingStats ? "..." : stats.period.split(" (")[0]}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
