import React from "react";
import { Container, Content } from "rsuite";
import FoundedList from "../../../components/FoundedList/foundedlist";
import css from "./foundedauto.module.css";

function FoundedAuto() {
  return (
    <Container className={css.container}>
      <Content className={css.cards}>
        <FoundedList />
      </Content>
    </Container>
  );
}

export default FoundedAuto;
