import React from 'react';

const Total = ({ parts }) => {
  const total = parts.reduce(
    (accumulator, part) => part.exercises + accumulator,
    0
  );

  return <h4>total number of {total} exercises</h4>;
};

export default Total;
