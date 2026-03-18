import { useTranslation } from "react-i18next";
import '../languages/i18next.js';

import React, { useState, useEffect, useRef } from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    FlatList,
    StatusBar
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { bold, regular, vehicle_type_list, api_url, f_xl, f_m, f_s, normal } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import { connect } from 'react-redux';
import { updateVehicleType, updateVehicleTypeLbl } from '../actions/VehicleDetailActions';
import { Checkbox } from 'react-native-paper';
import axios from 'axios';

import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useTheme } from "../context/ThemeContext.js";
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};
const CreateVehicleType = (props) => {
  const { t, i18n } = useTranslation();
    const navigation = useNavigation();
    const [vehicle_type, setVehicleType] = useState(0);
    const [vehicle_type_lbl, setVehicleTypeLbl] = useState(0);
    const [loading, setLoading] = useState(false);
    const [vehicle_categories, setVehicleCategories] = useState([]);
   const { theme, isDark } = useTheme();

    const go_back = () => {
        navigation.goBack();
    }

    useEffect(() => {
        call_vehicle_type_list();
    }, []);
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
    const call_vehicle_type_list = async () => {
        setLoading(true);
        await axios({
            method: 'post',
            url: api_url + vehicle_type_list,
            data: { lang: i18n.language }
        })
            .then(async response => {
                setLoading(false);
                setVehicleCategories(response.data.result);
            })
            .catch(error => {
                setLoading(false);
                 showToast(
                   "error",
                   t('Validation error'),
                   t('Sorry something went wrong')
                 );
               
            });
    }

    const check_valid = () => {
        if (vehicle_type) {
            navigate();
        } else {
             showToast(
               "error",
               t('Validation error'),
               t('Please select your vehicle type')
             );
          
           
        }
    }

    const navigate = async () => {
        props.updateVehicleType(vehicle_type);
        props.updateVehicleTypeLbl(vehicle_type_lbl);
        go_back();
    }

    const update_vehicle_type = (id, name) => {
        setVehicleType(id);
        setVehicleTypeLbl(name);
    }


    return (
     <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }}>
  <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

  {/* Header */}
  <View
    style={{
      height: 60,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
  
    }}
  >
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={go_back.bind(this)}
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
       
      
      }}
    >
      <Icon
        type={Icons.MaterialIcons}
        name="arrow-back"
        color={theme.textPrimary}
        style={{ fontSize: 26 }}
      />
    </TouchableOpacity>
  </View>

  {/* Content */}
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', padding: 20 }}>
    <Text
      numberOfLines={1}
      style={{
        color: theme.textPrimary,
        fontSize: f_xl,
        fontFamily: regular,
        textAlign: 'center',
        marginTop: 10,
      }}
    >
      {t('Select your vehicle type')}
    </Text>

    <View style={{ marginVertical: 25, width: '100%', alignItems: 'center' }}>
      <FlatList
        data={vehicle_categories}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={update_vehicle_type.bind(this, item.id, item.vehicle_type)}
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              width: '95%',
              backgroundColor: theme.surface,
              borderRadius: 12,
              padding: 15,
              marginVertical: 8,
              alignItems: 'center',
           
            }}
          >
            <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
              <Checkbox
                status={vehicle_type === item.id ? 'checked' : 'unchecked'}
                onPress={() => update_vehicle_type(item.id, item.vehicle_type)}
                color={theme.primary}
                uncheckedColor={theme.textSecondary}
              />
            </View>
            <View style={{ width: '85%' }}>
              <Text style={{ color: theme.textPrimary, fontSize: f_s, fontFamily: regular }}>
                {item.vehicle_type}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Done Button */}
      <TouchableOpacity
        onPress={check_valid.bind(this)}
        activeOpacity={0.8}
        style={{
          width: '95%',
          backgroundColor: theme.primary,
          borderRadius: 12,
          height: 52,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: theme.shadow_color,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 6,
          elevation: 4,
          marginTop: 25,
        }}
      >
        <Text style={{ fontSize: f_m, color: theme.onPrimary, fontFamily: normal }}>
          {t('Done')}
        </Text>
      </TouchableOpacity>
    </View>
  </View>

  <Toast />
</SafeAreaView>

    );
};



const mapDispatchToProps = (dispatch) => ({
    updateVehicleType: (data) => dispatch(updateVehicleType(data)),
    updateVehicleTypeLbl: (data) => dispatch(updateVehicleTypeLbl(data)),
});

export default connect(null, mapDispatchToProps)(CreateVehicleType);