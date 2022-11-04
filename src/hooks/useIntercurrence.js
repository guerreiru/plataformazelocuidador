import { useSelector, useDispatch } from 'react-redux';

import api from '../services/api';
import { TYPES } from '../store/IntercurrenceReducer';

export default () => {
  const intercurrences = useSelector((state) => state.intercurrence.list);
  const dispatch = useDispatch();

  const getIntercurrences = async (seniorId) => {
    const response = await api.get(`/seniors/${seniorId}/intercurrences`);
    dispatch({
      type: TYPES.INTERCURRENCES_LISTED,
      payload: response,
    });
    return response;
  };

  const clearIntercurrences = async () => {
    dispatch({
      type: TYPES.INTERCURRENCES_LISTED,
      payload: [],
    });
  };

  const saveIntercurrence = async (data) => {
    const response = await api.post('/seniors/intercurrences', data);
    getIntercurrences(data.senior_id);
    return response;
  };

  const intercurrence_types = [
    {
      label: 'Infecção',
      value: 'Infecção',
    },
    {
      label: 'Lesão na pele por pressão',
      value: 'Lesão na pele por pressão',
    },
    {
      label: 'Internação hospitalar',
      value: 'Internação hospitalar',
    },
    {
      label: 'Queda',
      value: 'Queda',
    },
    {
      label: 'Óbito',
      value: 'Óbito',
    },
  ];

  return {
    saveIntercurrence,
    getIntercurrences,
    intercurrences,
    intercurrence_types,
    clearIntercurrences,
  };
};
