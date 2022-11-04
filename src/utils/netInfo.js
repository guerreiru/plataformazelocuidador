import NetInfo from '@react-native-community/netinfo';

export const setIpAddress = (_configApi) => {
  NetInfo.fetch().then((state) => {
    const { details } = state;
    _configApi.defaults.headers['My-IP'] = details.ipAddress;
  });
};
