import React from "react";
import { Container, Content } from "rsuite";
import FoundedList from "../../../components/FoundedList/foundedlist";
import css from "./foundedauto.module.css";

class FoundedAuto extends React.Component {
  render() {
    // const { advt } = this.state;

    return (
      <Container className={css.container}>
        <Content className={css.cards}>
          <FoundedList />
        </Content>
      </Container>
    );
  }
}

export default FoundedAuto;
