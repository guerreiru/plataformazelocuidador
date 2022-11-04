import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import api from '../services/api';
import { TYPES } from '../store/MedicineReducer';

export default (senior) => {
  const medicines = useSelector((state) => state.medicine.list);
  const histories = useSelector((state) => state.medicine.histories);
  const medicinesForToday = useSelector(
    (state) => state.medicine.medicinesForTodayList,
  );

  const dispatch = useDispatch();

  const scheduleStartTime = async (medicineId, date, schedules) => {
    let _date = moment(date, 'DD/MM/YYYY HH:mm').toISOString();
    const response = await api.put(
      `/seniors/${senior.id}/medicines/${medicineId}/schedule-start-time`,
      { start_time: _date, schedules },
    );
    dispatch({ type: TYPES.MEDICINES_SCHEDULED });
    return response;
  };

  const scheduleUpdateTime = async (medicineId, date, schedules) => {
    let _date = moment(date, 'DD/MM/YYYY HH:mm').toISOString();
    const response = await api.put(
      `/seniors/${senior.id}/medicines/${medicineId}/update-schedule`,
      { new_schedule: _date, schedules },
    );
    dispatch({ type: TYPES.MEDICINES_SCHEDULED });
    return response;
  };

  const getMedicinesForToday = async () => {
    const response = await api.get(`/seniors/${senior.id}/medicines`);
    dispatch({
      type: TYPES.MEDICINES_FOR_TODAY_LIST,
      payload: response,
    });

    return response;
  };

  const clearMedicinesForToday = async () => {
    dispatch({
      type: TYPES.MEDICINES_FOR_TODAY_LIST,
      payload: [],
    });
  };

  const getMedicines = async () => {
    const response = await api.get(`/seniors/${senior.id}/medicines`);

    dispatch({
      type: TYPES.MEDICINES_LISTED,
      payload: response,
    });
    return response;
  };

  const clearMedicines = async () => {
    dispatch({
      type: TYPES.MEDICINES_LISTED,
      payload: [],
    });
  };

  const getHistories = async (seniorId) => {
    const response = await api.get(`/history/seniors/${senior.id}/medicines`);

    dispatch({
      type: TYPES.HISTORIES_MEDICINES_LISTED,
      payload: response,
    });
    return response;
  };

  const clearHistories = async () => {
    dispatch({
      type: TYPES.HISTORIES_MEDICINES_LISTED,
      payload: [],
    });
  };

  const medicinestartTime = async (medicine_id, data) => {
    const response = await api.put(
      `/seniors/${senior.id}/medicines/${medicine_id}/schedule-start-time`,
      data,
    );
    return response;
  };

  const medicineNotifications = async () => {
    const notifs = await api.get(`/caregivers/scheduled-medicines`);
    return notifs;
  };

  return {
    medicineNotifications,
    getMedicines,
    medicines,
    clearMedicines,
    getHistories,
    histories,
    clearHistories,
    getMedicinesForToday,
    clearMedicinesForToday,
    medicinesForToday,
    medicinestartTime,
    scheduleStartTime,
    scheduleUpdateTime,
  };
};

// {
//   medicineDurationContinuousUse: [
//     {
//       _id: '5f7ca0ea42f0af002ad3754d',
//       name: 'MedicineDose_1_2020-10-06T17:00:00.000Z',
//       medicineId: 1,
//       startTime: new Date(a.getTime() + 5000).toISOString(),
//       duration: 'USO CONTÍNUO',
//       seniorId: 1,
//       interval: '1 vez ao dia',
//       recurrence: true,
//       params: {
//         title: 'Hora do medicamento  da Sra.  Antonia Soares Sousa',
//         body: 'Nome: AMOXICILINA\nDose: 1 Cápsula Dura\n',
//       },
//       jobType: 'sendPushNotification',
//       __v: 0,
//     },
//   ],
//   medicineInterval: [
//     {
//       _id: '5f7ca11042f0af002ad37551',
//       name:
//         'MedicineDose_3_Wed Oct 07 2020 02:00:00 GMT-0300 (Brasilia Standard Time)',
//       medicineId: 3,
//       seniorId: 1,
//       startTime: new Date(a.getTime() + 10000).toISOString(),
//       params: {
//         title:
//           'Hora do medicamento CEFTAZIDIMA  da Sra.  Antonia Soares Sousa',
//         body: 'Nome: CEFTAZIDIMA\nDose: 12 Pó para Solução\n',
//       },
//       jobType: 'sendPushNotification',
//       __v: 0,
//     },
//     /*
//     {
//       _id: '5f7ca11042f0af002ad37552',
//       name:
//         'MedicineDose_3_Wed Oct 07 2020 14:00:00 GMT-0300 (Brasilia Standard Time)',
//       medicineId: 3,
//       seniorId: 1,
//       startTime: new Date(a.getTime() + 13000).toISOString(),
//       params: {
//         title:
//           'Hora do medicamento CEFTAZIDIMA  da Sra.  Antonia Soares Sousa',
//         body: 'Nome: CEFTAZIDIMA\nDose: 12 Pó para Solução\n',
//       },
//       jobType: 'sendPushNotification',
//       __v: 0,
//     },
//     {
//       _id: '5f7ca11042f0af002ad37553',
//       name:
//         'MedicineDose_3_Thu Oct 08 2020 02:00:00 GMT-0300 (Brasilia Standard Time)',
//       medicineId: 3,
//       seniorId: 1,
//       startTime: new Date(a.getTime() + 15000).toISOString(),
//       params: {
//         title:
//           'Hora do medicamento CEFTAZIDIMA  da Sra.  Antonia Soares Sousa',
//         body: 'Nome: CEFTAZIDIMA\nDose: 12 Pó para Solução\n',
//       },
//       jobType: 'sendPushNotification',
//       __v: 0,
//     },
//     {
//       _id: '5f7ca11042f0af002ad37554',
//       name:
//         'MedicineDose_3_Thu Oct 08 2020 14:00:00 GMT-0300 (Brasilia Standard Time)',
//       medicineId: 3,
//       seniorId: 1,
//       startTime: new Date(a.getTime() + 18000).toISOString(),
//       params: {
//         title:
//           'Hora do medicamento CEFTAZIDIMA  da Sra.  Antonia Soares Sousa',
//         body: 'Nome: CEFTAZIDIMA\nDose: 12 Pó para Solução\n',
//       },
//       jobType: 'sendPushNotification',
//       __v: 0,
//     },
//     {
//       _id: '5f7ca11042f0af002ad37555',
//       name:
//         'MedicineDose_3_Fri Oct 09 2020 02:00:00 GMT-0300 (Brasilia Standard Time)',
//       medicineId: 3,
//       seniorId: 1,
//       startTime: new Date(a.getTime() + 20000).toISOString(),
//       params: {
//         title:
//           'Hora do medicamento CEFTAZIDIMA  da Sra.  Antonia Soares Sousa',
//         body: 'Nome: CEFTAZIDIMA\nDose: 12 Pó para Solução\n',
//       },
//       jobType: 'sendPushNotification',
//       __v: 0,
//     },
//     {
//       _id: '5f7ca11042f0af002ad37556',
//       name:
//         'MedicineDose_3_Fri Oct 09 2020 14:00:00 GMT-0300 (Brasilia Standard Time)',
//       medicineId: 3,
//       seniorId: 5,
//       startTime: new Date(a.getTime() + 23000).toISOString(),
//       params: {
//         title:
//           'Hora do medicamento CEFTAZIDIMA  da Sra.  Antonia Soares Sousa',
//         body: 'Nome: CEFTAZIDIMA\nDose: 12 Pó para Solução\n',
//       },
//       jobType: 'sendPushNotification',
//       __v: 0,
//     },
//     {
//       _id: '5f7ca11042f0af002ad37557',
//       name:
//         'MedicineDose_3_Sat Oct 10 2020 02:00:00 GMT-0300 (Brasilia Standard Time)',
//       medicineId: 3,
//       seniorId: 1,
//       startTime: new Date(a.getTime() + 25000).toISOString(),
//       params: {
//         title:
//           'Hora da ultima dose de CEFTAZIDIMA  da Sra.  Antonia Soares Sousa',
//         body: 'Nome: CEFTAZIDIMA\nDose: 12 Pó para Solução\n',
//       },
//       jobType: 'sendPushNotification',
//       __v: 0,
//     },
//     {
//       _id: '5f7ca12142f0af002ad3755b',
//       name:
//         'MedicineDose_2_Wed Oct 07 2020 14:00:00 GMT-0300 (Brasilia Standard Time)',
//       medicineId: 2,
//       seniorId: 3,
//       startTime: new Date(a.getTime() + 28000).toISOString(),
//       params: {
//         title:
//           'Hora do medicamento BROMIDRATO DE CITALOPRAM  da Sra.  Antonia Soares Sousa',
//         body:
//           'Nome: BROMIDRATO DE CITALOPRAM\nDose: 1 Comprimido Revestido\n',
//       },
//       jobType: 'sendPushNotification',
//       __v: 0,
//     },
//     {
//       _id: '5f7ca12142f0af002ad3755c',
//       name:
//         'MedicineDose_2_Thu Oct 08 2020 14:00:00 GMT-0300 (Brasilia Standard Time)',
//       medicineId: 2,
//       seniorId: 1,
//       startTime: new Date(a.getTime() + 30000).toISOString(),
//       params: {
//         title:
//           'Hora do medicamento BROMIDRATO DE CITALOPRAM  da Sra.  Antonia Soares Sousa',
//         body:
//           'Nome: BROMIDRATO DE CITALOPRAM\nDose: 1 Comprimido Revestido\n',
//       },
//       jobType: 'sendPushNotification',
//       __v: 0,
//     },
//     {
//       _id: '5f7ca12142f0af002ad3755d',
//       name:
//         'MedicineDose_2_Fri Oct 09 2020 14:00:00 GMT-0300 (Brasilia Standard Time)',
//       medicineId: 2,
//       seniorId: 1,
//       startTime: new Date(a.getTime() + 32000).toISOString(),
//       params: {
//         title:
//           'Hora do medicamento BROMIDRATO DE CITALOPRAM  da Sra.  Antonia Soares Sousa',
//         body:
//           'Nome: BROMIDRATO DE CITALOPRAM\nDose: 1 Comprimido Revestido\n',
//       },
//       jobType: 'sendPushNotification',
//       __v: 0,
//     },
//     {
//       _id: '5f7ca12142f0af002ad3755e',
//       name:
//       'MedicineDose_2_Sat Oct 10 2020 14:00:00 GMT-0300 (Brasilia Standard Time)',
//       medicineId: 2,
//       seniorId: 1,
//       startTime: new Date(a.getTime() + 35000).toISOString(),
//       params: {
//         title:
//         'Hora da ultima dose de BROMIDRATO DE CITALOPRAM  da Sra.  Antonia Soares Sousa',
//         body:
//         'Nome: BROMIDRATO DE CITALOPRAM\nDose: 1 Comprimido Revestido\n',
//       },
//       jobType: 'sendPushNotification',
//       __v: 0,
//     },
//    */
//   ],
// };
