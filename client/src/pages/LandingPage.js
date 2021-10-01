import React from "react";
import MainHero from "../components/MainHero/MainHero";
import CategoryDisplay from "../components/CategoryDisplay/CategoryDisplay";
import CardDisplay from "../components/CardDisplay/CardDisplay";
import { useQuery, gql, useMutation } from "@apollo/client";

const ANIMALS_QUERY = gql`
  {
    animals {
      image
      title
      rating
      price
      slug
    }
  }
`;

const ADD_ANIMAL = gql`
  mutation (
    $title: String!
    $image: String!
    $rating: Float
    $price: String!
    $description: [String!]!
    $stock: Int!
    $slug: String!
    $onSale: Boolean
    $category: String!
  ) {
    addAnimal(
      title: $title
      image: $image
      rating: $rating
      price: $price
      description: $description
      stock: $stock
      slug: $slug
      onSale: $onSale
      category: $category
    ) {
      image
      id
    }
  }
`;

function LandingPage() {
  const { loading, error, data } = useQuery(ANIMALS_QUERY);
  const [addAnimal] = useMutation(ADD_ANIMAL);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error oh... Error</div>;
  }

  return (
    <div>
      <MainHero />
      <CategoryDisplay />
      <CardDisplay animals={data.animals} />
      <button
        onClick={() => {
          addAnimal({
            variables: {
              title: "This is a rare bird",
              image: "penguin",
              rating: 4.4,
              price: "17000",
              description: ["A full breed bird", "Strong genes"],
              stock: 3,
              slug: "penguin",
              category: "4",
            },
          });
        }}
      >
        Add Animal
      </button>
    </div>
  );
}

export default LandingPage;
