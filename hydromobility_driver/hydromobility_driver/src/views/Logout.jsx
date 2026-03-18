import { useTranslation } from "react-i18next";
import '../languages/i18next.js';
import database from '@react-native-firebase/database';

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  SafeAreaView
} from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { connect } from 'react-redux';
import { api_url, change_online_status, f_s, regular } from '../config/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as colors from '../assets/css/Colors';



const Logout = (props) => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    global.live_status = 0;
    AsyncStorage.clear();
    AsyncStorage.setItem('hasSeenNotice', 'true');
    call_change_online_status(0);
    update_location_in_firebase(0,0,0)
  }, []);
 const update_location_in_firebase = (latitude, longitude, bearing) => {
    database().ref(`drivers/${global.vehicle_type}/${global.id}/geo`).update({
      lat: latitude,
      lng: longitude,
      bearing: bearing,
     
    });
   
  };
  const navigate = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "CheckPhone" }],
      })
    );
  }

  const call_change_online_status = async (status) => {
    setLoading(true);
    await axios({
      method: 'post',
      url: api_url + change_online_status,
      data: { id: global.id, online_status: status ,type:1}
    })
      .then(async response => {
        setLoading(false);
        navigate();
      })
      .catch(error => {
        setLoading(false);
      });
  }

  return (
    <SafeAreaView
      style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Text
        style={{
          color: colors.theme_fg_two,
          fontSize: f_s,
          fontFamily: regular,
        }}
      >
        {t('Loading')}...
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logo_container: {
    flex: 1
  }
});

export default connect(null, null)(Logout);