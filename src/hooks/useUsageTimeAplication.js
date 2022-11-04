import api from '../services/api';
import useStorage from './useStorage';

export default () => {
  const [saveUseTimeAplication, getUseTimeAplication, removeUseTimeAplication] =
    useStorage('USAGE_TIME_APLICATION');

  const storeUsageTimeAplication = async () => {
    const response = await getUseTimeAplication();
    if (response) {
      const { start_time } = response;
      await removeUseTimeAplication();
      if (start_time) {
        await api.post('log-usage-time', { start_time, end_time: new Date() });
      }
    }
  };

  const _setStartTime = async (date) => {
    const response = await getUseTimeAplication();
    if (!response) {
      await saveUseTimeAplication(date);
    }
  };

  return {
    storeUsageTimeAplication,
    setStartTime: _setStartTime,
  };
};
