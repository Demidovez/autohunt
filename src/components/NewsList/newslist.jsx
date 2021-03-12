import React, { useEffect } from "react";
import { Button, Loader } from "rsuite";
import NewsCard from "../NewsCard/newscard";
import "./styles.scss";
import { formatNumber } from "../../helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllNewsAction,
  getMoreNewsAction,
} from "../../actions/creators/newsActionCreators";

function NewsList() {
  const { news, moreNews, count, orderValue, offset, offsetStep } = useSelector(
    (state) => state.news
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllNewsAction({ orderValue }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMoreNews = () =>
    dispatch(getMoreNewsAction({ orderValue, offset: offset + offsetStep }));

  return (
    <div className="news-list-component">
      {news.length === 0 && (
        <Loader className="loader" size="md" center content="Загрузка..." />
      )}
      {news.length > 0 &&
        [...news, ...moreNews].map((news) => (
          <NewsCard key={news.id} news={news} className="news" />
        ))}
      {/*TODO: мне кажется неверное условие проверки*/}
      {news.length > 0 && news.length !== count && (
        <div className="more">
          <Button appearance="default" onClick={getMoreNews}>
            Показать еще
          </Button>
          <span>
            {formatNumber(news.length + moreNews.length)} из{" "}
            {formatNumber(count)}
          </span>
        </div>
      )}
    </div>
  );
}

export default NewsList;
