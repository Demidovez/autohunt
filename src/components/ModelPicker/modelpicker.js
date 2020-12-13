import React from "react";
import { SelectPicker } from "rsuite";
import css from "./modelpicker.module.css";

class ModelPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      carModels: [],
      carSeries: [],
      carGenerations: [],

      model: null,
      series: null,
      generation: null,
    };
  }

  componentDidMount() {
    this.props.fetchInfo().then((carInfo) => {
      this.setState({
        carModels: carInfo.filter((info) => info.type === "car_info"),
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { model, series, generation } = this.props.model;

    if (
      prevState.model !== model ||
      prevState.series !== series ||
      prevState.generation !== generation
    ) {
      this.setState({ ...this.props.model });
    }
  }

  setModel = (model) =>
    this.props
      .fetchInfo(model)
      .then((carSeries) =>
        this.setStateBy({ carSeries, model, series: null, generation: null })
      );

  setSeries = (series) =>
    this.props
      .fetchInfo(this.state.model, series)
      .then((carGenerations) =>
        this.setStateBy({ carGenerations, series, generation: null })
      );

  setGeneration = (generation) => this.setStateBy({ generation });

  setStateBy = (newValue) =>
    this.setState({ ...newValue }, () => {
      const { model, series, generation } = this.state;
      this.props.onChangeInfo({ model, series, generation });
    });

  render() {
    const {
      carModels,
      carSeries,
      carGenerations,
      model,
      series,
      generation,
    } = this.state;

    const { className } = this.props;

    return (
      <div>
        <SelectPicker
          placement="rightStart"
          placeholder="Модель"
          data={carModels}
          value={model}
          onChange={(model) => this.setModel(model)}
          block
        />
        <SelectPicker
          placement="rightStart"
          placeholder="Серия"
          data={carSeries}
          value={series}
          disabled={!model}
          className={css.selectpicker}
          onChange={(series) => this.setSeries(series)}
          block
        />
        <SelectPicker
          placement="rightStart"
          placeholder="Поколение"
          data={carGenerations}
          value={generation}
          disabled={!series || carGenerations.length === 0}
          onChange={(generation) => this.setGeneration(generation)}
          block
        />
      </div>
    );
  }
}

export default ModelPicker;
