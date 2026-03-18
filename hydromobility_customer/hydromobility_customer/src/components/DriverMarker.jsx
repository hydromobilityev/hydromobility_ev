import React, { useEffect, useRef, useState } from 'react';
import { ShapeSource, SymbolLayer, Images } from '@maplibre/maplibre-react-native';
import { point, featureCollection } from '@turf/helpers';
import { Animated, Easing } from 'react-native';

const DriverMarker = ({ driverLocation }) => {
  // Image configuration
  const markerImages = {
    carIcon: require('../assets/img/tracking/car.png'),
  };

  // Animation refs
  const animatedLat = useRef(new Animated.Value(0)).current;
  const animatedLng = useRef(new Animated.Value(0)).current;
  const animatedBearing = useRef(new Animated.Value(0)).current;

  // State for displayed position
  const [displayedLocation, setDisplayedLocation] = useState(null);
  const prevBearing = useRef(0);

  // Calculate shortest rotation path
  const getShortestRotation = (current, target) => {
    const diff = ((target - current + 540) % 360) - 180;
    return current + diff;
  };

  // Handle driver location updates
  useEffect(() => {
    if (!driverLocation || 
        typeof driverLocation.latitude !== 'number' || 
        typeof driverLocation.longitude !== 'number') {
      return;
    }

    // Calculate animation duration based on distance
    const duration = 1000; // Base duration

    // Calculate target bearing with shortest rotation
    const targetBearing = driverLocation.bearing || 0;
    const startBearing = animatedBearing._value;
    const shortestBearing = getShortestRotation(startBearing, targetBearing);

    Animated.parallel([
      Animated.timing(animatedLat, {
        toValue: driverLocation.latitude,
        duration,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        useNativeDriver: false,
      }),
      Animated.timing(animatedLng, {
        toValue: driverLocation.longitude,
        duration,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        useNativeDriver: false,
      }),
      Animated.timing(animatedBearing, {
        toValue: shortestBearing,
        duration,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        useNativeDriver: false,
      })
    ]).start();

    prevBearing.current = targetBearing;
  }, [driverLocation]);

  // Update displayed location
  useEffect(() => {
    const listener = animatedLat.addListener(({ value }) => {
      setDisplayedLocation({
        latitude: value,
        longitude: animatedLng._value,
        bearing: ((animatedBearing._value % 360) + 360) % 360 // Normalize to 0-360
      });
    });
    return () => animatedLat.removeListener(listener);
  }, []);

  if (!displayedLocation) return null;

  return (
    <>
      <Images images={markerImages} />
      
      <ShapeSource 
        id="driver-source" 
        shape={featureCollection([
          point([displayedLocation.longitude, displayedLocation.latitude], {
            type: 'driver',
            bearing: displayedLocation.bearing
          })
        ])}
      >
        <SymbolLayer
          id="driver-symbol-layer"
          filter={['==', 'type', 'driver']}
          style={{
            iconImage: 'carIcon',
            iconSize: 0.6,
            iconAllowOverlap: true,
            iconAnchor: 'center',
            iconRotate: ['get', 'bearing'],
            iconPitchAlignment: 'map',
            iconRotationAlignment: 'map',
          }}
        />
      </ShapeSource>
    </>
  );
};

export default React.memo(DriverMarker);