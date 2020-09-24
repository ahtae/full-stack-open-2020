import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  initializeBlogs,
  upvoteBlog,
  removeBlog,
} from '../reducers/blogReducer';
import { useRouteMatch, useHistory } from 'react-router-dom';

const Blog = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const byLikes = (b1, b2) => b2.likes - b1.likes;
  const blogs = useSelector((state) => state.blogs.sort(byLikes));
  const match = useRouteMatch('/blogs/:id');
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

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
    history.push('/blogs');
  };

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  if (!blog) {
    return null;
  }

  const own = user.username === blog.user.username;

  return (
    <div className="blog">
      <h1>{blog.title}</h1>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        likes {blog.likes}
        <button onClick={() => handleLike(blog.id)}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {own && <button onClick={() => handleRemove(blog.id)}>remove</button>}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  own: PropTypes.bool.isRequired,
};

export default Blog;
