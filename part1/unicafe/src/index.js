import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({ good, neutral, bad }) => {
  return (
    <React.Fragment>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </React.Fragment>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increaseGoodByOne = () => setGood(good + 1);
  const increaseNeutralByOne = () => setNeutral(neutral + 1);
  const increaseBadByOne = () => setBad(bad + 1);

  return (
    <div>
      <Header title="give feedback" />
      <Button text="good" handleClick={increaseGoodByOne} />
      <Button text="neutral" handleClick={increaseNeutralByOne} />
      <Button text="bad" handleClick={increaseBadByOne} />
      <Header title="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
