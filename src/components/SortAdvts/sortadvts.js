import React from "react";
import { FlexboxGrid, SelectPicker, Tag } from "rsuite";
import { observer } from "mobx-react";
import filterAdvtsStore from "../../stores/filterAdvtsStore";
import css from "./sortadvts.module.css";

const SortAdvts = observer(
  class extends React.Component {
    render() {
      const {
        tags,
        orderData,
        orderValue,
        onSort,
        onCloseTag,
      } = filterAdvtsStore;

      return (
        <div className={`sortadvts-overwrite ${css.container}`}>
          <FlexboxGrid align="middle">
            <FlexboxGrid.Item colspan={18}>
              <div className={css.tagswrap}>
                {tags.map((tag, indx) => (
                  <Tag
                    closable
                    onClick={() => onCloseTag(tag, indx)}
                    key={indx}
                  >
                    {tag.label}
                  </Tag>
                ))}
              </div>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={6}>
              <div className={css.sortbutton}>
                <SelectPicker
                  data={orderData}
                  appearance="subtle"
                  cleanable={false}
                  searchable={false}
                  value={orderValue}
                  placeholder={orderValue.label}
                  onSelect={onSort}
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
