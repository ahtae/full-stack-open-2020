const initialState = '';

export const SET_NOTIFICATION = 'SET_NOTIFICATION';

export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

let nextNotificationId = 0;

export const setNotification = (notification, time) => {
  const id = nextNotificationId++;

  return async (dispatch) => {
    dispatch({
      type: SET_NOTIFICATION,
      notification,
      id,
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_NOTIFICATION,
        id,
      });
    }, time * 1000);
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
