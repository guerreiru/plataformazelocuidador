import React, { useState } from 'react';

import Modal from '../Modal';
import { ButtonModal, TextButtonModal, ContainerCheck } from './styles';
import useTipsAndQuestions from '../../hooks/useTipsAndQuestions';
import Checkbox from '../Checkbox';
import THE_SENIOR from '../../utils/formatSenior';
import { useSelector } from 'react-redux';

const TipModal = () => {
  const [checkBox, setCheckBox] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { tip, respondTip } = useTipsAndQuestions(user);

  if (!tip) {
    return null;
  }

  return (
    <Modal
      visible={!!tip}
      title={`Dicas de cuidados para ${
        tip.gender === 'MASCULINO' ? 'o' : 'a'
      } ${
        !!tip.gender &&
        Object.keys(THE_SENIOR.THE_TREATMENT_PRONOUN).indexOf(
          tip.gender.toUpperCase(),
        ) >= 0
          ? THE_SENIOR.THE_TREATMENT_PRONOUN[tip.gender.toUpperCase()]
          : 'Sr(a).'
      } ${tip.full_name}!`}
      message={tip.description}
      footer={
        <ButtonModal
          onPress={() => respondTip({ ...tip, seeAgain: !checkBox })}>
          <TextButtonModal>OK</TextButtonModal>
        </ButtonModal>
      }>
      <ContainerCheck>
        <Checkbox
          label="Não desejo ver esta dica novamente"
          handleChange={() => setCheckBox(!checkBox)}
          value={checkBox}
        />
      </ContainerCheck>
    </Modal>
  );
};

export default TipModal;
