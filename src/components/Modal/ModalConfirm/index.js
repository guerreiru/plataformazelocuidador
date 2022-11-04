import React from 'react';
import { ButtonModal, TextButtonModal } from './styles';
import Modal from '../index';

const ModalConfirm = ({
  title = '',
  message = '',
  onPressCancel = () => {},
  onPressConfirm = () => {},
  confirmChange = true,
  textButtonCancel = 'CANCELAR',
  textButtonSucess = 'SALVAR',
}) => {
  return (
    <Modal
      title={title}
      message={message}
      visible={confirmChange}
      footer={
        <>
          {!!textButtonCancel && (
            <ButtonModal onPress={() => onPressCancel()}>
              <TextButtonModal>{textButtonCancel}</TextButtonModal>
            </ButtonModal>
          )}
          {!!textButtonSucess && (
            <ButtonModal onPress={() => onPressConfirm()}>
              <TextButtonModal>{textButtonSucess}</TextButtonModal>
            </ButtonModal>
          )}
        </>
      }
    />
  );
};

export default ModalConfirm;
