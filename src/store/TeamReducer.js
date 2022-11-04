export const TYPES = {
  TEAMS_LISTED: 'TEAMS_LISTED',
  TEAM_FETCHED: 'TEAM_FETCHED',
  TEAM_MEMBER_FETCHED: 'TEAM_MEMBER_FETCHED',
};

const INITIAL_STATE = {
  list: [],
  detail: {},
  member: {},
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TYPES.TEAM_FETCHED:
      return {
        ...state,
        detail: payload,
      };
    case TYPES.TEAMS_LISTED:
      return {
        ...state,
        list: payload,
      };
    case TYPES.TEAM_MEMBER_FETCHED:
      return {
        ...state,
        member: payload,
      };
    default:
      return state;
  }
};
