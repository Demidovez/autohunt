import React from "react";
import {
  Panel,
  InputNumber,
  InputGroup,
  Checkbox,
  Button,
  Icon,
  CheckPicker,
  Divider,
  FlexboxGrid,
} from "rsuite";
import ColorPicker from "../ColorPicker/colorpicker";
import ModelPicker from "../ModelPicker/modelpicker";
import css from "./filterbar.module.css";

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      carCarcases: [],
      carEngines: [],
      carColors: [],
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
    };
  }

  componentDidMount() {
    this.props
      .onEditFilter(this.state)
      .then((count) => this.setState({ founded: count }));

    this.props.fetchInfo().then((carInfo) => {
      this.setState({
        carCarcases: carInfo.filter((info) => info.type === "carcase"),
        carEngines: carInfo.filter((info) => info.type === "fuel"),
        carColors: carInfo.filter((info) => info.type === "color"),
      });
    });
  }

  setStateBy = (newValue) => {
    this.setState({ isChangeFilter: true, ...newValue }, () =>
      this.props
        .onEditFilter(this.state)
        .then((count) => this.setState({ founded: count }))
    );
  };

  formatNumber = (num) =>
    num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

  setPrice = (newPrices) => {
    const prices = newPrices.map((price) => (price ? parseFloat(price) : null));

    this.setStateBy({ prices });
  };

  setIsExchange = (value) => this.setStateBy({ isExchange: !value });

  setModelInfo = (model, indx) => {
    const { models } = this.state;

    models[indx].model = model.model;
    models[indx].series = model.series;
    models[indx].generation = model.generation;

    this.setStateBy({ models });
  };

  removeModel = (indx) => {
    let models = this.state.models;
    models.splice(indx, 1);

    this.setStateBy({ models });
  };

  setYear = (newYears) => {
    const years = newYears.map((year) => (year ? parseInt(year) : null));

    this.setStateBy({ years });
  };

  setCarcase = (carcases) => this.setStateBy({ carcases });

  setFuel = (fuels) => this.setStateBy({ fuels });

  setTransmission = (transmission) => {
    let transmissions = this.state.transmissions;

    if (transmissions.includes(transmission)) {
      transmissions.splice(transmissions.indexOf(transmission), 1);
    } else {
      transmissions.push(transmission);
    }

    this.setStateBy({ transmissions });
  };

  setVolEngine = (newVolumes) => {
    const volumes = newVolumes.map((volume) =>
      volume ? parseFloat(volume) : null
    );

    this.setStateBy({ volumes });
  };

  setGearing = (gearingList) => {
    let gearings = this.state.gearings;

    const isFoundGearing = gearingList.some(
      (gearing) => gearings.indexOf(gearing) >= 0
    );

    if (isFoundGearing) {
      gearingList.map((gearing) =>
        gearings.splice(gearings.indexOf(gearing), 1)
      );
    } else {
      gearingList.map((gearing) => gearings.push(gearing));
    }

    this.setStateBy({ gearings });
  };

  setMileage = (newMileages) => {
    const mileages = newMileages.map((mileage) =>
      mileage ? parseFloat(mileage) : null
    );

    this.setStateBy({ mileages });
  };

  setColor = (label) => {
    let colors = this.state.colors;

    if (colors.includes(label)) {
      colors.splice(colors.indexOf(label), 1);
    } else {
      colors.push(label);
    }

    this.setStateBy({ colors });
  };

  addModel = () => {
    const { models, countModels } = this.state;

    models.push({ model: null, series: null, generation: null });

    this.setStateBy({
      countModels: countModels + 1,
      models,
    });
  };

  changeCurrency = (currency, currencyUnit) => {
    if (currency !== this.state.currency) {
      this.setStateBy({ currency, currencyUnit });
    }
  };

  resetFilter = () =>
    this.setStateBy({
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
      isChangeFilter: false,
      currencyUnit: "р.",
      currency: "BYN",
      countModels: 1,
    });

  render() {
    const { className } = this.props;
    const {
      prices,
      isExchange,
      carCarcases,
      carEngines,
      carColors,
      years,
      volumes,
      mileages,
      founded,
      models,
      carcases,
      fuels,
      transmissions,
      gearings,
      colors,
      isChangeFilter,
      currency,
      currencyUnit,
    } = this.state;

    return (
      <div className={className}>
        <Panel className={`${className} ${css.container}`}>
          <div className={css.block_choice}>
            <FlexboxGrid align="middle">
              <FlexboxGrid.Item colspan={14}>
                <p className={css.label}>Цена, {currencyUnit}</p>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={10}>
                <div className={css.currency}>
                  <div
                    onClick={() => this.changeCurrency("BYN", "р.")}
                    className={currency === "BYN" ? css.active_currency : ""}
                  >
                    BYN
                  </div>
                  <div
                    onClick={() => this.changeCurrency("USD", "$")}
                    className={currency === "USD" ? css.active_currency : ""}
                  >
                    USD
                  </div>
                </div>
              </FlexboxGrid.Item>
            </FlexboxGrid>
            <div className={css.two_input_wrap}>
              <InputGroup className={css.user_choice}>
                <InputNumber
                  size="md"
                  placeholder="от"
                  value={prices[0]}
                  min={0}
                  onChange={(minPrice) => this.setPrice([minPrice, prices[1]])}
                />
                <InputNumber
                  size="md"
                  placeholder="до"
                  value={prices[1]}
                  min={0}
                  onChange={(maxPrice) => this.setPrice([prices[0], maxPrice])}
                />
              </InputGroup>
            </div>
            <Checkbox
              className={css.check_radio_box}
              value={isExchange}
              checked={isExchange}
              onChange={(value) => this.setIsExchange(value)}
            >
              {" "}
              Обмен
            </Checkbox>
          </div>
          <div className={css.block_choice}>
            <p className={css.label}>Модель</p>
            {models.map((model, indx) => (
              <div key={indx}>
                {indx > 0 && <Divider>или</Divider>}
                <div className={css.user_choice}>
                  <FlexboxGrid align="middle">
                    <FlexboxGrid.Item colspan={models.length > 1 ? 21 : 24}>
                      <ModelPicker
                        model={model}
                        className={css.user_choice}
                        fetchInfo={this.props.fetchInfo}
                        onChangeInfo={(model) => this.setModelInfo(model, indx)}
                      />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={models.length > 1 ? 3 : 0}>
                      {models.length > 1 && (
                        <div
                          className={css.remove_model}
                          onClick={() => this.removeModel(indx)}
                        >
                          <Icon icon="trash-o" size="lg" />
                        </div>
                      )}
                    </FlexboxGrid.Item>
                  </FlexboxGrid>
                </div>
              </div>
            ))}
            <div onClick={this.addModel} className={css.link_add_model}>
              Добавить модель
            </div>
          </div>
          <div className={css.block_choice}>
            <p className={css.label}>Год выпуска</p>
            <div className={css.two_input_wrap}>
              <InputGroup className={css.user_choice}>
                <InputNumber
                  size="md"
                  placeholder="с"
                  value={years[0]}
                  min={1930}
                  onChange={(fromYear) => this.setYear([fromYear, years[1]])}
                />
                <InputNumber
                  size="md"
                  placeholder="до"
                  value={years[1]}
                  min={1930}
                  onChange={(toYear) => this.setYear([years[0], toYear])}
                />
              </InputGroup>
            </div>
          </div>
          <div className={css.block_choice}>
            <p className={css.label}>Кузов</p>
            <CheckPicker
              sticky
              block
              placeholder="Любой"
              placement="rightStart"
              data={carCarcases}
              value={carcases}
              onChange={(carcase) => this.setCarcase(carcase)}
              className={css.user_choice}
            />
          </div>
          <div className={css.block_choice}>
            <p className={css.label}>Двигатель</p>
            <CheckPicker
              sticky
              block
              value={fuels}
              placeholder="Любой"
              placement="rightStart"
              data={carEngines}
              onChange={(fuel) => this.setFuel(fuel)}
              className={css.user_choice}
            />
          </div>
          <div className={css.block_choice}>
            <p className={css.label}>Коробка передач</p>
            <Checkbox
              className={css.check_radio_box}
              checked={transmissions.includes("автомат")}
              onChange={() => this.setTransmission("автомат")}
            >
              {" "}
              Автоматическая
            </Checkbox>
            <Checkbox
              className={css.check_radio_box}
              checked={transmissions.includes("механика")}
              onChange={() => this.setTransmission("механика")}
            >
              {" "}
              Механическая
            </Checkbox>
          </div>
          <div className={css.block_choice}>
            <p className={css.label}>Объем двигателя</p>
            <div className={css.two_input_wrap}>
              <InputGroup className={css.user_choice}>
                <InputNumber
                  size="md"
                  placeholder="от"
                  value={volumes[0]}
                  min={0}
                  onChange={(minVolEngine) =>
                    this.setVolEngine([minVolEngine, volumes[1]])
                  }
                />
                <InputNumber
                  size="md"
                  placeholder="до"
                  value={volumes[1]}
                  min={0}
                  onChange={(maxVolEngine) =>
                    this.setVolEngine([volumes[0], maxVolEngine])
                  }
                />
              </InputGroup>
            </div>
          </div>
          <div className={css.block_choice}>
            <p className={css.label}>Привод</p>
            <Checkbox
              className={css.check_radio_box}
              checked={gearings.includes("передний")}
              onChange={() => this.setGearing(["передний", "передний привод"])}
            >
              {" "}
              Передний
            </Checkbox>
            <Checkbox
              className={css.check_radio_box}
              checked={gearings.includes("задний")}
              onChange={() => this.setGearing(["задний", "задний привод"])}
            >
              {" "}
              Задний
            </Checkbox>
            <Checkbox
              className={css.check_radio_box}
              checked={gearings.includes("полный")}
              onChange={() =>
                this.setGearing([
                  "полный",
                  "подключаемый полный привод",
                  "постоянный полный привод",
                ])
              }
            >
              {" "}
              Полный
            </Checkbox>
          </div>
          <div className={css.block_choice}>
            <p className={css.label}>Пробег</p>
            <div className={css.two_input_wrap}>
              <InputGroup className={css.user_choice}>
                <InputNumber
                  size="md"
                  placeholder="от"
                  value={mileages[0]}
                  min={0}
                  onChange={(minMileage) =>
                    this.setMileage([minMileage, mileages[1]])
                  }
                />
                <InputNumber
                  size="md"
                  placeholder="до"
                  value={mileages[1]}
                  min={0}
                  onChange={(maxMileage) =>
                    this.setMileage([mileages[0], maxMileage])
                  }
                />
              </InputGroup>
            </div>
          </div>
          <div className={css.block_choice}>
            <p className={css.label}>Цвет</p>
            <ColorPicker
              colors={[...carColors]}
              value={colors}
              onChange={(label) => this.setColor(label)}
              className={css.circle_picker}
            />
          </div>
          <div className={`${css.block_choice} ${css.total} `}>
            <p className={css.label}>
              Найдено: <span>{this.formatNumber(founded)}</span>
            </p>
            {isChangeFilter && (
              <Button appearance="link" onClick={() => this.resetFilter()}>
                <Icon icon="close" /> сбросить фильтр
              </Button>
            )}
          </div>
        </Panel>
      </div>
    );
  }
}

export default Filter;
