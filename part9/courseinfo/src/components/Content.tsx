import React from 'react';

interface CoursePartsProps {
  name: string;
  exerciseCount: number;
}

interface Content {
  courseParts: Array<CoursePartsProps>;
}

const Content: React.FC<Content> = ({ courseParts }) => {
  return (
    <>
      <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p>
    </>
  );
};

export default Content;
