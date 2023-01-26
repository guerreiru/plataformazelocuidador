import React, { useEffect } from 'react';
import { useNavigation, CommonActions } from '@react-navigation/native';
import Page from 'components/Page';
import useSenior from 'hooks/useSenior';
import colors from '../../../../styles/colors';

import {
  Header,
  Text,
  RequiredFieldsList,
  Item,
  ButtonStyled,
  Icon,
  IconContainer,
} from './styles';

const RequiredFields = ({ navigation }) => {
  const { senior } = useSenior();
  const { navigate } = useNavigation();
  const isFocused = navigation.isFocused();

  const checkSeniorHaveRequiredFieldsToExam = () => {
    const { blood_type, public_place, name_health_insurance } = senior;
    const haveRequiredFieldsToExam =
      blood_type && public_place && name_health_insurance;

    if (haveRequiredFieldsToExam) {
      navigation.dispatch(
        CommonActions.reset({
          index: 2,
          routes: [
            { name: 'Home' },
            {
              name: 'Profile',
              params: {
                seniorId: senior.id,
                source: 'HOME',
              },
            },
            { name: 'Exams' },
          ],
        }),
      );
      return;
    }
    return;
  };

  useEffect(() => {
    checkSeniorHaveRequiredFieldsToExam();
  }, [isFocused]);

  const RenderButtonFill = ({ value }) => {
    if (value) {
      return <Icon name="check-circle" color={colors.TEXT_GRAY} size={24} />;
    }
    return (
      <ButtonStyled
        label="Preencher"
        onPress={() => navigate('PersonalData')}
      />
    );
  };

  return (
    <Page hasSidePadding={false}>
      <Header>Solicitações de Exame</Header>
      <Text>
        Preencha os dados abaixo para que os exames {'\n'} possam ser
        solicitados pela Equipe de Saúde
      </Text>

      <RequiredFieldsList>
        <Item>
          <IconContainer>
            <Icon name="house" />
            <Text>Endereço</Text>
          </IconContainer>
          <RenderButtonFill value={senior.public_place} />
        </Item>
        <Item>
          <IconContainer>
            <Icon name="local-hospital" />
            <Text>Plano de Saúde</Text>
          </IconContainer>

          <RenderButtonFill value={senior.name_health_insurance} />
        </Item>
        <Item>
          <IconContainer>
            <Icon name="opacity" />
            <Text>Tipo Sanguíneo</Text>
          </IconContainer>

          <RenderButtonFill value={senior.blood_type} />
        </Item>
      </RequiredFieldsList>
    </Page>
  );
};

export default RequiredFields;
