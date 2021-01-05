import React from "react";
import { Container, Header, Content } from "rsuite";
import css from "./myfiltres.module.css";

class MyFiltres extends React.Component {
  render() {
    return (
      <Container>
        <Header>
          <h2>Мои фильтры</h2>
        </Header>
        <Content>Content</Content>
      </Container>
    );
  }
}

export default MyFiltres;
