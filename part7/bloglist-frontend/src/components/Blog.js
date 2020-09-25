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

  const handleLike = () => {
    const likedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id
    };

    dispatch(upvoteBlog(likedBlog));
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
        <button onClick={handleLike}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      <h3>comments</h3>
      <ul>
      {blog.comments.map(comment => <li key={comment.id}>{comment.text}</li>)}
      </ul>
    </div>
  );
};

export default Blog;
