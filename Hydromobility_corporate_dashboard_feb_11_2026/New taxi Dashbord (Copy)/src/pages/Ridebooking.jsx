import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  GOOGLE_MAPS_API_KEY,
  api_url,
  img_url,
  customer_get_estimation_fare,
  corporate_customer_promo_codes,
  customer_get_zone,
  customer_ride_confirm,
} from "../constants/constant";
import { fetchAddress } from "../Components/Utils";
import { useAuth } from "../context/AuthContext";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
  InfoWindow,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

let googleMapsLoaded = false;

const RideBooking = () => {
  const navigate = useNavigate();
  const {
    user,
    appSettings,
    appliedPromoIds,
    saveAppliedPromoId,
    removeAppliedPromoId,
  } = useAuth();

  const defaultCoords = { lat: 9.90544, lng: 78.093102 };
  const [isBooking, setIsBooking] = useState(false);
  const [formData, setFormData] = useState({
    riderName: "",
    mobileNumber: "",
    countryCode: "+91",
    pickupAddress: "",
    dropAddress: "",
    stops: [""],
    vehicleType: "",
    phoneWithCode: "",
    scheduleType: "now",
    scheduleDate: "",
    scheduleTime: "",
    scheduleTime24h: "",
    customerNote: "",
    driverNote: "",
    companyName: user?.company_name || "",
    promoCode: "",
    promoId: 0,
  });

  const [pickupCoords, setPickupCoords] = useState({
    lat: null,
    lng: null,
    address: "",
  });
  const [dropCoords, setDropCoords] = useState({
    lat: null,
    lng: null,
    address: "",
  });
  const [isFormExpanded, setIsFormExpanded] = useState(true);
  const [mapCenter, setMapCenter] = useState({
    lat: defaultCoords.lat,
    lng: defaultCoords.lng,
  });
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [loadingVehicles, setLoadingVehicles] = useState(false);
  const [km, setKm] = useState(0);
  const [isPickupManuallySet, setIsPickupManuallySet] = useState(false);
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [timeOptions, setTimeOptions] = useState([]);
  const [timeOptions24h, setTimeOptions24h] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [mapZoom, setMapZoom] = useState(12);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [scriptLoadError, setScriptLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldLoadScript, setShouldLoadScript] = useState(!googleMapsLoaded);
  const [isFetchingRoute, setIsFetchingRoute] = useState(false);

  const [directions, setDirections] = useState(null);
  const [directionsRequest, setDirectionsRequest] = useState(null);

  const [promoCodes, setPromoCodes] = useState([]);
  const [loadingPromoCodes, setLoadingPromoCodes] = useState(false);
  const [showPromoDropdown, setShowPromoDropdown] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState(null);

  const mapRef = useRef(null);
  const pickupAutocompleteRef = useRef(null);
  const dropAutocompleteRef = useRef(null);
  const promoDropdownRef = useRef(null);
  const routeFetchTimeoutRef = useRef(null);
  const directionsRendererRef = useRef(null);
  const isCalculatingRouteRef = useRef(false);
  const currentRouteIdRef = useRef(null);

  const mapContainerStyle = {
    width: "100%",
    height: "100vh",
  };

  const defaultMapOptions = {
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    zoomControl: true,
  };

  const formatTimeTo12h = useCallback((hour, minute) => {
    const period = hour >= 12 ? "PM" : "AM";
    let displayHour = hour % 12;
    if (displayHour === 0) displayHour = 12;

    const minuteStr = minute.toString().padStart(2, "0");
    return `${displayHour}:${minuteStr} ${period}`;
  }, []);

  const convertTo24hFormat = useCallback((time12h) => {
    const [time, period] = time12h.split(" ");
    let [hours, minutes] = time.split(":");

    hours = parseInt(hours);
    minutes = parseInt(minutes);

    if (period === "PM" && hours !== 12) {
      hours += 12;
    }
    if (period === "AM" && hours === 12) {
      hours = 0;
    }

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  }, []);

  const getCurrentLocalTime = useCallback(() => {
    try {
      const now = new Date();

      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      const formattedLocalTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

      return formattedLocalTime;
    } catch (error) {
      return null;
    }
  }, []);

  const formatToMySQLDateTime = useCallback((date) => {
    if (!(date instanceof Date) || isNaN(date)) {
      date = new Date();
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const formatted = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formatted;
  }, []);

  const generateTimeOptions = useCallback(
    (selectedDateStr) => {
      const options12h = [];
      const options24h = [];

      const now = new Date();
      const localNow = new Date(now.getTime());

      const today = new Date(
        localNow.getFullYear(),
        localNow.getMonth(),
        localNow.getDate(),
      );

      let selectedDate;
      if (selectedDateStr) {
        const [year, month, day] = selectedDateStr.split("-").map(Number);
        selectedDate = new Date(year, month - 1, day);
      } else {
        selectedDate = new Date(today);
      }

      const isToday =
        selectedDate.getDate() === today.getDate() &&
        selectedDate.getMonth() === today.getMonth() &&
        selectedDate.getFullYear() === today.getFullYear();

      let startHour = 0;
      let startMinute = 0;

      if (isToday) {
        startHour = localNow.getHours();
        startMinute = localNow.getMinutes();

        if (startHour === 23 && startMinute === 59) {
          return { options12h: [], options24h: [] };
        }
      }

      for (let hour = startHour; hour < 24; hour++) {
        const minStart = hour === startHour ? startMinute : 0;
        for (let minute = minStart; minute < 60; minute++) {
          const time24h = `${hour.toString().padStart(2, "0")}:${minute
            .toString()
            .padStart(2, "0")}`;
          const time12h = formatTimeTo12h(hour, minute);

          options24h.push(time24h);
          options12h.push(time12h);
        }
      }

      return { options12h, options24h };
    },
    [formatTimeTo12h],
  );

  const extractOnlyAddress = useCallback((response) => {
    if (!response) {
      return "";
    }

    if (typeof response === "string" && !response.startsWith("{")) {
      return response;
    }

    if (typeof response === "object" && response.address) {
      return response.address;
    }

    if (typeof response === "string" && response.startsWith("{")) {
      try {
        const parsed = JSON.parse(response);
        if (parsed.address && typeof parsed.address === "string") {
          return parsed.address;
        }
      } catch (e) {}
    }

    return "";
  }, []);

  const getAddressFromCoordinates = useCallback(async (lat, lng) => {
    if (!window.google) {
      return `Location at ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    }

    return new Promise((resolve, reject) => {
      try {
        const geocoder = new window.google.maps.Geocoder();
        const latLng = new window.google.maps.LatLng(lat, lng);

        geocoder.geocode({ location: latLng }, (results, status) => {
          if (status === "OK" && results && results[0]) {
            const address = results[0].formatted_address;
            resolve(address);
          } else {
            resolve(`Location at ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
          }
        });
      } catch (error) {
        resolve(`Location at ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
      }
    });
  }, []);

  const clearRoute = useCallback((skipToast = false) => {
    if (directionsRendererRef.current) {
      try {
        directionsRendererRef.current.setMap(null);
      } catch (e) {}
      directionsRendererRef.current = null;
    }

    setDirections(null);
    setDirectionsRequest(null);

    setKm(0);

    setVehicleTypes([]);

    if (routeFetchTimeoutRef.current) {
      clearTimeout(routeFetchTimeoutRef.current);
      routeFetchTimeoutRef.current = null;
    }

    setIsFetchingRoute(false);

    isCalculatingRouteRef.current = false;

    currentRouteIdRef.current = Date.now();

    if (!skipToast) {
    }
  }, []);

  const fetchVehicleEstimation = useCallback(async () => {
    if (!pickupCoords.lat || !dropCoords.lat) return;
    setLoadingVehicles(true);

    try {
      const payload = {
        trip_type: 1,
        promo: formData.promoId || 0,
        pickup_lat: pickupCoords.lat,
        pickup_lng: pickupCoords.lng,
        drop_lat: dropCoords.lat,
        drop_lng: dropCoords.lng,
        customer_id: 0,
        lang: "en",
      };

      const response = await axios.post(
        `${api_url}${customer_get_estimation_fare}`,
        payload,
      );

      if (
        response.data.status === 1 &&
        response.data.result?.vehicles?.length > 0
      ) {
        const vehicles = response.data.result.vehicles;
        setVehicleTypes(vehicles);
      } else {
        setVehicleTypes([]);
      }
    } catch (error) {
      setVehicleTypes([]);
    } finally {
      setLoadingVehicles(false);
    }
  }, [
    pickupCoords.lat,
    pickupCoords.lng,
    dropCoords.lat,
    dropCoords.lng,
    formData.promoId,
  ]);

  // Fetch promo
  const fetchPromoCodes = useCallback(async () => {
    if (!user?.corporate_customer_id) {
      return;
    }

    setLoadingPromoCodes(true);
    try {
      const payload = {
        corporate_customer_id: user.corporate_customer_id,
        lang: language,
      };

      const response = await axios.post(
        `${api_url}${corporate_customer_promo_codes}`,
        payload,
      );

      if (response.data.status === 1 && response.data.result?.length > 0) {
        const appliedIds = appliedPromoIds || [];

        const updatedPromotions = response.data.result.map((promo) => ({
          ...promo,
          isApplied: appliedIds.includes(promo.id),
        }));

        const sortedPromos = updatedPromotions.sort((a, b) => {
          if (a.isApplied && !b.isApplied) return -1;
          if (!a.isApplied && b.isApplied) return 1;
          return 0;
        });

        setPromoCodes(sortedPromos);

        if (appliedIds.length > 0 && !appliedPromo) {
          const firstAppliedPromo = sortedPromos.find((promo) =>
            appliedIds.includes(promo.id),
          );
          if (firstAppliedPromo) {
            setAppliedPromo(firstAppliedPromo);
            setFormData((prev) => ({
              ...prev,
              promoCode: firstAppliedPromo.promo_code,
              promoId: firstAppliedPromo.id,
            }));
          }
        }
      } else {
        setPromoCodes([]);
      }
    } catch (error) {
      setPromoCodes([]);
    } finally {
      setLoadingPromoCodes(false);
    }
  }, [user?.corporate_customer_id, language, appliedPromoIds, appliedPromo]);

  const directionsCallback = useCallback(
    (response, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        setDirections(response);

        if (response.routes && response.routes[0]) {
          const route = response.routes[0];
          const totalDistance = route.legs.reduce((total, leg) => {
            return total + (leg.distance ? leg.distance.value : 0);
          }, 0);

          const distanceInKm = (totalDistance / 1000).toFixed(2);
          setKm(distanceInKm);
        }

        if (mapRef.current && response.routes && response.routes[0]) {
          const bounds = new window.google.maps.LatLngBounds();
          const route = response.routes[0];

          route.legs.forEach((leg) => {
            if (leg.start_location) bounds.extend(leg.start_location);
            if (leg.end_location) bounds.extend(leg.end_location);
          });

          setTimeout(() => {
            if (mapRef.current) {
              mapRef.current.fitBounds(bounds);
              mapRef.current.panToBounds(bounds);
            }
          }, 100);
        }
      } else if (status === window.google.maps.DirectionsStatus.ZERO_RESULTS) {
        toast.warning(t("no_route_found_between_locations"));
        clearRoute(true);
      } else if (
        status === window.google.maps.DirectionsStatus.OVER_QUERY_LIMIT
      ) {
        toast.error(t("map_service_temporarily_unavailable"));
        clearRoute(true);
      } else if (
        status === window.google.maps.DirectionsStatus.REQUEST_DENIED
      ) {
        toast.error(t("map_service_unavailable"));
        clearRoute(true);
      } else if (status === window.google.maps.DirectionsStatus.UNKNOWN_ERROR) {
        toast.error(t("could_not_calculate_route_please_try_again"));
        clearRoute(true);
      } else {
        clearRoute(true);
      }

      setIsFetchingRoute(false);
      isCalculatingRouteRef.current = false;
    },
    [t],
  );

  const fetchRouteFromGoogleMaps = useCallback(
    async (fromLat, fromLng, toLat, toLng) => {
      const currentRouteId = Date.now();
      currentRouteIdRef.current = currentRouteId;

      if (isCalculatingRouteRef.current) {
        return false;
      }

      try {
        isCalculatingRouteRef.current = true;
        setIsFetchingRoute(true);

        clearRoute(true);

        const request = {
          origin: { lat: fromLat, lng: fromLng },
          destination: { lat: toLat, lng: toLng },
          travelMode: window.google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: false,
        };

        setDirectionsRequest(request);

        return true;
      } catch (error) {
        toast.error(t("could_not_calculate_route_please_try_again"));
        return false;
      }
    },
    [t],
  );

  useEffect(() => {
    const now = new Date();

    const today = now.toLocaleDateString("en-CA");

    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const currentTime24h = `${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`;
    const currentTime12h = formatTimeTo12h(currentHour, currentMinute);

    const { options12h, options24h } = generateTimeOptions(today);

    setFormData((prev) => ({
      ...prev,
      scheduleDate: today,
      scheduleTime: currentTime12h,
      scheduleTime24h: currentTime24h,
      companyName: user?.company_name || "",
    }));

    setTimeOptions(options12h);
    setTimeOptions24h(options24h);
  }, [user?.company_name, formatTimeTo12h, generateTimeOptions]);

  useEffect(() => {
    if (user?.corporate_customer_id) {
      fetchPromoCodes();
    }
  }, [user?.corporate_customer_id, fetchPromoCodes]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        promoDropdownRef.current &&
        !promoDropdownRef.current.contains(event.target)
      ) {
        setShowPromoDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const setDefaultLocation = async () => {
      if (isPickupManuallySet) {
        return;
      }

      setIsLoading(true);
      let lat = defaultCoords.lat;
      let lng = defaultCoords.lng;
      let address = "";

      try {
        if (navigator.geolocation) {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              timeout: 10000,
              enableHighAccuracy: true,
            });
          });

          lat = position.coords.latitude;
          lng = position.coords.longitude;

          setMapCenter({ lat, lng });
          setMapZoom(14);

          try {
            const response = await fetchAddress(lat, lng);
            address = extractOnlyAddress(response);
            if (!address) {
              throw new Error("No address from fetchAddress");
            }
          } catch (fetchError) {
            if (isMapLoaded && window.google) {
              try {
                address = await getAddressFromCoordinates(lat, lng);
              } catch (googleError) {
                console.error(
                  "Error fetching address from Google:",
                  googleError,
                );
                address = `Near ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
              }
            } else {
              address = `Near ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
            }
          }

          setPickupCoords({ lat, lng, address });
          setFormData((prev) => ({ ...prev, pickupAddress: address }));

          toast.success(t("current_location_detected"));
        } else {
          throw new Error("Geolocation not supported");
        }
      } catch (err) {
        setMapCenter({ lat: defaultCoords.lat, lng: defaultCoords.lng });
        setMapZoom(12);

        try {
          const response = await fetchAddress(lat, lng);
          address = extractOnlyAddress(response);
          if (!address) {
            address = `Default Location: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
          }
        } catch (fetchError) {
          address = `Default Location: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        }

        setPickupCoords({ lat, lng, address });
        setFormData((prev) => ({ ...prev, pickupAddress: address }));

        toast.info(t("using_default_location"));
      } finally {
        setIsLoading(false);
      }
    };

    setDefaultLocation();
  }, [
    isPickupManuallySet,
    isMapLoaded,
    getAddressFromCoordinates,
    extractOnlyAddress,
  ]);

  useEffect(() => {
    if (routeFetchTimeoutRef.current) {
      clearTimeout(routeFetchTimeoutRef.current);
    }

    if (!pickupCoords.lat || !dropCoords.lat) {
      clearRoute(true);
      setVehicleTypes([]);
      return;
    }

    routeFetchTimeoutRef.current = setTimeout(async () => {
      await fetchRouteFromGoogleMaps(
        pickupCoords.lat,
        pickupCoords.lng,
        dropCoords.lat,
        dropCoords.lng,
      );
    }, 500);

    return () => {
      if (routeFetchTimeoutRef.current) {
        clearTimeout(routeFetchTimeoutRef.current);
      }
    };
  }, [
    pickupCoords.lat,
    pickupCoords.lng,
    dropCoords.lat,
    dropCoords.lng,
    fetchRouteFromGoogleMaps,
    clearRoute,
  ]);

  useEffect(() => {
    if (pickupCoords.lat && dropCoords.lat && formData.promoId > 0) {
      const timer = setTimeout(() => {
        fetchVehicleEstimation();
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [
    formData.promoId,
    fetchVehicleEstimation,
    pickupCoords.lat,
    dropCoords.lat,
  ]);

  useEffect(() => {
    if (formData.scheduleType === "now") {
      const now = new Date();
    }
  }, [
    formData.scheduleType,
    formData.scheduleTime,
    formData.scheduleDate,
    formatTimeTo12h,
  ]);

  const handleDateChange = useCallback(
    (newDate) => {
      const { options12h, options24h } = generateTimeOptions(newDate);

      setFormData((prev) => {
        const newTime = options12h.length > 0 ? options12h[0] : "";
        const newTime24h = options24h.length > 0 ? options24h[0] : "";

        return {
          ...prev,
          scheduleDate: newDate,
          scheduleTime: newTime,
          scheduleTime24h: newTime24h,
        };
      });

      setTimeOptions(options12h);
      setTimeOptions24h(options24h);
    },
    [generateTimeOptions],
  );

  const handleTimeChange = useCallback(
    (time12h) => {
      const index = timeOptions.indexOf(time12h);
      const time24h = index >= 0 ? timeOptions24h[index] : "";

      setFormData((prev) => ({
        ...prev,
        scheduleTime: time12h,
        scheduleTime24h: time24h,
      }));
    },
    [timeOptions, timeOptions24h],
  );

  const handlePlaceSelect = useCallback((place, type) => {
    if (!place || !place.geometry || !place.geometry.location) {
      toast.error(t("please_select_a_valid_location"));
      return;
    }

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    let address = "";
    if (
      place.formatted_address &&
      typeof place.formatted_address === "string"
    ) {
      address = place.formatted_address;
    } else if (place.name && typeof place.name === "string") {
      address = place.name;
    } else if (place.vicinity && typeof place.vicinity === "string") {
      address = place.vicinity;
    } else {
      address = `Location at ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    }

    const location = { lat, lng, address };

    if (type === "pickup") {
      setPickupCoords(location);
      setFormData((prev) => ({ ...prev, pickupAddress: address }));
      setIsPickupManuallySet(true);
    } else {
      setDropCoords(location);
      setFormData((prev) => ({ ...prev, dropAddress: address }));
    }

    setMapCenter({ lat, lng });
    setMapZoom(14);
    setSelectedMarker(null);

    toast.success(
      `${type === "pickup" ? t("Pickup") : t("Drop")} ${t("location_set_successfully")}`,
    );
  }, []);

  const handleMapClick = useCallback(
    async (event) => {
      if (!isMapLoaded || !window.google) {
        toast.error(t("please_wait"));
        return;
      }

      let lat, lng;

      try {
        if (event.latLng) {
          lat = event.latLng.lat();
          lng = event.latLng.lng();
        } else {
          toast.error(t("could_not_get_coordinates_from_map_click"));
          return;
        }

        let address = "";
        try {
          address = await getAddressFromCoordinates(lat, lng);
        } catch (fetchError) {
          address = `Near ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        }

        const location = { lat, lng, address };
        const shiftKey = event.domEvent ? event.domEvent.shiftKey : false;

        if (!pickupCoords.address || shiftKey) {
          setPickupCoords(location);
          setFormData((prev) => ({ ...prev, pickupAddress: address }));
          setIsPickupManuallySet(true);
          toast.success(t("pickup_location_set"));
        } else {
          setDropCoords(location);
          setFormData((prev) => ({ ...prev, dropAddress: address }));
          toast.success(t("drop_location_set"));
        }

        setMapCenter({ lat, lng });
        setSelectedMarker(null);
      } catch (error) {
        toast.error(t("unable_to_set_location_please_try_again"));
      }
    },
    [isMapLoaded, pickupCoords.address, getAddressFromCoordinates],
  );

  const removePromo = useCallback(() => {
    if (!appliedPromo) return;

    const success = removeAppliedPromoId(appliedPromo.id);
    if (success) {
      setAppliedPromo(null);
      setFormData((prev) => ({
        ...prev,
        promoCode: "",
        promoId: 0,
      }));
      toast.info(t("promo_code_removed"));

      setPromoCodes((prev) =>
        prev
          .map((p) =>
            p.id === appliedPromo.id ? { ...p, isApplied: false } : p,
          )
          .sort((a, b) => {
            if (a.isApplied && !b.isApplied) return -1;
            if (!a.isApplied && b.isApplied) return 1;
            return 0;
          }),
      );
    } else {
      toast.error(t("failed_to_remove_promo_code"));
    }
  }, [appliedPromo, removeAppliedPromoId]);

  const clearLocations = useCallback(() => {
    clearRoute();

    setPickupCoords({ lat: null, lng: null, address: "" });
    setDropCoords({ lat: null, lng: null, address: "" });

    setFormData((prev) => ({
      ...prev,
      pickupAddress: "",
      dropAddress: "",
    }));

    setMapCenter({ lat: defaultCoords.lat, lng: defaultCoords.lng });
    setMapZoom(12);
    setIsPickupManuallySet(false);

    if (appliedPromo) {
      removePromo();
    }

    toast.info(t("locations_cleared"));
  }, [defaultCoords, clearRoute, appliedPromo, removePromo]);

  const getZoneId = useCallback(async (lat, lng) => {
    try {
      const res = await axios.post(`${api_url}${customer_get_zone}`, {
        lat,
        lng,
      });
      if (res.data.status === 1 && res.data.result) {
        return res.data.result;
      } else {
        return null;
      }
    } catch (err) {
      toast.error(t("error_fetching_zone"));
      return null;
    }
  }, []);

  const applyPromo = useCallback(
    (promo) => {
      if (!promo || !promo.id) {
        toast.error("Invalid promo code");
        return;
      }

      const success = saveAppliedPromoId(promo.id);
      if (success) {
        setAppliedPromo(promo);
        setFormData((prev) => ({
          ...prev,
          promoCode: promo.promo_code,
          promoId: promo.id,
        }));
        setShowPromoDropdown(false);
        toast.success(t("promo_code_applied"));

        setPromoCodes((prev) =>
          prev
            .map((p) => (p.id === promo.id ? { ...p, isApplied: true } : p))
            .sort((a, b) => {
              if (a.isApplied && !b.isApplied) return -1;
              if (!a.isApplied && b.isApplied) return 1;
              return 0;
            }),
        );
      } else {
        toast.error(t("failed_to_apply_promo"));
      }
    },
    [saveAppliedPromoId],
  );

  const handleBookRide = async () => {
    if (
      !formData.pickupAddress ||
      !formData.dropAddress ||
      !formData.vehicleType
    ) {
      toast.error(t("please_select_pickup_drop_vehicle"));
      return;
    }

    if (!formData.phoneWithCode) {
      toast.error(t("please_enter_rider_phone"));
      return;
    }

    if (formData.scheduleType === "schedule") {
      if (!formData.scheduleDate || !formData.scheduleTime) {
        toast.error(t("please_select_schedule_datetime"));
        return;
      }

      const time24h =
        formData.scheduleTime24h || convertTo24hFormat(formData.scheduleTime);
      const selectedDateTime = new Date(`${formData.scheduleDate}T${time24h}`);
      const now = new Date();

      if (selectedDateTime < now) {
        toast.error(t("please_select_future_datetime"));
        return;
      }
    }

    try {
      setIsBooking(true);

      const loadingToast = toast.loading("Processing your ride booking...");

      const zoneId = await getZoneId(pickupCoords.lat, pickupCoords.lng);
      if (!zoneId) {
        toast.update(loadingToast, {
          render: t("unable_fetch_zone"),
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        setIsBooking(false);
        return;
      }

      let formattedDate;

      if (formData.scheduleType === "now") {
        formattedDate = getCurrentLocalTime();

        if (!formattedDate) {
          formattedDate = formatToMySQLDateTime(new Date());
        }
      } else {
        const time24h =
          formData.scheduleTime24h || convertTo24hFormat(formData.scheduleTime);
        formattedDate = `${formData.scheduleDate} ${time24h}:00`;
      }

      const payload = {
        km,
        vehicle_type: formData.vehicleType,
        pickup_address: formData.pickupAddress,
        drop_address: formData.dropAddress,
        pickup_date: formattedDate,
        pickup_lat: pickupCoords.lat,
        pickup_lng: pickupCoords.lng,
        drop_lat: dropCoords.lat,
        drop_lng: dropCoords.lng,
        trip_type: 1,
        zone: zoneId,
        promo: formData.promoId || 0,
        surge: 0,
        stops: 0,
        corporate_customer_id: user?.id || 0,
        agent_name: formData.riderName,
        agent_phone_number: formData.phoneWithCode,
        payment_method: 1,
        is_scheduled: formData.scheduleType === "schedule" ? 1 : 0,
        customer_note: formData.customerNote || "",
        driver_note: formData.driverNote || "",
        company_name: formData.companyName || "",
      };

      const response = await axios.post(
        `${api_url}${customer_ride_confirm}`,
        payload,
      );

      toast.update(loadingToast, {
        render:
          response.data.status === 1
            ? t("ride_booked_successfully")
            : response.data.message || "Failed to book ride",
        type: response.data.status === 1 ? "success" : "error",
        isLoading: false,
        autoClose: 3000,
      });

      if (response.data.status === 1) {
        setTimeout(() => {
          navigate("/agent/today-rides");
        }, 1500);
      }
    } catch (error) {
      toast.error(t("something_went_wrong"));
    } finally {
      setIsBooking(false);
    }
  };

  // Handle marker click
  const handleMarkerClick = useCallback((location, type) => {
    const address =
      location.address ||
      `Location at ${location.lat?.toFixed(6) || "?"}, ${
        location.lng?.toFixed(6) || "?"
      }`;
    setSelectedMarker({
      position: { lat: location.lat, lng: location.lng },
      title: type === "pickup" ? "Pickup Location" : "Drop Location",
      address: address,
      type: type,
    });
  }, []);

  const getMinDate = useCallback(() => {
    const today = new Date();
    return today.toLocaleDateString("en-CA");
  }, []);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    setIsMapLoaded(true);

    googleMapsLoaded = true;
    setShouldLoadScript(false);

    initializeAutocomplete();
  }, []);

  const onLoadScriptError = useCallback((error) => {
    setScriptLoadError(true);
    toast.error(
      t(
        "failed_to_load_google_maps_please_check_your_internet_connection_and_api_key",
      ),
    );
  }, []);

  const initializeAutocomplete = useCallback(() => {
    if (!window.google || !window.google.maps.places) {
      return;
    }

    const pickupInput = document.getElementById("pickup-autocomplete");
    if (pickupInput && !pickupAutocompleteRef.current) {
      try {
        pickupAutocompleteRef.current =
          new window.google.maps.places.Autocomplete(pickupInput, {
            types: ["geocode", "establishment"],
            fields: ["formatted_address", "geometry", "name", "vicinity"],
          });

        pickupAutocompleteRef.current.addListener("place_changed", () => {
          const place = pickupAutocompleteRef.current.getPlace();
          handlePlaceSelect(place, "pickup");
        });
      } catch (error) {}
    }

    const dropInput = document.getElementById("drop-autocomplete");
    if (dropInput && !dropAutocompleteRef.current) {
      try {
        dropAutocompleteRef.current =
          new window.google.maps.places.Autocomplete(dropInput, {
            types: ["geocode", "establishment"],
            fields: ["formatted_address", "geometry", "name", "vicinity"],
          });

        dropAutocompleteRef.current.addListener("place_changed", () => {
          const place = dropAutocompleteRef.current.getPlace();
          handlePlaceSelect(place, "drop");
        });
      } catch (error) {}
    }
  }, [handlePlaceSelect]);

  useEffect(() => {
    if (isMapLoaded && isFormExpanded && window.google) {
      const timer = setTimeout(() => {
        initializeAutocomplete();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isMapLoaded, isFormExpanded, initializeAutocomplete]);

  const getDisplayAddress = useCallback((address) => {
    if (!address) {
      return "";
    }

    if (typeof address === "string" && address.startsWith("{")) {
      try {
        const parsed = JSON.parse(address);
        if (parsed.address && typeof parsed.address === "string") {
          return parsed.address;
        }
      } catch (e) {}
    }

    return address;
  }, []);

  useEffect(() => {
    if (directions && pickupCoords.lat && dropCoords.lat) {
      fetchVehicleEstimation();
    }
  }, [directions, fetchVehicleEstimation, pickupCoords.lat, dropCoords.lat]);

  useEffect(() => {
    return () => {
      if (pickupAutocompleteRef.current) {
        try {
          window.google?.maps?.event?.clearInstanceListeners?.(
            pickupAutocompleteRef.current,
          );
        } catch (e) {}
      }
      if (dropAutocompleteRef.current) {
        try {
          window.google?.maps?.event?.clearInstanceListeners?.(
            dropAutocompleteRef.current,
          );
        } catch (e) {}
      }

      if (directionsRendererRef.current) {
        try {
          directionsRendererRef.current.setMap(null);
        } catch (e) {}
      }

      if (routeFetchTimeoutRef.current) {
        clearTimeout(routeFetchTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const checkGoogleMapsLoaded = () => {
      if (window.google && window.google.maps) {
        googleMapsLoaded = true;
        setShouldLoadScript(false);
      }
    };

    checkGoogleMapsLoaded();
  }, []);

  if (scriptLoadError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <div className="text-red-500 text-6xl mb-4">
            <i className="fas fa-map-marked-alt"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Map Loading Error
          </h2>
          <p className="text-gray-600 mb-4">
            Unable to load Google Maps. Please check:
          </p>
          <ul className="text-left text-gray-600 mb-6">
            <li className="mb-1">• Your internet connection</li>
            <li className="mb-1">• Google Maps API key validity</li>
            <li className="mb-1">• API key permissions</li>
          </ul>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#1EC51D] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#17a517] transition-colors cursor-pointer"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Render the map content
  const renderMapContent = () => (
    <div className="min-h-screen relative">
      {/* Map */}
      <div className="fixed inset-0 z-0">
        <div className="w-full h-screen">
          {isLoading && !isMapLoaded ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1EC51D] mx-auto mb-4"></div>
                <p className="text-gray-600">Loading map...</p>
              </div>
            </div>
          ) : (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={mapCenter}
              zoom={mapZoom}
              onClick={handleMapClick}
              onLoad={onMapLoad}
              options={defaultMapOptions}
            >
              {/* Directions Service  */}
              {directionsRequest && (
                <DirectionsService
                  options={directionsRequest}
                  callback={directionsCallback}
                />
              )}

              {/* Directions Renderer  */}
              {directions && (
                <DirectionsRenderer
                  options={{
                    directions: directions,
                    polylineOptions: {
                      strokeColor: "#1EC51D",
                      strokeOpacity: 0.8,
                      strokeWeight: 5,
                    },
                    suppressMarkers: true,
                    preserveViewport: false,
                  }}
                  onLoad={(directionsRenderer) => {
                    directionsRendererRef.current = directionsRenderer;
                  }}
                />
              )}

              {/* Pickup Marker */}
              {pickupCoords.lat && pickupCoords.lng && (
                <Marker
                  position={{ lat: pickupCoords.lat, lng: pickupCoords.lng }}
                  onClick={() => handleMarkerClick(pickupCoords, "pickup")}
                  icon={{
                    url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
                  }}
                />
              )}

              {/* Drop Marker */}
              {dropCoords.lat && dropCoords.lng && (
                <Marker
                  position={{ lat: dropCoords.lat, lng: dropCoords.lng }}
                  onClick={() => handleMarkerClick(dropCoords, "drop")}
                  icon={{
                    url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                  }}
                />
              )}

              {/* InfoWindow for selected marker */}
              {selectedMarker && (
                <InfoWindow
                  position={selectedMarker.position}
                  onCloseClick={() => setSelectedMarker(null)}
                >
                  <div className="p-2">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {selectedMarker.title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">
                      {selectedMarker.address}
                    </p>
                    <div
                      className={`mt-2 text-xs px-2 py-1 rounded inline-block ${
                        selectedMarker.type === "pickup"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {selectedMarker.type === "pickup" ? "Pickup" : "Drop"}
                    </div>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          )}
        </div>
      </div>

      {/* Loading indicator for route */}
      {isFetchingRoute && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#1EC51D]"></div>
          <span className="text-sm text-gray-700">Calculating route...</span>
        </div>
      )}

      {/* Floating Form */}
      <div
        className={`fixed top-4 left-4 z-50 transition-all duration-300 ${
          isFormExpanded ? "w-full max-w-md" : "w-16"
        }`}
      >
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
            {isFormExpanded ? (
              <>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    {t("book_a_ride")}
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">
                    {t("select_locations_below_or_on_map")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={clearLocations}
                    className="p-2 text-gray-500 hover:text-gray-700 cursor-pointer"
                    title="Clear"
                  >
                    <i className="fas fa-eraser text-sm"></i>
                  </button>
                  <button
                    onClick={() => setIsFormExpanded(false)}
                    className="p-2 text-gray-500 hover:text-gray-700 cursor-pointer"
                  >
                    <i className="fas fa-chevron-left text-sm"></i>
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={() => setIsFormExpanded(true)}
                className="w-full p-2 text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                <i className="fas fa-chevron-right text-sm"></i>
              </button>
            )}
          </div>

          {isFormExpanded && (
            <div className="max-h-[80vh] overflow-y-auto p-4 space-y-6">
              {/* Schedule Type Radio Buttons */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <i className="fas fa-clock text-[#1EC51D] text-xs"></i>{" "}
                  {t("ride_schedule")}
                </h3>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="scheduleType"
                      value="now"
                      checked={formData.scheduleType === "now"}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          scheduleType: e.target.value,
                        }))
                      }
                      className="w-4 h-4 text-[#1EC51D] focus:ring-[#1EC51D] border-gray-300"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {t("ride_now")}
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="scheduleType"
                      value="schedule"
                      checked={formData.scheduleType === "schedule"}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          scheduleType: e.target.value,
                        }))
                      }
                      className="w-4 h-4 text-[#1EC51D] focus:ring-[#1EC51D] border-gray-300"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {t("schedule_ride")}
                    </span>
                  </label>
                </div>

                {/* Schedule Date & Time Fields */}
                {formData.scheduleType === "schedule" && (
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        {t("date")} *
                      </label>
                      <input
                        type="date"
                        value={formData.scheduleDate}
                        onChange={(e) => {
                          handleDateChange(e.target.value);
                        }}
                        min={getMinDate()}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1EC51D] text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        {t("time")} *
                      </label>
                      <select
                        value={formData.scheduleTime}
                        onChange={(e) => handleTimeChange(e.target.value)}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1EC51D] text-sm"
                        required
                      >
                        {timeOptions.length === 0 ? (
                          <option value="">
                            No times available for this date
                          </option>
                        ) : (
                          timeOptions.map((time, index) => (
                            <option key={`${time}-${index}`} value={time}>
                              {time}
                            </option>
                          ))
                        )}
                      </select>
                      {timeOptions.length === 0 && formData.scheduleDate && (
                        <p className="text-xs text-red-500 mt-1">
                          All times for today have passed. Please select a
                          future date.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Rider Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <i className="fas fa-user text-[#1EC51D] text-xs"></i>{" "}
                  {t("rider_information")}
                </h3>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">
                    {t("rider_name")} ({t("optional")})
                  </label>
                  <input
                    type="text"
                    placeholder={t("enter_rider_name")}
                    value={formData.riderName || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        riderName: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1EC51D] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">
                    {t("mobile_number")} *
                  </label>

                  <PhoneInput
                    country="ke"
                    value={formData.phoneWithCode || ""}
                    onChange={(val, data) => {
                      const fullNumber = val.startsWith("+") ? val : `+${val}`;
                      setFormData((prev) => ({
                        ...prev,
                        phoneWithCode: fullNumber,
                        mobileNumber: val.replace(`+${data.dialCode}`, ""),
                        countryCode: `+${data.dialCode}`,
                      }));
                    }}
                    enableSearch
                    inputClass="w-full py-2 pl-14 pr-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1EC51D]"
                    inputStyle={{
                      width: "100%",
                      paddingLeft: "58px",
                      height: "44px",
                      fontSize: "15px",
                    }}
                    containerClass="!w-full"
                    buttonStyle={{
                      border: "none",
                      background: "transparent",
                      marginLeft: "8px",
                      paddingLeft: "10px",
                    }}
                    required
                  />
                </div>
              </div>

              {/* Ride Locations */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <i className="fas fa-map-marker-alt text-[#1EC51D] text-xs"></i>{" "}
                  {t("ride_locations")}
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      {t("pickup_location")} *
                    </label>
                    <input
                      id="pickup-autocomplete"
                      type="text"
                      placeholder="Enter pickup location or click on map"
                      value={getDisplayAddress(formData.pickupAddress) || ""}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          pickupAddress: e.target.value,
                        }));
                      }}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1EC51D] focus:border-transparent text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      {t("drop_location")} *
                    </label>
                    <input
                      id="drop-autocomplete"
                      type="text"
                      placeholder="Enter drop location or click on map"
                      value={getDisplayAddress(formData.dropAddress) || ""}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          dropAddress: e.target.value,
                        }));
                      }}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1EC51D] focus:border-transparent text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Promo Code Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <i className="fas fa-tag text-[#1EC51D] text-xs"></i>{" "}
                  {t("promo_code")}
                </h3>
                <div className="relative" ref={promoDropdownRef}>
                  {appliedPromo ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-green-800 text-sm">
                              {appliedPromo.promo_name}
                            </span>
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                              {t("applied")}
                            </span>
                          </div>
                          <p className="text-xs text-green-600 mt-1">
                            {appliedPromo.description}
                          </p>
                        </div>
                        <button
                          onClick={removePromo}
                          className="text-red-500 hover:text-red-700 cursor-pointer"
                          title={t("remove_promo")}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                      <div className="flex justify-between items-center mt-3 pt-3 border-t border-green-200">
                        <div className="text-sm">
                          <span className="font-medium text-green-700">
                            {t("code")}:{" "}
                          </span>
                          <span className="font-mono text-green-800">
                            {appliedPromo.promo_code}
                          </span>
                        </div>
                        <span className="font-bold text-green-800">
                          {appliedPromo.promo_type === 5
                            ? `${appSettings?.default_currency_symbol}${appliedPromo.discount} OFF`
                            : `${appliedPromo.discount}% OFF`}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder={t("select_promo_code")}
                          value={formData.promoCode}
                          readOnly
                          onClick={() =>
                            setShowPromoDropdown(!showPromoDropdown)
                          }
                          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1EC51D] text-sm cursor-pointer"
                        />
                        <button
                          onClick={() =>
                            setShowPromoDropdown(!showPromoDropdown)
                          }
                          className={`px-4 py-3 rounded-lg font-medium text-sm ${
                            user?.corporate_customer_id
                              ? "bg-[#1EC51D] text-white hover:bg-[#17a517] cursor-pointer"
                              : "bg-gray-200 text-gray-500 cursor-not-allowed"
                          }`}
                          disabled={!user?.corporate_customer_id}
                        >
                          {showPromoDropdown ? t("close") : t("select")}
                        </button>
                      </div>

                      {/* Promo Code Dropdown */}
                      {showPromoDropdown && (
                        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          {loadingPromoCodes ? (
                            <div className="flex justify-center py-4">
                              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#1EC51D]"></div>
                            </div>
                          ) : promoCodes.length === 0 ? (
                            <div className="py-4 px-4 text-center text-gray-500">
                              {t("no_promo_codes_available")}
                            </div>
                          ) : (
                            <div className="py-2">
                              {/* Applied Promos Section */}
                              {promoCodes.filter((promo) => promo.isApplied)
                                .length > 0 && (
                                <>
                                  <div className="px-4 py-2 bg-green-50 border-b border-green-100">
                                    <h5 className="text-xs font-semibold text-green-800 flex items-center gap-1">
                                      <i className="fas fa-check-circle"></i>
                                      {t("applied_promos")}
                                    </h5>
                                  </div>
                                  {promoCodes
                                    .filter((promo) => promo.isApplied)
                                    .map((promo) => (
                                      <div
                                        key={promo.id}
                                        onClick={() => applyPromo(promo)}
                                        className="px-4 py-3 hover:bg-green-50 cursor-pointer border-b border-green-100 bg-green-50"
                                      >
                                        <div className="flex justify-between items-start">
                                          <div>
                                            <div className="flex items-center gap-2">
                                              <h4 className="font-semibold text-gray-900 text-sm">
                                                {promo.promo_name}
                                              </h4>
                                              <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                                                {t("applied")}
                                              </span>
                                            </div>
                                            <p className="text-xs text-gray-600 mt-1">
                                              {t("promo_code")}:{" "}
                                              <span className="font-mono">
                                                {promo.promo_code}
                                              </span>
                                            </p>
                                          </div>
                                          <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                                            {promo.promo_type === 5
                                              ? `${appSettings?.default_currency_symbol}${promo.discount} OFF`
                                              : `${promo.discount}% OFF`}
                                          </span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2">
                                          {promo.description}
                                        </p>
                                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                                          <span>
                                            {t("min_fare")}:{" "}
                                            {
                                              appSettings?.default_currency_symbol
                                            }
                                            {promo.min_fare}
                                          </span>
                                          {promo.max_discount_value && (
                                            <span>
                                              {t("max_discount")}:{" "}
                                              {
                                                appSettings?.default_currency_symbol
                                              }
                                              {promo.max_discount_value}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                                    <h5 className="text-xs font-semibold text-gray-600">
                                      {t("all_available_promos")}
                                    </h5>
                                  </div>
                                </>
                              )}

                              {/* All available promos */}
                              {promoCodes
                                .filter((promo) => !promo.isApplied)
                                .map((promo) => (
                                  <div
                                    key={promo.id}
                                    onClick={() => applyPromo(promo)}
                                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                  >
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <h4 className="font-semibold text-gray-900 text-sm">
                                          {promo.promo_name}
                                        </h4>
                                        <p className="text-xs text-gray-600 mt-1">
                                          {t("promo_code")}:{" "}
                                          <span className="font-mono">
                                            {promo.promo_code}
                                          </span>
                                        </p>
                                      </div>
                                      <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                                        {promo.promo_type === 5
                                          ? `${appSettings?.default_currency_symbol}${promo.discount} OFF`
                                          : `${promo.discount}% OFF`}
                                      </span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                      {promo.description}
                                    </p>
                                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                                      <span>
                                        {t("min_fare")}:{" "}
                                        {appSettings?.default_currency_symbol}
                                        {promo.min_fare}
                                      </span>
                                      {promo.max_discount_value && (
                                        <span>
                                          {t("max_discount")}:{" "}
                                          {appSettings?.default_currency_symbol}
                                          {promo.max_discount_value}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                ))}
                            </div>
                          )}
                        </div>
                      )}

                      {!user?.corporate_customer_id && (
                        <p className="text-xs text-gray-500 mt-1">
                          Corporate account required to use promo codes
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <i className="fas fa-sticky-note text-[#1EC51D] text-xs"></i>{" "}
                  {t("additional_notes")}
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      {t("customer_note")} ({t("optional")})
                    </label>
                    <textarea
                      placeholder={t("enter_note_for_customer_service")}
                      value={formData.customerNote || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          customerNote: e.target.value,
                        }))
                      }
                      rows="2"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1EC51D] text-sm resize-none"
                      maxLength="500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.customerNote?.length || 0}/500 {t("characters")}
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      {t("driver_note")} ({t("optional")})
                    </label>
                    <textarea
                      placeholder={t("enter_note_for_driver")}
                      value={formData.driverNote || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          driverNote: e.target.value,
                        }))
                      }
                      rows="2"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1EC51D] text-sm resize-none"
                      maxLength="500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.driverNote?.length || 0}/500 {t("characters")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Company Name */}
              {user?.company_name && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <i className="fas fa-building text-[#1EC51D] text-xs"></i>{" "}
                    {t("company")}
                  </h3>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      {t("company_name")}
                    </label>
                    <input
                      type="text"
                      placeholder={t("company_name")}
                      value={formData.companyName || user?.company_name || ""}
                      disabled
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          companyName: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1EC51D] text-sm bg-gray-50"
                    />
                  </div>
                </div>
              )}

              {/* Vehicle Selection */}
              {pickupCoords.address && dropCoords.address && (
                <div className="space-y-4 mt-6">
                  <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <i className="fas fa-car text-[#1EC51D] text-xs"></i>{" "}
                    {t("select_vehicle")}
                  </h3>

                  {loadingVehicles ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1EC51D]"></div>
                    </div>
                  ) : vehicleTypes.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-4">
                      {t("no_vehicle_options_available_yet")}
                    </p>
                  ) : (
                    vehicleTypes.map((v) => (
                      <div
                        key={v.id}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            vehicleType: v.id,
                          }))
                        }
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                          formData.vehicleType === v.id
                            ? "border-[#1EC51D] bg-[#1EC51D]/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0">
                            <img
                              src={`${img_url}${v.active_icon}`}
                              alt={v.vehicle_type}
                              className="w-24 h-24 object-contain"
                              loading="lazy"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://via.placeholder.com/96x96?text=Vehicle";
                              }}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold text-gray-900 text-sm">
                                  {v.vehicle_type}
                                </h4>
                                <p className="text-xs text-gray-600 mt-1">
                                  {t("eta")}: {v.eta}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-gray-900">
                                  {appSettings.default_currency_symbol}
                                  {v.fares.total_fare}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {t("estimated")}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Buttons */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleBookRide}
                  disabled={
                    isBooking ||
                    !formData.pickupAddress ||
                    !formData.dropAddress ||
                    !formData.vehicleType ||
                    (formData.scheduleType === "schedule" &&
                      (!formData.scheduleDate || !formData.scheduleTime))
                  }
                  className={`w-full py-4 rounded-xl transition-colors font-semibold text-sm shadow-lg flex items-center justify-center ${
                    !isBooking &&
                    formData.pickupAddress &&
                    formData.dropAddress &&
                    formData.vehicleType &&
                    !(
                      formData.scheduleType === "schedule" &&
                      (!formData.scheduleDate || !formData.scheduleTime)
                    )
                      ? "bg-[#1EC51D] text-white hover:bg-[#17a517] shadow-[#1EC51D]/25 cursor-pointer"
                      : "bg-gray-300 text-gray-100 cursor-not-allowed"
                  }`}
                >
                  {isBooking ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : !formData.pickupAddress ||
                    !formData.dropAddress ||
                    !formData.vehicleType ? (
                    t("set_locations_to_continue")
                  ) : formData.scheduleType === "schedule" &&
                    (!formData.scheduleDate || !formData.scheduleTime) ? (
                    t("select_schedule_datetime")
                  ) : (
                    `${
                      formData.scheduleType === "schedule"
                        ? t("schedule")
                        : t("confirm_book_ride")
                    } Ride - ${appSettings?.default_currency_symbol}${
                      vehicleTypes.find((v) => v.id === formData.vehicleType)
                        ?.fares.total_fare || "-"
                    }`
                  )}
                </button>

                <button
                  onClick={() => navigate("/ride-booker")}
                  className="w-full py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm cursor-pointer"
                  disabled={isBooking}
                >
                  {t("cancel")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Status Panel */}
      <div className="fixed top-4 right-4 z-40">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  pickupCoords.address ? "bg-[#1EC51D]" : "bg-gray-300"
                }`}
              ></div>
              <span className="text-sm font-medium text-gray-700">
                {pickupCoords.address ? t("pickup_set") : t("pickup_not_set")}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  dropCoords.address ? "bg-red-500" : "bg-gray-300"
                }`}
              ></div>
              <span className="text-sm font-medium text-gray-700">
                {dropCoords.address ? t("drop_set") : t("drop_not_set")}
              </span>
            </div>
            {appliedPromo && (
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-sm font-medium text-gray-700">
                  {t("promo")}: {appliedPromo.promo_name}
                </span>
              </div>
            )}
            <div className="flex items-center gap-3 mt-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-sm font-medium text-gray-700">
                {t("ride_type")}:{" "}
                {formData.scheduleType === "now" ? t("now") : t("Schedule")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (shouldLoadScript) {
    return (
      <GoogleMap
        googleMapsApiKey={GOOGLE_MAPS_API_KEY}
        libraries={["places", "geometry"]}
        onError={onLoadScriptError}
        onLoad={() => {
          googleMapsLoaded = true;
          setShouldLoadScript(false);
        }}
      >
        {renderMapContent()}
      </GoogleMap>
    );
  }

  return renderMapContent();
};

export default RideBooking;
