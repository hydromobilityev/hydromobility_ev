import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Linking,
  StatusBar,
  Modal,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Alert,
  FlatList,
  TextInput,
  Dimensions
} from "react-native";
import database from "@react-native-firebase/database";
import { useNavigation } from "@react-navigation/native";
import Sound from "react-native-sound";
import {
  chat_bg,
  chat_bg_dark,
  f_xl,
  f_xxl,
  img_url,
  regular,
} from "../config/Constants";
import * as colors from "../assets/css/Colors";
import { useTranslation } from "react-i18next";
import '../languages/i18next';
import Icon, { Icons } from "../components/Icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
const { width, height } = Dimensions.get('window');

// Custom Message Component to replace GiftedChat


const Chat = ({ route }) => {
  const { trip_id, user, data } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
    const { t, i18n } = useTranslation();
  const { theme, toggleTheme, isDark } = useTheme();
 
  // Refs for cleanup and memory management
  const soundRef = useRef(null);
  const firebaseRef = useRef(null);
  const listenerRef = useRef(null);
  const isMountedRef = useRef(true);
  const flatListRef = useRef(null);

  // Current user info
  const currentUser = useMemo(() => ({
    _id: global.id + '-Cr',
    name: global.first_name || 'User',
    avatar: global.profile_picture ? img_url + global.profile_picture : null,
  }), []);

  // Sound initialization
  useEffect(() => {
    const initSound = async () => {
      try {
        Sound.setCategory('Playback');
        const sound = new Sound('notification.wav', Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            console.log('Sound load error:', error);
          } else if (isMountedRef.current) {
            soundRef.current = sound;
          }
        });
      } catch (error) {
        console.log('Sound init error:', error);
      }
    };

    initSound();

    return () => {
      isMountedRef.current = false;
      if (soundRef.current) {
        try {
          soundRef.current.release();
          soundRef.current = null;
        } catch (error) {
          console.log('Sound cleanup error:', error);
        }
      }
    };
  }, []);
const MessageBubble = React.memo(({ message, isOwn, onAvatarPress }) => {
  const messageTime = useMemo(() => {
    if (!message.createdAt) return '';
    const date = new Date(message.createdAt);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, [message.createdAt]);

  return (
    <View style={[{
        flexDirection: 'row',
    marginVertical: 3,
    alignItems: 'flex-end',
    }, isOwn ? {    justifyContent: 'flex-end',
} : {
   justifyContent: 'flex-start',
}]}>
      {!isOwn && message.user?.avatar && (
        <TouchableOpacity onPress={() => onAvatarPress?.(message.user.avatar)}>
          <Image
            source={{ uri: message.user.avatar }}
            style={{
               width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: theme.surface,
            }}
            onError={() => console.log("Message avatar error")}
          />
        </TouchableOpacity>
      )}
      
      <View style={[{
          maxWidth: width * 0.7,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    marginHorizontal: 4,
      }, isOwn ? {
         backgroundColor: theme.primary,
    borderBottomRightRadius: 4,
      } : {  backgroundColor: theme.surface,
    borderBottomLeftRadius: 4,}]}>
        {!isOwn && (
          <Text style={{
               fontSize: 12,
    color:theme.primary,
    marginBottom: 2,
    fontFamily:regular
          }}>
            {message.user?.name || 'Unknown'}
          </Text>
        )}
        <Text style={[{
           fontSize: 16,
    lineHeight: 20,
        }, isOwn ? {
            color: theme.textPrimary,
        } : {
            color: theme.textPrimary,
        }]}>
          {message.text}
        </Text>
        <Text style={[{
             fontSize: 11,
    marginTop: 4,
        }, isOwn ? {
           color: theme.textSecondary,
    textAlign: 'right',
        } : {
           color: theme.textSecondary,
        }]}>
          {messageTime}
        </Text>
      </View>
    </View>
  );
});
  const playNotificationSound = useCallback(() => {
    try {
      if (soundRef.current && isMountedRef.current) {
        soundRef.current.play((success) => {
          if (!success) console.log('Sound play failed');
        });
      }
    } catch (error) {
      console.log('Play sound error:', error);
    }
  }, []);

  // Firebase setup
  useEffect(() => {
    if (!trip_id || !isMountedRef.current) {
      setIsLoading(false);
      return;
    }

    const setupFirebase = () => {
      try {
        firebaseRef.current = database().ref(`/chat/${trip_id}`);
        
        // Load existing messages
        firebaseRef.current
          .orderByKey()
          .limitToLast(50)
          .once('value')
          .then((snapshot) => {
            if (!isMountedRef.current) return;
            
            const messagesList = [];
            snapshot.forEach((childSnapshot) => {
              const messageData = childSnapshot.val();
              if (messageData) {
                messagesList.push({
                  _id: childSnapshot.key,
                  text: messageData.text || '',
                  createdAt: messageData.createdAt || Date.now(),
                  user: messageData.user || { _id: 'unknown', name: 'Unknown' }
                });
              }
            });
            
            // Sort messages by time (newest first for FlatList)
            messagesList.sort((a, b) => b.createdAt - a.createdAt);
            setMessages(messagesList);
            setIsLoading(false);
          })
          .catch((error) => {
            console.log('Firebase load error:', error);
            setIsLoading(false);
          });

        // Listen for new messages
        listenerRef.current = firebaseRef.current.on('child_added', (snapshot) => {
          if (!isMountedRef.current) return;
          
          const messageData = snapshot.val();
          if (messageData) {
            const newMessage = {
              _id: snapshot.key,
              text: messageData.text || '',
              createdAt: messageData.createdAt || Date.now(),
              user: messageData.user || { _id: 'unknown', name: 'Unknown' }
            };

            setMessages(prevMessages => {
              // Check for duplicates
              const exists = prevMessages.some(msg => msg._id === newMessage._id);
              if (!exists) {
                // Play sound only for messages from others
                if (newMessage.user._id !== currentUser._id) {
                  playNotificationSound();
                }
                return [newMessage, ...prevMessages];
              }
              return prevMessages;
            });
          }
        });

      } catch (error) {
        console.log('Firebase setup error:', error);
        setIsLoading(false);
      }
    };

    setupFirebase();

    return () => {
      try {
        if (firebaseRef.current && listenerRef.current) {
          firebaseRef.current.off('child_added', listenerRef.current);
        }
      } catch (error) {
        console.log('Firebase cleanup error:', error);
      }
    };
  }, [trip_id, currentUser._id, playNotificationSound]);

  // Navigation handlers
  const goBack = useCallback(() => {
    
    try {
      navigation.goBack();
    } catch (error) {
      console.log('Navigation error:', error);
    }
  }, [navigation]);

  const callUser = useCallback(() => {
    try {
      const phoneNumber = data?.trip?.contact !== "null" 
        ? data.trip.contact 
        : data?.trip?.driver?.phone_with_code;
      
      if (phoneNumber) {
        Linking.openURL(`tel:${phoneNumber}`);
      } else {
        Alert.alert("Error", "Phone number not available");
      }
    } catch (error) {
      console.log('Call error:', error);
      Alert.alert("Error", "Unable to make call");
    }
  }, [data]);

  // Send message
  const sendMessage = useCallback(() => {
    if (!inputText.trim() || !trip_id || !isMountedRef.current) return;

    const messageText = inputText.trim();
    setInputText('');

    try {
      const messageData = {
        text: messageText,
        user: currentUser,
        createdAt: database.ServerValue.TIMESTAMP,
      };

      firebaseRef.current?.push(messageData)
        .catch((error) => {
          console.log('Send message error:', error);
          Alert.alert('Error', 'Failed to send message');
          setInputText(messageText); // Restore text on error
        });
    } catch (error) {
      console.log('Send message error:', error);
      Alert.alert('Error', 'Failed to send message');
      setInputText(messageText);
    }
  }, [inputText, trip_id, currentUser]);

  const handleAvatarPress = useCallback((avatarUri) => {
    if (avatarUri) {
      setSelectedAvatar(avatarUri);
      setModalVisible(true);
    }
  }, []);

  const renderMessage = useCallback(({ item }) => {
    const isOwn = item.user._id === currentUser._id;
    return (
      <MessageBubble
        message={item}
        isOwn={isOwn}
        onAvatarPress={handleAvatarPress}
      />
    );
  }, [currentUser._id, handleAvatarPress]);

  const keyExtractor = useCallback((item) => item._id, []);

  if (isLoading) {
    return (
      <SafeAreaView style={{
        flex:1,backgroundColor:theme.background
      }}>
        <View style={{
             flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
        }}>
          <Text style={{
             fontSize: 16,
    color: theme.textPrimary,
          }}>Loading chat...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{
       flex: 1,
    backgroundColor: theme.background,
    }}>
        <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="dark-content"
              />
      <KeyboardAvoidingView 
        style={{flex:1,}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ImageBackground
          source={isDark?chat_bg_dark:chat_bg}
          style={{
              flex: 1,
              
          }}
          resizeMode="cover"
        >
          {/* Header */}
          <View style={{
            height: 70,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
          }}>
            <TouchableOpacity onPress={goBack} style={{
                  width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
            }}>
              <Icon
                type={Icons.MaterialIcons}
                name="arrow-back"
                color={theme.textPrimary}
                style={{
                     fontSize: 28,
                }}
              />
            </TouchableOpacity>
            
            <View style={{
               flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
            }}>
              <Image
                style={{
                   height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
                }}
                source={{ 
                  uri: data?.trip?.driver?.profile_picture 
                    ? img_url + data.trip.driver.profile_picture 
                    : 'https://via.placeholder.com/40' 
                }}
              />
              <Text style={{
                  color: theme.textPrimary,
    fontSize: f_xl,
    fontFamily: regular,
    marginLeft: 12,
    flex: 1,
              }} numberOfLines={1}>
                {data?.trip?.driver?.first_name || 'Unknown'} {data?.trip?.driver?.last_name || 'User'}
              </Text>
            </View>
            
            <TouchableOpacity onPress={callUser} style={{
               width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
            }}>
              <Icon
                type={Icons.MaterialIcons}
                name="call"
                color={theme.textPrimary}
                style={{
                   fontSize: 28,
                }}
              />
            </TouchableOpacity>
          </View>

          {/* Messages List */}
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={keyExtractor}
            style={{
                  flex: 1,
    paddingHorizontal: 15,
            }}
            contentContainerStyle={{
                 paddingVertical: 10,
            }}
            inverted={true}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          />

          {/* Input Area */}
          <View style={{
               flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: theme.surface,
    borderTopWidth: 1,
    borderTopColor:theme.divider,
          }}>
            <TextInput
              style={{
                flex: 1,
    borderWidth: 1,
    borderColor:theme.divider,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 16,
    backgroundColor: theme.background,
              }}
              value={inputText}
              onChangeText={setInputText}
              placeholder={t('Type your message') + "..."}
              placeholderTextColor="#999"
              multiline={true}
              maxLength={1000}
            />
            <TouchableOpacity
              style={[{  width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,}, { opacity: inputText.trim() ? 1 : 0.5 }]}
              onPress={sendMessage}
              disabled={!inputText.trim()}
            >
              <Icon
                type={Icons.MaterialIcons}
                name="send"
                color={theme.primary}
                style={{
                      fontSize: 30,
                }}
              />
            </TouchableOpacity>
          </View>

          {/* Avatar Modal */}
          <Modal
            transparent={true}
            visible={modalVisible}
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
          >
            <TouchableOpacity
              style={{
                  flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
              }}
              activeOpacity={1}
              onPress={() => setModalVisible(false)}
            >
              <View style={{
                  backgroundColor: 'transparent',
    padding: 20,
    alignItems: 'center',
              }}>
                {selectedAvatar && (
                  <Image
                    source={{ uri: selectedAvatar }}
                    style={{
                       width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: theme.background,
                    }}
                    onError={() => setModalVisible(false)}
                  />
                )}
              </View>
            </TouchableOpacity>
          </Modal>
        </ImageBackground>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;