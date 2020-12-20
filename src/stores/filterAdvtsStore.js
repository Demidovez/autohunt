import {
  action,
  computed,
  makeObservable,
  observable,
  autorun,
  toJS,
} from "mobx";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

class FilterAdvtsStore {
  // Значения фильтра
  filterOptions = {};

  // Значения фильтра по умолчанию
  defaultOptions = {
    prices: [null, null],
    isExchange: false,
    models: [{ model: null, series: null, generation: null }],
    carcases: [],
    fuels: [],
    years: [null, null],
    transmissions: [],
    gearings: [],
    volumes: [null, null],
    mileages: [null, null],
    colors: [],
    currency: { label: "BYN", unit: "р." },
    order: null,
  };

  // Теги фильтра
  tags = [];

  // Найденные объявления
  advts = [];

  // Количество объявлений
  count = [];

  // ID обновления списка объявления
  updateId = null;

  // Сдвиг по найденным для отобржания после нажатия Показать еще
  offsetAdvts = 0;

  // Текущая сортировка
  orderValue = {};

  // Варианты сортировки
  orderData = [
    {
      label: "Новые объявления",
      value: [["id", "DESC"]],
    },
    {
      label: "Старые объявления",
      value: [["id", "ASC"]],
    },
    {
      label: "Дешевые авто",
      value: [["price", "ASC"]],
    },
    {
      label: "Дорогие авто",
      value: [["price", "DESC"]],
    },
  ];

  constructor() {
    // Сразу сбрасываем опции фильтра по умолчанию
    this.onResetFilter();

    // Настраиваем MobX (для работы со состоянием)
    makeObservable(this, {
      filterOptions: observable,
      advts: observable,
      count: observable,
      updateId: observable,
      tags: observable,
      orderValue: observable,
      isChanged: computed,
      setTag: action,
      onEditFilter: action,
      onResetFilter: action,
      getInitInfo: action,
      getMoreAdvts: action,
      onSort: action,
      onCloseTag: action,
      setAdvts: action,
      setCount: action,
      setUpdateId: action,
    });

    // Обновляем список объявлений при изменении фильтра
    autorun(() =>
      this.getAdvts(this.filterOptions)
        .then(({ advts, count }) => {
          this.setAdvts(advts);
          this.setCount(count);
        })
        .then(() => this.setUpdateId(uuidv4()))
    );
  }

  get isChanged() {
    return this.tags.length ? true : false;
  }

  // Устанавливаем найденные объявления
  setAdvts = (advts) => {
    this.advts = advts;
  };

  // Устанавливаем количество объявлений
  setCount = (count) => {
    this.count = count;
  };

  // Устанавливае ID обновления списка объявления
  setUpdateId = (updateId) => {
    this.updateId = updateId;
  };

  // Изменения опции фильтра
  onEditFilter = (option) => {
    this.filterOptions = {
      ...this.filterOptions,
      ...option,
    };

    this.setTag(option);
  };

  // Достаем из сервера объявления по опциям
  getAdvts = (options) =>
    axios
      .post("https://server.autohunt.by/all_advts", options)
      .then(({ data }) => data);

  // Добавляем тег
  setTag = (option) => {
    let [field, values] = Object.entries(option)[0];

    const dirtyTag = { field, values: values.length ? [...values] : [values] };

    const maybeTags = [];

    dirtyTag.values.forEach((value, index) => {
      let label = value;

      if (field === "isExchange") {
        label = "обмен";

        maybeTags.push({ field, label, value, index });
      } else if (field === "prices") {
        label =
          index === 0
            ? `от ${value} ${this.filterOptions.currency.unit}`
            : `до ${value} ${this.filterOptions.currency.unit}`;

        maybeTags.push({ field, label, value, index });
      } else if (field === "currency") {
        field = "prices";

        this.filterOptions.prices.forEach((value, index) => {
          label =
            index === 0
              ? `от ${value} ${this.filterOptions.currency.unit}`
              : `до ${value} ${this.filterOptions.currency.unit}`;

          maybeTags.push({ field, label, value, index });
        });
      } else if (field === "models") {
        Object.entries(value).map((label) =>
          maybeTags.push({
            field: label[0], // TODO: Нужно уточнить field
            label: label[1],
            value: label[1],
            index,
          })
        );
      } else if (field === "carcases") {
        maybeTags.push({ field, label: value, value, index });
      } else if (field === "fuels") {
        maybeTags.push({ field, label: value, value, index });
      } else if (field === "transmissions") {
        label = value === "автомат" ? "автоматическая" : "механическая";

        maybeTags.push({ field, label, value, index });
      } else if (field === "gearings") {
        maybeTags.push({ field, label: value, value, index });
      } else if (field === "colors") {
        label = value === "другой" ? "другой цвет" : value;

        maybeTags.push({ field, label, value, index });
      } else if (field === "years") {
        label = index === 0 ? `от ${value} г.` : `до ${value} г.`;

        maybeTags.push({ field, label, value, index });
      } else if (field === "volumes") {
        label = index === 0 ? `от ${value} л.` : `до ${value} л.`;

        maybeTags.push({ field, label, value, index });
      } else if (field === "mileages") {
        label = index === 0 ? `от ${value} км.` : `до ${value} км.`;

        maybeTags.push({ field, label, value, index });
      } else {
        return;
      }

      // TODO: Если глянуть в стор, то некоторые поля (gearings) увеличиваются в размерах (лишнее добавление null в массив).
      // Это нужно для отслеживания изменения index.
      // Нужно с этим разобраться.
      maybeTags.forEach(({ field, label, value, index }) => {
        if (this.tags.length) {
          for (let i = 0; i < this.tags.length; i++) {
            const tag = this.tags[i];

            if (tag.field === field && tag.index === index) {
              if (value) {
                this.tags[i].label = label;
                this.tags[i].index = index;
              } else {
                this.tags.splice(i, 1);
              }

              break;
            }

            if (value && i === this.tags.length - 1) {
              this.tags.push({ field, label, index });
            }
          }
        } else if (value) {
          this.tags.push({ field, label, index });
        }
      });
    });
  };

  // Выводим дополнительные объявления после нажатия Показать еще
  getMoreAdvts = () => {
    this.offsetAdvts = this.offsetAdvts + 15;

    // TODO: Если на сервер спарсятся новые объявы, то на сайте после нажатия кнопки могут подгрузиться дубли

    return this.getAdvts({
      ...this.filterOptions,
      offset: this.offsetAdvts,
    }).then(({ advts }) => [...advts]);
  };

  // Сортировка объявлений
  onSort = (value, orderValue) => {
    this.orderValue = orderValue;

    this.filterOptions = {
      ...this.filterOptions,
      order: value,
    };
  };

  // Определяем список названий моделей, кузовов, двигателей и цветов авто
  getInitInfo = async (model, series) => {
    let postOptions = {};

    if (model && series) {
      postOptions = {
        model,
        series,
      };
    } else if (model) {
      postOptions = {
        model,
      };
    }

    return await axios
      .post(`https://server.autohunt.by/get_cars_name`, postOptions)
      .then(({ data }) => data);
  };

  // Закрытие тега
  onCloseTag = (tag, indexOfTags) => {
    const { field, index } = tag;

    this.tags.splice(indexOfTags, 1);

    if (field === "model" || field === "series" || field === "generation") {
      this.filterOptions["models"][index] = {
        ...this.filterOptions["models"][index],
        [field]: null,
      };
    } else if (this.filterOptions[field].length) {
      this.filterOptions[field][index] = this.defaultOptions[field][index];
    } else {
      this.filterOptions[field] = this.defaultOptions[field];
    }
  };

  // Сброс фильтра
  onResetFilter = () => {
    this.filterOptions = this.defaultOptions;
    this.offsetAdvts = 0;
    this.tags = [];
    this.orderValue = this.orderData[0];
  };
}

export default new FilterAdvtsStore();
