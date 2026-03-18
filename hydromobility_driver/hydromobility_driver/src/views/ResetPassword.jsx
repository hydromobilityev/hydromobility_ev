import { useTranslation } from "react-i18next";
import '../languages/i18next.js';

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

import { api_url, reset_password, normal, bold, regular, success_icon, f_xl, f_xs, f_m } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';

import axios from 'axios';

import { SafeAreaView } from "react-native-safe-area-context";

import Toast from 'react-native-toast-message';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { useTheme } from "../context/ThemeContext.js";
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
      const [secureTextEntry, setSecureTextEntry] = useState(true);
    
    const [confirm_password, setConfirmPassword] = useState('');
        const { theme, isDark,toggleTheme } = useTheme(); 
    const inputRef = useRef();

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
        if (password) {
            check_password();
        } else {
          showToast(
            'error',
            t('Validation error'),
            t('Please enter your password'),
          );
          
        }
    }

    const check_password = () => {
        if (password == confirm_password) {
            call_reset_password();
        } else {
          showToast(
            'error',
            t('Validation error'),
            t('Your password and confirm password did not match'),
          );
      
        }
    }

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
                  'error',
                  t('Validation error'),
                  t('Sorry something went wrong'),
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
      <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />

        <View style={{   height: 60,
     
        flexDirection: 'row',
        alignItems: 'center'}}>
          {changed_status == 0 && (
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
          )}
        </View>
        <View style={{ margin: 20 }} />
        {changed_status == 0 ? (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text
              numberOfLines={1}
              style={{
                color: theme.textPrimary,

                fontSize: f_xl,
                fontFamily: regular,
              }}
            >
              {t('Reset your password')}
            </Text>
            <View style={{ margin: 5 }} />
            <Text
              numberOfLines={1}
              style={{ color: theme.textSecondary, fontSize: f_xs, fontFamily: normal }}
            >
              {t('Create your new password')}
            </Text>
            <View style={{ margin: 20 }} />
            <View style={{ width: "80%" ,}}>
              <View style={{ flexDirection: "row" ,backgroundColor:theme.surface,borderRadius:10}}>
                <View
                  style={{
                    width: "20%",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: theme.theme_bg_three,
                  }}
                >
                  <Icon
                    type={Icons.MaterialIcons}
                    name="lock"
                    color={theme.textSecondary}
                    style={{ fontSize: 30 }}
                  />
                </View>
                <View
                  style={{
                    width: "60%",
                    alignItems: "flex-start",
                    paddingLeft: 10,
                    justifyContent: "center",
            
                  }}
                >
                  <TextInput
                    ref={inputRef}
                    placeholder={t('Password')}
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor={theme.textSecondary}
                    style={{
                       fontSize: f_m,
        color: theme.textPrimary,
        fontFamily: regular,
        height: 60,
     
        width: '100%'
                    }}
                    onChangeText={(TextInputValue) =>
                      setPassword(TextInputValue)
                    }
                  />
                </View>
                <TouchableOpacity
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                  style={{
                    backgroundColor: theme.text_container_bg,
                    width: "20%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    type={Icons.MaterialIcons}
                    name={secureTextEntry ? "visibility-off" : "visibility"}
                    color={theme.textSecondary}
                    style={{ fontSize: 25, marginRight: 10 }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ margin: 10 }} />
              <View style={{ flexDirection: "row",backgroundColor:theme.surface,borderRadius:10 }}>
                <View
                  style={{
                    width: "20%",
                    alignItems: "center",
                    justifyContent: "center",
                   
                  }}
                >
                  <Icon
                    type={Icons.MaterialIcons}
                    name="lock"
                    color={theme.textSecondary}
                    style={{ fontSize: 30 }}
                  />
                </View>
                <View
                  style={{
                    width: "60%",
                    alignItems: "flex-start",
                    paddingLeft: 10,
                    justifyContent: "center",
                
                  }}
                >
                  <TextInput
                    ref={inputRef}
                    placeholder={t('Confirm Password')}
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor={theme.textSecondary}
                    style={{
                       fontSize: f_m,
        color: theme.textSecondary,
        fontFamily: regular,
        height: 60,
       
        width: '100%'
                    }}
                    onChangeText={(TextInputValue) =>
                      setConfirmPassword(TextInputValue)
                    }
                  />
                </View>
                <TouchableOpacity
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                  style={{
                    
                    width: "20%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    type={Icons.MaterialIcons}
                    name={secureTextEntry ? "visibility-off" : "visibility"}
                    color={theme.textSecondary}
                    style={{ fontSize: 25, marginRight: 10 }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ margin: 30 }} />
              <TouchableOpacity
                onPress={check_valid.bind(this)}
                activeOpacity={1}
                style={{
                  width: "100%",
                  backgroundColor: theme.primary,
                  borderRadius: 10,
                  height: 50,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: theme.onPrimary,
                    fontSize: f_m,
              
                    fontFamily: normal,
                  }}
                >
                  {t('Change Password')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text
              numberOfLines={1}
              style={{
                color: theme.success,
                fontSize: f_xl,
                fontFamily: bold,
              }}
            >
              {t('Done')}!
            </Text>
            <View style={{ margin: 5 }} />
            <Text
              style={{
                color: theme.grey,
                fontSize: f_xs,
                fontFamily: normal,
                textAlign: "center",
                width: "80%",
              }}
            >
              {t('Password has been changed successfully')}
            </Text>
            <View style={{ margin: 20 }} />
            <View style={{ height: 150, width: 150 }}>
              <Image
                source={success_icon}
                style={{ height: undefined, width: undefined, flex: 1 }}
              />
            </View>
            <View style={{ margin: 20 }} />
            <View style={{ width: "80%" }}>
              <TouchableOpacity
                onPress={navigate.bind(this)}
                activeOpacity={1}
                style={{
                  width: "100%",
                  backgroundColor: theme.btn_color,
                  borderRadius: 10,
                  height: 50,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: theme.textPrimary,
                    fontSize: f_m,
                    color: theme.theme_fg_three,
                    fontFamily: bold,
                  }}
                >
                  {t('Login')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </SafeAreaView>
    );
};


export default ResetPassword;