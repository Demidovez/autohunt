import React from "react";
import { Tooltip, Whisper } from "rsuite";
import "./styles.scss";
import { useSelector } from "react-redux";

function ColorPicker(props) {
  const { selected, onChange } = props;
  const white = "#ffffff";
  const lights = ["#ffffff", "#ffff00"];

  const { colorNames } = useSelector((state) => state.optionCarNames);

  return (
    <div className="color-picker-component">
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
            className={`item ${color.value === white ? "white" : ""} ${
              lights.includes(color.value) ? "black-ok" : ""
            } ${selected.includes(color.label) ? "active" : ""}`}
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
          className={`item another black-ok ${
            selected.includes("другой") ? "active" : ""
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
