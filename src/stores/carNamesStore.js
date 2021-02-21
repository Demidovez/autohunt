import { makeObservable, observable, runInAction } from "mobx";
import axios from "axios";

class CarNamesStore {
  // Название моделей всех авто
  modelNames = [];

  // Название вариантов кузовов
  carcaseNames = [];

  // Название вариантов двигателей
  fuelNames = [];

  // Название всех цветов
  colorNames = [];

  constructor() {
    // Достаем из сервера исходные статические данные
    this.getStaticData();

    // Настраиваем MobX (для работы со состоянием)
    makeObservable(this, {
      modelNames: observable,
      carcaseNames: observable,
      fuelNames: observable,
      colorNames: observable,
    });
  }

  // Исходные статические данные
  getStaticData = () => {
    axios
      .get(`https://server.autohunt.by/get_static_filter_advts_data`)
      .then(({ data }) => data)
      .then((data) =>
        runInAction(() => {
          this.modelNames = data.models;
          this.carcaseNames = data.carcases;
          this.fuelNames = data.fuels;
          this.colorNames = data.colors;
        })
      );
  };

  getSeriesAndGenerationNames = (model, series) =>
    axios
      .post(`https://server.autohunt.by/get_series_generation_names`, {
        model,
        series,
      })
      .then(({ data }) => data);
}

export default new CarNamesStore();
