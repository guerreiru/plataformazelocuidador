import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

export default () => {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setOnline(state.isConnected);
    });
    return unsubscribe;
  }, []);

  return { online };
};
