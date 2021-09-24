const { ApolloServer, gql } = require("apollo-server");
const {mainCards, animals}  = require('./db')

const typeDefs = gql`
  type MainCard {
    title: String!
    image: String!
  }

  type Animal {
    title: String!
    image: String!
    rating: Float
    pricing: String!
    description: [String!]!
    stock: Int!
    onSale: Boolean
  }

  type Query {
    mainCards: [MainCard]
    animals: [Animal]
  }
`;



const resolvers = {
  Query: {
    mainCards: () => mainCards,
    animals: () => animals,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
