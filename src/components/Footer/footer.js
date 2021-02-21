import React from "react";
import { Grid, Row, Col, Footer } from "rsuite";
import css from "./footer.module.css";

function FooterSite() {
  return (
    <Footer className={css.container}>
      <Grid fluid>
        <Row>
          <Col xs={24} sm={24} md={4} lg={4}></Col>
          <Col xs={24} sm={24} md={16} lg={16}>
            <div className={css.info}></div>
            <div className={css.copyright}>© 2020 AutoHunt.by</div>
          </Col>
          <Col xs={24} sm={24} md={4} lg={4}></Col>
        </Row>
      </Grid>
    </Footer>
  );
}

export default FooterSite;
