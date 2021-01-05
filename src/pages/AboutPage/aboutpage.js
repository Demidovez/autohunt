import React from "react";
import { Content, Grid, Row, Col, Breadcrumb } from "rsuite";
import { Link } from "react-router-dom";
import css from "./aboutpage.module.css";

class AboutPage extends React.Component {
  render() {
    return (
      <Content className={css.container}>
        <Grid fluid>
          <Row>
            <Col xs={24} sm={24} md={4} lg={4}></Col>
            <Col xs={24} sm={24} md={12} lg={16}>
              {/* TODO: Надо хлебные крошки вынести в отдельный компонент из вне, так как они на каждой странице */}
              <div className={css.breadcrumb}>
                <Breadcrumb>
                  <Breadcrumb.Item componentClass={Link} to="/">
                    Главная
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>О нас</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <h1 className={css.header1}>О нас</h1>
            </Col>
            <Col xs={24} sm={24} md={4} lg={4}></Col>
          </Row>
          <Row>
            <Col xs={24} sm={24} md={4} lg={4}></Col>
            <Col xs={24} sm={24} md={12} lg={16}></Col>
            <Col xs={24} sm={24} md={4} lg={4}></Col>
          </Row>
        </Grid>
      </Content>
    );
  }
}

export default AboutPage;
