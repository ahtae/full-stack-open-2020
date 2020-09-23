import React from 'react';
import Blog from './Blog';
import { useSelector } from 'react-redux';

const Blogs = () => {
  const byLikes = (b1, b2) => b2.likes - b1.likes;
  const blogs = useSelector((state) => state.blogs.sort(byLikes));
  const user = useSelector((state) => state.user);

  return (
    <div id="blogs">
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
