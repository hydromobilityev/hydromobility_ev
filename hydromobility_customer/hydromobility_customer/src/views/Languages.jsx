


import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Dimensions, Modal, StatusBar, FlatList } from 'react-native';
import { api_url, bold, check_phone, f_m, full_logo, logo, normal, regular } from '../config/Constants';
import { useNavigation } from '@react-navigation/native';
import Icon, { Icons } from '../components/Icons';

import RNRestart from 'react-native-restart';

import { useTranslation } from "react-i18next";
import '../languages/i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme_bg, theme_bg_three } from '../assets/css/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const Languages = () => {
  
  const navigation = useNavigation();
    const { t, i18n } = useTranslation();
  



  const languages = [
    {key: 'en', label: 'English'},
    {key: 'ar', label: 'Swahili'}
  ];


 async function language_change(lang) {
      
      AsyncStorage.setItem('language', lang);
      await i18n.changeLanguage(lang);
    
        if (I18nManager.isRTL) {
          I18nManager.forceRTL(false);
          I18nManager.allowRTL(false);
          RNRestart.Restart(); // Restart to apply LTR
        }
      
    }

 

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
    
 <TouchableOpacity onPress={()=>navigation.toggleDrawer()} style={{}}>
              <Icon
                type={Icons.Ionicons}
                name="arrow-back-outline"
                style={{
                       fontSize: 25,
                          color: '#000',
                }}
              />
            </TouchableOpacity>
 <Text
                  style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    color: '#2c3e50',
                    marginBottom: 20,
                    textAlign: 'center',
                    borderBottomWidth: 2,
                    borderBottomColor: '#3498db',
                    paddingBottom: 10,
                  }}>
                  {t('Change Language')}
                </Text>

                <FlatList
                  data={languages}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => language_change(item.key)}
                      style={{
                        padding: 15,
                        marginVertical: 5,
                        backgroundColor:
                          i18n.language === item.key ? '#e3f2fd' : '#f8f9fa',
                        borderRadius: 10,
                        borderLeftWidth: 4,
                        borderLeftColor:
                          i18n.language === item.key
                            ? '#3498db'
                            : 'transparent',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          color:
                            i18n.language === item.key ? '#2c3e50' : '#7f8c8d',
                        }}>
                        {item.label}
                      </Text>
                      {i18n.language === item.key && (
                        <View
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            backgroundColor: '#3498db',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={{color: 'white', fontSize: 14}}>✓</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item.key}
                />
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme_bg_three,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30, marginTop: 20
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: bold,
    color: '#000000',
  },

  inputContainer: {
    marginBottom: 20,
  },

  inputLabel: {
    fontFamily: regular,
    fontSize: 14,
    color: '#000000',
  },

  phoneInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3ECEC',
    color: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '100%',

    height: 50,
    marginTop: 5,
    marginRight: 5,
    marginBottom: 16,
    overflow: 'hidden',
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
    borderRightWidth: 5,
    borderRightColor: '#ECDFE2',
    paddingHorizontal: 12,
    backgroundColor: '#F3ECEC',
    height: '100%',
    justifyContent: 'center',
  },
  countryCodeText: {
    fontSize: 16,
    color: 'black',
    marginRight: 8,
  },

  dropdownIcon: {
    width: 16,
    height: 16,
  },
  phoneInputField: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    paddingHorizontal: 12,
    height: '100%',
    backgroundColor: '#F3ECEC',
  },
  checkIcon: {
    width: 20,
    height: 20,
  },
  continueButton: {
    backgroundColor: '#9824E5',
    height: 50,
    justifyContent: 'center',
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonText: {
    fontFamily: regular,
    color: 'white',
    fontSize: 14,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#B7B7B7',
  },
  dividerText: {
    paddingHorizontal: 5,
    color: '#B7B7B7',
    fontSize: 14,
  },
  socialButtonsContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3ECEC',
    marginTop: 10,
    borderRadius: 5,
    height: 48,
    marginBottom: 10,
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  socialButtonText: {
    fontFamily: bold,
    fontSize: 16,
    color: '#000000',
  },
  findAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  findAccountText: {
    fontFamily: normal,
    fontSize: 16,
    color: '#000000',
    margin: 8,
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  footerText: {
    fontFamily: regular,
    color: '#00000080',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
    marginBottom: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end', // Changed from 'center' to 'flex-end'
  },
  modalContainer: {
    width: '100%', // Changed from width * 0.8 to full width
    backgroundColor: 'white',
    borderTopLeftRadius: 25, // Only round top corners
    borderTopRightRadius: 25,
    padding: 24,
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: normal,
    fontSize: 22,
    marginBottom: 16,
    color: '#000000',
  },
  modalText: {
    fontFamily: regular,
    fontSize: 16,
    color: '#000000',
    textAlign: 'left',
    marginBottom: 24,
    lineHeight: 24,
  },
  modalButton: {
    backgroundColor: '#9824E5',
    // paddingVertical: 12,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 150,
    borderRadius: 8,
  },
  modalButtonText: {
    fontFamily: normal,
    color: 'white',
    fontSize: 14,
  },
});

export default Languages;