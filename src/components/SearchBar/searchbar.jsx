import React, { useState, useEffect, useRef } from "react";
import { InputGroup, Input, Icon } from "rsuite";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  goResetSearchBarAction,
  setSearchStrAction,
  goSearchAction,
  setFilterResultToSearchResultAction,
  goResetSearchBarWithValueAction,
} from "../../actions/creators/searchActionCreators";
import SearchResult from "../SearchResult/searchresult";
import {
  setAdvertsAction,
  setSearchInfoToFilterAction,
} from "../../actions/creators/filterBarActionCreators";

function SearchBar() {
  const {
    filterOptions,
    adverts,
    countAllAdverts,
    isLoadingAdverts,
  } = useSelector((state) => state.filterBar);
  const { searchStr, searchBy, tabs } = useSelector((state) => state.search);
  const [timeoutSearchId, setTimeoutSearchId] = useState();
  const [isPopupMode, setIsPopupMode] = useState(false);
  const [isNeedReSearch, setIsNeedReSearch] = useState(false);
  const [isFocusedSearchInput, setIsFocusedSearchInput] = useState(false);
  const wrapperInputRef = useRef(null);
  const prevFilterOptionsRef = useRef(filterOptions);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchStr && isFocusedSearchInput) {
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
      setIsPopupMode(true);
    } else {
      timeoutSearchId && clearTimeout(timeoutSearchId);
      isPopupMode && isFocusedSearchInput && dispatch(goResetSearchBarAction());
      setIsPopupMode(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchStr]);

  useEffect(() => {
    if (isPopupMode) {
      dispatch(
        goSearchAction(
          searchStr,
          tabs.map((t) => t.key),
          filterOptions
        )
      );
    } else {
      const prevFilterOptionsWithoutSearchFields = {
        ...prevFilterOptionsRef.current,
        searchStr: null,
        searchBy: null,
      };

      const nextFilterOptionsWithoutSearchFields = {
        ...filterOptions,
        searchStr: null,
        searchBy: null,
      };

      if (
        JSON.stringify(prevFilterOptionsWithoutSearchFields) !==
        JSON.stringify(nextFilterOptionsWithoutSearchFields)
      ) {
        dispatch(goResetSearchBarWithValueAction(filterOptions.searchStr));
      }
    }

    prevFilterOptionsRef.current = filterOptions;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterOptions]);

  useEffect(() => {
    searchStr && setIsNeedReSearch(!isPopupMode);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingAdverts]);

  useEffect(() => {
    if (isPopupMode && isNeedReSearch) {
      dispatch(
        goSearchAction(
          searchStr,
          tabs.map((t) => t.key).filter((key) => key !== searchBy),
          filterOptions
        )
      );
      setIsNeedReSearch(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPopupMode]);

  // TODO: Наверное можно упростить проверку
  const onClosePopup = (event) => {
    if ([...event.target.classList].includes("search-bar-component")) {
      setIsPopupMode(false);

      if (filterOptions.searchStr !== searchStr) {
        setIsNeedReSearch(true);
        setIsFocusedSearchInput(false);
        dispatch(goResetSearchBarWithValueAction(filterOptions.searchStr));
      }
    }
  };

  const onFocusSearch = () => {
    if (searchStr && !isPopupMode) {
      dispatch(
        setFilterResultToSearchResultAction(
          adverts,
          countAllAdverts,
          filterOptions.searchBy
        )
      );

      setIsPopupMode(true);
    }

    setIsFocusedSearchInput(true);
  };

  const goToFilter = () => {
    const activeTab = tabs.find((tab) => tab.key === searchBy);

    // TODO: А что если пользователь начал вводить и сразу нажал Энтер?
    if (searchStr && activeTab) {
      dispatch(
        setSearchInfoToFilterAction(searchStr, searchBy, activeTab.title)
      );
      dispatch(setAdvertsAction(activeTab.adverts, activeTab.count));
    } else {
      dispatch(goResetSearchBarAction());
    }

    setIsPopupMode(false);
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      goToFilter();

      isFocusedSearchInput && wrapperInputRef.current?.focus();
    }
  };

  const onResetSearch = () => {
    dispatch(goResetSearchBarAction());
    setIsPopupMode(false);
  };

  const setSearchStr = (searchStr) => dispatch(setSearchStrAction(searchStr));

  // TODO: Убрать classPrefix (так как я отказался от CSS модулей)
  return (
    <div
      className={`search-bar-component ${isPopupMode && "popup-show"} popup`}
      onClick={onClosePopup}
      onKeyPress={onKeyPress}
      tabIndex="1"
      ref={wrapperInputRef}
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
          className={searchStr ? "with-value" : ""}
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
