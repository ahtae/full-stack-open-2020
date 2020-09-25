import loginService from '../services/login';
import storage from '../utils/storage';

const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';

export const logIn = (user) => {
  return async (dispatch) => {
    const userObject = await loginService.login(user);
    storage.saveUser(userObject);

    return dispatch({
      type: LOG_IN,
      data: userObject,
    });
  };
};

export const logOut = () => {
  return {
    type: LOG_OUT,
  };
};

const userReducer = (state = storage.loadUser(), action) => {
  switch (action.type) {
    case LOG_IN:
      return action.data;
    case LOG_OUT:
      return null;
    default:
      return state;
  }
};

export default userReducer;
