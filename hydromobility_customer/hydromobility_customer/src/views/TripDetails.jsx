import { useTranslation } from "react-i18next";
import '../languages/i18next';

import React, { useState, useEffect, useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  StatusBar,
  FlatList,
  Linking,
  Alert,
  Platform,
  PermissionsAndroid,
  Modal,
  TouchableWithoutFeedback,
  PanResponder,
  Animated,
} from 'react-native';
import { useNavigation, useRoute, CommonActions } from '@react-navigation/native';
import * as colors from '../assets/css/Colors';
import {
  screenHeight,
  GOOGLE_KEY,
  screenWidth,
  normal,
  bold,
  app_name,
  sos,
  regular,
  api_url,
  trip_details,
  img_url,
  get_tips,
  add_tip,
  trip_cancel,
  loader,
  sos_sms,
  f_xs,
  f_s,
  f_tiny,
} from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  AnimatedRegion,
  MarkerAnimated,
  Polyline,
  Callout,
} from 'react-native-maps';

import LottieView from 'lottie-react-native';

import { connect } from 'react-redux';
import axios from 'axios';
import { getDatabase, ref, onValue, off } from '@react-native-firebase/database';
import Geolocation from '@react-native-community/geolocation';

import Toast from 'react-native-toast-message';

import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import BottomSheet from "../components/BottomSheet";
import RouteMappy from "../components/RouteMappy";

import { useTheme } from "../context/ThemeContext";
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const TripDetails = props => {
  const { t, i18n } = useTranslation();

  const navigation = useNavigation();
  const route = useRoute();
  const map_ref = useRef();
  //const driver_loc = useRef();
  const [region, setRegion] = useState(props.initial_region);
  const [loading, setLoading] = useState(false);
  const [cancel_loading, setCancelLoading] = useState(false);
  const [data, setData] = useState(route.params.data);
  const [trip_id, setTripId] = useState(route.params.trip_id);
  const [from, setFrom] = useState(route.params.from);
  const [dialog_visible, setDialogVisible] = useState(false);
  const [driver_track, setDriverTrack] = useState(null);
  const [coords, setCoords] = useState([]);
  const [on_load, setOnLoad] = useState(0);
  const [tips, setTips] = useState([]);
  const [tip, setTip] = useState(0);
  const [is_mount, setIsMount] = useState(0);
  const [pickup_statuses, setPickupStatuses] = useState([1, 2]);
  const [cancellation_reason, setCancellationReasons] = useState([]);
  const [cancellation_statuses, setCancellationStatuses] = useState([6, 7]);
  const [drop_statuses, setDropStatuses] = useState([3, 4]);
  const [driver_location, setDriverLocation] = useState({

  });
  const [driver_location_ios, setDriverLocationIos] = useState(
    new AnimatedRegion({ latitude: 9.914372, longitude: 78.155033 }),
  );
  const { theme, toggleTheme, isDark } = useTheme();

  const [home_marker, setHomeMarker] = useState({
    latitude: parseFloat(route.params.data.trip.pickup_lat),
    longitude: parseFloat(route.params.data.trip.pickup_lng),
  });
  const [destination_marker, setDestinaionMarker] = useState({
    latitude: parseFloat(route.params.data.trip.drop_lat),
    longitude: parseFloat(route.params.data.trip.drop_lng),
  });
  const [bearing, setBearing] = useState(0);
  const [eta, setEta] = useState();




  const go_back = () => {
    if (from == 'home') {
      setDialogVisible(false);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Home" }],
        })
      );
    } else {
      navigation.goBack();
    }
  };


  const showDialog = () => {
    setDialogVisible(true);
  };

  useEffect(() => {
    if (!data?.trip) return;

    call_get_tips();
    call_trip_details();

    const db = getDatabase();
    const tripRef = ref(db, `/trips/${trip_id}`);
    const driverRef = ref(
      db,
      `/drivers/${data.trip.vehicle_type}/${data.trip.driver_id}`,
    );

    const handleTripChange = (snapshot) => {
      const tripData = snapshot.val();
      console.log("snapshot", tripData);

      if (tripData && tripData.status !== data.status) {
        call_trip_details();
      }

   
    };

    const handleDriverTracking = (snapshot) => {
      const driverData = snapshot.val();
      if (driverData?.geo) {
        const marker = {
          latitude: parseFloat(driverData.geo.lat),
          longitude: parseFloat(driverData.geo.lng),
        };
        console.log("driver_data", driverData);

        setBearing(driverData.geo.bearing);
        setDriverLocation(marker);
      }
    };

    const unsubscribeTrip = onValue(tripRef, handleTripChange);
    const unsubscribeDriver = onValue(driverRef, handleDriverTracking);

    return () => {
      unsubscribeTrip();
      unsubscribeDriver();
    };
  }, [navigation]);
  useEffect(() => {
    if (!driver_location?.latitude || !data?.trip) return;

    let destination = null;

    if (data.trip.status <= 2) {
      // Driver → Pickup
      destination = {
        latitude: home_marker.latitude,
        longitude: home_marker.longitude,
      };
    } else {
      // Driver → Drop
      destination = {
        latitude: destination_marker.latitude,
        longitude: destination_marker.longitude,
      };
    }

    fetchRouteFromGoogle(driver_location, destination);

  }, [
    driver_location.latitude,
    driver_location.longitude,
    data?.trip?.status
  ]);

  const fetchRouteFromGoogle = async (origin, destination) => {
    try {
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${GOOGLE_KEY}`;

      const response = await axios.get(url);

      if (response.data.routes.length > 0) {
        const route = response.data.routes[0];
        const leg = route.legs[0];

        // Decode polyline
        const points = decodePolyline(route.overview_polyline.points, 1e5);

        const polyCoords = points.map(([lat, lng]) => ({
          latitude: lat,
          longitude: lng,
        }));

        setCoords(polyCoords);

        // ETA from Google (seconds)
        setEta(formatETA(leg.duration.value, 2));
      }
    } catch (err) {
      console.log('Google direction error', err);
    }
  };


  function decodePolyline(encoded, multiplier) {
    const len = encoded.length;
    let index = 0;
    const array = [];
    let lat = 0;
    let lng = 0;

    while (index < len) {
      let b;
      let shift = 0;
      let result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      array.push([lat / multiplier, lng / multiplier]);
    }

    return array;
  }
  const showToast = (type, title, message) => {
    ReactNativeHapticFeedback.trigger('impactHeavy', options);

    Toast.show({
      type: type,
      text1: title,
      text2: message,
      visibilityTime: 5000,
      position: 'top', // top, bottom
    });
  };


  const call_get_tips = () => {
    setLoading(true);
    axios({
      method: 'post',
      url: api_url + get_tips,
      data: { trip_id: trip_id },
    })
      .then(async response => {
        setLoading(false);
        setTips(response.data.result['data']);
        setTip(response.data.result['tip']);
      })
      .catch(error => {
        setLoading(false);
        showToast('error', t('Error'), t('Sorry something went wrong'));
      });
  };

  const call_add_tip = tip => {
    setLoading(true);
    axios({
      method: 'post',
      url: api_url + add_tip,
      data: { trip_id: trip_id, tip },
    })
      .then(async response => {
        setLoading(false);
        if (response.data.status == 1) {
          showToast('success', t('Success'), t('Your tip added successfully'));

          setTip(tip)
        }
      })
      .catch(error => {
        setLoading(false);
        showToast('error', t('Error'), t('Sorry something went wrong'));
      });
  };

  const call_trip_details = () => {
    setLoading(true);
    axios({
      method: 'post',
      url: api_url + trip_details,
      data: { trip_id: trip_id },
    })
      .then(async response => {
        setLoading(false);
        setData(response.data.result);
        setCancellationReasons(response.data.result.cancellation_reasons);
        setOnLoad(1);
        if (response.data.result.trip.status == 5 && from == 'home') {
          if (is_mount == 0) {
            setIsMount(1);
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  { name: 'Bill', params: { trip_id: trip_id, from: from } },
                ],
              }),
            );
          }
        } else if (
          cancellation_statuses.includes(
            parseInt(response.data.result.trip.status),
          ) &&
          from == 'home'
        ) {
          navigate_home();
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };
  const formatETA = (eta_value, routing) => {
    console.log(eta_value)
    if (!eta_value) return 'Calculating...';

    // Handle different API formats
    if (routing == 1) { // RouteMappy
      const totalMinutes = Math.round(eta_value / 60000); // Convert ms to minutes
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      if (hours === 0) return `${minutes} Min`;
      if (minutes === 0) return `${hours} Hr`;
      return `${hours} Hr ${minutes} Min`;
    } else { // Google
      const totalMinutes = Math.round(eta_value / 60); // Convert seconds to minutes
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      if (hours === 0) return `${minutes} Min`;
      if (minutes === 0) return `${hours} Hr`;
      return `${hours} Hr ${minutes} Min`;
    }
  };
  const call_dialog_visible = () => {
    setDialogVisible(false);
  };

  const call_driver = () => {
    Linking.openURL(`tel:${data.trip.driver.phone_with_code}`);
  };

  const call_trip_cancel = async (reason_id, type) => {
    // console.log({ trip_id: trip_id, status: 6, reason_id: reason_id, cancelled_by: type })
    setDialogVisible(false);
    setCancelLoading(true);
    await axios({
      method: 'post',
      url: api_url + trip_cancel,
      data: {
        trip_id: trip_id,
        status: 6,
        reason_id: reason_id,
        cancelled_by: type,
      },
    })
      .then(async response => {
        setCancelLoading(false);
        console.log('success');
      })
      .catch(error => {
        //alert(error)
        setCancelLoading(false);
      });
  };

  const navigate_home = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      }),
    );
  };

  const move_chat = () => {
    console.log('data', data);
    navigation.navigate('Chat', { trip_id: trip_id, data: data })
  };

  const send_sos = async () => {
    Alert.alert(
      t('Please confirm'),
      t('Are you in emergency') + '?',
      [
        {
          text: t('Yes'),
          onPress: () => get_location(),
        },
        {
          text: t('No'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  };

  const get_location = async () => {
    if (Platform.OS == 'android') {
      await requestCameraPermission();
    } else {
      await getInitialLocation();
    }
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: t('Location access required'),
          message: app_name + t('Needs to access your location for tracking'),
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await getInitialLocation();
      } else {
        showToast(
          'error',
          t('Error'),
          t('Sorry unable to fetch your location'),
        );
      }
    } catch (err) {
      showToast('error', t('Error'), t('Sorry unable to fetch your location'));
    }
  };
  const add_sos = () => {
    navigation.navigate('AddEmergencyContact');
  };
  const getInitialLocation = async () => {
    Geolocation.getCurrentPosition(
      async position => {
        call_sos_sms(position.coords.latitude, position.coords.longitude);
      },
      error => console.log('Unable fetch your location'),
      { enableHighAccuracy: false, timeout: 10000 },
    );
  };
  const getMiddleCoordinate = (coords) => {
    if (!coords || coords.length === 0) return null;
    const midIndex = Math.floor(coords.length / 2);
    return coords[midIndex];
  };
  const call_sos_sms = (lat, lng) => {
    setLoading(true);
    axios({
      method: 'post',
      url: api_url + sos_sms,
      data: {
        customer_id: global.id,
        booking_id: trip_id,
        latitude: lat,
        longitude: lng,
        lang: i18n.language,
      },
    })
      .then(async response => {
        setLoading(false);
        console.log('response', response.data);
        if (response.data.status == 1) {
          alert(response.data.message);
        }
        if (response.data.status == 2) {
          alert(
            t(
              'Now your project in demo mode, please swith to thre production or contact admin',
            ),
          );
        } else {
          Alert.alert(
            t('Alert'),
            response.data.message,
            [
              {
                text: t('Okay'),
                onPress: () => add_sos(),
              },
              {
                text: t('Cancel'),
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
            ],
            { cancelable: false },
          );
        }
      })
      .catch(error => {
        setLoading(false);
        showToast('error', t('Error'), t('Sorry something went wrong'));
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: screenHeight - 340,
        }}>
        {global.tile == 2 && region && (
          <MapView
            ref={map_ref}
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            initialRegion={region}
            onMapReady={() => {
              console.log('Google Map ready');
              // Fit to coordinates when map is ready
              if (map_ref.current && coords.length > 0) {
                const allPoints = [
                  ...coords,
                  { latitude: driver_location.latitude, longitude: driver_location.longitude },
                  { latitude: home_marker.latitude, longitude: home_marker.longitude },
                  { latitude: destination_marker.latitude, longitude: destination_marker.longitude }
                ].filter(point => point.latitude && point.longitude);

                map_ref.current.fitToCoordinates(allPoints, {
                  edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                  animated: true,
                });
              }
            }}
          >
            {/* Route Polyline */}
            <Polyline
              coordinates={coords}
              strokeColor={colors.theme_bg}
              strokeWidth={4}
            />
            {data.trip.status <= 2 && (
              <Marker
                coordinate={{
                  latitude: home_marker.latitude,
                  longitude: home_marker.longitude,
                }}
                key={`android_pick_${home_marker.latitude}_${home_marker.longitude}`}
                tracksViewChanges={false}
                image={require('../assets/img/pickup.png')} // Direct image reference
              >

              </Marker>
            )}

            {data.trip.status >= 2 && (
              <Marker
                coordinate={{
                  latitude: destination_marker.latitude,
                  longitude: destination_marker.longitude,
                }}
                key={`android_dest_${destination_marker.latitude}_${destination_marker.longitude}`}
                tracksViewChanges={false}
                image={require('../assets/img/destination.png')} // Direct image reference
              >

              </Marker>
            )}

            {driver_location.latitude && (
              <Marker
                coordinate={driver_location}
                key="driver_car"
                tracksViewChanges={false}
                image={require('../assets/img/tracking/car.png')}
                rotation={bearing}
                anchor={{ x: 0.5, y: 0.5 }}
              />
            )}




            {coords.length > 0 && (
              <Marker
                coordinate={getMiddleCoordinate(coords)}
                anchor={{ x: 0.5, y: 0.5 }}
                key={`eta_${eta}_${coords.length}`}
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
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: colors.theme_bg,
                    }}
                  >
                    {eta == '0' || eta?.includes('0 Min') ? 'Driver Arrived' : eta}
                  </Text>

                </View>
              </Marker>
            )}

          </MapView>
        )}
        {on_load && global.tile == 1 && <RouteMappy
          ref={map_ref}
          style={styles.map}
          onMapReady={() => {
            console.log('Map ready callback called');

          }}
          isDark={isDark}
          initialRegion={region}

          routeCoordinates={coords}
          driverLocation={{
            latitude: driver_location.latitude,
            longitude: driver_location.longitude,

          }}
          screen="trip"
          zoomLevel={10}
          tripData={data}
          driverBearing={bearing} // in degrees (0-360)
          eta={eta} // optional
          pickupLocation={
            data.trip.status <= 2
              ? {
                latitude: home_marker.latitude,
                longitude: home_marker.longitude,
              }
              : null
          }
          dropLocation={
            data.trip.status >= 2
              ? {
                latitude: destination_marker.latitude,
                longitude: destination_marker.longitude,
              }
              : null
          }
        />}
      </Animated.View>

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          paddingTop: 30,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={0}
          onPress={go_back.bind(this)}
          style={{
            width: 40,
            height: 40,
            backgroundColor: theme.background,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            top: 20,
            left: 20,
            elevation: 10,
          }}>
          <Icon
            type={Icons.MaterialIcons}
            name="arrow-back"
            color={theme.textPrimary}
            style={{ fontSize: 22 }}
          />
        </TouchableOpacity>

        {on_load == 1 && global.tile == 1 && (
          <TouchableOpacity

            activeOpacity={1}
            style={{ alignItems: 'flex-end', }}>
            <View
              style={{
                width: 70,
                height: 40,
                borderRadius: 10,
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                top: 20,
                right: 20,
                backgroundColor: theme.background
              }}>
              <Icon
                type={Icons.MaterialIcons}
                name="timer"
                color={theme.textSecondary}
                style={{
                  fontSize: 18,
                  marginRight: 6,
                  textShadowColor: 'rgba(0,0,0,0.05)',
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 1
                }}
              />
              <Text
                style={{
                  color: theme.textPrimary,
                  fontSize: f_xs,
                  fontFamily: regular,
                  marginTop: 2,
                  fontWeight: '500',
                  textShadowColor: 'rgba(0,0,0,0.05)',
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 1
                }}>
                {eta}
              </Text>

            </View>

          </TouchableOpacity>
        )}

        {on_load == 1 && global.tile == 2 && (
          <TouchableOpacity
            onPress={send_sos.bind(this)}
            activeOpacity={1}
            style={{ alignItems: 'flex-end' }}>
            {drop_statuses.includes(data.trip.status) && (
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 20,
                  right: 25,
                }}>
                <LottieView
                  style={{ flex: 1, width: 60, height: 60 }}
                  source={sos}
                  autoPlay
                  loop
                />
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>

      {on_load == 1 && global.tile == 1 && (
        <TouchableOpacity
          onPress={send_sos.bind(this)}
          activeOpacity={1}
          style={{ alignItems: 'flex-end' }}>
          {drop_statuses.includes(data.trip.status) && (
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
                top: 20,
                right: 25,
              }}>
              <LottieView
                style={{ flex: 1, width: 60, height: 60 }}
                source={sos}
                autoPlay
                loop
              />
            </View>
          )}
        </TouchableOpacity>
      )}
      <BottomSheet>
        {on_load == 1 ? (
          <ScrollView contentContainerStyle={{ marginBottom: '100%', backgroundColor: theme.background }}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                marginBottom: 10,
              }}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}>
                <Text
                  numberOfLines={1}
                  style={{
                    color: theme.textSecondary,
                    fontSize: f_xs,
                    fontFamily: regular,
                  }}>
                  {t('OTP')}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 5,
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: theme.textPrimary,
                      fontSize: 13,
                      fontFamily: normal,
                    }}>
                    #{data.trip.otp}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <Text
                  numberOfLines={1}
                  style={{
                    color: theme.textSecondary,
                    fontSize: f_xs,
                    fontFamily: regular,
                  }}>
                  {t('Status')}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 5,
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: theme.textPrimary,
                      fontSize: 13,
                      fontFamily: normal,
                    }}>
                    {data.trip.status_name}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                borderTopWidth: 0.5,
                borderBottomWidth: 0.5,
                borderColor: theme.divider,
                flexDirection: 'row',
                paddingVertical: 20,
              }}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                }}>
                <View style={{ height: 50, width: 50, borderRadius: 5 }}>
                  <Image
                    style={{
                      height: undefined,
                      width: undefined,
                      flex: 1,
                      borderRadius: 5,
                    }}
                    source={{
                      uri: img_url + data.trip.driver.profile_picture,
                    }}
                  />
                </View>
                <View style={{ margin: 10 }} />
                <View>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: theme.textPrimary,
                      fontSize: 17,
                      fontFamily: regular,
                    }}>
                    {data.trip.driver.first_name}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon
                      type={Icons.MaterialIcons}
                      name="star"
                      color={'gold'}
                      style={{ fontSize: 18 }}
                    />
                    <Text
                      numberOfLines={1}
                      style={{
                        color: theme.textPrimary,
                        fontSize: 13,
                        fontFamily: regular,
                      }}>
                      {data.trip.driver.overall_ratings}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  flexDirection: 'row',
                }}>
                <View>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: theme.textPrimary,
                      fontSize: 17,
                      fontFamily: regular,
                    }}>
                    {data.trip.vehicle.vehicle_name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: theme.textPrimary,
                      fontSize: 13,
                      fontFamily: regular,
                    }}>
                    {data.trip.vehicle.vehicle_number}
                  </Text>
                </View>
                <View style={{ margin: 10 }} />
                <View style={{ height: 50, width: 50, borderRadius: 5 }}>
                  <Image
                    style={{
                      height: undefined,
                      width: undefined,
                      flex: 1,
                      borderRadius: 5,
                    }}
                    source={{
                      uri: img_url + data.trip.vehicle.vehicle_image,
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={{ borderBottomWidth: 0.5, borderColor: theme.divider }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  marginTop: 10,
                  marginBottom: 10,
                }}>
                <View
                  style={{
                    width: '33%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: theme.textSecondary,
                      fontSize: f_xs,
                      fontFamily: regular,
                    }}>
                    {t('Distance')}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 5,
                    }}>
                    <Icon
                      type={Icons.MaterialIcons}
                      name="map"
                      color={theme.textSecondary}
                      style={{ fontSize: 22 }}
                    />
                    <View style={{ margin: 2 }} />
                    <Text
                      numberOfLines={1}
                      style={{
                        color: theme.textPrimary,
                        fontSize: 13,
                        fontFamily: normal,
                      }}>
                      {data.trip.distance} {t('km')}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: '33%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: theme.textSecondary,
                      fontSize: f_xs,
                      fontFamily: regular,
                    }}>
                    {t('Trip Type')}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 5,
                    }}>
                    <Icon
                      type={Icons.MaterialIcons}
                      name="commute"
                      color={theme.textSecondary}
                      style={{ fontSize: 22 }}
                    />
                    <View style={{ margin: 2 }} />
                    <Text
                      numberOfLines={1}
                      style={{
                        color: theme.textPrimary,
                        fontSize: 13,
                        fontFamily: normal,
                      }}>
                      {data.trip.trip_type_name}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: '33%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: theme.textSecondary,
                      fontSize: f_xs,
                      fontFamily: regular,
                    }}>
                    {t('Estimation Fare')}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 5,
                    }}>
                    <Icon
                      type={Icons.MaterialIcons}
                      name="local-atm"
                      color={theme.textSecondary}
                      style={{ fontSize: 22 }}
                    />
                    <View style={{ margin: 2 }} />
                    <Text
                      numberOfLines={1}
                      style={{
                        color: theme.textPrimary,
                        fontSize: 13,
                        fontFamily: normal,
                      }}>
                      {global.currency}
                      {data.trip.total}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: theme.surface,
                padding: 10,
                borderRadius: 10,
                marginVertical: 10,
              }}>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      backgroundColor: 'rgba(76, 217, 100, 0.2)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 12,
                    }}>
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: '#4CD964',
                      }}
                    />
                  </View>
                  <View style={{ margin: 5 }} />
                  <Text
                    numberOfLines={1}
                    style={{
                      color: theme.textSecondary,
                      fontSize: f_xs,
                      fontFamily: regular,
                    }}>
                    {t('Pickup Address')}
                  </Text>
                </View>
                <View style={{ margin: 3 }} />
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={{
                    color: theme.textPrimary,
                    fontSize: f_tiny,
                    fontFamily: regular,
                  }}>
                  {data.trip.pickup_address}
                </Text>
              </View>
              <View style={{ margin: 10 }} />
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      backgroundColor: 'rgba(255, 59, 48, 0.2)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 12,
                    }}>
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: '#FF3B30',
                      }}
                    />
                  </View>
                  <View style={{ margin: 5 }} />
                  <Text
                    numberOfLines={1}
                    style={{
                      color: theme.textSecondary,
                      fontSize: f_xs,
                      fontFamily: regular,
                    }}>
                    {t('Drop Address')}
                  </Text>
                </View>
                <View style={{ margin: 3 }} />
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={{
                    color: theme.textPrimary,
                    fontSize: f_tiny,
                    fontFamily: regular,
                  }}>
                  {data.trip.drop_address}
                </Text>
              </View>
            </View>
            {data.trip.trip_type == 4 && (
              <ScrollView showsVerticalScrollIndicator={false} style={{
                backgroundColor: theme.surface,
                borderRadius: 16,
                padding: 16,
                // marginBottom: 20,

              }}>
                <Text style={{
                  fontSize: 16,
                  color: theme.textPrimary,
                  fontFamily: regular,
                  marginBottom: 10
                }}>
                  {t('Receiver Details')}
                </Text>

                <Text style={{
                  fontSize: 14,
                  color: theme.textSecondary,
                  fontFamily: regular,
                  marginBottom: 6
                }}>
                  {t('Receiver Name')}: {data.trip.receiver_name || '--'}
                </Text>

                <Text style={{
                  fontSize: 14,
                  color: theme.textSecondary,
                  fontFamily: regular,
                  marginBottom: 12
                }}>
                  {t('Receiver Number')}: {data.trip.receiver_phone || '--'}
                </Text>

                <Text style={{
                  fontSize: 14,
                  color: theme.textSecondary,
                  fontFamily: regular,
                  marginBottom: 6
                }}>
                  {t('Parcel Description')}
                </Text>

                <View style={{
                  backgroundColor: isDark ? '#1E293B' : '#F1F5F9',
                  borderRadius: 12,
                  padding: 12,
                  minHeight: 80,
                }}>
                  <Text style={{
                    fontSize: 14,
                    color: theme.textPrimary,
                    fontFamily: regular,
                    lineHeight: 20,
                  }}>
                    {data.trip.parcel_description || t('No description provided')}
                  </Text>
                </View>
              </ScrollView>
            )}
            {data.trip.status >= 1 && data.trip.status <= 5 && (
              <View style={{ width: '100%' }}>
                {tip == 0 && (
                  <View
                    style={{
                      padding: 10,
                      borderTopWidth: 0.5,
                      borderColor: theme.divider,
                    }}>
                    <Text
                      style={{
                        color: theme.textPrimary,
                        fontSize: f_s,
                        fontFamily: regular,
                      }}>
                      {t('Add a tip for your driver')}
                    </Text>
                    <View style={{ margin: 2 }} />
                    <Text
                      style={{
                        color: theme.textSecondary,
                        fontSize: f_tiny,
                        fontFamily: regular,
                      }}>
                      {t(
                        'The entire amount will be transferred to the rider. Valid only if you pay online',
                      )}
                      .
                    </Text>
                    <View style={{ margin: 5 }} />
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        {tips.map((row, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={call_add_tip.bind(this, row)}
                            style={{
                              width: 60,
                              margin: 5,
                              height: 35,
                              borderRadius: 10,
                              borderColor: theme.divider,
                              borderWidth: 1,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                color: theme.textSecondary,
                                fontSize: f_xs,
                                fontFamily: regular,
                              }}>
                              +{global.currency}
                              {row}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </ScrollView>
                  </View>
                )}
              </View>
            )}
            {pickup_statuses.includes(data.trip.status) && (
              <View
                style={{
                  borderTopWidth: 0,
                  borderColor: theme.divider,
                  marginBottom: 15,
                }}>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                  <TouchableOpacity
                    onPress={move_chat.bind(this)}
                    style={{
                      width: '15%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon
                      type={Icons.MaterialIcons}
                      name="chat"
                      color={theme.textSecondary}
                      style={{ fontSize: 30 }}
                    />
                  </TouchableOpacity>
                  <View style={{ width: '5%' }} />
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={call_driver.bind(this)}
                    style={{
                      width: '15%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon
                      type={Icons.MaterialIcons}
                      name="call"
                      color={theme.textSecondary}
                      style={{ fontSize: 30 }}
                    />
                  </TouchableOpacity>
                  <View style={{ width: '10%' }} />
                  {cancel_loading == false ? (
                    <TouchableOpacity
                      onPress={showDialog.bind(this)}
                      activeOpacity={1}
                      style={{
                        width: '55%',
                        backgroundColor: '#e44643ff',
                        borderRadius: 10,
                        height: 50,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{

                          fontSize: 16,
                          color: theme.onPrimary,
                          fontFamily: regular,
                        }}>
                        {t('Cancel')}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View
                      style={{
                        height: 50,
                        width: '90%',
                        alignSelf: 'center',
                      }}>
                      <LottieView
                        style={{ flex: 1 }}
                        source={loader}
                        autoPlay
                        loop
                      />
                    </View>
                  )}
                </View>
              </View>
            )}
          </ScrollView>
        ) : (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <Text
              style={{
                color: theme.textPrimary,
                fontSize: 15,
                fontFamily: regular,
              }}>
              {t('Loading')}...
            </Text>
          </View>
        )}
      </BottomSheet>
      <Modal
        visible={dialog_visible}
        animationType="fade"
        transparent={true}
        onRequestClose={call_dialog_visible}>
        <TouchableWithoutFeedback onPress={call_dialog_visible}>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: 20
          }}>
            <TouchableWithoutFeedback>
              <View style={{
                width: '90%',
                maxHeight: '80%',
                backgroundColor: theme.background || '#fff',
                borderRadius: 20,
                overflow: 'hidden',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 10,
              }}>
                {/* Modal Title */}
                <View style={{
                  backgroundColor: theme.primary || '#4A6FFF',
                  paddingVertical: 18,
                  paddingHorizontal: 20,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}>
                  <Text style={{
                    fontSize: 18,
                    fontFamily: 'bold',
                    color: '#fff',
                    textAlign: 'center',
                  }}>
                    {t('Reason to cancel your ride')}
                  </Text>
                </View>

                {/* Cancellation Reasons */}
                <FlatList
                  data={cancellation_reason}
                  style={{ maxHeight: 300 }}
                  contentContainerStyle={{ padding: 15 }}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      onPress={() => call_trip_cancel(item.id, item.type)}
                      activeOpacity={0.7}
                      style={{
                        paddingVertical: 14,
                        paddingHorizontal: 15,
                        backgroundColor: index % 2 === 0 ? 'rgba(0, 0, 0, 0.03)' : 'transparent',
                        borderRadius: 10,
                        marginBottom: 5,
                        borderLeftWidth: 3,
                        borderLeftColor: 'transparent',
                      }}>
                      <Text style={{
                        fontSize: 14,
                        fontFamily: 'regular',
                        color: theme.textPrimary || '#333',
                        lineHeight: 20,
                      }}>
                        {i18n.language === 'ar' ? item.reason_ar : item.reason}
                      </Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item.id.toString()}
                  showsVerticalScrollIndicator={false}
                />

                {/* Close Button */}
                <TouchableOpacity
                  onPress={call_dialog_visible}
                  activeOpacity={0.8}
                  style={{
                    margin: 15,
                    marginTop: 5,
                    backgroundColor: theme.surface || '#f8f8f8',
                    paddingVertical: 14,
                    borderRadius: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.1,
                    shadowRadius: 2,
                    elevation: 2,
                  }}>
                  <Text style={{
                    fontSize: 16,
                    color: theme.textSecondary || '#666',
                    textAlign: 'center',
                    fontFamily: 'medium',
                  }}>{t('Close')}</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: screenHeight,
    width: screenWidth,
    backgroundColor: colors.theme_bg_three,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: 'regular',
    color: 'black',
    marginBottom: 10,
    backgroundColor: '#f1f1f1',
    padding: 10,
    textAlign: 'center',
  },
  listItem: {
    paddingVertical: 10,
  },
  listText: {
    fontSize: 12,
    fontFamily: 'regular',
    color: 'gray',
  },
  closeButton: {
    marginTop: 10,

    // backgroundColor: colors.error,
    padding: 10,
    borderRadius: 10,
    borderColor: 'silver',
    borderWidth: 0.4,
  },
  closeText: {
    fontSize: 16,
    color: colors.theme_bg,
    textAlign: 'center',
    fontFamily: 'regular',
  },
  sheetContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
});

function mapStateToProps(state) {

  return {
    initial_lat: state.booking.initial_lat,
    initial_lng: state.booking.initial_lng,
    initial_region: state.booking.initial_region,
  };
}

export default connect(mapStateToProps, null)(TripDetails);