import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AnecdoteForm from './components/AnecdoteForm';
import { upvote } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) =>
    state.sort((a, b) => b.votes - a.votes)
  );

  const vote = (id) => {
    dispatch(upvote(id));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
      <AnecdoteForm />
    </div>
  );
};

export default App;
