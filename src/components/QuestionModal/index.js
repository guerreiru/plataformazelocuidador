import React from 'react';

import Modal from '../Modal';
import { ButtonModal, TextButtonModal } from './styles';
import useQuestions from '../../hooks/useQuestions';
import THE_SENIOR from '../../utils/formatSenior';
import { useSelector } from 'react-redux';

const QuestionModal = () => {
  const { user } = useSelector((state) => state.auth);
  const { question, respondQuestion } = useQuestions(user);

  if (!question) {
    return null;
  }

  let title = `Sobre a rotina de cuidados `;
  if (question.gender) {
    title += `${THE_SENIOR.THE_PREPOSITION[question.gender]}${
      THE_SENIOR.THE_TREATMENT_PRONOUN[question.gender]
    }${question.full_name}`;
  }
  return (
    <Modal
      visible={!!question}
      title={title}
      message={question.description}
      footer={
        <>
          <ButtonModal
            onPress={() => respondQuestion({ ...question, answer: 'Não' })}>
            <TextButtonModal>NÃO</TextButtonModal>
          </ButtonModal>
          <ButtonModal
            onPress={() => respondQuestion({ ...question, answer: 'Sim' })}>
            <TextButtonModal>SIM</TextButtonModal>
          </ButtonModal>
        </>
      }
    />
  );
};

export default QuestionModal;
