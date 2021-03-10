import React from "react";
import { Container, Content } from "rsuite";
import FilterCard from "../../../components/FilterCard/filtercard";
import css from "./myfilters.module.css";

function MyFilters() {
  return (
    <Container className={css.container}>
      <Content className={css.cards}>
        <FilterCard />
        <FilterCard />
        <FilterCard />
        <FilterCard />
      </Content>
    </Container>
  );
}

export default MyFilters;
