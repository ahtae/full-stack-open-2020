const initialState = '';

export const SET_NOTIFICATION = 'SET_NOTIFICATION';

export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export const setNotification = (notification) => {
  return {
    type: SET_NOTIFICATION,
    notification,
  };
};

export const removeNotification = () => {
  return {
    type: REMOVE_NOTIFICATION,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return action.notification;
    case REMOVE_NOTIFICATION:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
