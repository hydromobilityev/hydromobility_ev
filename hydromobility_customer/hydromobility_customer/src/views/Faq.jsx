import { useTranslation } from "react-i18next";
import '../languages/i18next';

//List
import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text, Animated, TouchableOpacity, FlatList, StatusBar, ScrollView } from 'react-native';
import * as colors from '../assets/css/Colors';
import Icon, { Icons } from '../components/Icons';
import { normal, bold, api_url, faq, maxHeaderHeight, minHeaderHeight, f_30, f_s, f_xl, regular } from '../config/Constants';
import axios from 'axios';
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useTheme } from "../context/ThemeContext";
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const Faq = (props) => {
    const { t, i18n } = useTranslation();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState("");
  const { theme, isDark } = useTheme(); // Using theme from context

 

    const go_back = () => {
ReactNativeHapticFeedback.trigger("impactLight", options);

        navigation.toggleDrawer();
    }
const showToast = (type, title, message) => {
ReactNativeHapticFeedback.trigger("impactLight", options);

    Toast.show({
      type: type ,
      text1: title,
      text2: message,
      visibilityTime: 5000,
      position: "top", // top, bottom
    });
  };
    useEffect(() => {
        call_faq();
    }, []);

    const call_faq = () => {
        setLoading(true);
        
        axios({
            method: 'post',
            url: api_url + faq,
            data: { lang: i18n.language }
        })
            .then(async response => {
                setLoading(false);
                setData(response.data.result)
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

    navigate_faq_details = (data) => {
        navigation.navigate('FaqDetails', { data: data });
    }

   

    const show_list = ({ item }) => (
        <TouchableOpacity activeOpacity={1} onPress={navigate_faq_details.bind(this, item)} style={{ flexDirection: 'row', padding: 20 ,backgroundColor:theme.surface,margin:10,borderRadius:10}}>
            <View style={{ width: '10%', alignItems: 'center', justifyContent: 'center' }}>
                <Icon type={Icons.MaterialIcons} name="notes" color={theme.textPrimary} style={{ fontSize: 22 }} />
            </View>
            <View style={{ width: '90%', alignItems: 'flex-start', justifyContent: 'center' }}>
                <Text style={{ color: theme.textPrimary, fontSize: f_s, fontFamily: regular, }}>{item.question}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{flex:1,backgroundColor:theme.background}}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content"/>
            <View style={{  height: 70,
        backgroundColor: colors.lite_grey,
        flexDirection: 'row',
        alignItems: 'center'}}>
                <TouchableOpacity activeOpacity={1} onPress={go_back.bind(this)} style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon type={Icons.MaterialIcons} name="arrow-back" color={theme.textPrimary} style={{ fontSize: 30 }} />
                </TouchableOpacity>
                <View activeOpacity={1} style={{ width: '85%', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={{ color: theme.textPrimary, fontSize: f_xl, fontFamily: regular }}>{t('FAQs')}</Text>
                </View>
            </View>
   
          
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={show_list}
                    keyExtractor={item => item.id}
                />
    
          
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    

   
});

export default Faq;