import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { message } from 'utils';
import { Title } from 'components/Typografy';
import ButtonLeaked from 'components/Buttons/ButtonLeaked';
import ModalConfirm from 'components/Modal/ModalConfirm';
import ButtonLink from 'components/Buttons/ButtonLink';
import useModal from 'hooks/useModal';
import useAuth from 'hooks/useAuth';
import colors from 'styles/colors';
import Item from 'components/Item';
import Page from 'components/Page';

import { List, ContainerButton, ContainerButtonLink } from './styles';

export default function Setting() {
  const navigation = useNavigation();
  const { user, logout, deactivateAccount, isCaregiverResponsible } =
    useAuth(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const { renderUseModal, setUseModal } = useModal();
  const [optionsModal, setOptionsModal] = useState({
    title: '',
    message: '',
    onPress: () => {},
  });

  function navigate(page) {
    navigation.navigate(page);
  }

  const _deactivateAccount = async () => {
    const responseIsCaregiverResponsible = await isCaregiverResponsible();
    if (
      responseIsCaregiverResponsible &&
      !responseIsCaregiverResponsible.isCaregiverResponsible
    ) {
      const response = await deactivateAccount();
      if (response) {
        setOptionsModal({
          title: 'Conta desativada com sucesso!',
          message: 'Você será redirecionado para a tela de login',
          onPress: () => {
            logout();
          },
        });
      }
    } else {
      setOptionsModal({
        title: 'Atenção',
        message:
          ' Entre em contato com a Equipe de Saúde ou o suporte da Plataforma Zelo Saúde para vincular outro responsável à pessoa idosa e em seguida prosseguir com a desativação da sua conta.',
        onPress: () => {},
      });
    }
    setModalVisible(false);
    setUseModal();
  };

  const [itens] = useState([
    {
      key: 1,
      title: 'Dados pessoais',
      description: 'Acesse e atualize seus dados pessoais',
      iconLeft: 'account-box',
      onPress: () => navigate('CaregiverPersonalData'),
    },
    {
      key: 2,
      title: 'Alterar Senha',
      description: 'Altere a senha da sua conta',
      iconLeft: 'vpn-key',
      onPress: () => navigate('ChangePassword'),
    },
    {
      key: 3,
      title: 'Avisos',
      description: 'Configure como deseja receber os avisos',
      iconLeft: 'notifications',
      onPress: () => navigate('NotificationsConfigs'),
    },
    {
      key: 4,
      title: 'Termos de Serviço do Zelo',
      description: 'Leia os termos e condições \n de uso do app',
      iconLeft: 'subject',
      onPress: () => navigate('Terms'),
    },
    {
      key: 5,
      title: 'Sobre o Zelo',
      description: 'Saiba mais sobre o Zelo',
      iconLeft: 'info',
      onPress: () => navigate('About'),
    },
  ]);

  const handlerLogout = async () => {
    if (await message.confirm('Deseja sair?')) {
      logout();
    }
  };

  const renderModalConfirm = () => {
    if (!isModalVisible) {
      return null;
    }
    return (
      <ModalConfirm
        title={'Deseja realmente desativar sua conta?'}
        message={`Atenção: Essa operação não pode ser desfeita pelo aplicativo!`}
        textButtonSucess={'SIM'}
        textButtonCancel={'NÃO'}
        confirmChange={true}
        onPressCancel={() => {
          setModalVisible(false);
        }}
        onPressConfirm={_deactivateAccount}
      />
    );
  };

  return (
    <>
      <Page hasSidePadding={false} simple={true}>
        <Title> {user.full_name} </Title>
        <List
          data={itens}
          keyExtractor={(iten) => String(iten.key)}
          onEndReachedThreshold={0.2}
          renderItem={({ item, index }) => <Item index={index} {...item} />}
        />
        <ContainerButton>
          <ButtonLeaked
            label={'SAIR'}
            textColor={colors.ERROR}
            borderColor={colors.ERROR}
            onPress={handlerLogout}
          />
        </ContainerButton>
        <ContainerButtonLink>
          <ButtonLink
            label={'Desativar conta'}
            fontSize={16}
            onPress={() => {
              setModalVisible(true);
            }}
          />
        </ContainerButtonLink>
      </Page>
      {renderModalConfirm()}
      {renderUseModal(optionsModal)}
    </>
  );
}
