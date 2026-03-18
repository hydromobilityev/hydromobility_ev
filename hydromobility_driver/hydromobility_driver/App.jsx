import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon, { Icons } from './src/components/Icons';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import i18n, { i18nInitPromise } from './src/languages/i18next';
import { useTheme } from "./src/context/ThemeContext";
import { f_l, f_s, f_xl, f_xs, logo, normal, regular } from "./src/config/Constants";
import { PaystackProvider } from 'react-native-paystack-webview';
import * as colors from './src/assets/css/Colors';
const { width, height } = Dimensions.get('window');
/* Screens */
import Dashboard from './src/views/Dashboard';
import Bookings from './src/views/Bookings';
import More from './src/views/More';
import BookingRequest from './src/views/BookingRequest';
import Chat from './src/views/Chat';
import DirectBooking from './src/views/DirectBooking';
import VehicleDocument from './src/views/VehicleDocument';
import DocumentUpload from './src/views/DocumentUpload';
import Earnings from './src/views/Earnings';
import EditEmail from './src/views/EditEmail';
import EditFirstName from './src/views/EditFirstName';
import EditLastName from './src/views/EditLastName';
import EditPassword from './src/views/EditPassword';
import EditPhoneNumber from './src/views/EditPhoneNumber';
import Faq from './src/views/Faq';
import FaqDetails from './src/views/FaqDetails';
import Forgot from './src/views/Forgot';
import KycVerification from './src/views/KycVerification';
import Login from './src/views/Login';
import LoginHome from './src/views/LoginHome';
import Logout from './src/views/Logout';
import MyRentalRides from './src/views/MyRentalRides';
import Notifications from './src/views/Notifications';
import NotificationDetails from './src/views/NotificationDetails';
import Profile from './src/views/Profile';
import Rating from './src/views/Rating';
import RentalRideDetails from './src/views/RentalRideDetails';
import RideDetails from './src/views/RideDetails';
import SharedTrip from './src/views/SharedTrip';
import Splash from './src/views/Splash';
import Training from './src/views/Training';
import TrainingDetails from './src/views/TrainingDetails';
import Trip from './src/views/Trip';
import TripSettings from './src/views/TripSettings';
import VehicleDetails from './src/views/VehicleDetails';
import Wallet from './src/views/Wallet';
import Withdrawal from './src/views/Withdrawal';
import CheckPhone from './src/views/CheckPhone';
import Password from './src/views/Password';
import OTP from './src/views/OTP';
import CreateName from './src/views/CreateName';
import CreateEmail from './src/views/CreateEmail';
import CreatePassword from './src/views/CreatePassword';
import CreateLicenceNumber from './src/views/CreateLicenceNumber';
import CreateDateOfBirth from './src/views/CreateDateOfBirth';
import ResetPassword from './src/views/ResetPassword';
import CreateVehicleName from './src/views/CreateVehicleName';
import CreateVehicleBrand from './src/views/CreateVehicleBrand';
import CreateVehicleColor from './src/views/CreateVehicleColor';
import CreateVehicleNumber from './src/views/CreateVehicleNumber';
import CreateVehicleType from './src/views/CreateVehicleType';
import AboutUs from './src/views/AboutUs';
import Bill from './src/views/Bill';

import LocationEnable from './src/views/LocationEnable';
import Paypal from './src/views/Paypal';
import AppUpdate from './src/views/AppUpdate';
import PrivacyPolicies from './src/views/PrivacyPolicies';
import TodayBookings from './src/views/TodayBookings';
import SelectGthLocation from './src/views/SelectGthLocation';
import DriverVerification from './src/views/DriverVerification';
import DriverApproved from './src/views/DriverApproved';
import DriverRegistration from './src/views/DriverRegistration';
import Refer from './src/views/Refer';
import DirectionScreen from "./src/views/DirectionScreen";
import NavigationScreen from "./src/views/NavigationScreen";
import Navigation from "./src/views/Navigation";
import Languages from './src/views/Languages';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const hapticOptions = { enableVibrateFallback: true, ignoreAndroidSystemSettings: false };
const TabButton = ({ focused, item }) => {
  const navigation = useNavigation();
    const { theme } = useTheme();

  // Animated scale
  const scaleAnim = useRef(new Animated.Value(focused ? 1.2 : 1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: focused ? 1.2 : 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  const handlePress = () => {
    navigation.navigate(item.route);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Animated.View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection:'row',gap:5,padding:5,borderRadius:10,
          transform: [{ scale: scaleAnim }],
          width: "100%",
          maxWidth: 120,
          height:35,
        backgroundColor:focused?theme.primary : colors.background

        }}
      >
        <item.type
          name={item.icon}
          color={focused ? theme.onPrimary : theme.textSecondary}
          size={f_xl}
        />
        {focused && (
          <Text
            style={{
              marginTop: 2,
              color: focused ? theme.onPrimary : theme.textSecondary,
              fontSize: f_xs,
              fontFamily: regular,
              textAlign: "center",
            }}
            numberOfLines={1}
          >
            {getLabel(item.label)}
          </Text>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};


function TabNavigator() {
      const { theme } = useTheme();

  const TabArr = [
    { route: 'Dashboard', label: 'Dashboard', type: Icons.FontAwesome, icon: 'car', component: Dashboard },
    { route: 'Bookings', label: 'Bookings', type: Icons.FontAwesome, icon: 'book', component: Bookings },
    { route: 'More', label: 'More', type: Icons.Ionicons, icon: 'settings', component: More },
  ];

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 50,
          position: 'absolute',
          alignItems:'center',
          justifyContent:'center',
          alignContent:'center',
          bottom: 40,
             width: '90%',
          marginLeft: '5%',
          borderRadius: 16,
          backgroundColor: theme.background,
          // iOS shadow
  shadowColor: '#000', // using black for subtle shadow
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.3, // lower for softer effect
  shadowRadius: 6,      // slightly larger for blur
  borderTopWidth: 0,    // removes default iOS border

  // Android elevation
  elevation: 5,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      {TabArr.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item.route}
          component={item.component}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <TabButton focused={focused} item={item} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}


const getLabel = (name) => {
  if (i18n?.language != 'en') {
    if (name === 'Dashboard') return 'Dashibodi';
    if (name === 'Bookings') return 'Uhifadhi';
    if (name === 'More') return 'Zaidi';
  }
  return name;
};

function App() {
  const [i18nReady, setI18nReady] = useState(false);
  const { theme } = useTheme();

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
        <PaystackProvider publicKey="pk_test_14e5160673559f2c1564d1778e0339e08e1071f6">
<NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Navigation" component={Navigation} options={{headerShown: false}}  />
               <Stack.Screen name="NavigationScreen" component={NavigationScreen} options={{headerShown: false}}  />
               <Stack.Screen name="DirectionScreen" component={DirectionScreen} options={{headerShown: false}}  />
               <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}}  />
               <Stack.Screen name="Bookings" component={Bookings} options={{headerShown: false}}  />
               <Stack.Screen name="BookingRequest" component={BookingRequest} options={{headerShown: false}}  />
               <Stack.Screen name="Chat" component={Chat} options={{headerShown: false}}  />
               <Stack.Screen name="DirectBooking" component={DirectBooking} options={{headerShown: false}}  />
               <Stack.Screen name="VehicleDocument" component={VehicleDocument} options={{headerShown: false}}  />
               <Stack.Screen name="DocumentUpload" component={DocumentUpload} options={{headerShown: false}}  />
               <Stack.Screen name="DriverRegistration" component={DriverRegistration} options={{headerShown: false}}  />
               <Stack.Screen name={"Home"} component={TabNavigator} options={{headerShown: false}}  />
               <Stack.Screen name="EditEmail" component={EditEmail} options={{headerShown: false}}  />
               <Stack.Screen name="EditFirstName" component={EditFirstName} options={{headerShown: false}}  />
               <Stack.Screen name="EditLastName" component={EditLastName} options={{headerShown: false}}  />
               <Stack.Screen name="EdiatPassword" component={EditPassword} options={{headerShown: false}}  />
               <Stack.Screen name="EditPhoneNumber" component={EditPhoneNumber} options={{headerShown: false}}  />
               <Stack.Screen name="Faq" component={Faq} options={{headerShown: false}}  />
               <Stack.Screen name="FaqDetails" component={FaqDetails} options={{headerShown: false}}  />
               <Stack.Screen name="Forgot" component={Forgot} options={{headerShown: false}}  />
               <Stack.Screen name="KycVerification" component={KycVerification} options={{headerShown: false}}  />
               <Stack.Screen name="Login" component={Login} options={{headerShown: false}}  />
               <Stack.Screen name="LoginHome" component={LoginHome} options={{headerShown: false}}  />
               <Stack.Screen name="Logout" component={Logout} options={{headerShown: false}}  />
               <Stack.Screen name="More" component={More} options={{headerShown: false}}  />
               <Stack.Screen name="MyRentalRides" component={MyRentalRides} options={{headerShown: false}}  />
               <Stack.Screen name="Notifications" component={Notifications} options={{headerShown: false}}  />
               <Stack.Screen name="NotificationDetails" component={NotificationDetails} options={{headerShown: false}}  />
               <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}}  />
               <Stack.Screen name="Rating" component={Rating} options={{headerShown: false}}  />
               <Stack.Screen name="RentalRideDetails" component={RentalRideDetails} options={{headerShown: false}}  />
               <Stack.Screen name="RideDetails" component={RideDetails} options={{headerShown: false}}  />
               <Stack.Screen name="SharedTrip" component={SharedTrip} options={{headerShown: false}}  />
               <Stack.Screen name="Training" component={Training} options={{headerShown: false}}  />
               <Stack.Screen name="TrainingDetails" component={TrainingDetails} options={{headerShown: false}}  />
               <Stack.Screen name="Trip" component={Trip} options={{headerShown: false}}  />
               <Stack.Screen name="TripSettings" component={TripSettings} options={{headerShown: false}}  />
               <Stack.Screen name="VehicleDetails" component={VehicleDetails} options={{headerShown: false}}  />
               <Stack.Screen name="Wallet" component={Wallet} options={{headerShown: false}}  />
               <Stack.Screen name="Withdrawal" component={Withdrawal} options={{headerShown: false}} />
               <Stack.Screen name="CheckPhone" component={CheckPhone} options={{headerShown: false}} />
               <Stack.Screen name="Password" component={Password} options={{headerShown: false}} />
               <Stack.Screen name="OTP" component={OTP} options={{headerShown: false}} />
               <Stack.Screen name="CreateName" component={CreateName} options={{headerShown: false}} />
               <Stack.Screen name="CreateEmail" component={CreateEmail} options={{headerShown: false}} />
               <Stack.Screen name="CreateLicenceNumber" component={CreateLicenceNumber} options={{headerShown: false}} />
               <Stack.Screen name="CreateDateOfBirth" component={CreateDateOfBirth} options={{headerShown: false}} />
               <Stack.Screen name="CreatePassword" component={CreatePassword} options={{headerShown: false}} />
               <Stack.Screen name="ResetPassword" component={ResetPassword} options={{headerShown: false}} />
               <Stack.Screen name="CreateVehicleName" component={CreateVehicleName} options={{headerShown: false}} />
               <Stack.Screen name="CreateVehicleBrand" component={CreateVehicleBrand} options={{headerShown: false}} />
               <Stack.Screen name="CreateVehicleColor" component={CreateVehicleColor} options={{headerShown: false}} />
               <Stack.Screen name="CreateVehicleNumber" component={CreateVehicleNumber} options={{headerShown: false}} />
               <Stack.Screen name="CreateVehicleType" component={CreateVehicleType} options={{headerShown: false}} />
               <Stack.Screen name="AboutUs" component={AboutUs} options={{headerShown: false}} />
               <Stack.Screen name="Bill" component={Bill} options={{headerShown: false}} />
          
               <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown: false}}  />
               <Stack.Screen name="Earnings" component={Earnings} options={{headerShown: false}} /> 
               <Stack.Screen name="LocationEnable" component={LocationEnable} options={{headerShown: false}} />
               <Stack.Screen name="Paypal" component={Paypal} options={{headerShown: false}} /> 
               <Stack.Screen name="AppUpdate" component={AppUpdate} options={{headerShown: false}} /> 
               <Stack.Screen name="PrivacyPolicies" component={PrivacyPolicies} options={{headerShown: false}} /> 
               <Stack.Screen name="TodayBookings" component={TodayBookings} options={{headerShown: false}} />
               <Stack.Screen name="SelectGthLocation" component={SelectGthLocation} options={{headerShown: false}} /> 
               <Stack.Screen name="DriverVerification" component={DriverVerification} options={{headerShown: false}} /> 
               <Stack.Screen name="DriverApproved" component={DriverApproved} options={{headerShown: false}} /> 
               <Stack.Screen name="Refer" component={Refer} options={{headerShown: false}} />  
               <Stack.Screen name="Languages" component={Languages} options={{headerShown: false}} />  
       
      </Stack.Navigator>
    </NavigationContainer>
        </PaystackProvider>

    
  );
}

const styles = StyleSheet.create({
tabContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
  },
});

export default App;
