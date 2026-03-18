import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  api_url,
  corporate_agent_list,
  corporate_customer_get_corporate_booking,
} from "../constants/constant";
import { toast } from "react-toastify";
import HelpModal from "./HelpModal";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";

const RideBooker = () => {
  const { user, appSettings } = useAuth();

  const [dateFilter, setDateFilter] = useState("all");
  const [agentFilter, setAgentFilter] = useState("all");
  const [rides, setRides] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showTripModal, setShowTripModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [tripDetails, setTripDetails] = useState(null);
  const [tripLoading, setTripLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ridesPerPage = 5;
  const { t } = useTranslation();
  const { language } = useLanguage();

  const handleBookRideClick = () => {
    if (user?.user_type === "corporate_customer") {
      window.open("/ridebooker_login", "_blank", "noopener,noreferrer");
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

  // Fetch agents
  const fetchAgents = async () => {
    if (!user?.id) return;

    try {
      const response = await axios.post(`${api_url}${corporate_agent_list}`, {
        corporate_customer_id: user.id,
      });

      if (response.data.status === 1) {
        const mappedAgents = response.data.result.map((agent) => ({
          id: agent.id,
          name: agent.first_name,
          username: agent.username,
          phone: agent.phone_number,
          status: agent.status === 1 ? "active" : "inactive",
        }));
        setAgents(mappedAgents);
      }
    } catch (error) {
      toast.error(t("error_fetching_agents"));
    }
  };

  useEffect(() => {
    fetchAgents();
  }, [user?.id]);

  const fetchRides = async () => {
    if (!user?.id) return;
    setLoading(true);

    try {
      const res = await axios.post(
        `${api_url}${corporate_customer_get_corporate_booking}`,
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
        },
      );

      if (res.data.status === 1) {
        let ridesData = res.data.result || [];

        if (agentFilter !== "all") {
          ridesData = ridesData.filter(
            (ride) =>
              ride.ride_booker_name === agentFilter ||
              ride.agent_name === agentFilter,
          );
        }

        setRides(ridesData);
        setCurrentPage(1);
      } else {
        setRides([]);
        toast.error(res.data.message || t("failed_to_fetch_rides"));
      }
    } catch (err) {
      setRides([]);
      toast.error(t("error_fetching_rides_please_try_again"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRides();
  }, [dateFilter, agentFilter]);

  const fetchTripDetails = async (tripId, rideData) => {
    setTripLoading(true);
    setSelectedTrip(rideData);

    try {
      const baseDetails = {
        ...rideData,
        created_at: rideData.created_at || rideData.pickup_date,
        vehicle_type: rideData.vehicle_type || "",
        vehicle_number: rideData.vehicle_number || "",
        distance: rideData.distance,
        duration: rideData.duration || "",
        payment_method: rideData.payment_method || "",
        driver_phone: rideData.driver_phone || "",
      };

      setTripDetails(baseDetails);
    } catch (err) {
      toast.error(t("network_error_loading_trip_details"));
    } finally {
      setTripLoading(false);
      setShowTripModal(true);
    }
  };

  const handleRowClick = (ride) => {
    fetchTripDetails(ride.trip_id, ride);
  };

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

  const exportToExcel = () => {
    const wsData = rides.map((ride) => ({
      "Trip ID": ride.trip_id,
      "Ride Booker": ride.ride_booker_name,
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
    }));

    const ws = XLSX.utils.json_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Corporate Customer Rides");
    XLSX.writeFile(wb, "Corporate_Customer_Rides.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Corporate Customer Rides Report", 14, 15);

    const tableColumn = [
      "Trip ID",
      "Ride Booker",
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
      ride.ride_booker_name || "",
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
    doc.save("Corporate_Customer_Rides.pdf");
  };

  const closeTripModal = () => {
    setShowTripModal(false);
    setSelectedTrip(null);
    setTripDetails(null);
  };

  return (
    <>
      {/* Main Content */}
      <div className="flex-1 space-y-4 md:space-y-6 p-3 sm:p-4 md:p-6 mt-2 md:mt-6 lg:mt-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
              Hydromobility EV {t("corporate_customer")} {t("ride_central")}
            </h1>
            <p className="text-gray-600 mt-1 text-xs sm:text-sm md:text-base">
              {t("view_and_manage_your_booked_rides")}
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

                <select
                  value={agentFilter}
                  onChange={(e) => setAgentFilter(e.target.value)}
                  className="w-full sm:w-auto h-9 sm:h-10 pl-3 pr-8 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1EC51D] bg-white appearance-none"
                >
                  <option value="all">All Ride Bookers</option>
                  {agents.map((agent) => (
                    <option key={agent.id} value={agent.name}>
                      {agent.name}
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

          {/* Table  */}
          <div className="p-3 sm:p-4 md:p-6">
            {/* Summary */}
            <div className="mb-3 flex justify-between text-xs sm:text-sm text-gray-600 flex-wrap gap-2">
              <p>
                {t("total")}: {rides.length} {t("booked_rides")}
              </p>
              {agentFilter !== "all" && (
                <p className="text-green-600 font-medium">
                  Filtered by: {agentFilter}
                </p>
              )}
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
                  Try changing your filters or book a new ride
                </p>
              </div>
            ) : (
              <>
                <div className="rounded-md border border-gray-200 overflow-hidden">
                  <div className="hidden lg:block max-h-[60vh] overflow-y-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            {t("trip_id")}
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            {t("ride_booker")}
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
                          <tr
                            key={ride.id}
                            className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                            onClick={() => handleRowClick(ride)}
                          >
                            <td className="px-4 py-3">
                              <span className="text-sm font-medium text-blue-600">
                                {ride.trip_id}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {ride.ride_booker_name || "-"}
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
                            <td className="px-4 py-5 text-xs text-gray-600 max-w-xs truncate">
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
                        onClick={() => handleRowClick(ride)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="text-sm font-semibold text-blue-600">
                              {ride.trip_id}
                            </span>
                            <p className="text-xs text-gray-500 mt-1">
                              {ride.agent_name}
                            </p>
                            {ride.ride_booker_name && (
                              <p className="text-xs text-gray-500">
                                <span className="font-medium">Booked by:</span>{" "}
                                {ride.ride_booker_name}
                              </p>
                            )}
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
                    {t("of")}{" "}
                    <span className="font-medium">{rides.length}</span>{" "}
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
            {/* Help Modal Component */}
            <HelpModal isOpen={showHelpModal} onClose={closeHelpModal} />
          </div>
        </div>
      </div>

      {/* Trip Details  */}
      {showTripModal && (
        <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 transition-opacity pointer-events-auto"
            onClick={closeTripModal}
          ></div>

          {/* Modal Panel */}
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-auto">
            <div className="w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl">
                {/* Header */}
                <div className="bg-gray-50 px-4 py-6 sm:px-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-medium text-gray-900">
                        {t("trip_details")}
                      </h2>
                      {tripDetails && (
                        <p className="text-sm text-gray-600 mt-1">
                          <span className="font-medium">{t("trip_id")}:</span>{" "}
                          {tripDetails.trip_id}
                        </p>
                      )}
                      {tripDetails && (
                        <p className="text-sm text-gray-600 mt-1">
                          <span className="font-medium">{t("payment")}:</span>{" "}
                          {tripDetails.payment}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
                      onClick={closeTripModal}
                    >
                      <span className="sr-only">{t("close")}</span>
                      <i className="fas fa-times h-6 w-6"></i>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  {tripLoading ? (
                    <div className="flex items-center justify-center py-10">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                      <span className="ml-3 text-gray-600">
                        {t("loading_details")}...
                      </span>
                    </div>
                  ) : tripDetails ? (
                    <div className="space-y-6">
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {t("status")}
                            </p>
                            <span
                              className={`inline-flex items-center px-2 py-1 mt-1 rounded-full text-xs font-medium border ${getStatusColor(
                                tripDetails.status_name,
                              )}`}
                            >
                              {tripDetails.status_name}
                            </span>
                          </div>

                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">
                              {t("distance")}
                            </p>
                            <p className="text-xl font-bold text-green-600">
                              {tripDetails.distance} km
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">
                              {t("total_fare")}
                            </p>
                            <p className="text-xl font-bold text-green-600">
                              {appSettings?.default_currency_symbol}
                              {tripDetails.total}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Customer Information */}
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-3">
                          {t("customer_information")}
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-gray-500">
                              {t("customer_name")}
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              {tripDetails.agent_name}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">
                              {t("phone_number")}
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              {tripDetails.agent_phone_number}
                            </p>
                          </div>
                          {tripDetails.ride_booker_name && (
                            <div>
                              <p className="text-xs text-gray-500">
                                {t("ride_booker")}
                              </p>
                              <p className="text-sm font-medium text-gray-900">
                                {tripDetails.ride_booker_name}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Ride Information */}
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-3">
                          {t("ride_information")}
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-gray-500">
                              {t("trip_type")}
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              {tripDetails.trip_type}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">{t("date")}</p>
                            <p className="text-sm font-medium text-gray-900">
                              {formatDate(tripDetails.pickup_date)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Locations */}
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-3">
                          {t("locations")}
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>
                            <div className="ml-3 flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                {t("pickup_location")}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">
                                {tripDetails.pickup_address}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            </div>
                            <div className="ml-3 flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                {t("drop_location")}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">
                                {tripDetails.drop_address}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Driver Information */}
                      {tripDetails.driver_name && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-3">
                            {t("driver_information")}
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-gray-500">
                                {t("driver_name")}
                              </p>
                              <p className="text-sm font-medium text-gray-900">
                                {tripDetails.driver_name}
                              </p>
                            </div>
                            {tripDetails.vehicle_type && (
                              <div>
                                <p className="text-xs text-gray-500">
                                  {t("vehicle_type")}
                                </p>
                                <p className="text-sm font-medium text-gray-900">
                                  {tripDetails.vehicle_type}
                                </p>
                              </div>
                            )}
                            {tripDetails.vehicle_number && (
                              <div>
                                <p className="text-xs text-gray-500">
                                  {t("vehicle_number")}
                                </p>
                                <p className="text-sm font-medium text-gray-900">
                                  {tripDetails.vehicle_number}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-10 text-gray-500">
                      <i className="fas fa-exclamation-circle text-3xl mb-3 text-gray-400"></i>
                      <p className="text-gray-600">
                        {t("no_trip_details_available")}
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      onClick={closeTripModal}
                    >
                      {t("close")}
                    </button>
                    {tripDetails?.driver_phone && (
                      <a
                        href={`tel:${tripDetails.driver_phone}`}
                        className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      >
                        <i className="fas fa-phone-alt mr-2"></i>
                        {t("call_driver")}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RideBooker;
