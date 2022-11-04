import React, { useEffect } from 'react';
import MyApp from './src';
import * as Updates from 'expo-updates';
import configs, { URLS } from './src/configs';
import 'react-native-url-polyfill/auto';
import { LogBox, Platform } from 'react-native';

if (Platform.OS !== 'ios') {
  LogBox.ignoreLogs(['Setting a timer']);
}

export default function App() {
  async function updateApp() {
    if (configs.BASE_URL.API === URLS.PRODUCTION.API) {
      const { isAvailable } = await Updates.checkForUpdateAsync();
      if (isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    }
  }

  useEffect(() => {
    updateApp();
  }, []);

  return <MyApp />;
}
