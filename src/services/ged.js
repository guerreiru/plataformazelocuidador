import axios from 'axios';
import { Platform } from 'react-native';

import { adjustParamsToNull } from 'utils/objectFormatters';
import { errorHandler } from 'utils/index';
import { setIpAddress } from 'utils/netInfo';
import configs from 'configs';

const configGed = axios.create({
  baseURL: configs.BASE_URL.DOCUMENTS,
  headers: {
    'My-Operational-System': Platform.OS === 'ios' ? 'IOS' : 'ANDROID',
  },
});

setIpAddress(configGed);

const ged = {
  getConfigApi: () => configGed,
  setToken: (token) => {
    configGed.defaults.headers.common.Authorization = 'Bearer ' + token;
  },

  post: async (url, params = {}) => {
    try {
      params = adjustParamsToNull(params);
      const response = await configGed.post(url, params, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      errorHandler(error, params);
    }
  },

  get: async (url, params = {}, alertErrors = true) => {
    try {
      params = adjustParamsToNull(params);
      const response = await configGed.get(url, { params });
      return response.data;
    } catch (error) {
      if (alertErrors) {
        errorHandler(error, params);
      }
    }
  },
  getImage: async (url, params = {}, alertErrors = true) => {
    try {
      params = adjustParamsToNull(params);
      const response = await configGed.get(url, {
        params,
        responseType: 'blob',
      });
      if (response) {
        return {
          uri: configGed.defaults.baseURL + url + '?_=' + new Date().getTime(),
          headers: {
            Authorization: configGed.defaults.headers.common.Authorization,
          },
        };
      }
    } catch (error) {
      if (alertErrors) {
        // errorHandler(error, params);
      }
    }
  },
  put: async (url, params = {}) => {
    try {
      params = adjustParamsToNull(params);
      const response = await configGed.put(url, params);
      return response.data;
    } catch (error) {
      errorHandler(error, params);
    }
  },
  delete: async (url, params = {}) => {
    try {
      params = adjustParamsToNull(params);
      const response = await configGed.delete(url, { params });
      return response;
    } catch (error) {
      errorHandler(error, params);
    }
  },
};

export default ged;
