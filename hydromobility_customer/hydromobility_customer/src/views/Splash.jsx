import { useTranslation } from "react-i18next";
import '../languages/i18next';

import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  Platform,
  PermissionsAndroid,
  Alert,
  Text,
  Linking,
  Dimensions
} from "react-native";
import { useNavigation, CommonActions, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import NetInfo from "@react-native-community/netinfo";
import messaging from '@react-native-firebase/messaging';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import moment from 'moment';
const { width, height } = Dimensions.get('window');
import * as colors from "../assets/css/Colors";
import { bold, logo, app_name, LATITUDE_DELTA, LONGITUDE_DELTA, app_settings, api_url, PAYSTACK_KEY } from "../config/Constants";
import { connect } from 'react-redux';
import { initialLat, initialLng, initialRegion } from '../actions/BookingActions';
import { useTheme } from "../context/ThemeContext";

const Splash = (props) => {
  const navigation = useNavigation();
  const isNavigating = useRef(false);
  const { t, i18n } = useTranslation();
  const { theme, isDark } = useTheme();
  const [locationAttempts, setLocationAttempts] = useState(0);

  useFocusEffect(
    useCallback(() => {
      moment.locale(i18n.language === 'ar' ? 'ar' : 'en');

      setTimeout(() => checkFCMAndProceed(), 100);
      return () => { };
    }, [])
  );

  const checkFCMAndProceed = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const fcmToken = await messaging().getToken();
      if (fcmToken) global.fcm_token = fcmToken;

      const authStatus = await messaging().requestPermission();
      const enabled = (
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
      );

      if (enabled) {
        const refreshedToken = await messaging().getToken();
        if (refreshedToken) global.fcm_token = refreshedToken;
      }

      messaging().onTokenRefresh((newToken) => {
        global.fcm_token = newToken;
      });
    } catch (error) {
      console.error('FCM init error:', error);
    }

    checkAppSettings();
  };

  // ------------------- APP SETTINGS -------------------
  const checkAppSettings = async () => {
    if (!isNavigating.current) isNavigating.current = true;
    await fetchSettingsWithRetry();
  };

  const fetchSettingsWithRetry = async (retryCount = 0) => {
    try {
      const response = await axios.get(api_url + app_settings);
      await processSettings(response.data.result);
    } catch (error) {
      if (error.response?.status === 429 && retryCount < 3) {
        const delay = Math.pow(2, retryCount) * 1000;
        setTimeout(() => fetchSettingsWithRetry(retryCount + 1), delay);
      } else {
        console.log(error);
        Alert.alert(t('Sorry something went wrong'));
      }
    }
  };

  const processSettings = async (data) => {
    const id = await AsyncStorage.getItem('id');
    const first_name = await AsyncStorage.getItem('first_name');
    const profile_picture = await AsyncStorage.getItem('profile_picture');
    const phone_with_code = await AsyncStorage.getItem('phone_with_code');
    const email = await AsyncStorage.getItem('email');
    global.existing = await AsyncStorage.getItem("existing");

    global.paystack_key = PAYSTACK_KEY;
    global.stripe_key = data.stripe_key;
    global.razorpay_key = data.razorpay_key;
    global.flutterwave_public_key = data.flutterwave_public_key;
    global.app_name = data.app_name;
    global.language_status = data.language_status;
    global.default_language = data.default_language;
    global.polyline_status = data.polyline_status;
    global.currency = data.default_currency_symbol;
    global.currency_short_code = data.currency_short_code;
    global.tile = data.map_settings.tiles;
    global.routing = data.map_settings.routing;
    global.places = data.map_settings.places;
    global.geo_code = data.map_settings.geo_code;
    global.reverse_geo_code = data.map_settings.reverse_geo_code;
    global.mode = data.mode;
    global.promo_id = 0;

    if (id) {
      global.id = id;
      global.first_name = first_name;
      global.profile_picture = profile_picture;
      global.phone_with_code = phone_with_code;
      global.email = email;
    } else {
      global.id = 0;
    }

    handleLocation();
  };

  // ------------------- LOCATION -------------------
  const handleLocation = async () => {
    try {
      let locationGranted = false;
      
      if (Platform.OS === 'android') {
        locationGranted = await requestAndroidLocation();
      } else {
        locationGranted = await getiOSLocation();
      }
      
      if (locationGranted) {
        navigateNext();
      } else {
        // If location failed but we have default coordinates, proceed anyway
        proceedWithDefaultLocation();
      }
    } catch (err) {
      console.warn('Location error, using default location:', err);
      proceedWithDefaultLocation();
    }
  };

  // Android location permission
  const requestAndroidLocation = async () => {
    try {
      const isGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      
      if (!isGranted) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: `${global.app_name} Location Access`,
            message: `We need your location to find nearby drivers.`,
            buttonPositive: 'OK',
          }
        );
        
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          // Permission denied, but we'll proceed with default location
          console.log('Location permission denied, using default location');
          return false;
        }
      }

      // Try to get current location with timeout
      const location = await getCurrentLocationWithTimeout();
      return !!location;
    } catch (error) {
      console.warn('Android location error:', error);
      return false;
    }
  };

  // iOS location
  const getiOSLocation = async () => {
    try {
      const location = await getCurrentLocationWithTimeout();
      return !!location;
    } catch (error) {
      console.warn('iOS location error:', error);
      return false;
    }
  };

  const getCurrentLocationWithTimeout = () => {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error('Location timeout'));
      }, 10000); // 10 second timeout

      Geolocation.getCurrentPosition(
        position => {
          clearTimeout(timeoutId);
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
        error => {
          clearTimeout(timeoutId);
          reject(error);
        },
        { 
          enableHighAccuracy: false, // Use false for better success rate
          timeout: 15000, 
          maximumAge: 300000 // 5 minutes - accept cached location
        }
      );
    });
  };

  const proceedWithDefaultLocation = () => {
    // Set default coordinates (you can modify these to your app's default location)
    const defaultRegion = {
      latitude: props.state.booking.latitude || 40.7128, // Default to NYC or use existing from store
      longitude: props.state.booking.longitude || -74.0060,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
    
    props.initialRegion(defaultRegion);
    props.initialLat(defaultRegion.latitude);
    props.initialLng(defaultRegion.longitude);
    
    navigateNext();
  };

  // ------------------- NAVIGATION -------------------
  const navigateNext = () => {
    if (global.id != 0) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Home" }],
        })
      );
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Intro" }],
        })
      );
    }
  };

  // ------------------- NETWORK CHECK -------------------
  useEffect(() => {
    const checkConnection = () => {
      NetInfo.fetch().then(state => {
        if (!state.isConnected) {
          ReactNativeHapticFeedback.trigger("impactLight");
          navigation.navigate("NoInternet");
        }
      });
    };
    checkConnection();
    const interval = setInterval(checkConnection, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.background,
      }}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <Image
        source={logo}
        resizeMode="contain"
        style={{
          width: width * 0.7,
          height: height * 0.4,
        }}
      />
    </View>
  );
};

function mapStateToProps(state) {
  return { state };
}

const mapDispatchToProps = (dispatch) => ({
  initialLat: (data) => dispatch(initialLat(data)),
  initialLng: (data) => dispatch(initialLng(data)),
  initialRegion: (data) => dispatch(initialRegion(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Splash);