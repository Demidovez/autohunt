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
                {this.props.tags.map((tag, indx) => (
                  <Tag closable onClose={() => this.closeTag(tag)} key={indx}>
                    {tag.label}
                  </Tag>
                ))}
              </div>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={6}>
              <div className={css.sortbutton}>
                <SelectPicker
                  data={this.props.orderData}
                  appearance="subtle"
                  cleanable={false}
                  searchable={false}
                  value={this.props.orderValue}
                  placeholder={this.props.orderValue.label}
                  onSelect={this.props.onSort}
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
