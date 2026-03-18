import { useTranslation } from "react-i18next";
import '../languages/i18next';

//Fixed
import React, { useState, useEffect,useRef } from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    ScrollView,
    Image,
    StatusBar,
    Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as colors from '../assets/css/Colors';
import { screenHeight, screenWidth, bold, regular, api_url, get_about, logo, f_25, f_m, f_l, f_s, f_xl } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import axios from 'axios';
import { SafeAreaView } from "react-native-safe-area-context";

import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useTheme } from "../context/ThemeContext";
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const AboutUs = (props) => {
  const { t, i18n } = useTranslation();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [on_load, setOnLoad] = useState(0);
    const [data, setData] = useState("");
    const go_back = () => {
ReactNativeHapticFeedback.trigger("impactLight", options);

        navigation.goBack();
    }
    const { theme, isDark } = useTheme(); // Using theme from context

    useEffect(() => {
        call_get_about();
    }, []);

    const call_get_about = () => {
        setLoading(true);
        axios({
            method: 'post',
            url: api_url + get_about,
            data: { lang: i18n.language }
        })
            .then(async response => {
                setLoading(false);
                setData(response.data.result)
                setOnLoad(1);              
            })
            .catch(error => {
                setLoading(false);
             
            });
    }

    return (
      <SafeAreaView style={{flex:1,backgroundColor:theme.background}}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <View style={{ height: 70,
   
        flexDirection: 'row',
        alignItems: 'center'}}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={go_back.bind(this)}
            style={{
              width: '15%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              type={Icons.MaterialIcons}
              name="arrow-back"
              color={theme.textPrimary}
              style={{fontSize: 30}}
            />
          </TouchableOpacity>
          <View
            activeOpacity={1}
            style={{
              width: '85%',
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                color: theme.textPrimary,
                fontSize: f_xl,
                fontFamily: regular,
              }}>
              {t('About Us')}
            </Text>
          </View>
        </View>
        <ScrollView>
          {on_load == 1 && (
            <View>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <View
                  style={{
                    height: 200,
                    width: 200,
                    borderRadius: 100,
                    overflow: 'hidden',
                    backgroundColor:theme.surface
                  }}>
                  <Image
                    style={{height: undefined, width: undefined, flex: 1}}
                    source={logo}
                  />
                </View>
                <View style={{margin:10}}/>
                <Text
                  style={{
                    color: theme.textPrimary,
                    fontSize: f_m,
                    fontFamily: regular,
                  }}>
                  {t('Version')} {data.app_version}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: theme.surface,
                  padding: 10,
                  margin: 10,
                  borderRadius: 10,
                }}>
                <View style={{margin: 10}}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      color: theme.textPrimary,
                      fontSize: f_l,
                      fontFamily: regular,
                    }}>
                    {t('Who we are')}?
                  </Text>
                  <View style={{margin: 5}} />
                  <Text
                    style={{
                      color: theme.textSecondary,
                      fontSize: f_s,
                      fontFamily: regular,
                      textAlign: 'justify',
                    }}>
                    {data.about_us}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => Linking.openURL(`tel:${data.phone_number}`)}
                  style={{
                    flexDirection: 'row',
                    marginTop: 5,
                    marginBottom: 5,
                  }}>
                  <View
                    style={{
                      width: '20%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon
                      type={Icons.MaterialIcons}
                      name="phone"
                      color={theme.textSecondary}
                      style={{fontSize: 20}}
                    />
                  </View>
                  <View
                    style={{
                      width: '80%',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: theme.textSecondary,
                        fontSize: f_m,
                        fontFamily: regular,
                      }}>
                      {data.phone_number}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 5,
                    marginBottom: 5,
                  }}>
                  <View
                    style={{
                      width: '20%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon
                      type={Icons.MaterialIcons}
                      name="email"
                      color={theme.textSecondary}
                      style={{fontSize: 20}}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => Linking.openURL('mailto:' + data.email)}
                    style={{
                      width: '80%',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: theme.textSecondary,
                        fontSize: f_m,
                        fontFamily: regular,
                        textDecorationLine: 'underline',
                      }}>
                      {data.email}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 5,
                    marginBottom: 5,
                  }}>
                  <View
                    style={{
                      width: '20%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon
                      type={Icons.Entypo}
                      name="address"
                      color={theme.textSecondary}
                      style={{fontSize: 20}}
                    />
                  </View>
                  <View
                    style={{
                      width: '80%',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: theme.textSecondary,
                        fontSize: f_m,
                        fontFamily: regular,
                      }}>
                      {data.address}
                    </Text>
                  </View>
                </View>
                <View style={{margin: 10}} />
               
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
    
     flex:1,
        backgroundColor: colors.theme_bg_three
    },
    header: {
        height: 70,
        backgroundColor: colors.theme_bg_three,
        flexDirection: 'row',
        alignItems: 'center'
    },
});

export default AboutUs;