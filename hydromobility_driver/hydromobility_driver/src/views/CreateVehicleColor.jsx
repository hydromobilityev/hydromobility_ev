import { useTranslation } from "react-i18next";
import '../languages/i18next.js';

import React, { useState, useEffect, useRef } from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    TextInput,
    Keyboard,
    StatusBar
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { normal, bold, regular, f_xl, f_xs, f_m } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';

import { connect } from 'react-redux';
import { updateVehicleColor } from '../actions/VehicleDetailActions';

import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useTheme } from "../context/ThemeContext.js";
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const CreateVehicleColor = (props) => {
  const { t, i18n } = useTranslation();
    const navigation = useNavigation();
    const [vehicle_color, setVehicleColor] = useState('');
        const { theme, isDark } = useTheme();
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
       position: "top", // top, bottom
     });
   };
    useEffect(() => {
        setTimeout(() => inputRef.current.focus(), 100)
    }, []);


    const check_valid = () => {
        if (vehicle_color) {
            navigate();
        } else {
            showToast(
              "error",
              t('Validation error'),
              t('Please enter your vehicle color')
            );
           
        }
    }

    const navigate = async () => {
        Keyboard.dismiss()
        props.updateVehicleColor(vehicle_color);
        go_back();
    }

    return (
        <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }}>
                       <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />     
           
            <View style={{  height: 60,
        backgroundColor: theme.lite_bg,
        flexDirection: 'row',
        alignItems: 'center'}}>
                <TouchableOpacity activeOpacity={1} onPress={go_back.bind(this)} style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon type={Icons.MaterialIcons} name="arrow-back" color={theme.textPrimary} style={{ fontSize: 30 }} />
                </TouchableOpacity>
            </View>
            <View style={{ margin: 20 }} />
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text numberOfLines={1} style={{ color: theme.textPrimary, fontSize: f_xl, fontFamily: regular }}>{t('Enter your vehicle color')}</Text>
                <View style={{ margin: 5 }} />
               
                <View style={{ margin: 20 }} />
                <View style={{ width: '80%' }}>
                    <View style={{ flexDirection: 'row',backgroundColor:theme.surface,borderRadius:10 , borderWidth:.5,borderColor:theme.divider,}}>
                        <View style={{ width: '25%', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.theme_bg_three }}>
                            <Icon type={Icons.Ionicons} name="color-palette" color={theme.textPrimary} style={{ fontSize: 30 }} />
                        </View>
                        <View style={{ width: '75%', alignItems: 'flex-start', paddingLeft: 10, justifyContent: 'center', backgroundColor: theme.text_container_bg }}>
                            <TextInput
                                ref={inputRef}
                                secureTextEntry={false}
                                placeholder={t('Vehicle Color')}
                                placeholderTextColor={theme.textSecondary}
                                style={{fontSize: f_m,
        color: theme.textPrimary,
        fontFamily: regular,
        height: 60,
 
        width: '100%'}}
                                onChangeText={TextInputValue =>
                                    setVehicleColor(TextInputValue)}
                            />
                        </View>
                    </View>
                    <View style={{ margin: 30 }} />
                    <TouchableOpacity onPress={check_valid.bind(this)} activeOpacity={1} style={{ width: '100%', backgroundColor: theme.primary, borderRadius: 10, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: theme.onPrimary, fontSize: f_m,  fontFamily: normal }}>{t('Done')}</Text>
                    </TouchableOpacity>
                </View>

            </View>
              <Toast />
        </SafeAreaView>
    );
};



const mapDispatchToProps = (dispatch) => ({
    updateVehicleColor: (data) => dispatch(updateVehicleColor(data)),
});

export default connect(null, mapDispatchToProps)(CreateVehicleColor);