import axios from 'axios';
import { Platform } from 'react-native';

import { adjustParamsToNull } from 'utils/objectFormatters';
import { errorHandler } from 'utils/index';
import { setIpAddress } from 'utils/netInfo';
import configs from 'configs';

const configApi = axios.create({
  baseURL: configs.BASE_URL.API,
  headers: {
    'My-Operational-System': Platform.OS === 'ios' ? 'IOS' : 'ANDROID',
  },
  timeout: 30000,
});

setIpAddress(configApi);

const api = {
  getConfigApi: () => configApi,
  setToken: (token) => {
    configApi.defaults.headers.common.Authorization = 'Bearer ' + token;
  },
  post: async (url, params = {}) => {
    try {
      params = adjustParamsToNull(params);
      const response = await configApi.post(url, params);
      return response.data;
    } catch (error) {
      errorHandler(error, params);
    }
  },
  get: async (url, params = {}) => {
    try {
      params = adjustParamsToNull(params);
      // console.log('INICIOU');
      const response = await configApi.get(url, { params });
      // console.log('FINALIZOU', response.status);
      return response.data;
    } catch (error) {
      //console.log(error);
      //console.log('DEU ERRO');
      errorHandler(error, params);
    }
  },
  put: async (url, params = {}) => {
    try {
      params = adjustParamsToNull(params);
      const response = await configApi.put(url, params);
      return response.data;
    } catch (error) {
      errorHandler(error, params);
    }
  },
  delete: async (url, params = {}) => {
    try {
      params = adjustParamsToNull(params);
      const response = await configApi.delete(url, { params });
      return response.data;
    } catch (error) {
      errorHandler(error, params);
    }
  },
};

export default api;
