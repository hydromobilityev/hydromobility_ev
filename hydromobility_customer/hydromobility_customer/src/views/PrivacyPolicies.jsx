import { useTranslation } from "react-i18next";
import '../languages/i18next';

//List
import React, { useState, useEffect, useRef } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  StatusBar
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as colors from '../assets/css/Colors';
import { screenHeight, screenWidth, bold, regular, api_url, privacy_policies, f_l, f_s, f_25, f_xl } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import axios from 'axios';
import Animated, {useAnimatedStyle, withTiming, useSharedValue } from 'react-native-reanimated';
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import DropShadow from "react-native-drop-shadow";

import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useTheme } from "../context/ThemeContext";
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const PrivacyPolicies = (props) => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const viewableItems = useSharedValue([]);

  const go_back = () => {
ReactNativeHapticFeedback.trigger("impactLight", options);

    navigation.toggleDrawer();
  }
    const { theme, isDark } = useTheme(); // Using theme from context
  

  useEffect(() => {
    call_privacy_policies();
  }, []);
  const showToast = (type, title, message) => {
ReactNativeHapticFeedback.trigger("impactLight", options);

    Toast.show({
      type: type ,
      text1: title,
      text2: message,
      visibilityTime: 5000,
      position: "top", // top, bottom
    });
  };
  const call_privacy_policies = () => {
    setLoading(true);
    axios({
      method: 'post',
      url: api_url + privacy_policies,
      data: { lang: i18n.language }
    })
      .then(async response => {
        setLoading(false);
        setData(response.data.result)
      })
      .catch(error => {
        setLoading(false);
         showToast("error", t('Error'), t('Sorry something went wrong'));
      });
  }

  type ListItemProps = {
    viewableItems: Animated.SharedValue<ViewToken[]>;
    item: {
        id: number;
    };
};

const ListItem: React.FC<ListItemProps> = React.memo(
    ({ item, viewableItems }) => {
    const rStyle = useAnimatedStyle(() => {
        const isVisible = Boolean(
        viewableItems.value
            .filter((item) => item.isViewable)
            .find((viewableItem) => viewableItem.item.id === item.id)
        );
        return {
        opacity: withTiming(isVisible ? 1 : 0),
        transform: [
            {
            scale: withTiming(isVisible ? 1 : 0.6),
            },
        ],
        };
    }, []);
    return (
        <Animated.View style={[
            {
              width: '100%',
            },
            rStyle,
          ]}>
                 <DropShadow
                      style={{
                        width: "95%",
                        marginBottom: 5,
            
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 0,
                        },
                        shadowOpacity: 0.1,
                        shadowRadius: 2,
                        alignSelf:"center"
                      }}
                    >

            <View style={{ backgroundColor: theme.surface, padding: 10, margin: 10, borderRadius: 10 }}>
              <View style={{ margin: 10 }}>
                <Text numberOfLines={1} ellipsizeMode='tail' style={{ color: theme.textPrimary, fontSize: f_l, fontFamily: regular }}>{item.title}</Text>
                <View style={{ margin: 5 }} />
                <Text style={{ color: theme.textSecondary, fontSize: f_s, fontFamily: regular,textAlign: 'justify' }}>
                  {item.description}
                </Text>
              </View>
            </View>
                    </DropShadow>
        </Animated.View>
    );
    }
);

const onViewableItemsChanged = ({viewableItems: vItems}) => {
    viewableItems.value = vItems;
};

const viewabilityConfigCallbackPairs = useRef([{onViewableItemsChanged}]);

  return (
    <SafeAreaView style={{flex:1,backgroundColor:theme.background}}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content"/>
      <View style={{   height: 70,
    backgroundColor: theme.background,
    flexDirection: 'row',
    alignItems: 'center'}}>
          <TouchableOpacity activeOpacity={1} onPress={go_back.bind(this)} style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
              <Icon type={Icons.MaterialIcons} name="arrow-back" color={theme.textPrimary} style={{ fontSize: 30 }} />
          </TouchableOpacity>
          <View activeOpacity={1} style={{ width: '85%', alignItems: 'flex-start', justifyContent: 'center' }}>
              <Text numberOfLines={1} ellipsizeMode='tail' style={{ color: theme.textPrimary, fontSize: f_xl, fontFamily: regular }}>{t('Privacy Policies')}</Text>
          </View>
      </View>
        <FlatList
            data={data}
        
            viewabilityConfigCallbackPairs={
                viewabilityConfigCallbackPairs.current
            }
            renderItem={({ item }) => {
                return <ListItem item={item} viewableItems={viewableItems} />;
            }}
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: screenHeight,
    width: screenWidth,
    backgroundColor: colors.theme
  },
  header: {
    height: 70,
    backgroundColor: colors.lite_grey,
    flexDirection: 'row',
    alignItems: 'center'
},
});

export default PrivacyPolicies;