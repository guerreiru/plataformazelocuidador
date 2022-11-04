import { useRef, useState, useEffect } from 'react';
import { AppState } from 'react-native';
import moment from 'moment';

import api from '../services/api';

import useConnectivity from './useConnectivity';
import useMedicines from './useMedicines';
import useCarePlan from './useCarePlan';
import { ACTIVE } from '../enums/typesApplicationStates';
import useLocalNotification from './useLocalNotification';
import { useDispatch, useSelector } from 'react-redux';
import { TYPES } from '../store/AppReducer';

import { getArrayScheduleByStartAndInterval, getNextDate } from '../utils/date';

export default function useAppState() {
  const appState = useRef(AppState.currentState);
  const { user, token } = useSelector((state) => state.auth);

  const { medicineNotifications } = useMedicines();
  const { carePlanNotifications } = useCarePlan();
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const dispatch = useDispatch();
  // const medicineScheduled = useSelector(
  //   (state) => state.medicine.medicineScheduled,
  // );

  const { TYPES_NOTIF, cancelAllLocalNotifications, scheduleNotif } =
    useLocalNotification();
  const { online } = useConnectivity();

  const getCheck = async () => {
    const params = {};
    if (user && user.id) {
      params.type = 'CAREGIVER';
      params.id = user.id;
    }
    const response = await api.get('caregivers/check', params);
    return response;
  };

  const checkDateTime = async (response) => {
    const now = new Date().toISOString();
    const { dateTime } = response;
    const isSync = moment(now).isBetween(
      moment(dateTime).subtract('5', 'minutes'),
      moment(dateTime).add('5', 'minutes'),
    );
    dispatch({ type: TYPES.DATE_TIME_SYNC_UPDATED, payload: isSync });
  };

  const checkTerms = (response) => {
    if ((response.term && !response.term.status) || !response.term_extra) {
      dispatch({ type: TYPES.MUST_ACCEPT_TERMS, payload: true });
    }
  };

  const addNewNotificationsSimple = async (notifs) => {
    if (notifs && notifs.medicineInterval) {
      for (let i = 0; i < notifs.medicineInterval.length; i++) {
        const notif = notifs.medicineInterval[i];
        await scheduleNotif({
          date: new Date(notif.startTime),
          repeatType: undefined,
          title: notif.params.title,
          message: notif.params.body,
          seniorId: notif.seniorId,
          typeNotif: TYPES_NOTIF.MEDICINE,
        });
      }
    }
  };

  const addNewNotificationsContinuousUse = async (notifs) => {
    if (notifs && notifs.medicineDurationContinuousUse) {
      notifs.medicineDurationContinuousUse.forEach((notif) => {
        const hours = getArrayScheduleByStartAndInterval(
          notif.startTime,
          notif.interval,
        );

        for (let i = 0; i < hours.length; i++) {
          scheduleNotif({
            date: hours[i],
            repeatType: 'day',
            title: notif.params.title,
            message: notif.params.body,
            seniorId: notif.seniorId,
            typeNotif: TYPES_NOTIF.MEDICINE,
          });
        }
      });
    }
  };

  const syncLocalNotifications = async () => {
    const notifs = await medicineNotifications();
    // await removeCurrentNotifications(notifs);
    await cancelAllLocalNotifications();
    await addNewNotificationsSimple(notifs);
    await addNewNotificationsContinuousUse(notifs);
    const notifsCarePlan = await carePlanNotifications();
    registerNotifsCarePlan(notifsCarePlan);
  };

  const registerNotifsCarePlan = async (notifsCarePlan) => {
    if (notifsCarePlan && notifsCarePlan.length > 0) {
      for (let i = 0; i < notifsCarePlan.length; i++) {
        const notif = notifsCarePlan[i];

        scheduleNotif({
          date: getNextDate(notif.care_plan_schedule),
          repeatType: 'day',
          title: 'Rotina de cuidados',
          message: `Está na hora de verificar a rotina de cuidados ${
            notif.gender === 'MASCULINO' ? 'do Sr.' : 'da Srª.'
          } ${notif.full_name} para hoje.`,
          seniorId: notif.senior_id,
          typeNotif: 'CAREPLAN',
        });
      }
    }
  };

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const doCheck = async () => {
    if (online && appStateVisible === ACTIVE) {
      if (token) {
        const response = await getCheck();
        checkDateTime(response);
        checkTerms(response);
        syncLocalNotifications();
      }
    }
  };

  // useEffect(() => {
  //   doCheck();
  // }, [appStateVisible, medicineScheduled]);

  const _handleAppStateChange = (nextAppState) => {
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };

  return {
    appStateVisible,
    doCheck,
  };
}
