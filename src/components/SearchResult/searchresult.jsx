import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Nav, Panel } from "rsuite";
import { useSelector } from "react-redux";

// TODO: Медленная скорость поиска...

function SearchResult({ show }) {
  const { tabs } = useSelector((state) => state.search);
  const [tabsWithAdverts, setTabsWithAdverts] = useState([]);
  const [activeTab, setActiveTab] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tabsWithAdverts = tabs.filter((t) => t.count > 0);
    setTabsWithAdverts(tabsWithAdverts);
    setActiveTab(tabsWithAdverts.length > 0 && tabsWithAdverts[0].key);
    setIsLoading(tabs.find((t) => t.isLoading));
  }, [tabs]);

  const onSelectTab = (eventKey) => setActiveTab(eventKey);

  return (
    <Panel className={`search-result-component ${show && "show"}`}>
      {!isLoading && tabsWithAdverts.length > 0 && (
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
      )}
      {!isLoading &&
        tabsWithAdverts.length > 0 &&
        tabsWithAdverts
          .find((t) => t.key === activeTab)
          .adverts.map((advert) => <p>{advert.model}</p>)}
      {!isLoading && tabsWithAdverts.length === 0 && (
        <p className="nothing-found">Ничего не найдено...</p>
      )}
      {/*{isLoading && tabsWithAdverts.length === 0 && (*/}
      {/*  <p className="nothing-found">Загрузка...</p>*/}
      {/*)}*/}
    </Panel>
  );
}

export default SearchResult;
