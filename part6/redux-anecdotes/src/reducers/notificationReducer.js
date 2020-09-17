const initialState = '';

export const SET_NOTIFICATION = 'SET_NOTIFICATION';

export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export const setNotification = (notification, time) => {
  return async (dispatch) => {
    dispatch({
      type: SET_NOTIFICATION,
      notification,
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_NOTIFICATION,
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
