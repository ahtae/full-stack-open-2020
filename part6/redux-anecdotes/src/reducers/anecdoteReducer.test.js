import anecdoteReducer from './anecdoteReducer';
import deepFreeze from 'deep-freeze';

describe('anecdoteReducer', () => {
  test('returns new state with action', () => {
    const anecdotesAtStart = [
      'If it hurts, do it more often',
      'Adding manpower to a late software project makes it later!',
      'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      'Premature optimization is the root of all evil.',
      'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    ];

    const getId = () => (100000 * Math.random()).toFixed(0);

    const asObject = (anecdote) => {
      return {
        content: anecdote,
        id: getId(),
        votes: 0,
      };
    };

    const state = anecdotesAtStart.map(asObject);
    const action = {
      type: 'UPVOTE',
      id: state[0].id,
    };

    deepFreeze(state);
    const newState = anecdoteReducer(state, action);
    expect(newState.length).toBe(anecdotesAtStart.length);
    expect(newState).toContainEqual({
      ...state[0],
      votes: 1,
    });
    expect(newState).toEqual(
      state.map((anecdoteObj, index) =>
        !index ? { ...anecdoteObj, votes: anecdoteObj.votes + 1 } : anecdoteObj
      )
    );
  });
});
