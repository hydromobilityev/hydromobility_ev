import { useTranslation } from "react-i18next";
import '../languages/i18next';

import React, { useState, useEffect, useRef } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
  StatusBar,
  FlatList
} from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import * as colors from '../assets/css/Colors';
import { screenHeight, screenWidth, bold, get_notification_messages, notification_bell, api_url, regular, loader, f_s, f_xs, f_xl } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import DropShadow from "react-native-drop-shadow";
import axios from 'axios';
import Moment from 'moment';
import LottieView from 'lottie-react-native';
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from 'react-native-reanimated';
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import moment from 'moment';
import 'moment/locale/ar'; // Arabic locale
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useTheme } from "../context/ThemeContext";
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const Notifications = (props) => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const viewableItems = useSharedValue([]);
  const { theme, isDark } = useTheme(); // Using theme from context



  useEffect(() => {
     moment.locale('en');
    const unsubscribe = navigation.addListener("focus", async () => {
      call_get_notification_messages();
    });
    return (
      unsubscribe
    );
  }, []);
  const showToast = (type, title, message) => {
    ReactNativeHapticFeedback.trigger("impactLight", haptic_option);
    Toast.show({
      type: type ,
      text1: title,
      text2: message,
      visibilityTime: 5000,
      position: "top", // top, bottom
    });
  };
  const call_get_notification_messages = () => {    
    setLoading(true);
    console.log(api_url + get_notification_messages);
    console.log({ driver_id: global.id, lang: i18n.language });
    axios({
      method: 'post',
      url: api_url + get_notification_messages,
      data: { driver_id: global.id, lang: i18n.language }
    })
      .then(async response => {
        setData(response.data.result)
        setLoading(false);
       
      })
      .catch(error => {
        setLoading(false);
         showToast("error", t('Error'), t('Sorry something went wrong'));
     
      });
  }

  const navigate_notification_details = (data) => {
    navigation.navigate('NotificationDetails', { data: data });
  }


const renderItem = ({ item }) => (
    <DropShadow
      style={{
        width: '100%',
        marginVertical: 6,
        shadowColor: theme.shadow_color,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 0,
      }}
    >
      <TouchableOpacity
        onPress={() => navigate_notification_details(item)}
        activeOpacity={0.9}
        style={{
          flexDirection: 'row',
          backgroundColor: theme.surface,
          padding: 16,
          borderRadius: 14,
          alignItems: 'center',
        }}
      >
        {/* Icon */}
        <View style={{ width: 50, height: 50, borderRadius: 12, overflow: 'hidden' }}>
          <Image
            source={notification_bell}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        </View>

        {/* Spacer */}
        <View style={{ width: 12 }} />

        {/* Text Content */}
        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={1}
            style={{
              color: theme.textPrimary,
              fontSize: 16,
              fontFamily:regular,
              marginBottom: 4,
            }}
          >
            {item.title}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              color: theme.textSecondary,
              fontSize: 14,
              fontFamily:regular,
              lineHeight: 20,
            }}
          >
            {item.message}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: theme.textSecondary,
              fontSize: 12,
              fontFamily:regular,
              marginTop: 6,
            }}
          >
            {Moment(item.created_at).fromNow()}
          </Text>
        </View>
      </TouchableOpacity>
    </DropShadow>
  );
  return (
     <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={theme.background === '#000000' ? 'light-content' : 'dark-content'}
      />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}
        >
          <Icon type={Icons.MaterialIcons} name="arrow-back" color={theme.textPrimary} style={{ fontSize: 30 }} />
        </TouchableOpacity>
        <View style={{ width: '85%', justifyContent: 'center' }}>
          <Text style={{ color: theme.textPrimary, fontSize: 20, fontFamily:regular }}>
            {t('Notifications')}
          </Text>
        </View>
      </View>

      {/* Content */}
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <LottieView style={{ width: 120, height: 120 }} source={loader} autoPlay loop />
        </View>
      ) : data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10 }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: theme.textSecondary, fontSize: 16 }}>{t('No notifications found')}</Text>
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
  header: {
    height: 70,
    backgroundColor: colors.lite_bg,
    flexDirection: 'row',
    alignItems: 'center'
  },
});

export default Notifications;