import deepFreeze from 'deep-freeze';
import { SET_NOTIFICATION, REMOVE_NOTIFICATION } from './notificationReducer';
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

  test('returns new state with action REMOVE_NOTIFICATION', () => {
    const state = 'I HAVE A NOTIFICATION :)';
    const action = {
      type: REMOVE_NOTIFICATION,
    };

    deepFreeze(state);
    const newState = notificationReducer(state, action);
    expect(newState).toBe('');
  });
});
