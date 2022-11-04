import { useSelector, useDispatch } from 'react-redux';
import { TYPES as TASK_TYPES } from '../store/TaskReducer';

export default function useReminder() {
  const reminder = useSelector((state) => state.task.reminder);
  const reminderState = useSelector((state) => state.task.reminderState);
  const dispatch = useDispatch();

  const setReminderState = () => {
    dispatch({ type: TASK_TYPES.REMINDER_STATUS_UDPATED });
  };

  return {
    reminder,
    reminderState,
    setReminderState,
  };
}
