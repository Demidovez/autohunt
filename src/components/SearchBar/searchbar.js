import React from "react";
import { InputGroup, Input, Icon } from "rsuite";
import css from "./searchbar.module.css";

class SearchBar extends React.Component {
  render() {
    const { className } = this.props;

    return (
      <div className={className}>
        <InputGroup size="lg" inside className={css.container}>
          <Input placeholder="Поиск..." />
          <InputGroup.Button>
            <Icon icon="search" />
          </InputGroup.Button>
        </InputGroup>
      </div>
    );
  }
}

export default SearchBar;
