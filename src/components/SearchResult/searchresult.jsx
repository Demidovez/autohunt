import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Loader, Nav, Panel } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import ResultSearchAdvertList from "../ResultSearchAdvertList/resultsearchadvertlist";
import FilterTags from "../FilterTags/filtertags";
import { setSearchByOneAction } from "../../actions/creators/searchActionCreators";

function SearchResult({ onToFilter }) {
  const { tabs, isLoading } = useSelector((state) => state.search);
  const [tabsWithAdverts, setTabsWithAdverts] = useState([]);
  const [activeTab, setActiveTab] = useState();
  const [isLoadingTabs, setIsLoadingTabs] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const tabsWithAdverts = tabs.filter((t) => t.count > 0);
    setTabsWithAdverts(tabsWithAdverts);

    if (tabsWithAdverts.length) {
      setActiveTab(tabsWithAdverts[0].key);
      dispatch(setSearchByOneAction(tabsWithAdverts[0].key));
    }

    setIsLoadingTabs(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs]);

  useEffect(() => {
    if (isLoading) {
      setIsLoadingTabs(true);
    }
  }, [isLoading]);

  const onSelectTab = (eventKey) => {
    setActiveTab(eventKey);
    dispatch(setSearchByOneAction(eventKey));
  };

  return (
    <Panel className="search-result-component">
      <FilterTags />
      {tabsWithAdverts.length > 0 && (
        <div>
          <Nav
            activeKey={activeTab}
            onSelect={onSelectTab}
            appearance="subtle"
            className="tabs"
          >
            {tabsWithAdverts.map((tab) => (
              <Nav.Item
                eventKey={tab.key}
                key={tab.key}
                className={tab.key === activeTab ? "active-tab" : ""}
              >
                {tab.title}
              </Nav.Item>
            ))}
            <Loader
              content="Загрузка..."
              className={
                isLoadingTabs && tabsWithAdverts.length > 0 ? "show" : ""
              }
            />
          </Nav>
          <ResultSearchAdvertList
            adverts={tabsWithAdverts.find((t) => t.key === activeTab).adverts}
            countAll={tabsWithAdverts.find((t) => t.key === activeTab).count}
            onToFilter={onToFilter}
          />
        </div>
      )}
      {!isLoadingTabs && tabsWithAdverts.length === 0 && (
        <p className="nothing-found">Ничего не найдено :(</p>
      )}
      {isLoadingTabs && tabsWithAdverts.length === 0 && (
        <p className="loading-label">Загрузка...</p>
      )}
    </Panel>
  );
}

export default SearchResult;
