import React, { useEffect } from 'react';
import Blog from './Blog';
import { useDispatch, useSelector } from 'react-redux';
import {
  initializeBlogs,
  upvoteBlog,
  createNewBlog,
  removeBlog,
} from '../reducers/blogReducer';
import Togglable from './Togglable';
import { setNotification } from '../reducers/notificationReducer';
import NewBlog from './/NewBlog';


const Blogs = () => {
  const dispatch = useDispatch();
  const byLikes = (b1, b2) => b2.likes - b1.likes;
  const blogs = useSelector((state) => state.blogs.sort(byLikes));
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const notifyWith = (message, type = 'success') => {
    dispatch(setNotification({ message, type }, 10));
  };

  const createBlog = (blog) => {
    try {
      dispatch(createNewBlog(blog));
      blogFormRef.current.toggleVisibility();
      notifyWith(`a new blog '${blog.title}' by ${blog.author} added!`);
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleLike = (id) => {
    const blogToLike = blogs.find((b) => b.id === id);
    const likedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
      user: blogToLike.user.id,
    };

    dispatch(upvoteBlog(likedBlog));
  };

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find((b) => b.id === id);
    const ok = window.confirm(
      `Remove blog ${blogToRemove.title} by ${blogToRemove.author}`
    );
    if (ok) {
      dispatch(removeBlog(id));
    }
  };

  const blogFormRef = React.createRef();

  return (
    <div id="blogs">
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <NewBlog createBlog={createBlog} />
        </Togglable>

        {blogs.sort(byLikes).map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleRemove={handleRemove}
            own={user.username === blog.user.username}
          />
        ))}
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          own={user.username === blog.user.username}
        />
      ))}
    </div>
  );
};

export default Blogs;
