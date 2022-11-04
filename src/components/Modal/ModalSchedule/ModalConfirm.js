import React from 'react';
import Modal from '../index';

import { IntervalHours, TextButtonModal, ButtonModal } from './styles';

const ModalSchedule = ({
  title = '',
  message = '',
  messageIntervalHours = '00:00, 08:00 e 16:00.',
  onPressCancel = () => {},
  onPressConfirm = () => {},
  confirmChange = false,
}) => {
  return (
    <Modal
      title={title}
      message={message}
      visible={confirmChange}
      children={
        <>
          <IntervalHours>{messageIntervalHours}</IntervalHours>
        </>
      }
      footer={
        <>
          <ButtonModal onPress={() => onPressCancel()}>
            <TextButtonModal>CANCELAR</TextButtonModal>
          </ButtonModal>
          <ButtonModal onPress={() => onPressConfirm()}>
            <TextButtonModal>CONFIRMAR</TextButtonModal>
          </ButtonModal>
        </>
      }
    />
  );
};

export default ModalSchedule;
