import React from "react";
import NewsList from "../../components/NewsList/newslist";
import "./styles.scss";

function NewsPage() {
  return (
    <div className="news-page-component">
      <h1 className="h1">Новости</h1>
      <NewsList />
    </div>
  );
}

export default NewsPage;
