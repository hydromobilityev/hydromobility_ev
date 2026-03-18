import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RouteMappy from '../components/RouteMappy';

const DirectionsScreen = props => {
  // State management
  const [directions, setDirections] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [eta, setEta] = useState(0);
  const [audioGuidance, setAudioGuidance] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [expanded, setExpanded] = useState(true);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const mapRef = useRef(null);

  // Extract props
  const {
    pickup_location = {
      latitude: 9.931122521991009,
      longitude: 78.09342777390353,
      address: 'Pickup Location',
    },
    drop_location = {
      latitude: 9.92969608198601,
      longitude: 78.0940660376124,
      address: 'Drop Location',
    },
    driver_location = null,
    driver_bearing = 0,
    trip_status = 0,
    routing = 2,
    GOOGLE_KEY = GOOGLE_KEY,
  } = props;

  // Formatting functions
  const formatTime = seconds =>
    seconds > 60 ? `${Math.floor(seconds / 60)} min` : '<1 min';
  const formatDistance = meters =>
    meters < 1000
      ? `${Math.round(meters)} m`
      : `${(meters / 1000).toFixed(1)} km`;

  // Your existing routing function with modifications
  const getDirection = useCallback(
    async (startLoc, destinationLoc) => {
      console.log('get_direction', startLoc, destinationLoc);
      try {
        if (routing === 2) {
          const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc.latitude},${startLoc.longitude}&destination=${destinationLoc.latitude},${destinationLoc.longitude}&key=${GOOGLE_KEY}`;
          const resp = await fetch(url);
          const respJson = await resp.json();

          if (respJson.routes.length > 0) {
            const encodedPolyline = respJson.routes[0].overview_polyline.points;
            const points = googleDecode(encodedPolyline);
            const coords = points.map(([lat, lng]) => [lng, lat]);
            setRouteCoords(coords);
            setEta(respJson.routes[0].legs[0]?.duration?.value || 0);

            // Transform Google response to our format
            const instructions = respJson.routes[0].legs[0].steps.map(step => ({
              distance: step.distance.value,
              time: step.duration.value,
              text:
                step.maneuver || step.html_instructions.replace(/<[^>]*>/g, ''),
              street_name: step.name,
              sign: getSignFromManeuver(step.maneuver),
            }));

            setDirections({
              distance: respJson.routes[0].legs[0].distance.value,
              time: respJson.routes[0].legs[0].duration.value,
              instructions,
            });
          }
        } else {
          const url = `https://asia.routemappy.com/route?from=${startLoc.latitude},${startLoc.longitude}&to=${destinationLoc.latitude},${destinationLoc.longitude}&key=testkey124`;
          const resp = await fetch(url);
          const respJson = await resp.json();

          if (respJson.paths && respJson.paths.length > 0) {
            const points = decodePolyline(
              respJson.paths[0].points,
              respJson.paths[0].points_encoded_multiplier,
            );
            const coords = points.map(([lat, lng]) => [lng, lat]);
            setRouteCoords(coords);
            setEta(respJson.paths[0].time);

            setDirections({
              distance: respJson.paths[0].distance,
              time: respJson.paths[0].time,
              instructions: respJson.paths[0].instructions,
            });
          }
        }
      } catch (error) {
        console.error('get_direction error:', error);
        setRouteCoords([]);
        setDirections(null);
      }
    },
    [routing, GOOGLE_KEY],
  );

  // Your existing decode function
  const decodePolyline = (encoded, multiplier) => {
    const len = encoded.length;
    let index = 0;
    const array = [];
    let lat = 0;
    let lng = 0;

    while (index < len) {
      let b;
      let shift = 0;
      let result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      array.push([lat / multiplier, lng / multiplier]);
    }

    return array;
  };

  // Helper function for Google Maps decoding
  const googleDecode = encoded => {
    const poly = [];
    let index = 0,
      lat = 0,
      lng = 0;

    while (index < encoded.length) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      poly.push([lat * 1e-5, lng * 1e-5]);
    }
    return poly;
  };

  // Helper to convert Google maneuver to our sign system
  const getSignFromManeuver = maneuver => {
    if (!maneuver) return 0;
    const maneuvers = {
      'turn-left': -2,
      'turn-right': -1,
      'turn-sharp-left': 2,
      'turn-sharp-right': 1,
      'turn-slight-left': 6,
      'turn-slight-right': 3,
      'uturn-left': 5,
      'uturn-right': 5,
      straight: 0,
      arrive: 4,
    };
    return maneuvers[maneuver] || 0;
  };

  // Fetch directions based on trip status
  useEffect(() => {
    if (!driver_location) return;

    if (trip_status === 1) {
      getDirection(driver_location, pickup_location);
    } else if (trip_status === 2) {
      getDirection(driver_location, drop_location);
    }
  }, [driver_location, trip_status, getDirection]);

  // Toggle audio guidance
  const toggleAudioGuidance = () => setAudioGuidance(!audioGuidance);

  // Toggle directions panel
  const toggleDirectionsPanel = () => {
    Animated.timing(slideAnim, {
      toValue: expanded ? 1 : 0,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
    setExpanded(!expanded);
  };

  // Render direction icon based on sign
  const renderDirectionIcon = sign => {
    const icons = {
      [-2]: {name: 'turn-left', color: '#4285F4'},
      [-1]: {name: 'turn-right', color: '#4285F4'},
      0: {name: 'straight', color: '#4285F4'},
      1: {name: 'merge', color: '#4285F4'},
      2: {name: 'fork-left', color: '#4285F4'},
      3: {name: 'ramp-right', color: '#4285F4'},
      4: {name: 'flag', color: '#EA4335'},
      5: {name: 'u-turn', color: '#4285F4'},
      6: {name: 'ramp-left', color: '#4285F4'},
      default: {name: 'navigation', color: '#4285F4'},
    };

    const icon = icons[sign] || icons.default;
    return <Icon name={icon.name} size={24} style={{color: icon.color}} />;
  };

  // Determine addresses to show based on trip status
  const getAddresses = () => {
    if (trip_status === 1) {
      return {
        top: driver_location ? 'Your location' : 'Calculating route...',
        bottom: pickup_location.address,
        iconColors: ['#34A853', '#EA4335'],
      };
    }
    return {
      top: driver_location ? 'Your location' : 'Calculating route...',
      bottom: drop_location.address,
      iconColors: ['#34A853', '#EA4335'],
    };
  };

  const addresses = getAddresses();

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {/* Map View */}
      <View style={{flex: 1}}>
        <RouteMappy
          ref={mapRef}
          onMapReady={() => console.log('Map ready')}
          initialRegion={{
            latitude: pickup_location.latitude,
            longitude: pickup_location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          pickupLocation={pickup_location}
          dropLocation={drop_location}
          driverLocation={driver_location}
          driverBearing={driver_bearing}
          routeCoordinates={routeCoords}
          driverEta={eta}
        />
      </View>


      {/* Directions Panel */}
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 80,
          left: 15,
          right: 15,
          backgroundColor: 'white',
          borderRadius: 10,
          maxHeight: 300,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 5,
          transform: [
            {
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 250],
              }),
            },
          ],
        }}>
        <TouchableOpacity
          onPress={toggleDirectionsPanel}
          style={{alignItems: 'center', paddingVertical: 5}}>
          <Icon
            name={expanded ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
            size={30}
            style={{color: '#666'}}
          />
        </TouchableOpacity>

        <ScrollView style={{paddingHorizontal: 15, paddingBottom: 15}}>
          {directions?.instructions?.map((step, index) => (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: 'row',
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#eee',
                backgroundColor:
                  activeStep === index ? '#f5f9ff' : 'transparent',
              }}
              onPress={() => setActiveStep(index)}>
              <View style={{marginRight: 15, justifyContent: 'center'}}>
                {renderDirectionIcon(step.sign)}
              </View>
              <View style={{flex: 1}}>
                <Text style={{fontSize: 16, color: '#333', marginBottom: 3}}>
                  {step.text}
                </Text>
                {step.street_name && (
                  <Text style={{fontSize: 14, color: '#666', marginBottom: 5}}>
                    {step.street_name}
                  </Text>
                )}
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 13, color: '#666', marginRight: 15}}>
                    {formatDistance(step.distance)}
                  </Text>
                  <Text style={{fontSize: 13, color: '#666'}}>
                    {formatTime(step.time)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

      {/* Bottom Controls */}
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          left: 15,
          right: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            borderRadius: 50,
            padding: 15,
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
          }}
          onPress={toggleAudioGuidance}>
          <Icon
            name={audioGuidance ? 'volume-up' : 'volume-off'}
            size={24}
            style={{color: audioGuidance ? '#4285F4' : '#666'}}
          />
          <Text style={{marginLeft: 8, fontSize: 14, color: '#333'}}>
            {audioGuidance ? 'Sound on' : 'Sound off'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: '#4285F4',
            borderRadius: 50,
            paddingVertical: 15,
            paddingHorizontal: 25,
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
          }}>
          <Icon name="navigation" size={24} style={{color: 'white'}} />
          <Text
            style={{
              marginLeft: 8,
              fontSize: 16,
              color: 'white',
              fontWeight: 'bold',
            }}>
            {trip_status === 1
              ? 'Navigate to pickup'
              : 'Navigate to destination'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DirectionsScreen;
