import React, { useState, useLayoutEffect } from 'react';
import NextButton from 'components/CustomNavButtons/NextButton';
import colors from 'styles/colors';
import ModalConfirm from 'components/Modal/ModalConfirm';

export default function useFormAlert(navigation, onSubmit, theme = 'light') {
  const { setOptions } = navigation;
  const [data, setData] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [hasChange] = useState(false);

  const formDispatch = {};

  useLayoutEffect(() => {
    setOptions({
      headerRight: () => {
        return (
          <NextButton
            tintColor={theme === 'dark' ? colors.WHITE : colors.PRIMARY}
            onPress={() => {
              formDispatch.handleSubmit();
            }}
          />
        );
      },
    });
  }, [hasChange]);

  const setRefs = ({ handleSubmit, initialValues, values }) => {
    formDispatch.handleSubmit = handleSubmit;
  };

  const handleConfirm = (_data) => {
    setData(_data);
    setConfirm(true);
  };

  const renderConfirm = () => {
    if (!confirm) {
      return null;
    }
    return (
      <ModalConfirm
        title={'Atenção'}
        message={'Deseja salvar a edição?'}
        onPressConfirm={() => {
          setConfirm(false);
          onSubmit(data);
        }}
        onPressCancel={() => {
          setConfirm(false);
        }}
      />
    );
  };

  return { setRefs, handleConfirm, renderConfirm };
}
