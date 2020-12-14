import { action, makeObservable, observable } from "mobx";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

class FilterStore {
  advts = [];
  allCount = 0;
  filterOptions = {};
  updateId = uuidv4();

  constructor() {
    makeObservable(this, {
      advts: observable,
      startGetAdvts: action,
      setAdvts: action,
      getInitInfo: action,
      moreGetAdvts: action,
    });
  }

  startGetAdvts = (filterOptions) => {
    this.filterOptions = {
      ...filterOptions,
      offset: 0,
    };

    return axios
      .post(`https://server.autohunt.by/all_advts`, { ...this.filterOptions })
      .then((res) => {
        const { advts, count } = res.data;

        this.setAdvts(advts, count);

        return count;
      });
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

  setAdvts = (advts, count) => {
    this.advts = advts;
    this.allCount = count;
    this.updateId = uuidv4();
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
