import { useTranslation } from "react-i18next";
import '../languages/i18next.js';

import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet, View, Text, TouchableOpacity, Image, StatusBar
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { connect } from 'react-redux';
import axios from 'axios';
import * as ImagePicker from "react-native-image-picker";

import { bold, api_url, image_upload, img_url, update_document, btn_loader, f_m, normal, register, regular } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import LottieView from 'lottie-react-native';

import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import RNFS from "react-native-fs";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useTheme } from "../context/ThemeContext.js";
const haptic_options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};


const DocumentUpload = (props) => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
 
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(route.params.status);
  const [slug, setSlug] = useState(route.params.slug);
  const [path, setPath] = useState(route.params.path);
  const [table, setTable] = useState(route.params.table);
   const { theme, isDark ,toggleTheme} = useTheme();
  const [find_field, setFindField] = useState(route.params.find_field);
  const [find_value, setFindValue] = useState(route.params.find_value);
  const [status_field, setStatusField] = useState(route.params.status_field);
  const [img_data, setImageData] = useState(undefined);
const options = {
  title: t('Select a photo'),
  takePhotoButtonTitle: t('Take a photo'),
  chooseFromLibraryButtonTitle: t('Choose from gallery'),
  base64: true,
  quality: 1,
  maxWidth: 500,
  maxHeight: 500,
};
  useEffect(() => {

  }, []);

  const go_back = () => {
    navigation.goBack();
  }


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
  const select_photo = async () => {
    const options = {
      mediaType: "photo",
      quality: 1,
    };

    ImagePicker.launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        const imageUri = response.assets[0].uri;
        setImageData(imageUri);

        try {
          // Read file as base64
          const base64String = await RNFS.readFile(imageUri, "base64");
          await call_upload_document(base64String, imageUri);
        } catch (err) {
          console.log("Error converting image to Base64:", err);
        }
      }
    });
  };

  const call_upload_document = async (base64Data, uri) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("image", {
      name: "image.png",
      type: "image/png",
      uri, // Direct file URI
    });

    formData.append("upload_path", "drivers/vehicle_documents");

    try {
      const response = await axios.post(api_url + image_upload, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.result) {
        call_update_document(response.data.result);
      }
    } catch (err) {
      console.log("Error uploading image:", err);
      setLoading(false);
      showToast(
        "error",
        t('Error'),
        t('Error on while upload try again later')
      );
    }
  };

  const call_update_document = async (path) => {
    await axios({
      method: 'post',
      url: api_url + update_document,
      data: { table: table, find_field: find_field, find_value: find_value, update_field: slug, update_value: path, status_field: status_field }
    })
      .then(async response => {
        setLoading(false);
        if (response.data.status == 1) {
          setPath({ uri: img_url + path });
          setStatus(15);
           showToast(
             "success",
             t('Success'),
             t('Successfully uploaded your document')
           );
       
        }
      })
      .catch(error => {
        setLoading(false);
         showToast("error", t('Error'), t('Sorry something went wrong'));
       
        
      });
  }

  const show_button = () => {
    if (status == 14 || status == 17) {
      return(
        <View style={{ margin:10 }}>
          <TouchableOpacity onPress={select_photo.bind(this)} activeOpacity={1} style={{ width: '100%', backgroundColor: theme.primary, borderRadius: 10, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: theme.onPrimary, fontSize: f_m, fontFamily: normal }}>{t('Upload')}</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }


  return (
  <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
  <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

  <View
    style={{
      height: 60,
   
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
   
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
        style={{ fontSize: 24 }}
      />
    </TouchableOpacity>
  </View>


  <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
    }}
  >
   <View
  style={{
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 0,
    overflow: 'hidden',
  }}
>
  <Image
    source={path}
    style={{
      flex: 1,
      width: '100%',
      height: '100%',
      resizeMode: 'contain', // or 'cover' if you want cropping
    }}
  />
</View>


    {status == 14 && (
      <Text
        style={{
          fontFamily: regular,
          color: theme.textSecondary,
          fontSize: f_m,
          marginTop: 20,
          textAlign: 'center',
        }}
      >
        {t('Upload your file')}
      </Text>
    )}
  </View>

  {loading == false ? (
    <View style={{ padding: 20 }}>{show_button()}</View>
  ) : (
    <View
      style={{
        height: 50,
        width: '90%',
        alignSelf: 'center',
        marginBottom: 20,
      }}
    >
      <LottieView style={{ flex: 1 }} source={btn_loader} autoPlay loop />
    </View>
  )}

  <Toast />
</SafeAreaView>

  );
};


export default connect(null, null)(DocumentUpload);