import React from 'react';
import Blog from './Blog';

const Blogs = ({ blogs, upvoteBlog, removeBlog }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} upvoteBlog={upvoteBlog} removeBlog={removeBlog} />
      ))}
    </div>
  );
};

export default Blogs;
