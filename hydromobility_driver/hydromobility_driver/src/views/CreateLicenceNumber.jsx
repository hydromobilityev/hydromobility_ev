import { useTranslation } from "react-i18next";
import '../languages/i18next.js';

import React, { useState, useEffect, useRef } from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    StatusBar,
    TextInput
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { regular, bold, f_xl, f_xs, f_m } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import { connect } from 'react-redux';
import { updateLicenceNumber } from '../actions/RegisterActions';

import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useTheme } from "../context/ThemeContext.js";
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};
const CreateLicenceNumber = (props) => {
  const { t, i18n } = useTranslation();
    const navigation = useNavigation();
    const [licence_number, setLicenceNumber] = useState('');
    const { theme, isDark } = useTheme();
    
    const inputRef = useRef();

    const go_back = () => {
        navigation.goBack();
    }

    useEffect(() => {
        setTimeout(() => inputRef.current.focus(), 100)
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
        if (licence_number) {
            navigate();
        } else {
               showToast(
                 "error",
                 t('Validation error'),
                 t('Please enter your licence number')
               );
         
        }
    }

    const navigate = async () => {
        props.updateLicenceNumber(licence_number);
        navigation.navigate('CreateDateOfBirth');
    }

    return (
        <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />     
            
            <View style={{    height: 60,
        backgroundColor: theme.background,
        flexDirection: 'row',
        alignItems: 'center'}}>
                <TouchableOpacity activeOpacity={1} onPress={go_back.bind(this)} style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon type={Icons.MaterialIcons} name="arrow-back" color={theme.textPrimary} style={{ fontSize: 30 }} />
                </TouchableOpacity>
            </View>
            <View style={{ margin: 20 }} />
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text numberOfLines={1} style={{ color: theme.textPrimary, fontSize: f_xl, fontFamily: regular }}>{t('Enter your licence number')}</Text>
                <View style={{ margin: 5 }} />
                <Text numberOfLines={1} style={{ color: theme.textSecondary, fontSize: f_xs, fontFamily: regular }}>{t('You need enter your licence number')}</Text>
                <View style={{ margin: 20 }} />
                <View style={{ width: '80%', }}>
                    <View style={{ flexDirection: 'row' ,backgroundColor:theme.surface,borderRadius:10,  borderWidth:.5,borderColor:theme.divider,}}>
                        <View style={{ width: '25%', alignItems: 'center', justifyContent: 'center', }}>
                            <Icon type={Icons.FontAwesome} name="id-card" color={theme.textPrimary} style={{ fontSize: 30 }} />
                        </View>
                        <View style={{ width: '75%', alignItems: 'flex-start', paddingLeft: 10, justifyContent: 'center',  }}>
                            <TextInput
                                ref={inputRef}
                                secureTextEntry={false}
                                placeholder={t('Licence Number')}
                                placeholderTextColor={theme.textSecondary}
                                style={{ fontSize: f_m,
        color: theme.textPrimary,
        fontFamily: regular,
        height: 60,
      
        width: '100%'}}
                                onChangeText={TextInputValue =>
                                    setLicenceNumber(TextInputValue)}
                            />
                        </View>
                    </View>
                    <View style={{ margin: 30 }} />
                    <TouchableOpacity onPress={check_valid.bind(this)} activeOpacity={1} style={{ width: '100%', backgroundColor: theme.primary, borderRadius: 10, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: theme.textPrimary, fontSize: f_m, color: theme.onPrimary, fontFamily: regular }}>{t('Next')}</Text>
                    </TouchableOpacity>
                </View>

            </View>
                    <Toast />
            
        </SafeAreaView>
    );
};


const mapDispatchToProps = (dispatch) => ({
    updateLicenceNumber: (data) => dispatch(updateLicenceNumber(data)),
});

export default connect(null, mapDispatchToProps)(CreateLicenceNumber);