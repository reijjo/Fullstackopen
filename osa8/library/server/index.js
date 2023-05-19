const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const { v1: uuid } = require("uuid");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("connected to MongoDB"))
  .catch((error) => {
    console.log("error connecting to MongoDB", error.message);
  });

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
 */

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

/*
  you can remove the placeholder query once your first own has been implemented
*/

const typeDefs = `
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
		bookCount: Int
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
    dummy: Int
		bookCount: Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
		me: User
  }

	type Mutation {
		addBook(
			title: String!
			author: String!
			published: Int!
			genres: [String!]
		): Book

		editAuthor(
			name: String!
			setBornTo: Int!
		): Author

		createUser(
			username: String!
			favoriteGenre: String
		): User

		login(
			username: String!
			password: String!
		): Token
	}
`;

const resolvers = {
  Query: {
    dummy: () => 0,
    // bookCount: () => books.length,
    bookCount: () => Book.collection.countDocuments(),
    // authorCount: () => authors.length,
    authorCount: () => Author.collection.countDocuments(),
    // allBooks: (root, args) => {
    //   if (!args.author && !args.genre) {
    //     return books;
    //   } else if (args.author && args.genre) {
    //     const byAuthorGenre = (book) =>
    //       args.author === book.author && book.genres.includes(args.genre);
    //     return books.filter(byAuthorGenre);
    //   } else if (args.author) {
    //     const byAuthor = (book) =>
    //       args.author === book.author ? book.author : null;
    //     return books.filter(byAuthor);
    //   } else if (args.genre) {
    //     const byGenre = (book) => book.genres.includes(args.genre);
    //     return books.filter(byGenre);
    //   }
    // },
    allBooks: async (root, args, context) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate("author");
      } else if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author });
        if (author) {
          return Book.find({ author: author._id, genres: args.genre }).populate(
            "author"
          );
        } else {
          return [];
        }
      } else if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (author) {
          return Book.find({ author: author._id }).populate("author");
        } else {
          return [];
        }
      } else if (args.genre) {
        return Book.find({ genres: args.genre }).populate("author");
      }
    },
    // allAuthors: () => {
    //   console.log("au1", authors);
    //   return authors.map((author) => {
    //     const bookCount = books.filter(
    //       (book) => book.author === author.name
    //     ).length;
    //     return { ...author, bookCount };
    //   });
    // },
    allAuthors: async () => {
      const authors = await Author.find({});
      const books = await Book.find({});
      console.log("au", authors);
      console.log("bo", books);

      return authors.map(async (au) => {
        const bookCount = await Book.countDocuments({ author: au._id });
        // const bookCount = books.filter((book) => book.author === au._id).length;
        // .collection.countDocuments();
        return { ...au._doc, bookCount };
      });
    },
  },
  Mutation: {
    // addBook: (root, args) => {
    //   const author = authors.find((a) => a.name === args.author);

    //   console.log("author", author);

    //   if (!author) {
    //     const newAuthor = {
    //       name: args.author,
    //       id: uuid(),
    //     };
    //     authors = authors.concat(newAuthor);
    //   }

    //   const book = { ...args, id: uuid() };
    //   books = books.concat(book);
    //   return book;
    // },
    addBook: async (root, args, context) => {
      const author = await Author.findOne({ name: args.author });
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      if (!author) {
        if (args.author.length < 4) {
          throw new GraphQLError("Author name too short", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
            },
          });
        }
        const newAuthor = new Author({ name: args.author });
        await newAuthor.save();
        args.author = newAuthor.name;
      }

      if (args.title.length < 5) {
        throw new GraphQLError("Book title too short", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
          },
        });
      }

      const book = new Book({ ...args, author: author._id });

      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.author,
            error,
          },
        });
      }
      return book.populate("author");
    },
    editAuthor: (root, args) => {
      const author = authors.find((a) => a.name === args.name);
      if (!author) {
        return null;
      }

      const updatedAuthor = { ...author, born: args.setBornTo };
      authors = authors.map((a) => (a.name === args.name ? updatedAuthor : a));
      return updatedAuthor;
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
    // addFavoriteGenre: async (root, args, {currentUser}) => {
    // 	const noGenres = (genre) => !currentUser.favoriteGenre
    // }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    console.log("AUTH", auth);
    if (auth && auth.startsWith("Bearer ")) {
      const token = auth.substring(7);
      try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("DECODED", decodedToken);
        // const currentUser = await User.findById(decodedToken.id).populate(
        //   "friends"
        // );
        const currentUser = await User.findById(decodedToken.id);
        return { currentUser };
      } catch (error) {
        console.log("<><><><><><>ERRIR", error);
      }
      return {};
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
