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
    } catch (exception) {
      setErrorMessage('Wrong credentials!');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
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
      <p>{user.name} logged in</p>
      <Blogs blogs={blogs} />
    </div>
  );
};

export default App;
