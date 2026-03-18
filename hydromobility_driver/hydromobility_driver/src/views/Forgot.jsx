import { useTranslation } from "react-i18next";
import '../languages/i18next.js';

import React, { useState, useRef } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,

  StatusBar
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { normal, bold, regular, forgot_password, api_url, f_l, f_xs, f_m } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import PhoneInput from "react-native-phone-input";

import axios from 'axios';
import Toast from 'react-native-toast-message';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext.js";
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

    const { theme, isDark,toggleTheme } = useTheme(); 
  const go_back = () => {
    navigation.goBack();
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
  const check_valid = () => {
    if ('+' + phone.current?.getCountryCode() == phone.current?.getValue()) {
       showToast(
         'error',
         t('Validation error'),
         t('Please Enter Valid Phone Number'),
       );
      setValidation(false)
    } else if (!phone.current?.isValidNumber()) {
      setValidation(false)
      showToast(
        'error',
        t('Validation error'),
        t('Please Enter Valid Phone Number'),
      );
    } else {
      setValidation(true)
      setFormattedValue(phone.current?.getValue())
      call_forgot_password(phone.current?.getValue());
    }
  }


  const call_forgot_password = async (phone_with_code) => {
    setLoading(true);
    console.log(api_url + forgot_password);
    console.log({ phone_with_code: phone_with_code });
    await axios({
      method: 'post',
      url: api_url + forgot_password,
      data: { phone_with_code: phone_with_code }
    })
      .then(async response => {
        console.log(response.data);
        setLoading(false);
        if (response.data.status == 1) {
          navigate(response.data.result);
        } else {
           showToast(
             'error',
             t('Validation error'),
             t('Please Enter Valid Phone Number'),
           );
        
        }
      })
      .catch(error => {
        showToast(
          'error',
          t('Validation error'),
          t('Please Enter Valid Phone Number'),
        );
        setLoading(false);
       
      });
  }

  const navigate = async (data) => {
    navigation.navigate('OTP', { otp: data.otp, id: data.id, from: "forgot", phone_with_code: phone.current?.getValue(), country_code: "+" + phone.current?.getCountryCode(), phone_number: value });
  }

  return (
    <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }}>
     <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />   
      <View style={{    height: 60,
  
    flexDirection: 'row',
    alignItems: 'center'}}>
        <TouchableOpacity activeOpacity={1} onPress={go_back.bind(this)} style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
          <Icon type={Icons.MaterialIcons} name="arrow-back" color={theme.textPrimary} style={{ fontSize: 30 }} />
        </TouchableOpacity>
      </View>
      <View style={{ margin: 20 }} />
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text numberOfLines={1} style={{ color: theme.textPrimary, fontSize: f_l, fontFamily: regular }}>{t('Enter your phone number')}</Text>
        <View style={{ margin: 5 }} />
        <Text numberOfLines={1} style={{ color: theme.textSecondary, fontSize: f_xs, fontFamily: normal }}>{t('Please enter your phone number for reset the password')}</Text>
        <View style={{ margin: 20 }} />
        <View style={{ width: '80%',}}>
          <PhoneInput
                       style={{backgroundColor:theme.surface,padding:10,borderRadius:10}}
                       flagStyle={{ width: 38,
                 height: 24}}
                       ref={phone}
                       initialCountry="ng"
                       offset={10}
                       textStyle={{  fontSize: 18,
           
                 paddingBottom: 8,
                 height: 35,
                 fontFamily: regular,
                 color: theme.textPrimary}}
                       textProps={{
                         placeholder: t('Phone Number'),
                         placeholderTextColor: theme.textSecondary
                       }}
                       autoFormat={true}
                     />
          <View style={{ margin: 30 }} />
          <TouchableOpacity onPress={check_valid.bind(this)} activeOpacity={1} style={{ width: '100%', backgroundColor: theme.primary, borderRadius: 10, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: theme.textPrimary, fontSize: f_m, color: theme.onPrimary, fontFamily: normal }}>{t('Next')}</Text>
          </TouchableOpacity>
        </View>
      </View>
              <Toast />
      
    </SafeAreaView>
  );
};


export default Forgot;