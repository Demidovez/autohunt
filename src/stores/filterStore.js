import { action, makeObservable, observable, toJS } from "mobx";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

class FilterStore {
  // Значения фильтра по умолчанию
  defaultOptions = {};

  // Значения фильтра
  filterOptions = {
    countModels: 1,
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
    currencyUnit: "р.",
    currency: "BYN",
    founded: 0,
    isChangeFilter: false,
    order: null,
  };

  // Теги фильтра
  tags = [];

  // Найденные объявления
  advts = [];

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

  // Сдвиг по найденным для отобржания после нажатия Показать еще
  offsetAdvts = 0;

  // ID обновления фильтрации объявлений
  updateId = uuidv4();

  constructor() {
    // Сразу определяем опции фильтра по умолчанию
    this.defaultOptions = this.filterOptions;
    this.orderValue = this.orderData[0];

    // Настраиваем MobX (для работы со состоянием)
    makeObservable(this, {
      filterOptions: observable,
      advts: observable,
      tags: observable,
      orderValue: observable,
      onEditFilter: action,
      setAdvtsAndFilterOptions: action,
      setTags: action,
      getInitInfo: action,
      moreGetAdvts: action,
      onSort: action,
    });
  }

  // Action изменения опции фильтра
  onEditFilter = (option) => {
    const newOption =
      option && option.length ? option.filter((o) => o) : option;

    const options = option
      ? { ...this.filterOptions, ...newOption, isChangeFilter: true }
      : this.defaultOptions;

    // Находим объявления по измененнному фильтру
    axios
      .post(`https://server.autohunt.by/all_advts`, {
        ...options,
      })
      .then((res) => {
        const { advts, count } = res.data;

        this.setAdvtsAndFilterOptions(advts, options, count);

        if (option) {
          Object.entries(option).forEach((option) => {
            const field = option[0];
            const values = option[1].length
              ? [...toJS(option[1])]
              : [toJS(option[1])];

            values.map((value, indx) => this.setTags([field, value, indx]));
          });
        } else {
          this.setTags();
          this.onSort();
        }
      });
  };

  // Обновляем найденные объявления и опции фильтра
  setAdvtsAndFilterOptions = (advts, options, count) => {
    this.advts = advts;
    this.updateId = uuidv4();
    this.offsetAdvts = 0;

    this.filterOptions = {
      ...options,
      founded: count,
    };
  };

  // Обновляем список тегов
  setTags(option) {
    if (!option) {
      this.tags = [];
      return;
    }

    let field = option[0];
    let value = option[1];
    let index = option[2];
    let label = "";
    let maybeTags = [];

    if (field === "isExchange") {
      label = "обмен";

      maybeTags.push({ field, label, value, index });
    } else if (field === "prices") {
      label =
        index === 0
          ? `от ${value} ${this.filterOptions.currencyUnit}`
          : `до ${value} ${this.filterOptions.currencyUnit}`;

      maybeTags.push({ field, label, value, index });
    } else if (field === "currencyUnit") {
      field = "prices";

      this.filterOptions.prices.forEach((value, index) => {
        label =
          index === 0
            ? `от ${value} ${this.filterOptions.currencyUnit}`
            : `до ${value} ${this.filterOptions.currencyUnit}`;

        maybeTags.push({ field, label, value, index });
      });
    } else if (field === "models") {
      Object.entries(value).map((label) =>
        maybeTags.push({
          field: label[0],
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
      switch (value) {
        case "передний":
        case "передний привод":
          label = "передний";
          index = 0;
          break;
        case "задний":
        case "задний привод":
          label = "задний";
          index = 1;
          break;
        case "полный":
        case "подключаемый полный привод":
        case "постоянный полный привод":
          label = "полный";
          index = 2;
          break;
        default:
          label = value;
      }

      maybeTags.push({ field, label, value, index });
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
  }

  // Сортировка объявлений
  onSort = (value, orderValue) => {
    if (!value) {
      this.orderValue = this.orderData[0];
      return;
    }

    const options = {
      ...this.filterOptions,
      order: value,
    };

    this.orderValue = orderValue;

    axios.post(`https://server.autohunt.by/all_advts`, options).then((res) => {
      const { advts, count } = res.data;

      this.setAdvtsAndFilterOptions(advts, options, count);
    });
  };

  // Выводим дополнительные объявления после нажатия Показать еще
  moreGetAdvts = () => {
    this.offsetAdvts = this.offsetAdvts + 15;

    return axios
      .post(`https://server.autohunt.by/all_advts`, {
        ...this.filterOptions,
        offset: this.offsetAdvts,
      })
      .then((res) => {
        const { advts } = res.data;

        return [...advts];
      });
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
}

export default new FilterStore();
