import React from "react";
import { Breadcrumb } from "rsuite";
import { Link } from "react-router-dom";
import css from "./aboutpage.module.css";

class AboutPage extends React.Component {
  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default AboutPage;
