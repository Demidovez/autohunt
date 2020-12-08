import React from "react";
import {
  Panel,
  Grid,
  Row,
  Col,
  InputNumber,
  InputGroup,
  Input,
  Checkbox,
  SelectPicker,
} from "rsuite";
import css from "./index.module.css";

class Filter extends React.Component {
  render() {
    const { className } = this.props;

    return (
      <div className={className}>
        <Panel className={`${className} ${css.container}`}>
          <div className={css.block_choice}>
            <p className={css.label}>Цена</p>
            <div className={css.two_input_wrap}>
              <InputGroup className={css.user_choice}>
                <InputNumber size="md" placeholder="от" />
                {/* <InputGroup.Addon>to</InputGroup.Addon> */}
                <InputNumber size="md" placeholder="до" />
              </InputGroup>
            </div>
            <Checkbox> Обмен</Checkbox>
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
        </Panel>
      </div>
    );
  }
}

export default Filter;
