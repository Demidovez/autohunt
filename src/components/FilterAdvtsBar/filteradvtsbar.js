import React from "react";
// TODO: Не влияет ли деструктуризация импортов на производительность?
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
import { observer } from "mobx-react";
import carNamesStore from "../../stores/carNamesStore";
import filterAdvtsStore from "../../stores/filterAdvtsStore";
import ColorPicker from "../ColorPicker/colorpicker";
import ModelPicker from "../ModelPicker/modelpicker";
import css from "./filteradvtsbar.module.css";

const FilterAdvtsBar = observer(
  class extends React.Component {
    formatNumber = (num) =>
      num ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ") : num;

    setPrice = (prices) => filterAdvtsStore.onEditFilter({ prices });

    setIsExchange = (value) =>
      filterAdvtsStore.onEditFilter({ isExchange: !value });

    // TODO: Правильно ли так делать?
    setModelInfo = (model, indx) => {
      const { models } = filterAdvtsStore.filterOptions;

      models[indx].model = model.model;
      models[indx].series = model.series;
      models[indx].generation = model.generation;

      filterAdvtsStore.onEditFilter({ models });
    };

    setYear = (newYears) => {
      const years = newYears.map((year) => (year ? parseInt(year) : null));

      filterAdvtsStore.onEditFilter({ years });
    };

    setCarcase = (carcases) => {
      const newCarcases = [
        ...filterAdvtsStore.filterOptions.carcases,
      ].map((oldCarcase) =>
        carcases.includes(oldCarcase) ? oldCarcase : null
      );

      carcases.forEach((carcase) => {
        if (!newCarcases.includes(carcase)) {
          newCarcases.push(carcase);
        }
      });

      filterAdvtsStore.onEditFilter({ carcases: newCarcases });
    };

    setFuel = (fuels) => {
      const newFuels = [
        ...filterAdvtsStore.filterOptions.fuels,
      ].map((oldFuel) => (fuels.includes(oldFuel) ? oldFuel : null));

      fuels.forEach((fuel) => {
        if (!newFuels.includes(fuel)) {
          newFuels.push(fuel);
        }
      });

      filterAdvtsStore.onEditFilter({ fuels: newFuels });
    };

    setTransmission = (transmission) => {
      let transmissions = [...filterAdvtsStore.filterOptions.transmissions];

      if (transmissions.includes(transmission)) {
        transmissions = transmissions.map((oldTransmission) =>
          transmission === oldTransmission ? null : oldTransmission
        );
      } else {
        transmissions.push(transmission);
      }

      filterAdvtsStore.onEditFilter({ transmissions });
    };

    setVolEngine = (volumes) => filterAdvtsStore.onEditFilter({ volumes });

    setGearing = (gearing) => {
      let gearings = [...filterAdvtsStore.filterOptions.gearings];

      if (gearings.includes(gearing)) {
        gearings = gearings.map((oldGearing) =>
          gearing === oldGearing ? null : oldGearing
        );
      } else {
        gearings.push(gearing);
      }

      filterAdvtsStore.onEditFilter({ gearings });
    };

    setMileage = (mileages) => filterAdvtsStore.onEditFilter({ mileages });

    setColor = (label) => {
      let colors = [...filterAdvtsStore.filterOptions.colors];

      if (colors.includes(label)) {
        colors = colors.map((oldColor) =>
          label === oldColor ? null : oldColor
        );
      } else {
        colors.push(label);
      }

      filterAdvtsStore.onEditFilter({ colors });
    };

    changeCurrency = (label, unit) => {
      if (label !== filterAdvtsStore.filterOptions.currency.label) {
        filterAdvtsStore.onEditFilter({ currency: { label, unit } });
      }
    };

    render() {
      const {
        prices,
        isExchange,
        years,
        volumes,
        mileages,
        models,
        carcases,
        fuels,
        transmissions,
        gearings,
        colors,
        currency,
      } = filterAdvtsStore.filterOptions;

      const {
        count,
        isChanged,
        onResetFilter,
        onChangeCountModel,
      } = filterAdvtsStore;

      return (
        <div className={this.props.className}>
          <Panel className={css.container}>
            <div className={css.block_choice}>
              <FlexboxGrid align="middle">
                <FlexboxGrid.Item colspan={14}>
                  <p className={css.label}>Цена, {currency.unit}</p>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={10}>
                  <div className={css.currency}>
                    <div
                      onClick={() => this.changeCurrency("BYN", "р.")}
                      className={
                        currency.label === "BYN" ? css.active_currency : ""
                      }
                    >
                      BYN
                    </div>
                    <div
                      onClick={() => this.changeCurrency("USD", "$")}
                      className={
                        currency.label === "USD" ? css.active_currency : ""
                      }
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
                    onChange={(minPrice) =>
                      this.setPrice([minPrice, prices[1]])
                    }
                  />
                  <InputNumber
                    size="md"
                    placeholder="до"
                    value={prices[1]}
                    min={0}
                    onChange={(maxPrice) =>
                      this.setPrice([prices[0], maxPrice])
                    }
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
                <div key={model.index}>
                  {indx > 0 && <Divider>или</Divider>}
                  <div className={css.user_choice}>
                    <FlexboxGrid align="middle">
                      <FlexboxGrid.Item colspan={models.length > 1 ? 21 : 24}>
                        <ModelPicker
                          model={model}
                          className={css.user_choice}
                          onChangeInfo={(model) =>
                            this.setModelInfo(model, indx)
                          }
                        />
                      </FlexboxGrid.Item>
                      <FlexboxGrid.Item colspan={models.length > 1 ? 3 : 0}>
                        {models.length > 1 && (
                          <div
                            className={css.remove_model}
                            onClick={() => onChangeCountModel(model)}
                          >
                            <Icon icon="trash-o" size="lg" />
                          </div>
                        )}
                      </FlexboxGrid.Item>
                    </FlexboxGrid>
                  </div>
                </div>
              ))}
              <div
                onClick={() => onChangeCountModel()}
                className={css.link_add_model}
              >
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
                block
                placeholder="Любой"
                placement="rightStart"
                data={carNamesStore.carcaseNames}
                value={carcases}
                onChange={(carcases) => this.setCarcase(carcases)}
                className={css.user_choice}
              />
            </div>
            <div className={css.block_choice}>
              <p className={css.label}>Двигатель</p>
              <CheckPicker
                block
                value={fuels}
                placeholder="Любой"
                placement="rightStart"
                data={carNamesStore.fuelNames}
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
                onChange={() => this.setGearing("передний")}
              >
                {" "}
                Передний
              </Checkbox>
              <Checkbox
                className={css.check_radio_box}
                checked={gearings.includes("задний")}
                onChange={() => this.setGearing("задний")}
              >
                {" "}
                Задний
              </Checkbox>
              <Checkbox
                className={css.check_radio_box}
                checked={gearings.includes("полный")}
                onChange={() => this.setGearing("полный")}
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
                selected={colors}
                onChange={(label) => this.setColor(label)}
                className={css.circle_picker}
              />
            </div>
            <div className={`${css.block_choice} ${css.total} `}>
              <p className={css.label}>
                Найдено: <span>{this.formatNumber(count)}</span>
              </p>
              {isChanged && (
                <Button appearance="link" onClick={onResetFilter}>
                  <Icon icon="close" /> сбросить фильтр
                </Button>
              )}
            </div>
          </Panel>
        </div>
      );
    }
  }
);

export default FilterAdvtsBar;
