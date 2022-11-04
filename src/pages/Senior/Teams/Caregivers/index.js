import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { Container, Title } from './styles';
import CaregiverCategories from 'enums/CaregiverCategories';
import NoInformation from 'components/NoInformation';
import ButtonFloat from 'components/Buttons/ButtonFloat';
import THE_SENIOR from 'utils/formatSenior';
import useSenior from 'hooks/useSenior';
import useModal from 'hooks/useModal';
import useTeam from 'hooks/useTeam';
import TeamImg from 'Images/team.png';
import Item from '../Item';

const Caregivers = ({ route }) => {
  const { teams } = useTeam();
  const { caregivers } = teams;
  const { senior } = useSenior();
  const { navigate } = useNavigation();
  const { renderUseModal, setUseModal } = useModal();
  const { user } = useSelector((state) => state.auth);

  const renderButtonFloat = () => {
    if (
      senior &&
      senior.caregiver.length > 0 &&
      senior.caregiver[0].id === user.id
    ) {
      return (
        <ButtonFloat
          onPress={() => {
            if (senior.death_date) {
              setUseModal();
            } else {
              navigate('CheckCPF', {
                type_caregiver: CaregiverCategories.CAREGIVER,
              });
            }
          }}
        />
      );
    }
    return null;
  };

  return (
    <>
      {caregivers && caregivers.length > 0 ? (
        <Container>
          <Title>Cuidadores</Title>
          {caregivers.map((caregiver, i) => (
            <Item
              key={i}
              item={caregiver}
              hasProfessional={false}
              typeCaregiver={CaregiverCategories.CAREGIVER}
              senior={senior}
            />
          ))}
        </Container>
      ) : (
        <NoInformation
          description={`Ops... ${
            THE_SENIOR.THE_TREATMENT_PRONOUN[senior.gender.toUpperCase()]
          } ${
            senior.full_name
          } ainda não tem cuidadores na equipe de cuidados. Você pode adicionar novos membros à equipe de cuidados clicando no botão "+".`}
          imag={TeamImg}
        />
      )}

      {renderButtonFloat()}
      {renderUseModal({
        title: 'Atenção',
        message:
          'Foi registrado um óbito para o idoso. Por isso, não é possível inserir nem editar dados relacionados a esse Idoso.',
      })}
    </>
  );
};

export default Caregivers;
