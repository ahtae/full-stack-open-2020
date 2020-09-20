import React, { useState } from 'react';

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
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
          <div>likes {blog.likes}</div>
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
