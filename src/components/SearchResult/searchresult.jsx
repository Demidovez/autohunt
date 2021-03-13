import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Loader, Nav, Panel } from "rsuite";
import { useSelector } from "react-redux";

function SearchResult() {
  const { tabs, isLoading } = useSelector((state) => state.search);
  const [tabsWithAdverts, setTabsWithAdverts] = useState([]);
  const [activeTab, setActiveTab] = useState();
  const [isLoadingTabs, setIsLoadingTabs] = useState(false);

  useEffect(() => {
    const tabsWithAdverts = tabs.filter((t) => t.count > 0);
    setTabsWithAdverts(tabsWithAdverts);
    setActiveTab(tabsWithAdverts.length > 0 && tabsWithAdverts[0].key);
    setIsLoadingTabs(false);
  }, [tabs]);

  useEffect(() => {
    if (isLoading) {
      setIsLoadingTabs(true);
    }
  }, [isLoading]);

  const onSelectTab = (eventKey) => setActiveTab(eventKey);

  return (
    <Panel className="search-result-component">
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
          </Nav>
          {tabsWithAdverts
            .find((t) => t.key === activeTab)
            .adverts.map((advert) => (
              <p key={advert.id}>{advert.model}</p>
            ))}
        </div>
      )}
      {!isLoadingTabs && tabsWithAdverts.length === 0 && (
        <p className="nothing-found">Ничего не найдено :(</p>
      )}
      {isLoadingTabs && tabsWithAdverts.length === 0 && (
        <p className="loading-label">Загрузка...</p>
      )}
      <Loader
        content="Загрузка..."
        className={isLoadingTabs && tabsWithAdverts.length > 0 ? "show" : ""}
      />
    </Panel>
  );
}

export default SearchResult;
