import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {View, Platform} from 'react-native';
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
import { MapLayer } from '../Layers/MapLayer';


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

// Navigation constants
const MAX_PITCH = 60;
const TILT_ZOOM_THRESHOLD = 14;
const TILT_ANIMATION_DURATION = 800;
const OVERZOOM_THRESHOLD = 15;
const MAX_ZOOM = 15.99;
const MIN_ZOOM = 8;
const NAVIGATION_ZOOM = 15.99;
const MAP_TILE_CACHE_SIZE = 50;

const isValidCoordinate = (coord) => {
  if (!coord) return false;
  return (
    typeof coord.latitude === 'number' && 
    typeof coord.longitude === 'number' &&
    Math.abs(coord.latitude) <= 90 &&
    Math.abs(coord.longitude) <= 180
  );
};

// Simple User Location Marker Component (Passive - doesn't control camera)
const PassiveUserLocationMarker = ({ userLocation, isDark = false }) => {
  if (!userLocation || !isValidCoordinate(userLocation)) {
    return null;
  }

  const markerColor = isDark ? '#2ba276ff' : '#2E7D60';
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

const RouteMappy = forwardRef(({
  mapProps = {},
  customLayers = [],
  children,
  onMapReady,
  initialRegion,
  onRegionChangeComplete,
  pickupLocation,
  dropLocation,
  routeCoordinates,
  driverLocation,
  driverBearing,
  driverEta,
  routeEta,
  onlineVehicles,
  data,
  animationDuration = 1000,
  animationMode = 'flyTo',
  followUserLocation = true,
  followUserMode = 'compass',
  followZoomLevel = NAVIGATION_ZOOM,
  followPitch = 45,
  followHeading = 0,
  onUserTrackingModeChange,
  instruction,
  heatmap_coordinates,
  isDark = false,
  screen,
  showUserLocation = false,
}, ref) => {
  const mapRef = useRef(null);
  const cameraRef = useRef(null);
  const initialCameraRef = useRef(null);
  const isMapReadyRef = useRef(false);
  const isUserInteractingRef = useRef(false);
  const [isMapReady, setIsMapReady] = useState(false);
  const [currentZoom, setCurrentZoom] = useState(initialRegion?.zoom || NAVIGATION_ZOOM);
  const [currentPitch, setCurrentPitch] = useState(0);
  const [isTilted, setIsTilted] = useState(false);
  const [isOverzoomed, setIsOverzoomed] = useState(false);
  const [userTrackingMode, setUserTrackingMode] = useState(
    followUserLocation ? followUserMode : 'none'
  );

  const defaultMapProps = useMemo(
    () => ({
      styleURL: isDark 
        ? 'https://tiles.routemappy.com/dark.json'
        : 'https://tiles.routemappy.com/world.json',
      tileUrl: 'https://tiles.routemappy.com/world/{z}/{x}/{y}.mvt',
      glyphsUrl: 'https://fonts.openmaptiles.org/{fontstack}/{range}.pbf',
      attribution: '© OpenStreetMap contributors',
      bounds: [60, -10, 95, 37],
      minZoom: MIN_ZOOM,
      maxZoom: MAX_ZOOM,
      ...mapProps,
    }),
    [mapProps, isDark],
  );

  const calculateDynamicPitch = useCallback(zoom => {
    if (zoom < TILT_ZOOM_THRESHOLD) return 0;
    const progress = Math.min(1, (zoom - TILT_ZOOM_THRESHOLD) / 2);
    return MAX_PITCH * progress;
  }, []);

  const handleZoomChanged = useCallback(
    event => {
      const zoom = event.properties.zoomLevel;
      setCurrentZoom(zoom);
      
      const nowOverzoomed = zoom > OVERZOOM_THRESHOLD;
      if (nowOverzoomed !== isOverzoomed) {
        setIsOverzoomed(nowOverzoomed);
        
        if (mapRef.current) {
          mapRef.current.setStyle({
            raster: {
              'raster-opacity': nowOverzoomed ? 0.8 : 1,
              'raster-resampling': nowOverzoomed ? 'linear' : 'nearest',
            },
            transition: {
              duration: 300,
              delay: 0,
            },
          });
        }
      }

      const targetPitch = calculateDynamicPitch(zoom);
      if (Math.abs(targetPitch - currentPitch) > 5) {
        setCurrentPitch(targetPitch);
        setIsTilted(targetPitch > 0);
        if (cameraRef.current) {
          cameraRef.current.setCamera({
            pitch: targetPitch,
            animationDuration: TILT_ANIMATION_DURATION,
          });
        }
      }
    },
    [currentPitch, calculateDynamicPitch, isOverzoomed],
  );

  useEffect(() => {
    if (followUserLocation) {
      setUserTrackingMode(followUserMode);
      onUserTrackingModeChange?.(followUserMode);
    } else {
      setUserTrackingMode('none');
      onUserTrackingModeChange?.('none');
    }
  }, [followUserLocation, followUserMode]);

  useEffect(() => {
    if (
      !followUserLocation ||
      !driverLocation ||
      !isValidCoordinate(driverLocation) ||
      !cameraRef.current
    ) {
      return;
    }

    const cameraConfig = {
      centerCoordinate: [driverLocation.longitude, driverLocation.latitude],
      zoomLevel: Math.min(followZoomLevel, MAX_ZOOM),
      heading: driverBearing,
      pitch: followPitch,
      animationDuration,
      animationMode,
      padding: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
      },
      anchor: { x: 0.5, y: 0.9 },
    };

    cameraRef.current.setCamera(cameraConfig);
  }, [
    driverLocation,
    driverBearing,
    followUserLocation,
    followZoomLevel,
    followPitch,
    followHeading,
    animationDuration,
    animationMode,
  ]);

  const handleRegionWillChange = useCallback(() => {
    isUserInteractingRef.current = true;
    if (followUserLocation) {
      setUserTrackingMode('none');
    }
  }, [followUserLocation]);

  const handleRegionChangeComplete = useCallback((region) => {
    isUserInteractingRef.current = false;
    onRegionChangeComplete?.(region);
  }, [onRegionChangeComplete]);

  const handleMapReady = useCallback(() => {
    if (!isMapReadyRef.current) {
      isMapReadyRef.current = true;
      setIsMapReady(true);
      onMapReady?.();
    }
  }, [onMapReady]);

  // Handle tracking mode changes
  useEffect(() => {
    if (followUserLocation) {
      setUserTrackingMode(followUserMode);
      onUserTrackingModeChange?.(followUserMode);
    } else {
      setUserTrackingMode('none');
      onUserTrackingModeChange?.('none');
    }
  }, [followUserLocation, followUserMode, onUserTrackingModeChange]);

  // Main driver tracking effect
  useEffect(() => {
    if (
      !followUserLocation ||
      !driverLocation ||
      !isValidCoordinate(driverLocation) ||
      !cameraRef.current
    ) {
      return;
    }

    const cameraConfig = {
      centerCoordinate: [driverLocation.longitude, driverLocation.latitude],
      zoomLevel: Math.min(followZoomLevel, MAX_ZOOM),
      heading: driverBearing || followHeading,
      pitch: followPitch,
      animationDuration,
      animationMode,
      padding: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
      },
      anchor: { x: 0.5, y: 0.5 },
    };

    cameraRef.current.setCamera(cameraConfig);
  }, [
    driverLocation,
    driverBearing,
    followUserLocation,
    followZoomLevel,
    followPitch,
    followHeading,
    animationDuration,
    animationMode,
  ]);

  const resetTilt = useCallback(() => {
    if (cameraRef.current) {
      setCurrentPitch(0);
      setIsTilted(false);
      cameraRef.current.setCamera({
        pitch: 0,
        animationDuration: TILT_ANIMATION_DURATION,
      });
    }
  }, []);

  const toggleTilt = useCallback(() => {
    if (!cameraRef.current) return;
    const targetPitch = isTilted ? 0 : MAX_PITCH;
    setCurrentPitch(targetPitch);
    setIsTilted(!isTilted);
    cameraRef.current.setCamera({
      pitch: targetPitch,
      animationDuration: TILT_ANIMATION_DURATION,
    });
  }, [isTilted]);

  const calculateZoomLevel = useCallback((latitudeDelta, longitudeDelta) => {
    return Math.min(
      Math.log(360 / latitudeDelta) / Math.LN2,
      Math.log(360 / longitudeDelta) / Math.LN2,
      MAX_ZOOM,
    );
  }, []);

  useEffect(() => {
    if (initialRegion && !initialCameraRef.current) {
      const center = [initialRegion.longitude, initialRegion.latitude];
      const zoom = calculateZoomLevel(
        initialRegion.latitudeDelta,
        initialRegion.longitudeDelta,
      );
      initialCameraRef.current = {
        centerCoordinate: center,
        zoomLevel: zoom,
        animationDuration: 0,
      };
    }
  }, [initialRegion, calculateZoomLevel]);

  useEffect(() => {
    if (heatmap_coordinates && !Array.isArray(heatmap_coordinates)) {
      console.error('Invalid heatmap_coordinates prop: expected array, got', typeof heatmap_coordinates);
    }
  }, [heatmap_coordinates]);

  useImperativeHandle(ref, () => ({
    resetTilt,
    toggleTilt,
    setTrackingMode: mode => {
      setUserTrackingMode(mode);
      onUserTrackingModeChange?.(mode);
    },
    getTrackingMode: () => userTrackingMode,
    focusOnInitialRegion: () => {
      if (initialRegion && cameraRef.current) {
        const center = [initialRegion.longitude, initialRegion.latitude];
        const zoom = calculateZoomLevel(
          initialRegion.latitudeDelta || 0.1,
          initialRegion.longitudeDelta || 0.1,
        );
        cameraRef.current.setCamera({
          centerCoordinate: center,
          zoomLevel: zoom,
          animationDuration: 1000,
        });
      }
    },
    focusOnLocation: location => {
      if (isUserInteractingRef.current || !isValidCoordinate(location)) return;
      if (cameraRef.current) {
        cameraRef.current.setCamera({
          centerCoordinate: [location.longitude, location.latitude],
          zoomLevel: Math.min(NAVIGATION_ZOOM, MAX_ZOOM),
          animationDuration: 1000,
        });
      }
    },
    getMapInstance: () => mapRef.current,
  }));

  // Layer processing with dark mode support
  const processedLayers = useMemo(() => {
    const layerSet =  MapLayer;
    
    return [...layerSet].map(layer => ({
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

  const renderMapLayers = useMemo(() => {
    return (
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
    );
  }, [processedLayers, defaultMapProps]);

  return (
    <View style={{flex: 1, backgroundColor: isDark ? '#1a1a1a' : '#fff'}}>
      <MapView
        ref={mapRef}
        style={{flex: 1}}
        styleURL={defaultMapProps.styleURL}
        zoomEnabled
        scrollEnabled
        pitchEnabled={true}
        rotateEnabled={true}
        maxPitch={MAX_PITCH}
        pitch={currentPitch}
        maxZoomLevel={MAX_ZOOM}
        onCameraChanged={handleZoomChanged}
        glyphsUrl={defaultMapProps.glyphsUrl}
        attributionEnabled={false}
        logoEnabled={false}
        localizeLabels
        followUserMode={userTrackingMode}
        reduceMemoryUse={Platform.OS === 'android'}
        surfaceView={Platform.OS === 'android'}
        tileCacheSize={MAP_TILE_CACHE_SIZE}
        onRegionWillChange={handleRegionWillChange}
        onDidFinishLoadingStyle={handleMapReady}
        zoomLevel={currentZoom}
        animationDuration={200}
        compassEnabled={false}
        onPitchChanged={e => setCurrentPitch(e.properties?.pitch || 0)}
        onRegionDidChange={handleRegionChangeComplete}
      >
        
        {initialCameraRef.current && (
          <Camera
            ref={cameraRef}
            minZoomLevel={MIN_ZOOM}
            maxZoomLevel={MAX_ZOOM}
            zoomLevel={Math.min(followZoomLevel, MAX_ZOOM)}
            pitch={followPitch}
            animationDuration={500}
            centerCoordinate={
              driverLocation && isValidCoordinate(driverLocation)
                ? [driverLocation.longitude, driverLocation.latitude]
                : initialCameraRef.current.centerCoordinate
            }
            heading={driverBearing || 0}
            padding={{
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 10,
              paddingRight: 10,
            }}
          />
        )}
       
        {renderMapLayers}

        {/* Route line */}
        {routeCoordinates && (
          <RouteLayer routeCoordinates={routeCoordinates} isMapReady={isMapReady} />
        )}

        {/* All markers (pickup, drop, driver) */}
        <AllMarkers
          pickupLocation={pickupLocation}
          dropLocation={dropLocation}
          singleDriverLocation={{
            latitude: driverLocation?.latitude,
            longitude: driverLocation?.longitude,
            bearing: driverBearing,
          }}
        />

     
 {screen=='home'&& initialRegion && isValidCoordinate(initialRegion) && (
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