export const TYPES = {
  MEDICINES_LISTED: 'MEDICINES_LISTED',
  MEDICINES_FOR_TODAY_LIST: 'MEDICINES_FOR_TODAY_LIST',
  MEDICINES_SCHEDULED: 'MEDICINES_SCHEDULED',
  HISTORIES_MEDICINES_LISTED: 'HISTORIES_MEDICINES_LISTED',
};

const INITIAL_STATE = {
  histories: [],
  list: [],
  medicinesForTodayList: [],
  medicineScheduled: null,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TYPES.MEDICINES_LISTED:
      return {
        ...state,
        list: payload,
      };

    case TYPES.MEDICINES_FOR_TODAY_LIST:
      return {
        ...state,
        medicinesForTodayList: payload,
      };
    case TYPES.HISTORIES_MEDICINES_LISTED:
      return {
        ...state,
        histories: payload,
      };
    case TYPES.MEDICINES_SCHEDULED:
      return {
        ...state,
        medicineScheduled: new Date().getTime(),
      };
    default:
      return state;
  }
};
