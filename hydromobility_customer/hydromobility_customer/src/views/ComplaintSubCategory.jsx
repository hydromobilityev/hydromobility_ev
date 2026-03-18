import { useTranslation } from "react-i18next";
import '../languages/i18next';

import React, { useState, useEffect, useRef } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  FlatList
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as colors from '../assets/css/Colors';
import { screenHeight, screenWidth, bold, regular, complaint_sub_categories, api_url, loader, f_s, f_xl, normal } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from 'react-native-reanimated';
import { SafeAreaView } from "react-native-safe-area-context";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};
import Toast from "react-native-toast-message";
import DropShadow from "react-native-drop-shadow";
import { useTheme } from "../context/ThemeContext";

const ComplaintSubCategory = (props) => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme, isDark } = useTheme();

  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const [trip_id, setTripId] = useState(route.params.trip_id);
  const [complaint_category_id, setComplaintCategoryId] = useState(route.params.complaint_category_id);
  const [complaint_category_name, setComplaintCategoryName] = useState(route.params.complaint_category_name);
  const viewableItems = useSharedValue([]);

  const go_back = () => {
    navigation.goBack();
  }

  useEffect(() => {
    call_complaint_sub_categories();
  }, []);
  const showToast = (type, title, message) => {
    ReactNativeHapticFeedback.trigger("impactHeavy", options);

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
  const call_complaint_sub_categories = () => {
    setLoading(true);
    axios({
      method: 'post',
      url: api_url + complaint_sub_categories,
      data: { lang: i18n.language, complaint_category_id: complaint_category_id }
    })
      .then(async response => {
        setLoading(false);
        setData(response.data.result)
      })
      .catch(error => {
        setLoading(false);
        showToast("error", t('Error'), t('Sorry something went wrong'));

        // alert(t('Sorry something went wrong'))
      });
  }

  const navigate_complaint = (complaint_sub_category_id, sub_category_data) => {
    navigation.navigate("CreateComplaint", {
      trip_id: trip_id,
      complaint_category_id: complaint_category_id,
      complaint_sub_category_id: complaint_sub_category_id,
      complaint_category_name: complaint_category_name,
      sub_category_data: sub_category_data
    })
  }



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {/* Header */}
      <View style={{
        height: 60,
        backgroundColor: theme.background,
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={go_back.bind(this)}
          style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}
        >
          <Icon
            type={Icons.MaterialIcons}
            name="arrow-back"
            color={theme.textPrimary}
            style={{ fontSize: 30 }}
          />
        </TouchableOpacity>

        <View
          style={{ width: '85%', alignItems: 'flex-start', justifyContent: 'center' }}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ color: theme.textPrimary, fontSize: f_xl, fontFamily: regular }}
          >
            {complaint_category_name}
          </Text>
        </View>
      </View>

      <View style={{ margin: 5 }} />

      {/* FlatList of Subcategories */}
      <View style={{ paddingHorizontal: 10 }}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <DropShadow
              style={{
                width: "100%",
                marginBottom: 5,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
              }}
            >
              <TouchableOpacity
                activeOpacity={1}
                onPress={navigate_complaint.bind(this, item.id, item)}
                style={{
                  backgroundColor: theme.surface,
                  marginHorizontal: 10,
                  marginBottom: 10,
                  borderRadius: 10,
                  padding: 20,
                }}
              >
                <Text
                  ellipsizeMode="tail"
                  style={{
                    color: theme.textPrimary,
                    fontSize: f_s,
                    fontFamily: regular,
                  }}
                >
                  {item.complaint_sub_category_name}
                </Text>

                <View style={{ margin: 3 }} />

                <Text
                  numberOfLines={1}
                  style={{
                    color: theme.textSecondary,
                    fontSize: f_s,
                    fontFamily: regular,
                  }}
                >
                  {item.short_description}
                </Text>
              </TouchableOpacity>
            </DropShadow>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      <Toast />
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: screenHeight,
    width: screenWidth,
    backgroundColor: colors.theme
  },
  header: {
    height: 60,
    backgroundColor: colors.lite_bg,
    flexDirection: 'row',
    alignItems: 'center'
  },
});

export default ComplaintSubCategory;