import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import ProfileHeader from 'components/ProfileHeader';
import ModalConfirm from 'components/Modal/ModalConfirm';
import ButtonLeaked from 'components/Buttons/ButtonLeaked';
import ButtonLink from 'components/Buttons/ButtonLink';
import THE_SENIOR from 'utils/formatSenior';
import useSenior from 'hooks/useSenior';
import useReport from 'hooks/useReport';
import colors from 'styles/colors';
import Page from 'components/Page';
import Item from 'components/Item';

import { Container, ContainerButton } from './styles';

const Profile = ({ route }) => {
  const { user } = useSelector((state) => state.auth);
  const { seniorId, source } = route.params;
  const { senior, getSenior } = useSenior();
  const [reportBase64, setReportBase64] = useState(null);
  const [isResponsible, setIsResponsible] = useState(false);

  useEffect(() => {
    const _isResponsible = senior?.caregiver?.some((c) => c.id === user.id);

    setIsResponsible(_isResponsible);
  }, [user, senior]);

  const { setUseModal, renderModal, getReportGeneral, renderModalViewPDF } =
    useReport();
  const { navigate } = useNavigation();
  const [confirm, setConfirm] = useState(false);

  const getProfile = async () => {
    if (source !== 'WARNING') {
      await getSenior(seniorId);
    }
  };

  const requestReport = async () => {
    const { base64 } = await getReportGeneral(senior.id);
    if (base64) {
      setReportBase64(base64);
      setUseModal();
    }
  };

  const checkSeniorHaveRequiredFieldsToExam = () => {
    const { blood_type, public_place, name_health_insurance } = senior;

    if (
      blood_type === null ||
      public_place === null ||
      name_health_insurance === null
    ) {
      navigate({
        name: 'RequiredFields',
        params: { senior },
      });
      return;
    }
    navigate('Exams');
  };

  useEffect(() => {
    getProfile();
  }, [seniorId]);

  const renderModalConfirm = () => {
    if (!confirm) {
      return null;
    }
    return (
      <ModalConfirm
        title={'Tem certeza disso?'}
        message={`Você deixará de fazer parte da equipe de cuidados ${
          THE_SENIOR.THE_TREATMENT_PRONOUN[senior.gender]
        } ${senior.full_name}`}
        textButtonSucess={'CONFIRMAR'}
        confirmChange={confirm}
        onPressCancel={() => {
          setConfirm(false);
        }}
        onPressConfirm={() => {
          setConfirm(false);
          navigate('DisengageReasons');
        }}
      />
    );
  };

  const itens = [
    {
      key: 1,
      title: 'Dados pessoais',
      description: 'Acesse e mantenha atualizados os dados pessoais',
      iconLeft: 'account-box',
      disabled: !isResponsible,
      onPress: () => navigate('PersonalData'),
    },
    {
      key: 2,
      title: 'Avaliação clínico-funcional',
      description: 'Saiba mais sobre a saúde da \npessoa de quem você cuida',
      iconLeft: 'profile',
      IconLib: AntDesign,
      onPress: () => navigate('ClinicalFunctionalEvaluation'),
    },
    {
      key: 3,
      title: 'Medicamentos',
      description:
        'Acompanhe os medicamentos em uso e o registro de medicamentos',
      iconLeft: 'pill',
      IconLib: MaterialCommunityIcons,
      onPress: () => navigate('Medicines'),
    },
    {
      key: 4,
      title: 'Exames',
      description:
        'Acompanhe os medicamentos em uso e o registro de medicamentos',
      iconLeft: 'biotech',
      IconLib: MaterialIcons,
      onPress: () => checkSeniorHaveRequiredFieldsToExam(),
    },
    {
      key: 5,
      title: 'Rotina de Cuidados',
      description:
        'Confira quais são as ações e instruções da rotina de cuidados\n para hoje',
      iconLeft: 'calendar-blank',
      IconLib: MaterialCommunityIcons,
      onPress: () => navigate('CarePlan'),
    },
    {
      key: 6,
      title: 'Intercorrências',
      description:
        'Acompanhe as intercorrências registradas pelos profissionais de saúde',
      iconLeft: 'error-outline',
      onPress: () => navigate('Intercurrence'),
    },
    {
      key: 7,
      title: 'Equipes',
      description:
        'Acesse a lista de pessoas que também fazem parte da equipe de cuidados',
      iconLeft: 'group',
      onPress: () => navigate('Teams'),
    },
  ];

  const renderButton = () => {
    if (senior.caregiver.length > 0 && senior.caregiver[0].id !== user.id) {
      return (
        <ContainerButton>
          <ButtonLeaked
            label={'DESVINCULAR-SE'}
            borderColor={colors.ERROR}
            textColor={colors.ERROR}
            onPress={() => setConfirm(true)}
          />
        </ContainerButton>
      );
    }
    return null;
  };

  if (!senior || !senior.birthdate) {
    return null;
  }

  return (
    <>
      <Page hasSidePadding={false} simple={false}>
        <Container>
          <ProfileHeader
            full_name={senior.full_name}
            birthdate={senior.birthdate}
            nickname={senior.nickname}
            gender={senior.gender}
            colorTitle={colors.TITLE}
          />
          <ButtonLink
            label={'GERAR RELATÓRIO'}
            color={colors.PRIMARY}
            onPress={() => requestReport()}
          />
        </Container>
        {itens
          .filter((item) => !item.disabled)
          .map((item, index) => (
            <Item key={index} {...item} />
          ))}
        {renderButton()}
      </Page>
      {renderModal('Relatório da pessoa idosa', reportBase64)}
      {renderModalViewPDF(reportBase64)}
      {renderModalConfirm()}
    </>
  );
};

export default Profile;
