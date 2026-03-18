import { useTranslation } from "react-i18next";
import '../languages/i18next';

import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  StatusBar,
  ScrollView
} from "react-native";
import { useNavigation, useRoute, CommonActions } from "@react-navigation/native";
import * as colors from '../assets/css/Colors';
import { screenHeight, screenWidth, bold, api_url, add_rating, btn_loader, img_url, regular, f_l, f_xs, f_xl, f_s, f_m, normal } from '../config/Constants';
import DropShadow from "react-native-drop-shadow";
import Icon, { Icons } from '../components/Icons';
import { AirbnbRating as RT } from 'react-native-ratings';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const Rating = (props) => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const [data, setData] = useState(route.params.data);
  const [count, setCount] = useState(5);
  const [star_count, setStarCount] = useState(5);
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);
 const { theme, toggleTheme, isDark } = useTheme();
  const onStarRatingPress = (rating) => {
    setCount(rating)
  }
 const showToast = (type, title, message) => {
   ReactNativeHapticFeedback.trigger("impactLight", options);

   Toast.show({
     type: type,
     text1: title,
     text2: message,
     visibilityTime: 5000,
     position: 'top',
     topOffset: 200,
   });
 };

  const call_add_rating = () => {

    if (count === 0) {
      showToast('error', t('Error'), t('Please select rating'));
      return;
    }
    if (comments == '') {
      showToast('error', t('Error'), t('Please enter comments'));
      return;
    }
    setLoading(true);
    axios({
      method: 'post',
      url: api_url + add_rating,
      data: { trip_id: data.id, ratings: count, comments: comments }
    })
    .then(async response => {
      setLoading(false);
      navigate_home();
    })
    .catch(error => {
      setLoading(false);
      showToast("error", t('Error'), t('Sorry something went wrong'));
    });
  }

  const navigate_home = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Home" }],
      })
    );
  }

  const go_back = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.background}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <TouchableOpacity
        activeOpacity={1}
        onPress={navigate_home}
        style={{
          height: 80,
          width: 80,
          alignSelf: 'flex-end',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon
          type={Icons.MaterialCommunityIcons}
          name="close-circle-outline"
          color={theme.textPrimary}
          style={{fontSize: 30}}
        />
      </TouchableOpacity>

      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View style={{margin: 5}} />

        <DropShadow
          style={{
            width: '90%',
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 5},
            shadowOpacity: 0.2,
            shadowRadius: 3,
            alignSelf: 'center',
          }}>
          <View
            style={{
              width: '100%',
              backgroundColor: theme.background,
              borderRadius: 10,
              alignItems: 'center',
              paddingBottom: 20,
            }}>
            <View
              style={{
                height: 80,
                width: 80,

                alignSelf: 'center',
                borderRadius: 40,
                overflow: 'hidden',
                borderWidth: 2,
                borderColor: theme.surface,
              }}>
              <Image
                source={{uri: img_url + data.driver.profile_picture}}
                style={{flex: 1, width: '100%', height: '100%'}}
              />
            </View>
            <View style={{marginTop: 70, alignItems: 'center'}}>
              <Text
                numberOfLines={1}
                style={{
                  color: theme.textPrimary,
                  fontSize: f_l,
                  fontFamily: normal,
                  textTransform: 'capitalize',
                }}>
                {data.driver.first_name} {data.driver.last_name}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <Icon
                  type={Icons.MaterialIcons}
                  name="star"
                  color={'gold'}
                  style={{fontSize: 18}}
                />
                <Text
                  numberOfLines={1}
                  style={{
                    color: theme.textSecondary,
                    fontSize: f_xs,
                    fontFamily: regular,
                    marginLeft: 5,
                  }}>
                  {data.driver.overall_ratings === 0
                    ? t('New')
                    : data.driver.overall_ratings}
                </Text>
              </View>
            </View>

            <View
              style={{alignItems: 'center', margin: 20, paddingHorizontal: 20}}>
              <Text
                numberOfLines={1}
                style={{
                  color: colors.theme_fg_two,
                  fontSize: f_xl,
                  fontFamily: normal,
                }}>
                {t('How was your trip')}?
              </Text>

              <View style={{margin: 5}} />

              <Text
                style={{
                  color: theme.textPrimary,
                  fontSize: f_s,
                  fontFamily: regular,
                  textAlign: 'center',
                }}>
                {t(
                  'Give your valuable ratings and feedback to improve our services',
                )}
              </Text>
            </View>

            <RT
              count={star_count}
              reviews={[t('Terrible'), t('Bad'), t('OK'), t('Good'), t('Wow')]}
              defaultRating={count}
              size={30}
              onFinishRating={onStarRatingPress}
            />

            <View
              style={{
                width: '80%',
                backgroundColor: theme.surface,
                padding: 10,
                borderRadius: 10,
                marginVertical: 10,
                borderBottomWidth: 2,
                borderColor:theme.divider,
              }}>
              <Text
                style={{
                  color: theme.textPrimary,
                  fontSize: f_s,
                  marginBottom: 5,
                }}>
                {t('Your Feedback')}
              </Text>
              <TextInput
                placeholder={t('Tell us about your experience...')}
                placeholderTextColor={theme.textSecondary}
                style={{
                  color: theme.textPrimary,
                  fontSize: f_m,
                  minHeight: 100,
                  paddingVertical: 10,
                }}
                multiline
                onChangeText={(value)=>setComments(value)}
              />
            </View>
            <View style={{margin: 20}} />

            {!loading ? (
              <TouchableOpacity
                onPress={call_add_rating}
                activeOpacity={1}
                style={{
                  width: '80%',
                  backgroundColor:theme.primary,
                  borderRadius: 10,
                  height: 50,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: theme.onPrimary,
                    fontSize: f_m,
                    fontFamily: normal,
                  }}>
                  {t('Submit')}
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={{height: 50, width: '90%', alignSelf: 'center'}}>
                <LottieView
                  style={{flex: 1}}
                  source={btn_loader}
                  autoPlay
                  loop
                />
              </View>
            )}
          </View>
        </DropShadow>
        <View style={{margin:'40%'}}/>
      </ScrollView>

      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    
  },
  textinput: {
    fontSize: f_m,
    color: colors.grey,
    fontFamily: regular,
    textAlignVertical: 'top',
    backgroundColor: colors.text_container_bg,
    width: '100%'
  },
});

export default Rating;