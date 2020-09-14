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

const mostBlogs = (blogs) => {
  const map = {};
  let authorWithMostBlogs = null;

  blogs.forEach((blog) => {
    map[blog.author]
      ? (map[blog.author].blogs += 1)
      : (map[blog.author] = { author: blog.author, blogs: 1 });

    if (
      !authorWithMostBlogs ||
      map[blog.author].blogs > map[authorWithMostBlogs].blogs
    ) {
      authorWithMostBlogs = blog.author;
    }
  });

  return map[authorWithMostBlogs] || authorWithMostBlogs;
};

const mostLikes = (blogs) => {
  const map = {};
  let authorWithMostLikes = null;

  blogs.forEach((blog) => {
    map[blog.author]
      ? (map[blog.author].likes += blog.likes)
      : (map[blog.author] = { author: blog.author, likes: blog.likes });

    if (
      !authorWithMostLikes ||
      map[blog.author].likes > map[authorWithMostLikes].likes
    ) {
      authorWithMostLikes = blog.author;
    }
  });

  return map[authorWithMostLikes] || authorWithMostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
