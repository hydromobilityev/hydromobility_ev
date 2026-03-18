import {useTranslation} from 'react-i18next';
import '../languages/i18next';

import React, {useState, useRef, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  StatusBar,
  I18nManager,
  Modal,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as colors from '../assets/css/Colors';
import {
  normal,
  bold,
  regular,
  check_phone,
  api_url,
  btn_loader,
  f_xs,
  f_m,
  f_l,
} from '../config/Constants';
import PhoneInput from 'react-native-phone-input';

import axios from 'axios';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import {Picker} from '@react-native-picker/picker';
import Icon, {Icons} from '../components/Icons';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { useTheme } from '../context/ThemeContext';
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};
const CheckPhone = props => {
  const {t, i18n} = useTranslation();
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState(false);
  const [formattedValue, setFormattedValue] = useState('');
  const [language, setLanguage] = useState('en');
  const [modalVisible, setModalVisible] = useState(false);
  const languages = [
    {key: 'en', label: 'English'},
    {key: 'ar', label: 'swahili'},
  ];
  const { theme, toggleTheme, isDark } = useTheme();

  const phone = useRef(null);
useEffect(()=>{
    setTimeout(() => phone.current.focus(), 100)
},[])
  const go_back = () => {
    navigation.goBack();
  };
  const loadLang = async () => {
    // const savedLang = await AsyncStorage.getItem("language");
    const savedLang = 'en';

    if (savedLang) {
      setLanguage(savedLang);
      i18n.changeLanguage(savedLang);
    }
  };
  const showToast = (type, title, message) => {
    ReactNativeHapticFeedback.trigger('impactHeavy', options);

    Toast.show({
      type: type,
      text1: title,
      text2: message,
      visibilityTime: 5000,
      position: 'top', // top, bottom
    });
  };
  const check_valid = () => {
    console.log(props.initial_lat);
    if ('+' + phone.current?.getCountryCode() == phone.current?.getValue()) {
      setValidation(false);

      showToast(
        'error',
        t('Validation error'),
        t('Please Enter Valid Phone Number'),
      );
    } else if (!phone.current?.isValidNumber()) {
      setValidation(false);
      showToast(
        'error',
        t('Validation error'),
        t('Please Enter Valid Phone Number'),
      );
    } else {
      setValidation(true);
      //alert(phone.current?.getValue())
      setFormattedValue(phone.current?.getValue());
      call_check_phone(phone.current?.getValue());
    }
  };

  const call_check_phone = async phone_with_code => {
    setLoading(true);
    await axios({
      method: 'post',
      url: api_url + check_phone,
      data: {phone_with_code: phone_with_code},
    })
      .then(async response => {
        setLoading(false);
        navigate(response.data.result);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
        showToast('error', t('Error'), t('Sorry something went wrong'));
      });
  };

  const set_app_language = language => {
    return new Promise(async (resolve, reject) => {
      try {
        AsyncStorage.setItem('lang', language);
        resolve();
      } catch (e) {
        console.error('Failed to set language:', e);
        reject(e);
      }
    });
  };

    async function language_change(lang) {
      setLanguage(lang);
      AsyncStorage.setItem('language', lang);
      await i18n.changeLanguage(lang);
      
    }

  const navigate = async data => {
    let phone_number = phone.current?.getValue();
    phone_number = phone_number.replace(
      '+' + phone.current?.getCountryCode(),
      '',
    );
    if (data.is_available == 1) {
      navigation.navigate('Password', {
        phone_number: phone.current?.getValue(),
      });
    } else {
      navigation.navigate('OTP', {
        otp: data.otp,
        phone_with_code: phone.current?.getValue(),
        country_code: '+' + phone.current?.getCountryCode(),
        phone_number: phone_number,
        id: 0,
        from: 'register',
      });
    }
  };

  return (
  <SafeAreaView style={{ flex: 1, backgroundColor: theme.background,justifyContent:'center' }}>
  <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

  

  <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 25 }}>
    <Text style={{ color: theme.textPrimary, fontSize: f_l + 4, fontFamily: regular, fontWeight: '600' }}>
      {t('Enter your phone number')}
    </Text>
 
  </View>

  {/* Phone Input */}
  <View style={{ width: '85%', alignSelf: 'center' }}>
    <PhoneInput
      style={{
        borderRadius: 12,
        borderWidth: .5,
        borderColor: theme.divider,
        backgroundColor: theme.surface,
        paddingHorizontal: 12,
        height: 60,
      }}
      flagStyle={{ width: 30, height: 20 }}
      ref={phone}
      initialCountry="ng"
      offset={10}
      textStyle={{
        fontSize: 18,
        color: theme.textPrimary,
        fontFamily: regular,
      }}
      textProps={{
        placeholder: t('Phone Number'),
        placeholderTextColor: theme.textSecondary,
      }}
      autoFormat
    />

    <View style={{ marginVertical: 30 }} />

    {/* Login/Register Button */}
    {loading === false ? (
      <TouchableOpacity
        onPress={check_valid.bind(this)}
        activeOpacity={0.8}
        style={{
          width: '100%',
          backgroundColor: theme.primary,
          height: 50,
          borderRadius: 14,
          alignItems: 'center',
          justifyContent: 'center',
         
        }}
      >
        <Text style={{ color: theme.onPrimary, fontSize: f_m, fontFamily: regular, fontWeight: '600' }}>
          {t('Login')} / {t('Register')}
        </Text>
      </TouchableOpacity>
    ) : (
      <View style={{ height: 50, width: '100%', alignSelf: 'center' }}>
        <LottieView style={{ flex: 1 }} source={btn_loader} autoPlay loop />
      </View>
    )}

    <View style={{ marginVertical: 20 }} />

    {/* Language Selector */}
    <TouchableOpacity
      onPress={() => setModalVisible(true)}
      style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}
    >
      <Icon
        type={Icons.Ionicons}
        name="language-outline"
        color={theme.textSecondary}
        style={{ fontSize: 32 }}
      />
      <Text style={{ color: theme.textPrimary, fontSize: f_m, fontFamily: regular, marginTop: 5 }}>
        {i18n.language === 'en' ? 'English' :"swahili"}
      </Text>
    </TouchableOpacity>
  </View>

  {/* Language Modal */}
  <Modal
    transparent
    animationType="slide"
    visible={modalVisible}
    onRequestClose={() => setModalVisible(false)}
  >
    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.25)', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <View style={{
        width: '90%',
        maxWidth: 350,
        backgroundColor: theme.surface,
        borderRadius: 20,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 10,
      }}>
        <Text style={{
          fontSize: 22,
          fontWeight: regular,
          color: theme.textPrimary,
          marginBottom: 20,
          textAlign: 'center',
          borderBottomWidth: 2,
          borderBottomColor: theme.primary,
          paddingBottom: 10,
        }}>
          {t('Change Language')}
        </Text>

        <FlatList
          data={languages}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => language_change(item.key)}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 15,
                marginVertical: 5,
                backgroundColor: theme.background,
                borderRadius: 12,
                borderLeftWidth: 4,
                borderLeftColor: i18n.language === item.key ? theme.primary : 'transparent',
              }}
            >
              <Text style={{
                fontSize: 18,
                color: i18n.language === item.key ? theme.textPrimary : theme.textSecondary,
              }}>
                {item.label}
              </Text>
              {i18n.language === item.key && (
                <View style={{
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  backgroundColor: theme.primary,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Text style={{ color: '#fff', fontSize: 14 }}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={{
            marginTop: 20,
            padding: 15,
            borderRadius: 12,
            backgroundColor: theme.primary,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: theme.primary,
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 5,
          }}
        >
          <Text style={{ color: theme.onPrimary, fontSize: 18,fontFamily:regular}}>
            {t('Close')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>

  <Toast />
</SafeAreaView>

  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: colors.lite_bg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textinput: {
    fontSize: f_l,
    color: colors.grey,
    fontFamily: regular,
    height: 60,
    backgroundColor: '#FAF9F6',
  },
  flag_style: {
    width: 38,
    height: 24,
  },
  country_text: {
    fontSize: 18,
    borderBottomWidth: 1,
    paddingBottom: 8,
    height: 35,
    fontFamily: regular,
    color: colors.theme_fg_two,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    color: 'black',
    fontFamily: bold,
    marginBottom: 20,
  },
  languageOption: {
    padding: 10,
    width: '100%',
  },
  languageText: {
    color: 'black',
    fontSize: 16,
    fontFamily: regular,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: regular,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CheckPhone;
