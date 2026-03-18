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

const NotificationDetails = (props) => {
  const { t, i18n } = useTranslation();
    const navigation = useNavigation();
    const route = useRoute();
    const [data, setData] = useState(route.params.data);
  const { theme, isDark } = useTheme(); // Using theme from context

    const go_back = () => {
        navigation.goBack();
    }

    return (
         <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={theme.background === '#000000' ? 'light-content' : 'dark-content'}
      />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={go_back}
          style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}
        >
          <Icon
            type={Icons.MaterialIcons}
            name="arrow-back"
            color={theme.textPrimary}
            style={{ fontSize: 30 }}
          />
        </TouchableOpacity>
        <View style={{ width: '85%', justifyContent: 'center' }}>
          <Text style={{ color: theme.textPrimary, fontSize: f_25, fontFamily: regular }}>
            Notification
          </Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <DropShadow
          style={{
            width: '100%',
            marginBottom: 12,
            shadowColor: theme.shadow_color,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
            elevation: 3,
          }}
        >
          <View
            style={{
              backgroundColor: theme.surface,
              padding: 20,
              borderRadius: 14,
              borderWidth: 0.5,
              borderColor: '#E5E7EB',
            }}
          >
            <Text
              style={{
                color: theme.textPrimary,
                fontSize: f_25,
                fontFamily: regular,
                marginBottom: 12,
              }}
            >
              {data.title}
            </Text>
            <Text
              style={{
                color: theme.textSecondary,
                fontSize: f_s,
                fontFamily: regular,
                lineHeight: 20,
              }}
            >
              {data.message}
            </Text>
          </View>
        </DropShadow>
      </ScrollView>
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
        height: 60,
        backgroundColor: colors.lite_bg,
        flexDirection: 'row',
        alignItems: 'center'
    },
});

export default NotificationDetails;