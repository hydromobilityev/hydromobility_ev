import { useTranslation } from "react-i18next";
import '../languages/i18next';

import React, { useState, useRef } from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    StatusBar,
    ScrollView,
    TextInput
} from "react-native";
import { CommonActions, useNavigation, useRoute } from "@react-navigation/native";
import * as colors from '../assets/css/Colors';
import { screenHeight, screenWidth, api_url, add_complaint, bold, regular, btn_loader, f_xl, f_m, f_s, normal } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import DropShadow from "react-native-drop-shadow";
import LottieView from 'lottie-react-native';
import axios from 'axios';
import { SafeAreaView } from "react-native-safe-area-context";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};
import Toast from "react-native-toast-message";
import { useTheme } from "../context/ThemeContext";

const CreateComplaint = (props) => {
  const { t, i18n } = useTranslation();
    const navigation = useNavigation();
    const { theme, toggleTheme, isDark } = useTheme();
    
    const route = useRoute();
    const [loading, setLoading] = useState(false);
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [trip_id, setTripId] = useState(route.params.trip_id);
    const [complaint_category_id, setComplaintCategoryId] = useState(route.params.complaint_category_id);
    const [complaint_sub_category_id, setComplaintSubCategoryId] = useState(route.params.complaint_sub_category_id);
    const [complaint_category_name, setComplaintCategoryName] = useState(route.params.complaint_category_name);
    const [sub_category_data, setSubCategoryData] = useState(route.params.sub_category_data);
    
    const inputRef = useRef();
    const go_back = () => {
        navigation.goBack();
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

    const call_validation = () => {
        if(subject == "" || description == ""){
           showToast("error", t('Validation error'), t('Please enter all the required fields'));

         
        }else{
            call_add_complaint();
        }
    }

    const call_add_complaint = () => {
        console.log({ trip_id:trip_id, complaint_category:complaint_category_id, complaint_sub_category:complaint_sub_category_id, subject:subject, description:description })
        setLoading(true);
        axios({
            method: 'post',
            url: api_url + add_complaint,
            data: { trip_id:trip_id, complaint_category:complaint_category_id, complaint_sub_category:complaint_sub_category_id, subject:subject, description:description }
        })
            .then(async response => {
                setLoading(false);
                if(response.data.status == 1){
                    navigate_bill();
                    
                }else{
                  
                }
            })
            .catch(error => {
                setLoading(false);
                
            });
    }

    const navigate_bill = () => {
      navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [{ name: "Home" }],
                      })
                    );
    }

    return (
   <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }}>
  <StatusBar
    translucent
    backgroundColor="transparent"
    barStyle="dark-content"
  />

  {/* Header */}
  <View
    style={{
      height: 60,
      backgroundColor: theme.background,
      flexDirection: 'row',
      alignItems: 'center',
    }}
  >
    <TouchableOpacity
      activeOpacity={1}
      onPress={go_back.bind(this)}
      style={{ width: "15%", alignItems: "center", justifyContent: "center" }}
    >
      <Icon
        type={Icons.MaterialIcons}
        name="arrow-back"
        color={theme.textPrimary}
        style={{ fontSize: 30 }}
      />
    </TouchableOpacity>

    <View
      style={{
        width: "85%",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{
          color: theme.textPrimary,
          fontSize: f_xl,
          fontFamily: regular,
        }}
      >
        {t('Complaint')}
      </Text>
    </View>
  </View>

  {/* Content */}
  <ScrollView style={{ paddingHorizontal: 20, backgroundColor: theme.background }}>
  <View style={{ height: 5 }} />

  {/* Complaint Category */}
  <DropShadow
    style={{
      width: "100%",
      marginBottom: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 5,
    }}
  >
    <View
      style={{
        width: "100%",
        backgroundColor: theme.surface,
        borderRadius: 12,
        padding: 20,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: "#f0f0f0",
      }}
    >
      <Text style={{ color: theme.textPrimary, fontSize: f_m, fontFamily: regular, marginBottom: 5 }}>
        {complaint_category_name} / {sub_category_data.complaint_sub_category_name}
      </Text>
      <Text style={{ color: theme.textSecondary, fontSize: f_s, fontFamily: regular }}>
        {sub_category_data.short_description}
      </Text>
    </View>
  </DropShadow>

  {/* Complaint Form */}
  <DropShadow
    style={{
      width: "100%",
      marginBottom: 15,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 5,
    }}
  >
    <View
      style={{
        width: "100%",
        backgroundColor: theme.surface,
        borderRadius: 12,
        padding: 20,
        marginVertical: 5,
      }}
    >
      {/* Subject Input */}
      <View
        style={{
          width: "100%",
          backgroundColor: theme.background,
          borderRadius: 10,
          borderWidth: 1,
          borderStyle: "dotted",
          borderColor: "#d1d1d1",
          paddingHorizontal: 12,
          paddingVertical: 8,
        }}
      >
        <TextInput
          ref={inputRef}
         
          placeholder={t("Subject")}
          placeholderTextColor={colors.grey}
          style={{ fontSize: f_m, fontFamily: regular, color: theme.textPrimary,height:40 }}
          onChangeText={setSubject}
        />
      </View>

      <View style={{ height: 15 }} />

      {/* Description Input */}
      <View
        style={{
          width: "100%",
          backgroundColor: theme.background,
          borderRadius: 10,
          borderWidth: 1,
          borderStyle: "dotted",
          borderColor: "#d1d1d1",
          paddingHorizontal: 12,
          paddingVertical: 10,
        }}
      >
        <TextInput
          placeholder={t("Enter details about your complaint")}
          placeholderTextColor={theme.textSecondary}
          multiline
          numberOfLines={8}
          style={{ fontSize: f_s, fontFamily: regular, color: theme.textPrimary, height:100,textAlignVertical: "top" }}
          onChangeText={setDescription}
        />
      </View>

      <View style={{ height: 20 }} />

      {/* Submit Button */}
      {loading ? (
        <View style={{ height: 50, width: "90%", alignSelf: "center" }}>
          <LottieView source={btn_loader} autoPlay loop />
        </View>
      ) : (
        <TouchableOpacity
          onPress={call_validation}
          activeOpacity={0.8}
          style={{
            width: "100%",
            height: 50,
            backgroundColor: theme.primary,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          }}
        >
          <Text style={{ color: theme.onPrimary, fontSize: f_m, fontFamily: regular }}>
            {t("Submit")}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  </DropShadow>

  <View style={{ height: 50 }} />
</ScrollView>


  <Toast />
</SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: screenHeight,
        width: screenWidth,
        backgroundColor: colors.lite_bg
    },
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
        borderRadius:10,
        backgroundColor: colors.text_container_bg,
        width: '100%'
    },
    textarea: {
        fontSize: f_m,
        color: colors.grey,
        fontFamily: regular,
        borderRadius:10,
        padding:10,
        textAlignVertical: 'top',
        backgroundColor: colors.text_container_bg,
        width: '100%'
    },
});

export default CreateComplaint;