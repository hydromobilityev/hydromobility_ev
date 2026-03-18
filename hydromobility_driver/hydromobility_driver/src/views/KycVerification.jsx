import { useTranslation } from "react-i18next";
import '../languages/i18next.js';

//Fixed
import React, { useState, useEffect, useRef } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Icon, { Icons } from '../components/Icons';
import { bold, regular, api_url, get_kyc, btn_loader, update_kyc, f_xl, f_xs, f_m, normal } from '../config/Constants';
import axios from 'axios';

import LottieView from 'lottie-react-native';

import { SafeAreaView } from "react-native-safe-area-context";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};
import Toast from "react-native-toast-message";
import { useTheme } from "../context/ThemeContext.js";

const KycVerification = (props) => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [on_load, setOnLoad] = useState(0);
  const [aadhar_number, setAadharNumber] = useState('');
  const [account_number, setAccountNumber] = useState('');
  const [bank_name, setBankName] = useState('');
  const [ifsc_code, setIfscCode] = useState('');
  const [pan_number, setPanNumber] = useState('');
 const { theme, isDark,toggleTheme } = useTheme(); 

  const go_back = () => {
    ReactNativeHapticFeedback.trigger("impactLight", options);

    navigation.goBack();
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      call_get_kyc();
    });

    return (
      unsubscribe
    );
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
  const call_get_kyc = () => {
    setLoading(true);
    axios({
      method: 'post',
      url: api_url + get_kyc,
      data: { driver_id: global.id }
    })
      .then(async response => {
        setLoading(false);
        if (response.data.status == 1) {
          setAadharNumber(response.data.result.aadhar_number);
          setAccountNumber(response.data.result.bank_account_number);
          setBankName(response.data.result.bank_name);
          setIfscCode(response.data.result.ifsc_code);
          setPanNumber(response.data.result.pan_number);
        } else {
        
        }
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

  const check_validation = () => {
    if (bank_name == "" || account_number == "" || ifsc_code == "" || aadhar_number == "" || pan_number == "") {
           showToast(
             "error",
             t('Validation error'),
             t('Please fill required field')
           );

  
    } else {
      call_update_kyc();
    }
  }

  const call_update_kyc = () => {
    setLoading(true);
    axios({
      method: 'post',
      url: api_url + update_kyc,
      data: { driver_id: global.id, bank_name: bank_name, bank_account_number: account_number, ifsc_code: ifsc_code, aadhar_number: aadhar_number, pan_number: pan_number }
    })
      .then(async response => {
        setLoading(false);
        dropDownAlertRef({
          type: DropdownAlertType.Success,
          title: t('Successfully updated'),
          message: t('Your bank name has been updated'),
        });
        go_back();
      })
      .catch(error => {
        setLoading(false);
        alert(t('Sorry something went wrong'))
      });
  }



  return (
    <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <View style={{ height: 70,
   
    flexDirection: 'row',
    alignItems: 'center'}}>
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
        <View
          activeOpacity={1}
          style={{
            width: "85%",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              color: theme.textPrimary,
              fontSize: f_xl,
              fontFamily: regular,
            }}
          >
            {t('Update your bank details')}
          </Text>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
       <ScrollView
  style={{ flex: 1, backgroundColor: theme.background }}
  contentContainerStyle={{ paddingVertical: 20 }}
  showsVerticalScrollIndicator={false}>
  
  <View style={{ alignItems: "center" }}>
    <View style={{ width: "90%" }}>
      
      {/* Bank Name */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ color: theme.textSecondary, fontSize: 13, marginBottom: 6 }}>
          {t("Bank Name")}
        </Text>
        <View style={{
          flexDirection: "row",
          borderRadius: 10,
          backgroundColor: theme.surface,
          shadowColor: theme.shadow_color,
          shadowOpacity: 0.05,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
           elevation:Platform.OS=='ios'? 4:0,
        }}>
          <View style={{
            width: 50,
            alignItems: "center",
            justifyContent: "center",
            
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}>
            <Icon type={Icons.FontAwesome} name="bank" color={theme.textSecondary} size={22} />
          </View>
          <TextInput
            value={bank_name}
            placeholder={t("Enter bank name")}
            placeholderTextColor={theme.textSecondary}
            style={{
              flex: 1,
              fontFamily:regular,
              fontSize: 15,
              color: theme.textPrimary,
              paddingHorizontal: 12,
              height: 70,
            }}
            onChangeText={setBankName}
          />
        </View>
      </View>

      {/* Account Number */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ color: theme.textSecondary, fontSize: 13, marginBottom: 6 }}>
          {t("Account Number")}
        </Text>
        <View style={{
          flexDirection: "row",
          borderRadius: 10,
          backgroundColor: theme.surface,
          shadowColor: theme.shadow_color,
          shadowOpacity: 0.05,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
           elevation:Platform.OS=='ios'? 4:0,
        }}>
          <View style={{
            width: 50,
            alignItems: "center",
            justifyContent: "center",
            
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}>
            <Icon type={Icons.Octicons} name="number" color={theme.textSecondary} size={22} />
          </View>
          <TextInput
            value={account_number}
            placeholder={t("Enter account number")}
            placeholderTextColor={theme.textSecondary}
            style={{
              flex: 1,
              fontFamily:regular,
              fontSize: 15,
              color: theme.textPrimary,
              paddingHorizontal: 12,
              height: 70,
            }}
            onChangeText={setAccountNumber}
          />
        </View>
      </View>

      {/* IFSC Code */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ color: theme.textSecondary, fontSize: 13, marginBottom: 6 }}>
          {t("IFSC Code")}
        </Text>
        <View style={{
          flexDirection: "row",
          borderRadius: 10,
          backgroundColor: theme.surface,
          shadowColor: theme.shadow_color,
          shadowOpacity: 0.05,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
           elevation:Platform.OS=='ios'? 4:0,
        }}>
          <View style={{
            width: 50,
            alignItems: "center",
            justifyContent: "center",
            
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}>
            <Icon type={Icons.MaterialCommunityIcons} name="unicode" color={theme.textSecondary} size={22} />
          </View>
          <TextInput
            value={ifsc_code}
            placeholder={t("Enter IFSC code")}
            placeholderTextColor={theme.textSecondary}
            style={{
              flex: 1,
              fontSize: 15,
              fontFamily:regular,
              color: theme.textPrimary,
              paddingHorizontal: 12,
              height: 70,
            }}
            onChangeText={setIfscCode}
          />
        </View>
      </View>

      {/* Aadhaar Number */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ color: theme.textSecondary, fontSize: 13, marginBottom: 6 }}>
          {t("Aadhar Number")}
        </Text>
        <View style={{
          flexDirection: "row",
          borderRadius: 10,
          backgroundColor: theme.surface,
          shadowColor: theme.shadow_color,
          shadowOpacity: 0.05,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
           elevation:Platform.OS=='ios'? 4:0,
        }}>
          <View style={{
            width: 50,
            alignItems: "center",
            justifyContent: "center",
            
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}>
            <Icon type={Icons.Octicons} name="number" color={theme.textSecondary} size={22} />
          </View>
          <TextInput
            value={aadhar_number}
            placeholder={t("Enter Aadhaar Number")}
            placeholderTextColor={theme.textSecondary}
            style={{
              flex: 1,
              fontSize: 15,
              fontFamily:regular,
              color: theme.textPrimary,
              paddingHorizontal: 12,
              height: 70,
            }}
            onChangeText={setAadharNumber}
          />
        </View>
      </View>

      {/* PAN Number */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ color: theme.textSecondary, fontSize: 13, marginBottom: 6 }}>
          {t("PAN Number")}
        </Text>
        <View style={{
          flexDirection: "row",
          borderRadius: 10,
          backgroundColor: theme.surface,
          shadowColor: theme.shadow_color,
          shadowOpacity: 0.05,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
           elevation:Platform.OS=='ios'? 4:0,
        }}>
          <View style={{
            width: 50,
            alignItems: "center",
            justifyContent: "center",
            
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}>
            <Icon type={Icons.MaterialCommunityIcons} name="unicode" color={theme.textSecondary} size={22} />
          </View>
          <TextInput
            value={pan_number}
            placeholder={t("Enter PAN Number")}
            placeholderTextColor={theme.textSecondary}
            style={{
              flex: 1,
              fontFamily:regular,
              fontSize: 15,
              color: theme.textPrimary,
              paddingHorizontal: 12,
              height: 70,
            }}
            onChangeText={setPanNumber}
          />
        </View>
      </View>

    </View>
  </View>

  <View style={{ height: 60 }} />
</ScrollView>

      </KeyboardAvoidingView>
      {loading == false ? (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: 100,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={check_validation.bind(this)}
            activeOpacity={1}
            style={{
              width: "90%",
              backgroundColor: theme.primary,
              borderRadius: 10,
              padding:10,
              height:50,
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
              {t('Submit')}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ height: 70, width: "90%", alignSelf: "center" }}>
          <LottieView style={{ flex: 1 }} source={btn_loader} autoPlay loop />
        </View>
      )}
          <Toast />
    </SafeAreaView>
  );
};


export default KycVerification;