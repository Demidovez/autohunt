import React from "react";
import { Container, Content } from "rsuite";
import FilterCard from "../../../components/FilterCard/filtercard";
import "./styles.scss";

function MyFilters() {
  return (
    <Container className="my-filters-component">
      <Content className="cards">
        <FilterCard />
        <FilterCard />
        <FilterCard />
        <FilterCard />
      </Content>
    </Container>
  );
}

export default MyFilters;
