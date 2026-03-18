import { useTranslation } from "react-i18next";
import '../languages/i18next';

import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  api_url,
  app_name,
  bold,
  f_25,
  f_l,
  f_m,
  f_xl,
  get_referral_message,
  no_data_loader,
  normal,
  profile_background,
  refer,
  regular,
  screenHeight,
  screenWidth,
} from "../config/Constants";
import Toast from "react-native-toast-message";

import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import * as colors from "../assets/css/Colors";
import { Text } from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";
import Icon, { Icons } from "../components/Icons";
import LottieView from "lottie-react-native";

import NetInfo from "@react-native-community/netinfo";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useTheme } from "../context/ThemeContext";

const Refer = (props) => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const [msg, setMsg] = useState("your referral code is");
  const [refferalMessage, setRefferalMessage] = useState("");
  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };
  const [isLoading, setIsLoading] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const { theme, isDark } = useTheme(); // Using theme from context

  useEffect(() => {
    referral();
  }, []);
  useEffect(() => {
    const checkConnection = () => {
      NetInfo.fetch().then((state) => {
        if (!state.isConnected) {
          navigation.navigate("NoInternet");
        }
      });
    };

    // Call the function immediately
    checkConnection();

    // Set up interval to call it every 10 seconds
    const interval = setInterval(checkConnection, 10000); // 10 seconds

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = () => {
    ReactNativeHapticFeedback.trigger("impactLight", options);

    Clipboard.setString(referralCode); // Copy referral code to clipboard
 showToast("success", t('Success'), t('Referral Code Copied'));
   
  };
 const showToast = (type, title, message) => {
    ReactNativeHapticFeedback.trigger("impactLight", options);

    Toast.show({
      type: type ,
      text1: title,
      text2: message,
      visibilityTime: 5000,
      position: "top", // top, bottom
    });
  };
  const referral = async () => {
    setIsLoading(true);
    console.log("referral");
    console.log(api_url + get_referral_message);
    console.log({
      driver_id: global.id,
      lang: i18n.language,
    });
    try {
      const response = await axios.post(api_url + get_referral_message, {
        driver_id: global.id,
        lang: i18n.language,
      });
      setReferralCode(response.data.code);
      setRefferalMessage(response.data.result.referral_message);
    } catch (error) {
      console.error(error);
       showToast(
         "error",
         t('Error'),
         t('Sorry something went wrong')
       );
    } finally {
      setIsLoading(false);
    }
  };

const openSms = async () => {
  try {
    const appUrl =
      Platform.OS === "ios"
        ? "https://apps.apple.com/in/app/Hydromobility EV-driver/id6738737860"
        : "https://play.google.com/store/apps/details?id=com.hydromobility.driver&hl=en";

    await Share.share({
      title: "Share your Referral Code",
      message: `${msg}${app_name} App is now available on ${
        Platform.OS === "ios" ? "App Store" : "Google Play Store"
      }. Your Referral Code is ${referralCode}`,
      url: appUrl,
    });
  } catch (error) {
    showToast("error", t("Error"), error.message);
  }
};
  const go_back = () => {
    ReactNativeHapticFeedback.trigger("impactLight", options);

    navigation.goBack();
  };
  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:theme.background }}>
        <StatusBar  backgroundColor="transparent" barStyle="dark-content" />     

      <View
        style={{
          height: 70,
          backgroundColor: theme.background,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={go_back.bind(this)}
          style={{
            width: "15%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon
            type={Icons.MaterialIcons}
            name="arrow-back"
            color={theme.textPrimary}
            style={{ fontSize: 30 }}
          />
        </TouchableOpacity>
        <View
          activeOpacity={1}
          style={{
            width: "85%",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              width: undefined,
              height: undefined,
              color: theme.textPrimary,
              fontSize: f_xl,
              fontFamily: regular,
            }}
          >
            {t('Refer And Earn')}
          </Text>
        </View>
      </View>

      {referralCode ? (
        <ScrollView style={{ padding: 20 }}>
         
          <View
            style={{
              height: 350,
              width: "100%",
              borderRadius: 25,
              alignSelf: "center",
            }}
          >
            <Image
              style={{ height: undefined, width: undefined, flex: 1 }}
              source={refer}
            />
          </View>
          
          <View>
            <View style={{ margin: 10 }} />
            <Text
              style={{
                color: theme.textPrimary,
                fontSize: f_m,
                fontFamily: regular,
                marginBottom: 10,
                textAlign: "center",
              }}
            >
              {refferalMessage}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: theme.surface,

              margin: 10,
              borderRadius: 10,

              flexDirection: "row",
              width: "95%",
            borderWidth:.5,borderColor:theme.divider,
              height: 70,
            }}
          >
            <View
              style={{
                width: "80%",
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <TextInput
                style={{
                  color: theme.textPrimary,
                  fontSize: f_l,
                  fontFamily: regular,
                  paddingHorizontal: 20,
                }}
                value={referralCode}
                editable={false}
              />
            </View>
            <TouchableOpacity
              onPress={copyToClipboard}
              style={{
                backgroundColor: colors.theme_bg,
                width: "20%",
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon
                type={Icons.Feather}
                name="copy"
                color={theme.textPrimary}
                style={{ fontSize: 22 }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={openSms}
            style={{
              margin: 10,
              borderRadius: 10,
              height: 50,
              width: "95%",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              backgroundColor: theme.primary,
            }}
          >
            <Text
              style={{
                color: theme.onPrimary,
                fontSize: f_m,
                fontFamily: regular,
                margin: 10,
              }}
            >
              {t('Share')}
            </Text>
            <Icon
              type={Icons.MaterialIcons}
              name="share"
              color={theme.onPrimary}
              style={{ fontSize: 22 }}
            />
          </TouchableOpacity>
          <View style={{ margin: '10%' }} />
        </ScrollView>
      ) : (
        <View
          style={{
            height: 500,
            width: "80%",
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <LottieView
            source={no_data_loader}
            style={{ flex: 1 }}
            autoPlay
            loop
          />
        </View>
      )}
      <Toast />      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Refer;
