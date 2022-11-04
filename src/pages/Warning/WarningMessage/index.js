import React, { useState, useEffect } from 'react';
import { useNavigation, StackActions } from '@react-navigation/native';

import { getTime } from 'utils/date';
import AlertTypesCaregiver from 'enums/AlertTypesCaregiver';
import useWarning from 'hooks/useWarning';
import useSenior from 'hooks/useSenior';
import Button from 'components/Buttons/Button';
import Page from 'components/Page';
import imag from 'Images/icone_aviso.png';

import { Container, Description, Imag, Title, DateTime } from './styles';

const WarningMessage = ({ route }) => {
  const { item } = route.params;
  const { setRead } = useWarning();
  const popToTopAction = StackActions.popToTop();
  const navigation = useNavigation();
  const [buttonLabel, setButtonLabel] = useState('OK');
  const [routeName, setRouteName] = useState('');
  const { getSenior, senior } = useSenior();

  const getNameButtonLabel = () => {
    if (
      [
        AlertTypesCaregiver.DISENGAGE_PROFESSIONAL,
        AlertTypesCaregiver.ENGAGE_SENIOR_BY_PROFESSIONAL,
        AlertTypesCaregiver.NEW_PROFESSIONAL,
        AlertTypesCaregiver.REENGAGE_PROFESSIONAL,
      ].includes(item.type_alert_caregiver)
    ) {
      setRouteName('Teams');
      return 'VER EQUIPE DE CUIDADOS';
    }

    if (
      [
        AlertTypesCaregiver.NEW_HEALTH_PROBLEM,
        AlertTypesCaregiver.NEW_DIAGNOSIS,
      ].includes(item.type_alert_caregiver)
    ) {
      setRouteName('ClinicalFunctionalEvaluation');
      return 'VER AVALIAÇÃO CLÍNICO-FUNCIONAL';
    }

    if (
      [
        AlertTypesCaregiver.NEW_CARE_PLAN,
        AlertTypesCaregiver.CHANGE_PLAN_CARE,
      ].includes(item.type_alert_caregiver)
    ) {
      setRouteName('CarePlan');
      return 'VER ROTINA DE CUIDADOS';
    }

    if (AlertTypesCaregiver.CHANGE_MEDICINE === item.type_alert_caregiver) {
      setRouteName('Medicines');
      return 'VER MEDICAMENTOS';
    }

    if (
      [
        AlertTypesCaregiver.NEW_INTERCURRENCE,
        AlertTypesCaregiver.CHANGE_INTERCURRENCE,
      ].includes(item.type_alert_caregiver)
    ) {
      setRouteName('Intercurrence');
      return 'VER INTERCORRÊNCIAS';
    }

    setRouteName('Profile');
    return 'OK';
  };

  const markAsRead = async () => {
    if (
      item.caregiver_alert &&
      item.caregiver_alert.length > 0 &&
      item.caregiver_alert[0].read_date === null
    ) {
      await setRead(item.caregiver_alert[0].id);
    }
  };

  useEffect(() => {
    const _label = getNameButtonLabel();
    setButtonLabel(_label);
    markAsRead();
  }, [item]);

  return (
    <Page simple={false}>
      <Container>
        <Imag source={imag} resizeMode="contain" />
        <Title>{item.type_alert_caregiver}</Title>
        <Description>{item.description_caregiver}</Description>
        <DateTime>{getTime(item.created_at)}</DateTime>
        <Button
          label={buttonLabel}
          onPress={async () => {
            await getSenior(item.senior.id);
            if (senior) {
              Promise.all([navigation.dispatch(popToTopAction)])
                .then(() => {
                  navigation.navigate('Home', {
                    initial: false,
                    screen: 'Profile',
                    params: { source: 'WARNING', seniorId: item.senior.id },
                  });
                })
                .then(() => {
                  navigation.navigate(routeName);
                });
            }
          }}
        />
      </Container>
    </Page>
  );
};

export default WarningMessage;
