import React from "react";
import { Grid, Row, Col, Navbar, Nav, Icon, Header } from "rsuite";
import { Link } from "react-router-dom";
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
                    <Nav.Item
                      eventKey="1"
                      icon={<Icon icon="home" />}
                      componentClass={Link}
                      to="/"
                    >
                      Главная
                    </Nav.Item>
                    <Nav.Item eventKey="2" componentClass={Link} to="/news">
                      Новости
                    </Nav.Item>
                    <Nav.Item eventKey="3" componentClass={Link} to="/about">
                      О нас
                    </Nav.Item>
                    <Nav.Item eventKey="4" componentClass={Link} to="/contacts">
                      Контакты
                    </Nav.Item>
                  </Nav>
                  <Nav pullRight>
                    <Nav.Item
                      icon={<Icon icon="avatar" />}
                      componentClass={Link}
                      to="/account"
                    >
                      Кабинет
                    </Nav.Item>
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
