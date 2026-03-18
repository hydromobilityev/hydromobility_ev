import { useTranslation } from "react-i18next";
import '../languages/i18next.js';

import React, {useState, useEffect} from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Linking, StatusBar} from 'react-native';
import { app_update, bold, regular, api_url, check_document_status, driver_approval, normal } from '../config/Constants';
import Lottie from 'lottie-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import RNRestart from 'react-native-restart';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from "react-native-toast-message";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useTheme } from "../context/ThemeContext.js";
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};
const DriverVerification = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const [id, setId] = useState(route.params.id);
   const { theme, isDark,toggleTheme } = useTheme();
  console.log(global.vehicle_type+'ver')
  const handle_refresh = async () => {
    await axios({
        method: 'post',
        url: api_url + check_document_status,
        data: { driver_id: id }
    })
    .then(async response => {     
        if(response.data.status == 1){
          try {
              await AsyncStorage.setItem(
                  "approved_status",
                  '1'
              );
              global.approved_status = 1;
              RNRestart.Restart();
          }catch (e) {
              console.log(e)
          }
        }
    })
    .catch(error => {
        setLoading(false);
         showToast("error", t('Error'), t('Sorry something went wrong'));
      
    });
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
  const handle_logout = () => {
    navigation.navigate('Logout')
  }

  const handle_restart = () => {
    RNRestart.Restart();
  }

  return (
    <SafeAreaView style={{ flex: 1,
    backgroundColor:theme.background,
    padding:10,}}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />   
      
        <View style={{ alignItems:'center', marginTop:'40%', padding:20}}>
            <Lottie style={{ height:400, width:400 }} source={driver_approval} autoPlay loop />
        </View>
        {global.id ? 
        <View style={{ alignItems:'center', justifyContent:'center'}}>
          <Text adjustsFontSizeToFit={true}  style={{ color:theme.textPrimary, fontFamily:regular, fontSize:14, margin:10, textAlign:'center' }}>{t('Your documents are uploaded.Please wait admin will verify your documents')}</Text>
          <View style={{ margin:10}}/>
          <View style={{ width:'100%', flexDirection:'row'}}>
            <View style={{ margin:5 }} />
            <TouchableOpacity onPress={handle_refresh}  style={{ height:40, alignItems:'center', justifyContent:'center', backgroundColor:theme.textPrimary, flex:1, borderRadius:10,}}>
                <Text adjustsFontSizeToFit={true}  style={{ color:theme.theme_fg_two, fontFamily:regular, fontSize:14 }}>{t('Refresh')}</Text>
            </TouchableOpacity>
            <View style={{ margin:5 }} />
            <TouchableOpacity onPress={handle_logout}  style={{ height:40, alignItems:'center', justifyContent:'center', backgroundColor:theme.primary, flex:1, borderRadius:10}}>
                <Text adjustsFontSizeToFit={true}  style={{ color:theme.onPrimary, fontFamily:regular, fontSize:14 }}>{t('Logout')}</Text>
            </TouchableOpacity>
            <View style={{ margin:5 }} />
          </View>
        </View>
        :
        <TouchableOpacity onPress={handle_restart}  style={{width:'100%', height:40, alignItems:'center', justifyContent:'center', backgroundColor:theme.primary, borderRadius:10,}}>
            <Text adjustsFontSizeToFit={true}  style={{ color:theme.onPrimary, fontFamily:normal, fontSize:14 }}>{t('Done')}</Text>
        </TouchableOpacity>
        }
                      <Toast />
        
    </SafeAreaView>
  )
}


export default DriverVerification;
