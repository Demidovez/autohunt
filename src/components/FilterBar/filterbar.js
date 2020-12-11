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
import { CirclePicker } from "react-color";
import css from "./filterbar.module.css";

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      minPrice: null,
      maxPrice: null,
      isExchange: false,
      model: null,
      series: null,
      generation: null,
      carModels: [],
      carSeries: [],
      carGenerations: [],
    };
  }

  componentDidMount() {
    this.props.onEditFilter();

    this.props.fetchCars().then((carModels) => this.setState({ carModels }));
  }

  setPrice = (price) =>
    this.setState({ ...price }, () => this.props.onEditFilter(this.state)); // в запрос уходят лишние поля стейта

  setIsExchange = (value) =>
    this.setState({ isExchange: !value }, () =>
      this.props.onEditFilter(this.state)
    ); // в запрос уходят лишние поля стейта

  setModel = (model) =>
    this.props
      .fetchCars(model)
      .then((carSeries) =>
        this.setState({ carSeries, model }, () =>
          this.props.onEditFilter(this.state)
        )
      );

  setSeries = (series) =>
    this.props
      .fetchCars(this.state.model, series)
      .then((carGenerations) =>
        this.setState({ carGenerations, series }, () =>
          this.props.onEditFilter(this.state)
        )
      );

  setGeneration = (generation) =>
    this.setState({ generation }, () => this.props.onEditFilter(this.state));

  render() {
    const { className } = this.props;
    const { isExchange, carModels, carSeries, carGenerations } = this.state;

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
                  onChange={(minPrice) => this.setPrice({ minPrice })}
                />
                <InputNumber
                  size="md"
                  placeholder="до"
                  onChange={(maxPrice) => this.setPrice({ maxPrice })}
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
                <InputNumber size="md" placeholder="с" />
                <InputNumber size="md" placeholder="до" />
              </InputGroup>
            </div>
          </div>
          <div className={css.block_choice}>
            <p className={css.label}>Кузов</p>
            <SelectPicker
              placement="rightStart"
              placeholder="Любой"
              block
              className={css.user_choice}
            />
          </div>
          <div className={css.block_choice}>
            <p className={css.label}>Двигатель</p>
            <SelectPicker
              placement="rightStart"
              placeholder="Любой"
              block
              className={css.user_choice}
            />
          </div>
          <div className={css.block_choice}>
            <p className={css.label}>Коробка передач</p>
            <Checkbox className={css.check_radio_box}> Автоматическая</Checkbox>
            <Checkbox className={css.check_radio_box}> Механическая</Checkbox>
          </div>
          <div className={css.block_choice}>
            <p className={css.label}>Объем двигателя</p>
            <div className={css.two_input_wrap}>
              <InputGroup className={css.user_choice}>
                <InputNumber size="md" placeholder="от" />
                <InputNumber size="md" placeholder="до" />
              </InputGroup>
            </div>
          </div>
          <div className={css.block_choice}>
            <p className={css.label}>Привод</p>
            <Checkbox className={css.check_radio_box}> Передний</Checkbox>
            <Checkbox className={css.check_radio_box}> Задний</Checkbox>
            <Checkbox className={css.check_radio_box}> Полный</Checkbox>
          </div>
          <div className={css.block_choice}>
            <p className={css.label}>Пробег</p>
            <div className={css.two_input_wrap}>
              <InputGroup className={css.user_choice}>
                <InputNumber size="md" placeholder="от" />
                <InputNumber size="md" placeholder="до" />
              </InputGroup>
            </div>
          </div>
          <div className={css.block_choice}>
            <p className={css.label}>Цвет</p>
            <CirclePicker
              width="100%"
              circleSize={24}
              circleSpacing={8}
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
