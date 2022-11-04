import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';

import { useAuth, useModal } from 'hooks';
import { REGEX_NAME } from 'utils/regex';
import { empty } from 'utils';
import TypeOfGender from 'enums/typeOfGender';
import ButtonLink from 'components/Buttons/ButtonLink';
import Checkbox from 'components/Checkbox';
import MyForm from 'components/Forms';
import colors from 'styles/colors';
import Modal from 'components/Modal';
import Page from 'components/Page';

import {
  ContainerButtonModal,
  ContainerTerms,
  TextTerms,
  LinkTerms,
  Title,
} from './styles';

export default function SignUpPersonalData({ route, navigation }) {
  const { cpf, password } = route.params;
  const { params } = route;

  const { signUp, login } = useAuth(false);
  const { renderUseModal, setUseModal } = useModal();

  const { navigate } = navigation;
  const [isWhatsapp, setIsWhatsapp] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (params && params.accept) {
      setIsAccepted(params.accept);
    }
  }, [params]);

  async function handleSubmit(_data) {
    if (isAccepted) {
      _data.contractServiceTerms = isAccepted;
      const response = await signUp({
        cpf,
        password,
        ..._data,
        is_whatsapp: isWhatsapp,
      });
      if (response) {
        setIsVisibleModal(true);
        setData({ cpf_email: cpf, password });
      }
    } else {
      setUseModal();
    }
  }

  const renderModalWelcome = () => {
    if (isVisibleModal) {
      return (
        <Modal
          title={'Bem-vindo ao Zelo!'}
          message={'Conta criada com sucesso!'}
          visible={isVisibleModal}
          footer={
            <ContainerButtonModal>
              <ButtonLink
                label={'COMEÇAR A USAR'}
                fontWeight={800}
                onPress={async () => {
                  setIsVisibleModal(false);
                  await login(data);
                }}
                color={colors.PRIMARY}
              />
            </ContainerButtonModal>
          }
        />
      );
    }
    return null;
  };

  return (
    <Page>
      <Title>Só precisamos saber um pouco mais sobre você</Title>
      <MyForm
        onSubmit={handleSubmit}
        submitText="CONTINUAR"
        fields={[
          {
            name: 'full_name',
            label: 'Nome completo*',
            placeholder: 'Ex: Fulano dos Santos',
            validation: Yup.string()
              .required('Este campo não pode ficar em branco')
              .matches(REGEX_NAME, {
                message: 'Só são permitidas letras (A-Z), acentos e espaços',
              })
              .min(2, 'Nome deve ter ao menos 2 caracteres')
              .test(
                'validation-empty',
                'Esse campo não aceita espaço(s) em branco no início do texto.',
                (value) => empty(value),
              ),
          },
          {
            name: 'email',
            label: 'E-mail*',
            keyboardType: 'email-address',
            placeholder: 'exemplo@email.com',
            autoCapitalize: 'none',
            validation: Yup.string()
              .email('O e-mail digitado está incorreto')
              .required('Este campo não pode ficar em branco'),
          },
          {
            name: 'gender',
            type: 'select',
            label: 'Gênero',
            placeholder: 'Selecione o gênero',
            validation: Yup.string().nullable(),
            options: TypeOfGender,
          },
          {
            name: 'phone_number',
            label: 'Telefone/Whatsapp*',
            mask: 'cel-phone',
            placeholder: '(XX) XXXXX-XXXX',
            validation: Yup.string()
              .length(15, 'O telefone digitado está incorreto')
              .required('Este campo não pode ficar em branco'),
          },
          {
            key: 'is_whatsapp',
            content: () => (
              <Checkbox
                name={'is_whatsapp'}
                label={<TextTerms>{'Esse número é whatsapp'}</TextTerms>}
                value={isWhatsapp + ''}
                handleChange={(value) => setIsWhatsapp(value === 'true')}
              />
            ),
          },
          {
            key: 'contractServiceTerms',
            content: () => (
              <ContainerTerms>
                <Checkbox
                  name={'contractServiceTerms'}
                  label={
                    <TextTerms>
                      {'Li e aceito os '}
                      <LinkTerms
                        onPress={() => navigate('Terms', { showAccept: true })}>
                        {'Termos de Contrato e de Serviços'}
                      </LinkTerms>
                    </TextTerms>
                  }
                  value={isAccepted + ''}
                  handleChange={(value) => setIsAccepted(value === 'true')}
                />
              </ContainerTerms>
            ),
          },
        ]}
      />

      {renderUseModal({
        title: 'Falta aceitar os Termos de Contrato e Serviço',
        message:
          'Para se cadastrar no Zelo você deve confirmar que leu e aceita os Termos de Contrato e Serviço.',
        textButtonDefault: 'VOLTAR',
      })}

      {renderModalWelcome()}
    </Page>
  );
}
