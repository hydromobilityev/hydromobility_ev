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
import { normal, bold, regular, f_xl, f_xs, f_m } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import { connect } from 'react-redux';
import { updateEmail } from '../actions/RegisterActions';
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useTheme } from "../context/ThemeContext";
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const CreateEmail = (props) => {
  const { t, i18n } = useTranslation();
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const inputRef = useRef();
  const { theme, toggleTheme, isDark } = useTheme();

    const go_back = () => {
        navigation.goBack();
    }

    useEffect(() => {
        setTimeout(() => inputRef.current.focus(), 100)
    }, []);


    const check_valid = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)/;
        if(email==""){
            showToast(
                "error",
                t('Validation error'),
                t('Please enter valid email')
            );
        }
        else if (reg.test(email) === false) {
            showToast(
              "error",
              t('Validation error'),
              t('Please enter valid email')
            );
          
            setEmail(email)
            return false;
        }
        else {
            setEmail(email)
            navigate();
        }
    }
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
    const navigate = async () => {
        props.updateEmail(email);
        navigation.navigate('CreatePassword');
    }


    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
  <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

  {/* Header */}
  <View style={{ height: 70, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
    <TouchableOpacity
      activeOpacity={1}
      onPress={go_back.bind(this)}
      style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}
    >
      <Icon
        type={Icons.MaterialIcons}
        name="arrow-back"
        color={theme.textPrimary}
        style={{ fontSize: 30 }}
      />
    </TouchableOpacity>
    <View style={{ width: '85%', justifyContent: 'center' }} />
  </View>

  <View style={{ marginVertical: 20 }} />

  {/* Title and Subtitle */}
  <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
    <Text style={{ color: theme.textPrimary, fontSize: f_xl, fontFamily: regular }}>
      {t('Enter your email address')}
    </Text>
    <View style={{ height: 5 }} />
   
  </View>

  <View style={{ marginVertical: 20 }} />

  {/* Email Input */}
  <View style={{
    width: '85%',
    alignSelf: 'center',
    borderRadius: 12,
    backgroundColor: theme.surface,

    marginBottom: 30,
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
        name="email"
        color={theme.textSecondary}
        style={{ fontSize: 28 }}
      />
    </View>
    <View style={{ width: '75%', paddingLeft: 12 }}>
      <TextInput
        ref={inputRef}
        placeholder={t('Email')}
        secureTextEntry={false}
        placeholderTextColor={theme.textSecondary}
        style={{
          fontSize: 18,
          fontFamily: regular,
          color: theme.textPrimary,
         
          paddingVertical: 6,
        }}
        onChangeText={TextInputValue => setEmail(TextInputValue)}
      />
    </View>
  </View>

  {/* Next Button */}
  <TouchableOpacity
    onPress={check_valid.bind(this)}
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
    updateEmail: (data) => dispatch(updateEmail(data)),
});

export default connect(null, mapDispatchToProps)(CreateEmail);