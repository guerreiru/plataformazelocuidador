export const TYPES = {
  INITIALIZE: 'INITIALIZE',
  OLD_MESSAGE_LISTED: 'OLD_MESSAGE_LISTED',
  NEW_MESSAGE_ADD: 'MESSAGE_ADD',
  NEW_MESSAGES_READ: 'NEW_MESSAGES_READ',
  USER_SELECTED: 'USER_SELECTED',
};

const INITIAL_STATE = {
  data: {},
  userSelected: null,
};

/**
 * Formato do Payload
 *
 * {
 *  userId: 'UUID',
 *  message: {},
 *  userType: 'CAREGIVER' | 'PROFESSIONAL'
 *  subject: 'ID_IDOSO'
 * }
 *
 * O observer sempre vai adicionar as mensagens às newMessages
 * A tela escuta o redux newMessages e quando houver novas mensagens as marca como lidas
 * transformando as novas em messages
 */

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TYPES.INITIALIZE:
      return {
        ...state,
        data: { ...payload },
      };
    case TYPES.OLD_MESSAGE_LISTED:
      return {
        ...state,
        data: {
          ...state.data,
          [payload.subject]: {
            ...state.data[payload.subject],
            [payload.userId]: {
              messages: [...payload.messages],
              userType: payload.userType,
            },
          },
        },
      };
    case TYPES.NEW_MESSAGE_ADD: {
      let messages = [];
      if (
        state.data[payload.subject] &&
        state.data[payload.subject][payload.userId] &&
        state.data[payload.subject][payload.userId].messages
      ) {
        messages = [...state.data[payload.subject][payload.userId].messages];
      }

      let unreadCount = 0;
      if (
        state.data[payload.subject] &&
        state.data[payload.subject][payload.userId] &&
        state.data[payload.subject][payload.userId].unreadCount
      ) {
        unreadCount = state.data[payload.subject][payload.userId].unreadCount;
      }

      let userType = null;
      if (
        state.data[payload.subject] &&
        state.data[payload.subject][payload.userId] &&
        state.data[payload.subject][payload.userId].userType
      ) {
        userType = state.data[payload.subject][payload.userId].userType;
      }
      const willIncrement =
        payload.willIncrement === null || payload.willIncrement === undefined
          ? true
          : payload.willIncrement;

      return {
        ...state,
        data: {
          ...state.data,
          [payload.subject]: {
            ...state.data[payload.subject],
            unreadCount: willIncrement
              ? (state.data[payload.subject]?.unreadCount || 0) + 1
              : state.data[payload.subject]?.unreadCount || 0,
            [payload.userId]: {
              messages: [payload.message, ...messages],
              userType: payload.userType ? payload.userType : userType,
              unreadCount: willIncrement ? unreadCount + 1 : unreadCount,
            },
          },
        },
      };
    }
    case TYPES.NEW_MESSAGES_READ: {
      return {
        ...state,
        data: {
          ...state.data,
          [payload.subject]: {
            ...state.data[payload.subject],
            unreadCount:
              state.data[payload.subject].unreadCount - payload.count,
            [payload.userId]: {
              ...state.data[payload.subject][payload.userId],
              unreadCount: 0,
            },
          },
        },
      };
    }

    case TYPES.USER_SELECTED:
      return {
        ...state,
        userSelected: payload,
      };
    default:
      return state;
  }
};
