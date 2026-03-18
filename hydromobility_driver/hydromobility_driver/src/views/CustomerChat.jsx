import { useTranslation } from "react-i18next";
import '../languages/i18next.js';

import React, { useState, useCallback, useEffect } from 'react'
import {
  StyleSheet
} from "react-native";
import { GiftedChat } from 'react-native-gifted-chat'
import { connect } from 'react-redux';

import { SafeAreaView } from 'react-native-safe-area-context';

const CustomerChat = (props) => {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: t('Hello developer'),
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <SafeAreaView>

    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      />
      </SafeAreaView>
  )
};
const styles = StyleSheet.create({
    logo_container: {
      flex:1
    }
  });
  
export default connect(null,null)(CustomerChat);