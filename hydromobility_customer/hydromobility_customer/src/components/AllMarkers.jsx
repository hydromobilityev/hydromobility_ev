import React, { useMemo } from 'react';
import { Images, ShapeSource, SymbolLayer, MarkerView } from '@maplibre/maplibre-react-native';
import { featureCollection, point } from '@turf/helpers';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { f_l, f_s, regular } from '../config/Constants';

// Constants
const MIN_VALID_COORDINATE = 0.000001;

// Marker images
const markerImages = {
  pickupPin: require('../assets/img/pickup.png'),
  dropPin: require('../assets/img/destination.png'),

};

const AllMarkers = React.memo(({ 
  pickupLocation, 
  dropLocation, 
  placeLocation,
  is_google,
  eta
}) => {
  // Pulse animation value
  const pulseAnim = React.useRef(new Animated.Value(1)).current;
  
  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Validate coordinates
  const isValidCoordinate = (coord) => {
    if (!coord) return false;
    const lat = coord.latitude;
    const lng = coord.longitude;
    
    return (
      typeof lat === 'number' && 
      typeof lng === 'number' &&
      !isNaN(lat) && 
      !isNaN(lng) &&
      Math.abs(lat) > MIN_VALID_COORDINATE && 
      Math.abs(lng) > MIN_VALID_COORDINATE &&
      Math.abs(lat) <= 90 && 
      Math.abs(lng) <= 180
    );
  };

  // Format ETA display attractively
  const formatETA = (eta) => {
    if (!eta) return '';
    
    const etaInMilliseconds = is_google ? eta * 1000 : eta;
    const totalMinutes = Math.round(etaInMilliseconds / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours === 0) return `${minutes} min`;
    if (minutes === 0) return `${hours} hr`;
    return `${hours} hr ${minutes} min`;
  };

  // Calculate midpoint between pickup and drop (simple average)
  const midPoint = useMemo(() => {
    if (!isValidCoordinate(pickupLocation) || !isValidCoordinate(dropLocation)) return null;
    
    return [
      (pickupLocation.longitude + dropLocation.longitude) / 2,
      (pickupLocation.latitude + dropLocation.latitude) / 2
    ];
  }, [pickupLocation, dropLocation]);

  // Create marker points
  const markers = useMemo(() => {
    const createMarkerPoint = (coord, type) => {
      return point([coord.longitude, coord.latitude], {
        type,
        id: `${type}-${Date.now()}`,
        bearing: coord.bearing || 0,
        address: coord.address,
        eta: coord.eta
      });
    };  
    
    const points = [];
    
    if (isValidCoordinate(pickupLocation)) {
      points.push(createMarkerPoint(pickupLocation, 'pickup'));
    }
    
    if (isValidCoordinate(dropLocation)) {
      points.push(createMarkerPoint(dropLocation, 'drop'));
    }
    if (isValidCoordinate(placeLocation)) {
      points.push(createMarkerPoint(placeLocation, 'place'));
    }
    
    return points;
  }, [pickupLocation, dropLocation,placeLocation]);

  return (
    <>
      <Images images={markerImages} onError={(e) => console.error('Image load error:', e)} />
      
      {markers.length > 0 && (
        <ShapeSource id="markers-source" shape={featureCollection(markers)}>
          {/* Pickup Marker */}
          <SymbolLayer
            id="pickup-symbol-layer"
            filter={['==', 'type', 'pickup']}
            style={{
              iconImage: 'pickupPin',
              iconSize: .5,
              iconAllowOverlap: true,
              iconAnchor: 'bottom',
              iconPitchAlignment: 'viewport'
            }}
          />
          
          {/* Drop Marker */}
          <SymbolLayer
            id="drop-symbol-layer"
            filter={['==', 'type', 'drop']}
            style={{
              iconImage: 'dropPin',
              iconSize: .5,
              iconAllowOverlap: true,
              iconAnchor: 'bottom',
              iconPitchAlignment: 'viewport'
            }}
          />
         
        </ShapeSource>
      )}

      
      

      {/* Pickup Location Label */}
      {isValidCoordinate(pickupLocation) && pickupLocation.address && (
        <MarkerView
          coordinate={[pickupLocation.longitude, pickupLocation.latitude]}
          anchor={{ x: 0.5, y: 2.8 }}
          offset={[0, -35]}
        >
          <View style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 18,
            paddingVertical: 8,
            paddingHorizontal: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 5,
            width:150,
            maxWidth: 140,
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.08)',
          }}>
            <View style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              marginRight: 8,
              backgroundColor: '#4CAF50',
            }} />
            <Text numberOfLines={1} style={{
              color: '#1A1A1A',
               fontSize: f_s,
              fontFamily:regular,
              flexShrink: 1,
            }}>
              {pickupLocation.address.split(',')[0]} 
            </Text>
          </View>
        </MarkerView>
      )}

      {/* Drop Location Label */}
      {isValidCoordinate(dropLocation) && dropLocation.address && (
        <MarkerView
          coordinate={[dropLocation.longitude, dropLocation.latitude]}
          anchor={{ x: 0.5, y: 2.8 }}
          offset={[0, -35]}
        >
          <View style={{
            backgroundColor: '#FFF5F5',
            borderRadius: 18,
            paddingVertical: 8,
            paddingHorizontal: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 5,
            maxWidth: 140,
            width:150,

            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.08)',
          }}>
            <View style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              marginRight: 8,
              backgroundColor: '#F44336',
            }} />
            <Text numberOfLines={1} style={{
              color: '#1A1A1A',
              fontSize: f_s,
              fontFamily:regular,
              flexShrink: 1,
            }}>
              {dropLocation.address.split(',')[0]}
            </Text>
          </View>
        </MarkerView>
      )}
    </>
  );
});

AllMarkers.displayName = 'AllMarkers';
export default AllMarkers;