import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setInputValueByFieldAction,
  setIsExchangeAction,
  setModelAction,
  setCarcasesAction,
  setFuelsAction,
  setTransmissionsAction,
  setGearingsAction,
  setColorsAction,
  setCurrencyAction,
  getAdvertsAction,
  onAddModelAutoAction,
  onRemoveModelAutoAction,
  onResetFilterAction,
} from "../../actions/creators/filterBarActionCreators";
import { getAllOptionCarNamesAction } from "../../actions/creators/modelAutoNamesActionCreators";
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
import "./styles.scss";
import { addOrRemoveItemInArray, formatNumber } from "../../helpers";

const FilterAdvertsBar = () => {
  const state = useSelector((state) => state.filterBar.filterOptions);
  const { countAllAdverts, isFilterChanged, tags } = useSelector(
    (state) => state.filterBar
  );
  const optionCarNames = useSelector((state) => state.optionCarNames);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOptionCarNamesAction());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getAdvertsAction(state));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags, state.order]);

  const setCurrency = (label, unit) => {
    if (label !== state.currency.label) {
      dispatch(setCurrencyAction({ label, unit }));
    }
  };

  const setInputNumberValue = (fieldName, inputValue) =>
    dispatch(setInputValueByFieldAction(fieldName, inputValue));

  const setIsExchange = () => dispatch(setIsExchangeAction());

  const setModelInfo = (model) => dispatch(setModelAction(model));

  const setCarcase = (carcases) => dispatch(setCarcasesAction(carcases));

  const setFuel = (fuels) => dispatch(setFuelsAction(fuels));

  const setTransmission = (transmission) => {
    let transmissions = addOrRemoveItemInArray(
      state.transmissions,
      transmission
    );

    dispatch(setTransmissionsAction(transmissions));
  };

  const setGearing = (gearing) => {
    let gearings = addOrRemoveItemInArray(state.gearings, gearing);

    dispatch(setGearingsAction(gearings));
  };

  const setColor = (color) => {
    let colors = addOrRemoveItemInArray(state.colors, color);

    dispatch(setColorsAction(colors));
  };

  const onAddModelPicker = () => {
    dispatch(onAddModelAutoAction());
  };

  const onRemoveModelPicker = (index) => {
    dispatch(onRemoveModelAutoAction(index));
  };

  const onResetFilter = () => dispatch(onResetFilterAction());

  const { carcaseNames, fuelNames } = optionCarNames;

  return (
    <Panel className="filter-adverts-bar-component">
      <div className="block-choice">
        <FlexboxGrid align="middle">
          <FlexboxGrid.Item colspan={14}>
            <p className="label">Цена, {state.currency.unit}</p>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={10}>
            <div className="currency">
              <div
                onClick={() => setCurrency("BYN", "р.")}
                className={
                  state.currency.label === "BYN" ? "active-currency" : ""
                }
              >
                BYN
              </div>
              <div
                onClick={() => setCurrency("USD", "$")}
                className={
                  state.currency.label === "USD" ? "active-currency" : ""
                }
              >
                USD
              </div>
            </div>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <div>
          <InputGroup className="user-choice">
            <InputNumber
              size="md"
              placeholder="от"
              value={state.priceMin}
              min={0}
              onChange={(priceMin) => setInputNumberValue("priceMin", priceMin)}
            />
            <InputNumber
              size="md"
              placeholder="до"
              value={state.priceMax}
              min={0}
              onChange={(priceMax) => setInputNumberValue("priceMax", priceMax)}
            />
          </InputGroup>
        </div>
        <Checkbox
          className="check-radio-box"
          value={state.isExchange}
          checked={state.isExchange}
          onChange={setIsExchange}
        >
          {" "}
          Обмен
        </Checkbox>
      </div>
      <div className="block-choice">
        <p className="label">Модель</p>
        {state.models.map((model, index) => (
          <div key={model.id}>
            {index > 0 && <Divider>и</Divider>}
            <div className="user-choice">
              <FlexboxGrid align="middle">
                <FlexboxGrid.Item colspan={state.models.length > 1 ? 21 : 24}>
                  <ModelPicker
                    className="user-choice"
                    model={model}
                    series={state.series[index]}
                    generation={state.generations[index]}
                    onChangeInfo={(model) => setModelInfo(model)}
                  />
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={state.models.length > 1 ? 3 : 0}>
                  {state.models.length > 1 && (
                    <div
                      className="remove-model"
                      onClick={() => onRemoveModelPicker(index)}
                    >
                      <Icon icon="trash-o" size="lg" />
                    </div>
                  )}
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </div>
          </div>
        ))}
        <div onClick={() => onAddModelPicker()} className="link-add-model">
          Добавить модель
        </div>
      </div>
      <div className="block-choice">
        <p className="label">Год выпуска</p>
        <div>
          <InputGroup className="user-choice">
            <InputNumber
              size="md"
              placeholder="с"
              value={state.yearMin}
              min={1930}
              onChange={(yearMin) => setInputNumberValue("yearMin", yearMin)}
            />
            <InputNumber
              size="md"
              placeholder="до"
              value={state.yearMax}
              min={1930}
              onChange={(yearMax) => setInputNumberValue("yearMax", yearMax)}
            />
          </InputGroup>
        </div>
      </div>
      <div className="block-choice">
        <p className="label">Кузов</p>
        <CheckPicker
          block
          placeholder="Любой"
          placement="rightStart"
          data={carcaseNames}
          value={state.carcases}
          onChange={(carcases) => setCarcase(carcases)}
          className="user-choice"
        />
      </div>
      <div className="block-choice">
        <p className="label">Двигатель</p>
        <CheckPicker
          block
          value={state.fuels}
          placeholder="Любой"
          placement="rightStart"
          data={fuelNames}
          onChange={(fuel) => setFuel(fuel)}
          className="user-choice"
        />
      </div>
      <div className="block-choice">
        <p className="label">Коробка передач</p>
        <Checkbox
          className="check-radio-box"
          checked={state.transmissions.includes("автомат")}
          onChange={() => setTransmission("автомат")}
        >
          {" "}
          автоматическая
        </Checkbox>
        <Checkbox
          className="check-radio-box"
          checked={state.transmissions.includes("механика")}
          onChange={() => setTransmission("механика")}
        >
          {" "}
          механическая
        </Checkbox>
      </div>
      <div className="block-choice">
        <p className="label">Объем двигателя, л.</p>
        <div>
          <InputGroup className="user-choice">
            <InputNumber
              size="md"
              placeholder="от"
              value={state.volumeMin}
              min={0}
              step={0.2}
              onChange={(volumeMin) =>
                setInputNumberValue("volumeMin", volumeMin)
              }
            />
            <InputNumber
              size="md"
              placeholder="до"
              value={state.volumeMax}
              min={0}
              step={0.2}
              onChange={(volumeMax) =>
                setInputNumberValue("volumeMax", volumeMax)
              }
            />
          </InputGroup>
        </div>
      </div>
      <div className="block-choice">
        <p className="label">Привод</p>
        <Checkbox
          className="check-radio-box"
          checked={state.gearings.includes("передний")}
          onChange={() => setGearing("передний")}
        >
          {" "}
          Передний
        </Checkbox>
        <Checkbox
          className="check-radio-box"
          checked={state.gearings.includes("задний")}
          onChange={() => setGearing("задний")}
        >
          {" "}
          Задний
        </Checkbox>
        <Checkbox
          className="check-radio-box"
          checked={state.gearings.includes("полный")}
          onChange={() => setGearing("полный")}
        >
          {" "}
          Полный
        </Checkbox>
      </div>
      <div className="block-choice">
        <p className="label">Пробег, км.</p>
        <div>
          <InputGroup className="user-choice">
            <InputNumber
              size="md"
              placeholder="от"
              value={state.mileageMin}
              min={0}
              onChange={(mileageMin) =>
                setInputNumberValue("mileageMin", mileageMin)
              }
            />
            <InputNumber
              size="md"
              placeholder="до"
              value={state.mileageMax}
              min={0}
              onChange={(mileageMax) =>
                setInputNumberValue("mileageMax", mileageMax)
              }
            />
          </InputGroup>
        </div>
      </div>
      <div className="block-choice">
        <p className="label">Цвет</p>
        <ColorPicker
          selected={state.colors}
          onChange={(label) => setColor(label)}
          className="circle-picker"
        />
      </div>
      <div className="block-choice total">
        <p className="label">
          <span>{formatNumber(countAllAdverts)}</span>
        </p>
        {isFilterChanged && (
          <Button appearance="link" onClick={onResetFilter}>
            <Icon icon="close" /> сбросить фильтр
          </Button>
        )}
      </div>
    </Panel>
  );
};

export default FilterAdvertsBar;
