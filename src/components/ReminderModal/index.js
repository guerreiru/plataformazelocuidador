import React, { useState } from 'react';

import Modal from '../Modal';
import {
  ButtonModal,
  TextButtonModal,
  ContainerButton,
  ContainerTimePicker,
} from './styles';

import TimePicker from '../TimePicker';
import useReminder from '../../hooks/useReminder';
import useSenior from '../../hooks/useSenior';
import useCarePlan from '../../hooks/useCarePlan';

const ReminderModal = () => {
  const [time, setTime] = useState('00:00');
  const [ok, setOk] = useState(false);
  const { reminderState, setReminderState } = useReminder();
  const { senior } = useSenior();
  const { updateCarePlanSchedule } = useCarePlan();

  return (
    <>
      <Modal
        visible={reminderState}
        title="Deseja alterar o horário dos lembretes da rotina?"
        message={`Escolha um horário para ser lembrado(a) de verificar a rotina de cuidados ${
          senior.gender === 'MASCULINO' ? 'do Sr.' : 'da Srª.'
        } ${senior.full_name}.`}
        footer={
          <ContainerButton>
            <ButtonModal
              onPress={() => {
                updateCarePlanSchedule(senior, time);
                setReminderState();
                setOk(true);
              }}>
              <TextButtonModal>CONFIMAR HORÁRIO</TextButtonModal>
            </ButtonModal>
            <ButtonModal onPress={() => setReminderState()}>
              <TextButtonModal>CANCELAR</TextButtonModal>
            </ButtonModal>
          </ContainerButton>
        }>
        <ContainerTimePicker>
          <TimePicker minInc={1} onChange={(value) => setTime(value)} />
        </ContainerTimePicker>
      </Modal>

      <Modal
        visible={ok}
        title="Pronto!"
        message={`Vamos te lembrar de verificar a rotina de cuidados às ${time}!`}
        footer={
          <ContainerButton>
            <ButtonModal
              onPress={() => {
                setTime('00:00');
                setOk(false);
              }}>
              <TextButtonModal>OK</TextButtonModal>
            </ButtonModal>
          </ContainerButton>
        }
      />
    </>
  );
};

export default ReminderModal;
