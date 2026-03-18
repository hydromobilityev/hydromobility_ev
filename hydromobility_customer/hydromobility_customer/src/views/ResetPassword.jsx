import { useTranslation } from "react-i18next";
import '../languages/i18next';

import React, { useState, useEffect, useRef } from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    Image,
    TextInput,
    StatusBar
} from "react-native";
import { useNavigation, CommonActions, useRoute } from "@react-navigation/native";
import * as colors from '../assets/css/Colors';
import { api_url, reset_password, normal, bold, regular, success_icon, btn_loader, f_xl, f_xs, f_m } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useTheme } from "../context/ThemeContext";
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const ResetPassword = (props) => {
  const { t, i18n } = useTranslation();
    const navigation = useNavigation();
    const route = useRoute();
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState(route.params.id);
    const [changed_status, setChangedStatus] = useState(0);
    const [confirm_password, setConfirmPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const inputRef = useRef();
  const { theme, toggleTheme, isDark } = useTheme();

    const go_back = () => {
        navigation.goBack();
    }

   useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    return () => clearTimeout(timer); // cleanup
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
          /*   dropDownAlertRef({
                type: DropdownAlertType.Error,
                title: t('Validation error'),
                message: t('Please enter your password'),
              }); */
        }
    }

    const check_password = () => {
        if (password == confirm_password) {
            call_reset_password();
        } else {
           showToast(
             "error",
             t('Validation error'),
             t('Your password and confirm password did not match')
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
    const call_reset_password = async () => {
        setLoading(true);
        await axios({
            method: 'post',
            url: api_url + reset_password,
            data: { id: id, password: password }
        })
            .then(async response => {
                setLoading(false);
                setChangedStatus(1);
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

    const navigate = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "CheckPhone" }],
            })
        );
    }


    return (
  <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
  <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

  {/* Header */}
  <View style={{ height: 70, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
    {changed_status === 0 && (
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
    )}
    <View style={{ width: changed_status === 0 ? '85%' : '100%' }} />
  </View>

  <View style={{ marginVertical: 20 }} />

  {changed_status === 0 ? (
    <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
      <Text style={{ color: theme.textPrimary, fontSize: f_xl, fontFamily: regular }}>
        {t('Reset your password')}
      </Text>
      <View style={{ height: 5 }} />
      <Text style={{ color: theme.textSecondary, fontSize: f_xs, fontFamily: normal }}>
        {t('Create your new password')}
      </Text>

      <View style={{ marginVertical: 20 }} />

       <View style={{ width: '90%', alignSelf: 'center' }}>
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
          {t('Change Password')}
        </Text>
      </TouchableOpacity>
    ) : (
      <View style={{ height: 50, width: '90%', alignSelf: 'center' }}>
        <LottieView style={{ flex: 1 }} source={btn_loader} autoPlay loop />
      </View>
    )}
  </View>
    </View>
  ) : (
    <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
      <Text style={{ color: theme.success, fontSize: f_xl, fontFamily: bold }}>Done!</Text>
      <View style={{ height: 5 }} />
      <Text style={{ color: theme.textSecondary, fontSize: f_xs, fontFamily: normal, textAlign: 'center', width: '80%' }}>
        {t('Password has been changed successfully')}
      </Text>

      <View style={{ marginVertical: 20 }} />

      <View style={{ height: 150, width: 150 }}>
        <Image source={success_icon} style={{ flex: 1, width: undefined, height: undefined }} />
      </View>

      <View style={{ marginVertical: 20 }} />

      <TouchableOpacity
        onPress={navigate.bind(this)}
        activeOpacity={0.8}
        style={{
          width: '80%',
          height: 50,
          borderRadius: 12,
          backgroundColor: theme.primary,
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
          {t('Login')}
        </Text>
      </TouchableOpacity>
    </View>
  )}

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

export default ResetPassword;