/**
 * @format
 */
import './gesture-handler';
import 'react-native-get-random-values';
import { AppRegistry, LogBox, AppState } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducers from './src/reducers/index.js';
import App from './App';
import { name as appName } from './app.json';
import notifee, { EventType, AndroidColor, AndroidCategory, AndroidImportance, AndroidStyle } from '@notifee/react-native';
import axios from 'axios';
import { reject, api_url, logo } from './src/config/Constants';
import BackgroundTimer from 'react-native-background-timer';
import messaging from '@react-native-firebase/messaging';
import { useState, useEffect } from 'react';
import { ThemeProvider } from './src/context/ThemeContext.js';

// Create Redux store
const store = createStore(allReducers);

// Initialize the notification channel
notifee.createChannel({
  id: 'booking_notification',
  name: 'Channel with custom sound',
  sound: 'uber',
  vibration: true,
  lights: true,
  lightColor: AndroidColor.RED,
  category: AndroidCategory.CALL,
  importance: AndroidImportance.HIGH,
  style: { type: AndroidStyle.BIGPICTURE, picture: logo },
});

let timeoutId;

// Handle background messaging
const handleBackgroundMessage = async (remoteMessage) => {
  const { data } = remoteMessage;
  if (data !== undefined) {
    const { id, type, driver_id } = data;
    console.log('id: ' + id);
    console.log('type: ' + type);
    
    if (type == 1 && id !== undefined) {
      show_notification(id);
      console.log("Notification displayed, timer started");

      timeoutId = BackgroundTimer.setTimeout(() => {
        console.log("Execute reject driver");
        call_reject(id, driver_id);
        notifee.cancelNotification(id);
      }, 10000); // Timer set for 10 seconds
    } else if (type == 2 && id !== undefined) {
      notifee.cancelNotification(id);
    }
  }
};

// Set up messaging and background notification listeners
messaging().onMessage(async (message) => {
  console.log('Foreground message received:', message);
  // Handle foreground notification if needed
});

messaging().setBackgroundMessageHandler(handleBackgroundMessage);

// Show notification function
const show_notification = (id) => {
  notifee.displayNotification({
    id: id.toString(),  // Ensure ID is a string
    title: "Booking Request",
    body: "You have a new booking request",
    android: {
      channelId: 'booking_notification',
      sound: 'uber',
      loopSound: true,
      lights: [AndroidColor.RED, 300, 600],
      category: AndroidCategory.CALL,
      importance: AndroidImportance.HIGH,
      style: {
        type: AndroidStyle.BIGPICTURE,
        picture: 'https://my-cdn.com/user/123/upload/456.png'
      },
      pressAction: {
        id: 'default',
        launchActivity: 'default',
      },
      actions: [
        {
          title: "View Details",
          pressAction: {
            id: 'detail',
            launchActivity: 'default',
          },
        },
      ],
    },
  });
};

// Reject driver after some time
const call_reject = async (id, driver_id) => {
  console.log(`${api_url}${reject}`);
  try {
    const response = await axios.post(`${api_url}${reject}`, { trip_id: id, driver_id: driver_id, from: 1 });
    console.log(response.data);
    BackgroundTimer.stop(); // Stop the timer after the action is executed
  } catch (error) {
    console.log(error);
  }
};

// AppState and background task management
const HeadlessCheck = ({ isHeadless }) => {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    // Listen for app state changes (background to foreground)
    const appStateListener = AppState.addEventListener('change', (nextAppState) => {
      setAppState(nextAppState);
      // If app comes to foreground, cancel background timer
      if (nextAppState === 'active' && timeoutId) {
        BackgroundTimer.clearTimeout(timeoutId);
        console.log('Timer cleared as app came to the foreground');
      }
    });

    // Clean up the listener on unmount
    return () => {
      if (timeoutId) {
        BackgroundTimer.clearTimeout(timeoutId);
      }
      appStateListener.remove();
    };
  }, [appState]);

  if (isHeadless) {
    // App is in the background, ignore
    return null;
  } else {
    return (
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    );
  }
};

// Register the component
AppRegistry.registerComponent(appName, () => HeadlessCheck);

// Ignore all logs for production, optional
LogBox.ignoreAllLogs();
