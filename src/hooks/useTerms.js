import { useDispatch, useSelector } from 'react-redux';
import api from '../services/api';
import { TYPES } from '../store/AppReducer';

export default function useTerms() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const acceptTerms = async (termId, isExtra = false) => {
    const response = await api.post('/caregivers/accept-terms', {
      termId,
    });
    if (response && !isExtra) {
      dispatch({ type: TYPES.MUST_ACCEPT_TERMS, payload: false });
    }
  };

  const declineTerms = async (termId) => {
    const response = await api.post('/caregivers/decline-terms', {
      termId,
    });
    if (response) {
      return response;
    }
  };

  const acceptExtraTerms = async (termId) => {
    const response = await api.post('/caregivers/accept-extra-terms', {
      termId,
    });
    if (response) {
      dispatch({ type: TYPES.MUST_ACCEPT_TERMS, payload: false });
    }
  };

  const declineExtraTerms = async (termId) => {
    const response = await api.post('/caregivers/decline-extra-terms', {
      termId,
    });
    if (response) {
      return response;
    }
  };

  const getTerms = async () => {
    const response = await api.get('/caregivers/terms');
    return response ? response : {};
  };

  const getExtraTerms = async () => {
    const response = await api.get('/caregivers/extra-terms');
    return response ? response : {};
  };

  const getCheckTerms = async () => {
    const params = {};
    if (user && user.id) {
      params.type = 'CAREGIVER';
      params.id = user.id;
    }
    const response = await api.get('caregivers/check', params);
    return { term: response.term.status, term_extra: response.term_extra };
  };

  return {
    acceptTerms,
    declineTerms,
    getTerms,
    getExtraTerms,
    getCheckTerms,
    acceptExtraTerms,
    declineExtraTerms,
  };
}
