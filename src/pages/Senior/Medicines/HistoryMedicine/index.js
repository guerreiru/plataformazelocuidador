import React from 'react';

import formatNameMedicine from 'utils/formatMedicine';
import ButtonLink from 'components/Buttons/ButtonLink';
import ItemList from 'components/Items/ItemList';
import Page from 'components/Page';

import { formatDate } from 'utils';

import { Divider, Title, ContainerTitle, SubTitle, Row } from './styles';

const HistoryMedicine = ({ route, navigation }) => {
  const { item } = route.params;
  const { navigate } = navigation;

  const renderEvent = {
    Incluído: 'Incluído',
    Alterado: 'Alterado',
    Excluído: 'Excluído',
  };

  const getNameProfessionalCreateMedicine = (_item) => {
    if (_item && _item.professional_full_name) {
      return _item.professional_full_name;
    } else {
      return 'Não informado';
    }
  };

  const renderInformation = () => {
    const elements = [
      {
        title: 'Concentração',
        value: formatNameMedicine(item.concentration),
      },
      {
        title: 'Quantidade',
        value: item.quantity,
      },
      {
        title: 'Forma farmacêutica',
        value: item.pharmaceutical_form,
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
        value: item.medicine_note,
      },
    ];

    return <ItemList list={elements} />;
  };

  return (
    <Page hasSidePadding={false}>
      <ContainerTitle>
        <Title>{formatNameMedicine(item.medicine_name)}</Title>
        <SubTitle>{`${renderEvent[item.event]} em ${formatDate(
          item.created_at,
        )}`}</SubTitle>
        <Row>
          <SubTitle>Por </SubTitle>
          <ButtonLink
            onPress={() => {
              const params = {
                name: 'Profissional de saúde',
                item: { id: item.professional_id },
                hasProfessional: true,
              };
              navigate('ViewProfile', params);
            }}
            label={getNameProfessionalCreateMedicine(item)}
          />
        </Row>
      </ContainerTitle>
      <Divider />
      {renderInformation()}
    </Page>
  );
};

export default HistoryMedicine;
