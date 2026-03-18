import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaCar,
  FaCreditCard,
  FaUsers,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaRoute,
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
  corporate_customer_past_by_trip,
  GOOGLE_MAPS_API_KEY,
} from "../constants/constant";

const loadGoogleMapsScript = (callback) => {
  if (window.google && window.google.maps) {
    callback();
    return;
  }

  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places,geometry,directions`;
  script.async = true;
  script.defer = true;
  script.onload = callback;
  script.onerror = () => {};
  document.head.appendChild(script);
};

const PastRideDetails = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { user, appSettings } = useAuth();
  const { t } = useTranslation();

  const [rideDetails, setRideDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mapPickup, setMapPickup] = useState(null);
  const [mapDrop, setMapDrop] = useState(null);
  const [mapKey, setMapKey] = useState(Date.now());
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const [isFetchingRoute, setIsFetchingRoute] = useState(false);
  const [routeDistance, setRouteDistance] = useState(null);
  const [showDirectLine, setShowDirectLine] = useState(false);
  const { language } = useLanguage();

  const mapRef = useRef(null);
  const directionsRendererRef = useRef(null);
  const directLineRef = useRef(null);
  const routeFetchTimeoutRef = useRef(null);
  const isCalculatingRouteRef = useRef(false);
  const currentRouteIdRef = useRef(null);

  useEffect(() => {
    loadGoogleMapsScript(() => {
      setMapLoaded(true);
    });
  }, []);

  useEffect(() => {
    fetchRideDetailsFromAPI();
  }, [tripId, user]);

  useEffect(() => {
    if (rideDetails && mapLoaded) {
      updateMapCoordinates(rideDetails);
    }
  }, [rideDetails, mapLoaded]);

  const fetchRideDetailsFromAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${api_url}${corporate_customer_past_by_trip}`,
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
          updateMapCoordinates(parsedTrip);
        } else {
          navigate("/agent/past-rides");
        }
      } else {
        navigate("/agent/past-rides");
      }
    } catch (err) {
      navigate("/agent/past-rides");
    }
  };

  const updateMapCoordinates = (tripData) => {
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

    if (pickupLat !== null && pickupLng !== null) {
      setMapPickup({
        lat: pickupLat,
        lng: pickupLng,
        address:
          tripData.actual_pickup_address ||
          tripData.pickup_address ||
          "Pickup Location",
      });
    } else {
      setMapPickup({
        address:
          tripData.actual_pickup_address ||
          tripData.pickup_address ||
          "Pickup Location",
      });
    }

    if (dropLat !== null && dropLng !== null) {
      setMapDrop({
        lat: dropLat,
        lng: dropLng,
        address:
          tripData.actual_drop_address ||
          tripData.drop_address ||
          "Drop Location",
      });
    } else {
      setMapDrop({
        address:
          tripData.actual_drop_address ||
          tripData.drop_address ||
          "Drop Location",
      });
    }
  };

  useEffect(() => {
    if (mapLoaded && mapRef.current && mapPickup && mapDrop) {
      initMap();
    }
  }, [mapLoaded, mapPickup, mapDrop, mapKey]);

  const initMap = () => {
    if (!window.google || !window.google.maps) {
      return;
    }

    try {
      const pickupCoords =
        mapPickup.lat && mapPickup.lng
          ? { lat: mapPickup.lat, lng: mapPickup.lng }
          : null;

      const dropCoords =
        mapDrop.lat && mapDrop.lng
          ? { lat: mapDrop.lat, lng: mapDrop.lng }
          : null;

      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 13,
        center: pickupCoords || { lat: 9.9252, lng: 78.1198 },
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      });

      setMapInstance(map);

      if (pickupCoords && dropCoords) {
        addMarkers(map, pickupCoords, dropCoords);
        fetchGoogleMapsRoute(map, pickupCoords, dropCoords);
      } else if (mapPickup.address || mapDrop.address) {
        geocodeAddresses(map);
      }
    } catch (error) {
      toast.error(t("error_initializing_map"));
    }
  };

  const addMarkers = (map, pickupCoords, dropCoords) => {
    const pickupMarker = new window.google.maps.Marker({
      position: pickupCoords,
      map: map,
      title: "Pickup Location",
      label: {
        text: "P",
        color: "white",
        fontWeight: "bold",
      },
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        fillColor: "#10B981",
        fillOpacity: 1,
        strokeColor: "#FFFFFF",
        strokeWeight: 2,
        scale: 12,
      },
    });

    const dropMarker = new window.google.maps.Marker({
      position: dropCoords,
      map: map,
      title: "Drop Location",
      label: {
        text: "D",
        color: "white",
        fontWeight: "bold",
      },
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        fillColor: "#EF4444",
        fillOpacity: 1,
        strokeColor: "#FFFFFF",
        strokeWeight: 2,
        scale: 12,
      },
    });

    const pickupInfoWindow = new window.google.maps.InfoWindow({
      content: `<div style="padding: 10px; max-width: 250px;">
        <strong style="color: #10B981;">Pickup Location</strong><br>
        ${mapPickup.address || "Not specified"}<br>
        <small>${pickupCoords.lat.toFixed(6)}, ${pickupCoords.lng.toFixed(
          6,
        )}</small>
      </div>`,
    });

    const dropInfoWindow = new window.google.maps.InfoWindow({
      content: `<div style="padding: 10px; max-width: 250px;">
        <strong style="color: #EF4444;">Drop Location</strong><br>
        ${mapDrop.address || "Not specified"}<br>
        <small>${dropCoords.lat.toFixed(6)}, ${dropCoords.lng.toFixed(
          6,
        )}</small>
      </div>`,
    });

    pickupMarker.addListener("click", () => {
      pickupInfoWindow.open(map, pickupMarker);
    });

    dropMarker.addListener("click", () => {
      dropInfoWindow.open(map, dropMarker);
    });

    setTimeout(() => {
      pickupInfoWindow.open(map, pickupMarker);
      dropInfoWindow.open(map, dropMarker);
    }, 1000);
  };

  const clearRoutes = () => {
    if (directionsRendererRef.current) {
      try {
        directionsRendererRef.current.setMap(null);
      } catch (e) {}
      directionsRendererRef.current = null;
    }

    if (directLineRef.current) {
      try {
        directLineRef.current.setMap(null);
      } catch (e) {}
      directLineRef.current = null;
    }

    if (routeFetchTimeoutRef.current) {
      clearTimeout(routeFetchTimeoutRef.current);
      routeFetchTimeoutRef.current = null;
    }

    setIsFetchingRoute(false);
    isCalculatingRouteRef.current = false;
    setRouteDistance(null);
    setShowDirectLine(false);
  };

  const directionsCallback = (response, status) => {
    if (status === window.google.maps.DirectionsStatus.OK) {
      if (directLineRef.current) {
        directLineRef.current.setMap(null);
        directLineRef.current = null;
      }

      setShowDirectLine(false);

      if (directionsRendererRef.current) {
        directionsRendererRef.current.setDirections(response);
        directionsRendererRef.current.setMap(mapInstance);
      }

      if (response.routes && response.routes[0]) {
        const route = response.routes[0];
        const totalDistance = route.legs.reduce((total, leg) => {
          return total + (leg.distance ? leg.distance.value : 0);
        }, 0);

        const distanceInKm = (totalDistance / 1000).toFixed(2);
        setRouteDistance(distanceInKm);

        if (mapInstance && response.routes[0]) {
          const bounds = new window.google.maps.LatLngBounds();
          const route = response.routes[0];

          route.legs.forEach((leg) => {
            if (leg.start_location) bounds.extend(leg.start_location);
            if (leg.end_location) bounds.extend(leg.end_location);
          });

          setTimeout(() => {
            if (mapInstance) {
              mapInstance.fitBounds(bounds, { padding: 100 });
              mapInstance.panToBounds(bounds);
            }
          }, 100);
        }
      }
    } else if (status === window.google.maps.DirectionsStatus.ZERO_RESULTS) {
      drawDirectLine();
      toast.info("No driving route found. Showing direct line.");
    } else if (
      status === window.google.maps.DirectionsStatus.OVER_QUERY_LIMIT
    ) {
      drawDirectLine();
      toast.error(t("map_service_temporarily_unavailable"));
    } else if (status === window.google.maps.DirectionsStatus.REQUEST_DENIED) {
      drawDirectLine();
      toast.error(t("map_service_unavailable"));
    } else if (status === window.google.maps.DirectionsStatus.UNKNOWN_ERROR) {
      drawDirectLine();
      toast.error(t("could_not_calculate_route_please_try_again"));
    } else {
      drawDirectLine();
    }

    setIsFetchingRoute(false);
    isCalculatingRouteRef.current = false;
  };

  const drawDirectLine = () => {
    if (!mapInstance || !mapPickup?.lat || !mapDrop?.lat) {
      return;
    }

    if (directionsRendererRef.current) {
      directionsRendererRef.current.setMap(null);
      directionsRendererRef.current = null;
    }

    if (directLineRef.current) {
      directLineRef.current.setMap(null);
    }

    const directLine = new window.google.maps.Polyline({
      path: [
        { lat: mapPickup.lat, lng: mapPickup.lng },
        { lat: mapDrop.lat, lng: mapDrop.lng },
      ],
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 4,
      map: mapInstance,
    });

    directLineRef.current = directLine;
    setShowDirectLine(true);

    const distance = calculateDistance(
      mapPickup.lat,
      mapPickup.lng,
      mapDrop.lat,
      mapDrop.lng,
    );
    setRouteDistance(distance);

    if (mapInstance) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(
        new window.google.maps.LatLng(mapPickup.lat, mapPickup.lng),
      );
      bounds.extend(new window.google.maps.LatLng(mapDrop.lat, mapDrop.lng));
      mapInstance.fitBounds(bounds, { padding: 100 });
    }
  };

  const fetchGoogleMapsRoute = (map, pickupCoords, dropCoords) => {
    const currentRouteId = Date.now();
    currentRouteIdRef.current = currentRouteId;

    if (isCalculatingRouteRef.current) {
      return false;
    }

    try {
      isCalculatingRouteRef.current = true;
      setIsFetchingRoute(true);

      clearRoutes();

      if (window.google.maps.DirectionsRenderer) {
        directionsRendererRef.current =
          new window.google.maps.DirectionsRenderer({
            suppressMarkers: true,
            preserveViewport: false,
            polylineOptions: {
              strokeColor: "#3B82F6",
              strokeOpacity: 0.8,
              strokeWeight: 6,
            },
          });
      }

      const directionsService = new window.google.maps.DirectionsService();

      const request = {
        origin: pickupCoords,
        destination: dropCoords,
        travelMode: window.google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: false,
      };

      directionsService.route(request, (response, status) => {
        directionsCallback(response, status);
      });

      return true;
    } catch (error) {
      drawDirectLine();
      setIsFetchingRoute(false);
      isCalculatingRouteRef.current = false;
      return false;
    }
  };

  const geocodeAddresses = (map) => {
    const geocoder = new window.google.maps.Geocoder();

    if (mapPickup.address) {
      geocoder.geocode({ address: mapPickup.address }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK && results[0]) {
          const location = results[0].geometry.location;
          const newPickupCoords = { lat: location.lat(), lng: location.lng() };
          setMapPickup((prev) => ({
            ...prev,
            lat: location.lat(),
            lng: location.lng(),
          }));

          if (mapDrop?.lat && mapDrop?.lng) {
            setTimeout(() => {
              fetchGoogleMapsRoute(map, newPickupCoords, {
                lat: mapDrop.lat,
                lng: mapDrop.lng,
              });
            }, 500);
          }
        }
      });
    }

    if (mapDrop.address) {
      geocoder.geocode({ address: mapDrop.address }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK && results[0]) {
          const location = results[0].geometry.location;
          const newDropCoords = { lat: location.lat(), lng: location.lng() };
          setMapDrop((prev) => ({
            ...prev,
            lat: location.lat(),
            lng: location.lng(),
          }));

          if (mapPickup?.lat && mapPickup?.lng) {
            setTimeout(() => {
              fetchGoogleMapsRoute(
                map,
                {
                  lat: mapPickup.lat,
                  lng: mapPickup.lng,
                },
                newDropCoords,
              );
            }, 500);
          }
        }
      });
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

  const handlePrint = () => {
    window.print();
  };

  const handleRefreshMap = () => {
    clearRoutes();
    setMapKey(Date.now());
    toast.info(t("refreshing_map_and_route"));
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (!lat1 || !lon1 || !lat2 || !lon2) return null;

    const R = 6371;
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
            onClick={() => navigate("/agent/past-rides")}
            className="px-4 py-2 bg-[#1EC51D] text-white rounded-md hover:bg-[#17a517] transition-colors flex items-center gap-2"
          >
            <FaArrowLeft /> {t("back_to_rides")}
          </button>
        </div>
      </div>
    );
  }

  const displayDistance =
    routeDistance ||
    (mapPickup?.lat && mapDrop?.lat
      ? calculateDistance(
          mapPickup.lat,
          mapPickup.lng,
          mapDrop.lat,
          mapDrop.lng,
        )
      : rideDetails.distance || null);

  return (
    <div className="flex-1 p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/agent/past-rides")}
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
        {/* Left Column*/}
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
                  <p className="text-gray-600">
                    {rideDetails.actual_pickup_address ||
                      rideDetails.pickup_address ||
                      "N/A"}
                  </p>
                  {mapPickup?.lat && (
                    <p className="text-xs text-gray-500 mt-1">
                      Coordinates: {mapPickup.lat.toFixed(6)},{" "}
                      {mapPickup.lng.toFixed(6)}
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
                  <p className="text-gray-600">
                    {rideDetails.actual_drop_address ||
                      rideDetails.drop_address ||
                      "N/A"}
                  </p>
                  {mapDrop?.lat && (
                    <p className="text-xs text-gray-500 mt-1">
                      Coordinates: {mapDrop.lat.toFixed(6)},{" "}
                      {mapDrop.lng.toFixed(6)}
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
                {!showDirectLine && (
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
            <div className="h-[calc(600px-73px)]">
              {!mapLoaded ? (
                <div className="h-full flex flex-col items-center justify-center bg-gray-100 p-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">{t("loading_google_maps")}...</p>
                </div>
              ) : (
                <div
                  ref={mapRef}
                  key={mapKey}
                  className="w-full h-full"
                  style={{ minHeight: "500px" }}
                />
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

export default PastRideDetails;
