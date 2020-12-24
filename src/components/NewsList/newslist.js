import React from "react";
import { Button, Loader } from "rsuite";
import { observer } from "mobx-react";
import newsStore from "../../stores/newsStore";
import NewsCard from "../NewsCard/newscard";
import css from "./newslist.module.css";

const NewsList = observer(
  class extends React.Component {
    formatNumber = (num) =>
      num ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ") : num;

    render() {
      const { count, news, getMoreNews, moreNews } = newsStore;

      console.log([...news]);

      return (
        <div>
          {news.length === 0 && (
            <Loader
              className={css.loader}
              size="md"
              center
              content="Загрузка..."
            />
          )}
          {news.length > 0 &&
            [...news, ...moreNews].map((news) => (
              <NewsCard key={news.id} news={news} className={css.news} />
            ))}
          {news.length > 0 && news.length !== count && (
            <div className={css.more}>
              <Button appearance="default" onClick={getMoreNews}>
                Показать еще
              </Button>
              <span>
                {this.formatNumber(news.length + moreNews.length)} из{" "}
                {this.formatNumber(count)}
              </span>
            </div>
          )}
        </div>
      );
    }
  }
);

export default NewsList;
