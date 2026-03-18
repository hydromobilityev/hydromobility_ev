import { useTranslation } from "react-i18next";
import '../languages/i18next.js';

import React, { useEffect, useState } from 'react';
import { Platform, PermissionsAndroid, Alert, View, Text } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const App = () => {
  const { t, i18n } = useTranslation();
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    bearing: null,
  });

  useEffect(() => {
    let watchId;

    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        const result = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
        handlePermissionResult(result);
      } else {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        ]);

        if (
          granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.ACCESS_BACKGROUND_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
        ) {
          startWatchingPosition();
        } else {
          Alert.alert('Permission Denied', 'Location permission is required to use this feature.');
        }
      }
    };

    const startWatchingPosition = () => {
      watchId = Geolocation.watchPosition(
        (position) => {
          const { latitude, longitude, heading } = position.coords;
          setLocation({
            latitude,
            longitude,
            bearing: heading,
          });
        },
        (error) => {
          Alert.alert('Error', 'Unable to retrieve location');
          console.error(error);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 0, // Update location for every change
          interval: 10000, // Update every 10 seconds
          fastestInterval: 5000, // Fastest interval
          useSignificantChanges: false,
        }
      );
    };

    requestLocationPermission();

    return () => {
      if (watchId) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return (
    <View>
        <Text style={{ color:'#000' }}>Latitude: {location.latitude}</Text>
        <Text style={{ color:'#000' }}>Longitude: {location.longitude}</Text>
        <Text style={{ color:'#000' }}>Bearing: {location.bearing}</Text>
    </View>
  );
};

export default App;
