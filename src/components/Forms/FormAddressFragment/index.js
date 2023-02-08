import React, { useState } from 'react';
import SimpleButton from '../SimpleButton';
import Input from '../../Inputs/Input';
import InputMask from '../../Inputs/InputMask';
import useCEP from '../../../hooks/useCEP';
import SwitchGroup from '../../SwitchGroup';
import {
  errorHandler,
  REGEX_NAME,
  REGEX_NUMBER,
  REGEX_WORDS_AND_NUMBERS,
  setValidationField,
  empty,
} from '../../../utils';
import * as yup from 'yup';

import {
  ContainerColumn,
  ContainerRows,
  ContainerCell,
  SwitchTitle,
  SwitchSubTitle,
  SwitchHeaderWrapper,
} from './styles';
import { useEffect } from 'react';

export const formFields = [
  {
    name: 'zip_code',
    label: 'CEP',
    mask: 'zip-code',
    placeholder: 'XXXXX-XX',
    validation: yup.string().nullable().length(9, 'CEP incorreto'),
  },
  {
    name: 'public_place',
    label: 'Rua',
    placeholder: 'Ex: Rua N',
    editable: false,
    validation: setValidationField(
      REGEX_NAME,
      'Não são permitidos caracteres especiais no nome da rua',
    ).test(
      'start-empty',
      'Esse campo não aceita espaço(s) em branco no início do texto.',
      (value) => empty(value),
    ),
  },
  {
    name: 'number',
    label: 'Número',
    keyboardType: 'numeric',
    mask: 'only-numbers',
    placeholder: 'Ex: 99',
    validation: setValidationField(
      REGEX_NUMBER,
      'Não são permitidos caracteres especiais e letras no número da rua',
    ),
  },
  {
    name: 'complement',
    label: 'Complemento',
    placeholder: 'Ex: A',
    validation: setValidationField(
      REGEX_WORDS_AND_NUMBERS,
      'Não são permitidos caracteres especiais  no complemento',
    ).test(
      'start-empty',
      'Esse campo não aceita espaço(s) em branco no início do texto.',
      (value) => empty(value),
    ),
  },
  {
    name: 'district',
    label: 'Bairro',
    placeholder: 'Ex: Bairro',
    editable: false,
    validation: setValidationField(
      REGEX_NAME,
      'Não são permitidos caracteres especiais no nome do bairro',
    ).test(
      'start-empty',
      'Esse campo não aceita espaço(s) em branco no início do texto.',
      (value) => empty(value),
    ),
  },
  {
    name: 'state',
    label: 'UF',
    placeholder: 'Ex: CE',
    editable: false,
    validation: setValidationField(
      REGEX_NAME,
      'Não são permitidos caracteres especiais no nome do UF',
    )
      .length(2, 'UF inválido')
      .test(
        'start-empty',
        'Esse campo não aceita espaço(s) em branco no início do texto.',
        (value) => empty(value),
      ),
  },
  {
    name: 'city',
    label: 'Cidade',
    placeholder: 'Ex: Fortaleza',
    editable: false,
    validation: setValidationField(
      REGEX_NAME,
      'Não são permitidos caracteres especiais no nome da Cidade',
    ).test(
      'start-empty',
      'Esse campo não aceita espaço(s) em branco no início do texto.',
      (value) => empty(value),
    ),
  },
];

export default function FormAddressFragment({ config, isSeniorData }) {
  const fields = formFields;
  const { values, setFieldValue } = config;
  const { getCEP } = useCEP();
  const [isLoading, setLoading] = useState(false);
  const [isInternal, setIsInternal] = useState(
    () => config.initialValues.is_internal,
  );

  const renderField = ({ name, label, mask, ...rest }) => {
    const { values, handleChange, errors, setFieldTouched, touched } = config;
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

  const checkCep = async (cepValue) => {
    if (isLoading) {
      return;
    }
    setLoading(true);
    const { values, setFieldValue } = config;
    try {
      const cep = cepValue || values.zip_code;
      if (cep === null || cep.length < 9) {
        errorHandler('Por favor informe o CEP.', { cep });
        return;
      }

      const dataCep = await getCEP(cep);

      if (dataCep && dataCep.cidade && dataCep.estado && dataCep.logradouro) {
        [1, 4, 5, 6].map((i) => (fields[i].editable = false));
        setFieldValue('public_place', dataCep.logradouro);
        setFieldValue('district', dataCep.bairro);
        setFieldValue('state', dataCep.estado.sigla);
        setFieldValue('city', dataCep.cidade.nome);
      } else {
        [1, 4, 5, 6].map((i) => (fields[i].editable = true));
        setFieldValue('public_place', undefined);
        setFieldValue('district', undefined);
        setFieldValue('state', undefined);
        setFieldValue('city', undefined);
        errorHandler(
          'CEP não encontrado. Verifique o CEP ou informe seu endereço manualmente.',
          { cep },
        );
      }
    } catch (error) {
      errorHandler(error, { cep: values.zip_code });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isInternal) {
      setFieldValue('zip_code', '82200-164');
      setFieldValue('is_internal', true);
      setFieldValue('complement', 'B');
      setFieldValue('number', '211');
      checkCep('82200-164');
      return;
    } else if (values.zip_code === '82200-164') {
      setFieldValue('zip_code', '');
      setFieldValue('complement', '');
      setFieldValue('number', '');
      setFieldValue('public_place', '');
      setFieldValue('district', '');
      setFieldValue('state', '');
      setFieldValue('city', '');
    }

    setFieldValue('is_internal', false);
  }, [isInternal]);

  return (
    <ContainerColumn isInternal={isInternal} isSeniorData={isSeniorData}>
      {isSeniorData && (
        <SwitchGroup
          label="Residente da Organização São Lourenço"
          theme="bold"
          description={
            'Pessoa idosa é residente da unidade e possui o mesmo endereço da Organização'
          }
          value={isInternal ? isInternal.toString() : 'false'}
          handleChange={() => setIsInternal(!isInternal)}
        />
      )}

      {!isInternal && (
        <>
          <ContainerRows>
            <ContainerCell flex={1} marginLeft={0} marginRight={8}>
              {renderField(fields[0])}
            </ContainerCell>

            <ContainerCell flex={1} marginLeft={8} marginRight={0}>
              <SimpleButton submitText={'Validar CEP'} onPress={checkCep} />
            </ContainerCell>
          </ContainerRows>

          <ContainerRows>
            <ContainerCell flex={2} marginLeft={0} marginRight={8}>
              {renderField(fields[1])}
            </ContainerCell>

            <ContainerCell flex={1} marginLeft={8} marginRight={0}>
              {renderField(fields[2])}
            </ContainerCell>
          </ContainerRows>

          <ContainerRows>
            <ContainerCell flex={1} marginLeft={0} marginRight={8}>
              {renderField(fields[3])}
            </ContainerCell>

            <ContainerCell flex={1} marginLeft={8} marginRight={0}>
              {renderField(fields[4])}
            </ContainerCell>
          </ContainerRows>
          <ContainerRows>
            <ContainerCell flex={1} marginLeft={0} marginRight={8}>
              {renderField(fields[5])}
            </ContainerCell>

            <ContainerCell flex={2} marginLeft={8} marginRight={0}>
              {renderField(fields[6])}
            </ContainerCell>
          </ContainerRows>
        </>
      )}
    </ContainerColumn>
  );
}
