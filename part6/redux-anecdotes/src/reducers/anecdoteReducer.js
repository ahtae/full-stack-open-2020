export const UPVOTE = 'UPVOTE';

export const INIT_ANECDOTES = 'INIT_ANECDOTES';

export const NEW_ANECDOTE = 'NEW_ANECDOTE';

export const upvote = (id) => {
  return {
    type: UPVOTE,
    id,
  };
};

export const createAnecdote = (data) => {
  return {
    type: NEW_ANECDOTE,
    data
  };
};

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: INIT_ANECDOTES,
    data: anecdotes,
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case UPVOTE:
      const updatedAnecdotes = state.map((anecdoteObj) =>
        anecdoteObj.id !== action.id
          ? anecdoteObj
          : { ...anecdoteObj, votes: anecdoteObj.votes + 1 }
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
