import { useTranslation } from "react-i18next";
import '../languages/i18next';

import React, { useState, useEffect, useRef } from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    TextInput,
    Keyboard,
    StatusBar,   
} from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import * as colors from '../assets/css/Colors';
import { api_url, register, normal, bold, regular, f_xl, f_xs, f_m, btn_loader } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import { connect } from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useTheme } from "../context/ThemeContext";
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const CreatePassword = (props) => {
  const { t, i18n } = useTranslation();
    const navigation = useNavigation();
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [confirm_password, setConfirmPassword] = useState('');
    const [referral_code, setReferralCode] = useState(""); 
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const inputRef = useRef();
  const { theme, toggleTheme, isDark } = useTheme();

    const go_back = () => {
        navigation.goBack();
    }

    useEffect(() => {
        setTimeout(() => inputRef.current.focus(), 100)
    }, []);


    const check_valid = () => {
        if (password) {
            check_password();
        } else {
           showToast(
             "error",
             t('Validation error'),
             t('Please enter your password')
           );
           
        }
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
    const check_password = () => {
        if (password == confirm_password) {         
            call_register();
        } else {
           showToast(
             "error",
             t('Validation error'),
             t('Your password and confirm password did not match')
           );
          
        }
    }

    const call_register = async () => {
        console.log({
          fcm_token: global.fcm_token,
          phone_number: props.phone_number,
          phone_with_code: props.phone_with_code,
          country_code: props.country_code,
          first_name: props.first_name,
          last_name: props.last_name,
          email: props.email,
          password: password,
          referral_code: referral_code,
        });

        Keyboard.dismiss();
        setLoading(true);
        await axios({
          method: "post",
          url: api_url + register,
          data: {
            fcm_token: global.fcm_token,
            phone_number: props.phone_number,
            phone_with_code: props.phone_with_code,
            country_code: props.country_code,
            first_name: props.first_name,
            last_name: props.last_name,
            email: props.email,
            password: password,
            referral_code: referral_code,
          },
        })
          .then(async (response) => {
        
            if (response.data.status == 1) {
              save_data(
                response.data.result,
                response.data.status,
                response.data.message
              );
            } else {
                  setLoading(false);
                   showToast("error", t('Error'), response.data.message);
           
            }
          })
          .catch((error) => {
            setLoading(false);
             showToast(
               "error",
               t('Error'),
               t('Sorry something went wrong')
             );
         
          });
    }

    const save_data = async (data, status, message) => {
        console.log(JSON.stringify(data))
        if (status == 1) {
            try {
                await AsyncStorage.setItem('id', data.id.toString());
                await AsyncStorage.setItem('first_name', data.first_name.toString());
                await AsyncStorage.setItem('profile_picture', data.profile_picture.toString());
                await AsyncStorage.setItem('phone_with_code', data.phone_with_code.toString());
                await AsyncStorage.setItem('email', data.email.toString());
                global.id = await data.id;
                global.first_name = await data.first_name;
                global.phone_with_code = await data.phone_with_code;
                global.email = await data.email;
                global.profile_picture = await data.profile_picture;
                    setLoading(false);
                await navigate();
            } catch (e) {
                  setLoading(false);
               
            }
        } else {
         
        }
    }

    const navigate = async (data) => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "Home" }],
            })
        );
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
    <View style={{ width: '85%', justifyContent: 'center' }} />
  </View>

  <View style={{ marginVertical: 5 }} />

  {/* Title & Subtitle */}
  <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
    <Text style={{ color: theme.textPrimary, fontSize: f_xl, fontFamily: regular }}>
      {t('Create your password')}
    </Text>
    <View style={{ height: 5 }} />
    <Text style={{ color: theme.textSecondary, fontSize: f_xs, fontFamily: normal, textAlign: 'center', lineHeight: 20 }}>
      {t('Create your new password')}
    </Text>
  </View>

  <View style={{ marginVertical: 20 }} />

  {/* Inputs */}
  <View style={{ width: '85%', alignSelf: 'center' }}>
    {/* Password Input */}
    <View style={{
      flexDirection: 'row',
      marginBottom: 15,
      borderRadius: 12,
      backgroundColor: theme.surface,
      paddingHorizontal: 12,
      alignItems: 'center',
       borderWidth: .5,
             height: 60,
        borderColor: theme.divider,
    }}>
      <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
        <Icon type={Icons.MaterialIcons} name="lock" color={theme.textSecondary} style={{ fontSize: 28 }} />
      </View>
      <TextInput
        ref={inputRef}
        placeholder={t('Password')}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={theme.textSecondary}
        style={{
          width: '70%',
          fontSize: 18,
          fontFamily: regular,
          color: theme.textPrimary,
          paddingVertical: 20,
        }}
        onChangeText={(TextInputValue) => setPassword(TextInputValue)}
      />
      <TouchableOpacity
        onPress={() => {
          ReactNativeHapticFeedback.trigger("impactHeavy", options);
          setSecureTextEntry(!secureTextEntry);
        }}
        style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}
      >
        <Icon type={Icons.MaterialIcons} name={secureTextEntry ? "visibility-off" : "visibility"} color={theme.textSecondary} style={{ fontSize: 25 }} />
      </TouchableOpacity>
    </View>

    {/* Confirm Password Input */}
    <View style={{
      flexDirection: 'row',
      marginBottom: 15,
      borderRadius: 12,
      backgroundColor: theme.surface,
      paddingHorizontal: 12,
      alignItems: 'center',
      borderWidth: .5,
             height: 60,
        borderColor: theme.divider,
    }}>
      <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
        <Icon type={Icons.MaterialIcons} name="lock" color={theme.textSecondary} style={{ fontSize: 28 }} />
      </View>
      <TextInput
        placeholder={t('Confirm Password')}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={theme.textSecondary}
        style={{
          width: '70%',
          fontSize: 18,
          fontFamily: regular,
          color: theme.textPrimary,
          paddingVertical: 20,
        }}
        onChangeText={(TextInputValue) => setConfirmPassword(TextInputValue)}
      />
      <TouchableOpacity
        onPress={() => {
          ReactNativeHapticFeedback.trigger("impactHeavy", options);
          setSecureTextEntry(!secureTextEntry);
        }}
        style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}
      >
        <Icon type={Icons.MaterialIcons} name={secureTextEntry ? "visibility-off" : "visibility"} color={theme.textSecondary} style={{ fontSize: 25 }} />
      </TouchableOpacity>
    </View>

    {/* Referral Code Input */}
    <View style={{
      flexDirection: 'row',
      marginBottom: 30,
      borderRadius: 12,
      backgroundColor: theme.surface,
      paddingHorizontal: 12,
      alignItems: 'center',
       borderWidth: .5,
             height: 60,
        borderColor: theme.divider,
    }}>
      <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
        <Icon type={Icons.MaterialIcons} name="share" color={theme.textSecondary} style={{ fontSize: 28 }} />
      </View>
      <TextInput
        placeholder={t("Referral Code (Optional)")}
        secureTextEntry={false}
        placeholderTextColor={theme.textSecondary}
        style={{
          width: '85%',
          fontSize: 18,
          fontFamily: regular,
          color: theme.textPrimary,
          paddingVertical: 20,
        }}
        onChangeText={(TextInputValue) => setReferralCode(TextInputValue)}
      />
    </View>

    {/* Register Button */}
    {loading == false ? (
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
        <Text style={{ color: theme.onPrimary, fontSize: f_m, fontFamily: regular }}>
          {t('Register')}
        </Text>
      </TouchableOpacity>
    ) : (
      <View style={{ height: 50, width: '90%', alignSelf: 'center' }}>
        <LottieView style={{ flex: 1 }} source={btn_loader} autoPlay loop />
      </View>
    )}
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
        fontSize: f_m,
        color: colors.grey,
        fontFamily: regular,
        height: 60,
        backgroundColor: colors.text_container_bg,
        width: '100%'
    },
});

function mapStateToProps(state) {

    return {
        phone_number: state.register.phone_number,
        phone_with_code: state.register.phone_with_code,
        country_code: state.register.country_code,
        first_name: state.register.first_name,
        last_name: state.register.last_name,
        email: state.register.email,
    };
}

export default connect(mapStateToProps, null)(CreatePassword);