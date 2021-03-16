import React, { useState, useEffect } from "react";
import { InputGroup, Input, Icon } from "rsuite";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  goResetSearchBarAction,
  setSearchStrAction,
  goSearchAction,
  setSearchInfoToSearchResultAction,
} from "../../actions/creators/searchActionCreators";
import SearchResult from "../SearchResult/searchresult";
import {
  setAdvertsAction,
  setSearchInfoToFilterAction,
} from "../../actions/creators/filterBarActionCreators";

function SearchBar() {
  const { filterOptions, adverts, countAllAdverts } = useSelector(
    (state) => state.filterBar
  );
  const { searchStr, searchBy, tabs } = useSelector((state) => state.search);
  const [timeoutSearchId, setTimeoutSearchId] = useState();
  const [isPopupMode, setIsPopupMode] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchStr) {
      timeoutSearchId && clearTimeout(timeoutSearchId);

      // TODO: Если строка является числом, то например по цене будет искать часть, а не точное совпадение
      const timeoutId = setTimeout(() => {
        dispatch(
          goSearchAction(
            searchStr,
            tabs.map((t) => t.key),
            filterOptions
          )
        );
      }, 300);

      setTimeoutSearchId(timeoutId);
    } else {
      timeoutSearchId && clearTimeout(timeoutSearchId);
      isPopupMode && dispatch(goResetSearchBarAction(filterOptions.searchStr));
    }

    setIsPopupMode(!!searchStr);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchStr]);

  useEffect(() => {
    isPopupMode && dispatch(goSearchAction(searchStr, filterOptions));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterOptions]);

  useEffect(() => {
    dispatch(goResetSearchBarAction(filterOptions.searchStr));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterOptions.searchStr]);

  // TODO: Наверное можно упростить проверку
  const onClosePopup = (event) => {
    if ([...event.target.classList].includes("search-bar-component")) {
      dispatch(goResetSearchBarAction(filterOptions.searchStr));
      setIsPopupMode(false);
    }
  };

  const onFocusSearch = () => {
    if (filterOptions.searchStr && !isPopupMode) {
      dispatch(
        setSearchInfoToSearchResultAction(
          adverts,
          countAllAdverts,
          filterOptions.searchBy
        )
      );
      dispatch(
        goSearchAction(
          searchStr,
          tabs.map((t) => t.key).filter((key) => key !== searchBy),
          filterOptions
        )
      );
      setIsPopupMode(!!searchStr);
    }
  };

  const goToFilter = () => {
    const activeTab = tabs.find((tab) => tab.key === searchBy);

    dispatch(setSearchInfoToFilterAction(searchStr, searchBy, activeTab.title));
    dispatch(setAdvertsAction(activeTab.adverts, activeTab.count));

    setIsPopupMode(false);
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      goToFilter();
      event.target.blur();
    }
  };

  const onResetSearch = () => {
    dispatch(goResetSearchBarAction(filterOptions.searchStr));
    setIsPopupMode(!!searchStr);
  };

  const setSearchStr = (searchStr) => dispatch(setSearchStrAction(searchStr));

  // TODO: Убрать classPrefix (так как я отказался от CSS модулей)
  return (
    <div
      className={`search-bar-component ${isPopupMode && "popup-show"} popup`}
      onClick={onClosePopup}
    >
      <InputGroup size="lg" inside>
        <InputGroup.Button
          className="input-btn-left"
          classPrefix=""
          onClick={goToFilter}
        >
          <Icon icon="search" />
        </InputGroup.Button>
        <Input
          placeholder="Поиск..."
          value={searchStr}
          onChange={setSearchStr}
          spellCheck="false"
          onFocus={onFocusSearch}
          onKeyPress={onKeyPress}
          className={searchStr && "with-value"}
          classPrefix=""
        />
        {searchStr && (
          <InputGroup.Button
            className="input-btn-right"
            classPrefix=""
            onClick={onResetSearch}
          >
            <Icon icon="close" />
          </InputGroup.Button>
        )}
      </InputGroup>
      {isPopupMode && <SearchResult onToFilter={goToFilter} />}
    </div>
  );
}

export default SearchBar;
