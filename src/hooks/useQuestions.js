import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import api from '../services/api';
import { TYPES as TASK_TYPES } from '../store/TaskReducer';

export default function useQuestions(user) {
  const questions = useSelector((state) => state.task.questions);
  const [question, setQuestion] = useState();

  const dispatch = useDispatch();

  const processQuestions = async () => {
    if (questions.length > 0) {
      setQuestion(questions[0]);
    } else {
      setQuestion(null);
    }
  };

  const respondQuestion = async (res) => {
    const idToRemove = res.id;
    delete res.id;
    res.question_id = idToRemove;
    const response = await api.post(`/caregivers/questions`, { ...res });

    if (response) {
      const qs = questions.filter((q) => q.id !== idToRemove);
      dispatch({ type: TASK_TYPES.QUESTIONS_LISTED, payload: qs });
    }
  };

  useEffect(() => {
    processQuestions();
  }, [questions]);

  return {
    question,
    questions,
    respondQuestion,
  };
}
