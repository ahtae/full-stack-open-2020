import React, { useState, useEffect, useRef } from 'react';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

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
      setMessage('wrong username or password');
      setMessageType('error');
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    }
  };

  const upvoteBlog = async (id, blogObject) => {
    try {
      const updatedBlog = await blogService.update(id, blogObject);
      const indexOfUpdatedBlog = blogs.findIndex((blog) => blog.id === id);
      const updatedBlogs = [...blogs];
      updatedBlogs[indexOfUpdatedBlog] = updatedBlog;

      setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes));
      setMessage(`you liked ${updatedBlog.title} by ${updatedBlog.author}`);
      setMessageType('success');
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    } catch (exception) {
      setMessage(exception.response.data.error);
      setMessageType('error');
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    }
  };

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  };

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);

      setMessage(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      );
      setMessageType('success');
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
      setBlogs(blogs.concat(returnedBlog).sort((a, b) => b.likes - a.likes));
      blogFormRef.current.toggleVisibility();
    } catch (exception) {
      setMessage(exception.response.data.error);
      setMessageType('error');
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    }
  };

  useEffect(() => {
    async function fetchBlogs() {
      const blogs = await blogService
        .getAll()
        .sort((a, b) => b.likes - a.likes);

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
        <Notification message={message} type={messageType} />
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
      <Notification message={message} type={messageType} />
      <div>
        {user.name} logged in <button onClick={handleLogOut}>log out</button>
      </div>
      <h2>create new</h2>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <Blogs blogs={blogs} upvoteBlog={upvoteBlog} />
    </div>
  );
};

export default App;
