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
import { screenHeight, screenWidth, normal, bold, api_url, get_bill, regular, app_name, img_url, f_25, f_s, f_xs, f_m } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import axios from 'axios';
import { SafeAreaView } from "react-native-safe-area-context";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import Toast from "react-native-toast-message";
import { connect } from "react-redux";
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
              {data.driver.first_name}
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

  
      </View>

      <View
        style={{
          borderTopWidth: 1,
          marginVertical: 10,
          borderColor: theme.textPrimary,
          borderStyle: 'dashed',
        }}
      />
    

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
