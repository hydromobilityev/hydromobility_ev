import { useTranslation } from "react-i18next";
import '../languages/i18next';

import React, { useState, useEffect, useRef } from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    TextInput,
    StatusBar
} from "react-native";
import { useNavigation, useRoute, CommonActions } from "@react-navigation/native";
import * as colors from '../assets/css/Colors';
import { api_url, normal, bold, regular, login, btn_loader, f_xl, f_xs, f_m } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import { updateFirstName, updateLastName, updateEmail } from '../actions/RegisterActions';
import { connect } from 'react-redux';
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useTheme } from "../context/ThemeContext";
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const Password = (props) => {
  const { t, i18n } = useTranslation();
    const navigation = useNavigation();
    const route = useRoute();
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [phone_number, setPhoneNumber] = useState(route.params.phone_number);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { theme, toggleTheme, isDark } = useTheme();

    const inputRef = useRef();

    const go_back = () => {
        navigation.goBack();
    }

    useEffect(() => {
        setTimeout(() => inputRef.current.focus(), 100)
    }, []);


    const check_valid = () => {
        if (password) {
            call_login();
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
    const call_login = async () => {
        console.log({ phone_with_code: phone_number, password: password, fcm_token: global.fcm_token,})
        setLoading(true);
        await axios({
            method: 'post',
            url: api_url + login,
            data: { phone_with_code: phone_number, password: password, fcm_token: global.fcm_token }
        })
            .then(async response => {
                console.log(response.data)
                           setLoading(false);

                save_data(response.data.result, response.data.status, response.data.message);
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

    const navigate = async (data) => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "Home" }],
            })
        );
    }

    const save_data = async (data, status, message) => {
                        setLoading(true);

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
                props.updateFirstName(data.first_name);
                props.updateLastName(data.last_name);
                props.updateEmail(data.email);
                setLoading(false);
                await navigate();
            } catch (e) {
                setLoading(false);
                showToast(
                  "error",
                  t('Error'),
                  t('Sorry something went wrong')
                );
             
            }
        } else {
            setLoading(false);
            console.log(message)
            if (message == "Invalid phone number or password"){
              showToast(
                "error",
                t('Error'),
                t('Invalid phone number or password')
              );
             
            }
            else{
              showToast("error", t('Error'), message);
           
            }
        }
    }

    const forgot_password = () => {
        navigation.navigate('Forgot');
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

  <View style={{ marginVertical: 20 }} />

  {/* Title & Subtitle */}
  <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
    <Text style={{ color: theme.textPrimary, fontSize: f_xl, fontFamily: regular }}>
      {t('Enter your password')}
    </Text>
    <View style={{ height: 5 }} />
   
  </View>

  <View style={{ marginVertical: 20 }} />

  {/* Password Input */}
  <View style={{ width: '85%', alignSelf: 'center' }}>
    <View style={{
      flexDirection: 'row',
      borderRadius: 12,
      backgroundColor: theme.surface,
      paddingHorizontal: 12,
      alignItems: 'center',
      
        borderWidth: .5,
             height: 60,
        borderColor: theme.divider,
      marginBottom: 10,
    }}>
      <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center' }}>
        <Icon type={Icons.MaterialIcons} name="lock" color={theme.textSecondary} style={{ fontSize: 28 }} />
      </View>
      <TextInput
        ref={inputRef}
        secureTextEntry={secureTextEntry}
        placeholder={t('Password')}
        placeholderTextColor={theme.textSecondary}
        style={{
          width: '60%',
          fontSize: 18,
          fontFamily: regular,
          color: theme.textPrimary,
          paddingVertical: 20,
        }}
        onChangeText={(TextInputValue) => setPassword(TextInputValue)}
      />
      <TouchableOpacity
        onPress={() => setSecureTextEntry(!secureTextEntry)}
        style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}
      >
        <Icon
          type={Icons.MaterialIcons}
          name={secureTextEntry ? "visibility-off" : "visibility"}
          color={theme.textSecondary}
          style={{ fontSize: 25 }}
        />
      </TouchableOpacity>
    </View>

    {/* Forgot Password */}
    <Text
      onPress={forgot_password.bind(this)}
      style={{
        color: theme.textSecondary,
        fontSize: f_xs,
        fontFamily: normal,
        textAlign: 'right',
        marginBottom: 30,
      }}
    >
      {t('Forgot Password')}?
    </Text>

    {/* Login Button */}
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
        <Text style={{ color: theme.onPrimary, fontSize: f_m, fontFamily: normal }}>
          {t('Login')}
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

const mapDispatchToProps = (dispatch) => ({
    updateEmail: (data) => dispatch(updateEmail(data)),
    updateFirstName: (data) => dispatch(updateFirstName(data)),
    updateLastName: (data) => dispatch(updateLastName(data)),
});

export default connect(null, mapDispatchToProps)(Password);