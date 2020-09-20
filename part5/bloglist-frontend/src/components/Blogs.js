import React from 'react';
import Blog from './Blog';
import PropTypes from 'prop-types';

const Blogs = ({ blogs, upvoteBlog, removeBlog }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          upvoteBlog={upvoteBlog}
          removeBlog={removeBlog}
        />
      ))}
    </div>
  );
};

export default Blogs;

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  upvoteBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
};
