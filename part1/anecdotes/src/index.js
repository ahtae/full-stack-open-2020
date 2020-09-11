import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const Anecdote = ({ anecdote, vote }) => {
  return (
    <React.Fragment>
      <div>{anecdote}</div>
      <div>has {vote}</div>
    </React.Fragment>
  );
};
const initialVotes = {};

anecdotes.forEach((anecdote, index) => (initialVotes[index] = 0));

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(initialVotes);

  const chooseAnotherAnecdote = () => {
    let randomNumber = Math.floor(Math.random() * anecdotes.length);

    while (randomNumber === selected) {
      randomNumber = Math.floor(Math.random() * anecdotes.length);
    }

    setSelected(randomNumber);
  };

  const voteForAnecdote = () => {
    const updatedVotes = { ...votes };

    updatedVotes[selected] += 1;
    setVotes(updatedVotes);
  };

  return (
    <div>
      <Anecdote anecdote={props.anecdotes[selected]} vote={votes[selected]} />
      <Button text="vote" handleClick={voteForAnecdote} />
      <Button text="next anecdote" handleClick={chooseAnotherAnecdote} />
    </div>
  );
};

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
