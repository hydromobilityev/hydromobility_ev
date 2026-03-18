
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Image,

  Platform,
  StatusBar,


  Text,

  AppState,
  PermissionsAndroid,
  Dimensions,
} from "react-native";
import {
  logo,
  app_settings,
  api_url,

  app_name,
  
} from "../config/Constants";
import { useNavigation, CommonActions, useFocusEffect } from "@react-navigation/native";
import * as colors from "../assets/css/Colors";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import messaging from '@react-native-firebase/messaging';
import { initialLat, initialLng, initialRegion } from '../actions/BookingActions';
import { useTheme } from "../context/ThemeContext";
const { width, height } = Dimensions.get('window');
const Splash = (props) => {
  const navigation = useNavigation();
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);
  const appState = useRef(AppState.currentState);
  const { theme, isDark } = useTheme();
  // Initialize app with proper error boundaries
  const initializeApp = async () => {
    try {
      await Promise.all([
        checkToken(),
        checkAppSettings(),
        loadUserData(),
      ]);
      setIsReady(true);
    } catch (err) {
      console.error('Initialization error:', err);
      setError(err.message || 'Initialization failed');
      // Fallback to check phone screen after delay
      setTimeout(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "CheckPhone" }],
          })
        );
      }, 3000);
    }
  };

  // Improved FCM token handling
 const checkToken = async () => {
  try {
    if (Platform.OS === 'ios') {
      await messaging().registerDeviceForRemoteMessages();
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (!enabled) {
        console.log('iOS permission not granted');
        return;
      }
    } else {
      // Android 13+ requires notification permission
      if (Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Android notification permission not granted');
          return;
        }
      }
    }

    // Fetch FCM token (works for both iOS and Android)
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      global.fcm_token = fcmToken;
      console.log('FCM Token:', fcmToken);
    }

    // Token refresh listener
    return messaging().onTokenRefresh(async (newToken) => {
      global.fcm_token = newToken;
      console.log('Refreshed FCM Token:', newToken);
    });
  } catch (err) {
    console.warn('FCM initialization warning:', err);
    return Promise.resolve();
  }
};


  // Safer app settings fetch
  const checkAppSettings = async () => {
    try {
      const response = await axios.get(api_url + app_settings, { timeout: 10000 });
      if (response.data && response.data.result) {
        await saveAppSettings(response.data.result);
      }
    } catch (err) {
      console.warn('Failed to fetch app settings:', err);
      // Load default settings if API fails
      await saveAppSettings({
        stripe_key: '',
        razorpay_key: '',
        app_name: app_name,
        default_language: 'en',
        polyline_status: 1,
        driver_trip_time: 30,
        mode: 'live',
        default_currency_symbol: '$',
        currency_short_code: 'USD'
      });
    }
  };

  // Batch storage operations
  const loadUserData = async () => {
    try {
      const keys = [
        'id', 'first_name', 'phone_with_code', 
        'email', 'language', 'profile_picture',
        'online_status', 'vehicle_type', 
        'approved_status', 'vehicle_mode'
      ];
      
      const values = await AsyncStorage.multiGet(keys);
      const data = Object.fromEntries(values);
      
      // Set global variables with null checks
      global.id = data.id || 0;
      global.first_name = data.first_name || '';
      global.phone_with_code = data.phone_with_code || '';
      global.email = data.email || '';
      global.lang = data.language || 'en';
      global.profile_picture = data.profile_picture || '';
      global.live_status = data.online_status || '0';
      global.vehicle_type = data.vehicle_type || '';
      global.approved_status = data.approved_status || '0';
      global.vehicle_mode = data.vehicle_mode || '';
      
    } catch (err) {
      console.warn('Failed to load user data:', err);
      // Initialize with empty values
      global.id = 0;
      global.lang = 'en';
      global.approved_status = '0';
    }
  };

  const saveAppSettings = async (data) => {
    // Validate and set global settings
    global.stripe_key = data.stripe_key || '';
    global.razorpay_key = data.razorpay_key || '';
    global.app_name = data.app_name || app_name;
    global.default_language = data.default_language || 'en';
    global.polyline_status = data.polyline_status || 1;
    global.driver_trip_time = data.driver_trip_time || 30;
    global.mode = data.mode || 'live';
    global.currency = data.default_currency_symbol || '$';
    global.currency_short_code = data.currency_short_code || 'USD';


     global.tile = data.map_settings.tiles;
    global.routing = data.map_settings.routing;
    global.places = data.map_settings.places;
    global.geo_code = data.map_settings.geo_code;
    global.reverse_geo_code = data.map_settings.reverse_geo_code;
  };

  // Robust navigation handler
  const navigateToAppropriateScreen = () => {
    try {
      if (!global.id || global.id === '0') {
        return navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "CheckPhone" }],
          })
        );
      }

      const approvedStatus = parseInt(global.approved_status, 10);
      
      let targetRoute = "CheckPhone";
      const routeParams = { id: global.id };

      switch (approvedStatus) {
        case 1:
          targetRoute = "Home";
          break;
        case 2:
          targetRoute = "VehicleDetails";
          break;
        case 3:
          targetRoute = "VehicleDocument";
          break;
        case 4:
          targetRoute = "DriverVerification";
          break;
        default:
          targetRoute = "CheckPhone";
      }

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: targetRoute, params: routeParams }],
        })
      );
    } catch (err) {
      console.error('Navigation error:', err);
      // Fallback to check phone screen
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "CheckPhone" }],
        })
      );
    }
  };

  // Handle app state changes
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // App came to foreground - refresh data
        initializeApp();
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // Initialize app on focus
  useFocusEffect(
    useCallback(() => {
      initializeApp();
      return () => {
        // Cleanup if needed
      };
    }, [])
  );

  // Navigate when ready
  useEffect(() => {
    if (isReady) {
      navigateToAppropriateScreen();
    }
  }, [isReady]);

  // Render splash screen
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
  return {
    initial_lat: state.booking.initial_lat,
    initial_lng: state.booking.initial_lng,
    initial_region: state.booking.initial_region,
  };
}

const mapDispatchToProps = (dispatch) => ({
  initialLat: (data) => dispatch(initialLat(data)),
  initialLng: (data) => dispatch(initialLng(data)),
  initialRegion: (data) => dispatch(initialRegion(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Splash);