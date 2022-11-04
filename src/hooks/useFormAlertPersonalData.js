import React, { useState, useLayoutEffect } from 'react';
import NextButton from '../components/CustomNavButtons/NextButton';
import ModalConfirm from '../components/Modal/ModalConfirm';

import useModal from './useModal';
import useSenior from './useSenior';

import { getFormValidationErrorMessage } from '../utils/validations';

export default function useFormAlertPersonalData(navigation, onSubmit) {
  const { senior } = useSenior();
  const { goBack, setOptions } = navigation;
  const [data, setData] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [hasChange, setHasChange] = useState(false);
  const [back, setBack] = useState(false);
  const { renderUseModal, setUseModal } = useModal();
  const formDispatch = {};

  useLayoutEffect(() => {
    setOptions({
      headerRight: () => (
        <NextButton
          name="check"
          onPress={() => {
            if (hasChange) {
              formDispatch.config.validateForm().then((res) => {
                if (Object.keys(res).length === 0) {
                  formDispatch.config.handleSubmit();
                } else {
                  getFormValidationErrorMessage(
                    formDispatch.config,
                    formDispatch.fields,
                    res,
                  );
                }
              });
            } else {
              goBack();
            }
          }}
        />
      ),
    });
  }, [hasChange]);

  const setRefs = (config, fields) => {
    formDispatch.fields = fields;
    formDispatch.config = config;
    setHasChange(true);
  };

  const backMonitor = () => {
    if (back) {
      setBack(false);
      goBack();
    }
  };

  const handleConfirm = (_data) => {
    setData(_data);
    if (senior.death_date) {
      setUseModal();
    } else {
      setConfirm(true);
    }
  };

  const renderModalConfirm = () => {
    if (!confirm) {
      return null;
    } else {
      return (
        <ModalConfirm
          title="Salvar alterações?"
          message="Deseja confirmar e salvar as alterações no perfil?"
          onPressConfirm={() => {
            setConfirm(false);
            onSubmit(data);
          }}
          onPressCancel={() => {
            setConfirm(false);
            backMonitor();
          }}
        />
      );
    }
  };

  return {
    setRefs,
    handleConfirm,
    renderModalConfirm,
    inforDeathSenior: renderUseModal,
  };
}
