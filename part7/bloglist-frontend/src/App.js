import React, { useState } from 'react';
import Notification from './components/Notification';
import { useDispatch, useSelector } from 'react-redux';
import storage from './utils/storage';
import Blogs from './components/Blogs';
import { logIn, logOut } from './reducers/userReducer';
import { setNotification } from './reducers/notificationReducer';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Users from './components/Users';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const notifyWith = (message, type = 'success') => {
    dispatch(setNotification({ message, type }, 10));
  };

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
    <Router>
      <div>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/blogs">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
      </div>
      <div>
        <h2>blogs</h2>

        <Notification />

        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>

        <Switch>
          <Route path="/blogs">{user ? <Blogs /> : null}</Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">{user ? <Blogs /> : null}</Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
