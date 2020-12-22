import React from "react";
import { SelectPicker } from "rsuite";
import { observer } from "mobx-react";
import carNamesStore from "../../stores/carNamesStore";
import css from "./modelpicker.module.css";

const ModelPicker = observer(
  class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        seriesNames: [],
        generationNames: [],

        model: null,
        series: null,
        generation: null,
      };
    }

    setModel = (model) =>
      carNamesStore.getSeriesAndGenerationNames(model).then((seriesNames) =>
        this.setStateBy({
          seriesNames,
          model,
          series: null,
          generation: null,
        })
      );

    setSeries = (series) =>
      carNamesStore
        .getSeriesAndGenerationNames(this.state.model, series)
        .then((generationNames) =>
          this.setStateBy({ generationNames, series, generation: null })
        );

    setGeneration = (generation) => this.setStateBy({ generation });

    setStateBy = (field) =>
      this.setState({ ...field }, () => {
        const { model, series, generation } = this.state;

        this.props.onChangeInfo({ model, series, generation });
      });

    render() {
      const {
        seriesNames,
        generationNames,
        model,
        series,
        generation,
      } = this.state;

      return (
        <div>
          <SelectPicker
            placement="rightStart"
            placeholder="Модель"
            data={carNamesStore.modelNames}
            value={model}
            onChange={(model) => this.setModel(model)}
            block
          />
          <SelectPicker
            placement="rightStart"
            placeholder="Серия"
            data={seriesNames}
            value={series}
            disabled={!model}
            className={css.selectpicker}
            onChange={(series) => this.setSeries(series)}
            block
          />
          <SelectPicker
            placement="rightStart"
            placeholder="Поколение"
            data={generationNames}
            value={generation}
            disabled={!series || generationNames.length === 0}
            onChange={(generation) => this.setGeneration(generation)}
            block
          />
        </div>
      );
    }
  }
);

export default ModelPicker;
