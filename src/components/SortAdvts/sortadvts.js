import React from "react";
import { FlexboxGrid, SelectPicker, Tag } from "rsuite";
import { observer } from "mobx-react";
import css from "./sortadvts.module.css";

const SortAdvts = observer(
  class extends React.Component {
    closeTag = (tag) => {
      console.log(tag);
    };

    render() {
      return (
        <div className={`sortadvts-overwrite ${css.container}`}>
          <FlexboxGrid align="middle">
            <FlexboxGrid.Item colspan={18}>
              <div className={css.tagswrap}>
                {this.props.listTags.map((tag, indx) => (
                  <Tag closable onClose={() => this.closeTag(tag)} key={indx}>
                    {tag}
                  </Tag>
                ))}
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
);

export default SortAdvts;
