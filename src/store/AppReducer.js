export const TYPES = {
  LOADING_START: 'LOADING_START',
  LOADING_STOP: 'LOADING_STOP',
  APP_READY: 'APP_READY',
  DATE_TIME_SYNC_UPDATED: 'DATE_TIME_SYNC_UPDATED',
  MUST_ACCEPT_TERMS: 'MUST_ACCEPT_TERMS',
};

const INITIAL_STATE = {
  loading: 0,
  loadingDelay: 0,
  ready: false,
  dateTimeIsSync: true,
  mustAcceptTerms: false,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TYPES.LOADING_START: {
      //console.log('===============================');
      //console.log('START LOADING');
      const newState = {
        ...state,
        loading: state.loading + 1,
        loadingDelay: payload.loadingDelay || 0,
      };
      //console.log(newState);
      return newState;
    }
    case TYPES.LOADING_STOP: {
      //console.log('===============================');
      //console.log('STOP LOADING');
      const newState = {
        ...state,
        loading: state.loading - 1 < 0 ? 0 : state.loading - 1,
      };
      //console.log(newState);
      return newState;
    }
    case TYPES.APP_READY:
      return { ...state, ready: true };
    case TYPES.DATE_TIME_SYNC_UPDATED:
      return { ...state, dateTimeIsSync: payload };
    case TYPES.MUST_ACCEPT_TERMS:
      return { ...state, mustAcceptTerms: payload };
    default:
      return state;
  }
};
