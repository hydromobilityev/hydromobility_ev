import {useTranslation} from 'react-i18next';
import '../languages/i18next';

import SegmentedControl from '@react-native-segmented-control/segmented-control';

import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  StatusBar,
  FlatList,
} from 'react-native';
import {useNavigation, CommonActions} from '@react-navigation/native';
import Icon, {Icons} from '../components/Icons';
import {
  normal,
  bold,
  trip_details,
  my_bookings,
  api_url,
  img_url,
  loader,
  no_data_loader,
  cancel,
  f_s,
  f_xs,
  f_tiny,
  f_xl,
  regular,
  logo,
  get_driver_today_bookings,
} from '../config/Constants';
import DropShadow from 'react-native-drop-shadow';
import axios from 'axios';
import moment from 'moment';
import Moment from 'moment';
import LottieView from 'lottie-react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  useDerivedValue,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import 'moment/locale/ar';

import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { useTheme } from '../context/ThemeContext';
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const TodayBookings = props => {
  const {t, i18n} = useTranslation();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(1);
  const viewableItems = useSharedValue([]);
  const [cancellation_statuses, setCancellationStatuses] = useState([6, 7]);
 const { theme, isDark } = useTheme(); 
    const go_back = () => {
        ReactNativeHapticFeedback.trigger('impactLight', options);
        navigation.goBack();
    };
    useEffect(() => {
        if (i18n.language === 'ar') {
        moment.locale('ar');
        } else {
        moment.locale('en');
        }
        call_my_bookings(1);
    }, []);


 
     const call_my_bookings = (fl) => {
         setLoading(true);
         axios({
             method: 'post',
             url: api_url + get_driver_today_bookings,
             data: { driver_id: global.id, lang: i18n.language, filter: fl }
         })
             .then(async response => {
                 setTimeout(function () {
                     setLoading(false);
                     setData(response.data.result)
                 }, 1000)
             })
             .catch(error => {
                 setLoading(false);
                 alert(t('Sorry something went wrong'))
             });
     }
 
     const navigate = (trip_id, status) => {
         if(status == 5){
             navigation.navigate('Bill', { trip_id: trip_id, from: 'trips' })
         }
     }
  const showToast = (type, title, message) => {
    ReactNativeHapticFeedback.trigger('impactHeavy', options);

    Toast.show({
      type: type,
      text1: title,
      text2: message,
      visibilityTime: 5000,
      position: 'top', // top, bottom
    });
  };


  const navigate_home = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Home'}],
      }),
    );
  };

  const ListItem = React.memo(({item, viewableItems}) => {
    const isItemVisible = useDerivedValue(() => {
      return Boolean(
        viewableItems.value
          .filter(vItem => vItem.isViewable)
          .find(viewableItem => viewableItem.item.id === item.id),
      );
    });

    const rStyle = useAnimatedStyle(() => {
      return {
        opacity: withTiming(isItemVisible.value ? 1 : 0, {duration: 150}),
      };
    }, []);

  

    return (
      <Animated.View style={[{width: '100%'}, rStyle]}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={navigate.bind(this, item.id, item.status)}
          style={{alignItems: 'center', borderRadius: 10, padding: 10}}>
          <DropShadow
            style={{
              width: '95%',
              marginVertical: 5,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0.1,
              shadowRadius: 5,
            }}>
            {/* Driver Info Row */}
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: theme.theme_bg_three,
                padding: 15,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}>
              {/* Driver Avatar */}
              <View style={{width: '17%', justifyContent: 'center'}}>
                <Image
                  style={{width: 50, height: 50, borderRadius: 10}}
                  source={{
                    uri: img_url + item.profile_picture,
                    cache: 'force-cache',
                  }}
                  resizeMode="cover"
                />
              </View>

              {/* Driver Name and Rating */}
              <View style={{width: '33%', justifyContent: 'center'}}>
                <Text
                  style={{
                    color: theme.theme_fg_two,
                    fontSize: f_s,
                    fontFamily: bold,
                  }}>
                  {item.customer_name}
                </Text>
                <View style={{margin: 2}} />
                {item.customer_rating && (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name="star" size={20} color={theme.warning} />
                    <Text
                      style={{
                        color: theme.theme_bg_two,
                        fontSize: f_s,
                        fontFamily: bold,
                        marginLeft: 3,
                      }}>
                      {item.customer_rating}
                    </Text>
                  </View>
                )}
              </View>

              {/* Fare */}
              <View
                style={{
                  width: '25%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: theme.text_grey,
                    fontSize: f_xs,
                    fontFamily: normal,
                  }}>
                  {t('Fare')}
                </Text>
                <Text
                  style={{
                    fontSize: f_s,
                    fontFamily: bold,
                    color: theme.theme_fg_two,
                    marginTop: 3,
                  }}>
                  {global.currency}
                  {item.total}
                </Text>
              </View>

              {/* Distance */}
              <View
                style={{
                  width: '25%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: theme.text_grey,
                    fontSize: f_xs,
                    fontFamily: normal,
                  }}>
                  {t('Distance')}
                </Text>
                <Text
                  style={{
                    color: theme.theme_fg_two,
                    fontSize: f_s,
                    fontFamily: bold,
                    marginTop: 3,
                  }}>
                  {item.distance} {t('km')}
                </Text>
              </View>
            </View>

            {/* Divider */}
            <View
              style={{
                borderBottomWidth: 0.5,
                borderColor: theme.grey,
              }}
            />

            {/* Address Section */}
            <View
              style={{
                backgroundColor: theme.theme_bg_three,
                padding: 15,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}>
              <View style={{width: '90%'}}>
                {/* Pickup Address */}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 12,
                      backgroundColor: 'rgba(76, 217, 100, 0.2)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 0,
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
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      color: theme.theme_fg_two,
                      fontSize: f_xs,
                      fontFamily: normal,
                      marginLeft: 5,
                    }}>
                    {item.actual_pickup_address || item.pickup_address}
                  </Text>
                </View>

                {/* Drop Address */}
                {item.trip_type !== 'Rental' && (
                  <>
                    <View
                      style={{
                        height: 20,

                        marginLeft: 3,
                      }}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 5,
                      }}>
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 12,
                          backgroundColor: 'rgba(255, 59, 48, 0.2)',
                          alignItems: 'center',
                          justifyContent: 'center',
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
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          color: theme.theme_fg_two,
                          fontSize: f_xs,
                          fontFamily: normal,
                          marginLeft: 5,
                        }}>
                        {item.actual_drop_address || item.drop_address}
                      </Text>
                    </View>
                  </>
                )}
              </View>

              {/* Date and Time */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    fontSize: f_tiny,
                    fontFamily: normal,
                    color: theme.text_grey,
                  }}>
                  {Moment(item.pickup_date).format('DD-MMM-YYYY')}
                </Text>
                <Text
                  style={{
                    fontSize: f_tiny,
                    fontFamily: normal,
                    color: theme.text_grey,
                  }}>
                  {Moment(item.pickup_date).format('hh:mm a')}
                </Text>
              </View>
            </View>
          </DropShadow>

          {/* Cancellation Overlay */}
          {cancellation_statuses.includes(parseInt(item.status)) && (
            <View
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Image
                style={{width: 100, height: 100}}
                source={cancel}
                resizeMode="contain"
              />
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  });

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        itemVisiblePercentThreshold: 50,
        minimumViewTime: 300,
      },
      onViewableItemsChanged: ({viewableItems: vItems}) => {
        viewableItems.value = vItems;
      },
    },
  ]);

  const keyExtractor = useCallback(item => item.id.toString(), []);

  return (
    <SafeAreaView style={{backgroundColor: theme.background, flex: 1}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <View style={{   height: 60,
    // backgroundColor: theme.theme_bg,
    flexDirection: 'row',
    alignItems: 'center',}}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={go_back.bind(this)}
          style={{
            width: '15%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon
            type={Icons.MaterialIcons}
            name="arrow-back"
            color={theme.textPrimary}
            style={{fontSize: 30}}
          />
        </TouchableOpacity>
        <View
          activeOpacity={1}
          style={{
            width: '85%',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              color: theme.textPrimary,
              fontSize: f_xl,
              fontFamily: regular,
            }}>
            {t('Today Rides')}
          </Text>
        </View>
      </View>

    {loading == true ? (
    <View
      style={{
        height: 100,
        width: 100,
        alignSelf: 'center',
        marginTop: '30%',
      }}>
      <LottieView style={{ flex: 1 }} source={loader} autoPlay loop />
    </View>
  ) : (
    <View>
      {data.length > 0 ? (
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          
          renderItem={({ item }) => (
             <TouchableOpacity
  activeOpacity={0.9}
  onPress={()=>handlePress(item)}
  style={{ alignItems: 'center', padding: 8 }}
>
  <DropShadow
    style={{
      width: '95%',
      marginVertical: 5,
      shadowColor: theme.shadow_color,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    }}
  >
    {/* Main Card Container */}
    <View
      style={{
        backgroundColor: theme.surface,
        borderRadius: 16,
        overflow: 'hidden',
      }}
    >
     
      {/* Driver Info Row */}
      <View
        style={{
          flexDirection: 'row',
          padding: 16,
        }}
      >
        {/* Driver Avatar with subtle shadow */}
        <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
          <View
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Image
              style={{
                width: 56,
                height: 56,
                borderRadius: 12,
             
              }}
              source={{
                uri: img_url + item.profile_picture,
                cache: 'force-cache',
              }}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Driver Name and Rating */}
        <View style={{ width: '30%', justifyContent: 'center', paddingLeft: 12 }}>
          <Text
            style={{
              color: theme.textPrimary,
              fontSize: f_s,
              fontFamily: regular,
              marginBottom: 4,
            }}
            numberOfLines={1}
          >
            {item.driver_name}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon type={Icons.MaterialIcons} name="star" size={16} color="gold" />
            <Text
              style={{
                color: theme.textPrimary,
                fontSize: f_xs,
                fontFamily: regular,
                marginLeft: 4,
              }}
            >
              {item.ratings}
            </Text>
          </View>
        </View>

        {/* Fare and Distance Container */}
        <View style={{ width: '50%', flexDirection: 'row' }}>
          {/* Fare */}
          <View
            style={{
              width: '50%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  color: theme.textSecondary,
                  fontSize: f_xs,
                  fontFamily: regular,
                  marginBottom: 4,
                }}
              >
                {t('Fare')}
              </Text>
              <Text
                style={{
                  fontSize: f_s,
                  fontFamily: regular,
                  color: theme.textPrimary,
                }}
              >
                {global.currency}
                {item.total}
              </Text>
            </View>
          </View>

          {/* Distance */}
          <View
            style={{
              width: '50%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  color: theme.textSecondary,
                  fontSize: f_xs,
                  fontFamily: regular,
                  marginBottom: 4,
                }}
              >
                {t('Distance')}
              </Text>
              <Text
                style={{
                  color: theme.textPrimary,
                  fontSize: f_s,
                  fontFamily: regular,
                }}
              >
                {item.distance} {t('km')}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Divider */}
      <View
        style={{
          height: 1,
          backgroundColor: theme.divider + '30',
          marginHorizontal: 16,
        }}
      />

      {/* Address Section */}
      <View
        style={{
          padding: 16,
        }}
      >
        {/* Pickup Address */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: 'rgba(76, 217, 100, 0.15)',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: '#4CD964',
              }}
            />
          </View>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              color: theme.textPrimary,
              fontSize: f_xs,
              fontFamily: regular,
              flex: 1,
            }}
          >
            {item.actual_pickup_address || item.pickup_address}
          </Text>
        </View>

        {/* Drop Address */}
        {item.trip_type !== 'Rental' && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: 'rgba(255, 59, 48, 0.15)',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}
            >
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: theme.error,
                }}
              />
            </View>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                color: theme.textPrimary,
                fontSize: f_xs,
                fontFamily: regular,
                flex: 1,
              }}
            >
              {item.actual_drop_address || item.drop_address}
            </Text>
          </View>
        )}

        {/* Date and Time */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 16,
            paddingTop: 12,
            borderTopWidth: 1,
            borderTopColor: theme.divider ,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="calendar" size={14} color={theme.textSecondary} />
            <Text
              style={{
                fontSize: f_tiny,
                fontFamily: regular,
                color: theme.textSecondary,
                marginLeft: 6,
              }}
            >
              {Moment(item.pickup_date).format('DD-MMM-YYYY')}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="clock" size={14} color={theme.textSecondary} />
            <Text
              style={{
                fontSize: f_tiny,
                fontFamily: regular,
                color: theme.textSecondary,
                marginLeft: 6,
              }}
            >
              {Moment(item.pickup_date).format('hh:mm a')}
            </Text>
          </View>
        </View>
      </View>
    </View>
  </DropShadow>

  {/* Cancellation Overlay */}
  {cancellation_statuses.includes(parseInt(item.status)) && (
    <View
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
      
        width:'100%'
      }}
    >
      <Image
        style={{ width: 100, height: 100, opacity: 0.8 }}
        source={cancel}
        resizeMode="contain"
      />
      
    </View>
  )}
</TouchableOpacity>

          )}
          initialNumToRender={8}
          maxToRenderPerBatch={5}
          windowSize={7}
          removeClippedSubviews={true}
          updateCellsBatchingPeriod={50}
          ListFooterComponent={<View style={{ margin: '30%' }} />}
        />
      ) : (
        <View
          style={{
            height: 300,
            width: 300,
            alignSelf: 'center',
            marginTop: '30%',
          }}>
          <LottieView style={{ flex: 1 }} source={no_data_loader} autoPlay loop />
        </View>
      )}
    </View>
  )}
      <Toast />
    </SafeAreaView>
  );
};



export default TodayBookings;
