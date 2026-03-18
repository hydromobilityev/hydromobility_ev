import { useTranslation } from "react-i18next";
import '../languages/i18next';

import React, { useState, useRef } from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    TextInput,
    StatusBar
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as colors from '../assets/css/Colors';
import { normal, bold, regular, add_sos_contact, api_url, btn_loader, f_xl, f_xs, f_m } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useTheme } from "../context/ThemeContext";
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};
import DropShadow from "react-native-drop-shadow";


const AddEmergencyContact = (props) => {
  const { t, i18n } = useTranslation();
    const navigation = useNavigation();
    const [contact_name, setContactName] = useState('');
    const [formattedValue, setFormattedValue] = useState("");
    const [value, setValue] = useState("");
    const [contact_number, setContactNumber] = useState(""); 
    const [loading, setLoading] = useState(false);
    const [phone_number_validation, setPhoneNumberValidation] = useState(false);
    const inputRef = useRef();   
    const phoneInput = useRef();
  const { theme, isDark } = useTheme(); // Using theme from context

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
    const check_valid = async () => {
        if (contact_name != '' && contact_number != '') {
            call_add_sos_contact();
        } else {
            showToast(
              "error",
              t('Validation error'),
              t('Please enter all the required fields')
            );
           
        }
    }

    

    const call_add_sos_contact = async () => {
        setLoading(true);
        axios({
            method: 'post',
            url: api_url + add_sos_contact,
            data: { customer_id: global.id, name: contact_name, phone_number:contact_number }
        })
        .then(async response => {
            setLoading(false);
            if(response.data.status == 1){
                go_back();
                 showToast(
                   "success",
                   t('Your Emergency contact added successfully'),
                   response.data.message
                 );
                
            }
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

   

    return (
      <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <View style={{ height: 60,
        backgroundColor: theme.background,
        flexDirection: 'row',
        alignItems: 'center'}}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={go_back.bind(this)}
            style={{
              width: "20%",
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
        </View>
        <View style={{ margin: 20 }} />
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text
            numberOfLines={1}
            style={{
              color: theme.textPrimary,
              fontSize: f_xl,
              fontFamily: regular,
            }}
          >
            {t('Add Emergency Contact')}
          </Text>
          <View style={{ margin: 5 }} />
          <Text
            numberOfLines={1}
            style={{ color: theme.textSecondary, fontSize: f_xs, fontFamily: normal }}
          >
            {t('Add Emergency contact name and number')}
          </Text>
          <View style={{ margin: 20 }} />
          <View style={{ width: "80%" }}>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: "20%",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: theme.primary,
                }}
              >
                <Icon
                  type={Icons.MaterialIcons}
                  name="badge"
                  color={theme.onPrimary}
                  style={{ fontSize: 30 }}
                />
              </View>
              <View
                style={{
                  width: "80%",
                  alignItems: "flex-start",
                  paddingLeft: 10,
                  justifyContent: "center",
                  backgroundColor: theme.surface
                }}
              >
                <TextInput
                  placeholder={t('Contact Name')}
                  secureTextEntry={false}
                  placeholderTextColor={theme.textSecondary}
                  style={{fontSize: f_m,
        color: theme.textSecondary,
        fontFamily: regular,
        height: 60,
        backgroundColor: colors.text_container_bg,
        width: '100%'}}
                  onChangeText={(TextInputValue) =>
                    setContactName(TextInputValue)
                  }
                />
              </View>
            </View>
            <View style={{ margin: 10 }} />

            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: "20%",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: theme.primary,
                }}
              >
                <Icon
                  type={Icons.MaterialIcons}
                  name="contact-phone"
                  color={theme.onPrimary}
                  style={{ fontSize: 30 }}
                />
              </View>
              <View
                style={{
                  width: "80%",
                  alignItems: "flex-start",
                  paddingLeft: 10,
                  justifyContent: "center",
                  backgroundColor: theme.surface
                }}
              >
                <TextInput
                  placeholder={t('Contact Number')}
                  keyboardType="numeric"
                  secureTextEntry={false}
                  placeholderTextColor={theme.textSecondary}
                  style={{fontSize: f_m,
        color: theme.textPrimary,
        fontFamily: regular,
        height: 60,
        backgroundColor: colors.text_container_bg,
        width: '100%'}}
                  onChangeText={(TextInputValue) =>
                    setContactNumber(TextInputValue)
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
                  backgroundColor:theme.primary,
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
                    fontFamily: regular,
                  }}
                >
                  {t('Add')}
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
        <Toast />

      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  
    
});

export default AddEmergencyContact;