import React, { useState } from "react";
import "./CategoryDisplay.css";
import { Container } from "react-bootstrap";
import animals from "../../assets/images";

import { Link } from "react-router-dom";

import { useQuery, gql } from "@apollo/client";

const FETCH_CATEGORY = gql`
  {
    categories {
      id
      image
      category
    }
  }
`;

function CategoryDisplay() {
  const { loading, error, data } = useQuery(FETCH_CATEGORY);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (data) {
    console.log(data);
  }

  if (error) {
    return <div>Error oh... Error</div>;
  }

  return (
    <div className="CategoryDisplay">
      <Container className="CategoryDisplay-container">
        {data.categories.map((category) => {
          return (
            <Link
              to={`/products/${category.slug}`}
              className="CategoryDisplay-card-container"
            >
              <div className="CategoryDisplay-card">
                <img src={animals[category.image]} />
              </div>
              <h3>{category.category}</h3>
            </Link>
          );
        })}
      </Container>
    </div>
  );
}

export default CategoryDisplay;
