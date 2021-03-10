import React, { useState, useEffect } from "react";
import { Breadcrumb, Col, Grid, Row } from "rsuite";
import css from "./breadcrumbs.module.css";
import { Link, useLocation } from "react-router-dom";
import { getLabelBreadCrumbByPath } from "../../helpers";

function Breadcrumbs() {
  const location = useLocation();
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    const pathList = location.pathname.split("/");

    const paths = [
      { to: "/", label: "Главная" },
      ...pathList
        .filter((p) => p)
        .map((path) => ({ to: path, label: getLabelBreadCrumbByPath(path) })),
    ];

    setPaths(paths);
  }, [location.pathname]);

  return (
    <div className={css.container}>
      {paths.length > 1 && (
        <Grid fluid>
          <Row>
            <Col xs={24} sm={24} md={4} lg={4}></Col>
            <Col xs={24} sm={24} md={12} lg={16}>
              <div className={css.breadcrumb}>
                {/*<Breadcrumb>*/}
                {/*  <Breadcrumb.Item componentClass={Link} to="/">*/}
                {/*    Главная*/}
                {/*  </Breadcrumb.Item>*/}
                {/*  <Breadcrumb.Item active>О нас</Breadcrumb.Item>*/}
                {/*</Breadcrumb>*/}
                <Breadcrumb>
                  {paths.map((path, index) =>
                    index === paths.length - 1 ? (
                      <Breadcrumb.Item key={path.to} active>
                        {path.label}
                      </Breadcrumb.Item>
                    ) : (
                      <Breadcrumb.Item
                        key={path.to}
                        componentClass={Link}
                        to={path.to}
                      >
                        {path.label}
                      </Breadcrumb.Item>
                    )
                  )}
                </Breadcrumb>
              </div>
            </Col>
            <Col xs={24} sm={24} md={4} lg={4}></Col>
          </Row>
        </Grid>
      )}
    </div>
  );
}

export default Breadcrumbs;
