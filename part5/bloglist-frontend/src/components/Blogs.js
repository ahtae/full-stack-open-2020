import React from 'react';
import Blog from './Blog';

const Blogs = ({ blogs, upvoteBlog }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} upvoteBlog={upvoteBlog} />
      ))}
    </div>
  );
};

export default Blogs;
