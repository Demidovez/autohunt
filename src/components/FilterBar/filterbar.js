import React from "react";
import {
  Panel,
  InputNumber,
  InputGroup,
  Checkbox,
  SelectPicker,
  Button,
  Icon,
} from "rsuite";
import ColorPicker from "../ColorPicker/colorpicker";
import css from "./filterbar.module.css";

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      prices: [0, 999999],
      maxPrice: null,
      isExchange: false,
      model: null,
      series: null,
      generation: null,
      carcase: null,
      fuel: null,
      carModels: [],
      carSeries: [],
      carGenerations: [],
      carCarcases: [],
      carEngines: [],
      carColors: [],
      years: [1900, 3000],
      transmissions: [],
      gearings: [],
      volumes: [0, 100],
      mileages: [0, 99999999],
    };
  }

  componentDidMount() {
    this.props.onEditFilter(this.state);

    this.props.fetchInfo().then((carInfo) => {
      this.setState({
        carModels: carInfo.filter((info) => info.type === "car_info"),
        carCarcases: carInfo.filter((info) => info.type === "carcase"),
        carEngines: carInfo.filter((info) => info.type === "fuel"),
        carColors: carInfo.filter((info) => info.type === "color"),
      });
    });
  }

  setPrice = (newPrices) => {
    const priceDefault = [0, 99999999];

    const prices = newPrices.map((price, indx) =>
      price ? parseFloat(price) : priceDefault[indx]
    );

    this.setState({ prices }, () => this.props.onEditFilter(this.state));
  };

  setIsExchange = (value) =>
    this.setState({ isExchange: !value }, () =>
      this.props.onEditFilter(this.state)
    );

  setModel = (model) =>
    this.props
      .fetchInfo(model)
      .then((carSeries) =>
        this.setState({ carSeries, model }, () =>
          this.props.onEditFilter(this.state)
        )
      );

  setSeries = (series) =>
    this.props
      .fetchInfo(this.state.model, series)
      .then((carGenerations) =>
        this.setState({ carGenerations, series }, () =>
          this.props.onEditFilter(this.state)
        )
      );

  setGeneration = (generation) =>
    this.setState({ generation }, () => this.props.onEditFilter(this.state));

  setYear = (newYears) => {
    const yearsDefault = [1900, 3000];

    const years = newYears.map((year, indx) =>
      year ? parseInt(year) : yearsDefault[indx]
    );

    this.setState({ years }, () => this.props.onEditFilter(this.state));
  };

  setCarcase = (carcase) =>
    this.setState({ carcase }, () => this.props.onEditFilter(this.state));

  setFuel = (fuel) =>
    this.setState({ fuel }, () => this.props.onEditFilter(this.state));

  setTransmission = (transmission) => {
    let transmissions = this.state.transmissions;

    if (transmissions.indexOf(transmission) > -1) {
      transmissions.splice(transmissions.indexOf(transmission), 1);
    } else {
      transmissions.push(transmission);
    }

    this.setState({ transmissions }, () => this.props.onEditFilter(this.state));
  };

  setVolEngine = (newVolumes) => {
    const volumesDefault = [0, 100];

    const volumes = newVolumes.map((volume, indx) =>
      volume ? parseFloat(volume) : volumesDefault[indx]
    );

    this.setState({ volumes }, () => this.props.onEditFilter(this.state));
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

    this.setState({ gearings }, () => this.props.onEditFilter(this.state));
  };

  setMileage = (newMileages) => {
    const mileagesDefault = [0, 99999999];

    const mileages = newMileages.map((mileage, indx) =>
      mileage ? parseFloat(mileage) : mileagesDefault[indx]
    );

    this.setState({ mileages }, () => this.props.onEditFilter(this.state));
  };

  setColor = (label) => console.log(label);

  render() {
    const { className } = this.props;
    const {
      prices,
      isExchange,
      carModels,
      carSeries,
      carGenerations,
      carCarcases,
      carEngines,
      carColors,
      years,
      volumes,
      mileages,
    } = this.state;

    return (
      <div className={className}>
        <Panel className={`${className} ${css.container}`}>
          <div className={css.block_choice}>
            <p className={css.label}>Цена</p>
            <div className={css.two_input_wrap}>
              <InputGroup className={css.user_choice}>
                <InputNumber
                  size="md"
                  placeholder="от"
                  onChange={(minPrice) => this.setPrice([minPrice, prices[1]])}
                />
                <InputNumber
                  size="md"
                  placeholder="до"
                  onChange={(maxPrice) => this.setPrice([prices[0], maxPrice])}
                />
              </InputGroup>
            </div>
            <Checkbox
              className={css.check_radio_box}
              value={isExchange}
              onChange={(value) => this.setIsExchange(value)}
            >
              {" "}
              Обмен
            </Checkbox>
          </div>
          <div className={css.block_choice}>
            <p className={css.label}>Модель</p>
            <SelectPicker
              placement="rightStart"
              placeholder="Модель"
              data={carModels}
              onChange={(model) => this.setModel(model)}
              block
              className={css.user_choice}
            />
            <SelectPicker
              placement="rightStart"
              placeholder="Серия"
              data={carSeries}
              onChange={(series) => this.setSeries(series)}
              block
              className={css.user_choice}
            />
            <SelectPicker
              placement="rightStart"
              placeholder="Поколение"
              data={carGenerations}
              onChange={(generation) => this.setGeneration(generation)}
              block
              className={css.user_choice}
            />
          </div>
          <div className={css.block_choice}>
            <p className={css.label}>Год выпуска</p>
            <div className={css.two_input_wrap}>
              <InputGroup className={css.user_choice}>
                <InputNumber
                  size="md"
                  placeholder="с"
                  onChange={(fromYear) => this.setYear([fromYear, years[1]])}
                />
                <InputNumber
                  size="md"
                  placeholder="до"
                  onChange={(toYear) => this.setYear([years[0], toYear])}
                />
              </InputGroup>
            </div>
          </div>
          <div className={css.block_choice}>
            <p className={css.label}>Кузов</p>
            <SelectPicker
              placement="rightStart"
              placeholder="Любой"
              data={carCarcases}
              onChange={(carcase) => this.setCarcase(carcase)}
              block
              className={css.user_choice}
            />
          </div>
          <div className={css.block_choice}>
            <p className={css.label}>Двигатель</p>
            <SelectPicker
              placement="rightStart"
              placeholder="Любой"
              data={carEngines}
              onChange={(fuel) => this.setFuel(fuel)}
              block
              className={css.user_choice}
            />
          </div>
          <div className={css.block_choice}>
            <p className={css.label}>Коробка передач</p>
            <Checkbox
              className={css.check_radio_box}
              onChange={() => this.setTransmission("автомат")}
            >
              {" "}
              Автоматическая
            </Checkbox>
            <Checkbox
              className={css.check_radio_box}
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
                  onChange={(minVolEngine) =>
                    this.setVolEngine([minVolEngine, volumes[1]])
                  }
                />
                <InputNumber
                  size="md"
                  placeholder="до"
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
              onChange={() => this.setGearing(["передний", "передний привод"])}
            >
              {" "}
              Передний
            </Checkbox>
            <Checkbox
              className={css.check_radio_box}
              onChange={() => this.setGearing(["задний", "задний привод"])}
            >
              {" "}
              Задний
            </Checkbox>
            <Checkbox
              className={css.check_radio_box}
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
                  onChange={(minMileage) =>
                    this.setMileage([minMileage, mileages[1]])
                  }
                />
                <InputNumber
                  size="md"
                  placeholder="до"
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
              onChange={(color) => this.setColor(color.label)}
              className={css.circle_picker}
            />
          </div>
          <div className={`${css.block_choice} ${css.total} `}>
            <p className={css.label}>
              Найдено: <span>9 990</span>
            </p>
            <Button appearance="link">
              <Icon icon="close" /> сбросить фильтр
            </Button>
          </div>
        </Panel>
      </div>
    );
  }
}

export default Filter;
