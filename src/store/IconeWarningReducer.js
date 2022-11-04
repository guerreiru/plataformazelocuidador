export const TYPES = {
  ACTIVE: 'ACTIVE',
  DISABLED: 'DISABLED',
};

const INITIAL_STATE = {
  status: false,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TYPES.ACTIVE:
      return { ...state, status: payload };
    case TYPES.DISABLED:
      return { ...state, status: payload };
    default:
      return state;
  }
};
