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
import { useNavigation, useRoute } from "@react-navigation/native";
import * as colors from '../assets/css/Colors';
import { normal, bold, regular, f_xl, f_xs, f_m, f_l } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import { updatePhoneNumber, updatePhoneWithCode, updateCountryCode } from '../actions/RegisterActions';
import { connect } from 'react-redux';
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useTheme } from "../context/ThemeContext";
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
    const inputRef = useRef();
  const { theme, toggleTheme, isDark } = useTheme();

    const go_back = () => {
        navigation.goBack();
    }

    useEffect(() => {
        if (global.mode == 'DEMO') {
            setTimeout(() => {
                check_valid(otp);
            }, 1000)
        } else {
            //this.start_timer()
        }
        setTimeout(() => inputRef.current.focus(), 100)
    }, []);
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
 <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
  <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

  {/* Header */}
  <View style={{ height: 70, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
    <TouchableOpacity
      activeOpacity={1}
      onPress={go_back.bind(this)}
      style={{ width: '15%', alignItems: 'center', justifyContent: 'center', }}
    >
      <Icon
        type={Icons.MaterialIcons}
        name="arrow-back"
        color={theme.textPrimary}
        style={{ fontSize: 30 }}
      />
    </TouchableOpacity>
    
  </View>

  <View style={{ marginVertical: 20 }} />

  {/* Instruction */}
  <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
    <Text style={{ color: theme.textPrimary, fontSize: f_l, fontFamily: regular }}>
      {t('Enter the OTP')}
    </Text>
    <View style={{ height: 5 }} />
    <Text style={{ color: theme.textSecondary, fontSize: f_xs, fontFamily: normal, textAlign: 'center', lineHeight: 20 }}>
      {t('Enter your OTP received from the SMS')}
    </Text>
  </View>

  <View style={{ marginVertical: 20 }} />

  {/* OTP Input Card */}
  <View style={{
    width: '85%',
    alignSelf: 'center',
    borderRadius: 12,
    backgroundColor: theme.surface,
    
    flexDirection: 'row',
    alignItems: 'center',
     borderWidth: .5,
             height: 60,
        borderColor: theme.divider,
  }}>
    <View style={{
      width: '25%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
    }}>
      <Icon
        type={Icons.MaterialIcons}
        name="dialpad"
        color={theme.textSecondary}
        style={{ fontSize: 28 }}
      />
    </View>
    <View style={{ width: '75%', paddingLeft: 12 }}>
      <TextInput
        ref={inputRef}
        secureTextEntry={false}
        placeholder={t('OTP')}
        keyboardType='numeric'
        placeholderTextColor={theme.textSecondary}
        style={{
          fontSize: 18,
          fontFamily: regular,
          color: theme.textPrimary,

          paddingVertical: 6,
        }}
        onChangeText={TextInputValue => setValue(TextInputValue)}
      />
    </View>
  </View>

  <View style={{ marginVertical: 30 }} />

  {/* Submit Button */}
  <TouchableOpacity
    onPress={check_valid.bind(this, value)}
    activeOpacity={0.8}
    style={{
      width: '85%',
      alignSelf: 'center',
      backgroundColor: theme.primary,
      borderRadius: 12,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: theme.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 6,
      elevation: 6,
    }}
  >
    <Text style={{ color: theme.onPrimary, fontSize: f_m, fontFamily: normal }}>
      {t('Next')}
    </Text>
  </TouchableOpacity>

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


const mapDispatchToProps = (dispatch) => ({
    updatePhoneNumber: (data) => dispatch(updatePhoneNumber(data)),
    updatePhoneWithCode: (data) => dispatch(updatePhoneWithCode(data)),
    updateCountryCode: (data) => dispatch(updateCountryCode(data)),
});

export default connect(null, mapDispatchToProps)(OTP);