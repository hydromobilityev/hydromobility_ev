import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import {
  api_url,
  corporate_customer_bookings_list,
} from "../constants/constant";
import { toast } from "react-toastify";
import HelpModal from "./HelpModal";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";

const Rides = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [groupsFilter, setGroupsFilter] = useState("all-groups");
  const [ridesData, setRidesData] = useState([]);
  const [groups, setGroups] = useState([]);
  const { user, appSettings } = useAuth();
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { t } = useTranslation();
  const { language } = useLanguage();

  const openHelpModal = () => {
    setShowHelpModal(true);
  };
  const closeHelpModal = () => {
    setShowHelpModal(false);
  };

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const corporateId =
          user.user_type === "corporate_agent"
            ? user.corporate_customer_id
            : user.user_type === "corporate_customer"
              ? user.id
              : null;

        if (!corporateId) return;

        const payload = {
          corporate_customer_id: user.id,
          filter: 1,
          lang: language,
          date_filter: dateFilter,
          group_id: groupsFilter === "all-groups" ? "" : groupsFilter,
        };

        const response = await axios.post(
          `${api_url}${corporate_customer_bookings_list}`,
          payload,
        );

        if (response.data.status === 1) {
          setRidesData(response.data.result || []);
          setGroups(response.data.groups || []);
          setCurrentPage(1);
        }
      } catch (error) {
        toast.error(t("error_fetching_rides_please_try_again"));
      }
    };

    fetchRides();
  }, [dateFilter, groupsFilter, user]);

  const getStatusColor = (status_name) => {
    const s = status_name?.toLowerCase();
    if (s?.includes("completed"))
      return "bg-green-100 text-green-800 border-green-200";
    if (
      s === "accepted" ||
      s === "active" ||
      s === "started" ||
      s === "scheduled"
    )
      return "bg-blue-100 text-blue-800 border-blue-200";
    if (s?.includes("cancelled"))
      return "bg-red-100 text-red-800 border-red-200";
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  const filteredRides = ridesData.filter(
    (ride) =>
      ride.trip_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ride.customer_name &&
        ride.customer_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (ride.driver_name &&
        ride.driver_name.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const totalPages = Math.ceil(filteredRides.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRides = filteredRides.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const exportToExcel = () => {
    const data = filteredRides.map((ride) => ({
      "Ride ID": ride.trip_id,
      Rider: ride.customer_name,
      Driver: ride.driver_name,
      Date: ride.pickup_date.split(" ")[0],
      Distance: ride.distance || "0 km",
      Fare: ride.total,
      Status: ride.status_name,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rides");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "Rides.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Ride ID",
      "Rider",
      "Driver",
      "Date",
      "Distance",
      "Fare",
      "Status",
    ];
    const tableRows = filteredRides.map((ride) => [
      ride.trip_id,
      ride.customer_name,
      ride.driver_name,
      ride.pickup_date.split(" ")[0],
      ride.distance || "0 km",
      ride.total,
      ride.status_name,
    ]);

    autoTable(doc, { head: [tableColumn], body: tableRows, startY: 20 });
    doc.text("Rides Report", 14, 15);
    doc.save("Rides.pdf");
  };

  return (
    <div className="flex-1 space-y-4 md:space-y-6 p-3 sm:p-4 md:p-6 mt-2 md:mt-6 lg:mt-4">
      {/* Header */}

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
            Hydromobility EV {t("corporate_rides")}
          </h1>
          <p className="text-gray-600 mt-1 text-xs sm:text-sm md:text-base">
            {t("manage_and_track_all_ride_activities")}
          </p>
        </div>
        <button
          onClick={openHelpModal}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D] active:scale-95 text-xs sm:text-sm cursor-pointer"
        >
          <i className="fas fa-question-circle text-xs sm:text-sm"></i>
          <span className="text-xs sm:text-sm">{t("need_help")}</span>
        </button>
      </div>
      {/* Main Card */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        {/* Card Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 items-start lg:items-center justify-between">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              {t("all_rides")}
            </h2>
            <div className="flex flex-wrap gap-2 w-full lg:w-auto">
              {/* Date Filter */}
              <div className="relative flex-1 sm:flex-none min-w-[140px]">
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full h-9 sm:h-10 pl-3 pr-8 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D] appearance-none bg-white"
                >
                  <option value="all">{t("all_time")}</option>
                  <option value="today">{t("Leo")}</option>
                  <option value="this_week">{t("this_week")}</option>
                  <option value="this_month">{t("this_month")}</option>
                </select>
              </div>

              {/* Groups Filter */}
              <div className="relative flex-1 sm:flex-none min-w-[140px]">
                <select
                  value={groupsFilter}
                  onChange={(e) => setGroupsFilter(e.target.value)}
                  className="w-full h-9 sm:h-10 px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
                >
                  <option value="all-groups">{t("all_groups")}</option>
                  {groups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.group_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Export Buttons */}
              <div className="flex gap-1 sm:gap-2">
                <button
                  onClick={exportToExcel}
                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 transition-colors hover:border-[#1EC51D] active:scale-95 cursor-pointer"
                  title="Export to Excel"
                >
                  <i className="fas fa-file-excel text-green-600 text-xs sm:text-sm"></i>
                </button>
                <button
                  onClick={exportToPDF}
                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 transition-colors hover:border-[#1EC51D] active:scale-95 cursor-pointer"
                  title="Export to PDF"
                >
                  <i className="fas fa-file-pdf text-red-600 text-xs sm:text-sm"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mt-3 sm:mt-4">
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs sm:text-sm"></i>
            <input
              type="text"
              placeholder="Search rides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
            />
          </div>
        </div>

        {/* Card Content */}
        <div className="p-3 sm:p-4 md:p-6">
          {/* Summary */}
          <div className="mb-3 sm:mb-4 flex flex-1 justify-between xs:flex-row xs:items-center xs:justify-between gap-2">
            <p className="text-xs sm:text-sm text-gray-600">
              {t("total")}: {filteredRides.length} {t("rides")}
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                {t("completed")}:{" "}
                {
                  filteredRides.filter((ride) =>
                    ride.status_name.toLowerCase().includes("completed"),
                  ).length
                }
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                {t("active")}:{" "}
                {
                  filteredRides.filter((ride) =>
                    ["accepted", "active", "started", "scheduled"].includes(
                      ride.status_name.toLowerCase(),
                    ),
                  ).length
                }
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                {t("cancelled")}:{" "}
                {
                  filteredRides.filter((ride) =>
                    ride.status_name.toLowerCase().includes("cancelled"),
                  ).length
                }
              </span>
            </div>
          </div>

          {/* Table - Desktop & Mobile */}
          <div className="rounded-md border border-gray-200 overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden lg:block max-h-[60vh] overflow-y-auto">
              <table className="w-full min-w-[700px]">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    {[
                      t("ride_id"),
                      t("rider"),
                      t("driver"),
                      t("date"),
                      t("distance"),
                      t("fare"),
                      t("status"),
                    ].map((th) => (
                      <th
                        key={th}
                        className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {th}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedRides.map((ride) => (
                    <tr
                      key={ride.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 md:px-6 py-3 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                        {ride.trip_id}
                      </td>
                      <td className="px-4 md:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                        {ride.customer_name}
                      </td>
                      <td className="px-4 md:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                        {ride.driver_name}
                      </td>
                      <td className="px-4 md:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                        {ride.pickup_date.split(" ")[0]}
                      </td>
                      <td className="px-4 md:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                        {ride.distance || "0 km"}
                      </td>
                      <td className="px-4 md:px-6 py-3 whitespace-nowrap text-xs sm:text-sm font-semibold text-[#1EC51D]">
                        {appSettings.default_currency_symbol}
                        {ride.total}
                      </td>
                      <td className="px-4 md:px-6 py-3 whitespace-nowrap">
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
              {paginatedRides.map((ride) => (
                <div
                  key={ride.id}
                  className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900">
                        {ride.trip_id}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {ride.pickup_date.split(" ")[0]}
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

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-gray-500">{t("rider")}</p>
                      <p className="font-medium text-gray-900 truncate">
                        {ride.customer_name}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">{t("driver")}</p>
                      <p className="font-medium text-gray-900 truncate">
                        {ride.driver_name}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">{t("distance")}</p>
                      <p className="font-medium text-gray-900">
                        {ride.distance || "0 km"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">{t("fare")}</p>
                      <p className="font-semibold text-[#1EC51D]">
                        {appSettings.default_currency_symbol}
                        {ride.total}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Empty State */}
          {filteredRides.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <i className="fas fa-search text-gray-300 text-3xl sm:text-4xl mb-3 sm:mb-4"></i>
              <p className="text-gray-500 text-sm sm:text-lg">
                {t("no_rides_found")}
              </p>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">
                {t("try_adjusting_your_search_criteria")}
              </p>
            </div>
          )}

          {/* Pagination */}
          {filteredRides.length > itemsPerPage && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white rounded-lg border border-gray-200 p-3 sm:p-4 mt-3">
              <p className="text-xs sm:text-sm text-gray-600">
                {t("showing")}{" "}
                <span className="font-medium">{startIndex + 1}</span> {t("to")}{" "}
                <span className="font-medium">
                  {Math.min(startIndex + itemsPerPage, filteredRides.length)}
                </span>{" "}
                {t("of")}{" "}
                <span className="font-medium">{filteredRides.length}</span>{" "}
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
          )}
        </div>
        {/* Help Modal Component */}
        <HelpModal isOpen={showHelpModal} onClose={closeHelpModal} />
      </div>
    </div>
  );
};

export default Rides;
