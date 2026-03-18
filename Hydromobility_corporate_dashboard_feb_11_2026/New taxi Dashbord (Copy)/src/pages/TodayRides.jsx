import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast } from "react-toastify";
import {
  api_url,
  corporate_customer_today_bookings,
  corporate_trip_cancel,
} from "../constants/constant";

const TodayRides = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [cancellingTripId, setCancellingTripId] = useState(null);
  const ridesPerPage = 10;
  const { t } = useTranslation();
  const { language } = useLanguage();

  useEffect(() => {
    fetchTodayRides();
  }, []);

  const fetchTodayRides = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!user || !user.id) {
        throw new Error("User not authenticated");
      }

      const response = await fetch(
        `${api_url}${corporate_customer_today_bookings}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            corporate_customer_id: user.id,
            lang: language,
            filter: "1",
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === 1) {
        setRides(data.result || []);
      } else {
        setError(data.message || "Failed to fetch rides");
      }
    } catch (err) {
      setError(err.message || "Failed to load rides. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const cancelTrip = async (tripId) => {
    try {
      setCancellingTripId(tripId);

      const response = await axios.post(
        `${api_url}${corporate_trip_cancel}`,
        {
          trip_id: tripId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        },
      );

      if (response.data.status === 1) {
        toast.success(
          response.data.message || t("trip_cancelled_successfully"),
        );

        setRides((prevRides) =>
          prevRides.map((ride) =>
            ride.trip_id === tripId
              ? {
                  ...ride,
                  status: 6,
                  status_name: "Cancelled By Customer",
                }
              : ride,
          ),
        );
      } else {
        toast.error(response.data.message || "Failed to cancel trip");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          t("failed_to_cancel_trip_please_try_again"),
      );
    } finally {
      setCancellingTripId(null);
    }
  };

  const getStatusColor = (statusId) => {
    switch (statusId) {
      case 1:
        return "bg-blue-50 text-blue-700 border border-blue-200";
      case 2:
        return "bg-purple-50 text-purple-700 border border-purple-200";
      case 3:
        return "bg-indigo-50 text-indigo-700 border border-indigo-200";
      case 4:
        return "bg-green-50 text-green-700 border border-green-200";
      case 5:
        return "bg-emerald-50 text-emerald-700 border border-emerald-200";
      case 6:
        return "bg-red-50 text-red-700 border border-red-200";
      case 7:
        return "bg-orange-50 text-orange-700 border border-orange-200";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  const getStatusIcon = (statusId) => {
    switch (statusId) {
      case 1:
        return "fa-check text-blue-500";
      case 2:
        return "fa-map-marker-alt text-purple-500";
      case 3:
        return "fa-play-circle text-indigo-500";
      case 4:
        return "fa-flag-checkered text-green-500";
      case 5:
        return "fa-check-circle text-emerald-500";
      case 6:
        return "fa-user-times text-red-500";
      case 7:
        return "fa-user-slash text-orange-500";
      default:
        return "fa-clock text-gray-500";
    }
  };

  const filteredRides = useMemo(() => {
    return rides.filter((ride) => {
      if (filterStatus === "all") return true;
      if (filterStatus === "active") return [1, 2, 3, 4].includes(ride.status);
      if (filterStatus === "completed") return ride.status === 5;
      if (filterStatus === "cancelled") return [6, 7].includes(ride.status);
      return ride.status === parseInt(filterStatus);
    });
  }, [rides, filterStatus]);

  const indexOfLastRide = currentPage * ridesPerPage;
  const indexOfFirstRide = indexOfLastRide - ridesPerPage;
  const currentRides = filteredRides.slice(indexOfFirstRide, indexOfLastRide);
  const totalPages = Math.ceil(filteredRides.length / ridesPerPage);

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return dateString;
    }
  };

  const handleTripClick = (tripId, rideData) => {
    localStorage.setItem("selectedTrip", JSON.stringify(rideData));
    navigate(`/ride-details/${tripId}`);
  };

  const handleRefresh = () => {
    fetchTodayRides();
    setCurrentPage(1);
  };

  const handleCallDriver = (phoneNumber, e) => {
    e.stopPropagation();
    if (phoneNumber) {
      window.open(`tel:${phoneNumber}`, "_blank");
    }
  };

  const handleCopyRideDetails = (ride, e) => {
    e.stopPropagation();

    const rideDetails = ` Ride Details
 Trip ID: ${ride.trip_id}
 Customer Name: ${ride.agent_name || "N/A"}
 Phone: ${ride.agent_phone_number || "N/A"}
 Driver: ${ride.driver_name || "Not assigned"}
 Vehicle: ${ride.vehicle_type} ${
   ride.vehicle_name ? `(${ride.vehicle_name})` : ""
 }
 Pickup: ${ride.pickup_address}
 Drop: ${ride.drop_address}
 Time: ${formatDate(ride.pickup_date)}
 Status: ${ride.status_name}
 OTP: ${ride.otp || "N/A"}
 Payment: ${ride.payment || "N/A"}
 Fare: $${ride.total || "0"}
`;

    navigator.clipboard
      .writeText(rideDetails)
      .then(() => {
        alert("✓ Ride details copied to clipboard!");
      })
      .catch((err) => {});
  };

  const handleCancelRide = async (rideId, tripId, rideStatus, e) => {
    e.stopPropagation();

    if (![1, 2, 3].includes(rideStatus)) {
      toast.info(`${t("cannot_cancel_ride_current_status")}: ${rideStatus}`);
      return;
    }

    if (window.confirm(`Are you sure you want to cancel ride ${tripId}?`)) {
      await cancelTrip(tripId);
    }
  };

  const ActionButtons = ({ ride }) => {
    const isCancelling = cancellingTripId === ride.trip_id;

    return (
      <div
        className="flex items-center gap-1"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={(e) => handleCopyRideDetails(ride, e)}
          className="px-2 py-1 text-blue-600 hover:bg-blue-50 rounded transition-colors text-sm disabled:opacity-50"
          title={t("copy_ride_details")}
          disabled={isCancelling}
        >
          <i className="fas fa-copy"></i>
        </button>

        {[1, 2, 3].includes(ride.status) && (
          <button
            onClick={(e) =>
              handleCancelRide(ride.id, ride.trip_id, ride.status, e)
            }
            className="px-2 py-1 text-red-600 hover:bg-red-50 rounded transition-colors text-sm disabled:opacity-50"
            title={t("cancel_ride")}
            disabled={isCancelling}
          >
            {isCancelling ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              <i className="fas fa-times"></i>
            )}
          </button>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        <p className="mt-4 text-gray-600">{t("loading_today_rides")}...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {t("today_rides")}
            </h1>
            <p className="text-gray-600 mt-1">
              {t("manage_all_rides_scheduled_for_today")}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-500">
              {t("showing")} {filteredRides.length} {t("rides")}
            </div>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center gap-2"
            >
              <i className="fas fa-sync-alt"></i>
              {t("refresh")}
            </button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("filter_rides")}
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setFilterStatus("all");
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    filterStatus === "all"
                      ? "bg-gray-800 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {t("all_rides")}
                </button>
                <button
                  onClick={() => {
                    setFilterStatus("active");
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    filterStatus === "active"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {t("active")}
                </button>
                <button
                  onClick={() => {
                    setFilterStatus("completed");
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    filterStatus === "completed"
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {t("completed")}
                </button>
                <button
                  onClick={() => {
                    setFilterStatus("cancelled");
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    filterStatus === "cancelled"
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {t("cancelled")}
                </button>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {filteredRides.length} {t("rides_found")}
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        {error ? (
          <div className="p-8 text-center">
            <div className="inline-flex items-center gap-3 bg-red-50 border border-red-200 rounded-md p-4">
              <i className="fas fa-exclamation-circle text-red-500 text-xl"></i>
              <div className="text-left">
                <h3 className="font-medium text-red-800">
                  {t("error_loading_rides")}
                </h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
                <button
                  onClick={handleRefresh}
                  className="mt-3 text-sm font-medium text-red-800 hover:text-red-900 flex items-center gap-2"
                >
                  <i className="fas fa-sync-alt"></i>
                  {t("try_again")}
                </button>
              </div>
            </div>
          </div>
        ) : filteredRides.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t("trip_details")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t("customer_info")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t("driver_vehicle")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t("date_time")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t("status")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t("actions")}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentRides.map((ride) => (
                    <tr
                      key={ride.id}
                      className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                      onClick={() => handleTripClick(ride.trip_id, ride)}
                    >
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="font-mono font-semibold text-gray-900">
                              #{ride.trip_id}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-start gap-2">
                              <i className="fas fa-map-marker-alt text-green-600 text-sm mt-0.5"></i>
                              <div className="text-sm text-gray-600">
                                {ride.pickup_address}
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <i className="fas fa-flag-checkered text-red-600 text-sm mt-0.5"></i>
                              <div className="text-sm text-gray-600">
                                {ride.drop_address}
                              </div>
                            </div>
                          </div>
                          {ride.customer_name && (
                            <div className="text-xs text-gray-500 mt-1">
                              <i className="fas fa-user mr-1"></i>
                              {ride.customer_name}
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="font-medium text-gray-900">
                            {ride.agent_name || "N/A"}
                          </div>
                          <div className="text-sm text-gray-600">
                            {ride.agent_phone_number || "No phone"}
                          </div>
                          <div className="text-xs text-gray-500">
                            <i className="fas fa-credit-card mr-1"></i>
                            {ride.payment || "N/A"}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="font-medium text-gray-900">
                            {ride.driver_name || "Not assigned"}
                          </div>
                          <div className="text-sm text-gray-600">
                            {ride.vehicle_type}
                            {ride.vehicle_name && ` • ${ride.vehicle_name}`}
                          </div>
                          {ride.vehicle_number && (
                            <div className="text-xs text-gray-500 font-mono">
                              {ride.vehicle_number}
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-gray-900">
                            {formatDate(ride.pickup_date)}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1.5 inline-flex items-center gap-2 text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                              ride.status,
                            )}`}
                          >
                            <i
                              className={`fas ${getStatusIcon(ride.status)}`}
                            ></i>
                            {ride.status_name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <ActionButtons ride={ride} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border-t border-gray-200 px-6 py-4">
                <div className="text-sm text-gray-700">
                  {t("showing")}
                  <span className="font-medium">
                    {filteredRides.length === 0
                      ? 0
                      : (currentPage - 1) * ridesPerPage + 1}
                  </span>{" "}
                  {t("to")}{" "}
                  <span className="font-medium">
                    {Math.min(currentPage * ridesPerPage, filteredRides.length)}
                  </span>{" "}
                  {t("of")}{" "}
                  <span className="font-medium">{filteredRides.length}</span>{" "}
                  {t("results")}
                </div>

                <div className="flex items-center gap-1">
                  {/* Previous Button */}
                  <button
                    onClick={() => changePage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                    }`}
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>

                  {/* Page Numbers */}
                  {(() => {
                    const pages = [];
                    const maxVisiblePages = 5;
                    let startPage = Math.max(1, currentPage - 2);
                    let endPage = Math.min(totalPages, currentPage + 2);

                    if (endPage - startPage + 1 < maxVisiblePages) {
                      if (startPage === 1) {
                        endPage = Math.min(
                          totalPages,
                          startPage + maxVisiblePages - 1,
                        );
                      } else if (endPage === totalPages) {
                        startPage = Math.max(1, endPage - maxVisiblePages + 1);
                      }
                    }

                    // First page
                    if (startPage > 1) {
                      pages.push(
                        <button
                          key={1}
                          onClick={() => changePage(1)}
                          className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                            1 === currentPage
                              ? "bg-gray-800 text-white"
                              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                          }`}
                        >
                          1
                        </button>,
                      );
                      if (startPage > 2) {
                        pages.push(
                          <span
                            key="dots1"
                            className="px-2 py-1.5 text-gray-500"
                          >
                            ...
                          </span>,
                        );
                      }
                    }

                    // Middle pages
                    for (let i = startPage; i <= endPage; i++) {
                      pages.push(
                        <button
                          key={i}
                          onClick={() => changePage(i)}
                          className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                            i === currentPage
                              ? "bg-gray-800 text-white"
                              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                          }`}
                        >
                          {i}
                        </button>,
                      );
                    }

                    // Last page
                    if (endPage < totalPages) {
                      if (endPage < totalPages - 1) {
                        pages.push(
                          <span
                            key="dots2"
                            className="px-2 py-1.5 text-gray-500"
                          >
                            ...
                          </span>,
                        );
                      }
                      pages.push(
                        <button
                          key={totalPages}
                          onClick={() => changePage(totalPages)}
                          className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                            totalPages === currentPage
                              ? "bg-gray-800 text-white"
                              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                          }`}
                        >
                          {totalPages}
                        </button>,
                      );
                    }

                    return pages;
                  })()}

                  {/* Next Button */}
                  <button
                    onClick={() => changePage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                    }`}
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700">
                    {t("rows_per_page")}:
                  </span>
                  <select
                    value={ridesPerPage}
                    onChange={(e) => {
                      const newPerPage = parseInt(e.target.value);

                      setCurrentPage(1);
                    }}
                    className="text-sm border border-gray-300 rounded-md px-2 py-1.5 bg-white"
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-300 mb-4">
              <i className="fas fa-car text-6xl"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {t("no_rides_found")}
            </h3>
            <p className="text-gray-500 mb-4">
              {t("no_rides_match_your_current_filter_criteria")}
            </p>
            <button
              onClick={() => {
                setFilterStatus("all");
                setCurrentPage(1);
              }}
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors"
            >
              {t("clear_filters")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodayRides;
