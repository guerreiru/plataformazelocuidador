import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import formatNameMedicine from 'utils/formatMedicine';
import useModalSchedule from 'hooks/useModalSchedule';
import ContainerItem from '../ContainerItem';
import ButtonLink from '../Buttons/ButtonLink';
import useTeam from 'hooks/useTeam';
import InfoBox from './InfoBox';

import { Description, Label, Text, Area, Header } from './styles';
import { calcHoursByISO } from 'utils';
import CaregiverCategories from 'enums/CaregiverCategories';
import useSenior from 'hooks/useSenior';
import useModal from 'hooks/useModal';
import Tooltip from 'components/Tooltip';
import { ContainerButton } from './styles';

const ItemMedicine = ({
  item,
  index,
  onPress,
  hasButtonChangeTime = true,
  sourceScreen = 'MEDICINE',
}) => {
  const { renderModalSchedule } = useModalSchedule(item);
  const { user } = useSelector((state) => state.auth);
  const { senior } = useSenior();
  const { getMember, member } = useTeam();
  const { navigate } = useNavigation();
  const { renderUseModal, setUseModal } = useModal();
  const loadMember = async () => await getMember(senior.id, user.id, false);

  useEffect(() => {
    loadMember();
  }, [user]);

  const renderNote = (_item) => {
    if (_item.note) {
      return (
        <Label>
          Instruções: <Text>{_item.note}</Text>
        </Label>
      );
    }
    return null;
  };

  const renderButton = () => {
    if (
      member.type_caregiver &&
      member.type_caregiver !== CaregiverCategories.FAMILY
    ) {
      if (item.duration === 'SE NECESSÁRIO') {
        return (
          <Tooltip
            message={`Esse medicamento está definido para uso "se necessário".\nNão é possível criar agendamentos para esse tipo de prescrição.`}>
            <ContainerButton>
              <ButtonLink
                label={
                  hasButtonChangeTime ? 'ALTERAR LEMBRETE' : 'DEFINIR LEMBRETE'
                }
                disabled
              />
            </ContainerButton>
          </Tooltip>
        );
      }
      return (
        <ButtonLink
          label={hasButtonChangeTime ? 'ALTERAR LEMBRETE' : 'DEFINIR LEMBRETE'}
          onPress={() => {
            if (senior.death_date) {
              setUseModal();
            } else {
              navigate('Reminder', {
                medicine: item,
                sourceScreen: sourceScreen,
              });
            }
          }}
        />
      );
    }
  };

  const renderInfo = (_item) => {
    if (
      !_item.reference_time &&
      member.type_caregiver &&
      member.type_caregiver !== CaregiverCategories.FAMILY
    ) {
      return (
        <InfoBox>
          Clique em "DEFINIR LEMBRETE" para definir os horários dos lembretes do
          medicamento.
        </InfoBox>
      );
    }
    return null;
  };

  return (
    <>
      <ContainerItem key={index} onPress={onPress}>
        <Header>
          <Description>{formatNameMedicine(item.name)}</Description>
          {renderInfo(item)}
        </Header>
        <Label>
          Horários:{' '}
          <Text>
            {calcHoursByISO(item.reference_time, item.administration_interval)}
          </Text>
        </Label>

        <Area>
          <Label>
            Concentração: <Text>{item.concentration.toLowerCase()}</Text>
          </Label>
          <Label>
            Forma farmacêutica:{' '}
            <Text>{item.pharmaceutical_form.toLowerCase()}</Text>
          </Label>
          <Label>
            Quantidade: <Text>{item.quantity}</Text>
          </Label>
          <Label>
            Via de administração:{' '}
            <Text>{item.administration_route.toLowerCase()}</Text>
          </Label>
          {renderNote(item)}
        </Area>
        {renderButton()}
      </ContainerItem>
      {renderModalSchedule()}
      {renderUseModal({
        title: 'Atenção',
        message:
          'Foi registrado um óbito para o idoso. Por isso, não é possível inserir nem editar dados relacionados a esse Idoso.',
      })}
    </>
  );
};

export default ItemMedicine;
