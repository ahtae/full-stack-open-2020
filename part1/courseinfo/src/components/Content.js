import React from 'react';
import Part from './Part';
import Total from './Total';

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <Total parts={course.parts} />
    </div>
  );
};

export default Content;
