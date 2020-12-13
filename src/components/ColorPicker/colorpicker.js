import React from "react";
import { Tooltip, Whisper } from "rsuite";
import css from "./colorpicker.module.css";

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: [...props.value],
      white: "#ffffff",
      lights: ["#ffffff", "#ffff00"],
    };
  }

  setActive = (color) => {
    const { selected } = this.state;

    if (selected.indexOf(color.label) > -1) {
      selected.splice(selected.indexOf(color.label), 1);
    } else {
      selected.push(color.label);
    }

    this.setState({ selected }, () => this.props.onChange(color.label));
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selected.length !== this.props.value.length) {
      this.setState({ selected: [...this.props.value] });
    }
  }

  render() {
    const { colors } = this.props;
    const { selected, white, lights } = this.state;

    return (
      <div className={css.container}>
        {colors.map((color, indx) => (
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
              onClick={() => this.setActive(color)}
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
            onClick={() => this.setActive({ label: "другой" })}
          >
            <span></span>
          </div>
        </Whisper>
      </div>
    );
  }
}

export default ColorPicker;
