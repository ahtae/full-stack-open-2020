import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  initializeBlogs,
  upvoteBlog,
  createComment,
} from '../reducers/blogReducer';
import { useRouteMatch } from 'react-router-dom';

const Blog = () => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const byLikes = (b1, b2) => b2.likes - b1.likes;
  const blogs = useSelector((state) => state.blogs.sort(byLikes));
  const match = useRouteMatch('/blogs/:id');
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const handleLike = () => {
    const likedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id,
    };

    dispatch(upvoteBlog(likedBlog));
  };

  const handleCreateCommentClick = () => {
    dispatch(
      createComment(blog.id, {
        ...blog,
        text: comment,
      })
    );

    setComment('');
  };

  if (!blog) {
    return null;
  }

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
      <input
        id="comment"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button onClick={handleCreateCommentClick}>add comment</button>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
