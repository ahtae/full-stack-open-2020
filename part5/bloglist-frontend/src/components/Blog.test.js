import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

test('renders content', () => {
  const blog = {
    title: 'this is a rendered blog',
    author: 'me',
    likes: 100,
    url: 'www.nourl.com',
  };

  const component = render(<Blog blog={blog} />);

  expect(component.container).toHaveTextContent('this is a rendered blog');

  expect(component.container).toHaveTextContent('me');

  expect(component.container).not.toHaveTextContent(100);

  expect(component.container).not.toHaveTextContent('www.nourl.com');
});

// test('clicking the button calls event handler once', async () => {
//   const note = {
//     content: 'Component testing is done with react-testing-library',
//     important: true,
//   };

//   const mockHandler = jest.fn();

//   const { getByText } = render(
//     <Note note={note} toggleImportance={mockHandler} />
//   );

//   const button = getByText('make not important');
//   fireEvent.click(button);

//   expect(mockHandler.mock.calls.length).toBe(1);
// });
