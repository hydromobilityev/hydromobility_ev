import { useTranslation } from "react-i18next";
import '../languages/i18next.js';

import React, { useState, useEffect, useRef } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  TextInput,
  StatusBar,
  pushNotification,
  Platform
} from "react-native";
import {
  useNavigation,
  useRoute,
  CommonActions,
} from "@react-navigation/native";
import {
  api_url,
  normal,
  bold,
  regular,
  login,
  btn_loader,
  f_xl,
  f_xs,
  f_m,
} from "../config/Constants";
import Icon, { Icons } from "../components/Icons";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import {
  updateFirstName,
  updateLastName,
  updateEmail,
} from "../actions/RegisterActions";
import { connect } from "react-redux";

import Notifications from "./Notifications.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useTheme } from "../context/ThemeContext.js";
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};
const Password = (props) => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [phone_number, setPhoneNumber] = useState(route.params.phone_number);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  
  const inputRef = useRef();
    const { theme, isDark,toggleTheme } = useTheme(); 

  const go_back = () => {
    navigation.goBack();
  };

  useEffect(() => {
    setTimeout(() => inputRef.current.focus(), 100);
  }, []);
   const showToast = (type, title, message) => {
     ReactNativeHapticFeedback.trigger("impactHeavy", options);

     Toast.show({
       type: type,
       text1: title,
       text2: message,
       visibilityTime: 5000,
       position: "top", 
     });
   };
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
  };

  const call_login = async () => {
 
    setLoading(true);
    await axios({
      method: "post",
      url: api_url + login,
      data: {
        phone_with_code: phone_number,
        password: password,
        fcm_token: global.fcm_token,
      },
    })
      .then(async (response) => {
        console.log(response.data.result);
        setLoading(false);
        if(response.data.status == 0){
          if (response.data.message == "Invalid phone number or password") {
               showToast(
                 "error",
                 t('Error'),
                 t('Invalid phone number or password')
               );
              
              
             }
             else{
              showToast("error", t('Error'), response.data.message);
             }
        
        }
        save_data(
          response.data.result, response.data.status
        );
      })
      .catch((error) => {
        console.log(error)
        setLoading(false);
         showToast("error", t('Error'), t('Sorry something went wrong'));
       
      });
  };

  const navigate = async (data) => {
    if (data.approved_status == 2) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "VehicleDetails", params: {id: global.id} }],
        })
      );
    } else if (data.approved_status == 3) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "VehicleDocument" , params: {id: global.id}}],
        })
      );
    } else if (data.approved_status == 4) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "DriverVerification" , params: {id: global.id}}],
        })
      );
    } else if (data.approved_status == 1) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Home" }],
          })
        );
      }
  };

  const save_data = async (data,status) => {
        setLoading(true);

    if (status == 1) {
      try {
        await AsyncStorage.setItem("id", data.id.toString());
        await AsyncStorage.setItem("first_name", data.first_name.toString());
        await AsyncStorage.setItem(
          "profile_picture",
          data.profile_picture.toString()
        );
        await AsyncStorage.setItem(
          "phone_with_code",
          data.phone_with_code.toString()
        );
        await AsyncStorage.setItem("email", data.email.toString());
        await AsyncStorage.setItem(
          "vehicle_type",
          data.vehicle_type.toString()
        );
        await AsyncStorage.setItem(
          "approved_status",
          data.approved_status.toString()
        );
        await AsyncStorage.setItem(
          "vehicle_mode",
          data.vehicle_mode.toString()
        );
        
        global.id = await data.id;
        global.first_name = await data.first_name;
        global.phone_with_code = await data.phone_with_code;
        global.email = await data.email;
        global.vehicle_type = await data.vehicle_type;
        global.approved_status = await data.approved_status;
        global.profile_picture = await data.profile_picture;
        global.vehicle_mode = await data.vehicle_mode;
        props.updateFirstName(data.first_name);
        props.updateLastName(data.last_name);
        props.updateEmail(data.email);
        setLoading(false);

        await navigate(data);
      } catch (e) {
        console.log(e)
        setLoading(false);
        showToast(
          "error",
          t('Error'),
          t('Sorry something went wrong')
        );
      
      }
    } else {
        setLoading(false);
      showToast("error", t('Error'), message);
    
    }
  };

  const forgot_password = () => {
    navigation.navigate("Forgot");
  };

  return (
    <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={{  height: 60,
   
    flexDirection: "row",
    alignItems: "center",}}>
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
          {t('Enter your password')}
        </Text>
        <View style={{ margin: 5 }} />
        <Text
          numberOfLines={1}
          style={{ color: theme.textSecondary, fontSize: f_xs, fontFamily: normal }}
        >
          {t('You need enter your password')}
        </Text>
        <View style={{ margin: 20 }} />
        <View style={{ width: "80%" ,borderRadius:10}}>
          <View style={{ flexDirection: "row" , backgroundColor: theme.surface ,borderRadius:10}}>
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
                width: "65%",
                alignItems: "center",
                justifyContent:'center',
                paddingLeft: 10,
                justifyContent: "center",
                backgroundColor: theme.surface,
   
              }}
            >
              <TextInput
                ref={inputRef}
                secureTextEntry={secureTextEntry}
                placeholder={t('Password')}
                placeholderTextColor={theme.textSecondary}
                style={{ fontSize: f_m,
    color: theme.textSecondary,
    fontFamily: regular,
    height: 60,
    backgroundColor: theme.surface,
    width: "100%",}}
                onChangeText={(TextInputValue) => setPassword(TextInputValue)}
              />
            </View>
              <TouchableOpacity
                onPress={() => setSecureTextEntry(!secureTextEntry)}
                style={{backgroundColor:theme.surface,width:'15%',justifyContent:'center',alignItems:'center',borderRadius:10}}
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
          <Text
            onPress={forgot_password.bind(this)}
            numberOfLines={1}
            style={{
              color: theme.textSecondary,
              fontSize: f_xs,
              fontFamily: normal,
              textAlign: "right",
            }}
          >
            {t('Forgot Password')}?
          </Text>
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
                  color: theme.onPrimary,
                  fontSize: f_m,
               
                  fontFamily: normal,
                }}
              >
                {t('Login')}
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

const mapDispatchToProps = (dispatch) => ({
  updateEmail: (data) => dispatch(updateEmail(data)),
  updateFirstName: (data) => dispatch(updateFirstName(data)),
  updateLastName: (data) => dispatch(updateLastName(data)),
});

export default connect(null, mapDispatchToProps)(Password);
