import { useTranslation } from "react-i18next";
import '../languages/i18next.js';

import React, { useEffect, useState, useRef, useCallback } from "react";
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
  Modal
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  normal, bold, regular, screenHeight, screenWidth, dashboard, api_url, change_online_status, LATITUDE_DELTA,
  LONGITUDE_DELTA, f_s, f_tiny, f_xs, gth_get_location, gth_status_change, loader,
  f_m,
  f_l
} from '../config/Constants';
import Geolocation from '@react-native-community/geolocation';
import database from '@react-native-firebase/database';
import axios from 'axios';
import MapView, { PROVIDER_GOOGLE, Heatmap } from 'react-native-maps';

import Icon, { Icons } from '../components/Icons';
import { changeLocation } from '../actions/ChangeLocationActions';
import { initialLat, initialLng, initialRegion } from '../actions/BookingActions';
import DropShadow from "react-native-drop-shadow";
import LottieView from 'lottie-react-native';

import { AppState } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import RouteMappy from "../components/RouteMappy.jsx";
import { useTheme } from "../context/ThemeContext.js";

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const Dashboard = (props) => {
  const { t, i18n } = useTranslation();
  const { theme, isDark, toggleTheme } = useTheme();
  const navigation = useNavigation();
  const map_ref = useRef();

  // State variables
  const [loading, setLoading] = useState(false);
  const [switch_value, setSwitchValue] = useState(false); // Changed to boolean
  const [gtn_status, setGtnStatus] = useState(false);
  const [language, setLanguage] = useState(i18n.language);
  const [heat_map_coordinates, setHeatMapCoordinates] = useState([]);
  const [today_bookings, setTodayBookings] = useState(0);
  const [pending_hire_bookings, setPendingHireBookings] = useState(0);
  const [wallet, setWallet] = useState(0); // Changed default to 0
  const [today_earnings, setTodayEarnings] = useState(0);
  const [vehicle_type, setVehicleType] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [map_region, setMapRegion] = useState(props.initial_region || {
    latitude: 0,
    longitude: 0,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [initialUpdated, setInitialUpdated] = useState(false);
  const [notice, setNotice] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  // Refs
  const bookingListener = useRef(null);
  const locationWatchId = useRef(null);

  const isFocused = useIsFocused();

  // Check global variables are initialized
  const checkGlobals = () => {
    if (!global.id || !global.vehicle_type) {
      console.error('Global variables not initialized');
      // Handle this case - maybe redirect to login
      return false;
    }
    return true;
  };

  // Safe Firebase update
  const safeFirebaseUpdate = async (latitude, longitude, bearing = 0, speed = 0) => {
    try {
      if (!checkGlobals()) return;

      if (global.vehicle_type != 0 && global.id) {
        await database().ref(`drivers/${global.vehicle_type}/${global.id}/geo`).update({
          lat: latitude,
          lng: longitude,
          bearing: bearing,
          speed: speed,
          updated_at: Date.now()
        });
      }
    } catch (error) {
      console.error('Firebase update error:', error);
    }
  };

  // Booking sync with cleanup
  const booking_sync = useCallback(() => {
    console.log('Booking Sync called');

    // Clean up previous listener
    if (bookingListener.current) {
      database()
        .ref(`drivers/${global.vehicle_type}/${global.id}`)
        .off('value', bookingListener.current);
      bookingListener.current = null;
    }

    if (!checkGlobals()) return;

    const listener = snapshot => {
      try {
        const data = snapshot.val();
        if (data && data.booking && data.booking.booking_status == 1 && data.online_status == 1) {
          console.log('Navigating to booking request');
          navigation.navigate('BookingRequest', {
            trip_id: data.booking.booking_id,
          });
        }
      } catch (error) {
        console.error('Booking listener error:', error);
      }
    };

    bookingListener.current = listener;

    database()
      .ref(`drivers/${global.vehicle_type}/${global.id}`)
      .on('value', bookingListener.current);
  }, [global.id, global.vehicle_type]);

  // Focus effect
  useEffect(() => {
    if (isFocused && checkGlobals()) {
      console.log('Dashboard call on focus');
      call_dashboard();
      booking_sync();
    }
  }, [isFocused, booking_sync]);

  // App state and booking listener effect
  useEffect(() => {
    if (!checkGlobals()) return;

    const handleAppStateChange = (nextAppState) => {
      console.log('App state changed to:', nextAppState);
      setAppState(nextAppState);

      if (nextAppState === 'active') {
        booking_sync();
      } else if (nextAppState.match(/inactive|background/)) {
        // Clean up booking listener in background
        if (bookingListener.current) {
          database()
            .ref(`drivers/${global.vehicle_type}/${global.id}`)
            .off('value', bookingListener.current);
          bookingListener.current = null;
        }
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
      if (bookingListener.current) {
        database()
          .ref(`drivers/${global.vehicle_type}/${global.id}`)
          .off('value', bookingListener.current);
      }
    };
  }, []);

  // Location permission and watcher
  useEffect(() => {
    let isMounted = true;

    const requestLocationPermission = async () => {
      try {
        if (Platform.OS === 'ios') {
          // iOS
          const auth = await Geolocation.requestAuthorization();

          if (auth === 'granted' || auth === 'restricted') {
            console.log('iOS location permission granted');
            setHasLocationPermission(true);
            if (isMounted) {
              getInitialLocation();
              startWatchingPosition();
            }
          } else {
            console.warn('iOS location permission denied');
            Alert.alert(
              'Location Permission Required',
              'Please enable location services in Settings to use this feature',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Settings', onPress: () => Linking.openSettings() }
              ]
            );
          }
        } else {
          // Android
          try {
            const fineLocationGranted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                title: t('Location Permission'),
                message: t('This app needs access to your location'),
                buttonNeutral: t('Ask Me Later'),
                buttonNegative: t('Cancel'),
                buttonPositive: t('OK'),
              }
            );

            if (fineLocationGranted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log('Fine location permission granted');

              // Request background location for Android 10+
              if (Platform.Version >= 29) {
                const backgroundLocationGranted = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
                  {
                    title: t('Background Location Permission'),
                    message: t('This app needs background location access'),
                    buttonNeutral: t('Ask Me Later'),
                    buttonNegative: t('Cancel'),
                    buttonPositive: t('OK'),
                  }
                );

                if (backgroundLocationGranted === PermissionsAndroid.RESULTS.GRANTED) {
                  console.log('Background location permission granted');
                }
              }

              setHasLocationPermission(true);
              if (isMounted) {
                getInitialLocation();
                startWatchingPosition();
              }
            } else {
              console.warn('Location permission denied');
              showToast(
                'error',
                t('Error'),
                t('Location permission is required'),
              );
            }
          } catch (error) {
            console.error('Permission request error:', error);
          }
        }
      } catch (error) {
        console.error('Location permission error:', error);
      }
    };

    const startWatchingPosition = () => {
      // Clear previous watcher
      if (locationWatchId.current !== null) {
        Geolocation.clearWatch(locationWatchId.current);
      }

      locationWatchId.current = Geolocation.watchPosition(
        position => {
          if (!isMounted) return;

          const { latitude, longitude, heading, speed } = position.coords;

          // Update state
          setLatitude(latitude);
          setLongitude(longitude);

          // Update Redux
          props.changeLocation({ latitude, longitude, heading });

          // Update Firebase
          safeFirebaseUpdate(latitude, longitude, heading, speed);
        },
        error => {
          console.error('Location watch error:', error);
          if (error.code === error.PERMISSION_DENIED) {
            setHasLocationPermission(false);
          }
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 100,
          interval: 10000,
          fastestInterval: 5000,
          timeout: 10000,
        },
      );
    };

    requestLocationPermission();

    return () => {
      isMounted = false;

      // Clean up location watcher
      if (locationWatchId.current !== null) {
        Geolocation.clearWatch(locationWatchId.current);
        locationWatchId.current = null;
      }

      // Clean up booking listener
      if (bookingListener.current) {
        database()
          .ref(`drivers/${global.vehicle_type}/${global.id}`)
          .off('value', bookingListener.current);
        bookingListener.current = null;
      }
    };
  }, []);

  const getInitialLocation = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        async position => {
          try {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            setLatitude(lat);
            setLongitude(lng);

            const region = {
              latitude: lat,
              longitude: lng,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            };

            setMapRegion(region);

            // Update Redux
            await props.initialRegion(region);
            await props.initialLat(lat);
            await props.initialLng(lng);

            // Initial Firebase update
            await safeFirebaseUpdate(lat, lng, 0);

            setInitialUpdated(true);
            resolve();
          } catch (error) {
            console.error('Initial location error:', error);
            reject(error);
          }
        },
        error => {
          console.error('Get current position error:', error);
          // Retry after delay
          setTimeout(() => {
            getInitialLocation();
          }, 3000);
          reject(error);
        },
        {
          enableHighAccuracy: false,
          timeout: 15000,
          maximumAge: 10000
        }
      );
    });
  };

  const change_state = async (value) => {
    try {
      ReactNativeHapticFeedback.trigger('impactLight', options);

      // Update Firebase with current location
      await safeFirebaseUpdate(latitude, longitude, 0);

      if (value === 1) {
        setSwitchValue(true);
        await call_change_online_status(1, 1);
      } else if (value === 0) {
        setSwitchValue(false);
        await call_change_online_status(0, 1);
      } else if (value === 2) {
        navigate_gth_location();
      }
    } catch (error) {
      console.error('Change state error:', error);
      showToast('error', t('Error'), t('Operation failed'));
    }
  };

  const showToast = (type, title, message) => {
    try {
      ReactNativeHapticFeedback.trigger('impactHeavy', options);
      Toast.show({
        type: type,
        text1: title,
        text2: message,
        visibilityTime: 5000,
        position: 'top',
      });
    } catch (error) {
      console.error('Toast error:', error);
    }
  };

  const navigate_gth_location = () => {
    ReactNativeHapticFeedback.trigger('impactLight', options);
    navigation.navigate('SelectGthLocation');
  };

  const saveData = async (status) => {
    try {
      await AsyncStorage.setItem('online_status', status.toString());
    } catch (e) {
      console.error('AsyncStorage error:', e);
    }
  };

  const call_dashboard = async () => {
    if (!checkGlobals()) return;

    setLoading(true);
    try {
      const response = await axios({
        method: 'post',
        url: api_url + dashboard,
        data: { id: global.id },

      });

      setLoading(false);

      await call_change_online_status(response.data.result.online_status, 2);

      // Update state with response data
      if (response.data.result.vehicle_type != 0 && vehicle_type == 0) {
        // Handle vehicle type change if needed
      }

      setVehicleType(response.data.result.vehicle_type);
      setTodayBookings(response.data.result.today_bookings || 0);
      setTodayEarnings(response.data.result.today_earnings || 0);
      setPendingHireBookings(response.data.result.pending_hire_bookings || 0);
      setWallet(response.data.result.wallet || 0);
      setGtnStatus(response.data.result.gth_status || false);

      // Check for active bookings
      check_booking(
        response.data.result.booking_id,
        response.data.result.trip_type,
      );

    } catch (error) {
      console.error('Dashboard API error:', error);
      setLoading(false);
      showToast('error', t('Error'), t('Failed to load dashboard'));
    }
  };

  const check_booking = (booking_id, trip_type) => {
    if (!booking_id || booking_id == 0) return;

    try {
      if (trip_type != 5) {
        navigation.navigate('Trip', { trip_id: booking_id, from: 'home' });
      } else if (trip_type == 5) {
        setTimeout(() => {
          navigation.navigate('SharedTrip', { trip_id: booking_id, from: 'home' });
        }, 2000);
      }
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const call_change_online_status = async (status, type) => {
    if (!checkGlobals()) return;

    setLoading(true);
    try {
      const response = await axios({
        method: 'post',
        url: api_url + change_online_status,
        data: { id: global.id, online_status: status, type: type },
        timeout: 10000,
      });

      setLoading(false);

      switch (response.data.status) {
        case 2:
          setSwitchValue(false);
          global.live_status = 0;
          await saveData(0);
          navigation.navigate('VehicleDetails');
          break;
        case 3:
          setSwitchValue(false);
          global.live_status = 0;
          await saveData(0);
          navigation.navigate('VehicleDocument');
          break;
        case 1:
          if (status == 1) {
            global.live_status = 1;
            await saveData(1);
            setSwitchValue(true);
            if (type == 1) {
              setGtnStatus(false);
            }
          } else {
            global.live_status = 0;
            await saveData(0);
            setSwitchValue(false);
            if (type == 1) {
              setGtnStatus(false);
            }
          }
          break;
        default:
          setSwitchValue(false);
          global.live_status = 0;
          await saveData(0);
      }

    } catch (error) {
      console.error('Change online status error:', error);
      setLoading(false);
      showToast('error', t('Error'), t('Failed to update status'));
    }
  };
  const navigate_wallet = () => {
    navigation.navigate('Wallet');
  };

  const call_trip_settings = () => {
    ReactNativeHapticFeedback.trigger('impactLight', options);

    navigation.navigate('TripSettings');
  };

  const call_today_rides = () => {
    ReactNativeHapticFeedback.trigger('impactLight', options);

    navigation.navigate('TodayBookings');
  };

  const call_earnings = () => {
    ReactNativeHapticFeedback.trigger('impactLight', options);

    navigation.navigate('Earnings');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDark ? "light-content" : "dark-content"}
      />


      {hasLocationPermission && map_region && map_region.latitude !== 0 && (
        <View style={styles.mapContainer}>
          {global.tile == 1 ? (
            <RouteMappy
              style={StyleSheet.absoluteFillObject}
              ref={map_ref}
              isDark={isDark}
              initialRegion={map_region}
              screen="home"
            />
          ) : global.tile == 2 ? (
            <MapView
              provider={PROVIDER_GOOGLE}
              ref={map_ref}
              style={StyleSheet.absoluteFillObject}
              region={map_region}
              showsUserLocation={true}
              showsMyLocationButton={true}
            />
          ) : null}
        </View>
      )}

      {loading == true && (
        <View
          style={{
            height: 100,
            width: 100,
            alignSelf: 'center',

            position: 'absolute',
            zIndex: 9999,
            top: '20%',
          }}>
          <LottieView style={{ flex: 1 }} source={loader} autoPlay loop />
        </View>
      )}


      <View
        style={{
          padding: 15,
          backgroundColor: theme.background,
          flexDirection: 'row',
          position: 'absolute',
          top: 50,
          width: '90%',
          marginLeft: '5%',
          borderRadius: 10,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: {
            width: 5,
            height: 5,
          },
          shadowOpacity: 0.2,
          shadowRadius: 10,
        }}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{ borderRadius: 10, padding: 5, flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={change_state.bind(this, 0)}
              activeOpacity={1}
              style={{
                width: '20%',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                type={Icons.MaterialCommunityIcons}
                name="engine-off"
                style={{
                  fontSize: 25,
                  color: switch_value == 0 ? theme.error : theme.textPrimary,
                }}
              />
              <Text
                style={{
                  color: switch_value == 0 ? theme.error : theme.textPrimary,
                  fontSize: f_s,
                  fontFamily: regular,
                }}>
                {t('Offline')}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                width: '20%',
                borderBottomWidth: 1,
                height: 10,
                borderStyle: 'dotted',
                marginTop: 15,
              }}
            />
            <TouchableOpacity
              onPress={change_state.bind(this, 1)}
              activeOpacity={1}
              style={{
                width: '20%',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                type={Icons.FontAwesome5}
                name="car"
                style={{
                  fontSize: 25,
                  color:
                    switch_value == 1 && gtn_status == 0
                      ? theme.success
                      : theme.textPrimary,
                }}
              />
              <Text
                style={{
                  color:
                    switch_value == 1 && gtn_status == 0
                      ? theme.success
                      : theme.textPrimary,
                  fontSize: f_s,
                  fontFamily: regular,
                }}>
                {t('Online')}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                width: '20%',
                borderBottomWidth: 1,
                height: 10,
                borderStyle: 'dotted',
                marginTop: 15,
              }}
            />
            <TouchableOpacity
              onPress={change_state.bind(this, 2)}
              activeOpacity={1}
              style={{
                width: '20%',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                type={Icons.Entypo}
                name="home"
                style={{
                  fontSize: 25,
                  color: gtn_status == 1 ? theme.primary : theme.textPrimary,
                }}
              />
              <Text
                style={{
                  color: gtn_status == 1 ? theme.primary : theme.textPrimary,
                  fontSize: f_s,
                  fontFamily: regular,
                }}>
                {t('Home')}
              </Text>
            </TouchableOpacity>
          </View>


        </View>

      </View>
      {wallet < 0 && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={navigate_wallet.bind(this)}
          style={{
            flexDirection: 'row',
            backgroundColor: theme.surface,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            width: '90%',
            alignSelf: 'center',
            position: 'absolute',
            top: 180,
          }}>
          <Icon
            type={Icons.Ionicons}
            name="wallet"
            style={{ fontSize: 20, color: theme.error }}
          />
          <View style={{ margin: 5 }} />
          <Text
            style={{
              fontFamily: regular,
              fontSize: f_xs,
              color: theme.error,
            }}>
            {t('Your wallet balance is low please recharge immediately')}
          </Text>
        </TouchableOpacity>
      )}
      {global.vehicle_mode == 18 && (
        <View
          style={{ width: 50, right: 20, bottom: '32%', position: 'absolute' }}>
          <TouchableOpacity onPress={call_trip_settings.bind(this)}>
            <Icon
              type={Icons.Ionicons}
              name="settings"
              style={{ fontSize: 40, color: theme.textPrimary }}
            />
          </TouchableOpacity>
        </View>
      )}
      <View
        style={{
          padding: 10,
          backgroundColor: theme.primary,
          height: 110,
          position: 'absolute',
          bottom: 100,
          width: '90%',
          marginLeft: '5%',
          borderRadius: 10,
          elevation: 5,
        }}>
        <DropShadow
          style={{
            width: '100%',
            marginBottom: 5,
            marginTop: 5,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.1,
            shadowRadius: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={call_today_rides.bind(this)}
              style={{
                width: '33%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                type={Icons.Ionicons}
                name="bookmark"
                style={{ fontSize: 30, color: theme.onPrimary }}
              />
              <View style={{ margin: 5 }} />
              <Text
                style={{
                  color: theme.onPrimary,
                  fontSize: f_m,
                  fontFamily: bold,
                }}>
                {parseFloat(today_bookings) || 0}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={call_earnings.bind(this)}
              style={{
                width: '34%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: theme.onPrimary,
                  fontSize: 30,
                  fontFamily: regular,
                }}>
                {global.currency}
              </Text>

              <View style={{ margin: 5 }} />
              <Text
                style={{
                  color: theme.onPrimary,
                  fontSize: f_m,
                  fontFamily: bold,
                }}>
                {parseFloat(today_earnings) || 0}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ margin: 5 }} />
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={call_today_rides.bind(this)}
              style={{
                width: '33%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: theme.onPrimary,
                  fontSize: f_tiny,
                  fontFamily: regular,
                }}>
                {t('Today Bookings')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={call_earnings.bind(this)}
              style={{
                width: '33%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: theme.onPrimary,
                  fontSize: f_tiny,
                  fontFamily: regular,
                }}>
                {t('Today Earnings')}
              </Text>
            </TouchableOpacity>

          </View>
        </DropShadow>
      </View>

      <View
        style={{ width: 50, right: 20, bottom: '32%', position: 'absolute' }}>
        <TouchableOpacity onPress={call_trip_settings.bind(this)}>
          <Icon
            type={Icons.Ionicons}
            name="settings"
            style={{ fontSize: 40, color: theme.textPrimary }}
          />
        </TouchableOpacity>
      </View>



      <Toast />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

function mapStateToProps(state) {
  return {
    initial_lat: state.booking?.initial_lat || 0,
    initial_lng: state.booking?.initial_lng || 0,
    initial_region: state.booking?.initial_region || null,
  };
}

const mapDispatchToProps = (dispatch) => ({
  changeLocation: (data) => dispatch(changeLocation(data)),
  initialLat: (data) => dispatch(initialLat(data)),
  initialLng: (data) => dispatch(initialLng(data)),
  initialRegion: (data) => dispatch(initialRegion(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);