import { useTranslation } from "react-i18next";
import '../languages/i18next.js';

import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  Image,
  FlatList,
  TouchableOpacity,
  I18nManager,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  screenHeight,
  screenWidth,
  normal,
  no_data,
  bold,
  loader,
  distance_icon,
  earnings,
  api_url,
  left_arrow,
  right_arrow,
  f_s,
  f_tiny,
  f_xl,
  f_35,
  regular,
} from "../config/Constants";
import DropShadow from "react-native-drop-shadow";
import axios from "axios";

import LottieView from "lottie-react-native";
import Icon, { Icons } from "../components/Icons";
import moment from 'moment';

import { ExpandableCalendar, CalendarProvider, LocaleConfig } from "react-native-calendars";

import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext.js";

const Earnings = (props) => {
  const {t, i18n} = useTranslation();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [current_date, setCurrentDate] = useState(moment());
  const [data, setData] = useState([]);
  const [today_earning, setTodayEarning] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const { theme, isDark, toggleTheme } = useTheme(); 

  const call_get_earnings = date => {
    if (!date) return;

    console.log('earning date:', date);
    setLoading(true);
    axios({
      method: 'post',
      url: api_url + earnings,
      data: {date: date, id: global.id},
    })
      .then(async response => {
        setData(response.data.result.earnings);
        setTodayEarning(response.data.result.today_earnings);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        alert(t('Sorry something went wrong'))
        
      });
  };

  const date_change = date => {
    if (!date) {
      console.warn('date_change called with undefined date');
      return;
    }

    const formattedDate = moment(date).locale('en').isValid()
      ? moment(date).locale('en').format('YYYY-MM-DD')
      : date;
    setSelectedDate(formattedDate);
    call_get_earnings(formattedDate);
  };

  useEffect(() => {
       moment.locale('en');
    const today = moment().locale('en').format('YYYY-MM-DD');
    setSelectedDate(today);
    call_get_earnings(today);
  }, []);

  if (!selectedDate) {
    return null;
  }

  LocaleConfig.locales['en'] = {
    monthNames: [
      t('January'),
      t('February'),
      t('March'),
      t('April'),
      t('May'),
      t('June'),
      t('July'),
      t('August'),
      t('September'),
      t('October'),
      t('November'),
      t('December'),
    ],
    monthNamesShort: [
      t('Jan'),
      t('Feb'),
      t('Mar'),
      t('Apr'),
      t('May'),
      t('Jun'),
      t('Jul'),
      t('Aug'),
      t('Sep'),
      t('Oct'),
      t('Nov'),
      t('Dec'),
    ],
    dayNames: [
      t('Sunday'),
      t('Monday'),
      t('Tuesday'),
      t('Wednesday'),
      t('Thursday'),
      t('Friday'),
      t('Saturday'),
    ],
    dayNamesShort: [
      t('Sun'),
      t('Mon'),
      t('Tue'),
      t('Wed'),
      t('Thu'),
      t('Fri'),
      t('Sat'),
    ],
    today: t('Today'),
  };

  LocaleConfig.defaultLocale = 'en';

  const go_back = () => {
    navigation.goBack();
  };

  const show_list = ({item}) => (
    <View style={{flexDirection: 'row', width: '100%', marginBottom: 20}}>
      <View style={{width: '15%'}}>
        <View style={{height: 30, width: 30}}>
          <Image
            source={distance_icon}
            style={{height: undefined, width: undefined, flex: 1, tintColor: theme.textSecondary}}
          />
        </View>
      </View>
      <View style={{width: '55%', justifyContent: 'center'}}>
        <Text
          numberOfLines={1}
          style={{
            color: theme.textPrimary,
            fontSize: f_s,
            fontFamily: normal,
          }}>
          #{item.trip_id}
        </Text>
        <View style={{margin: 2}} />
        <Text
          numberOfLines={1}
          style={{
            color: theme.textSecondary,
            fontSize: f_tiny,
            fontFamily: normal,
          }}>
          {moment(item.created_at).format('hh:mm A')}
        </Text>
      </View>
      <View
        style={{
          width: '30%',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
        <Text
          numberOfLines={1}
          style={{
            color: theme.textPrimary,
            fontSize: f_s,
            fontFamily: normal,
          }}>
          {global.currency}
          {item.amount}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.background}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDark ? "light-content" : "dark-content"}
      />
      <View style={[styles.header, {backgroundColor: theme.background}]}>
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
            {t('Earnings')}
          </Text>
        </View>
      </View>
      <ScrollView style={{backgroundColor: theme.background}}>
        {selectedDate && (
          <CalendarProvider date={selectedDate} onDateChanged={date_change}>
            <ExpandableCalendar
              current={selectedDate}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  marked: true,
                  selectedColor: theme.primary,
                },
              }}
              onDayPress={day => {
                date_change(day.dateString);
              }}
              theme={{
                arrowColor: theme.primary,
                todayTextColor: theme.primary,
                selectedDayBackgroundColor: theme.primary,
                textSectionTitleColor: theme.textPrimary,
                dayTextColor: theme.textPrimary,
                selectedDayTextColor: theme.onPrimary,
                monthTextColor: theme.textPrimary,
                textDisabledColor: theme.textSecondary,
                calendarBackground: theme.surface,
                backgroundColor: theme.surface,
                elevation: 0,
                borderWidth: 0,
                shadowColor: 'transparent',
                shadowOffset: {width: 0, height: 0},
                shadowOpacity: 0,
                shadowRadius: 0,
              }}
              disableAllTouchEventsForDisabledDays={true}
              hideExtraDays={true}
              pastScrollRange={12}
              futureScrollRange={12}
            />
          </CalendarProvider>
        )}
        <View style={{margin: 10}} />
        <DropShadow
          style={{
            width: '90%',
            marginBottom: 5,
            marginTop: 5,
            shadowColor: theme.shadow_color,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.1,
            shadowRadius: Platform.OS=='ios'?5:2,
            marginLeft: '5%',
          }}>
          <View
            style={{
              backgroundColor: theme.surface,
              width: '100%',
              padding: 20,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}>
            <Text
              numberOfLines={1}
              style={{
                color: theme.textSecondary,
                fontSize: f_s,
                fontFamily: normal,
              }}>
              {t('Total Earnings')}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                color: theme.textPrimary,
                fontSize: f_35,
                fontFamily: regular,
                margin: 10,
              }}>
              {global.currency}
              {today_earning}
            </Text>
          </View>
          <View style={{margin: 10}} />
          <View
            style={{
              backgroundColor: theme.surface,
              width: '100%',
              padding: 20,
              justifyContent: 'center',
              borderRadius: 10,
            }}>
            <Text
              numberOfLines={1}
              style={{
                color: theme.textSecondary,
                fontSize: f_s,
                fontFamily: normal,
              }}>
              {t('Trip Histories')}
            </Text>
            <View style={{margin: 10}} />
            {loading == true ? (
              <View
                style={{
                  height: 100,
                  width: 100,
                  alignSelf: 'center',
                  marginTop: '30%',
                }}>
                <LottieView style={{flex: 1}} source={loader} autoPlay loop />
              </View>
            ) : (
              <View>
                {data.length != 0 ? (
                  <FlatList
                    data={data}
                    renderItem={show_list}
                    keyExtractor={item => item.id}
                  />
                ) : (
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{height: 200, width: 200, marginTop: 10}}>
                      <Image
                        source={no_data}
                        style={{
                          height: undefined, 
                          width: undefined, 
                          flex: 1
                     
                        }}
                      />
                    </View>
                    <View style={{margin: 10}} />
                    <Text
                      numberOfLines={1}
                      style={{
                        color: theme.textSecondary,
                        fontSize: f_s,
                        fontFamily: normal,
                      }}>
                      {t('Sorry no data found')}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </DropShadow>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: screenHeight,
    width: screenWidth,
  },
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Earnings;