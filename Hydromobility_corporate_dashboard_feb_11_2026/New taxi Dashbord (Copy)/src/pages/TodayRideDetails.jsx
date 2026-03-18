import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  InfoWindow,
  Polyline,
} from "@react-google-maps/api";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaCar,
  FaCreditCard,
  FaUsers,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaMoneyBill,
  FaReceipt,
  FaIdCard,
  FaTruck,
  FaIndustry,
  FaPen,
  FaStickyNote,
} from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import {
  api_url,
  corporate_customer_today_by_trip,
  GOOGLE_MAPS_API_KEY,
} from "../constants/constant";

const RideDetails = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { user, appSettings } = useAuth();
  const { t } = useTranslation();

  const [rideDetails, setRideDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFetchingRoute, setIsFetchingRoute] = useState(false);
  const [routeDistance, setRouteDistance] = useState(null);
  const { language } = useLanguage();

  // Map states
  const [mapCenter, setMapCenter] = useState({ lat: 9.9252, lng: 78.1198 });
  const [mapZoom, setMapZoom] = useState(13);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Coordinates states
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropCoords, setDropCoords] = useState(null);
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropAddress, setDropAddress] = useState("");

  // Directions states
  const [directions, setDirections] = useState(null);
  const [showDirectLine, setShowDirectLine] = useState(false);

  // Marker
  const [showPickupInfo, setShowPickupInfo] = useState(true);
  const [showDropInfo, setShowDropInfo] = useState(true);

  const mapRef = useRef(null);
  const isCalculatingRouteRef = useRef(false);

  // Map container styles
  const mapContainerStyle = {
    width: "100%",
    height: "100%",
    minHeight: "500px",
  };

  const defaultMapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: true,
    fullscreenControl: true,
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "transit",
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }],
      },
    ],
  };

  const directPolylineOptions = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 4,
    geodesic: true,
    clickable: false,
  };

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places,geometry`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setMapLoaded(true);
      };
      script.onerror = () => {
        toast.error(
          "Failed to load Google Maps. Please check your internet connection.",
        );
      };
      document.head.appendChild(script);
    } else {
      setMapLoaded(true);
    }
  }, []);

  useEffect(() => {
    fetchRideDetailsFromAPI();
  }, [tripId, user]);

  const fetchRideDetailsFromAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${api_url}${corporate_customer_today_by_trip}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            corporate_customer_id: user?.id,
            trip_id: tripId,
            lang: language,
            filter: 1,
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();

        if (data.status === 1 && data.result && data.result.length > 0) {
          const tripData = data.result[0];
          setRideDetails(tripData);
          localStorage.setItem("selectedTrip", JSON.stringify(tripData));

          extractCoordinates(tripData);
        } else {
          toast.error(data.message || t("trip_not_found"));
          fetchFromLocalStorage();
        }
      } else {
        toast.error(t("failed_to_fetch_trip_details"));
        fetchFromLocalStorage();
      }
    } catch (error) {
      toast.error(t("network_error_loading_trip_details"));
      fetchFromLocalStorage();
    } finally {
      setLoading(false);
    }
  };

  const fetchFromLocalStorage = () => {
    try {
      const storedTrip = localStorage.getItem("selectedTrip");
      if (storedTrip) {
        const parsedTrip = JSON.parse(storedTrip);
        if (parsedTrip.trip_id === tripId || parsedTrip.id === tripId) {
          setRideDetails(parsedTrip);
          extractCoordinates(parsedTrip);
        } else {
          navigate("/corporate-agent/ride-booker");
        }
      } else {
        navigate("/corporate-agent/ride-booker");
      }
    } catch (err) {
      navigate("/corporate-agent/ride-booker");
    }
  };

  const extractCoordinates = (tripData) => {
    const parseCoordinate = (value) => {
      if (
        value === null ||
        value === undefined ||
        value === "" ||
        value === "0"
      ) {
        return null;
      }

      const num = parseFloat(value);
      if (!isNaN(num) && Math.abs(num) <= 180 && num !== 0) {
        return num;
      }
      return null;
    };

    const actualPickupLat = parseCoordinate(tripData.actual_pickup_lat);
    const actualPickupLng = parseCoordinate(tripData.actual_pickup_lng);
    const plannedPickupLat = parseCoordinate(tripData.pickup_lat);
    const plannedPickupLng = parseCoordinate(tripData.pickup_lng);

    const actualDropLat = parseCoordinate(tripData.actual_drop_lat);
    const actualDropLng = parseCoordinate(tripData.actual_drop_lng);
    const plannedDropLat = parseCoordinate(tripData.drop_lat);
    const plannedDropLng = parseCoordinate(tripData.drop_lng);

    const pickupLat =
      actualPickupLat !== null ? actualPickupLat : plannedPickupLat;
    const pickupLng =
      actualPickupLng !== null ? actualPickupLng : plannedPickupLng;

    const dropLat = actualDropLat !== null ? actualDropLat : plannedDropLat;
    const dropLng = actualDropLng !== null ? actualDropLng : plannedDropLng;

    // Set pickup coordinates
    if (pickupLat !== null && pickupLng !== null) {
      const pickup = { lat: pickupLat, lng: pickupLng };
      setPickupCoords(pickup);
      setPickupAddress(
        tripData.actual_pickup_address ||
          tripData.pickup_address ||
          "Pickup Location",
      );

      setMapCenter(pickup);
      console.log("✅ Set pickup coordinates:", pickup);
    } else {
      console.warn("⚠️ Invalid pickup coordinates - both lat and lng required");
      setPickupAddress(
        tripData.actual_pickup_address ||
          tripData.pickup_address ||
          "Pickup Location",
      );
    }

    if (dropLat !== null && dropLng !== null) {
      const drop = { lat: dropLat, lng: dropLng };
      setDropCoords(drop);
      setDropAddress(
        tripData.actual_drop_address ||
          tripData.drop_address ||
          "Drop Location",
      );
    } else {
      setDropAddress(
        tripData.actual_drop_address ||
          tripData.drop_address ||
          "Drop Location",
      );
    }

    if (
      pickupLat !== null &&
      pickupLng !== null &&
      dropLat !== null &&
      dropLng !== null
    ) {
      const isSameLocation = pickupLat === dropLat && pickupLng === dropLng;

      if (isSameLocation) {
        toast.warning("Pickup and drop locations appear to be the same");
        setShowDirectLine(true);

        setTimeout(() => {
          if (mapRef.current && pickupCoords) {
            mapRef.current.setCenter(pickupCoords);
            mapRef.current.setZoom(15);
          }
        }, 500);
      } else {
        setTimeout(() => {
          calculateRoute(pickupLat, pickupLng, dropLat, dropLng);
        }, 1000);
      }
    } else {
      if (pickupLat !== null && pickupLng !== null) {
        setTimeout(() => {
          if (mapRef.current) {
            const pickup = { lat: pickupLat, lng: pickupLng };
            mapRef.current.setCenter(pickup);
            mapRef.current.setZoom(15);
          }
        }, 500);
      }
    }
  };

  const calculateRoute = useCallback(
    (originLat, originLng, destLat, destLng) => {
      if (!window.google || !window.google.maps) {
        toast.error("Google Maps is still loading. Please wait...");
        return;
      }

      setIsFetchingRoute(true);
      isCalculatingRouteRef.current = true;

      const directionsService = new window.google.maps.DirectionsService();
      const origin = new window.google.maps.LatLng(originLat, originLng);
      const destination = new window.google.maps.LatLng(destLat, destLng);

      const request = {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: false,
      };

      directionsService.route(request, (response, status) => {
        setIsFetchingRoute(false);
        isCalculatingRouteRef.current = false;

        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(response);
          setShowDirectLine(false);

          if (
            response.routes &&
            response.routes[0] &&
            response.routes[0].legs &&
            response.routes[0].legs[0]
          ) {
            const distanceInMeters = response.routes[0].legs[0].distance.value;
            const distanceInKm = (distanceInMeters / 1000).toFixed(2);
            setRouteDistance(distanceInKm);
          }

          if (mapRef.current) {
            const bounds = new window.google.maps.LatLngBounds();
            const route = response.routes[0];

            route.legs.forEach((leg) => {
              bounds.extend(leg.start_location);
              bounds.extend(leg.end_location);
            });

            bounds.extend(origin);
            bounds.extend(destination);

            mapRef.current.fitBounds(bounds, { padding: 80 });
          }
        } else {
          setDirections(null);
          setShowDirectLine(true);

          if (status === window.google.maps.DirectionsStatus.ZERO_RESULTS) {
            toast.info(
              "No driving route found. Showing direct line between locations.",
            );

            if (mapRef.current && origin && destination) {
              const bounds = new window.google.maps.LatLngBounds();
              bounds.extend(origin);
              bounds.extend(destination);
              mapRef.current.fitBounds(bounds, { padding: 80 });
            }
          } else if (
            status === window.google.maps.DirectionsStatus.OVER_QUERY_LIMIT
          ) {
            toast.error(
              "Map service temporarily unavailable. Please try again later.",
            );
          } else {
            toast.warning(
              "Could not calculate route. Showing direct line between locations.",
            );

            if (mapRef.current && origin && destination) {
              const bounds = new window.google.maps.LatLngBounds();
              bounds.extend(origin);
              bounds.extend(destination);
              mapRef.current.fitBounds(bounds, { padding: 80 });
            }
          }
        }
      });
    },
    [],
  );

  const onMapLoad = useCallback(
    (map) => {
      mapRef.current = map;

      setTimeout(() => {
        if (pickupCoords && dropCoords && !directions && !showDirectLine) {
          fitBoundsToMarkers();
        }
      }, 1000);
    },
    [pickupCoords, dropCoords, directions, showDirectLine],
  );

  const fitBoundsToMarkers = () => {
    if (mapRef.current && pickupCoords && dropCoords) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(
        new window.google.maps.LatLng(pickupCoords.lat, pickupCoords.lng),
      );
      bounds.extend(
        new window.google.maps.LatLng(dropCoords.lat, dropCoords.lng),
      );
      mapRef.current.fitBounds(bounds, { padding: 100 });
    } else {
    }
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

  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    if (s?.includes("complete"))
      return "bg-green-100 text-green-800 border border-green-200";
    if (s?.includes("active") || s?.includes("ongoing"))
      return "bg-blue-100 text-blue-800 border border-blue-200";
    if (s?.includes("schedule"))
      return "bg-yellow-100 text-yellow-800 border border-yellow-200";
    if (s?.includes("cancel"))
      return "bg-red-100 text-red-800 border border-red-200";
    return "bg-gray-100 text-gray-800 border border-gray-200";
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (!lat1 || !lon1 || !lat2 || !lon2) return null;

    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1);
  };

  const displayDistance =
    routeDistance ||
    (pickupCoords?.lat && dropCoords?.lat
      ? calculateDistance(
          pickupCoords.lat,
          pickupCoords.lng,
          dropCoords.lat,
          dropCoords.lng,
        )
      : rideDetails?.distance || null);

  const getDirectPath = () => {
    if (pickupCoords && dropCoords) {
      return [
        { lat: pickupCoords.lat, lng: pickupCoords.lng },
        { lat: dropCoords.lat, lng: dropCoords.lng },
      ];
    }
    return [];
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t("loading")}...</p>
        </div>
      </div>
    );
  }

  if (!rideDetails) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <div className="text-4xl text-yellow-500 mb-4">⚠️</div>
          <p className="text-lg text-gray-700 mb-2">
            {t("trip_details_not_available")}
          </p>
          <button
            onClick={() => navigate("/agent/today-rides")}
            className="px-4 py-2 bg-[#1EC51D] text-white rounded-md hover:bg-[#17a517] transition-colors flex items-center gap-2"
          >
            <FaArrowLeft /> {t("back_to_rides")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/agent/today-rides")}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <FaArrowLeft /> {t("back_to_rides")}
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {t("trip_details")}:{" "}
              <span className="text-blue-600">
                {rideDetails.trip_id || rideDetails.id}
              </span>
            </h1>
            <div className="flex items-center gap-4 mt-2">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  rideDetails.status_name || rideDetails.status,
                )}`}
              >
                {rideDetails.status_name || rideDetails.status || "Unknown"}
              </span>
              <span className="text-gray-600 text-sm flex items-center gap-2">
                <FaCalendarAlt />{" "}
                {formatDate(rideDetails.pickup_date || rideDetails.created_at)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Trip Details */}
        <div className="space-y-6">
          {/* Basic Trip Info Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FaReceipt /> {t("trip_information")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem
                label={t("trip_id")}
                value={rideDetails.trip_id || rideDetails.id}
                icon={<FaIdCard className="text-blue-600" />}
              />
              <InfoItem
                label={t("trip_type")}
                value={rideDetails.trip_type || rideDetails.type || "-"}
                icon={<FaCar className="text-green-600" />}
              />
              <InfoItem
                label={t("vehicle_type")}
                value={
                  rideDetails.vehicle_type_name ||
                  rideDetails.vehicle_type ||
                  "-"
                }
                icon={<FaTruck className="text-purple-600" />}
              />
              <InfoItem
                label={t("company_name")}
                value={rideDetails.company_name || "-"}
                icon={<FaIndustry className="text-blue-400" />}
              />
              <InfoItem
                label={t("customer_note")}
                value={rideDetails.customer_note || "-"}
                icon={<FaStickyNote className="text-indigo-400" />}
              />
              <InfoItem
                label={t("driver_note")}
                value={rideDetails.driver_note || "-"}
                icon={<FaPen className="text-red-600" />}
              />
              <InfoItem
                label={t("payment_mode")}
                value={rideDetails.payment || "-"}
                icon={<FaCreditCard className="text-yellow-600" />}
              />
              <InfoItem
                label={t("status")}
                value={rideDetails.status_name || rideDetails.status || "-"}
                icon={<FaUsers className="text-indigo-600" />}
              />
            </div>
          </div>

          {/* Customer & Driver Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaUser /> {t("customer_details")}
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">{t("name")}</p>
                  <p className="text-lg font-medium text-gray-900">
                    {rideDetails.agent_name ||
                      rideDetails.customer_name ||
                      rideDetails.user_name ||
                      "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t("phone_number")}</p>
                  <p className="text-lg font-medium text-gray-900 flex items-center gap-2">
                    <FaPhone />{" "}
                    {rideDetails.agent_phone_number ||
                      rideDetails.phone ||
                      rideDetails.customer_phone ||
                      "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Driver Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaUser /> {t("driver_details")}
              </h2>
              {rideDetails.driver_name ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">{t("driver_name")}</p>
                    <p className="text-lg font-medium text-gray-900">
                      {rideDetails.driver_name}
                    </p>
                  </div>
                  {rideDetails.driver_phone && (
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("phone_number")}
                      </p>
                      <p className="text-lg font-medium text-gray-900 flex items-center gap-2">
                        <FaPhone /> {rideDetails.driver_phone}
                      </p>
                    </div>
                  )}
                  {rideDetails.vehicle_number && (
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("vehicle_details")}
                      </p>
                      <p className="text-sm text-gray-700">
                        {rideDetails.vehicle_number}
                        {rideDetails.vehicle_model &&
                          ` • ${rideDetails.vehicle_model}`}
                      </p>
                    </div>
                  )}
                  {rideDetails.brand && (
                    <div>
                      <p className="text-sm text-gray-500">{t("brand")}</p>
                      <p className="text-sm text-gray-700">
                        {rideDetails.brand}
                      </p>
                    </div>
                  )}
                  {rideDetails.color && (
                    <div>
                      <p className="text-sm text-gray-500">{t("color")}</p>
                      <p className="text-sm text-gray-700">
                        {rideDetails.color}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="text-4xl text-gray-400 mb-3">👨‍✈️</div>
                  <p className="text-gray-600">
                    {t("driver_not_assigned_yet")}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Location Details */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FaMapMarkerAlt /> {t("location_details")}
            </h2>
            <div className="space-y-6">
              {/* Pickup Location */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">
                    {t("pickup_location")}
                  </h3>
                  <p className="text-gray-600">{pickupAddress}</p>
                  {pickupCoords?.lat ? (
                    <p className="text-xs text-gray-500 mt-1">
                      Coordinates: {pickupCoords.lat.toFixed(6)},{" "}
                      {pickupCoords.lng.toFixed(6)}
                    </p>
                  ) : (
                    <p className="text-xs text-yellow-500 mt-1">
                      Coordinates not available
                    </p>
                  )}
                </div>
              </div>

              {/* Drop Location */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">D</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">
                    {t("drop_location")}
                  </h3>
                  <p className="text-gray-600">{dropAddress}</p>
                  {dropCoords?.lat ? (
                    <p className="text-xs text-gray-500 mt-1">
                      Coordinates: {dropCoords.lat.toFixed(6)},{" "}
                      {dropCoords.lng.toFixed(6)}
                    </p>
                  ) : (
                    <p className="text-xs text-yellow-500 mt-1">
                      Coordinates not available
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Fare Details */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FaMoneyBill /> {t("fare_details")}
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">{t("subtotal")}</span>
                <span className="font-medium">
                  {appSettings?.default_currency_symbol || "₹"}
                  {rideDetails.sub_total || "0.00"}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">{t("tax")}</span>
                <span className="font-medium">
                  {appSettings?.default_currency_symbol || "₹"}
                  {rideDetails.tax || "0.00"}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">{t("discount")}</span>
                <span className="font-medium text-green-600">
                  -{appSettings?.default_currency_symbol || "₹"}
                  {rideDetails.discount || "0.00"}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 bg-green-50 rounded-md px-4 mt-2">
                <span className="font-semibold text-gray-900 text-lg">
                  {t("total_amount")}
                </span>
                <span className="text-2xl font-bold text-[#1EC51D]">
                  {appSettings?.default_currency_symbol || "₹"}
                  {rideDetails.total || rideDetails.total_fare || "0.00"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Map */}
        <div className="space-y-6">
          {/* Map Section */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden h-[600px]">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs text-gray-600">{t("pickup")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-xs text-gray-600">{t("drop")}</span>
                </div>
                {directions && (
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-1.5 bg-blue-600 rounded"></div>
                    <span className="text-xs text-gray-600">
                      {t("route")} (Google Maps)
                    </span>
                  </div>
                )}
                {showDirectLine && (
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-1.5 bg-red-500 rounded"></div>
                    <span className="text-xs text-gray-600">Direct Line</span>
                  </div>
                )}
              </div>
            </div>
            <div className="h-[calc(600px-73px)] relative">
              {!mapLoaded ? (
                <div className="h-full flex flex-col items-center justify-center bg-gray-100 p-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">{t("loading_google_maps")}...</p>
                </div>
              ) : (
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={mapCenter}
                  zoom={mapZoom}
                  options={defaultMapOptions}
                  onLoad={onMapLoad}
                >
                  {/* Pickup Marker */}
                  {pickupCoords && (
                    <Marker
                      position={pickupCoords}
                      title="Pickup Location"
                      label={{
                        text: "P",
                        color: "white",
                        fontWeight: "bold",
                      }}
                      icon={{
                        path: window.google?.maps?.SymbolPath?.CIRCLE,
                        fillColor: "#10B981",
                        fillOpacity: 1,
                        strokeColor: "#FFFFFF",
                        strokeWeight: 2,
                        scale: 12,
                      }}
                      onClick={() => setShowPickupInfo(true)}
                    >
                      {showPickupInfo && (
                        <InfoWindow
                          position={pickupCoords}
                          onCloseClick={() => setShowPickupInfo(false)}
                        >
                          <div style={{ padding: "10px", maxWidth: "250px" }}>
                            <strong style={{ color: "#10B981" }}>
                              Pickup Location
                            </strong>
                            <br />
                            {pickupAddress || "Not specified"}
                            <br />
                            <small>
                              {pickupCoords.lat.toFixed(6)},{" "}
                              {pickupCoords.lng.toFixed(6)}
                            </small>
                          </div>
                        </InfoWindow>
                      )}
                    </Marker>
                  )}

                  {/* Drop Marker */}
                  {dropCoords && (
                    <Marker
                      position={dropCoords}
                      title="Drop Location"
                      label={{
                        text: "D",
                        color: "white",
                        fontWeight: "bold",
                      }}
                      icon={{
                        path: window.google?.maps?.SymbolPath?.CIRCLE,
                        fillColor: "#EF4444",
                        fillOpacity: 1,
                        strokeColor: "#FFFFFF",
                        strokeWeight: 2,
                        scale: 12,
                      }}
                      onClick={() => setShowDropInfo(true)}
                    >
                      {showDropInfo && (
                        <InfoWindow
                          position={dropCoords}
                          onCloseClick={() => setShowDropInfo(false)}
                        >
                          <div style={{ padding: "10px", maxWidth: "250px" }}>
                            <strong style={{ color: "#EF4444" }}>
                              Drop Location
                            </strong>
                            <br />
                            {dropAddress || "Not specified"}
                            <br />
                            <small>
                              {dropCoords.lat.toFixed(6)},{" "}
                              {dropCoords.lng.toFixed(6)}
                            </small>
                          </div>
                        </InfoWindow>
                      )}
                    </Marker>
                  )}

                  {/* Directions */}
                  {directions && !showDirectLine && (
                    <DirectionsRenderer
                      options={{
                        directions: directions,
                        suppressMarkers: true,
                        polylineOptions: {
                          strokeColor: "#2563EB",
                          strokeOpacity: 0.9,
                          strokeWeight: 6,
                          zIndex: 1,
                        },
                      }}
                    />
                  )}

                  {showDirectLine && pickupCoords && dropCoords && (
                    <Polyline
                      path={getDirectPath()}
                      options={directPolylineOptions}
                    />
                  )}
                </GoogleMap>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Component
const InfoItem = ({ label, value, icon }) => (
  <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-md transition-colors">
    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-900 truncate">{value}</p>
    </div>
  </div>
);

export default RideDetails;
