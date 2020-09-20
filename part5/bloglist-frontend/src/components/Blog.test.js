import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';
import BlogForm from './BlogForm';

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

test('clicking the button twice calls event handler twice', () => {
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

  const mockHandler = jest.fn();
  const component = render(<Blog blog={blog} upvoteBlog={mockHandler} />);
  const button = component.getByText('view');
  fireEvent.click(button);

  const likeButton = component.getByText('like');
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn();

  const component = render(<BlogForm createBlog={createBlog} />);

  const titleInput = component.container.querySelector('#title');
  const authorInput = component.container.querySelector('#author');
  const urlInput = component.container.querySelector('#url');
  const form = component.container.querySelector('form');

  fireEvent.change(titleInput, {
    target: { value: 'testing of forms could be easier' },
  });

  fireEvent.change(authorInput, {
    target: { value: 'bojack horseman' },
  });

  fireEvent.change(urlInput, {
    target: { value: 'www.testing.com' },
  });

  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe(
    'testing of forms could be easier'
  );
  expect(createBlog.mock.calls[0][0].author).toBe('bojack horseman');
  expect(createBlog.mock.calls[0][0].url).toBe('www.testing.com');
});
