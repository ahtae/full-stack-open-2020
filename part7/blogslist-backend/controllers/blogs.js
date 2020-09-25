const router = require('express').Router({ mergeParams: true });
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');
const Comment = require('../models/comment');

router.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate({
      path: 'comments',
      model: 'Comment',
      populate: {
        path: 'comment',
        model: 'Comment',
      },
    })
    .populate({
      path: 'comments',
      model: 'Comment',
      populate: {
        path: 'user',
        model: 'User',
        populate: {
          path: 'blogs',
          model: 'Blog',
        },
      },
    });

  response.json(blogs);
});

router.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);
  const blog = await Blog.findById(request.params.id);
  if (blog.user.toString() !== user.id.toString()) {
    return response
      .status(401)
      .json({ error: 'only the creator can delete blogs' });
  }

  await blog.remove();
  user.blogs = user.blogs.filter(
    (b) => b.id.toString() !== request.params.id.toString()
  );
  await user.save();
  response.status(204).end();
});

router.put('/:id', async (request, response) => {
  const blog = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedBlog.toJSON());
});

router.post('/', async (request, response) => {
  const blog = new Blog(request.body);
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);

  if (!blog.url || !blog.title) {
    return response.status(400).send({ error: 'title or url missing ' });
  }

  if (!blog.likes) {
    blog.likes = 0;
  }

  blog.user = user;
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

router.post('/:id/comments', async (request, response) => {
  const { id } = request.params;
  const comment = new Comment(request.body);
  const blog = await Blog.findById(id);
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  const user = await User.findById(decodedToken.id);

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  if (!comment.text) {
    return response.status(400).send({ error: 'text is missing' });
  }

  comment.user = user._id;

  const savedComment = await comment.save();

  blog.comments = blog.comments.concat(savedComment._id);
  await blog.save();

  user.comments = user.comments.concat(savedComment._id);
  await user.save();

  response.status(201).json(savedComment);
});

module.exports = router;
