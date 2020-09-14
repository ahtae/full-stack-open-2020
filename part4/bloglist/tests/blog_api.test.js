const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[2]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[3]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[4]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[5]);
  await blogObject.save();
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs');

  const titles = response.body.map((r) => r.title);

  expect(titles).toContain('React patterns');
});

test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body[0].id).toBeDefined();
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'test',
    author: 'tester',
    url: 'test.com',
    likes: 1,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');

  const titles = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  expect(titles).toContain('test');
});

test('if the likes property is missing from the request, it will default to the value 0 ', async () => {
  const newBlog = {
    title: 'missing likes',
    author: 'tester',
    url: 'test.com',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await helper.blogsInDb();
  const blog = response.filter((r) => r.title === 'missing likes')[0];

  expect(blog.title).toBe('missing likes');
  expect(blog.likes).toBe(0);
});

test('blog without title is not added', async () => {
  const newBlog = {
    author: 'no title',
    url: 'no title',
  };

  await api.post('/api/blogs').send(newBlog).expect(400);

  const response = await helper.blogsInDb();
  const blogs = response.filter((r) => r.author === 'no title');

  expect(blogs).toHaveLength(0);
});

test('blog without url is not added', async () => {
  const newBlog = {
    title: 'no url',
    author: 'just a test',
  };

  await api.post('/api/blogs').send(newBlog).expect(400);

  const response = await helper.blogsInDb();
  const blogs = response.filter((r) => r.title === 'no url');

  expect(blogs).toHaveLength(0);
});

test('blog without author is not added', async () => {
  const newBlog = {
    title: 'no author',
    url: 'no author',
  };

  await api.post('/api/blogs').send(newBlog).expect(400);

  const response = await helper.blogsInDb();
  const blogs = response.filter((r) => r.title === 'no author');

  expect(blogs).toHaveLength(0);
});

afterAll(() => {
  mongoose.connection.close();
});
