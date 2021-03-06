import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const handleTitleChange = ({ target }) => {
    setNewTitle(target.value);
  };

  const handleUrlChange = ({ target }) => {
    setNewUrl(target.value);
  };

  const handleAuthorChange = ({ target }) => {
    setNewAuthor(target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        title: <input id="title" value={newTitle} onChange={handleTitleChange} />
      </div>
      <div>
        author: <input id="author" value={newAuthor} onChange={handleAuthorChange} />
      </div>
      <div>
        url: <input id="url" value={newUrl} onChange={handleUrlChange} />
      </div>

      <button id="create-button" type="submit">create</button>
    </form>
  );
};

export default BlogForm;

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};
