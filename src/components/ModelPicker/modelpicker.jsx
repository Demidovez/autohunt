import React, { useEffect } from "react";
import { SelectPicker } from "rsuite";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSeriesOfModelAction,
  getAllGenerationsOfSeriesAction,
} from "../../actions/creators/modelAutoNamesActionCreators";

function ModelPicker(props) {
  const state = useSelector((state) => state.optionCarNames);
  const dispatch = useDispatch();

  const { model, series, generation, onChangeInfo } = props;

  useEffect(() => {
    if (model.name) {
      dispatch(getAllSeriesOfModelAction(model.name));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model.name]);

  useEffect(() => {
    if (model.name && series.name) {
      dispatch(
        getAllGenerationsOfSeriesAction({
          model: model.name,
          series: series.name,
        })
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [series.name]);

  const handleChangeOption = (model, series, generation) =>
    onChangeInfo({
      model: model,
      series: model && series,
      generation: model && series && generation,
      id: props.model.id,
    });

  const { modelNames, seriesNames, generationNames } = state;

  return (
    <div className="model-picker-component">
      <SelectPicker
        placement="rightStart"
        placeholder="Модель"
        data={modelNames}
        value={model.name}
        onChange={(changedModel) =>
          handleChangeOption(changedModel, series.name, generation.name)
        }
        block
      />
      <SelectPicker
        placement="rightStart"
        placeholder="Серия"
        data={seriesNames.find((series) => series.model === model.name)?.series}
        value={series.name}
        disabled={!model.name}
        className="select-picker"
        onChange={(changedSeries) =>
          handleChangeOption(model.name, changedSeries, generation.name)
        }
        block
      />
      <SelectPicker
        placement="rightStart"
        placeholder="Поколение"
        data={
          generationNames.find(
            (generation) =>
              generation.model === model.name &&
              generation.series === series.name
          )?.generations
        }
        value={generation.name}
        disabled={!series.name || !generationNames || !model.name}
        onChange={(changedGeneration) =>
          handleChangeOption(model.name, series.name, changedGeneration)
        }
        block
      />
    </div>
  );
}

export default ModelPicker;
