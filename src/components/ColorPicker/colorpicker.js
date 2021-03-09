import React from "react";
import { Tooltip, Whisper } from "rsuite";
import css from "./colorpicker.module.css";
import { useSelector } from "react-redux";

function ColorPicker(props) {
  const { selected, onChange } = props;
  const white = "#ffffff";
  const lights = ["#ffffff", "#ffff00"];

  const { colorNames } = useSelector((state) => state.optionCarNames);

  return (
    <div className={css.container}>
      {colorNames.map((color, index) => (
        <Whisper
          placement="top"
          trigger="hover"
          key={index}
          delayShow={1000}
          speaker={<Tooltip>{color.label}</Tooltip>}
        >
          <div
            style={{ backgroundColor: color.value }}
            className={`${css.item} ${color.value === white ? css.white : ""} ${
              lights.includes(color.value) ? css.black_ok : ""
            } ${selected.includes(color.label) ? css.active : ""}`}
            onClick={() => onChange(color.label)}
          >
            <span />
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
          <span />
        </div>
      </Whisper>
    </div>
  );
}

export default ColorPicker;
