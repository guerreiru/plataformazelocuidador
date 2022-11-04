import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import * as Yup from 'yup';

import { PasswordSchemaValidation } from 'utils';
import { validateCPF } from 'utils/custom-validators';
import { Title, Info } from './styles';
import useAuth from 'hooks/useAuth';
import MyForm from 'components/Forms';
import Page from 'components/Page';

export default function SignUpLoginData() {
  const navigation = useNavigation();
  const { checkDuplicateCPF } = useAuth(false);

  async function handelSubmit({ cpf, password }) {
    const { duplicate } = await checkDuplicateCPF({ cpf: cpf });
    if (!duplicate) {
      navigation.navigate('SignUpPersonalData', { cpf, password });
    } else {
      Alert.alert('Atenção', 'O CPF digitado já foi cadastrado no Zelo');
    }
  }

  return (
    <Page>
      <Title>Vamos começar</Title>
      <MyForm
        onSubmit={handelSubmit}
        submitText="CONTINUAR"
        fields={[
          {
            name: 'cpf',
            mask: 'cpf',
            label: 'Qual é o seu CPF?',
            placeholder: 'XXX.XXX.XXX-XX',
            validation: Yup.string()
              .required('Este campo não pode ficar em branco')
              .length(14, 'O CPF digitado está incorreto')
              .test('valid-cpf', 'O CPF digitado está incorreto', (value) =>
                validateCPF(value),
              ),
          },
          {
            name: 'password',
            type: 'password',
            placeholder: '******',
            label: 'Escolha uma senha para sua conta',
            validation: PasswordSchemaValidation,
          },
          {
            name: 'passwordConfirmation',
            type: 'password',
            placeholder: '******',
            label: 'Repita a senha',
            validation: Yup.string()
              .oneOf(
                [Yup.ref('password')],
                'As senhas digitadas devem ser iguais',
              )
              .required('Este campo não pode ficar em branco')
              .trim(),
          },
          {
            content: () => (
              <Info>
                Sua senha deve ter pelo menos 8 caracteres, incluir uma letra
                maiúscula, uma miníscula, um número e um caractere especial.
              </Info>
            ),
          },
        ]}
      />
    </Page>
  );
}
