import { action, makeObservable, observable, runInAction, autorun } from "mobx";
import axios from "axios";

class NewsStore {
  // Полученные новости
  news = [];

  // Дополнительные новости (после нажатия Показать еще)
  moreNews = [];

  // Количество новостей
  count = [];

  // Сдвиг по найденным для отобржания после нажатия Показать еще
  offsetNews = 0;

  // Текущая сортировка
  orderValue = {};

  // Варианты сортировки
  orderData = [
    {
      label: "Новые новости",
      value: [["id", "DESC"]],
    },
    {
      label: "Старые новости",
      value: [["id", "ASC"]],
    },
  ];

  constructor() {
    this.orderValue = this.orderData[0];

    // Настраиваем MobX (для работы со состоянием)
    makeObservable(this, {
      news: observable,
      moreNews: observable,
      count: observable,
      orderValue: observable,
      getMoreNews: action,
      onSort: action,
    });

    // Достаем новости

    autorun(() =>
      this.getNews({
        orderValue: this.orderValue,
      }).then(({ news, count }) => {
        runInAction(() => {
          this.news = news;
          this.moreNews = [];
          this.count = count;
        });
      })
    );
  }

  // Достаем из сервера новости по опциям
  getNews = (option) =>
    axios
      .post("https://server.autohunt.by/all_news", option)
      .then(({ data }) => data);

  // Выводим дополнительные новости после нажатия Показать еще
  getMoreNews = () => {
    this.offsetNews = this.offsetNews + 15;

    this.getNews({
      offset: this.offsetNews,
      orderValue: this.orderValue,
    }).then(({ news }) =>
      runInAction(() => (this.moreNews = [...this.moreNews, ...news]))
    );
  };

  // Сортировка новостей
  onSort = (orderValue) => {
    this.orderValue = orderValue;
  };
}

export default new NewsStore();
