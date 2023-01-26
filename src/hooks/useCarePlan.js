import { useSelector, useDispatch } from 'react-redux';

import { getNextDate } from 'utils';
import { TYPES } from 'store/CarePlanReducer';
import api from 'services/api';
import useLocalNotification from './useLocalNotification';

export default () => {
  const instructions = useSelector((state) => state.careplan.instructions);

  const dispatch = useDispatch();
  const { scheduleNotif, cancelNotificationBySeniorAndType } =
    useLocalNotification();

  const carePlanNotifications = async () => {
    const notifs = await api.get(`caregivers/care-plan-schedule`);
    return notifs;
  };

  const updateCarePlanSchedule = async (senior, time) => {
    const response = await api.put(
      `/caregivers/seniors/${senior.id}/care-plan-schedule`,
      { care_plan_schedule: time },
    );

    if (response) {
      const typeNotif = 'CAREPLAN';
      await cancelNotificationBySeniorAndType(senior.id, typeNotif);
      scheduleNotif({
        date: getNextDate(time),
        repeatType: 'day',
        title: 'Rotina de cuidados',
        message: `Está na hora de verificar a rotina de cuidados ${
          senior.gender === 'MASCULINO' ? 'do Sr.' : 'da Srª.'
        } ${senior.full_name} para hoje.`,
        seniorId: senior.id,
        typeNotif,
      });
    }
    return response;
  };

  const getCarePlans = async (seniorId) => {
    const response = await api.get(`/seniors/${seniorId}/care-plan`);

    let actionPlans = [];
    let insertedActionPlan = [];
    for (let plan of response.action_plan) {
      if (!insertedActionPlan.includes(plan.action.description_caregiver)) {
        actionPlans = [...actionPlans, plan];
        insertedActionPlan.push(plan.action.description_caregiver);
      }
    }
    response.action_plan = actionPlans;

    dispatch({
      type: TYPES.CARE_PLANS_LISTED,
      payload: response.action_plan,
    });

    return response.action_plan;
  };

  const clearCarePlans = async () => {
    dispatch({
      type: TYPES.CARE_PLANS_LISTED,
      payload: [],
    });
  };

  return {
    updateCarePlanSchedule,
    getCarePlans,
    instructions,
    clearCarePlans,
    carePlanNotifications,
  };
};
