import { useDispatch, useSelector } from 'react-redux';
import { TYPES } from '../store/SeniorReducer';
import api from '../services/api';

export default () => {
  const { mySeniors, list, senior } = useSelector((state) => state.senior);
  const dispatch = useDispatch();

  async function getMySeniors() {
    const _mySeniors = await api.get('/caregivers/my-seniors');
    dispatch({
      type: TYPES.MY_SENIORS_LISTED,
      payload: _mySeniors,
    });
  }

  async function getSenior(id) {
    const response = await api.get(`/seniors/${id}`);
    dispatch({
      type: TYPES.SENIOR_FETCHED,
      payload: {
        ...response.senior,
        professionalSenior: { ...response.professionalSenior },
      },
    });
  }

  async function getEvalutionClinicalAndFunctional(id) {
    const response = await api.get(
      `/seniors/${id}/evaluation-clinical-functional`,
    );
    return response;
  }

  async function updateSenior(data, id) {
    const response = await api.put(`/seniors/${id}`, data);
    if (response) {
      getSenior(id);
    }
    return response;
  }

  return {
    getMySeniors,
    mySeniors,
    list,
    senior,
    getSenior,
    getEvalutionClinicalAndFunctional,
    updateSenior,
  };
};
