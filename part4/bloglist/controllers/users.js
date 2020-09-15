const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs');

  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { body } = request;

  if (body.password.length < 3) {
    const errorMessage =
      'User validation failed: password: Path `password` ' +
      '(`' +
      body.password +
      '`) ' +
      'is shorter than the minimum allowed length (3).';

    response.status(400).json({
      error: errorMessage,
    });
  } else {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    });

    const savedUser = await user.save();

    response.json(savedUser);
  }
});

module.exports = usersRouter;
