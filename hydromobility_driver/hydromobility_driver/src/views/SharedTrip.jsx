import { useTranslation } from "react-i18next";
import '../languages/i18next.js';

import React, { useState, useEffect, useRef } from "react";
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
  TextInput
} from "react-native";
import { useNavigation, useRoute, CommonActions } from "@react-navigation/native";
import * as colors from '../assets/css/Colors';
import { screenHeight, screenWidth, normal, bold, regular, get_ongoing_trip_details_shared, api_url, change_trip_status, GOOGLE_KEY, btn_loader, LATITUDE_DELTA, LONGITUDE_DELTA, trip_cancel, loader, f_xs, f_m, f_s, shared_trip_accept, shared_trip_reject, f_l } from '../config/Constants';

import Icon, { Icons } from '../components/Icons';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import Dialog from "react-native-dialog";
import { connect } from 'react-redux';
import DialogInput from 'react-native-dialog-input';
import DropShadow from "react-native-drop-shadow";
import database from '@react-native-firebase/database';
import BottomSheet from "../components/BottomSheet.js";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const SharedTrip = (props) => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();

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
  const [cancellation_statuses, setCancellationStatuses] = useState([6, 7]);
  const map_ref = useRef();
  const [region, setRegion] = useState({
    latitude: props.initial_lat,
    longitude: props.initial_lng,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [trip_dialog_popup, setTripDialogPopup] = useState(false);
  const [new_customer_name, setNewCustomerName] = useState('');
  const [new_pickup_address, setNewPickupAddress] = useState('');
  const [new_booking_id, setNewBookingId] = useState(0);
  const [inputText, setInputText] = useState('');

  const go_back = () => {
    if (from == 'home') {
      navigation.navigate('Dashboard')
    } else {
      navigation.goBack();
    }
  }

  useEffect(() => {

    const sharedTripRef = database().ref(`shared/${global.id}`);

    const unsubscribe = navigation.addListener('focus', async () => {
      try {
        await call_get_ongoing_trip_details_shared();
      } catch (error) {
        console.error('Failed to fetch trip details:', error);

      }
    });

    const handleValueChange = (snapshot) => {
      try {
        const data = snapshot.val();
        if (!data) return;
        if (data.booking_id) {
          setTripDialogPopup(true);
          setNewCustomerName(data.customer_name || '');
          setNewPickupAddress(data.pickup_address || '');
          setNewBookingId(data.booking_id);
        }
      } catch (error) {
        console.error('Error processing Firebase data:', error);
      }
    };

    sharedTripRef.on('value', handleValueChange);

    return () => {
      unsubscribe();
      sharedTripRef.off('value', handleValueChange);
    };
  }, [navigation]);
  const showToast = (type, title, message) => {
    ReactNativeHapticFeedback.trigger("impactLight", options);

    Toast.show({
      type: type,
      text1: title,
      text2: message,
      visibilityTime: 5000,
      position: "top",
    });
  };

  const call_get_ongoing_trip_details_shared = async () => {
    if (props.change_location.latitude && props.change_location.longitude) {
      setLoading(true);
      await axios({
        method: 'post',
        url: api_url + get_ongoing_trip_details_shared,
        data: { driver_id: global.id, lat: props.change_location.latitude != undefined ? props.change_location.latitude : props.initial_lat, lng: props.change_location.longitude != undefined ? props.change_location.longitude : props.initial_lng }
      })
        .then(async response => {
          setLoading(false);
          console.log(response.data.result.trip.trip_type)
          if (response.data.result.trip.status == 4) {
            navigation.navigate('Bill', { trip_id: trip_id, from: 'shared_trip' });
          } else if (cancellation_statuses.includes(parseInt(response.data.result.trip.status)) && from == 'home') {
            navigate_home();
          }
          setData(response.data.result);
          setTripId(response.data.result.trip.id);
          setCancellationReasons(response.data.result.cancellation_reasons);
          setOnLoad(1);
        })
        .catch(error => {
          setLoading(false);
        });
    } else {
      go_back();
    }

  }

  const check_otp = () => {
    if (data.trip.new_status.id == 3) {
      setOtpDialogVisible(true);
    } else {
      onRegionChange();
    }
  }

  const onRegionChange = async () => {
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + props.change_location.latitude + ',' + props.change_location.longitude + '&key=' + GOOGLE_KEY)
      .then((response) => response.json())
      .then(async (responseJson) => {
        if (responseJson.results[2].formatted_address != undefined) {
          setRegion({
            latitude: props.change_location.latitude,
            longitude: props.change_location.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          })
          call_change_trip_status(responseJson.results[2].formatted_address);
        }
      })
  }

  const call_change_trip_status = async (address) => {
    console.log({ trip_id: trip_id, status: data.trip.new_status.id, address: address, lat: props.change_location.latitude, lng: props.change_location.longitude })
    setLoading(true);
    await axios({
      method: 'post',
      url: api_url + change_trip_status,
      data: { trip_id: trip_id, status: data.trip.new_status.id, address: address, lat: props.change_location.latitude, lng: props.change_location.longitude }
    })
      .then(async response => {
        call_get_ongoing_trip_details_shared();
      })
      .catch(error => {
        setLoading(false);
      });
  }

  const showDialog = () => {
    setDialogVisible(true);
  }

  const call_trip_cancel = async (reason_id, type) => {
    console.log({ trip_id: trip_id, status: 7, reason_id: reason_id, cancelled_by: type })
    setDialogVisible(false)
    setCancelLoading(true);
    await axios({
      method: 'post',
      url: api_url + trip_cancel,
      data: { trip_id: trip_id, status: 7, reason_id: reason_id, cancelled_by: type }
    })
      .then(async response => {
        setCancelLoading(false)
        console.log('success')
      })
      .catch(error => {
        setCancelLoading(false);
      });
  }

  const navigate_home = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Home" }],
      })
    );
  }

  const call_dialog_visible = () => {
    setDialogVisible(false)
  }


  const verify_otp = async (val) => {

    if (val == data.trip.otp) {
      setOtpDialogVisible(false);
      await onRegionChange();
    } else {
      setOtpDialogVisible(false);
      showToast("error", t('Validation error'), t('Enter valid otp'));
      setInputText("")

      closeOtpDialog();
    }
  };


  const closeOtpDialog = () => {
    setOtpDialogVisible(false)
  }



  const redirection = () => {
    if (pickup_statuses.includes(parseInt(data.trip.status))) {
      var lat = data.trip.pickup_lat;
      var lng = data.trip.pickup_lng;
    } else {
      var lat = data.trip.drop_lat;
      var lng = data.trip.drop_lng;
    }

    if (lat != 0 && lng != 0) {
      var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
      var url = scheme + `${lat},${lng}`;
      if (Platform.OS === 'android') {
        Linking.openURL("google.navigation:q=" + lat + " , " + lng + "&mode=d");
      } else {
        Linking.openURL('https://www.google.com/maps/dir/?api=1&destination=' + lat + ',' + lng + '&travelmode=driving');
      }
    }
  }

  const call_customer = (phone_number) => {
    Linking.openURL(`tel:${phone_number}`)
  }

  const call_chat = (data) => {
    console.log("data", data)
    navigation.navigate("Chat", { data: data, trip_id: trip_id })
  }

  const call_trip_accept = async () => {
    setLoading(true)
    await axios({
      method: 'post',
      url: api_url + shared_trip_accept,
      data: { trip_id: new_booking_id, driver_id: global.id }
    })
      .then(async response => {
        setLoading(false)
        if (response.data.status == 1) {
          setTripDialogPopup(false);
          setNewBookingId(0);
          setNewCustomerName('');
          setNewPickupAddress('');
          call_get_ongoing_trip_details_shared();
        } else {
          showToast("error", t('Trip cancelled'), t('Sorry customer cancelled'));

          go_back();
        }
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
        showToast("error", t('Validation error'), t('Sorry something went wrong'));


      });
  }

  const call_trip_reject = async () => {
    setLoading(true)
    await axios({
      method: 'post',
      url: api_url + shared_trip_reject,
      data: { trip_id: new_booking_id, driver_id: global.id, from: 2 }
    })
      .then(async response => {
        setLoading(false)
        if (response.data.status == 1) {
          setTripDialogPopup(false);
          setNewBookingId(0);
          setNewCustomerName('');
          setNewPickupAddress('');
          call_get_ongoing_trip_details_shared();
        }
      })
      .catch(error => {
        setLoading(false)
        showToast("error", t('Validation error'), t('Sorry something went wrong'));


      });
  }

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
        region={region}
      >
      </MapView>
      {on_load == 1 &&
        <View>
          {from == 'trips' &&
            <View style={{ flexDirection: 'row' }}>
              <DropShadow
                style={{
                  width: '50%',
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 25,
                }}
              >
                <TouchableOpacity activeOpacity={0} onPress={go_back.bind(this)} style={{ width: 40, height: 40, backgroundColor: colors.theme_bg_three, borderRadius: 25, alignItems: 'center', justifyContent: 'center', top: 20, left: 20 }}>
                  <Icon type={Icons.MaterialIcons} name="arrow-back" color={colors.icon_active_color} style={{ fontSize: 22 }} />
                </TouchableOpacity>
              </DropShadow>
            </View>
          }
        </View>
      }
      <BottomSheet>

        <ScrollView >
          <View style={{ padding: 10 }}>
            {on_load == 1 ?
              <View>
                <View style={{ borderBottomWidth: 0.5, borderColor: colors.grey }}>
                  <View style={{ width: '100%', marginBottom: 10 }}>
                    <View style={{ marginBottom: 10 }}>
                      <Text numberOfLines={1} ellipsizeMode='tail' style={{ color: colors.theme_fg_two, fontSize: f_l, fontFamily: bold }}>{data.trip.customer_name} - #{data.trip.customer_id}</Text>
                    </View>
                    {pickup_statuses.includes(parseInt(data.trip.status)) &&
                      <TouchableOpacity onPress={redirection.bind(this)} activeOpacity={1} style={{ width: '100%', backgroundColor: colors.theme_bg_three }}>
                        <View style={{ flexDirection: 'row', width: '100%', height: 50 }}>
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
                          <View style={{ width: '80%', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                            <Text numberOfLines={1} style={{ color: colors.grey, fontSize: f_xs, fontFamily: regular }}>{t('Pickup Address')}</Text>
                            <View style={{ margin: 2 }} />
                            <Text numberOfLines={2} ellipsizeMode='tail' style={{ color: colors.theme_fg_two, fontSize: f_xs, fontFamily: regular }}>{data.trip.pickup_address}</Text>
                          </View>
                          <View style={{ width: '10%', alignItems: 'flex-end', justifyContent: 'center', paddingTop: 4 }}>
                            <Icon type={Icons.MaterialCommunityIcons} name="navigation-variant" color={colors.theme_fg_two} style={{ fontSize: 25 }} />
                          </View>
                        </View>
                      </TouchableOpacity>
                    }
                    {drop_statuses.includes(parseInt(data.trip.status)) && data.trip.trip_type != 2 &&
                      <TouchableOpacity onPress={redirection.bind(this)} activeOpacity={1} style={{ width: '100%', backgroundColor: colors.theme_bg_three }}>
                        <View style={{ flexDirection: 'row', width: '100%', height: 50 }}>
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
                          <View style={{ margin: 3 }} />
                          <View style={{ width: '80%', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                            <Text numberOfLines={1} style={{ color: colors.grey, fontSize: f_xs, fontFamily: regular }}>{t('Drop Address')}</Text>
                            <View style={{ margin: 2 }} />
                            <Text numberOfLines={2} ellipsizeMode='tail' style={{ color: colors.theme_fg_two, fontSize: f_xs, fontFamily: regular }}>{data.trip.drop_address}</Text>
                          </View>
                          <View style={{ width: '10%', alignItems: 'flex-end', justifyContent: 'center', paddingTop: 4 }}>
                            <Icon type={Icons.MaterialCommunityIcons} name="navigation-variant" color={colors.theme_fg_two} style={{ fontSize: 25 }} />
                          </View>
                        </View>
                      </TouchableOpacity>
                    }
                    {drop_statuses.includes(parseInt(data.trip.status)) && data.trip.trip_type == 2 &&
                      <TouchableOpacity activeOpacity={1} style={{ width: '100%', backgroundColor: colors.theme_bg_three }}>
                        <View style={{ flexDirection: 'row', marginBottom: 20, marginLeft: 10, marginRight: 10 }}>
                          <View style={{ width: '10%' }}>
                            <Icon type={Icons.MaterialIcons} name="schedule" color={colors.icon_inactive_color} style={{ fontSize: 22 }} />
                          </View>
                          <View style={{ width: '90%' }}>
                            <Text numberOfLines={1} ellipsizeMode='tail' style={{ color: colors.theme_fg_two, fontSize: f_m, fontFamily: bold }}>{data.trip.package_details.hours} hrs {data.trip.package_details.kilometers} {t('km')} {t('package')}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    }
                  </View>
                </View>
                {data.trip.status <= 2 &&
                  <View style={{ borderBottomWidth: 0.5, borderTopWidth: 0.5, borderColor: colors.grey }}>
                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 10, marginBottom: 10 }}>
                      <TouchableOpacity onPress={call_chat.bind(this, data)} style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon type={Icons.MaterialIcons} name="chat" color={colors.theme_fg_two} style={{ fontSize: 30 }} />
                      </TouchableOpacity>
                      <View style={{ width: '5%' }} />
                      <TouchableOpacity onPress={call_customer.bind(this, data.trip.customer.phone_number)} style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon type={Icons.MaterialIcons} name="call" color={colors.theme_fg_two} style={{ fontSize: 30 }} />
                      </TouchableOpacity>
                      <View style={{ width: '10%' }} />
                      {cancel_loading == false ?
                        <TouchableOpacity onPress={showDialog.bind(this)} activeOpacity={1} style={{
                          width: '55%', backgroundColor:
                            colors.error_background, borderRadius: 10, height: 50, flexDirection: 'row', alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Text style={{ color: colors.theme_fg_two, fontSize: f_m, color: colors.error, fontFamily: bold }}>
                            {t('Cancel')}
                          </Text>
                        </TouchableOpacity>
                        :
                        <View style={{ height: 50, width: '90%', alignSelf: 'center' }}>
                          <LottieView style={{ flex: 1 }} source={loader} autoPlay loop />
                        </View>
                      }
                    </View>
                  </View>
                }
                <View style={{ borderColor: colors.grey }}>
                  <View style={{ flexDirection: 'row', width: '100%', marginTop: 10, marginBottom: 20 }}>
                    <View style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}>
                      <Text numberOfLines={1} style={{ color: colors.grey, fontSize: f_xs, fontFamily: regular }}>{t('Distance')}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                        <Icon type={Icons.MaterialIcons} name="map" color={colors.theme_fg_two} style={{ fontSize: 22 }} />
                        <View style={{ margin: 2 }} />
                        <Text numberOfLines={1} style={{ color: colors.theme_fg_two, fontSize: f_xs, fontFamily: normal }}>{data.trip.distance} {t('km')}</Text>
                      </View>
                    </View>
                    <View style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}>
                      <Text numberOfLines={1} style={{ color: colors.grey, fontSize: f_xs, fontFamily: regular }}>{t('Trip Type')}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                        <Icon type={Icons.MaterialIcons} name="commute" color={colors.theme_fg_two} style={{ fontSize: 22 }} />
                        <View style={{ margin: 2 }} />
                        <Text numberOfLines={1} style={{ color: colors.theme_fg_two, fontSize: f_xs, fontFamily: normal }}>{data.trip.trip_type_name}</Text>
                      </View>
                    </View>
                    <View style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}>
                      <Text numberOfLines={1} style={{ color: colors.grey, fontSize: f_xs, fontFamily: regular }}>{t('Estimated Fare')}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                        <Icon type={Icons.MaterialIcons} name="local-atm" color={colors.theme_fg_two} style={{ fontSize: 22 }} />
                        <View style={{ margin: 2 }} />
                        <Text numberOfLines={1} style={{ color: colors.theme_fg_two, fontSize: f_xs, fontFamily: normal }}>{global.currency}{data.trip.total}</Text>
                      </View>
                    </View>
                  </View>
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
                        backgroundColor: '#fff',
                        borderRadius: 16,
                        padding: 24,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.1,
                        shadowRadius: 20,
                        elevation: 5,
                      }}>
                      <View style={{ marginBottom: 20 }}>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: '600',
                            color: '#222',
                            textAlign: 'center',
                            marginBottom: 8,
                          }}>
                          {t('Enter your OTP')}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: '#666',
                            textAlign: 'center',
                            lineHeight: 20,
                          }}>
                          {t('Collect your OTP from your customer')}
                        </Text>
                      </View>

                      <TextInput
                        style={{
                          height: 50,
                          borderWidth: 1,
                          borderColor: '#e0e0e0',
                          borderRadius: 8,
                          paddingHorizontal: 16,
                          fontSize: 16,
                          marginBottom: 24,
                          backgroundColor: '#f9f9f9',
                        }}
                        placeholder={t('Enter Amount')}
                        placeholderTextColor="#999"
                        value={inputText}
                        keyboardType="numeric"
                        onChangeText={text => setInputText(text)}
                      />

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
                            backgroundColor: '#f0f0f0',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          onPress={() => setOtpDialogVisible(false)}>
                          <Text
                            style={{
                              color: '#333',
                              fontSize: 16,
                              fontWeight: '500',
                            }}>
                            {t('Cancel')}
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={{
                            flex: 1,
                            height: 48,
                            borderRadius: 8,
                            backgroundColor: '#007AFF',
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
                              color: '#fff',
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

                {data.trip.status < 5 && (
                  <>
                    {!loading ? (
                      <TouchableOpacity
                        onPress={check_otp}
                        activeOpacity={0.7}
                        style={{
                          width: '100%',
                          backgroundColor: colors.btn_color,
                          borderRadius: 10,
                          height: 50,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Text
                          style={{
                            color: colors.theme_fg_three,
                            fontSize: f_m,
                            fontFamily: bold,
                          }}
                        >
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
                        }}
                      >
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
                  visible={trip_dialog_popup}
                  transparent={true}
                  animationType="slide"

                >
                  <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 20,
                  }}>
                    <View style={{
                      backgroundColor: colors.theme_bg_three,
                      borderRadius: 12,
                      width: '100%',
                      maxWidth: 400,
                      overflow: 'hidden',
                      elevation: 5
                    }}>
                      <View style={{
                        paddingVertical: 16,
                        paddingHorizontal: 20,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.theme_border,
                      }}>
                        <Text style={{
                          color: colors.theme_fg_primary,
                          fontFamily: normal,
                          fontSize: 20,
                          textAlign: 'center',
                        }}>
                          {t('New Ride Request')}
                        </Text>
                      </View>

                      <View style={{ padding: 20 }}>
                        <View style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginBottom: 16,
                        }}>
                          <View style={{

                            borderRadius: 8,
                            padding: 8,
                            marginRight: 12,
                          }}>
                            <Text style={{ color: colors.theme_bg_two }}>👤</Text>
                          </View>
                          <Text style={{
                            fontFamily: normal,
                            fontSize: 18,
                            color: colors.theme_bg_two,
                          }}>
                            {new_customer_name || 'Customer Name'}
                          </Text>
                        </View>

                        <View style={{
                          flexDirection: 'row',
                          alignItems: 'flex-start',
                          marginBottom: 8,
                        }}>
                          <View style={{
                            backgroundColor: colors.theme_accent_light,
                            borderRadius: 8,
                            padding: 8,
                            marginRight: 12,
                          }}>
                            <Text style={{ color: colors.theme_bg }}>📍</Text>
                          </View>
                          <Text style={{
                            fontFamily: regular,
                            fontSize: 16,
                            color: colors.theme_fg_two,
                            flex: 1,
                            lineHeight: 22,
                          }}>
                            {new_pickup_address || 'Pickup location not specified'}
                          </Text>
                        </View>
                      </View>

                      <View style={{
                        flexDirection: 'row',
                        borderTopWidth: .5,
                        borderTopColor: colors.text_grey,
                      }}>
                        <TouchableOpacity
                          onPress={call_trip_reject}
                          style={{
                            flex: 1,
                            paddingVertical: 14,
                            backgroundColor: '#f0f0f0',
                            alignItems: 'center',
                          }}
                          activeOpacity={0.7}
                        >
                          <Text style={{
                            color: colors.error,
                            fontFamily: normal,
                            fontSize: 16,
                          }}>
                            {t('Reject')}
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={call_trip_accept}
                          style={{
                            flex: 1,
                            paddingVertical: 14,
                            backgroundColor: colors.theme_bg,
                            alignItems: 'center',
                          }}
                          activeOpacity={0.7}
                        >
                          <Text style={{
                            color: colors.theme_bg_three,
                            fontFamily: normal,
                            fontSize: 16,
                          }}>
                            {t('Accept')}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Modal>
                <Modal
                  visible={dialog_visible}
                  animationType="slide"
                  transparent={true}
                >
                  <TouchableWithoutFeedback onPress={call_dialog_visible}>
                    <View style={styles.modalOverlay}>
                      <TouchableWithoutFeedback>
                        <View style={styles.modalContainer}>
                          <Text style={styles.modalTitle}>
                            {t('Reason to cancel your ride')}
                          </Text>

                          <FlatList
                            data={cancellation_reason}
                            renderItem={({ item }) => (
                              <TouchableOpacity
                                onPress={() =>
                                  call_trip_cancel(item.id, item.type)
                                }
                                activeOpacity={1}
                                style={styles.listItem}>
                                <Text style={styles.listText}>
                                  {i18n.language === 'ar'
                                    ? item.reason_ar
                                    : item.reason}
                                </Text>
                              </TouchableOpacity>
                            )}
                            keyExtractor={item => item.id.toString()}
                          />

                          <TouchableOpacity
                            onPress={call_dialog_visible}
                            style={styles.closeButton}>
                            <Text style={styles.closeText}>{t('Close')}</Text>
                          </TouchableOpacity>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  </TouchableWithoutFeedback>
                </Modal>
              </View>
              :
              <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Text style={{ color: colors.theme_fg_two, fontSize: f_s, fontFamily: regular }}>{t('Loading')}...</Text>
              </View>
            }
          </View>
        </ScrollView>

      </BottomSheet>
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: screenHeight,
    width: screenWidth,
    backgroundColor: colors.lite_bg
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
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
});

function mapStateToProps(state) {
  return {
    change_location: state.change_location.change_location,
    initial_lat: state.booking.initial_lat,
    initial_lng: state.booking.initial_lng,
    initial_region: state.booking.initial_region,
  };
}

export default connect(mapStateToProps, null)(SharedTrip);