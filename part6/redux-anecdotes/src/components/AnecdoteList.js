import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Anecdote from './Anecdote';
import { upvote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import { connect } from 'react-redux';

const AnecdoteList = ({ anecdotes, upvote, setNotification }) => {
  const vote = (id) => {
    const anecdoteVotedFor = anecdotes.find((anecdote) => anecdote.id === id);
    const updatedAnecdote = {
      ...anecdoteVotedFor,
      votes: anecdoteVotedFor.votes + 1,
    };
    upvote(updatedAnecdote);
    setNotification(`you voted for '${updatedAnecdote.content}'`, 10);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} vote={vote} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  const filteredAnecdotes = state.filter
    ? state.anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      )
    : state.anecdotes;

  return {
    anecdotes: filteredAnecdotes.sort((a, b) => b.votes - a.votes),
    filter: state.filter,
  };
};

const mapDispatchToProps = {
  upvote,
  setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
