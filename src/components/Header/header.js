import React from "react";
import { Grid, Row, Col, Navbar, Nav, Icon, Header } from "rsuite";
import css from "./header.module.css";

class HeaderSite extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeKey: null };
  }

  handleSelect = (eventKey) => {
    this.setState({
      activeKey: eventKey,
    });
  };

  render() {
    const { activeKey } = this.state;

    return (
      <Header>
        <Navbar appearance="inverse">
          <Grid fluid>
            <Row>
              <Col xs={24} sm={24} md={4} lg={4}></Col>
              <Col xs={24} sm={24} md={16} lg={16}>
                <Navbar.Header></Navbar.Header>
                <Navbar.Body>
                  <Nav onSelect={this.handleSelect} activeKey={activeKey}>
                    <Nav.Item eventKey="1" icon={<Icon icon="home" />}>
                      Поиск
                    </Nav.Item>
                    <Nav.Item eventKey="2">Новости</Nav.Item>
                    <Nav.Item eventKey="3">О нас</Nav.Item>
                    <Nav.Item eventKey="4">Контакты</Nav.Item>
                  </Nav>
                  <Nav pullRight>
                    <Nav.Item icon={<Icon icon="avatar" />}>Кабинет</Nav.Item>
                  </Nav>
                </Navbar.Body>
              </Col>
              <Col xs={24} sm={24} md={4} lg={4}></Col>
            </Row>
          </Grid>
        </Navbar>
      </Header>
    );
  }
}

export default HeaderSite;
