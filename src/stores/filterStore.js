import { action, makeObservable, observable } from "mobx";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

class FilterStore {
  defaultOptions = {};
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
    offset: 0,
  };
  listTags = [];
  advts = [];
  allCount = 0;
  updateId = uuidv4();

  constructor() {
    this.defaultOptions = this.filterOptions;

    makeObservable(this, {
      filterOptions: observable,
      advts: observable,
      listTags: observable,
      onEditFilter: action,
      setAdvts: action,
      setFilterOptions: action,
      getInitInfo: action,
      moreGetAdvts: action,
      addTagtoList: action,
    });
  }

  onEditFilter = (option) => {
    const options = option
      ? { ...this.filterOptions, ...option, isChangeFilter: true }
      : this.defaultOptions;

    if (option) {
      this.addTagtoList(option);
    }

    axios
      .post(`https://server.autohunt.by/all_advts`, {
        ...options,
      })
      .then((res) => {
        const { advts, count } = res.data;

        this.setAdvts(advts, count);

        this.setFilterOptions(options, count);
      });
  };

  setAdvts = (advts, count) => {
    this.advts = advts;
    this.allCount = count;
    this.updateId = uuidv4();
  };

  setFilterOptions = (options, count) => {
    this.filterOptions = {
      ...options,
      founded: count,
    };
  };

  addTagtoList = (option) => {
    let tag = null;

    if ("isExchange" in option) {
      tag = "обмен";
    } else if ("isExchange" in option) {
    }

    if (tag && this.listTags.includes(tag)) {
      this.listTags.splice(this.listTags.indexOf(tag), 1);
    } else if (tag) {
      this.listTags.push(tag);
    }
  };

  moreGetAdvts = () => {
    this.filterOptions = {
      ...this.filterOptions,
      offset: this.filterOptions.offset + 15,
    };

    return axios
      .post(`https://server.autohunt.by/all_advts`, { ...this.filterOptions })
      .then((res) => {
        const { advts } = res.data;

        return [...advts];
      });
  };

  getInitInfo = async (model, series) => {
    let result = {};

    if (model && series) {
      result = await axios.post(`https://server.autohunt.by/get_cars_name`, {
        model,
        series,
      });
    } else if (model) {
      result = await axios.post(`https://server.autohunt.by/get_cars_name`, {
        model,
      });
    } else {
      result = await axios.post(`https://server.autohunt.by/get_cars_name`, {});
    }

    return result.data;
  };
}

export default new FilterStore();
