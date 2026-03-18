import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Images,
  ShapeSource,
  SymbolLayer,
  MarkerView,
} from '@maplibre/maplibre-react-native';
import {featureCollection, point} from '@turf/helpers';
import {View, Text, Animated, Easing} from 'react-native';
import Icon, {Icons} from './Icons';

const MIN_VALID_COORDINATE = 0.000001;
const BASE_ANIMATION_DURATION = 1500;
const BEARING_SMOOTHING_FACTOR = 0.1;
const POSITION_THRESHOLD = 0.00001;
const VELOCITY_SMOOTHING = 0.2;
const MIN_ANIMATION_DURATION = 800;
const MAX_ANIMATION_DURATION = 2500;
const LOCATION_HISTORY_SIZE = 5;
const PREDICTION_FACTOR = 1.2; // Predict movement 20% beyond last known position

const markerImages = {
  pickupPin: require('../assets/img/chat_icon.png'),
  dropPin: require('../assets/img/destination.png'),
  carIcon: require('../assets/img/tracking/arrow.png'),
};

const AllMarkers = React.memo(
  ({
    pickupLocation,
    dropLocation,
    singleDriverLocation = null,
  }) => {
    const animatedLatitude = useRef(new Animated.Value(0)).current;
    const animatedLongitude = useRef(new Animated.Value(0)).current;
    const animatedBearing = useRef(new Animated.Value(0)).current;

    const [displayedDriverLocation, setDisplayedDriverLocation] = useState(null);
    const prevLocation = useRef(null);
    const prevBearing = useRef(0);
    const lastUpdateTime = useRef(Date.now());
    const velocityRef = useRef({vx: 0, vy: 0});
    const locationHistory = useRef([]);
    const currentAnimation = useRef(null);
    const predictedLocation = useRef(null);

    const isValidCoordinate = coord => {
      if (!coord) return false;

      let lat, lng;

      if (Array.isArray(coord) && coord.length >= 2) {
        [lng, lat] = coord;
      } else if (typeof coord === 'object') {
        ({latitude: lat, longitude: lng} = coord);
      } else {
        return false;
      }

      lat = parseFloat(lat);
      lng = parseFloat(lng);

      if (typeof lat !== 'number' || typeof lng !== 'number') return false;
      if (isNaN(lat) || isNaN(lng)) return false;

      if (
        Math.abs(lat) < MIN_VALID_COORDINATE ||
        Math.abs(lng) < MIN_VALID_COORDINATE
      ) {
        return false;
      }

      return Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
    };

    const predictNextLocation = (history) => {
      if (history.length < 2) return null;
      
      const [prev1, prev2] = history.slice(-2);
      const dt = (prev1.timestamp - prev2.timestamp) / 1000;
      if (dt <= 0) return null;

      const dx = prev1.longitude - prev2.longitude;
      const dy = prev1.latitude - prev2.latitude;
      
      // Predict next position based on current velocity
      const predictedLng = prev1.longitude + (dx / dt) * dt * PREDICTION_FACTOR;
      const predictedLat = prev1.latitude + (dy / dt) * dt * PREDICTION_FACTOR;
      
      return {
        ...prev1,
        longitude: predictedLng,
        latitude: predictedLat,
        bearing: prev1.bearing,
        timestamp: Date.now()
      };
    };

    const calculateAnimationDuration = (newLoc, prevLoc) => {
      if (!prevLoc) return BASE_ANIMATION_DURATION;

      const dx = newLoc.longitude - prevLoc.longitude;
      const dy = newLoc.latitude - prevLoc.latitude;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const now = Date.now();
      const dt = (now - lastUpdateTime.current) / 1000;
      lastUpdateTime.current = now;

      if (dt > 0) {
        const vx = dx / dt;
        const vy = dy / dt;
        velocityRef.current.vx =
          velocityRef.current.vx * (1 - VELOCITY_SMOOTHING) +
          vx * VELOCITY_SMOOTHING;
        velocityRef.current.vy =
          velocityRef.current.vy * (1 - VELOCITY_SMOOTHING) +
          vy * VELOCITY_SMOOTHING;
      }

      const speed = Math.sqrt(
        velocityRef.current.vx * velocityRef.current.vx +
          velocityRef.current.vy * velocityRef.current.vy,
      );

      // More dynamic duration based on speed and distance
      const adaptiveDuration = Math.max(
        MIN_ANIMATION_DURATION,
        Math.min(
          MAX_ANIMATION_DURATION,
          (distance * 10000) / (1 + speed * 1000)
      ));

      return adaptiveDuration;
    };

    const calculateSmoothedBearing = (prev, current, distance) => {
      if (prev === undefined || current === undefined) return current || 0;

      // Normalize angles to 0-360 range
      prev = ((prev % 360) + 360) % 360;
      current = ((current % 360) + 360) % 360;

      let angleDiff = current - prev;
      if (angleDiff > 180) {
        angleDiff -= 360;
      } else if (angleDiff < -180) {
        angleDiff += 360;
      }

      const distanceFactor = Math.min(1, distance / 0.0001);
      const smoothing = BEARING_SMOOTHING_FACTOR * (0.3 + distanceFactor * 0.7);

      const smoothedAngle = prev + angleDiff * smoothing;
      return ((smoothedAngle % 360) + 360) % 360;
    };

    const animateToLocation = (targetLocation, duration) => {
      if (currentAnimation.current) {
        currentAnimation.current.stop();
      }

      currentAnimation.current = Animated.parallel([
        Animated.timing(animatedLatitude, {
          toValue: targetLocation.latitude,
          duration,
          easing: Easing.bezier(0.4, 0.0, 0.2, 1),
          useNativeDriver: false,
        }),
        Animated.timing(animatedLongitude, {
          toValue: targetLocation.longitude,
          duration,
          easing: Easing.bezier(0.4, 0.0, 0.2, 1),
          useNativeDriver: false,
        }),
        Animated.timing(animatedBearing, {
          toValue: calculateSmoothedBearing(
            prevBearing.current,
            targetLocation.bearing || 0,
            Math.sqrt(
              Math.pow(targetLocation.longitude - prevLocation.current.longitude, 2) +
              Math.pow(targetLocation.latitude - prevLocation.current.latitude, 2)
            )
          ),
          duration,
          easing: Easing.bezier(0.4, 0.0, 0.2, 1),
          useNativeDriver: false,
        }),
      ]);

      currentAnimation.current.start(({ finished }) => {
        if (finished) {
          // When animation completes, check if we have a predicted location to continue to
          if (predictedLocation.current) {
            const newDuration = calculateAnimationDuration(
              predictedLocation.current,
              targetLocation
            );
            animateToLocation(predictedLocation.current, newDuration);
            predictedLocation.current = null;
          }
        }
      });

      prevLocation.current = targetLocation;
      prevBearing.current = targetLocation.bearing || 0;
    };

    const updateDriverLocation = (newLocation) => {
      if (!isValidCoordinate(newLocation)) return;

      // Add timestamp to location
      const timestampedLocation = {
        ...newLocation,
        timestamp: Date.now()
      };

      // Update location history
      locationHistory.current.push(timestampedLocation);
      if (locationHistory.current.length > LOCATION_HISTORY_SIZE) {
        locationHistory.current.shift();
      }

      // If no previous location, set initial position
      if (!prevLocation.current) {
        prevLocation.current = timestampedLocation;
        animatedLatitude.setValue(timestampedLocation.latitude);
        animatedLongitude.setValue(timestampedLocation.longitude);
        animatedBearing.setValue(timestampedLocation.bearing || 0);
        setDisplayedDriverLocation(timestampedLocation);
        return;
      }

      // Predict next location based on history
      const predictedLoc = predictNextLocation(locationHistory.current);
      if (predictedLoc) {
        predictedLocation.current = predictedLoc;
      }

      // Calculate animation duration
      const duration = calculateAnimationDuration(
        timestampedLocation,
        prevLocation.current
      );

      // Start animation to the new location
      animateToLocation(timestampedLocation, duration);
    };

    useEffect(() => {
      if (!isValidCoordinate(singleDriverLocation)) return;

      updateDriverLocation(singleDriverLocation);

      const listenerId = animatedLatitude.addListener(({value: lat}) => {
        const lng = animatedLongitude._value;
        const bearing = animatedBearing._value;

        setDisplayedDriverLocation({
          ...singleDriverLocation,
          latitude: lat,
          longitude: lng,
          bearing: bearing,
        });
      });

      return () => {
        animatedLatitude.removeListener(listenerId);
        if (currentAnimation.current) {
          currentAnimation.current.stop();
        }
      };
    }, [singleDriverLocation]);

    const formatETA = etaInMilliseconds => {
      if (!etaInMilliseconds) return '0 Min';
      const totalMinutes = Math.round(etaInMilliseconds / 60000);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      if (hours === 0) return `${minutes} Min`;
      if (minutes === 0) return `${hours} Hr`;
      return `${hours} Hr ${minutes} Min`;
    };

    const markers = useMemo(() => {
      const createMarkerPoint = (coord, type, index = 0) => {
        return point([coord.longitude, coord.latitude], {
          type,
          id: `${type}-${index}`,
          vehicle_slug: coord.vehicle_slug || 'car',
          bearing: coord.bearing || 0,
          address: coord.address || "",
          eta: coord.eta || null,
        });
      };

      const pickupPoint = isValidCoordinate(pickupLocation)
        ? [createMarkerPoint(pickupLocation, 'pickup')]
        : [];
      const dropPoint = isValidCoordinate(dropLocation)
        ? [createMarkerPoint(dropLocation, 'drop')]
        : [];
      const singleDriverPoint = isValidCoordinate(displayedDriverLocation)
        ? [createMarkerPoint(displayedDriverLocation, 'single-driver')]
        : [];

      return [...pickupPoint, ...dropPoint, ...singleDriverPoint];
    }, [pickupLocation, dropLocation, displayedDriverLocation]);

    const images = useMemo(() => {
      const safeImages = {};
      Object.entries(markerImages).forEach(([key, value]) => {
        try {
          if (value) safeImages[key] = value;
        } catch (e) {
          console.warn(`Failed to load image ${key}`, e);
        }
      });
      return safeImages;
    }, []);

    if (markers.length === 0) return null;

    return (
      <>
        <Images
          images={images}
          onError={e => console.error('Image load error:', e.nativeEvent)}
        />

        <ShapeSource id="markers-source" shape={featureCollection(markers)}>
          <SymbolLayer
            id="pickup-symbol-layer"
            filter={['==', 'type', 'pickup']}
            style={{
              iconImage: 'pickupPin',
              iconSize: 0.09,
              iconAllowOverlap: true,
              iconAnchor: 'bottom',
              iconPitchAlignment: 'viewport',
              iconRotationAlignment: 'viewport',  
            }}
          />
          <SymbolLayer
            id="drop-symbol-layer"
            filter={['==', 'type', 'drop']}
            style={{
              iconImage: 'dropPin',
              iconSize: 0.08,
              iconAllowOverlap: true,
              iconAnchor: 'bottom',
              iconPitchAlignment: 'viewport',
              iconRotationAlignment: 'viewport',  
            }}
          />
          
          <SymbolLayer
            id="single-driver-symbol-layer"
            filter={['==', 'type', 'single-driver']}
            style={{
              iconImage: 'carIcon',
              iconSize: 0.3,
              iconAllowOverlap: true,
              iconAnchor: 'center',
              iconRotate: ['get', 'bearing'],
              iconColor: '#FF5722',
              iconPitchAlignment: 'map',
              iconRotationAlignment: 'map',  
            }}
          />
        </ShapeSource>
        
        {isValidCoordinate(dropLocation) && dropLocation.address && (
          <MarkerView
            coordinate={[dropLocation.longitude, dropLocation.latitude]}
            anchor={{x: 0.1, y: 2}}
            offset={[0, -35]}>
            <View
              style={{
                backgroundColor: 'rgba(255,255,255,0.95)',
                borderRadius: 12,
                paddingVertical: 6,
                paddingHorizontal: 10,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.15,
                shadowRadius: 3,
                elevation: 2,
                maxWidth: 140,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: 'red',
                    marginRight: 6,
                  }}
                />
                <Text
                  numberOfLines={1}
                  style={{
                    color: '#333',
                    fontSize: 12,
                    fontWeight: '500',
                    flex: 1,
                  }}>
                  {dropLocation.address.split(',')[0]}
                </Text>
                {dropLocation.eta && (
                  <View
                    style={{
                      backgroundColor: 'rgba(255, 87, 34, 0.1)',
                      borderRadius: 8,
                      paddingHorizontal: 6,
                      paddingVertical: 2,
                      marginLeft: 6,
                    }}>
                    <Text
                      style={{
                        color: '#FF5722',
                        fontSize: 10,
                        fontWeight: '600',
                      }}>
                      {formatETA(dropLocation.eta)}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </MarkerView>
        )}
      </>
    );
  },
);

AllMarkers.displayName = 'AllMarkers';
export default AllMarkers;