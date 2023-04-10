import url from 'url';
import { NativeModules } from 'react-native';

const { hostname } = url.parse(NativeModules.SourceCode.scriptURL);
const { expo } = require('../../app.json');
const version = expo.version;

export const URLS = {
  DEV: {
    API: `http://${hostname}:3000/`,
    DOCUMENTS: `http://${hostname}:3001/`,
  },
  PRODUCTION: {
    API: 'https://api.zelo.avicena.in/',
    DOCUMENTS: 'https://public.zelo.avicena.in/',
  },
  HOMOLOGA: {
    API: 'http://52.67.69.223:3000/',
    DOCUMENTS: 'http://52.67.69.223:3001/',
  },
};

export default {
  BASE_URL: URLS.PRODUCTION,
  STORAGE_KEY: '@ZELO_APP_CUIDADOR_FAMILIAR',
  API_KEY_YOUTUBE: 'AIzaSyAprV6TD9NaUlNap-dHtd0loMBEzuWxBXc',
  VERSION: version,
};
