import React from "react";
import { Container, Content } from "rsuite";
import FilterCard from "../FilterCard/filtercard";
import css from "./myfiltres.module.css";

class MyFiltres extends React.Component {
  render() {
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
}

export default MyFiltres;
