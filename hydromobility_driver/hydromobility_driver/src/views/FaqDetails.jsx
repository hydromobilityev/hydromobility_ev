import { useTranslation } from "react-i18next";
import '../languages/i18next';

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
import * as colors from '../assets/css/Colors';
import { screenHeight, screenWidth, bold, regular, f_25, f_s } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import { SafeAreaView } from "react-native-safe-area-context";
import DropShadow from "react-native-drop-shadow";
import { useTheme } from "../context/ThemeContext";

const FaqDetails = (props) => {
  const { t, i18n } = useTranslation();
    const navigation = useNavigation();
    const route = useRoute();
    const [data, setData] = useState(route.params.data);
  const { theme, isDark } = useTheme(); // Using theme from context

    const go_back = () => {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={{flex:1,backgroundColor:theme.background}}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content"/>
            <View style={{  height: 60,
        backgroundColor: theme.background,
        flexDirection: 'row',
        alignItems: 'center'}}>
                <TouchableOpacity activeOpacity={1} onPress={go_back.bind(this)} style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon type={Icons.MaterialIcons} name="arrow-back" color={theme.textPrimary} style={{ fontSize: 30 }} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                     <DropShadow
                          style={{
                            width: "100%",
                            marginBottom: 5,
                
                            shadowColor: "#000",
                            shadowOffset: {
                              width: 0,
                              height: 0,
                            },
                            shadowOpacity: 0.1,
                            shadowRadius: 2,
                          }}
                        >

                <View style={{ backgroundColor: theme.surface, padding: 10, margin: 20, borderRadius: 10 }}>
                    <View style={{ margin: 10 }}>
                        <Text ellipsizeMode='tail' style={{ color: theme.textPrimary, fontSize: f_25, fontFamily: regular }}>{data.question}</Text>
                        <View style={{ margin: 10 }} />
                        <Text style={{ color: theme.textPrimary, fontSize: f_s, fontFamily: regular,textAlign:'justify' }}>
                            {data.answer}
                        </Text>
                    </View>
                    <View style={{ margin: 10 }} />
                </View>

                        </DropShadow>
            </ScrollView>
        </SafeAreaView>
    );
};



export default FaqDetails;