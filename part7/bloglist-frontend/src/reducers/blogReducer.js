import blogService from '../services/blogs';

const INIT_BLOGS = 'INIT_BLOGS';
const NEW_BLOG = 'NEW_BLOG';
const UPVOTE_BLOG = 'UPVOTE_BLOG';
const REMOVE_BLOG = 'REMOVE_BLOG';
const CREATE_COMMENT = 'CREATE_COMMENT';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case INIT_BLOGS:
      return action.data;
    case NEW_BLOG:
      return [...state, action.data];
    case UPVOTE_BLOG:
      const id = action.data.id;
      const blogToChange = state.find((n) => n.id === id);
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      };

      return state.map((blog) => (blog.id !== id ? blog : changedBlog));
    case REMOVE_BLOG:
      return state.filter((blog) => blog.id !== action.id);
    case CREATE_COMMENT:
      const blogs = state.map((blog) =>
        blog.id === action.id
          ? { ...blog, comments: blog.comments.concat(action.comment) }
          : blog
      );

      return blogs;
    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();

    dispatch({
      type: INIT_BLOGS,
      data: blogs,
    });
  };
};

export const createNewBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);

    dispatch({
      type: NEW_BLOG,
      data: newBlog,
    });
  };
};

export const upvoteBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog);

    dispatch({
      type: UPVOTE_BLOG,
      data: updatedBlog,
    });
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);

    dispatch({
      type: REMOVE_BLOG,
      id,
    });
  };
};

export const createComment = (id, comment) => {
  return async (dispatch) => {
    const createdComment = await blogService.createComment(id, comment);

    dispatch({
      type: CREATE_COMMENT,
      id,
      comment: createdComment
    });
  };
};

export default blogReducer;
