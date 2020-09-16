import deepFreeze from 'deep-freeze';
import { SET_NOTIFICATION } from './notificationReducer';
import notificationReducer from './notificationReducer';

describe('notificationReducer', () => {
  test('returns new state with action SET_NOTIFICATION', () => {
    const state = '';
    const action = {
      type: SET_NOTIFICATION,
      notification: 'I HAVE A NOTIFICATION :)',
    };

    deepFreeze(state);
    const newState = notificationReducer(state, action);
    expect(newState).toBe('I HAVE A NOTIFICATION :)');
  });
});
