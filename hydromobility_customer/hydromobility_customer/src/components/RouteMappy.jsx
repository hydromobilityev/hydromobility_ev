import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {View,  InteractionManager} from 'react-native';
import {
  MapView,
  VectorSource,
  FillLayer,
  LineLayer as BaseLineLayer,
  SymbolLayer,
  CircleLayer,
  Camera,
  ShapeSource,
} from '@maplibre/maplibre-react-native';
import AllMarkers from './AllMarkers';
import RouteLayer from './RouteLayer';
import { MapLayer } from '../Layers/IOSMapLayer';
import DriverMarker from './DriverMarker';

// Constants
const LAYER_ZOOM_RULES = {
  places_country: {minzoom: 0, maxzoom: 22},
  places_locality: {minzoom: 0, maxzoom: 22},
  places_region: {minzoom: 0, maxzoom: 22},
  places_subplace: {minzoom: 10, maxzoom: 22},
  address_label: {minzoom: 8, maxzoom: 22},
  roads_labels_minor: {minzoom: 11, maxzoom: 22},
  roads_labels_major: {minzoom: 5, maxzoom: 22},
  water_label_ocean: {minzoom: 0, maxzoom: 22},
  water_label_lakes: {minzoom: 5, maxzoom: 22},
  water_waterway_label: {minzoom: 9, maxzoom: 22},
  earth_label_islands: {minzoom: 5, maxzoom: 22},
  pois: {minzoom: 5, maxzoom: 22},
};

const LAYER_TYPE_MAP = {
  fill: FillLayer,
  line: BaseLineLayer,
  symbol: SymbolLayer,
  circle: CircleLayer,
};

const MAX_ZOOM_LEVEL = 15.99;
const MIN_ZOOM_LEVEL = 5;
const INITIAL_ANIMATION_DURATION = 2000;
const REGULAR_ANIMATION_DURATION = 1500;

const CAMERA_PADDING_HOME = {
  top: 100,
  bottom: 150,
  left: 100,
  right: 100,
};

const CAMERA_PADDING_TRIP = {
  top: 10,
  bottom: 10,
  left: 50,
  right: 50,
};

const convertPaintToStyle = (paint) => {
  if (!paint) return {};
  const style = {};
  for (const key in paint) {
    if (key.endsWith('-transition')) continue;
    const camelKey = key.replace(/-([a-z])/g, (_, w) => w.toUpperCase());
    style[camelKey] =
      key === 'line-dasharray' &&
      Array.isArray(paint[key]) &&
      paint[key].length >= 2
        ? paint[key]
        : paint[key];
  }
  return style;
};

const RouteMappy = forwardRef(({
  mapProps = {},
  pickupLocation,
  dropLocation,
  is_google,
  eta,
  routeCoordinates,
  driverLocation,
  placeLocation,
  driverBearing,
  screen,
  tripData,
  zoomLevel,
  children,
  onMapReady,
  onRegionChangeComplete,
  onRegionIsChanging,
  onBooking,
  initialRegion,
  isDark,
  trip_type,
  enableTripTracking = true, // NEW: Prop to enable/disable tracking in trip screen
}, ref) => {

  // Refs
  const mapRef = useRef(null);
  const cameraRef = useRef(null);
  const initialCameraRef = useRef(null);
  const isMapReadyRef = useRef(false);
  const isUserInteractingRef = useRef(false);
  const hasInitialCameraFocusedRef = useRef(false);
  const shouldAutoCameraUpdateRef = useRef(true);
  const cameraAnimationTimeoutRef = useRef(null);
  const trackingEnabledRef = useRef(true); // NEW: Track if tracking is enabled

  // State
  const [isMapReady, setIsMapReady] = useState(false);
  const [isStyleLoaded, setIsStyleLoaded] = useState(false);
  const [cameraKey, setCameraKey] = useState(0);
  const [shouldShowCamera, setShouldShowCamera] = useState(true);
  const [isTrackingEnabled, setIsTrackingEnabled] = useState(true); 

  // Initialize tracking based on prop
  useEffect(() => {
    trackingEnabledRef.current = enableTripTracking;
    setIsTrackingEnabled(enableTripTracking);
    
    // If tracking is enabled, also enable auto camera updates
    if (screen === 'trip') {
      shouldAutoCameraUpdateRef.current = enableTripTracking;
      setShouldShowCamera(enableTripTracking);
    }
  }, [enableTripTracking, screen]);

  // Helper functions
  const isValidCoordinate = useCallback((coord) => {
    if (!coord) return false;
    const lat = coord.latitude;
    const lng = coord.longitude;
    return (
      typeof lat === 'number' &&
      typeof lng === 'number' &&
      !isNaN(lat) &&
      !isNaN(lng) &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180
    );
  }, []);

  const calculateDistance = useCallback((coord1, coord2) => {
    if (!isValidCoordinate(coord1) || !isValidCoordinate(coord2)) return 0;
    const R = 6371;
    const dLat = (coord2.latitude - coord1.latitude) * (Math.PI / 180);
    const dLon = (coord2.longitude - coord1.longitude) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(coord1.latitude * (Math.PI / 180)) *
      Math.cos(coord2.latitude * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }, [isValidCoordinate]);

  const calculateBearing = useCallback((lat1, lon1, lat2, lon2) => {
    const degToRad = Math.PI / 180;
    const φ1 = lat1 * degToRad;
    const φ2 = lat2 * degToRad;
    const Δλ = (lon2 - lon1) * degToRad;
    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x = Math.cos(φ1) * Math.sin(φ2) - 
              Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
    let θ = Math.atan2(y, x);
    return (θ * 180 / Math.PI + 360) % 360;
  }, []);

  const calculateMidpoint = useCallback((coord1, coord2) => ({
    latitude: (coord1.latitude + coord2.latitude) / 2,
    longitude: (coord1.longitude + coord2.longitude) / 2,
  }), []);

  const calculateOptimalZoom = useCallback((distance) => {
    if (distance < 0.05) return 15;
    if (distance < 0.1) return 15;
    if (distance < 0.2) return 14.5;
    if (distance < 0.5) return 14;
    if (distance < 1) return 13.5;
    if (distance < 2) return 13;
    if (distance < 5) return 12;
    return 11;
  }, []);

  const getDynamicPadding = useCallback((distance) => {
    const basePadding = 20;
    const distanceFactor = Math.min(1, distance / 0.005);
    return {
      top: basePadding + distanceFactor * 50,
      bottom: basePadding + distanceFactor * 50,
      left: basePadding + distanceFactor * 50,
      right: basePadding + distanceFactor * 50,
    };
  }, []);

  const defaultMapProps = useMemo(
    () => ({
      styleURL: 'https://tiles.routemappy.com/world.json',
      tileUrl: 'https://tiles.routemappy.com/world/{z}/{x}/{y}.mvt',
      glyphsUrl: 'https://fonts.openmaptiles.org/{fontstack}/{range}.pbf',
      attribution: '© OpenStreetMap contributors',
      bounds: [60, -10, 95, 37],
      minZoom: 0,
      maxZoom: 22,
      ...mapProps,
    }),
    [mapProps],
  );

  // Initialize initial camera
  useEffect(() => {
    if (initialRegion && !initialCameraRef.current) {
      initialCameraRef.current = {
        centerCoordinate: [initialRegion.longitude, initialRegion.latitude],
        zoomLevel: 15,
      };
    }
  }, [initialRegion]);

  // Reset auto camera when screen changes
  useEffect(() => {
    shouldAutoCameraUpdateRef.current = true;
    setShouldShowCamera(true);
    
    // For trip screen, respect tracking enabled state
    if (screen === 'trip') {
      shouldAutoCameraUpdateRef.current = trackingEnabledRef.current;
      setShouldShowCamera(trackingEnabledRef.current);
    }
    
    // Clear any existing timeout
    if (cameraAnimationTimeoutRef.current) {
      clearTimeout(cameraAnimationTimeoutRef.current);
    }
    
    // Set timeout to hide camera after initial animation
    cameraAnimationTimeoutRef.current = setTimeout(() => {
      // Only hide camera if not in trip screen with tracking enabled
      if (!(screen === 'trip' && trackingEnabledRef.current)) {
        setShouldShowCamera(false);
      }
    }, INITIAL_ANIMATION_DURATION + 500);
    
    return () => {
      if (cameraAnimationTimeoutRef.current) {
        clearTimeout(cameraAnimationTimeoutRef.current);
      }
    };
  }, [screen]);

  // Camera configuration
  const cameraConfig = useMemo(() => {
    // Don't apply camera updates if user is interacting or auto camera is disabled
    if (isUserInteractingRef.current || !shouldAutoCameraUpdateRef.current) {
      return null;
    }

    // INITIAL CAMERA - Only once on first load
    if (!hasInitialCameraFocusedRef.current && initialCameraRef.current) {
      console.log('INITIAL CAMERA FOCUS');
      hasInitialCameraFocusedRef.current = true;
      return {
        centerCoordinate: initialCameraRef.current.centerCoordinate,
        zoomLevel: initialCameraRef.current.zoomLevel,
        animationDuration: INITIAL_ANIMATION_DURATION,
      };
    }

    // HOME SCREEN - Show both locations
    if (screen === "home" && trip_type != 2 && pickupLocation && dropLocation) {
      if (isValidCoordinate(pickupLocation) && isValidCoordinate(dropLocation)) {
        console.log('HOME SCREEN CAMERA');
        return {
          bounds: {
            ne: [
              Math.max(pickupLocation.longitude, dropLocation.longitude) + 0.05,
              Math.max(pickupLocation.latitude, dropLocation.latitude) + 0.01,
            ],
            sw: [
              Math.min(pickupLocation.longitude, dropLocation.longitude) - 0.05,
              Math.min(pickupLocation.latitude, dropLocation.latitude) - 0.01,
            ],
            ...CAMERA_PADDING_HOME,
          },
          animationDuration: REGULAR_ANIMATION_DURATION,
          animationMode: 'flyTo',
        };
      }
    }

    // TRIP SCREEN - Follow driver (only if tracking is enabled)
    if (screen === "trip" && driverLocation && trackingEnabledRef.current) {
      const isPickupPhase = tripData?.trip?.status <= 2;
      const targetLocation = isPickupPhase ? pickupLocation : dropLocation;

      if (targetLocation && isValidCoordinate(driverLocation) && isValidCoordinate(targetLocation)) {
        console.log('TRIP SCREEN CAMERA - TRACKING ENABLED');
        const distance = calculateDistance(driverLocation, targetLocation);
        const midpoint = calculateMidpoint(driverLocation, targetLocation);
        const bearing = isPickupPhase
          ? calculateBearing(targetLocation.latitude, targetLocation.longitude, driverLocation.latitude, driverLocation.longitude)
          : calculateBearing(driverLocation.latitude, driverLocation.longitude, targetLocation.latitude, targetLocation.longitude);

        const zoom = Math.min(MAX_ZOOM_LEVEL, Math.max(MIN_ZOOM_LEVEL, calculateOptimalZoom(distance)));

        return {
          centerCoordinate: [midpoint.longitude, midpoint.latitude],
          heading: bearing,
          zoomLevel: zoom,
          padding: CAMERA_PADDING_TRIP,
          animationDuration: REGULAR_ANIMATION_DURATION,
          animationMode: 'flyTo',
        };
      }
    }

    return null;
  }, [
    isMapReady,
    pickupLocation,
    dropLocation,
    driverLocation,
    screen,
    tripData,
    trip_type,
    isValidCoordinate,
    calculateDistance,
    calculateBearing,
    calculateMidpoint,
    calculateOptimalZoom,
  ]);

  // Force camera update when config changes
  useEffect(() => {
    if (cameraConfig && cameraRef.current && shouldShowCamera) {
      console.log('UPDATING CAMERA');
      setCameraKey(prev => prev + 1);
      
      // After camera animation, hide the camera component to prevent interference
      // (except for trip screen with tracking enabled)
      if (screen === 'home' || (screen === 'trip' && !trackingEnabledRef.current)) {
        setTimeout(() => {
          setShouldShowCamera(false);
        }, REGULAR_ANIMATION_DURATION + 100);
      }
    }
  }, [cameraConfig, shouldShowCamera, screen]);

  // NEW: Function to toggle tracking
  const toggleTracking = useCallback(() => {
    const newTrackingState = !trackingEnabledRef.current;
    trackingEnabledRef.current = newTrackingState;
    setIsTrackingEnabled(newTrackingState);
    
    if (screen === 'trip') {
      shouldAutoCameraUpdateRef.current = newTrackingState;
      setShouldShowCamera(newTrackingState);
      
      // If enabling tracking and we have driver location, recenter
      if (newTrackingState && driverLocation && cameraRef.current) {
        const isPickupPhase = tripData?.trip?.status <= 2;
        const targetLocation = isPickupPhase ? pickupLocation : dropLocation;
        
        if (targetLocation && isValidCoordinate(driverLocation) && isValidCoordinate(targetLocation)) {
          const distance = calculateDistance(driverLocation, targetLocation);
          const midpoint = calculateMidpoint(driverLocation, targetLocation);
          const bearing = isPickupPhase
            ? calculateBearing(targetLocation.latitude, targetLocation.longitude, driverLocation.latitude, driverLocation.longitude)
            : calculateBearing(driverLocation.latitude, driverLocation.longitude, targetLocation.latitude, targetLocation.longitude);

          const zoom = Math.min(MAX_ZOOM_LEVEL, Math.max(MIN_ZOOM_LEVEL, calculateOptimalZoom(distance)));

          cameraRef.current.setCamera({
            centerCoordinate: [midpoint.longitude, midpoint.latitude],
            heading: bearing,
            zoomLevel: zoom,
            padding: CAMERA_PADDING_TRIP,
            animationDuration: REGULAR_ANIMATION_DURATION,
            animationMode: 'flyTo',
          });
        }
      }
    }
    
    return newTrackingState;
  }, [screen, driverLocation, tripData, pickupLocation, dropLocation, isValidCoordinate, calculateDistance, calculateBearing, calculateMidpoint, calculateOptimalZoom]);

  // Imperative methods
  useImperativeHandle(ref, () => ({
    focusOnInitialRegion: () => {
      if (initialRegion && cameraRef.current) {
        hasInitialCameraFocusedRef.current = false;
        shouldAutoCameraUpdateRef.current = true;
        setShouldShowCamera(true);
        
        InteractionManager.runAfterInteractions(() => {
          cameraRef.current.setCamera({
            centerCoordinate: [initialRegion.longitude, initialRegion.latitude],
            zoomLevel: 15,
            animationDuration: INITIAL_ANIMATION_DURATION,
            animationMode: 'flyTo',
          });
          
          // Hide camera after animation
          setTimeout(() => {
            setShouldShowCamera(false);
          }, INITIAL_ANIMATION_DURATION + 500);
        });
      }
    },
    getMapInstance: () => mapRef.current,
    flyToLocation: (location, zoom = 15, duration = INITIAL_ANIMATION_DURATION) => {
      if (cameraRef.current && isValidCoordinate(location)) {
        shouldAutoCameraUpdateRef.current = true;
        setShouldShowCamera(true);
        
        cameraRef.current.setCamera({
          centerCoordinate: [location.longitude, location.latitude],
          zoomLevel: zoom,
          animationDuration: duration,
          animationMode: 'flyTo',
        });
        
        // Hide camera after animation
        setTimeout(() => {
          setShouldShowCamera(false);
        }, duration + 500);
      }
    },
    enableAutoCamera: (enable) => {
      shouldAutoCameraUpdateRef.current = enable;
      if (enable) {
        setShouldShowCamera(true);
      }
    },
    toggleTracking: () => toggleTracking(), // NEW: Expose toggle function
    isTrackingEnabled: () => trackingEnabledRef.current, // NEW: Get current tracking state
  }));

  // Event handlers
  const handleMapReady = useCallback(() => {
    if (!isMapReadyRef.current) {
      isMapReadyRef.current = true;
      setIsMapReady(true);
      onMapReady?.();
    }
  }, [onMapReady]);

  const handleRegionWillChange = useCallback(({isUserInteraction}) => {
    isUserInteractingRef.current = isUserInteraction;
    
    // When user starts interacting, disable auto camera updates
    // But only disable tracking if tracking is currently enabled
    if (isUserInteraction && trackingEnabledRef.current) {
      shouldAutoCameraUpdateRef.current = false;
      setShouldShowCamera(false);
      
      // Optionally: disable tracking when user manually interacts
      // Uncomment below if you want tracking to turn off when user drags
      // trackingEnabledRef.current = false;
      // setIsTrackingEnabled(false);
    }
    
    if (!onBooking && onRegionIsChanging) {
      onRegionIsChanging(true);
    }
  }, [onBooking, onRegionIsChanging]);

  const handleRegionChangeComplete = useCallback(() => {
    isUserInteractingRef.current = false;
    
    // Re-enable auto camera for trip screen only if tracking is enabled
    if (screen === 'trip' && driverLocation && trackingEnabledRef.current) {
      shouldAutoCameraUpdateRef.current = true;
      setShouldShowCamera(true);
    }
    
    if (onRegionChangeComplete && mapRef.current) {
      mapRef.current.getCenter().then(center => {
        onRegionChangeComplete({
          latitude: center[1],
          longitude: center[0],
        });
        if (onRegionIsChanging) {
          onRegionIsChanging(false);
        }
      }).catch(console.warn);
    }
  }, [onRegionChangeComplete, onRegionIsChanging, screen, driverLocation]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (cameraAnimationTimeoutRef.current) {
        clearTimeout(cameraAnimationTimeoutRef.current);
      }
    };
  }, []);

  // Layers
  const processedLayers = useMemo(() => {
    const mapLayers =  MapLayer;
    return [...mapLayers].map(layer => ({
      ...layer,
      ...(layer.type === 'line' && layer.paint?.['line-dasharray']
        ? {
            paint: {
              ...layer.paint,
              'line-dasharray':
                Array.isArray(layer.paint['line-dasharray']) &&
                layer.paint['line-dasharray'].length >= 2
                  ? layer.paint['line-dasharray']
                  : [2, 2],
            },
          }
        : {}),
      minzoom: LAYER_ZOOM_RULES[layer.id]?.minzoom || 0,
      maxzoom: LAYER_ZOOM_RULES[layer.id]?.maxzoom || 22,
    }));
  }, [isDark]);

  const renderMapLayers = useMemo(() => (
    <VectorSource
      id="rmtiles"
      tileUrlTemplates={[defaultMapProps.tileUrl]}
      minZoomLevel={defaultMapProps.minZoom}
      maxZoomLevel={defaultMapProps.maxZoom}
      attribution={defaultMapProps.attribution}>
      {processedLayers
        .filter(
          layer =>
            layer.type !== 'background' &&
            layer.source &&
            LAYER_TYPE_MAP[layer.type],
        )
        .map(layer => {
          const LayerComponent = LAYER_TYPE_MAP[layer.type];
          const style = convertPaintToStyle(layer.paint);
          const sourceLayer =
            layer['source-layer'] ||
            (layer.id.includes('water')
              ? 'water'
              : layer.id.includes('roads')
              ? 'road'
              : layer.id.includes('earth')
              ? 'earth'
              : layer.id.includes('places')
              ? 'place'
              : layer.id);
          const props = {
            id: layer.id,
            sourceID: layer.source,
            sourceLayerID: sourceLayer,
            style:
              layer.type === 'symbol'
                ? {
                    ...style,
                    textField: layer.layout?.['text-field'],
                    textFont: layer.layout?.['text-font'] || [
                      'Open Sans Regular',
                      'Arial Unicode MS Regular',
                    ],
                    textSize: layer.layout?.['text-size'] || 14,
                  }
                : style,
            filter: layer.filter,
            minZoomLevel: LAYER_ZOOM_RULES[layer.id]?.minzoom || 0,
            maxZoomLevel: LAYER_ZOOM_RULES[layer.id]?.maxzoom || 22,
          };
          return <LayerComponent key={layer.id} {...props} />;
        })}
    </VectorSource>
  ), [processedLayers, defaultMapProps]);

  const PassiveUserLocationMarker = ({ userLocation, isDark = false }) => {
    if (!userLocation || !isValidCoordinate(userLocation)) {
      return null;
    }

    const markerColor = isDark ? '#1EC51D' : '#1EC51D';
    const accuracy = userLocation.accuracy || 20;
    
    // Create point feature for the user location
    const userLocationPoint = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [userLocation.longitude, userLocation.latitude],
          },
          properties: {},
        },
      ],
    };

    return (
      <>
        {/* Accuracy circle */}
        <ShapeSource id="user-location-accuracy-source" shape={userLocationPoint}>
          <CircleLayer
            id="user-location-accuracy"
            sourceID="user-location-accuracy-source"
            style={{
              circleRadius: accuracy,
              circleColor: markerColor,
              circleOpacity: 0.15,
              circleStrokeColor: markerColor,
              circleStrokeWidth: 1,
              circleStrokeOpacity: 0.3,
            }}
          />
        </ShapeSource>
        
        {/* User location dot */}
        <ShapeSource id="user-location-dot-source" shape={userLocationPoint}>
          <CircleLayer
            id="user-location-dot"
            sourceID="user-location-dot-source"
            style={{
              circleRadius: 8,
              circleColor: '#FFFFFF',
              circleStrokeColor: markerColor,
              circleStrokeWidth: 3,
              circleOpacity: 1,
            }}
          />
        </ShapeSource>

        {/* Pulse animation effect */}
        <ShapeSource id="user-location-pulse-source" shape={userLocationPoint}>
          <CircleLayer
            id="user-location-pulse"
            sourceID="user-location-pulse-source"
            style={{
              circleRadius: 6,
              circleColor: markerColor,
              circleOpacity: 0.6,
              circleStrokeWidth: 0,
            }}
          />
        </ShapeSource>
      </>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <MapView
        ref={mapRef}
        style={{flex: 1, opacity: isStyleLoaded ? 1 : 0}}
        styleURL={isStyleLoaded ? defaultMapProps.styleURL : 'asset://empty_style.json'}
        zoomEnabled
        scrollEnabled
        pitchEnabled
        rotateEnabled={false}
        compassEnabled={false}
        attributionEnabled={false}
        logoEnabled={false}
        onRegionWillChange={handleRegionWillChange}
        onDidFinishLoadingStyle={() => {
          handleMapReady();
          setIsStyleLoaded(true);
        }}
        onRegionDidChange={handleRegionChangeComplete}
      >
        {/* Only show Camera component when we need auto-updates */}
        {shouldShowCamera && cameraConfig && (
          <Camera
            key={cameraKey}
            ref={cameraRef}
            minZoomLevel={MIN_ZOOM_LEVEL}
            maxZoomLevel={MAX_ZOOM_LEVEL}
            {...cameraConfig}
          />
        )}

        {renderMapLayers}

        {routeCoordinates && (
          <RouteLayer routeCoordinates={routeCoordinates} isMapReady={isMapReady} />
        )}

        <AllMarkers
          pickupLocation={pickupLocation}
          dropLocation={dropLocation}
          placeLocation={placeLocation}

          is_google={is_google}
          eta={eta}
        />

        <DriverMarker 
          driverLocation={{
            latitude: driverLocation?.latitude,
            longitude: driverLocation?.longitude,
            bearing: driverBearing,
          }} 
        />

        {!onBooking && screen=='home' && initialRegion && isValidCoordinate(initialRegion) && (
          <PassiveUserLocationMarker 
            userLocation={initialRegion} 
            isDark={isDark}
          />
        )}
        {children}
      </MapView>
    </View>
  );
});

export default React.memo(RouteMappy);