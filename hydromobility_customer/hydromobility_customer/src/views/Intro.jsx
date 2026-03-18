import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Animated,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useTranslation } from "react-i18next";
import '../languages/i18next';
import { useTheme } from "../context/ThemeContext";
const { width, height } = Dimensions.get("window");
const Intro = ({ navigation }) => {
    const { t, i18n } = useTranslation();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
    const { theme, isDark } = useTheme(); // Using theme from context

  const slides = [
    {
      key: 1,
      title: t("Book a Ride"),
      mainTitle: t("Find the Best Taxi"),
      text: t("Choose your preferred vehicle model and fare based on your needs and the number of passengers"),
      image: require("../assets/json/slider_1.json"),
      bg: theme.background,
      color: theme.primary,
    },
    {
      key: 2,
      title: t("Set Your Route"),
      mainTitle: t("Plan Your Trip"),
      text: t("Log in to the app, enter your pickup and drop-off locations, and get fare estimates instantly."),
      image: require("../assets/json/slider_2.json"),
      bg:theme.background,
      color: theme.primary,
    },
    {
      key: 3,
      title: t("Enjoy Your Ride"),
      mainTitle: t("Reach Your Destination"),
      text: t("Sit back, relax, and arrive at your destination safely and on time with our reliable drivers."),
      image: require("../assets/json/slider_3.json"),
      bg: theme.background,
      color:theme.primary,
    },
  ];

  const onDone = async () => {
    try {
      await AsyncStorage.setItem("existing", "1");
      navigation.navigate("CheckPhone");
    } catch (e) {
      alert(e);
    }
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollTo({ x: width * (currentIndex + 1) });
    } else {
      onDone();
    }
  };

  const handleSkip = () => {
    onDone();
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [currentIndex]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: slides[currentIndex].bg }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {/* Skip Button */}
      {currentIndex < slides.length - 1 && (
        <TouchableOpacity
          onPress={handleSkip}
          style={{
            position: "absolute",
            top: 40,
            right: 20,
            zIndex: 10,
            padding: 10,
            backgroundColor: "rgba(255,255,255,0.7)",
            borderRadius: 20,
          }}
        >
          <Text style={{ color: theme.surface, fontWeight: "600" }}>{t('Skip')}</Text>
        </TouchableOpacity>
      )}

      {/* Scrollable Slides */}
      <ScrollView
        ref={slidesRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
            listener: (event) => {
              const offsetX = event.nativeEvent.contentOffset.x;
              const index = Math.round(offsetX / width);
              if (index !== currentIndex) {
                fadeAnim.setValue(0);
                setCurrentIndex(index);
              }
            },
          }
        )}
        scrollEventThrottle={16}
      >
        {slides.map((item, index) => (
          <View
            key={item.key}
            style={{
              width,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 30,
            }}
          >
            <Animated.View
              style={{
                opacity: currentIndex === index ? fadeAnim : 0.3,
                transform: [
                  {
                    translateY: currentIndex === index ? fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    }) : 0,
                  },
                ],
              }}
            >
              <LottieView
                style={{ width: width * 0.8, height: width * 0.8 }}
                source={item.image}
                autoPlay
                loop
              />
            </Animated.View>

            <Animated.Text
              style={{
                fontSize: 28,
                fontWeight: "800",
                marginTop: 20,
                textAlign: "center",
                color:theme.textPrimary,
                opacity: fadeAnim,
                transform: [
                  {
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              }}
            >
              {item.mainTitle}
            </Animated.Text>

            <Animated.Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                marginTop: 10,
                textAlign: "center",
                color:theme.textSecondary,
                opacity: fadeAnim,
                transform: [
                  {
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              }}
            >
              {item.title}
            </Animated.Text>

            <Animated.Text
              style={{
                fontSize: 16,
                textAlign: "center",
                marginTop: 20,
                color: "#666",
                lineHeight: 24,
                paddingHorizontal: 20,
                opacity: fadeAnim,
                transform: [
                  {
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              }}
            >
              {item.text}
            </Animated.Text>
          </View>
        ))}
      </ScrollView>

      {/* Pagination */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        {slides.map((_, index) => (
          <View
            key={index}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: currentIndex === index ? slides[currentIndex].color : "#ccc",
              marginHorizontal: 5,
            }}
          />
        ))}
      </View>

      {/* Next Button */}
      <View
        style={{
          paddingHorizontal: 40,
          paddingBottom: 40,
        }}
      >
        <TouchableOpacity
          onPress={handleNext}
          style={{
            backgroundColor: theme.primary,
            padding: 15,
            borderRadius: 30,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            elevation: 5,
          }}
        >
          <Text style={{ color: theme.onPrimary, fontWeight: "600", fontSize: 16 }}>
            {currentIndex === slides.length - 1 ? t("Get Started") : t('Next')}
          </Text>
          {currentIndex < slides.length - 1 && (
            <Icon
              name="arrow-forward"
              size={20}
              color={theme.onPrimary}
              style={{ marginLeft: 10 }}
            />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Intro;