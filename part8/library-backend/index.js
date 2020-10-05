const {
  ApolloServer,
  UserInputError,
  gql,
  AuthenticationError,
} = require('apollo-server');
const config = require('./utils/config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

console.log('connecting to', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]!
    me: User!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`;

const { PubSub } = require('apollo-server');
const pubsub = new PubSub();

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser;
    },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return await Book.find({}).populate('author');
      } else if (!args.author && args.genre) {
        return Book.find({ genres: { $in: args.genre } }).populate('author');
      } else if (args.author) {
        const author = await Author.findOne({ name: { $eq: args.author } });
        const idOfAuthor = author._id;

        if (!author) {
          return;
        } else if (author && !args.genre) {
          return Book.find({ author: idOfAuthor }).populate('author');
        } else {
          return Book.find({
            author: idOfAuthor,
            genres: { $in: args.genre },
          }).populate('author');
        }
      }
    },
    allAuthors: (root) => Author.find({}),
  },
  Mutation: {
    addBook: async (root, args, context) => {
      try {
        const author = new Author({ name: args.author });
        const currentUser = context.currentUser;

        if (!currentUser) {
          throw new AuthenticationError('Not authenticated!');
        }

        const savedAuthor = await author.save();
        const book = new Book({
          title: args.title,
          published: args.published,
          genres: args.genres,
          author: savedAuthor._id,
        });

        book.save();
        pubsub.publish('BOOK_ADDED', { bookAdded: book });

        return book;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError('Not authenticated!');
      }

      try {
        const author = Author.findOneAndUpdate(
          { name: args.name },
          { born: args.setBornTo }
        );

        return author;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secret') {
        throw new UserInputError('Wrong credentials!');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, config.JWT_SECRET) };
    },
    createUser: (root, args) => {
      try {
        const user = new User({
          username: args.username,
          favoriteGenre: args.favoriteGenre,
        });

        return user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), config.JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);

      return { currentUser };
    }
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
