import { useTranslation } from "react-i18next";
import '../languages/i18next.js';

import React, { useState, useRef, useEffect } from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    StatusBar,
    I18nManager,
    Modal,
    FlatList
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { normal, bold, regular, check_phone, api_url, btn_loader, f_xs, f_m, f_l } from '../config/Constants';
import PhoneInput from "react-native-phone-input";

import axios from 'axios';
import LottieView from 'lottie-react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import Icon, { Icons } from '../components/Icons';
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useTheme } from "../context/ThemeContext.js";
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};
const CheckPhone = (props) => {
  const { t, i18n } = useTranslation();
    const navigation = useNavigation();
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [validation, setValidation] = useState(false);
    const [formattedValue, setFormattedValue] = useState("");
    const [language, setLanguage] = useState('en');
    const { theme, isDark,toggleTheme } = useTheme(); 

    const [modalVisible, setModalVisible] = useState(false);
    const languages = [
        { key: 'en', label: 'English' },
        { key: 'ar', label: 'swahili' },
    ];
    const phone = useRef(null);

   
    const go_back = () => {
        navigation.goBack();
    }
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

        console.log(props.initial_lat)
        if ('+' + phone.current?.getCountryCode() == phone.current?.getValue()) {
            setValidation(false);
            showToast(
              "error",
              t('Validation error'),
              t('Please Enter Valid Phone Number')
            );
        } else if (!phone.current?.isValidNumber()) {
            setValidation(false);
             showToast(
               "error",
               t('Validation error'),
               t('Please Enter Valid Phone Number')
             );
           
        } else {
            setValidation(true);
            setFormattedValue(phone.current?.getValue())
            call_check_phone(phone.current?.getValue());
        }
    }

    const call_check_phone = async (phone_with_code) => {
        setLoading(true);
        await axios({
            method: 'post',
            url: api_url + check_phone,
            data: { phone_with_code: phone_with_code }
        })
            .then(async response => {
                setLoading(false);
                navigate(response.data.result);
            })
            .catch(error => {
                setLoading(false);
                console.log(error)
                showToast(
                  "error",
                  t('Error'),
                  t('Sorry something went wrong')
                );
            
            });
    }
    async function language_change(lang) {
      setLanguage(lang);
      AsyncStorage.setItem('language', lang);
      await i18n.changeLanguage(lang);
      
     
    }

    const navigate = async (data) => {
        let phone_number = phone.current?.getValue();
        phone_number = phone_number.replace("+" + phone.current?.getCountryCode(), "");
        if (data.is_available == 1) {
            navigation.navigate('Password', { phone_number: phone.current?.getValue() });
        } else {
            navigation.navigate('OTP', { otp: data.otp, phone_with_code: phone.current?.getValue(), country_code: "+" + phone.current?.getCountryCode(), phone_number: phone_number, id: 0, from: "register" });
        }
    }
    
    return (
      <SafeAreaView style={{backgroundColor: theme.background, flex: 1}}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />

        <View style={{ height: 60,
        backgroundColor: theme.background,
        flexDirection: 'row',
        alignItems: 'center'}} />
        <View style={{margin: 20}} />
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text
            numberOfLines={1}
            style={{
              color: theme.textPrimary,
              fontSize: f_l,
              fontFamily: regular,
            }}>
            {t('Enter your phone number')}
          </Text>
          <View style={{margin: 5}} />
          <Text
            numberOfLines={1}
            style={{color: theme.textSecondary, fontSize: f_xs, fontFamily: normal}}>
            {t('You need enter your phone number')}
          </Text>
          <View style={{margin: 20}} />
          <View style={{width: '80%'}}>
            <PhoneInput
              style={{backgroundColor:theme.surface,padding:10,borderRadius:10,  borderWidth:.5,borderColor:theme.divider,height:60}}
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
            <View style={{margin: 30}} />
            {loading == false ? (
              <View>
                <TouchableOpacity
                  onPress={check_valid.bind(this)}
                  activeOpacity={1}
                  style={{
                    width: '100%',
                    backgroundColor: theme.primary,
                    borderRadius: 10,
                    height: 50,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: theme.onPrimary,
                      fontSize: f_m,
                      
                      fontFamily: normal,
                    }}>
                    {t('Login')} / {t('Register')}
                  </Text>
                </TouchableOpacity>
                <View style={{margin: 20}} />
                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon
                    type={Icons.Ionicons}
                    name="language-outline"
                    color={theme.textSecondary}
                    style={{fontSize: 30}}
                  />
                  {i18n.language == 'en' ? (
                    <Text
                      style={{
                        color: theme.textPrimary,
                        fontSize: f_m,
                        fontFamily: regular,
                      }}>
                      {t('English')}
                    </Text>
                  ) : (
                    <Text
                      style={{
                                                color: theme.textPrimary,

                        fontSize: f_m,
                        fontFamily: regular,
                      }}>
                      swahili
                    </Text>
                  )}
                </TouchableOpacity>

                <Modal
                  transparent={true}
                  animationType="slide"
                  visible={modalVisible}
                  onRequestClose={() => setModalVisible(false)}>
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: 'rgba(0,0,0,0.2)',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 20,
                    }}>
                    <View
                      style={{
                        backgroundColor: theme.surface,
                        borderRadius: 20,
                        padding: 25,
                        width: '90%',
                        maxWidth: 350,
                        shadowColor: '#000',
                        shadowOffset: {width: 0, height: 5},
                        shadowOpacity: 0.3,
                        shadowRadius: 15,
                        elevation: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 22,
                          fontFamily:regular,
                          color: theme.textPrimary,
                          marginBottom: 20,
                          textAlign: 'center',
                          borderBottomWidth: 2,
                          borderBottomColor: theme.divider,
                          paddingBottom: 10,
                        }}>
                        {t('Change Language')}
                      </Text>

                      <FlatList
                        data={languages}
                        renderItem={({item}) => (
                          <TouchableOpacity
                            onPress={() => language_change(item.key)}
                            style={{
                              padding: 15,
                              marginVertical: 5,
                              backgroundColor:
                                i18n.language === item.key
                                  ? theme.background
                                  : theme.background,
                              borderRadius: 10,
                              borderLeftWidth: 4,
                              borderLeftColor:
                                i18n.language === item.key
                                  ?theme.primary
                                  : 'transparent',
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}>
                            <Text
                              style={{
                                fontSize: 18,
                                color:
                                  i18n.language === item.key
                                    ? theme.textPrimary
                                    :theme.textSecondary,
                              }}>
                              {item.label}
                            </Text>
                            {i18n.language === item.key && (
                              <View
                                style={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: 10,
                                  backgroundColor: theme.primary,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text style={{color:theme.onPrimary, fontSize: 14}}>
                                  ✓
                                </Text>
                              </View>
                            )}
                          </TouchableOpacity>
                        )}
                        keyExtractor={item => item.key}
                      />

                      <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                        style={{
                          marginTop: 20,
                          padding: 15,
                          backgroundColor:theme.primary,
                          borderRadius: 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                          shadowColor: theme.primary,
                          shadowOffset: {width: 0, height: 3},
                          shadowOpacity: 0.3,
                          shadowRadius: 5,
                        }}>
                        <Text
                          style={{
                            color:theme.onPrimary,
                            fontSize: 18,
                           fontFamily:regular
                          }}>
                          {t('Close')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </View>
            ) : (
              <View style={{height: 50, width: '90%', alignSelf: 'center'}}>
                <LottieView
                  style={{flex: 1}}
                  source={btn_loader}
                  autoPlay
                  loop
                />
              </View>
            )}
          </View>
        </View>
        <Toast />
      </SafeAreaView>
    );
};


export default CheckPhone;