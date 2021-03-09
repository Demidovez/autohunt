import React from "react";
import { Button, Loader } from "rsuite";
import NewsCard from "../NewsCard/newscard";
import css from "./newslist.module.css";

function NewsList() {
  return <div>NewsList</div>;
}

// function NewsList() {
//   const formatNumber = (num) =>
//     num ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ") : num;
//
//   const { count, news, getMoreNews, moreNews } = newsStore;
//
//   console.log([...news]);
//
//   return (
//     <div>
//       {news.length === 0 && (
//         <Loader className={css.loader} size="md" center content="Загрузка..." />
//       )}
//       {news.length > 0 &&
//         [...news, ...moreNews].map((news) => (
//           <NewsCard key={news.id} news={news} className={css.news} />
//         ))}
//       {news.length > 0 && news.length !== count && (
//         <div className={css.more}>
//           <Button appearance="default" onClick={getMoreNews}>
//             Показать еще
//           </Button>
//           <span>
//             {formatNumber(news.length + moreNews.length)} из{" "}
//             {formatNumber(count)}
//           </span>
//         </div>
//       )}
//     </div>
//   );
// }

export default NewsList;
