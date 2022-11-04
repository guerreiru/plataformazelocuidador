import React, { useLayoutEffect, useState } from 'react';
import { useNavigation, StackActions } from '@react-navigation/native';

import { basicFieldsCaregiver, fieldAccompaniesSince } from 'forms/Caregiver';
import { Title } from './styles';
import CaregiverCategories from 'enums/CaregiverCategories';
import useSenior from 'hooks/useSenior';
import useModal from 'hooks/useModal';
import MyForm from 'components/Forms';
import useAuth from 'hooks/useAuth';
import Page from 'components/Page';

const RegisterCaregiver = ({ route }) => {
  const { type_caregiver } = route.params;
  const { setOptions } = useNavigation();
  const { storeAndSendInvitation } = useAuth(false);
  const { senior } = useSenior();
  const [name, setName] = useState('');
  const { setUseModal, renderUseModal } = useModal();

  const navigation = useNavigation();

  async function handelSubmit(data) {
    setName(data.full_name);
    const response = await storeAndSendInvitation({
      ...data,
      senior_id: senior.id,
    });

    if (response) {
      setUseModal();
    }
  }

  const getScreenName = () => {
    switch (type_caregiver) {
      case CaregiverCategories.CAREGIVER:
        return 'Caregivers';
      case CaregiverCategories.FAMILY:
        return 'Relatives';
    }
  };

  const getTitlePage = () => {
    return `Convidar ${type_caregiver}`;
  };
  useLayoutEffect(() => {
    setOptions({
      title: getTitlePage(),
    });
  }, [type_caregiver]);

  return (
    <Page>
      <Title>
        Precisamos de algumas informações para enviar um convite de cadastro.{' '}
      </Title>
      <MyForm
        onSubmit={handelSubmit}
        submitText="ENVIAR CONVITE"
        fields={
          type_caregiver === CaregiverCategories.FAMILY
            ? basicFieldsCaregiver()
            : [...basicFieldsCaregiver(), ...fieldAccompaniesSince()]
        }
      />
      {renderUseModal({
        title: `${type_caregiver} convidado com sucesso!`,
        message: `Enviamos um e-mail para ${name}. Vamos te avisar quando o convite for aceito!`,
        onPress: () => {
          const popToTopAction = StackActions.pop(3);
          Promise.all([navigation.dispatch(popToTopAction)]).then(() =>
            navigation.navigate('Teams', { screen: getScreenName() }),
          );
        },
      })}
    </Page>
  );
};

export default RegisterCaregiver;
