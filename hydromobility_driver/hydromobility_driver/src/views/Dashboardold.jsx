import { useTranslation } from "react-i18next";
import '../languages/i18next.js';

import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Switch,
  PermissionsAndroid,
  Platform,
  StatusBar,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  normal,
  bold,
  regular,
  screenHeight,
  screenWidth,
  dashboard,
  api_url,
  change_online_status,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  f_s,
  f_tiny,
  f_xs,
  gth_get_location,
  gth_status_change,
  loader,
  f_m,
} from "../config/Constants";
// import FusedLocation from "react-native-fused-location";
import Geolocation from "@react-native-community/geolocation";
import database from "@react-native-firebase/database";
import axios from "axios";
import MapView, { PROVIDER_GOOGLE, Heatmap } from "react-native-maps";
import * as colors from "../assets/css/Colors";
import Icon, { Icons } from "../components/Icons";
import { changeLocation } from "../actions/ChangeLocationActions";
import {
  initialLat,
  initialLng,
  initialRegion,
} from "../actions/BookingActions";
import DropShadow from "react-native-drop-shadow";
import LottieView from "lottie-react-native";
import messaging from "@react-native-firebase/messaging";

import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { AppState } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};
const Dashboard = (props) => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const map_ref = useRef();
  const [loading, setLoading] = useState(false);
  const [switch_value, setSwitchValue] = useState("");
  const [gtn_status, setGtnStatus] = useState(false);
  const [language, setLanguage] = useState(i18n.language);
  const [heat_map_coordinates, setHeatMapCoordinates] = useState([]);
  const [today_bookings, setTodayBookings] = useState(0);
  const [pending_hire_bookings, setPendingHireBookings] = useState(0);
  const [wallet, setWallet] = useState(1);
  const [today_earnings, setTodayEarnings] = useState(0);
  const [vehicle_type, setVehicleType] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [map_region, setMapRegion] = useState(undefined);
  const [initialUpdated, setInitialUpdated] = useState(false);
  const [notice, setNotice] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);
  const isFocused = useIsFocused(); // Detect if the screen is currently focused
  useEffect(() => {
    if (isFocused) {
      console.log("Dashboard call on focus");
      call_dashboard();
    }
  }, [isFocused]);

  let bookingListener = null;
  const booking_sync = () => {
    console.log("Booking Sync : ");
    if (bookingListener) {
      // Detach the previous listener if it exists
      database()
        .ref(`drivers/${global.vehicle_type}/${global.id}`)
        .off("value", bookingListener);
    }
    // Define the listener function
    bookingListener = (snapshot) => {
      const data = snapshot.val();
      // Ensure data is present and proceed with navigation
      if (
        data &&
        data.booking &&
        data.booking.booking_status === 1 &&
        data.online_status === 1
      ) {
        try {
          // Logging for debugging
          console.log("navigating to booking request");
          // Perform the navigation
          navigation.navigate("BookingRequest", {
            trip_id: data.booking.booking_id,
          });
        } catch (error) {
          console.error("Error during navigation", error);
        }
      }
    };
    // Attach the new listener
    database()
      .ref(`drivers/${global.vehicle_type}/${global.id}`)
      .on("value", bookingListener);
  };

  useEffect(() => {
    // Attach booking listener initially when the app is open
    booking_sync();
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === "active") {
        // App is in the foreground, attach the booking listener
        booking_sync();
      } else if (nextAppState.match(/inactive|background/)) {
        // App is in the background or inactive, detach the booking listener
        if (bookingListener) {
          database()
            .ref(`drivers/${global.vehicle_type}/${global.id}`)
            .off("value", bookingListener);
        }
      }
    };
    // Subscribe to AppState changes
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    // Cleanup the subscription and listener on component unmount
    return () => {
      subscription.remove();
      if (bookingListener) {
        database()
          .ref(`drivers/${global.vehicle_type}/${global.id}`)
          .off("value", bookingListener);
      }
    };
  }, []);

  /*  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'active') {
        // App is in the foreground, attach the booking listener
        booking_sync();
      } else if (nextAppState.match(/inactive|background/)) {
        // App is in the background or inactive, detach the booking listener
        if (bookingListener) {
          database().ref(`drivers/${global.vehicle_type}/${global.id}`).off('value', bookingListener);
        }
      }
    };

    // Subscribe to AppState changes
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    // Cleanup the subscription and listener on component unmount
    return () => {
      subscription.remove();
      if (bookingListener) {
        database().ref(`drivers/${global.vehicle_type}/${global.id}`).off('value', bookingListener);
      }
    };
  }, []);
  let bookingListener = null;

  const booking_sync = () => {
    console.log('Booking Sync : ');
  
    if (bookingListener) {
      // Detach the previous listener if it exists
      database().ref(`drivers/${global.vehicle_type}/${global.id}`).off('value', bookingListener);
    }
  
    // Define the listener function
    bookingListener = (snapshot) => {
      const data = snapshot.val();
  
      // Ensure data is present and proceed with navigation
      if (data && data.booking && data.booking.booking_status === 1 && data.online_status === 1) {
        try {
          // Logging for debugging
          console.log("navigating to booking request");
  
          // Perform the navigation
          navigation.navigate('BookingRequest', { trip_id: data.booking.booking_id });
        } catch (error)   {
          console.error("Error during navigation", error);
        }
      }
    };
  
    // Attach the new listener when the app is in the foreground
    database().ref(`drivers/${global.vehicle_type}/${global.id}`).on('value', bookingListener);
  }; */
  async function important_notice() {
  const { t, i18n } = useTranslation();
    try {
      const hasSeenNotice = await AsyncStorage.getItem("hasSeenNotice");
      if (!hasSeenNotice) {
        setNotice(true);
        await AsyncStorage.setItem("hasSeenNotice", "true");
      }
    } catch (error) {
      console.error("Failed to check AsyncStorage:", error);
    }
  }

  useEffect(() => {
    important_notice();
    /*const interval = setInterval(() => {
      call_get_heatmap_coordinates();
    }, 5000);*/
    let watchId;

    const requestLocationPermission = async () => {
      if (Platform.OS === "ios") {
        const result = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
        handlePermissionResult(result);
        getInitialLocation();
        startWatchingPosition();
      } else {
        // If fine location is granted, request ACCESS_BACKGROUND_LOCATION
        const backgroundLocationGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
          {
            title: t('App Access your location for tracking in background'),
            message:
              app_name +
              " " +
              t('needs location access to') +
              "\n" +
              "-" +
              t('Provide accurate rides and pickup/drop-off locations.') +
              "\n" +
              "-" +
              t('Track your ride for safety') +
              "\n" +
              "-" +
              t('Offer location-based services') +
              "\n\n" +
              t('Usage') +
              ":\n" +
              "-" +
              t('When the app is closed (background)') +
              ".\n" +
              "-" +
              t('Always in use') +
              ".\n" +
              "-" +
              t('When the app is not in use') +
              "\n \n" +
              t('Purpose') +
              ":\n" +
              "-" +
              t('Ride updates and support') +
              ".\n" +
              "-" +
              t('Safety and verification') +
              ".\n\n" +
              t('Your privacy is our priority'),
            buttonPositive: t('OK'),
          }
        );
        if (backgroundLocationGranted === PermissionsAndroid.RESULTS.GRANTED) {
          getInitialLocation();
          startWatchingPosition();
        } else {
          showToast(
            "error",
            t('Error'),
            t('Sorry unable to fetch your location')
          );
          // Alert.alert(t('Sorry unable to fetch your location'));
        }
      }
    };

    const startWatchingPosition = () => {
      watchId = Geolocation.watchPosition(
        (position) => {
          const { latitude, longitude, heading } = position.coords;

          props.changeLocation({ latitude, longitude, heading });
          update_location_in_firebase(latitude, longitude, heading);
        },
        (error) => {
          Alert.alert("Error", "Unable to retrieve location");
          console.error(error);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 20, // Only update if the vehicle moves by 10 meters or more
          interval: 10000, // Polling interval in milliseconds (optional, for additional control)
          fastestInterval: 5000, // Fastest interval for updates (optional)
        }
      );
    };

    requestLocationPermission();
    return (
      //interval,
      // unsubscribe,
      //unsub,
      Geolocation.clearWatch(watchId)
    );
  }, [initialUpdated, props]);

  const update_location_in_firebase = (latitude, longitude, bearing) => {
    database().ref(`drivers/${global.vehicle_type}/${global.id}/geo`).update({
      lat: latitude,
      lng: longitude,
      bearing: bearing,
    });
    console.log("location_updated", {
      lat: latitude,
      lng: longitude,
      bearing: bearing,
    });
  };

  const change_state = (value) => {
    ReactNativeHapticFeedback.trigger("impactLight", options);

    if (value != 2) {
      if (value) {
        setSwitchValue(value);
        call_change_online_status(1, 1);
      } else {
        setSwitchValue(value);
        call_change_online_status(0, 1);
      }
    } else {
      navigate_gth_location();
    }
  };
  const showToast = (type, title, message) => {
    ReactNativeHapticFeedback.trigger("impactHeavy", options);

    Toast.show({
      type: type,
      text1: title,
      text2: message,
      visibilityTime: 5000,
      position: "top", // top, bottom
    });
  };
  const call_gth_status_change = async (status) => {
    setLoading(true);
    await axios({
      method: "post",
      url: api_url + gth_status_change,
      data: { driver_id: global.id, gth_status: status },
    })
      .then(async (response) => {
        console.log(response.data.result);
        setLoading(false);
        if (response.data.result == 1) {
          setHomeSwitchValue(true);
          navigate_gth_location();
        } else {
          setHomeSwitchValue(false);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const navigate_gth_location = () => {
    ReactNativeHapticFeedback.trigger("impactLight", options);

    navigation.navigate("SelectGthLocation");
  };

  const saveData = async (status) => {
    try {
      await AsyncStorage.setItem("online_status", status.toString());
    } catch (e) {}
  };

  const call_dashboard = async () => {
    console.log("Dashboard Call : ");
    setLoading(true);
    await axios({
      method: "post",
      url: api_url + dashboard,
      data: { id: global.id },
    })
      .then(async (response) => {
        setLoading(false);
        await call_change_online_status(response.data.result.online_status, 2);
        if (response.data.result.vehicle_type != 0 && vehicle_type == 0) {
          //await get_location(response.data.result.vehicle_type, response.data.result.sync_status);
        }
        setVehicleType(response.data.result.vehicle_type);
        setTodayBookings(response.data.result.today_bookings);
        setTodayEarnings(response.data.result.today_earnings);
        setPendingHireBookings(response.data.result.pending_hire_bookings);
        setWallet(response.data.result.wallet);
        check_booking(
          response.data.result.booking_id,
          response.data.result.trip_type
        );
        setGtnStatus(response.data.result.gth_status);
        //check_request(response.data.result.request_booking_id);
        console.log("Request : " + response.data.result.request_booking_id);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  /* 
  const check_request = (booking_id) => {
    if (booking_id != 0) {
      navigation.replace('BookingRequest', { trip_id: booking_id });
    }
  } */

  const check_booking = (booking_id, trip_type) => {
    if (booking_id != 0 && trip_type != 5) {
      navigation.navigate("Trip", { trip_id: booking_id, from: "home" });
    } else if (booking_id != 0 && trip_type == 5) {
      setTimeout(function () {
        navigation.navigate("SharedTrip", {
          trip_id: booking_id,
          from: "home",
        });
      }, 2000);
    }
  };

  const call_change_online_status = async (status, type) => {
    setLoading(true);
    await axios({
      method: "post",
      url: api_url + change_online_status,
      data: { id: global.id, online_status: status, type: type },
    })
      .then(async (response) => {
        setLoading(false);
        if (response.data.status == 2) {
          setSwitchValue(0);
          global.live_status == 0;
          saveData(0);
          vehicle_details();
        } else if (response.data.status == 3) {
          setSwitchValue(0);
          global.live_status == 0;
          saveData(0);
          vehicle_documents();
        }
        if (response.data.status == 1 && status == 1) {
          global.live_status == 1;
          saveData(1);
          setSwitchValue(1);
          if (type == 1) {
            setGtnStatus(0);
          }
        } else {
          global.live_status == 0;
          saveData(0);
          setSwitchValue(0);
          if (type == 1) {
            setGtnStatus(0);
          }
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  vehicle_details = () => {
    navigation.navigate("VehicleDetails");
  };

  vehicle_documents = () => {
    navigation.navigate("VehicleDocument");
  };

  const get_background_location_permission = async () => {
    const bg_granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
      {
        title:
          app_name +
          t('App Access your location for tracking in background'),
        message: t('Access your location for tracking in background'),
        buttonPositive: "OK",
      }
    );
  };

  /*const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        'title': app_name + t('App Access your location for tracking in background'),
        'message': t('Access your location for tracking in background')
      }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await get_background_location_permission();
        await getInitialLocation();
      }
    } catch (err) {

    }
  }*/

  const getInitialLocation = async () => {
    Geolocation.getCurrentPosition(
      async (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setMapRegion({
          latitude: await position.coords.latitude,
          longitude: await position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        });
        await props.initialRegion(map_region);
        await props.initialLat(position.coords.latitude);
        await props.initialLng(position.coords.longitude);
      },
      (error) => getInitialLocation(),
      { enableHighAccuracy: false, timeout: 10000 }
    );
  };

  const get_location = async (vt, sy) => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title:
          { app_name } +
          t('access your location in background for get nearest trip requests'),
        message:
          { app_name } +
          t('needs to access your location in background for get nearest trips, show live location to customers that will be always in use'),
      }
    );
    if (granted && vt != 0) {
      FusedLocation.setLocationPriority(FusedLocation.Constants.HIGH_ACCURACY);

      // Get location once.
      const location = await FusedLocation.getFusedLocation();
      setLatitude(location.latitude);
      setLongitude(location.longitude);

      // Set options.
      FusedLocation.setLocationPriority(FusedLocation.Constants.BALANCED);
      FusedLocation.setLocationInterval(5000);
      FusedLocation.setFastestLocationInterval(5000);
      FusedLocation.setSmallestDisplacement(10);

      // Keep getting updated location.
      FusedLocation.startLocationUpdates();

      // Place listeners.
      const subscription = FusedLocation.on(
        "fusedLocation",
        async (location) => {
          props.changeLocation(location);
          let bearing = 0;
          if (!isNaN(location.bearing)) {
            bearing = location.bearing;
          }
          console.log(vt);
          if (location) {
            if (sy == 1) {
              database().ref(`drivers/${vt}/${global.id}/geo`).update({
                lat: location.latitude,
                lng: location.longitude,
                bearing: bearing,
              });
              console.log("location_updated", {
                lat: location.latitude,
                lng: location.longitude,
                bearing: bearing,
              });
            }
          }
        }
      );
    } else if (Platform.OS === "android") {
      requestCameraPermission();
    } else {
      getInitialLocation();
    }
  };

  navigate_rental = () => {
    navigation.navigate("MyRentalRides");
  };

  navigate_wallet = () => {
    navigation.navigate("Wallet");
  };

  call_trip_settings = () => {
    ReactNativeHapticFeedback.trigger("impactLight", options);

    navigation.navigate("TripSettings");
  };

  const call_today_rides = () => {
    ReactNativeHapticFeedback.trigger("impactLight", options);

    navigation.navigate("TodayBookings");
  };

  const call_earnings = () => {
    ReactNativeHapticFeedback.trigger("impactLight", options);

    navigation.navigate("Earnings");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

   
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={map_ref}
        style={styles.map}
        region={map_region}
        showsUserLocation={true}
        showsMyLocationButton={false}
      ></MapView>
      <View
        style={{
          padding: 15,
          backgroundColor: colors.theme_bg_three,
          flexDirection: "row",
          position: "absolute",
          top: 50,
          width: "90%",
          marginLeft: "5%",
          borderRadius: 10,
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: {
            width: 5,
            height: 5,
          },
          shadowOpacity: 0.9,
          shadowRadius: 20,
        }}
      >
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={{ borderRadius: 10, padding: 5, flexDirection: "row" }}>
            <TouchableOpacity
              onPress={change_state.bind(this, 0)}
              activeOpacity={1}
              style={{
                width: "20%",
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon
                type={Icons.MaterialCommunityIcons}
                name="engine-off"
                style={{
                  fontSize: 25,
                  color: switch_value == 0 ? colors.theme_fg_two : colors.grey,
                }}
              />
              <Text
                style={{
                  color: switch_value == 0 ? colors.theme_fg_two : colors.grey,
                  fontSize: f_s,
                  fontFamily: bold,
                }}
              >
                {t('Offline')}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                width: "20%",
                borderBottomWidth: 1,
                height: 10,
                borderStyle: "dotted",
                marginTop: 15,
              }}
            />
            <TouchableOpacity
              onPress={change_state.bind(this, 1)}
              activeOpacity={1}
              style={{
                width: "20%",
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon
                type={Icons.FontAwesome5}
                name="car"
                style={{
                  fontSize: 25,
                  color:
                    switch_value == 1 && gtn_status == 0
                      ? colors.success
                      : colors.grey,
                }}
              />
              <Text
                style={{
                  color:
                    switch_value == 1 && gtn_status == 0
                      ? colors.success
                      : colors.grey,
                  fontSize: f_s,
                  fontFamily: bold,
                }}
              >
                {t('Online')}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                width: "20%",
                borderBottomWidth: 1,
                height: 10,
                borderStyle: "dotted",
                marginTop: 15,
              }}
            />
            <TouchableOpacity
              onPress={change_state.bind(this, 2)}
              activeOpacity={1}
              style={{
                width: "20%",
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon
                type={Icons.Entypo}
                name="home"
                style={{
                  fontSize: 25,
                  color: gtn_status == 1 ? colors.theme_fg : colors.grey,
                }}
              />
              <Text
                style={{
                  color: gtn_status == 1 ? colors.theme_fg : colors.grey,
                  fontSize: f_s,
                  fontFamily: bold,
                }}
              >
                {t('Home')}
              </Text>
            </TouchableOpacity>
          </View>

          {/*<Switch
            trackColor={{ false: colors.grey, true: colors.success }}
            thumbColor={switch_value ? colors.success : colors.grey}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={switch_value}
        />*/}
        </View>
        {/*<View style={{ width: '45%', justifyContent:"center", alignItems:"center" }}>
        <Text style={{ color: colors.theme_fg, fontSize: f_s, fontFamily: bold }}>Go Home</Text>
        <View style={{ margin: 5 }} />
          <View style={{ justifyContent:"center", alignItems:"center" }}>
          <Switch
            trackColor={{ false: colors.grey, true: colors.success }}
            thumbColor={gtn_status ? colors.success : colors.grey}
            ios_backgroundColor="#3e3e3e"
            onValueChange={home_toggleSwitch}
            value={gtn_status}
          />
          </View>
        </View>*/}
      </View>
      {wallet < 0 && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={navigate_wallet.bind(this)}
          style={{
            flexDirection: "row",
            backgroundColor: colors.error_background,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            width: "90%",
            alignSelf: "center",
            position: "absolute",
            top: 180,
          }}
        >
          <Icon
            type={Icons.Ionicons}
            name="wallet"
            style={{ fontSize: 20, color: colors.error }}
          />
          <View style={{ margin: 5 }} />
          <Text
            style={{
              fontFamily: regular,
              fontSize: f_xs,
              color: colors.error,
            }}
          >
            {t('Your wallet balance is low please recharge immediately')}
          </Text>
        </TouchableOpacity>
      )}
      {global.vehicle_mode == 18 && (
        <View
          style={{ width: 50, right: 20, bottom: "30%", position: "absolute" }}
        >
          <TouchableOpacity onPress={call_trip_settings.bind(this)}>
            <Icon
              type={Icons.Ionicons}
              name="settings"
              style={{ fontSize: 40, color: colors.theme_bg_two }}
            />
          </TouchableOpacity>
        </View>
      )}
      <View
        style={{
          padding: 15,
          backgroundColor: colors.theme_bg,
          height: 150,
          position: "absolute",
          bottom: 60,
          width: "90%",
          marginLeft: "5%",
          borderRadius: 10,
          elevation: 5,
        }}
      >
        <DropShadow
          style={{
            width: "100%",
            marginBottom: 5,
            marginTop: 5,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.1,
            shadowRadius: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-evenly",
            }}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={call_today_rides.bind(this)}
              style={{
                width: "33%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon
                type={Icons.Ionicons}
                name="bookmark"
                style={{ fontSize: 30, color: colors.theme_fg_three }}
              />
              <View style={{ margin: 5 }} />
              <Text
                style={{
                  color: colors.theme_fg_three,
                  fontSize: f_s,
                  fontFamily: regular,
                }}
              >
                {today_bookings}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={call_earnings.bind(this)}
              style={{
                width: "34%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: colors.theme_fg_three,
                  fontSize: 30,
                  fontFamily: regular,
                }}
              >
                {global.currency}
              </Text>

              <View style={{ margin: 5 }} />
              <Text
                style={{
                  color: colors.theme_fg_three,
                  fontSize: f_s,
                  fontFamily: regular,
                }}
              >
                {today_earnings}
              </Text>
            </TouchableOpacity>
            {/*  <View style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}>
              <Icon type={Icons.MaterialIcons} name="money" style={{ fontSize: 30, color: colors.theme_fg_three }} />
              <View style={{ margin: 5 }} />
              <Text style={{ color: colors.theme_fg_three, fontSize: f_s, fontFamily: bold }}>{global.currency}{pending_hire_bookings}</Text>
            </View> */}
          </View>
          <View style={{ margin: 5 }} />
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-evenly",
            }}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={call_today_rides.bind(this)}
              style={{
                width: "33%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: colors.theme_fg_three,
                  fontSize: f_tiny,
                  fontFamily: regular,
                }}
              >
                {t('Today Bookings')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={call_earnings.bind(this)}
              style={{
                width: "33%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: colors.theme_fg_three,
                  fontSize: f_tiny,
                  fontFamily: regular,
                }}
              >
                {t('Today Earnings')}
              </Text>
            </TouchableOpacity>
            {/*<View style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: colors.theme_fg_three, fontSize: f_tiny, fontFamily: normal }}>{t('Incentive')}</Text>
            </View>*/}
          </View>
        </DropShadow>
      </View>

      <View style={{ position: "absolute", top: 90, width: "100%" }}>
        {pending_hire_bookings > 0 && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={navigate_rental.bind(this)}
            style={{
              flexDirection: "row",
              backgroundColor: colors.success_background,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
              width: "90%",
              marginLeft: "5%",
              marginBottom: 10,
            }}
          >
            <Icon
              type={Icons.Ionicons}
              name="bookmark"
              style={{ fontSize: 20, color: colors.success }}
            />
            <View style={{ margin: 5 }} />
            <Text
              style={{
                fontFamily: regular,
                fontSize: f_xs,
                color: colors.success,
              }}
            >
              {t('You have received driver hire request')}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {loading == true && (
        <View
          style={{
            height: 100,
            width: 100,
            alignSelf: "center",
            marginTop: "30%",
          }}
        >
          <LottieView style={{ flex: 1 }} source={loader} autoPlay loop />
        </View>
      )}
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: screenHeight,
    width: screenWidth,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "98%",
    backgroundColor: colors.warning_background,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "red",
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "grey",
    color: colors.theme_bg_two,
  },
});

const mapDispatchToProps = (dispatch) => ({
  changeLocation: (data) => dispatch(changeLocation(data)),
  initialLat: (data) => dispatch(initialLat(data)),
  initialLng: (data) => dispatch(initialLng(data)),
  initialRegion: (data) => dispatch(initialRegion(data)),
});

export default connect(null, mapDispatchToProps)(Dashboard);
