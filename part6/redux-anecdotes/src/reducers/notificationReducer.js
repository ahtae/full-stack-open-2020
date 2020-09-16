const initialState = '';

export const SET_NOTIFICATION = 'SET_NOTIFICATION';

export const setNotification = (notification) => {
  return {
    type: SET_NOTIFICATION,
    notification,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return action.notification;
    default:
      return state;
  }
};

export default reducer;
