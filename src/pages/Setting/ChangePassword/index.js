import React from 'react';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { PasswordSchemaValidation } from 'utils';
import { Info } from './styles';
import useModal from 'hooks/useModal';
import useAuth from 'hooks/useAuth';
import MyForm from 'components/Forms';
import Page from 'components/Page';

const ChangePassword = () => {
  const { setUseModal, renderUseModal } = useModal();
  const { updateUser } = useAuth(false);
  const { user } = useSelector((state) => state.auth);
  const { goBack } = useNavigation();

  const handleSubmit = async ({ password, new_password }) => {
    const response = await updateUser(
      { password, new_password, id: user.id },
      false,
    );
    if (response) {
      setUseModal();
    }
  };

  return (
    <>
      <Page simple={false}>
        <MyForm
          onSubmit={handleSubmit}
          submitText="SALVAR"
          fields={[
            {
              name: 'password',
              type: 'password',
              placeholder: '******',
              label: 'Senha atual *',
              validation: Yup.string()
                .required('Este campo não pode ficar em branco')
                .trim(),
            },
            {
              name: 'new_password',
              type: 'password',
              placeholder: '******',
              label: 'Nova senha *',
              validation: PasswordSchemaValidation,
            },
            {
              name: 'passwordConfirmation',
              type: 'password',
              placeholder: '******',
              label: 'Confirmar nova senha *',
              validation: Yup.string()
                .oneOf(
                  [Yup.ref('new_password')],
                  'As senhas digitadas devem ser iguais',
                )
                .required('Este campo não pode ficar em branco')
                .trim(),
            },
            {
              content: () => (
                <Info key="info-pass">
                  Sua senha deve ter pelo menos 8 caracteres, incluir uma letra
                  maiúscula, uma miníscula, um número e um caractere especial.
                </Info>
              ),
            },
          ]}
        />
      </Page>
      {renderUseModal({
        title: 'Tudo certo!',
        message: 'Senha alterada com sucesso!',
        onPress: () => {
          goBack();
        },
      })}
    </>
  );
};

export default ChangePassword;
