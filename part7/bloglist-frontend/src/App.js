import React, { useState } from 'react';
import Notification from './components/Notification';
import { useDispatch, useSelector } from 'react-redux';
import storage from './utils/storage';
import Blogs from './components/Blogs';
import { logIn, logOut } from './reducers/userReducer';
import { setNotification } from './reducers/notificationReducer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom';
import Users from './components/Users';
import User from './components/User';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const notifyWith = (message, type = 'success') => {
    dispatch(setNotification({ message, type }, 10));
  };

  const history = useHistory();

  const handleLogin = (event) => {
    event.preventDefault();
    try {
      const user = dispatch(
        logIn({
          username,
          password,
        })
      );

      setUsername('');
      setPassword('');
      history.push('/');
      notifyWith(`${user.name} welcome back!`, 'success');
    } catch (exception) {
      notifyWith('wrong username/password', 'error');
    }
  };

  const handleLogout = () => {
    dispatch(logOut());
    storage.logoutUser();
  };

  if (!user) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login">login</button>
        </form>
      </div>
    );
  }

  const padding = {
    padding: 5,
  };

  return (
    <div>
      <Router>
        <Link style={padding} to="/">
          homes
        </Link>
        <Link style={padding} to="/blogs">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>

        <h2>blogs</h2>

        <Notification />

        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>

        <Switch>
          <Route path="/users/:id">
            <User />
          </Route>
          <Route path="/blogs">
            <Blogs />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Blogs />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
