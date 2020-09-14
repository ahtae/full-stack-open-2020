const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((blogWithMostLikes, blog) => {
    return Object.keys(blogWithMostLikes).length === 0 ||
      blog.likes > blogWithMostLikes.likes
      ? { title: blog.title, author: blog.author, likes: blog.likes }
      : blogWithMostLikes;
  }, {});
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
