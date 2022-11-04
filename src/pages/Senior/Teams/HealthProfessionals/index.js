import React from 'react';

import { Container, Title } from './styles';
import NoInformation from 'components/NoInformation';
import THE_SENIOR from 'utils/formatSenior';
import useSenior from 'hooks/useSenior';
import TeamImg from 'Images/team.png';
import useTeam from 'hooks/useTeam';
import Item from '../Item';

const HealthProfessionals = () => {
  const { teams } = useTeam();
  const { professionals } = teams;
  const { senior } = useSenior();

  return (
    <>
      {professionals && professionals.length > 0 ? (
        <Container>
          <Title>Profissionais de saúde</Title>
          {professionals.map((professional, i) => (
            <Item key={i} item={professional} senior={senior} />
          ))}
        </Container>
      ) : (
        <NoInformation
          description={`Ops... ${
            THE_SENIOR.THE_TREATMENT_PRONOUN[senior.gender.toUpperCase()]
          } ${
            senior.full_name
          } ainda não tem profissionais de saúde na equipe de cuidados.`}
          imag={TeamImg}
        />
      )}
    </>
  );
};

export default HealthProfessionals;
