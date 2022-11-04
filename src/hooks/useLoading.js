import { useDispatch } from 'react-redux';
import { TYPES } from '../store/AppReducer';
import api from '../services/api';
import { useEffect, useState } from 'react';
import axios from 'axios';

function useLoading() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState();
  const [cancelPromises, setCancelPromises] = useState([]);

  const loadingStart = (loadingDelay = 0) => {
    dispatch({ type: TYPES.LOADING_START, payload: { loadingDelay } });
  };

  const loadingStop = () => {
    dispatch({ type: TYPES.LOADING_STOP });
  };

  const cancelRequest = () => {
    for (let i = 0; i < cancelPromises.length; i++) {
      const cp = cancelPromises[i];
      cp();
    }
    setCancelPromises([]);
  };

  const initialize = () => {
    const configApi = api.getConfigApi();

    const handlerStart = (config) => {
      //console.log('START', config.method);
      if (config.method && config.method === 'get') {
        loadingStart(1000);
        setMessage('Recuperando informações');
      } else {
        loadingStart();
        setMessage('Enviando suas informações');
      }

      return {
        ...config,
        cancelToken: new axios.CancelToken(function executor(c) {
          setCancelPromises([...cancelPromises, c]);
        }),
      };
    };

    const handlerStop = (config) => {
      //console.log('STOP');
      loadingStop();
      if (config.method && config.method === 'get') {
        setMessage('Processando...');
      }
      return config;
    };

    const handlerError = (error) => {
      //console.log('ERROR');
      loadingStop();
      setMessage('Processando...');
      return Promise.reject(error);
    };

    configApi.interceptors.request.use(handlerStart, handlerError);
    configApi.interceptors.response.use(handlerStop, handlerError);
  };

  useEffect(() => {
    initialize();
  }, []);

  return {
    loadingStart,
    loadingStop,
    message,
    cancelRequest,
  };
}

export default useLoading;
