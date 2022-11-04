export const TYPES = {
  QUESTIONS_LISTED: 'QUESTIONS_LISTED',
  TIPS_LISTED: 'TIPS_LISTED',
  REMINDER_FETCHED: 'REMINDER_FETCHED',
  REMINDER_STATUS_UDPATED: 'REMINDER_STATUS_UDPATED',
};

const INITIAL_STATE = {
  questions: [],
  tips: [],
  reminder: {},
  reminderState: false,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TYPES.QUESTIONS_LISTED:
      return { ...state, questions: payload };
    case TYPES.TIPS_LISTED:
      return { ...state, tips: payload };
    case TYPES.REMINDER_FETCHED:
      return { ...state, reminder: payload };
    case TYPES.REMINDER_STATUS_UDPATED:
      return { ...state, reminderState: !state.reminderState };
    default:
      return state;
  }
};
