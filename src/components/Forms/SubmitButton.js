import React from 'react';
import Button from '../Buttons/Button';
import { ContainerButton } from './styles';

import { getFormValidationErrorMessage } from '../../utils/validations';

export default function SubmitButton({ submitText, config, fields }) {
  return (
    <ContainerButton>
      <Button
        config={config}
        label={submitText}
        onPress={async () => {
          config.validateForm().then((res) => {
            if (Object.keys(res).length === 0) {
              config.handleSubmit();
            } else {
              getFormValidationErrorMessage(config, fields, res);
            }
          });
        }}
      />
    </ContainerButton>
  );
}
