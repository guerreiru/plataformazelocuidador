import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

import { message } from '../../utils/message';
import { useAuth } from '../../hooks';
// import useAppState from '../../hooks/useAppState';
import useIconeWarning from '../../hooks/useIconeWarning';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default () => {
  const { updateUser, logout } = useAuth();
  const { user, token: jwt } = useSelector((state) => state.auth);
  const { activate } = useIconeWarning();
  // const { doCheck } = useAppState();
  const notificationListener = useRef();
  const responseListener = useRef();

  const register = async () => {
    if (jwt && user && user.id) {
      const token = await registerForPushNotificationsAsync();
      updateUser({ id: user.id, push_token: token }, false);
    }
  };

  useEffect(() => {
    register();
  }, [jwt]);

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        processNotification(notification);
        //console.log('addNotificationReceivedListener => ', notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        //console.log('addNotificationResponseReceivedListener ====> ', response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current,
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const setInfoModel = async (remoteMessage) => {
    const {
      request: { content },
    } = remoteMessage;

    let title = content.title;
    let text = content.body;

    if (title && text) {
      const isAccountDeactivationNotification =
        title === '[DESATIVAÇÃO DA CONTA]';
      await checkAccount(title, isAccountDeactivationNotification);
      if (!isAccountDeactivationNotification) {
        message.info(title, text);
      }
    }
  };

  const processNotification = async (remoteMessage) => {
    activate();
    setInfoModel(remoteMessage);
  };

  const checkAccount = async (title, isAccountDeactivationNotification) => {
    if (isAccountDeactivationNotification) {
      await logout();
    }

    // if (['Autorização de acesso'].includes(title)) {
    //   await doCheck();
    // }
  };

  return null;
};

const isAuthorizedIos = (_status) => {
  return (
    [
      Notifications.IosAuthorizationStatus.AUTHORIZED,
      Notifications.IosAuthorizationStatus.EPHEMERAL,
      Notifications.IosAuthorizationStatus.PROVISIONAL,
    ].indexOf(_status) >= 0
  );
};

async function checkPermissionIOS() {
  const { ios } = await Notifications.getPermissionsAsync();
  let finalStatus = ios.status;
  if (!isAuthorizedIos(ios.status)) {
    const { ios: newStatus } = await Notifications.requestPermissionsAsync();
    finalStatus = newStatus.status;
  }
  return isAuthorizedIos(finalStatus);
}

async function checkPermissionAndroid() {
  const { granted, status: existingStatus } =
    await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  return granted || finalStatus === 'granted';
}

async function registerForPushNotificationsAsync() {
  if (Constants.isDevice) {
    let isAuthorized = false;

    if (Platform.OS === 'ios' && (await checkPermissionIOS())) {
      isAuthorized = true;
    }
    if (Platform.OS === 'android' && (await checkPermissionAndroid())) {
      isAuthorized = true;
    }
    if (!isAuthorized) {
      // eslint-disable-next-line no-alert
      alert('Failed to get push token for push notification!');
      return;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#888888',
      });
    }

    return token;
  } else {
    // eslint-disable-next-line no-alert
    alert(
      'Você precisa utilizar um dispositivo físico para utilizar as Push Notifications',
    );
  }
}
