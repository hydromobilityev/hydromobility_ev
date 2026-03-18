import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
} from 'react-native';
import RouteMappy from '../components/RouteMappy';
import {useNavigation, useRoute} from '@react-navigation/native';
import database from '@react-native-firebase/database';

import {
  f_l,
  f_m,
  f_tiny,
  f_xl,
  f_xs,
  LATITUDE_DELTA,
  logo,
  LONGITUDE_DELTA,
  regular,
  ROUTEMAPPY_KEY,
} from '../config/Constants';
import {connect} from 'react-redux';
import Icon, {Icons} from '../components/Icons';
import { useTheme } from '../context/ThemeContext';

const defaultRegion = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

const NavigationScreen = props => {
  const route = useRoute();
  const navigation=useNavigation()
  const {data, GOOGLE_KEY} = route.params;
  const [coords, setCoords] = useState([]);
  const [eta, setEta] = useState(0);
  const [distance, setDistance] = useState(0);
  const [instruction, setInstruction] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const map_ref = useRef(null);
  const [single_instruction, setSingleInstruction] = useState();
    const { theme, isDark } = useTheme(); // Using theme from context

  // Animation values
  const instructionAnim = useRef(new Animated.Value(0)).current;
  const infoPanelAnim = useRef(new Animated.Value(0)).current;
  const distanceAnim = useRef(new Animated.Value(0)).current;
  const etaAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate info panel in
    Animated.timing(infoPanelAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
       
    if (data && data?.trip?.status <= 2) {
      get_direction(
        `${props.change_location.latitude},${props.change_location.longitude}`,
        `${data.trip.pickup_lat},${data.trip.pickup_lng}`,
      );
    } else {
      if (data) {
        get_direction(
          `${props.change_location.latitude},${props.change_location.longitude}`,
          `${data?.trip?.drop_lat},${data?.trip?.drop_lng}`,
        );
      }
    }
  }, [props.change_location, data,navigation]);

  

  const animateValueChange = (animRef, newValue) => {
    Animated.timing(animRef, {
      toValue: 0,
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      animRef.setValue(1);
      Animated.timing(animRef, {
        toValue: 0,
        duration: 150,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    });
  };

  const get_direction = async (startLoc, destinationLoc) => {
    try {
    
        const url = `https://api.routemappy.com/route?from=${startLoc}&to=${destinationLoc}&key=${ROUTEMAPPY_KEY}`;
        const resp = await fetch(url);
        const respJson = await resp.json();

        if (respJson.paths && respJson.paths.length > 0) {
          const points = decodePolyline(
            respJson.paths[0].points,
            respJson.paths[0].points_encoded_multiplier,
          );
          const coords = points.map(([lat, lng]) => ({
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),
          }));
          console.log("nondecoded",respJson.paths[0].points)
          console.log("multipollier",respJson.paths[0].points_encoded_multiplier)
          console.log("decoded",points)
          console.log("routes",coords)
          let eta_value=adjustTimeBasedOnDistance(
                  respJson.paths[0].distance,
                  respJson.paths[0].time,
                )
          respJson.paths[0].time !== eta
            ? setEta(
                adjustTimeBasedOnDistance(
                  respJson.paths[0].distance,
                  respJson.paths[0].time,
                ),
              )
            : null;
          respJson.paths[0].distance !== distance
            ? setDistance(respJson.paths[0].distance)
            : null;

          setInstruction(respJson.paths[0].instructions);
          setSingleInstruction(respJson.paths[0].instructions[0]);
          setCoords(coords);
          update_location_in_firebase(props.change_location.latitude,props.change_location.longitude,props.change_location.heading,respJson.paths[0].points,respJson.paths[0].points_encoded_multiplier,eta_value)
        }
      
      
    } catch (error) {
      console.error('get_direction error:', error);
      setCoords([]);
    }
  };
const update_location_in_firebase = async (latitude, longitude, bearing, path, multiplier,eta_value) => {
  const tripRef = database().ref(`trips/${data.trip.id}`);

  // Fetch current trip data
  const snapshot = await tripRef.once('value');
  const tripData = snapshot.val() || {};

  // Update or initialize waypoints
  let waypoints = tripData.waypoints || [];
  waypoints.push({
    lat: latitude,
    lng: longitude,
    bearing: bearing,
    timestamp: Date.now(),
  });

  // Prepare polyline object
  const polyline = {
    points: path,
    multiplier: multiplier,
  };
  console.log(polyline)

  // Write updated waypoints and polyline back to Firebase
  await tripRef.update({
    waypoints: waypoints,
    polyline: polyline,
    eta_value
  });
};


  const adjustTimeBasedOnDistance = (distanceInMeters, timeInMs) => {
    console.log('adjustTimeBasedOnDistance', distanceInMeters, timeInMs);
    if (distanceInMeters < 10000) {
      console.log('City driving conditions', timeInMs * 2.0);
      return timeInMs * 2.0; // city
    } else if (distanceInMeters < 50000) {
      console.log('Suburban driving conditions', timeInMs * 1.5);
      return timeInMs * 1.5; // suburban
    } else {
      console.log('Highway driving conditions', timeInMs * 1.2);
      return timeInMs * 1.2; // highway
    }
  };
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

  const formatETA = etaInMilliseconds => {
    if (!etaInMilliseconds) return '0 Min';
    const totalMinutes = Math.round(etaInMilliseconds / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours === 0) return `${minutes} Min`;
    if (minutes === 0) return `${hours} Hr`;
    return `${hours} Hr ${minutes} Min`;
  };

  const formatDistance = meters => {
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(2)} km`;
    } else {
      return `${Math.round(meters)} m`;
    }
  };

  const getETAFromMs = etaMs => {
    const now = new Date();
    const etaTime = new Date(now.getTime() + etaMs);
    const hours = etaTime.getHours();
    const minutes = etaTime.getMinutes();

    const isPM = hours >= 12;
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, '0');
    const ampm = isPM ? 'PM' : 'AM';

    return `${displayHours}.${displayMinutes} ${ampm}`;
  };


  return (
    <View style={{flex: 1, backgroundColor: 'transparent'}}>
      
      {data &&
        (props.initial_region || defaultRegion) &&
        coords &&
        coords.length > 0 && (
          <RouteMappy
          isDark={isDark}
            ref={map_ref}
            onMapReady={() => {
              console.log('Map ready callback called');
            }}
            instruction={instruction}
            screen="navigation"
            followUserLocation={true}
            initialRegion={props.initial_region || defaultRegion}
            etaValue={eta}
            routeCoordinates={coords}
            pickupLocation={
              data && data?.trip?.status <= 2
                ? {
                    latitude: parseFloat(data?.trip?.pickup_lat),
                    longitude: parseFloat(data?.trip?.pickup_lng),
                  }
                : null
            }
            dropLocation={
              data?.trip?.status >= 2
                ? {
                    latitude: parseFloat(data?.trip?.drop_lat),
                    longitude: parseFloat(data?.trip?.drop_lng),
                  }
                : null
            }
            data={data}
            driverLocation={{
              latitude: parseFloat(props.change_location?.latitude) || 0,
              longitude: parseFloat(props.change_location?.longitude) || 0,
            }}
            driverBearing={parseFloat(props.change_location?.heading) || 0}
          />
        )}
      <View
        style={{
          position: 'absolute',
          top: Dimensions.get('window').height * 0.05,
          left: 0,
          right: 0,
          zIndex: 10,
          opacity: 0.9,
        }}>
        <View
          style={{
            width: 350,
            backgroundColor: '#37474FB2',
            borderRadius: 20,
            opacity: 0.9,
            marginHorizontal: 8,
            margin: 6,
            shadowColor: '#000',
            shadowOffset: {width: 4, height: 4},
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 4,
            alignSelf: 'center',
            borderWidth: 0.5,
            borderColor: 'rgba(0, 0, 0, 0.05)',
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: 'rgba(66, 133, 244, 0.1)',
                borderRadius: 50,
                marginRight: 12,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 10,
              }}>
              <Icon
                type={Icons.MaterialIcons}
                name={'location-on'}
                size={45}
                color="#fff"
              />
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: 'white',
                  lineHeight: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                numberOfLines={1}>
                {data.trip.pickup_address}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/* {instruction.length > 0 && (
        <View
          style={{
            position: 'absolute',
            top: Dimensions.get('window').height * 0.05,
            left: 0,
            right: 0,
            zIndex: 10,
            opacity: 0.9,
          }}>
          <FlatList
            data={instruction}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: (Dimensions.get('window').width - 350) / 3,
            }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <View
                style={{
                  width: 350,
                  backgroundColor: '#37474FB2',
                  borderRadius: 20,
                  opacity: 0.9,
                  marginHorizontal: 8,
                  margin: 6,
                  shadowColor: '#000',
                  shadowOffset: {width: 4, height: 4},
                  shadowOpacity: 0.1,
                  shadowRadius: 5,
                  elevation: 4,
                  alignSelf: 'center',
                  borderWidth: 0.5,
                  borderColor: 'rgba(0, 0, 0, 0.05)',
                  height: 90,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      backgroundColor:
                        activeIndex === index
                          ? '#fff'
                          : 'rgba(66, 133, 244, 0.1)',
                      borderRadius: 50,
                      marginRight: 12,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginLeft: 10,
                    }}>
                    <Icon
                      type={Icons.MaterialIcons}
                      name={(() => {
                        switch (item.sign) {
                          case -3:
                            return 'u-turn-left';
                          case -2:
                            return 'keyboard-return';
                          case -1:
                            return 'north-west';
                          case 0:
                            return 'arrow-forward';
                          case 1:
                            return 'north-east';
                          case 2:
                            return 'keyboard-tab';
                          case 3:
                            return 'u-turn-right';
                          case 4:
                            return 'star';
                          default:
                            return 'arrow-forward';
                        }
                      })()}
                      size={45}
                      color={activeIndex === index ? '#37474FB2' : '#4285F4'}
                    />
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '600',
                        color: 'white',
                        lineHeight: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      numberOfLines={1}>
                      {item.text}
                    </Text>
                    {item.street_name && (
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'white',
                          marginTop: 4,
                        }}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {item.street_name.length > 40
                          ? `${item.street_name.substring(0, 18)}...`
                          : item.street_name}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            )}
            onScroll={event => {
              const index = Math.round(event.nativeEvent.contentOffset.x / 308);
              setActiveIndex(index);
            }}
            snapToInterval={308} // 300 width + 8 margin
            decelerationRate="fast"
            snapToAlignment="center"
          />
        </View>
      )} */}
      {/* <TouchableOpacity
        style={{
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 5,
          elevation: 3,
          position: 'absolute',
          right: 20,
          bottom: 100,
          borderRadius: 50,
        }}
        onPress={() => map_ref.current.toggleTilt()}>
        <Icon
          type={Icons.MaterialIcons}
          name="3d-rotation"
          style={{
            fontSize: 18,
            color: '#4285F4',
          }}
        />
      </TouchableOpacity> */}
      <View
        style={{
          width: 70,
          height: 70,
          // backgroundColor: 'white',
          padding: 10,
          borderRadius: 100,
          // elevation: 3,
          position: 'absolute',
          left: 0,
          bottom: 90,
          borderRadius: 50,
        }}>
        <Image
          style={{
            height: undefined,
            width: undefined,
            flex: 1,
            borderRadius: 100,
          }}
          source={logo}
        />
      </View>
      <TouchableOpacity
        style={{
          
          position: 'absolute',
          left: 20,
          bottom: 5,
          borderRadius: 50,
        }}
        onPress={() => map_ref.current.toggleTilt()}>
        <Text style={{color: '#37474FB2'}}>Powered By RouteMappy</Text>
      </TouchableOpacity>
      <Animated.View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          padding: 10,
          position: 'absolute',
          bottom: 30,
          backgroundColor: theme.background,
          alignSelf: 'center',
          width: '95%',
          borderRadius: 24,
          borderWidth: 0.5,
          borderColor: 'rgba(0, 0, 0, 0.05)',
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 6},
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 5,
          overflow: 'hidden',
          opacity: infoPanelAnim,
          transform: [
            {
              translateY: infoPanelAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        }}>
        {/* Timer Section */}
        <View style={{flex: 1, alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: 'rgba(66, 133, 244, 0.1)',
                borderRadius: 20,
                padding: 0,
                marginRight: 5,
              }}>
              <Icon
                type={Icons.Ionicons}
                name="timer"
                style={{
                  fontSize: 18,
                  color: theme.primary,
                }}
              />
            </View>
            <Text
              style={{
                color: theme.textPrimary,
                fontSize: f_m,
                fontFamily: regular,
                
              }}>
              {formatETA(eta)}
            </Text>
          </View>
        </View>

        {/* Distance Section */}
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: 'rgba(66, 133, 244, 0.1)',
                borderRadius: 20,
                padding: 0,
                marginRight: 8,
              }}>
              <Icon
                type={Icons.MaterialIcons}
                name="navigation"
                style={{
                  fontSize: 18,
                  color:theme.primary,
                }}
              />
            </View>
            <Text
              style={{
                color: theme.textPrimary,
                fontSize: f_m,
                fontFamily: regular,
                
              }}>
              {formatDistance(distance)}
            </Text>
          </View>
        </View>

        {/* Arrival Time Section */}
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: 'rgba(66, 133, 244, 0.1)',
                borderRadius: 20,
                padding: 0,
                marginRight: 2,
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
              }}>
              <Icon
                type={Icons.Ionicons}
                name="time"
                style={{
                  fontSize: 18,
                  color:theme.primary,
                }}
              />
            </View>
            <Text
              style={{
                color:theme.textPrimary,
                fontSize: f_m,
                fontFamily: regular,
             
              }}>
              {getETAFromMs(eta)}
            </Text>
          </View>
        </View>

        {/* Close Button */}
        <TouchableOpacity
        onPress={()=>navigation.goBack()}
          style={{
            backgroundColor: 'rgba(255, 0, 0, 0.1)',
            borderRadius: 20,
            padding: 8,
          }}>
          <Icon
            type={Icons.MaterialIcons}
            name="close"
            style={{
              fontSize: 18,
              color: '#F44336',
            }}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    change_location: state.change_location.change_location,
    initial_lat: state.booking.initial_lat,
    initial_lng: state.booking.initial_lng,
    initial_region: state.booking.initial_region,
  };
}

export default connect(mapStateToProps, null)(NavigationScreen);
