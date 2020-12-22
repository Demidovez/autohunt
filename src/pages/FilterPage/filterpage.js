import React from "react";
import { Content, Grid, Row, Col } from "rsuite";
import SearchBar from "../../components/SearchBar/searchbar";
import FilterAdvtsBar from "../../components/FilterAdvtsBar/filteradvtsbar";
import AdvtList from "../../components/AdvtList/advtlist";
import SortAdvts from "../../components/SortAdvts/sortadvts";
import css from "./filterpage.module.css";

class FilterPage extends React.Component {
  render() {
    return (
      <Content>
        <Grid fluid>
          <Row>
            <Col xs={24} sm={24} md={4} lg={4}></Col>
            <Col xs={24} sm={24} md={16} lg={16}>
              <SearchBar className={css.searchbar} />
            </Col>
            <Col xs={24} sm={24} md={4} lg={4}></Col>
          </Row>
          <Row>
            <Col xs={24} sm={24} md={4} lg={4}></Col>
            <Col xs={24} sm={24} md={4} lg={4}>
              <FilterAdvtsBar className={css.filter} />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <SortAdvts />
              <AdvtList />
            </Col>
            <Col xs={24} sm={24} md={4} lg={4}></Col>
          </Row>
        </Grid>
      </Content>
    );
  }
}

export default FilterPage;
