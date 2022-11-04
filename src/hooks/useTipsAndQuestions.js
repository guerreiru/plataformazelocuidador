import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TYPES as TASK_TYPES } from '../store/TaskReducer';
import useStorage from './useStorage';
import { isToday } from 'date-fns';
import api from '../services/api';

export default function useTipsAndQuestions(user) {
  const [saveNoSee, getNoSee] = useStorage(`PUSH_TASKS_NO_SEE`);
  const [tip, setTip] = useState();
  const dispatch = useDispatch();

  const questions = useSelector((state) => state.task.questions);
  const [, setQuestion] = useState();

  const [saveDayTip, getDayTip] = useStorage(`PUSH_TASKS_DAY_TIPS`);

  const showDaylyTip = async () => {
    if (user) {
      let dayTip = await getDayTip();
      if (dayTip && isToday(new Date(dayTip.date))) {
        return;
      }

      if (!dayTip) {
        dayTip = { date: new Date(), index: -1 };
      }

      let { informs, questions: arrayQuestions } = await api.get(
        `/caregivers/questions-and-informs`,
      );

      if (arrayQuestions && arrayQuestions.length > 0) {
        const dayOfWeek = new Date().getDay();
        arrayQuestions = arrayQuestions.slice(
          (dayOfWeek - 1) * 3,
          (dayOfWeek - 1) * 3 + 3,
        );
        dispatch({
          type: TASK_TYPES.QUESTIONS_LISTED,
          payload: arrayQuestions,
        });
      }

      if (informs) {
        const noSee = (await getNoSee()) || [];

        informs = informs.filter((r) => noSee.indexOf(r.id) === -1);
        if (informs.length === 0) {
          return;
        }
        dayTip.index =
          dayTip.index + 1 >= informs.length ? 0 : dayTip.index + 1;

        dayTip.date = new Date();
        const daylyTip = informs[dayTip.index];
        setTip(daylyTip);
        saveDayTip(dayTip);
      }
    }
  };

  const respondTip = async (res) => {
    if (!res.seeAgain) {
      const noSee = (await getNoSee()) || [];
      saveNoSee([...noSee, res.id]);
    }
    setTip(null);
  };

  const processQuestions = async () => {
    if (questions.length > 0) {
      setQuestion(questions[0]);
    } else {
      setQuestion(null);
    }
  };

  useEffect(() => {
    processQuestions();
  }, [questions]);

  useEffect(() => {
    showDaylyTip();
  }, []);

  return {
    tip,
    respondTip,
  };
}
