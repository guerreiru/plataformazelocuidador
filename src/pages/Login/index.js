import { useNavigation } from '@react-navigation/native';
import React from 'react';
import * as Yup from 'yup';

import { validateCPF, validateEmail } from 'utils/custom-validators';
import ButtonLeaked from 'components/Buttons/ButtonLeaked';
import logoZelo from 'Images/logo.png';
import configs from 'configs';
import useAuth from 'hooks/useAuth';
import MyForm from 'components/Forms';

import colors from 'styles/colors';
import {
  Container,
  Bg,
  ContainerForm,
  Image,
  Label,
  Line,
  Link,
  SubContainer,
  LabelVersion,
} from './styles';

export default function Login() {
  const { login } = useAuth(false);
  const navigation = useNavigation();
  const containerStyle = { alignItems: 'center', justifyContent: 'center' };

  return (
    <Bg>
      <Container
        keyboardShouldPersistTaps="handled"
        containerStyle={containerStyle}>
        <Image source={logoZelo} resizeMode="contain" />
        <ContainerForm>
          <>
            <MyForm
              onSubmit={login}
              submitText="ENTRAR"
              fields={[
                {
                  name: 'cpf_email',
                  label: 'CPF ou e-mail',
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
                    }
                    return value.toLowerCase();
                  },
                  validation: Yup.string()
                    .required('Este campo não pode ficar em branco')
                    .test(
                      'valid-cpf',
                      'O CPF digitado está incorreto',
                      (value) => {
                        if (value && /[0-9]/.test(value.substr(0, 1))) {
                          return validateCPF(value);
                        }
                        return true;
                      },
                    )
                    .test(
                      'valid-email',
                      'O e-mail digitado está incorreto',
                      (value) => {
                        if (value && !/[0-9]/.test(value.substr(0, 1))) {
                          return validateEmail(value);
                        }
                        return true;
                      },
                    ),
                },
                {
                  name: 'password',
                  type: 'password',
                  placeholder: '******',
                  label: 'Senha',
                  validation: Yup.string()
                    .min(6, 'A senha deve conter no mínimo 6 dígitos')
                    .required('Este campo não pode ficar em branco'),
                },
                {
                  name: 'keepConnected',
                  type: 'checkbox',
                  label: 'Mantenha-me conectado',
                },
              ]}
            />
            <Link onPress={() => navigation.navigate('ForgotPassword')}>
              <Label decoration>Esqueceu a senha ?</Label>
            </Link>
          </>
        </ContainerForm>
        <SubContainer>
          <Line />
          <Label>Ou</Label>
          <Line />
        </SubContainer>

        <ButtonLeaked
          borderColor={colors.TEXT_GRAY}
          textColor={colors.LIGHT_PRIMARY}
          label={'CRIAR CONTA'}
          onPress={() => navigation.navigate('SignUpLoginData')}
        />
        <LabelVersion>{`v ${configs.VERSION}`}</LabelVersion>
      </Container>
    </Bg>
  );
}
