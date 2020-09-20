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

test('button can be used to view and hide blog', () => {
  const blog = {
    title: 'this is a rendered blog',
    author: 'me',
    likes: 100,
    url: 'www.nourl.com',
    user: {
      name: 'bob',
    },
  };

  window.localStorage.setItem(
    'loggedBlogappUser',
    JSON.stringify({
      user: {
        name: 'bob',
      },
    })
  );

  const component = render(<Blog blog={blog} />);

  const button = component.getByText('view');
  fireEvent.click(button);

  expect(component.container).toHaveTextContent('this is a rendered blog');

  expect(component.container).toHaveTextContent('me');

  expect(component.container).toHaveTextContent(100);

  expect(component.container).toHaveTextContent('www.nourl.com');

  const closeButton = component.getByText('hide');
  fireEvent.click(closeButton);

  expect(component.container).toHaveTextContent('this is a rendered blog');

  expect(component.container).toHaveTextContent('me');

  expect(component.container).not.toHaveTextContent(100);

  expect(component.container).not.toHaveTextContent('www.nourl.com');
});
