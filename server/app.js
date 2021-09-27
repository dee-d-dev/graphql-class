const { ApolloServer, gql } = require("apollo-server");
const { mainCards, animals, categories } = require("./db");

const typeDefs = gql`
  type MainCard {
    title: String!
    image: String!
  }

  type Animal {
    id: ID!
    title: String!
    image: String!
    rating: Float
    pricing: String!
    description: [String!]!
    stock: Int!
    slug: String!
    onSale: Boolean
    category: Category
  }

  type Category {
    id: ID!
    image: String!
    category: String!
    slug: String!
    animals: [Animal!]!
  }

  type Query {
    mainCards: [MainCard]
    animals: [Animal]
    animal(slug: String): Animal
    categories: [Category!]!
    category(slug: String): Category!
  }
`;

const resolvers = {
  Query: {
    mainCards: () => mainCards,
    animals: () => animals,
    animal: (parent, args, ctc) => {
      let animal = animals.find((animal) => {
        return animal.slug === args.slug;
      });
      return animal;
    },
    categories: () => categories,
    category: (parent, args, ctx) => {
      let category = categories.find((category) => {
        return category.slug === args.slug;
      });

      return category;
    },
  },
  Category: {
    animals: (parent, args, ctx) => {
      return animals.filter((animal) => {
        return animal.category === parent.id;
      });
    },
  },

  Animal: {
    category: (parent, args, ctx) => {
      console.log(parent);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
