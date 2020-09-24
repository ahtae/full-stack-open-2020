import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initializeUsers } from '../reducers/usersReducer';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  console.log(users);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>
              <strong>blogs created</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
