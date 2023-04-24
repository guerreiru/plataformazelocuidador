import React from 'react';

import IntercurrenceTypes from 'enums/Intercurrence';
import ButtonLink from 'components/Buttons/ButtonLink';
import ItemList from 'components/Items/ItemList';
import Page from 'components/Page';

import { formatDate } from 'utils';

import { Divider, Title, ContainerTitle, SubTitle, Row } from './styles';

const ViewIntercurrence = ({ route, navigation }) => {
  const { item } = route.params;
  const { navigate } = navigation;

  const getNameProfessionalCreateMedicine = (_item) => {
    if (_item && _item.full_name) {
      return _item.full_name;
    } else {
      return 'Não informado';
    }
  };

  function renderInfo() {
    let elements = [
      {
        title: 'Ocorreu em',
        value: formatDate(item.date),
      },
    ];

    switch (item.intercurrence_type) {
      case IntercurrenceTypes.INFECTION:
        elements.push(
          ...[
            {
              title: 'Antimicrobiano utilizado',
              value: item.infection_antimicrobial,
            },
            {
              title: 'Concentração',
              value: item.infection_drug_concentration,
            },
            {
              title: 'Forma farmacêutica',
              value: item.infection_drug_pharmaceutical_form,
            },
            {
              title: 'Quantidade',
              value: item.infection_drug_quantity,
            },
            {
              title: 'Via de administração',
              value: item.infection_drug_administration_route,
            },
            {
              title: 'Intervalo',
              value: item.infection_drug_administration_interval,
            },
            {
              title: 'Duração',
              value: item.infection_drug_usage_time,
            },
          ],
        );
        break;
      case IntercurrenceTypes.HOSPITALIZATION:
        const day = item.hospitalization_number_of_day
          ? `${item.hospitalization_number_of_day} dias`
          : null;
        elements.push(
          ...[
            {
              title: 'Nome do hospital',
              value: item.hospitalization_name,
            },
            {
              title: 'Motivo da internação',
              value: item.hospitalization_reason,
            },
            {
              title: 'Quantidade de dias',
              value: day,
            },
          ],
        );
        break;
      case IntercurrenceTypes.DEATH:
        elements.push(
          ...[
            {
              title: 'Local',
              value: item.hospitdeath_placealization_name,
            },
            {
              title: 'Causa imediata',
              value: item.death_immediate_cause,
            },
            {
              title: 'Causa intermediária',
              value: item.death_intermediate_cause,
            },
            {
              title: 'Causa básica',
              value: item.death_basic_cause,
            },
          ],
        );
        break;
      default:
        elements.push(
          ...[
            {
              title: 'Observações',
              value: item.custom_description || "a",
            },
        ])
    }

    return <ItemList list={elements} />;
  }

  return (
    <Page hasSidePadding={false}>
      <ContainerTitle>
        <Title>
          {item.intercurrence_type}
          {item.intercurrence_type === 'Infecção' &&
            ` (${item.infection_site})`}
        </Title>
        <SubTitle>{`Registrada em ${formatDate(item.created_at)}`}</SubTitle>
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

      {renderInfo()}
    </Page>
  );
};

export default ViewIntercurrence;
