import React, { useState, useEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import Accordion from 'react-native-collapsible/Accordion';
import * as yup from 'yup';

import {
  Container,
  TouchableOpacity,
  AvatarContainer,
  Avatar,
  EditPhoto,
  IconEditPhoto,
} from './styles';

import Page from 'components/Page';
import AccordionHeader from 'components/AccordionHeader';
import FormFragment from 'components/Forms/FormFragment';
import SubmitButton from 'components/Forms/SubmitButton';
import FormAddressFragment, {
  formFields,
} from 'components/Forms/FormAddressFragment';

import useAuth from 'hooks/useAuth';
import useModal from 'hooks/useModal';

import TypeOfGender from 'enums/typeOfGender';
import { validateCPF } from 'utils/custom-validators';
import {
  setValidationField,
  REGEX_NAME,
  getValidationSchema,
  validBirthdateCaregiver,
  empty,
} from 'utils';

import useLoggedUserPhoto from 'hooks/useLoggedUserPhoto';

export default function CaregiverPersonalData() {
  const { setUseModal, renderUseModal } = useModal();
  const [activeSections, setActiveSections] = useState([]);
  const { updateUser } = useAuth(false);
  const { user } = useSelector((state) => state.auth);
  const { refreshPhoto, photo } = useLoggedUserPhoto(user);
  const { navigate, goBack } = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      refreshPhoto();
    }
  }, [isFocused]);

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
            'Só são permitidas letras (A-Z), acentos e espaços'
          )
            .required('Este campo não pode ficar em branco')
            .test(
              'start-empty',
              'Esse campo não aceita espaço(s) em branco no início do texto.',
              (value) => empty(value)
            )
            .min(2, 'Nome deve ter ao menos 2 caracteres'),
        },
        {
          name: 'email',
          label: 'Email*',
          placeholder: 'exemplo@email.com',
          editable: false,
          validation: yup
            .string()
            .email('O e-mail digitado está incorreto')
            .required('Este campo não pode ficar em branco'),
        },
        {
          name: 'cpf',
          label: 'CPF',
          mask: 'cpf',
          placeholder: 'XXX.XXX.XXX-XX',
          editable: user.cpf === null,
          validation: yup
            .string()
            .nullable()
            .required('Este campo não pode ficar em branco')
            .length(14, 'O CPF digitado está incorreto')
            .test('valid-cpf', 'O CPF digitado está incorreto', (value) =>
              validateCPF(value)
            ),
        },
        {
          name: 'phone_number',
          label: 'Telefone/Whatsapp*',
          mask: 'cel-phone',
          placeholder: '(XX) XXXXX-XXXX',
          validation: yup
            .string()
            .nullable()
            .required('Este campo não pode ficar em branco')
            .length(15, 'O telefone digitado está incorreto'),
        },
        {
          name: 'is_whatsapp',
          type: 'checkbox',
          label: 'Esse número é whatsapp',
        },
        {
          name: 'birthdate',
          label: 'Data de Nascimento',
          mask: 'datetime',
          placeholder: 'DD/MM/AAAA',
          options: {
            format: 'DD/MM/YYYY',
          },
          validation: validBirthdateCaregiver,
        },
        {
          name: 'gender',
          type: 'select',
          label: 'Gênero',
          placeholder: 'Selecione o gênero',
          validation: yup.string().nullable(),
          options: TypeOfGender,
          initialValue: user.gender,
        },
      ],
    },
    {
      title: 'Endereço',
      iconLeft: 'room',
      fields: 'ADDRESS_FIELDS',
    },
  ];

  const _renderHeader = (config) => (content, index, isActive, sections) => {
    const fields =
      content.fields === 'ADDRESS_FIELDS' ? formFields : content.fields;
    const fieldsWithErrors = Object.keys(config.errors);
    const myFields = fields.map((field) => field.name);
    const myErrors = fieldsWithErrors.filter(
      (field) => myFields.indexOf(field) !== -1
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

  const fields = [...section[0].fields, ...formFields];

  const validationSchema = getValidationSchema(fields);

  const handleSubmit = async (data) => {
    const response = await updateUser(data, false);
    if (response) {
      setUseModal();
    }
  };

  return (
    <>
      <Page hasSidePadding={false}>
        <AvatarContainer
          onPress={() => {
            navigate('ProfilePhoto', { edit: true });
          }}
        >
          <Avatar source={photo} resizeMode='contain' />
          <EditPhoto>
            <IconEditPhoto name='edit' />
          </EditPhoto>
        </AvatarContainer>

        <Formik
          initialValues={user}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(config) => (
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
          )}
        </Formik>
      </Page>
      {renderUseModal({
        title: 'Tudo certo!',
        message: 'Os dados do cuidador foram alterados com sucesso!',
        onPress: () => {
          goBack();
        },
      })}
    </>
  );
}
