export const TYPES = {
  INTERCURRENCES_LISTED: 'INTERCURRENCES_LISTED',
  INTERCURRENCE_FETCHED: 'INTERCURRENCE_FETCHED',
};

const INITIAL_STATE = {
  list: [],
  detail: {},
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TYPES.INTERCURRENCE_FETCHED:
      return {
        ...state,
        detail: payload,
      };
    case TYPES.INTERCURRENCES_LISTED:
      return {
        ...state,
        list: payload,
      };
    default:
      return state;
  }
};
