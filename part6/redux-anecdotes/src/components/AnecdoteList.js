import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Anecdote from './Anecdote';
import { upvote } from '../reducers/anecdoteReducer';
import {
  setNotification,
  removeNotification,
} from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) =>
    state.anecdotes.sort((a, b) => b.votes - a.votes)
  );

  const vote = (id) => {
    const anecdoteVotedFor = anecdotes.find((anecdote) => anecdote.id === id);
    dispatch(upvote(id));
    dispatch(setNotification(`you voted for '${anecdoteVotedFor.content}'`));

    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} vote={vote} />
      ))}
    </div>
  );
};

export default AnecdoteList;
