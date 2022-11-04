import React from 'react';
import * as Yup from 'yup';

import { PasswordValidationSchema } from 'utils';
import { Title } from 'components/Typografy';
import { Info } from './styles';
import useAuth from 'hooks/useAuth';
import Form from 'components/Forms';
import Page from 'components/Page';

export default function NewPass({ route }) {
  const { alterPasswordWithCode } = useAuth(false);
  const { email, recovery_code } = route.params;

  async function handelSubmit({ password, password_confirm }) {
    alterPasswordWithCode({ email, recovery_code, password });
  }

  return (
    <Page>
      <Title>Tudo certo!</Title>
      <Form
        onSubmit={handelSubmit}
        submitText="CONTINUAR"
        fields={[
          {
            label: 'Nova senha',
            name: 'password',
            type: 'password',
            placeholder: '******',
            secret: true,
            validation: PasswordValidationSchema,
          },
          {
            label: 'Repita a nova senha',
            name: 'password_confirm',
            type: 'password',
            placeholder: '******',
            secret: true,
            validation: Yup.string()
              .required('Este campo não pode ficar em branco')
              .oneOf(
                [Yup.ref('password'), null],
                'As senhas digitadas devem ser iguais',
              ),
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
