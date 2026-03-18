import { useTranslation } from "react-i18next";
import '../languages/i18next';

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, Platform, Alert, PermissionsAndroid, Linking } from 'react-native';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';
import { promptForEnableLocationIfNeeded } from 'react-native-android-location-enabler';
import * as colors from '../assets/css/Colors';
import { bold, location, regular } from '../config/Constants';
import { useTheme } from "../context/ThemeContext";

const LocationEnable = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
    const { theme, isDark } = useTheme(); // Using theme from context

  // ------------------- MAIN FUNCTION -------------------
  const enableGPS = async () => {
    if (Platform.OS === 'android') {
      // Step 1: Ask user to enable GPS
      promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
        .then(() => requestAndroidPermission())
        .catch(err => {
          console.log('GPS prompt canceled', err);
          Alert.alert(
            t('Location Required'),
            t('Please enable GPS to continue.'),
            [
              { text: t('Cancel'), style: 'cancel' },
              { text: t('Open Settings'), onPress: () => Linking.openSettings() },
            ]
          );
        });
    } else {
      // iOS: request current location
      requestIOSLocation();
    }
  };

  // ------------------- ANDROID PERMISSION -------------------
  const requestAndroidPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: `${global.app_name} ${t('Location Permission')}`,
          message: t('We need access to your location to find nearby drivers.'),
          buttonPositive: t('OK'),
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Permission granted
        navigation.navigate('Splash');
      } else {
        // Permission denied, ask again or navigate to settings
        Alert.alert(
          t('Permission Denied'),
          t('Please enable location permission in settings to continue.'),
          [
            { text: t('Cancel'), style: 'cancel' },
            { text: t('Open Settings'), onPress: () => Linking.openSettings() },
          ]
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // ------------------- IOS PERMISSION -------------------
  const requestIOSLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        // Permission granted
        navigation.navigate('Splash');
      },
      error => {
        console.log('iOS location error:', error);
        Alert.alert(
          t('Location Required'),
          t('Please allow location access in settings to continue.'),
          [
            { text: t('Cancel'), style: 'cancel' },
            { text: t('Open Settings'), onPress: () => Linking.openSettings() },
          ]
        );
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return (
   <SafeAreaView style={{ flex: 1, backgroundColor: theme.background}}>
  <StatusBar backgroundColor={colors.theme_bg} barStyle="dark-content" />
  
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>

    {/* Lottie Animation */}
    <View style={{ width: '100%', height: 250, marginBottom: 20, borderRadius: 20, overflow: 'hidden', backgroundColor: theme.surface, shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } }}>
      <LottieView
        source={location}
        autoPlay
        loop
        style={{ height: '100%', width: '100%' }}
      />
    </View>

    {/* Purpose Text */}
    <Text style={{ textAlign: 'center', fontFamily: regular, fontSize: 18, color: theme.textPrimary, marginBottom: 10 }}>
      {t('Enable GPS to find drivers near you')}
    </Text>
    <Text style={{ textAlign: 'center', fontFamily: 'regular', fontSize: 14, color: theme.textSecondary, marginBottom: 30 }}>
      {t('We need access to your location so we can match you with nearby drivers for faster pickup and accurate arrival times.')}
    </Text>

    {/* Enable GPS Button */}
    <TouchableOpacity 
      onPress={enableGPS} 
      style={{
        width: '80%',
        height: 50,
        backgroundColor: theme.primary,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5
      }}
    >
      <Text style={{ color: theme.onPrimary, fontFamily: bold, fontSize: 16 }}>
        {t('Enable GPS')}
      </Text>
    </TouchableOpacity>
    
  </View>
</SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' },
  lottieContainer: { height: 250, width: '100%' },
  infoText: {
    textAlign: 'center',
    margin: 10,
    fontFamily: bold,
    fontSize: 18,
    color: colors.theme_bg_two,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.theme_bg,
    height: 45,
    width: '80%',
  },
  buttonText: {
    color: colors.theme_fg_three,
    fontFamily: bold,
    fontSize: 14,
  },
});

export default LocationEnable;
