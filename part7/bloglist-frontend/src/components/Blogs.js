import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs, createNewBlog } from '../reducers/blogReducer';
import { Link } from 'react-router-dom';
import Togglable from './Togglable';
import { setNotification } from '../reducers/notificationReducer';
import NewBlog from './/NewBlog';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core';

const Blogs = () => {
  const dispatch = useDispatch();
  const byLikes = (b1, b2) => b2.likes - b1.likes;
  const blogs = useSelector((state) => state.blogs.sort(byLikes));

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const createBlog = (blog) => {
    try {
      dispatch(createNewBlog(blog));
      blogFormRef.current.toggleVisibility();
      notifyWith(`a new blog '${blog.title}' by ${blog.author} added!`);
    } catch (exception) {
      console.log(exception);
    }
  };

  const notifyWith = (message, type = 'success') => {
    dispatch(setNotification({ message, type }, 10));
  };

  const blogFormRef = React.createRef();

  return (
    <div id="blogs">
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.sort(byLikes).map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Blogs;
