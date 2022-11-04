export const TYPES = {
  LOGIN: 'AUTH_LOGIN',
  LOGOUT: 'AUTH_LOGOUT',
  UPDATE_USER: 'UPDATE_USER',
  UPDATED_PHOTO: 'UPDATED_PHOTO',
};

const INITIAL_STATE = {
  user: null,
  photo: {},
  token: null,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TYPES.LOGIN:
      return { ...state, ...payload };
    case TYPES.LOGOUT:
      return INITIAL_STATE;
    case TYPES.UPDATE_USER:
      return { ...state, user: payload };
    case TYPES.UPDATED_PHOTO:
      return { ...state, photo: payload };
    default:
      return state;
  }
};
