import * as Notifications from 'expo-notifications';
import useStorage from './useStorage';
import { Alert, Platform } from 'react-native';

export default function useLocalNotification() {
  const [saveNotif, getNotif] = useStorage('LOCAL_NOTIFICATIONS');

  const TYPES_NOTIF = {
    CAREPLAN: 'CAREPLAN',
    MEDICINE: 'MEDICINE',
  };

  const saveNotifId = async (notifId, seniorId, typeNotif) => {
    const allNotifs = (await getNotif()) || {};
    let refs = [];
    if (
      allNotifs[`${seniorId}_${typeNotif}`] &&
      Array.isArray(allNotifs[`${seniorId}_${typeNotif}`])
    ) {
      [...allNotifs[`${seniorId}_${typeNotif}`]];
    }
    if (!refs.find((x) => x === notifId.toString())) {
      refs.push(notifId);
      allNotifs[`${seniorId}_${typeNotif}`] = refs;
      await saveNotif(allNotifs);
      await getNotif();
    }
  };

  const removeNotifByType = async (seniorId, typeNotif) => {
    const allNotifs = (await getNotif()) || {};
    allNotifs[`${seniorId}_${typeNotif}`] = [];
    await saveNotif(allNotifs);
  };

  const getNotifIds = async (seniorId, typeNotif) => {
    const allNotifs = (await getNotif()) || {};
    return allNotifs[`${seniorId}_${typeNotif}`] || [];
  };

  const getNotifIdsBySeniorId = async (seniorId) => {
    const allNotifs = (await getNotif()) || {};
    const keys = Object.values(TYPES_NOTIF);
    let notifs = [];
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const partial = allNotifs[`${seniorId}_${key}`] || [];
      notifs = [...notifs, ...partial];
    }
    return notifs;
  };

  const localNotif = async ({
    title = 'Local Notification',
    message = 'My Notification Message',
  } = {}) => {
    const lastId = new Date().getTime();
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body: message,
        data: { data: 'Notificação Zelo' },
      },
      identifier: lastId,
    });

    return lastId;
  };

  const cancelAllLocalNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  const cancelNotificationBySenior = async (seniorId) => {
    try {
      const notifs = await getNotifIdsBySeniorId(seniorId);
      for (let i = 0; i < notifs.length; i++) {
        const id = notifs[i];
        await Notifications.cancelScheduledNotificationAsync({
          id,
        });
      }
      await removeNotifByType(seniorId, TYPES_NOTIF.CAREPLAN);
      await removeNotifByType(seniorId, TYPES_NOTIF.MEDICINE);
    } catch (e) {}
  };

  const cancelNotificationBySeniorAndType = async (seniorId, typeNotif) => {
    try {
      const notifs = await getNotifIds(seniorId, typeNotif);
      for (let i = 0; i < notifs.length; i++) {
        const id = notifs[i];
        Notifications.cancelScheduledNotificationAsync(id);
      }

      await removeNotifByType(seniorId, typeNotif);
    } catch (e) {}
  };

  const scheduleNotif = async ({
    date,
    repeatType = 'day',
    title = 'Scheduled Local Notification',
    message = 'My Notification Message',
    seniorId = null,
    typeNotif = null,
  } = {}) => {
    try {
      const params = {
        content: { title, body: message },
        trigger: date,
      };

      if (repeatType === 'day') {
        const hour = new Date(date).getHours();
        const minute = new Date(date).getMinutes();

        if (Platform.OS === 'ios') {
          params.trigger = {
            type: 'calendar',
            repeats: true,
            dateComponents: { hour, minute },
          };
        } else {
          params.trigger = { hour, minute, repeats: true };
        }
      }

      const notifId = await Notifications.scheduleNotificationAsync(params);

      await saveNotifId(notifId, seniorId, typeNotif);
      return notifId;
    } catch (e) {
      Alert.alert(
        'Zelo informa',
        'O Limite de notificações locais do dispositivo foi excedido. Por favor entre em contato com o suporte para mais esclarecimentos.',
      );
    }
  };

  return {
    TYPES_NOTIF,
    localNotif,
    scheduleNotif,
    cancelAllLocalNotifications,
    cancelNotificationBySenior,
    cancelNotificationBySeniorAndType,
  };
}
