/**
 * @format
 */
import './gesture-handler';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { createStore } from 'redux';
import allReducers from './src/reducers/index.js';
import { Provider } from 'react-redux';
import { ThemeProvider } from './src/context/ThemeContext.js';


// 🔹 Create Redux store
const store = createStore(allReducers);

// 🔹 Wrap App with Redux Provider
const ReduxApp = () => (
  <Provider store={store}>
    <ThemeProvider>
    <App />

    </ThemeProvider>
  </Provider>
);

// 🔹 Register App
AppRegistry.registerComponent(appName, () => ReduxApp);

// 🔹 Ignore unnecessary logs
LogBox.ignoreAllLogs();
