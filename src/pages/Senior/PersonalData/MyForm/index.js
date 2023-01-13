import React, { useState } from 'react';
import { Formik } from 'formik';
import Accordion from 'react-native-collapsible/Accordion';
import * as yup from 'yup';

import AccordionHeader from 'components/AccordionHeader';
import FormFragment from 'components/Forms/FormFragment';
import SubmitButton from 'components/Forms/SubmitButton';
import BloodTypes from 'enums/BloodTypes';

import { validateCNS } from 'utils/cns';
import { Container, TouchableOpacity } from './styles';

import {
  setValidationField,
  REGEX_NAME,
  getValidationSchema,
  validBirthdateSenior,
  empty,
} from 'utils';

import FormAddressFragment, {
  formFields,
} from 'components/Forms/FormAddressFragment';

const MyForm = ({ handleSubmit, setRefs, senior }) => {
  const [activeSections, setActiveSections] = useState([]);

  const section = [
    {
      title: 'Identificação',
      iconLeft: 'account-box',
      fields: [
        {
          name: 'full_name',
          label: 'Nome Completo*',
          placeholder: 'Ex: Fulano dos Santos',
          validation: setValidationField(
            REGEX_NAME,
            'Só são permitidas letras (A-Z), acentos e espaços',
          )
            .required('Campo obrigatório não preenchido')
            .min(2, 'Nome deve ter ao menos 2 caracteres')
            .test(
              'start-empty',
              'Esse campo não aceita espaço(s) em branco no início do texto.',
              (value) => empty(value),
            ),
        },
        {
          name: 'nickname',
          label: 'Como gosta de ser chamado(a)?',
          placeholder: 'Ex: Lano',
          validation: setValidationField(
            REGEX_NAME,
            'Só são permitidas letras (A-Z), acentos e espaços',
          )
            .min(2, 'Nome deve ter ao menos 2 caracteres')
            .test(
              'start-empty',
              'Esse campo não aceita espaço(s) em branco no início do texto.',
              (value) => empty(value),
            ),
        },
        {
          name: 'mother_name',
          label: 'Nome da mãe',
          placeholder: 'Ex: Maria da Silva',
          validation: setValidationField(
            REGEX_NAME,
            'Só são permitidas letras (A-Z), acentos e espaços',
          )
            //.required('Campo obrigatório não preenchido')
            .min(2, 'Nome deve ter ao menos 2 caracteres')
            .test(
              'start-empty',
              'Esse campo não aceita espaço(s) em branco no início do texto.',
              (value) => empty(value),
            ),
        },
        {
          name: 'cpf',
          label: 'CPF',
          mask: 'cpf',
          placeholder: 'XXX.XXX.XXX-XX',
          editable: senior.cpf == null,
        },

        {
          name: 'gender',
          label: 'Gênero',
          type: 'select',
          options: [
            { label: 'MASCULINO', value: 'MASCULINO' },
            { label: 'FEMININO', value: 'FEMININO' },
          ],
        },
        {
          name: 'birthdate',
          label: 'Data de Nascimento',
          mask: 'datetime',
          placeholder: 'DD/MM/AAAA',
          options: {
            format: 'DD/MM/YYYY',
          },
          validation: validBirthdateSenior,
        },
      ],
    },
    {
      title: 'Endereço',
      iconLeft: 'room',
      fields: 'ADDRESS_FIELDS',
    },
    {
      title: 'Info. Basicas de saúde',
      iconLetfAlternative: 'ellipsis1',
      iconLeft: 'more_horiz',
      fields: [
        {
          name: 'sus_card_number',
          label: 'Número do cartão do SUS',
          placeholder: 'XXX.XXXX.XXXX.XXXX',
          keyboardType: 'numeric',
          mask: 'custom',
          maskCustom: '999.9999.9999.9999',
          validation: yup
            .string()
            .nullable()
            .test('valid-cns', 'O CNS digitado está incorreto', (value) =>
              validateCNS(value),
            ),
        },
        {
          name: 'name_health_insurance',
          label: 'Plano de saúde',
          placeholder: 'Ex: Plano N',
          validation: setValidationField(
            REGEX_NAME,
            'Só são permitidas letras (A-Z), acentos e espaços',
          )
            .min(2, 'Nome deve ter ao menos 2 caracteres')
            .test(
              'start-empty',
              'Esse campo não aceita espaço(s) em branco no início do texto.',
              (value) => empty(value),
            ),
        },
        {
          name: 'blood_type',
          label: 'Tipo sanguíneo',
          type: 'select',
          options: BloodTypes,
        },
      ],
    },
  ];

  const _renderHeader = (config) => (content, index, isActive, sections) => {
    const fields =
      content.fields === 'ADDRESS_FIELDS' ? formFields : content.fields;
    const fieldsWithErrors = Object.keys(config.errors);
    const myFields = fields.map((field) => field.name);
    const myErrors = fieldsWithErrors.filter(
      (field) => myFields.indexOf(field) !== -1,
    );

    return (
      <Container padding={10}>
        <AccordionHeader
          error={myErrors && myErrors.length}
          isActive={isActive}
          {...content}
        />
      </Container>
    );
  };

  const _renderContent = (config) => (_section) => {
    return (
      <Container padding={20}>
        {_section.fields === 'ADDRESS_FIELDS' ? (
          <FormAddressFragment config={config} />
        ) : (
          <FormFragment config={config} fields={_section.fields} />
        )}
      </Container>
    );
  };

  const _updateSections = (_activeSections) => {
    setActiveSections(_activeSections);
  };

  const fields = [...section[0].fields, ...section[2].fields, ...formFields];

  const validationSchema = getValidationSchema(fields);

  return (
    <Formik
      initialValues={senior}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {(config) => {
        setRefs(config, fields);
        return (
          <>
            <Accordion
              sections={section}
              activeSections={activeSections}
              renderContent={_renderContent(config)}
              onChange={_updateSections}
              renderHeader={_renderHeader(config)}
              touchableComponent={({ children, ...rest }) => (
                <TouchableOpacity {...rest}>{children}</TouchableOpacity>
              )}
            />
            <SubmitButton
              submitText={'SALVAR ALTERAÇÕES'}
              config={config}
              fields={fields}
            />
          </>
        );
      }}
    </Formik>
  );
};

export default MyForm;
