import { useTranslation } from "react-i18next";
import '../languages/i18next.js';

import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  isEnabled,
  Switch
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon, { Icons } from '../components/Icons';
import { f_25, bold, img_url, api_url, change_driver_settings, get_driver_settings, loader, payment_methods, app_name, wallet, f_xs, f_s, f_m, f_xl, f_30, regular, normal } from '../config/Constants';
import axios from 'axios';
import LottieView from 'lottie-react-native';

import { SafeAreaView } from "react-native-safe-area-context";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useTheme } from "../context/ThemeContext.js";
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};
const TripSettings = (props) => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [daily_status, setDailyStatus] = useState(true);
  const [rental_status, setRentalStatus] = useState(false);
  const [outstation_status, setOutstationStatus] = useState(false);
  const [shared_status, setSharedStatus] = useState(false);
  const { theme, isDark,toggleTheme } = useTheme();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      call_get_driver_settings();
    });

    return (
      unsubscribe
    );
  }, []);

  const go_back = () => {
    ReactNativeHapticFeedback.trigger("impactLight", options);

    navigation.goBack();
  }

  const call_get_driver_settings = async () => {
    setLoading(true);
    //console.log({ driver_id: global.id })
    await axios({
      method: 'post',
      url: api_url + get_driver_settings,
      data: { driver_id: global.id }
    })
      .then(async response => {
        setLoading(false);
         console.log(response.data)
        if (response.data.data.daily_ride_status == 1) {
          setDailyStatus(true);
        } if (response.data.data.daily_ride_status == 0) {
          setDailyStatus(false);
        } if (response.data.data.rental_ride_status == 1) {
          setRentalStatus(true);
        }  if (response.data.data.rental_ride_status == 0) {
          setRentalStatus(false);
        }  if (response.data.data.outstation_ride_status == 1) {
          setOutstationStatus(true);
        } if (response.data.data.outstation_ride_status == 0) {
          setOutstationStatus(false);
        } if (response.data.data.shared_ride_status == 1) {
          setSharedStatus(true);
        } if (response.data.data.shared_ride_status == 0) {
          setSharedStatus(false);
        }
      })
      .catch(error => {
        setLoading(false);
        alert(t('Sorry something went wrong'));
      });
  }
  daily_toggleSwitch = (value) => {
    ReactNativeHapticFeedback.trigger("impactLight", options);

    if (value) {
      setDailyStatus(value)
      call_daily_change_driver_settings(1);
    } else {
      setDailyStatus(value)
      call_daily_change_driver_settings(0);
    }
  }
  rental_toggleSwitch = (value) => {
    ReactNativeHapticFeedback.trigger("impactLight", options);

    if (value) {
      setRentalStatus(value)
      call_rental_change_driver_settings(1);
    } else {
      setRentalStatus(value)
      call_rental_change_driver_settings(0);
    }
  }
  outstation_toggleSwitch = (value) => {
    ReactNativeHapticFeedback.trigger("impactLight", options);

    if (value) {
      setOutstationStatus(value)
      call_outstation_change_driver_settings(1);
    } else {
      setOutstationStatus(value)
      call_outstation_change_driver_settings(0);
    }
  }
  shared_toggleSwitch = (value) => {
    ReactNativeHapticFeedback.trigger("impactLight", options);

    if (value) {
      setSharedStatus(value)
      call_shared_change_driver_settings(1);
    } else {
      setSharedStatus(value)
      call_shared_change_driver_settings(0);
    }
  }

  const call_daily_change_driver_settings = (status) => {
    setLoading(true);
   // console.log({ id: global.id, shared_ride_status: shared_status, daily_ride_status: status, rental_ride_status: rental_status, outstation_ride_status: outstation_status })
    axios({
      method: 'post',
      url: api_url + change_driver_settings,
      data: { id: global.id, shared_ride_status: shared_status, daily_ride_status: status, rental_ride_status: rental_status, outstation_ride_status: outstation_status }
    })
      .then(async response => {
        setLoading(false);
        if (response.data.data == 0) {
          setDailyStatus(false)
          call_get_driver_settings();
        } else if (response.data.data == 1) {
          setDailyStatus(true)
          call_get_driver_settings();
        }
      })
      .catch(error => {
        setLoading(false);
        alert(t('Sorry something went wrong'))
      });
  }

  const call_rental_change_driver_settings = (status) => {
    setLoading(true);
    //console.log({ id: global.id, shared_ride_status: shared_status, daily_ride_status: 0, rental_ride_status: status, outstation_ride_status: outstation_status })
    axios({
      method: 'post',
      url: api_url + change_driver_settings,
      data: { id: global.id, shared_ride_status: shared_status, daily_ride_status: daily_status, rental_ride_status: status, outstation_ride_status: outstation_status }
    })
      .then(async response => {
        setLoading(false);
        if (response.data.data == 0) {
          setRentalStatus(false)
          call_get_driver_settings();
        } else if (response.data.data == 1) {
          setRentalStatus(true)
          call_get_driver_settings();
        }
      })
      .catch(error => {
        setLoading(false);
        alert(t('Sorry something went wrong'))
      });
  }

  const call_outstation_change_driver_settings = (status) => {
    setLoading(true);
    //console.log({ id: global.id, shared_ride_status: shared_status, daily_ride_status: 0, rental_ride_status: rental_status, outstation_ride_status: 0 })
    axios({
      method: 'post',
      url: api_url + change_driver_settings,
      data: { id: global.id, shared_ride_status: shared_status, daily_ride_status: daily_status, rental_ride_status: rental_status, outstation_ride_status: status }
    })
      .then(async response => {
        setLoading(false);
        if (response.data.data == 0) {
          setOutstationStatus(false)
          call_get_driver_settings();
        } else if (response.data.data == 1) {
          setOutstationStatus(true)
          call_get_driver_settings();
        }
      })
      .catch(error => {
        setLoading(false);
        alert(t('Sorry something went wrong'))
      });
  }

  const call_shared_change_driver_settings = (status) => {
    setLoading(true);
    //console.log({ id: global.id, shared_ride_status: status, daily_ride_status: 0, rental_ride_status: rental_status, outstation_ride_status: outstation_status })
    axios({
      method: 'post',
      url: api_url + change_driver_settings,
      data: { id: global.id, shared_ride_status: status, daily_ride_status: daily_status, rental_ride_status: rental_status, outstation_ride_status: outstation_status }
    })
      .then(async response => {
        setLoading(false);
        if (response.data.data == 0) {
          setSharedStatus(false)
          call_get_driver_settings();
        } else if (response.data.data == 1) {
          setSharedStatus(true)
          call_get_driver_settings();
        }
      })
      .catch(error => {
        setLoading(false);
        alert(t('Sorry something went wrong'))
      });
  }

  return (
 <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
  {/* Header */}
  <StatusBar
    translucent
    backgroundColor="transparent"
    barStyle={isDark ? "light-content" : "dark-content"}
  />
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 0,
      paddingTop: 12,
      paddingBottom: 8,
    }}
  >
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={go_back}
      style={{
        width: 48,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 24,
        
      }}
    >
      <Icon
        type={Icons.MaterialIcons}
        name="arrow-back"
        color={theme.textPrimary}
        style={{ fontSize: 24 }}
      />
    </TouchableOpacity>
    <View style={{ flex: 1, marginLeft: 16, justifyContent: "center" }}>
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{
          color: theme.textPrimary,
          fontSize: 20,
          fontFamily: regular,

        }}
      >
        {t("Trip Settings")}
      </Text>
    </View>
  </View>

  {/* Settings Cards Container */}
  <View style={{ padding: 16 }}>
    {/* Daily Ride Card */}
    <View
      style={{
        backgroundColor: theme.surface,
        borderWidth: 0.2,
        borderColor: daily_status ? theme.divider : theme.surface,
        shadowColor: theme.shadow_color,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: daily_status ? theme.primary + "20" : theme.surface,
          }}
        >
          <Icon
            type={Icons.MaterialCommunityIcons}
            name="calendar-check"
            color={daily_status ? theme.textPrimary : theme.textSecondary}
            size={24}
          />
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text
            style={{
              color: daily_status ? theme.textPrimary : theme.textSecondary,
              fontSize: 16,
              fontFamily: regular,
              
            }}
          >
            {t("Ride Hailing")}
          </Text>
          <Text
            style={{
              color: theme.textSecondary,
              fontSize: 13,
              marginTop: 2,
            }}
          >
            {t("Accept regular daily commute requests")}
          </Text>
        </View>
        <Switch
          trackColor={{ false: theme.divider, true: theme.primary + "40" }}
          thumbColor={daily_status ? theme.onPrimary : theme.textSecondary}
          ios_backgroundColor={theme.divider}
          onValueChange={daily_toggleSwitch}
          value={daily_status}
        />
      </View>
    </View>

    {/* Outstation Ride Card */}
    <View
      style={{
        backgroundColor: theme.surface,
        borderWidth: 0.2,
        borderColor: outstation_status ? theme.divider : theme.surface,
        shadowColor: theme.shadow_color,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: outstation_status
              ? theme.primary + "20"
              : theme.surface,
          }}
        >
          <Icon
            type={Icons.MaterialCommunityIcons}
            name="road-variant"
            color={outstation_status ? theme.textPrimary : theme.textSecondary}
            size={24}
          />
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text
            style={{
              color: outstation_status ? theme.textPrimary : theme.textSecondary,
              fontSize: 16,
              fontFamily: regular,
              
            }}
          >
            {t("InterCounty Rides")}
          </Text>
          <Text
            style={{
              color: theme.textSecondary,
              fontSize: 13,
              marginTop: 2,
            }}
          >
            {t("Accept long-distance trip requests")}
          </Text>
        </View>
        <Switch
          trackColor={{ false: theme.divider, true: theme.primary + "40" }}
          thumbColor={outstation_status ? theme.onPrimary : theme.textSecondary}
          ios_backgroundColor={theme.divider}
          onValueChange={outstation_toggleSwitch}
          value={outstation_status}
        />
      </View>
    </View>

    {/* Shared Ride Card */}
    <View
      style={{
        backgroundColor: theme.surface,
        borderWidth: 0.2,
        borderColor: shared_status ? theme.divider : theme.surface,
        shadowColor: theme.shadow_color,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: shared_status
              ? theme.primary + "20"
              : theme.surface,
          }}
        >
          <Icon
            type={Icons.MaterialCommunityIcons}
            name="account-multiple"
            color={shared_status ? theme.textPrimary : theme.textSecondary}
            size={24}
          />
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text
            style={{
              color: shared_status ? theme.textPrimary : theme.textSecondary,
              fontSize: 16,
              fontFamily: regular,
              
            }}
          >
            {t("Shared Rides")}
          </Text>
          <Text
            style={{
              color: theme.textSecondary,
              fontSize: 13,
              marginTop: 2,
            }}
          >
            {t("Accept carpooling ride requests")}
          </Text>
        </View>
        <Switch
          trackColor={{ false: theme.divider, true: theme.primary + "40" }}
          thumbColor={shared_status ? theme.onPrimary : theme.textSecondary}
          ios_backgroundColor={theme.divider}
          onValueChange={shared_toggleSwitch}
          value={shared_status}
        />
      </View>
    </View>

    {/* Rental Ride Card */}
    <View
      style={{
        backgroundColor: theme.surface,
        borderWidth: 0.2,
        borderColor: rental_status ? theme.divider : theme.surface,
        shadowColor: theme.shadow_color,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        borderRadius: 12,
        padding: 16,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: rental_status
              ? theme.primary + "20"
              : theme.surface,
          }}
        >
          <Icon
            type={Icons.MaterialCommunityIcons}
            name="clock-outline"
            color={rental_status ? theme.textPrimary : theme.textSecondary}
            size={24}
          />
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text
            style={{
              color: rental_status ? theme.textPrimary : theme.textSecondary,
              fontSize: 16,
              fontFamily: regular,
              
            }}
          >
            {t("Lease Rides")}
          </Text>
          <Text
            style={{
              color: theme.textSecondary,
              fontSize: 13,
              marginTop: 2,
            }}
          >
            {t("Accept hourly/daily Lease requests")}
          </Text>
        </View>
        <Switch
          trackColor={{ false: theme.divider, true: theme.primary + "40" }}
          thumbColor={rental_status ? theme.onPrimary : theme.textSecondary}
          ios_backgroundColor={theme.divider}
          onValueChange={rental_toggleSwitch}
          value={rental_status}
        />
      </View>
    </View>
  </View>

  {/* Status Indicator */}
  <View
    style={{
      position: "absolute",
      bottom: 24,
      left: 0,
      right: 0,
      alignItems: "center",
    }}
  >
    <View
      style={{
        backgroundColor: theme.surface,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: theme.divider,
        shadowColor: theme.shadow_color,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
      }}
    >
      <View
        style={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor:
            daily_status || outstation_status || shared_status || rental_status
              ? theme.textPrimary
              : theme.textSecondary,
          marginRight: 10,
        }}
      />
      <Text
        style={{
          fontFamily: regular,
          fontSize: 14,
          color: theme.textPrimary,
          
        }}
      >
        {daily_status || outstation_status || shared_status || rental_status
          ? t("Currently accepting rides")
          : t("Not accepting rides")}
      </Text>
    </View>
  </View>
</SafeAreaView>

  );
};



export default TripSettings;