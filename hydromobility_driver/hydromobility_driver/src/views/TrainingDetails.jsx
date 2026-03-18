import { useTranslation } from "react-i18next";
import '../languages/i18next.js';

//Fixed
import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ScrollView,
  StatusBar
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { screenHeight, screenWidth, bold, img_url, regular, f_25, f_s } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import VideoPlayer from 'react-native-video-controls';

import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext.js";


const TrainingDetails = (props) => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
   const { theme, isDark,toggleTheme } = useTheme(); 
  const [data, setData] = useState(route.params.data);
  console.log(img_url + data.file)
  const go_back = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={{flex:1,backgroundColor:theme.background}}>
     <StatusBar
             translucent
             backgroundColor="transparent"
             barStyle="dark-content"
           />
      <View style={{  height: 60,

    flexDirection: 'row',
    alignItems: 'center'}}>
        <TouchableOpacity activeOpacity={1} onPress={go_back.bind(this)} style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
          <Icon type={Icons.MaterialIcons} name="arrow-back" color={theme.textPrimary} style={{ fontSize: 30 }} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10 }}>
          <Text ellipsizeMode='tail' style={{ color: theme.textPrimary, fontSize: f_25, fontFamily: regular }}>{data.title}</Text>
        </View>
        <View style={{ margin: 10 }} />
        {data.file != null ?
          <View style={{ backgroundColor: theme.surface, padding: 10, margin: 10, borderRadius: 10 }}>
            <View style={{ height: 200, width: '100%' }}>
              <VideoPlayer disableSeekbar disableVolume disableBack source={{ uri: img_url + data.file }} />
            </View>
            <View style={{ margin: 10 }}>
              <Text style={{ color: theme.textSecondary, fontSize: f_s, fontFamily: regular ,textAlign:'justify'}}>
                {data.description}
              </Text>
            </View>
          </View>
          :
          <View style={{ backgroundColor: theme.textSecondary, padding: 10, margin: 10, borderRadius: 10 }}>
            <Text style={{ color: theme.textSecondary, fontSize: f_s, fontFamily: regular ,textAlign:'justify'}}>
              {data.description}
            </Text>
          </View>
        }
        <View style={{ margin: 10 }} />
      </ScrollView>
    </SafeAreaView>
  );
};



export default TrainingDetails;