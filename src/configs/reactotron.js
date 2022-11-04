import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from 'url';

import { reactotronRedux } from 'reactotron-redux';
import { NativeModules } from 'react-native';

const isJestRunning = process.env.JEST_WORKER_ID !== undefined;
const { hostname } = url.parse(NativeModules.SourceCode.scriptURL);

if (__DEV__ && !isJestRunning) {
  const tron = Reactotron.configure({ host: hostname })
    .setAsyncStorageHandler(AsyncStorage)
    .useReactNative()
    .use(reactotronRedux())
    .connect();

  tron.clear();

  console.tron = tron;
}
