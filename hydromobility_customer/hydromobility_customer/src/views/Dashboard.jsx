import { useTranslation } from "react-i18next";
import '../languages/i18next';

import React, { useState, useEffect, useRef, useCallback, useMemo, act } from "react";
import MapView, { Callout, Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Animated,
  Keyboard,
  FlatList,
  TextInput,
  StatusBar,
  Easing,
  ActivityIndicator,
  Linking,
  Platform,
  Modal
} from "react-native";
import { connect } from 'react-redux';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  screenHeight, screenWidth, trip_details, search_loader, normal, promo_codes, bold, GOOGLE_KEY, month_names,
  money_icon, discount_icon, no_favourites, add_favourite, get_home, api_url, img_url, get_estimation_fare, pin_marker,
  regular, get_zone, btn_loader, ride_confirm, trip_request_cancel, f_m, get_recent_searches,
  f_s,
  f_xs,
  f_tiny,
  f_l,
  f_xl,
  REVERSE_GEOCODE,
  ROUTEMAPPY_KEY,
  LATITUDE_DELTA,
  LONGITUDE_DELTA
} from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import * as colors from '../assets/css/Colors';
import DropShadow from "react-native-drop-shadow";
import axios from "axios";
import LottieView from 'lottie-react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getDatabase, ref, onValue, set } from '@react-native-firebase/database';


import Toast from "react-native-toast-message";
import { getApp } from '@react-native-firebase/app';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

import DatePicker from 'react-native-date-picker';

import { useSafeAreaInsets, SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import NetInfo from "@react-native-community/netinfo";
import RouteMappy from "../components/RouteMappy";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../context/ThemeContext";
import Geolocation from "@react-native-community/geolocation";
import { initialLat, initialLng, initialRegion } from "../actions/BookingActions";


const Dashboard = (props) => {
  const { t, i18n } = useTranslation();
  const insets = useSafeAreaInsets();
  const isNotchDevice = insets.top > 20;
  const navigation = useNavigation();
  const search = useRef();
  const map_ref = useRef();
  const inputRef = useRef();
  const fav_RBSheet = useRef();
  const add_contact_RBSheet = useRef();
  const [on_loaded, setOnLoaded] = useState(0);
  const [has_interacted, setHasInteracted] = useState(false);
  const [active_location, setActiveLocation] = useState(1);
  const [region, setRegion] = useState(props.initial_region);
  const [trip_types, setTripTypes] = useState([]);
  const [promo_list, setPromoList] = useState([]);
  const [promo, setPromo] = useState(0);
  const [trip_sub_types, setTripSubTypes] = useState([]);
  const [estimation_fares, setEstimationFares] = useState([]);
  const [online_vehicles, setOnlineVehicles] = useState([]);
  const [customer_favourites, setCustomerFavourties] = useState([]);
  const [customer_recent_places, setCustomerRecentPlaces] = useState([]);
  const [active_trip_type, setActiveTripType] = useState(0);
  const [active_trip_sub_type, setActiveTripSubType] = useState(0);
  const [active_vehicle_type, setActiveVehicleType] = useState(0);
  const [loading, setLoading] = useState(false);
  const [current_location_status, setCurrentLocationStatus] = useState(true);
  const [is_date_picker_visible, setDatePickerVisibility] = useState(false);
const [pickup_date, setPickupDate] = useState(() => new Date());
const [pickup_date_label, setPickupDateLabel] = useState(t('Schedule a Ride'));

  const [packages, setPackages] = useState([]);
  const [package_hr, setPackageHr] = useState(0);
  const [package_km, setPackageKm] = useState(0);
  const [package_id, setPackageId] = useState(0);
  const [is_mount, setIsMount] = useState(0);
  const [km, setKm] = useState(0);
  const [search_status, setSearchStatus] = useState(0);
  const [wallet, setWallet] = useState(0);
  const [is_modal_visible, setModalVisible] = useState(false);
  const duration = 500;
  const [trip_request_id, setTripRequestId] = useState(0);
  const [contact_number, setContactNumber] = useState('');
  const [search_loading, setSearchLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const mapHeight = useRef(new Animated.Value(screenHeight)).current;
  const [searching_home, setOnSearch] = useState(false);
  const [on_booking, setOnBooking] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const regionChangeTimeoutRef = useRef(null);
  const userInitiatedRegionChange = useRef(false);
  const [route_eta, setRouteEta] = useState(0);
  const [location_modal, setLocationModal] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isDestFocused, setIsDestFocused] = useState(false);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [searchText, setSearchText] = useState('');
  const [predictions, setPredictions] = useState([]);
  const fetchControllerRef = useRef(null);
    const { theme, toggleTheme, isDark } = useTheme();
  
  //Address
  const [pickup_address, setPickupAddress] = useState('');
  const [pickup_lat, setPickupLat] = useState(props.initial_lat);
  const [pickup_lng, setPickupLng] = useState(props.initial_lng);

  const [drop_address, setDropAddress] = useState('');
  const [drop_lat, setDropLat] = useState(0);
  const [drop_lng, setDropLng] = useState(0);

  const [tmp_address, setTmpAddress] = useState('');
  const [tmp_lat, setTmpLat] = useState(props.initial_lat);
  const [tmp_lng, setTmpLng] = useState(props.initial_lng);
  const hasInitialized = useRef(false);
  //Screen Home
  const home_comp_1 = useRef(new Animated.Value(-110)).current;
  const home_comp_2 = useRef(new Animated.Value(screenHeight + 290)).current;
  const [notice, setNotice] = useState(false);

  //Screen Location
  const drop_comp_1 = useRef(new Animated.Value(-110)).current;
  const drop_comp_2 = useRef(new Animated.Value(screenHeight + 150)).current;
  const drop_comp_3 = useRef(new Animated.Value(-130)).current;
  const drop_comp_4 = useRef(
    new Animated.Value(screenHeight + (screenHeight - 100)),
  ).current;

  //Screen Booking
  const book_comp_1 = useRef(new Animated.Value(screenHeight + 380)).current;
  const app = getApp();


  const callAllApis = () => {
    get_home_api();
    handleLocation();
    call_promo_codes();
  };

  useFocusEffect(
    useCallback(() => {
      callAllApis();

      const unsubscribeDrawerOpen = navigation.addListener('drawerOpen', () => {
        callAllApis();
      });

      const unsubscribeDrawerClose = navigation.addListener('drawerClose', () => {
        callAllApis();
      });

      return () => {
        unsubscribeDrawerOpen();
        unsubscribeDrawerClose();
      };
    }, [navigation])
  );

  useEffect(() => {
    
    if (!hasInitialized.current) {
      hasInitialized.current = true;

      onRegionChange(
        {
          latitude: props.initial_lat,
          longitude: props.initial_lng,
        },
        'P',
      );
      screen_home_entry();
      handle_region_change_complete({
        latitude: props.initial_lat,
        longitude: props.initial_lng,
      });
      booking_sync();
     
      view_recent_places();
    }

    const unsubscribeFocus = navigation.addListener('focus', () => {
      setIsMount(1);
    });

    return () => {
      unsubscribeFocus();
    };
  }, [navigation]);

  const onMapReady = () => {
    console.log('Map ready callback called');
    setMapReady(true);

    // Wait a moment before allowing user-initiated region detection
    regionChangeTimeoutRef.current = setTimeout(() => {
      userInitiatedRegionChange.current = true;
    }, 1000); // wait for 1 second
  };
  const onRegionChangeComplete = region => {
    console.log('Region change triggered');

    if (mapReady && userInitiatedRegionChange.current) {
      console.log('User-driven region change:', region);
      handle_region_change_complete(region);
    } else {
      console.log('Auto/initial region change ignored');
    }
  };
  useEffect(() => {


    return () => {
      if (regionChangeTimeoutRef.current) {
        clearTimeout(regionChangeTimeoutRef.current);
      }
    };
  }, []);
  useEffect(() => {
    const checkConnection = () => {
      NetInfo.fetch().then(state => {
        if (!state.isConnected) {
          ReactNativeHapticFeedback.trigger('impactLight', options);
          navigation.navigate('NoInternet');
        }
      });
    };
    checkConnection();
    const interval = setInterval(checkConnection, 10000);
    return () => clearInterval(interval);
  }, []);


   const handleLocation = async () => {
    try {
      if (Platform.OS === 'android') {
        await getCurrentLocation();
      } else {
        await getiOSLocation();
      }
    } catch (err) {
      console.warn('Location error, navigating to enable screen:', err);
    }
  };

  

  // iOS location
  const getiOSLocation = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          const region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          };
          props.initialRegion(region);
          props.initialLat(region.latitude);
          props.initialLng(region.longitude);
          resolve(region);
        },
        error => reject(error),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    });
  };

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          const region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          };
          props.initialRegion(region);
          props.initialLat(region.latitude);
          props.initialLng(region.longitude);
          resolve(region);
        },
        error => reject(error),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    });
  };

  useEffect(() => {
    Animated.timing(mapHeight, {
      toValue: screenHeight,
      duration: 250,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [on_booking]);

  const call_promo_codes = () => {
    axios({
      method: 'post',
      url: api_url + promo_codes,
      data: { lang: i18n.language, customer_id: global.id },
    })
      .then(async response => {
        setPromoList(response.data.result);
      })
      .catch(error => {
        console.log(error);
        showToast('error', t('Error'), t('Sorry something went wrong'));
      });
  };
  const showToast = (type, title, message) => {
    ReactNativeHapticFeedback.trigger('impactHeavy', options);
    Toast.show({
      type: type,
      text1: title,
      text2: message,
      visibilityTime: 5000,
      position: 'top', // or 'bottom'
      topOffset: 120, // optional: controls how far from top
    });
  };
  const call_apply_promo = data => {
    setPromo(data.id);
    toggleModal();
    get_estimation_fare_api(
      pickup_lat,
      pickup_lng,
      drop_lat,
      drop_lng,
      package_id,
      active_trip_sub_type,
      data.id,
    );
  };

  const booking_sync = () => {
    const db = getDatabase();
    const userRef = ref(db, `customers/${global.id}`);

    onValue(userRef, snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setSearchStatus(data.is_searching);

        if (data.booking_id !== 0) {
          if (is_mount === 0) {
            setIsMount(1);
            // booking_exit();
            setActiveTripType(1);
            call_trip_details(data.booking_id);
          }
        }
      }
    });
  };
  const centerToUserLocation = useCallback(() => {
    if (global.tile == 1) {
      map_ref.current.focusOnInitialRegion();
    }
    else {
      if (map_ref.current && region) {
        map_ref.current.animateToRegion({
          latitude: region.latitude,
          longitude: region.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }, 1000); // 1000ms animation duration
      }
    }



  }, []);
  const call_trip_details = trip_id => {
    axios({
      method: 'post',
      url: api_url + trip_details,
      data: { trip_id: trip_id },
    })
      .then(async response => {
        navigation.navigate('TripDetails', {
          trip_id: trip_id,
          from: 'home',
          data: response.data.result,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const toggleModal = () => {
    setModalVisible(!is_modal_visible);
  };


  const get_vehicles = () => {

    const db = getDatabase();
    const driversRef = ref(db, 'drivers');

    onValue(driversRef, snapshot => {
      setOnlineVehicles([]); // Reset state before updating

      if (snapshot.exists()) {
        snapshot.forEach(childSnapshot => {
          const driverData = childSnapshot.val();
          if (driverData) {
            if (Array.isArray(driverData)) {
              driverData.forEach(value => {
                if (
                  value &&
                  value.booking &&
                  value.booking.booking_status === 0 &&
                  value.online_status === 1
                ) {
                  setOnlineVehicles(prevArray => [
                    ...prevArray,
                    {
                      latitude: value.geo.lat,
                      longitude: value.geo.lng,
                      vehicle_slug: value.vehicle_slug,
                      bearing: value.geo.bearing,
                    },
                  ]);
                }
              });
            } else {
              Object.values(driverData).forEach(item => {
                if (
                  item &&
                  item.booking &&
                  item.booking.booking_status === 0 &&
                  item.online_status === 1
                ) {
                  setOnlineVehicles(prevArray => [
                    ...prevArray,
                    {
                      latitude: item.geo.lat,
                      longitude: item.geo.lng,
                      vehicle_slug: item.vehicle_slug,
                      bearing: item.geo.bearing,
                    },
                  ]);
                }
              });
            }
          }
        });
      }
    });
    setTimeout(() => {

      console.log("online_vehicles", online_vehicles)
    }, 1000)
  };

  const render_vehicles = () => {
    return online_vehicles.map((marker, i) => {
      //console.log(marker.bearing);
      if (marker.vehicle_slug == 'car') {
        return (
          <Marker coordinate={marker} key={i} rotation={marker.bearing}>
            <Image
              style={{ flex: 1, height: 30, width: 15 }}
              source={require('.././assets/img/tracking/car.png')}
            />
          </Marker>
        );
      } else if (marker.vehicle_slug == 'bike') {
        return (
          <Marker coordinate={marker} key={i}>
            <Image
              style={{ flex: 1, height: 29, width: 17 }}
              source={require('.././assets/img/tracking/bike.png')}
            />
          </Marker>
        );
      } else if (marker.vehicle_slug == 'truck') {
        return (
          <Marker coordinate={marker} key={i}>
            <Image
              style={{ flex: 1, height: 29, width: 17 }}
              source={require('.././assets/img/tracking/truck.png')}
            />
          </Marker>
        );
      }
    });
  };

  const set_default_date = async (currentdate, type) => {
    let datetime =
      (await (currentdate.getDate() < 10 ? '0' : '')) +
      currentdate.getDate() +
      '-' +
      (currentdate.getMonth() + 1 < 10 ? '0' : '') +
      (currentdate.getMonth() + 1) +
      '-' +
      currentdate.getFullYear() +
      ' ' +
      (currentdate.getHours() < 10 ? '0' : '') +
      currentdate.getHours() +
      ':' +
      (currentdate.getMinutes() < 10 ? '0' : '') +
      currentdate.getMinutes() +
      ':' +
      (currentdate.getSeconds() < 10 ? '0' : '') +
      currentdate.getSeconds();
    let label =
      (await (currentdate.getDate() < 10 ? '0' : '')) +
      currentdate.getDate() +
      ' ' +
      month_names[currentdate.getMonth()] +
      ', ' +
      formatAMPM(currentdate);
    if (type == 0) {
      setPickupDateLabel(t('Schedule a Ride'));
    } else {
      setPickupDateLabel(label);
    }

    setPickupDate(datetime);
  };

  const formatAMPM = date => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  };

  const screen_home_entry = () => {
    Keyboard.dismiss();
    setActiveLocation(1)
    Animated.timing(home_comp_1, {
      toValue: 60,
      duration: duration,
      useNativeDriver: true,
    }).start();
    Animated.timing(home_comp_2, {
      toValue: screenHeight,
      duration: duration,
      useNativeDriver: true,
    }).start();
    setPromo(0);
  };

  const screen_home_exit = () => {
    Animated.timing(home_comp_1, {
      toValue: -110,
      duration: duration,
      useNativeDriver: true,
    }).start();
    Animated.timing(home_comp_2, {
      toValue: screenHeight + 290,
      duration: duration,
      useNativeDriver: true,
    }).start();
  };

  const location_entry = () => {
    Animated.timing(drop_comp_1, {
      toValue: 60,
      duration: duration,
      useNativeDriver: true,
    }).start();
    Animated.timing(drop_comp_2, {
      toValue: screenHeight,
      duration: duration,
      useNativeDriver: true,
    }).start();
    Animated.timing(drop_comp_3, {
      toValue: 0,
      duration: duration,
      useNativeDriver: true,
    }).start();
  };

  const location_exit = () => {
    Animated.timing(drop_comp_1, {
      toValue: -110,
      duration: duration,
      useNativeDriver: true,
    }).start();
    Animated.timing(drop_comp_2, {
      toValue: screenHeight + 150,
      duration: duration,
      useNativeDriver: true,
    }).start();
    Animated.timing(drop_comp_3, {
      toValue: -130,
      duration: duration,
      useNativeDriver: true,
    }).start();
    Animated.timing(drop_comp_4, {
      toValue: screenHeight + (screenHeight - 100),
      duration: duration,
      useNativeDriver: true,
    }).start();
  };

  const search_entry = () => {
    Animated.timing(drop_comp_4, {
      toValue: 0,
      duration: duration,
      useNativeDriver: true,
    }).start();
  };

  const search_exit = location => {
    setActiveLocation(location);

    Keyboard.dismiss();
    setLocationModal(false);
    location_entry();
    screen_home_exit();
    Animated.timing(drop_comp_4, {
      toValue: screenHeight + (screenHeight - 100),
      duration: duration,
      useNativeDriver: true,
    }).start();
  };

  const booking_entry = () => {
    setOnBooking(true);

    location_exit();

    setCurrentLocationStatus(false);
    Animated.timing(book_comp_1, {
      toValue: screenHeight - 420,
      duration: duration,
      useNativeDriver: true,
    }).start();

  };

  const booking_exit = () => {
        set_default_date(new Date(), 0);
    setOnBooking(false);
    setRouteCoords([]);
    setDropAddress('');
    setDropLat(0);
    setDropLng(0);
    setActiveLocation(1)
    ReactNativeHapticFeedback.trigger('impactLight', options);

    if (map_ref.current) {
      // map_ref.current.focusOnInitialRegion();  
    }


    setCurrentLocationStatus(true);
    screen_home_entry();
    Animated.timing(book_comp_1, {
      toValue: screenHeight + 380,
      duration: duration,
      useNativeDriver: true,
    }).start();
  };

  const is_focus = () => {
    search_entry();
  };

  const handle_region_change_complete = region => {
    if (on_loaded == 1) {
      setHasInteracted(true);
    }
    if (!on_booking) {
      region_change(region);
    }
  };

  const region_change = region => {


    if (on_loaded == 1 && active_location == 2) {
      // screen_home_exit();

      // location_entry();
      onRegionChange(region, 'T');
    } else {
      setPickupAddress(t('Loading') + '...');
      onRegionChange(region, 'P');
    }
  };
  const onRegionChange = async (value, type) => {
    console.log('Reverse Geocoding for:', value.latitude, value.longitude);

    let url = '';

    if (global.geo_code == 2) {
      url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${value.latitude},${value.longitude}&key=${GOOGLE_KEY}`;
    } else {
      url = `${REVERSE_GEOCODE}lat=${value.latitude}&lon=${value.longitude}&key=${ROUTEMAPPY_KEY}`;
    }

    console.log('Fetching from URL:', url);

    try {
      const response = await fetch(url);
      const responseJson = await response.json();

      let address = '';

      if (global.geo_code == 2) {
        if (responseJson?.results?.[0]?.formatted_address) {
          address = responseJson.results[0].formatted_address;
        }
      } else {
        console.log('geocode_response', responseJson);
        // assuming your custom API returns { data: { address: "..." } }
        address = responseJson.display_name;
      }

      if (address) {
        console.log('Reverse geocode address:', address);
        if (type === 'P') {
          console.log('Setting pickup address:', address);
          setSearchText(getShortAddress(address));
          setPickupAddress(address);
          setPickupLat(value.latitude);
          setPickupLng(value.longitude);
          console.log("after_pick", pickup_address)

        } else {
          console.log('Setting temporary address:', address);
          setTmpAddress(address);
          setTmpLat(value.latitude);
          setTmpLng(value.longitude);
          setSearchText(getShortAddress(address));
          search.current?.setAddressText(getShortAddress(address));
        }
      } else {
        console.log('No address found in response.');
      }
    } catch (error) {
      console.error('Reverse geocode failed:', error);
    }
  };
  function getShortAddress(fullAddress) {
    const parts = fullAddress.split(',');
    if (parts.length >= 2) {
      return parts.slice(0, 3).join(',').trim(); // Take first 3 parts (0,1,2)
    }
    return fullAddress;
  }
  const confirm_location = async () => {
    if (active_location == 1) {
      // setPickupAddress(tmp_address);
      // setPickupLat(tmp_lat);
      // setPickupLng(tmp_lng);
      setLocationModal(true);
      setActiveLocation(2);
      setActiveInput({
        type: 'destination',
        value: drop_address || '',
      });
      setIsDestFocused(true);
      setIsFocused(false);
    } else {
      setDropAddress(tmp_address);
      setDropLat(tmp_lat);
      setDropLng(tmp_lng);
    }

    const isSameLocation =
      parseFloat(pickup_lat).toFixed(6) === parseFloat(tmp_lat).toFixed(6) &&
      parseFloat(pickup_lng).toFixed(6) === parseFloat(tmp_lng).toFixed(6);

    if (active_location == 2 && pickup_address !== '') {
      if (isSameLocation) {
        showToast(
          'error',
          t('Error'),
          t('Pickup and Drop location cannot be the same'),
        );
        return;
      }
      booking_entry();
      get_direction(`${pickup_lat},${pickup_lng}`, `${tmp_lat},${tmp_lng}`);
      get_estimation_fare_api(
        pickup_lat,
        pickup_lng,
        tmp_lat,
        tmp_lng,
        0,
        active_trip_sub_type,
        0,
      );
    } else if (active_location == 1 && drop_address !== '') {
      const isSame =
        parseFloat(tmp_lat).toFixed(6) === parseFloat(drop_lat).toFixed(6) &&
        parseFloat(tmp_lng).toFixed(6) === parseFloat(drop_lng).toFixed(6);

      if (isSame) {
        showToast(
          'error',
          t('Error'),
          t('Pickup and Drop location cannot be the same'),
        );

        return;
      }
      booking_entry();
      get_estimation_fare_api(
        tmp_lat,
        tmp_lng,
        drop_lat,
        drop_lng,
        0,
        active_trip_sub_type,
        0,
      );
      get_direction(`${tmp_lat},${tmp_lng}`, `${drop_lat},${drop_lng}`);
    } else {
      back_to_home_screen();
    }
  };
  

  const handleSelect = async place => {
    console.log('Selected Place:', place);

    let selectedPlace = {
      address: '',
      lat: 0,
      lng: 0,
    };

    try {
      if (global.places === 1) {
        if (!place?.description || !place?.location) {
          console.warn(
            'Invalid place object structure when using global.places == 1',
          );
          return;
        }

        selectedPlace = {
          address: place.description,
          lat: place.location.lat,
          lng: place.location.lng,
        };
      } else {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&key=${GOOGLE_KEY}`,
        );
        const json = await response.json();
        const result = json.result;

        if (!result?.geometry?.location) {
          console.warn('No geometry found in place details');
          return;
        }

        selectedPlace = {
          address: result.formatted_address,
          lat: result.geometry.location.lat,
          lng: result.geometry.location.lng,
        };
      }

      const { address, lat, lng } = selectedPlace;

      if (activeInput?.type === 'origin') {
        setOrigin(selectedPlace);
        setPickupAddress(address);
        setPickupLat(lat);
        setPickupLng(lng);
        console.log('Origin set:', selectedPlace);
      } else if (activeInput?.type === 'destination') {
        setDestination(selectedPlace);
        setDropAddress(address);
        setDropLat(lat);
        setDropLng(lng);

        if (pickup_address !== '') {
          booking_entry();
          get_estimation_fare_api(
            pickup_lat,
            pickup_lng,
            lat,
            lng,
            0,
            active_trip_sub_type,
            0,
          );
        }

        setLocationModal(false);
      }

      setPredictions([]);
      Keyboard.dismiss();
    } catch (error) {
      console.error('Failed to fetch place details:', error);
    }
  };

  const clearInput = type => {
    if (type === 'origin') {
      setOrigin(null); // clear origin object if needed
      setPickupAddress(''); // clear the visible input
    } else if (type === 'destination') {
      setDestination(null);
      setDropAddress(''); // if using similar pattern for drop
    }
    setPredictions([]);
  };

  const select_package = data => {
    screen_home_exit();
    setPackageId(data.id);
    setPackageHr(data.hours);
    setPackageKm(data.kilometers);
    booking_entry();
    get_estimation_fare_api(
      tmp_lat,
      tmp_lng,
      drop_lat,
      drop_lng,
      data.id,
      0,
      0,
    );
    console.log(tmp_lat, tmp_lng, drop_lat, drop_lng, data.id, 0, 0);
  };
  const get_location = (data, details, type) => {
    search_exit();
    setTmpAddress(data.description);
    setTmpLat(details.geometry.location.lat);
    setTmpLng(details.geometry.location.lng);
    set_location(details.geometry.location.lat, details.geometry.location.lng);
  };

  const set_location = (lat, lng) => {
    map_ref?.current?.animateCamera(
      {
        center: {
          latitude: lat,
          longitude: lng,
        },
      },
      { duration: 2000 },
    );
  };

  const back_to_home_screen = () => {
    location_exit();
    screen_home_entry();
    console.log;
  };

  const change_address = change_location => {
    location_exit();
    screen_home_entry();
    open_location(change_location);
  };

  const open_location = async location => {
    setActiveInput({
      type: 'destination',
      value: drop_address || '',
    });
    setIsDestFocused(true);
    setIsFocused(false);
    setLocationModal(true);
    setActiveLocation(location);
    screen_home_exit();


    return;
    //view_recent_places();
    search.current?.setAddressText('');
    search_entry();
    setActiveLocation(location);
    screen_home_exit();
    location_entry();
  };

const renderTripType = ({ item: data }) => {
  const icon =
    data.id === active_trip_type ? data.active_icon : data.inactive_icon;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => change_trip_type(data)}
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          height: 60,
          width: 60,
          borderRadius: 12,
          // padding: 10,
          
         
        }}
      >
        <Image
          style={{ height: undefined, width: undefined, flex: 1 }}
          source={{ uri: img_url + icon }}
        />
      </View>
      <View style={{ margin: 2 }} />
      <Text
        style={{
          fontSize: 13,
          fontFamily: regular,
          color:
            data.id === active_trip_type
              ? theme.textPrimary
              : theme.textSecondary,
        }}
      >
        {data.name}
      </Text>
    </TouchableOpacity>
  );
};

 const estimation_fare_list = () => {
  return estimation_fares.map((data, i) => {
    const isActive = active_vehicle_type === data.id;
    return (
      <TouchableOpacity
        key={i}
        activeOpacity={0.8}
        onPress={() => change_vehicle_type(data.id)}
        style={{
          width: '100%',
          borderWidth: isActive ? 2 : 0,
          borderColor: theme.primary,
          
          padding: 16,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        
        {/* Vehicle Icon */}
        <View
          style={{
            width: 60,
            height: 50,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 16,
          }}>
          <Image
            style={{
              height: 50,
              width: 50,
            }}
            source={{ uri: img_url + data.active_icon }}
          />
        </View>

        {/* Vehicle Info */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: theme.textPrimary,
              fontSize: 16,
              fontWeight: '400',
              marginBottom: 4,
            }}>
            {data.vehicle_type}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              width: '70%',
              color: theme.textSecondary,
              fontSize: f_tiny,
              fontWeight: '400',
              marginBottom: 4,
            }}>
            {data.description}
          </Text>
        </View>

        {/* Fare */}
        <View style={{ alignItems: 'flex-end' }}>
          <Text
            style={{
              color: theme.textPrimary,
              fontSize: 16,
              fontWeight: '600',
              marginBottom: 4,
            }}>
            {global.currency}{" "}
            {data.fares.total_fare}
          </Text>
          {promo !== 0 && (
            <View
              style={{
                backgroundColor: theme.surfaceVariant,
                borderRadius: 4,
                paddingHorizontal: 6,
                paddingVertical: 2,
              }}>
              <Text
                style={{
                  color: theme.textPrimary,
                  fontSize: f_tiny,
                  fontWeight: '500',
                }}>
                {t('Promo Applied')}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  });
};


  const load_location = (lat, lng) => {
    // console.log('r'+lat + '-' + lng)
    setTmpAddress(address);
    setTmpLat(lat);
    setTmpLng(lng);
    setDropAddress(address);
    setDropLat(lat);
    setDropLng(lng);
    back_to_home_screen();
    set_location(parseFloat(lat), parseFloat(lng));
    setTimeout(() => {
      confirm_location(1);
    }, 1000);
  };

  const favourites_list = () => {
    if (customer_favourites.length == 0) {
      return (
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{ height: 150, width: 150, alignSelf: 'center' }}>
            <LottieView
              style={{ flex: 1 }}
              source={no_favourites}
              autoPlay
              loop
            />
          </View>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={{
              fontSize: f_xs,
              color: colors.text_grey,
              fontFamily: regular,
            }}>
            {t('No data found')}
          </Text>
        </View>
      );
    } else {
      return customer_favourites.map((data, i) => {
        return (
          <TouchableOpacity
            key={i}
            activeOpacity={1}
            onPress={load_location.bind(this, data.lat, data.lng)}
            style={{
              width: '100%',
              flexDirection: 'row',
              borderBottomWidth: 0.5,
              paddingBottom: 10,
              paddingTop: 10,
            }}>
            <View
              style={{
                width: '15%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                type={Icons.MaterialIcons}
                name="near-me"
                color={colors.icon_inactive_color}
                style={{ fontSize: 22 }}
              />
            </View>
            <View
              style={{
                width: '85%',
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{
                  fontSize: f_s,
                  color: colors.text_grey,
                  fontFamily: regular,
                }}>
                {data.address}
              </Text>
            </View>
          </TouchableOpacity>
        );
      });
    }
  };

  const recent_places_list = () => {
    if (customer_recent_places.length == 0) {
      return (
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={{
              fontSize: 12,
              color: colors.text_grey,
              fontFamily: regular,
            }}>
            {t('No recent places searched')}
          </Text>
        </View>
      );
    } else {
      return customer_recent_places.slice(0, 3).map((data, i) => {
        return (
          <TouchableOpacity
            activeOpacity={1}
            key={i}
            onPress={load_location.bind(this, data.lat, data.lng)}
            style={{
              width: '100%',
              flexDirection: 'row',
              borderBottomWidth: 0.5,
              paddingBottom: 10,
              paddingTop: 10,
            }}>
            <View
              style={{
                width: '15%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                type={Icons.MaterialIcons}
                name="near-me"
                color={colors.icon_inactive_color}
                style={{ fontSize: 22 }}
              />
            </View>
            <View
              style={{
                width: '85%',
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{
                  fontSize: 16,
                  color: colors.text_grey,
                  fontFamily: regular,
                }}>
                {data.address}
              </Text>
            </View>
          </TouchableOpacity>
        );
      });
    }
  };

  const change_trip_type = async data => {
    ReactNativeHapticFeedback.trigger('impactLight', options);

    setActiveTripType(data.id);
    setTripSubTypes(data.trip_sub_type);
    if (data.trip_sub_type.length > 0) {
      setActiveTripSubType(data.trip_sub_type[0].id);
    } else {
      setActiveTripSubType(0);
    }
  };

  const get_home_api = async () => {
    setLoading(true);
    await axios({
      method: 'post',
      url: api_url + get_home,
      data: { lang: i18n.language, customer_id: global.id },
    })
      .then(async response => {
        setLoading(false);

        if (response.data.status == 1) {
          setTripTypes(response.data.result.trip_types);
          setPackages(response.data.result.packages);
          setCustomerFavourties(response.data.result.customer_favourites);
          setActiveTripType(response.data.result.trip_types[0].id);
        }
      })
      .catch(error => {
        setLoading(false);
        showToast('error', t('Error'), t('Sorry something went wrong'));
      });
  };

  const add_favourite_api = async () => {
    fav_RBSheet.current.close();
    console.log('Favourite API');
    console.log(api_url + add_favourite);
    console.log({
      customer_id: global.id,
      address: pickup_address,
      lat: pickup_lat,
      lng: pickup_lng,
    });
    setLoading(true);
    await axios({
      method: 'post',
      url: api_url + add_favourite,
      data: {
        customer_id: global.id,
        address: pickup_address,
        lat: pickup_lat,
        lng: pickup_lng,
      },
    })
      .then(async response => {
        setLoading(false);
        console.log(response.data);
        if (response.data.status == 1) {
          showToast(
            'success',
            t('Success'),
            t('Location added in your favourite spot'),
          );

          setCustomerFavourties(response.data.result);
        }
      })
      .catch(error => {
        setLoading(false);
        showToast('error', t('Error'), t('Sorry something went wrong'));
      });
  };

  const view_recent_places = async () => {
    console.log({ customer_id: global.id });
    //setLoading(true);
    await axios({
      method: 'post',
      url: api_url + get_recent_searches,
      data: { customer_id: global.id },
    })
      .then(async response => {
        setLoading(false);
        setCustomerRecentPlaces(response.data.result);
      })
      .catch(error => {
        setLoading(false);
        showToast('error', t('Error'), t('Sorry something went wrong'));
      });
  };

  const get_estimation_fare_api = async (
    lat1,
    lng1,
    lat2,
    lng2,
    package_id,
    sub_type,
    pr,
  ) => {
    console.log(api_url + get_estimation_fare)
    console.log({
      customer_id: global.id,
      pickup_lat: lat1,
      pickup_lng: lng1,
      drop_lat: lat2,
      drop_lng: lng2,
      trip_type: active_trip_type,
      promo: pr,
      lang: i18n.language,
      package_id: package_id,
      days: 1,
      trip_sub_type: sub_type,
    });
    setLoading(true);
    await axios({
      method: 'post',
      url: api_url + get_estimation_fare,
      data: {
        customer_id: global.id,
        pickup_lat: lat1,
        pickup_lng: lng1,
        drop_lat: lat2,
        drop_lng: lng2,
        trip_type: active_trip_type,
        promo: pr,
        lang: i18n.language,
        package_id: package_id,
        days: 1,
        trip_sub_type: sub_type,
      },
    })
      .then(async response => {
        setLoading(false);
        if (response.data.status == 1) {
          setEstimationFares(response.data.result['vehicles']);
          setWallet(response.data.result['wallet']);
          setKm(response.data.result['vehicles'][0].fares.km);
          change_vehicle_type(response.data.result['vehicles'][0].id);
          if (
            pr != 0 &&
            response.data.result['vehicles'][0].fares.discount <= 0
          ) {
            setPromo(0);
            showToast('error', t('Error'), t('Sorry promo not applied'));
          }
          get_direction(`${lat1},${lng1}`, `${lat2},${lng2}`);
        }
      })
      .catch(error => {
        setLoading(false);
      });
  };
  // Unified fetch function with type awareness
  const fetchPredictions = useCallback(
    async (input, type) => {
      if (!input) {
        setPredictions([]);
        return;
      }

      // Cancel previous request if it exists
      if (fetchControllerRef.current) {
        fetchControllerRef.current.abort();
      }

      const controller = new AbortController();
      fetchControllerRef.current = controller;

      try {
        setLoading(true);

        let url;
        if (global.places === 1 && props.initial_lat && props.initial_lng) {
          url = `https://api.routemappy.com/nearest?q=${encodeURIComponent(
            input,
          )}&key=${ROUTEMAPPY_KEY}&lat=${props.initial_lat}&lon=${props.initial_lng}`;
        } else {
          url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
            input,
          )}&key=${GOOGLE_KEY}&language=en`;
        }
        console.log("search_url", url)
        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();

        // Process predictions based on API type
        const processed =
          global.places === 1
            ? processCustomApiPredictions(data.features || [])
            : processGooglePredictions(data.predictions || []);

        // Only update if the active input hasn't changed
        if (activeInput?.type === type) {
          setPredictions(processed);
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Fetch error:', error);
        }
      } finally {
        setLoading(false);
      }
    },
    [props.initial_lat, props.initial_lng, activeInput],
  );

  // Process different API responses
  const processCustomApiPredictions = features => {
    return features.map(feature => {
      const properties = feature?.properties || {};
      const geometry = feature?.geometry || {};
      const coordinates = geometry?.coordinates || [0, 0];

      return {
        description: [properties.name, properties.city, properties.state]
          .filter(Boolean)
          .join(', '),
        place_id:
          properties.osm_id ||
          `temp-${Math.random().toString(36).slice(2, 11)}`,
        structured_formatting: {
          main_text: properties.name || 'Unnamed Location',
          secondary_text: [properties.city, properties.state]
            .filter(Boolean)
            .join(', '),
        },
        location: {
          lat: coordinates[1] ?? 0,
          lng: coordinates[0] ?? 0,
          address: [properties.name, properties.city]
            .filter(Boolean)
            .join(', '),
          city: properties.city,
          state: properties.state,
          country: properties.country,
        },
        _originalFeature: feature,
      };
    });
  };

  const processGooglePredictions = predictions => {
    return predictions.map(prediction => ({
      ...prediction,
      location: {
        lat: null,
        lng: null,
        address: prediction.description,
      },
    }));
  };
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }
  // Debounced fetch with input type awareness
  const debouncedFetch = useMemo(() => {
    return debounce((input, type) => {
      if (input.length > 1) {
        // Reduced minimum length for faster response
        fetchPredictions(input, type);
      } else {
        setPredictions([]);
      }
    }, 120); // Optimized debounce time
  }, [fetchPredictions]);

  // Unified input change handler
  const handleInputChange = (text, type) => {
    const setAddress = type === 'origin' ? setPickupAddress : setDropAddress;
    setAddress(text);
    setActiveInput({ type, value: text });

    // Immediate UI feedback
    if (text.length > 1) {
      setLoading(true);
    } else {
      setPredictions([]);
    }

    debouncedFetch(text, type);
  };

  // Input focus handlers
  const handleFocus = (type, currentValue) => {
    if (type === 'origin') {
      setIsFocused(true);
    } else {
      setIsDestFocused(true);
    }
    setActiveInput({ type, value: currentValue || '' });

    // Trigger search if there's existing text
    if (currentValue && currentValue.length > 1) {
      debouncedFetch(currentValue, type);
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (fetchControllerRef.current) {
        fetchControllerRef.current.abort();
      }
    };
  }, []);

  const get_direction = async (startLoc, destinationLoc) => {
    try {
      let url, points, eta_value;

      if (global.routing === 1) { // RouteMappy API
        url = `https://api.routemappy.com/route?from=${startLoc}&to=${destinationLoc}&key=${ROUTEMAPPY_KEY}`;
        const resp = await fetch(url);
        const respJson = await resp.json();

        // Decode RouteMappy polyline
        points = decodePolyline(
          respJson.paths[0].points,
          respJson.paths[0].points_encoded_multiplier
        );

        // Calculate adjusted ETA
        eta_value = adjustTimeBasedOnDistance(
          respJson.paths[0].distance,
          respJson.paths[0].time
        );

      } else { // Google Directions API
        url = `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${GOOGLE_KEY}`;
        const resp = await fetch(url);
        const respJson = await resp.json();

        // Decode Google polyline
        points = decodePolyline(
          respJson.routes[0].overview_polyline.points,
          1e5 // Google's standard precision
        );

        // Get Google's ETA
        eta_value = respJson.routes[0].legs[0].duration.value;
      }
      console.log(url)


      // Transform coordinates based on tile provider
      let coords;
      if (global.tile === 1) { // RouteMappy tile format [lng, lat]
        coords = points.map(([lat, lng]) => [lng, lat]);
      } else { // Google tile format {latitude, longitude}
        coords = points.map(([lat, lng]) => ({
          latitude: lat,
          longitude: lng
        }));
      }

      setRouteCoords(coords);
      setRouteEta(eta_value);
    

    } catch (error) {
      console.error('get_direction error:', error);
      setRouteCoords([]);
      setRouteEta(null);
    }
  };


  // Helper to format ETA seconds to "X min" format

  const fitToPickupAndDrop = () => {
    if (!pickup || !drop) return;

    // Ensure coordinates are in {latitude, longitude} format
    const pickupCoords = Array.isArray(pickup)
      ? { latitude: pickup_lat, longitude: pickup_lng }
      : pickup_lat;

    const dropCoords = Array.isArray(drop)
      ? { latitude: drop_lat, longitude: drop_lng }
      : drop_lat;

    // Calculate bounds
    const minLat = Math.min(pickupCoords.latitude, dropCoords.latitude);
    const maxLat = Math.max(pickupCoords.latitude, dropCoords.latitude);
    const minLng = Math.min(pickupCoords.longitude, dropCoords.longitude);
    const maxLng = Math.max(pickupCoords.longitude, dropCoords.longitude);

    // Calculate center and deltas with padding
    const center = {
      latitude: (minLat + maxLat) / 2,
      longitude: (minLng + maxLng) / 2
    };

    const latitudeDelta = (maxLat - minLat) * 1.5; // 50% padding
    const longitudeDelta = (maxLng - minLng) * 1.5;

    // Animate map to fit both locations
    map_ref.current?.animateToRegion({
      ...center,
      latitudeDelta,
      longitudeDelta
    }, 1000);
  };

  // Unified polyline decoder for both APIs
  function decodePolyline(encoded, multiplier) {
    if (!encoded) return [];

    const coordinates = [];
    let index = 0, lat = 0, lng = 0;

    while (index < encoded.length) {
      // Latitude
      let byte, shift = 0, result = 0;
      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
      lat += (result & 1) ? ~(result >> 1) : (result >> 1);

      // Longitude
      shift = 0, result = 0;
      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
      lng += (result & 1) ? ~(result >> 1) : (result >> 1);

      coordinates.push([lat / multiplier, lng / multiplier]);
    }

    return coordinates;
  }
  const formatETA = (eta) => {
    if (!eta) return 'Calculating...';

    // Handle different API formats
    if (global.routing === 1) { // RouteMappy
      const totalMinutes = Math.round(eta / 60000); // Convert ms to minutes
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      if (hours === 0) return `${minutes} Min`;
      if (minutes === 0) return `${hours} Hr`;
      return `${hours} Hr ${minutes} Min`;
    } else { // Google
      const totalMinutes = Math.round(eta / 60); // Convert seconds to minutes
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      if (hours === 0) return `${minutes} Min`;
      if (minutes === 0) return `${hours} Hr`;
      return `${hours} Hr ${minutes} Min`;
    }
  };

  // Helper to find midpoint coordinate
  const getMiddleCoordinate = (coords) => {
    if (!coords || coords.length === 0) return null;
    const midIndex = Math.floor(coords.length / 2);
    return coords[midIndex];
  };
  const adjustTimeBasedOnDistance = (distanceInMeters, timeInMs) => {
    console.log('adjustTimeBasedOnDistance', distanceInMeters, timeInMs);
    if (distanceInMeters < 10000) {
      console.log('City driving conditions', timeInMs * 2.0);
      return timeInMs * 2.0; // city
    } else if (distanceInMeters < 50000) {
      console.log('Suburban driving conditions', timeInMs * 1.5);
      return timeInMs * 1.5; // suburban
    } else {
      console.log('Highway driving conditions', timeInMs * 1.2);
      return timeInMs * 1.2; // highway
    }
  };

  const call_zone = async contact => {
    add_contact_RBSheet.current.close();
    setLoading(true);
    console.log({ lat: pickup_lat, lng: pickup_lng });
    await axios({
      method: 'post',
      url: api_url + get_zone,
      data: { lat: pickup_lat, lng: pickup_lng },
    })
      .then(async response => {
        if (response.data.result == 0) {
          setLoading(false);
          showToast(
            'error',
            t('Not Available'),
            t('Our service is not available in your location'),
          );
        } else {
          call_ride_confirm(response.data.result, contact);
        }
      })
      .catch(error => {
        setLoading(false);
        showToast('error', t('Error'), t('Sorry something went wrong'));
      });
  };

  const call_ride_confirm = async (zone, contact) => {
    console.log('call_ride_confirm_api');
    console.log(api_url + ride_confirm);
    console.log({
      km: km,
      promo: promo,
      vehicle_type: active_vehicle_type,
      payment_method: 1,
      customer_id: global.id,
      trip_type: active_trip_type,
      surge: 1,
      pickup_address: pickup_address,
      pickup_date: pickup_date,
      pickup_lat: pickup_lat,
      pickup_lng: pickup_lng,
      drop_address: drop_address,
      drop_lat: drop_lat,
      drop_lng: drop_lng,
      package_id: package_id,
      trip_sub_type: active_trip_sub_type,
      stops: JSON.stringify([]),
      zone: zone,
      contact: contact,
    });
    setLoading(true);
    await axios({
      method: 'post',
      url: api_url + ride_confirm,
      data: {
        km: km,
        promo: promo,
        vehicle_type: active_vehicle_type,
        payment_method: 1,
        customer_id: global.id,
        trip_type: active_trip_type,
        surge: 1,
        pickup_address: pickup_address,
        pickup_date: pickup_date,
        pickup_lat: pickup_lat,
        pickup_lng: pickup_lng,
        drop_address: drop_address,
        drop_lat: drop_lat,
        drop_lng: drop_lng,
        package_id: package_id,
        trip_sub_type: active_trip_sub_type,
        stops: JSON.stringify([]),
        zone: zone,
        contact: contact,
      },
    })
      .then(async response => {
        setLoading(false);
        if (response.data.status == 1) {
          setTripRequestId(response.data.result);
          if (response.data.booking_type == 2) {
            showToast(
              'success',
              t('Booking placed successfully'),
              t('You can see you bookings in my rides menu'),
            );
          }
          // booking_exit();
        } else {
          if (
            response.data.message == 'Sorry drivers not available right now'
          ) {
            showToast(
              'error',
              t('No Driver'),
              t('Sorry drivers not available right now'),
            );
          } else {
            showToast('error', t('Error'), response.data.message);
          }
        }
      })
      .catch(error => {
        setLoading(false);
        console.log('error');
        console.log(error);
        showToast('error', t('Error'), t('Sorry something went wrong'));
      });
  };

  const change_vehicle_type = vehicle_type => {
    ReactNativeHapticFeedback.trigger('impactLight', options);
    //alert(vehicle_type+'-'+km);
    setActiveVehicleType(vehicle_type);
    //setKm(km);
  };
const show_date_picker = () => {
  setPickupDate(new Date());
  setDatePickerVisibility(true);
};

const hide_date_picker = () => {
  setDatePickerVisibility(false);
};

 const handle_confirm = date => {
  if (!(date instanceof Date) || isNaN(date)) {
    hide_date_picker();
    return;
  }

  const currentDate = new Date();

  if (date < currentDate) {
    showToast(
      'error',
      t('Invalid time'),
      t('Ensure the chosen time is not in the past'),
    );

    hide_date_picker();
    setPickupDateLabel(t('Schedule a Ride'));
    setPickupDate(new Date());
    return;
  }

  hide_date_picker();
  setPickupDate(date);
  set_default_date(date, 1);
};


  const navigate_promo = () => {
    //navigation.navigate("Promo")
    setModalVisible(true);
  };

  const change_trip_sub_type = id => {
    setActiveTripSubType(id);
    get_estimation_fare_api(
      pickup_lat,
      pickup_lng,
      drop_lat,
      drop_lng,
      0,
      id,
      0,
    );
  };

  const load_trip_sub_types = () => {
  return trip_sub_types.map((item, i) => {
    const isActive = active_trip_sub_type === item.id;
    return (
      <TouchableOpacity
        key={i}
        onPress={() => change_trip_sub_type(item.id)}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 16,
          borderRadius: 8,
          marginHorizontal: 4,
          backgroundColor: isActive ? theme.primary : theme.surface,
          borderWidth: 1,
          borderColor: isActive ? theme.primary : theme.divider,
        }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: bold,
            color: isActive ? theme.onPrimary : theme.textSecondary,
          }}>
          {item.trip_sub_type}
        </Text>
      </TouchableOpacity>
    );
  });
};


 const show_packages = () => {
  return packages.map((data, i) => {
    return (
      <TouchableOpacity
        key={i}
        onPress={() => select_package(data)}
        style={{
          width: 60,
          height: 50,
          borderColor: theme.divider,
          marginLeft: 5,
          marginRight: 5,
          borderRadius: 10,
          padding: 5,
          borderWidth: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: theme.textPrimary,
            fontSize: f_xs,
            fontFamily: bold,
          }}
        >
          {data.hours} {t("Hr")}
        </Text>
        <View style={{ margin: 2 }} />
        <Text
          style={{
            color: theme.textSecondary,
            fontSize: f_xs,
            fontFamily: regular,
          }}
        >
          {data.kilometers} {t("km")}
        </Text>
      </TouchableOpacity>
    );
  });
};


const screen_home = () => {
  return (
    <View>
      {/* Top bar */}
      <Animated.View
        style={[
          { transform: [{ translateY: home_comp_1 }] },
          {
            position: 'absolute',
            width: '100%',
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          },
        ]}>
        <DropShadow
          style={{
            width: '90%',
            shadowColor: theme.shadow_color,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
          }}>
          <View
            style={{
              width: '100%',
              backgroundColor: theme.background,
              borderRadius: 10,
              height: 50,
              flexDirection: 'row',
            }}>
            {/* Menu Button */}
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                navigation.toggleDrawer();
                ReactNativeHapticFeedback.trigger('impactLight', options);
              }}
              style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
              <Icon
                type={Icons.MaterialIcons}
                name="menu"
                color={theme.textPrimary}
                style={{ fontSize: 22 }}
              />
            </TouchableOpacity>

            {/* Pickup Address */}
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => open_location(1)}
              style={{ width: '70%', alignItems: 'flex-start', justifyContent: 'center' }}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  color: theme.textPrimary,
                  fontSize: f_xs,
                  fontFamily: normal,
                }}>
                {loading ? t('Loading')+'...' : pickup_address}
              </Text>
            </TouchableOpacity>

          
          </View>
        </DropShadow>
      <TouchableOpacity
  activeOpacity={0.7}
  onPress={show_date_picker}
  style={{
    position: "absolute",
    right: 20,
    top: 70,
    minWidth: 120,
    paddingHorizontal: 16,
    height: 42,
    borderRadius: 12,
    backgroundColor: theme.surface,
    borderWidth: 0.6,
    borderColor: theme.divider,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",

    // Shadow (iOS + Android)
    shadowColor: theme.shadow_color,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  }}
>
  {pickup_date_label === t("Schedule a Ride") ? (
    <>
      <Icon
        type={Icons.MaterialIcons}
        name="schedule"
        color={theme.textPrimary}
        style={{ fontSize: 18, marginRight: 6 }}
      />
      <Text
        style={{
          color: theme.textSecondary,
          fontSize: f_xs,
          fontFamily: regular,
          marginTop: 1,
        }}
      >
        {pickup_date_label}
      </Text>
    </>
  ) : (
    <Text
      style={{
        color: theme.textPrimary,
        fontSize: f_xs,
        fontFamily: regular,
        fontWeight: "600",
        letterSpacing: 0.1,
      }}
      numberOfLines={1}
    >
      {pickup_date_label}
    </Text>
  )}
</TouchableOpacity>

      </Animated.View>

      {/* Bottom Card */}
      <Animated.View
        style={[
          { transform: [{ translateY: home_comp_2 }] },
          {
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: 200,
            backgroundColor: theme.background,
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <FlatList
            data={trip_types}
            renderItem={renderTripType}
            keyExtractor={item => item.id.toString()}
            horizontal
            ItemSeparatorComponent={<View style={{ margin: 8 }} />}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={{ margin: 5 }} />

        {active_trip_type !== 2 ? (
          <View>
            <DropShadow
              style={{
                width: '100%',
                padding: 10,
                shadowColor: theme.shadow_color,
                shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
              }}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => open_location(2)}
                style={{
                  width: '100%',
                  backgroundColor: theme.surface,
                  borderRadius: 10,
                  height: 50,
                  flexDirection: 'row',
                }}>
                {/* Search Icon */}
                <View
                  style={{
                    width: '15%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon
                    type={Icons.MaterialIcons}
                    name="search"
                    color={theme.textPrimary}
                    style={{ fontSize: 30 }}
                  />
                </View>

                {/* Search Text */}
                <View style={{ width: '85%', alignItems: 'flex-start', justifyContent: 'center' }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: theme.textSecondary,
                    }}>
                    Destination
                  </Text>
                </View>
              </TouchableOpacity>
            </DropShadow>
          </View>
        ) : (
          <View style={{ height: 60, flexDirection: 'row', alignItems: 'center' }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {show_packages()}
            </ScrollView>
          </View>
        )}
      </Animated.View>
    </View>
  );
};


  const screen_location = () => {
    return (
      <View>
        <Animated.View
          style={[
            { transform: [{ translateY: drop_comp_3 }] },
            [
              {
                position: 'absolute',
                width: '100%',
                alignItems: 'flex-start',
                padding: 10,
                paddingBottom: 10,
                justifyContent: 'center',
                zIndex: 10,
              },
              { marginTop: isNotchDevice ? insets.top : 0 },
            ],
          ]}>
          
            <TouchableOpacity
              onPress={back_to_home_screen.bind(this)}
              style={{
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.background,
                borderRadius: 20,
                elevation:5,
                padding: 5,
                  shadowColor: '#000',
              shadowOffset: {
                width: 4,
                height: 4,
              },
              shadowOpacity: 0.3,
              shadowRadius: 5,
              }}>
              <Icon
                type={Icons.MaterialIcons}
                name="arrow-back"
                color={theme.textPrimary}
                style={{ fontSize: 22 }}
              />
            </TouchableOpacity>

  
        </Animated.View>
        <Animated.View
          style={[
            { transform: [{ translateY: drop_comp_2 }] },
            [
              {
                position: 'absolute',
                bottom: 10,
                width: '100%',
                height: 100,
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
              },
            ],
          ]}>
          <DropShadow
            style={{
              width: '100%',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.3,
              shadowRadius: 5,
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={confirm_location.bind(this, 0)}
              style={{
                width: '90%',
                backgroundColor: theme.primary,
                borderRadius: 10,
                height: 50,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  color: theme.onPrimary,
                  fontSize: 16,
                 
                  fontFamily: regular,
                }}>
                {t('Confirm Location')}
              </Text>
            </TouchableOpacity>
          </DropShadow>
        </Animated.View>
        <Animated.View
          style={[
            { transform: [{ translateY: drop_comp_4 }] },
            [
              {
                position: 'absolute',
                width: '100%',
                height: screenHeight,
                alignItems: 'center',
                paddingBottom: 10,
                justifyContent: 'flex-start',
                backgroundColor: colors.theme_bg_three,
                zIndex: 10,
              },
            ],
          ]}>
          <View style={{ marginTop: isNotchDevice ? 150 + insets.top : 150 }} />
          <TouchableOpacity
            activeOpacity={1}
            onPress={search_exit.bind(this)}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
              borderColor: colors.grey,
            }}>
            <Icon
              type={Icons.MaterialIcons}
              name="location-on"
              color={colors.icon_inactive_color}
              style={{ fontSize: 22 }}
            />
            <View style={{ margin: 5 }} />
            <Text
              style={{ fontSize: 18, color: colors.text_grey, fontFamily: bold }}>
              {t('Locate on map')}
            </Text>
          </TouchableOpacity>
          <View style={{ margin: 10 }} />
          <ScrollView>
            <Text
              style={{
                fontSize: 18,
                color: colors.text_grey,
                fontFamily: bold,
                marginLeft: 10,
              }}>
              {t('Recent Places')}
            </Text>
            <ScrollView style={{ width: '100%', padding: 10 }}>
              {recent_places_list()}
              <View style={{ margin: 10 }} />
            </ScrollView>
            <Text
              style={{
                fontSize: 18,
                color: colors.text_grey,
                fontFamily: bold,
                marginLeft: 10,
              }}>
              {t('Favourite Locations')}
            </Text>
            <ScrollView style={{ width: '100%' }}>
              {favourites_list()}
              <View style={{ margin: 10 }} />
            </ScrollView>
          </ScrollView>
        </Animated.View>
        <Animated.View
          style={[
            { transform: [{ translateY: drop_comp_1 }] },
            [
              {
                position: 'absolute',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
              },
            ],
          ]}>
          <DropShadow
            style={{
              width: '90%',
              shadowColor: '#000',
              shadowOffset: {
                width: 2,
                height: 4,
              },
              shadowOpacity: 0.2,
              shadowRadius: 2,
            }}>
            <TouchableOpacity
              onPress={open_location.bind(this, active_location)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                backgroundColor: theme.background,
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 6,
                marginTop: isNotchDevice ? insets.top : 0,
                elevation: 3,
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowOffset: { width: 0, height: 1 },
                shadowRadius: 2,
              }}>
              <Icon
                type={Icons.MaterialIcons}
                name="search"
                size={20}
                color={theme.textPrimary}
                style={{ marginRight: 8 }}
              />

              <TextInput
                value={searchText}
                editable={false}
                placeholder={
                  active_location == 1
                    ? t('Enter The Pickup Location')
                    : t('Enter The Destination')
                }
                placeholderTextColor={colors.text_grey}
                style={{
                  flex: 1,
                  height: 40,
                  fontSize: f_xs,
                  fontFamily: normal,
                  color: theme.textPrimary,
                }}
                returnKeyType="search"
              />
            </TouchableOpacity>
          </DropShadow>
        </Animated.View>
      </View>
    );
  };

  const screen_booking = () => {
  return (
    <>
      {!current_location_status && (
        <DropShadow
          style={{
            width: "100%",
            shadowColor: theme.shadow_color,
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
          }}
        >
          <TouchableOpacity
            activeOpacity={0}
            onPress={booking_exit.bind(this)}
            style={[
              {
                width: 40,
                height: 40,
                backgroundColor: theme.background,
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",
                top: 20,
                left: 20,
                elevation: 5,
              },
              { marginTop: isNotchDevice ? insets.top : 0 },
            ]}
          >
            <Icon
              type={Icons.MaterialIcons}
              name="arrow-back"
              color={theme.textPrimary}
              style={{ fontSize: 22 }}
            />
          </TouchableOpacity>
        </DropShadow>
      )}

      <Animated.View
        style={[
          { transform: [{ translateY: book_comp_1 }] },
          {
            position: "absolute",
            width: "100%",
            backgroundColor: theme.background,
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
          },
        ]}
      >
        {/* Wallet Info */}
        <View
          style={{
            width: "100%",
            height: 30,
            backgroundColor: theme.primary,
            alignItems: "center",
            justifyContent: "center",
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
          }}
        >
         
        </View>

        {/* Date Picker Button */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={show_date_picker.bind(this)}
          style={{
            position: "absolute",
            right: 10,
            bottom: 430,
            width: 100,
            alignSelf: "flex-end",
            backgroundColor: theme.surface,
            paddingHorizontal: 14,
            height: 40,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 0.5,
            borderColor: theme.divider,
            shadowColor: theme.shadow_color,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 3,
            flexDirection: "row",
          }}
        >
          {pickup_date_label == t("Schedule a Ride") ? (
            <>
              <Icon
                type={Icons.MaterialIcons}
                name="schedule"
                color={theme.textPrimary}
                style={{ fontSize: 18, marginRight: 6 }}
              />
              <Text
                style={{
                  color: theme.textSecondary,
                  fontSize: f_xs,
                  fontFamily: regular,
                  marginTop: 2,
                  fontWeight: "500",
                }}
              >
                {pickup_date_label}
              </Text>
            </>
          ) : (
            <Text
              style={{
                color: theme.textSecondary,
                fontSize: f_xs,
                fontFamily: regular,
                letterSpacing: -0.2,
                fontWeight: "500",
              }}
            >
              {pickup_date_label}
            </Text>
          )}
        </TouchableOpacity>

        {/* Trip type scrollable */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: theme.background, maxHeight: 280, minHeight: 280 }}
        >
          {active_trip_type == 2 ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 10,
                }}
              >
                <Icon
                  type={Icons.MaterialIcons}
                  name="schedule"
                  color={theme.textSecondary}
                  style={{ fontSize: f_l }}
                />
              </View>
              <Text
                style={{
                  color: theme.textPrimary,
                  fontSize: f_l,
                  fontFamily: "System",
                  fontWeight: "500",
                }}
              >
                {package_hr || "4"} Hrs • {package_km || "50"} Km
              </Text>
            </View>
          ) : (
            <View style={{ flexDirection: "row" }} />
          )}

          {trip_sub_types.length > 0 && (
            <View
              style={{
                marginTop: 5,
                marginBottom: 5,
                marginHorizontal: 10,
                flexDirection: "row",
                flex: 1,
                backgroundColor: theme.surface,
              }}
            >
              {load_trip_sub_types()}
            </View>
          )}

          <View style={{ paddingHorizontal: 10 }}>
            <View style={{ margin: 5 }} />
            {estimation_fare_list()}
          </View>
        </ScrollView>

        {/* Payment / Footer */}
        <View
          style={{
            height: 100,
            alignItems: "center",
            backgroundColor: theme.surface,
          }}
        >
          <View
            style={{
              height: 40,
              width: "100%",
              flexDirection: "row",
              backgroundColor: theme.surface,
            }}
          >
            <TouchableOpacity
              style={{
                width: "46%",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                backgroundColor: theme.surface,
              }}
            >
              <Image source={money_icon} style={{ width: 30, height: 40 }} />
              <View style={{ margin: 5 }} />
              <Text
                numberOfLines={1}
                style={{
                  color: theme.textPrimary,
                  fontSize: 16,
                  fontFamily: regular,
                }}
              >
                {t("Cash")}
              </Text>
            </TouchableOpacity>

            <View
              style={{
                margin: "2%",
                borderLeftWidth: 1,
                borderColor: theme.divider,
              }}
            />

            <TouchableOpacity
              activeOpacity={1}
              onPress={navigate_promo.bind(this)}
              style={{
                width: "49%",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  color: theme.textPrimary,
                  fontSize: 16,
                  fontFamily: regular,
                }}
              >
                {t("Coupons")}
              </Text>
              <View style={{ margin: 5 }} />
              <Image source={discount_icon} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
          </View>

          {loading == false ? (
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                height: 50,
              }}
            >
              <TouchableOpacity
                onPress={call_zone.bind(this, "null")}
                activeOpacity={1}
                style={{
                  width: "42%",
                  backgroundColor: theme.primary,
                  borderRadius: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: theme.onPrimary,
                    fontSize: f_s,
                    fontFamily: regular,
                    padding: 10,
                  }}
                >
                  {t("Book Self")}
                </Text>
              </TouchableOpacity>

              <View style={{ margin: 5 }} />

              <TouchableOpacity
                onPress={() => add_contact_RBSheet.current.open()}
                activeOpacity={1}
                style={{
                  width: "45%",
                  backgroundColor: theme.primary,
                  borderRadius: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: theme.onPrimary,
                    fontSize: f_s,
                    fontFamily: regular,
                    padding: 10,
                  }}
                >
                  {t("Book for others")}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ height: 50, width: "90%", alignSelf: "center" }}>
              <LottieView style={{ flex: 1 }} source={btn_loader} autoPlay loop />
            </View>
          )}
        </View>
      </Animated.View>
    </>
  );
};


  const rb_favourite = () => {
    return (
      <RBSheet
        ref={fav_RBSheet}
        height={170}
        openDuration={250}
        customStyles={{
          container: {
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            padding: 10,
          },
        }}>
        <View style={{ padding: 10, width: '100%' }}>
          <Text
            style={{
              color: colors.theme_fg_two,
              fontSize: f_xl,
              fontFamily: normal,
            }}>
            {t('Save as favourite')}
          </Text>
          <View style={{ margin: 5 }} />
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              color: colors.theme_fg_two,
              fontSize: f_xs,
              fontFamily: regular,
            }}>
            {pickup_address}
          </Text>
        </View>
        <View style={{ margin: 10 }} />
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <View style={{ width: '1%' }} />
          <View
            style={{
              width: '48%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => fav_RBSheet.current.close()}
              style={{
                width: '100%',
                backgroundColor: colors.lite_grey,
                borderRadius: 5,
                height: 50,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: colors.theme_fg_two,
                  fontSize: 16,
                  color: colors.theme_fg_two,
                  fontFamily: normal,
                }}>
                {t('Cancel')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: '1%' }} />
          <View
            style={{
              width: '48%',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'flex-end',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => add_favourite_api()}
              style={{
                width: '100%',
                backgroundColor: colors.btn_color,
                borderRadius: 5,
                height: 50,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: colors.theme_fg_two,
                  fontSize: 16,
                  color: colors.theme_fg_three,
                  fontFamily: normal,
                }}>
                {t('Save')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
    );
  };

  const rb_add_contact = () => {
    return (
     <RBSheet
  ref={add_contact_RBSheet}
  height={270}
  openDuration={250}
  customStyles={{
    container: {
      
      padding: 10,
      backgroundColor:theme.background,
      borderRadius:30
    },
  }}>
  <View style={{ padding: 10, width: '100%' }}>
    <Text
      style={{
        color: theme.textPrimary,
        fontSize: 25,
        fontFamily: normal,
      }}>
      {t('Someone else taking this ride')} ?
    </Text>


    <TextInput
      ref={inputRef}
      secureTextEntry={false}
      keyboardType="numeric"
      placeholder={t('Enter Contact Number')}
      placeholderTextColor={theme.textSecondary}
      style={styles.textinput}
      onChangeText={TextInputValue => setContactNumber(TextInputValue)}
    />
  </View>


  <View style={{ flexDirection: 'row', width: '100%' }}>

    {/* Cancel button */}
    <View style={{ width: '48%', alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => add_contact_RBSheet.current.close()}
        style={{
          width: '100%',
          backgroundColor: theme.surface,
          borderRadius: 10,
          height: 50,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: theme.divider,
        }}>
        <Text
          style={{
            color: theme.textPrimary,
            fontSize: 16,
            fontFamily: regular,
          }}>
          {t('Cancel')}
        </Text>
      </TouchableOpacity>
    </View>

    <View style={{ width: '1%' }} />


    <View style={{ width: '48%', alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={call_contact_number_validation.bind()}
        style={{
          width: '100%',
          backgroundColor: theme.primary,
          borderRadius: 10,
          height: 50,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: theme.onPrimary,
            fontSize: 16,
            fontFamily: regular,
          }}>
          {t('Book Now')}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
</RBSheet>

    );
  };

  const call_contact_number_validation = () => {
    if (contact_number == '') {
      alert(t('Enter phone number to contact'));
    } else {
      call_zone(contact_number);
    }
  };

  const cancel_request = () => {
    setLoading(true);
    console.log(api_url + trip_request_cancel);
    console.log({ trip_request_id: trip_request_id });
    axios({
      method: 'post',
      url: api_url + trip_request_cancel,
      data: { trip_request_id: trip_request_id },
    })
      .then(async response => {
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };

  const search_dialog = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={search_status == 1}
        statusBarTranslucent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* Animated Background */}
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,

                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <LottieView
                style={{ width: '100%', height: '100%' }}
                source={search}
                autoPlay
                loop
                speed={0.5}
              />
            </View>

            {/* Main Content */}
            <View
              style={{
                backgroundColor: colors.theme_bg_three,
                width: '100%',
                maxWidth: 400,
                borderRadius: 20,
                padding: 30,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.3,
                shadowRadius: 20,
                elevation: 20,
                transform: [{ scale: 0.95 }],
              }}>
              {/* Search Animation */}
              <View
                style={{
                  width: 200,
                  height: 200,
                  marginBottom: 20,
                }}>
                <LottieView
                  style={{ flex: 1 }}
                  source={search_loader}
                  autoPlay
                  loop
                  speed={1.2}
                />
              </View>

              {/* Status Text */}
              <Text
                style={{
                  fontSize: 22,
                  fontFamily: normal,
                  color: colors.theme_fg_two,
                  textAlign: 'center',
                  marginBottom: 10,
                  lineHeight: 30,
                }}>
                {t('Searching for nearby drivers')}...
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  fontFamily: regular,
                  color: colors.text_grey,
                  textAlign: 'center',
                  marginBottom: 30,
                }}>
                {t('We are finding the best available driver for you')}
              </Text>

              {/* Cancel Button */}
              {loading == false ? (
                <TouchableOpacity
                  onPress={cancel_request}
                  activeOpacity={0.8}
                  style={{
                    backgroundColor: colors.error,
                    paddingVertical: 15,
                    paddingHorizontal: 40,
                    borderRadius: 50,
                    flexDirection: 'row',
                    alignItems: 'center',
                    shadowColor: colors.error,
                    shadowOffset: { width: 0, height: 5 },
                    shadowOpacity: 0.3,
                    shadowRadius: 10,
                    elevation: 5,
                  }}>
                  <Icon
                    type={Icons.MaterialIcons}
                    name="close"
                    color="#fff"
                    style={{ fontSize: 20, marginRight: 10 }}
                  />
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 18,
                      fontFamily: bold,
                    }}>
                    {t('Cancel Search')}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View
                  style={{
                    width: 150,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <LottieView
                    style={{ width: 100, height: 100 }}
                    source={btn_loader}
                    autoPlay
                    loop
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </Modal>
    );
  };
const date_picker = () => {
  const safeDate =
    pickup_date instanceof Date && !isNaN(pickup_date)
      ? pickup_date
      : new Date();

  return (
    <DatePicker
      modal
      open={is_date_picker_visible}
      date={safeDate}
      mode="datetime"
      minimumDate={new Date(Date.now() + 10 * 60 * 1000)}
      is24hourSource="locale"
      onConfirm={handle_confirm}
      onCancel={hide_date_picker}
    />
  );
};

const show_promo_list = ({ item }) => (
  <View style={{ alignItems: "center",  }}>
    <View
      style={{
        width: "100%",
        backgroundColor: theme.surface,
        borderRadius: 10,
        padding: 20,
        marginVertical: 5,
      }}
    >
      {/* Promo Name + Description */}
      <View style={{ width: "100%", alignItems: "flex-start", justifyContent: "center" }}>
        <Text style={{ color: theme.textPrimary, fontSize: 16, fontFamily: normal }}>
          {item.promo_name}
        </Text>
        <View style={{ margin: 3 }} />
        <Text style={{ color: theme.textSecondary, fontSize: 14, fontFamily: regular }}>
          {item.description}
        </Text>
      </View>

      <View style={{ margin: 5 }} />

      {/* Discount Box */}
      <View
        style={{
          width: "100%",
          borderRadius: 10,
          flexDirection: "row",
    
          padding: 10,
          backgroundColor: theme.background,
          borderStyle: "dotted",
        }}
      >
        <View style={{ width: "70%", alignItems: "flex-start", justifyContent: "center" }}>
          {item.promo_type == 5 && (
            <Text style={{ color: theme.textPrimary, fontSize: 16, fontFamily: normal }}>
              {item.discount}
              {global.currency} {t("OFF")}
            </Text>
          )}
          {item.promo_type == 6 && (
            <Text style={{ color: theme.textPrimary, fontSize: 16, fontFamily: normal }}>
              {item.discount}% {t("OFF")}
            </Text>
          )}
        </View>

        {/* Loader / Apply Button */}
        {loading ? (
          <View style={{ height: 50, width: "90%", alignSelf: "center" }}>
            <LottieView style={{ flex: 1 }} source={btn_loader} autoPlay loop />
          </View>
        ) : (
          <TouchableOpacity
            onPress={call_apply_promo.bind(this, item)}
            activeOpacity={1}
            style={{
              width: "30%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.primary,
              borderRadius: 10,
              padding: 10,
            }}
          >
            <Text style={{ color: theme.onPrimary, fontSize: 14, fontFamily: normal }}>
              {t("Apply")}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  </View>
);

  const PredictionsDropdown = ({
  predictions,
  loading,
  onSelect,
  activeInputType,
}) => {
  return (
    <View
      style={{
        
        borderRadius: 16,
        marginHorizontal: 5,
        marginTop: 0,
        paddingVertical: 8,
        maxHeight: 400,
        zIndex: 1000,
      }}
    >
      {loading ? (
        <View style={{ padding: 8 }}>
          {[...Array(4)].map((_, i) => (
            <View
              key={`skeleton-${i}`}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 12,
                paddingHorizontal: 16,
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  backgroundColor: theme.divider,
                  marginRight: 16,
                }}
              />
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    height: 16,
                    backgroundColor: theme.divider,
                    borderRadius: 4,
                    width: i % 2 === 0 ? "70%" : "60%",
                    marginBottom: 8,
                  }}
                />
                <View
                  style={{
                    height: 14,
                    backgroundColor: theme.divider,
                    borderRadius: 4,
                    width: i % 2 === 0 ? "50%" : "40%",
                  }}
                />
              </View>
            </View>
          ))}
        </View>
      ) : predictions.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={predictions}
          keyboardShouldPersistTaps="always"
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                 paddingVertical: 12,
                paddingHorizontal: 16,
                backgroundColor: "transparent",
              }}
              onPress={() => onSelect(item, activeInputType)}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  backgroundColor: getIconBackgroundColor(item.description),
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 16,
                }}
              >
                <Icon
                  type={Icons.MaterialIcons}
                  name={getIcon(item.description)}
                  size={20}
                  color={getIconColor(item.description)}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: theme.textPrimary,
                    fontWeight: "500",
                    lineHeight: 22,
                  }}
                  numberOfLines={1}
                >
                  {item.structured_formatting?.main_text ||
                    item.properties?.name ||
                    item.description.split(",")[0]}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: theme.textSecondary,
                    marginTop: 2,
                    lineHeight: 20,
                  }}
                  numberOfLines={1}
                >
                  {item.structured_formatting?.secondary_text ||
                    item.description.split(",").slice(1).join(",").trim() ||
                    "Location"}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                backgroundColor: theme.divider,
                marginLeft: 72,
                marginRight: 16,
              }}
            />
          )}
          ListFooterComponent={<View style={{ height: 8 }} />}
        />
      ) : (
        <View
          style={{
            padding: 24,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon
            type={Icons.MaterialIcons}
            name="location-off"
            size={40}
            color={theme.textSecondary}
            style={{ marginBottom: 16 }}
          />
          <Text
            style={{
              fontSize: 16,
              color: theme.textPrimary,
              fontWeight: "500",
              textAlign: "center",
              marginBottom: 4,
            }}
          >
            No places found
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: theme.textSecondary,
              textAlign: "center",
            }}
          >
            {activeInputType === "origin"
              ? "Enter your pickup location"
              : "Enter your destination"}
          </Text>
        </View>
      )}
    </View>
  );
};
  // Helper functions for icons and colors
  const getIconBackgroundColor = (description) => {
    return theme.surface
    const iconType = getIcon(description);
    switch (iconType) {
      case PLACE_ICONS.airport: return '#e3f2fd';
      case PLACE_ICONS.hotel: return '#ffebee';
      case PLACE_ICONS.restaurant: return '#f3e5f5';
      case PLACE_ICONS.hospital: return '#e8f5e9';
      case PLACE_ICONS.school: return '#fff8e1';
      case PLACE_ICONS.park: return '#e8f5e9';
      case PLACE_ICONS.bus: return '#e3f2fd';
      case PLACE_ICONS.train: return '#e3f2fd';
      default: return theme.surface;
    }
  };

  const getIconColor = (description) => {
    const iconType = getIcon(description);
    switch (iconType) {
      case PLACE_ICONS.airport: return '#2196f3';
      case PLACE_ICONS.hotel: return '#f44336';
      case PLACE_ICONS.restaurant: return '#9c27b0';
      case PLACE_ICONS.hospital: return '#4caf50';
      case PLACE_ICONS.school: return '#ff9800';
      case PLACE_ICONS.park: return '#4caf50';
      case PLACE_ICONS.bus: return '#2196f3';
      case PLACE_ICONS.train: return '#2196f3';
      default: return '#757575';
    }
  };

  const PLACE_ICONS = {
    airport: 'flight',
    temple: 'temple-hindu',
    restaurant: 'restaurant',
    school: 'school',
    hospital: 'local-hospital',
    park: 'park',
    university: 'account-balance',
    hotel: 'hotel',
    bank: 'account-balance',
    atm: 'atm',
    police: 'local-police',
    bus: 'directions-bus',
    train: 'directions-railway',
    church: 'church',
    mosque: 'mosque',
    shopping: 'shopping-cart',
    gym: 'fitness-center',
    stadium: 'stadium',
    beach: 'beach-access',
    cinema: 'movie',
    gas: 'local-gas-station',
    zoo: 'pets',
    pharmacy: 'local-pharmacy',
    museum: 'museum',
    bar: 'local-bar',
    default: 'place',
    location: 'my-location',
  };

  const getIcon = description => {
    const lower = description.toLowerCase();
    if (lower.includes('airport')) return PLACE_ICONS.airport;
    if (lower.includes('temple')) return PLACE_ICONS.temple;
    if (lower.includes('restaurant')) return PLACE_ICONS.restaurant;
    if (lower.includes('school')) return PLACE_ICONS.school;
    if (lower.includes('hospital')) return PLACE_ICONS.hospital;
    if (lower.includes('park')) return PLACE_ICONS.park;
    if (lower.includes('university')) return PLACE_ICONS.university;
    if (lower.includes('hotel')) return PLACE_ICONS.hotel;
    if (lower.includes('bank')) return PLACE_ICONS.bank;
    if (lower.includes('atm')) return PLACE_ICONS.atm;
    if (lower.includes('police')) return PLACE_ICONS.police;
    if (lower.includes('bus')) return PLACE_ICONS.bus;
    if (lower.includes('train')) return PLACE_ICONS.train;
    if (lower.includes('church')) return PLACE_ICONS.church;
    if (lower.includes('mosque')) return PLACE_ICONS.mosque;
    if (lower.includes('shopping')) return PLACE_ICONS.shopping;
    if (lower.includes('gym')) return PLACE_ICONS.gym;
    if (lower.includes('stadium')) return PLACE_ICONS.stadium;
    if (lower.includes('beach')) return PLACE_ICONS.beach;
    if (lower.includes('cinema')) return PLACE_ICONS.cinema;
    if (lower.includes('gas')) return PLACE_ICONS.gas;
    if (lower.includes('zoo')) return PLACE_ICONS.zoo;
    if (lower.includes('pharmacy')) return PLACE_ICONS.pharmacy;
    if (lower.includes('museum')) return PLACE_ICONS.museum;
    if (lower.includes('bar')) return PLACE_ICONS.bar;

    return PLACE_ICONS.default;
  };

  return (
    <View style={[styles.container]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
      barStyle={isDark ? "light-content" : "dark-content"}
      />
      <View style={{ zIndex: 100 }}>
        <Toast />
      </View>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: on_booking ? screenHeight - 350 : screenHeight,
        }}>
        {global.tile == 1 ? <RouteMappy
          isGoogle={global.routing == 1 ? false : true}
          style={styles.map}
          ref={map_ref}
          onMapReady={() => {
            console.log('Map ready callback called');
            setOnLoaded(1);
          }}
          trip_type={active_trip_type}
          isDark={isDark}
          zoomLevel={2}
          onBooking={on_booking}
          driverBearing={null} // in degrees (0-360)
          driverEta={null} // optional
          onlineVehicles={(false && online_vehicles) || []}
          initialRegion={props.initial_region}
          onRegionChangeComplete={region => {
            if (on_loaded) {
              console.log('Region changed on map:', region);
              handle_region_change_complete(region);
            }
          }}
          screen="home"
          onRegionIsChanging={(isChanging) => {
            if (isChanging && !on_booking) {
              setLoading(true)
            }
            else if (!isChanging) {
              setLoading(false)
            }




          }}
          Home={true}
          eta={route_eta}
          routeCoordinates={routeCoords}
          pickupLocation={
            on_booking && {
              latitude: pickup_lat,
              longitude: pickup_lng,
              address: pickup_address,
            }
          }
          dropLocation={
            on_booking && {
              latitude: drop_lat,
              longitude: drop_lng,
              address: drop_address,
            }
          }
        /> :

          <MapView
            provider={PROVIDER_GOOGLE}
            ref={map_ref}
            style={styles.map}
            region={region}
            showsUserLocation={true}
            onMapReady={() => setOnLoaded(1)}
            showsMyLocationButton={false}
            onRegionChangeComplete={handle_region_change_complete}
          >
            {on_booking && (
              <>
                <Marker
                  coordinate={{
                    latitude: pickup_lat,
                    longitude: pickup_lng,
                  }}
                  key={`android_pickup_${pickup_lat}_${pickup_lng}`}
                  tracksViewChanges={false}
                  image={require('../assets/img/pickup.png')} // Direct image reference
                >
                  <Callout tooltip>
                    <View style={{
                      backgroundColor: '#FFFFFF',
                      padding: 12,
                      borderRadius: 8,
                      width: 220,
                      borderWidth: 1,
                      borderColor: '#E0E0E0',
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      elevation: 3
                    }}>

                      <Text style={{
                        fontSize: 13,
                        color: '#666666',
                        lineHeight: 18,
                        marginBottom: 8
                      }}>
                        {pickup_address}
                      </Text>
                      <View style={{
                        backgroundColor: '#22C55E', // Modern green
                        paddingVertical: 4,
                        paddingHorizontal: 8,
                        borderRadius: 12,
                        alignSelf: 'flex-start'
                      }}>
                        <Text style={{
                          color: 'white',
                          fontSize: 12,
                          fontWeight: '500'
                        }}>
                          Your Pickup
                        </Text>
                      </View>
                    </View>
                  </Callout>
                </Marker>
 {on_booking && routeCoords.length > 0 && (
        <Marker
          coordinate={getMiddleCoordinate(routeCoords)}
          anchor={{ x: 0.5, y: 0.5 }}
          key={`eta_${route_eta}_${routeCoords.length}`}
        >
          <View style={{
            backgroundColor: 'white',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.theme_bg,
            elevation: 5, // Android shadow
            shadowColor: '#000', // iOS shadow
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
          }}>
            <Text style={{
              fontSize: 14,
              fontWeight: '600',
              color: colors.theme_bg,
            }}>
              {formatETA(route_eta)}
            </Text>
          </View>
        </Marker>
      )}
                {/* Android-specific Marker for Destination */}
                <Marker
                  coordinate={{
                    latitude: drop_lat,
                    longitude: drop_lng,
                  }}
                  key={`android_dest_${drop_lat}_${drop_lng}`}
                  tracksViewChanges={false}
                  image={require('../assets/img/destination.png')} // Direct image reference
                >
                  <Callout tooltip>
                    <View style={{
                      backgroundColor: '#FFFFFF',
                      padding: 12,
                      borderRadius: 8,
                      width: 220,
                      borderWidth: 1,
                      borderColor: '#E0E0E0',
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      elevation: 3
                    }}>

                      <Text style={{
                        fontSize: 13,
                        color: '#666666',
                        lineHeight: 18,
                        marginBottom: 8
                      }}>
                        {drop_address}
                      </Text>
                      <View style={{
                        backgroundColor: '#EF4444', // Modern red
                        paddingVertical: 4,
                        paddingHorizontal: 8,
                        borderRadius: 12,
                        alignSelf: 'flex-start'
                      }}>
                        <Text style={{
                          color: 'white',
                          fontSize: 12,
                          fontWeight: '500'
                        }}>
                          Your Destination
                        </Text>
                      </View>
                    </View>
                  </Callout>
                </Marker>

                
                <Polyline
                  coordinates={routeCoords}
                  strokeColor={colors.theme_bg}
                  strokeWidth={4} 
                  key={`android_poly_${routeCoords.length}`}
                />
              </>
            )}
          </MapView>
        }
      </Animated.View>

      {false && (
       <TouchableOpacity
  style={{
    position: 'absolute',
    bottom: 220,
    right: 20,
    backgroundColor: theme.surface,
    borderRadius: 50,
    padding: 10,
    elevation: 5,
    shadowColor: theme.shadow_color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  }}
  onPress={centerToUserLocation}>
  <Icon
    type={Icons.MaterialIcons}
    name="my-location"
    style={{ fontSize: 22, color: theme.textPrimary }}
  />
</TouchableOpacity>

      )}
      {!on_booking && (
        <View
          style={{
            height: 100,
            width: 100,
            alignSelf: 'center',
            position: 'absolute',
            top: screenHeight / 2 - 50,
          }}>
          <LottieView style={{ flex: 1 }} source={pin_marker} autoPlay loop />
        </View>
      )}
   

      {screen_home()}
      {screen_location()}
      {screen_booking()}
      {rb_favourite()}
      {rb_add_contact()}
      {date_picker()}

    
   <Modal
  animationType="fade"
  transparent={true}
  visible={search_status == 1}
  statusBarTranslucent={true}>
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    }}>
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {/* Animated Background */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LottieView
          style={{ width: '100%', height: '100%' }}
          source={search}
          autoPlay
          loop
          speed={0.5}
        />
      </View>

      {/* Main Content */}
      <View
        style={{
          backgroundColor: theme.surface,
          width: '100%',
          maxWidth: 400,
          borderRadius: 20,
          padding: 30,
          alignItems: 'center',
          shadowColor: theme.shadow_color,
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.3,
          shadowRadius: 20,
          elevation: 20,
          transform: [{ scale: 0.95 }],
        }}>
        {/* Search Animation */}
        <View
          style={{
            width: 200,
            height: 200,
            marginBottom: 20,
          }}>
          <LottieView
            style={{ flex: 1 }}
            source={search_loader}
            autoPlay
            loop
            speed={1.2}
          />
        </View>

        {/* Status Text */}
        <Text
          style={{
            fontSize: 22,
            fontFamily: normal,
            color: theme.textPrimary,
            textAlign: 'center',
            marginBottom: 10,
            lineHeight: 30,
          }}>
          {t('Searching for nearby drivers')}...
        </Text>

        <Text
          style={{
            fontSize: 16,
            fontFamily: regular,
            color: theme.textSecondary,
            textAlign: 'center',
            marginBottom: 30,
          }}>
          {t('We are finding the best available driver for you')}
        </Text>

        {/* Cancel Button */}
        {loading == false ? (
          <TouchableOpacity
            onPress={cancel_request}
            activeOpacity={0.8}
            style={{
              backgroundColor: theme.error,
              paddingVertical: 15,
              paddingHorizontal: 40,
              borderRadius: 50,
              flexDirection: 'row',
              alignItems: 'center',
              shadowColor: theme.error,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.3,
              shadowRadius: 10,
              elevation: 5,
            }}>
            <Icon
              type={Icons.MaterialIcons}
              name="close"
              color="#fff"
              style={{ fontSize: 20, marginRight: 10 }}
            />
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                fontFamily: bold,
              }}>
              {t('Cancel Search')}
            </Text>
          </TouchableOpacity>
        ) : (
          <View
            style={{
              width: 150,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <LottieView
              style={{ width: 100, height: 100 }}
              source={btn_loader}
              autoPlay
              loop
            />
          </View>
        )}
      </View>
    </View>
  </View>
</Modal>

        <Modal
  visible={location_modal}
  animationType="slide"
  transparent={false}
  statusBarTranslucent={true}
  style={{backgroundColor:theme.background,padding:10}}
>
  <View style={{ flex: 1 ,backgroundColor:theme.background}}>
    {/* Header */}
    <View
      style={{
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 20,
        // backgroundColor: theme.surface,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 15,
          marginHorizontal:0
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontFamily: regular,
            color: theme.textPrimary,
            letterSpacing: -0.5,
          }}
        >
          {t('Choose The Location')}?
        </Text>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            setLocationModal(false);
            screen_home_entry();
          }}
        >
          <Icon
            type={Icons.MaterialIcons}
            name="close"
            style={{
              fontSize: 22,
              color: theme.textSecondary,
            }}
          />
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <View
        style={{
          backgroundColor: theme.surface,
          borderRadius: 12,
          borderColor:'silver',
          borderWidth:.2,
          // shadowColor: theme.shadow_color,
          // shadowOffset: { width: 0, height: 1 },
          // shadowOpacity: 0.05,
          // shadowRadius: 4,
          // elevation: 2,
        }}
      >
        {/* Origin Input */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderBottomWidth: 1,
            borderBottomColor: theme.divider,
          }}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: "#4A90E2",
              marginRight: 12,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: theme.surface,
              }}
            />
          </View>
          <TextInput
            style={{
              flex: 1,
              fontSize: 16,
              color: theme.textPrimary,
              paddingVertical: 4,
              height: 36,
            }}
            placeholder="Pickup location"
            placeholderTextColor={theme.textSecondary}
            value={
              isFocused
                ? pickup_address || ""
                : pickup_address?.length > 30
                ? pickup_address.slice(0, 30) + "..."
                : pickup_address
            }
            onChangeText={(text) => handleInputChange(text, "origin")}
            onFocus={() => {
              handleFocus("origin", pickup_address);
              setIsDestFocused(false);
            }}
            onBlur={() => setIsFocused(false)}
          />
          {pickup_address?.length > 0 && (
            <TouchableOpacity
              style={{
                padding: 6,
                marginLeft: 8,
                backgroundColor: theme.surface,
                borderRadius: 20,
              }}
              onPress={() => clearInput("origin")}
            >
              <Icon
                type={Icons.Feather}
                name="x"
                color={theme.textSecondary}
                size={18}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Destination Input */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 12,
            paddingHorizontal: 16,
          }}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: theme.error,
              marginRight: 12,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon
              type={Icons.MaterialIcons}
              name="place"
              color={theme.surface}
              size={12}
            />
          </View>
          <TextInput
            style={{
              flex: 1,
              fontSize: 16,
              color: theme.textPrimary,
              paddingVertical: 4,
              height: 36,
            }}
            placeholder="Destination"
            placeholderTextColor={theme.textSecondary}
            value={
              isDestFocused
                ? drop_address || ""
                : drop_address?.length > 30
                ? drop_address.slice(0, 30) + "..."
                : drop_address
            }
            onChangeText={(text) => handleInputChange(text, "destination")}
            onFocus={() => handleFocus("destination", drop_address)}
            onBlur={() => {
              setIsDestFocused(false);
              setIsFocused(false);
            }}
          />
          {isDestFocused && (
            <TouchableOpacity
              style={{
                padding: 6,
                marginLeft: 8,
                backgroundColor: "#e6f2ff",
                borderRadius: 20,
              }}
              onPress={() => search_exit(2)}
            >
              <Icon
                type={Icons.MaterialCommunityIcons}
                name="map-outline"
                color="#4A90E2"
                size={20}
              />
            </TouchableOpacity>
          )}
          {drop_address?.length > 0 && (
            <TouchableOpacity
              style={{
                padding: 6,
                marginLeft: 8,
                backgroundColor: theme.surface,
                borderRadius: 20,
              }}
              onPress={() => clearInput("destination")}
            >
              <Icon
                type={Icons.Feather}
                name="x"
                color={theme.textSecondary}
                size={18}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>

    {/* Predictions List */}
    <View style={{ flex: 1, paddingTop: 10 }}>
      {activeInput && (predictions.length > 0 || loading) ? (
        <PredictionsDropdown
          predictions={predictions}
          loading={loading}
          onSelect={(item) => handleSelect(item)}
          activeInputType={activeInput.type}
        />
      ) : (
        <View style={{ paddingHorizontal: 5, paddingTop: 20 }}></View>
      )}
    </View>
  </View>
</Modal>
<Modal
  visible={is_modal_visible}
  animationType="slide"
  transparent={false}
  statusBarTranslucent={true}
>
  <View style={{ flex: 1, backgroundColor: theme.background }}>
    {/* Header */}
    <View
      style={{
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 20,
        backgroundColor: theme.surface,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontFamily: regular,
            color: theme.textPrimary,
            letterSpacing: -0.5,
          }}
        >
          {t('Promo Codes')}
        </Text>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setModalVisible(false)}
        >
          <Icon
            type={Icons.MaterialIcons}
            name="close"
            style={{
              fontSize: 22,
              color: theme.textSecondary,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>

    {/* Promo List */}
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
      showsVerticalScrollIndicator={false}
        data={promo_list}
        renderItem={show_promo_list}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  </View>
</Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 70,
    backgroundColor: colors.lite_bg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    height: screenHeight,
    width: screenWidth,
    backgroundColor: colors.theme_bg_three
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  vehicle_img: {
    height: 40,
    width: 55,
  },
  active_vehicle_img: {
    height: 50,
    width: 80,
  },
  active_trip_type_label: {
    color: colors.theme_fg_two,
    fontSize: f_tiny,
    fontFamily: bold,
  },
  inactive_trip_type_label: {
    color: colors.text_grey,
    fontSize: f_tiny,
    fontFamily: normal,
  },
  trip_type_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  segment_active_bg: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,

    backgroundColor: colors.theme_bg,
    borderRadius: 8,
  },
  segment_active_fg: {
    color: colors.theme_fg_two,
    fontSize: 14,
    fontFamily: bold,
    color: colors.theme_fg_three,
  },
  segment_inactive_bg: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,

    backgroundColor: colors.lite_bg,
    borderRadius: 8,
  },
  segment_inactive_fg: {
    color: colors.theme_fg_two,
    fontSize: 14,
    fontFamily: normal,
    color: colors.theme_fg_two,
  },
  textinput: {
    fontSize: f_m,
    color: colors.grey,
    fontFamily: regular,
    height: 60,
    backgroundColor: colors.text_container_bg,
    width: '100%',
  },
  container1: {
    flex: 1,
    paddingTop: 5,
  },

  inputCard_one: {
    backgroundColor: '#eee',
    marginHorizontal: 0,
    padding: 5,

    borderTopStartRadius: 6,
  },
  inputCard_two: {
    backgroundColor: '#eee',

    marginHorizontal: 0,
    padding: 5,

    borderBottomEndRadius: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  inputIcon: {
    marginRight: 12,
  },

  inputContainerFocused: {
    borderWidth: 0.5,
    borderColor: '#FF6B6B', // Use same color as your icon
  },
  input: {
    flex: 1,
    height: 35, // 👈 Set height to 30
    fontSize: 14, // 👌 Optional: slightly smaller font to fit
    color: '#2C3E50',
    fontFamily: regular,
    borderRadius: 6,
    backgroundColor: '#fff',
    paddingVertical: 4,
  },

  inputContainerFocused: {
    borderWidth: 2,
    borderColor: colors.theme_bg,
    borderRadius: 6,
    borderStyle: 'solid',
    borderCurve: 'circular',
  },
  clearButton: {
    padding: 4,
  },

  loader: {
    marginVertical: 12,
  },
  resultsContainer: {
    backgroundColor: '#FFF',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 10,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  itemIcon: {
    marginRight: 16,
  },
  itemTextContainer: {
    flex: 1,
  },
  primaryText: {
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 4,
    fontFamily: normal,
  },
  secondaryText: {
    fontSize: 14,
    color: '#7F8C8D',
    fontFamily: regular,
  },
  currentLocationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingHorizontal: 20,
    height: 50,
    paddingVertical: 5,
  },
  currentLocationText: {
    fontSize: 16,
    color: '#4A90E2',
    marginLeft: 16,
    fontFamily: regular,
  },
  emptyText: {
    textAlign: 'center',
    padding: 16,
    color: '#95A5A6',
    fontFamily: regular,
  },
  dropdownContainer: {
    position: 'absolute',
    top: 80, // Adjust based on your input fields' position
    left: 16,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    maxHeight: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1000,
  },
  loadingContainer: {
    padding: 12,
  },
  predicitonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  mainText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  secondaryText: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginLeft: 48,
  },
  footer: {
    height: 8,
  },
  emptyState: {
    padding: 16,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
  },
  emptyHint: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  skeletonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  skeletonIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    marginRight: 12,
  },
  skeletonTextContainer: {
    flex: 1,
  },
  skeletonLine: {
    height: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.3)' // Black with 50% opacity
  },
  modalContainer: {
    width: '90%',
    backgroundColor: colors.warning_background,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'red'
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: 'grey',
    
  },
});
const mapDispatchToProps = (dispatch) => ({
  initialLat: (data) => dispatch(initialLat(data)),
  initialLng: (data) => dispatch(initialLng(data)),
  initialRegion: (data) => dispatch(initialRegion(data)),
});
function mapStateToProps(state) {
  return {
    initial_lat: state.booking.initial_lat,
    initial_lng: state.booking.initial_lng,
    initial_region: state.booking.initial_region,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

