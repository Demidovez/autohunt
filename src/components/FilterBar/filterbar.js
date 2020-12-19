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
    };
  }

  componentDidMount() {
    this.props.onEditFilter();

    this.props.fetchInfo().then((carInfo) => {
      this.setState({
        carCarcases: carInfo.filter((info) => info.type === "carcase"),
        carEngines: carInfo.filter((info) => info.type === "fuel"),
        carColors: carInfo.filter((info) => info.type === "color"),
      });
    });
  }

  formatNumber = (num) =>
    num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

  setPrice = (prices) => this.props.onEditFilter({ prices });

  setIsExchange = (value) => this.props.onEditFilter({ isExchange: !value });

  setModelInfo = (model, indx) => {
    const { models } = this.props.options;

    models[indx].model = model.model;
    models[indx].series = model.series;
    models[indx].generation = model.generation;

    this.props.onEditFilter({ models });
  };

  removeModel = (indx) => {
    let models = this.props.options.models;
    models.splice(indx, 1);

    this.props.onEditFilter({ models });
  };

  setYear = (newYears) => {
    const years = newYears.map((year) => (year ? parseInt(year) : null));

    this.props.onEditFilter({ years });
  };

  setCarcase = (carcases) => {
    const newCarcases = [...this.props.options.carcases].map((oldCarcase) =>
      carcases.includes(oldCarcase) ? oldCarcase : null
    );

    carcases.forEach((carcase) => {
      if (!newCarcases.includes(carcase)) {
        newCarcases.push(carcase);
      }
    });

    this.props.onEditFilter({ carcases: newCarcases });
  };

  setFuel = (fuels) => {
    const newFuels = [...this.props.options.fuels].map((oldFuel) =>
      fuels.includes(oldFuel) ? oldFuel : null
    );

    fuels.forEach((fuel) => {
      if (!newFuels.includes(fuel)) {
        newFuels.push(fuel);
      }
    });

    this.props.onEditFilter({ fuels: newFuels });
  };

  setTransmission = (transmission) => {
    let transmissions = [...this.props.options.transmissions];

    if (transmissions.includes(transmission)) {
      transmissions = transmissions.map((oldTransmission) =>
        transmission === oldTransmission ? null : oldTransmission
      );
    } else {
      transmissions.push(transmission);
    }

    this.props.onEditFilter({ transmissions });
  };

  setVolEngine = (volumes) => this.props.onEditFilter({ volumes });

  setGearing = (gearingList) => {
    let gearings = [...this.props.options.gearings];

    gearingList.forEach((gearing) => {
      if (gearings.includes(gearing)) {
        gearings = gearings.map((oldGearing) =>
          gearing === oldGearing ? null : oldGearing
        );
      } else {
        gearings.push(gearing);
      }
    });

    this.props.onEditFilter({ gearings });
  };

  setMileage = (mileages) => this.props.onEditFilter({ mileages });

  setColor = (label) => {
    let colors = [...this.props.options.colors];

    if (colors.includes(label)) {
      colors = colors.map((oldColor) => (label === oldColor ? null : oldColor));
    } else {
      colors.push(label);
    }

    this.props.onEditFilter({ colors });
  };

  addModel = () => {
    const { models, countModels } = this.props.options;

    models.push({ model: null, series: null, generation: null });

    this.props.onEditFilter({
      countModels: countModels + 1,
      models,
    });
  };

  changeCurrency = (currency, currencyUnit) => {
    if (currency !== this.props.options.currency) {
      this.props.onEditFilter({ currency, currencyUnit });
    }
  };

  resetFilter = () => this.props.onEditFilter();

  render() {
    const {
      prices,
      isExchange,
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
    } = this.props.options;

    const { carCarcases, carEngines, carColors } = this.state;
    const { className } = this.props;

    return (
      <div className={className}>
        <Panel className={css.container}>
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
              onChange={(carcases) => this.setCarcase(carcases)}
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
              автоматическая
            </Checkbox>
            <Checkbox
              className={css.check_radio_box}
              checked={transmissions.includes("механика")}
              onChange={() => this.setTransmission("механика")}
            >
              {" "}
              механическая
            </Checkbox>
          </div>
          <div className={css.block_choice}>
            <p className={css.label}>Объем двигателя, л.</p>
            <div className={css.two_input_wrap}>
              <InputGroup className={css.user_choice}>
                <InputNumber
                  size="md"
                  placeholder="от"
                  value={volumes[0]}
                  min={0}
                  step={0.2}
                  onChange={(minVolEngine) =>
                    this.setVolEngine([minVolEngine, volumes[1]])
                  }
                />
                <InputNumber
                  size="md"
                  placeholder="до"
                  value={volumes[1]}
                  min={0}
                  step={0.2}
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
              selected={colors}
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
