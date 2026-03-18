import { useTranslation } from "react-i18next";
import '../languages/i18next.js';

import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Dimensions, Animated, PanResponder, ActivityIndicator } from 'react-native';
import { bold, regular, api_url, trip_request_details, accept, reject, loader, ROUTEMAPPY_KEY } from '../config/Constants';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { connect } from 'react-redux';
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from "../context/ThemeContext.js";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Icons } from "../components/Icons.js";

var Sound = require('react-native-sound');

Sound.setCategory('Playback');
let whoosh = null;


const BookingRequest = (props) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const [trip_id, setTripId] = useState(route.params.trip_id);
  const [data, setData] = useState();
  
  // Distance and ETA states
  const [distanceToPickup, setDistanceToPickup] = useState(null);
  const [etaToPickup, setEtaToPickup] = useState(null);
  const [distanceToDrop, setDistanceToDrop] = useState(null);
  const [etaToDrop, setEtaToDrop] = useState(null);
  const [calculatingDirections, setCalculatingDirections] = useState(false);
  
  const { theme, isDark } = useTheme();

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
 
  
  useEffect(() => {
    console.log('booking request screen mounted');
    call_trip_request_details();
    
    // Initialize sound
    whoosh = new Sound('uber.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (!error) {
        whoosh.play();
        whoosh.setNumberOfLoops(-1);
      }
    });
    
    // Entry animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true
      })
    ]).start();
    
    const _unblur = navigation.addListener('blur', () => {
      if (whoosh) {
        whoosh.stop();
        whoosh.release();
      }
    });
    
    return () => {
      if (whoosh) {
        whoosh.stop();
        whoosh.release();
      }
      _unblur();
    };
  }, []);

  useEffect(() => {
    // Calculate directions when we have all required data
    if (data&&data.pickup_lat && data.pickup_lng && props.initial_lat && props.initial_lng) {
      calculateDirections();
    }
  }, [data, props.initial_lat, props.initial_lng]);

  const calculateDirections = async () => {
    setCalculatingDirections(true);
    
    try {
      // Calculate route from driver to pickup
      const driverLocation = `${props.initial_lat},${props.initial_lng}`;
      const pickupCoords = `${data.pickup_lat},${data.pickup_lng}`;
      
      await get_direction(driverLocation, pickupCoords, false);
      
      // Calculate route from pickup to dropoff if drop coordinates are available
      if (data.drop_lat && data.drop_lng) {
        const dropCoords = `${data.drop_lat},${data.drop_lng}`;
        await get_direction(pickupCoords, dropCoords, true);
      }
    } catch (error) {
      console.error('Error calculating directions:', error);
    } finally {
      setCalculatingDirections(false);
    }
  };

  const get_direction = async (startLoc, destinationLoc, isToDropoff = false) => {
    try {
      const url = `https://api.routemappy.com/route?from=${startLoc}&to=${destinationLoc}&key=${ROUTEMAPPY_KEY}`;
      const resp = await fetch(url);
      const respJson = await resp.json();

      if (respJson.paths && respJson.paths.length > 0) {
        const adjustedTime = adjustTimeBasedOnDistance(
          respJson.paths[0].distance,
          respJson.paths[0].time,
        );
        
        if (isToDropoff) {
          setDistanceToDrop(respJson.paths[0].distance);
          setEtaToDrop(adjustedTime);
        } else {
          setDistanceToPickup(respJson.paths[0].distance);
          setEtaToPickup(adjustedTime);
        }
      }
    } catch (error) {
      console.error('get_direction error:', error);
    }
  };

  const adjustTimeBasedOnDistance = (distanceInMeters, timeInMs) => {
    if (distanceInMeters < 10000) {
      return timeInMs * 2.0; // city
    } else if (distanceInMeters < 50000) {
      return timeInMs * 1.5; // suburban
    } else {
      return timeInMs * 1.2; // highway
    }
  };

  const formatETA = (etaInMilliseconds) => {
    if (!etaInMilliseconds) return `0 ${t('Min')}`
    const totalMinutes = Math.round(etaInMilliseconds / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours === 0) return `${minutes} ${t('Min')}`;
    if (minutes === 0) return `${hours} ${t('hr')}`;
    return `${hours} Hr ${minutes} ${t('Min')}`;
  };

  const formatDistance = (meters) => {
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(1)} ${t('km')}`;
    } else {
      return `${Math.round(meters)} ${t('M')}`;
    }
  };

 const getPaymentModeText = (mode) => {
  switch (mode) {
    case 1:
      return t('Cash');
    case 2:
      return t('Wallet');
    case 3:
      return t('Online');
    default:
      return t('Cash');
  }
};


  const getPaymentModeIcon = (mode) => {
    switch(mode) {
      case 1: return 'attach-money';
      case 2: return 'account-balance-wallet';
      case 3: return 'credit-card';
      default: return 'attach-money';
    }
  };

  const call_trip_request_details = async () => {
    console.log("call_trip_request_details")
    console.log(api_url + trip_request_details)
    console.log({ trip_request_id: trip_id })
    try {
      const response = await axios({
        method: 'post',
        url: api_url + trip_request_details,
        data: { trip_request_id: trip_id }
      });
      console.log("trip_data", response.data.result);
      setData(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const call_accept = async () => {
   
    setLoading(true);
    console.log(api_url + accept)
    console.log({ trip_id: trip_id, driver_id: global.id })
    try {
      await axios({
        method: 'post',
        url: api_url + accept,
        data: { trip_id: trip_id, driver_id: global.id }
      });
      if (whoosh) {
        whoosh.stop();
        whoosh.release();
      }
      navigate();
    } catch (error) {
      alert(error)
      console.log(error);
      setLoading(false);
    }
  };

  const call_reject = async () => {
    setLoading(true);
    console.log(api_url + reject)
    console.log({ trip_id: trip_id, driver_id: global.id, from: 1 })
    try {
      await axios({
        method: 'post',
        url: api_url + reject,
        data: { trip_id: trip_id, driver_id: global.id, from: 1 }
      });
      if (whoosh) {
        whoosh.stop();
        whoosh.release();
      }
      navigate();
    } catch (error) {
      alert(error)
      console.log(error);
      setLoading(false);
    }
  };

  const navigate = () => {
    navigation.goBack();
  };


  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: theme.background
    }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      
   
     

      {loading == false&&data ? (
        <Animated.View style={{ 
          flex: 1,
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }}>
          <View style={{
            padding: 10,
            paddingTop: 10,
            backgroundColor: theme.surface,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            zIndex: 2
          }}>
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'space-between' 
            }}>
              <View>
                <Text style={{
                  color: theme.textPrimary,
                  fontFamily: regular,
                  fontSize: 22,
                }}>
                {t('New Ride Request')}
                </Text>
                <Text style={{
                  color: theme.textSecondary,
                  fontFamily: regular,
                  fontSize: 14,
                  marginTop: 4
                }}>
                  {t('Tap to respond')}
                </Text>
              </View>
              
              <CountdownCircleTimer
                isPlaying={true}
                duration={30}
                colors={['#10B981', '#F59E0B', '#EF4444']}
                colorsTime={[30, 15, 0]}
                size={70}
                strokeWidth={6}
                trailColor={theme.divider}
                onComplete={() => {
                  call_reject();
                  return { shouldRepeat: false };
                }}
              >
                {({ remainingTime, color }) => (
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{
                      fontSize: 20,
                      fontFamily: regular,
                      color: color,
                    }}>
                      {remainingTime}
                    </Text>
                    <Text style={{
                      fontSize: 10,
                      color: theme.textSecondary,
                      fontFamily: regular,
                    }}>
                      {t('Seconds')}
                    </Text>
                  </View>
                )}
              </CountdownCircleTimer>
            </View>
          </View>

          <View style={{ 
            flex: 1, 
            padding: 10,
            zIndex: 2
          }}>
            
            <View style={{
              backgroundColor: theme.surface,
              borderRadius: 20,
              padding: 20,
              marginBottom: 10,
             
        
            }}>
              
              <View style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                marginBottom: 20 
              }}>
                <View style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: theme.textSecondary+50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 15
                }}>
                  <Icon name="person" size={24} color={theme.onPrimary} />
                </View>
                
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: 18,
                    color: theme.textPrimary,
                    fontFamily: regular,
                  }}>
                    {data?.first_name}
                  </Text>
                
                </View>

                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{
                    fontSize: 24,
                    color: '#10B981',
                    fontFamily: regular,
                  }}>
                    {global.currency}{data.total}
                  </Text>
                  <Text style={{
                    fontSize: 12,
                    color: theme.textSecondary,
                    fontFamily: regular,
                  }}>
                    {data?.trip_type_name}
                  </Text>
                </View>
              </View>

              <View style={{
                flexDirection: 'row',
                backgroundColor: isDark ? '#1E293B' : '#F1F5F9',
                borderRadius: 16,
                padding: 15,
              }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Icon name="navigation" size={18} color={theme.textSecondary} />
                  <Text style={{
                    fontSize: 14,
                    color: theme.textPrimary,
                    fontFamily: regular,
                    marginTop: 6
                  }}>
                    {distanceToPickup ? formatDistance(distanceToPickup) : '--'}
                  </Text>
                  <Text style={{
                    fontSize: 12,
                    color: theme.textSecondary,
                    fontFamily: regular,
                  }}>
                    {t('To Pickup')}
                  </Text>
                </View>
                
                <View style={{
                  width: 1,
                  backgroundColor: theme.divider,
                  marginHorizontal: 10
                }} />
                
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Icon name="access-time" size={18} color={theme.textSecondary} />
                  <Text style={{
                    fontSize: 14,
                    color: theme.textPrimary,
                    fontFamily: regular,
                    marginTop: 6
                  }}>
                    {etaToPickup ? formatETA(etaToPickup) : '--'}
                  </Text>
                  <Text style={{
                    fontSize: 12,
                    color: theme.textSecondary,
                    fontFamily: regular,
                  }}>
                    {t('ETA')}
                  </Text>
                </View>
                
                <View style={{
                  width: 1,
                  backgroundColor: theme.divider,
                  marginHorizontal: 10
                }} />
                
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Icon name={getPaymentModeIcon(data.payment_mode)} size={18} color={theme.textSecondary} />
                  <Text style={{
                    fontSize: 14,
                    color: theme.textPrimary,
                    fontFamily: regular,
                    marginTop: 6
                  }}>
                    {getPaymentModeText(data.payment_mode)}
                  </Text>
                  <Text style={{
                    fontSize: 12,
                    color: theme.textSecondary,
                    fontFamily: regular,
                  }}>
                    {t('Payment')}
                  </Text>
                </View>
              </View>

              {/* Trip Distance and Loading Indicator */}
              <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 15,
                paddingTop: 15,
                borderTopWidth: 1,
                borderTopColor: theme.divider
              }}>
                {calculatingDirections ? (
                  <ActivityIndicator size="small" color={theme.primary} />
                ) : (
                  <>
                    <Icon name="route" size={16} color={theme.textSecondary} />
                    <Text style={{
                      fontSize: 14,
                      color: theme.textSecondary,
                      fontFamily: regular,
                      marginLeft: 8
                    }}>
                      {distanceToDrop ? `${t('Trip')}: ${formatDistance(distanceToDrop)} • ${formatETA(etaToDrop)}` : `${t('Calculating route')}...`}
                    </Text>
                  </>
                )}
              </View>
            </View>

            {/* Location Cards with Distance Info */}
            <View style={{ marginBottom: 20 }}>
              {/* Pickup Location */}
              <View style={{
                backgroundColor: theme.surface,
                borderRadius: 16,
                padding: 16,
                marginBottom: 12,
               
                borderLeftWidth: 4,
                borderLeftColor: '#10B981'
              }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <View style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    backgroundColor: '#10B981',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12
                  }}>
                    <Icon name="my-location" size={14} color="#FFFFFF" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{
                      fontSize: 12,
                      color: '#10B981',
                      fontFamily: regular,
                      textTransform: 'uppercase'
                    }}>
                      {t('PICKUP')}
                    </Text>
                  </View>
                  {distanceToPickup && (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Icon name="directions-car" size={14} color={theme.textSecondary} />
                      <Text style={{
                        fontSize: 12,
                        color: theme.textSecondary,
                        fontFamily: regular,
                        marginLeft: 4
                      }}>
                        {formatDistance(distanceToPickup)} • {formatETA(etaToPickup)}
                      </Text>
                    </View>
                  )}
                </View>
                <Text numberOfLines={2} style={{
                  fontSize: 14,
                  color: theme.textSecondary,
                  fontFamily: regular,
                  lineHeight: 20,
                   marginLeft:40,
                }}>
                  {data.pickup_address}
                </Text>
              </View>

              {/* Dropoff Location */}
              <View style={{
                backgroundColor: theme.surface,
                borderRadius: 16,
                padding: 16,
         
                borderLeftWidth: 4,
                borderLeftColor: '#EF4444'
              }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <View style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    backgroundColor: '#EF4444',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12
                  }}>
                    <Icon name="place" size={14} color="#FFFFFF" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{
                      fontSize: 12,
                      color: '#EF4444',
                      fontFamily: regular,
                      textTransform: 'uppercase'
                    }}>
                      {t('DROPOFF')}
                    </Text>
                  </View>
                  {distanceToDrop && (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                          <Icon name="directions-car" size={14} color={theme.textSecondary} />

                      <Text style={{
                        fontSize: 12,
                        color: theme.textSecondary,
                        fontFamily: regular,
                        marginLeft: 4
                      }}>
                        {formatDistance(distanceToDrop)} • {formatETA(etaToDrop)}
                      </Text>
                    </View>
                  )}
                </View>
                <Text numberOfLines={2} style={{
                  fontSize: 14,
                  marginLeft:40,
                  color: theme.textSecondary,
                  fontFamily: regular,
                  lineHeight: 20
                }}>
                  {data.drop_address}
                </Text>
              </View>
            </View>
          </View>

         <View style={{
  padding: 20,
  paddingTop: 10,
  backgroundColor: theme.surface,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  zIndex: 2
}}>

  <View style={{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }}>
    <TouchableOpacity
      onPress={call_reject}
      activeOpacity={0.8}
      style={{
        backgroundColor: theme.background,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: theme.shadow_color,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 2,
        borderColor: '#EF4444',
      }}
    >
      <Icon name="close" size={26} color="#EF4444" />
    </TouchableOpacity>

    <TouchableOpacity
      onPress={call_accept}
      activeOpacity={0.8}
      style={{
        backgroundColor: '#10B981',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#10B981",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      <Icon name="check" size={26} color="#FFFFFF" />
    </TouchableOpacity>
  </View>

  <View style={{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  }}>
    <Text style={{
      color: '#EF4444',
      fontFamily: regular,
      fontSize: 14,
      textAlign: 'center'
    }}>
      {t('Decline')}
    </Text>
    <Text style={{
      color: '#10B981',
      fontFamily: regular,
      fontSize: 14,
    }}>
      {t('Accept')}
    </Text>
  </View>
</View>

        </Animated.View>
      ) : (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.background
        }}>
          <LottieView 
            style={{ width: 200, height: 200 }} 
            source={loader} 
            autoPlay 
            loop 
          />
        </View>
      )}
    </SafeAreaView>
  );
};

function mapStateToProps(state) {
  return {
    initial_lat: state.booking.initial_lat,
    initial_lng: state.booking.initial_lng,
    initial_region: state.booking.initial_region,
  };
}

export default connect(mapStateToProps, null)(BookingRequest);