export const TYPES = {
  CARE_PLANS_LISTED: 'CARE_PLANS_LISTED',
};

const INITIAL_STATE = {
  instructions: [],
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TYPES.CARE_PLANS_LISTED:
      return {
        ...state,
        instructions: payload,
      };
    default:
      return state;
  }
};
