import anecdoteService from '../services/anecdotes';

export const UPVOTE = 'UPVOTE';

export const INIT_ANECDOTES = 'INIT_ANECDOTES';

export const NEW_ANECDOTE = 'NEW_ANECDOTE';

export const upvote = (anecdoteObj) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.update(anecdoteObj);

    dispatch({
      type: UPVOTE,
      data: anecdote,
    });
  };
};

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(anecdote);

    dispatch({
      type: NEW_ANECDOTE,
      data: newAnecdote,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();

    dispatch({
      type: INIT_ANECDOTES,
      data: anecdotes,
    });
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case UPVOTE:
      const updatedAnecdotes = state.map((anecdoteObj) =>
        anecdoteObj.id !== action.data.id ? anecdoteObj : action.data
      );
      return updatedAnecdotes;
    case NEW_ANECDOTE:
      return [...state, action.data];
    case INIT_ANECDOTES:
      return action.data;
    default:
      return state;
  }
};

export default reducer;
