import React from "react";
import { Breadcrumb } from "rsuite";
import { Link } from "react-router-dom";
import NewsList from "../../components/NewsList/newslist";
import css from "./newspage.module.css";

class NewsPage extends React.Component {
  render() {
    return (
      <div>
        {/* TODO: Надо хлебные крошки вынести в отдельный компонент из вне, так как они на каждой странице */}
        <div className={css.breadcrumb}>
          <Breadcrumb>
            <Breadcrumb.Item componentClass={Link} to="/">
              Главная
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Новости</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <h1 className={css.header1}>Новости</h1>
        <NewsList />
      </div>
    );
  }
}

export default NewsPage;
