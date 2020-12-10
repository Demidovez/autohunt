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
  componentDidMount() {
    this.props.onChange();
  }

  render() {
    const { className, onChange } = this.props;

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
                  onChange={(minPrice) => onChange({ minPrice })}
                />
                <InputNumber
                  size="md"
                  placeholder="до"
                  onChange={(maxPrice) => onChange({ maxPrice })}
                />
              </InputGroup>
            </div>
            <Checkbox className={css.check_radio_box}> Обмен</Checkbox>
          </div>
          <div className={css.block_choice}>
            <p className={css.label}>Модель</p>
            <SelectPicker
              placement="rightStart"
              placeholder="Модель"
              block
              className={css.user_choice}
            />
            <SelectPicker
              placement="rightStart"
              placeholder="Серия"
              block
              className={css.user_choice}
            />
            <SelectPicker
              placement="rightStart"
              placeholder="Поколение"
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
