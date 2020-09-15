import React from 'react';

const BlogForm = ({
  addBlog,
  newTitle,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  newAuthor,
  newUrl,
}) => (
  <form onSubmit={addBlog}>
    <div>
      title: <input value={newTitle} onChange={handleTitleChange} />
    </div>
    <div>
      author: <input value={newAuthor} onChange={handleAuthorChange} />
    </div>
    <div>
      url: <input value={newUrl} onChange={handleUrlChange} />
    </div>

    <button type="submit">create</button>
  </form>
);

export default BlogForm;
