import React from "react";
import { Link } from "react-router-dom";
import { Whisper, Tooltip } from "rsuite";
import "./styles.scss";

function FilterLabel({ filter, children }) {
  return (
    <div className="filter-label-component">
      <Whisper
        trigger="hover"
        placement="right"
        speaker={<Tooltip>Фильтр, по которому было найдено объявление</Tooltip>}
      >
        <Link style={{ backgroundColor: filter.color }} to={"filter.link"}>
          {filter.name}
        </Link>
      </Whisper>

      {children}
    </div>
  );
}

export default FilterLabel;
