import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Anecdote from './Anecdote';
import { upvote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) => {
    const filteredAnecdotes = state.filter
      ? state.anecdotes.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
        )
      : state.anecdotes;

    return filteredAnecdotes.sort((a, b) => b.votes - a.votes);
  });

  const vote = (id) => {
    const anecdoteVotedFor = anecdotes.find((anecdote) => anecdote.id === id);
    const updatedAnecdote = {
      ...anecdoteVotedFor,
      votes: anecdoteVotedFor.votes + 1,
    };
    dispatch(upvote(updatedAnecdote));
    dispatch(setNotification(`you voted for '${updatedAnecdote.content}'`, 10));
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
