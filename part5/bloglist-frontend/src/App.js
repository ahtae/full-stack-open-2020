import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null);

  const usernameOnChangeHandler = ({ target }) => {
    setUsername(target.value);
  };

  const passwordOnChangeHandler = ({ target }) => {
    setPassword(target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      setUser(user);
      setUsername('');
      setPassword('');
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
    } catch (exception) {
      setErrorMessage('Wrong credentials!');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogOut = () => {
    setUser(null);
    window.localStorage.removeItem('loggedBlogappUser');
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      // blogService.setToken(user.token);
    }
  }, []);

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        {errorMessage}
        <LoginForm
          username={username}
          handleLogin={handleLogin}
          password={password}
          usernameOnChangeHandler={usernameOnChangeHandler}
          passwordOnChangeHandler={passwordOnChangeHandler}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>
        {user.name} logged in <button onClick={handleLogOut}>log out</button>
      </div>
      <Blogs blogs={blogs} />
    </div>
  );
};

export default App;
