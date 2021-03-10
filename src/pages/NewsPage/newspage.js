import React from "react";
import NewsList from "../../components/NewsList/newslist";
import css from "./newspage.module.css";

function NewsPage() {
  return (
    <div>
      <h1 className={css.header1}>Новости</h1>
      <NewsList />
    </div>
  );
}

export default NewsPage;
