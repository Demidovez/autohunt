import React from "react";
import { Content, Grid, Row, Col } from "rsuite";
import { observer } from "mobx-react";
import SearchBar from "../../components/SearchBar/searchbar";
import FilterBar from "../../components/FilterBar/filterbar";
import AdvtList from "../../components/AdvtList/advtlist";
import filterStore from "../../stores/filterStore";
import css from "./filterpage.module.css";

const FilterPage = observer(
  class extends React.Component {
    render() {
      return (
        <Content>
          <Grid fluid>
            <Row>
              <Col xs={24} sm={24} md={4} lg={4}></Col>
              <Col xs={24} sm={24} md={16} lg={16}>
                <SearchBar className="search-bar" />
              </Col>
              <Col xs={24} sm={24} md={4} lg={4}></Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={4} lg={4}></Col>
              <Col xs={24} sm={24} md={4} lg={4}>
                <FilterBar
                  className="filter"
                  fetchInfo={filterStore.getInitInfo}
                  onEditFilter={filterStore.startGetAdvts}
                />
              </Col>
              <Col xs={24} sm={24} md={12} lg={12}>
                <AdvtList advts={filterStore.advts} />
              </Col>
              <Col xs={24} sm={24} md={4} lg={4}></Col>
            </Row>
          </Grid>
        </Content>
      );
    }
  }
);

export default FilterPage;
