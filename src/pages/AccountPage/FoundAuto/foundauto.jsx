import React from "react";
import { Container, Content } from "rsuite";
import FoundAutoList from "../../../components/FoundAutoList/foundautolist";
import "./styles.scss";

function FoundAuto() {
  return (
    <Container className="found-auto-component">
      <Content className="cards">
        <FoundAutoList />
      </Content>
    </Container>
  );
}

export default FoundAuto;
