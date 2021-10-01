import React from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import CardDisplay from "../components/CardDisplay/CardDisplay";
import { useQuery, gql } from "@apollo/client";

const FETCH_PAGE = gql`
  query ($slug: String!) {
    category(slug: $slug) {
      image
      category
      animals {
        description
        title
        image
      }
    }
  }
`;

function CategoryPage() {
  const { slug } = useParams();
  const { loading, error, data } = useQuery(FETCH_PAGE, {
    variables: {
      slug,
    },
  });

  if (loading) return <h1>Loading...</h1>;

  if (data) {
    console.log(data);
  }
  if (error) {
    return <h3>Error!!!</h3>;
  }

  return (
    <div className="py-5">
      <Container>
        <h1 className="text-capitalize">
          {data.category.category}
          <CardDisplay animals={data.category.animals} />
        </h1>
      </Container>
    </div>
  );
}

export default CategoryPage;
