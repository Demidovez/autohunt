import React from "react";
import { Link } from "react-router-dom";
import { Whisper, Tooltip } from "rsuite";
import css from "./filterlabel.module.css";

class FilterLabel extends React.Component {
  render() {
    const { filter, children } = this.props;

    return (
      <div className={css.container}>
        <Whisper
          trigger="hover"
          placement="right"
          speaker={
            <Tooltip>Фильтр, по которому было найдено объявление</Tooltip>
          }
        >
          <Link style={{ backgroundColor: filter.color }} to={filter.link}>
            {filter.title}
          </Link>
        </Whisper>

        {children}
      </div>
    );
  }
}

export default FilterLabel;
