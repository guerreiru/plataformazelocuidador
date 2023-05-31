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
                  type: 'number',
                  label: 'CPF',
                  mask: 'cpf',
                  placeholder: 'XXX.XXX.XXX-XX',
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
                },
                {
                  name: 'password',
                  type: 'password',
                  placeholder: '******',
                  label: 'Senha',
                  validation: Yup.string()
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
