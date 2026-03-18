import { useTranslation } from 'react-i18next';
import '../languages/i18next.js';

import React, { useState, useEffect, useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  FlatList,
  Linking,
  Platform,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, CommonActions } from '@react-navigation/native';
import {
  screenHeight,
  screenWidth,
  normal,
  bold,
  regular,
  trip_details,
  api_url,
  change_trip_status,
  GOOGLE_KEY,
  btn_loader,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  trip_cancel,
  loader,
  f_xs,
  f_m,
  f_s,
  REVERSE_GEOCODE,
  ROUTEMAPPY_KEY,
} from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import DropShadow from 'react-native-drop-shadow';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Toast from 'react-native-toast-message';
import { getDatabase } from '@react-native-firebase/database';
import RouteMappy from '../components/RouteMappy.jsx';
import { useTheme } from '../context/ThemeContext.js';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};
const Trip = props => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const { theme, toggleTheme, isDark } = useTheme();

  const [inputText, setInputText] = useState('');

  const [trip_id, setTripId] = useState(route.params.trip_id);
  const [from, setFrom] = useState(route.params.from);
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const [cancel_loading, setCancelLoading] = useState(false);
  const [on_load, setOnLoad] = useState(0);
  const [cancellation_reason, setCancellationReasons] = useState([]);
  const [dialog_visible, setDialogVisible] = useState(false);
  const [otp_dialog_visible, setOtpDialogVisible] = useState(false);
  const [pickup_statuses, setPickupStatuses] = useState([1, 2]);
  const [drop_statuses, setDropStatuses] = useState([3, 4]);
  const [coords, setCoords] = useState([]);
  const [eta, setEta] = useState();

  const [cancellation_statuses, setCancellationStatuses] = useState([6, 7]);
  const map_ref = useRef();
  const [region, setRegion] = useState({
    latitude: props.initial_lat,
    longitude: props.initial_lng,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const go_back = () => {
    navigation.goBack()
  };
  const showToast = (type, title, message) => {
    ReactNativeHapticFeedback.trigger('impactLight', options);

    Toast.show({
      type: type,
      text1: title,
      text2: message,
      visibilityTime: 5000,
      position: 'top', // top, bottom
    });
  };
  useEffect(() => {
    const db = getDatabase();
    const statusRef = db.ref(`/trips/${trip_id}/status`);

    const onStatusChange = statusRef.on('value', snapshot => {
      if (!snapshot.exists()) return;

      const newStatus = snapshot.val();

      if (newStatus !== data.status) {
        call_trip_details();
      }
    });

    return () => {
      statusRef.off('value', onStatusChange);
    };
  }, [trip_id, data.status]);

  useEffect(() => {
    if (data && data?.trip?.status <= 2 && props?.change_location) {
      get_direction(
        `${props.change_location.latitude},${props.change_location.longitude}`,
        `${data.trip.pickup_lat},${data.trip.pickup_lng}`,
      );
    } else {
      if (data && props?.change_location) {
        get_direction(
          `${props.change_location.latitude},${props.change_location.longitude}`,
          `${data?.trip?.drop_lat},${data?.trip?.drop_lng}`,
        );
      }
    }
  }, [data, props.change_location]);
  const call_trip_details = async () => {
    console.log(api_url + trip_details,)
    console.log({ trip_id: trip_id })
    setLoading(true);
    await axios({
      method: 'post',
      url: api_url + trip_details,
      data: { trip_id: trip_id },
    })
      .then(async response => {
        setLoading(false);
        console.log("trip_details", response.data)
        if (response.data.result.trip.status == 5) {
          navigation.navigate('Bill', {trip_id: trip_id, from: from});
        } else if (
          cancellation_statuses.includes(
            parseInt(response.data.result.trip.status),
          ) &&
          from == 'home'
        ) {
          // navigate_home();
        }
        setData(response.data.result);
        console.log('trip_details', response.data.result);
        setOnLoad(1);

        setCancellationReasons(response.data.result.cancellation_reasons);

      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  const check_otp = () => {
    if (data.trip.new_status.id == 3) {
      setOtpDialogVisible(true);
    } else {
      onRegionChange();
    }
  };

  const onRegionChange = async () => {
    console.log("onRegionChange", props.change_location);
    const { latitude, longitude } = props.change_location;

    let address = null;
    console.log(global.geo_code)
    if (global.geo_code == 2) {
      const googleUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${latitude},${longitude}&key=${GOOGLE_KEY}`;
      console.log('Using Google API:', googleUrl);

      try {
        const response = await fetch(googleUrl);
        const data = await response.json();

        if (
          data.results &&
          data.results.length >= 3 &&
          data.results[2].formatted_address
        ) {
          address = data.results[2].formatted_address;
        } else if (data.results.length > 0) {
          address = data.results[0].formatted_address;
        }
      } catch (error) {
        console.error('Google API error:', error);
      }
    } else {
      const myUrl = `${REVERSE_GEOCODE}lat=${latitude}&lon=${longitude}&key=${ROUTEMAPPY_KEY}`;
      console.log('Using My API:', myUrl);

      try {
        const response = await fetch(myUrl);
        const data = await response.json();

        // Adjust below line based on your API response structure
        address = data?.display_name;
      } catch (error) {
        console.error('My API error:', error);
      }
    }

    if (address) {
      setRegion({
        latitude,
        longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
      call_change_trip_status(address);
    } else {
      console.warn('No valid address found.');
    }
  };
  const call_change_trip_status = async address => {
    console.log('call_change_trip_status', address);

    console.log(api_url + change_trip_status)
    console.log({
      trip_id: trip_id,
      status: data.trip.new_status.id,
      address: address,
      lat: props.change_location.latitude,
      lng: props.change_location.longitude,
    });
  
    setLoading(true);
    await axios({
      method: 'post',
      url: api_url + change_trip_status,
      data: {
        trip_id: trip_id,
        status: data.trip.new_status.id,
        address: address,
        lat: props.change_location.latitude,
        lng: props.change_location.longitude,
      },
    })
      .then(async response => {
        console.log(response.data)
        call_trip_details();
      })
      .catch(error => {
        console.log(error)
        setLoading(false);
      });
  };
  const adjustTimeBasedOnDistance = () => (distanceInMeters, timeInMs) => {
    console.log('adjustTimeBasedOnDistance', distanceInMeters, timeInMs);
    if (distanceInMeters < 10000) {
      return timeInMs * 2.0; // city
    } else if (distanceInMeters < 50000) {
      return timeInMs * 1.5; // suburban
    } else {
      return timeInMs * 1.2; // highway
    }
  };
  const get_direction = async (startLoc, destinationLoc) => {

    try {
      let url, points, eta_value;

      if (global.routing == 1) { // RouteMappy API
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
        update_location_in_firebase(props.change_location.latitude, props.change_location.longitude, props.change_location.heading, respJson.paths[0].points, respJson.paths[0].points_encoded_multiplier, respJson.paths[0].time)
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
      let coord_value;
      if (global.tile == 1) { // RouteMappy tile format [lng, lat]
        coord_value = points.map(([lat, lng]) => [lng, lat]);
      } else { // Google tile format {latitude, longitude}
        coord_value = points.map(([lat, lng]) => ({
          latitude: lat,
          longitude: lng
        }));
      }

      setCoords(coord_value);
      setEta(eta_value);


    } catch (error) {
      setCoords([]);
      setEta(null);
    }
  };
  const update_location_in_firebase = async (latitude, longitude, bearing, path, multiplier, eta_value) => {
    const tripRef2 = getDatabase().ref(`trips/${data.trip.id}`);

    // Fetch current trip data
    const snapshot = await tripRef2.once('value');
    const tripData = snapshot.val() || {};

    // Update or initialize waypoints
    let waypoints = tripData.waypoints || [];
    waypoints.push({
      lat: latitude,
      lng: longitude,
      bearing: bearing,
      timestamp: Date.now(),
    });

    // Prepare polyline object
    const polyline = {
      points: path,
      multiplier: multiplier,
    };
    console.log(polyline)

    // Write updated waypoints and polyline back to Firebase
    await tripRef2.update({
      waypoints: waypoints,
      polyline: polyline,
      eta_value
    });
  };

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


  const showDialog = () => {
    setDialogVisible(true);
  };

  const call_trip_cancel = async (reason_id, type) => {
    console.log({
      trip_id: trip_id,
      status: 7,
      reason_id: reason_id,
      cancelled_by: type,
    });
    setDialogVisible(false);
    setCancelLoading(true);
    await axios({
      method: 'post',
      url: api_url + trip_cancel,
      data: {
        trip_id: trip_id,
        status: 7,
        reason_id: reason_id,
        cancelled_by: type,
      },
    })
      .then(async response => {
        setCancelLoading(false);
        console.log('success');
      })
      .catch(error => {
        console.log(error);
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

  const call_dialog_visible = () => {
    setDialogVisible(false);
  };

  const verify_otp = async val => {
    if (val == data.trip.otp) {
      setOtpDialogVisible(false);
      await onRegionChange();
    } else {
      setOtpDialogVisible(false);
      showToast('error', t('Validation error'), t('Enter valid otp'));

      closeOtpDialog();
    }
  };

  const closeOtpDialog = () => {
    setOtpDialogVisible(false);
  };

  const redirection = () => {

    if (global.tile == 1 && global.routing == 1) {
      navigation.navigate('NavigationScreen', {
        data: data,
        driver_location: {
          latitude: props.initial_lat,
          longitude: props.initial_lng,
          heading: 0,
        },

      });
      return;
    }

    if (pickup_statuses.includes(parseInt(data.trip.status))) {
      var lat = data.trip.pickup_lat;
      var lng = data.trip.pickup_lng;
    } else {
      var lat = data.trip.drop_lat;
      var lng = data.trip.drop_lng;
    }

    if (lat != 0 && lng != 0) {
      var scheme = Platform.OS === "ios" ? "maps:" : "geo:";
      var url = scheme + `${lat},${lng}`;
      if (Platform.OS === "android") {
        Linking.openURL("google.navigation:q=" + lat + " , " + lng + "&mode=d");
      } else {
        Linking.openURL(
          "https://www.google.com/maps/dir/?api=1&destination=" +
          lat +
          "," +
          lng +
          "&travelmode=driving"
        );
      }
    }
  };


  const call_customer = (phone_number, contact) => {
    let validNumber;

    if (data?.trip.trip_type == 4) {
      validNumber = data.trip?.receiver_phone;
    } else {
      validNumber = contact && contact !== "null" ? contact : phone_number;
    }

    if (validNumber) {
      Linking.openURL(`tel:${validNumber}`);
    } else {
      Alert.alert("No valid phone number available");
    }
  };


  const call_chat = () => {
    navigation.navigate('Chat', { data: data, trip_id: trip_id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
     
      {region && data && global.tile == 2 &&
        <View style={styles.map}>
          <MapView
            provider={PROVIDER_GOOGLE}
            ref={map_ref}
            style={styles.map}
            region={region}
            showsUserLocation={true}
            showsMyLocationButton={true} // optional for user to recenter
            followsUserLocation={true}

          >
            <Marker
              coordinate={{
                latitude: parseFloat(data?.trip?.pickup_lat),
                longitude: parseFloat(data?.trip?.pickup_lng),
              }}
              key={`android_pickup_${data.trip.pickup_lat}_${data.trip.pickup_lng}`}
              tracksViewChanges={false}
              image={require('../assets/img/pickup.png')} // Direct image reference
            >

            </Marker>
            <Marker
              coordinate={{
                latitude: parseFloat(data?.trip?.drop_lat),
                longitude: parseFloat(data?.trip?.drop_lng),
              }}
              key={`android_dest_${data.trip.drop_lat}_${data.trip.drop_lng}`}
              tracksViewChanges={false}
              image={require('../assets/img/destination.png')} // Direct image reference
            >

            </Marker>


            <Polyline
              coordinates={coords}
              strokeColor={theme.theme_bg}
              strokeWidth={4} // Thicker for Android
              key={`android_poly_${coords.length}`}
            />


          </MapView>
        </View>
       
      }

      {on_load == 1 && (
        <View>

          <View style={{ flexDirection: 'row' }}>
            <DropShadow
              style={{
                width: '50%',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 0.3,
                shadowRadius: 25,
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
                }}>
                <Icon
                  type={Icons.MaterialIcons}
                  name="arrow-back"
                  color={theme.textPrimary}
                  style={{ fontSize: 22 }}
                />
              </TouchableOpacity>
            </DropShadow>
          </View>

        </View>
      )}
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: theme.background,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 10,
          padding: 10,
          overflow: 'hidden',
        }}>
        <ScrollView>
          <View style={{ padding: 10 }}>
            {on_load == 1 ? (
              <View>
                <View
                  style={{ borderBottomWidth: 0.5, borderColor: theme.divider }}>
                  <View style={{ width: '100%', marginBottom: 10 }}>
                    {pickup_statuses.includes(parseInt(data.trip.status)) && (
                      <TouchableOpacity
                        onPress={redirection.bind(this)}
                        activeOpacity={1}
                        style={{
                          width: '100%',
                          backgroundColor: theme.background,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: '100%',
                            height: 50,
                          }}>
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
                          <View style={{ margin: 3 }} />
                          <View
                            style={{
                              width: '80%',
                              alignItems: 'flex-start',
                              justifyContent: 'flex-start',
                            }}>
                            <Text
                              numberOfLines={1}
                              style={{
                                color: theme.textSecondary,
                                fontSize: f_xs,
                                fontFamily: regular,
                              }}>
                              {t('Pickup Address')}
                            </Text>
                            <View style={{ margin: 2 }} />
                            <Text
                              numberOfLines={2}
                              ellipsizeMode="tail"
                              style={{
                                color: theme.textPrimary,
                                fontSize: f_xs,
                                fontFamily: regular,
                              }}>
                              {data.trip.pickup_address}
                            </Text>
                          </View>
                          <View
                            style={{
                              width: '10%',
                              alignItems: 'flex-start',
                              justifyContent: 'center',
                              paddingTop: 4,
                            }}>
                            <Icon
                              type={Icons.MaterialCommunityIcons}
                              name="navigation-variant"
                              color={theme.textPrimary}
                              style={{ fontSize: 25 }}
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                    {drop_statuses.includes(parseInt(data.trip.status)) &&
                      data.trip.trip_type != 2 && (
                        <TouchableOpacity
                          onPress={redirection.bind(this)}
                          activeOpacity={1}
                          style={{
                            width: '100%',

                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              height: 50,
                            }}>
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
                            <View
                              style={{
                                width: '80%',
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                              }}>
                              <Text
                                numberOfLines={1}
                                style={{
                                  color: theme.textSecondary,
                                  fontSize: f_xs,
                                  fontFamily: regular,
                                }}>
                                {t('Drop Address')}
                              </Text>
                              <View style={{ margin: 2 }} />
                              <Text
                                numberOfLines={2}
                                ellipsizeMode="tail"
                                style={{
                                  color: theme.textPrimary,
                                  fontSize: f_xs,
                                  fontFamily: regular,
                                }}>
                                {data.trip.drop_address}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: '10%',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                paddingTop: 4,
                              }}>
                              <Icon
                                type={Icons.MaterialCommunityIcons}
                                name="navigation-variant"
                                color={theme.textPrimary}
                                style={{ fontSize: 25 }}
                              />
                            </View>
                          </View>
                        </TouchableOpacity>
                      )}
                    {drop_statuses.includes(parseInt(data.trip.status)) &&
                      data.trip.trip_type == 2 && (
                        <TouchableOpacity
                          activeOpacity={1}
                          style={{
                            width: '100%',

                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              marginBottom: 20,
                              marginLeft: 10,
                              marginRight: 10,
                            }}>
                            <View style={{ width: '10%' }}>
                              <Icon
                                type={Icons.MaterialIcons}
                                name="schedule"
                                color={theme.textPrimary}
                                style={{ fontSize: 22 }}
                              />
                            </View>
                            <View style={{ width: '90%' }}>
                              <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={{
                                  color: theme.textPrimary,
                                  fontSize: f_m,
                                  fontFamily: regular,
                                }}>
                                {data.trip.package_details.hours} hrs{' '}
                                {data.trip.package_details.kilometers} {t('km')}{' '}
                                {t('package')}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      )}
                  </View>
                </View>

                <View
                  style={{
                    borderBottomWidth: 0.5,
                    borderTopWidth: 0.5,
                    borderColor: theme.divider,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      marginTop: 10,
                      marginBottom: 10,
                    }}>
                    <TouchableOpacity
                      onPress={call_chat.bind(this)}
                      style={{
                        width: '15%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icon
                        type={Icons.MaterialIcons}
                        name="chat"
                        color={theme.textPrimary}
                        style={{ fontSize: 30 }}
                      />
                    </TouchableOpacity>
                    <View style={{ width: '5%' }} />
                    <TouchableOpacity
                      onPress={call_customer.bind(
                        this,
                        data.trip.customer.phone_number,
                        data.trip.contact,
                      )}
                      style={{
                        width: '15%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icon
                        type={Icons.MaterialIcons}
                        name="call"
                        color={theme.textPrimary}
                        style={{ fontSize: 30 }}
                      />
                    </TouchableOpacity>
                    <View style={{ width: '10%' }} />
                    {data.trip.status < 3 && <View style={{ width: '90%', }}>
                      {cancel_loading == false ? (
                        <TouchableOpacity
                          onPress={showDialog.bind(this)}
                          activeOpacity={1}
                          style={{
                            width: '55%',
                            backgroundColor: theme.error,
                            borderRadius: 10,
                            height: 50,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              color: theme.theme_fg_two,
                              fontSize: f_m,
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
                    </View>}

                  </View>
                  {data.trip.trip_type == 4 && (
                    <ScrollView showsVerticalScrollIndicator={false} style={{
                      backgroundColor: theme.surface,
                      borderRadius: 16,
                      padding: 16,
                      marginBottom: 20,
                      maxHeight: 150
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
                      <View style={{ margin: '10%' }} />
                    </ScrollView>
                  )}
                </View>
                <View style={{ borderColor: theme.grey }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      marginTop: 10,
                      marginBottom: 20,
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
                            fontSize: f_xs,
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
                            fontSize: f_xs,
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
                        {t('Estimated Fare')}
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
                            fontSize: f_xs,
                            fontFamily: normal,
                          }}>
                          {global.currency}{Number(data?.trip?.total || 0).toFixed(0)}

                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {data.trip.status < 5 && (
                  <>
                    {!loading ? (
                      <TouchableOpacity
                        onPress={check_otp}
                        activeOpacity={0.7}
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
                            fontSize: f_m,
                            fontFamily: bold,
                          }}>
                          {i18n.language === 'en'
                            ? data.trip.new_status.status_name
                            : data.trip.new_status.status_name_ar}
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
                          source={btn_loader}
                          autoPlay
                          loop
                        />
                      </View>
                    )}
                  </>
                )}

                <Modal
                  visible={dialog_visible}
                  animationType="slide"
                  transparent={true}>
                  <TouchableWithoutFeedback onPress={call_dialog_visible}>
                    <View style={{
                      flex: 1,
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                      <TouchableWithoutFeedback>
                        <View style={{
                          width: '90%',
                          backgroundColor: theme.background,
                          borderRadius: 10,
                          padding: 20,
                        }}>
                          {/* Modal Title */}
                          <Text style={{
                            fontSize: 16,
                            fontFamily: regular,

                            marginBottom: 10,
                            backgroundColor: theme.surface,
                            padding: 10,
                            color: theme.textPrimary,
                            borderRadius: 10,
                            textAlign: 'center',
                          }}>
                            {t('Reason to cancel your ride')}
                          </Text>

                          {/* Cancellation Reasons */}
                          <FlatList
                            data={cancellation_reason}
                            renderItem={({ item }) => (
                              <TouchableOpacity
                                onPress={() =>
                                  call_trip_cancel(item.id, item.type)
                                }
                                activeOpacity={1}
                                style={{ paddingVertical: 10, }}>
                                <Text style={{
                                  fontSize: 12,
                                  fontFamily: regular,
                                  color: theme.textPrimary,
                                }}>
                                  {i18n.language === 'ar'
                                    ? item.reason_ar
                                    : item.reason}
                                </Text>
                              </TouchableOpacity>
                            )}
                            keyExtractor={item => item.id.toString()}
                          />

                          {/* Close Button */}
                          <TouchableOpacity
                            onPress={call_dialog_visible}
                            style={{
                              marginTop: 10,

                              padding: 10,
                              borderRadius: 10,
                              borderColor: 'silver',
                              borderWidth: 0.4,
                            }}>
                            <Text style={{
                              fontSize: 16,
                              color: theme.textPrimary,
                              textAlign: 'center',
                              fontFamily: 'regular',
                            }}>{t('Close')}</Text>
                          </TouchableOpacity>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  </TouchableWithoutFeedback>
                </Modal>
              </View>
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <Text
                  style={{
                    color: theme.theme_fg_two,
                    fontSize: f_s,
                    fontFamily: regular,
                  }}>
                  {t('Loading')}...
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      <Modal
        visible={otp_dialog_visible}
        animationType="fade"
        transparent={true}
        statusBarTranslucent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.1)',
            padding: 20,
          }}>
          <View
            style={{
              width: '100%',
              maxWidth: 400,
              backgroundColor: theme.background,
              borderRadius: 16,
              padding: 24,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 20,
              elevation: 5,
            }}>
            {/* Modal Header */}
            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '600',
                  color: theme.textPrimary,
                  textAlign: 'center',
                  marginBottom: 8,
                }}>
                {t('Enter your OTP')}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: theme.textSecondary,
                  textAlign: 'center',
                  lineHeight: 20,
                }}>
                {t('Collect your OTP from your customer')}
              </Text>
            </View>

            {/* Input Field */}
            <TextInput
              style={{
                height: 50,
                borderWidth: 1,
                borderColor: '#e0e0e0',
                borderRadius: 8,
                paddingHorizontal: 16,
                fontSize: 16,
                color: theme.textPrimary,
                marginBottom: 24,
                backgroundColor: theme.surface,
              }}
              placeholder={t('Enter OTP')}
              placeholderTextColor="#999"
              value={inputText}
              keyboardType="numeric"
              onChangeText={text => setInputText(text)}
            />

            {/* Action Buttons */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 12,
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  height: 48,
                  borderRadius: 8,
                  backgroundColor: theme.surface,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => setOtpDialogVisible(false)}>
                <Text
                  style={{
                    color: theme.error,
                    fontSize: 16,

                  }}>
                  {t('Cancel')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  height: 48,
                  borderRadius: 8,
                  backgroundColor: theme.primary,
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#007AFF',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                  elevation: 2,
                }}
                onPress={() => verify_otp(inputText)}>
                <Text
                  style={{
                    color: theme.onPrimary,
                    fontSize: 16,
                    fontWeight: '500',
                  }}>
                  {t('Submit')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: screenHeight,
    width: screenWidth,

  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },




});

function mapStateToProps(state) {
  return {
    change_location: state.change_location.change_location,
    initial_lat: state.booking.initial_lat,
    initial_lng: state.booking.initial_lng,
    initial_region: state.booking.initial_region,
  };
}

export default connect(mapStateToProps, null)(Trip);