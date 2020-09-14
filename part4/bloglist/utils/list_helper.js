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
  let authorWithMostVotes = null;

  blogs.forEach((blog) => {
    map[blog.author]
      ? (map[blog.author].blogs += 1)
      : (map[blog.author] = { author: blog.author, blogs: 1 });

    if (
      !authorWithMostVotes ||
      map[blog.author].blogs > map[authorWithMostVotes].blogs
    ) {
      authorWithMostVotes = blog.author;
    }
  });

  return map[authorWithMostVotes] || authorWithMostVotes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
