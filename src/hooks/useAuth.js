import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TYPES as AUTH_TYPES } from '../store/AuthReducer';
import { TYPES as APP_TYPES } from '../store/AppReducer';

import useStorage from './useStorage';
import api from '../services/api';
import ged from '../services/ged';
import { message, adjustParamsToNull } from '../utils';
import useUsageTimeAplication from './useUsageTimeAplication';

export default function useAuth(callCheck = true) {
  const { storeUsageTimeAplication } = useUsageTimeAplication();
  const { ready } = useSelector((state) => state.app);
  const user = useSelector((state) => state.auth.user);
  const authToken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [saveAuth, getAuth, removeAuth] = useStorage('AUTH');

  async function login({ password, cpf_email, keepConnected }) {
    const _params = {
      password,
      keepConnected,
    };
    if (/\d\d\d\.\d\d\d\.\d\d\d-\d\d/.test(cpf_email)) {
      _params.cpf = cpf_email;
    } else {
      _params.email = cpf_email;
    }
    const response = await api.post('caregivers/auth', _params);

    if (response) {
      const { entity, token } = response;
      const userData = {
        user: entity,
        token,
      };

      saveAuth(userData);
      api.setToken(userData.token);
      ged.setToken(userData.token);
      dispatch({ type: AUTH_TYPES.LOGIN, payload: userData });
    }
  }

  async function logout() {
    await storeUsageTimeAplication();

    removeAuth();
    api.setToken(null);
    ged.setToken(null);
    dispatch({ type: AUTH_TYPES.LOGOUT });
  }

  async function checkLogged() {
    if (!ready) {
      const dataLogged = await getAuth();
      if (dataLogged) {
        api.setToken(dataLogged.token);
        ged.setToken(dataLogged.token);
        const response = await api.get('caregivers/check');

        if (response) {
          dispatch({ type: AUTH_TYPES.LOGIN, payload: dataLogged });
        } else {
          logout();
        }
      }
      dispatch({ type: APP_TYPES.APP_READY });
    }
  }

  async function checkDuplicateCPFEmail(params) {
    return await api.get('caregivers/is-duplicate-cpf-email', params);
  }

  async function checkDuplicateCPF(params) {
    return await api.get('caregivers/is-duplicate-cpf', params);
  }

  async function requestRecoveryCode(params) {
    return await api.post('caregivers/recover-password', params);
  }

  async function checkRecoveryCode(params) {
    return await api.post('caregivers/check-recovery-code', params);
  }

  async function alterPasswordWithCode(params) {
    const response = await api.post(
      'caregivers/alter-password-with-code',
      params,
    );
    if (response) {
      const { email } = response;
      await login({ cpf_email: email, password: params.password });
    }
  }

  async function signUp(data) {
    const response = await api.post('caregivers', data);
    return response;
  }

  async function storeAndSendInvitation(data) {
    const response = await api.post('/caregivers/store-send-invitation', data);
    return response;
  }

  async function engage(data) {
    const response = await api.post('/caregivers/seniors/engage', data);
    return response;
  }

  async function disengage(senior_id, caregiver_id, data) {
    const response = await api.put(
      `caregivers/${caregiver_id}/seniors/${senior_id}/disengage`,
      data,
    );
    return response;
  }

  async function myDisengage(senior_id, data) {
    const response = await api.put(
      `/caregivers/seniors/${senior_id}/disengage`,
      data,
    );
    return response;
  }

  async function updateUser(data, hasSucess = true) {
    const formatData = adjustParamsToNull(data);

    const response = await api.put(`/caregivers/${data.id}`, formatData);

    if (response) {
      dispatch({ type: AUTH_TYPES.UPDATE_USER, payload: response });
      saveAuth({ user: response, token: authToken });
      if (hasSucess) {
        message.success('Dados atualizados com sucesso!');
      }
    }
    return response;
  }

  const deactivateAccount = async () => {
    const response = await api.put('caregivers/deactivate-account');
    return response;
  };

  const isCaregiverResponsible = async () => {
    const response = await api.get('caregivers/am-i-responsible');
    return response;
  };

  useEffect(() => {
    if (callCheck) {
      checkLogged();
    }
  }, []);

  return {
    user,
    login,
    logout,
    signUp,
    updateUser,
    checkDuplicateCPF,
    checkDuplicateCPFEmail,
    requestRecoveryCode,
    checkRecoveryCode,
    alterPasswordWithCode,
    storeAndSendInvitation,
    engage,
    disengage,
    myDisengage,
    deactivateAccount,
    isCaregiverResponsible,
  };
}
