const config = require('../utils/config');
const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });

  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post('/', async (request, response) => {
  const { body } = request;
  const decodedToken = jwt.verify(request.token, config.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const blog = await Blog.findById(id);
  const decodedToken = jwt.verify(request.token, config.SECRET);

  if (!request.token || !decodedToken.id) {
    response.status(401).json({ error: 'token missing or invalid' });
  } else if (!blog) {
    response.status(400).json({ error: `No blog with the id ${id}` });
  } else if (blog.user.toString() !== decodedToken.id.toString()) {
    response.status(401).json({ error: 'Unauthorized' });
  }

  await Blog.findByIdAndRemove(decodedToken.id);

  response.status(204).send();
});

blogsRouter.put('/:id', async (request, response) => {
  const { body } = request;
  const { id } = request.params;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });

  response.json(updatedBlog);
});

module.exports = blogsRouter;
