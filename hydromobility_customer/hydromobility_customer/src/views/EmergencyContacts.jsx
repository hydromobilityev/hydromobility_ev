import { useTranslation } from "react-i18next";
import '../languages/i18next';

//List
import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text, Animated, TouchableOpacity, Image, FlatList, StatusBar } from 'react-native';

import * as colors from '../assets/css/Colors';
import Icon, { Icons } from '../components/Icons';
import { normal, bold, regular, logo, maxHeaderHeight, minHeaderHeight, api_url, sos_contact_list, delete_sos_contact, add_contact, loader, f_l, f_s, f_m, f_xl, f_30, f_25 } from '../config/Constants';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useTheme } from "../context/ThemeContext";
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};
import DropShadow from "react-native-drop-shadow";


const EmergencyContacts = (props) => {
  const { t, i18n } = useTranslation();
    const navigation = useNavigation();
    const animatedScrollYValue = useRef(new Animated.Value(0)).current;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState("");
  const { theme, isDark } = useTheme(); // Using theme from context

    

    const go_back = () => {
ReactNativeHapticFeedback.trigger("impactLight", options);

        navigation.toggleDrawer();
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", async () => {
            call_sos_contact_list();
        });

        return (
            unsubscribe
        );
    }, []);
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
    const call_sos_contact_list = () => {
        setLoading(true);
        axios({
            method: 'post',
            url: api_url + sos_contact_list,
            data: { customer_id: global.id }
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

    const call_delete_sos_contact = (data) => {
        setLoading(true);
        axios({
            method: 'post',
            url: api_url + delete_sos_contact,
            data: { customer_id: global.id, contact_id: data.id }
        })
        .then(async response => {
            setLoading(false);
            if (response.data.status == 1) {
                alert(response.data.message);
                call_sos_contact_list();
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

    const navigate_add_contact = () =>{
ReactNativeHapticFeedback.trigger("impactLight", options);

        navigation.navigate("AddEmergencyContact")
    }


const show_list = ({ item }) => (
  <View
    style={{
      width: '100%',
      marginVertical: 6,
      borderWidth:.5,borderColor:theme.divider,
      borderRadius: 12,
    }}
  >
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        flexDirection: 'row',
        backgroundColor: theme.surface,
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
      }}
    >
      {/* Contact Image */}
      <View style={{ width: 60, height: 60, borderRadius: 30, overflow: 'hidden', marginRight: 12 }}>
        <Image
          source={logo}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      </View>

      {/* Contact Info */}
      <View style={{ flex: 1, justifyContent: 'center', }}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ color: theme.textPrimary, fontSize: f_l, fontFamily: normal }}
        >
          {item.name}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ color: theme.textSecondary, fontSize: f_s, fontFamily: regular, marginTop: 2 }}
        >
          {item.phone_number}
        </Text>
      </View>

      {/* Delete Button */}
      <TouchableOpacity
        onPress={call_delete_sos_contact.bind(this, item)}
        activeOpacity={0.7}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: '#FEE2E2',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Icon
          type={Icons.MaterialIcons}
          name="delete"
          color="#B91C1C"
          style={{ fontSize: 22 }}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  </View>
);


    return (
       <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={theme.background === '#000000' ? 'light-content' : 'dark-content'}
      />

      {/* Header */}
      <View style={{
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 0,
      
      }}>
        <TouchableOpacity activeOpacity={0.8} onPress={go_back} style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
          <Icon type={Icons.MaterialIcons} name="arrow-back" color={theme.textPrimary} style={{ fontSize: 30 }} />
        </TouchableOpacity>
        <View style={{ width: '85%', justifyContent: 'center' }}>
          <Text numberOfLines={1} ellipsizeMode='tail' style={{ color: theme.textPrimary, fontSize: f_xl, fontFamily: regular }}>
            {t('Emergency Contacts')}
          </Text>
        </View>
      </View>

      {/* Content */}
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={show_list}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        />
      ) : (
        <TouchableOpacity
          onPress={navigate_add_contact}
          style={{ justifyContent: 'center', alignItems: 'center', marginTop: '20%' }}
        >
          <View style={{ height: '60%', width: '90%', borderRadius: 10, overflow: 'hidden' }}>
            <Image source={add_contact} style={{ flex: 1, width: undefined, height: undefined }} />
          </View>
          <Text numberOfLines={1} style={{ color: theme.textSecondary, fontSize: f_s, fontFamily: normal, marginTop: 12 }}>
            {t('Add your contact')}
          </Text>
        </TouchableOpacity>
      )}

      {loading && (
        <View style={{ height: 100, width: '90%', alignSelf: 'center', justifyContent: 'center', marginTop: 20 }}>
          <LottieView style={{ flex: 1 }} source={loader} autoPlay loop />
        </View>
      )}

      {/* Add Contacts Button */}
      <View style={{ padding: 25, position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <TouchableOpacity
          onPress={navigate_add_contact}
          activeOpacity={0.9}
          style={{
            width: '100%',
            backgroundColor: theme.primary,
            borderRadius: 12,
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: theme.shadow_color,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 5,
          }}
        >
          <Text style={{ color: theme.onPrimary, fontSize: f_m, fontFamily: normal }}>{t('Add Contacts')}</Text>
        </TouchableOpacity>
      </View>

      <Toast />
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 70,
        backgroundColor: colors.lite_bg,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textinput: {
        fontSize: f_m,
        color: colors.grey,
        fontFamily: regular,
        height: 50,
        backgroundColor: colors.text_container_bg,
        width: '100%',
        alignItems:"flex-start",
        justifyContent:"center"
    },
});

export default EmergencyContacts;