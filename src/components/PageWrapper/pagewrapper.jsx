import React from "react";
import { Grid, Row, Col, Content } from "rsuite";
import "./styles.scss";

function PageWrapper({ children }) {
  return (
    <Content className="page-wrapper-component">
      <Grid fluid>
        <Row>
          <Col xs={24} sm={24} md={4} lg={4}></Col>
          <Col xs={24} sm={24} md={12} lg={16}>
            {children}
          </Col>
          <Col xs={24} sm={24} md={4} lg={4}></Col>
        </Row>
      </Grid>
    </Content>
  );
}

export default PageWrapper;
