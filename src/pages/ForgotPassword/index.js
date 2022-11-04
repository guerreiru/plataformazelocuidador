import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Title } from 'components/Typografy';
import * as Yup from 'yup';

import Page from 'components/Page';
import Form from 'components/Forms';
import useAuth from 'hooks/useAuth';

export default function ForgotPassword() {
  const { requestRecoveryCode } = useAuth(false);
  const navigation = useNavigation();

  async function handelSubmit(data) {
    const response = await requestRecoveryCode(data);
    if (response) {
      navigation.navigate('InformCode', { email: data.email });
    }
  }

  return (
    <Page>
      <Title>Esqueceu sua senha?</Title>
      <Form
        onSubmit={handelSubmit}
        submitText="CONTINUAR"
        fields={[
          {
            label:
              'Digite o e-mail que você cadastrou no Zelo para poder continuar',
            name: 'email',
            keyboardType: 'email-address',
            placeholder: 'exemplo@email.com',
            autoCapitalize: 'none',
            validation: Yup.string()
              .email('O e-mail digitado está incorreto')
              .required('Este campo não pode ficar em branco'),
          },
        ]}
      />
    </Page>
  );
}
