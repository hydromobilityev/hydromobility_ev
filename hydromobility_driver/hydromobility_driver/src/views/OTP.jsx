import { useTranslation } from "react-i18next";
import '../languages/i18next.js';

import React, { useState, useEffect, useRef } from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,

    TextInput,
    StatusBar
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { normal, bold, regular, f_xl, f_xs, f_m } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';

import { updatePhoneNumber, updatePhoneWithCode, updateCountryCode } from '../actions/RegisterActions';
import { connect } from 'react-redux';

import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useTheme } from "../context/ThemeContext.js";
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};
const OTP = (props) => {
  const { t, i18n } = useTranslation();
    const navigation = useNavigation();
    const route = useRoute();
    const [otp, setOtp] = useState(route.params.otp);
    const [phone_number, setPhoneNumber] = useState(route.params.phone_number);
    const [country_code, setCountryCode] = useState(route.params.country_code);
    const [phone_with_code, setPhoneWithCode] = useState(route.params.phone_with_code);
    const [from, setFrom] = useState(route.params.from);
    const [id, setId] = useState(route.params.id);
    const [value, setValue] = useState("");
     const { theme, isDark,toggleTheme } = useTheme(); 
    const inputRef = useRef();

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
     position: "top", 
   });
 };
    useEffect(() => {
        if (global.mode == 'DEMO') {
            setTimeout(() => {
                check_valid(otp);
            }, 1000)
        } else {
        
        }
        setTimeout(() => inputRef.current.focus(), 100)
    }, []);

    const check_valid = (val) => {
        if (val != otp) {
             showToast(
               "error",
               t('Validation error'),
               t('Please enter valid OTP')
             );
         
        } else {
            navigate();
        }
    }

    const navigate = async () => {
        if (from == "register") {
            props.updatePhoneNumber(phone_number);
            props.updatePhoneWithCode(phone_with_code);
            props.updateCountryCode(country_code);
            navigation.navigate('CreateName');
        } else if (from == "forgot") {
            navigation.navigate('ResetPassword', { id: id });
        } else if (from == "profile") {
            go_back();
        }
    }


    return (
        <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />   
          
            <View style={{   height: 60,
   
        flexDirection: 'row',
        alignItems: 'center'}}>
                <TouchableOpacity activeOpacity={1} onPress={go_back.bind(this)} style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon type={Icons.MaterialIcons} name="arrow-back" color={theme.textPrimary} style={{ fontSize: 30 }} />
                </TouchableOpacity>
            </View>
            <View style={{ margin: 20 }} />
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text numberOfLines={1} style={{ color: theme.textPrimary, fontSize: f_xl, fontFamily: regular }}>{t('Enter the OTP')}</Text>
                <View style={{ margin: 5 }} />
                <Text numberOfLines={1} style={{ color: theme.textSecondary, fontSize: f_xs, fontFamily: normal }}>{t('Enter your OTP received from the SMS')}</Text>
                <View style={{ margin: 20 }} />
                <View style={{ width: '80%', }}>
                    <View style={{ flexDirection: 'row',backgroundColor: theme.surface,padding:0,borderRadius:10,  borderWidth:.5,borderColor:theme.divider, }}>
                        <View style={{ width: '25%', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.theme_bg_three }}>
                            <Icon type={Icons.MaterialIcons} name="dialpad" color={theme.textPrimary} style={{ fontSize: 30 }} />
                        </View>
                        <View style={{ width: '75%', alignItems: 'flex-start', paddingLeft: 10, justifyContent: 'center',  }}>
                            <TextInput
                                ref={inputRef}
                                secureTextEntry={false}
                                placeholder={t('OTP')}
                                keyboardType='numeric'
                                placeholderTextColor={theme.textSecondary}
                                style={{ fontSize: f_m,
        color: theme.textPrimary,
        fontFamily: regular,
        height: 60,

        width: '100%'}}
                                onChangeText={TextInputValue =>
                                    setValue(TextInputValue)}
                            />
                        </View>
                    </View>
                    <View style={{ margin: 30 }} />
                    <TouchableOpacity onPress={check_valid.bind(this, value)} activeOpacity={1} style={{ width: '100%', backgroundColor: theme.primary, borderRadius: 10, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: theme.textPrimary, fontSize: f_m, color: theme.onPrimary, fontFamily: normal }}>{t('Next')}</Text>
                    </TouchableOpacity>
                </View>

            </View>
              <Toast />
        </SafeAreaView>
    );
};




const mapDispatchToProps = (dispatch) => ({
    updatePhoneNumber: (data) => dispatch(updatePhoneNumber(data)),
    updatePhoneWithCode: (data) => dispatch(updatePhoneWithCode(data)),
    updateCountryCode: (data) => dispatch(updateCountryCode(data)),
});

export default connect(null, mapDispatchToProps)(OTP);