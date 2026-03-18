import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { api_url, corporate_customer_my_bookings } from "../constants/constant";
import { toast } from "react-toastify";
import HelpModal from "./HelpModal";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";

const CorporateAgentRideBooker = () => {
  const { user, appSettings } = useAuth();
  const navigate = useNavigate();

  const [dateFilter, setDateFilter] = useState("all");
  const [groupFilter, setGroupFilter] = useState("all");
  const [rides, setRides] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ridesPerPage = 5;
  const { t } = useTranslation();
  const { language } = useLanguage();

  const handleTripClick = (tripId, rideData) => {
    localStorage.setItem("selectedTrip", JSON.stringify(rideData));
    navigate(`/ride-details/${tripId}`);
  };

  // Handle Book Ride
  const handleBookRideClick = () => {
    if (user?.user_type === "corporate_agent") {
      navigate("/ride-booking");
    } else {
      window.location.href = "/ridebooker_login";
    }
  };

  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    if (s?.includes("complete"))
      return "bg-green-100 text-green-800 border-green-200";
    if (s?.includes("active") || s?.includes("ongoing"))
      return "bg-blue-100 text-blue-800 border-blue-200";
    if (s?.includes("schedule"))
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    if (s?.includes("cancel")) return "bg-red-100 text-red-800 border-red-200";
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  const openHelpModal = () => {
    setShowHelpModal(true);
  };
  const closeHelpModal = () => {
    setShowHelpModal(false);
  };

  //agent
  const fetchRides = async () => {
    if (!user?.id) return;
    setLoading(true);

    try {
      const res = await axios.post(
        `${api_url}${corporate_customer_my_bookings}`,
        {
          corporate_customer_id: user.id,
          filter: 1,
          lang: language,
          date_filter:
            dateFilter === "today"
              ? "today"
              : dateFilter === "week"
                ? "this_week"
                : dateFilter === "month"
                  ? "this_month"
                  : "all",
          group_id: groupFilter === "all" ? "" : groupFilter,
        },
      );

      if (res.data.status === 1) {
        const ridesData = res.data.result || [];
        setRides(ridesData);
        setGroups(res.data.groups || []);
        setCurrentPage(1);
      } else {
        setRides([]);
        setGroups([]);
        toast.error(res.data.message || t("failed_to_fetch_rides"));
      }
    } catch (err) {
      setRides([]);
      setGroups([]);
      toast.error(t("error_fetching_rides_please_try_again"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRides();
  }, [dateFilter, groupFilter]);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const countByStatus = (status) =>
    rides.filter((ride) =>
      ride.status_name?.toLowerCase().includes(status.toLowerCase()),
    ).length;

  const indexOfLastRide = currentPage * ridesPerPage;
  const indexOfFirstRide = indexOfLastRide - ridesPerPage;
  const currentRides = useMemo(
    () => rides.slice(indexOfFirstRide, indexOfLastRide),
    [rides, indexOfFirstRide, indexOfLastRide],
  );
  const totalPages = Math.ceil(rides.length / ridesPerPage);

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const exportToExcel = () => {
    const wsData = rides.map((ride) => ({
      "Trip ID": ride.trip_id,
      Customer: ride.agent_name,
      Phone: ride.agent_phone_number,
      Driver: ride.driver_name,
      Type: ride.trip_type,
      Pickup: ride.pickup_address,
      Drop: ride.drop_address,
      OTP: ride.otp,
      Date: formatDate(ride.pickup_date),
      Status: ride.status_name,
      Fare: `${appSettings?.default_currency_symbol || ""}${ride.total}`,
      Group: ride.group_name || "",
    }));

    const ws = XLSX.utils.json_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Corporate Agent Rides");
    XLSX.writeFile(wb, "Corporate_Agent_Rides.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Corporate Agent Rides Report", 14, 15);

    const tableColumn = [
      "Trip ID",
      "Customer",
      "Phone",
      "Driver",
      "Type",
      "Pickup",
      "Drop",
      "OTP",
      "Date",
      "Status",
      "Fare",
    ];

    const tableRows = rides.map((ride) => [
      ride.trip_id,
      ride.agent_name,
      ride.agent_phone_number,
      ride.driver_name,
      ride.trip_type,
      ride.pickup_address,
      ride.drop_address,
      ride.otp,
      formatDate(ride.pickup_date),
      ride.status_name,
      `${appSettings?.default_currency_symbol || ""}${ride.total}`,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      margin: { top: 20 },
    });
    doc.save("Corporate_Agent_Rides.pdf");
  };

  return (
    <div className="flex-1 space-y-4 md:space-y-6 p-3 sm:p-4 md:p-6 mt-2 md:mt-6 lg:mt-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
            Hydromobility EV Corporate Agent {t("ride_central")}
          </h1>
          <p className="text-gray-600 mt-1 text-xs sm:text-sm md:text-base">
            {t("book_and_manage_rides_for_customers")}
          </p>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={openHelpModal}
            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors active:scale-95 w-full sm:w-auto text-xs sm:text-sm cursor-pointer"
          >
            <i className="fas fa-question-circle text-xs sm:text-sm"></i>
            <span className="text-xs sm:text-sm">{t("need_help")}</span>
          </button>

          <button
            onClick={handleBookRideClick}
            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-[#1EC51D] text-white rounded-md hover:bg-[#17a517] transition-colors active:scale-95 w-full sm:w-auto text-xs sm:text-sm cursor-pointer"
          >
            <i className="fas fa-plus text-xs sm:text-sm"></i>
            <span className="text-xs sm:text-sm">{t("book_a_ride")}</span>
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-3 sm:p-4 md:p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 items-start lg:items-center justify-between">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              {t("booked_rides")}
            </h2>
            <div className="flex flex-wrap gap-2 w-full lg:w-auto items-center">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full sm:w-auto h-9 sm:h-10 pl-3 pr-8 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1EC51D] bg-white appearance-none"
              >
                <option value="all">{t("all_time")}</option>
                <option value="today">{t("today")}</option>
                <option value="week">{t("this_week")}</option>
                <option value="month">{t("this_month")}</option>
              </select>

              {/* Group filter */}
              <select
                value={groupFilter}
                onChange={(e) => setGroupFilter(e.target.value)}
                className="w-full sm:w-auto h-9 sm:h-10 pl-3 pr-8 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1EC51D] bg-white appearance-none"
              >
                <option value="all">{t("all_groups")}</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>

              <button
                onClick={exportToExcel}
                className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-md hover:border-[#1EC51D] cursor-pointer"
                title="Export to Excel"
              >
                <i className="fas fa-file-excel text-green-600 text-xs sm:text-sm"></i>
              </button>
              <button
                onClick={exportToPDF}
                className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-md hover:border-[#1EC51D] cursor-pointer"
                title="Export to PDF"
              >
                <i className="fas fa-file-pdf text-red-600 text-xs sm:text-sm"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="p-3 sm:p-4 md:p-6">
          {/* Summary */}
          <div className="mb-3 flex justify-between text-xs sm:text-sm text-gray-600 flex-wrap gap-2">
            <p>
              {t("total")}: {rides.length} {t("booked_rides")}
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                {t("completed")}: {countByStatus("Completed")}
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                {t("active")}: {countByStatus("Active")}
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                {t("scheduled")}: {countByStatus("Scheduled")}
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                {t("cancelled")}: {countByStatus("Cancel")}
              </span>
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <div className="text-center py-10 text-gray-500">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
              <p className="mt-2">{t("loading")}...</p>
            </div>
          ) : rides.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <i className="fas fa-car text-4xl mb-3"></i>
              <p className="text-lg">{t("no_booked_rides_found")}</p>
              <p className="text-sm text-gray-500 mt-1">
                {t("try_changing_your_filters_or_book_a_new_ride")}
              </p>
            </div>
          ) : (
            <>
              <div className="rounded-md border border-gray-200 overflow-hidden">
                <div className="hidden lg:block max-h-[60vh] overflow-y-auto">
                  <table className="w-full min-w-[700px]">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          {t("trip_id")}
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          {t("customer_name")}
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          {t("phone_number")}
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          {t("driver")}
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          {t("fare")}
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          {t("type")}
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          {t("pickup")}
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          {t("drop")}
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          {t("otp")}
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          {t("date")}
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          {t("status")}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {currentRides.map((ride) => (
                        <tr key={ride.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <button
                              onClick={() =>
                                handleTripClick(ride.trip_id, ride)
                              }
                              className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium cursor-pointer transition-colors duration-200"
                              title="Click to view details"
                            >
                              {ride.trip_id}
                            </button>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {ride.agent_name}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {ride.agent_phone_number}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {ride.driver_name || "-"}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium">
                            {appSettings?.default_currency_symbol}
                            {ride.total}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {ride.trip_type}
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-600 max-w-xs truncate">
                            {ride.pickup_address}
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-600 max-w-xs truncate">
                            {ride.drop_address}
                          </td>
                          <td className="px-4 py-3 text-xs font-mono">
                            {ride.otp || "-"}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {formatDate(ride.pickup_date)}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                ride.status_name,
                              )}`}
                            >
                              {ride.status_name}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden space-y-2 p-2">
                  {currentRides.map((ride) => (
                    <div
                      key={ride.id}
                      className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                      onClick={() => handleTripClick(ride.trip_id, ride)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTripClick(ride.trip_id, ride);
                            }}
                            className="text-sm font-semibold text-blue-600 hover:text-blue-800 text-left"
                          >
                            {ride.trip_id}
                          </button>
                          <p className="text-xs text-gray-500 mt-1">
                            {ride.agent_name}
                          </p>
                        </div>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            ride.status_name,
                          )}`}
                        >
                          {ride.status_name}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">
                        <span className="font-medium">Pickup:</span>{" "}
                        {ride.pickup_address}
                      </p>
                      <p className="text-xs text-gray-600">
                        <span className="font-medium">Drop:</span>{" "}
                        {ride.drop_address}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <div>
                          <p className="text-xs text-gray-500">
                            {formatDate(ride.pickup_date)}
                          </p>
                          {ride.driver_name && (
                            <p className="text-xs text-gray-500 mt-1">
                              <span className="font-medium">Driver:</span>{" "}
                              {ride.driver_name}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-medium">
                            {appSettings?.default_currency_symbol}
                            {ride.total}
                          </p>
                          {ride.otp && (
                            <p className="text-xs font-mono text-gray-500 mt-1">
                              OTP: {ride.otp}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white rounded-lg border border-gray-200 p-3 sm:p-4 mt-3">
                <p className="text-xs sm:text-sm text-gray-600">
                  {t("showing")}{" "}
                  <span className="font-medium">
                    {(currentPage - 1) * ridesPerPage + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(currentPage * ridesPerPage, rides.length)}
                  </span>{" "}
                  {t("of")} <span className="font-medium">{rides.length}</span>{" "}
                  {t("results")}
                </p>

                <div className="flex items-center gap-1">
                  <button
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-xs active:scale-95 cursor-pointer"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 flex items-center justify-center rounded-md text-xs font-medium cursor-pointer ${
                        currentPage === i + 1
                          ? "bg-[#1EC51D] text-white"
                          : "border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-xs active:scale-95 cursor-pointer"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </>
          )}
          {/* Help Modal */}
          <HelpModal isOpen={showHelpModal} onClose={closeHelpModal} />
        </div>
      </div>
    </div>
  );
};

export default CorporateAgentRideBooker;
