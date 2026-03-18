import { useTranslation } from "react-i18next";
import '../languages/i18next.js';

import React, { useState, useEffect, useRef } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  StatusBar,
  Image,
  Modal,
  TextInput,
  Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { screenHeight, screenWidth, normal, bold, btn_loader, withdrawal_history, wallet_icon, withdrawal_icon, withdrawal_request, api_url, f_s, f_tiny, f_xl, f_35, f_m, regular } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import DropShadow from "react-native-drop-shadow";
import axios from 'axios';
import Moment from 'moment';
import LottieView from 'lottie-react-native';

import { SafeAreaView } from "react-native-safe-area-context";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};
import Toast from "react-native-toast-message";
import { useTheme } from "../context/ThemeContext.js";

const Withdrawal = (props) => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [w_amount, setWAmount] = useState(0);
  const [dialog_status, setDialogStatus] = useState(false);
  const [on_load, setOnLoad] = useState(0);
  const [inputText, setInputText] = useState('');
    const { theme, isDark,toggleTheme } = useTheme(); 
 
  const go_back = () => {
ReactNativeHapticFeedback.trigger("impactLight", options);

    navigation.goBack();
  }

  useEffect(() => {
    call_withdrawal_history();
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
   
  const call_withdrawal_history = () => {
    setLoading(true);
    axios({
      method: 'post',
      url: api_url + withdrawal_history,
      data: { id: global.id, lang: i18n.language }
    })
      .then(async response => {
        setWAmount(response.data.result.wallet_amount)
        setData(response.data.result.withdraw)
        setLoading(false);
        setOnLoad(1);
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

  const showDialog = (val) => {
    setDialogStatus(val);
  }

  const sendInput = (val) => {
    setDialogStatus(false);
    if (isNaN(val) || val == 0 || val == null) {
       showToast(
         "error",
         t('Validation error'),
         t('Please enter valid amount')
       );
      
    } else if (val > w_amount) {
       showToast(
         "error",
         t('Validation error'),
         t('Your maximum wallet balance is ') + w_amount
       );
      
    } else {
      call_withdrawal_request(val);
    }
  }

  const call_withdrawal_request = (val) => {
    setLoading(true);
    axios({
      method: 'post',
      url: api_url + withdrawal_request,
      data: { driver_id: global.id, amount: val }
    })
      .then(async response => {
        if (response.data.status == 1) {
          call_withdrawal_history();
        } else {
          showToast(
            "error",
            t('Validation error'),
            response.data.message
          );
        
        }
      })
      .catch(error => {
        setLoading(false);
        showToast(
          "error",
          t('Validation error'),
          t('Sorry something went wrong')
        );
     
      });
  }

  const validate_amount = () => {
    if (w_amount > 0) {
      setDialogStatus(true);
    } else {
       showToast(
         "error",
         t('Validation error'),
         t('Your balance is low')
       );
    
    }
  }


  const show_list = ({ item }) => (
    <View style={{ flexDirection: 'row', width: '100%', marginBottom: 20 }}>
      <View style={{ width: '15%' }}>
        <View style={{ height: 30, width: 30 }}>
          <Image source={withdrawal_icon} style={{ height: undefined, width: undefined, flex: 1 }} />
        </View>
      </View>
      <View style={{ width: '55%', justifyContent: 'center' }}>
        <Text numberOfLines={1} style={{ color: theme.textPrimary, fontSize: f_s, fontFamily: normal }}>{item.name}</Text>
        <View style={{ margin: 2 }} />
        <Text numberOfLines={1} style={{ color: theme.textSecondary, fontSize: f_tiny, fontFamily: normal }}>{Moment(item.created_at).fromNow()}</Text>
      </View>
      <View style={{ width: '30%', alignItems: 'flex-end', justifyContent: 'center' }}>
        <Text numberOfLines={1} style={{ color: theme.textPrimary, fontSize: f_s, fontFamily: normal }}>{global.currency}{item.amount}</Text>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={{backgroundColor: theme.background, flex: 1}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <ScrollView>
        <View style={{ height: 70,
    backgroundColor: theme.lite_bg,
    flexDirection: 'row',
    alignItems: 'center'}}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={go_back.bind(this)}
            style={{
              width: '15%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              type={Icons.MaterialIcons}
              name="arrow-back"
              color={theme.textPrimary}
              style={{fontSize: 30}}
            />
          </TouchableOpacity>
          <View
            activeOpacity={1}
            style={{
              width: '85%',
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                color: theme.textPrimary,
                fontSize: f_xl,
                fontFamily: regular,
              }}>
              {t('Withdrawal')}
            </Text>
          </View>
        </View>
        <View style={{margin: 10}} />
        <View
          style={{
            width: '90%',
            marginBottom: 5,
            marginTop: 5,
            
            marginLeft: '5%',
          }}>
          <View
            style={{
              backgroundColor: theme.surface,
              width: '100%',
              padding: 20,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              flexDirection: 'row',
            }}>
            <View style={{width: '20%', justifyContent: 'center'}}>
              <View style={{height: 60, width: 60}}>
                <Image
                  source={wallet_icon}
                  style={{height: undefined, width: undefined, flex: 1}}
                />
              </View>
            </View>
            <View style={{width: '5%'}} />
            <View
              style={{
                width: '75%',
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
              <Text
                numberOfLines={1}
                style={{
                  color: theme.textSecondary,
                  fontSize: f_s,
                  fontFamily: regular,
                }}>
                {t('Current balance')}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  color: theme.textPrimary,
                  fontSize: f_35,
                  fontFamily: regular,
                  marginTop: 10,
                  marginBottom: 10,
                }}>
                {global.currency}
                {w_amount}
              </Text>
            </View>
          </View>
          <View style={{margin: 15}} />
          <View
            style={{
              backgroundColor: theme.surface,
              width: '100%',
              padding: 20,
              justifyContent: 'center',
              borderRadius: 10,
            }}>
            <Text
              numberOfLines={1}
              style={{
                color: theme.textSecondary,
                fontSize: f_s,
                fontFamily: normal,
              }}>
              {t('Withdrawal Histories')}
            </Text>
            <View style={{margin: 10}} />
            {on_load == 1 && (
              <FlatList
                data={data}
                renderItem={show_list}
                keyExtractor={item => item.id}
              />
            )}
          </View>
        </View>
      </ScrollView>
      <View style={{margin: 40}} />
      <Modal
        visible={dialog_status}
        transparent={true}
        animationType="fade"
        onRequestClose={() => showDialog(false)}
        statusBarTranslucent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: 24,
          }}>
          <View
            style={{
              width: '100%',
              maxWidth: 400,
              backgroundColor: theme.surface,
              borderRadius: 16,
              padding: 24,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 4},
              shadowOpacity: 0.15,
              shadowRadius:  Platform.OS=='ios'?5:0,
               elevation:Platform.OS=='ios'? 5:0,
            }}>
            {/* Header */}
            <View style={{marginBottom: 16}}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '600',
                  color: theme.textPrimary,
                  textAlign: 'center',
                  marginBottom: 4,
                }}>
                {t('Verification')}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: theme.textSecondary,
                  textAlign: 'center',
                  lineHeight: 20,
                }}>
                {t('Please enter your amount')}
              </Text>
            </View>

            {/* Input Field */}
            <TextInput
              style={{
                height: 48,
                borderWidth: 1,
                borderColor: theme.primary,
                borderRadius: 8,
                paddingHorizontal: 16,
                fontSize: 16,
                marginBottom: 24,
                color:theme.textPrimary,
              }}
              placeholder={t('Enter Amount')}
              placeholderTextColor="#999999"
              keyboardType="numeric"
              onChangeText={text => setInputText(text)}
            />

            {/* Action Buttons */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 12,
              }}>
              {/* Cancel Button */}
              <TouchableOpacity
                style={{
                  flex: 1,
                  height: 48,
                  borderRadius: 8,
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                activeOpacity={0.8}
                onPress={() => showDialog(false)}>
                <Text
                  style={{
                    color:theme.error,
                    fontSize: 16,
                    fontWeight: '500',
                  }}>
                  {t('Cancel')}
                </Text>
              </TouchableOpacity>

              {/* Submit Button */}
              <TouchableOpacity
                style={{
                  flex: 1,
                  height: 48,
                  borderRadius: 8,
                  backgroundColor: '#007AFF',
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#007AFF',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                }}
                activeOpacity={0.8}
                onPress={() => sendInput(inputText)}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 16,
                    fontWeight: '500',
                  }}>
                  {t('Submit')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {loading == false ? (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: 100,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={validate_amount.bind(this)}
            activeOpacity={1}
            style={{
              width: '90%',
              backgroundColor: theme.primary,
              borderRadius: 10,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: theme.onPrimary,
                fontSize: f_m,
                
                fontFamily: normal,
              }}>
              {t('Request')}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{height: 50, width: '90%', alignSelf: 'center'}}>
          <LottieView style={{flex: 1}} source={btn_loader} autoPlay loop />
        </View>
      )}
      <Toast />
    </SafeAreaView>
  );
};


export default Withdrawal;

