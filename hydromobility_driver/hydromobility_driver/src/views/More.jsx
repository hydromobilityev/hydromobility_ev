import { useTranslation } from "react-i18next";
import '../languages/i18next.js';

import React, { useCallback, useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  FlatList,
  StatusBar,
  Alert,
  Modal,
  Platform
} from "react-native";
import { CommonActions, useFocusEffect, useNavigation } from "@react-navigation/native";
import Icon, { Icons } from '../components/Icons';
import { bold, regular, logo, menus, f_s, f_xs, api_url, get_profile, img_url, profile,delete_account_request, normal, f_l, f_m } from '../config/Constants';
import Dialog from "react-native-dialog";
import { connect } from 'react-redux';

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useTheme } from "../context/ThemeContext.js";
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const More = (props) => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const [dialog_visible, setDialogVisible] = useState(false);
  const [delete_dialog_visible, setDeleteDialogVisible] = useState(false);
    const { theme, isDark,toggleTheme } = useTheme(); 
  const [data, setData] = useState("");
  const [menus, setMenus] = useState([
    {
      menu_name: t('KYC Verification'),
      icon: "files-o",
      route: "KycVerification",
      color: theme.textPrimary,
    },
    {
      menu_name: t('Training'),
      icon: "user",
      route: "Training",
      color: theme.textPrimary,
    },
    {
      menu_name: t('Frequently Asked Questions'),
      icon: "question-circle-o",
      route: "Faq",
      color: theme.textPrimary,
    },
    {
      menu_name: t('Earnings'),
      icon: "dollar",
      route: "Earnings",
      color: theme.textPrimary,
    },
     {
      menu_name: t('Languages'),
      icon: "language",
      route: "Languages",
      color: theme.textPrimary,
    },
    {
      menu_name: t('Withdrawals'),
      icon: "credit-card",
      route: "Withdrawal",
      color: theme.textPrimary,
    },
    {
      menu_name: t('Wallet Transactions'),
      icon: "money",
      route: "Wallet",
      color: theme.textPrimary,
    },
    {
      menu_name:t('Refer And Earn'),
      icon: "handshake-o",
      route: "Refer",
      color: theme.textPrimary,
    },
    {
      menu_name: t('Notifications'),
      icon: "bell",
      route: "Notifications",
      color: theme.textPrimary,
    },
    {
      menu_name: t('About Us'),
      icon: "building-o",
      route: "AboutUs",
      color: theme.textPrimary,
    },
    {
      menu_name: t('Privacy Policies'),
      icon: "info-circle",
      route: "PrivacyPolicies",
      color: theme.textPrimary,
    },
   
  ]);
  const [footer_menus, setFooterMenus] = useState([
   
    {
      menu_name: t('Logout'),
      icon: "sign-out",
      route: "Logout",
      color: theme.error,
    },
    {
      menu_name: t('Delete Account'),
      icon: "trash",
      route: "Delete Account",
      color: theme.error,
    },
  ]);
  useFocusEffect(
    useCallback(() => {
      call_get_profile();  // This will run when the screen is focused  
      // Optionally, you can return a cleanup function here if needed
      return () => {
        // Cleanup if necessary when the screen loses focus
      };
    }, [])
  );
  const call_get_profile = () => {
    axios({
        method: 'post',
        url: api_url + get_profile,
        data: { driver_id: global.id, lang: i18n.language }
    })
        .then(async response => {  
            setData(response.data.result);
        })
        .catch(error => { 
            Alert(t('Sorry something went wrong'))
        });
}
  const navigate = (route) => {
ReactNativeHapticFeedback.trigger("impactLight", options);

    if (route == 'Logout') {
      setDialogVisible(true);
    } 
    else if(route=='Delete Account')
    {
     setDeleteDialogVisible(true);
    }
    else {
      navigation.navigate(route);
    }
  }


  const closeDialog = () => {
    setDialogVisible(false);
  }


  const handleLogout = async () => {
ReactNativeHapticFeedback.trigger("impactLight", options);

    closeDialog();
    navigation.navigate('Logout');
  }


  
  const call_delete_account_api = () => {
     if (global.mode == "DEMO") {
     Alert.alert(
       t('Demo Mode'),
       t('Sorry You cannot delete the account in demo mode')
     );
     setDeleteDialogVisible(false)
     return;
   }
ReactNativeHapticFeedback.trigger("impactLight", options);

    console.log({ driver_id: global.id, phone_with_code: global.phone_with_code})
  
    
    axios({
        method: 'post',
        url: api_url + delete_account_request,
        data: { driver_id: global.id, phone_with_code: global.phone_with_code}
    })
    .then(async response => {
      console.log('response,',response)
        AsyncStorage.clear();
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "CheckPhone" }],
         
          })
        );
    })
    .catch(error => {
    console.log(error)
        Alert.alert("Sorry Something went wrong")
    });
  }
  return (
<SafeAreaView style={{backgroundColor: theme.background, flex: 1}}>
  <StatusBar translucent backgroundColor="transparent" barStyle={isDark ? "light-content" : "dark-content"} />

  {/* Logout Modal */}
  <Modal transparent visible={dialog_visible} animationType="fade">
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
      }}>
      <View
        style={{
          backgroundColor: theme.surface,
          borderRadius: 20,
          width: '100%',
          maxWidth: 340,
          overflow: 'hidden',
          shadowColor: "#000",
          shadowOffset: {width: 0, height: 4},
          shadowOpacity: 0.25,
          shadowRadius: 12,
          elevation:Platform.OS=='ios'? 4:0
        }}>
        {/* Header */}
        <View style={{padding: 24, alignItems: 'center'}}>
          <View style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: theme.error + '20',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 16
          }}>
            <Icon
              type={Icons.MaterialIcons}
              name="logout"
              color={theme.error}
              size={28}
            />
          </View>
          <Text
            style={{
              fontSize: 20,
              fontFamily: regular,
     
              color: theme.textPrimary,
              textAlign: 'center',
              marginBottom: 8,
            }}>
            {t('Confirm Logout')}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: regular,
              color: theme.textSecondary,
              textAlign: 'center',
              lineHeight: 24,
            }}>
            {t('Are you sure you want to logout')}
          </Text>
        </View>

        {/* Footer */}
        <View style={{flexDirection: 'row', borderTopWidth: 1, borderTopColor: theme.divider}}>
          <TouchableOpacity
            onPress={closeDialog}
            activeOpacity={0.7}
            style={{
              flex: 1,
              paddingVertical: 16,
              alignItems: 'center',
              justifyContent: 'center',
              borderRightWidth: 1,
              borderRightColor: theme.divider,
            }}>
            <Text style={{color: theme.textSecondary, fontFamily: regular, fontSize: 16, }}>
              {t('Cancel')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogout}
            activeOpacity={0.7}
            style={{flex: 1, paddingVertical: 16, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: theme.error, fontFamily: regular, fontSize: 16, }}>
              {t('Logout')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>

  {/* Delete Account Modal */}
  <Modal transparent visible={delete_dialog_visible} animationType="fade">
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
      }}>
      <View
        style={{
          backgroundColor: theme.surface,
          borderRadius: 20,
          width: '100%',
          maxWidth: 340,
          overflow: 'hidden',
          shadowColor: "#000",
          shadowOffset: {width: 0, height: 4},
          shadowOpacity: 0.25,
          shadowRadius: 12,
          elevation:Platform.OS=='ios'? 4:0
        }}>
        {/* Header */}
        <View style={{padding: 24, alignItems: 'center'}}>
          <View style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: theme.error + '20',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 16
          }}>
            <Icon
              type={Icons.MaterialIcons}
              name="delete-outline"
              color={theme.error}
              size={28}
            />
          </View>
          <Text
            style={{
              fontSize: 20,
              fontFamily: regular,
        
              color: theme.textPrimary,
              textAlign: 'center',
              marginBottom: 8,
            }}>
            {t('Delete Account')}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: regular,
              color: theme.textSecondary,
              textAlign: 'center',
              lineHeight: 24,
            }}>
            {t('Are you sure you want to delete your account? This action cannot be undone')}
          </Text>
        </View>

        {/* Footer */}
        <View style={{flexDirection: 'row', borderTopWidth: 1, borderTopColor: theme.divider}}>
          <TouchableOpacity
            onPress={() => setDeleteDialogVisible(false)}
            activeOpacity={0.7}
            style={{
              flex: 1,
              paddingVertical: 16,
              alignItems: 'center',
              justifyContent: 'center',
              borderRightWidth: 1,
              borderRightColor: theme.divider,
            }}>
            <Text style={{color: theme.textSecondary, fontFamily: regular, fontSize: 16, }}>
              {t('Cancel')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={call_delete_account_api}
            activeOpacity={0.7}
            style={{flex: 1, paddingVertical: 16, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: theme.error, fontFamily: regular, fontSize: 16, }}>
              {t('Delete')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>

  {/* Profile Section */}
  <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
 <View
  style={{
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: theme.surface,
    borderRadius: 12,
    margin: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
   elevation:Platform.OS=='ios'? 4:0
  }}>
  
  {/* Profile Image */}
  <View
    style={{
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 6,
     elevation:Platform.OS=='ios'? 4:0
    }}>
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 40,
        width: 80,
        height: 80,
        borderColor: theme.primary + '30',
        borderStyle: 'dashed',
      }}>
      <Image
        style={{width: 72, height: 72, borderRadius: 36}}
        source={{uri: img_url + data?.profile_picture}}
      />
    </View>
  </View>

  {/* Middle Section (Name, Email, Edit Button) */}
  <View style={{flex: 1, marginLeft: 16}}>
    <Text
      style={{
        color: theme.textPrimary,
        fontSize: 18,
        fontFamily: regular,
        fontWeight: '600',
        marginBottom: 2,
      }}
      numberOfLines={1}>
      {global.first_name}
    </Text>
    <Text
      style={{
        color: theme.textSecondary,
        fontSize: 14,
        fontFamily: regular,
        marginBottom: 8,
      }}
      numberOfLines={1}>
      {global.email}
    </Text>

    <TouchableOpacity
      onPress={() => navigate('Profile')}
      activeOpacity={0.8}
      style={{
        backgroundColor: theme.primary,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
      }}>
      <Icon
        type={Icons.MaterialIcons}
        name="edit"
        color={theme.onPrimary}
        size={14}
        style={{marginRight: 4}}
      />
      <Text
        style={{
          color: theme.onPrimary,
          fontSize: 12,
          fontFamily: normal,
          fontWeight: '500',
        }}>
        {t('Edit Profile')}
      </Text>
    </TouchableOpacity>
  </View>

</View>


    {/* Menu Section */}
    <View style={{paddingHorizontal: 16, marginTop: 0}}>
      <View style={{
        backgroundColor: theme.surface,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation:Platform.OS=='ios'? 4:0,
      }}>
       

        <FlatList
          data={menus}
          scrollEnabled={false}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigate(item.route)}
              activeOpacity={0.7}
              style={{
                flexDirection: 'row',
                paddingVertical: 15,
                paddingHorizontal: 12,
                alignItems: 'center',
                borderRadius: 12,
                marginBottom: 4,
              }}>
              <View style={{
                width: 20,
                height: 20,
                borderRadius: 20,
                
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 12,
              }}>
                <Icon
                  type={Icons.FontAwesome}
                  name={item.icon}
                  color={theme.textSecondary}
                  size={f_l}
                />
              </View>
              <Text
                style={{
                  flex: 1,
                  color: theme.textPrimary,
                  fontSize: f_s,
                  fontFamily: regular,
                }}>
                {t(item.menu_name)}
              </Text>
              <Icon
                type={Icons.FontAwesome5}
                name="chevron-right"
                color={theme.textSecondary}
                size={f_s}
              />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.menu_name}
        />
      </View>

      <View style={{
        backgroundColor: theme.surface,
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation:Platform.OS=='ios'? 4:0,
      }}>
      

        <FlatList
          data={footer_menus}
          scrollEnabled={false}
       
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={item.menu_name === 'Logout' ? () => setDialogVisible(true) : 
                       item.menu_name === 'Delete Account' ? () => setDeleteDialogVisible(true) : 
                       () => navigate(item.route)}
              activeOpacity={0.7}
              style={{
                flexDirection: 'row',
                paddingVertical: 16,
                paddingHorizontal: 12,
                alignItems: 'center',
                borderRadius: 12,
                marginBottom: 4,
              }}>
              <View style={{
                width: 20,
                height: 20,
                borderRadius: 20,
               
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 12,
              }}>
                <Icon
                  type={Icons.FontAwesome}
                  name={item.icon}
                  color={theme.error}
                  size={f_l}
                />
              </View>
              <Text
                style={{
                  flex: 1,
                  color: theme.error,
                  fontSize: f_s,
                  fontFamily: regular,
                }}>
                {t(item.menu_name)}
              </Text>
              <Icon
                type={Icons.FontAwesome5}
                name="chevron-right"
                color={theme.error}
                size={f_s}
              />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.menu_name}
        />
      </View>
    </View>
        <View style={{margin:'10%'}}/>

  </ScrollView>

</SafeAreaView>


  );
};


function mapStateToProps(state) {
  return {
    first_name: state.register.first_name,
    last_name: state.register.last_name,
    email: state.register.email,
  };
}

const mapDispatchToProps = (dispatch) => ({
  updateEmail: (data) => dispatch(updateEmail(data)),
  updateFirstName: (data) => dispatch(updateFirstName(data)),
  updateLastName: (data) => dispatch(updateLastName(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(More);