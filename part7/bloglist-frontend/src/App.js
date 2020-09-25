import React, { useState } from 'react';
import Notification from './components/Notification';
import { useDispatch, useSelector } from 'react-redux';
import storage from './utils/storage';
import Blogs from './components/Blogs';
import { logIn, logOut } from './reducers/userReducer';
import { setNotification } from './reducers/notificationReducer';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Users from './components/Users';
import User from './components/User';
import Blog from './components/Blog';
import Container from '@material-ui/core/Container';
import { AppBar, Button, Toolbar } from '@material-ui/core';

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
      dispatch(
        logIn({
          username,
          password,
        })
      );

      notifyWith(`${username} welcome back!`, 'success');

      setUsername('');
      setPassword('');
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

  return (
    <Container>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/">
              home
            </Button>
            <Button color="inherit" component={Link} to="/blogs">
              blogs
            </Button>
            <Button color="inherit" component={Link} to="/users">
              users
            </Button>
          </Toolbar>
        </AppBar>

        <h2>blog app</h2>
        <div>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </div>

        <Notification />

        <Switch>
          <Route path="/blogs/:id">
            <Blog />
          </Route>
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
    </Container>
  );
};

export default App;
