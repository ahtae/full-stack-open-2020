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
    book: Book!
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
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
    addBook: async (root, args) => {
      try {
        const author = new Author({ name: args.author });
        const savedAuthor = await author.save();
        const book = new Book({
          title: args.title,
          published: args.published,
          genres: args.genres,
          author: savedAuthor._id,
        });

        return book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: (root, args) => {
      const author = Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo }
      );

      return author;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
