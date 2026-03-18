import { useTranslation } from "react-i18next";
import '../languages/i18next';

import React, { useState, useRef } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  StatusBar
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as colors from '../assets/css/Colors';
import { normal, bold, regular, forgot_password, api_url, f_l, f_xs, f_m } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import PhoneInput from "react-native-phone-input";
import axios from 'axios';
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useTheme } from "../context/ThemeContext";
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const Forgot = (props) => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState(false);
  const [formattedValue, setFormattedValue] = useState("");
  const phone = useRef(null);
  const { theme, toggleTheme, isDark } = useTheme();

  const go_back = () => {
    navigation.goBack();
  }
  const showToast = (type, title, message) => {
ReactNativeHapticFeedback.trigger("impactHeavy", options);

    Toast.show({
      type: type ,
      text1: title,
      text2: message,
      visibilityTime: 5000,
      position: "top", // top, bottom
    });
  };
  const check_valid = () => {
    if ('+' + phone.current?.getCountryCode() == phone.current?.getValue()) {
      setValidation(false)
      //alert('Enter your phone number')
       showToast(
         "error",
         t('Validation error'),
         t('Please Enter Valid Phone Number')
       );
    } else if (!phone.current?.isValidNumber()) {
      setValidation(false)
       showToast(
         "error",
         t('Validation error'),
         t('Please Enter Valid Phone Number')
       );
     
    } else {
      setValidation(true)
      // alert(phone.current?.getValue())
      setFormattedValue(phone.current?.getValue())
      call_forgot_password(phone.current?.getValue());
    }
  }


  const call_forgot_password = async (phone_with_code) => {
    setLoading(true);
    await axios({
      method: 'post',
      url: api_url + forgot_password,
      data: { phone_with_code: phone_with_code }
    })
      .then(async response => {
        setLoading(false);
        if (response.data.status == 1) {
          navigate(response.data.result);
        } else {
           showToast(
             "error",
             t('Error'),
             t('Please enter your registered phone number')
           );
       
        }
      })
      .catch(error => {
        setLoading(false);
        showToast("error", t('Error'), t('Sorry something went wrong'));
    
      });
  }

  const navigate = async (data) => {
    navigation.navigate('OTP', { otp: data.otp, id: data.id, from: "forgot", phone_with_code: phone.current?.getValue(), country_code: "+" + phone.current?.getCountryCode(), phone_number: value });
  }

  return (
   <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
  <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

  {/* Header */}
  <View style={{ height: 70, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
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
    <View style={{ width: '85%' }} />
  </View>

  <View style={{ marginVertical: 20 }} />

  {/* Title & Subtitle */}
  <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
    <Text style={{ color: theme.textPrimary, fontSize: f_l, fontFamily: regular }}>
      {t('Enter your phone number')}
    </Text>
    <View style={{ height: 5 }} />
    <Text style={{
      color: theme.textSecondary,
      fontSize: f_xs,
      fontFamily: normal,
      textAlign: 'center',
      lineHeight: 20
    }}>
      {t('Please enter your phone number for reset the password')}
    </Text>
  </View>

  <View style={{ marginVertical: 20 }} />

  {/* Phone Input */}
  <View style={{ width: '85%', alignSelf: 'center' }}>
    <PhoneInput
      style={{
      
        backgroundColor: theme.surface,
        borderRadius: 12,
        paddingHorizontal: 12,
       
          borderWidth: .5,
             height: 60,
        borderColor: theme.divider,
      }}
      flagStyle={{
        width: 32,
        height: 24,
        borderRadius: 4,
      }}
      ref={phone}
      initialCountry="ng"
      offset={10}
      textStyle={{
        fontSize: 18,
        fontFamily: regular,
        color: theme.textPrimary,
      }}
      textProps={{
        placeholder: t('Phone Number'),
        placeholderTextColor: theme.textSecondary,
      }}
      autoFormat={true}
    />

    <View style={{ marginVertical: 30 }} />

    {/* Next Button */}
    <TouchableOpacity
      onPress={check_valid.bind(this)}
      activeOpacity={0.8}
      style={{
        width: '100%',
        backgroundColor: theme.primary,
        borderRadius: 12,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: theme.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 6,
      }}
    >
      <Text style={{ color: theme.onPrimary, fontSize: f_m, fontFamily: normal }}>
        {t('Next')}
      </Text>
    </TouchableOpacity>
  </View>

  <Toast />
</SafeAreaView>

  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: colors.lite_bg,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textinput: {
    fontSize: f_l,
    color: colors.grey,
    fontFamily: regular,
    height: 60,
    backgroundColor: '#FAF9F6'
  },
  flag_style: {
    width: 38,
    height: 24
},
country_text: {
    fontSize: 18,
    borderBottomWidth: 1,
    paddingBottom: 8,
    height: 35,
    fontFamily: regular,
    color: colors.theme_fg_two
},
});

export default Forgot;