import React from "react";
import { Content, Grid, Row, Col } from "rsuite";
import AdvtCard from "../../components/AdvtCard/advtcard";
import SearchBar from "../../components/SearchBar/searchbar";
import FilterBar from "../../components/FilterBar/filterbar";
import css from "./filterpage.module.css";

class FilterPage extends React.Component {
  render() {
    const { advts } = this.props;

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
              <FilterBar className="filter" />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              {advts.map((advt, indx) => (
                <AdvtCard key={indx} advt={advt} className="advt-item" />
              ))}
            </Col>
            <Col xs={24} sm={24} md={4} lg={4}></Col>
          </Row>
        </Grid>
      </Content>
    );
  }
}

export default FilterPage;
