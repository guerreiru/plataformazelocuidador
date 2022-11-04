import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import CaregiverCategories from 'enums/CaregiverCategories';
import formatNameMedicine from 'utils/formatMedicine';
import ButtonLink from 'components/Buttons/ButtonLink';
import useSenior from 'hooks/useSenior';
import ItemList from 'components/Items/ItemList';
import useTeam from 'hooks/useTeam';
import Page from 'components/Page';
import Tooltip from 'components/Tooltip';

import { formatDate } from 'utils';

import {
  Divider,
  Title,
  ContainerTitle,
  SubTitle,
  ContainerButton,
  Row,
} from './styles';

const ViewMedicine = ({ route, navigation }) => {
  const { item } = route.params;
  const { navigate } = navigation;
  const { user } = useSelector((state) => state.auth);
  const { senior } = useSenior();
  const { getMember, member } = useTeam();

  const loadMember = async () => await getMember(senior.id, user.id, false);

  useEffect(() => {
    loadMember();
  }, [user]);

  const getNameProfessionalCreateMedicine = (_item) => {
    if (_item && _item.professional && _item.professional.full_name) {
      return _item.professional.full_name;
    } else {
      return 'Não informado';
    }
  };

  const renderButtom = () => {
    if (
      member.type_caregiver &&
      member.type_caregiver !== CaregiverCategories.FAMILY
    ) {
      const label = item.reference_time
        ? 'ALTERAR HORÁRIO'
        : 'DEFINIR LEMBRETE';
      if (item.duration === 'SE NECESSÁRIO') {
        return (
          <Tooltip
            message={`Esse medicamento está definido para uso "se necessário".\nNão é possível criar agendamentos para esse tipo de prescrição.`}>
            <ContainerButton>
              <ButtonLink label={label} disabled />
            </ContainerButton>
          </Tooltip>
        );
      }
      return (
        <ContainerButton>
          <ButtonLink
            label={label}
            onPress={() => {
              navigate('Reminder', { medicine: item });
            }}
          />
        </ContainerButton>
      );
    }
    return null;
  };

  const renderInformation = () => {
    const elements = [
      {
        title: 'Concentração',
        value: formatNameMedicine(item.concentration),
      },
      {
        title: 'Forma farmacêutica',
        value: item.pharmaceutical_form,
      },
      {
        title: 'Quantidade',
        value: item.quantity,
      },
      {
        title: 'Via de administração',
        value: item.administration_route,
      },
      {
        title: 'Intervalo',
        value: item.administration_interval,
      },
      {
        title: 'Duração',
        value: formatNameMedicine(item.duration),
      },
      {
        title: 'Instruções',
        value: item.note,
      },
    ];

    return <ItemList list={elements} />;
  };

  return (
    <Page hasSidePadding={false}>
      <ContainerTitle>
        <Title>{formatNameMedicine(item.name)}</Title>
        <SubTitle>{`Incluído em ${formatDate(item.created_at)}`}</SubTitle>
        <Row>
          <SubTitle>Por </SubTitle>
          <ButtonLink
            onPress={() => {
              const params = {
                name: 'Profissional de saúde',
                item: item.professional,
                hasProfessional: true,
              };
              navigate('ViewProfile', params);
            }}
            label={getNameProfessionalCreateMedicine(item)}
          />
        </Row>
        {renderButtom()}
      </ContainerTitle>
      <Divider />
      {renderInformation()}
    </Page>
  );
};

export default ViewMedicine;
