import { useTranslation } from "react-i18next";
import '../languages/i18next.js';

import React, { useState, useEffect, useCallback } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Linking,
  StatusBar,
  TextInput,
  Modal,
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import database from "@react-native-firebase/database";
import { useNavigation } from "@react-navigation/native";
import Sound from "react-native-sound";
import {
  chat_bg,
  chat_bg_dark,
  chat_icon,
  f_xl,
  img_url,
  regular,
} from "../config/Constants";
import * as colors from "../assets/css/Colors";

import Icon, { Icons } from "../components/Icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext.js";

const Chat = ({ route }) => {
  const { t, i18n } = useTranslation();
  const { trip_id, user, data } = route.params; // Ensure you pass these parameters
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const [whoosh, setWhoosh] = useState(null);
const [inputText, setInputText] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
  // Load sound once
      const { theme, isDark,toggleTheme } = useTheme(); // Using theme from context
  
  useEffect(() => {
    const sound = new Sound("notification.mp3", Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log("Failed to load sound", error);
      } else {
        setWhoosh(sound);
        console.log("Sound loaded successfully");
      }
    });

    // Cleanup
    return () => {
      if (sound) {
        sound.release();
      }
    };
  }, []);

  const go_back = () => {
    
    navigation.goBack();
  };

  const notification_sound = () => {
    if (whoosh) {
      whoosh.play((success) => {
        if (success) {
          console.log("Sound played successfully");
        } else {
          console.log("Sound playback failed");
        }
      });
    }
  };

  useEffect(() => {
    const ref = database().ref(`/chat/${trip_id}`).limitToLast(20);

    const listener = ref.on("child_added", (snapshot) => {
      const newMessage = parse(snapshot);
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newMessage)
      );
      notification_sound(); // Play sound when a new message is received
    });

    const _unblur = navigation.addListener("blur", () => {
      if (whoosh) whoosh.stop();
    });

    return () => {
      ref.off("child_added", listener);
      _unblur();
    };
  }, [whoosh]);

  const parse = (snapshot) => {
    const { text, user, createdAt } = snapshot.val();
    const { key: _id } = snapshot;

    console.log("RECEIVED MESSAGE:", snapshot.val()); // Debugging log

    return {
      _id,
      text,
      createdAt: createdAt ? new Date(createdAt) : new Date(),
      user,
    };
  };
  const call_customer = (phone_number, contact) => {
    console.log("phone");
    console.log(phone_number, contact);
    if (contact == "null") {
      Linking.openURL(`tel:${phone_number}`);
    } else {
      Linking.openURL(`tel:${contact}`);
    }
  };
  const onSend = useCallback((messages = []) => {
    messages.forEach((message) => {
      const { text, user } = message;
      const messageData = {
        text,
        user,
        createdAt: database.ServerValue.TIMESTAMP,
      };

      console.log("SENDING MESSAGE:", messageData); // Debugging log

      database().ref(`/chat/${trip_id}`).push(messageData);
    });
  }, []);

  return (
<View style={{ flex: 1, }}>
  <StatusBar
    translucent
    backgroundColor="transparent"
    barStyle={isDark ? "light-content" : "dark-content"}
  />

  <ImageBackground
    source={isDark?chat_bg_dark:chat_bg}
    style={{ flex: 1, justifyContent: "flex-start" }}
    resizeMode="cover"
  >
    {/* Header */}
    <View
      style={{
        paddingTop:40,
        height: 80,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
       
      }}
    >
      {/* Back */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={go_back}
        style={{
          width: "10%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon
          type={Icons.MaterialIcons}
          name="arrow-back"
          color={theme.primary}
          style={{ fontSize: 30 }}
        />
      </TouchableOpacity>

      {/* Profile */}
      <View
        style={{
          width: "70%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        <View style={{ height: 40, width: 40, borderRadius: 20, overflow: "hidden" }}>
          <Image
            style={{ flex: 1, height: undefined, width: undefined }}
            source={{ uri: img_url + data?.trip?.customer?.profile_picture }}
          />
        </View>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            color: theme.textPrimary,
            fontSize: f_xl,
            fontFamily: regular,
          }}
        >
          {data?.trip?.customer?.first_name} {data?.trip?.customer?.last_name}
        </Text>
      </View>

      {/* Call */}
      <TouchableOpacity
        onPress={call_customer.bind(
          this,
          data.trip.customer.phone_number,
          data.trip.contact
        )}
        style={{ width: "20%", alignItems: "center", justifyContent: "center" }}
      >
        <Icon
          type={Icons.MaterialIcons}
          name="call"
          color={theme.textSecondary}
          style={{ fontSize: 30 }}
        />
      </TouchableOpacity>
    </View>

    {/* Chat */}
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{
        _id: global.id + "-Dr",
        name: global.first_name,
        avatar: img_url + global.profile_picture,
      }}
      showUserAvatar
      alwaysShowSend
      renderAvatar={(props) => (
        <TouchableOpacity
          onPress={() => {
            setSelectedAvatar(props.currentMessage.user.avatar);
            setModalVisible(true);
          }}
        >
          <Image
            source={{ uri: props.currentMessage.user.avatar }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </TouchableOpacity>
      )}
      renderFooter={() => <View style={{ margin: "10%" }} />}
      placeholder={t("Type your message") + "..."}
      renderUsernameOnMessage
      renderSend={(props) => (
        <TouchableOpacity
          onPress={() => {
            if (props.onSend) {
              props.onSend({ text: inputText });
              setInputText("");
            }
          }}
          style={{
            marginRight: 10,
            justifyContent: "center",
            alignItems: "center",
            padding: 5,
          }}
        >
          <Icon
            type={Icons.MaterialIcons}
            name="send"
            color={theme.primary}
            style={{ fontSize: 30 }}
          />
        </TouchableOpacity>
      )}
      renderInputToolbar={(props) => (
        <View
          style={{
            backgroundColor: theme.surface,
            borderRadius: 10,
            padding: 5,
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 10,
            position: "absolute",
            bottom: 20,
            elevation: 10,
            justifyContent: "center",
            width: "95%",
            alignSelf: "center",
          }}
        >
          <TextInput
            style={{
              flex: 1,
              height: 40,
              fontSize: 16,
              color: theme.textPrimary,
              paddingLeft: 10,
              paddingRight: 10,
            }}
            value={inputText}
            onChangeText={setInputText}
            placeholder={props.placeholder}
            placeholderTextColor={theme.textSecondary}
          />
          <TouchableOpacity
            onPress={() => {
              if (inputText) {
                if (props.onSend) {
                  props.onSend({ text: inputText });
                  setInputText("");
                }
              }
            }}
            style={{ marginLeft: 10 }}
          >
            <Icon
              type={Icons.MaterialIcons}
              name="send"
              color={theme.primary}
              style={{ fontSize: 30 }}
            />
          </TouchableOpacity>
        </View>
      )}
    />

    {/* Avatar Modal */}
    <Modal
      transparent
      visible={modalVisible}
      animationType="fade"
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
        activeOpacity={1}
        onPress={() => setModalVisible(false)}
      >
        <View style={{ backgroundColor: "transparent" }}>
          {selectedAvatar && (
            <Image
              source={{ uri: selectedAvatar }}
              style={{ width: 300, height: 300, borderRadius: 150 }}
            />
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  </ImageBackground>
</View>

  );
};

export default Chat;
