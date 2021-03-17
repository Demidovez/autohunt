import React, { useLayoutEffect, useState } from "react";
import "./styles.scss";
import { Badge, Loader, Nav, Panel } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import ResultSearchAdvertList from "../ResultSearchAdvertList/resultsearchadvertlist";
import FilterTags from "../FilterTags/filtertags";
import {
  goSearchMoreAction,
  setSearchByOneAction,
} from "../../actions/creators/searchActionCreators";

function SearchResult({ onToFilter }) {
  const { tabs, isLoading, searchBy, searchStr } = useSelector(
    (state) => state.search
  );
  const filterOptions = useSelector((state) => state.filterBar.filterOptions);
  const [hasSomeAdverts, setHasSomeAdverts] = useState(false);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const tabWithAdverts = tabs.find((t) => t.count > 0);

    if (tabWithAdverts) {
      const searchByIsValid = tabs
        .filter((t) => t.count > 0)
        .map((t) => t.key)
        .includes(searchBy);

      !searchByIsValid && dispatch(setSearchByOneAction(tabWithAdverts.key));
    }

    setHasSomeAdverts(!!tabWithAdverts);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs]);

  const onSelectTab = (searchBy) => dispatch(setSearchByOneAction(searchBy));

  const getMoreAdverts = () => {
    dispatch(
      goSearchMoreAction(
        searchStr,
        searchBy,
        tabs.find((t) => t.key === searchBy).offset + 15,
        filterOptions
      )
    );
  };

  return (
    <Panel className="search-result-component">
      <FilterTags hideField="searchStr" />
      {hasSomeAdverts && (
        <div>
          <Nav
            activeKey={searchBy}
            onSelect={onSelectTab}
            appearance="subtle"
            className="tabs"
          >
            {tabs.map((tab) => (
              <Nav.Item
                eventKey={tab.key}
                key={tab.key}
                className={`${tab.key === searchBy ? "active" : ""} ${
                  !tab.count ? "disabled" : ""
                }`}
                disabled={!tab.adverts.length}
              >
                <Badge content={!!tab.adverts.length && tab.count}>
                  {tab.title}
                </Badge>
              </Nav.Item>
            ))}
            <Loader content="Загрузка..." className={isLoading ? "show" : ""} />
          </Nav>
          <ResultSearchAdvertList
            tab={tabs.find((t) => t.key === searchBy)}
            getMore={getMoreAdverts}
            onToFilter={onToFilter}
          />
        </div>
      )}
      {!isLoading && !hasSomeAdverts && (
        <p className="nothing-found">Ничего не найдено :(</p>
      )}
      {isLoading && !hasSomeAdverts && (
        <p className="loading-label">Загрузка...</p>
      )}
    </Panel>
  );
}

export default SearchResult;
