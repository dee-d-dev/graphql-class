const { ApolloServer, gql } = require("apollo-server");
const typeDefs = require("./schema");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Animal = require("./resolvers/Animal");
const Category = require("./resolvers/Category");
const { mainCards, animals, categories } = require("./db");

const server = new ApolloServer({
  typeDefs,
  resolvers: { Query, Animal, Category, Mutation },
  context: { mainCards, animals, categories },
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
