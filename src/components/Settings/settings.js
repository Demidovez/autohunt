import React from "react";
import { Container, Header, Content } from "rsuite";
import css from "./settings.module.css";

class Settings extends React.Component {
  render() {
    return (
      <Container>
        <Header>
          <h2>Настройки</h2>
        </Header>
        <Content>Content Settings</Content>
      </Container>
    );
  }
}

export default Settings;
