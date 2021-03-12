import React from "react";
import { Grid, Row, Col, Footer } from "rsuite";
import "./styles.scss";

function FooterSite() {
  return (
    <Footer className="footer-site-component">
      <Grid fluid>
        <Row>
          <Col xs={24} sm={24} md={4} lg={4}></Col>
          <Col xs={24} sm={24} md={16} lg={16}>
            <div className="info"></div>
            <div className="copyright">© 2020 AutoHunt.by</div>
          </Col>
          <Col xs={24} sm={24} md={4} lg={4}></Col>
        </Row>
      </Grid>
    </Footer>
  );
}

export default FooterSite;
