import React, { useState } from "react";
import "./styles.scss";
import { Nav, Panel } from "rsuite";
import { useSelector } from "react-redux";

function SearchResult({ show }) {
  const {
    advertsByName,
    countByName,
    advertsByRubles,
    countByRubles,
    advertsByDollars,
    countByDollars,
    advertsByMileage,
    countByMileage,
    advertsByCity,
    countByCity,
    advertsByOther,
    countByOther,
  } = useSelector((state) => state.search);

  const [activeTab, setActiveTab] = useState("name");

  const onSelectTab = (eventKey) => setActiveTab(eventKey);

  return (
    <Panel className={`search-result-component ${show && "show"}`}>
      {/*{countByName && (*/}
      {/*  <p>*/}
      {/*    По модели <span>({countByName})</span>*/}
      {/*  </p>*/}
      {/*)}*/}
      {/*{advertsByName.map((advert) => (*/}
      {/*  <p>{advert.model}</p>*/}
      {/*))}*/}
      <Nav
        activeKey={activeTab}
        onSelect={onSelectTab}
        appearance="subtle"
        className="tabs"
      >
        <Nav.Item eventKey="name">По модели</Nav.Item>
        <Nav.Item eventKey="rubles">По цене в BYN</Nav.Item>
        <Nav.Item eventKey="dollars">По цене в USD</Nav.Item>
        <Nav.Item eventKey="mileage">По пробегу</Nav.Item>
        <Nav.Item eventKey="city">По городу</Nav.Item>
        <Nav.Item eventKey="other">Прочее</Nav.Item>
      </Nav>
    </Panel>
  );
}

export default SearchResult;
