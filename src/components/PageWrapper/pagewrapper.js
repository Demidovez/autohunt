import React from "react";
import { Grid, Row, Col, Content } from "rsuite";
import css from "./pagewrapper.module.css";

class PageWrapper extends React.Component {
  render() {
    return (
      <Content className={css.container}>
        <Grid fluid>
          <Row>
            <Col xs={24} sm={24} md={4} lg={4}></Col>
            <Col xs={24} sm={24} md={12} lg={16}>
              {this.props.children}
            </Col>
            <Col xs={24} sm={24} md={4} lg={4}></Col>
          </Row>
        </Grid>
      </Content>
    );
  }
}

export default PageWrapper;
