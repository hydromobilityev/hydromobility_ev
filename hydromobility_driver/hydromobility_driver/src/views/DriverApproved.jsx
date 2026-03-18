import { useTranslation } from "react-i18next";
import '../languages/i18next.js';

import React, {useState, useEffect} from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Linking, StatusBar} from 'react-native';
import { app_update, bold, regular, api_url, check_document_status, approved, normal } from '../config/Constants';
import Lottie from 'lottie-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import RNRestart from 'react-native-restart';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from "../context/ThemeContext.js";

const DriverApproved = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const [id, setId] = useState(route.params.id);
const { theme, isDark,toggleTheme } = useTheme();
  const navigate_home = () =>{
    AsyncStorage.setItem(
        "approved_status",
        '1'
    );
    global.approved_status = 1;
    RNRestart.Restart();
  }

  return (
    <SafeAreaView style={{  flex: 1,
    backgroundColor:theme.background,
    padding:10,}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <View style={{ alignItems: "center", marginTop: "40%", padding: 20 }}>
        <Lottie
          style={{ height: 300, width: 300 }}
          source={approved}
          autoPlay
          loop
        />
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text
          adjustsFontSizeToFit={true}
          style={{
            textAlign: "center",
            color: theme.textPrimary,
            fontFamily: regular,
            fontSize: 14,
          }}
        >
          {t('Your document is verified by the admin successfully')}
        </Text>
      </View>
      <View style={{ margin: 10 }} />
      <TouchableOpacity
        onPress={navigate_home}
        style={{
          width: "100%",
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.primary,
          borderRadius: 10,
          
        }}
      >
        <Text
          adjustsFontSizeToFit={true}
          style={{
            color: theme.onPrimary,
            fontFamily: regular,
            fontSize: 14,
          }}
        >
          {t('Login')}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default DriverApproved;
