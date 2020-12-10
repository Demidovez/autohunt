import { action, makeObservable, observable } from "mobx";
import axios from "axios";

class FilterStore {
  filterOptions = {
    minPrice: null,
    maxPrice: null,
  };

  advts = [];

  constructor() {
    makeObservable(this, {
      advts: observable,
      startGetAdvts: action,
      setAdvts: action,
    });
  }

  startGetAdvts = (newFilterOptions) => {
    this.filterOptions = { ...this.filterOptions, ...newFilterOptions };

    axios
      .post(`https://server.autohunt.by/all_advts`, this.filterOptions)
      .then((res) => this.setAdvts(res.data));
  };

  setAdvts = (advts) => (this.advts = advts);
}

export default new FilterStore();
