import { action, makeObservable, observable } from "mobx";
import axios from "axios";

class FilterStore {
  advts = [];

  constructor() {
    makeObservable(this, {
      advts: observable,
      startGetAdvts: action,
      setAdvts: action,
      getInitInfo: action,
    });
  }

  startGetAdvts = (filterOptions) => {
    axios
      .post(`https://server.autohunt.by/all_advts`, { ...filterOptions })
      .then((res) => this.setAdvts(res.data));
  };

  setAdvts = (advts) => (this.advts = advts);

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
