import React, { useState, useLayoutEffect } from 'react';
import NextButton from '../components/CustomNavButtons/NextButton';
import BackButton from '../components/CustomNavButtons/BackButton';
import colors from '../styles/colors';

import { getFormValidationErrorMessage } from '../utils/validations';

export default function useFormAlertDisengageReasons(
  navigation,
  onSubmit,
  theme = 'light',
) {
  const formDispatch = {};
  const { goBack, setOptions } = navigation;
  const [data, setData] = useState(null);
  const [, setHasChange] = useState(false);

  useLayoutEffect(() => {
    setOptions({
      headerLeft: () => {
        return (
          <BackButton
            iconName="close"
            tintColor={theme === 'light' ? colors.WHITE : colors.PRIMARY}
            onPress={() => {
              goBack();
            }}
          />
        );
      },

      headerRight: () => {
        return (
          <NextButton
            tintColor={theme === 'light' ? colors.WHITE : colors.PRIMARY}
            onPress={() => {
              formDispatch.config.validateForm().then((res) => {
                if (Object.keys(res).length === 0) {
                  onSubmit(data);
                } else {
                  getFormValidationErrorMessage(
                    formDispatch.config,
                    formDispatch.fields,
                    res,
                  );
                }
              });
            }}
          />
        );
      },
    });
  }, [data]);

  const setRefs = (config, fields) => {
    formDispatch.config = config;
    formDispatch.fields = fields;
    const { values } = config;
    setData(values);
    setHasChange(true);
  };

  return {
    setRefs,
  };
}
