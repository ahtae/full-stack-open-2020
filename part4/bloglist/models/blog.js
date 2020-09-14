const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3
  },
  author: {
    type: String,
    required: true,
    minLength: 3,
  },
  url: {
    type: String,
    required: true,
    minlength: 3,
  },
  likes: {
    type: Number,
    default: 0
  }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
