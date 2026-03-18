import { useTranslation } from "react-i18next";
import '../languages/i18next';

import React, { useState, useEffect, useRef } from "react";
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
import { normal, bold, regular, profile_update, api_url, btn_loader, f_xl, f_xs, f_m } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useTheme } from "../context/ThemeContext";

const EditLastName = (props) => {
  const { t, i18n } = useTranslation();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [last_name, setLastName] = useState('');
  const { theme, toggleTheme, isDark } = useTheme();

    const inputRef = useRef();

    const go_back = () => {
        navigation.goBack();
    }

    useEffect(() => {
        setTimeout(() => inputRef.current.focus(), 100)
    }, []);


    const check_valid = () => {
        if (last_name) {
            call_profile_update();
        } else {
             showToast(
               "error",
               t('Validation error'),
               t('Please enter your last name')
             );
       
        }
    }
 const showToast = (type, title, message) => {
    Toast.show({
      type: type ,
      text1: title,
      text2: message,
      visibilityTime: 5000,
      position: "top", // top, bottom
    });
  };
    const call_profile_update = () => {
        setLoading(true);
        axios({
            method: 'post',
            url: api_url + profile_update,
            data: { driver_id: global.id, last_name: last_name }
        })
        .then(async response => {
            setLoading(false);
             showToast(
               "success",
               t('Successfully updated'),
               t('Your Last name has been updated')
             );
            
            go_back();
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
                <TouchableOpacity activeOpacity={1} onPress={go_back.bind(this)} style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon type={Icons.MaterialIcons} name="arrow-back" color={theme.textPrimary} style={{ fontSize: 30 }} />
                </TouchableOpacity>
            </View>
            <View style={{ margin: 20 }} />
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text numberOfLines={1} style={{ color: theme.textPrimary, fontSize: f_xl, fontFamily: regular }}>{t('Enter your last name')}</Text>
                <View style={{ margin: 5 }} />
             
                <View style={{ margin: 20 }} />
                <View style={{ width: '100%' }}>
                    <View style={{
    width: '85%',
    alignSelf: 'center',
    borderRadius: 12,
    backgroundColor: theme.surface,
   height:60,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth:.5,
  borderColor:theme.divider
  }}>
    <View style={{
      width: '25%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
    }}>
      <Icon
        type={Icons.MaterialIcons}
        name="person"
        color={theme.textSecondary}
        style={{ fontSize: 28 }}
      />
    </View>
    <View style={{ width: '75%', paddingLeft: 12 }}>
      <TextInput
        ref={inputRef}
        placeholder={t('Last Name')}
        secureTextEntry={false}
        placeholderTextColor={theme.textSecondary}
        style={{
          fontSize: 18,
          fontFamily: regular,
          color: theme.textPrimary,
          
          paddingVertical: 6,
        }}
        onChangeText={TextInputValue => setLastName(TextInputValue)}
      />
    </View>
  </View>
                    <View style={{ margin: 30 }} />
                    {loading == false ?
                        <TouchableOpacity onPress={check_valid.bind(this)} activeOpacity={1} style={{ width: '80%',alignSelf:'center', backgroundColor: theme.primary, borderRadius: 10, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: colors.theme_fg_two, fontSize: f_m, color: theme.onPrimary, fontFamily: normal }}>{t('Done')}</Text>
                        </TouchableOpacity>
                        :
                        <View style={{ height: 50, width: '90%', alignSelf: 'center' }}>
                            <LottieView style={{flex: 1}}source={btn_loader} autoPlay loop />
                        </View>
                    }
                </View>

            </View>
                                <Toast />
                
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: colors.lite_bg,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textinput: {
        fontSize: f_m,
        color: colors.grey,
        fontFamily: regular,
        height: 60,
        backgroundColor: colors.text_container_bg,
        width: '100%'
    },
});

export default EditLastName;