import React, { useState } from 'react';
import ModalSchedule from '../components/Modal/ModalSchedule';
import Modal from '../components/Modal';
import ModalConfirm from '../components/Modal/ModalSchedule/ModalConfirm';

export default function useModalSchedule(item) {
  const [titleModal, setTitleModal] = useState('');
  const [messageModal, setMessageModal] = useState('');

  const [confirm, setConfirm] = useState(false);
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');

  const [confirmChange, setConfirmChange] = useState(false);
  const [confirmOk, setConfirmOk] = useState(false);

  const setModalSchedule = () => {
    setConfirm(true);
  };

  const renderModalSchedule = () => {
    if (confirm) {
      return (
        <ModalSchedule
          onPressConfirm={() => {
            setConfirm(false);
            setConfirmChange(true);
          }}
          hours={hours}
          minutes={minutes}
          setHours={setHours}
          setMinutes={setMinutes}
          title={`Deseja alterar o horário\n da próxima dose?`}
          message={'Digite o novo horário abaixo: '}
          visible={confirm}
          handleChange={() => {
            setHours('00');
            setMinutes('00');
            setConfirm(false);
          }}
        />
      );
    } else if (confirmChange) {
      return (
        //TODO precisamos fazer uma função para calcular o intervalo para mostrar no modal.
        <ModalConfirm
          title="Confirmar alteração no horário?"
          message="Os novos horários das doses serão:"
          messageIntervalHours="00:00, 08:00 e 16:00."
          onPressCancel={() => {
            setTitleModal('Alteração descartada!');
            setMessageModal(
              `Os horários das doses de ${item.name} não foram alterados.`,
            );
            setConfirmChange(false);
            setConfirmOk(true);

            setHours('00');
            setMinutes('00');
          }}
          onPressConfirm={() => {
            setTitleModal('Pronto!');
            setMessageModal(
              `Os horários das doses de ${item.name} foram alterados com sucesso!`,
            );
            setConfirmChange(false);
            setConfirmOk(true);

            setHours('00');
            setMinutes('00');
          }}
          confirmChange={confirmChange}
        />
      );
    } else if (confirmOk) {
      return (
        <Modal
          title={titleModal}
          message={messageModal}
          visible={confirmOk}
          handleChange={() => {
            setConfirmOk(false);
          }}
        />
      );
    } else {
      return null;
    }
  };

  return {
    renderModalSchedule,
    setModalSchedule,
  };
}
