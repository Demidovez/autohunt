import React from "react";
import css from "./colorpicker.module.css";

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: [],
      white: "#ffffff",
      lights: ["#ffffff", "#ffff00"],
    };
  }

  setActive = (color) => {
    const { selected } = this.state;

    if (selected.indexOf(color.value) > -1) {
      selected.splice(selected.indexOf(color.value), 1);
    } else {
      selected.push(color.value);
    }

    this.setState({ selected }, () => this.props.onChange(color));
  };

  render() {
    const { colors } = this.props;
    const { selected, white, lights } = this.state;

    console.log(colors);

    return (
      <div className={css.container}>
        {colors.map((color, indx) => (
          <div
            key={indx}
            style={{ backgroundColor: color.value }}
            className={`${color.value === white ? css.white : ""} ${
              lights.indexOf(color.value) > -1 ? css.black_ok : ""
            } ${selected.indexOf(color.value) > -1 ? css.active : ""}`}
            onClick={() => this.setActive(color)}
          >
            <span></span>
          </div>
        ))}
        <div
          style={{
            backgroundImage: `linear-gradient(circle, ${colors
              .map((color) => color.value)
              .join(",")})`,
          }}
          className={`${css.black_ok} ${
            selected.indexOf("??????") > -1 ? css.active : ""
          }`}
          onClick={() => this.setActive({ value: "??????" })}
        >
          <span>?</span>
        </div>
      </div>
    );
  }
}

export default ColorPicker;
