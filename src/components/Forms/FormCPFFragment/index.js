import React from 'react';
import * as Yup from 'yup';
import SimpleButton from '../SimpleButton';
import InputMask from '../../Inputs/InputMask';
import Input from '../../Inputs/Input';
import { ContainerColumn, ContainerRows, ContainerCell } from './styles';
import { validateCPF, validateEmail } from '../../../utils/custom-validators';
import { errorHandler } from '../../../utils';

export const formFields = [
  {
    name: 'cpf_email',
    label: '',
    keyboardType: 'email-address',
    placeholder: 'XXX.XXX.XXX-XX ou exemplo@email.com',
    preHandleChange: (value) => {
      if (value && /[0-9]/.test(value.substr(0, 1))) {
        value = value.replace(/\D/g, '');
        const parts = [
          value.substr(0, 3),
          value.substr(3, 3),
          value.substr(6, 3),
        ];
        const cod = value.substr(9, 2);
        value = parts.filter((e) => !!e).join('.');
        if (cod) {
          value += `-${cod}`;
        }
        return value;
      } else {
        return value;
      }
    },
    validation: Yup.string()
      .required('Este campo não pode ficar em branco')
      .test('valid-cpf', 'O CPF digitado está incorreto', (value) => {
        if (value && /[0-9]/.test(value.substr(0, 1))) {
          return validateCPF(value);
        }
        return true;
      })
      .test('valid-email', 'O e-mail digitado está incorreto', (value) => {
        if (value && !/[0-9]/.test(value.substr(0, 1))) {
          return validateEmail(value);
        }
        return true;
      }),
  },
];

const FormCPFFragment = ({
  config,
  onPress,
  onPressVisible,
  setDisabledButton,
  disabled,
}) => {
  const fields = formFields;
  const renderField = ({ name, label, mask, ...rest }) => {
    const { values, handleChange, errors, setFieldTouched, touched } = config;

    if (!values.cpf_email) {
      onPressVisible();
    } else {
      setDisabledButton();
    }

    if (mask) {
      return (
        <InputMask
          {...rest}
          mask={mask}
          value={values ? values[name] : undefined}
          handleChange={handleChange(name)}
          setFieldTouched={() => setFieldTouched(name)}
          key={name}
          label={label}
          error={touched[name] ? errors[name] : null}
        />
      );
    }
    return (
      <Input
        {...rest}
        key={name}
        value={values ? values[name] : undefined}
        handleChange={handleChange(name)}
        label={label}
        setFieldTouched={() => setFieldTouched(name)}
        error={touched[name] ? errors[name] : null}
      />
    );
  };

  const _onPress = () => {
    const { values } = config;

    const cpf_email = values.cpf_email;
    let params = {};
    if (cpf_email) {
      if (/\d\d\d\.\d\d\d\.\d\d\d-\d\d/.test(cpf_email)) {
        params.cpf = cpf_email;
      } else {
        params.email = cpf_email;
      }
      onPress(params);
    } else {
      errorHandler('Por favor informe um CPF ou e-mail');
    }
  };

  const styles = { height: 52, marginTop: 12, minWidth: 100 };

  return (
    <ContainerColumn>
      <ContainerRows>
        <ContainerCell flex={2} marginLeft={0} marginRight={0}>
          {renderField(fields[0])}
        </ContainerCell>

        <ContainerCell flex={1} marginLeft={0} marginRight={0}>
          <SimpleButton
            style={styles}
            submitText={'BUSCAR'}
            onPress={_onPress}
            disabled={disabled}
          />
        </ContainerCell>
      </ContainerRows>
    </ContainerColumn>
  );
};

export default FormCPFFragment;
