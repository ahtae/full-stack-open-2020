import React, { useState } from 'react';

const Blog = ({ blog, upvoteBlog }) => {
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
