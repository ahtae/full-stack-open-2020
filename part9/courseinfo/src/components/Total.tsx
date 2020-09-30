import React from 'react';

interface CoursePartsProps {
  name: string;
  exerciseCount: number;
}

interface TotalProps {
  courseParts: Array<CoursePartsProps>;
}

const Total: React.FC<TotalProps> = ({ courseParts }) => {
  return (
    <p>
      Number of exercises
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

export default Total;
