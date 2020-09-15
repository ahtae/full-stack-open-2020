import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/BlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const handleTitleChange = ({ target }) => {
    setNewTitle(target.value);
  };

  const handleUrlChange = ({ target }) => {
    setNewUrl(target.value);
  };

  const handleAuthorChange = ({ target }) => {
    setNewAuthor(target.value);
  };
  const handleUsernameChange = ({ target }) => {
    setUsername(target.value);
  };

  const handlePasswordChange = ({ target }) => {
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
      blogService.setToken(user.token);
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
    } catch (exception) {
      setErrorMessage('wrong username or password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  };

  const addBlog = async (event) => {
    event.preventDefault();

    try {
      const blogObject = {
        title: newTitle,
        author: newAuthor,
        url: newUrl,
      };

      const returnedBlog = await blogService.create(blogObject);

      setBlogs(blogs.concat(returnedBlog));
      setNewTitle('');
      setNewAuthor('');
      setNewUrl('');
    } catch (exception) {
      setErrorMessage(exception.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  useEffect(() => {
    async function fetchBlogs() {
      const blogs = await blogService.getAll();

      setBlogs(blogs);
    }

    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);

      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        {errorMessage ? <div className="error">{errorMessage}</div> : null}
        <LoginForm
          username={username}
          handleLogin={handleLogin}
          password={password}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      {errorMessage ? <div className="error">{errorMessage}</div> : null}
      <div>
        {user.name} logged in <button onClick={handleLogOut}>log out</button>
      </div>
      <h2>create new</h2>
      <BlogForm
        addBlog={addBlog}
        newTitle={newTitle}
        handleTitleChange={handleTitleChange}
        handleAuthorChange={handleAuthorChange}
        handleUrlChange={handleUrlChange}
        newAuthor={newAuthor}
        newUrl={newUrl}
      />
      <Blogs blogs={blogs} />
    </div>
  );
};

export default App;
