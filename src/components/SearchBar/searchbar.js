import React, { useState, useEffect } from "react";
import { InputGroup, Input, Icon } from "rsuite";
import css from "./searchbar.module.css";
import { useDispatch } from "react-redux";
import { goSearchAction } from "../../actions/creators/searchActionCreators";

function SearchBar({ className }) {
  const [searchStr, setSearchStr] = useState("");
  const [timeoutSearchId, setTimeoutSearchId] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    timeoutSearchId && clearTimeout(timeoutSearchId);

    const timeoutId = setTimeout(
      () => dispatch(goSearchAction(searchStr)),
      500
    );

    setTimeoutSearchId(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchStr]);

  return (
    <div className={className}>
      <InputGroup size="lg" inside className={css.container}>
        <Input
          placeholder="Поиск..."
          value={searchStr}
          onChange={setSearchStr}
        />
        <InputGroup.Button>
          <Icon icon="search" />
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
}

export default SearchBar;
