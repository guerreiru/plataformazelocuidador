export const TYPES = {
  NET_UPDATED: 'NET_UPDATED',
};

const INITIAL_STATE = {
  online: true,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TYPES.NET_UPDATED:
      return {
        ...state,
        online: payload,
      };
    default:
      return state;
  }
};
