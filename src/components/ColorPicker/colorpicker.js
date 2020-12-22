import React from "react";
import { Tooltip, Whisper } from "rsuite";
import { observer } from "mobx-react";
import carNamesStore from "../../stores/carNamesStore";
import css from "./colorpicker.module.css";

const ColorPicker = observer(
  class extends React.Component {
    render() {
      const { selected, onChange } = this.props;
      const white = "#ffffff";
      const lights = ["#ffffff", "#ffff00"];

      return (
        <div className={css.container}>
          {carNamesStore.colorNames.map((color, indx) => (
            <Whisper
              placement="top"
              trigger="hover"
              key={indx}
              delayShow={1000}
              speaker={<Tooltip>{color.label}</Tooltip>}
            >
              <div
                style={{ backgroundColor: color.value }}
                className={`${css.item} ${
                  color.value === white ? css.white : ""
                } ${lights.includes(color.value) ? css.black_ok : ""} ${
                  selected.includes(color.label) ? css.active : ""
                }`}
                onClick={() => onChange(color.label)}
              >
                <span></span>
              </div>
            </Whisper>
          ))}
          <Whisper
            placement="top"
            trigger="hover"
            delayShow={1000}
            speaker={<Tooltip>другой</Tooltip>}
          >
            <div
              className={`${css.item} ${css.another} ${css.black_ok} ${
                selected.includes("другой") ? css.active : ""
              }`}
              onClick={() => onChange("другой")}
            >
              <span></span>
            </div>
          </Whisper>
        </div>
      );
    }
  }
);

export default ColorPicker;
