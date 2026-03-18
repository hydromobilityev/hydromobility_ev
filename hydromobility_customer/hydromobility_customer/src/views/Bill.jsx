import { useTranslation } from "react-i18next";
import '../languages/i18next';

import React, { useState, useEffect, useRef } from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
 
    ScrollView,
    Image,
    StatusBar,

} from "react-native";
import { useNavigation, useRoute, CommonActions } from "@react-navigation/native";
import * as colors from '../assets/css/Colors';
import { screenHeight, screenWidth, normal, bold, api_url, get_bill, regular, app_name, img_url, f_25, f_s, f_xs, f_m } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import axios from 'axios';
import { SafeAreaView } from "react-native-safe-area-context";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import Toast from "react-native-toast-message";
import RouteMappy from "../components/RouteMappy";
import { connect } from "react-redux";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { useTheme } from "../context/ThemeContext";

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};
ReactNativeHapticFeedback.trigger("impactHeavy", options);

const Bill = (props) => {
  const { t, i18n } = useTranslation();
    const navigation = useNavigation();
    const route = useRoute();
    const [loading, setLoading] = useState(false);
    const [on_load, setOnLoad] = useState(0);
    const [data, setData] = useState("");
    const [trip_id, setTripId] = useState(route.params.trip_id);
    const [from, setFrom] = useState(route.params.from);
      const [coords, setCoords] = useState([]);
            const { theme, toggleTheme, isDark } = useTheme();
    
  const map_ref = useRef();

    useEffect(() => {
        call_get_bill();    
    return () => {
    };
    }, []);
    const handle_back_button_click = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "Home" }],
            })
        );
    }

    const go_back = () => {
        navigation.goBack();
    }
 const showToast = (type, title, message) => {
   ReactNativeHapticFeedback.trigger("impactLight", options);
   Toast.show({
     type: type,
     text1: title,
     text2: message,
     visibilityTime: 5000,
     position: 'top',
     topOffset: 200,
   });
 };
    const call_get_bill = () => {
            let coords_value, points;

        setLoading(true);
        axios({
            method: 'post',
            url: api_url + get_bill,
            data: { trip_id: trip_id }
        })
            .then(async response => {
                setLoading(false);
                setData(response.data.result)
                setOnLoad(1);
                console.log("datas",response.data.result)
                if(response.data.result.polyline){
                    points = decodePolyline(
                      response.data.result.polyline,
                      100000
                    );

                  if (global.tile === 1) { // RouteMappy tile format [lng, lat]
                    coords_value = points.map(([lat, lng]) => [lng, lat]);
                  } else { // Google tile format {latitude, longitude}
                    coords_value = points.map(([lat, lng]) => ({
                      latitude: lat,
                      longitude: lng
                    }));
                  }

                  
                  setCoords(coords_value);
                }
                 
            })
            .catch(error => {
                setLoading(false);
                   showToast(
                     "error",
                     t('Error'),
                     t('Sorry something went wrong')
                   );
            });
    }
  function decodePolyline(encoded, multiplier) {
    if (!encoded) return [];

    const coordinates = [];
    let index = 0, lat = 0, lng = 0;

    while (index < encoded.length) {
      // Latitude
      let byte, shift = 0, result = 0;
      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
      lat += (result & 1) ? ~(result >> 1) : (result >> 1);

      // Longitude
      shift = 0, result = 0;
      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
      lng += (result & 1) ? ~(result >> 1) : (result >> 1);

      coordinates.push([lat / multiplier, lng / multiplier]);
    }

    return coordinates;
  }
    const navigate_rating = (data) => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "Rating", params: { data: data } }],
            })
        );
    }

    const navigate_complaint_category = (trip_id) => {
        navigation.navigate("ComplaintCategory", { trip_id: trip_id });
    }

    return (
     <SafeAreaView style={{flex:1,backgroundColor:theme.background}}>
  <StatusBar
    translucent
    backgroundColor="transparent"
    barStyle="dark-content"
  />
  <View
    style={{
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.background,
      padding: 20,
      flexDirection: 'row',
    }}>
    {from == 'trips' && (
      <TouchableOpacity
        activeOpacity={1}
        onPress={go_back.bind(this)}
        style={{
          width: '10%',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}>
        <Icon
          type={Icons.MaterialIcons}
          name="arrow-back"
          color={theme.textPrimary}
          style={{fontSize: 30}}
        />
      </TouchableOpacity>
    )}
    <View
      style={{
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        numberOfLines={1}
        style={{
          color: theme.textPrimary,
          fontSize: f_25,
          fontFamily: regular,
        }}>
        <Text style={{fontFamily: regular}}>{app_name}</Text> {t('Receipt')}
      </Text>
    </View>
  </View>

  {on_load == 1 && (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{padding: 20}}>
        <View style={{width: '100%'}}>
          <Text
            style={{
              letterSpacing: 1.5,
              lineHeight: 40,
              color: theme.textPrimary,
              fontSize: f_25,
              fontFamily: regular,
              textAlign: 'center',
            }}>
            {t('Dear')}{' '}
            <Text style={{fontFamily: regular}}>
              {data.customer.first_name}
            </Text>
            , {t('Thanks for using')} {app_name}
          </Text>
          <View style={{margin: 5}} />
          <Text
            style={{
              color: theme.textSecondary,
              fontSize: f_s,
              fontFamily: regular,
              textAlign: 'center',
            }}>
            {t('We hope you enjoyed your ride')}
          </Text>
        </View>

        <View style={{margin: 20}} />
        {/* Total Row */}
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '50%', alignItems: 'flex-start'}}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: theme.textPrimary,
                  fontSize: f_25,
                  fontFamily: regular,
                }}>
                {t('Total')}
              </Text>
              <View style={{margin: 5}} />
              <Icon
                type={Icons.MaterialIcons}
                name="credit-card"
                color={theme.textPrimary}
                style={{fontSize: 30}}
              />
            </View>
          </View>
          <View style={{width: '50%', alignItems: 'flex-end'}}>
            <Text
              style={{
                color: theme.textPrimary,
                fontSize: f_25,
                fontFamily: regular,
              }}>
              {global.currency}{data.total}
            </Text>
          </View>
        </View>

        {/* Ride Price */}
        <View style={{margin: 5}} />
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '50%'}}>
            <Text
              style={{
                color: theme.textSecondary,
                fontSize: f_xs,
                fontFamily: normal,
              }}>
              {t('Ride Price')}
            </Text>
          </View>
          <View style={{width: '50%', alignItems: 'flex-end'}}>
            <Text
              style={{
                color: theme.textSecondary,
                fontSize: f_s,
                fontFamily: normal,
              }}>
              {global.currency}{data.sub_total}
            </Text>
          </View>
        </View>

        {/* Tax */}
        <View style={{margin: 5}} />
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '50%'}}>
            <Text
              style={{
                color: theme.textSecondary,
                fontSize: f_xs,
                fontFamily: normal,
              }}>
              {t('Tax')}
            </Text>
          </View>
          <View style={{width: '50%', alignItems: 'flex-end'}}>
            <Text
              style={{
                color: theme.textSecondary,
                fontSize: f_s,
                fontFamily: normal,
              }}>
              {global.currency}{data.tax}
            </Text>
          </View>
        </View>

        {/* Payment Mode */}
        <View style={{margin: 5}} />
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '50%'}}>
            <Text
              style={{
                color: theme.textSecondary,
                fontSize: f_xs,
                fontFamily: normal,
              }}>
              {t('Payment Mode')}
            </Text>
          </View>
          <View style={{width: '50%', alignItems: 'flex-end'}}>
            <Text
              style={{
                color: theme.textSecondary,
                fontSize: f_s,
                fontFamily: normal,
              }}>
              {data.payment_mode}
            </Text>
          </View>
        </View>

        {/* Tip */}
        <View
          style={{
            flexDirection: 'row',
            borderTopWidth: 0.5,
            borderColor: theme.divider,
            marginTop: 10,
            paddingTop: 10,
          }}>
          <View style={{width: '50%'}}>
            <Text
              style={{
                color: theme.textSecondary,
                fontSize: f_xs,
                fontFamily: normal,
              }}>
              Tip
            </Text>
          </View>
          <View style={{width: '50%', alignItems: 'flex-end'}}>
            <Text
              style={{
                color: theme.textSecondary,
                fontSize: f_s,
                fontFamily: normal,
              }}>
              {global.currency}{data.tip}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          borderWidth: 1,
          marginVertical: 10,
          borderColor: theme.textPrimary,
          borderStyle: 'dashed',
        }}
      />

      {/* Booking Details */}
      <View style={{padding: 20}}>
        <Text
          style={{
            color: theme.textPrimary,
            fontSize: f_m,
            fontFamily: normal,
          }}>
          {t('Booking Details')}
        </Text>
        <View style={{margin: 5}} />
        <Text
          style={{
            color: theme.textSecondary,
            fontSize: f_xs,
            fontFamily: regular,
          }}>
          {data.trip_type_name} - {data.vehicle_type} | {data.distance} {t('km')}
        </Text>

        {/* Pickup & Drop Addresses */}
        <View style={{width: '100%', marginTop: 20, borderRadius: 12, padding: 16}}>
          <TouchableOpacity activeOpacity={0.8} style={{width: '100%', paddingVertical: 12}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: 'rgba(76, 217, 100, 0.2)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12,
                }}>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: '#4CD964',
                  }}
                />
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: theme.textSecondary,
                    fontSize: f_s,
                    fontFamily: regular,
                    marginBottom: 4,
                  }}>
                  {t('Pickup Address')}
                </Text>
                <Text
                  numberOfLines={2}
                  style={{
                    color: theme.textPrimary,
                    fontSize: f_xs,
                    fontFamily: regular,
                    lineHeight: 20,
                  }}>
                  {data.actual_pickup_address}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {data.trip_type != 2 && (
            <TouchableOpacity activeOpacity={0.8} style={{width: '100%', paddingVertical: 12}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: 'rgba(255, 59, 48, 0.2)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                  }}>
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: '#FF3B30',
                    }}
                  />
                </View>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      color: theme.textSecondary,
                      fontSize: f_s,
                      fontFamily: regular,
                      marginBottom: 4,
                    }}>
                    {t('Drop Address')}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={{
                      color: theme.textPrimary,
                      fontSize: f_xs,
                      fontFamily: regular,
                      lineHeight: 20,
                    }}>
                    {data.actual_drop_address}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <View style={{flex:1,width:'100%',height:200,borderRadius:50,elevation:3}}>
                {global.tile==1&&<RouteMappy
                    isDark={isDark}
                    enableTripTracking={true}
                        ref={map_ref}
                        style={styles.map}
                        onMapReady={() => {
                          console.log('Map ready callback called');
                          
                        }}
                        initialRegion={props.initial_region}
                       
                        // routeCoordinates={coords}
                        screen="home"
                  
                        pickupLocation={
                           {
                                latitude: parseFloat(data.actual_pickup_lat),
                                longitude: parseFloat(data.actual_pickup_lng),
                             
                              }
                            
                        }
                           routeCoordinates={coords&&coords||[]}
                        dropLocation={
                            {
                                latitude: parseFloat(data.actual_drop_lat),
                                longitude: parseFloat(data.actual_drop_lng),
                  
                              }
                        }
                
                  
                      />}
                      {
                        global.tiles==2&&
                        <MapView
            provider={PROVIDER_GOOGLE}
            ref={map_ref}
            style={styles.map}
            region={props.initial_region}
            // showsUserLocation={true}
            showsMyLocationButton={false}
          >
           
                <Marker
                  coordinate={{
                    latitude: data.actual_pickup_lat,
                    longitude: data.actual_pickup_lng,
                  }}
                  key={`android_pickup_${data.actual_pickup_lat}_${data.actual_pickup_lng}`}
                  tracksViewChanges={false}
                  image={require('../assets/img/pickup.png')} // Direct image reference
                >
                 
                </Marker>

                <Marker
                  coordinate={{
                    latitude: data.actual_drop_lat,
                    longitude: data.actual_drop_lng,
                  }}
                  key={`android_dest_${data.actual_drop_lat}_${data.actual_drop_lng}`}
                  tracksViewChanges={false}
                  image={require('../assets/img/destination.png')} // Direct image reference
                >
                  
                </Marker>

                <Polyline
                  coordinates={coords}
                  strokeColor={colors.theme_bg}
                  strokeWidth={4} // Thicker for Android
                  key={`android_poly_${coords.length}`}
                />
          
          </MapView>
                      }
              </View>
      </View>

      {/* Support Section */}
      <View
        style={{
          borderTopWidth: 1,
          marginVertical: 10,
          borderColor: theme.textPrimary,
          borderStyle: 'dashed',
        }}
      />
      {from != 'home' && (
        <View style={{padding: 20}}>
          <Text
            style={{
              color: theme.textPrimary,
              fontSize: f_m,
              fontFamily: normal,
            }}>
            {t('Need Help')} ?
          </Text>
          <View style={{margin: 5}} />
          <Text
            style={{
              color: theme.textSecondary,
              fontSize: f_xs,
              fontFamily: regular,
            }}>
            {t('Feel free register your complaint if you face any struggles...')}
          </Text>
          <View style={{margin: 5}} />
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={navigate_complaint_category.bind(this, trip_id)}
              activeOpacity={1}
              style={{
                flexDirection: 'row',
                borderWidth: 0.5,
                borderRadius: 10,
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
              }}>
              <Icon
                type={Icons.AntDesign}
                name="exclamationcircle"
                color={theme.textPrimary}
                style={{fontSize: 20}}
              />
              <View style={{margin: 5}} />
              <Text
                style={{
                  color: theme.textPrimary,
                  fontSize: f_s,
                  fontFamily: bold,
                }}>
                {t('Support')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={{marginBottom: '40%'}} />
    </ScrollView>
  )}

  {/* Ratings footer buttons – use theme.primary and theme.onPrimary */}
  {data.ratings == 0 && from == 'home' && (
    <View
      style={{
        position: 'absolute',
        bottom: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        onPress={handle_back_button_click.bind(this)}
        activeOpacity={1}
        style={{
          width: '45%',
          backgroundColor: theme.primary,
          borderRadius: 10,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: theme.onPrimary,
            fontSize: f_m,
            fontFamily: regular,
          }}>
          {t('Home')}
        </Text>
      </TouchableOpacity>
      <View style={{width: '3%'}} />
      <TouchableOpacity
        onPress={navigate_rating.bind(this, data)}
        activeOpacity={1}
        style={{
          width: '45%',
          backgroundColor: theme.primary,
          borderRadius: 10,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: theme.onPrimary,
            fontSize: f_m,
            fontFamily: regular,
          }}>
          {t('Write Review')}
        </Text>
      </TouchableOpacity>
    </View>
  )}

  <Toast />
</SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: screenHeight,
        width: screenWidth,
    },
     map: {
    ...StyleSheet.absoluteFillObject,
    
  },
});
function mapStateToProps(state) {

  return {
    initial_lat: state.booking.initial_lat,
    initial_lng: state.booking.initial_lng,
    initial_region: state.booking.initial_region,
  };
}

export default connect(mapStateToProps, null)(Bill);
