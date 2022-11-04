export const TYPES = {
  MY_SENIORS_LISTED: 'MY_SENIORS_LISTED',
  SENIOR_FETCHED: 'SENIOR_FETCHED',
};

const INITIAL_STATE = {
  mySeniors: [],
  senior: {},
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TYPES.SENIOR_FETCHED:
      return {
        ...state,
        senior: payload,
      };
    case TYPES.MY_SENIORS_LISTED:
      return {
        ...state,
        mySeniors: payload,
      };
    default:
      return state;
  }
};
