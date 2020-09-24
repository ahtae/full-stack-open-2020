import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { initializeUsers } from '../reducers/usersReducer';

const User = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch('/users/:id');
  const users = useSelector((state) => state.users);
  const user = match ? users.find((user) => user.id === match.params.id) : null;

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  if (!user || !Object.keys(user).length) {
    return null;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.title}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
