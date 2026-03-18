import { useTranslation } from "react-i18next";
import '../languages/i18next.js';

import React, { useState, useEffect, useRef } from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    StatusBar,
    Image,
    TextInput,
    Keyboard
} from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { api_url, register,  btn_loader, f_xl, f_xs, f_m, regular } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import { connect } from 'react-redux';
import axios from 'axios';
import LottieView from 'lottie-react-native';

import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useTheme } from "../context/ThemeContext.js";
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};
const CreatePassword = (props) => {
  const { t, i18n } = useTranslation();
    const navigation = useNavigation();
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [registration_status, setRegistrationStatus] = useState(0);
    const [confirm_password, setConfirmPassword] = useState(''); 
    const [global_id, setGlobaiId] = useState(0); 
    const [referral_code, setReferralCode] = useState(""); 
      const [secureTextEntry, setSecureTextEntry] = useState(true);
    const { theme, isDark } = useTheme();
    

    const inputRef = useRef();

    const go_back = () => {
        navigation.goBack();
    }

    useEffect(() => {
        setTimeout(() => inputRef.current.focus(), 100)
    }, []);
   const showToast = (type, title, message) => {
     ReactNativeHapticFeedback.trigger("impactHeavy", options);

     Toast.show({
       type: type,
       text1: title,
       text2: message,
       visibilityTime: 5000,
       position: "top", // top, bottom
     });
   };

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
            licence_number: props.licence_number,
            date_of_birth: props.date_of_birth,
            password: password,
            referral_code: referral_code,
          },
        })
          .then(async (response) => {
            setLoading(false);
            console.log(response.data);
            if (response.data.status == 1) {
              setRegistrationStatus(1);
              setGlobaiId(response.data.result.id);
              navigate(response.data.result.id);
            } else {
              dropDownAlertRef({
                type: DropdownAlertType.Error,
                title: t('Error'),
                message: response.data.message,
              });
            }
          })
          .catch((error) => {
            setLoading(false);
            dropDownAlertRef({
              type: DropdownAlertType.Error,
              title: t('Error'),
              message: t('Sorry something went wrong'),
            });
          });
    }

    const navigate = async (id) => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "VehicleDetails", params: {id: id} }],
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
        <View style={{  height: 60,
       
        flexDirection: 'row',
        alignItems: 'center'}}>
          {registration_status == 0 && (
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
        {registration_status == 0 && (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text
              numberOfLines={1}
              style={{
                color: theme.textPrimary,
                fontSize: f_xl,
                fontFamily: regular,
              }}
            >
              {t('Create your password')}
            </Text>
            <View style={{ margin: 5 }} />
            <Text
              numberOfLines={1}
              style={{ color: theme.textSecondary, fontSize: f_xs, fontFamily: regular }}
            >
              {t('Create your new password')}
            </Text>
            <View style={{ margin: 20 }} />
            <View style={{ width: "80%" }}>
              <View style={{ flexDirection: "row",backgroundColor:theme.surface,borderRadius:10,  borderWidth:.5,borderColor:theme.divider, }}>
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
                    placeholder={t('Password')}
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor={theme.textSecondary}
                    style={{  fontSize: f_m,
        color: theme.textPrimary,
        fontFamily: regular,
        height: 60,
     
        width: '100%'}}
                    onChangeText={(TextInputValue) =>
                      setPassword(TextInputValue)
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
              <View style={{ margin: 10 }} />
              <View style={{ flexDirection: "row" ,backgroundColor:theme.surface,borderRadius:10,  borderWidth:.5,borderColor:theme.divider,}}>
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
                    placeholder={t('Confirm Password')}
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor={theme.textSecondary}
                    style={{fontSize: f_m,
        color: theme.textPrimary,
        fontFamily: regular,
        height: 60,
       
        width: '100%'}}
                    onChangeText={(TextInputValue) =>
                      setConfirmPassword(TextInputValue)
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

              <View style={{ flexDirection: "row",backgroundColor:theme.surface,borderRadius:10 ,  borderWidth:.5,borderColor:theme.divider,}}>
                <View
                  style={{
                    width: "20%",
                    alignItems: "center",
                    justifyContent: "center",
            
                  }}
                >
                  <Icon
                    type={Icons.MaterialIcons}
                    name="share"
                    color={theme.textSecondary}
                    style={{ fontSize: 30 }}
                  />
                </View>
                <View
                  style={{
                    width: "80%",
                    alignItems: "flex-start",
                    paddingLeft: 10,
                    justifyContent: "center",
                    
                  }}
                >
                  <TextInput
                    placeholder={t("Referral Code (Optional)")}
                    secureTextEntry={false}
                    placeholderTextColor={theme.textSecondary}
                    style={{fontSize: f_m,
        color: theme.textPrimary,
        fontFamily: regular,
        height: 60,
       
        width: '100%'}}
                    onChangeText={(TextInputValue) =>
                      setReferralCode(TextInputValue)
                    }
                  />
                </View>
              </View>
              <View style={{ margin: 30 }} />
              {loading == false ? (
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
                      color: theme.textPrimary,
                      fontSize: f_m,
                      color: theme.onPrimary,
                      fontFamily: regular,
                    }}
                  >
                    {t('Register')}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={{ height: 50, width: "90%", alignSelf: "center" }}>
                  <LottieView
                    style={{ flex: 1 }}
                    source={btn_loader}
                    autoPlay
                    loop
                  />
                </View>
              )}
            </View>
          </View>
        )}
        <Toast />
      </SafeAreaView>
    );
};


function mapStateToProps(state) {

    return {
        phone_number: state.register.phone_number,
        phone_with_code: state.register.phone_with_code,
        country_code: state.register.country_code,
        first_name: state.register.first_name,
        last_name: state.register.last_name,
        email: state.register.email,
        licence_number: state.register.licence_number,
        date_of_birth: state.register.date_of_birth,
    };
}

export default connect(mapStateToProps, null)(CreatePassword);