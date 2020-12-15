import React from "react";
import { FlexboxGrid, SelectPicker, Tag } from "rsuite";
import css from "./sortadvts.module.css";

class SortAdvts extends React.Component {
  render() {
    return (
      <div className={`sortadvts-overwrite ${css.container}`}>
        <FlexboxGrid align="middle">
          <FlexboxGrid.Item colspan={18}>
            <div className={css.tagswrap}>
              <Tag closable>обмен</Tag>
              <Tag closable>механика</Tag>
              <Tag closable>15 000 - 80 000 км.</Tag>
              <Tag closable>BMW</Tag>
              <Tag closable>передний</Tag>
              <Tag closable>синий</Tag>
              <Tag closable>400 - 800 р.</Tag>
              <Tag closable>универсал</Tag>
            </div>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={6}>
            <div className={css.sortbutton}>
              <SelectPicker
                data={[
                  {
                    label: "Новые объявления",
                    value: "Новые объявления",
                  },
                  {
                    label: "Старые объявления",
                    value: "Старые объявления",
                  },
                  {
                    label: "Дешевые авто",
                    value: "Дешевые авто",
                  },
                  {
                    label: "Дорогие авто",
                    value: "Дорогие авто",
                  },
                ]}
                appearance="subtle"
                cleanable={false}
                searchable={false}
                placeholder="Новые объявления"
              />
            </div>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </div>
    );
  }
}

export default SortAdvts;
