import { useTranslation } from "react-i18next";
import '../languages/i18next.js';

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  Image,
  FlatList
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { screenHeight, screenWidth, bold, regular, tutorials, api_url, img_url, loader, f_l, f_xs, f_xl } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import DropShadow from "react-native-drop-shadow";
import axios from 'axios';
import LottieView from 'lottie-react-native';
import Animated, { useAnimatedStyle, withTiming, useSharedValue, useDerivedValue } from 'react-native-reanimated';

import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useTheme } from "../context/ThemeContext.js";
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};
const Training = (props) => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const viewableItems = useSharedValue([]);
 const { theme, isDark,toggleTheme } = useTheme(); 
  const go_back = () => {
    navigation.goBack();
  }

  useEffect(() => {
    call_tutorials();
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
  const call_tutorials = () => {
    setLoading(true);
    console.log(api_url + tutorials);
    console.log({ lang: i18n.language })
    axios({
      method: 'post',
      url: api_url + tutorials,
      data: { lang: i18n.language }
    })
      .then(async response => {
        setLoading(false);
        setData(response.data.result);
      })
      .catch(error => {
        setLoading(false);
         showToast(
           "error",
           t('Error'),
           t('Sorry something went wrong')
         );
      });
  }

  const navigate_training_details = (data) => {
    navigation.navigate("TrainingDetails", { data: data })
  }


  const ListItem = React.memo(
    ({item, viewableItems}) => {
      const isItemVisible = useDerivedValue(() => {
        const visible = viewableItems.value.find(
          v => v?.item?.id === item.id && v.isViewable,
        );
        return !!visible;
      }, [viewableItems]);

      const rStyle = useAnimatedStyle(() => ({
        opacity: withTiming(isItemVisible.value ? 1 : 0.9, {duration: 200}),
        transform: [
          {
            scale: withTiming(isItemVisible.value ? 1 : 0.95, {duration: 200}),
          },
        ],
      }));

      return (
        <Animated.View style={[{width: '100%'}, rStyle]}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={navigate_training_details.bind(this, item)}
            style={{
              width: '100%',
              flexDirection: 'row',
              backgroundColor: theme.surface,
              borderRadius: 10,
              padding: 10,
              marginTop: 5,
              marginBottom: 5,
            }}>
            <View style={{width: '35%', justifyContent: 'center'}}>
              <View style={{height: 100, width: 100}}>
                <Image
                  source={{uri: img_url + item.thumbnail_image}}
                  style={{
                    height: undefined,
                    width: undefined,
                    flex: 1,
                    borderRadius: 10,
                  }}
                />
              </View>
            </View>
            <View style={{width: '65%', justifyContent: 'flex-start'}}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  color: theme.textPrimary,
                  fontSize: f_l,
                  fontFamily: regular,
                }}>
                {item.title}
              </Text>
              <View style={{margin: 5}} />
              <Text
                numberOfLines={4}
                ellipsizeMode="tail"
                style={{
                  color: theme.textSecondary,
                  fontSize: f_xs,
                  fontFamily: regular,
                  textAlign: 'justify',
                }}>
                {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      );
    },
    (prev, next) => prev.item.id === next.item.id,
  ); // memo check

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        itemVisiblePercentThreshold: 40,
        minimumViewTime: 150,
      },
      onViewableItemsChanged: ({viewableItems: vItems}) => {
        viewableItems.value = vItems;
      },
    },
  ]);


  const keyExtractor = useCallback(item => item.id.toString(), []);
  return (
    <SafeAreaView
      style={{flex:1,backgroundColor:theme.background}}
    >
      <StatusBar
              translucent
              backgroundColor="transparent"
              barStyle="dark-content"
            />
      <View style={{height: 70,
    flexDirection: 'row',
 
    alignItems: 'center'}}>
        <TouchableOpacity activeOpacity={1} onPress={go_back.bind(this)} style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
          <Icon type={Icons.MaterialIcons} name="arrow-back" color={theme.textPrimary} style={{ fontSize: 30 }} />
        </TouchableOpacity>
        <View activeOpacity={1} style={{ width: '85%', alignItems: 'flex-start', justifyContent: 'center' }}>
          <Text numberOfLines={1} ellipsizeMode='tail' style={{ color: theme.textPrimary, fontSize: f_xl, fontFamily: regular }}>{t('Training')}</Text>
        </View>
      </View>
      {loading == true ?
        <View style={{ height: 100, width: 100, alignSelf: 'center', marginTop: '30%' }}>
          <LottieView style={{flex: 1}} source={loader} autoPlay loop />
        </View>
        :
       
           <FlatList
                 data={data}
                 showsVerticalScrollIndicator={false}
                 keyExtractor={keyExtractor}
                 renderItem={({item}) => (
                   <ListItem item={item} viewableItems={viewableItems} />
                 )}
                 viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                 initialNumToRender={8}
                 maxToRenderPerBatch={5}
                 windowSize={7}
                 contentContainerStyle={{padding:10}}
                 removeClippedSubviews={true}
                 updateCellsBatchingPeriod={50}
                 ListFooterComponent={<View style={{height: 100}} />}
               />
       
      }
        <Toast />
    </SafeAreaView>
  );
};


export default Training;

