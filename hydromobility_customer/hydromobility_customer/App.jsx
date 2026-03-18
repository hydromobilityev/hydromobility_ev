import { useTranslation } from "react-i18next";
import i18n, { i18nInitPromise } from './src/languages/i18next'; // adjust the path
import React, {  useCallback, useEffect, useState } from 'react';
import { CommonActions, NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, useDrawerStatus } from '@react-navigation/drawer';
import { StyleSheet, Text, TouchableOpacity, View, Image, Alert, Modal, StatusBar, Dimensions } from 'react-native'
import Icon, { Icons } from './src/components/Icons';
import * as colors from './src/assets/css/Colors';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { screenWidth, bold, normal, regular, logo, img_url, api_url, get_profile, profile, delete_account_request, f_s, f_l, f_m, STRIPE_PKTEST } from './src/config/Constants';
import { connect } from 'react-redux';
import DropShadow from "react-native-drop-shadow";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StripeProvider } from "@stripe/stripe-react-native";
import { PaystackProvider } from 'react-native-paystack-webview';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
 const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };
  const { width, height } = Dimensions.get('window');
  

/* Screens */
import Splash from './src/views/Splash';
import LocationEnable from './src/views/LocationEnable'; 
import Intro from './src/views/Intro'; 
import Forgot from './src/views/Forgot'; 
import Dashboard from './src/views/Dashboard'; 
import Faq from './src/views/Faq';
import EmergencyContacts from './src/views/EmergencyContacts'; 
import MyRides from './src/views/MyRides'; 
import Wallet from './src/views/Wallet';
import Profile from './src/views/Profile';
import Notifications from './src/views/Notifications';
import TripDetails from './src/views/TripDetails';
import CheckPhone from './src/views/CheckPhone';
import Password from './src/views/Password';
import OTP from './src/views/OTP';
import CreateName from './src/views/CreateName';
import CreateEmail from './src/views/CreateEmail';
import CreatePassword from './src/views/CreatePassword';
import ResetPassword from './src/views/ResetPassword';
import Bill from './src/views/Bill';
import PaymentMethod from './src/views/PaymentMethod';
import WriteRating from './src/views/WriteRating';
import PrivacyPolicies from './src/views/PrivacyPolicies';
import AboutUs from './src/views/AboutUs';
import Refer from './src/views/Refer';
import ComplaintCategory from './src/views/ComplaintCategory';
import ComplaintSubCategory from './src/views/ComplaintSubCategory';
import FaqDetails from './src/views/FaqDetails'; 
import Promo from './src/views/Promo'; 
import EditFirstName from './src/views/EditFirstName'; 
import EditLastName from './src/views/EditLastName'; 
import EditEmail from './src/views/EditEmail'; 
import Rating from './src/views/Rating';
import NotificationDetails from './src/views/NotificationDetails'; 
import AddEmergencyContact from './src/views/AddEmergencyContact';
import Paypal from './src/views/Paypal';
import CreateComplaint from './src/views/CreateComplaint';
import Chat from './src/views/Chat';
import AppUpdate from './src/views/AppUpdate'; 

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoInternet from './src/views/NoInternet';
import { useTheme } from "./src/context/ThemeContext";
import Languages from "./src/views/Languages";



const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
function CustomDrawerContent(props) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [dialog_visible, setDialogVisible] = useState(false);
  const [profile_image,setProfileImage]=useState(global.profile_picture);
  const [delete_dialog_visible,setDeleteDialogVisible]=useState(false);
  const { theme, toggleTheme, isDark } = useTheme();
 const drawerStatus = useDrawerStatus();
  const menus = [
    { icon: 'home', name: 'Dashboard', route: 'Dashboard' },
    { icon: 'local-taxi', name: 'My Rides', route: 'MyRides' },
    { icon: 'account-circle', name: 'Profile Settings', route: 'Profile' },
    { icon: 'account-circle', name: 'Languages', route: 'Languages' },

    { icon: 'payments', name: 'Wallet', route: 'Wallet' },
    { icon: 'notifications', name: 'Notifications', route: 'Notifications' },
    { icon: 'contacts', name: 'Emergency Contacts', route: 'EmergencyContacts' },
    { icon: 'share', name: 'Refer And Earn', route: 'Refer' },
    { icon: 'help', name: 'FAQs', route: 'Faq' },
    { icon: 'article', name: 'Privacy Policies', route: 'PrivacyPolicies' },
    { icon: 'info', name: 'About Us', route: 'AboutUs' },
  ];


  useEffect(() => {
    if (drawerStatus === 'open') {
      get_profile_image(); // Fetch updated profile whenever drawer opens
    }
  }, [drawerStatus]);


  const closeDialog = () => {
    ReactNativeHapticFeedback.trigger("impactLight", options)
    setDialogVisible(false);
  }

  const handleCancel = () => {
    ReactNativeHapticFeedback.trigger("impactLight", options)
    setDialogVisible(false)
  }
  const get_profile_image= async ()=>{
    const profile_picture = await AsyncStorage.getItem('profile_picture');
    setProfileImage(profile_picture);
  }

  const navigate=(route)=>{
    
      navigation.navigate('Home', {screen: route});
    
  }
const handleLogout = async () => {
    try {
      ReactNativeHapticFeedback.trigger('impactLight', options);
      closeDialog();
      await AsyncStorage.removeItem('id');

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'CheckPhone'}],
        }),
      );
    } catch (err) {
      console.warn('Logout error:', err);
    }
  };


const call_delete_account_api = () => {
  if(global.mode == 'DEMO'){
    Alert.alert(
      t('Demo Mode'), 
      t('Sorry You cannot delete the account in demo mode'),
      [
        {
          text: t('OK'), // Arabic for "OK"
        
        }
      ]
    );
    setDeleteDialogVisible(false)
        return;
      }
  console.log({ customer_id: global.id, phone_with_code: global.phone_with_code})
 
  axios({
      method: 'post',
      url: api_url + delete_account_request,
      data: { customer_id: global.id, phone_with_code: global.phone_with_code}
  })
  .then(async response => {
    
      AsyncStorage.clear();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "CheckPhone" }],
        })
      );
  })
  .catch(error => {
  
      Alert.alert("Sorry Something went wrong")
  });
}
  return (
    <DrawerContentScrollView
      {...props}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1, backgroundColor: theme.background}}>

      {/* Header */}
  <View style={{ paddingHorizontal: 20, paddingTop: 20, backgroundColor: theme.background }}>
  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
    
    {/* Profile Info */}
    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
      <DropShadow
        style={{
          shadowColor: theme.shadow_color,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3,
        }}
      >
        <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: theme.surface, overflow: 'hidden' }}>
          <Image
            style={{ height: '100%', width: '100%' }}
            source={{ uri: img_url + profile_image }}
            resizeMode="cover"
          />
        </View>
      </DropShadow>

      <View style={{ marginLeft: 15, flex: 1 }}>
        <Text style={{ color: theme.textSecondary, fontFamily:regular, fontSize: 16, marginBottom: 2 }}>
          {t('Hello')},
        </Text>
        <Text style={{ color: theme.textPrimary, fontFamily:regular, fontSize: 20,  }}>
          {global.first_name}
        </Text>
      </View>
    </View>

  
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
 
   

      {/* Close Icon */}
      <TouchableOpacity
        onPress={() => navigate('Dashboard')}
        style={{
          padding: 10,
          backgroundColor: theme.surface,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon type={Icons.MaterialIcons} name="close" color={theme.textPrimary} size={24} />
      </TouchableOpacity>
    </View>

  </View>
</View>



      

      {/* Menus */}
      <View style={{paddingVertical:10}}>
        {menus.map((item) => {
          const active = props.state.routeNames[props.state.index] === item.route;
          return (
            <TouchableOpacity
              key={item.route}
              onPress={() => navigate(item.route)}
              style={{
                flexDirection:'row',
                alignItems:'center',
                paddingVertical:13,
                paddingHorizontal:20,
                backgroundColor: active ? theme.surface : 'transparent'
              }}>
              <View style={{width:30,alignItems:'center'}}>
                <Icon
                type={Icons.MaterialIcons}
                  name={item.icon}
                  size={24}
                  color={active ? theme.textPrimary : theme.textSecondary}
                />
              </View>
              <Text
                style={{
                  color: active ? theme.textPrimary : theme.textSecondary,
                  fontSize:16,
                  marginLeft:15,
                  fontFamily:regular,
                  flex:1
                }}>
                {t(item.name)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Bottom Actions */}
      <View style={{
        marginTop:'auto',
        paddingVertical:10,
        borderTopWidth:1,
        borderTopColor: theme.divider
      }}>
        <TouchableOpacity
          onPress={() => setDialogVisible(true)}
          style={{flexDirection:'row',alignItems:'center',padding:13,paddingHorizontal:20}}>
          <Icon type={Icons.MaterialIcons} name="logout" size={24} color={theme.error}/>
          <Text style={{color:theme.error,fontSize:16,fontFamily:regular,marginLeft:15,flex:1}}>
            {t('Logout')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setDeleteDialogVisible(true)}
          style={{flexDirection:'row',alignItems:'center',padding:13,paddingHorizontal:20}}>
          <Icon type={Icons.MaterialIcons} name="delete" size={24} color={theme.error}/>
          <Text style={{color:theme.error,fontSize:16,fontFamily:regular,marginLeft:15,flex:1}}>
            {t('Delete Account')}
          </Text>
        </TouchableOpacity>
      </View>
        <Modal transparent={true} visible={delete_dialog_visible} animationType="fade">
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.3)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}>
          <View style={{
            backgroundColor: theme.surface,
            borderRadius: 16,
            padding: 0, // Remove padding to allow for full-width borders
            width: '100%',
            maxWidth: 320,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 4},
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 5,
            overflow: 'hidden', // Ensures borders respect the borderRadius
          }}>
            {/* Modal Header */}
            <View style={{
              padding: 24,
              paddingBottom: 16,
            }}>
              <Text style={{
                fontSize: 20,
                fontFamily: '600',
                color:theme.textPrimary,
                textAlign: 'center',
                marginBottom: 4,
              }}>
                {t('Delete Account')}
              </Text>
              <Text style={{
                fontSize: 15,
                fontFamily: '400',
                color: theme.textSecondary,
                textAlign: 'center',
                lineHeight: 22,
              }}>
                {t('Are you sure you want to delete your account? This action cannot be undone.')}
              </Text>
            </View>

            {/* Action Buttons */}
            <View style={{
              flexDirection: 'row',
              borderTopWidth: 1,
              borderTopColor:theme.divider,
            }}>
              <TouchableOpacity
                onPress={() => setDeleteDialogVisible(false)}
                activeOpacity={0.8}
                style={{
                  flex: 1,
                  padding: 16,
                  alignItems: 'center',
                  borderRightWidth: 1,
                  borderRightColor: theme.divider,
                }}>
                <Text style={{
                  color: '#4B5563',
                  fontFamily: '600',
                  fontSize: 16,
                }}>
                  {t('Cancel')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={call_delete_account_api}
                activeOpacity={0.8}
                style={{
                  flex: 1,
                  padding: 16,
                  alignItems: 'center',
                }}>
                <Text style={{
                  color: '#EF4444',
                  fontFamily: '600',
                  fontSize: 16,
                }}>
                  {t('Delete')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
       <Modal transparent={true} visible={dialog_visible} animationType="fade">
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.3)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}>
          <View style={{
            backgroundColor: theme.surface,
            borderRadius: 10,
            width: '100%',
            maxWidth: 320,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 20,
            elevation: 10,
            overflow: 'hidden',
          }}>
            {/* Modal Header */}
            <View style={{
            padding:10,
              // borderBottomWidth: 1,
              // borderBottomColor: '#F3F4F6',
            }}>
              <Text style={{
                fontSize: 18,
                fontFamily: regular,
                color: theme.textPrimary,
                textAlign: 'center',
                lineHeight: 24,
              }}>
                {t('Confirm Logout')} ?
              </Text>
            </View>

            {/* Modal Body */}
            <View style={{
              padding:10
            }}>
              <Text style={{
                fontSize: 15,
                fontFamily: regular,
                color: theme.textSecondary,
                textAlign: 'center',
                lineHeight: 22,
                marginBottom: 8,
              }}>
                {t('Are you sure you want to logout')}?
              </Text>
            </View>

            {/* Modal Footer */}
            <View style={{
              flexDirection: 'row',
              borderTopWidth: 1,
              borderTopColor: theme.divider,
            }}>
              <TouchableOpacity
                onPress={closeDialog}
                activeOpacity={0.9}
                style={{
                  flex: 1,
                  paddingVertical: 16,
                  backgroundColor: theme.surface,
                  alignItems: 'center',
                  borderRightWidth: 1,
                  borderRightColor: theme.divider,
                }}>
                <Text style={{
                  color: '#4B5563',
                  fontFamily: regular,
                  fontSize: 15,
                }}>
                  {t('Cancel')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleLogout}
                activeOpacity={0.9}
                style={{
                  flex: 1,
                  paddingVertical: 16,
                  backgroundColor: theme.surface,
                  alignItems: 'center',
                }}>
                <Text style={{
                  color: '#EF4444',
                  fontFamily: regular,
                  fontSize: 15,
                }}>
                  {t('Logout')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    
    </DrawerContentScrollView>
  );
}


function MyDrawer() {
  return (
    <PaystackProvider publicKey="pk_test_14e5160673559f2c1564d1778e0339e08e1071f6">
  <Drawer.Navigator 
      drawerContent={props => <CustomDrawerContent {...props} />} 
      initialRouteName="Dashboard"
      drawerStyle={{ width: 350, backgroundColor:colors.theme_fg_three }}
      screenOptions={{
        drawerStyle: {
          backgroundColor:colors.theme_fg_three,
          width: screenWidth,
        },
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="MyRides"
        component={MyRides}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Faq"
        component={Faq}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Wallet"
        component={Wallet}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Notifications"
        component={Notifications}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="PrivacyPolicies"
        component={PrivacyPolicies}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="AboutUs"
        component={AboutUs}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Refer"
        component={Refer}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="EmergencyContacts"
        component={EmergencyContacts}
        options={{headerShown: false}}
      />
       <Drawer.Screen
        name="Languages"
        component={Languages}
        options={{headerShown: false}}
      />
     
      
     
    </Drawer.Navigator>
    </PaystackProvider>
  
  );
}

function App() {
      const [i18nReady, setI18nReady] = useState(false);
      const { theme, toggleTheme, isDark } = useTheme();
      useEffect(() => {
        i18nInitPromise.then(() => {
          console.log('✅ i18n initialized');
          setI18nReady(true);
        });
      }, []);

      if (!i18nReady) {
        return (
         <View
               style={{
                 flex: 1,
                 alignItems: 'center',
                 justifyContent: 'center',
                 backgroundColor: theme.background,
               }}
             >
               <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
         
               <Image
                 source={logo}
                 resizeMode="contain"
                 style={{
                   width: width * 0.7,
                   height: height * 0.4,
                 }}
               />
             </View>
        );
      }
   
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <PaystackProvider publicKey="pk_test_14e5160673559f2c1564d1778e0339e08e1071f6">

     <StripeProvider publishableKey={STRIPE_PKTEST}>
        <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          options={{headerShown: false}}>         
        
      
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CheckPhone"
            component={CheckPhone}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Password"
            component={Password}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="OTP"
            component={OTP}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CreateName"
            component={CreateName}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CreateEmail"
            component={CreateEmail}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CreatePassword"
            component={CreatePassword}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LocationEnable"
            component={LocationEnable}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Intro"
            component={Intro}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Forgot"
            component={Forgot}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={MyDrawer}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="TripDetails"
            component={TripDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Bill"
            component={Bill}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PaymentMethod"
            component={PaymentMethod}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="WriteRating"
            component={WriteRating}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ComplaintCategory"
            component={ComplaintCategory}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ComplaintSubCategory"
            component={ComplaintSubCategory}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="FaqDetails"
            component={FaqDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Promo"
            component={Promo}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EditFirstName"
            component={EditFirstName}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EditLastName"
            component={EditLastName}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EditEmail"
            component={EditEmail}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Rating"
            component={Rating}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="NotificationDetails"
            component={NotificationDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AddEmergencyContact"
            component={AddEmergencyContact}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Paypal"
            component={Paypal}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CreateComplaint"
            component={CreateComplaint}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="AppUpdate"
            component={AppUpdate}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="NoInternet"
            component={NoInternet}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
          
     </StripeProvider>
</PaystackProvider>
  
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 16,
  },
   overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:colors.theme_bg_two
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color:colors.theme_bg_two
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderColor:'silver',
    borderWidth:.5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

function mapStateToProps(state) {
  const register = state.register || {};
  return {
    first_name: register.first_name || '',
    last_name: register.last_name || '',
    email: register.email || '',
  };
}
const mapDispatchToProps = (dispatch) => ({
  updateEmail: (data) => dispatch(updateEmail(data)),
  updateFirstName: (data) => dispatch(updateFirstName(data)),
  updateLastName: (data) => dispatch(updateLastName(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
