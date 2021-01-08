import React from "react";
import { Container, Content } from "rsuite";
import css from "./foundedauto.module.css";

class FoundedAuto extends React.Component {
  render() {
    return (
      <Container className={css.container}>
        <Content className={css.cards}>
          {/* <FilterCard />
          <FilterCard />
          <FilterCard />
          <FilterCard /> */}
        </Content>
      </Container>
    );
  }
}

export default FoundedAuto;
