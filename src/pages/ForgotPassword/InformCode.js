import React from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { Title } from 'components/Typografy';
import useAuth from 'hooks/useAuth';
import Form from 'components/Forms';
import Page from 'components/Page';

export default function InformCode({ route }) {
  const navigation = useNavigation();
  const { checkRecoveryCode } = useAuth(false);
  const { email } = route.params;

  async function handelSubmit({ recovery_code }) {
    const response = await checkRecoveryCode({ email, recovery_code });
    if (response) {
      navigation.navigate('NewPass', { email, recovery_code });
    }
  }

  return (
    <Page>
      <Title>Enviamos um código de 6 dígitos para o e-mail {email}</Title>
      <Form
        onSubmit={handelSubmit}
        submitText="RECUPERAR ACESSO"
        fields={[
          {
            label: 'Digite o código recebido para continuar',
            name: 'recovery_code',
            placeholder: '******',
            validation: Yup.string()
              .required('Este campo não pode ficar em branco')
              .length(6, 'Código inválido, o código possui 6 digitos'),
            mask: 'custom',
            secret: true,
            keyboardType: 'numeric',
            options: {
              mask: '999999',
            },
          },
        ]}
      />
    </Page>
  );
}
