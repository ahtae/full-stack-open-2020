import React from 'react';

const Anecdote = ({ anecdote }) => (
  <div>
    <h1>{anecdote.content}</h1>
    <p>has {anecdote.votes} votes</p>
    <p>for more info see {anecdote.info}</p>
  </div>
);

export default Anecdote;
