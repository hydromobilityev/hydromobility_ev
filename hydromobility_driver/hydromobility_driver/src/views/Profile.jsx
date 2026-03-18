import { useTranslation } from "react-i18next";
import '../languages/i18next';
import React, { useState, useEffect, useCallback } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  StatusBar,
  ActivityIndicator
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as colors from '../assets/css/Colors';
import Icon, { Icons } from '../components/Icons';
import { bold, regular, api_url, get_profile, profile_picture_upload, profile_picture_update, img_url, f_xl, f_m, normal } from '../config/Constants';
import axios from 'axios';
import * as ImagePicker from "react-native-image-picker";
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import RNFS from "react-native-fs";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useTheme } from "../context/ThemeContext";
import { updateFirstName } from "../actions/RegisterActions";

const haptic_option = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const Profile = (props) => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [on_load, setOnLoad] = useState(0);
  const [data, setData] = useState({});
  const { theme, isDark } = useTheme(); // Using theme from context

  const go_back = () => {
    ReactNativeHapticFeedback.trigger("impactLight", haptic_option);
    navigation.goBack();
  };

  useFocusEffect(
    useCallback(() => {
      call_get_profile();
      return () => {};
    }, [])
  );

  const call_get_profile = () => {
    setLoading(true);
    axios.post(api_url + get_profile, { driver_id: global.id, lang: i18n.language })
      .then(async (response) => {
        setLoading(false);
        setData(response.data.result);
        setOnLoad(1);
        props.updateFirstName(response.data.result.first_name);
      })
      .catch((err) => {

        setLoading(false);
        showToast("error", t('Error'), t('Sorry something went wrong'));

      });
  };

  const navigate = (route) => {
    navigation.navigate(route);
  };

  const showToast = (type, title, message) => {
    ReactNativeHapticFeedback.trigger("impactLight", haptic_option);
    Toast.show({
      type,
      text1: title,
      text2: message,
      visibilityTime: 5000,
      position: "top",
    });
  };

  const select_photo = async () => {
    const options = { mediaType: "photo", quality: 1 };
    ImagePicker.launchImageLibrary(options, async (response) => {
      if (response.assets && response.assets.length > 0) {
        const imageUri = response.assets[0].uri;
        try {
          const base64String = await RNFS.readFile(imageUri, "base64");
          call_profile_picture_upload(base64String);
        } catch (err) {
          console.log("Error converting image to Base64:", err);
        }
      }
    });
  };

  const call_profile_picture_upload = async (data_img) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", { name: "image.png", type: "image/png", uri: `data:image/png;base64,${data_img}` });
      const response = await axios.post(api_url + profile_picture_upload, formData, { headers: { "Content-Type": "multipart/form-data" } });
      if (response.data.result) call_profile_picture_update(response.data.result);
    } catch (err) {
      setLoading(false);
      showToast("error", t('Error'), t('Error on while upload try again later'));
    }
  };

  const call_profile_picture_update = async (data_img) => {
    try {
      const response = await axios.post(api_url + profile_picture_update, { id: global.id, profile_picture: data_img });
      if (response.data.status == 1) {
        setLoading(false);
        showToast("success", t('Success'), t('Your Profile Picture Update Successfully'));
        saveProfilePicture(data_img);
        call_get_profile();
      } else {
        showToast("error", t('Error'), response.data.message);
      }
    } catch (err) {
      setLoading(false);
      showToast("error", t('Error'), t('Sorry something went wrong'));
    }
  };

  const saveProfilePicture = async (data_img) => {
    try {
      await AsyncStorage.setItem('profile_picture', data_img.toString());
      call_get_profile();
      global.profile_picture = data_img;
    } catch (e) {
      showToast("error", t('Error'), e);
    }
  };

  const profileFields = [
    { label: t('First Name'), value: data.first_name, icon: 'person', screen: 'EditFirstName' },
    { label: t('Last Name'), value: data.last_name, icon: 'person', screen: 'EditLastName' },
    { label: t('Email'), value: data.email, icon: 'email', screen: 'EditEmail' },
    { label: t('Phone Number'), value: data.phone_with_code, icon: 'smartphone' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar translucent backgroundColor="transparent" barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <TouchableOpacity onPress={go_back} style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="arrow-back" type={Icons.MaterialIcons} color={theme.textPrimary} style={{ fontSize: 30 }} />
        </TouchableOpacity>
        <View style={{ width: '85%', justifyContent: 'center' }}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: theme.textPrimary, fontSize: f_xl, fontFamily: regular }}>
            {t('Edit Profile')}
          </Text>
        </View>
      </View>

      {/* Scroll Content */}
      <ScrollView style={{ flex: 1, backgroundColor: theme.background }} showsVerticalScrollIndicator={false}>
        {on_load === 1 && (
          <View style={{ paddingVertical: 20 }}>
            {/* Profile Picture */}
            <View style={{ alignItems: 'center', marginBottom: 30 }}>
              <TouchableOpacity onPress={select_photo} activeOpacity={0.8} style={{
                width: 140, height: 140, borderRadius: 70, backgroundColor: theme.background,
                justifyContent: 'center', alignItems: 'center', shadowColor: theme.shadow_color,
                shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5,
                borderWidth: 3, borderColor: theme.divider
              }}>
                {loading ? <ActivityIndicator size={40} color={theme.primary} /> :
                  <Image style={{ width: '100%', height: '100%', borderRadius: 70, borderWidth: 3, borderColor: theme.background }}
                    source={{ uri: img_url + data.profile_picture }} />}
              </TouchableOpacity>
              <Text style={{ marginTop: 15, fontSize: 18, color: theme.textSecondary, fontFamily:regular, letterSpacing: 0.5 }}>
                {t('Say a little bit about yourself')}...
              </Text>
            </View>

            {/* Profile Fields */}
            <View style={{ paddingHorizontal: 25 }}>
              {profileFields.map((item, index) => (
                <View key={index} style={{ marginBottom: 20 }}>
                  <Text style={{ color: theme.textSecondary, fontSize: 14, marginBottom: 8, fontFamily:regular }}>
                    {item.label}
                  </Text>
                  <TouchableOpacity
                    onPress={item.screen ? () => navigate(item.screen) : null}
                    activeOpacity={0.9}
                    style={{ flexDirection: 'row', backgroundColor: theme.surface, borderRadius: 6, overflow: 'hidden', borderColor: theme.divider, borderWidth: 0.5, height: 60 }}>
                    <View style={{ width: 50, justifyContent: 'center', alignItems: 'center' }}>
                      <Icon name={item.icon} type={Icons.MaterialIcons} color={theme.textSecondary} style={{ fontSize: 24 }} />
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 15 }}>
                      <Text style={{ fontFamily:regular, fontSize: 16, color: theme.textPrimary }}>
                        {item.value}
                      </Text>
                    </View>
                    {item.screen && (
                      <View style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
                        <Icon name="chevron-right" type={Icons.MaterialIcons} color={theme.textSecondary} style={{ fontSize: 24 }} />
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: { height: 70, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 },
});

const mapDispatchToProps = (dispatch) => ({
  updateFirstName: (data) => dispatch(updateFirstName(data))
});

export default connect(null, mapDispatchToProps)(Profile);
