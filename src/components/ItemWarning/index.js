import React from 'react';
import { fromNow } from '../../utils/date';
import { useNavigation } from '@react-navigation/native';
import AlertTypesCaregiver from '../../enums/AlertTypesCaregiver';
import THE_SENIOR from '../../utils/formatSenior';

import { shortString } from '../../utils/formatString';

import {
  Container,
  SubContainer,
  DescriptionSenior,
  ContainerDescription,
  Title,
  SubContainerDescription,
  Description,
  IconFontAwesome5,
  IconAntDesign,
  DateTime,
  IconMaterialCommunityIcons,
  Icon,
} from './styles';

const ItemWarning = ({ item }) => {
  const { navigate } = useNavigation();

  const renderIcon = () => {
    if (
      [
        AlertTypesCaregiver.DISENGAGE_PROFESSIONAL,
        AlertTypesCaregiver.ENGAGE_SENIOR_BY_PROFESSIONAL,
        AlertTypesCaregiver.NEW_PROFESSIONAL,
        AlertTypesCaregiver.REENGAGE_PROFESSIONAL,
      ].includes(item.type_alert_caregiver)
    ) {
      return <Icon name={'people'} />;
    }

    if (
      [
        AlertTypesCaregiver.NEW_HEALTH_PROBLEM,
        AlertTypesCaregiver.NEW_DIAGNOSIS,
      ].includes(item.type_alert_caregiver)
    ) {
      return <IconAntDesign name={'profile'} />;
    }

    if (
      [
        AlertTypesCaregiver.NEW_CARE_PLAN,
        AlertTypesCaregiver.CHANGE_PLAN_CARE,
      ].includes(item.type_alert_caregiver)
    ) {
      return <IconFontAwesome5 name={'calendar'} />;
    }

    if (AlertTypesCaregiver.CHANGE_MEDICINE === item.type_alert_caregiver) {
      return <IconMaterialCommunityIcons name={'pill'} />;
    }

    if (
      [
        AlertTypesCaregiver.NEW_INTERCURRENCE,
        AlertTypesCaregiver.CHANGE_INTERCURRENCE,
      ].includes(item.type_alert_caregiver)
    ) {
      return <IconAntDesign name={'exclamationcircleo'} />;
    }

    return <IconAntDesign name={'contacts'} />;
  };

  return (
    <Container
      backgroundColor={item.caregiver_alert[0].read_date}
      onPress={() => navigate('WarningMessage', { item: item })}>
      {renderIcon()}
      <SubContainer>
        <ContainerDescription>
          <Title>{item.type_alert_caregiver}</Title>
          <SubContainerDescription>
            <DescriptionSenior>{`Pessoa Idosa: `}</DescriptionSenior>
            <Description>{`${
              THE_SENIOR.THE_TREATMENT_PRONOUN[item.senior.gender]
            } ${shortString(item.senior.full_name, 2)}`}</Description>
          </SubContainerDescription>
          <DateTime>{fromNow(item.created_at)}</DateTime>
        </ContainerDescription>
      </SubContainer>
    </Container>
  );
};

export default ItemWarning;
