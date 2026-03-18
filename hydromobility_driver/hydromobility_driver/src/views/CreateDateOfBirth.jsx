import { useTranslation } from "react-i18next";
import "../languages/i18next.js";

import React, { useState, useEffect, useRef } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  TextInput,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  normal,
  bold,
  regular,
  f_xl,
  f_xs,
  f_m,
  month_names,
} from "../config/Constants";
import Icon, { Icons } from "../components/Icons";
import { connect } from "react-redux";
import { updateDateOfBirth } from "../actions/RegisterActions";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useTheme } from "../context/ThemeContext.js";

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const CreateDateOfBirth = (props) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { theme } = useTheme();

  const [date_of_birth, setDateOfBirth] = useState("");
  const inputRef = useRef();

  const go_back = () => navigation.goBack();

  const showToast = (type, title, message) => {
    ReactNativeHapticFeedback.trigger("impactHeavy", options);
    Toast.show({
      type,
      text1: title,
      text2: message,
      visibilityTime: 5000,
      position: "top",
    });
  };

  const check_valid = () => {
    if (date_of_birth.trim()) {
      props.updateDateOfBirth(date_of_birth.trim());
      navigation.navigate("CreatePassword");
    } else {
      showToast(
        "error",
        t("Validation error"),
        t("Please enter your date of birth")
      );
    }
  };

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
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={go_back}
          style={{
            width: "15%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon
            type={Icons.MaterialIcons}
            name="arrow-back"
            color={theme.textPrimary}
            style={{ fontSize: 30 }}
          />
        </TouchableOpacity>
      </View>

      {/* Body */}
      <View style={{ margin: 20 }} />
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text
          numberOfLines={1}
          style={{
            color: theme.textPrimary,
            fontSize: f_xl,
            fontFamily: regular,
          }}
        >
          {t("Enter your date of birth")}
        </Text>
        <View style={{ margin: 5 }} />
        <Text
          numberOfLines={1}
          style={{
            color: theme.textSecondary,
            fontSize: f_xs,
            fontFamily: normal,
          }}
        >
          {t("You need to enter your date of birth")}
        </Text>

        <View style={{ margin: 20 }} />

        {/* Input box */}
        <View style={{ width: "80%" }}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: theme.surface,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "20%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon
                type={Icons.MaterialIcons}
                name="event"
                color={theme.textSecondary}
                style={{ fontSize: 30 }}
              />
            </View>
            <View style={{ width: "80%", paddingRight: 10 }}>
              <TextInput
                ref={inputRef}
                placeholder={t("Enter date (DD-MM-YYYY)")}
                value={date_of_birth}
                onChangeText={setDateOfBirth}
                keyboardType="numbers-and-punctuation"
                placeholderTextColor={theme.textSecondary}
                style={{
                  fontSize: f_m,
                  color: theme.textPrimary,
                  fontFamily: regular,
                  height: 60,
                  width: "100%",
                }}
              />
            </View>
          </View>

          <View style={{ margin: 30 }} />

          {/* Next button */}
          <TouchableOpacity
            onPress={check_valid}
            activeOpacity={1}
            style={{
              width: "100%",
              backgroundColor: theme.primary,
              borderRadius: 10,
              height: 50,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: theme.onPrimary,
                fontSize: f_m,
                fontFamily: normal,
              }}
            >
              {t("Next")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Toast />
    </SafeAreaView>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateDateOfBirth: (data) => dispatch(updateDateOfBirth(data)),
});

export default connect(null, mapDispatchToProps)(CreateDateOfBirth);
