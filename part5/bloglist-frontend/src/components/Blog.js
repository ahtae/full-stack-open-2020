import React, { useState } from 'react';

const Blog = ({ blog, upvoteBlog, removeBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleUpvoteBlog = () => {
    upvoteBlog(blog.id, {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    });
  };

  const handleRemoveBlog = () => {
    removeBlog(blog.id);
  };

  console.log(blog, window.localStorage.getItem('loggedBlogappUser'))
  return (
    <div style={blogStyle}>
      {showDetails ? (
        <>
          <div>
            {blog.title} {blog.author}
            <button onClick={() => setShowDetails(!showDetails)}>hide</button>
          </div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={handleUpvoteBlog}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {JSON.parse(window.localStorage.getItem('loggedBlogappUser')).username === blog.user.username ? <button onClick={handleRemoveBlog}>remove</button> : null}
        </>
      ) : (
        <>
          {blog.title} {blog.author}{' '}
          <button onClick={() => setShowDetails(!showDetails)}>view</button>
        </>
      )}
    </div>
  );
};

export default Blog;
